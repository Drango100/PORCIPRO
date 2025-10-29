import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, logout } = useAuth();

  return (
    <div className="p-4 text-center">
      <h2 className="text-2xl font-bold mb-4">Bienvenido, {user?.username}</h2>
      <p className="text-gray-700">Rol: {user?.roles?.join(", ")}</p>
      <button onClick={logout} className="bg-red-600 text-white mt-4 px-4 py-2 rounded">
        Cerrar sesión
      </button>
    </div>
  );
};

export default Dashboard;