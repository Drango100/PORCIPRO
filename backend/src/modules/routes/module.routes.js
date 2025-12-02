// routes/module.routes.js
import { Router } from "express";
import {createModule,listModules,getModuleById,updateModule,deleteModule,activateModuleForCompany,deactivateModuleForCompany,listModulesByCompany,} from "../controller/module.controller.js";

const router = Router();

// CRUD de módulos (solo admins del sistema deberían usar esto)
// POST /api/modules
router.post("/createModule", createModule);

// GET /api/modules?onlyRoots=1
router.get("/listModules", listModules);

// GET /api/modules/:id
router.get("/getModuleById/:id", getModuleById);

// PUT /api/modules/:id
router.put("/updateModule/:id", updateModule);

// DELETE /api/modules/:id
router.delete("/deleteModule/:id", deleteModule);

// Activar / Desactivar módulo para una empresa (uso por superadmin o company_admin)
// POST /api/modules/activate
router.post("/activateModuleForCompany", activateModuleForCompany);

// POST /api/modules/deactivate
router.post("/deactivateModuleForCompany", deactivateModuleForCompany);
// Listar módulos activados por empresa
// GET /api/modules/company/:company_id
router.get("/company/:company_id", listModulesByCompany);

export default router;
