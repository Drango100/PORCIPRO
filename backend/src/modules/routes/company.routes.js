// routes/company.routes.js

import { Router } from "express";
import {createCompany,getCompanies,getCompanyById,updateCompany,deleteCompany,} from "../controller/company.controller.js";

const router = Router();

// Crear empresa
router.post("/company", createCompany);

// Listar empresas
router.get("/companys", getCompanies);

// Obtener empresa por ID
router.get("/company/:id", getCompanyById);

// Actualizar empresa
router.put("/company/:id", updateCompany);

// Eliminar empresa
router.delete("/company/:id", deleteCompany);

export default router;
