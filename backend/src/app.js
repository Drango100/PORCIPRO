import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { env } from "./config/env.js";
import authRoutes from "./modules/auth/auth.routes.js";
import companyRoutes from "./modules/routes/company.routes.js";

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

// healthcheck
app.get("/health", (_req, res) => res.json({ ok: true }));

export default app;
