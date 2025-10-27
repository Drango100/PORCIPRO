import React, { useEffect, useState } from 'react';
import { getIngreso, deleteIngreso } from '../services/IngresoMarranaService';

const Ingresocomponent = () => {
  const [ingresos, setIngresos] = useState([]);

  useEffect(() => {
    cargarIngresos();
  }, []);

  const cargarIngresos = async () => {
    try {
      const data = await getIngreso();
      setIngresos(data);
    } catch (error) {
      console.error("Error al obtener ingresos", error);
    }
  };

  const eliminar = async (id) => {
    await deleteIngreso(id);
    cargarIngresos();
  };

  return (
    <div>
      <h2 className='text-center bg-blue-100'>Lista de Ingresos de Marranas</h2>
      <ul>
        {ingresos.map((ingreso) => (
          <li key={ingreso.id}>
            {ingreso.nombreMarrana} - {ingreso.fechaIngreso}
            <button onClick={() => eliminar(ingreso.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Ingresocomponent;

    

