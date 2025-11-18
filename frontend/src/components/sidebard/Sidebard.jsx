// src/components/Sidebar.jsx
import React, { useEffect, useMemo, useState } from "react";
import {
  FaBars,
  FaXmark,
  FaChevronRight,
  FaChevronLeft,
  FaHouse,
  FaUsers,
  FaGear,
  FaChartPie,
  FaRightFromBracket,
} from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";

const COLLAPSED_W = "w-16"; // 64px
const EXPANDED_W = "w-64"; // 256px

export default function Sidebar({
  onLogout,
  brand = "Mi App",
  items: propItems,
}) {
  const loc = useLocation();
  const [expanded, setExpanded] = useState(false); // desktop: manual (botón). Cerrado por defecto
  const [mobileOpen, setMobileOpen] = useState(false); // mobile drawer
  const isMobile = useIsMobile();

  useEffect(() => {
    setMobileOpen(false);
  }, [loc.pathname]);

  const items = useMemo(() => {
    if (propItems?.length) return propItems;
    return [
      { label: "Inicio", to: "/users/dashboard", icon: <FaHouse />, end: true },
      { label: "Dashboard", to: "/users/dashboard", icon: <FaChartPie /> },
      {
        label: "Usuarios",
        icon: <FaUsers />,
        children: [
          { label: "Listado", to: "/users" },
          { label: "Crear", to: "/users/new" },
          { label: "Roles", to: "/users/roles" },
        ],
      },
    ];
  }, [propItems]);

  const asideWidth = isMobile ? "w-64" : expanded ? EXPANDED_W : COLLAPSED_W;
  const collapsedDesktop = !isMobile && !expanded;

  return (
    <>
      {/* Topbar (solo mobile) */}
      <div className="sticky top-0 z-30 flex items-center gap-3 border-b border-neutral-200 bg-white px-4 py-3 dark:border-neutral-800 dark:bg-neutral-950 md:hidden">
        <button
          aria-label="Abrir menú"
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
        >
          <FaBars />
        </button>
        <span className="font-medium text-neutral-900 dark:text-neutral-100">
          {brand}
        </span>
      </div>

      {/* Backdrop mobile */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 md:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden
        />
      )}

      {/* Backdrop desktop al expandir (suave) */}
      {expanded && !isMobile && (
        <div
          className="fixed inset-0 z-40 hidden bg-black/10 backdrop-blur-[1px] md:block"
          aria-hidden
        />
      )}

      {/* ASIDE overlay (fixed) */}
      <aside
        className={[
          "fixed left-0 top-0 z-50 h-dvh border-r border-neutral-200 bg-white",
          "dark:border-neutral-800 dark:bg-neutral-950",
          "transition-[width,box-shadow,transform,padding] duration-300 ease-out will-change-[width,transform]",
          collapsedDesktop ? "p-1" : "p-3",
          isMobile ? (mobileOpen ? "translate-x-0" : "-translate-x-full") : "",
          asideWidth,
          expanded && !isMobile ? "shadow-2xl" : "shadow-none",
          "flex flex-col",
        ].join(" ")}
      >
        {/* ===== HEADER ===== */}
        {/** Colapsado (desktop): botón arriba derecha, logo debajo centrado **/}
        {!isMobile && !expanded ? (
          <div className="mb-3 flex flex-col gap-2 px-1">
            {/* botón abrir (derecha) */}
            <div className="flex justify-center">
              <button
                aria-label="Expandir"
                onClick={() => setExpanded(true)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-neutral-300 text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                <FaChevronRight size={14} />
              </button>
            </div>
            {/* icono app (centrado) */}
            <div className="flex justify-center">
              <div
                className="h-8 w-8 rounded-md bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center"
                aria-label="App"
              >
                <span className="font-semibold">M</span>
              </div>
            </div>
          </div>
        ) : (
          /* Expandido (desktop) o Mobile dentro de drawer: logo+nombre a la izq, botón (colapsar o cerrar) a la der */
          <div className="mb-3 flex items-center justify-between px-2">
            <div className="flex min-w-0 items-center gap-2 overflow-hidden">
              <div
                className="h-9 w-9 rounded-md bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center shrink-0"
                aria-label="App"
              >
                <span className="font-semibold">M</span>
              </div>
              <span className="truncate text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {brand}
              </span>
            </div>

            {/* botón derecha: colapsar en desktop, cerrar en mobile */}
            {isMobile ? (
              <button
                aria-label="Cerrar menú"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                <FaXmark />
              </button>
            ) : (
              <button
                aria-label="Colapsar"
                onClick={() => setExpanded(false)}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-neutral-300 text-neutral-700 transition-colors hover:bg-neutral-100 dark:border-neutral-700 dark:text-neutral-200 dark:hover:bg-neutral-800"
              >
                <FaChevronLeft size={14} />
              </button>
            )}
          </div>
        )}
        {/* ===== /HEADER ===== */}
        <hr className="" />
        {/* NAV PRINCIPAL */}
        <nav className="mt-2">
          <ul className="space-y-1">
            {items.map((it) => (
              <NavItem
                key={it.label}
                item={it}
                expanded={expanded}
                isMobile={isMobile}
                activePath={loc.pathname}
              />
            ))}
          </ul>
        </nav>

        {/* FOOTER: Ajustes > Cerrar sesión */}
        <div className="mt-auto border-t border-neutral-200 pt-3 dark:border-neutral-800">
          <Link
            to="/settings"
            className="group relative mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-700 transition-colors duration-200 hover:bg-neutral-200/70 dark:text-neutral-200 dark:hover:bg-neutral-800/70"
          >
            <span className="text-lg">
              <FaGear />
            </span>
            <span
              className={[
                "transition-[opacity,transform] duration-200 ease-out",
                !isMobile && expanded
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 -translate-x-1 pointer-events-none",
              ].join(" ")}
            >
              Ajustes
            </span>
            {!expanded && !isMobile && <Tooltip>Ajustes</Tooltip>}
          </Link>

          {onLogout && (
            <button
              onClick={onLogout}
              className="logout-fx group relative mt-1 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-neutral-700 transition-colors duration-200 hover:bg-neutral-200/70 dark:text-neutral-200 dark:hover:bg-neutral-800/70"
            >
              <span className="text-lg">
                <FaRightFromBracket />
              </span>
              <span
                className={[
                  "transition-[opacity,transform] duration-200 ease-out",
                  !isMobile && expanded
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-1 pointer-events-none",
                ].join(" ")}
              >
                Cerrar sesión
              </span>
              {!expanded && !isMobile && <Tooltip>Cerrar sesión</Tooltip>}
              <span
                className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-200 group-hover:opacity-20"
                style={{
                  boxShadow: "0 0 0 9999px rgba(99,102,241,0.35) inset",
                }}
              />
            </button>
          )}
        </div>
      </aside>

      {/* SPACER fijo (siempre w-16) para que el contenido nunca quede debajo en desktop */}
      <div className={`hidden md:block ${COLLAPSED_W}`} aria-hidden />

      {/* estilos locales para el efecto de logout */}
      <style>{`
        .logout-fx:hover { animation: sidebarHue 1.2s linear infinite; filter: hue-rotate(0deg) saturate(1.1); }
        @keyframes sidebarHue { from { filter: hue-rotate(0deg) saturate(1.1);} 50%{ filter:hue-rotate(40deg) saturate(1.25);} to{ filter:hue-rotate(0deg) saturate(1.1);} }
      `}</style>
    </>
  );
}

/* ========== Ítems con soporte de submenú y flyout ========== */
function NavItem({ item, expanded, isMobile, activePath }) {
  const hasChildren = Array.isArray(item.children) && item.children.length > 0;
  const active = matchPath(activePath, item.to ?? "", item.end);

  const [open, setOpen] = useState(false); // inline (expandido)
  const [hover, setHover] = useState(false); // flyout (colapsado)

  useEffect(() => {
    setOpen(false);
  }, [activePath]);

  const BaseBtn = ({ children, className, ...rest }) => (
    <button
      type="button"
      className={[
        "group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-200",
        active
          ? "bg-indigo-600 text-white shadow-sm"
          : "text-neutral-700 hover:bg-neutral-200/70 dark:text-neutral-200 dark:hover:bg-neutral-800/70",
        className || "",
      ].join(" ")}
      {...rest}
    >
      {children}
    </button>
  );

  if (!hasChildren) {
    return (
      <li>
        <Link
          to={item.to}
          className={[
            "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-200",
            active
              ? "bg-indigo-600 text-white shadow-sm"
              : "text-neutral-700 hover:bg-neutral-200/70 dark:text-neutral-200 dark:hover:bg-neutral-800/70",
          ].join(" ")}
          aria-current={active ? "page" : undefined}
        >
          <span className="text-lg shrink-0">{item.icon}</span>
          <span
            className={[
              "whitespace-nowrap transition-[opacity,transform] duration-200 ease-out",
              !isMobile && expanded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-1 pointer-events-none",
            ].join(" ")}
          >
            {item.label}
          </span>
          {!expanded && !isMobile && <Tooltip>{item.label}</Tooltip>}
        </Link>
      </li>
    );
  }

  return (
    <li
      className="relative"
      onMouseEnter={() => !expanded && !isMobile && setHover(true)}
      onMouseLeave={() => !expanded && !isMobile && setHover(false)}
    >
      <BaseBtn
        onClick={() => (expanded ? setOpen((v) => !v) : null)}
        aria-expanded={expanded ? open : undefined}
      >
        <span className="text-lg shrink-0">{item.icon}</span>
        <span
          className={[
            "whitespace-nowrap transition-[opacity,transform] duration-200 ease-out",
            !isMobile && expanded
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-1 pointer-events-none",
          ].join(" ")}
        >
          {item.label}
        </span>
        {!isMobile && expanded && (
          <span
            className={[
              "ml-auto transition-transform duration-200",
              open ? "rotate-90" : "rotate-0",
            ].join(" ")}
          >
            <FaChevronRight />
          </span>
        )}
        {!expanded && !isMobile && <Tooltip>{item.label}</Tooltip>}
      </BaseBtn>

      {/* Submenú inline (accordion) cuando expandido */}
      {!isMobile && expanded && (
        <div
          className={[
            "overflow-hidden pl-10",
            "transition-[max-height,opacity] duration-300 ease-out",
            open ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
          ].join(" ")}
        >
          <ul className="mt-1 space-y-1">
            {item.children.map((ch) => {
              const actChild = matchPath(activePath, ch.to ?? "", ch.end);
              return (
                <li key={ch.to}>
                  <Link
                    to={ch.to}
                    className={[
                      "block rounded-lg px-3 py-2 text-sm",
                      actChild
                        ? "bg-indigo-50 text-indigo-700 dark:bg-neutral-800 dark:text-indigo-300"
                        : "text-neutral-700 hover:bg-neutral-200/70 dark:text-neutral-200 dark:hover:bg-neutral-800/70",
                    ].join(" ")}
                  >
                    {ch.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Flyout cuando colapsado (desktop) */}
      {!isMobile && !expanded && hover && (
        <div
          className="absolute left-full top-0 z-50 ml-2 min-w-40 rounded-xl border border-neutral-200 bg-white p-2 shadow-xl dark:border-neutral-800 dark:bg-neutral-900"
          role="menu"
        >
          <div className="px-2 pb-1 text-xs font-medium text-neutral-500">
            {item.label}
          </div>
          <ul className="space-y-1">
            {item.children.map((ch) => {
              const actChild = matchPath(activePath, ch.to ?? "", ch.end);
              return (
                <li key={ch.to}>
                  <Link
                    to={ch.to}
                    className={[
                      "block rounded-lg px-3 py-2 text-sm",
                      actChild
                        ? "bg-indigo-600 text-white"
                        : "text-neutral-700 hover:bg-neutral-200/70 dark:text-neutral-200 dark:hover:bg-neutral-800/70",
                    ].join(" ")}
                  >
                    {ch.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </li>
  );
}

/* ---------- Tooltip ---------- */
function Tooltip({ children }) {
  return (
    <span
      role="tooltip"
      className="pointer-events-none absolute left-full top-1/2 z-50 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md border border-neutral-200 bg-white px-2 py-1 text-xs text-neutral-800 shadow-lg opacity-0 transition-opacity duration-150 group-hover:opacity-100 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-100"
    >
      {children}
    </span>
  );
}

/* ---------- Helpers ---------- */
function useIsMobile(breakpoint = 768) {
  const [m, setM] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${breakpoint - 1}px)`);
    const handle = () => setM(mq.matches);
    handle();
    mq.addEventListener?.("change", handle);
    return () => mq.removeEventListener?.("change", handle);
  }, [breakpoint]);
  return m;
}
function matchPath(pathname, to, end = false) {
  if (!to) return false;
  if (end) return pathname === to;
  return pathname === to || pathname.startsWith(to + "/");
}
