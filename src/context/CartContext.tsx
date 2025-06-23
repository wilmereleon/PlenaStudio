import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { authService } from '../services/authService';

// Listado actualizado de productos disponibles
export const productosDisponibles = [
  { productId: "1", nombre: "Aretes Luna Dorada", descripcion: "Aretes Luna Dorada", precio: 28000, imagen: "earring01.jpeg" },
  { productId: "2", nombre: "Aretes Flor de Cristal", descripcion: "Aretes Flor de Cristal", precio: 32000, imagen: "earring04.jpeg" },
  { productId: "3", nombre: "Anillo Aurora Plateado", descripcion: "Anillo Aurora Plateado", precio: 24000, imagen: "ring01.jpeg" },
  { productId: "4", nombre: "Anillo Esencia Minimalista", descripcion: "Anillo Esencia Minimalista", precio: 22000, imagen: "ring02.jpeg" },
  { productId: "5", nombre: "Anillo Corazón de Plata", descripcion: "Anillo Corazón de Plata", precio: 26000, imagen: "ring03.jpeg" },
  { productId: "6", nombre: "Aretes Gota de Luz", descripcion: "Aretes Gota de Luz", precio: 30000, imagen: "womenEarring0.jpeg" },
  { productId: "7", nombre: "Aretes Perla Elegante", descripcion: "Aretes Perla Elegante", precio: 34000, imagen: "womenEarring01.jpeg" },
  { productId: "8", nombre: "Aretes Hoja Tropical", descripcion: "Aretes Hoja Tropical", precio: 29000, imagen: "womenEarring02.jpeg" },
  { productId: "9", nombre: "Aretes Estrella de Mar", descripcion: "Aretes Estrella de Mar", precio: 31000, imagen: "womenEarring03.jpeg" },
  { productId: "10", nombre: "Aretes Círculo Moderno", descripcion: "Aretes Círculo Moderno", precio: 27000, imagen: "womenEarring04.jpeg" },
  { productId: "11", nombre: "Aretes Rosa Pastel", descripcion: "Aretes Rosa Pastel", precio: 33000, imagen: "womenEarring05.jpeg" },
  { productId: "12", nombre: "Aretes Sol Naciente", descripcion: "Aretes Sol Naciente", precio: 28000, imagen: "womenEarring06.jpeg" },
  { productId: "13", nombre: "Aretes Bohemia Chic", descripcion: "Aretes Bohemia Chic", precio: 35000, imagen: "womenEarring07.jpeg" },
  { productId: "14", nombre: "Aretes Lluvia de Plata", descripcion: "Aretes Lluvia de Plata", precio: 32000, imagen: "womenEarring08.jpeg" },
  { productId: "15", nombre: "Aretes Vintage Coral", descripcion: "Aretes Vintage Coral", precio: 30000, imagen: "womenEarring09.jpeg" },
  { productId: "16", nombre: "Aretes Esfera Dorada", descripcion: "Aretes Esfera Dorada", precio: 29000, imagen: "womenEarring10.jpeg" },
  { productId: "17", nombre: "Aretes Minimal Oro", descripcion: "Aretes Minimal Oro", precio: 26000, imagen: "womenEarring11.jpeg" },
  { productId: "18", nombre: "Aretes Fantasía Azul", descripcion: "Aretes Fantasía Azul", precio: 31000, imagen: "womenEarring12.jpeg" },
  { productId: "19", nombre: "Aretes Encanto Natural", descripcion: "Aretes Encanto Natural", precio: 27000, imagen: "womenEarring13.jpeg" },
  { productId: "20", nombre: "Aretes Fiesta de Color", descripcion: "Aretes Fiesta de Color", precio: 34000, imagen: "womenEarring14.jpeg" },
];

export type Producto = typeof productosDisponibles[0];

export type CartItem = Producto & { cantidad: number };

type CartContextType = {
  cartItems: CartItem[];
  addItem: (producto: Producto, cantidad?: number) => void;
  updateQuantity: (productId: string, cantidad: number) => void;
  removeItem: (productId: string) => void;
  subtotal: number;
  total: number;
  applyDiscount: () => void;
  checkout: () => void;
};

export const CartContext = createContext<CartContextType>({} as CartContextType);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  // Verificar estado de autenticación al montar
  useEffect(() => {
    const checkAuth = () => {
      const currentUser = authService.getCurrentUser();
      setIsAuthenticated(!!currentUser);
      
      if (currentUser) {
        // Usuario autenticado: cargar carrito del servidor
        loadCartFromServer();
      } else {
        // Usuario no autenticado: cargar carrito del localStorage
        loadCartFromLocalStorage();
      }
    };

    checkAuth();
      // Escuchar cambios de autenticación
    const handleAuthChange = (e: CustomEvent) => {
      const { user, cart } = e.detail;
      const wasAuthenticated = isAuthenticated;
      const newAuthState = !!user;
      
      setIsAuthenticated(newAuthState);
      
      if (newAuthState && !wasAuthenticated) {
        // LOGIN: Usuario se autentica
        if (cart) {
          // Login exitoso con carrito sincronizado desde servidor
          setCartItems(cart);
        } else {
          // Login exitoso, cargar carrito del servidor
          loadCartFromServer();
        }
      } else if (!newAuthState && wasAuthenticated) {
        // LOGOUT: Usuario se desautentica
        console.log("🔴 Usuario hizo logout - limpiando carrito");
        setCartItems([]); // Limpiar carrito inmediatamente
        setDiscount(0);   // Limpiar descuentos
        
        // Cargar carrito local si existe (para sesión no autenticada)
        setTimeout(() => {
          loadCartFromLocalStorage();
        }, 100);
      }
    };
    
    // Escuchar cambios en localStorage para detectar cambios de sesión
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'plena_current_user') {
        checkAuth();
      }
    };
    
    window.addEventListener('authStateChanged', handleAuthChange as EventListener);
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('authStateChanged', handleAuthChange as EventListener);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // Persistir carrito en localStorage para usuarios no autenticados
  useEffect(() => {
    if (!isAuthenticated) {
      localStorage.setItem('plena_cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isAuthenticated]);

  /**
   * Carga el carrito desde localStorage (usuarios no autenticados)
   */
  const loadCartFromLocalStorage = () => {
    try {
      const savedCart = localStorage.getItem('plena_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error('Error al cargar carrito local:', error);
    }
  };

  /**
   * Carga el carrito desde el servidor (usuarios autenticados)
   */
  const loadCartFromServer = async () => {
    try {
      const serverCart = await cartService.getCart();
      setCartItems(serverCart);
    } catch (error) {
      console.error('Error al cargar carrito del servidor:', error);
      // Fallback a carrito local en caso de error
      loadCartFromLocalStorage();
    }
  };

  /**
   * Sincroniza cambios con el servidor si el usuario está autenticado
   */
  const syncWithServer = async (newCartItems: CartItem[]) => {
    if (isAuthenticated) {
      try {
        await cartService.saveCart(newCartItems);
      } catch (error) {
        console.error('Error al sincronizar carrito con servidor:', error);
        // En caso de error, mantener el carrito local pero mostrar advertencia
      }
    }
  };

  // Añadir producto al carrito
  const addItem = async (producto: Producto, cantidad: number = 1) => {
    if (isAuthenticated) {
      try {
        const updatedCart = await cartService.addToCart(producto.productId, cantidad);
        setCartItems(updatedCart);
      } catch (error) {
        console.error('Error al agregar producto:', error);
        // Fallback a comportamiento local
        addItemLocal(producto, cantidad);
      }
    } else {
      addItemLocal(producto, cantidad);
    }
  };

  // Añadir producto localmente (fallback o usuarios no autenticados)
  const addItemLocal = (producto: Producto, cantidad: number = 1) => {
    setCartItems(prev => {
      const existe = prev.find(item => item.productId === producto.productId);
      if (existe) {
        return prev.map(item =>
          item.productId === producto.productId
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { ...producto, cantidad }];
    });
  };

  // Actualizar cantidad
  const updateQuantity = async (productId: string, cantidad: number) => {
    const newCartItems = cartItems.map(item =>
      item.productId === productId ? { ...item, cantidad } : item
    );
    setCartItems(newCartItems);
    await syncWithServer(newCartItems);
  };

  // Remover producto
  const removeItem = async (productId: string) => {
    if (isAuthenticated) {
      try {
        const updatedCart = await cartService.removeFromCart(productId);
        setCartItems(updatedCart);
      } catch (error) {
        console.error('Error al eliminar producto:', error);
        // Fallback a comportamiento local
        removeItemLocal(productId);
      }
    } else {
      removeItemLocal(productId);
    }
  };

  // Remover producto localmente (fallback o usuarios no autenticados)
  const removeItemLocal = (productId: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== productId));
  };

  // Calcular subtotal y total
  const subtotal = cartItems.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const total = subtotal - discount;

  // Aplicar descuento ficticio
  const applyDiscount = () => setDiscount(5000);

  // Simular checkout
  const checkout = async () => {
    if (isAuthenticated) {
      try {
        await cartService.clearCart();
      } catch (error) {
        console.error('Error al vaciar carrito en servidor:', error);
      }
    }
    
    alert("¡Gracias por tu compra!");
    setCartItems([]);
    setDiscount(0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addItem,
        updateQuantity,
        removeItem,
        subtotal,
        total,
        applyDiscount,
        checkout,
      }}
    >
        {children}
    </CartContext.Provider>
  );
};

// Custom hook para consumir el contexto de carrito
export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de un CartProvider");
  }
  return context;
}