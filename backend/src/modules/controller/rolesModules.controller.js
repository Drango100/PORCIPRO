// Controlador para asignar o ver qué módulos puede usar cada rol.

import {findAllRoleModules,assignRoleToModuleDB,deleteRoleModuleDB,} from "../model/rolesModules.model.js";

/**
 * Listar todos los accesos de roles a módulos
 */
export const getRolesModules = async (req, res) => {
  try {
    const data = await findAllRoleModules();
    res.json(data);
  } catch (error) {
    console.error("Error obteniendo roles-módulos:", error);
    res.status(500).json({ message: "Error al obtener roles-módulos" });
  }
};

/**
 * Asignar módulo a rol
 */
export const assignRoleToModule = async (req, res) => {
  try {
    const { role_id, module_id } = req.body;

    if (!role_id || !module_id)
      return res.status(400).json({ message: "role_id y module_id son obligatorios" });

    const id = await assignRoleToModuleDB(role_id, module_id);

    res.json({
      message: "Módulo asignado al rol con éxito",
      relation_id: id,
    });
  } catch (error) {
    console.error("Error asignando módulo a rol:", error);
    res.status(500).json({ message: "Error al asignar módulo al rol" });
  }
};

/**
 * Eliminar relación rol → módulo
 */
export const deleteRoleModule = async (req, res) => {
  try {
    const { id } = req.params;

    await deleteRoleModuleDB(id);

    res.json({ message: "Acceso rol-módulo eliminado correctamente" });
  } catch (error) {
    console.error("Error eliminando rol-módulo:", error);
    res.status(500).json({ message: "Error eliminando rol-módulo" });
  }
};
