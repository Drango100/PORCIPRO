// 2025-11-20-09_create_roles_modules.js
// Relación entre roles y módulos con permisos básicos (view/create/edit/delete).
export const name = "2025-11-20-09_create_roles_modules";

export async function up(conn) {
  await conn.execute(`
    CREATE TABLE IF NOT EXISTS roles_modules (
      id INT AUTO_INCREMENT PRIMARY KEY,
      role_id INT NOT NULL,
      module_id INT NOT NULL,
      can_view TINYINT(1) NOT NULL DEFAULT 1,
      can_create TINYINT(1) NOT NULL DEFAULT 0,
      can_edit TINYINT(1) NOT NULL DEFAULT 0,
      can_delete TINYINT(1) NOT NULL DEFAULT 0,
      granted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      CONSTRAINT fk_rolesmodules_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
      CONSTRAINT fk_rolesmodules_module FOREIGN KEY (module_id) REFERENCES modules(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}
