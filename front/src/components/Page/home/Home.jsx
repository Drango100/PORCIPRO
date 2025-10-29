import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Menu, X, ClipboardList, Calendar, Phone, Mail, ArrowRight, CheckCircle } from 'lucide-react';

const Home = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //Componentes de la seccion de servicios
  const services = [
    {
      icon: <ClipboardList className="w-12 h-12 text-primary-600" />,
      title: "Registro de Marranas",
      description: "Control completo del inventario de hembras reproductoras, historial médico y estado reproductivo."
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-primary-600" />,
      title: "Registro de Marranos",
      description: "Gestión de machos reproductores, control de servicios y seguimiento genealógico."
    },
    {
      icon: <Heart className="w-12 h-12 text-primary-600" />,
      title: "Control de Nacimientos",
      description: "Registro detallado de partos, control de lechones y seguimiento de mortalidad."
    },
    {
      icon: <Calendar className="w-12 h-12 text-primary-600" />,
      title: "Programación de Monta",
      description: "Planificación de servicios reproductivos, control de ciclos y fechas importantes."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <nav className="fixed top-0 w-full bg-gradient-to-r from-blue-200 to-blue-500 shadow-lg z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <Heart className="w-8 h-8 text-black group-hover:animate-bounce-gentle" />
              <span className="text-2xl font-bold text-black">PorciFarm Pro</span>
            </Link>
            
            {/*Menu superior de la pagina principal */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#servicios" className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-50 transition-all duration-300 transform hover:scale-105">
                Servicios
              </a>
              <a href="#contacto" className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-50 transition-all duration-300 transform hover:scale-105">
                Contacto
              </a>
              <Link to="/login" className="bg-black text-white px-6 py-2 rounded-full font-semibold hover:bg-primary-50 transition-all duration-300 transform hover:scale-105">
                Login
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-black focus:outline-none focus:ring-2 focus:ring-primary-200 rounded-lg p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-white rounded-lg shadow-lg mt-2 py-4 animate-slide-up">
              <a href="#servicios" className="block px-4 py-2 text-gray-700 hover:bg-primary-50 transition-colors duration-300">
                Servicios
              </a>
              <a href="#contacto" className="block px-4 py-2 text-gray-700 hover:bg-primary-50 transition-colors duration-300">
                Contacto
              </a>
              <Link to="/login" className="block px-4 py-2 text-primary-600 font-semibold hover:bg-primary-50 transition-colors duration-300">
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 bg-gradient-primary text-black min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Sistema de Gestión 
                <span className="block text-primary-200">Porcina Profesional</span>
              </h1>
              <p className="text-xl mb-8 text-primary-100 leading-relaxed">
                Controla y administra tu granja porcina de manera eficiente con nuestro 
                sistema especializado en reproducción, nacimientos y seguimiento de ganado.
              </p>
              <Link to="/login" className="inline-flex items-center bg-blue-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg">
                Comenzar Ahora
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>
            <div className="text-center lg:text-right animate-fade-in">
              <Heart className="w-64 h-64 mx-auto text-white/20 animate-bounce-gentle" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Gestión integral para tu granja porcina con tecnología de vanguardia
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card p-8 text-center group">
                <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Contáctanos
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                ¿Necesitas más información sobre nuestro sistema? 
                Estamos aquí para ayudarte.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <Phone className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Teléfono</h3>
                    <p className="text-gray-600">+57 300 123 4567</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="bg-primary-100 p-3 rounded-full">
                    <Mail className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email</h3>
                    <p className="text-gray-600">info@porcifarm.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="card p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Envíanos un mensaje
              </h3>
              <form className="space-y-6">
                <input 
                  type="text" 
                  placeholder="Nombre completo" 
                  className="input-field"
                />
                <input 
                  type="email" 
                  placeholder="Email" 
                  className="input-field"
                />
                <textarea 
                  rows="4" 
                  placeholder="Mensaje" 
                  className="input-field resize-none"
                ></textarea>
                <button type="submit" className="btn-primary w-full">
                  Enviar Mensaje
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex items-center space-x-3">
              <Heart className="w-8 h-8 text-primary-400" />
              <div>
                <h3 className="text-2xl font-bold">PorciFarm Pro</h3>
                <p className="text-gray-400">Sistema profesional de gestión porcina</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                &copy; 2024 PorciFarm Pro. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;