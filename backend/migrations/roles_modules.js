export const name = "2025-10-18-07_create_roles_modules";

export async function up(conn) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS roles_modules (
      id INT AUTO_INCREMENT PRIMARY KEY,
      role_id INT NOT NULL,
      module_id INT NOT NULL,
      can_view BOOLEAN DEFAULT TRUE,
      can_create BOOLEAN DEFAULT FALSE,
      can_edit BOOLEAN DEFAULT FALSE,
      can_delete BOOLEAN DEFAULT FALSE,
      FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
      FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}
