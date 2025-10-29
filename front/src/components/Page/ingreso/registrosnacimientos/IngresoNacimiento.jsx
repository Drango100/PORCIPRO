import { useState } from 'react'
import { newIngreso } from '../../../../services/ServiciosNacimineto/IngresoNacimientoService';

export default function CrearNacimiento({ onSubmit }) {
  const [crear, setCrear] = useState({
    id_camada: '',
    no_marrano: '',
    peso_aprox_marranos: '',
  })
  const handleChange = (e) => {
    const { name, value } = e.target
    setCrear({ ...crear, [name]: value })
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  const data = {
    id_camada: crear.id_camada.trim(),
    no_marranos: crear.no_marrano.trim(),
    peso_aprox_marranos: crear.peso_aprox_marranos.trim(),
  };

  if (!data.id_camada || !data.no_marranos || !data.peso_aprox_marranos) {
    alert("Todos los campos son obligatorios.");
    return;
  }

  try {
    const response = await newIngreso(data);
    console.log('Respuesta del servidor:', response);
    if (onSubmit) onSubmit(data);
  } catch (error) {
    console.error('Error en el envío:', error);
    console.log('Detalles del error:', error.response?.data);
  }

  setCrear({
    id_camada: '',
    no_marrano: '',
    peso_aprox_marranos: '',
  });
};



 return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto mt-6"
    >
      <h2 className="text-2xl font-bold mb-6">Registrar Nuevo Nacimiento</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* ID Camada */}
        <div>
          <label htmlFor="id_camada" className="block font-semibold mb-1">
           N° Camada
          </label>
          <input
            type="text"
            name="id_camada"
            id="id_camada"
            value={crear.id_camada}
            onChange={handleChange}
            placeholder="Número de Camada"
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* N° Marrano */}
        <div>
          <label htmlFor="nombre" className="block font-semibold mb-1">
            N° Marrano
          </label>
          <input
            type="text"
            name="no_marrano"
            id="no_marrano"
            value={crear.no_marrano}
            onChange={handleChange}
            placeholder="Número de Marrano"
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Peso */}
        <div>
          <label htmlFor="peso_aprox_marranos" className="block font-semibold mb-1">
            Peso (kg)
          </label>
          <input
            type="number"
            name="peso_aprox_marranos"
            id="peso_aprox_marranos"
            value={crear.peso_aprox_marranos}
            onChange={handleChange}
            placeholder="Peso aproximado de Marranos (kg)"
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>
      </div>

      {/* Botones */}
      <div className="mt-6 flex justify-start space-x-4">
        <button
          type="submit"
          className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Guardar Nacimiento
        </button>
        <button
          type="button"
          onClick={() => onSubmit?.()}
          className="border border-pink-500 text-pink-600 px-6 py-2 rounded-lg hover:bg-green-50 transition"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}
