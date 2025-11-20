// 2025-11-20-15_create_porc_weighings.js
// Registros de pesajes (peso del animal a una fecha).
export const name = "2025-11-20-15_create_porc_weighings";

export async function up(conn) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS porc_weighings (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NOT NULL,
      branch_id INT NULL,
      animal_id INT NOT NULL,
      weight_kg DECIMAL(8,2) NOT NULL,
      weighing_date DATETIME NOT NULL,
      created_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_weighing_animal FOREIGN KEY (animal_id) REFERENCES porc_animals(id) ON DELETE CASCADE,
      CONSTRAINT fk_weighing_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}
