import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Login';

test('muestra el formulario de inicio de sesión', () => {
  render(
    <MemoryRouter>
      <Login />
    </MemoryRouter>
  );
  // Verifica que el título esté presente
  expect(screen.getByRole('heading', { name: /iniciar sesión/i })).toBeInTheDocument();
  // Verifica que el botón esté presente
  expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
});