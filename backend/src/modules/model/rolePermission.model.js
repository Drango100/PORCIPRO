import {pool} from "../../db/index.js";

const RolePermissionModel = {

    async getAll() {
        const query = `
            SELECT rp.id, rp.role_id, r.name AS role_name,
                   rp.permission_id, p.name AS permission_name
            FROM role_permissions rp
            INNER JOIN roles r ON r.id = rp.role_id
            INNER JOIN permissions p ON p.id = rp.permission_id
            ORDER BY rp.id ASC
        `;
        const { rows } = await pool.query(query);
        return rows;
    },

    async getById(id) {
        const query = `
            SELECT rp.id, rp.role_id, r.name AS role_name,
                   rp.permission_id, p.name AS permission_name
            FROM role_permissions rp
            INNER JOIN roles r ON r.id = rp.role_id
            INNER JOIN permissions p ON p.id = rp.permission_id
            WHERE rp.id = $1
        `;
        const { rows } = await pool.query(query, [id]);
        return rows[0] || null;
    },

    async assignPermission(roleId, permissionId) {
        const query = `
            INSERT INTO role_permissions (role_id, permission_id)
            VALUES ($1, $2)
            RETURNING id, role_id, permission_id
        `;
        const { rows } = await pool.query(query, [roleId, permissionId]);
        return rows[0];
    },

    async removePermission(id) {
        const query = `
            DELETE FROM role_permissions
            WHERE id = $1
            RETURNING id
        `;
        const { rows } = await pool.query(query, [id]);
        return rows[0] || null;
    },

    async getPermissionsByRole(roleId) {
        const query = `
            SELECT p.id, p.name, p.description
            FROM role_permissions rp
            INNER JOIN permissions p ON p.id = rp.permission_id
            WHERE rp.role_id = $1
        `;
        const { rows } = await pool.query(query, [roleId]);
        return rows;
    }
};

export default RolePermissionModel;