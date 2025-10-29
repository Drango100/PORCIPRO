import Role from '../models/role.model.js';

// Crear un nuevo rol
export const crearRol = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;

    // Validar si ya existe un rol con el mismo nombre
    const rolExistente = await Role.findOne({ nombre });
    if (rolExistente)
      return res.status(400).json({ msg: 'El rol ya existe en el sistema' });

    // Crear el nuevo rol
    const rol = await Role.create({ nombre, descripcion });

    // Responder con el rol creado
    res.status(201).json(rol);
  } catch (error) {
    // Capturar errores de servidor
    res.status(500).json({
      msg: 'Error al crear el rol',
      error: error.message,
    });
  }
};

// Obtener la lista de roles registrados
export const obtenerRoles = async (req, res) => {
  try {
    const roles = await Role.find();
    res.json(roles);
  } catch (error) {
    res.status(500).json({
      msg: 'Error al obtener los roles',
      error: error.message,
    });
  }
};
