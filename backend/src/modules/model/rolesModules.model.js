// Este modelo maneja la tabla roles_modules.
// Define qué rol tiene acceso a qué módulo.

import {pool} from "../../db/index.js";

/**
 * Obtener todas las asignaciones rol-módulo
 */
export const findAllRoleModules = async () => {
  const [rows] = await pool.query(`
    SELECT rm.id, r.name AS role, m.name AS module
    FROM roles_modules rm
    INNER JOIN roles r ON r.id = rm.role_id
    INNER JOIN modules m ON m.id = rm.module_id
  `);
  return rows;
};

/**
 * Crear una relación rol → módulo
 */
export const assignRoleToModuleDB = async (role_id, module_id) => {
  const [result] = await pool.query(
    `INSERT INTO roles_modules (role_id, module_id)
     VALUES (?, ?)`,
    [role_id, module_id]
  );
  return result.insertId;
};

/**
 * Eliminar una relación
 */
export const deleteRoleModuleDB = async (id) => {
  await pool.query(`DELETE FROM roles_modules WHERE id = ?`, [id]);
};
