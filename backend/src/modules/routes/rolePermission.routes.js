import { Router } from "express";
import RolePermissionController from "../controller/rolePermission.controller.js";

const router = Router();

// Listar todas las asignaciones
router.get("/", RolePermissionController.getAll);

// Obtener una asignación por ID
router.get("/:id", RolePermissionController.getById);

// Asignar permiso a rol
router.post("/", RolePermissionController.assign);

// Remover permiso a rol
router.delete("/:id", RolePermissionController.remove);

// Obtener permisos de un rol
router.get("/role/:roleId", RolePermissionController.getPermissionsByRole);

export default router;
