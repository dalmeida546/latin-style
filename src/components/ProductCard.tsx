import { Link } from 'react-router-dom'
import { categoryLabels } from '../data/categories'
import type { Product } from '../types'
import { formatPrice } from '../utils/format'
import { useCart } from '../context/CartContext'
import styles from './ProductCard.module.css'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()

  return (
    <article className={styles.card}>
      <Link to={`/producto/${product.id}`} className={styles.imageLink}>
        <img
          src={product.image}
          alt={product.name}
          className={styles.image}
          loading="lazy"
        />
      </Link>

      <div className={styles.body}>
        <span className={styles.category}>
          {categoryLabels[product.category]}
        </span>
        <Link to={`/producto/${product.id}`} className={styles.name}>
          <h3>{product.name}</h3>
        </Link>
        <p className={styles.price}>{formatPrice(product.price)}</p>

        <button
          type="button"
          className={`btn btn-primary btn-full ${styles.addBtn}`}
          onClick={() => addItem(product)}
        >
          Añadir al carrito
        </button>
      </div>
    </article>
  )
}
