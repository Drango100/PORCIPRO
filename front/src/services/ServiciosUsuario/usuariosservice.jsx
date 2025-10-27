import axios from 'axios';
import {API_URL} from '../../config/api.jsx';

const authHeader = (token) => ({
  headers: { Authorization: `Bearer ${token}` }
});

/*
  login(email, password)
  - Hace POST a /auth/login con email/password
  - Retorna res.data (normalmente { user, token }) si tiene éxito
  - Lanza el error recibido para que el componente lo maneje
  Firmado: GitHub Copilot
*/
export async function login(email, password) {
  try {
    const res = await axios.post(`${API_URL}/auth/login`, { email, password });
    return res.data;
  } catch (err) {
    // Normalizar error: lanzar objeto con info del servidor si existe
    throw err.response?.data || { message: err.message || 'Error de red' };
  }
}

/*
  registerUser(payload)
  - Crea un nuevo usuario (registro) enviando payload al endpoint correspondiente
  - payload puede contener { name, email, password, ... }
  - Retorna res.data
  Firmado: GitHub Copilot
*/
export async function registerUser(payload) {
  try {
    const res = await axios.post(`${API_URL}/auth/register`, payload);
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: err.message || 'Error de red' };
  }
}

/*
  getCurrentUser(token)
  - Llama a /auth/me (o el endpoint que tu backend exponga) para obtener datos del usuario actual
  - Requiere token (Bearer). Si usas almacenamiento local, puedes leerlo antes de llamar.
  - Retorna res.data
  Firmado: GitHub Copilot
*/
export async function getCurrentUser(token) {
  try {
    const res = await axios.get(`${API_URL}/auth/me`, authHeader(token));
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: err.message || 'Error de red' };
  }
}

/*
  getUserById(id, token)
  - Obtiene un usuario por id (ejemplo /users/:id)
  - Retorna res.data
  Firmado: GitHub Copilot
*/
export async function getUserById(id, token) {
  try {
    const res = await axios.get(`${API_URL}/users/${id}`, authHeader(token));
    return res.data;
  } catch (err) {
    throw err.response?.data || { message: err.message || 'Error de red' };
  }
}

/*
  saveToken(token) / getToken()
  - Helpers para manejar token en localStorage
  Firmado: GitHub Copilot
*/
export function saveToken(token) {
  if (token) localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

/*
  logout()
  - Borra token local y puede realizar llamadas de logout si el backend lo requiere
  Firmado: GitHub Copilot
*/
export function logout() {
  localStorage.removeItem('token');
  // Si tu backend tiene endpoint de logout, puedes llamarlo aquí:
  // return axios.post(`${API_URL}/auth/logout`);
}