import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <p className={styles.logo}>
            Latin<span>Style</span>
          </p>
          <p className={styles.tagline}>
            Accesorios urbanos con actitud latina.
          </p>
        </div>

        <nav className={styles.links} aria-label="Pie de página">
          <Link to="/tienda">Tienda</Link>
          <Link to="/tienda/relojes">Relojes</Link>
          <Link to="/tienda/gafas">Gafas</Link>
          <Link to="/tienda/carteras">Carteras</Link>
          <Link to="/tienda/correas">Correas</Link>
          <Link to="/tienda/ropa-urbana">Ropa urbana</Link>
        </nav>

        <p className={styles.copy}>
          &copy; {new Date().getFullYear()} LatinStyle. Todos los derechos
          reservados.
        </p>
      </div>
    </footer>
  )
}
