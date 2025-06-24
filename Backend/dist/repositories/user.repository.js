"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepository = void 0;
/**
 * Repositorio en memoria para usuarios.
 * Puedes reemplazarlo por una base de datos real en producción.
 */
class UserRepository {
    constructor() {
        this.users = [];
    }
    /**
     * Guarda un nuevo usuario.
     * @param user Usuario a guardar.
     * @returns El usuario guardado.
     */
    save(user) {
        this.users.push(user);
        return user;
    }
    /**
     * Busca un usuario por su email.
     * @param email Correo electrónico.
     * @returns El usuario encontrado o undefined.
     */
    findByEmail(email) {
        return this.users.find(u => u.email === email);
    }
    /**
     * Busca un usuario por su ID.
     * @param id ID del usuario.
     * @returns El usuario encontrado o undefined.
     */
    findById(id) {
        return this.users.find(u => u.id === id);
    }
    /**
     * Actualiza los datos de un usuario.
     * @param id ID del usuario.
     * @param data Datos a actualizar.
     * @returns true si se actualizó, false si no se encontró.
     */
    update(id, data) {
        const user = this.users.find(u => u.id === id);
        if (user) {
            Object.assign(user, data);
            return true;
        }
        return false;
    }
    /**
     * Obtiene todos los usuarios.
     * @returns Lista de usuarios.
     */
    getAll() {
        return this.users;
    }
}
exports.userRepository = new UserRepository();
