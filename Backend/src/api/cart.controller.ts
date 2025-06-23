import { Request, Response } from "express";
import { cartService } from "../services/cart.service";

/**
 * Controlador para operaciones del carrito de compras (sincronización con BD).
 */
export const cartController = {
  async getCart(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const items = await cartService.getCartByUserId(userId);
      res.json(items);
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error al obtener el carrito" });
    }
  },

  async saveCart(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const items = req.body.items;
      await cartService.saveCart(userId, items);
      res.json({ message: "Carrito actualizado" });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error al guardar el carrito" });
    }
  },

  async addToCart(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const { productId, cantidad } = req.body;
      const updatedCart = await cartService.addToCart(userId, productId, cantidad || 1);
      res.json({ message: "Producto agregado al carrito", cart: updatedCart });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error al agregar producto al carrito" });
    }
  },

  async removeFromCart(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const { productId } = req.body;
      const updatedCart = await cartService.removeFromCart(userId, productId);
      res.json({ message: "Producto eliminado del carrito", cart: updatedCart });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error al eliminar producto del carrito" });
    }
  },

  async clearCart(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      await cartService.clearCart(userId);
      res.json({ message: "Carrito vaciado correctamente" });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error al vaciar el carrito" });
    }
  },

  /**
   * Sincroniza el carrito local con el carrito de BD al hacer login.
   * Se ejecuta automáticamente cuando el usuario se loguea.
   */
  async syncCartOnLogin(req: Request, res: Response) {
    try {
      const userId = req.user!.userId;
      const { localCartItems = [] } = req.body; // Items del localStorage del frontend
      
      const syncedCart = await cartService.syncCartOnLogin(userId, localCartItems);
      
      res.json({ 
        message: "Carrito sincronizado correctamente", 
        cart: syncedCart,
        itemCount: syncedCart.length 
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message || "Error al sincronizar el carrito" });
    }
  }
};