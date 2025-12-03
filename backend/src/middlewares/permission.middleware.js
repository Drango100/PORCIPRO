import { AuthService } from "../services/auth/auth.service.js";

/**
 * Middleware que exige un permiso específico
 * Ejemplo: requirePermission("crear_usuario")
 */
export function requirePermission(permissionName) {
  return async function(req, res, next) {

    const userId = req.user?.id;
    if (!userId)
      return res.status(401).json({ ok: false, message: "No autenticado" });

    const permissions = await AuthService.getUserPermissions(userId);

    const has = permissions.some(p => p.name === permissionName);

    if (!has)
      return res.status(403).json({
        ok: false,
        message: `Permiso requerido: ${permissionName}`
      });

    next();
  };
}
