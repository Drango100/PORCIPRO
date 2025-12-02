// Este archivo actúa como el "MODELO" de la tabla roles.

import {pool} from "../../db/index.js";

/**
 * Obtener todos los roles
 */
export const findAllRoles = async () => {
  const [rows] = await pool.query("SELECT * FROM roles ORDER BY id ASC");
  return rows;
};

/**
 * Obtener un rol por ID
 */
export const findRoleById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM roles WHERE id = ?", [id]);
  return rows[0];
};

/**
 * Crear un nuevo rol
 */
export const createRoleDB = async ({ name, description, is_system }) => {
  const [result] = await pool.query(
    `INSERT INTO roles (name, description, is_system)
     VALUES (?, ?, ?)`,
    [name, description, is_system ?? 0]
  );

  return result.insertId;
};

/**
 * Actualizar rol por ID
 */
export const updateRoleDB = async (id, { name, description, is_system }) => {
  await pool.query(
    `UPDATE roles SET name=?, description=?, is_system=? WHERE id=?`,
    [name, description, is_system, id]
  );
};

/**
 * Eliminar rol por ID
 */
export const deleteRoleDB = async (id) => {
  await pool.query("DELETE FROM roles WHERE id=?", [id]);
};
