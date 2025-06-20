import { Request, Response } from "express";
import { sendEmail } from "../adapters/email.adapter";

/**
 * Controlador para el formulario de contacto.
 */
export const contactController = {
  async sendContactForm(req: Request, res: Response) {
    const { nombre, email, mensaje } = req.body;
    try {
      await sendEmail(
        "soporte@plenastudio.co",
        "Nuevo mensaje de contacto",
        `<b>De:</b> ${nombre} (${email})<br/><p>${mensaje}</p>`
      );
      res.json({ message: "Mensaje enviado correctamente" });
    } catch (error: any) {
      res.status(500).json({ error: "No se pudo enviar el mensaje" });
    }
  }
};