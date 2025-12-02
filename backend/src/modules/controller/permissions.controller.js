import {
  getAllPermissions,
  getPermissionById,
  createPermission,
  updatePermission,
  deletePermission,
} from "../model/permissions.model.js";

/**
 * Controlador: Listar todos los permisos
 */
export const listPermissions = async (req, res) => {
  try {
    const permissions = await getAllPermissions();
    res.json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controlador: Obtener un permiso por ID
 */
export const getPermission = async (req, res) => {
  try {
    const { id } = req.params;
    const permission = await getPermissionById(id);

    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }

    res.json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controlador: Crear un permiso
 */
export const createPermissionController = async (req, res) => {
  try {
    const permission = await createPermission(req.body);
    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controlador: Actualizar un permiso
 */
export const updatePermissionController = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await updatePermission(id, req.body);

    if (!updated) {
      return res.status(404).json({ message: "Permission not found" });
    }

    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Controlador: Eliminar un permiso
 */
export const deletePermissionController = async (req, res) => {
  try {
    const { id } = req.params;
    await deletePermission(id);
    res.json({ message: "Permission deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
