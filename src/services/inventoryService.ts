import type { Product } from '../types'

const PRODUCTS_KEY = 'latinstyle-products'
const MOVEMENTS_KEY = 'latinstyle-stock-movements'

export function loadProducts(seed: Product[]): Product[] {
  try {
    const stored = localStorage.getItem(PRODUCTS_KEY)
    if (!stored) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(seed))
      return seed.map((p) => ({ ...p }))
    }
    const parsed = JSON.parse(stored) as Product[]
    if (!Array.isArray(parsed) || parsed.length === 0) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(seed))
      return seed.map((p) => ({ ...p }))
    }
    return mergeWithSeed(parsed, seed)
  } catch {
    return seed.map((p) => ({ ...p }))
  }
}

function mergeWithSeed(stored: Product[], seed: Product[]): Product[] {
  const byId = new Map(stored.map((p) => [p.id, p]))
  const merged = seed.map((seedProduct) => {
    const existing = byId.get(seedProduct.id)
    if (!existing) return { ...seedProduct }
    return {
      ...seedProduct,
      ...existing,
      id: seedProduct.id,
      name: existing.name || seedProduct.name,
      image: existing.image || seedProduct.image,
    }
  })
  for (const item of stored) {
    if (!seed.some((s) => s.id === item.id)) merged.push(item)
  }
  return merged
}

export function saveProducts(products: Product[]): void {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
}

export function adjustStock(
  products: Product[],
  productId: string,
  delta: number,
): Product[] {
  return products.map((product) => {
    if (product.id !== productId) return product
    if (product.businessModel === 'virtual') return product
    return {
      ...product,
      stock: Math.max(0, product.stock + delta),
    }
  })
}

export function canSell(
  product: Product,
  quantity: number,
  channel: 'online' | 'store',
): boolean {
  if (!product.active) return false
  if (channel === 'online' && product.businessModel === 'physical') return false
  if (channel === 'store' && product.businessModel === 'virtual') return false
  if (product.businessModel === 'virtual') return true
  return product.stock >= quantity
}

export function deductForSale(
  products: Product[],
  lines: { productId: string; quantity: number }[],
): Product[] {
  let next = products
  for (const line of lines) {
    const product = next.find((p) => p.id === line.productId)
    if (!product) continue
    if (product.businessModel === 'virtual') continue
    next = adjustStock(next, line.productId, -line.quantity)
  }
  return next
}

export interface StockMovementRecord {
  id: string
  productId: string
  delta: number
  reason: string
  createdAt: string
}

export function loadMovements(): StockMovementRecord[] {
  try {
    const stored = localStorage.getItem(MOVEMENTS_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored) as StockMovementRecord[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveMovements(movements: StockMovementRecord[]): void {
  localStorage.setItem(MOVEMENTS_KEY, JSON.stringify(movements))
}

/**
 * Ready for real backend:
 * replace localStorage with API calls while keeping these function names.
 */
export const inventoryService = {
  loadProducts,
  saveProducts,
  adjustStock,
  canSell,
  deductForSale,
  loadMovements,
  saveMovements,
}
