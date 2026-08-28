import { useLocation } from 'react-router-dom'
import styles from './CheckoutSteps.module.css'

const steps = [
  { label: 'Elegir', paths: ['/', '/tienda', '/producto'] },
  { label: 'Carrito', paths: ['/carrito'] },
  { label: 'Confirmar', paths: ['/checkout', '/pedido-ok'] },
]

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
  const active = getActiveStep(pathname)

  return (
    <ol className={styles.steps} aria-label="Pasos de compra">
      {steps.map((step, index) => (
        <li
          key={step.label}
          className={`${styles.step} ${index <= active ? styles.active : ''} ${index === active ? styles.current : ''}`}
          aria-current={index === active ? 'step' : undefined}
        >
          <span className={styles.number}>{index + 1}</span>
          <span className={styles.label}>{step.label}</span>
        </li>
      ))}
    </ol>
  )
}
