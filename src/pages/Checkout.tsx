import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { getProductName } from '../i18n/products'
import { useCart } from '../context/CartContext'
import { useLocale } from '../context/LocaleContext'
import type { CheckoutForm } from '../types'
import { formatPrice } from '../utils/format'
import styles from './Checkout.module.css'

export function Checkout() {
  const { items, total, clearCart } = useCart()
  const { t, locale, currency } = useLocale()
  const navigate = useNavigate()

  const [form, setForm] = useState<CheckoutForm>({
    name: '',
    phone: '',
    city: '',
    country: '',
  })
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({})

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
    const next: Partial<CheckoutForm> = {}
    if (!form.name.trim()) next.name = t.checkout.errors.name
    if (!form.phone.trim()) next.phone = t.checkout.errors.phone
    if (!form.city.trim()) next.city = t.checkout.errors.city
    if (!form.country.trim()) next.country = t.checkout.errors.country
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!validate()) return

    sessionStorage.setItem('latinstyle-checkout-data', JSON.stringify(form))
    clearCart()
    navigate('/pedido-ok')
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
            {errors.name && (
              <span className={styles.error}>{errors.name}</span>
            )}
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
            {errors.city && (
              <span className={styles.error}>{errors.city}</span>
            )}
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

          <button type="submit" className="btn btn-primary btn-full">
            {t.checkout.confirm}
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
