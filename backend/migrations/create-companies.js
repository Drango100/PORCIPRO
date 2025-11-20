// 2025-11-20-01_create_companies.js
// Crea la tabla companies (empresas / tenants)
export const name = "2025-11-20-01_create_companies";

export async function up(conn) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS companies (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(191) NOT NULL,
      nit VARCHAR(64) NULL,
      address VARCHAR(255) NULL,
      phone VARCHAR(64) NULL,
      status ENUM('active','inactive') NOT NULL DEFAULT 'active',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}
