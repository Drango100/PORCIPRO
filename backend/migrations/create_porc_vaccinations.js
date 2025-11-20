// 2025-11-20-18_create_porc_vaccinations.js
// Vacunas aplicadas
export const name = "2025-11-20-18_create_porc_vaccinations";

export async function up(conn) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS porc_vaccinations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NOT NULL,
      branch_id INT NULL,
      animal_id INT NOT NULL,
      vaccine_name VARCHAR(191) NOT NULL,
      batch_number VARCHAR(191) NULL,
      vaccination_date DATETIME NOT NULL,
      administered_by INT NULL,
      notes TEXT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_vacc_animal FOREIGN KEY (animal_id) REFERENCES porc_animals(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}
