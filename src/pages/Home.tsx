import { Link } from 'react-router-dom'
import { CategoryNav } from '../components/CategoryNav'
import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'
import styles from './Home.module.css'

const featured = products.slice(0, 4)

export function Home() {
  return (
    <>
      <section className={styles.hero}>
        <img
          src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&q=80"
          alt=""
          className={styles.heroImage}
        />
        <div className={styles.heroOverlay} />
        <div className={`container ${styles.heroContent}`}>
          <p className={styles.brand}>LatinStyle</p>
          <h1 className={styles.headline}>Tu estilo, tu calle</h1>
          <p className={styles.subline}>
            Accesorios urbanos que hablan por ti. Fácil de elegir, fácil de
            comprar.
          </p>
          <Link to="/tienda" className={`btn btn-primary ${styles.cta}`}>
            Ver colección
          </Link>
        </div>
      </section>

      <section className={`container ${styles.section}`}>
        <h2 className={styles.sectionTitle}>Explora por categoría</h2>
        <CategoryNav />
      </section>

      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Destacados</h2>
          <Link to="/tienda" className={styles.seeAll}>
            Ver todo
          </Link>
        </div>
        <div className={styles.grid}>
          {featured.map((product, index) => (
            <div
              key={product.id}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
