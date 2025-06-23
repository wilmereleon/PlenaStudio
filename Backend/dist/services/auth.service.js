"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const db_1 = require("../db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Servicio de autenticación para registro y login de usuarios.
 */
exports.authService = {
    async register({ nombre, email, password }) {
        // Verifica si el email ya existe
        const [rows] = await db_1.db.query("SELECT id_usuario FROM usuario WHERE email = ?", [email]);
        if (rows.length > 0)
            throw new Error("El correo ya está registrado");
        // Hashea la contraseña
        const passwordHash = await bcryptjs_1.default.hash(password, 10);
        // Inserta el usuario en la base de datos
        await db_1.db.query("INSERT INTO usuario (nombre, email, password_hash, fecha_registro) VALUES (?, ?, ?, NOW())", [nombre, email, passwordHash]);
        // Recupera el usuario insertado para devolver el id
        const [userRows] = await db_1.db.query("SELECT id_usuario, nombre, email FROM usuario WHERE email = ?", [email]);
        const user = userRows[0];
        return { id: user.id_usuario, nombre: user.nombre, email: user.email };
    },
    /**
     * Inicia sesión de usuario.
     * @param params Objeto con email y password.
     * @returns Un objeto con los datos del usuario y un token JWT.
     * @throws Error si el usuario no existe o la contraseña es incorrecta.
     */
    async login({ email, password }) {
        // Busca el usuario por email
        const [rows] = await db_1.db.query("SELECT * FROM usuario WHERE email = ?", [email]);
        const user = rows[0];
        if (!user)
            throw new Error("Usuario o contraseña incorrectos"); // Compara la contraseña hasheada
        const valid = await bcryptjs_1.default.compare(password, user.password_hash);
        if (!valid)
            throw new Error("Usuario o contraseña incorrectos");
        // Genera el token JWT
        const token = jsonwebtoken_1.default.sign({ userId: user.id_usuario, email: user.email }, process.env.JWT_SECRET || "secreto_super_seguro", { expiresIn: "7d" });
        return {
            user: { id: user.id_usuario, nombre: user.nombre, email: user.email },
            token
        };
    }
};
