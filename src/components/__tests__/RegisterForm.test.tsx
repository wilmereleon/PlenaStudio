import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import RegisterForm from "../RegisterForm";

/*
 * Pruebas unitarias para el componente RegisterForm.
 */
describe("RegisterForm", () => {
  /*
   * Debe renderizar el formulario de registro y mostrar todos los campos principales.
   */
  it("renderiza el formulario de registro", () => {
    render(<RegisterForm />);
    expect(screen.getByRole("form")).toBeInTheDocument();
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/confirmar/i)).toBeInTheDocument();
  });

  /*
   * Debe mostrar mensajes de error si el formulario se envía vacío.
   */
  it("muestra errores si se envía vacío", async () => {
    render(<RegisterForm />);
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => {
      expect(screen.getByText(/campo requerido/i)).toBeInTheDocument();
    });
  });

  /*
   * Debe enviar el formulario correctamente cuando los datos son válidos,
   * y no mostrar mensajes de error de campos requeridos.
   */
  it("envía el formulario correctamente con datos válidos", async () => {
    render(<RegisterForm />);
    fireEvent.change(screen.getByLabelText(/nombre/i), { target: { value: "Juan" } });
    fireEvent.change(screen.getByLabelText(/apellido/i), { target: { value: "Pérez" } });
    fireEvent.change(screen.getByLabelText(/correo/i), { target: { value: "juan@mail.com" } });
    fireEvent.change(screen.getByLabelText(/contraseña/i), { target: { value: "12345678" } });
    fireEvent.change(screen.getByLabelText(/confirmar/i), { target: { value: "12345678" } });
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => {
      expect(screen.queryByText(/campo requerido/i)).not.toBeInTheDocument();
    });
  });
});