// 2025-11-20-11_create_porc_animals.js
// Tabla principal para los animales (cerdos). Guarda datos comunes a todos los animales.
export const name = "2025-11-20-11_create_porc_animals";

export async function up(conn) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS porc_animals (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NOT NULL,
      branch_id INT NULL,
      tag_number VARCHAR(64) NULL,       -- número identificador del animal
      sex ENUM('M','F') NULL,
      birth_date DATE NULL,
      breed VARCHAR(120) NULL,
      status VARCHAR(50) NULL,            -- ej. 'activo', 'vendido', 'muerto'
      created_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      CONSTRAINT fk_porc_animals_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE,
      CONSTRAINT fk_porc_animals_branch FOREIGN KEY (branch_id) REFERENCES branches(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}
