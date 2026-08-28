import { Link, useNavigate } from 'react-router-dom'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../utils/format'
import styles from './Cart.module.css'

export function Cart() {
  const { items, total, updateQuantity, removeItem } = useCart()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className={`container ${styles.page}`}>
        <CheckoutSteps />
        <div className={styles.empty}>
          <h1 className={styles.title}>Tu carrito está vacío</h1>
          <p className={styles.emptyText}>
            Añade productos para empezar tu compra.
          </p>
          <Link to="/tienda" className="btn btn-primary">
            Ir a la tienda
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`container ${styles.page}`}>
      <CheckoutSteps />

      <h1 className={styles.title}>Tu carrito</h1>

      <div className={styles.layout}>
        <ul className={styles.list}>
          {items.map((item) => (
            <li
              key={`${item.product.id}-${item.selectedSize ?? 'default'}`}
              className={styles.item}
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className={styles.itemImage}
              />
              <div className={styles.itemInfo}>
                <Link
                  to={`/producto/${item.product.id}`}
                  className={styles.itemName}
                >
                  {item.product.name}
                </Link>
                {item.selectedSize && (
                  <span className={styles.itemSize}>
                    Talla: {item.selectedSize}
                  </span>
                )}
                <p className={styles.itemPrice}>
                  {formatPrice(item.product.price)}
                </p>

                <div className={styles.quantity}>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.quantity - 1,
                        item.selectedSize,
                      )
                    }
                    aria-label="Quitar uno"
                  >
                    −
                  </button>
                  <span className={styles.qtyValue}>{item.quantity}</span>
                  <button
                    type="button"
                    className={styles.qtyBtn}
                    onClick={() =>
                      updateQuantity(
                        item.product.id,
                        item.quantity + 1,
                        item.selectedSize,
                      )
                    }
                    aria-label="Añadir uno"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                type="button"
                className={styles.removeBtn}
                onClick={() =>
                  removeItem(item.product.id, item.selectedSize)
                }
                aria-label={`Eliminar ${item.product.name}`}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>

        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>Resumen</h2>
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>Envío</span>
            <span className={styles.free}>Gratis</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-full"
            onClick={() => navigate('/checkout')}
          >
            Ir a pagar
          </button>

          <Link to="/tienda" className={styles.continue}>
            Seguir comprando
          </Link>
        </aside>
      </div>
    </div>
  )
}
