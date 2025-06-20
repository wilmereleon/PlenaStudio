/**
 * @interface User
 * Representa un usuario registrado en el sistema.
 * @property {string} id - Identificador único del usuario.
 * @property {string} nombre - Nombre del usuario.
 * @property {string} apellido - Apellido del usuario.
 * @property {number} edad - Edad del usuario.
 * @property {string} tipoIdentificacion - Tipo de identificación (CC, CE, TI, etc).
 * @property {string} numeroIdentificacion - Número de identificación.
 * @property {string} email - Correo electrónico del usuario.
 * @property {string} fechaRegistro - Fecha de registro del usuario (ISO string).
 */
export interface User {
  id: string;
  nombre: string;
  apellido: string;
  edad: number;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  email: string;
  fechaRegistro: string;
}

/**
 * @interface LoginCredentials
 * Estructura para las credenciales de inicio de sesión.
 * @property {string} email - Correo electrónico.
 * @property {string} password - Contraseña.
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * @interface RegisterData
 * Estructura para los datos de registro de usuario.
 * @property {string} nombre - Nombre del usuario.
 * @property {string} apellido - Apellido del usuario.
 * @property {number} edad - Edad del usuario.
 * @property {string} tipoIdentificacion - Tipo de identificación.
 * @property {string} numeroIdentificacion - Número de identificación.
 * @property {string} email - Correo electrónico.
 * @property {string} password - Contraseña.
 * @property {string} confirmPassword - Confirmación de la contraseña.
 */
export interface RegisterData {
  nombre: string;
  apellido: string;
  edad: number;
  tipoIdentificacion: string;
  numeroIdentificacion: string;
  email: string;
  password: string;
  confirmPassword: string;
}

/**
 * @interface LoginAttempt
 * Representa un intento de inicio de sesión.
 * @property {string} email - Correo electrónico usado en el intento.
 * @property {number} timestamp - Marca de tiempo del intento (en milisegundos).
 * @property {boolean} success - Indica si el intento fue exitoso.
 * @property {string} [ip] - Dirección IP desde donde se realizó el intento (opcional).
 */
export interface LoginAttempt {
  email: string;
  timestamp: number;
  success: boolean;
  ip?: string;
}

/**
 * @interface AccountStatus
 * Estado de la cuenta de un usuario para control de bloqueos.
 * @property {string} email - Correo electrónico del usuario.
 * @property {boolean} isBlocked - Indica si la cuenta está bloqueada.
 * @property {number} [blockUntil] - Marca de tiempo hasta cuando la cuenta está bloqueada (opcional).
 * @property {number} failedAttempts - Número de intentos fallidos.
 * @property {number} [lastAttempt] - Marca de tiempo del último intento fallido (opcional).
 */
export interface AccountStatus {
  email: string;
  isBlocked: boolean;
  blockUntil?: number;
  failedAttempts: number;
  lastAttempt?: number;
}