import axios from 'axios';
import { API_URL } from '../../config/confing';

const API = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
//Buscar ingreso
export const getMarrano = async () => {
    const res = await API.get('ConsultaMarrano');
    return res.data;
};
// Nuevo ingreso
export const newMarrano = async (data) => {
    const res = await API.post('IngresoMarrano', data);
    return res.data;
};

// Agregar si luego quieres eliminar
export const deleteMarrano = async (id) => {
    const res = await API.delete(`/BorrarMarrano/${id}`);
    return res.data;
};
//Actualizar datos del ingreso
export const updateMarrano = async (id, data) => {
    const res = await API.put(`/ActualizarMarrano/${id}`, data);
    return res.data;
};
