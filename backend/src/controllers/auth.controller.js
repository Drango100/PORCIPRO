import User from "../models/User.Model.js";
import jwt from "jsonwebtoken";

export const signin = async (req, res) => {
  try {
    const userFound = await User.findOne({ email: req.body.email }).populate("roles");
    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });

    const matchPassword = await User.comparePassword(req.body.password, userFound.password);
    if (!matchPassword)
      return res.status(401).json({ token: null, message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: userFound._id }, process.env.JWT_SECRET, {
      expiresIn: 86400, // 24 horas
    });

    res.json({ token, user: userFound.username, roles: userFound.roles });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
