import { Router } from "express";
import { getUsers, getUserById, deleteUser } from "../controllers/user.controller.js";
import { verifyToken, isAdmin } from "../middlewares/authJwt.js";

const router = Router();

// Listar todos los usuarios (solo admin)
router.get("/", [verifyToken, isAdmin], getUsers);

// Ver usuario por ID
router.get("/:id", [verifyToken], getUserById);

// Eliminar usuario
router.delete("/:id", [verifyToken, isAdmin], deleteUser);

export default router;