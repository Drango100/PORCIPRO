import Role from '../models/Roles.model.js';
import User from '../models/User.Model.js';

export const createRoles = async () => {
  try {
    // Usar upsert para evitar errores por índices únicos o inserciones duplicadas
    const roles = ['admin', 'moderator', 'user'];

    const results = [];
    for (const r of roles) {
      const res = await Role.updateOne(
        { name: r },
        { $set: { name: r, nombre: r } },
        { upsert: true }
      );
      results.push({ role: r, result: res });
    }

    console.log('🟢 createRoles ejecutado (upsert):', results);
  } catch (error) {
    console.error('Error creando roles:', error);
  }
};

// opcional: crear usuario admin inicial
export const createAdmin = async () => {
  try {
    // Crear admin sólo si no existe
    const existingAdmin = await User.findOne({ username: 'admin' });
    if (existingAdmin) return;

    const adminRole = await Role.findOne({ name: 'admin' });
    if (!adminRole) throw new Error('Rol admin no encontrado');

    // Crear el admin con la contraseña en texto plano para que el pre('save')
    // del modelo `User` la hashee una sola vez.
    await User.create({
      username: 'admin',
      email: 'admin@agroplus.com',
      password: 'admin123', // contraseña por defecto (será hasheada en pre-save)
      roles: [adminRole._id],
    });

    console.log('👤 Usuario admin creado');
  } catch (error) {
    console.error('Error creando usuario admin:', error);
  }
};