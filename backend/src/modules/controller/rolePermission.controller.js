import RolePermissionModel from "../model/rolePermission.model.js";

const RolePermissionController = {

    async getAll(req, res) {
        try {
            const data = await RolePermissionModel.getAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener asignaciones de permisos" });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const data = await RolePermissionModel.getById(id);

            if (!data) return res.status(404).json({ message: "Asignación no encontrada" });

            res.json(data);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener asignación" });
        }
    },

    async assign(req, res) {
        try {
            const { role_id, permission_id } = req.body;

            const assigned = await RolePermissionModel.assignPermission(role_id, permission_id);

            res.status(201).json({
                message: "Permiso asignado correctamente",
                data: assigned
            });
        } catch (error) {
            res.status(500).json({ error: "Error al asignar permiso al rol" });
        }
    },

    async remove(req, res) {
        try {
            const { id } = req.params;

            const deleted = await RolePermissionModel.removePermission(id);

            if (!deleted) {
                return res.status(404).json({ message: "Asignación no encontrada" });
            }

            res.json({ message: "Permiso removido correctamente" });

        } catch (error) {
            res.status(500).json({ error: "Error al remover permiso del rol" });
        }
    },

    async getPermissionsByRole(req, res) {
        try {
            const { roleId } = req.params;

            const permissions = await RolePermissionModel.getPermissionsByRole(roleId);

            res.json(permissions);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener permisos del rol" });
        }
    }
};

export default RolePermissionController;
