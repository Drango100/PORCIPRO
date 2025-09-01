import { useState } from 'react';
import { newIngreso } from '../../../../services/ServiciosMarrana/IngresoMarranasService';

export function CrearIngresoMarrana({ onSubmit }) {
  const [crear, setCrear] = useState({
    chapeta: '',
    nombre: '',
    raza: '',
    peso_marrana: '',
    fecha_Ingreso: '',
    estado_marrana: 'Disponible'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCrear({ ...crear, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Datos enviados:', crear);

    try {
      const response = await newIngreso(crear);
      console.log('Respuesta del servidor:', response);
      if (onSubmit) onSubmit(crear);
    } catch (error) {
      console.error('Error en el envío:', error);
    }

    setCrear({
      chapeta: '',
      nombre: '',
      raza: '',
      fecha_Ingreso: '',
      peso_marrana: '',
      estado_marrana: 'Disponible'
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-xl shadow-md max-w-4xl mx-auto mt-6"
    >
      <h2 className="text-2xl font-bold mb-6">Registrar Nueva Marrana</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Chapeta */}
        <div>
          <label htmlFor="chapeta" className="block font-semibold mb-1">
           N° Chapeta
          </label>
          <input
            type="text"
            name="chapeta"
            id="chapeta"
            value={crear.chapeta}
            onChange={handleChange}
            placeholder="Número de Chapeta"
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Nombre */}
        <div>
          <label htmlFor="nombre" className="block font-semibold mb-1">
            Nombre
          </label>
          <input
            type="text"
            name="nombre"
            id="nombre"
            value={crear.nombre}
            onChange={handleChange}
            placeholder="Nombre de la marrana"
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Raza */}
        <div>
          <label htmlFor="raza" className="block font-semibold mb-1">
            Raza
          </label>
          <select
            name="raza"
            id="raza"
            value={crear.raza}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="">Seleccionar raza</option>
            <option value="Landrace">Landrace</option>
            <option value="Yorkshire">Yorkshire</option>
            <option value="Duroc">Duroc</option>
            <option value="Pietrain">Pietrain</option>
          </select>
        </div>

        {/* Fecha de Ingreso */}
        <div>
          <label htmlFor="fecha_Ingreso" className="block font-semibold mb-1">
            Fecha de Ingreso
          </label>
          <input
            type="date"
            name="fecha_Ingreso"
            id="fecha_Ingreso"
            value={crear.fecha_Ingreso}
            onChange={handleChange}
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Peso */}
        <div>
          <label htmlFor="peso_marrana" className="block font-semibold mb-1">
            Peso (kg)
          </label>
          <input
            type="number"
            name="peso_marrana"
            id="peso_marrana"
            value={crear.peso_marrana}
            onChange={handleChange}
            placeholder="Peso en kilogramos"
            required
            className="w-full border rounded-lg px-4 py-2"
          />
        </div>

        {/* Estado */}
        <div>
          <label htmlFor="estado_marrana" className="block font-semibold mb-1">
            Estado
          </label>
          <select
            name="estado_marrana"
            id="estado_marrana"
            value={crear.estado_marrana}
            onChange={handleChange}
            className="w-full border rounded-lg px-4 py-2"
          >
            <option value="Disponible">Disponible</option>
            <option value="Preñada">Preñada</option>
            <option value="En Reposición">En Reposición</option>
          </select>
        </div>
      </div>

      {/* Botones */}
      <div className="mt-6 flex justify-start space-x-4">
        <button
          type="submit"
          className="bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
        >
          Guardar Marrana
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

export default CrearIngresoMarrana;
