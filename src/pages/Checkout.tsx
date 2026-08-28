import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { useCart } from '../context/CartContext'
import type { CheckoutForm } from '../types'
import { formatPrice } from '../utils/format'
import styles from './Checkout.module.css'

export function Checkout() {
  const { items, total, clearCart } = useCart()
  const navigate = useNavigate()

  const [form, setForm] = useState<CheckoutForm>({
    name: '',
    phone: '',
    city: '',
  })
  const [errors, setErrors] = useState<Partial<CheckoutForm>>({})

  if (items.length === 0) {
    return (
      <div className={`container ${styles.page}`}>
        <CheckoutSteps />
        <div className={styles.empty}>
          <h1 className={styles.title}>No hay productos para pagar</h1>
          <Link to="/tienda" className="btn btn-primary">
            Ir a la tienda
          </Link>
        </div>
      </div>
    )
  }

  const validate = (): boolean => {
    const next: Partial<CheckoutForm> = {}
    if (!form.name.trim()) next.name = 'Escribe tu nombre'
    if (!form.phone.trim()) next.phone = 'Escribe tu teléfono'
    if (!form.city.trim()) next.city = 'Escribe tu ciudad'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!validate()) return

    sessionStorage.setItem(
      'latinstyle-checkout-data',
      JSON.stringify(form),
    )
    clearCart()
    navigate('/pedido-ok')
  }

  return (
    <div className={`container ${styles.page}`}>
      <CheckoutSteps />

      <h1 className={styles.title}>Confirmar pedido</h1>
      <p className={styles.subtitle}>
        Completa tus datos. Es rápido y sencillo.
      </p>

      <div className={styles.layout}>
        <form className={styles.form} onSubmit={handleSubmit} noValidate>
          <div className={styles.field}>
            <label htmlFor="name">Nombre completo</label>
            <input
              id="name"
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Tu nombre"
              autoComplete="name"
            />
            {errors.name && (
              <span className={styles.error}>{errors.name}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="phone">Teléfono</label>
            <input
              id="phone"
              type="tel"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              placeholder="300 123 4567"
              autoComplete="tel"
            />
            {errors.phone && (
              <span className={styles.error}>{errors.phone}</span>
            )}
          </div>

          <div className={styles.field}>
            <label htmlFor="city">Ciudad</label>
            <input
              id="city"
              type="text"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              placeholder="Tu ciudad"
              autoComplete="address-level2"
            />
            {errors.city && (
              <span className={styles.error}>{errors.city}</span>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-full">
            Confirmar pedido
          </button>
        </form>

        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Tu pedido</h2>
          <ul className={styles.items}>
            {items.map((item) => (
              <li
                key={`${item.product.id}-${item.selectedSize ?? 'default'}`}
                className={styles.summaryItem}
              >
                <span>
                  {item.product.name}
                  {item.selectedSize ? ` (${item.selectedSize})` : ''} ×{' '}
                  {item.quantity}
                </span>
                <span>
                  {formatPrice(item.product.price * item.quantity)}
                </span>
              </li>
            ))}
          </ul>
          <div className={styles.total}>
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
          <p className={styles.note}>
            Este es un checkout de demostración. No se procesará ningún pago
            real.
          </p>
        </aside>
      </div>
    </div>
  )
}
