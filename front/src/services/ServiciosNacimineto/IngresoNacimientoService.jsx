import axios from 'axios';
import { API_URL } from '../../config/config';

const API = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
//Buscar ingreso
export const getNacimientos = async () => {
    const res = await API.get('ConsultaNacimiento');
    return res.data;
};
// Nuevo ingreso
export const newIngreso = async (data) => {
    const res = await API.post('NuevoNacimiento', data);
    return res.data;
};

// Agregar si luego quieres eliminar
export const deleteIngreso = async (id) => {
    const res = await API.delete(`/BorrarNacimiento/${id}`);
    return res.data;
};
//Actualizar datos del ingreso
export const updateIngreso = async (id, data) => {
    const res = await API.put(`/ActualizarNacimiento/${id}`, data);
    return res.data;
};
