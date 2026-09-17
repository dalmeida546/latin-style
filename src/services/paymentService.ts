import type { PaymentMethod, PaymentResult } from '../types'

/**
 * Simulated payment gateway.
 * Later: swap processPayment body for Stripe/PayPal/Mercado Pago SDKs.
 */
export async function processPayment(
  method: PaymentMethod,
  amountUsd: number,
): Promise<PaymentResult> {
  await delay(400)

  const reference = `PAY-${method.toUpperCase()}-${Date.now().toString(36).toUpperCase()}`

  return {
    ok: true,
    method,
    reference,
    simulated: true,
    message: `Pago simulado (${method}) por ${amountUsd.toFixed(2)} USD. Listo para pasarela real.`,
  }
}

export function paymentMethodLabel(
  method: PaymentMethod,
  locale: 'es' | 'en',
): string {
  const labels: Record<PaymentMethod, { es: string; en: string }> = {
    cash: { es: 'Efectivo', en: 'Cash' },
    card: { es: 'Tarjeta', en: 'Card' },
    paypal: { es: 'PayPal', en: 'PayPal' },
    transfer: { es: 'Transferencia', en: 'Bank transfer' },
  }
  return labels[method][locale]
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export const paymentService = {
  processPayment,
  paymentMethodLabel,
}
