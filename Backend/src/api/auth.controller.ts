import { Request, Response } from "express";
import { authService } from "../services/auth.service";

/**
 * Controlador de autenticación: registro, login y logout.
 */
export const authController = {
  /**
   * Registro de usuario.
   */
  async register(req: Request, res: Response) {
    try {
      const { nombre, apellido, email, password } = req.body;
      const user = await authService.register({ nombre, apellido, email, password });
      res.status(201).json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  },

  /**
   * Login de usuario.
   */
  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await authService.login({ email, password });
      res.json(result);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  },

  /**
   * Logout (puedes expandir la lógica según tu sistema de tokens/sesiones).
   */
  logout(_req: Request, res: Response) {
    res.json({ message: "Sesión cerrada correctamente" });
  }
};