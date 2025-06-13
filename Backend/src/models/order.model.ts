/**
 * Modelo para órdenes/pedidos realizados por los usuarios.
 */
export interface OrderItem {
  productId: string;      // ID del producto
  nombre: string;         // Nombre del producto
  cantidad: number;       // Cantidad solicitada
  precioUnitario: number; // Precio unitario al momento de la compra
}

export interface Order {
  id: string;                 // Identificador único de la orden
  userId: string;             // ID del usuario que realizó la orden
  items: OrderItem[];         // Lista de productos en la orden
  total: number;              // Total de la orden
  fecha: string;              // Fecha de creación (ISO string)
  estado: "pendiente" | "pagado" | "enviado" | "entregado" | "cancelado"; // Estado de la orden
  direccionEnvio: string;     // Dirección de envío
  metodoPago: string;         // Método de pago utilizado
}