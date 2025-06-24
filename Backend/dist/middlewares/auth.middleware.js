"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = authMiddleware;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Middleware de autenticación para rutas protegidas.
 * Verifica y decodifica el token JWT, extrayendo el userId.
 */
function authMiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ error: "No autorizado: token faltante" });
    }
    const token = authHeader.split(" ")[1];
    try {
        // Verificar y decodificar el token JWT
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET || "secreto_super_seguro");
        // Agregar información del usuario al request
        req.user = {
            userId: decoded.userId,
            rol: decoded.rol
        };
        next();
    }
    catch (error) {
        return res.status(401).json({ error: "No autorizado: token inválido" });
    }
}
