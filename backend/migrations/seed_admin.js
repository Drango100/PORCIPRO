import bcrypt from "bcryptjs";
export const name = "2025-10-18-03_seed_admin";

export async function up(conn) {
  const email = "admin@example.com";
  const rounds = Number(process.env.BCRYPT_ROUNDS ?? 10);

  // si users no existe todavía, salta
  const [[{ db }]] = await conn.query("SELECT DATABASE() AS db");
  const [trows] = await conn.execute(
    `SELECT 1 FROM information_schema.tables
     WHERE table_schema = ? AND table_name = 'users' LIMIT 1`,
    [db]
  );
  if (!trows.length) return;

  const [exists] = await conn.execute(
    "SELECT id FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  if (exists.length) return; // ya existe

  const hash = bcrypt.hashSync("Admin123*", bcrypt.genSaltSync(rounds));

  await conn.execute(
    `INSERT INTO users (name, email, password_hash, role)
     VALUES (?, ?, ?, 'admin')`,
    ["Admin", email, hash]
  );
}
