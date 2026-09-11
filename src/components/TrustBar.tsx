import { useLocale } from '../context/LocaleContext'
import styles from './TrustBar.module.css'

export function TrustBar() {
  const { t } = useLocale()

  const items = [
    { title: t.home.worldwide, desc: t.home.worldwideDesc },
    { title: t.home.secure, desc: t.home.secureDesc },
    { title: t.home.easy, desc: t.home.easyDesc },
  ]

  return (
    <section className={styles.bar} aria-label="Beneficios">
      <div className={`container ${styles.grid}`}>
        {items.map((item) => (
          <div key={item.title} className={styles.item}>
            <h3 className={styles.title}>{item.title}</h3>
            <p className={styles.desc}>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
