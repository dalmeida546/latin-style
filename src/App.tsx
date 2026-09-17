import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AdminAuthProvider } from './context/AdminAuthContext'
import { CartProvider } from './context/CartContext'
import { InventoryProvider } from './context/InventoryContext'
import { LocaleProvider } from './context/LocaleContext'
import { SalesProvider } from './context/SalesContext'
import { Home } from './pages/Home'
import { Shop } from './pages/Shop'
import { Product } from './pages/Product'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { OrderOk } from './pages/OrderOk'
import { Invoice } from './pages/Invoice'
import { Admin } from './pages/admin/Admin'

function AppRoutes() {
  const { pathname } = useLocation()
  const isAdmin = pathname.startsWith('/admin')

  const routes = (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tienda" element={<Shop />} />
      <Route path="/tienda/:categoria" element={<Shop />} />
      <Route path="/producto/:id" element={<Product />} />
      <Route path="/carrito" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/pedido-ok" element={<OrderOk />} />
      <Route path="/factura/:id" element={<Invoice />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  )

  if (isAdmin) return routes
  return <Layout>{routes}</Layout>
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LocaleProvider>
        <AdminAuthProvider>
          <InventoryProvider>
            <SalesProvider>
              <CartProvider>
                <AppRoutes />
              </CartProvider>
            </SalesProvider>
          </InventoryProvider>
        </AdminAuthProvider>
      </LocaleProvider>
    </BrowserRouter>
  )
}
