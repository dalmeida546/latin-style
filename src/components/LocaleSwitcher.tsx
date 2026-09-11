import type { Currency, Locale } from '../types'
import { useLocale } from '../context/LocaleContext'
import styles from './LocaleSwitcher.module.css'

const currencies: Currency[] = ['USD', 'EUR', 'COP']
const locales: { value: Locale; label: string }[] = [
  { value: 'es', label: 'ES' },
  { value: 'en', label: 'EN' },
]

export function LocaleSwitcher() {
  const { locale, currency, setLocale, setCurrency, t } = useLocale()

  return (
    <div className={styles.switcher}>
      <label className={styles.group}>
        <span className="visually-hidden">{t.locale.language}</span>
        <select
          className={styles.select}
          value={locale}
          onChange={(e) => setLocale(e.target.value as Locale)}
          aria-label={t.locale.language}
        >
          {locales.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </label>

      <label className={styles.group}>
        <span className="visually-hidden">{t.locale.currency}</span>
        <select
          className={styles.select}
          value={currency}
          onChange={(e) => setCurrency(e.target.value as Currency)}
          aria-label={t.locale.currency}
        >
          {currencies.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  )
}
