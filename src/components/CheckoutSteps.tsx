import { useLocation } from 'react-router-dom'
import { useLocale } from '../context/LocaleContext'
import styles from './CheckoutSteps.module.css'

function getActiveStep(pathname: string): number {
  if (pathname.startsWith('/checkout') || pathname.startsWith('/pedido-ok')) {
    return 2
  }
  if (pathname.startsWith('/carrito')) {
    return 1
  }
  return 0
}

export function CheckoutSteps() {
  const { pathname } = useLocation()
  const { t } = useLocale()
  const active = getActiveStep(pathname)

  const steps = [t.steps.choose, t.steps.cart, t.steps.confirm]

  return (
    <ol className={styles.steps} aria-label="Pasos de compra">
      {steps.map((label, index) => (
        <li
          key={label}
          className={`${styles.step} ${index <= active ? styles.active : ''} ${index === active ? styles.current : ''}`}
          aria-current={index === active ? 'step' : undefined}
        >
          <span className={styles.number}>{index + 1}</span>
          <span className={styles.label}>{label}</span>
        </li>
      ))}
    </ol>
  )
}
