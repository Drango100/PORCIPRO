import React, { useEffect, useState } from 'react';
import { Plus, Eye, Edit, Trash2, ClipboardList } from 'lucide-react';
import CrearIngresoMarrana from './CrearIngresoMarranaComponet';
import { getIngreso, deleteIngreso } from '../../../../services/ServiciosMarrana/IngresoMarranasService';

function IngresoMarranascomponent() {
  const [ingresos, setIngresos] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    cargarIngresos();
  }, []);

  const cargarIngresos = async () => {
    try {
      const data = await getIngreso();
      setIngresos(data);
    } catch (error) {
      console.error('Error al obtener ingresos', error);
    }
  };

  const eliminar = async (id) => {
    try {
      const confirmacion = window.confirm('¿Estás seguro de que deseas eliminar este ingreso?');
      if (confirmacion) {
        await deleteIngreso(id);
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
                <h2 className="text-3xl font-bold text-gray-900 flex items-center"><ClipboardList className='w-8 h-8 mr-3 text-pink
                -600'/> Registro de Marranas</h2>
                <p className="text-gray-600">Consulta y gestión de ingresos de marranas</p>
            </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="flex items-center bg-pink-500 hover:bg-pink-600 text-white font-semibold py-2 px-4 rounded transition"
          >
            <Plus className="text-gray-100 w-5 h-5 mr-2" />
            Nueva Marrana
          </button>
        </div>

      {showForm && (
        <CrearIngresoMarrana
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
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Código</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Nombre</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Raza</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Peso (kg)</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Estado</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">N° Partos</th>
              <th className="text-left py-4 px-4 font-semibold text-gray-900">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {ingresos.map((ingreso) => {
              
              return (
                <tr
                  key={ingreso.id}
                  className="border-b border-gray-100 hover:bg-gray-50 transition-colors duration-300"
                >
                  <td className="py-4 px-4">
                    <span className="font-semibold text-gray-900">{ingreso.chapeta}</span>
                  </td>
                  <td className="py-4 px-4 text-gray-700">{ingreso.nombre}</td>
                  <td className="py-4 px-4 text-gray-700">{ingreso.raza}</td>
                  <td className="py-4 px-4 text-gray-700">{ingreso.peso_marrana} kg</td>
                  <td className="py-4 px-4 text-gray-700">{ingreso.estado || '-'}</td>
                  <td className="py-4 px-4 text-gray-700">{ingreso.numeroPartos || 0}</td>
                  <td className="py-4 px-4">
                    <div className="flex space-x-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-300">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors duration-300">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => eliminar(ingreso.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default IngresoMarranascomponent;
