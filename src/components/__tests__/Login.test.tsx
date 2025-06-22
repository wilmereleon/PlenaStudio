import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Login from '../Login';

/**
 * Test para verificar que el formulario de inicio de sesión se renderiza correctamente.
 * Se asegura de que el texto "Iniciar sesión" esté presente en el documento.
 */
test('muestra el formulario de inicio de sesión', () => {
  render(<Login />);
  expect(screen.getByText(/iniciar sesión/i)).toBeInTheDocument();
});