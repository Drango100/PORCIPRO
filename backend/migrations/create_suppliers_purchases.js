// 2025-11-20-21_create_suppliers_purchases.js
// Tablas para compras: suppliers, purchases, purchase_items
export const name = "2025-11-20-21_create_suppliers_purchases";

export async function up(conn) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS suppliers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NOT NULL,
      name VARCHAR(191) NOT NULL,
      contact VARCHAR(191) NULL,
      phone VARCHAR(64) NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_suppliers_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await conn.execute(`
    CREATE TABLE IF NOT EXISTS purchases (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NOT NULL,
      supplier_id INT NOT NULL,
      invoice_number VARCHAR(191) NULL,
      total DECIMAL(14,2) NULL,
      purchase_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_by INT NULL,
      CONSTRAINT fk_purchases_supplier FOREIGN KEY (supplier_id) REFERENCES suppliers(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await conn.execute(`
    CREATE TABLE IF NOT EXISTS purchase_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      purchase_id INT NOT NULL,
      item_id INT NOT NULL,
      quantity DECIMAL(14,3) NOT NULL,
      unit_price DECIMAL(14,2) NULL,
      CONSTRAINT fk_purchaseitem_purchase FOREIGN KEY (purchase_id) REFERENCES purchases(id) ON DELETE CASCADE,
      CONSTRAINT fk_purchaseitem_item FOREIGN KEY (item_id) REFERENCES inventory_items(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}
