import User from '../models/user.model.js';
import Role from '../models/role.model.js';

// Crear un nuevo usuario
export const crearUsuario = async (req, res) => {
  try {
    const { nombre, email, password, rol } = req.body;

    // Verificar si ya existe un usuario con el mismo correo
    const usuarioExistente = await User.findOne({ email });
    if (usuarioExistente)
      return res.status(400).json({ msg: 'El usuario ya está registrado' });

    // Verificar que el rol exista
    const rolEncontrado = await Role.findById(rol);
    if (!rolEncontrado)
      return res.status(404).json({ msg: 'Rol no encontrado en la base de datos' });

    // Crear usuario nuevo
    const nuevoUsuario = await User.create({ nombre, email, password, rol });

    // Responder con el usuario creado (sin mostrar password)
    res.status(201).json({
      id: nuevoUsuario._id,
      nombre: nuevoUsuario.nombre,
      email: nuevoUsuario.email,
      rol: rolEncontrado.nombre,
      activo: nuevoUsuario.activo,
    });
  } catch (error) {
    res.status(500).json({
      msg: 'Error al crear usuario',
      error: error.message,
    });
  }
};

// Obtener la lista de usuarios (con su rol asociado)
export const obtenerUsuarios = async (req, res) => {
  try {
    // Populate rellena la info del rol (nombre)
    const usuarios = await User.find().populate('rol', 'nombre descripcion');
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({
      msg: 'Error al obtener usuarios',
      error: error.message,
    });
  }
};
