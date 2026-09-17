import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { getCategoryLabel } from '../i18n/categories'
import {
  getProductDescription,
  getProductName,
} from '../i18n/products'
import { useCart } from '../context/CartContext'
import { useInventory } from '../context/InventoryContext'
import { useLocale } from '../context/LocaleContext'
import { canSell } from '../services/inventoryService'
import { formatPrice } from '../utils/format'
import styles from './Product.module.css'

export function Product() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { addItem } = useCart()
  const { getProduct } = useInventory()
  const { t, locale, currency } = useLocale()
  const product = id ? getProduct(id) : undefined

  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.sizes?.[0],
  )
  const [added, setAdded] = useState(false)

  if (!product || !product.active) {
    return (
      <div className={`container ${styles.page}`}>
        <p className={styles.notFound}>{t.product.notFound}</p>
        <Link to="/tienda" className="btn btn-primary">
          {t.product.backShop}
        </Link>
      </div>
    )
  }

  const name = getProductName(product.id, locale, product.name)
  const description = getProductDescription(
    product.id,
    locale,
    product.description,
  )
  const available = canSell(product, 1, 'online')
  const stockLabel =
    product.businessModel === 'virtual'
      ? t.product.virtualStock
      : `${t.product.stock}: ${product.stock}`

  const handleAdd = () => {
    if (!available) return
    if (product.sizes && !selectedSize) return
    addItem(product, 1, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  const handleBuyNow = () => {
    if (!available) return
    if (product.sizes && !selectedSize) return
    addItem(product, 1, selectedSize)
    navigate('/carrito')
  }

  return (
    <div className={`container ${styles.page}`}>
      <CheckoutSteps />

      <div className={styles.layout}>
        <div className={styles.imageWrap}>
          <img src={product.image} alt={name} className={styles.image} />
        </div>

        <div className={styles.info}>
          <span className={styles.category}>
            {getCategoryLabel(product.category, locale)} · {product.sku}
          </span>
          <h1 className={styles.name}>{name}</h1>
          <p className={styles.price}>
            {formatPrice(product.priceUsd, currency, locale)}
          </p>
          <p className={styles.description}>{description}</p>
          <p className={styles.stockMeta}>
            {stockLabel} · {t.product.model[product.businessModel]}
          </p>

          {product.sizes && (
            <div className={styles.sizes}>
              <label htmlFor="size-select" className={styles.sizesLabel}>
                {t.product.size}
              </label>
              <div className={styles.sizeOptions} id="size-select">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeActive : ''}`}
                    onClick={() => setSelectedSize(size)}
                    aria-pressed={selectedSize === size}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className={styles.actions}>
            <button
              type="button"
              className={`btn btn-primary btn-full ${styles.addBtn}`}
              onClick={handleAdd}
              disabled={!available}
            >
              {!available
                ? t.product.outOfStock
                : added
                  ? t.product.added
                  : t.product.add}
            </button>
            <button
              type="button"
              className="btn btn-secondary btn-full"
              onClick={handleBuyNow}
              disabled={!available}
            >
              {t.product.buyNow}
            </button>
          </div>

          <Link to="/tienda" className={styles.back}>
            &larr; {t.product.back}
          </Link>
        </div>
      </div>
    </div>
  )
}
