import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = Router();

// Registrar usuario nuevo
router.post("/register", register);

// Iniciar sesión
router.post("/login", login);

export default router;
