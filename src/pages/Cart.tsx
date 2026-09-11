import { Link, useNavigate } from 'react-router-dom'
import { CheckoutSteps } from '../components/CheckoutSteps'
import {
  getProductName,
} from '../i18n/products'
import { useCart } from '../context/CartContext'
import { useLocale } from '../context/LocaleContext'
import { formatPrice } from '../utils/format'
import styles from './Cart.module.css'

export function Cart() {
  const { items, total, updateQuantity, removeItem } = useCart()
  const { t, locale, currency } = useLocale()
  const navigate = useNavigate()

  if (items.length === 0) {
    return (
      <div className={`container ${styles.page}`}>
        <CheckoutSteps />
        <div className={styles.empty}>
          <h1 className={styles.title}>{t.cart.empty}</h1>
          <p className={styles.emptyText}>{t.cart.emptyDesc}</p>
          <Link to="/tienda" className="btn btn-primary">
            {t.cart.goShop}
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`container ${styles.page}`}>
      <CheckoutSteps />

      <h1 className={styles.title}>{t.cart.title}</h1>

      <div className={styles.layout}>
        <ul className={styles.list}>
          {items.map((item) => {
            const name = getProductName(
              item.product.id,
              locale,
              item.product.name,
            )
            return (
              <li
                key={`${item.product.id}-${item.selectedSize ?? 'default'}`}
                className={styles.item}
              >
                <img
                  src={item.product.image}
                  alt={name}
                  className={styles.itemImage}
                />
                <div className={styles.itemInfo}>
                  <Link
                    to={`/producto/${item.product.id}`}
                    className={styles.itemName}
                  >
                    {name}
                  </Link>
                  {item.selectedSize && (
                    <span className={styles.itemSize}>
                      {t.cart.size}: {item.selectedSize}
                    </span>
                  )}
                  <p className={styles.itemPrice}>
                    {formatPrice(item.product.priceUsd, currency, locale)}
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
                      aria-label={t.cart.removeOne}
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
                      aria-label={t.cart.addOne}
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
                  aria-label={`${t.cart.remove} ${name}`}
                >
                  {t.cart.remove}
                </button>
              </li>
            )
          })}
        </ul>

        <aside className={styles.summary}>
          <h2 className={styles.summaryTitle}>{t.cart.summary}</h2>
          <div className={styles.summaryRow}>
            <span>{t.cart.subtotal}</span>
            <span>{formatPrice(total, currency, locale)}</span>
          </div>
          <div className={styles.summaryRow}>
            <span>{t.cart.shipping}</span>
            <span className={styles.free}>{t.cart.free}</span>
          </div>
          <div className={`${styles.summaryRow} ${styles.total}`}>
            <span>{t.cart.total}</span>
            <span>{formatPrice(total, currency, locale)}</span>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-full"
            onClick={() => navigate('/checkout')}
          >
            {t.cart.checkout}
          </button>

          <Link to="/tienda" className={styles.continue}>
            {t.cart.continue}
          </Link>
        </aside>
      </div>
    </div>
  )
}
