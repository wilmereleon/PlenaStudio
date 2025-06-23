"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactRepository = void 0;
/**
 * Repositorio en memoria para mensajes de contacto.
 * Puedes reemplazarlo por una base de datos real en producción.
 */
class ContactRepository {
    constructor() {
        this.messages = [];
    }
    /**
     * Guarda un nuevo mensaje de contacto.
     * @param message Mensaje a guardar.
     * @returns El mensaje guardado.
     */
    save(message) {
        this.messages.push(message);
        return message;
    }
    /**
     * Obtiene todos los mensajes de contacto.
     * @returns Lista de mensajes.
     */
    getAll() {
        return this.messages;
    }
    /**
     * Marca un mensaje como leído.
     * @param id ID del mensaje.
     * @returns true si se marcó, false si no se encontró.
     */
    markAsRead(id) {
        const msg = this.messages.find(m => m.id === id);
        if (msg) {
            msg.leido = true;
            return true;
        }
        return false;
    }
}
exports.contactRepository = new ContactRepository();
