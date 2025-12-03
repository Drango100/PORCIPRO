import { pool } from "../../db/index.js";

export const AuthService = {

  async getUserRoles(userId) {
    const [rows] = await pool.query(
      `SELECT r.id, r.name, r.description
       FROM user_roles ur
       JOIN roles r ON r.id = ur.role_id
       WHERE ur.user_id = ?`,
      [userId]
    );
    return rows;
  },

  async getUserPermissions(userId) {
    const [rows] = await pool.query(
      `SELECT DISTINCT p.id, p.name, p.description
       FROM user_roles ur
       JOIN role_permissions rp ON rp.role_id = ur.role_id
       JOIN permissions p ON p.id = rp.permission_id
       WHERE ur.user_id = ?`,
      [userId]
    );
    return rows;
  }
};
