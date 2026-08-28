export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    maximumFractionDigits: 0,
  }).format(amount)
}

export function generateOrderId(): string {
  const segment = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `LS-${segment}`
}
