"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar variables de entorno desde .env si existe
dotenv_1.default.config();
/**
 * Conexión a la base de datos plena-studio usando mysql2.
 * Asegúrate de tener las variables de entorno configuradas en un archivo .env:
 * DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT (opcional)
 */
exports.db = promise_1.default.createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "plena-studio",
    port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
