import Sidebar from "../components/sidebard/Sidebard.jsx";
import { Outlet } from "react-router-dom";
import { useAuth } from "../services/AuthContext.jsx";

export default function PrivateLayout() {
  const { logout } = useAuth();

  return (
    // 👇 En desktop usamos flex para que el spacer del sidebar se alinee al lado del main
    <div className="min-h-dvh bg-neutral-50 dark:bg-neutral-950 md:flex">
      <Sidebar brand="Panel" onLogout={logout} />
      {/* El spacer que inyecta el Sidebar se coloca antes; aquí el main ocupa el resto */}
      <main className="flex-1 p-4">{/* md:pl-0 ya no hace falta */}<Outlet /></main>
    </div>
  );
}
