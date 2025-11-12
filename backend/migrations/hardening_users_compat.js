export const name = "2025-10-18-02_hardening_users_compat";

export async function up(conn) {
  const [[{ db }]] = await conn.query("SELECT DATABASE() AS db");

  // tabla users debe existir
  const [trows] = await conn.execute(
    `SELECT 1 FROM information_schema.tables
     WHERE table_schema = ? AND table_name = 'users' LIMIT 1`,
    [db]
  );
  if (!trows.length) {
    console.warn('[hardening] Tabla "users" no existe aún. SKIP.');
    return;
  }

  // subir password_hash a 255 si hace falta
  const [phRows] = await conn.execute(
    `SELECT CHARACTER_MAXIMUM_LENGTH AS len
     FROM information_schema.columns
     WHERE table_schema=? AND table_name='users' AND column_name='password_hash'`,
    [db]
  );
  const phLen = phRows?.[0]?.len ?? 0;
  if (phLen < 255) {
    await conn.execute(`ALTER TABLE users MODIFY COLUMN password_hash VARCHAR(255) NOT NULL`);
  }

  async function columnExists(col) {
    const [r] = await conn.execute(
      `SELECT 1 FROM information_schema.columns
       WHERE table_schema=? AND table_name='users' AND column_name=? LIMIT 1`,
      [db, col]
    );
    return r.length > 0;
  }

  if (!(await columnExists("role"))) {
    await conn.execute(`ALTER TABLE users ADD COLUMN role VARCHAR(50) NOT NULL DEFAULT 'user'`);
  }
  if (!(await columnExists("failed_logins"))) {
    await conn.execute(`ALTER TABLE users ADD COLUMN failed_logins INT NOT NULL DEFAULT 0`);
  }
  if (!(await columnExists("locked_until"))) {
    await conn.execute(`ALTER TABLE users ADD COLUMN locked_until DATETIME NULL`);
  }

  // índice por created_at si falta
  const [idxRows] = await conn.execute(
    `SELECT 1 FROM information_schema.statistics
     WHERE table_schema=? AND table_name='users' AND index_name='idx_users_created_at' LIMIT 1`,
    [db]
  );
  if (!idxRows.length) {
    await conn.execute(`CREATE INDEX idx_users_created_at ON users (created_at)`);
  }
}
