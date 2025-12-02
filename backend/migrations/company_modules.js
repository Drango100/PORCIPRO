export const name = "2025-12-02-07_create_company_modules";

export async function up(conn) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS company_modules (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NOT NULL,
      module_id INT NOT NULL,

      -- Permisos por módulo
      can_view BOOLEAN DEFAULT TRUE,
      can_create BOOLEAN DEFAULT FALSE,
      can_edit BOOLEAN DEFAULT FALSE,
      can_delete BOOLEAN DEFAULT FALSE,

      -- Auditoría
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

      -- Llaves foráneas
      CONSTRAINT fk_companymodules_company 
        FOREIGN KEY (company_id) REFERENCES company(id) ON DELETE CASCADE,
      CONSTRAINT fk_companymodules_module 
        FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}

