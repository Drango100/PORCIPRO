import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import connectDB from './config/db.js';

import roleRoutes from './routes/role.routes.js';
import userRoutes from './routes/user.routes.js';

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Conexión a base de datos
connectDB();

// Rutas base
app.get('/', (req, res) => {
  res.send('Servidor funcionando correctamente 🚀');
});

// Rutas principales del sistema
app.use('/api/roles', roleRoutes);
app.use('/api/usuarios', userRoutes);

// Puerto
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));
