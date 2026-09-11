export type Translation = {
  nav: {
    shop: string
    watches: string
    glasses: string
    clothing: string
    cart: string
    openMenu: string
    closeMenu: string
    allShop: string
  }
  home: {
    headline: string
    subline: string
    cta: string
    categories: string
    featured: string
    seeAll: string
    worldwide: string
    worldwideDesc: string
    secure: string
    secureDesc: string
    easy: string
    easyDesc: string
  }
  shop: {
    all: string
    products: string
    product: string
    filter: string
    allFilter: string
    empty: string
  }
  product: {
    add: string
    added: string
    buyNow: string
    size: string
    back: string
    notFound: string
    backShop: string
  }
  cart: {
    title: string
    empty: string
    emptyDesc: string
    goShop: string
    size: string
    remove: string
    removeOne: string
    addOne: string
    summary: string
    subtotal: string
    shipping: string
    free: string
    total: string
    checkout: string
    continue: string
  }
  checkout: {
    title: string
    subtitle: string
    empty: string
    name: string
    phone: string
    city: string
    country: string
    namePlaceholder: string
    phonePlaceholder: string
    cityPlaceholder: string
    countryPlaceholder: string
    order: string
    confirm: string
    note: string
    errors: {
      name: string
      phone: string
      city: string
      country: string
    }
  }
  order: {
    title: string
    thanks: string
    registered: string
    orderId: string
    note: string
    demo: string
    continue: string
  }
  steps: {
    choose: string
    cart: string
    confirm: string
  }
  card: {
    add: string
  }
  footer: {
    tagline: string
    rights: string
  }
  locale: {
    language: string
    currency: string
  }
}

const es: Translation = {
  nav: {
    shop: 'Tienda',
    watches: 'Relojes',
    glasses: 'Gafas',
    clothing: 'Ropa',
    cart: 'Ver carrito',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    allShop: 'Toda la tienda',
  },
  home: {
    headline: 'Tu estilo, tu calle',
    subline:
      'Accesorios urbanos que hablan por ti. Fácil de elegir, fácil de comprar.',
    cta: 'Ver colección',
    categories: 'Explora por categoría',
    featured: 'Destacados',
    seeAll: 'Ver todo',
    worldwide: 'Envío internacional',
    worldwideDesc: 'Llegamos a más de 40 países con seguimiento en tiempo real.',
    secure: 'Compra segura',
    secureDesc: 'Protección en cada pedido. Pagos encriptados.',
    easy: 'Fácil para todos',
    easyDesc: 'Compra en 3 pasos: elegir, carrito y confirmar.',
  },
  shop: {
    all: 'Toda la tienda',
    products: 'productos',
    product: 'producto',
    filter: 'Filtrar por categoría',
    allFilter: 'Todos',
    empty: 'No hay productos en esta categoría.',
  },
  product: {
    add: 'Añadir al carrito',
    added: '¡Añadido!',
    buyNow: 'Comprar ahora',
    size: 'Talla',
    back: 'Seguir comprando',
    notFound: 'Producto no encontrado.',
    backShop: 'Volver a la tienda',
  },
  cart: {
    title: 'Tu carrito',
    empty: 'Tu carrito está vacío',
    emptyDesc: 'Añade productos para empezar tu compra.',
    goShop: 'Ir a la tienda',
    size: 'Talla',
    remove: 'Eliminar',
    removeOne: 'Quitar uno',
    addOne: 'Añadir uno',
    summary: 'Resumen',
    subtotal: 'Subtotal',
    shipping: 'Envío',
    free: 'Gratis',
    total: 'Total',
    checkout: 'Ir a pagar',
    continue: 'Seguir comprando',
  },
  checkout: {
    title: 'Confirmar pedido',
    subtitle: 'Completa tus datos. Es rápido y sencillo.',
    empty: 'No hay productos para pagar',
    name: 'Nombre completo',
    phone: 'Teléfono',
    city: 'Ciudad',
    country: 'País',
    namePlaceholder: 'Tu nombre',
    phonePlaceholder: '+57 300 123 4567',
    cityPlaceholder: 'Tu ciudad',
    countryPlaceholder: 'Colombia, USA, España...',
    order: 'Tu pedido',
    confirm: 'Confirmar pedido',
    note: 'Checkout de demostración. No se procesará ningún pago real.',
    errors: {
      name: 'Escribe tu nombre',
      phone: 'Escribe tu teléfono',
      city: 'Escribe tu ciudad',
      country: 'Escribe tu país',
    },
  },
  order: {
    title: '¡Pedido confirmado!',
    thanks: 'Gracias',
    registered: 'Tu pedido fue registrado correctamente.',
    orderId: 'Número de pedido',
    note: 'Te contactaremos al teléfono que indicaste para coordinar la entrega internacional.',
    demo: 'Recuerda: este es un checkout de demostración.',
    continue: 'Seguir comprando',
  },
  steps: {
    choose: 'Elegir',
    cart: 'Carrito',
    confirm: 'Confirmar',
  },
  card: {
    add: 'Añadir al carrito',
  },
  footer: {
    tagline: 'Accesorios urbanos con actitud latina. Enviamos a todo el mundo.',
    rights: 'Todos los derechos reservados.',
  },
  locale: {
    language: 'Idioma',
    currency: 'Moneda',
  },
} as const

const en: Translation = {
  nav: {
    shop: 'Shop',
    watches: 'Watches',
    glasses: 'Glasses',
    clothing: 'Clothing',
    cart: 'View cart',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    allShop: 'All products',
  },
  home: {
    headline: 'Your style, your street',
    subline:
      'Urban accessories that speak for you. Easy to browse, easy to buy.',
    cta: 'Shop collection',
    categories: 'Shop by category',
    featured: 'Featured',
    seeAll: 'See all',
    worldwide: 'Worldwide shipping',
    worldwideDesc: 'We ship to 40+ countries with real-time tracking.',
    secure: 'Secure checkout',
    secureDesc: 'Protected orders. Encrypted payments.',
    easy: 'Easy for everyone',
    easyDesc: 'Buy in 3 steps: choose, cart, and confirm.',
  },
  shop: {
    all: 'All products',
    products: 'products',
    product: 'product',
    filter: 'Filter by category',
    allFilter: 'All',
    empty: 'No products in this category.',
  },
  product: {
    add: 'Add to cart',
    added: 'Added!',
    buyNow: 'Buy now',
    size: 'Size',
    back: 'Continue shopping',
    notFound: 'Product not found.',
    backShop: 'Back to shop',
  },
  cart: {
    title: 'Your cart',
    empty: 'Your cart is empty',
    emptyDesc: 'Add products to start your order.',
    goShop: 'Go to shop',
    size: 'Size',
    remove: 'Remove',
    removeOne: 'Remove one',
    addOne: 'Add one',
    summary: 'Summary',
    subtotal: 'Subtotal',
    shipping: 'Shipping',
    free: 'Free',
    total: 'Total',
    checkout: 'Checkout',
    continue: 'Continue shopping',
  },
  checkout: {
    title: 'Confirm order',
    subtitle: 'Fill in your details. Quick and simple.',
    empty: 'No items to checkout',
    name: 'Full name',
    phone: 'Phone',
    city: 'City',
    country: 'Country',
    namePlaceholder: 'Your name',
    phonePlaceholder: '+1 555 123 4567',
    cityPlaceholder: 'Your city',
    countryPlaceholder: 'USA, Colombia, Spain...',
    order: 'Your order',
    confirm: 'Place order',
    note: 'Demo checkout. No real payment will be processed.',
    errors: {
      name: 'Enter your name',
      phone: 'Enter your phone',
      city: 'Enter your city',
      country: 'Enter your country',
    },
  },
  order: {
    title: 'Order confirmed!',
    thanks: 'Thank you',
    registered: 'Your order was placed successfully.',
    orderId: 'Order number',
    note: 'We will contact you by phone to coordinate international delivery.',
    demo: 'Remember: this is a demo checkout.',
    continue: 'Continue shopping',
  },
  steps: {
    choose: 'Choose',
    cart: 'Cart',
    confirm: 'Confirm',
  },
  card: {
    add: 'Add to cart',
  },
  footer: {
    tagline: 'Urban accessories with Latin attitude. We ship worldwide.',
    rights: 'All rights reserved.',
  },
  locale: {
    language: 'Language',
    currency: 'Currency',
  },
}

export const translations = { es, en } as const
export type TranslationKey = keyof typeof es
