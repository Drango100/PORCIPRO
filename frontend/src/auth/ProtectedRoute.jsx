import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../services/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const loc = useLocation();

  if (loading) return <div className="p-6 text-center">Cargando…</div>;
  if (!user) return <Navigate to="/" replace state={{ from: loc }} />;

  // Soporta uso como wrapper <ProtectedRoute><Page/></ProtectedRoute> o como layout <Outlet/>
  return children ?? <Outlet />;
}
