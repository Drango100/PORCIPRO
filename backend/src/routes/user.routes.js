import express from 'express';
import { crearUsuario, obtenerUsuarios } from '../controllers/user.controller.js';

const router = express.Router();

// POST /api/usuarios → registrar un nuevo usuario
router.post('/', crearUsuario);

// GET /api/usuarios → obtener lista de usuarios con sus roles
router.get('/', obtenerUsuarios);

export default router;
