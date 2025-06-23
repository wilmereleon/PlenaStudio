import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../Login';
import { useAuth } from '../../hooks/useAuth';

// Mock del hook useAuth
jest.mock('../../hooks/useAuth');
const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>;

// Mock de react-router-dom
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

/**
 * PRUEBAS DE CAJA BLANCA - COMPONENTE LOGIN
 * 
 * Estas pruebas están diseñadas para cubrir todas las rutas de ejecución
 * identificadas en el análisis de caja blanca del componente Login.
 */
describe('Login - Pruebas de Caja Blanca', () => {
  const mockLogin = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      user: null,
      loading: false,
      isAuthenticated: false,
      logout: jest.fn(),
    });
  });

  const renderLogin = () => {
    return render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
  };

  /**
   * COBERTURA DE RUTA 1: Validación Fallida
   * Objetivo: Verificar que la validación funciona correctamente
   */
  describe('Ruta 1: Validación de Campos Requeridos', () => {
    it('CP1.1 - Debe prevenir envío cuando email está vacío', () => {
      renderLogin();
      
      // Llenar solo password
      const passwordInput = screen.getByLabelText(/contraseña/i);
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      // Enviar formulario
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      fireEvent.click(submitButton);
      
      // Verificar que no se llame login debido a validación HTML5
      expect(mockLogin).not.toHaveBeenCalled();
    });

    it('CP1.2 - Debe prevenir envío cuando password está vacío', () => {
      renderLogin();
      
      // Llenar solo email
      const emailInput = screen.getByLabelText(/correo/i);
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      
      // Enviar formulario
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      fireEvent.click(submitButton);
      
      // Verificar que no se llame login debido a validación HTML5
      expect(mockLogin).not.toHaveBeenCalled();
    });

    it('CP1.3 - Debe prevenir envío cuando ambos campos están vacíos', () => {
      renderLogin();
      
      // Enviar formulario sin llenar campos
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      fireEvent.click(submitButton);
      
      // Verificar que no se llame login debido a validación HTML5
      expect(mockLogin).not.toHaveBeenCalled();
    });
  });

  /**
   * COBERTURA DE RUTA 2: Login Exitoso
   * Objetivo: Cubrir la rama de éxito en el try-catch
   */
  describe('Ruta 2: Login Exitoso', () => {
    it('CP2.1 - Debe navegar a home cuando login es exitoso', async () => {
      // Mock login exitoso
      mockLogin.mockResolvedValueOnce({});
      
      renderLogin();
      
      // Llenar formulario
      const emailInput = screen.getByLabelText(/correo/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);
      fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      // Enviar formulario
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      fireEvent.click(submitButton);
      
      // Verificar llamadas
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith({
          email: 'user@test.com',
          password: 'password123'
        });
      });
      
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith('/');
      });
    });

    it('CP2.2 - Debe deshabilitar botón durante el envío', async () => {
      // Mock login que toma tiempo
      mockLogin.mockImplementation(() => new Promise(resolve => setTimeout(resolve, 100)));
      
      renderLogin();
      
      // Llenar formulario
      const emailInput = screen.getByLabelText(/correo/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);
      fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      // Enviar formulario
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      fireEvent.click(submitButton);
      
      // Verificar que el botón está deshabilitado inmediatamente
      expect(submitButton).toBeDisabled();
      expect(emailInput).toBeDisabled();
      expect(passwordInput).toBeDisabled();
      
      // Esperar a que termine
      await waitFor(() => {
        expect(submitButton).not.toBeDisabled();
      }, { timeout: 200 });
    });
  });

  /**
   * COBERTURA DE RUTA 3: Error en Login (Error Instance)
   * Objetivo: Cubrir la rama de error cuando el error es instancia de Error
   */
  describe('Ruta 3: Manejo de Errores - Error Instance', () => {
    it('CP3.1 - Debe mostrar mensaje específico cuando login falla con Error', async () => {
      // Mock login que falla con Error
      const errorMessage = 'Credenciales inválidas';
      mockLogin.mockRejectedValueOnce(new Error(errorMessage));
      
      renderLogin();
      
      // Llenar formulario
      const emailInput = screen.getByLabelText(/correo/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);
      fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpassword' } });
      
      // Enviar formulario
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      fireEvent.click(submitButton);
      
      // Verificar mensaje de error específico
      await waitFor(() => {
        expect(screen.getByText(errorMessage)).toBeInTheDocument();
      });
      
      // Verificar que no navegó
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });

  /**
   * COBERTURA DE RUTA 4: Error Desconocido (No Error Instance)
   * Objetivo: Cubrir la rama de error cuando el error NO es instancia de Error
   */
  describe('Ruta 4: Manejo de Errores - Non-Error Instance', () => {
    it('CP4.1 - Debe mostrar mensaje genérico para errores no-Error', async () => {
      // Mock login que falla con string (no Error instance)
      mockLogin.mockRejectedValueOnce('Network timeout');
      
      renderLogin();
      
      // Llenar formulario
      const emailInput = screen.getByLabelText(/correo/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);
      fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      // Enviar formulario
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      fireEvent.click(submitButton);
      
      // Verificar mensaje de error genérico
      await waitFor(() => {
        expect(screen.getByText(/error al iniciar sesión/i)).toBeInTheDocument();
      });
      
      // Verificar que no navegó
      expect(mockNavigate).not.toHaveBeenCalled();
    });

    it('CP4.2 - Debe mostrar mensaje genérico para valores null', async () => {
      // Mock login que falla con null
      mockLogin.mockRejectedValueOnce(null);
      
      renderLogin();
      
      // Llenar formulario
      const emailInput = screen.getByLabelText(/correo/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);
      fireEvent.change(emailInput, { target: { value: 'user@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'password123' } });
      
      // Enviar formulario
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      fireEvent.click(submitButton);
      
      // Verificar mensaje de error genérico
      await waitFor(() => {
        expect(screen.getByText(/error al iniciar sesión/i)).toBeInTheDocument();
      });
    });
  });

  /**
   * PRUEBAS ADICIONALES: Estados y Comportamientos
   * Objetivo: Cubrir funcionalidades adicionales del componente
   */
  describe('Estados y Comportamientos del Componente', () => {
    it('CP5.1 - Debe actualizar formData cuando se cambian los inputs', () => {
      renderLogin();
      
      const emailInput = screen.getByLabelText(/correo/i) as HTMLInputElement;
      const passwordInput = screen.getByLabelText(/contraseña/i) as HTMLInputElement;
      
      // Cambiar valores
      fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
      fireEvent.change(passwordInput, { target: { value: 'newpassword' } });
      
      // Verificar que los valores se actualizaron
      expect(emailInput.value).toBe('test@example.com');
      expect(passwordInput.value).toBe('newpassword');
    });

    it('CP5.2 - Debe limpiar error cuando se cambian los inputs después de error', async () => {
      // Mock login que falla
      mockLogin.mockRejectedValueOnce(new Error('Test error'));
      
      renderLogin();
      
      // Llenar y enviar formulario para generar error
      const emailInput = screen.getByLabelText(/correo/i);
      const passwordInput = screen.getByLabelText(/contraseña/i);
      fireEvent.change(emailInput, { target: { value: 'test@test.com' } });
      fireEvent.change(passwordInput, { target: { value: 'wrongpass' } });
      
      const submitButton = screen.getByRole('button', { name: /iniciar sesión/i });
      fireEvent.click(submitButton);
      
      // Esperar error
      await waitFor(() => {
        expect(screen.getByText('Test error')).toBeInTheDocument();
      });
      
      // Cambiar input para limpiar error
      fireEvent.change(emailInput, { target: { value: 'newemail@test.com' } });
      
      // Verificar que el error se limpió
      expect(screen.queryByText('Test error')).not.toBeInTheDocument();
    });

    it('CP5.3 - Debe alternar visibilidad de contraseña', () => {
      renderLogin();
      
      const passwordInput = screen.getByLabelText(/contraseña/i) as HTMLInputElement;
      // Buscar el span que contiene el ícono del ojo usando clase CSS
      const eyeIcon = screen.getByRole('button', { name: /iniciar sesión/i })
        .closest('form')!
        .querySelector('.eyeIcon')! as HTMLElement;
      
      // Inicialmente tipo password
      expect(passwordInput.type).toBe('password');
      
      // Click para mostrar
      fireEvent.click(eyeIcon);
      expect(passwordInput.type).toBe('text');
      
      // Click para ocultar
      fireEvent.click(eyeIcon);
      expect(passwordInput.type).toBe('password');
    });
  });

  /**
   * PRUEBAS DE RENDERIZADO
   * Objetivo: Verificar que todos los elementos se renderizan correctamente
   */
  describe('Renderizado del Componente', () => {    it('CP6.1 - Debe renderizar todos los elementos principales', () => {
      renderLogin();
      
      // Verificar elementos principales específicamente
      expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();
      expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
      expect(screen.getByText(/¿has olvidado tu contraseña?/i)).toBeInTheDocument();
      expect(screen.getByText(/crear una cuenta/i)).toBeInTheDocument();
    });

    it('CP6.2 - Debe mostrar logo de Plena Studio', () => {
      renderLogin();
      
      const logo = screen.getByAltText(/plena studio/i);
      expect(logo).toBeInTheDocument();
      expect(logo).toHaveAttribute('src', '/logoPlenaStudio.png');
    });
  });
});

/**
 * RESUMEN DE COBERTURA:
 * 
 * ✓ Ruta 1: Validación fallida (campos vacíos)
 * ✓ Ruta 2: Login exitoso (navegación y estados)
 * ✓ Ruta 3: Error instanceof Error (mensaje específico)
 * ✓ Ruta 4: Error no instanceof Error (mensaje genérico)
 * ✓ Estados del componente (inputs, toggles)
 * ✓ Renderizado completo
 * 
 * MÉTRICAS ESPERADAS:
 * - Statement Coverage: ~95%
 * - Branch Coverage: 100%
 * - Function Coverage: 100%
 */
