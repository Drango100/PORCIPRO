// 2025-11-20-05_create_permissions.js
// Lista de permisos (string key) que usaremos para asociar a roles.
// Los permisos son globales; la asignación a roles es por company.
export const name = "2025-11-20-05_create_permissions";

export async function up(conn) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS permissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      key_name VARCHAR(191) NOT NULL UNIQUE, -- e.g. 'module.porcicultura.create'
      description VARCHAR(255) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}
