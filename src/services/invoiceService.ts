import type {
  CheckoutForm,
  Currency,
  EInvoiceData,
  PaymentMethod,
  SaleLine,
  SaleRecord,
  SalesChannel,
} from '../types'

const SALES_KEY = 'latinstyle-sales'
const INVOICE_SEQ_KEY = 'latinstyle-invoice-seq'

/**
 * Electronic invoicing service (simulated).
 * Later: send payload to DIAN-authorized provider (Siigo, Alegra, Factus, etc.).
 */
export function loadSales(): SaleRecord[] {
  try {
    const stored = localStorage.getItem(SALES_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored) as SaleRecord[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveSales(sales: SaleRecord[]): void {
  localStorage.setItem(SALES_KEY, JSON.stringify(sales))
}

function nextInvoiceNumber(): string {
  const current = Number(localStorage.getItem(INVOICE_SEQ_KEY) || '0') + 1
  localStorage.setItem(INVOICE_SEQ_KEY, String(current))
  return `FE-${String(current).padStart(6, '0')}`
}

function generateCufe(): string {
  const raw = `${Date.now()}-${Math.random().toString(36).slice(2)}-${Math.random().toString(36).slice(2)}`
  return Array.from(raw)
    .map((ch) => ch.charCodeAt(0).toString(16))
    .join('')
    .slice(0, 64)
    .toUpperCase()
}

export function createSale(input: {
  customer: CheckoutForm
  paymentMethod: PaymentMethod
  paymentRef: string
  channel: SalesChannel
  currency: Currency
  lines: SaleLine[]
}): SaleRecord {
  const totalUsd = input.lines.reduce(
    (sum, line) => sum + line.priceUsd * line.quantity,
    0,
  )

  const invoiceLines = input.lines.filter((line) => line.invoiceSelected)
  let eInvoice: EInvoiceData | undefined

  if (invoiceLines.length > 0) {
    eInvoice = {
      number: nextInvoiceNumber(),
      cufe: generateCufe(),
      issuedAt: new Date().toISOString(),
      status: 'issued',
      providerReady: true,
    }
  }

  return {
    id: `SALE-${Date.now().toString(36).toUpperCase()}`,
    createdAt: new Date().toISOString(),
    channel: input.channel,
    paymentMethod: input.paymentMethod,
    paymentRef: input.paymentRef,
    currency: input.currency,
    totalUsd,
    customer: input.customer,
    lines: input.lines,
    eInvoice,
  }
}

export function getSaleById(sales: SaleRecord[], id: string): SaleRecord | undefined {
  return sales.find((sale) => sale.id === id)
}

export function getInvoicedSales(sales: SaleRecord[]): SaleRecord[] {
  return sales.filter((sale) => Boolean(sale.eInvoice))
}

/** Payload shape ready for a future DIAN provider API */
export function buildProviderPayload(sale: SaleRecord) {
  const lines = sale.lines.filter((line) => line.invoiceSelected)
  return {
    provider: 'dian-ready',
    simulated: true,
    customer: {
      name: sale.customer.name,
      document: sale.customer.document,
      email: sale.customer.email,
      city: sale.customer.city,
      country: sale.customer.country,
      phone: sale.customer.phone,
    },
    paymentMethod: sale.paymentMethod,
    currency: sale.currency,
    lines: lines.map((line) => ({
      sku: line.sku,
      name: line.name,
      quantity: line.quantity,
      unitPrice: line.priceUsd,
      total: line.priceUsd * line.quantity,
    })),
    totals: {
      subtotal: lines.reduce((s, l) => s + l.priceUsd * l.quantity, 0),
    },
    eInvoice: sale.eInvoice,
  }
}

export const invoiceService = {
  loadSales,
  saveSales,
  createSale,
  getSaleById,
  getInvoicedSales,
  buildProviderPayload,
}
