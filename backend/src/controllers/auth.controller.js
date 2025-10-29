// Importamos el modelo de usuario
import User from "../models/User.Model.js";
// Importamos bcrypt para encriptar y comparar contraseñas
import bcrypt from "bcryptjs";
// Importamos JWT para generar el token de sesión
import jwt from "jsonwebtoken";

/**
 * 🟢 Registrar un nuevo usuario
 */
export const register = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    // Verificamos si el correo ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado" });
    }

    // Encriptamos la contraseña antes de guardar
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Creamos el usuario
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
      roles,
    });

    // Guardamos el usuario en la base de datos
    await newUser.save();

    res.status(201).json({ message: "Usuario registrado correctamente" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * 🔵 Iniciar sesión (login)
 */
export const login = async (req, res) => {
  try {
    // Buscamos el usuario por correo y cargamos sus roles
    const userFound = await User.findOne({ email: req.body.email }).populate("roles");

    // Si no existe, retornamos error
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    // Comparamos la contraseña en texto con la encriptada
    const matchPassword = await bcrypt.compare(req.body.password, userFound.password);
    if (!matchPassword)
      return res.status(401).json({ token: null, message: "Contraseña incorrecta" });

    // Generamos el token JWT (válido por 24 horas)
    const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 horas
    });

    // Retornamos token y datos básicos del usuario
    res.json({
      token,
      user: userFound.username,
      roles: userFound.roles,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};