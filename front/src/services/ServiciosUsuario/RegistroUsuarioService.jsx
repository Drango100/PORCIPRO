import axios from 'axios';
import { API_URL } from '../../config/api';


export async function registerUser(payload) {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: err.message || 'Error de registro' };
  }
}

export function validateRegisterPayload(payload) {
  const errors = {};
  
  if (!payload.nombre?.trim()) {
    errors.nombre = 'El nombre es requerido';
  }
  
  if (!payload.correo) {
    errors.correo = 'El correo es requerido';
  } else if (!/\S+@\S+\.\S+/.test(payload.correo)) {
    errors.correo = 'Correo inválido';
  }
  
  if (!payload.password) {
    errors.password = 'La contraseña es requerida';
  } else if (payload.password.length < 6) {
    errors.password = 'La contraseña debe tener al menos 6 caracteres';
  }
  
  if (payload.password !== payload.confirmar) {
    errors.confirmar = 'Las contraseñas no coinciden';
  }
  
  return errors;
}