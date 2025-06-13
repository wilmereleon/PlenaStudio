import { Request, Response, NextFunction } from "express";

/**
 * Middleware de autenticación para rutas protegidas.
 * Verifica la presencia de un token (por ejemplo, en el header Authorization).
 * Si el token es válido, permite el acceso; si no, responde con 401.
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No autorizado: token faltante" });
  }

  const token = authHeader.split(" ")[1];

  // Aquí deberías validar el token (por ejemplo, JWT)
  // Por ahora, aceptamos cualquier token que no sea vacío
  if (!token || token === "null") {
    return res.status(401).json({ error: "No autorizado: token inválido" });
  }

  // Si el token es válido, continúa con la siguiente función
  next();
}