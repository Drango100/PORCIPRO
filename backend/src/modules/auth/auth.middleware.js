// src/modules/auth/auth.middleware.js
import jwt from "jsonwebtoken";
import { pool } from "../../db/index.js"; // ajusta si tu pool vive en otra ruta

const COOKIE_NAME = process.env.COOKIE_NAME || "auth_token";
const JWT_SECRET = process.env.JWT_SECRET || "please-change-me";

// --- helpers
function getToken(req) {
  // 1) Cookie httpOnly
  const c = req.cookies?.[COOKIE_NAME];
  if (c) return c;
  // 2) Authorization: Bearer <jwt>
  const h = req.headers.authorization || req.headers.Authorization;
  if (typeof h === "string" && h.startsWith("Bearer ")) {
    return h.slice(7).trim();
  }
  return null;
}

function send401(res, message, code = "auth_required", extra = {}) {
  return res.status(401).json({ ok: false, code, message, ...extra });
}

function verifyToken(token) {
  // separo para poder capturar errores específicos
  try {
    return { payload: jwt.verify(token, JWT_SECRET), error: null };
  } catch (err) {
    return { payload: null, error: err };
  }
}

// --- cache de si existe la columna 'role' en users
const roleSupport = { checked: false, exists: false };
async function ensureRoleExists() {
  if (roleSupport.checked) return roleSupport.exists;
  const [[{ db }]] = await pool.query("SELECT DATABASE() AS db");
  const [rows] = await pool.query(
    `SELECT 1 FROM information_schema.columns
     WHERE table_schema=? AND table_name='users' AND column_name='role' LIMIT 1`,
    [db]
  );
  roleSupport.exists = rows.length > 0;
  roleSupport.checked = true;
  return roleSupport.exists;
}

// --- middlewares
export function requireAuth(req, res, next) {
  const token = getToken(req);
  if (!token) return send401(res, "No autenticado", "missing_token");

  const { payload, error } = verifyToken(token);
  if (error) {
    if (error.name === "TokenExpiredError") {
      return send401(res, "Token expirado", "token_expired", {
        expiredAt: error.expiredAt,
      });
    }
    return send401(res, "Token inválido", "invalid_token");
  }

  // payload mínimo esperado: { id, email }
  req.user = payload;
  return next();
}

/**
 * No exige auth: si hay token válido setea req.user; si no, sigue normal.
 * Útil para rutas públicas que se “mejoran” cuando el usuario está logueado.
 */
export function optionalAuth(req, _res, next) {
  const token = getToken(req);
  if (!token) return next();

  const { payload } = verifyToken(token);
  if (payload) req.user = payload;
  return next();
}

/**
 * Requiere auth y un rol permitido.
 * Chequea la columna 'role' en DB -> trae el rol del usuario actual.
 * Uso: router.get("/admin", requireRole("admin"), handler)
 */
export function requireRole(...allowed) {
  return async function roleGuard(req, res, next) {
    // primero exigir autenticación
    const token = getToken(req);
    if (!token) return send401(res, "No autenticado", "missing_token");

    const { payload, error } = verifyToken(token);
    if (error) {
      if (error.name === "TokenExpiredError") {
        return send401(res, "Token expirado", "token_expired", {
          expiredAt: error.expiredAt,
        });
      }
      return send401(res, "Token inválido", "invalid_token");
    }
    req.user = payload;

    // si no hay columna 'role', no podemos verificar => 403 conservador
    const hasRoleColumn = await ensureRoleExists();
    if (!hasRoleColumn) {
      return res
        .status(403)
        .json({
          ok: false,
          code: "role_not_supported",
          message: "Roles no habilitados",
        });
    }

    // traer rol desde DB (más confiable que depender del token)
    const [rows] = await pool.query(
      "SELECT role FROM users WHERE id = ? LIMIT 1",
      [payload.id]
    );
    if (!rows.length) {
      return res
        .status(403)
        .json({
          ok: false,
          code: "user_not_found",
          message: "Usuario no encontrado",
        });
    }

    const role = rows[0].role || "user";
    if (!allowed.includes(role)) {
      return res
        .status(403)
        .json({
          ok: false,
          code: "forbidden_role",
          message: "Permisos insuficientes",
        });
    }

    // opcional: exponer req.userRole
    req.userRole = role;
    return next();
  };
}
