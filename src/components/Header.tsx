import { useState } from 'react'
import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { getCategoryLabel } from '../i18n/categories'
import { useCart } from '../context/CartContext'
import { useLocale } from '../context/LocaleContext'
import { LocaleSwitcher } from './LocaleSwitcher'
import styles from './Header.module.css'

export function Header() {
  const { itemCount } = useCart()
  const { t, locale } = useLocale()
  const [menuOpen, setMenuOpen] = useState(false)

  const mobileLinks = [
    { to: '/tienda', label: t.nav.allShop },
    ...categories.map((c) => ({
      to: `/tienda/${c.id}`,
      label: getCategoryLabel(c.id, locale),
    })),
  ]

  return (
    <header className={styles.header}>
      <div className={`container ${styles.inner}`}>
        <Link to="/" className={styles.logo} onClick={() => setMenuOpen(false)}>
          Latin<span className={styles.logoAccent}>Style</span>
        </Link>

        <nav className={styles.nav} aria-label="Principal">
          <Link to="/tienda" className={styles.navLink}>
            {t.nav.shop}
          </Link>
          <Link to="/tienda/relojes" className={styles.navLink}>
            {t.nav.watches}
          </Link>
          <Link to="/tienda/gafas" className={styles.navLink}>
            {t.nav.glasses}
          </Link>
          <Link to="/tienda/ropa-urbana" className={styles.navLink}>
            {t.nav.clothing}
          </Link>
        </nav>

        <div className={styles.actions}>
          <LocaleSwitcher />

          <button
            type="button"
            className={styles.menuBtn}
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t.nav.closeMenu : t.nav.openMenu}
          >
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
            <span className={styles.menuBar} />
          </button>

          <Link
            to="/carrito"
            className={styles.cartLink}
            aria-label={t.nav.cart}
            onClick={() => setMenuOpen(false)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M6 6h15l-1.5 9h-12L6 6z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <circle cx="9" cy="20" r="1.5" fill="currentColor" />
              <circle cx="18" cy="20" r="1.5" fill="currentColor" />
              <path
                d="M6 6L5 3H2"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            {itemCount > 0 && (
              <span className={styles.cartCount} aria-live="polite">
                {itemCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-menu"
          className={styles.mobileNav}
          aria-label="Menú móvil"
        >
          <div className={`container ${styles.mobileNavInner}`}>
            {mobileLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={styles.mobileLink}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
