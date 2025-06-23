"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = void 0;
const cart_service_1 = require("../services/cart.service");
/**
 * Controlador para operaciones del carrito de compras (sincronización con BD).
 */
exports.cartController = {
    async getCart(req, res) {
        try {
            const userId = req.user.userId;
            const items = await cart_service_1.cartService.getCartByUserId(userId);
            res.json(items);
        }
        catch (error) {
            res.status(500).json({ message: error.message || "Error al obtener el carrito" });
        }
    },
    async saveCart(req, res) {
        try {
            const userId = req.user.userId;
            const items = req.body.items;
            await cart_service_1.cartService.saveCart(userId, items);
            res.json({ message: "Carrito actualizado" });
        }
        catch (error) {
            res.status(500).json({ message: error.message || "Error al guardar el carrito" });
        }
    },
    async addToCart(req, res) {
        try {
            const userId = req.user.userId;
            const { productId, cantidad } = req.body;
            const updatedCart = await cart_service_1.cartService.addToCart(userId, productId, cantidad || 1);
            res.json({ message: "Producto agregado al carrito", cart: updatedCart });
        }
        catch (error) {
            res.status(500).json({ message: error.message || "Error al agregar producto al carrito" });
        }
    },
    async removeFromCart(req, res) {
        try {
            const userId = req.user.userId;
            const { productId } = req.body;
            const updatedCart = await cart_service_1.cartService.removeFromCart(userId, productId);
            res.json({ message: "Producto eliminado del carrito", cart: updatedCart });
        }
        catch (error) {
            res.status(500).json({ message: error.message || "Error al eliminar producto del carrito" });
        }
    },
    async clearCart(req, res) {
        try {
            const userId = req.user.userId;
            await cart_service_1.cartService.clearCart(userId);
            res.json({ message: "Carrito vaciado correctamente" });
        }
        catch (error) {
            res.status(500).json({ message: error.message || "Error al vaciar el carrito" });
        }
    },
    /**
     * Sincroniza el carrito local con el carrito de BD al hacer login.
     * Se ejecuta automáticamente cuando el usuario se loguea.
     */
    async syncCartOnLogin(req, res) {
        try {
            const userId = req.user.userId;
            const { localCartItems = [] } = req.body; // Items del localStorage del frontend
            const syncedCart = await cart_service_1.cartService.syncCartOnLogin(userId, localCartItems);
            res.json({
                message: "Carrito sincronizado correctamente",
                cart: syncedCart,
                itemCount: syncedCart.length
            });
        }
        catch (error) {
            res.status(500).json({ message: error.message || "Error al sincronizar el carrito" });
        }
    }
};
