import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./config/env.js";
import authRoutes from "./modules/auth/auth.routes.js";
import companyRoutes from "./modules/routes/company.routes.js";
import moduleRoutes from "./modules/routes/module.routes.js";
import rolesRoutes from "./modules/routes/roles.routes.js";
import rolesModulesRoutes from "./modules/routes/rolesModules.routes.js";
import permissionsRoutes from "./modules/routes/permissions.routes.js";
import permissionRoutes from "./modules/routes/rolePermission.routes.js";
import userRoleRoutes from "./modules/routes/userRole.routes.js";


const app = express();

app.use(cors({
  origin: env.FRONTEND_ORIGIN,
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());

// rutas
app.use("/api/auth", authRoutes);
app.use("/api/companies", companyRoutes);
app.use("/api/modules", moduleRoutes);
app.use("/api/roles", rolesRoutes);
app.use("/api/roles-modules", rolesModulesRoutes);
app.use("/api/permissions", permissionsRoutes);
app.use("/api/permissions", permissionRoutes);
app.use("/api/user-roles", userRoleRoutes);

// healthcheck
app.get("/health", (_req, res) => res.json({ ok: true }));

export default app;
