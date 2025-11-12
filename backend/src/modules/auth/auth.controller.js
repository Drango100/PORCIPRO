// src/modules/auth/auth.controller.js
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../../db/index.js";              // <= ajusta si tu pool está en otra ruta
import { fail, ok, pick } from "../../utils.js";       // <= ajusta si utils está en otra ruta

// Si tienes env centralizado, descomenta y usa env.* en vez de process.env.*
// import { env } from "../../config/env.js";

const NODE_ENV = process.env.NODE_ENV || "development";
const COOKIE_NAME = process.env.COOKIE_NAME || "auth_token";
const JWT_SECRET = process.env.JWT_SECRET || "please-change-me";
const JWT_EXPIRES = process.env.JWT_EXPIRES || "7d";
const BCRYPT_ROUNDS = Math.max(10, Number(process.env.BCRYPT_ROUNDS ?? 10));

// Si usas front en otro origen/puerto y necesitas cross-site cookies -> SameSite=None + secure
// Puedes controlar esto por env si quieres mayor precisión.
const DEFAULT_SAMESITE = process.env.COOKIE_SAMESITE || "lax"; // "lax" | "strict" | "none"
const DEFAULT_SECURE = (process.env.COOKIE_SECURE ?? "").toLowerCase() === "true" || NODE_ENV === "production";

// Cookie options dinámicos según remember
function cookieOpts(remember) {
  // si remember=false => cookie de sesión (sin maxAge)
  const base = {
    httpOnly: true,
    sameSite: DEFAULT_SAMESITE,
    secure: DEFAULT_SECURE,
    path: "/",
  };
  if (remember) {
    base.maxAge = 1000 * 60 * 60 * 24 * 7; // 7 días
  }
  return base;
}

function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES });
}

// ---- Cache para columnas de lockout (evita consultas repetidas a information_schema)
const lockoutSupport = { checked: false, hasFailed: false, hasLocked: false };

async function ensureLockoutColumnsCached() {
  if (lockoutSupport.checked) return lockoutSupport;
  const [[{ db }]] = await pool.query("SELECT DATABASE() AS db");
  const [rows] = await pool.query(
    `SELECT column_name FROM information_schema.columns WHERE table_schema=? AND table_name='users' AND column_name IN ('failed_logins','locked_until')`,
    [db]
  );
  const cols = rows.map(r => r.column_name);
  lockoutSupport.hasFailed = cols.includes("failed_logins");
  lockoutSupport.hasLocked = cols.includes("locked_until");
  lockoutSupport.checked = true;
  return lockoutSupport;
}

export async function register(req, res) {
  try {
    let { name, email, password, remember } = pick(req.body, ["name", "email", "password", "remember"]);
    name = (name ?? "").trim();
    email = (email ?? "").trim().toLowerCase();
    password = (password ?? "").trim();
    const persist = Boolean(remember);

    if (!name || !email || !password) return fail(res, "Campos faltantes", 422);
    if (password.length < 6) return fail(res, "La contraseña debe tener al menos 6 caracteres", 422);

    const [exists] = await pool.query("SELECT id FROM users WHERE email = ?", [email]);
    if (exists.length) return fail(res, "El correo ya existe", 409);

    const hash = await bcrypt.hash(password, BCRYPT_ROUNDS);

    const [result] = await pool.query(
      "INSERT INTO users (name, email, password_hash) VALUES (?, ?, ?)",
      [name, email, hash]
    );

    const token = signToken({ id: result.insertId, email });
    res.cookie(COOKIE_NAME, token, cookieOpts(persist));
    return ok(res, { user: { id: result.insertId, name, email } }, 201);
  } catch (e) {
    if (e?.code === "ER_DUP_ENTRY") return fail(res, "El correo ya existe", 409);
    console.error("[register]", e);
    return fail(res, "No se pudo registrar", 500);
  }
}

export async function login(req, res) {
  try {
    let { email, password, remember } = pick(req.body, ["email", "password", "remember"]);
    email = (email ?? "").trim().toLowerCase();
    password = (password ?? "").trim();
    const persist = Boolean(remember);

    if (!email || !password) return fail(res, "Email y password requeridos", 422);

    const [rows] = await pool.query(
      "SELECT id, name, email, password_hash, failed_logins, locked_until FROM users WHERE email = ?",
      [email]
    );
    if (!rows.length) return fail(res, "Credenciales inválidas", 401);

    const user = rows[0];

    // Lockout activo
    if (user.locked_until && new Date(user.locked_until) > new Date()) {
      return fail(res, "Cuenta bloqueada temporalmente. Intenta más tarde.", 423);
    }

    const okPass = await bcrypt.compare(password, user.password_hash);
    if (!okPass) {
      const { hasFailed, hasLocked } = await ensureLockoutColumnsCached();
      if (hasFailed && hasLocked) {
        await pool.execute(
          `UPDATE users
             SET failed_logins = failed_logins + 1,
                 locked_until = IF(failed_logins + 1 >= 5, DATE_ADD(NOW(), INTERVAL 15 MINUTE), locked_until)
           WHERE id = ?`,
          [user.id]
        );
      }
      return fail(res, "Credenciales inválidas", 401);
    }

    // Resetear lockout si existe
    {
      const { hasFailed, hasLocked } = await ensureLockoutColumnsCached();
      if (hasFailed && hasLocked) {
        await pool.execute("UPDATE users SET failed_logins = 0, locked_until = NULL WHERE id = ?", [user.id]);
      }
    }

    const token = signToken({ id: user.id, email: user.email });
    res.cookie(COOKIE_NAME, token, cookieOpts(persist));
    return ok(res, { user: { id: user.id, name: user.name, email: user.email } });
  } catch (e) {
    console.error("[login]", e);
    return fail(res, "Error al iniciar sesión", 500);
  }
}

export async function me(req, res) {
  try {
    const [rows] = await pool.query(
      "SELECT id, name, email, role, created_at FROM users WHERE id = ?",
      [req.user.id]
    );
    if (!rows.length) return fail(res, "Usuario no encontrado", 404);
    return ok(res, { user: rows[0] });
  } catch (e) {
    console.error("[me]", e);
    return fail(res, "Error", 500);
  }
}

export async function logout(req, res) {
  try {
    // limpiar cookie (session y persistente)
    res.clearCookie(COOKIE_NAME, { ...cookieOpts(true), maxAge: 0 });
    res.clearCookie(COOKIE_NAME, { ...cookieOpts(false) });
    return ok(res, { message: "Sesión cerrada" });
  } catch (e) {
    console.error("[logout]", e);
    return fail(res, "Error al cerrar sesión", 500);
  }
}
