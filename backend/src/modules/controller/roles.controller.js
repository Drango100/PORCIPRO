// controllers/roles.controller.js
import {findAllRoles,findRoleById,createRoleDB,updateRoleDB,deleteRoleDB,} from "../model/role.model.js";

/**
 * Obtener todos los roles
 */
export const getRoles = async (req, res) => {
  try {
    const roles = await findAllRoles();
    res.json(roles);
  } catch (error) {
    console.error("Error obteniendo roles:", error);
    res.status(500).json({ message: "Error al obtener roles" });
  }
};

/**
 * Crear rol
 */
export const createRole = async (req, res) => {
  try {
    const { name, description, is_system } = req.body;

    const insertId = await createRoleDB({ name, description, is_system });

    res.json({
      message: "Rol creado exitosamente",
      role_id: insertId,
    });
  } catch (error) {
    console.error("Error creando rol:", error);
    res.status(500).json({ message: "Error al crear rol" });
  }
};

/**
 * Actualizar rol
 */
export const updateRole = async (req, res) => {
  try {
    const { id } = req.params;
    const role = await findRoleById(id);

    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    const { name, description, is_system } = req.body;
    await updateRoleDB(id, { name, description, is_system });

    res.json({ message: "Rol actualizado correctamente" });
  } catch (error) {
    console.error("Error actualizando rol:", error);
    res.status(500).json({ message: "Error al actualizar rol" });
  }
};

/**
 * Eliminar rol
 */
export const deleteRole = async (req, res) => {
  try {
    const { id } = req.params;

    const role = await findRoleById(id);

    if (!role) {
      return res.status(404).json({ message: "Rol no encontrado" });
    }

    await deleteRoleDB(id);

    res.json({ message: "Rol eliminado correctamente" });
  } catch (error) {
    console.error("Error eliminando rol:", error);
    res.status(500).json({ message: "Error al eliminar rol" });
  }
};
