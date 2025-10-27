// MontaModule actualizado con conexión a servicios reales desde Laravel

import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Calendar, CheckCircle } from 'lucide-react';
import { getProgramacion,newProgramacion,deleteProgramacion,updateProgramacion} from '../../../../services/ServiciosProgamacionMonta/ProgramacionMontaService';

const MontaModule = () => {
  const [montas, setMontas] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    fecha_programada: '',
    fecha_realizada: '',
    estado: 'Programada',
    chapeta_marrana: '',
    nombre_marrana: '',
    chapeta_marrano: '',
    nombre_marrano: '',
    estado_programacion: '',
    tipo_monta: '',
    observaciones: ''
  });

  useEffect(() => {
    fetchMontas();
  }, []);

  const fetchMontas = async () => {
    try {
      const data = await getProgramacion();
      setMontas(data);
    } catch (error) {
      console.error('Error al cargar programaciones:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await newProgramacion(formData);
      setFormData({
        fecha_programada: '',
        fecha_realizada: '',
        estado: 'Programada',
        chapeta_marrana: '',
        nombre_marrana: '',
        chapeta_marrano: '',
        nombre_marrano: '',
        estado_programacion: '',
        tipo_monta: '',
        observaciones: ''
      });
      setShowForm(false);
      fetchMontas();
    } catch (error) {
      console.error('Error al guardar programación:', error);
    }
  };

  const marcarRealizada = async (id, monta) => {
    try {
      await updateProgramacion(id, {
        ...monta,
        estado: 'Realizada',
        fecha_realizada: new Date().toISOString().split('T')[0]
      });
      fetchMontas();
    } catch (error) {
      console.error('Error al actualizar programación:', error);
    }
  };

  const eliminarMonta = async (id) => {
    try {
      await deleteProgramacion(id);
      fetchMontas();
    } catch (error) {
      console.error('Error al eliminar programación:', error);
    }
  };

  const getEstadoBadge = (estado) => {
    const colors = {
      Programada: 'bg-yellow-100 text-yellow-800',
      Realizada: 'bg-green-100 text-green-800',
      Cancelada: 'bg-red-100 text-red-800'
    };
    return colors[estado] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center">
            <Calendar className="w-8 h-8 mr-3 text-orange-600" />
            Programación de Monta
          </h2>
          <p className="text-gray-600 mt-2">Planificación y control de servicios reproductivos</p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center"
        >
          <Plus className="w-5 h-5 mr-2" />
          Nueva Programación
        </button>
      </div>

      {showForm && (
        <div className="card p-6 animate-slide-up">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Programar Nueva Monta</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <input type="date" name="fecha_programada" value={formData.fecha_programada} onChange={handleChange} required className="input-field" placeholder="Fecha programada" />
              <select name="estado" value={formData.estado} onChange={handleChange} className="input-field">
                <option value="Programada">Programada</option>
                <option value="Realizada">Realizada</option>
                <option value="Cancelada">Cancelada</option>
              </select>

              <input type="text" name="chapeta_marrana" value={formData.chapeta_marrana} onChange={handleChange} required className="input-field" placeholder="Código Marrana" />
              <input type="text" name="nombre_marrana" value={formData.nombre_marrana} onChange={handleChange} required className="input-field" placeholder="Nombre Marrana" />
              <input type="text" name="chapeta_marrano" value={formData.chapeta_marrano} onChange={handleChange} required className="input-field" placeholder="Código Marrano" />
              <input type="text" name="nombre_marrano" value={formData.nombre_marrano} onChange={handleChange} required className="input-field" placeholder="Nombre Marrano" />

              <input type="text" name="estado_programacion" value={formData.estado_programacion} onChange={handleChange} required className="input-field" placeholder="Estado de la programación" />
              <input type="text" name="tipo_monta" value={formData.tipo_monta} onChange={handleChange} required className="input-field" placeholder="Tipo de monta" />

              <textarea name="observaciones" value={formData.observaciones} onChange={handleChange} className="input-field resize-none md:col-span-2" placeholder="Observaciones"></textarea>
            </div>
            <div className="flex space-x-4">
              <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                Guardar Programación
              </button>
              <button type="button" onClick={() => setShowForm(false)} className="btn-secondary">
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card p-6 overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-4 px-4">Fecha</th>
              <th className="text-left py-4 px-4">Marrana</th>
              <th className="text-left py-4 px-4">Marrano</th>
              <th className="text-left py-4 px-4">Estado</th>
              <th className="text-left py-4 px-4">Observaciones</th>
              <th className="text-left py-4 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {montas.map((monta) => (
              <tr key={monta.id} className="border-b hover:bg-gray-50">
                <td className="py-4 px-4">{new Date(monta.fecha_programada).toLocaleDateString('es-ES')}</td>
                <td className="py-4 px-4">{monta.chapeta_marrana} - {monta.nombre_marrana}</td>
                <td className="py-4 px-4">{monta.chapeta_marrano} - {monta.nombre_marrano}</td>
                <td className="py-4 px-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getEstadoBadge(monta.estado)}`}>
                    {monta.estado}
                  </span>
                </td>
                <td className="py-4 px-4">{monta.observaciones}</td>
                <td className="py-4 px-4">
                  <div className="flex space-x-2">
                    {monta.estado === 'Programada' && (
                      <button onClick={() => marcarRealizada(monta.id, monta)} className="text-green-600 hover:bg-green-50 p-2 rounded-lg">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    <button onClick={() => eliminarMonta(monta.id)} className="text-red-600 hover:bg-red-50 p-2 rounded-lg">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MontaModule;
