"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRepository = void 0;
/**
 * Repositorio en memoria para órdenes/pedidos.
 * Puedes reemplazarlo por una base de datos real en producción.
 */
class OrderRepository {
    constructor() {
        this.orders = [];
    }
    /**
     * Guarda una nueva orden.
     * @param order Orden a guardar.
     * @returns La orden guardada.
     */
    save(order) {
        this.orders.push(order);
        return order;
    }
    /**
     * Obtiene todas las órdenes de un usuario.
     * @param userId ID del usuario.
     * @returns Lista de órdenes del usuario.
     */
    getByUser(userId) {
        return this.orders.filter(order => order.userId === userId);
    }
    /**
     * Obtiene una orden por su ID.
     * @param id ID de la orden.
     * @returns La orden encontrada o undefined.
     */
    getById(id) {
        return this.orders.find(order => order.id === id);
    }
    /**
     * Actualiza el estado de una orden.
     * @param id ID de la orden.
     * @param estado Nuevo estado.
     * @returns true si se actualizó, false si no se encontró.
     */
    updateStatus(id, estado) {
        const order = this.orders.find(o => o.id === id);
        if (order) {
            order.estado = estado;
            return true;
        }
        return false;
    }
}
exports.orderRepository = new OrderRepository();
