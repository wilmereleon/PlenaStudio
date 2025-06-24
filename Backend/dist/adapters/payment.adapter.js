"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentAdapter = exports.PaymentAdapter = void 0;
/**
 * PaymentAdapter
 *
 * Adaptador simple para gestionar pagos en el backend.
 * Permite simular o integrar pagos con diferentes pasarelas (ej: PayU, Stripe, MercadoPago).
 * Esta implementación es un stub y puede extenderse según el proveedor real.
 */
class PaymentAdapter {
    /**
     * Procesa un pago.
     * @param amount Monto a cobrar.
     * @param currency Moneda (ej: 'COP', 'USD').
     * @param paymentMethod Información del método de pago.
     * @returns Promise<{ success: boolean; transactionId?: string; error?: string }>
     */
    async processPayment(amount, currency, paymentMethod) {
        // Simulación de procesamiento de pago
        // Aquí puedes integrar con la pasarela real
        console.log(`[PAGO] Monto: ${amount} ${currency} | Método:`, paymentMethod);
        // Simulación exitosa
        return {
            success: true,
            transactionId: `TXN-${Date.now()}`
        };
    }
}
exports.PaymentAdapter = PaymentAdapter;
exports.paymentAdapter = new PaymentAdapter();
