import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { createRoles, createAdmin } from "./libs/initialSetup.js";

const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// dotenv config
dotenv.config();

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB conectado"))
  .catch(err => console.error(err));

// Crear roles iniciales
createRoles();
createAdmin();

// Rutas principales
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// Servidor
app.listen(4000, () => {
  console.log("Servidor corriendo en http://localhost:4000");
});
export default app;