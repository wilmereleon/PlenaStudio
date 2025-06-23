import { AccountStatus, LoginAttempt, LoginCredentials, User } from "../types/auth";
import { cartService } from "./cartService";
import { CartItem } from "../types/productos";

/**
 * AuthService
 * 
 * Servicio para gestionar la autenticación de usuarios en Plena Studio.
 * Maneja el registro y validación de usuarios, sesiones, intentos de login, bloqueo de cuentas y recuperación del usuario actual.
 * Funciona tanto con backend disponible como en modo fallback (solo frontend).
 */
class AuthService {
  private readonly USERS_KEY = 'plena_users';
  private readonly CURRENT_USER_KEY = 'plena_current_user';
  private readonly LOGIN_ATTEMPTS_KEY = 'plena_login_attempts';
  private readonly ACCOUNT_STATUS_KEY = 'plena_account_status';
  private readonly SESSION_KEY = 'plena_session';
  
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly BLOCK_DURATION = 30 * 60 * 1000; // 30 minutos
  private readonly SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 días

  private baseUrl: string;

  /**
   * Constructor: Inicializa usuarios por defecto y configura URLs dinámicas.
   */
  constructor() {
    // Configurar URL base según el entorno
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        this.baseUrl = 'http://localhost:3000/api/auth';
      } else if (hostname.includes('surge.sh')) {
        this.baseUrl = `https://${hostname}/api/auth`;
      } else if (hostname.includes('vercel.app')) {
        this.baseUrl = `https://${hostname}/api/auth`;
      } else {
        this.baseUrl = `${window.location.protocol}//${window.location.host}/api/auth`;
      }
    } else {
      this.baseUrl = '/api/auth';
    }
    
    console.log('🔧 AuthService inicializado con baseUrl:', this.baseUrl);
    this.initializeDefaultUsers();
  }

  /**
   * Verifica si la API de autenticación está disponible
   */
  private async isApiAvailable(): Promise<boolean> {
    try {
      const healthUrl = this.baseUrl.replace('/auth', '/health');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch(healthUrl, {
        method: 'GET',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.warn('⚠️ API de autenticación no disponible, usando modo fallback');
      return false;
    }
  }

  /**
   * Inicializa usuarios por defecto en localStorage si no existen.
   * Incluye usuarios adicionales para pruebas en entornos sin backend.
   */
  private initializeDefaultUsers(): void {
    const existingUsers = this.getStoredUsers();
    if (existingUsers.length === 0) {
      const defaultUsers = [
        {
          id: '1',
          nombre: 'Admin',
          apellido: 'PlenaStudio',
          edad: 30,
          tipoIdentificacion: 'CC',
          numeroIdentificacion: '12345678',
          email: 'admin@plenastudio.co',
          fechaRegistro: new Date().toISOString(),
          passwordHash: this.hashPassword('admin123')
        },
        {
          id: '2',
          nombre: 'Usuario',
          apellido: 'Demo',          edad: 25,
          tipoIdentificacion: 'CC',
          numeroIdentificacion: '87654321',
          email: 'usuario@demo.com',
          fechaRegistro: new Date().toISOString(),
          passwordHash: this.hashPassword('demo123')
        },
        {
          id: '3',
          nombre: 'Demo',
          apellido: 'Plena',
          edad: 28,
          tipoIdentificacion: 'CC',
          numeroIdentificacion: '11111111',
          email: 'demo@plenastudio.com',
          fechaRegistro: new Date().toISOString(),
          passwordHash: this.hashPassword('password')
        },
        {
          id: '4',
          nombre: 'Test',
          apellido: 'User',
          edad: 32,
          tipoIdentificacion: 'CC',
          numeroIdentificacion: '22222222',
          email: 'test@test.com',
          fechaRegistro: new Date().toISOString(),
          passwordHash: this.hashPassword('test123')
        },
        {
          id: '5',
          nombre: 'Ana',
          apellido: 'García',
          edad: 27,
          tipoIdentificacion: 'CC',
          numeroIdentificacion: '33333333',
          email: 'ana@example.com',
          fechaRegistro: new Date().toISOString(),
          passwordHash: this.hashPassword('ana123')
        }
      ];

      localStorage.setItem(this.USERS_KEY, JSON.stringify(defaultUsers));
    }
  }

  /**
   * Hashea la contraseña usando base64 y un salt fijo.
   * @param password Contraseña en texto plano.
   * @returns {string} Contraseña hasheada.
   */
  private hashPassword(password: string): string {
    return btoa(password + 'salt_plena_studio');
  }

  /**
   * Verifica si la contraseña coincide con el hash almacenado.
   * @param password Contraseña en texto plano.
   * @param hash Hash almacenado.
   * @returns {boolean} true si coincide, false si no.
   */
  private verifyPassword(password: string, hash: string): boolean {
    return this.hashPassword(password) === hash;
  }

  /**
   * Obtiene todos los usuarios almacenados.
   * @returns {any[]} Lista de usuarios.
   */
  private getStoredUsers(): any[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  /**
   * Obtiene el estado de la cuenta de un usuario por email.
   * @param email Correo electrónico.
   * @returns {AccountStatus} Estado de la cuenta.
   */
  private getAccountStatus(email: string): AccountStatus {
    const statusData = localStorage.getItem(this.ACCOUNT_STATUS_KEY);
    const allStatus: AccountStatus[] = statusData ? JSON.parse(statusData) : [];
    return allStatus.find(status => status.email === email) || {
      email,
      isBlocked: false,
      failedAttempts: 0
    };
  }

  /**
   * Actualiza el estado de la cuenta de un usuario.
   * @param status Estado actualizado.
   */
  private updateAccountStatus(status: AccountStatus): void {
    const statusData = localStorage.getItem(this.ACCOUNT_STATUS_KEY);
    let allStatus: AccountStatus[] = statusData ? JSON.parse(statusData) : [];
    
    const existingIndex = allStatus.findIndex(s => s.email === status.email);
    if (existingIndex >= 0) {
      allStatus[existingIndex] = status;
    } else {
      allStatus.push(status);
    }
    
    localStorage.setItem(this.ACCOUNT_STATUS_KEY, JSON.stringify(allStatus));
  }

  /**
   * Registra un intento de login en el historial.
   * @param email Correo electrónico.
   * @param success Si el intento fue exitoso.
   */
  private logLoginAttempt(email: string, success: boolean): void {
    const attemptsData = localStorage.getItem(this.LOGIN_ATTEMPTS_KEY);
    const attempts: LoginAttempt[] = attemptsData ? JSON.parse(attemptsData) : [];
    
    const newAttempt: LoginAttempt = {
      email,
      timestamp: Date.now(),
      success,
      ip: 'localhost'
    };
    
    attempts.push(newAttempt);
    if (attempts.length > 100) {
      attempts.splice(0, attempts.length - 100);
    }
    
    localStorage.setItem(this.LOGIN_ATTEMPTS_KEY, JSON.stringify(attempts));
  }

  /**
   * Verifica si la cuenta está bloqueada y calcula el tiempo restante.
   * @param email Correo electrónico.
   * @returns {Object} Objeto con flag de bloqueo y tiempo restante.
   */
  private isAccountBlocked(email: string): { blocked: boolean; timeLeft?: number } {
    const status = this.getAccountStatus(email);
    
    if (!status.isBlocked) return { blocked: false };
    
    if (status.blockUntil && Date.now() > status.blockUntil) {
      status.isBlocked = false;
      status.failedAttempts = 0;
      delete status.blockUntil;
      this.updateAccountStatus(status);
      return { blocked: false };
    }
    
    const timeLeft = status.blockUntil ? status.blockUntil - Date.now() : 0;
    return { blocked: true, timeLeft };
  }  /**
   * Obtiene la URL base de la API según el entorno
   */
  private getApiBaseUrl(): string {
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        // Desarrollo local
        return 'http://localhost:3000/api';
      } else if (hostname.includes('surge.sh')) {
        // Producción en Surge
        return `https://${hostname}/api`;
      } else if (hostname.includes('vercel.app')) {
        // Producción en Vercel
        return `https://${hostname}/api`;
      } else {
        // Fallback para otros entornos
        return `${window.location.protocol}//${window.location.host}/api`;
      }
    } else {
      // SSR fallback
      return '/api';
    }
  }
  /**
   * Realiza el login de un usuario contra el backend real o fallback local.
   * @param credentials Credenciales de inicio de sesión.
   * @returns {Promise<{ user: User; token: string; cart: CartItem[] }>} Usuario autenticado, token y carrito sincronizado.
   * @throws Error si las credenciales son incorrectas.
   */  async login(credentials: LoginCredentials): Promise<{ user: User; token: string; cart?: CartItem[] }> {
    console.log('🔑 Intentando login para:', credentials.email);
    
    // Verificar si la API está disponible
    const apiAvailable = await this.isApiAvailable();
    
    if (apiAvailable) {
      try {
        // Intentar login con backend
        const response = await fetch(`${this.baseUrl}/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(credentials)
        });
        
        if (response.ok) {
          const data = await response.json();
          
          // Guardar datos de sesión
          const sessionData = {
            user: data.user,
            token: data.token,
            timestamp: Date.now()
          };
          
          localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
          localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(data.user));
          
          console.log('✅ Login exitoso con backend');
          return data;
        } else {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData?.message || 'Credenciales incorrectas');
        }
      } catch (error) {
        console.warn('⚠️ Error con backend, intentando login local:', error);
        return this.loginLocal(credentials);
      }
    } else {
      // Sin backend disponible, usar login local
      console.log('🔧 API no disponible, usando autenticación local');
      return this.loginLocal(credentials);
    }
  }  /**
   * Login local como fallback cuando la API no está disponible.
   * Usa usuarios predefinidos almacenados en localStorage.
   */
  private async loginLocal(credentials: LoginCredentials): Promise<{ user: User; token: string; cart?: CartItem[] }> {
    console.log('🔧 Ejecutando login local para:', credentials.email);
      // Verificar intentos de login bloqueados
    const blockStatus = this.isAccountBlocked(credentials.email);
    if (blockStatus.blocked) {
      throw new Error('Cuenta bloqueada por demasiados intentos fallidos. Intenta en 30 minutos.');
    }
    
    // Buscar usuario en localStorage
    const users = this.getStoredUsers();
    const user = users.find(u => u.email === credentials.email);
    
    if (!user) {
      this.recordFailedAttempt(credentials.email);
      throw new Error('Usuario no encontrado');
    }
    
    // Verificar contraseña
    if (!this.verifyPassword(credentials.password, user.passwordHash)) {
      this.recordFailedAttempt(credentials.email);
      throw new Error('Contraseña incorrecta');
    }
    
    // Login exitoso
    this.clearFailedAttempts(credentials.email);
    
    // Crear token temporal para la sesión
    const token = btoa(`${user.email}:${Date.now()}:plena_session`);
    
    // Preparar datos del usuario
    const userData: User = {
      id: user.id,
      nombre: user.nombre,
      apellido: user.apellido,
      email: user.email,
      edad: user.edad,
      tipoIdentificacion: user.tipoIdentificacion,
      numeroIdentificacion: user.numeroIdentificacion,
      fechaRegistro: user.fechaRegistro
    };
    
    // Guardar sesión
    const sessionData = {
      user: userData,
      token: token,
      timestamp: Date.now()
    };
    
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(sessionData));
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userData));
    
    // Obtener carrito local para sincronizar
    const localCart = localStorage.getItem('plena_cart');
    const cartItems: CartItem[] = localCart ? JSON.parse(localCart) : [];
    
    console.log('✅ Login local exitoso para:', credentials.email);
    
    return {
      user: userData,
      token: token,
      cart: cartItems
    };
  }

  /**
   * Obtiene los items del carrito local (localStorage)
   */
  private getLocalCartItems(): CartItem[] {
    try {
      const localCart = localStorage.getItem('plena_cart');
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error('Error al obtener carrito local:', error);
      return [];
    }
  }

  /**
   * Limpia el carrito local después de sincronización exitosa
   */
  private clearLocalCart(): void {
    localStorage.removeItem('plena_cart');
  }

  /**
   * Genera un token de sesión para el usuario.
   * @param userId ID del usuario.
   * @returns {string} Token generado.
   */
  private generateToken(userId: string): string {
    const tokenData = {
      userId,
      timestamp: Date.now(),
      random: Math.random().toString(36)
    };
    return btoa(JSON.stringify(tokenData));
  }

  /**
   * Obtiene el usuario autenticado actual si la sesión es válida.
   * @returns {User | null} Usuario autenticado o null si no hay sesión válida.
   */
  getCurrentUser(): User | null {
    try {
      const sessionData = localStorage.getItem(this.SESSION_KEY);
      if (!sessionData) return null;
      
      const session = JSON.parse(sessionData);
      if (Date.now() > session.expiresAt) {
        this.logout();
        return null;
      }
      
      return session.user;
    } catch {
      return null;
    }
  }

  /**
   * Indica si hay un usuario autenticado.
   * @returns {boolean} true si hay usuario autenticado, false si no.
   */
  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  /**
   * Cierra la sesión del usuario actual (solo frontend, borra sesión local).
   */
  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  /**
   * Obtiene el historial de intentos de login.
   * @returns {LoginAttempt[]} Lista de intentos de login.
   */
  getLoginAttempts(): LoginAttempt[] {
    const attemptsData = localStorage.getItem(this.LOGIN_ATTEMPTS_KEY);
    return attemptsData ? JSON.parse(attemptsData) : [];
  }

  /**
   * Registra un intento fallido de login
   */
  private recordFailedAttempt(email: string): void {
    const status = this.getAccountStatus(email);
    status.failedAttempts = (status.failedAttempts || 0) + 1;
    
    if (status.failedAttempts >= this.MAX_LOGIN_ATTEMPTS) {
      status.isBlocked = true;
      status.blockUntil = Date.now() + this.BLOCK_DURATION;
    }
    
    this.updateAccountStatus(status);
  }

  /**
   * Limpia los intentos fallidos de login tras un login exitoso
   */
  private clearFailedAttempts(email: string): void {
    const status = this.getAccountStatus(email);
    status.failedAttempts = 0;
    status.isBlocked = false;
    delete status.blockUntil;
    
    this.updateAccountStatus(status);
  }
}

export const authService = new AuthService();