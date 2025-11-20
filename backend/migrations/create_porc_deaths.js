// 2025-11-20-16_create_porc_deaths.js
// Registros de mortalidad.
export const name = "2025-11-20-16_create_porc_deaths";

export async function up(conn) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS porc_deaths (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NOT NULL,
      branch_id INT NULL,
      animal_id INT NOT NULL,
      death_date DATETIME NOT NULL,
      cause VARCHAR(255) NULL,
      notes TEXT NULL,
      reported_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_deaths_animal FOREIGN KEY (animal_id) REFERENCES porc_animals(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}
