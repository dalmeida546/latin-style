import { useParams, Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { categories } from '../data/categories'
import { products, isValidCategory } from '../data/products'
import { getCategoryLabel } from '../i18n/categories'
import { useLocale } from '../context/LocaleContext'
import styles from './Shop.module.css'

export function Shop() {
  const { categoria } = useParams()
  const { t, locale } = useLocale()
  const validCategory = categoria && isValidCategory(categoria) ? categoria : null

  const filtered = validCategory
    ? products.filter((p) => p.category === validCategory)
    : products

  const title = validCategory
    ? getCategoryLabel(validCategory, locale)
    : t.shop.all

  const countLabel =
    filtered.length === 1 ? t.shop.product : t.shop.products

  return (
    <div className={`container ${styles.page}`}>
      <CheckoutSteps />

      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.count}>
          {filtered.length} {countLabel}
        </p>
      </header>

      <nav className={styles.filters} aria-label={t.shop.filter}>
        <Link
          to="/tienda"
          className={`${styles.filter} ${!validCategory ? styles.filterActive : ''}`}
        >
          {t.shop.allFilter}
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/tienda/${cat.id}`}
            className={`${styles.filter} ${validCategory === cat.id ? styles.filterActive : ''}`}
          >
            {getCategoryLabel(cat.id, locale)}
          </Link>
        ))}
      </nav>

      {filtered.length > 0 ? (
        <div className={styles.grid}>
          {filtered.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 60}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <p className={styles.empty}>{t.shop.empty}</p>
      )}
    </div>
  )
}
