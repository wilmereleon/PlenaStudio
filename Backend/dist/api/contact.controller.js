"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactController = void 0;
const email_adapter_1 = require("../adapters/email.adapter");
/**
 * Controlador para el formulario de contacto.
 */
exports.contactController = {
    async sendContactForm(req, res) {
        const { nombre, email, mensaje } = req.body;
        try {
            await (0, email_adapter_1.sendEmail)("soporte@plenastudio.co", "Nuevo mensaje de contacto", `<b>De:</b> ${nombre} (${email})<br/><p>${mensaje}</p>`);
            res.json({ message: "Mensaje enviado correctamente" });
        }
        catch (error) {
            res.status(500).json({ error: "No se pudo enviar el mensaje" });
        }
    }
};
