import mongoose from 'mongoose';

// Definición del esquema para los roles de usuario
const roleSchema = new mongoose.Schema(
  {
    // Nombre del rol (único y obligatorio)
    nombre: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    // Descripción opcional del rol
    descripcion: {
      type: String,
    },
  },
  // timestamps agrega automáticamente createdAt y updatedAt
  { timestamps: true }
);

// Exportamos el modelo 'Role' para poder usarlo en otras partes del proyecto
export default mongoose.model('Role', roleSchema);
