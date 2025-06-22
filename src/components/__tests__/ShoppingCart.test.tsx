import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ShoppingCart from "../../pages/ShoppingCart";
import { CartProvider } from "../../context/CartContext";

/**
 * Renderiza un componente envuelto en el CartProvider para simular el contexto del carrito.
 * @param ui Componente a renderizar.
 * @returns Render result de Testing Library.
 */
const renderWithProvider = (ui: React.ReactElement) => {
  return render(<CartProvider>{ui}</CartProvider>);
};

describe("ShoppingCart", () => {
  /**
   * Verifica que el carrito se renderiza vacío mostrando los textos correspondientes.
   */
  it("renderiza el carrito vacío", () => {
    renderWithProvider(<ShoppingCart />);
    expect(screen.getByText(/carrito/i)).toBeInTheDocument();
    expect(screen.getByText(/no hay productos/i)).toBeInTheDocument();
  });

  /**
   * Test de ejemplo para mostrar productos agregados al carrito.
   * Debe ser implementado según la lógica de tu contexto.
   */
  it("muestra productos agregados al carrito", () => {
    // Simular productos en el contexto sería ideal, pero depende de la implementación.
    // Aquí solo se muestra la estructura básica del test.
    // Puedes mockear el contexto o extender este test según tu lógica.
  });

  /**
   * Test de ejemplo para eliminar productos del carrito.
   * Debe ser implementado según la lógica de tu contexto.
   */
  it("permite eliminar productos del carrito", () => {
    // Similar al anterior, aquí deberías simular un producto y luego eliminarlo.
    // fireEvent.click(screen.getByRole("button", { name: /eliminar/i }));
    // expect(...).not.toBeInTheDocument();
  });
});