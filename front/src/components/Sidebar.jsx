import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Heart,
  Home,
  ClipboardList,
  CheckCircle,
  Baby,
  Calendar,
  Shield,
  Feather,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

const Sidebar = () => {
  const location = useLocation();
  const [openPorcino, setOpenPorcino] = useState(true);
  const [openCriadero, setOpenCriadero] = useState(false);

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-xl border-r border-gray-200 z-40">
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <Link to="/dashboard" className="flex items-center space-x-3 group">
          <Heart className="w-8 h-8 text-pink-600 group-hover:animate-bounce" />
          <span className="text-xl font-bold text-gray-800">PorciFarm Pro</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="mt-6">
        <ul className="space-y-2 px-3">

          {/* Dashboard */}
          <li>
            <Link
              to="/dashboard"
              className={`flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100 transition ${
                isActive('/dashboard', true) ? 'bg-blue-100 font-semibold text-blue-600' : ''
              }`}
            >
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
          </li>

          {/* Porcino Pro */}
          <li>
            <button
              onClick={() => setOpenPorcino(!openPorcino)}
              className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <span className="flex items-center">
                <ClipboardList className="w-5 h-5 mr-3" />
                Porcino Pro
              </span>
              {openPorcino ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openPorcino && (
              <ul className="pl-9 mt-1 space-y-1">
                <li>
                  <Link
                    to="/dashboard/marranas"
                    className={`flex items-center px-2 py-1 rounded-md hover:bg-blue-100 text-sm ${
                      isActive('/dashboard/marranas') ? 'bg-blue-100 font-semibold text-blue-600' : ''
                    }`}
                  >
                    <ClipboardList className="w-4 h-4 mr-2" />
                    Ingreso de Marranas
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/marranos"
                    className={`flex items-center px-2 py-1 rounded-md hover:bg-blue-100 text-sm ${
                      isActive('/dashboard/marranos') ? 'bg-blue-100 font-semibold text-blue-600' : ''
                    }`}
                  >
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Ingreso de Marranos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/nacimientos"
                    className={`flex items-center px-2 py-1 rounded-md hover:bg-blue-100 text-sm ${
                      isActive('/dashboard/nacimientos') ? 'bg-blue-100 font-semibold text-blue-600' : ''
                    }`}
                  >
                    <Baby className="w-4 h-4 mr-2" />
                    Registro de Nacimientos
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dashboard/monta"
                    className={`flex items-center px-2 py-1 rounded-md hover:bg-blue-100 text-sm ${
                      isActive('/dashboard/monta') ? 'bg-blue-100 font-semibold text-blue-600' : ''
                    }`}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Programación de Monta
                  </Link>
                </li>
              </ul>
            )}
          </li>

          {/* Criadero El Triunfo */}
          <li>
            <button
              onClick={() => setOpenCriadero(!openCriadero)}
              className="flex items-center justify-between w-full px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <span className="flex items-center">
                <Feather className="w-5 h-5 mr-3" />
                Criadero El Triunfo
              </span>
              {openCriadero ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>
            {openCriadero && (
              <ul className="pl-9 mt-1 space-y-1">
                <li>
                  <Link
                    to="/dashboard/gallos"
                    className={`flex items-center px-2 py-1 rounded-md hover:bg-blue-100 text-sm ${
                      isActive('/dashboard/gallos') ? 'bg-blue-100 font-semibold text-blue-600' : ''
                    }`}
                  >
                    <Feather className="w-4 h-4 mr-2" />
                    Gallos Finos
                  </Link>
                </li>
                {/* Puedes agregar más rutas aquí */}
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-gray-200">
        <div className="flex items-center justify-center space-x-2 text-gray-500">
          <Shield className="w-4 h-4" />
          <span className="text-sm font-medium">Sistema Seguro v1.0</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
