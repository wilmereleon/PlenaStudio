/**
 * NotificationAdapter
 * 
 * Adaptador simple para gestionar notificaciones dentro del backend.
 * Permite enviar notificaciones por distintos canales (ej: email, SMS, push).
 * Esta implementación es un stub y puede extenderse según los canales requeridos.
 */
export class NotificationAdapter {
  /**
   * Envía una notificación.
   * @param to Destinatario de la notificación.
   * @param message Mensaje de la notificación.
   * @param channel Canal de envío (ej: 'email', 'sms', 'push').
   * @returns Promise<void>
   */
  async send(to: string, message: string, channel: 'email' | 'sms' | 'push' = 'email'): Promise<void> {
    // Aquí puedes integrar con otros adapters (ej: email, SMS, push)
    // Por defecto, solo imprime en consola (stub)
    console.log(`[NOTIFICACIÓN][${channel}] Para: ${to} | Mensaje: ${message}`);
    // Ejemplo de integración:
    // if (channel === 'email') await sendEmail(to, 'Notificación', message);
  }
}

export const notificationAdapter = new NotificationAdapter();