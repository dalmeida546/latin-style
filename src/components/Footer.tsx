import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { getCategoryLabel } from '../i18n/categories'
import { useLocale } from '../context/LocaleContext'
import styles from './Footer.module.css'

export function Footer() {
  const { t, locale } = useLocale()

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <p className={styles.logo}>
            Latin<span>Style</span>
          </p>
          <p className={styles.tagline}>{t.footer.tagline}</p>
        </div>

        <nav className={styles.links} aria-label="Pie de página">
          <Link to="/tienda">{t.nav.shop}</Link>
          {categories.map((cat) => (
            <Link key={cat.id} to={`/tienda/${cat.id}`}>
              {getCategoryLabel(cat.id, locale)}
            </Link>
          ))}
          <Link to="/admin">{t.footer.admin}</Link>
        </nav>

        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} LatinStyle. {t.footer.rights}
        </p>
      </div>
    </footer>
  )
}
