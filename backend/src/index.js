import express from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import { createRoles, createAdmin } from "./libs/initialSetup.js";
import "dotenv/config";
const app = express();

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// dotenv config
dotenv.config();

// Conexión a MongoDB y arranque ordenado
const start = async () => {
  try {
    const uri = process.env.MONGODB_URI || process.env.MONGO_URI;
    if (!uri) throw new Error('Falta la variable de entorno MONGODB_URI o MONGO_URI');

    await mongoose.connect(uri);
    console.log('MongoDB conectado');

    // Esperar a que los roles estén listos antes de crear el admin
    await createRoles();
    await createAdmin();

    // Rutas principales
    app.use('/api/auth', authRoutes);
    app.use('/api/users', userRoutes);

    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Servidor corriendo en http://localhost:${port}`);
    });
  } catch (err) {
    console.error('Error arrancando la app:', err);
    process.exit(1);
  }
};

start();

export default app;