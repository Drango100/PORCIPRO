// 2025-11-20-17_create_porc_treatments.js
// Tratamientos y medicación aplicados a animales.
export const name = "2025-11-20-17_create_porc_treatments";

export async function up(conn) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS porc_treatments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NOT NULL,
      branch_id INT NULL,
      animal_id INT NOT NULL,
      treatment_date DATETIME NOT NULL,
      medication VARCHAR(191) NULL,
      dose VARCHAR(64) NULL,
      route VARCHAR(64) NULL,
      administered_by INT NULL,
      notes TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_treatments_animal FOREIGN KEY (animal_id) REFERENCES porc_animals(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}
