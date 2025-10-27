import React, { useEffect, useState } from 'react';
import { getMarrano, deleteMarrano } from '../../../../services/ServiciosMarrano/IngresoMarranosService';
import { Plus, ClipboardList, Eye, Edit, Trash2 } from 'lucide-react';
import CrearIngresoMarrano from '../Marranos/CrearIngresoMarranoComponet';

function IngresoMarranoscomponent() {
  const [ingresos, setIngresos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    cargarIngresos();
  }, []);

  const cargarIngresos = async () => {
    try {
      const data = await getMarrano();
      setIngresos(data);
    } catch (error) {
      console.error('Error al obtener ingresos:', error);
    }
  };

  const eliminar = async (id) => {
    try {
      const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este ingreso?');
      if (confirmacion) {
        await deleteMarrano(id);
        cargarIngresos();
      }
    } catch (error) {
      console.error('Error al eliminar ingreso:', error);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <ClipboardList className="w-8 h-8 mr-3 text-green-600" />
            Registro de Marranos
          </h2>
          <p className="text-gray-600">Consulta de ingresos de marranos</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition"
        >
          <Plus className="text-white w-5 h-5 mr-2" />
          Nuevo Marrano
        </button>
      </div>

      {showForm && (
        <CrearIngresoMarrano
          onSubmit={() => {
            setShowForm(false);
            cargarIngresos();
          }}
        />
      )}

      {ingresos.length === 0 ? (
        <p className="text-center mt-4 text-gray-500">No hay ingresos registrados.</p>
      ) : (
        <table className="w-full mt-4 border-collapse">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Chapeta</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Nombre</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Raza</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Peso (kg)</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ingresos.map((ingreso) => (
              <tr
                key={ingreso.id}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-300"
              >
                <td className="py-4 px-4 font-semibold text-gray-900">{ingreso.chapeta}</td>
                <td className="py-4 px-4 text-gray-700">{ingreso.nombre}</td>
                <td className="py-4 px-4 text-gray-700">{ingreso.raza}</td>
                <td className="py-4 px-4 text-gray-700">{ingreso.peso_marrana} kg</td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => eliminar(ingreso.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default IngresoMarranoscomponent;
