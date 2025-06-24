"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
// eslint-disable-next-line @typescript-eslint/no-var-requires
const nodemailer = require("nodemailer");
/**
 * Envía un correo electrónico usando Nodemailer.
 *
 * @param to Destinatario del correo.
 * @param subject Asunto del correo.
 * @param html Contenido HTML del mensaje.
 * @returns Promise<void>
 */
const sendEmail = async (to, subject, html) => {
    // Configuración del transporte (ajusta con tus credenciales reales)
    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || "smtp.example.com",
        port: process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587,
        secure: false,
        auth: {
            user: process.env.SMTP_USER || "usuario@example.com",
            pass: process.env.SMTP_PASS || "contraseña"
        }
    });
    // Envío del correo
    await transporter.sendMail({
        from: process.env.SMTP_FROM || '"Plena Studio" <no-reply@plenastudio.co>',
        to,
        subject,
        html
    });
};
exports.sendEmail = sendEmail;
