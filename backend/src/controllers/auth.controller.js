import User from "../models/User.Model.js";
import Role from "../models/Roles.Model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { username, email, password, roles } = req.body;

    // Verificar si el usuario ya existe
    const userFound = await User.findOne({ email });
    if (userFound) return res.status(400).json({ message: "El usuario ya existe" });

    // Crear nuevo usuario
    const newUser = new User({
      username,
      email,
      password,
    });

    // Asignar roles si se envían, si no, asignar 'productor' por defecto
    if (roles) {
      const foundRoles = await Role.find({ name: { $in: roles } });
      newUser.roles = foundRoles.map(role => role._id);
    } else {
      const defaultRole = await Role.findOne({ name: "productor" });
      newUser.roles = [defaultRole._id];
    }

    // Guardar usuario
    const savedUser = await newUser.save();

    // Crear token JWT
    const token = jwt.sign(
      { id: savedUser._id },
      process.env.SECRET_KEY || "agroplus-secret",
      { expiresIn: 86400 } // 24 horas
    );

    res.status(201).json({
      message: "Usuario registrado correctamente",
      user: savedUser,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al registrar usuario" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const userFound = await User.findOne({ email }).populate("roles");
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    const passwordIsValid = await bcrypt.compare(password, userFound.password);
    if (!passwordIsValid)
      return res.status(401).json({ token: null, message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: userFound._id },
      process.env.SECRET_KEY || "agroplus-secret",
      { expiresIn: 86400 }
    );

    res.json({
      message: "Login exitoso",
      user: {
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        roles: userFound.roles.map(r => r.name),
      },
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al iniciar sesión" });
  }
};