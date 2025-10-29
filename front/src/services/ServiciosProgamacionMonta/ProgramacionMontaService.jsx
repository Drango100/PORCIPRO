import axios from 'axios';
import { API_URL } from '../../config/config';

const API = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});
//Buscar ingreso
export const getProgramacion = async () => {
    const res = await API.get('ConsultaProgramacionMonta');
    return res.data;
};
// Nuevo ingreso
export const newProgramacion = async (data) => {
    const res = await API.post('NuevaProgramacionMonta', data);
    return res.data;
};

// Agregar si luego quieres eliminar
export const deleteProgramacion = async (id) => {
    const res = await API.delete(`/BorrarProgramacionMonta/${id}`);
    return res.data;
};
//Actualizar datos del ingreso
export const updateProgramacion = async (id, data) => {
    const res = await API.put(`/ActualizarProgramacionMonta/${id}`, data);
    return res.data;
};
