import { db } from "../db";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";

/**
 * Servicio de autenticación para registro y login de usuarios.
 */
export const authService = {
  /**
   * Registra un nuevo usuario en la base de datos.
   * @param params Objeto con nombre, apellido, email y password.
   * @returns Un objeto con los datos básicos del usuario registrado.
   * @throws Error si el correo ya está registrado.
   */
  async register({ nombre, apellido, email, password }: { nombre: string; apellido: string; email: string; password: string }) {
    // Verifica si el email ya existe
    const [rows] = await db.query("SELECT id_usuario FROM usuario WHERE email = ?", [email]);
    if ((rows as any[]).length > 0) throw new Error("El correo ya está registrado");

    // Hashea la contraseña
    const passwordHash = await bcrypt.hash(password, 10);

    // Inserta el usuario en la base de datos
    await db.query(
      "INSERT INTO usuario (nombre, apellido, email, password, fecha_registro) VALUES (?, ?, ?, ?, NOW())",
      [nombre, apellido, email, passwordHash]
    );

    // Recupera el usuario insertado para devolver el id
    const [userRows] = await db.query("SELECT id_usuario, nombre, apellido, email FROM usuario WHERE email = ?", [email]);
    const user = (userRows as any[])[0];
    return { id: user.id_usuario, nombre: user.nombre, apellido: user.apellido, email: user.email };
  },

  /**
   * Inicia sesión de usuario.
   * @param params Objeto con email y password.
   * @returns Un objeto con los datos del usuario y un token JWT.
   * @throws Error si el usuario no existe o la contraseña es incorrecta.
   */
  async login({ email, password }: { email: string; password: string }) {
    // Busca el usuario por email
    const [rows] = await db.query("SELECT * FROM usuario WHERE email = ?", [email]);
    const user = (rows as any[])[0];
    if (!user) throw new Error("Usuario o contraseña incorrectos");

    // Compara la contraseña hasheada
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Usuario o contraseña incorrectos");

    // Genera el token JWT
    const token = jwt.sign(
      { userId: user.id_usuario, email: user.email },
      process.env.JWT_SECRET || "secreto_super_seguro",
      { expiresIn: "7d" }
    );

    return {
      user: { id: user.id_usuario, nombre: user.nombre, apellido: user.apellido, email: user.email },
      token
    };
  }
};