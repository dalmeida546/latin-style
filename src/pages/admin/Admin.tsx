import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ADMIN_PIN, useAdminAuth } from '../../context/AdminAuthContext'
import { useInventory } from '../../context/InventoryContext'
import { useLocale } from '../../context/LocaleContext'
import { useSales } from '../../context/SalesContext'
import { paymentMethodLabel } from '../../services/paymentService'
import type { BusinessModel, Product } from '../../types'
import { formatPrice } from '../../utils/format'
import styles from './Admin.module.css'

type Tab = 'dashboard' | 'products' | 'inventory' | 'invoices'

export function Admin() {
  const { isAuthenticated, login, logout } = useAdminAuth()
  const { t, locale, currency } = useLocale()
  const { products, updateProduct, adjustStock, lowStockProducts, movements } =
    useInventory()
  const { todaySales, invoicedSales, sales } = useSales()
  const [tab, setTab] = useState<Tab>('dashboard')
  const [pin, setPin] = useState('')
  const [loginError, setLoginError] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [draft, setDraft] = useState<Product | null>(null)
  const [adjustId, setAdjustId] = useState('')
  const [adjustQty, setAdjustQty] = useState(1)
  const [adjustReason, setAdjustReason] = useState('Ajuste manual')

  const todayTotal = useMemo(
    () => todaySales.reduce((sum, s) => sum + s.totalUsd, 0),
    [todaySales],
  )

  if (!isAuthenticated) {
    return (
      <div className={`container ${styles.page}`}>
        <h1 className={styles.title}>{t.admin.login}</h1>
        <p className={styles.hint}>{t.admin.pinHint}</p>
        <form
          className={styles.loginForm}
          onSubmit={(e: FormEvent) => {
            e.preventDefault()
            const ok = login(pin)
            setLoginError(!ok)
            if (!ok) setPin('')
          }}
        >
          <label>
            {t.admin.pin}
            <input
              type="password"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              autoComplete="current-password"
              placeholder={ADMIN_PIN}
            />
          </label>
          {loginError && <p className={styles.error}>PIN incorrecto</p>}
          <button type="submit" className="btn btn-primary">
            {t.admin.enter}
          </button>
        </form>
        <Link to="/" className={styles.backLink}>
          ← LatinStyle
        </Link>
      </div>
    )
  }

  const startEdit = (product: Product) => {
    setEditingId(product.id)
    setDraft({ ...product })
  }

  const saveEdit = () => {
    if (!draft) return
    updateProduct(draft)
    setEditingId(null)
    setDraft(null)
  }

  return (
    <div className={`container ${styles.page}`}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>{t.admin.title}</h1>
          <p className={styles.hint}>Demo local · listo para API real</p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={logout}>
          {t.admin.logout}
        </button>
      </header>

      <nav className={styles.tabs}>
        {(
          [
            ['dashboard', t.admin.dashboard],
            ['products', t.admin.products],
            ['inventory', t.admin.inventory],
            ['invoices', t.admin.invoices],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            className={`${styles.tab} ${tab === id ? styles.tabActive : ''}`}
            onClick={() => setTab(id)}
          >
            {label}
          </button>
        ))}
      </nav>

      {tab === 'dashboard' && (
        <section className={styles.cards}>
          <article className={styles.card}>
            <h2>{t.admin.todaySales}</h2>
            <p className={styles.metric}>{todaySales.length}</p>
            <p className={styles.sub}>
              {formatPrice(todayTotal, currency, locale)}
            </p>
          </article>
          <article className={styles.card}>
            <h2>{t.admin.lowStock}</h2>
            <p className={styles.metric}>{lowStockProducts.length}</p>
            <ul className={styles.list}>
              {lowStockProducts.slice(0, 5).map((p) => (
                <li key={p.id}>
                  {p.name}: {p.stock}
                </li>
              ))}
            </ul>
          </article>
          <article className={styles.card}>
            <h2>{t.admin.invoicesIssued}</h2>
            <p className={styles.metric}>{invoicedSales.length}</p>
          </article>
        </section>
      )}

      {tab === 'products' && (
        <section className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>{t.admin.sku}</th>
                <th>Nombre</th>
                <th>{t.admin.model}</th>
                <th>{t.admin.stock}</th>
                <th>{t.admin.price}</th>
                <th>{t.admin.eInvoiceEligible}</th>
                <th>{t.admin.active}</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const editing = editingId === product.id && draft
                return (
                  <tr key={product.id}>
                    <td>{product.sku}</td>
                    <td>{product.name}</td>
                    <td>
                      {editing ? (
                        <select
                          value={draft.businessModel}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              businessModel: e.target.value as BusinessModel,
                            })
                          }
                        >
                          <option value="physical">physical</option>
                          <option value="virtual">virtual</option>
                          <option value="both">both</option>
                        </select>
                      ) : (
                        product.businessModel
                      )}
                    </td>
                    <td>
                      {editing ? (
                        <input
                          type="number"
                          className={styles.num}
                          value={draft.stock}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              stock: Number(e.target.value),
                            })
                          }
                        />
                      ) : product.businessModel === 'virtual' ? (
                        '∞'
                      ) : (
                        product.stock
                      )}
                    </td>
                    <td>
                      {editing ? (
                        <input
                          type="number"
                          className={styles.num}
                          value={draft.priceUsd}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              priceUsd: Number(e.target.value),
                            })
                          }
                        />
                      ) : (
                        product.priceUsd
                      )}
                    </td>
                    <td>
                      {editing ? (
                        <input
                          type="checkbox"
                          checked={draft.requiresEInvoice}
                          onChange={(e) =>
                            setDraft({
                              ...draft,
                              requiresEInvoice: e.target.checked,
                            })
                          }
                        />
                      ) : product.requiresEInvoice ? (
                        'Sí'
                      ) : (
                        'No'
                      )}
                    </td>
                    <td>
                      {editing ? (
                        <input
                          type="checkbox"
                          checked={draft.active}
                          onChange={(e) =>
                            setDraft({ ...draft, active: e.target.checked })
                          }
                        />
                      ) : product.active ? (
                        'Sí'
                      ) : (
                        'No'
                      )}
                    </td>
                    <td>
                      {editing ? (
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={saveEdit}
                        >
                          {t.admin.save}
                        </button>
                      ) : (
                        <button
                          type="button"
                          className={styles.linkBtn}
                          onClick={() => startEdit(product)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </section>
      )}

      {tab === 'inventory' && (
        <section className={styles.inventory}>
          <form
            className={styles.adjustForm}
            onSubmit={(e) => {
              e.preventDefault()
              if (!adjustId || !adjustQty) return
              adjustStock(adjustId, adjustQty, adjustReason || 'Ajuste')
              setAdjustQty(1)
            }}
          >
            <h2>{t.admin.adjust}</h2>
            <select
              value={adjustId}
              onChange={(e) => setAdjustId(e.target.value)}
              required
            >
              <option value="">Producto…</option>
              {products
                .filter((p) => p.businessModel !== 'virtual')
                .map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.sku} — {p.name} ({p.stock})
                  </option>
                ))}
            </select>
            <input
              type="number"
              value={adjustQty}
              onChange={(e) => setAdjustQty(Number(e.target.value))}
              placeholder="+ entrada / - salida"
            />
            <input
              type="text"
              value={adjustReason}
              onChange={(e) => setAdjustReason(e.target.value)}
              placeholder={t.admin.reason}
            />
            <div className={styles.adjustActions}>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setAdjustQty(Math.abs(adjustQty) || 1)}
              >
                {t.admin.in}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setAdjustQty(-Math.abs(adjustQty || 1))}
              >
                {t.admin.out}
              </button>
              <button type="submit" className="btn btn-primary">
                {t.admin.save}
              </button>
            </div>
          </form>

          <div>
            <h2>{t.admin.movements}</h2>
            <ul className={styles.movements}>
              {movements.slice(0, 20).map((m) => {
                const p = products.find((x) => x.id === m.productId)
                return (
                  <li key={m.id}>
                    <strong>{m.delta > 0 ? '+' : ''}{m.delta}</strong>{' '}
                    {p?.name ?? m.productId} — {m.reason}{' '}
                    <span>{new Date(m.createdAt).toLocaleString(locale)}</span>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      )}

      {tab === 'invoices' && (
        <section className={styles.tableWrap}>
          {invoicedSales.length === 0 ? (
            <p>{t.admin.noInvoices}</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>FE</th>
                  <th>Venta</th>
                  <th>Cliente</th>
                  <th>Pago</th>
                  <th>Total</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {invoicedSales.map((sale) => (
                  <tr key={sale.id}>
                    <td>{sale.eInvoice?.number}</td>
                    <td>{sale.id}</td>
                    <td>{sale.customer.name}</td>
                    <td>
                      {paymentMethodLabel(sale.paymentMethod, locale)}
                    </td>
                    <td>{formatPrice(sale.totalUsd, currency, locale)}</td>
                    <td>
                      <Link to={`/factura/${sale.id}`}>{t.admin.view}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <p className={styles.hint}>
            Ventas totales registradas: {sales.length}
          </p>
        </section>
      )}
    </div>
  )
}
