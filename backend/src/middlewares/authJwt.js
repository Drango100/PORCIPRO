import jwt from "jsonwebtoken";
import User from "../models/User.Model.js";
import Role from "../models/Roles.Model.js";

export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).json({ message: "No se proporcionó token" });

    const decoded = jwt.verify(token, process.env.SECRET_KEY || "agroplus-secret");
    req.userId = decoded.id;

    const user = await User.findById(req.userId, { password: 0 });
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    next();
  } catch (error) {
    res.status(401).json({ message: "No autorizado" });
  }
};

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId).populate("roles");
  const roles = user.roles.map(role => role.name);

  if (roles.includes("admin")) {
    next();
    return;
  }
  return res.status(403).json({ message: "Requiere rol de administrador" });
};