// src/pages/Login.jsx
import { useEffect, useMemo, useState } from "react";
import { useAuth } from "../../services/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState({ email: "", password: "", remember: false });
  const [touched, setTouched] = useState({ email: false, password: false });
  const [showPwd, setShowPwd] = useState(false);
  const [caps, setCaps] = useState(false);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  // Validación simple sin deps
  const errors = useMemo(() => {
    const e = {};
    const email = form.email.trim().toLowerCase();
    if (!email) e.email = "El email es obligatorio";
    else if (!emailRegex.test(email)) e.email = "Formato de email inválido";

    if (!form.password) e.password = "La contraseña es obligatoria";
    else if (form.password.length < 6) e.password = "Mínimo 6 caracteres";

    return e;
  }, [form.email, form.password]);

  const isValid = Object.keys(errors).length === 0;

  const onChange = (patch) => setForm((f) => ({ ...f, ...patch }));
  const onBlur = (field) => setTouched((t) => ({ ...t, [field]: true }));

  const onKeyUpPwd = (e) => setCaps(e.getModifierState?.("CapsLock") === true);

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setTouched({ email: true, password: true });
    if (!isValid || loading) return;

    setLoading(true);
    try {
      const email = form.email.trim().toLowerCase();
      await login(email, form.password, { remember: form.remember }); // si tu hook lo soporta
      nav("/users/dashboard");
    } catch (e) {
      // Mensaje del backend o fallback
      setErr(e?.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  };

  // Accesibilidad: enfocar el primer campo con error al fallar envío
  useEffect(() => {
    if (!loading && err) {
      const firstErrorId = errors.email ? "email" : errors.password ? "password" : null;
      if (firstErrorId) document.getElementById(firstErrorId)?.focus();
    }
  }, [err, errors, loading]);

  return (
    <div className="min-h-dvh grid place-items-center bg-neutral-50 dark:bg-neutral-950 px-4">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 backdrop-blur p-6 shadow-lg">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500" />
            <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Iniciar sesión
            </h1>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Ingresa tus credenciales para continuar
            </p>
          </div>

          {/* Error global (servidor) */}
          {err && (
            <div
              role="alert"
              aria-live="assertive"
              className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/60 dark:text-red-300"
            >
              {err}
            </div>
          )}

          {/* Form */}
          <form onSubmit={onSubmit} noValidate className="space-y-4" aria-busy={loading}>
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-neutral-800 dark:text-neutral-200"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                required
                value={form.email}
                onChange={(e) => onChange({ email: e.target.value })}
                onBlur={() => onBlur("email")}
                aria-invalid={!!(touched.email && errors.email)}
                aria-describedby={touched.email && errors.email ? "email-err" : undefined}
                className={[
                  "block w-full rounded-xl border bg-white px-3 py-2.5 text-neutral-900 placeholder-neutral-400 outline-none transition",
                  "focus:border-indigo-500 dark:bg-neutral-900 dark:text-neutral-100",
                  touched.email && errors.email
                    ? "border-red-400 focus:border-red-500"
                    : "border-neutral-300 dark:border-neutral-700",
                  // autofill
                  "[&_:-webkit-autofill]:shadow-[inset_0_0_0_30px_white] dark:[&_:-webkit-autofill]:shadow-[inset_0_0_0_30px_#0a0a0a] [&_:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]"
                ].join(" ")}
                placeholder="tu@correo.com"
              />
              {touched.email && errors.email && (
                <p id="email-err" className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="mb-1.5 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                >
                  Contraseña
                </label>
                <Link
                  to="/forgot"
                  className="text-xs text-indigo-600 hover:underline dark:text-indigo-400"
                >
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="relative">
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={form.password}
                  onChange={(e) => onChange({ password: e.target.value })}
                  onBlur={() => onBlur("password")}
                  onKeyUp={onKeyUpPwd}
                  aria-invalid={!!(touched.password && errors.password)}
                  aria-describedby={[
                    touched.password && errors.password ? "password-err" : null,
                    caps ? "caps-hint" : null,
                  ]
                    .filter(Boolean)
                    .join(" ") || undefined}
                  className={[
                    "block w-full rounded-xl border bg-white px-3 py-2.5 pr-11 text-neutral-900 placeholder-neutral-400 outline-none transition",
                    "focus:border-indigo-500 dark:bg-neutral-900 dark:text-neutral-100",
                    touched.password && errors.password
                      ? "border-red-400 focus:border-red-500"
                      : "border-neutral-300 dark:border-neutral-700",
                    "[&_:-webkit-autofill]:shadow-[inset_0_0_0_30px_white] dark:[&_:-webkit-autofill]:shadow-[inset_0_0_0_30px_#0a0a0a] [&_:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]",
                  ].join(" ")}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  aria-label={showPwd ? "Ocultar contraseña" : "Mostrar contraseña"}
                  onClick={() => setShowPwd((s) => !s)}
                  className="absolute inset-y-0 right-2 inline-flex items-center rounded-md px-2 text-neutral-500 hover:text-neutral-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  {showPwd ? (
                    // eye-off
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"></svg>
                  ) : (
                    // eye
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <circle cx="12" cy="12" r="2.5"/>
                    </svg>
                  )}
                </button>
              </div>
              {caps && (
                <p id="caps-hint" className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                  Bloq Mayús activado
                </p>
              )}
              {touched.password && errors.password && (
                <p id="password-err" className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember + Submit */}
            <div className="flex items-center justify-between">
              <label className="inline-flex select-none items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
                <input
                  type="checkbox"
                  checked={form.remember}
                  onChange={(e) => onChange({ remember: e.target.checked })}
                  className="h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500 dark:border-neutral-700 dark:bg-neutral-900"
                />
                Recordarme
              </label>

              <button
                type="submit"
                disabled={!isValid || loading}
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="4" />
                      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" />
                    </svg>
                    Entrando…
                  </span>
                ) : (
                  <>
                    Entrar
                    <span className="ml-2 hidden items-center gap-1 text-xs text-white/80 sm:inline-flex">
                      <kbd className="rounded border border-white/40 px-1">Enter</kbd>
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Footer */}
          <p className="mt-6 text-center text-sm text-neutral-600 dark:text-neutral-400">
            ¿No tienes cuenta?{" "}
            <Link
              to="/register"
              className="font-medium text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400"
            >
              Crear una
            </Link>
          </p>
        </div>

        {/* mini disclaimer */}
        <p className="mt-4 text-center text-xs text-neutral-500 dark:text-neutral-500">
          Protegido con cookies httpOnly + JWT. Sin magia negra, solo buenas prácticas. ✨
        </p>
      </div>
    </div>
  );
}
