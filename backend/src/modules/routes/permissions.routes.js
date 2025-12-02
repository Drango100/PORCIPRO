import { Router } from "express";

import {
  listPermissions,
  getPermission,
  createPermissionController,
  updatePermissionController,
  deletePermissionController,
} from "../controller/permissions.controller.js";

const router = Router();

// Listar todos los permisos
router.get("/listPermissions", listPermissions);

// Obtener un permiso por ID
router.get("/Permission/:id", getPermission);

// Crear un nuevo permiso
router.post("/", createPermissionController);

// Actualizar un permiso
router.put("/Permission/:id", updatePermissionController);

// Eliminar un permiso
router.delete("/Permission/:id", deletePermissionController);

export default router;
