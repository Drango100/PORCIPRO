// 2025-11-20-23_create_alerts_audit.js
// Tablas para alertas del sistema y logs de auditoría básicos.
export const name = "2025-11-20-23_create_alerts_audit";

export async function up(conn) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS alerts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NOT NULL,
      branch_id INT NULL,
      key_name VARCHAR(191) NOT NULL,   -- ej. 'stock.low', 'animal.fever'
      payload JSON NULL,                -- datos extra
      is_read TINYINT(1) DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_alerts_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await conn.execute(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NULL,
      user_id INT NULL,
      action VARCHAR(191) NOT NULL,
      entity VARCHAR(191) NULL,
      entity_id INT NULL,
      data JSON NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}
