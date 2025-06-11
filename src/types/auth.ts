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

export interface LoginCredentials {
  email: string;
  password: string;
}

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

export interface LoginAttempt {
  email: string;
  timestamp: number;
  success: boolean;
  ip?: string;
}

export interface AccountStatus {
  email: string;
  isBlocked: boolean;
  blockUntil?: number;
  failedAttempts: number;
  lastAttempt?: number;
}