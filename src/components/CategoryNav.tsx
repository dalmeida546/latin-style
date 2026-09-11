import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { getCategoryLabel } from '../i18n/categories'
import { useLocale } from '../context/LocaleContext'
import styles from './CategoryNav.module.css'

export function CategoryNav() {
  const { locale } = useLocale()

  return (
    <nav className={styles.nav} aria-label="Categorías">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={`/tienda/${category.id}`}
          className={styles.link}
        >
          <img
            src={category.image}
            alt=""
            className={styles.image}
            loading="lazy"
          />
          <span className={styles.label}>
            {getCategoryLabel(category.id, locale)}
          </span>
        </Link>
      ))}
    </nav>
  )
}
