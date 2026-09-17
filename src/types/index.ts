export type Locale = 'es' | 'en'
export type Currency = 'USD' | 'EUR' | 'COP'

export type Category =
  | 'relojes'
  | 'gafas'
  | 'carteras'
  | 'correas'
  | 'ropa-urbana'

export type BusinessModel = 'physical' | 'virtual' | 'both'
export type PaymentMethod = 'cash' | 'card' | 'paypal' | 'transfer'
export type SalesChannel = 'online' | 'store'
export type InvoiceStatus = 'draft' | 'issued' | 'void'

export interface Product {
  id: string
  name: string
  category: Category
  priceUsd: number
  image: string
  description: string
  sizes?: string[]
  sku: string
  businessModel: BusinessModel
  stock: number
  requiresEInvoice: boolean
  active: boolean
  lowStockThreshold: number
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSize?: string
}

export interface CheckoutForm {
  name: string
  phone: string
  city: string
  country: string
  document?: string
  email?: string
}

export interface SaleLine {
  productId: string
  name: string
  sku: string
  quantity: number
  priceUsd: number
  selectedSize?: string
  invoiceSelected: boolean
}

export interface EInvoiceData {
  number: string
  cufe: string
  issuedAt: string
  status: InvoiceStatus
  providerReady: boolean
}

export interface SaleRecord {
  id: string
  createdAt: string
  channel: SalesChannel
  paymentMethod: PaymentMethod
  paymentRef: string
  currency: Currency
  totalUsd: number
  customer: CheckoutForm
  lines: SaleLine[]
  eInvoice?: EInvoiceData
}

export interface StockMovement {
  id: string
  productId: string
  delta: number
  reason: string
  createdAt: string
}

export interface PaymentResult {
  ok: boolean
  method: PaymentMethod
  reference: string
  simulated: boolean
  message: string
}
