"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_service_1 = require("../services/auth.service");
const router = (0, express_1.Router)();
router.post('/usuarios', async (req, res) => {
    try {
        const { nombre, email, password } = req.body;
        if (!nombre || !email || !password) {
            return res.status(400).json({ message: 'Faltan campos obligatorios' });
        }
        const user = await auth_service_1.authService.register({ nombre, email, password });
        res.status(201).json({ message: 'Usuario registrado correctamente', user });
    }
    catch (error) {
        res.status(400).json({ message: error.message || 'Error al registrar usuario' });
    }
});
exports.default = router;
