import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../services/AuthContext";
import { Link, useNavigate } from "react-router-dom";

// Validaciones
const schema = z.object({
  name: z.string().trim().min(2, "Mínimo 2 caracteres"),
  email: z.string().trim().toLowerCase().email("Formato de email inválido"),
  password: z.string().min(6, "Mínimo 6 caracteres"),
  confirm: z.string().min(6, "Confirma la contraseña"),
  terms: z.boolean().optional(),
}).refine((d) => d.password === d.confirm, {
  message: "Las contraseñas no coinciden",
  path: ["confirm"],
});

// Fuerza simple de contraseña (0-4)
function passwordScore(pwd) {
  let s = 0; if (!pwd) return 0;
  if (pwd.length >= 8) s++;
  if (/[A-Z]/.test(pwd)) s++;
  if (/[a-z]/.test(pwd)) s++;
  if (/\d/.test(pwd)) s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  return Math.min(s, 4);
}
const scoreLabel = (s) => ["Muy débil","Débil","Aceptable","Buena","Fuerte"][s] || "Muy débil";

export default function Register() {
  const { register: doRegister } = useAuth();
  const nav = useNavigate();
  const [showPwd, setShowPwd] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [caps, setCaps] = useState(false);
  const [serverErr, setServerErr] = useState("");

  const {
    register,
    handleSubmit,
    setFocus,
    setError,
    formState: { errors, isSubmitting, isValid },
    watch,
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: { name: "", email: "", password: "", confirm: "", terms: true },
  });

  const pwd = watch("password");
  const score = useMemo(() => passwordScore(pwd), [pwd]);

  useEffect(() => setFocus("name"), [setFocus]);

  const onKeyUpPwd = (e) => setCaps(e.getModifierState?.("CapsLock") === true);

  const onSubmit = async (data) => {
    setServerErr("");
    try {
      await doRegister(data.name.trim(), data.email.trim().toLowerCase(), data.password);
      nav("/");
    } catch (e) {
      const msg = e?.message || "No se pudo crear la cuenta";
      // mapear errores comunes de backend
      if (/correo.*existe|email.*exist/i.test(msg)) {
        setError("email", { type: "server", message: "El correo ya existe" });
        setFocus("email");
      } else {
        setServerErr(msg);
      }
    }
  };

  // clases utilitarias
  const inputBase =
    "block w-full rounded-xl border bg-white px-3 py-2.5 text-neutral-900 placeholder-neutral-400 outline-none transition focus:border-indigo-500 dark:bg-neutral-900 dark:text-neutral-100";
  const borderOk = "border-neutral-300 dark:border-neutral-700";
  const borderErr = "border-red-400 focus:border-red-500";
  const autofillFix =
    "[&_:-webkit-autofill]:shadow-[inset_0_0_0_30px_white] dark:[&_:-webkit-autofill]:shadow-[inset_0_0_0_30px_#0a0a0a] [&_:-webkit-autofill]:[transition:background-color_9999s_ease-in-out_0s]";

  return (
    <div className="min-h-dvh grid place-items-center bg-neutral-50 dark:bg-neutral-950 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/70 backdrop-blur p-6 shadow-lg">
          {/* Header */}
          <div className="mb-6 text-center">
            <div className="mx-auto mb-3 h-12 w-12 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-500" />
            <h1 className="text-xl font-semibold text-neutral-900 dark:text-neutral-100">
              Crear cuenta
            </h1>
            <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
              Regístrate para empezar
            </p>
          </div>

          {/* Error global */}
          {serverErr && (
            <div role="alert" aria-live="assertive"
              className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-900/50 dark:bg-red-950/60 dark:text-red-300">
              {serverErr}
            </div>
          )}

          <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4" aria-busy={isSubmitting}>
            {/* Nombre */}
            <div>
              <label htmlFor="name" className="mb-1.5 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                Nombre
              </label>
              <input
                id="name"
                {...register("name")}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-err" : undefined}
                className={`${inputBase} ${autofillFix} ${errors.name ? borderErr : borderOk}`}
                placeholder="Tu nombre"
              />
              {errors.name && (
                <p id="name-err" className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                Email
              </label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                {...register("email")}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-err" : undefined}
                className={`${inputBase} ${autofillFix} ${errors.email ? borderErr : borderOk}`}
                placeholder="tu@correo.com"
              />
              {errors.email && (
                <p id="email-err" className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                Contraseña
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPwd ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("password")}
                  onKeyUp={onKeyUpPwd}
                  aria-invalid={!!errors.password}
                  aria-describedby={[
                    errors.password ? "password-err" : null,
                    caps ? "caps-hint" : null,
                    "pwd-meter-label",
                  ].filter(Boolean).join(" ") || undefined}
                  className={`${inputBase} ${autofillFix} pr-11 ${errors.password ? borderErr : borderOk}`}
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
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l2.049 2.05C2.892 7.04 1.66 8.79 1.2 9.5a1.5 1.5 0 0 0 0 1.99C3.21 14.46 6.97 18.75 12 18.75c2.02 0 3.81-.52 5.36-1.33l3.11 3.11a.75.75 0 1 0 1.06-1.06l-18-18Zm9.72 12.84a3.75 3.75 0 0 1-4.56-4.56l4.56 4.56ZM7.62 6.35 9.4 8.13a3.75 3.75 0 0 1 4.47 4.47l1.78 1.78a6.988 6.988 0 0 1-3.65.99c-4.33 0-7.61-3.66-9.23-5.9.38-.54 1.34-1.76 2.85-3.12Z"/>
                      <path d="M12 5.25c4.33 0 7.61 3.66 9.23 5.9-.46 .65-1.78 2.41-3.68 3.84l-1.1-1.1a5.25 5.25 0 0 0-6.28-6.28l-1.1-1.1A10.1 10.1 0 0 1 12 5.25Z"/>
                    </svg>
                  ) : (
                    // eye
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 5.25c-5.03 0-8.79 4.29-10.8 7.05a1.5 1.5 0 0 0 0 1.99C3.21 16.96 6.97 21.25 12 21.25s8.79-4.29 10.8-7.05a1.5 1.5 0 0 0 0-1.99C20.79 9.54 17.03 5.25 12 5.25Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"/>
                      <circle cx="12" cy="12" r="2.5"/>
                    </svg>
                  )}
                </button>
              </div>

              {/* hints */}
              {caps && (
                <p id="caps-hint" className="mt-1 text-xs text-amber-600 dark:text-amber-400">
                  Bloq Mayús activado
                </p>
              )}
              {errors.password && (
                <p id="password-err" className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.password.message}
                </p>
              )}

              {/* medidor fuerza */}
              <div className="mt-2">
                <div className="h-1.5 w-full rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden">
                  <div
                    className={[
                      "h-full rounded-full transition-all",
                      score <= 1
                        ? "w-1/5 bg-red-500"
                        : score === 2
                        ? "w-2/5 bg-amber-500"
                        : score === 3
                        ? "w-3/5 bg-lime-500"
                        : "w-5/5 bg-emerald-500",
                    ].join(" ")}
                  />
                </div>
                <p id="pwd-meter-label" className="mt-1 text-xs text-neutral-600 dark:text-neutral-400">
                  Fuerza: {scoreLabel(score)}
                </p>
              </div>
            </div>

            {/* Confirmación */}
            <div>
              <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium text-neutral-800 dark:text-neutral-200">
                Confirmar contraseña
              </label>
              <div className="relative">
                <input
                  id="confirm"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  {...register("confirm")}
                  aria-invalid={!!errors.confirm}
                  aria-describedby={errors.confirm ? "confirm-err" : undefined}
                  className={`${inputBase} ${autofillFix} pr-11 ${errors.confirm ? borderErr : borderOk}`}
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  aria-label={showConfirm ? "Ocultar confirmación" : "Mostrar confirmación"}
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute inset-y-0 right-2 inline-flex items-center rounded-md px-2 text-neutral-500 hover:text-neutral-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200"
                >
                  {/* mismo icono que arriba */}
                  {showConfirm ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l2.049 2.05C2.892 7.04 1.66 8.79 1.2 9.5a1.5 1.5 0 0 0 0 1.99C3.21 14.46 6.97 18.75 12 18.75c2.02 0 3.81-.52 5.36-1.33l3.11 3.11a.75.75 0 1 0 1.06-1.06l-18-18Zm9.72 12.84a3.75 3.75 0 0 1-4.56-4.56l4.56 4.56ZM7.62 6.35 9.4 8.13a3.75 3.75 0 0 1 4.47 4.47l1.78 1.78a6.988 6.988 0 0 1-3.65.99c-4.33 0-7.61-3.66-9.23-5.9.38-.54 1.34-1.76 2.85-3.12Z"/><path d="M12 5.25c4.33 0 7.61 3.66 9.23 5.9-.46.65-1.78 2.41-3.68 3.84l-1.1-1.1a5.25 5.25 0 0 0-6.28-6.28l-1.1-1.1A10.1 10.1 0 0 1 12 5.25Z"/></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 5.25c-5.03 0-8.79 4.29-10.8 7.05a1.5 1.5 0 0 0 0 1.99C3.21 16.96 6.97 21.25 12 21.25s8.79-4.29 10.8-7.05a1.5 1.5 0 0 0 0-1.99C20.79 9.54 17.03 5.25 12 5.25Zm0 12a5 5 0 1 1 0-10 5 5 0 0 1 0 10Z"/><circle cx="12" cy="12" r="2.5"/></svg>
                  )}
                </button>
              </div>
              {errors.confirm && (
                <p id="confirm-err" className="mt-1 text-xs text-red-600 dark:text-red-400">
                  {errors.confirm.message}
                </p>
              )}
            </div>

            {/* Terms (opcional) */}
            <label className="flex items-start gap-2 text-sm text-neutral-700 dark:text-neutral-300">
              <input type="checkbox" {...register("terms")}
                className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-indigo-600 focus:ring-indigo-500 dark:border-neutral-700 dark:bg-neutral-900"/>
              <span>
                Acepto los{" "}
                <a href="#" className="text-indigo-600 hover:underline dark:text-indigo-400">Términos</a>{" "}
                y la{" "}
                <a href="#" className="text-indigo-600 hover:underline dark:text-indigo-400">Política de Privacidad</a>.
              </span>
            </label>

            {/* Submit + link a login */}
            <div className="flex items-center justify-between">
              <div className="text-sm text-neutral-600 dark:text-neutral-400">
                ¿Ya tienes cuenta?{" "}
                <Link to="/" className="font-medium text-indigo-600 underline-offset-4 hover:underline dark:text-indigo-400">
                  Entrar
                </Link>
              </div>

              <button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="inline-flex items-center justify-center rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.2" strokeWidth="4" />
                      <path d="M22 12a10 10 0 0 1-10 10" stroke="currentColor" strokeWidth="4" />
                    </svg>
                    Creando…
                  </span>
                ) : (
                  "Registrarme"
                )}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-4 text-center text-xs text-neutral-500 dark:text-neutral-500">
          Tus datos se guardan cifrados (bcrypt). Buen café, buen código. ☕️
        </p>
      </div>
    </div>
  );
}
