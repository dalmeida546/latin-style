import { Link, useParams } from 'react-router-dom'
import { useLocale } from '../context/LocaleContext'
import { useSales } from '../context/SalesContext'
import { paymentMethodLabel } from '../services/paymentService'
import { formatPrice } from '../utils/format'
import styles from './Invoice.module.css'

export function Invoice() {
  const { id } = useParams()
  const { getSale } = useSales()
  const { t, locale, currency } = useLocale()
  const sale = id ? getSale(id) : undefined

  if (!sale || !sale.eInvoice) {
    return (
      <div className={`container ${styles.page}`}>
        <p>{t.invoice.notFound}</p>
        <Link to="/" className="btn btn-primary">
          {t.invoice.back}
        </Link>
      </div>
    )
  }

  const invoiceLines = sale.lines.filter((line) => line.invoiceSelected)
  const invoiceTotal = invoiceLines.reduce(
    (sum, line) => sum + line.priceUsd * line.quantity,
    0,
  )

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.toolbar}>
        <Link to="/" className={styles.back}>
          ← {t.invoice.back}
        </Link>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => window.print()}
        >
          {t.invoice.print}
        </button>
      </div>

      <article className={styles.doc}>
        <p className={styles.badge}>{t.invoice.demoBadge}</p>

        <header className={styles.docHeader}>
          <div>
            <p className={styles.brand}>
              Latin<span>Style</span>
            </p>
            <h1>{t.invoice.title}</h1>
          </div>
          <div className={styles.meta}>
            <p>
              <strong>{t.invoice.number}:</strong> {sale.eInvoice.number}
            </p>
            <p>
              <strong>{t.invoice.issuedAt}:</strong>{' '}
              {new Date(sale.eInvoice.issuedAt).toLocaleString(locale)}
            </p>
            <p>
              <strong>Sale:</strong> {sale.id}
            </p>
          </div>
        </header>

        <section className={styles.section}>
          <h2>{t.invoice.customer}</h2>
          <p>{sale.customer.name}</p>
          {sale.customer.document && (
            <p>
              {t.invoice.document}: {sale.customer.document}
            </p>
          )}
          {sale.customer.email && <p>{sale.customer.email}</p>}
          <p>
            {sale.customer.city}, {sale.customer.country}
          </p>
          <p>{sale.customer.phone}</p>
        </section>

        <section className={styles.section}>
          <h2>{t.invoice.lines}</h2>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>SKU</th>
                <th>Producto</th>
                <th>Qty</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {invoiceLines.map((line) => (
                <tr key={`${line.productId}-${line.selectedSize ?? 'x'}`}>
                  <td>{line.sku}</td>
                  <td>
                    {line.name}
                    {line.selectedSize ? ` (${line.selectedSize})` : ''}
                  </td>
                  <td>{line.quantity}</td>
                  <td>
                    {formatPrice(
                      line.priceUsd * line.quantity,
                      currency,
                      locale,
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <section className={styles.footerRow}>
          <div>
            <p>
              <strong>{t.invoice.payment}:</strong>{' '}
              {paymentMethodLabel(sale.paymentMethod, locale)}
            </p>
            <p>
              <strong>Ref:</strong> {sale.paymentRef}
            </p>
            <p className={styles.cufe}>
              <strong>{t.invoice.cufe}:</strong> {sale.eInvoice.cufe}
            </p>
          </div>
          <p className={styles.total}>
            {t.invoice.total}: {formatPrice(invoiceTotal, currency, locale)}
          </p>
        </section>
      </article>
    </div>
  )
}
