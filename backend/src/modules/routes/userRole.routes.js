import { Router } from "express";
import UserRoleController from "../controller/userRole.controller.js";

const router = Router();

// Listar todos
router.get("/", UserRoleController.getAll);

// Obtener por ID
router.get("/:id", UserRoleController.getById);

// Asignar rol
router.post("/", UserRoleController.assign);

// Eliminar asignación
router.delete("/:id", UserRoleController.remove);

// Obtener roles de un usuario
router.get("/user/:userId", UserRoleController.getRolesByUser);

export default router;
