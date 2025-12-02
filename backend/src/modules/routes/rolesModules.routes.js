// routes/rolesModules.routes.js
// Ruta para controlar accesos de módulos por rol

import { Router } from "express";
import {getRolesModules,assignRoleToModule,deleteRoleModule} from "../controller/rolesModules.controller.js";

const router = Router();

// Ver todas las relaciones
router.get("/", getRolesModules);

// Asignar módulo a rol
router.post("/", assignRoleToModule);

// Eliminar acceso
router.delete("/:id", deleteRoleModule);

export default router;
