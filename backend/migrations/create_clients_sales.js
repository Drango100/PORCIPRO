// 2025-11-20-22_create_clients_sales.js
// Tablas para clientes y ventas
export const name = "2025-11-20-22_create_clients_sales";

export async function up(conn) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS clients (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NOT NULL,
      name VARCHAR(191) NOT NULL,
      contact VARCHAR(191) NULL,
      phone VARCHAR(64) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_clients_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await conn.execute(`
    CREATE TABLE IF NOT EXISTS sales (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NOT NULL,
      client_id INT NULL,
      invoice_number VARCHAR(191) NULL,
      total DECIMAL(14,2) NULL,
      sale_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_by INT NULL,
      CONSTRAINT fk_sales_client FOREIGN KEY (client_id) REFERENCES clients(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  
}
