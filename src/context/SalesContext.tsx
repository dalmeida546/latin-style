import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { invoiceService } from '../services/invoiceService'
import type {
  CheckoutForm,
  Currency,
  PaymentMethod,
  SaleLine,
  SaleRecord,
  SalesChannel,
} from '../types'

interface SalesContextValue {
  sales: SaleRecord[]
  recordSale: (input: {
    customer: CheckoutForm
    paymentMethod: PaymentMethod
    paymentRef: string
    channel: SalesChannel
    currency: Currency
    lines: SaleLine[]
  }) => SaleRecord
  getSale: (id: string) => SaleRecord | undefined
  invoicedSales: SaleRecord[]
  todaySales: SaleRecord[]
}

const SalesContext = createContext<SalesContextValue | null>(null)

function isToday(iso: string): boolean {
  const d = new Date(iso)
  const now = new Date()
  return (
    d.getFullYear() === now.getFullYear() &&
    d.getMonth() === now.getMonth() &&
    d.getDate() === now.getDate()
  )
}

export function SalesProvider({ children }: { children: ReactNode }) {
  const [sales, setSales] = useState<SaleRecord[]>(() =>
    invoiceService.loadSales(),
  )

  useEffect(() => {
    invoiceService.saveSales(sales)
  }, [sales])

  const recordSale = useCallback(
    (input: {
      customer: CheckoutForm
      paymentMethod: PaymentMethod
      paymentRef: string
      channel: SalesChannel
      currency: Currency
      lines: SaleLine[]
    }) => {
      const sale = invoiceService.createSale(input)
      setSales((current) => [sale, ...current])
      return sale
    },
    [],
  )

  const getSale = useCallback(
    (id: string) => invoiceService.getSaleById(sales, id),
    [sales],
  )

  const invoicedSales = useMemo(
    () => invoiceService.getInvoicedSales(sales),
    [sales],
  )

  const todaySales = useMemo(
    () => sales.filter((sale) => isToday(sale.createdAt)),
    [sales],
  )

  const value = useMemo(
    () => ({
      sales,
      recordSale,
      getSale,
      invoicedSales,
      todaySales,
    }),
    [sales, recordSale, getSale, invoicedSales, todaySales],
  )

  return (
    <SalesContext.Provider value={value}>{children}</SalesContext.Provider>
  )
}

export function useSales(): SalesContextValue {
  const context = useContext(SalesContext)
  if (!context) {
    throw new Error('useSales debe usarse dentro de SalesProvider')
  }
  return context
}
