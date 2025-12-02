// Modelo Module: representa módulos y submódulos del sistema.
// Cada módulo puede tener parent_id -> jerarquía (módulo principal / submódulo).
import {pool} from "../../db/index.js";

export class ModuleModel {
  /**
   * Crear un módulo (o submódulo si parent_id != null)
   * data: { key_name, name, parent_id, description }
   */
  static async create(data) {
    const { key_name = null, name, parent_id = null, description = null } = data;

    const [result] = await pool.execute(
      `INSERT INTO modules (key_name, name, parent_id, description, created_at)
       VALUES (?, ?, ?, ?, NOW())`,
      [key_name, name, parent_id, description]
    );

    return result.insertId;
  }

  /**
   * Listar todos los módulos (opcional: solo raíces o incluir submódulos)
   * options: { onlyRoots: boolean }
   */
  static async findAll(options = {}) {
    if (options.onlyRoots) {
      const [rows] = await pool.execute(`SELECT * FROM modules WHERE parent_id IS NULL ORDER BY id`);
      return rows;
    }
    const [rows] = await pool.execute(`
      SELECT m.*, p.name as parent_name
      FROM modules m
      LEFT JOIN modules p ON m.parent_id = p.id
      ORDER BY IFNULL(m.parent_id, m.id), m.id
    `);
    return rows;
  }

  /**
   * Obtener módulo por ID (incluye parent si existe)
   */
  static async findById(id) {
    const [rows] = await pool.execute(
      `SELECT m.*, p.name as parent_name
       FROM modules m
       LEFT JOIN modules p ON m.parent_id = p.id
       WHERE m.id = ?`,
      [id]
    );
    return rows[0];
  }

  /**
   * Actualizar módulo
   */
  static async update(id, data) {
    const { key_name = null, name = null, parent_id = null, description = null } = data;

    await pool.execute(
      `UPDATE modules
       SET key_name = COALESCE(?, key_name),
           name = COALESCE(?, name),
           parent_id = ?,
           description = COALESCE(?, description)
       WHERE id = ?`,
      [key_name, name, parent_id, description, id]
    );

    return true;
  }

  /**
   * Eliminar módulo (y por FK ON DELETE CASCADE sus submódulos si aplica)
   */
  static async delete(id) {
    await pool.execute(`DELETE FROM modules WHERE id = ?`, [id]);
    return true;
  }
}
