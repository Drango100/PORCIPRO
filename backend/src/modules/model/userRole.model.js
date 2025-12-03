import { pool } from "../../db/index.js";

const UserRoleModel = {

    // Obtener todas las asignaciones usuario-rol
    async getAll() {
        const query = `
            SELECT ur.id, ur.user_id, u.name AS user_name,
                   ur.role_id, r.name AS role_name
            FROM user_roles ur
            INNER JOIN users u ON u.id = ur.user_id
            INNER JOIN roles r ON r.id = ur.role_id
            ORDER BY ur.id ASC
        `;
        const { rows } = await pool.query(query);
        return rows;
    },

    // Obtener asignación por ID
    async getById(id) {
        const query = `
            SELECT ur.id, ur.user_id, u.name AS user_name,
                   ur.role_id, r.name AS role_name
            FROM user_roles ur
            INNER JOIN users u ON u.id = ur.user_id
            INNER JOIN roles r ON r.id = ur.role_id
            WHERE ur.id = $1
        `;
        const { rows } = await pool.query(query, [id]);
        return rows[0] || null;
    },

    // Asignar un rol a un usuario
    async assignRole(userId, roleId) {
        const query = `
            INSERT INTO user_roles (user_id, role_id)
            VALUES ($1, $2)
            RETURNING id, user_id, role_id
        `;
        const { rows } = await pool.query(query, [userId, roleId]);
        return rows[0];
    },

    // Eliminar asignación
    async remove(id) {
        const query = `
            DELETE FROM user_roles
            WHERE id = $1
            RETURNING id
        `;
        const { rows } = await pool.query(query, [id]);
        return rows[0] || null;
    },

    // Obtener roles de un usuario
    async getRolesByUser(userId) {
        const query = `
            SELECT r.id, r.name, r.description
            FROM user_roles ur
            INNER JOIN roles r ON r.id = ur.role_id
            WHERE ur.user_id = $1
        `;
        const { rows } = await pool.query(query, [userId]);
        return rows;
    }
};

export default UserRoleModel;
