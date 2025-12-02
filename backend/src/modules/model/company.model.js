import {pool} from "../../db/index.js";

/**
 * Modelo Company
 * Este modelo representa una empresa dentro de tu sistema SaaS.
 * Cada empresa puede tener múltiples sedes y múltiples usuarios.
 */
export class CompanyModel {

  /**
   * Crear una empresa nueva
   * @param {Object} data - Datos enviados desde el controlador
   */
  static async create(data) {
    const { name, nit, address, phone } = data;

    const [result] = await pool.execute(
      `INSERT INTO companies (name, nit, address, phone)
       VALUES (?, ?, ?, ?)`,
      [name, nit, address, phone]
    );

    return result.insertId; // Retorna el ID creado
  }

  /**
   * Obtener todas las empresas
   */
  static async findAll() {
    const [rows] = await pool.execute(`SELECT * FROM companies`);
    return rows;
  }

  /**
   * Buscar empresa por ID
   */
  static async findById(id) {
    const [rows] = await pool.execute(
      `SELECT * FROM companies WHERE id = ?`,
      [id]
    );
    return rows[0];
  }

  /**
   * Actualizar una empresa
   */
  static async update(id, data) {
    const { name, nit, address, phone } = data;

    await pool.execute(
      `UPDATE companies
       SET name = ?, nit = ?, address = ?, phone = ?
       WHERE id = ?`,
      [name, nit, address, phone, id]
    );

    return true;
  }

  /**
   * Eliminar empresa
   */
  static async delete(id) {
    await pool.execute(`DELETE FROM companies WHERE id = ?`, [id]);
    return true;
  }
}
