"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartService = void 0;
const db_1 = require("../db");
/**
 * Servicio para gestionar el carrito de compras de los usuarios.
 */
exports.cartService = {
    /**
     * Obtiene todos los items del carrito de un usuario por su ID.
     * @param userId ID del usuario.
     * @returns Lista de items del carrito.
     */ async getCartByUserId(userId) {
        try {
            // Buscar o crear carrito del usuario
            const [carts] = await db_1.db.query("SELECT * FROM carrito WHERE id_usuario = ?", [userId]);
            let cart = carts[0];
            if (!cart) {
                // Crear carrito si no existe
                await db_1.db.query("INSERT INTO carrito (id_usuario, fecha_creacion) VALUES (?, NOW())", [userId]);
                const [newCarts] = await db_1.db.query("SELECT * FROM carrito WHERE id_usuario = ?", [userId]);
                cart = newCarts[0];
                return []; // Carrito nuevo, sin items
            } // Obtener items del carrito con información del producto
            const [items] = await db_1.db.query(`SELECT 
          CAST(ci.id_producto as CHAR) as productId,
          ci.cantidad,
          p.nombre,
          p.precio,
          p.imagen_url as imagen
         FROM carrito_item ci
         JOIN producto p ON ci.id_producto = p.id_producto
         WHERE ci.id_carrito = ?`, [cart.id_carrito]);
            return items;
        }
        catch (error) {
            console.error('Error al obtener carrito:', error);
            throw new Error('Error al obtener el carrito del usuario');
        }
    },
    /**
     * Guarda/actualiza el carrito completo de un usuario.
     * @param userId ID del usuario.
     * @param items Lista de items para guardar en el carrito.
     */ async saveCart(userId, items) {
        const connection = await db_1.db.getConnection();
        try {
            await connection.beginTransaction();
            // Buscar o crear carrito del usuario
            const [carts] = await connection.query("SELECT * FROM carrito WHERE id_usuario = ?", [userId]);
            let cart = carts[0];
            if (!cart) {
                await connection.query("INSERT INTO carrito (id_usuario, fecha_creacion) VALUES (?, NOW())", [userId]);
                const [newCarts] = await connection.query("SELECT * FROM carrito WHERE id_usuario = ?", [userId]);
                cart = newCarts[0];
            }
            // Limpiar items existentes del carrito
            await connection.query("DELETE FROM carrito_item WHERE id_carrito = ?", [cart.id_carrito]);
            // Insertar nuevos items
            for (const item of items) {
                // Obtener precio actual del producto
                const [productos] = await connection.query("SELECT precio FROM producto WHERE id_producto = ?", [item.productId]);
                const producto = productos[0];
                const precioUnitario = producto ? producto.precio : item.precio;
                await connection.query("INSERT INTO carrito_item (id_carrito, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)", [cart.id_carrito, item.productId, item.cantidad, precioUnitario]);
            }
            await connection.commit();
        }
        catch (error) {
            await connection.rollback();
            console.error('Error al guardar carrito:', error);
            throw new Error('Error al guardar el carrito');
        }
        finally {
            connection.release();
        }
    }, /**
     * Agrega un producto específico al carrito.
     * @param userId ID del usuario.
     * @param productId ID del producto.
     * @param cantidad Cantidad a agregar.
     */
    async addToCart(userId, productId, cantidad) {
        try {
            // Convertir productId a número para la BD
            const productIdNum = parseInt(productId);
            if (isNaN(productIdNum)) {
                throw new Error("ID de producto inválido");
            }
            // Buscar o crear carrito del usuario
            const [carts] = await db_1.db.query("SELECT * FROM carrito WHERE id_usuario = ?", [userId]);
            let cart = carts[0];
            if (!cart) {
                await db_1.db.query("INSERT INTO carrito (id_usuario, fecha_creacion) VALUES (?, NOW())", [userId]);
                const [newCarts] = await db_1.db.query("SELECT * FROM carrito WHERE id_usuario = ?", [userId]);
                cart = newCarts[0];
            }
            // Obtener precio actual del producto
            const [productos] = await db_1.db.query("SELECT precio FROM producto WHERE id_producto = ?", [productIdNum]);
            const producto = productos[0];
            if (!producto) {
                throw new Error("Producto no encontrado");
            }
            // Verificar si el producto ya existe en el carrito
            const [existingItems] = await db_1.db.query("SELECT * FROM carrito_item WHERE id_carrito = ? AND id_producto = ?", [cart.id_carrito, productIdNum]);
            if (existingItems.length > 0) {
                // Actualizar cantidad si ya existe
                await db_1.db.query("UPDATE carrito_item SET cantidad = cantidad + ? WHERE id_carrito = ? AND id_producto = ?", [cantidad, cart.id_carrito, productIdNum]);
            }
            else {
                // Insertar nuevo item
                await db_1.db.query("INSERT INTO carrito_item (id_carrito, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)", [cart.id_carrito, productIdNum, cantidad, producto.precio]);
            }
            // Retornar carrito actualizado
            return await this.getCartByUserId(userId);
        }
        catch (error) {
            console.error('Error al agregar al carrito:', error);
            throw new Error('Error al agregar producto al carrito');
        }
    }, /**
     * Elimina un producto del carrito.
     * @param userId ID del usuario.
     * @param productId ID del producto a eliminar.
     */
    async removeFromCart(userId, productId) {
        try {
            // Convertir productId a número para la BD
            const productIdNum = parseInt(productId);
            if (isNaN(productIdNum)) {
                throw new Error("ID de producto inválido");
            }
            const [carts] = await db_1.db.query("SELECT * FROM carrito WHERE id_usuario = ?", [userId]);
            const cart = carts[0];
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }
            await db_1.db.query("DELETE FROM carrito_item WHERE id_carrito = ? AND id_producto = ?", [cart.id_carrito, productIdNum]);
            return await this.getCartByUserId(userId);
        }
        catch (error) {
            console.error('Error al eliminar del carrito:', error);
            throw new Error('Error al eliminar producto del carrito');
        }
    },
    /**
     * Vacía completamente el carrito de un usuario.
     * @param userId ID del usuario.
     */ async clearCart(userId) {
        try {
            const [carts] = await db_1.db.query("SELECT * FROM carrito WHERE id_usuario = ?", [userId]);
            const cart = carts[0];
            if (!cart) {
                return; // No hay carrito que limpiar
            }
            await db_1.db.query("DELETE FROM carrito_item WHERE id_carrito = ?", [cart.id_carrito]);
        }
        catch (error) {
            console.error('Error al limpiar carrito:', error);
            throw new Error('Error al limpiar el carrito');
        }
    },
    /**
     * Actualiza la cantidad de un item específico en el carrito.
     * @param userId ID del usuario.
     * @param productId ID del producto.
     * @param cantidad Nueva cantidad.
     */
    async updateCartItemQuantity(userId, productId, cantidad) {
        try {
            const productIdNum = parseInt(productId);
            if (isNaN(productIdNum)) {
                throw new Error("ID de producto inválido");
            }
            const [carts] = await db_1.db.query("SELECT * FROM carrito WHERE id_usuario = ?", [userId]);
            const cart = carts[0];
            if (!cart) {
                throw new Error("Carrito no encontrado");
            }
            await db_1.db.query("UPDATE carrito_item SET cantidad = ? WHERE id_carrito = ? AND id_producto = ?", [cantidad, cart.id_carrito, productIdNum]);
        }
        catch (error) {
            console.error('Error al actualizar cantidad:', error);
            throw new Error('Error al actualizar cantidad del producto');
        }
    },
    /**
     * Sincroniza el carrito local (frontend) con el carrito de la BD al hacer login.
     * Combina items del carrito local con items existentes en BD.
     * @param userId ID del usuario que se está logueando
     * @param localCartItems Items del carrito local (localStorage del frontend)
     * @returns Carrito sincronizado completo
     */
    async syncCartOnLogin(userId, localCartItems = []) {
        const connection = await db_1.db.getConnection();
        try {
            await connection.beginTransaction();
            // 1. Obtener carrito existente en BD
            const dbCartItems = await this.getCartByUserId(userId);
            // 2. Crear mapa de productos existentes en BD para fácil búsqueda
            const dbItemsMap = new Map(dbCartItems.map(item => [item.productId, item]));
            // 3. Procesar items del carrito local
            for (const localItem of localCartItems) {
                const productIdNum = parseInt(localItem.productId);
                if (isNaN(productIdNum)) {
                    console.warn(`ID de producto inválido: ${localItem.productId}`);
                    continue;
                }
                const existingItem = dbItemsMap.get(localItem.productId);
                if (existingItem) {
                    // Si existe en BD, sumar cantidades
                    const newQuantity = existingItem.cantidad + localItem.cantidad;
                    await this.updateCartItemQuantity(userId, localItem.productId, newQuantity);
                }
                else {
                    // Si no existe en BD, agregarlo
                    await this.addToCart(userId, localItem.productId, localItem.cantidad);
                }
            }
            await connection.commit();
            // 4. Retornar carrito sincronizado completo
            return await this.getCartByUserId(userId);
        }
        catch (error) {
            await connection.rollback();
            console.error('Error al sincronizar carrito:', error);
            throw new Error('Error al sincronizar el carrito');
        }
        finally {
            connection.release();
        }
    }
};
