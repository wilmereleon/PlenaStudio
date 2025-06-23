import { CartItem, productosDisponibles } from '../types/productos';

/**
 * Servicio para gestionar la sincronización del carrito con el backend
 */
export class CartService {
  private static instance: CartService;
  private baseUrl: string;

  constructor() {
    // Configurar URL base según el entorno
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        // Desarrollo local
        this.baseUrl = 'http://localhost:3000/api/cart';
      } else if (hostname.includes('surge.sh')) {
        // Producción en Surge
        this.baseUrl = `https://${hostname}/api/cart`;
      } else if (hostname.includes('vercel.app')) {
        // Producción en Vercel
        this.baseUrl = `https://${hostname}/api/cart`;
      } else {
        // Fallback para otros entornos
        this.baseUrl = `${window.location.protocol}//${window.location.host}/api/cart`;
      }
    } else {
      // SSR fallback
      this.baseUrl = '/api/cart';
    }
    
    console.log('🔧 CartService inicializado con baseUrl:', this.baseUrl);
  }

  static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService();
    }
    return CartService.instance;
  }

  /**
   * Obtiene el token de autenticación del localStorage
   */
  private getAuthToken(): string | null {
    const session = localStorage.getItem('plena_session');
    if (session) {
      const sessionData = JSON.parse(session);
      return sessionData.token;
    }
    return null;
  }

  /**
   * Cabeceras para requests autenticados
   */
  private getAuthHeaders(): HeadersInit {
    const token = this.getAuthToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

  /**
   * Verifica si la API está disponible
   */
  private async isApiAvailable(): Promise<boolean> {
    try {
      const healthUrl = this.baseUrl.replace('/cart', '/health');
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 segundos timeout
      
      const response = await fetch(healthUrl, {
        method: 'GET',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.warn('⚠️ API no disponible:', error);
      return false;
    }
  }

  /**
   * Obtiene el carrito desde localStorage como fallback
   */
  private getLocalCart(): CartItem[] {
    try {
      const localCart = localStorage.getItem('plena_cart');
      return localCart ? JSON.parse(localCart) : [];
    } catch (error) {
      console.error('Error al obtener carrito local:', error);
      return [];
    }
  }

  /**
   * Sincroniza el carrito local con el carrito del servidor al hacer login
   * @param localCartItems Items del carrito local (localStorage)
   */
  async syncCartOnLogin(localCartItems: CartItem[]): Promise<CartItem[]> {
    console.log('🔄 Iniciando sincronización del carrito...');
    
    // Verificar si la API está disponible
    const apiAvailable = await this.isApiAvailable();
    
    if (!apiAvailable) {
      console.warn('⚠️ API no disponible, manteniendo carrito local');
      // En entornos sin backend (Surge/Vercel), mantener el carrito local
      return localCartItems;
    }

    try {
      const response = await fetch(`${this.baseUrl}/sync`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ localCartItems })
      });

      if (!response.ok) {
        throw new Error('Error al sincronizar carrito');
      }

      const data = await response.json();
      return data.cart || [];
    } catch (error) {
      console.error('Error al sincronizar carrito:', error);
      return localCartItems; // Fallback al carrito local
    }
  }

  /**
   * Obtiene el carrito del usuario autenticado
   */
  async getCart(): Promise<CartItem[]> {
    // Verificar si la API está disponible
    const apiAvailable = await this.isApiAvailable();
    
    if (!apiAvailable) {
      console.warn('⚠️ API no disponible, usando carrito local');
      // Fallback: cargar desde localStorage
      return this.getLocalCart();
    }
    
    try {
      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Error al obtener carrito');
      }

      return await response.json();
    } catch (error) {
      console.error('Error al obtener carrito del servidor, usando local:', error);
      return this.getLocalCart();
    }
  }

  /**
   * Agrega un producto al carrito en el servidor o localmente
   * @param productId ID del producto
   * @param cantidad Cantidad a agregar
   */
  async addToCart(productId: string, cantidad: number): Promise<CartItem[]> {
    // Verificar si la API está disponible
    const apiAvailable = await this.isApiAvailable();
    
    if (!apiAvailable) {
      console.warn('⚠️ API no disponible, agregando al carrito local');
      return this.addToCartLocal(productId, cantidad);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/add`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ productId, cantidad })
      });

      if (!response.ok) {
        throw new Error('Error al agregar producto al carrito');
      }

      const data = await response.json();
      return data.cart || [];
    } catch (error) {
      console.error('Error al agregar producto al carrito del servidor, usando local:', error);
      return this.addToCartLocal(productId, cantidad);
    }
  }

  /**
   * Agrega un producto al carrito local como fallback
   */
  private addToCartLocal(productId: string, cantidad: number): CartItem[] {
    const currentCart = this.getLocalCart();
    
    // Buscar si el producto ya existe
    const existingItemIndex = currentCart.findIndex(item => item.productId === productId);
    
    if (existingItemIndex >= 0) {
      // Si existe, incrementar cantidad
      currentCart[existingItemIndex].cantidad += cantidad;
    } else {
      // Buscar el producto en el catálogo disponible
      const producto = productosDisponibles.find(p => p.productId === productId);
      
      if (!producto) {
        console.error('Producto no encontrado:', productId);
        return currentCart;
      }
      
      // Agregar producto con todos sus datos reales
      const newItem: CartItem = {
        ...producto,
        cantidad
      };
      currentCart.push(newItem);
    }
    
    // Guardar en localStorage
    localStorage.setItem('plena_cart', JSON.stringify(currentCart));
    console.log('✅ Producto agregado al carrito local:', productId);
    
    return currentCart;
  }

  /**
   * Elimina un producto del carrito en el servidor o localmente
   * @param productId ID del producto a eliminar
   */
  async removeFromCart(productId: string): Promise<CartItem[]> {
    // Verificar si la API está disponible
    const apiAvailable = await this.isApiAvailable();
    
    if (!apiAvailable) {
      console.warn('⚠️ API no disponible, eliminando del carrito local');
      return this.removeFromCartLocal(productId);
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/remove`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ productId })
      });

      if (!response.ok) {
        throw new Error('Error al eliminar producto del carrito');
      }

      const data = await response.json();
      return data.cart || [];
    } catch (error) {
      console.error('Error al eliminar producto del servidor, usando local:', error);
      return this.removeFromCartLocal(productId);
    }
  }

  /**
   * Elimina un producto del carrito local como fallback
   */
  private removeFromCartLocal(productId: string): CartItem[] {
    const currentCart = this.getLocalCart();
    const updatedCart = currentCart.filter(item => item.productId !== productId);
    
    // Guardar en localStorage
    localStorage.setItem('plena_cart', JSON.stringify(updatedCart));
    console.log('✅ Producto eliminado del carrito local:', productId);
    
    return updatedCart;
  }
  /**
   * Guarda el carrito completo en el servidor o localmente
   * @param items Items del carrito a guardar
   */
  async saveCart(items: CartItem[]): Promise<void> {
    console.log('💾 CartService.saveCart - Guardando carrito:', items.length, 'productos');
    console.log('💾 CartService.saveCart - Productos:', items.map(item => `${item.nombre} x${item.cantidad}`));
    
    // Verificar si la API está disponible
    const apiAvailable = await this.isApiAvailable();
    
    if (!apiAvailable) {
      console.warn('⚠️ API no disponible, guardando carrito localmente');
      localStorage.setItem('plena_cart', JSON.stringify(items));
      console.log('✅ Carrito guardado en localStorage');
      return;
    }
    
    try {
      console.log('📡 Enviando carrito al servidor...');
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ items })
      });

      if (!response.ok) {
        throw new Error('Error al guardar carrito');
      }
      
      console.log('✅ Carrito guardado en servidor exitosamente');
    } catch (error) {
      console.error('❌ Error al guardar carrito en servidor, usando local:', error);
      localStorage.setItem('plena_cart', JSON.stringify(items));
      console.log('✅ Carrito guardado en localStorage como fallback');
    }
  }

  /**
   * Limpia el carrito en el servidor o localmente
   */
  async clearCart(): Promise<void> {
    // Verificar si la API está disponible
    const apiAvailable = await this.isApiAvailable();
    
    if (!apiAvailable) {
      console.warn('⚠️ API no disponible, limpiando carrito local');
      localStorage.removeItem('plena_cart');
      return;
    }
    
    try {
      const response = await fetch(`${this.baseUrl}/clear`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Error al limpiar carrito');
      }
    } catch (error) {
      console.error('Error al limpiar carrito en servidor, limpiando local:', error);
      localStorage.removeItem('plena_cart');
    }
  }

}

// Exportar instancia singleton
export const cartService = CartService.getInstance();
