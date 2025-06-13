import { db } from "../db";
import { v4 as uuidv4 } from "uuid";

/**
 * Servicio para gestionar el carrito de compras de los usuarios.
 */
export const cartService = {
  /**
   * Obtiene el carrito de un usuario, creándolo si no existe.
   */
  async getCart(userId: string) {
    const [carts] = await db.query("SELECT * FROM carts WHERE user_id = ?", [userId]);
    let cart = (carts as any[])[0];
    if (!cart) {
      const cartId = uuidv4();
      await db.query("INSERT INTO carts (id, user_id, created_at) VALUES (?, ?, NOW())", [cartId, userId]);
      cart = { id: cartId, user_id: userId };
    }
    const [items] = await db.query(
      `SELECT ci.id, ci.product_id, ci.cantidad, p.nombre, p.precio, p.imagen
       FROM cart_items ci
       JOIN products p ON ci.product_id = p.id
       WHERE ci.cart_id = ?`, [cart.id]);
    return { cartId: cart.id, items };
  },

  /**
   * Agrega un producto al carrito del usuario.
   */
  async addToCart(userId: string, productId: string, cantidad: number) {
    const [carts] = await db.query("SELECT * FROM carts WHERE user_id = ?", [userId]);
    let cart = (carts as any[])[0];
    if (!cart) {
      const cartId = uuidv4();
      await db.query("INSERT INTO carts (id, user_id, created_at) VALUES (?, ?, NOW())", [cartId, userId]);
      cart = { id: cartId, user_id: userId };
    }
    const [items] = await db.query("SELECT * FROM cart_items WHERE cart_id = ? AND product_id = ?", [cart.id, productId]);
    if ((items as any[]).length > 0) {
      await db.query("UPDATE cart_items SET cantidad = cantidad + ? WHERE cart_id = ? AND product_id = ?", [cantidad, cart.id, productId]);
    } else {
      await db.query("INSERT INTO cart_items (id, cart_id, product_id, cantidad) VALUES (?, ?, ?, ?)", [uuidv4(), cart.id, productId, cantidad]);
    }
    return this.getCart(userId);
  },

  /**
   * Elimina un producto del carrito del usuario.
   */
  async removeFromCart(userId: string, productId: string) {
    const [carts] = await db.query("SELECT * FROM carts WHERE user_id = ?", [userId]);
    const cart = (carts as any[])[0];
    if (!cart) throw new Error("Carrito no encontrado");
    await db.query("DELETE FROM cart_items WHERE cart_id = ? AND product_id = ?", [cart.id, productId]);
    return this.getCart(userId);
  },

  /**
   * Vacía el carrito del usuario.
   */
  async clearCart(userId: string) {
    const [carts] = await db.query("SELECT * FROM carts WHERE user_id = ?", [userId]);
    const cart = (carts as any[])[0];
    if (!cart) throw new Error("Carrito no encontrado");
    await db.query("DELETE FROM cart_items WHERE cart_id = ?", [cart.id]);
    return this.getCart(userId);
  }
};