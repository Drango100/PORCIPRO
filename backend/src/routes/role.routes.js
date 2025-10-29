import express from 'express';
import { crearRol, obtenerRoles } from '../controllers/role.controller.js';

const router = express.Router();

// POST /api/roles → crear nuevo rol
router.post('/', crearRol);

// GET /api/roles → obtener todos los roles
router.get('/', obtenerRoles);

export default router;
