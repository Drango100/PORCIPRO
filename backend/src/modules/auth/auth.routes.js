// src/modules/auth/auth.routes.js
import { Router } from "express";
import {login,register as doRegister,me,logout,} from "./auth.controller.js";
import { requireAuth, optionalAuth, requireRole } from "./auth.middleware.js";

const r = Router();

r.post("/register", doRegister);
r.post("/login", login);

r.get("/me", requireAuth, me);
r.post("/logout", requireAuth, logout);

// ejemplo de ruta admin:
r.get("/admin/metrics", requireRole("admin"), (req, res) => {
  res.json({ ok: true, who: req.user, role: req.userRole, metrics: [] });
});

// ejemplo público con optionalAuth:
r.get("/public", optionalAuth, (req, res) => {
  res.json({ ok: true, user: req.user ?? null });
});

export default r;
