import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { cartService } from '../services/cartService';
import { authService } from '../services/authService';
import { CartItem, Producto, productosDisponibles } from '../types/productos';

// Re-export types for convenience
export type { CartItem, Producto };
export { productosDisponibles };

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

    checkAuth();    // Escuchar cambios de autenticación
    const handleAuthChange = (e: CustomEvent) => {
      const { user } = e.detail;
      const wasAuthenticated = isAuthenticated;
      const newAuthState = !!user;
      
      console.log("🔄 Cambio de autenticación detectado:", { 
        wasAuthenticated, 
        newAuthState, 
        currentCartSize: cartItems.length 
      });
      
      setIsAuthenticated(newAuthState);
        if (newAuthState && !wasAuthenticated) {
        // LOGIN: Usuario se autentica
        console.log("🟢 LOGIN detectado - sincronizando carrito");
        syncCartOnLogin();      } else if (!newAuthState && wasAuthenticated) {
        // LOGOUT: Usuario se desautentica
        console.log("🔴 Usuario hizo logout - procesando carrito");
        setDiscount(0);   // Limpiar descuentos
        
        // IMPORTANTE: El carrito ya fue guardado en BD por authService.logout()
        // Ahora cargar carrito local inmediatamente (sin timeout para evitar parpadeo)
        console.log("🔄 Cargando carrito desde localStorage después del logout");
        loadCartFromLocalStorage();
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
  };  /**
   * Sincroniza cambios con el servidor si el usuario está autenticado
   */
  const syncWithServer = async (newCartItems: CartItem[]) => {
    if (isAuthenticated) {
      console.log('🔄 CartContext.syncWithServer - Usuario autenticado, sincronizando:', newCartItems.length, 'productos');
      console.log('📦 CartContext.syncWithServer - Productos a sincronizar:', newCartItems.map(item => `${item.nombre} x${item.cantidad}`));
      
      try {
        await cartService.saveCart(newCartItems);
        console.log('✅ CartContext.syncWithServer - Carrito guardado en BD exitosamente');
      } catch (error) {
        console.error('❌ CartContext.syncWithServer - Error al sincronizar carrito con servidor:', error);
        // En caso de error, mantener el carrito local pero mostrar advertencia
        console.log('🔄 Fallback: manteniendo carrito local hasta próxima sincronización');
        
        // Guardar en localStorage como fallback
        localStorage.setItem('plena_cart', JSON.stringify(newCartItems));
        console.log('💾 Carrito guardado en localStorage como fallback');
      }
    } else {
      console.log('⚠️ CartContext.syncWithServer - Usuario no autenticado, guardando solo en localStorage');
      // Para usuarios no autenticados, guardar en localStorage
      localStorage.setItem('plena_cart', JSON.stringify(newCartItems));
      console.log('💾 Carrito guardado en localStorage para usuario no autenticado');
    }
  };
  /**
   * Sincroniza el carrito local con el servidor durante el login
   */
  const syncCartOnLogin = async () => {
    try {
      console.log("🔄 Iniciando sincronización de carrito en login...");
      
      // Obtener carrito local actual
      const localCart = [...cartItems];
      console.log("📦 Carrito local actual:", localCart);
      
      if (localCart.length > 0) {
        // Si hay productos en el carrito local, sincronizarlos con el servidor
        console.log("🔄 Sincronizando carrito local con servidor...");
        const syncedCart = await cartService.syncCartOnLogin(localCart);
        console.log("✅ Carrito sincronizado exitosamente:", syncedCart);
        setCartItems(syncedCart);
        
        // Limpiar carrito local después de sincronización exitosa
        localStorage.removeItem('plena_cart');
        console.log("🗑️ Carrito local limpiado después de sincronización");
      } else {
        // Si no hay carrito local, cargar del servidor
        console.log("📥 Cargando carrito del servidor...");
        await loadCartFromServer();
      }
    } catch (error) {
      console.error('❌ Error en sincronización de carrito:', error);
      // En caso de error, mantener el carrito local
      console.log("🔄 Manteniendo carrito local por error en sincronización");
    }
  };
  // Añadir producto al carrito
  const addItem = async (producto: Producto, cantidad: number = 1) => {
    if (isAuthenticated) {
      try {
        console.log('🛒 Usuario autenticado - agregando producto al servidor:', producto.nombre);
        const updatedCart = await cartService.addToCart(producto.productId, cantidad);
        setCartItems(updatedCart);
        console.log('✅ Producto agregado al carrito del servidor exitosamente');
      } catch (error) {
        console.error('❌ Error al agregar producto al servidor:', error);
        // Fallback a comportamiento local
        console.log('🔄 Fallback: agregando producto localmente');
        await addItemLocal(producto, cantidad);
      }
    } else {
      console.log('👤 Usuario no autenticado - agregando producto localmente:', producto.nombre);
      await addItemLocal(producto, cantidad);
    }
  };
  // Añadir producto localmente (fallback o usuarios no autenticados)
  const addItemLocal = async (producto: Producto, cantidad: number = 1) => {
    let newCartItems: CartItem[] = [];
    
    setCartItems(prev => {
      const existe = prev.find(item => item.productId === producto.productId);
      if (existe) {
        newCartItems = prev.map(item =>
          item.productId === producto.productId
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      } else {
        newCartItems = [...prev, { ...producto, cantidad }];
      }
      return newCartItems;
    });
    
    // Sincronizar con servidor si el usuario está autenticado
    await syncWithServer(newCartItems);
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
        setCartItems(updatedCart);      } catch (error) {
        console.error('Error al eliminar producto:', error);
        // Fallback a comportamiento local
        await removeItemLocal(productId);
      }
    } else {
      await removeItemLocal(productId);
    }
  };
  // Remover producto localmente (fallback o usuarios no autenticados)
  const removeItemLocal = async (productId: string) => {
    let newCartItems: CartItem[] = [];
    
    setCartItems(prev => {
      newCartItems = prev.filter(item => item.productId !== productId);
      return newCartItems;
    });
    
    // Sincronizar con servidor si el usuario está autenticado
    await syncWithServer(newCartItems);
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