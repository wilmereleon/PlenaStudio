import { CartItem, productosDisponibles } from '../types/productos';

/**
 * Servicio para gestionar la sincronización del carrito con el backend
 * Versión corregida y simplificada
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

  private getAuthToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('plena_auth_token');
    }
    return null;
  }

  private getAuthHeaders(): Record<string, string> {
    const token = this.getAuthToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  }

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
      return false;
    }
  }

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

  async getCart(): Promise<CartItem[]> {
    try {
      const isAvailable = await this.isApiAvailable();
      if (!isAvailable) {
        const localCartData = localStorage.getItem('plena_cart');
        return localCartData ? JSON.parse(localCartData) : [];
      }

      const response = await fetch(this.baseUrl, {
        method: 'GET',
        headers: this.getAuthHeaders()
      });

      if (response.ok) {
        const data = await response.json();
        return data.items || [];
      } else {
        const localCartData = localStorage.getItem('plena_cart');
        return localCartData ? JSON.parse(localCartData) : [];
      }
    } catch (error) {
      console.error('Error al obtener carrito:', error);
      const localCartData = localStorage.getItem('plena_cart');
      return localCartData ? JSON.parse(localCartData) : [];
    }
  }

  async saveCart(items: CartItem[]): Promise<void> {
    try {
      const isAvailable = await this.isApiAvailable();
      if (!isAvailable) {
        localStorage.setItem('plena_cart', JSON.stringify(items));
        return;
      }

      const response = await fetch(`${this.baseUrl}/save`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ items })
      });

      if (!response.ok) {
        localStorage.setItem('plena_cart', JSON.stringify(items));
      }
    } catch (error) {
      console.error('Error al guardar carrito:', error);
      localStorage.setItem('plena_cart', JSON.stringify(items));
    }
  }

  async syncCartOnLogin(localCart: CartItem[]): Promise<CartItem[]> {
    try {
      const isAvailable = await this.isApiAvailable();
      if (!isAvailable) {
        return localCart;
      }

      const response = await fetch(`${this.baseUrl}/sync`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ items: localCart })
      });

      if (response.ok) {
        const serverCart = await response.json();
        return serverCart.items || [];
      } else {
        return localCart;
      }
    } catch (error) {
      console.log('Error en sincronización:', error);
      return localCart;
    }
  }

  async addToCart(productId: string, cantidad: number = 1): Promise<CartItem[]> {
    try {
      const isAvailable = await this.isApiAvailable();
      if (!isAvailable) {
        this.addItemLocal(productId, cantidad);
        return this.getCart();
      }

      const response = await fetch(`${this.baseUrl}/add`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ productId, cantidad })
      });

      if (!response.ok) {
        this.addItemLocal(productId, cantidad);
      }
      
      return this.getCart();
    } catch (error) {
      console.error('Error al agregar item:', error);
      this.addItemLocal(productId, cantidad);
      return this.getCart();
    }
  }

  async removeFromCart(productId: string): Promise<CartItem[]> {
    try {
      const isAvailable = await this.isApiAvailable();
      if (!isAvailable) {
        const localCartData = localStorage.getItem('plena_cart');
        if (localCartData) {
          let localCart: CartItem[] = JSON.parse(localCartData);
          localCart = localCart.filter(item => item.productId !== productId);
          localStorage.setItem('plena_cart', JSON.stringify(localCart));
        }
        return this.getCart();
      }

      const response = await fetch(`${this.baseUrl}/remove`, {
        method: 'DELETE',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ productId })
      });

      if (!response.ok) {
        const localCartData = localStorage.getItem('plena_cart');
        if (localCartData) {
          let localCart: CartItem[] = JSON.parse(localCartData);
          localCart = localCart.filter(item => item.productId !== productId);
          localStorage.setItem('plena_cart', JSON.stringify(localCart));
        }
      }
      
      return this.getCart();
    } catch (error) {
      console.error('Error al remover item:', error);
      const localCartData = localStorage.getItem('plena_cart');
      if (localCartData) {
        let localCart: CartItem[] = JSON.parse(localCartData);
        localCart = localCart.filter(item => item.productId !== productId);
        localStorage.setItem('plena_cart', JSON.stringify(localCart));
      }
      return this.getCart();
    }
  }

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
      console.error('Error al limpiar carrito:', error);
      localStorage.removeItem('plena_cart');
    }
  }
}

const cartService = CartService.getInstance();
export { cartService };
export default cartService;
