// ...existing code...
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import axios from 'axios';
// importar helper de servicios de usuario
import { login as apiLogin, saveToken } from '../../../services/ServiciosUsuario/usuariosservice';

// URL base de la API (usar Vite env si está definido)
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// ...existing code...

const Login = ({ onLogin }) => {
  // Estado del formulario y UI
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({}); // { email, password, general }
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // ...existing code...

  /*
    handleSubmit:
    - Previene el comportamiento por defecto del form
    - Valida en cliente (validateForm)
    - Llama al servicio apiLogin(email, password) que consulta la base de datos
    - Si la API confirma usuario y contraseña: guarda token (si viene) y llama onLogin(user)
    - Si credenciales inválidas: muestra error y no deja ingresar
    - Maneja errores de red y muestra mensajes claros
    Firmado: GitHub Copilot (comentado por petición del usuario)
  */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 1) Validación en cliente
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // 2) Preparar UI
    setIsLoading(true);
    setErrors({}); // limpiar errores previos

    try {
      // 3) Llamada al servicio que verifica credenciales en la base de datos
      // apiLogin está definido en services/ServiciosUsuario/usuariosservice.js
      const res = await apiLogin(formData.email, formData.password);
      // Se espera res tenga { user, token } o similar según tu backend

      // 4) Si la API devuelve usuario -> login exitoso
      if (res && res.user) {
        // Guardar token si viene (para futuras peticiones autenticadas)
        if (res.token) {
          saveToken(res.token);
        }
        // Notificar al padre que el login fue exitoso (mostrará el dashboard)
        onLogin(res.user);
        return;
      }

      // 5) Si la respuesta no tiene formato esperado, mostrar error genérico
      setErrors({ general: 'No se pudo iniciar sesión. Intenta nuevamente.' });
    } catch (err) {
      // 6) Manejo de errores desde el backend o red
      // El servicio lanza err.response?.data o { message: ... }
      // Comprobar si el backend indicó credenciales inválidas
      const server = err?.data || err?.response || err;
      const status = err?.response?.status || server?.status;

      if (status === 401 || status === 403 || server?.message === 'Invalid credentials') {
        // Credenciales incorrectas
        setErrors({ general: 'Credenciales inválidas. Verifica email y contraseña.' });
      } else if (server?.message) {
        // Mensaje específico del servidor
        setErrors({ general: server.message });
      } else {
        // Error de red u otro
        setErrors({ general: 'Error de conexión. Intenta más tarde.' });
      }
    } finally {
      // 7) Restaurar estado de carga
      setIsLoading(false);
    }
  };

  // ...existing code...
  return (
    <div className="min-h-screen bg-gradient-blue flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="card p-8 animate-slide-up">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-3 group mb-6">
              <Heart className="w-10 h-10 text-pink-600 group-hover:animate-bounce-gentle" />
              <span className="text-3xl font-bold text-gradient">PORCINOPRO</span>
            </Link>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Bienvenido</h2>
            <p className="text-gray-600">Ingresa a tu cuenta para continuar</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Mail className="inline w-4 h-4 mr-2" />
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => {
                  const { name, value } = e.target;
                  setFormData(prev => ({ ...prev, [name]: value }));
                  if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
                  if (errors.general) setErrors(prev => ({ ...prev, general: '' }));
                }}
                placeholder="tu@email.com"
                className={`w-full max-w-md px-4 py-2 pr-12 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-300'
                }`}
              />
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                <Lock className="inline w-4 h-4 mr-2" />
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={(e) => {
                    const { name, value } = e.target;
                    setFormData(prev => ({ ...prev, [name]: value }));
                    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
                    if (errors.general) setErrors(prev => ({ ...prev, general: '' }));
                  }}
                  placeholder="Ingresa tu contraseña"
                  className={`w-full max-w-md px-4 py-2 pr-12 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                    errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-300'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-2 text-sm text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Mensaje general (credenciales inválidas / error de conexión) */}
            {errors.general && (
              <p className="text-center text-sm text-red-600">{errors.general}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Ingresando...
                </div>
              ) : (
                'Ingresar'
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>
          </div>
            <div className="text-center">
                <span className="text-gray-600">¿No tienes cuenta?</span>
                <Link 
                  to="/registro" 
                  className="ml-2 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300"
                >
                  Regístrate aquí
                </Link>
            </div>
          </div>
      </div>
    </div>
  );
};

export default Login;
