import { useEffect, useState } from 'react';
import Calendar from '../../Calendario';
import {
  ClipboardList,CheckCircle,Baby,Calendar as CalendarIcon,Bell, TrendingUp
} from 'lucide-react';
  
import { getProgramacion } from '../../../services/ServiciosProgamacionMonta/ProgramacionMontaService';
import { getIngreso } from "../../../services/ServiciosMarrana/IngresoMarranasService";
import { getNacimientos } from '../../../services/ServiciosNacimineto/IngresoNacimientoService';
import { getMarrano } from "../../../services/ServiciosMarrano/IngresoMarranosService";

const DashboardHome = () => {
  const [stats, setStats] = useState({
    totalMarranas: 0,
    totalMarranos: 0,
    nacimientosMes: 0,
    montasProgramadas: 0
  });

  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const marranas = await getIngreso();      // Lista de todas las marranas registradas
      const marranos = await getMarrano();      // Lista de todos los marranos registrados
      const nacimientos = await getNacimientos(); // Lista de todos los nacimientos
      const montas = await getProgramacion();   // Lista de todas las montas programadas

      // Filtrar montas con estado "Programada"
      const programadas = montas.filter(m => m.estado === 'Programada');

      // Construir actividades de tipo "monta"
      const actividades = programadas.map(m => ({
        id: m.id,
        date: new Date(m.fecha_programada),
        type: 'monta',
        title: `Monta programada - Marrana ${m.chapeta_marrana}`,
        description: m.observaciones || 'Servicio reproductivo programado'
      }));

      setActivities(actividades);

      // Obtener mes actual
      const hoy = new Date();
      const mesActual = hoy.getMonth();      // 0 = enero
      const añoActual = hoy.getFullYear();

      // Filtrar nacimientos solo del mes actual
      const nacimientosMes = nacimientos.filter((n) => {
        const fecha = new Date(n.created_at);
        return fecha.getMonth() === mesActual && fecha.getFullYear() === añoActual;
      });

      // Actualizar estadísticas del dashboard
      setStats({
        totalMarranas: marranas.length,
        totalMarranos: marranos.length,
        nacimientosMes: nacimientosMes.length,
        montasProgramadas: programadas.length
      });

    } catch (error) {
      console.error('Error cargando datos del dashboard:', error);
    }
  };

  const statsCards = [
    {
      title: 'Total Marranas',
      value: stats.totalMarranas,
      icon: <ClipboardList className="w-8 h-8" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Total Marranos',
      value: stats.totalMarranos,
      icon: <CheckCircle className="w-8 h-8" />,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'Nacimientos este Mes',
      value: stats.nacimientosMes,
      icon: <Baby className="w-8 h-8" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100'
    },
    {
      title: 'Montas Programadas',
      value: stats.montasProgramadas,
      icon: <CalendarIcon className="w-8 h-8" />,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100'
    }
  ];

  const getActivityBadgeColor = (type) => {
    switch (type) {
      case 'monta':
        return 'bg-blue-100 text-blue-800';
      case 'nacimiento':
        return 'bg-green-100 text-green-800';
      case 'vacunacion':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Cartas de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((stat, index) => (
          <div key={index} className="card p-6 group">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} ${stat.color} p-3 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
                {stat.icon}
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span>+12% vs mes anterior</span>
            </div>
          </div>
        ))}
      </div>

      {/* Calendario y actividades */}
      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Calendar activities={activities} />
        </div>

        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 flex items-center ">
              <Bell className="w-5 h-5 mr-2 text-primary-600 " />
              Próximas Actividades
            </h3>
          </div>

          <div className="space-y-4">
            {activities
              .sort((a, b) => a.date - b.date)
              .slice(0, 5)
              .map((activity) => (
                <div key={activity.id} className="border-l-4 border-primary-500 pl-4 py-3 bg-primary-50 rounded-r-lg hover:bg-primary-100 transition-colors duration-300">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-semibold text-gray-900 text-sm">{activity.title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActivityBadgeColor(activity.type)}`}>
                      {activity.type}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm mb-2">{activity.description}</p>
                  <div className="flex items-center text-xs text-primary-600">
                    <CalendarIcon className="w-3 h-3 mr-1" />
                    {activity.date.toLocaleDateString('es-ES', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric'
                    })}
                  </div>
                </div>
              ))}
          </div>

          <h3 className="w-full mt-6 btn-secondary text-sm py-2 text-center">
            Actividades Pendientes Por Realizar
          </h3>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
