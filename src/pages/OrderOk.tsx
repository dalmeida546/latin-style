import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { useLocale } from '../context/LocaleContext'
import styles from './OrderOk.module.css'

interface OrderData {
  name: string
  saleId?: string
  paymentRef?: string
  hasInvoice?: boolean
}

export function OrderOk() {
  const { t } = useLocale()
  const [customer, setCustomer] = useState<OrderData | null>(null)

  useEffect(() => {
    const stored = sessionStorage.getItem('latinstyle-checkout-data')
    if (stored) {
      const data = JSON.parse(stored) as OrderData
      setCustomer(data)
      sessionStorage.removeItem('latinstyle-checkout-data')
    }
  }, [])

  return (
    <div className={`container ${styles.page}`}>
      <CheckoutSteps />

      <div className={styles.content}>
        <div className={styles.icon} aria-hidden="true">
          <svg width="64" height="64" viewBox="0 0 64 64" fill="none">
            <circle cx="32" cy="32" r="30" stroke="currentColor" strokeWidth="3" />
            <path
              d="M20 32l8 8 16-16"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        <h1 className={styles.title}>{t.order.title}</h1>
        <p className={styles.message}>
          {t.order.thanks}
          {customer?.name ? `, ${customer.name}` : ''}. {t.order.registered}
        </p>

        {customer?.saleId && (
          <p className={styles.orderId}>
            {t.order.orderId}: <strong>{customer.saleId}</strong>
          </p>
        )}

        {customer?.paymentRef && (
          <p className={styles.orderId}>
            {t.order.paymentRef}: <strong>{customer.paymentRef}</strong>
          </p>
        )}

        <p className={styles.note}>
          {t.order.note} {t.order.demo}
        </p>

        <div className={styles.actions}>
          {customer?.hasInvoice && customer.saleId && (
            <Link
              to={`/factura/${customer.saleId}`}
              className={`btn btn-primary ${styles.cta}`}
            >
              {t.order.viewInvoice}
            </Link>
          )}
          <Link to="/tienda" className={`btn btn-secondary ${styles.cta}`}>
            {t.order.continue}
          </Link>
        </div>
      </div>
    </div>
  )
}
