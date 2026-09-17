import { useMemo, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { getProductName } from '../i18n/products'
import { useCart } from '../context/CartContext'
import { useInventory } from '../context/InventoryContext'
import { useLocale } from '../context/LocaleContext'
import { useSales } from '../context/SalesContext'
import { canSell } from '../services/inventoryService'
import { processPayment } from '../services/paymentService'
import type { CheckoutForm, PaymentMethod, SaleLine } from '../types'
import { formatPrice } from '../utils/format'
import styles from './Checkout.module.css'

const PAYMENT_METHODS: PaymentMethod[] = ['cash', 'card', 'paypal', 'transfer']

export function Checkout() {
  const { items, total, clearCart } = useCart()
  const { getProduct, deductSale } = useInventory()
  const { recordSale } = useSales()
  const { t, locale, currency } = useLocale()
  const navigate = useNavigate()

  const [form, setForm] = useState<CheckoutForm>({
    name: '',
    phone: '',
    city: '',
    country: '',
    document: '',
    email: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutForm | 'payment', string>>>({})
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(null)
  const [invoiceSelected, setInvoiceSelected] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {}
      for (const item of items) {
        const key = `${item.product.id}-${item.selectedSize ?? 'default'}`
        initial[key] = item.product.requiresEInvoice
      }
      return initial
    },
  )
  const [submitting, setSubmitting] = useState(false)
  const [stockError, setStockError] = useState(false)

  const hasInvoiceSelection = useMemo(
    () => Object.values(invoiceSelected).some(Boolean),
    [invoiceSelected],
  )

  if (items.length === 0) {
    return (
      <div className={`container ${styles.page}`}>
        <CheckoutSteps />
        <div className={styles.empty}>
          <h1 className={styles.title}>{t.checkout.empty}</h1>
          <Link to="/tienda" className="btn btn-primary">
            {t.cart.goShop}
          </Link>
        </div>
      </div>
    )
  }

  const validate = (): boolean => {
    const next: Partial<Record<keyof CheckoutForm | 'payment', string>> = {}
    if (!form.name.trim()) next.name = t.checkout.errors.name
    if (!form.phone.trim()) next.phone = t.checkout.errors.phone
    if (!form.city.trim()) next.city = t.checkout.errors.city
    if (!form.country.trim()) next.country = t.checkout.errors.country
    if (!paymentMethod) next.payment = t.checkout.errors.payment
    if (hasInvoiceSelection) {
      if (!form.document?.trim()) next.document = t.checkout.errors.document
      if (!form.email?.trim()) next.email = t.checkout.errors.email
    }
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setStockError(false)
    if (!validate() || !paymentMethod) return

    for (const item of items) {
      const live = getProduct(item.product.id)
      if (!live || !canSell(live, item.quantity, 'online')) {
        setStockError(true)
        return
      }
    }

    setSubmitting(true)
    try {
      const payment = await processPayment(paymentMethod, total)
      if (!payment.ok) {
        setSubmitting(false)
        return
      }

      const lines: SaleLine[] = items.map((item) => {
        const key = `${item.product.id}-${item.selectedSize ?? 'default'}`
        return {
          productId: item.product.id,
          name: getProductName(item.product.id, locale, item.product.name),
          sku: item.product.sku,
          quantity: item.quantity,
          priceUsd: item.product.priceUsd,
          selectedSize: item.selectedSize,
          invoiceSelected: Boolean(invoiceSelected[key]),
        }
      })

      deductSale(lines.map((l) => ({ productId: l.productId, quantity: l.quantity })))

      const sale = recordSale({
        customer: form,
        paymentMethod,
        paymentRef: payment.reference,
        channel: 'online',
        currency,
        lines,
      })

      sessionStorage.setItem(
        'latinstyle-checkout-data',
        JSON.stringify({
          ...form,
          saleId: sale.id,
          paymentRef: payment.reference,
          hasInvoice: Boolean(sale.eInvoice),
        }),
      )
      clearCart()
      navigate('/pedido-ok')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className={`container ${styles.page}`}>
      <CheckoutSteps />

      <h1 className={styles.title}>{t.checkout.title}</h1>
      <p className={styles.subtitle}>{t.checkout.subtitle}</p>

      <div className={styles.layout}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="name">{t.checkout.name}</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder={t.checkout.namePlaceholder}
              autoComplete="name"
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="phone">{t.checkout.phone}</label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder={t.checkout.phonePlaceholder}
              autoComplete="tel"
            />
            {errors.phone && (
              <span className={styles.error}>{errors.phone}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="city">{t.checkout.city}</label>
            <input
              id="city"
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder={t.checkout.cityPlaceholder}
              autoComplete="address-level2"
            />
            {errors.city && <span className={styles.error}>{errors.city}</span>}
          </div>

          <div className={styles.field}>
            <label htmlFor="country">{t.checkout.country}</label>
            <input
              id="country"
              type="text"
              value={form.country}
              onChange={(e) => setForm({ ...form, country: e.target.value })}
              placeholder={t.checkout.countryPlaceholder}
              autoComplete="country-name"
            />
            {errors.country && (
              <span className={styles.error}>{errors.country}</span>
            )}
          </div>

          <fieldset className={styles.fieldset}>
            <legend>{t.checkout.payment}</legend>
            <div className={styles.paymentGrid}>
              {PAYMENT_METHODS.map((method) => (
                <label
                  key={method}
                  className={`${styles.payOption} ${paymentMethod === method ? styles.payActive : ''}`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={method}
                    checked={paymentMethod === method}
                    onChange={() => setPaymentMethod(method)}
                  />
                  {t.checkout.paymentMethods[method]}
                </label>
              ))}
            </div>
            {errors.payment && (
              <span className={styles.error}>{errors.payment}</span>
            )}
          </fieldset>

          <fieldset className={styles.fieldset}>
            <legend>{t.checkout.einvoice}</legend>
            <p className={styles.hint}>{t.checkout.einvoiceHint}</p>
            <ul className={styles.invoiceList}>
              {items.map((item) => {
                const key = `${item.product.id}-${item.selectedSize ?? 'default'}`
                const name = getProductName(
                  item.product.id,
                  locale,
                  item.product.name,
                )
                return (
                  <li key={key}>
                    <label className={styles.invoiceItem}>
                        <input
                          type="checkbox"
                          checked={Boolean(invoiceSelected[key])}
                          onChange={(e) =>
                            setInvoiceSelected((current) => ({
                              ...current,
                              [key]: e.target.checked,
                            }))
                          }
                        />
                        <span>
                          {name}
                          {item.selectedSize ? ` (${item.selectedSize})` : ''} ×{' '}
                          {item.quantity}
                          {item.product.requiresEInvoice && (
                            <em className={styles.optional}> · FE</em>
                          )}
                        </span>
                      <span>{t.checkout.includeInvoice}</span>
                    </label>
                  </li>
                )
              })}
            </ul>

            {hasInvoiceSelection && (
              <>
                <p className={styles.hint}>{t.checkout.fiscalRequired}</p>
                <div className={styles.field}>
                  <label htmlFor="document">{t.checkout.document}</label>
                  <input
                    id="document"
                    type="text"
                    value={form.document ?? ''}
                    onChange={(e) =>
                      setForm({ ...form, document: e.target.value })
                    }
                    placeholder={t.checkout.documentPlaceholder}
                  />
                  {errors.document && (
                    <span className={styles.error}>{errors.document}</span>
                  )}
                </div>
                <div className={styles.field}>
                  <label htmlFor="email">{t.checkout.email}</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email ?? ''}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    placeholder={t.checkout.emailPlaceholder}
                    autoComplete="email"
                  />
                  {errors.email && (
                    <span className={styles.error}>{errors.email}</span>
                  )}
                </div>
              </>
            )}
          </fieldset>

          {stockError && (
            <p className={styles.error}>{t.checkout.stockError}</p>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-full"
            disabled={submitting}
          >
            {submitting ? t.checkout.processing : t.checkout.confirm}
          </button>
        </form>

        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>{t.checkout.order}</h2>
          <ul className={styles.items}>
            {items.map((item) => {
              const name = getProductName(
                item.product.id,
                locale,
                item.product.name,
              )
              return (
                <li
                  key={`${item.product.id}-${item.selectedSize ?? 'default'}`}
                  className={styles.summaryItem}
                >
                  <span>
                    {name}
                    {item.selectedSize ? ` (${item.selectedSize})` : ''} ×{' '}
                    {item.quantity}
                  </span>
                  <span>
                    {formatPrice(
                      item.product.priceUsd * item.quantity,
                      currency,
                      locale,
                    )}
                  </span>
                </li>
              )
            })}
          </ul>
          <div className={styles.total}>
            <span>{t.cart.total}</span>
            <span>{formatPrice(total, currency, locale)}</span>
          </div>
          <p className={styles.note}>{t.checkout.note}</p>
        </aside>
      </div>
    </div>
  )
}
