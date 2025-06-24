"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authController = void 0;
const auth_service_1 = require("../services/auth.service");
/**
 * Controlador de autenticación: registro, login y logout.
 */
exports.authController = {
    /**
     * Registro de usuario.
     */ async register(req, res) {
        try {
            const { nombre, email, password } = req.body;
            const user = await auth_service_1.authService.register({ nombre, email, password });
            res.status(201).json(user);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    /**
     * Login de usuario.
     */
    async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await auth_service_1.authService.login({ email, password });
            res.json(result);
        }
        catch (error) {
            res.status(401).json({ error: error.message });
        }
    },
    /**
     * Logout (puedes expandir la lógica según tu sistema de tokens/sesiones).
     */
    logout(_req, res) {
        res.json({ message: "Sesión cerrada correctamente" });
    }
};
