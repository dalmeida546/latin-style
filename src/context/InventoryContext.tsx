import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { seedProducts } from '../data/products'
import {
  inventoryService,
  type StockMovementRecord,
} from '../services/inventoryService'
import type { Product } from '../types'

interface InventoryContextValue {
  products: Product[]
  movements: StockMovementRecord[]
  catalog: Product[]
  getProduct: (id: string) => Product | undefined
  updateProduct: (product: Product) => void
  addProduct: (product: Product) => void
  adjustStock: (productId: string, delta: number, reason: string) => void
  deductSale: (lines: { productId: string; quantity: number }[]) => void
  lowStockProducts: Product[]
}

const InventoryContext = createContext<InventoryContextValue | null>(null)

export function InventoryProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() =>
    inventoryService.loadProducts(seedProducts),
  )
  const [movements, setMovements] = useState<StockMovementRecord[]>(() =>
    inventoryService.loadMovements(),
  )

  useEffect(() => {
    inventoryService.saveProducts(products)
  }, [products])

  useEffect(() => {
    inventoryService.saveMovements(movements)
  }, [movements])

  const getProduct = useCallback(
    (id: string) => products.find((p) => p.id === id),
    [products],
  )

  const updateProduct = useCallback((product: Product) => {
    setProducts((current) =>
      current.map((item) => (item.id === product.id ? product : item)),
    )
  }, [])

  const addProduct = useCallback((product: Product) => {
    setProducts((current) => [...current, product])
  }, [])

  const adjustStock = useCallback(
    (productId: string, delta: number, reason: string) => {
      setProducts((current) =>
        inventoryService.adjustStock(current, productId, delta),
      )
      setMovements((current) => [
        {
          id: `MOV-${Date.now().toString(36).toUpperCase()}`,
          productId,
          delta,
          reason,
          createdAt: new Date().toISOString(),
        },
        ...current,
      ])
    },
    [],
  )

  const deductSale = useCallback(
    (lines: { productId: string; quantity: number }[]) => {
      setProducts((current) => inventoryService.deductForSale(current, lines))
      setMovements((current) => [
        ...lines.map((line) => ({
          id: `MOV-${Date.now().toString(36).toUpperCase()}-${line.productId}`,
          productId: line.productId,
          delta: -line.quantity,
          reason: 'Venta',
          createdAt: new Date().toISOString(),
        })),
        ...current,
      ])
    },
    [],
  )

  const catalog = useMemo(
    () =>
      products.filter((p) => {
        if (!p.active) return false
        if (p.businessModel === 'physical') return false
        if (p.businessModel === 'virtual') return true
        return p.stock > 0
      }),
    [products],
  )

  const lowStockProducts = useMemo(
    () =>
      products.filter(
        (p) =>
          p.active &&
          p.businessModel !== 'virtual' &&
          p.stock <= p.lowStockThreshold,
      ),
    [products],
  )

  const value = useMemo(
    () => ({
      products,
      movements,
      catalog,
      getProduct,
      updateProduct,
      addProduct,
      adjustStock,
      deductSale,
      lowStockProducts,
    }),
    [
      products,
      movements,
      catalog,
      getProduct,
      updateProduct,
      addProduct,
      adjustStock,
      deductSale,
      lowStockProducts,
    ],
  )

  return (
    <InventoryContext.Provider value={value}>
      {children}
    </InventoryContext.Provider>
  )
}

export function useInventory(): InventoryContextValue {
  const context = useContext(InventoryContext)
  if (!context) {
    throw new Error('useInventory debe usarse dentro de InventoryProvider')
  }
  return context
}
