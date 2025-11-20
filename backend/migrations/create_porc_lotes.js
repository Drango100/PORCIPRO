// 2025-11-20-12_create_porc_lotes.js
// Lotes de animales (manejo por lote).
export const name = "2025-11-20-12_create_porc_lotes";

export async function up(conn) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS porc_lotes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NOT NULL,
      branch_id INT NULL,
      name VARCHAR(191) NOT NULL,
      description TEXT NULL,
      created_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_porc_lotes_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      CONSTRAINT fk_porc_lotes_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}
