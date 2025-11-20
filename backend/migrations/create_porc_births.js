// 2025-11-20-14_create_porc_births.js
// Registro de partos y nacimientos (detalle por parto).
export const name = "2025-11-20-14_create_porc_births";

export async function up(conn) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS porc_births (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NOT NULL,
      branch_id INT NULL,
      mother_id INT NOT NULL,
      birth_date DATE NOT NULL,
      total_born INT NULL,
      live_born INT NULL,
      stillborn INT NULL,
      notes TEXT NULL,
      created_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_births_mother FOREIGN KEY (mother_id) REFERENCES porc_animals(id) ON DELETE CASCADE,
      CONSTRAINT fk_births_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}
