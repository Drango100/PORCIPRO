import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Page/home/Home";
import Login from "./components/Page/login/InicioSesionComponet";
import DashboardHome from "./components/Page/DashBoart/DashBoartHomeComponet";
import DashboardComponet from "./components/Page/dashBoart/DashBoartComponet";
import CrearIngresoMarrana from "./components/Page/ingreso/marranas/CrearIngresoMarranaComponet";
import CrearIngresoMarranos from "./components/Page/ingreso/marranos/CrearIngresoMarranoComponet";
import IngresoMarranascomponent from "./components/Page/ingreso/marranas/ConsultaMarranaComponet";
import IngresoMarranoscomponent from "./components/Page/ingreso/marranos/ConsultarMarranoComponet";
import IngresoNacimineto from "./components/Page/ingreso/registrosnacimientos/ConsultaNacimientoComponet";
import CrearNacimiento from "./components/Page/ingreso/registrosnacimientos/IngresoNacimiento";
import DashboardLayout from "./components/Page/dashBoart/DashboardLayout";
// import MontaModule from "./components/Page/monta/MontaModule";

function App() {
  const [user, setUser] = useState(null);
  
  // Recuperar usuario guardado en localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // función que recibe los datos del Login
  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData)); // 🔹 Guardar sesión
    console.log("Usuario autenticado:", userData);
  };

  // función de logout
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user"); // 🔹 Borrar sesión
  };

  return (
    <Routes>
      {/* página pública */}
      <Route path="/" element={<Home />} />

      {/* login */}
      <Route
        path="/login"
        element={
          user ? (
            <Navigate to="/dashboard/main" />
          ) : (
            <Login onLogin={handleLogin} />
          )
        }
      />

      {/* rutas protegidas con DashboardLayout */}
      <Route
        path="/dashboard"
        element={user ? <DashboardLayout /> : <Navigate to="/login" />}
      >
        {/* hijas del layout */}
        <Route path="home" element={<DashboardHome />} />
        <Route path="main" element={<DashboardComponet onLogout={handleLogout} />} />
        <Route path="marranas/crear" element={<CrearIngresoMarrana />} />
        <Route path="marranos/crear" element={<CrearIngresoMarranos />} />
        <Route path="marranas" element={<IngresoMarranascomponent />} />
        <Route path="marranos" element={<IngresoMarranoscomponent />} />
        <Route path="nacimientos" element={<IngresoNacimineto />} />
        <Route path="nacimientos/crear" element={<CrearNacimiento />} />
        {/* <Route path="monta" element={<MontaModule />} /> */}
      </Route>
    </Routes>
  );
}

export default App;