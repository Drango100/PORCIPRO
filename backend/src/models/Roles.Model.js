import mongoose from "mongoose";

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // se añade 'nombre' para compatibilidad con índices/colecciones previas
  nombre: {
    type: String,
  },
});

// Si existe un índice único sobre 'nombre' en la BD (de ejecuciones previas),
// aseguramos que cada documento guarde también 'nombre' igual a 'name'.
roleSchema.pre('save', function (next) {
  if (this.name && !this.nombre) {
    this.nombre = this.name;
  }
  next();
});

export default mongoose.model("Role", roleSchema);