import UserRoleModel from "../model/userRole.model.js";

const UserRoleController = {

    async getAll(req, res) {
        try {
            const data = await UserRoleModel.getAll();
            res.json(data);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener roles de usuarios" });
        }
    },

    async getById(req, res) {
        try {
            const { id } = req.params;
            const data = await UserRoleModel.getById(id);

            if (!data)
                return res.status(404).json({ message: "Asignación no encontrada" });

            res.json(data);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener asignación" });
        }
    },

    async assign(req, res) {
        try {
            const { user_id, role_id } = req.body;

            const assigned = await UserRoleModel.assignRole(user_id, role_id);

            res.status(201).json({
                message: "Rol asignado correctamente",
                data: assigned
            });
        } catch (error) {
            res.status(500).json({ error: "Error al asignar rol al usuario" });
        }
    },

    async remove(req, res) {
        try {
            const { id } = req.params;

            const deleted = await UserRoleModel.remove(id);

            if (!deleted)
                return res.status(404).json({ message: "Asignación no encontrada" });

            res.json({ message: "Rol removido correctamente" });

        } catch (error) {
            res.status(500).json({ error: "Error al remover rol" });
        }
    },

    async getRolesByUser(req, res) {
        try {
            const { userId } = req.params;

            const roles = await UserRoleModel.getRolesByUser(userId);
            res.json(roles);

        } catch (error) {
            res.status(500).json({ error: "Error al obtener roles del usuario" });
        }
    }

};

export default UserRoleController;
