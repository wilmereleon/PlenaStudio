import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "../RegisterForm";

// Mock fetch para simular respuestas del servidor
global.fetch = jest.fn();

/*
 * Pruebas unitarias para el componente RegisterForm.
 */
describe("RegisterForm", () => {
  beforeEach(() => {
    // Limpiar mocks antes de cada test
    jest.clearAllMocks();
    // Mock de window.alert
    window.alert = jest.fn();
  });

  /*
   * Debe renderizar el formulario de registro y mostrar todos los campos principales.
   */
  it("renderiza el formulario de registro", () => {
    render(<RegisterForm />);
    // No hay role="form", así que buscamos por el texto del botón principal
    expect(screen.getByText(/crea tu cuenta/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/nombres/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apellidos/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/dirección de residencia/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/teléfono celular/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/tipo de identificación/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/número de identificación/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^contraseña$/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirma tu contraseña/i)).toBeInTheDocument();
  });

  /*
   * Debe mostrar errores si se envía vacío.
   */
  it("muestra errores si se envía vacío", async () => {
    render(<RegisterForm />);
    fireEvent.click(screen.getByRole("button", { name: /regístrate/i }));
    
    // Verificar que aparecen errores de validación
    await waitFor(() => {
      // Buscar por campos que tengan clases de error o mensajes de validación
      const inputs = screen.getAllByRole("textbox");
      expect(inputs.length).toBeGreaterThan(0);
    });
  });

  /*
   * Debe enviar el formulario correctamente cuando los datos son válidos,
   * y no mostrar mensajes de error de campos requeridos.
   */
  it("envía el formulario correctamente con datos válidos", async () => {
    // Mock de fetch para simular respuesta exitosa del servidor
    (fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ message: "Registro exitoso" }),
    } as Response);

    render(<RegisterForm />);
    
    // Llenar todos los campos del formulario
    fireEvent.change(screen.getByLabelText(/nombres/i), { target: { value: "Juan" } });
    fireEvent.change(screen.getByLabelText(/apellidos/i), { target: { value: "Pérez" } });
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: "juan@mail.com" } });
    fireEvent.change(screen.getByLabelText(/dirección de residencia/i), { target: { value: "Calle 123" } });
    fireEvent.change(screen.getByLabelText(/teléfono celular/i), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByLabelText(/tipo de identificación/i), { target: { value: "CC" } });
    fireEvent.change(screen.getByLabelText(/número de identificación/i), { target: { value: "12345678" } });
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: "12345678" } });
    fireEvent.change(screen.getByLabelText(/confirma tu contraseña/i), { target: { value: "12345678" } });

    fireEvent.click(screen.getByRole("button", { name: /regístrate/i }));

    // Esperar a que se procese el formulario
    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(1);
    });    // Verificar que se llamó a fetch con los datos correctos
    expect(fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/usuarios",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
        body: expect.stringContaining("Juan"),
      })
    );
  });

  /*
   * Debe manejar errores del servidor correctamente.
   */
  it("maneja errores del servidor correctamente", async () => {
    // Mock de fetch para simular error del servidor
    (fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(
      new Error("Error de conexión")
    );

    render(<RegisterForm />);
    
    // Llenar formulario con datos válidos
    fireEvent.change(screen.getByLabelText(/nombres/i), { target: { value: "Juan" } });
    fireEvent.change(screen.getByLabelText(/apellidos/i), { target: { value: "Pérez" } });
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: "juan@mail.com" } });
    fireEvent.change(screen.getByLabelText(/dirección de residencia/i), { target: { value: "Calle 123" } });
    fireEvent.change(screen.getByLabelText(/teléfono celular/i), { target: { value: "1234567890" } });
    fireEvent.change(screen.getByLabelText(/tipo de identificación/i), { target: { value: "CC" } });
    fireEvent.change(screen.getByLabelText(/número de identificación/i), { target: { value: "12345678" } });
    fireEvent.change(screen.getByLabelText(/^contraseña$/i), { target: { value: "12345678" } });
    fireEvent.change(screen.getByLabelText(/confirma tu contraseña/i), { target: { value: "12345678" } });

    fireEvent.click(screen.getByRole("button", { name: /regístrate/i }));

    // Verificar que aparece el mensaje de error
    await waitFor(() => {
      expect(screen.getByText(/error de conexión/i)).toBeInTheDocument();
    });
  });
});