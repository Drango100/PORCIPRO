import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Definición del esquema para usuarios
const userSchema = new mongoose.Schema(
  {
    // Nombre del usuario
    nombre: {
      type: String,
      required: true,
      trim: true,
    },
    // Email único para login
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    // Contraseña (se encriptará antes de guardar)
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
    // Relación con el modelo Role
    rol: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Role',
      required: true,
    },
    // Estado del usuario
    activo: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

// Middleware de Mongoose que se ejecuta antes de guardar un usuario
userSchema.pre('save', async function (next) {
  // Si el password no fue modificado, sigue sin encriptar de nuevo
  if (!this.isModified('password')) return next();

  // Genera un "salt" para fortalecer la encriptación
  const salt = await bcrypt.genSalt(10);
  // Reemplaza la contraseña por su versión encriptada
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Método personalizado del modelo para comparar contraseñas durante el login
userSchema.methods.compararPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Exportamos el modelo para usarlo en controladores
export default mongoose.model('User', userSchema);
