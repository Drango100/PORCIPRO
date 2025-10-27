import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Mail, Lock, Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Login = ({ onLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    
    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock successful login
      onLogin({
        name: 'Juan Pérez',
        email: formData.email,
        role: 'Administrador'
      });
      setIsLoading(false);
    }, 1000);
  };

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
{/* apartado para ingresar el correo*/}
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
                onChange={handleChange}
                placeholder="tu@email.com"
                className={`w-full max-w-md px-4 py-2 pr-12 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                  errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-300'
                }`}
              />
{/* manejo del error error de usuario */}
              {errors.email && (
                <p className="mt-2 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
{/* apartado para ingresar la contraseña */}
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
                  onChange={handleChange}
                  placeholder="Ingresa tu contraseña"
                  className={`w-full max-w-md px-4 py-2 pr-12 text-base border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200 ${
                    errors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-100' : 'border-gray-300'
                  }`}
                />
{/* icono para ver la contraseña */}
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
{/* Boton para Ingresar */}
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
{/* Link para volver al inicio */}   
          <div className="mt-8 text-center">
            <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-300">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Volver al inicio
            </Link>
          </div>
      </div>
    </div>
  </div>
  );
};

export default Login;