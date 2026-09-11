import { Link } from 'react-router-dom'
import { CategoryNav } from '../components/CategoryNav'
import { ProductCard } from '../components/ProductCard'
import { TrustBar } from '../components/TrustBar'
import { products } from '../data/products'
import { useLocale } from '../context/LocaleContext'
import styles from './Home.module.css'

const featured = products.slice(0, 4)

export function Home() {
  const { t } = useLocale()

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
          <h1 className={styles.headline}>{t.home.headline}</h1>
          <p className={styles.subline}>{t.home.subline}</p>
          <Link to="/tienda" className={`btn btn-primary ${styles.cta}`}>
            {t.home.cta}
          </Link>
        </div>
      </section>

      <TrustBar />

      <section className={`container ${styles.section}`}>
        <h2 className={styles.sectionTitle}>{t.home.categories}</h2>
        <CategoryNav />
      </section>

      <section className={`container ${styles.section}`}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>{t.home.featured}</h2>
          <Link to="/tienda" className={styles.seeAll}>
            {t.home.seeAll}
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
