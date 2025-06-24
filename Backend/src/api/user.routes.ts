import { Router } from 'express';
import { authService } from '../services/auth.service';

const router = Router();

router.post('/usuarios', async (req, res) => {
  try {
    const { nombre, email, password } = req.body;
    if (!nombre || !email || !password) {
      return res.status(400).json({ message: 'Faltan campos obligatorios' });
    }
    const user = await authService.register({ nombre, email, password });
    res.status(201).json({ message: 'Usuario registrado correctamente', user });
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Error al registrar usuario' });
  }
});

export default router;