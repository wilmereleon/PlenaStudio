import { ContactMessage } from "../models/contact.model";
import { contactRepository } from "../repositories/contact.repository";
import { v4 as uuidv4 } from "uuid";

/**
 * Servicio para gestionar mensajes de contacto.
 */
class ContactService {
  /**
   * Guarda un nuevo mensaje de contacto.
   * @param nombre Nombre del remitente.
   * @param email Correo electrónico del remitente.
   * @param mensaje Contenido del mensaje.
   * @returns El mensaje guardado.
   */
  saveMessage(nombre: string, email: string, mensaje: string): ContactMessage {
    const contactMessage: ContactMessage = {
      id: uuidv4(),
      nombre,
      email,
      mensaje,
      fecha: new Date().toISOString(),
      leido: false
    };
    return contactRepository.save(contactMessage);
  }

  /**
   * Obtiene todos los mensajes de contacto.
   * @returns Lista de mensajes.
   */
  getAllMessages(): ContactMessage[] {
    return contactRepository.getAll();
  }

  /**
   * Marca un mensaje como leído.
   * @param id ID del mensaje.
   * @returns true si se marcó, false si no se encontró.
   */
  markAsRead(id: string): boolean {
    return contactRepository.markAsRead(id);
  }
}

export const contactService = new ContactService();