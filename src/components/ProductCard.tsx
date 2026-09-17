import { Link } from 'react-router-dom'
import { getCategoryLabel } from '../i18n/categories'
import { getProductName } from '../i18n/products'
import type { Product } from '../types'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'
import { useLocale } from '../context/LocaleContext'
import { canSell } from '../services/inventoryService'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { locale, currency, t } = useLocale()

  const name = getProductName(product.id, locale, product.name)
  const available = canSell(product, 1, 'online')

  return (
    <article className={styles.card}>
      <Link to={`/producto/${product.id}`} className={styles.imageLink}>
        <img
          src={product.image}
          alt={name}
          className={styles.image}
          loading="lazy"
        />
      </Link>

      <div className={styles.body}>
        <span className={styles.category}>
          {getCategoryLabel(product.category, locale)} ·{' '}
          {t.product.model[product.businessModel]}
        </span>
        <Link to={`/producto/${product.id}`} className={styles.name}>
          <h3>{name}</h3>
        </Link>
        <p className={styles.price}>
          {formatPrice(product.priceUsd, currency, locale)}
        </p>

        <button
          type="button"
          className={`btn btn-primary btn-full ${styles.addBtn}`}
          onClick={() => addItem(product)}
          disabled={!available}
        >
          {available ? t.card.add : t.product.outOfStock}
        </button>
      </div>
    </article>
  )
}
