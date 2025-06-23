import { CartItem, productosDisponibles } from '../types/productos';

/**
 * Servicio para gestionar la sincronización del carrito con el backend
 * Versión simplificada para resolver problemas de compilación
 */
class CartService {
  private static instance: CartService;
  private baseUrl: string;

  constructor() {
    // Configurar URL base según el entorno
    if (typeof window !== 'undefined') {
      const hostname = window.location.hostname;
      
      if (hostname === 'localhost' || hostname === '127.0.0.1') {
        this.baseUrl = 'http://localhost:3000/api/cart';
      } else if (hostname.includes('surge.sh')) {
        this.baseUrl = `https://${hostname}/api/cart`;
      } else if (hostname.includes('vercel.app')) {
        this.baseUrl = `https://${hostname}/api/cart`;
      } else {
        this.baseUrl = `${window.location.protocol}//${window.location.host}/api/cart`;
      }
    } else {
      this.baseUrl = 'http://localhost:3000/api/cart';
    }
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
    if (typeof window !== 'undefined') {
      return localStorage.getItem('plena_auth_token');
    }
    return null;
  }

  /**
   * Obtiene los headers de autenticación
   */
  private getAuthHeaders(): Record<string, string> {
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
      const timeoutId = setTimeout(() => controller.abort(), 3000);
      
      const response = await fetch(healthUrl, {
        method: 'GET',
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      return response.ok;
    } catch (error) {
      console.log('API no disponible, usando modo fallback local');
      return false;
    }
  }

  /**
   * Obtiene productos por IDs desde el catálogo local
   */
  private getProductosPorIds(productIds: string[]): CartItem[] {
    return productIds.map(id => {
      const producto = productosDisponibles.find(p => p.productId === id);
      if (producto) {
        return {
          productId: producto.productId,
          nombre: producto.nombre,
          descripcion: producto.descripcion,
          precio: producto.precio,
          imagen: producto.imagen,
          cantidad: 1
        };
      }
      return null;
    }).filter(Boolean) as CartItem[];
  }

  /**
   * Sincroniza el carrito local con el servidor
   */
  async syncCartWithServer(localCart: CartItem[]): Promise<CartItem[]> {
    try {
      const isAvailable = await this.isApiAvailable();
      if (!isAvailable) {
        console.log('🔄 API no disponible, manteniendo carrito local');
        return localCart;
      }

      const response = await fetch(`${this.baseUrl}/sync`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ items: localCart })
      });

      if (response.ok) {
        const serverCart = await response.json();
        console.log('✅ Carrito sincronizado con servidor');
        return serverCart.items || [];
      } else {
        console.log('⚠️ Error en sincronización, manteniendo carrito local');
        return localCart;
      }
    } catch (error) {
      console.log('⚠️ Error de red, manteniendo carrito local:', error);
      return localCart;
    }
  }

  /**
   * Obtiene el carrito del usuario
   */
  async getCart(): Promise<CartItem[]> {
    try {
      const isAvailable = await this.isApiAvailable();
      if (!isAvailable) {
        // Fallback: usar carrito local
        const localCartData = localStorage.getItem('plena_cart');
        if (localCartData) {
          return JSON.parse(localCartData);
        }
        return [];
      }

      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        return data.items || [];
      } else {
        // Fallback: usar carrito local
        const localCartData = localStorage.getItem('plena_cart');
        if (localCartData) {
          return JSON.parse(localCartData);
        }
        return [];
      }
    } catch (error) {
      console.error('Error al obtener carrito, usando local:', error);
      const localCartData = localStorage.getItem('plena_cart');
      if (localCartData) {
        return JSON.parse(localCartData);
      }
      return [];
    }
  }

  /**
   * Agrega un item al carrito
   */
  async addItem(productId: string, cantidad: number = 1): Promise<void> {
    try {
      const isAvailable = await this.isApiAvailable();
      if (!isAvailable) {
        // Fallback: usar carrito local
        this.addItemLocal(productId, cantidad);
        return;
      }

      const response = await fetch(`${this.baseUrl}/add`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ productId, cantidad })
      });

      if (!response.ok) {
        // Fallback: usar carrito local
        this.addItemLocal(productId, cantidad);
      }
    } catch (error) {
      console.error('Error al agregar item al servidor, agregando local:', error);
      this.addItemLocal(productId, cantidad);
    }
  }

  /**
   * Agrega un item al carrito local
   */
  private addItemLocal(productId: string, cantidad: number): void {
    const producto = productosDisponibles.find(p => p.productId === productId);
    if (!producto) return;

    const localCartData = localStorage.getItem('plena_cart');
    let localCart: CartItem[] = localCartData ? JSON.parse(localCartData) : [];

    const existingItemIndex = localCart.findIndex(item => item.productId === productId);
    if (existingItemIndex > -1) {
      localCart[existingItemIndex].cantidad += cantidad;
    } else {
      localCart.push({
        productId: producto.productId,
        nombre: producto.nombre,
        descripcion: producto.descripcion,
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad
      });
    }

    localStorage.setItem('plena_cart', JSON.stringify(localCart));
  }

  /**
   * Actualiza la cantidad de un item
   */
  async updateQuantity(productId: string, cantidad: number): Promise<void> {
    try {
      const isAvailable = await this.isApiAvailable();
      if (!isAvailable) {
        // Fallback: usar carrito local
        this.updateQuantityLocal(productId, cantidad);
        return;
      }

      const response = await fetch(`${this.baseUrl}/update`, {
        method: 'PUT',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ productId, cantidad })
      });

      if (!response.ok) {
        this.updateQuantityLocal(productId, cantidad);
      }
    } catch (error) {
      console.error('Error al actualizar cantidad en servidor, actualizando local:', error);
      this.updateQuantityLocal(productId, cantidad);
    }
  }

  /**
   * Actualiza la cantidad de un item local
   */
  private updateQuantityLocal(productId: string, cantidad: number): void {
    const localCartData = localStorage.getItem('plena_cart');
    if (!localCartData) return;

    let localCart: CartItem[] = JSON.parse(localCartData);
    const itemIndex = localCart.findIndex(item => item.productId === productId);
    
    if (itemIndex > -1) {
      if (cantidad <= 0) {
        localCart.splice(itemIndex, 1);
      } else {
        localCart[itemIndex].cantidad = cantidad;
      }
      localStorage.setItem('plena_cart', JSON.stringify(localCart));
    }
  }

  /**
   * Remueve un item del carrito
   */
  async removeItem(productId: string): Promise<void> {
    try {
      const isAvailable = await this.isApiAvailable();
      if (!isAvailable) {
        this.removeItemLocal(productId);
        return;
      }

      const response = await fetch(`${this.baseUrl}/remove`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ productId })
      });

      if (!response.ok) {
        this.removeItemLocal(productId);
      }
    } catch (error) {
      console.error('Error al remover item del servidor, removiendo local:', error);
      this.removeItemLocal(productId);
    }
  }

  /**
   * Remueve un item del carrito local
   */
  private removeItemLocal(productId: string): void {
    const localCartData = localStorage.getItem('plena_cart');
    if (!localCartData) return;

    let localCart: CartItem[] = JSON.parse(localCartData);
    localCart = localCart.filter(item => item.productId !== productId);
    localStorage.setItem('plena_cart', JSON.stringify(localCart));
  }

  /**
   * Limpia todo el carrito
   */
  async clearCart(): Promise<void> {
    const isAvailable = await this.isApiAvailable();
    if (!isAvailable) {
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
const cartService = CartService.getInstance();
export { cartService };
export default cartService;
