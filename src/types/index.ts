export type Category =
  | 'relojes'
  | 'gafas'
  | 'carteras'
  | 'correas'
  | 'ropa-urbana'

export interface Product {
  id: string
  name: string
  category: Category
  price: number
  image: string
  description: string
  sizes?: string[]
}

export interface CartItem {
  product: Product
  quantity: number
  selectedSize?: string
}

export interface CheckoutForm {
  name: string
  phone: string
  city: string
}
