import { CartItem } from '../context/CartContext';

/**
 * Servicio para gestionar la sincronización del carrito con el backend
 */
export class CartService {
  private static instance: CartService;
  private baseUrl = 'http://localhost:3000/api/cart';

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
   * Sincroniza el carrito local con el carrito del servidor al hacer login
   * @param localCartItems Items del carrito local (localStorage)
   */
  async syncCartOnLogin(localCartItems: CartItem[]): Promise<CartItem[]> {
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
      console.error('Error al obtener carrito:', error);
      return [];
    }
  }

  /**
   * Agrega un producto al carrito en el servidor
   * @param productId ID del producto
   * @param cantidad Cantidad a agregar
   */
  async addToCart(productId: string, cantidad: number): Promise<CartItem[]> {
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
      console.error('Error al agregar producto al carrito:', error);
      throw error;
    }
  }

  /**
   * Elimina un producto del carrito en el servidor
   * @param productId ID del producto a eliminar
   */
  async removeFromCart(productId: string): Promise<CartItem[]> {
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
      console.error('Error al eliminar producto del carrito:', error);
      throw error;
    }
  }

  /**
   * Guarda todo el carrito en el servidor
   * @param items Items completos del carrito
   */
  async saveCart(items: CartItem[]): Promise<void> {
    try {
      const response = await fetch(this.baseUrl, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify({ items })
      });

      if (!response.ok) {
        throw new Error('Error al guardar carrito');
      }
    } catch (error) {
      console.error('Error al guardar carrito:', error);
      throw error;
    }
  }

  /**
   * Vacía el carrito en el servidor
   */
  async clearCart(): Promise<void> {
    try {
      const response = await fetch(`${this.baseUrl}/clear`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      if (!response.ok) {
        throw new Error('Error al vaciar carrito');
      }
    } catch (error) {
      console.error('Error al vaciar carrito:', error);
      throw error;
    }
  }
}

export const cartService = CartService.getInstance();
