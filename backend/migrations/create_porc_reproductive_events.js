// 2025-11-20-13_create_porc_reproductive_events.js
// Eventos de reproducción (montas, celos, servicios, diagnósticos, preñez, partos).
export const name = "2025-11-20-13_create_porc_reproductive_events";

export async function up(conn) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS porc_reproductive_events (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NOT NULL,
      branch_id INT NULL,
      animal_id INT NOT NULL,         -- hembra involucrada
      event_type VARCHAR(64) NOT NULL, -- 'celo','servicio','monta','diagnostico','parto','aborto'
      event_date DATETIME NOT NULL,
      male_id INT NULL,               -- opcional: macho involucrado
      notes TEXT NULL,
      created_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_reprod_animal FOREIGN KEY (animal_id) REFERENCES porc_animals(id) ON DELETE CASCADE,
      CONSTRAINT fk_reprod_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}
