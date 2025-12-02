import { pool } from "../../db/index.js";

/**
 * Obtiene todos los permisos
 */
export async function getAllPermissions() {
  const query = `SELECT * FROM permissions ORDER BY id`;
  const result = await pool.query(query);
  return result.rows;
}

/**
 * Obtiene un permiso por ID
 */
export async function getPermissionById(id) {
  const query = `SELECT * FROM permissions WHERE id = $1 LIMIT 1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
}

/**
 * Crea un nuevo permiso
 */
export async function createPermission(data) {
  const query = `
    INSERT INTO permissions (name, description)
    VALUES ($1, $2)
    RETURNING *
  `;
  const values = [data.name, data.description];
  const result = await pool.query(query, values);
  return result.rows[0];
}

/**
 * Actualiza un permiso existente
 */
export async function updatePermission(id, data) {
  const query = `
    UPDATE permissions
    SET name = $1, description = $2, updated_at = CURRENT_TIMESTAMP
    WHERE id = $3
    RETURNING *
  `;
  const values = [data.name, data.description, id];
  const result = await pool.query(query, values);
  return result.rows[0];
}

/**
 * Elimina un permiso
 */
export async function deletePermission(id) {
  const query = `DELETE FROM permissions WHERE id = $1`;
  await pool.query(query, [id]);
  return true;
}
