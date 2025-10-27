// ...existing code...
import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Componente principal Home (pantalla inicial pública)
import Home from './components/Page/Home/HomeComponet.jsx';
// Componente de login (debe aceptar una prop onLogin para notificar éxito)
import Login from './components/Page/Login/InicioSesionComponet.jsx';
// Dashboard con sus rutas internas (se muestra solo si está autenticado)
import Dashboard from './components/Page/DashBoart/DashBoartComponet.jsx';

export default function App() {
  // Estado de autenticación y datos del usuario
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  // handleLogin: recibe userData desde el componente Login y marca sesión iniciada
  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setUser(userData);
  };

  // handleLogout: cierra sesión y limpia datos
  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  return (
    // Contenedor de la app; las rutas controlan qué componente se renderiza
    <div className="App min-h-screen bg-gray-50">
      <Routes>
        {/* Ruta pública: Home */}
        <Route path="/" element={<Home />} />

        {/* Ruta de login:
            - Si ya está autenticado, redirige al dashboard
            - Si no, renderiza el componente Login y le pasa onLogin */}
        <Route
          path="/login"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login onLogin={handleLogin} />
            )
          }
        />

        {/* Ruta protegida del dashboard:
            - Si está autenticado, renderiza Dashboard y le pasa user y onLogout
            - Si no está autenticado, redirige a /login */}
        <Route
          path="/dashboard/*"
          element={
            isAuthenticated ? (
              <Dashboard user={user} onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Cualquier otra ruta redirige al Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
// ...existing code...