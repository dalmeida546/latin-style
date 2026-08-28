import { useParams, Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { CheckoutSteps } from '../components/CheckoutSteps'
import { categories, categoryLabels } from '../data/categories'
import { products, isValidCategory } from '../data/products'
import styles from './Shop.module.css'

export function Shop() {
  const { categoria } = useParams()
  const validCategory = categoria && isValidCategory(categoria) ? categoria : null

  const filtered = validCategory
    ? products.filter((p) => p.category === validCategory)
    : products

  const title = validCategory
    ? categoryLabels[validCategory]
    : 'Toda la tienda'

  return (
    <div className={`container ${styles.page}`}>
      <CheckoutSteps />

      <header className={styles.header}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.count}>
          {filtered.length} producto{filtered.length !== 1 ? 's' : ''}
        </p>
      </header>

      <nav className={styles.filters} aria-label="Filtrar por categoría">
        <Link
          to="/tienda"
          className={`${styles.filter} ${!validCategory ? styles.filterActive : ''}`}
        >
          Todos
        </Link>
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/tienda/${cat.id}`}
            className={`${styles.filter} ${validCategory === cat.id ? styles.filterActive : ''}`}
          >
            {cat.label}
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
        <p className={styles.empty}>No hay productos en esta categoría.</p>
      )}
    </div>
  )
}
