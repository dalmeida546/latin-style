import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CartProvider } from './context/CartContext'
import { LocaleProvider } from './context/LocaleContext'
import { Home } from './pages/Home'
import { Shop } from './pages/Shop'
import { Product } from './pages/Product'
import { Cart } from './pages/Cart'
import { Checkout } from './pages/Checkout'
import { OrderOk } from './pages/OrderOk'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <LocaleProvider>
        <CartProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tienda" element={<Shop />} />
              <Route path="/tienda/:categoria" element={<Shop />} />
              <Route path="/producto/:id" element={<Product />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/pedido-ok" element={<OrderOk />} />
            </Routes>
          </Layout>
        </CartProvider>
      </LocaleProvider>
    </BrowserRouter>
  )
}
