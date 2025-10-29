import Sidebar from '../../Sidebar';
import { User, ChevronDown, Settings, LogOut } from 'lucide-react';
const Dashboard = ({ user, onLogout }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 ml-64">
        {/* Dashboard Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Sistema de Gestión Porcina</h1>
              <p className="text-gray-600">Panel de Control</p>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="font-semibold text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-600">{user?.role}</p>
              </div>
              
              <div className="relative group">
                <button className="flex items-center space-x-2 bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl transition-colors duration-300">
                  <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-" />
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-600" />
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-300">
                    <User className="w-4 h-4 mr-3" />
                    Perfil
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-50 transition-colors duration-300">
                    <Settings className="w-4 h-4 mr-3" />
                    Configuración
                  </button>
                  <hr className="my-2 border-gray-200" />
                  <button 
                    onClick={onLogout}
                    className="flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50 transition-colors duration-300"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Cerrar Sesión
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
      </div>
    </div>
  );
};

export default Dashboard;