// Modelo para activar/desactivar módulos por empresa (company_modules).
// Esto permite que cada tenant active solo los módulos que necesite.

import {pool} from "../../db/index.js";

export class CompanyModuleModel {
  /**
   * Activar un módulo para una empresa
   * data: { company_id, module_id, enabled (true/false) }
   */
  static async activate(company_id, module_id) {
    // Si ya existe, aseguramos que esté enabled = 1
    const [rows] = await pool.execute(
      `SELECT id FROM company_modules WHERE company_id = ? AND module_id = ?`,
      [company_id, module_id]
    );

    if (rows.length) {
      await pool.execute(
        `UPDATE company_modules SET enabled = 1, updated_at = NOW() WHERE id = ?`,
        [rows[0].id]
      );
      return rows[0].id;
    }

    const [result] = await pool.execute(
      `INSERT INTO company_modules (company_id, module_id, enabled, created_at)
       VALUES (?, ?, 1, NOW())`,
      [company_id, module_id]
    );

    return result.insertId;
  }

  /**
   * Desactivar módulo para empresa (soft)
   */
  static async deactivate(company_id, module_id) {
    await pool.execute(
      `UPDATE company_modules SET enabled = 0, updated_at = NOW() WHERE company_id = ? AND module_id = ?`,
      [company_id, module_id]
    );
    return true;
  }

  /**
   * Listar módulos activados por company_id
   */
  static async listByCompany(company_id) {
    const [rows] = await pool.execute(
      `SELECT cm.*, m.name, m.key_name, m.parent_id
       FROM company_modules cm
       JOIN modules m ON m.id = cm.module_id
       WHERE cm.company_id = ?
       ORDER BY m.parent_id, m.id`,
      [company_id]
    );
    return rows;
  }

  /**
   * Check si módulo está activado
   */
  static async isActivated(company_id, module_id) {
    const [rows] = await pool.execute(
      `SELECT enabled FROM company_modules WHERE company_id = ? AND module_id = ? LIMIT 1`,
      [company_id, module_id]
    );
    if (!rows.length) return false;
    return rows[0].enabled == 1;
  }
}
