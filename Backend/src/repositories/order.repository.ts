import { Order } from "../models/order.model";

/**
 * Repositorio en memoria para órdenes/pedidos.
 * Puedes reemplazarlo por una base de datos real en producción.
 */
class OrderRepository {
  private orders: Order[] = [];

  /**
   * Guarda una nueva orden.
   * @param order Orden a guardar.
   * @returns La orden guardada.
   */
  save(order: Order): Order {
    this.orders.push(order);
    return order;
  }

  /**
   * Obtiene todas las órdenes de un usuario.
   * @param userId ID del usuario.
   * @returns Lista de órdenes del usuario.
   */
  getByUser(userId: string): Order[] {
    return this.orders.filter(order => order.userId === userId);
  }

  /**
   * Obtiene una orden por su ID.
   * @param id ID de la orden.
   * @returns La orden encontrada o undefined.
   */
  getById(id: string): Order | undefined {
    return this.orders.find(order => order.id === id);
  }

  /**
   * Actualiza el estado de una orden.
   * @param id ID de la orden.
   * @param estado Nuevo estado.
   * @returns true si se actualizó, false si no se encontró.
   */
  updateStatus(id: string, estado: Order["estado"]): boolean {
    const order = this.orders.find(o => o.id === id);
    if (order) {
      order.estado = estado;
      return true;
    }
    return false;
  }
}

export const orderRepository = new OrderRepository();