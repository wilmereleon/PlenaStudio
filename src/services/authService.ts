import { AccountStatus, LoginAttempt, LoginCredentials, User } from "../types/auth";

class AuthService {
  private readonly USERS_KEY = 'plena_users';
  private readonly CURRENT_USER_KEY = 'plena_current_user';
  private readonly LOGIN_ATTEMPTS_KEY = 'plena_login_attempts';
  private readonly ACCOUNT_STATUS_KEY = 'plena_account_status';
  private readonly SESSION_KEY = 'plena_session';
  
  private readonly MAX_LOGIN_ATTEMPTS = 5;
  private readonly BLOCK_DURATION = 30 * 60 * 1000; // 30 minutos
  private readonly SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 días

  constructor() {
    this.initializeDefaultUsers();
  }

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
          apellido: 'Demo',
          edad: 25,
          tipoIdentificacion: 'CC',
          numeroIdentificacion: '87654321',
          email: 'usuario@demo.com',
          fechaRegistro: new Date().toISOString(),
          passwordHash: this.hashPassword('demo123')
        }
      ];

      localStorage.setItem(this.USERS_KEY, JSON.stringify(defaultUsers));
    }
  }

  private hashPassword(password: string): string {
    return btoa(password + 'salt_plena_studio');
  }

  private verifyPassword(password: string, hash: string): boolean {
    return this.hashPassword(password) === hash;
  }

  private getStoredUsers(): any[] {
    const users = localStorage.getItem(this.USERS_KEY);
    return users ? JSON.parse(users) : [];
  }

  private getAccountStatus(email: string): AccountStatus {
    const statusData = localStorage.getItem(this.ACCOUNT_STATUS_KEY);
    const allStatus: AccountStatus[] = statusData ? JSON.parse(statusData) : [];
    return allStatus.find(status => status.email === email) || {
      email,
      isBlocked: false,
      failedAttempts: 0
    };
  }

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
  }

  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    const { email, password } = credentials;
    
    const blockStatus = this.isAccountBlocked(email);
    if (blockStatus.blocked) {
      const minutes = Math.ceil((blockStatus.timeLeft || 0) / 60000);
      throw new Error(`Cuenta bloqueada. Intenta de nuevo en ${minutes} minutos.`);
    }
    
    const users = this.getStoredUsers();
    const user = users.find(u => u.email === email);
    
    if (!user) {
      this.logLoginAttempt(email, false);
      throw new Error('Credenciales incorrectas');
    }
    
    const isValidPassword = this.verifyPassword(password, user.passwordHash);
    
    if (!isValidPassword) {
      this.logLoginAttempt(email, false);
      
      const status = this.getAccountStatus(email);
      status.failedAttempts += 1;
      status.lastAttempt = Date.now();
      
      if (status.failedAttempts >= this.MAX_LOGIN_ATTEMPTS) {
        status.isBlocked = true;
        status.blockUntil = Date.now() + this.BLOCK_DURATION;
        this.updateAccountStatus(status);
        throw new Error(`Demasiados intentos fallidos. Cuenta bloqueada por 30 minutos.`);
      }
      
      this.updateAccountStatus(status);
      const remainingAttempts = this.MAX_LOGIN_ATTEMPTS - status.failedAttempts;
      throw new Error(`Credenciales incorrectas. Te quedan ${remainingAttempts} intentos.`);
    }
    
    this.logLoginAttempt(email, true);
    
    const status = this.getAccountStatus(email);
    status.failedAttempts = 0;
    status.isBlocked = false;
    delete status.blockUntil;
    this.updateAccountStatus(status);
    
    const token = this.generateToken(user.id);
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.passwordHash;
    
    const session = {
      user: userWithoutPassword,
      token,
      expiresAt: Date.now() + this.SESSION_DURATION
    };
    
    localStorage.setItem(this.SESSION_KEY, JSON.stringify(session));
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(userWithoutPassword));
    
    return { user: userWithoutPassword, token };
  }

  private generateToken(userId: string): string {
    const tokenData = {
      userId,
      timestamp: Date.now(),
      random: Math.random().toString(36)
    };
    return btoa(JSON.stringify(tokenData));
  }

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

  isAuthenticated(): boolean {
    return this.getCurrentUser() !== null;
  }

  logout(): void {
    localStorage.removeItem(this.SESSION_KEY);
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }

  getLoginAttempts(): LoginAttempt[] {
    const attemptsData = localStorage.getItem(this.LOGIN_ATTEMPTS_KEY);
    return attemptsData ? JSON.parse(attemptsData) : [];
  }
}

export const authService = new AuthService();