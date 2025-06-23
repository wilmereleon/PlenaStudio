import React, { ReactNode, useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import ShoppingCart from "../../pages/ShoppingCart";
import { CartContext, CartItem } from "../../context/CartContext";

// Mock de producto con las propiedades correctas
const mockProduct: CartItem = {
  productId: "1",
  nombre: "Aretes de prueba",
  descripcion: "Aretes de prueba",
  precio: 50000,
  imagen: "/InsumosIMG/aretes-test.png",
  cantidad: 2,
};

// Wrapper para simular el contexto con estado real
function CartProviderTest({
  children,
  initialCartItems = [],
}: {
  children: ReactNode;
  initialCartItems?: CartItem[];
}) {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);

  const removeItem = (productId: string) =>
    setCartItems(items => items.filter(item => item.productId !== productId));

  const updateQuantity = jest.fn();

  const subtotal = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const total = subtotal;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem: jest.fn(),
        removeItem,
        updateQuantity,
        subtotal,
        total,
        applyDiscount: jest.fn(),
        checkout: jest.fn(),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

const renderWithProvider = (ui: React.ReactElement, cartItems: CartItem[] = []) => {
  return render(
    <MemoryRouter>
      <CartProviderTest initialCartItems={cartItems}>
        {ui}
      </CartProviderTest>
    </MemoryRouter>
  );
};

describe("ShoppingCart", () => {
  it("renderiza el carrito vacío", () => {
    renderWithProvider(<ShoppingCart />);
    // Usar heading específico para evitar coincidencias múltiples
    expect(screen.getByRole('heading', { name: /tu carrito de compras/i })).toBeInTheDocument();
    expect(screen.getByText(/no hay productos en el carrito/i)).toBeInTheDocument();
  });

  it("muestra productos agregados al carrito", () => {
    renderWithProvider(<ShoppingCart />, [mockProduct]);
    // El nombre aparece en nombre y descripción, así que usamos getAllByText
    expect(screen.getAllByText(/aretes de prueba/i).length).toBeGreaterThan(0);
    expect(screen.getByText(/\$?50,?0?0?0?/i)).toBeInTheDocument();
    // Si tienes un label para cantidad, usa getByLabelText, si no, puedes omitir esta línea o buscar el input por role
  });

  it("permite eliminar productos del carrito", () => {
    renderWithProvider(<ShoppingCart />, [mockProduct]);
    const deleteButton = screen.getByRole("button", { name: /eliminar/i });
    fireEvent.click(deleteButton);
    expect(screen.queryByText(/aretes de prueba/i)).not.toBeInTheDocument();
    expect(screen.getByText(/no hay productos en el carrito/i)).toBeInTheDocument();
  });
});