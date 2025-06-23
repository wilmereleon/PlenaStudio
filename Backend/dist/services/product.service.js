"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactService = void 0;
const contact_repository_1 = require("../repositories/contact.repository");
const uuid_1 = require("uuid");
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
    saveMessage(nombre, email, mensaje) {
        const contactMessage = {
            id: (0, uuid_1.v4)(),
            nombre,
            email,
            mensaje,
            fecha: new Date().toISOString(),
            leido: false
        };
        return contact_repository_1.contactRepository.save(contactMessage);
    }
    /**
     * Obtiene todos los mensajes de contacto.
     * @returns Lista de mensajes.
     */
    getAllMessages() {
        return contact_repository_1.contactRepository.getAll();
    }
    /**
     * Marca un mensaje como leído.
     * @param id ID del mensaje.
     * @returns true si se marcó, false si no se encontró.
     */
    markAsRead(id) {
        return contact_repository_1.contactRepository.markAsRead(id);
    }
}
exports.contactService = new ContactService();
