import mysql from "mysql2/promise";
import dotenv from "dotenv";

// Cargar variables de entorno desde .env si existe
dotenv.config();

/**
 * Conexión a la base de datos plena-studio usando mysql2.
 * Asegúrate de tener las variables de entorno configuradas en un archivo .env:
 * DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT (opcional)
 */
export const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "",
  database: process.env.DB_NAME || "plena-studio",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});