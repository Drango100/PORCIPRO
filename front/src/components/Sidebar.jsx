import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
  ChevronUp,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [openPorcino, setOpenPorcino] = useState(true);
  const [openCriadero, setOpenCriadero] = useState(false);
  const [openSidebar, setOpenSidebar] = useState(false);

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const handleLinkClick = () => {
    setOpenSidebar(false); // se cierra el sidebar al dar clic
  };

  return (
    <>
      {/* Botón hamburguesa */}
      <button
        onClick={() => setOpenSidebar(!openSidebar)}
        className="p-2 m-2 text-gray-800 rounded-lg hover:bg-gray-200 fixed top-2 left-2 z-50"
      >
        {openSidebar ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl border-r border-gray-200 z-40 transform transition-transform duration-300 
        ${openSidebar ? "translate-x-0" : "-translate-x-full"}`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <Link
            to="/dashboard/home"
            onClick={handleLinkClick}
            className="flex items-center space-x-3 group"
          >
            <Heart className="w-8 h-8 text-pink-600 group-hover:animate-bounce" />
            <span className="text-xl font-bold text-gray-800">Animal Pro</span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="mt-6">
          <ul className="space-y-2 px-3">
            {/* Dashboard */}
            <li>
              <Link
                to="/dashboard/home"
                onClick={handleLinkClick}
                className={`flex items-center px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100 transition ${
                  isActive("/dashboard/home", true)
                    ? "bg-blue-100 font-semibold text-blue-600"
                    : ""
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
                {openPorcino ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {openPorcino && (
                <ul className="pl-9 mt-1 space-y-1">
                  <li>
                    <Link
                      to="/dashboard/marranas/crear"
                      onClick={handleLinkClick}
                      className={`flex items-center px-2 py-1 rounded-md hover:bg-blue-100 text-sm ${
                        isActive("/dashboard/marranas/crear")
                          ? "bg-blue-100 font-semibold text-blue-600"
                          : ""
                      }`}
                    >
                      <ClipboardList className="w-4 h-4 mr-2" />
                      Ingreso de Marranas
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/marranos"
                      onClick={handleLinkClick}
                      className={`flex items-center px-2 py-1 rounded-md hover:bg-blue-100 text-sm ${
                        isActive("/dashboard/marranos")
                          ? "bg-blue-100 font-semibold text-blue-600"
                          : ""
                      }`}
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Ingreso de Marranos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/nacimientos"
                      onClick={handleLinkClick}
                      className={`flex items-center px-2 py-1 rounded-md hover:bg-blue-100 text-sm ${
                        isActive("/dashboard/nacimientos")
                          ? "bg-blue-100 font-semibold text-blue-600"
                          : ""
                      }`}
                    >
                      <Baby className="w-4 h-4 mr-2" />
                      Registro de Nacimientos
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/dashboard/monta"
                      onClick={handleLinkClick}
                      className={`flex items-center px-2 py-1 rounded-md hover:bg-blue-100 text-sm ${
                        isActive("/dashboard/monta")
                          ? "bg-blue-100 font-semibold text-blue-600"
                          : ""
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
                {openCriadero ? (
                  <ChevronUp className="w-4 h-4" />
                ) : (
                  <ChevronDown className="w-4 h-4" />
                )}
              </button>
              {openCriadero && (
                <ul className="pl-9 mt-1 space-y-1">
                  <li>
                    <Link
                      to="/dashboard/gallos"
                      onClick={handleLinkClick}
                      className={`flex items-center px-2 py-1 rounded-md hover:bg-blue-100 text-sm ${
                        isActive("/dashboard/gallos")
                          ? "bg-blue-100 font-semibold text-blue-600"
                          : ""
                      }`}
                    >
                      <Feather className="w-4 h-4 mr-2" />
                      Gallos Finos
                    </Link>
                  </li>
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

      {/* Overlay */}
      {openSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={() => setOpenSidebar(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;
