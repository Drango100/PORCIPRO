// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./services/AuthContext";
import ProtectedRoute from "./auth/ProtectedRoute";
import RequireRole from "./auth/RequireRole"; // opcional
import PrivateLayout from "./layouts/PrivateLayout";

import Login from "./pages/public/Login";
import Register from "./pages/public/Register";
import Dashboard from "./pages/users/Dashboard";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* BLOQUE PRIVADO */}
          <Route element={<ProtectedRoute />}>
            {/* Layout privado que envuelve todas las rutas internas */}
            <Route element={<PrivateLayout />}>
              <Route
                path="/users/dashboard"
                element={
                  // Si quieres restringir por rol:
                  // <RequireRole roles={['admin']}><Dashboard/></RequireRole>
                  <Dashboard />
                }
              />
              {/* Ejemplos de más rutas privadas:
              <Route path="/users" element={<UsersList />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              */}
            </Route>
          </Route>

          {/* PÚBLICO */}
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* 404 simple */}
          <Route path="*" element={<div className="p-6">404</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
