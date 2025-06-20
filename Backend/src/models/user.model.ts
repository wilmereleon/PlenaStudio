/**
 * Modelo para usuarios registrados en el sistema.
 */
export interface User {
  id: string;                   // Identificador único del usuario
  nombre: string;               // Nombre del usuario
  apellido: string;             // Apellido del usuario
  email: string;                // Correo electrónico
  passwordHash: string;         // Hash de la contraseña
  fechaRegistro: string;        // Fecha de registro (ISO string)
  direccion?: string;           // Dirección del usuario (opcional)
  telefono?: string;            // Teléfono del usuario (opcional)
  rol: "cliente" | "admin";     // Rol del usuario
  activo: boolean;              // Estado de la cuenta
}