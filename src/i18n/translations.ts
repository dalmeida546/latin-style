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
    stock: string
    virtualStock: string
    outOfStock: string
    model: {
      physical: string
      virtual: string
      both: string
    }
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
    document: string
    email: string
    namePlaceholder: string
    phonePlaceholder: string
    cityPlaceholder: string
    countryPlaceholder: string
    documentPlaceholder: string
    emailPlaceholder: string
    order: string
    confirm: string
    note: string
    payment: string
    paymentMethods: {
      cash: string
      card: string
      paypal: string
      transfer: string
    }
    einvoice: string
    einvoiceHint: string
    includeInvoice: string
    fiscalRequired: string
    processing: string
    stockError: string
    errors: {
      name: string
      phone: string
      city: string
      country: string
      document: string
      email: string
      payment: string
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
    viewInvoice: string
    paymentRef: string
  }
  invoice: {
    title: string
    demoBadge: string
    number: string
    cufe: string
    customer: string
    document: string
    payment: string
    print: string
    back: string
    notFound: string
    lines: string
    total: string
    issuedAt: string
  }
  admin: {
    title: string
    login: string
    pin: string
    pinHint: string
    enter: string
    logout: string
    dashboard: string
    products: string
    inventory: string
    invoices: string
    todaySales: string
    lowStock: string
    invoicesIssued: string
    save: string
    sku: string
    stock: string
    model: string
    eInvoiceEligible: string
    active: string
    threshold: string
    adjust: string
    reason: string
    in: string
    out: string
    movements: string
    noInvoices: string
    view: string
    price: string
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
    admin: string
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
    stock: 'Stock',
    virtualStock: 'Producto virtual · stock ilimitado',
    outOfStock: 'Sin stock',
    model: {
      physical: 'Físico',
      virtual: 'Virtual',
      both: 'Físico + Virtual',
    },
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
    subtitle: 'Completa tus datos, elige pago y decide qué facturar.',
    empty: 'No hay productos para pagar',
    name: 'Nombre completo',
    phone: 'Teléfono',
    city: 'Ciudad',
    country: 'País',
    document: 'Documento / NIT',
    email: 'Email',
    namePlaceholder: 'Tu nombre',
    phonePlaceholder: '+57 300 123 4567',
    cityPlaceholder: 'Tu ciudad',
    countryPlaceholder: 'Colombia, USA, España...',
    documentPlaceholder: 'CC o NIT',
    emailPlaceholder: 'correo@ejemplo.com',
    order: 'Tu pedido',
    confirm: 'Confirmar pedido',
    note: 'Pagos y facturación electrónica simulados. Listos para integrar datos reales.',
    payment: 'Medio de pago',
    paymentMethods: {
      cash: 'Efectivo',
      card: 'Tarjeta',
      paypal: 'PayPal',
      transfer: 'Transferencia',
    },
    einvoice: 'Facturación electrónica',
    einvoiceHint:
      'Elige qué productos incluir en la factura electrónica (demo DIAN-ready).',
    includeInvoice: 'Incluir en FE',
    fiscalRequired: 'Datos fiscales requeridos para emitir factura.',
    processing: 'Procesando…',
    stockError: 'Stock insuficiente para uno o más productos.',
    errors: {
      name: 'Escribe tu nombre',
      phone: 'Escribe tu teléfono',
      city: 'Escribe tu ciudad',
      country: 'Escribe tu país',
      document: 'Escribe tu documento',
      email: 'Escribe tu email',
      payment: 'Elige un medio de pago',
    },
  },
  order: {
    title: '¡Pedido confirmado!',
    thanks: 'Gracias',
    registered: 'Tu pedido fue registrado correctamente.',
    orderId: 'Número de pedido',
    note: 'Te contactaremos al teléfono que indicaste para coordinar la entrega.',
    demo: 'Pagos y FE son de demostración, preparados para datos reales.',
    continue: 'Seguir comprando',
    viewInvoice: 'Ver factura electrónica',
    paymentRef: 'Referencia de pago',
  },
  invoice: {
    title: 'Factura electrónica',
    demoBadge:
      'Factura electrónica de demostración — lista para integración DIAN',
    number: 'Número',
    cufe: 'CUFE',
    customer: 'Cliente',
    document: 'Documento',
    payment: 'Pago',
    print: 'Imprimir / PDF',
    back: 'Volver',
    notFound: 'Factura no encontrada.',
    lines: 'Detalle',
    total: 'Total',
    issuedAt: 'Emitida',
  },
  admin: {
    title: 'Panel LatinStyle',
    login: 'Acceso admin',
    pin: 'PIN',
    pinHint: 'PIN demo: 1234',
    enter: 'Entrar',
    logout: 'Salir',
    dashboard: 'Dashboard',
    products: 'Productos',
    inventory: 'Inventario',
    invoices: 'Facturas',
    todaySales: 'Ventas de hoy',
    lowStock: 'Stock bajo',
    invoicesIssued: 'Facturas emitidas',
    save: 'Guardar',
    sku: 'SKU',
    stock: 'Stock',
    model: 'Modelo',
    eInvoiceEligible: 'Elegible FE',
    active: 'Activo',
    threshold: 'Umbral bajo',
    adjust: 'Ajustar stock',
    reason: 'Motivo',
    in: 'Entrada',
    out: 'Salida',
    movements: 'Movimientos',
    noInvoices: 'Aún no hay facturas.',
    view: 'Ver',
    price: 'Precio USD',
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
    admin: 'Admin',
  },
  locale: {
    language: 'Idioma',
    currency: 'Moneda',
  },
}

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
    stock: 'Stock',
    virtualStock: 'Virtual product · unlimited stock',
    outOfStock: 'Out of stock',
    model: {
      physical: 'Physical',
      virtual: 'Virtual',
      both: 'Physical + Virtual',
    },
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
    subtitle: 'Fill in your details, choose payment and what to invoice.',
    empty: 'No items to checkout',
    name: 'Full name',
    phone: 'Phone',
    city: 'City',
    country: 'Country',
    document: 'ID / Tax ID',
    email: 'Email',
    namePlaceholder: 'Your name',
    phonePlaceholder: '+1 555 123 4567',
    cityPlaceholder: 'Your city',
    countryPlaceholder: 'USA, Colombia, Spain...',
    documentPlaceholder: 'ID or Tax ID',
    emailPlaceholder: 'email@example.com',
    order: 'Your order',
    confirm: 'Place order',
    note: 'Payments and e-invoicing are simulated. Ready for real integrations.',
    payment: 'Payment method',
    paymentMethods: {
      cash: 'Cash',
      card: 'Card',
      paypal: 'PayPal',
      transfer: 'Bank transfer',
    },
    einvoice: 'Electronic invoice',
    einvoiceHint:
      'Choose which products to include in the e-invoice (DIAN-ready demo).',
    includeInvoice: 'Include in e-invoice',
    fiscalRequired: 'Tax details required to issue an invoice.',
    processing: 'Processing…',
    stockError: 'Insufficient stock for one or more products.',
    errors: {
      name: 'Enter your name',
      phone: 'Enter your phone',
      city: 'Enter your city',
      country: 'Enter your country',
      document: 'Enter your document',
      email: 'Enter your email',
      payment: 'Choose a payment method',
    },
  },
  order: {
    title: 'Order confirmed!',
    thanks: 'Thank you',
    registered: 'Your order was placed successfully.',
    orderId: 'Order number',
    note: 'We will contact you by phone to coordinate delivery.',
    demo: 'Payments and e-invoicing are demo, ready for real data.',
    continue: 'Continue shopping',
    viewInvoice: 'View electronic invoice',
    paymentRef: 'Payment reference',
  },
  invoice: {
    title: 'Electronic invoice',
    demoBadge: 'Demo electronic invoice — ready for DIAN integration',
    number: 'Number',
    cufe: 'CUFE',
    customer: 'Customer',
    document: 'Document',
    payment: 'Payment',
    print: 'Print / PDF',
    back: 'Back',
    notFound: 'Invoice not found.',
    lines: 'Details',
    total: 'Total',
    issuedAt: 'Issued',
  },
  admin: {
    title: 'LatinStyle Admin',
    login: 'Admin access',
    pin: 'PIN',
    pinHint: 'Demo PIN: 1234',
    enter: 'Sign in',
    logout: 'Sign out',
    dashboard: 'Dashboard',
    products: 'Products',
    inventory: 'Inventory',
    invoices: 'Invoices',
    todaySales: 'Today sales',
    lowStock: 'Low stock',
    invoicesIssued: 'Invoices issued',
    save: 'Save',
    sku: 'SKU',
    stock: 'Stock',
    model: 'Model',
    eInvoiceEligible: 'E-invoice eligible',
    active: 'Active',
    threshold: 'Low threshold',
    adjust: 'Adjust stock',
    reason: 'Reason',
    in: 'In',
    out: 'Out',
    movements: 'Movements',
    noInvoices: 'No invoices yet.',
    view: 'View',
    price: 'Price USD',
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
    admin: 'Admin',
  },
  locale: {
    language: 'Language',
    currency: 'Currency',
  },
}

export const translations = { es, en }
