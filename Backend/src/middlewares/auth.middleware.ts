import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extender la interfaz Request para incluir user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        rol?: string;
      };
    }
  }
}

/**
 * Middleware de autenticación para rutas protegidas.
 * Verifica y decodifica el token JWT, extrayendo el userId.
 */
export function authMiddleware(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "No autorizado: token faltante" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verificar y decodificar el token JWT
    const decoded = jwt.verify(
      token, 
      process.env.JWT_SECRET || "secreto_super_seguro"
    ) as { userId: string; rol?: string };
    
    // Agregar información del usuario al request
    req.user = {
      userId: decoded.userId,
      rol: decoded.rol
    };

    next();
  } catch (error) {
    return res.status(401).json({ error: "No autorizado: token inválido" });
  }
}