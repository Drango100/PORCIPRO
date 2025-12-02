// routes/roles.routes.js

import { Router } from "express";
import { 
  getRoles,
  createRole,
  updateRole,
  deleteRole
} from "../controller/roles.controller.js";

const router = Router();

// Obtener roles
router.get("/rol", getRoles);

// Crear rol
router.post("/rol", createRole);

// Actualizar rol por ID
router.put("/rol/:id", updateRole);

// Eliminar rol por ID
router.delete("/rol/:id", deleteRole);

export default router;
