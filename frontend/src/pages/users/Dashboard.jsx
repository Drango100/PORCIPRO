import { useAuth } from "../../services/AuthContext";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="min-h-dvh bg-neutral-50 dark:bg-neutral-950 p-6">
      <div className="mx-auto max-w-4xl">
        <header className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
            Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              {user?.name} • {user?.email}
            </span>
            <button
              onClick={logout}
              className="rounded-lg bg-neutral-200 px-3 py-1.5 text-sm hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700"
            >
              Salir
            </button>
          </div>
        </header>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="mb-2 font-medium">Resumen</h2>
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              Aquí irían tus widgets.
            </p>
          </div>
          <div className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-900">
            <h2 className="mb-2 font-medium">Acciones rápidas</h2>
            <Link to="/" className="text-indigo-600 hover:underline dark:text-indigo-400">
              Ir al Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
