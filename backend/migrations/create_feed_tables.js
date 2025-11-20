// 2025-11-20-20_create_feed_tables.js
// Tablas para gestión de alimentación: formulas, insumos por fórmula y lotes de producción de alimento.
export const name = "2025-11-20-20_create_feed_tables";

export async function up(conn) {
  // formula base
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS feed_formulas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NOT NULL,
      branch_id INT NULL,
      name VARCHAR(191) NOT NULL,
      description TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_feed_formula_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // items por formula (componentes)
 

  // lotes de producción de alimento
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS feed_batches (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NOT NULL,
      branch_id INT NULL,
      formula_id INT NOT NULL,
      batch_code VARCHAR(191) NULL,
      produced_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      quantity DECIMAL(14,3) NULL,
      created_by INT NULL,
      CONSTRAINT fk_feedbatch_formula FOREIGN KEY (formula_id) REFERENCES feed_formulas(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}
