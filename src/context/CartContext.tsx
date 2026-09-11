import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { CartItem, Product } from '../types'

const STORAGE_KEY = 'latinstyle-cart'

interface CartContextValue {
  items: CartItem[]
  itemCount: number
  total: number
  addItem: (product: Product, quantity?: number, selectedSize?: string) => void
  removeItem: (productId: string, selectedSize?: string) => void
  updateQuantity: (
    productId: string,
    quantity: number,
    selectedSize?: string,
  ) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

function getItemKey(productId: string, selectedSize?: string): string {
  return selectedSize ? `${productId}::${selectedSize}` : productId
}

function loadCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (!stored) return []
    const parsed = JSON.parse(stored) as CartItem[]
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCart())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const addItem = useCallback(
    (product: Product, quantity = 1, selectedSize?: string) => {
      setItems((current) => {
        const existing = current.find(
          (item) =>
            getItemKey(item.product.id, item.selectedSize) ===
            getItemKey(product.id, selectedSize),
        )

        if (existing) {
          return current.map((item) =>
            getItemKey(item.product.id, item.selectedSize) ===
            getItemKey(product.id, selectedSize)
              ? { ...item, quantity: item.quantity + quantity }
              : item,
          )
        }

        return [...current, { product, quantity, selectedSize }]
      })
    },
    [],
  )

  const removeItem = useCallback(
    (productId: string, selectedSize?: string) => {
      setItems((current) =>
        current.filter(
          (item) =>
            getItemKey(item.product.id, item.selectedSize) !==
            getItemKey(productId, selectedSize),
        ),
      )
    },
    [],
  )

  const updateQuantity = useCallback(
    (productId: string, quantity: number, selectedSize?: string) => {
      if (quantity <= 0) {
        removeItem(productId, selectedSize)
        return
      }

      setItems((current) =>
        current.map((item) =>
          getItemKey(item.product.id, item.selectedSize) ===
          getItemKey(productId, selectedSize)
            ? { ...item, quantity }
            : item,
        ),
      )
    },
    [removeItem],
  )

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const itemCount = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  )

  const total = useMemo(
    () =>
      items.reduce(
        (sum, item) => sum + item.product.priceUsd * item.quantity,
        0,
      ),
    [items],
  )

  const value = useMemo(
    () => ({
      items,
      itemCount,
      total,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
    }),
    [items, itemCount, total, addItem, removeItem, updateQuantity, clearCart],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }
  return context
}
