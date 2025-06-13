import { User } from "../models/user.model";

/**
 * Repositorio en memoria para usuarios.
 * Puedes reemplazarlo por una base de datos real en producción.
 */
class UserRepository {
  private users: User[] = [];

  /**
   * Guarda un nuevo usuario.
   * @param user Usuario a guardar.
   * @returns El usuario guardado.
   */
  save(user: User): User {
    this.users.push(user);
    return user;
  }

  /**
   * Busca un usuario por su email.
   * @param email Correo electrónico.
   * @returns El usuario encontrado o undefined.
   */
  findByEmail(email: string): User | undefined {
    return this.users.find(u => u.email === email);
  }

  /**
   * Busca un usuario por su ID.
   * @param id ID del usuario.
   * @returns El usuario encontrado o undefined.
   */
  findById(id: string): User | undefined {
    return this.users.find(u => u.id === id);
  }

  /**
   * Actualiza los datos de un usuario.
   * @param id ID del usuario.
   * @param data Datos a actualizar.
   * @returns true si se actualizó, false si no se encontró.
   */
  update(id: string, data: Partial<User>): boolean {
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
  getAll(): User[] {
    return this.users;
  }
}

export const userRepository = new UserRepository();