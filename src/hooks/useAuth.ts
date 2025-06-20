import { useState, useEffect } from 'react';
import { User } from '../types/auth';
import { authService } from '../services/authService';

/**
 * useAuth
 * 
 * Hook personalizado para manejar la autenticación de usuarios en Plena Studio.
 * Proporciona el usuario actual, estado de carga, funciones para login y logout, y un flag de autenticación.
 * 
 * @returns {Object} Objeto con:
 *  - user: Usuario autenticado o null.
 *  - loading: booleano que indica si está cargando el estado de autenticación.
 *  - login: función para iniciar sesión.
 *      @param {Object} credentials - Credenciales de inicio de sesión.
 *      @param {string} credentials.email - Correo electrónico.
 *      @param {string} credentials.password - Contraseña.
 *      @returns {Promise<any>} Resultado del login.
 *  - logout: función para cerrar sesión.
 *  - isAuthenticated: booleano que indica si hay usuario autenticado.
 */
export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Al montar, obtiene el usuario actual y actualiza el estado
  useEffect(() => {
    const currentUser = authService.getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  /**
   * Inicia sesión con las credenciales proporcionadas.
   * @param {Object} credentials - Credenciales de inicio de sesión.
   * @param {string} credentials.email - Correo electrónico.
   * @param {string} credentials.password - Contraseña.
   * @returns {Promise<any>} Resultado del login.
   */
  const login = async (credentials: { email: string; password: string }) => {
    const result = await authService.login(credentials);
    setUser(result.user);
    return result;
  };

  /**
   * Cierra la sesión del usuario actual.
   */
  const logout = () => {
    authService.logout();
    setUser(null);
  };

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated: !!user
  };
}