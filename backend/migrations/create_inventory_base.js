// 2025-11-20-19_create_inventory_base.js
// Tablas base para inventario porcicola (items y movimientos).
export const name = "2025-11-20-19_create_inventory_base";

export async function up(conn) {
  // items
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS inventory_items (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NOT NULL,
      branch_id INT NULL,
      sku VARCHAR(120) NULL,
      name VARCHAR(191) NOT NULL,
      unit VARCHAR(32) NULL,
      stock DECIMAL(14,3) DEFAULT 0,
      created_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_inv_items_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  // movimientos (entradas / salidas)
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS inventory_movements (
      id INT AUTO_INCREMENT PRIMARY KEY,
      company_id INT NOT NULL,
      branch_id INT NULL,
      item_id INT NOT NULL,
      movement_type ENUM('in','out') NOT NULL,
      quantity DECIMAL(14,3) NOT NULL,
      reference VARCHAR(191) NULL,
      movement_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      created_by INT NULL,
      CONSTRAINT fk_inv_mov_item FOREIGN KEY (item_id) REFERENCES inventory_items(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}
