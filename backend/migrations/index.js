// backend/migrations/index.js
import { readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import dotenv from "dotenv";
import mysql from "mysql2/promise";
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Env (acepta ambas convenciones y respeta "" en password)
const DB_HOST = process.env.DB_HOST ?? "localhost";
const DB_PORT = Number(process.env.DB_PORT ?? 3306);
const DB_USER = process.env.DB_USER ?? process.env.DB_USERNAME ?? "root";
const DB_PASS = process.env.DB_PASS ?? process.env.DB_PASSWORD ?? "";
const DB_NAME = process.env.DB_NAME ?? process.env.DB_DATABASE ?? "agroplus";
const LOCK_TIMEOUT = Number(process.env.MIGRATION_LOCK_TIMEOUT ?? 15); // seg

async function ensureDatabase() {
  const rootConn = await mysql.createConnection({
    host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PASS, multipleStatements: true,
  });
  await rootConn.execute(
    `CREATE DATABASE IF NOT EXISTS \`${DB_NAME}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;`
  );
  await rootConn.end();

  const dbConn = await mysql.createConnection({
    host: DB_HOST, port: DB_PORT, user: DB_USER, password: DB_PASS, database: DB_NAME, multipleStatements: true,
  });
  return dbConn;
}

async function ensureMigrationsTable(conn) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(191) NOT NULL UNIQUE,
      run_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}

// 🔒 helpers: lock global por proceso
async function acquireLock(conn) {
  const lockName = `${DB_NAME}:migrate`;
  const [[row]] = await conn.execute("SELECT GET_LOCK(?, ? ) AS got", [lockName, LOCK_TIMEOUT]);
  if (!row?.got) throw new Error(`No se pudo obtener lock de migración (${lockName}) en ${LOCK_TIMEOUT}s`);
  return lockName;
}
async function releaseLock(conn, lockName) {
  try { await conn.execute("SELECT RELEASE_LOCK(?)", [lockName]); } catch {}
}

export default async function runMigrations() {
  console.log(`[migrate] DB=${DB_NAME} @ ${DB_HOST}:${DB_PORT} user=${DB_USER}`);
  const conn = await ensureDatabase();
  await ensureMigrationsTable(conn);

  // 🔒 lock global para evitar corridas en paralelo
  let lockName = null;
  try {
    lockName = await acquireLock(conn);
  } catch (e) {
    await conn.end();
    throw e;
  }

  try {
    const [doneRows] = await conn.execute("SELECT name FROM migrations");
    const done = new Set(doneRows.map((r) => r.name));

    const files = readdirSync(__dirname)
      .filter((f) => f.endsWith(".js") && f !== "index.js")
      .sort(); // orden por filename

    // Pre-parse para detectar duplicados por 'name'
    const nameToFiles = new Map();
    const entries = [];
    for (const file of files) {
      const full = path.join(__dirname, file);
      const mod = await import(pathToFileURL(full).href);
      if (typeof mod.up !== "function") {
        console.warn(`• SKIP ${file} (no exporta 'up')`);
        continue;
      }
      const migName = mod.name || file;
      if (!nameToFiles.has(migName)) nameToFiles.set(migName, []);
      nameToFiles.get(migName).push(file);
      entries.push({ file, full, migName, up: mod.up });
    }
    for (const [migName, list] of nameToFiles.entries()) {
      if (list.length > 1) console.warn(`⚠️  DUP-NAME "${migName}" en archivos: ${list.join(", ")}`);
    }

    const seen = new Set(); // evita repetir el mismo 'name' en esta corrida
    let applied = 0;

    for (const { migName, up } of entries) {
      if (seen.has(migName)) { console.log(`• DUP-SKIP ${migName}`); continue; }
      seen.add(migName);
      if (done.has(migName)) { console.log(`• SKIP ${migName}`); continue; }

      console.log(`→ RUN  ${migName}`);
      try {
        // 🧾 transacción por migración
        await conn.beginTransaction();
        await up(conn);
        await conn.execute("INSERT INTO migrations (name) VALUES (?)", [migName]);
        await conn.commit();
        applied += 1;
        console.log(`✓ OK   ${migName}`);
      } catch (e) {
        await conn.rollback();
        console.error(`✗ FAIL ${migName}\n`, e);
        await conn.end();
        process.exit(1);
      }
    }

    await conn.end();
    console.log(`Migraciones completadas. (${applied} nuevas)`);
  } finally {
    // suelta el lock pase lo que pase
    const conn2 = await ensureDatabase().catch(() => null);
    if (conn2 && lockName) await releaseLock(conn2, lockName);
    if (conn2) await conn2.end();
  }
}

/** Auto-run correcto en ESM: node migrations/index.js */
const isDirect =
  process.argv[1] &&
  pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url;

if (isDirect) {
  runMigrations().catch((e) => {
    console.error("Error en migraciones:", e);
    process.exit(1);
  });
}
