import type { Category, Product } from '../types'

export const products: Product[] = [
  {
    id: 'reloj-neon-pulse',
    name: 'Neon Pulse',
    category: 'relojes',
    priceUsd: 47,
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900&q=80',
    description:
      'Reloj digital con correa de silicona y pantalla LED. Resistente al agua, perfecto para la calle.',
  },
  {
    id: 'reloj-classic-steel',
    name: 'Classic Steel',
    category: 'relojes',
    priceUsd: 61,
    image:
      'https://images.unsplash.com/photo-1524593369004-842f27e85d21?w=900&q=80',
    description:
      'Caja de acero inoxidable con cristal mineral. Elegancia urbana para el día a día.',
  },
  {
    id: 'reloj-street-chrono',
    name: 'Street Chrono',
    category: 'relojes',
    priceUsd: 78,
    image:
      'https://images.unsplash.com/photo-1548171915-e79a380a9a4e?w=900&q=80',
    description:
      'Cronógrafo deportivo con triple subesfera. Actitud y precisión en tu muñeca.',
  },
  {
    id: 'gafas-urban-shade',
    name: 'Urban Shade',
    category: 'gafas',
    priceUsd: 25,
    image:
      'https://images.unsplash.com/photo-1577803643763-f2b2545982e2?w=900&q=80',
    description:
      'Montura negra mate con lentes polarizados. Protección UV400 para días soleados.',
  },
  {
    id: 'gafas-retro-gold',
    name: 'Retro Gold',
    category: 'gafas',
    priceUsd: 31,
    image:
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=900&q=80',
    description:
      'Marco dorado vintage con lentes degradados. El clásico que nunca pasa de moda.',
  },
  {
    id: 'gafas-sport-flex',
    name: 'Sport Flex',
    category: 'gafas',
    priceUsd: 22,
    image:
      'https://images.unsplash.com/photo-1574258495973-f8dfdbccae6c?w=900&q=80',
    description:
      'Diseño envolvente flexible. Ideales para moverte con estilo y comodidad.',
  },
  {
    id: 'cartera-slim-leather',
    name: 'Slim Leather',
    category: 'carteras',
    priceUsd: 39,
    image:
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=900&q=80',
    description:
      'Cuero genuino con compartimentos para tarjetas y billetes. Delgada y práctica.',
  },
  {
    id: 'cartera-zip-classic',
    name: 'Zip Classic',
    category: 'carteras',
    priceUsd: 34,
    image:
      'https://images.unsplash.com/photo-1606760227091-3dd870d1f56d?w=900&q=80',
    description:
      'Cierre con cremallera y múltiples bolsillos. Todo organizado en un solo lugar.',
  },
  {
    id: 'cartera-card-holder',
    name: 'Card Holder',
    category: 'carteras',
    priceUsd: 20,
    image:
      'https://images.unsplash.com/photo-1620756308525-38d1fe8dcc76?w=900&q=80',
    description:
      'Portatarjetas minimalista de piel. Cabe en cualquier bolsillo sin volumen.',
  },
  {
    id: 'correa-canvas-street',
    name: 'Canvas Street',
    category: 'correas',
    priceUsd: 22,
    image:
      'https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=900&q=80',
    description:
      'Correa de lona reforzada con hebilla metálica. Ajustable y resistente.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'correa-leather-braided',
    name: 'Leather Braided',
    category: 'correas',
    priceUsd: 28,
    image:
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=900&q=80',
    description:
      'Cuero trenzado artesanal con acabado premium. El detalle que marca la diferencia.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'correa-chain-urban',
    name: 'Chain Urban',
    category: 'correas',
    priceUsd: 24,
    image:
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=900&q=80',
    description:
      'Cadena metálica con cierre de seguridad. Estilo industrial para looks audaces.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'hoodie-latin-wave',
    name: 'Latin Wave Hoodie',
    category: 'ropa-urbana',
    priceUsd: 50,
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=900&q=80',
    description:
      'Sudadera oversize con capucha y logo bordado. Algodón premium, máximo confort.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'tee-street-vibes',
    name: 'Street Vibes Tee',
    category: 'ropa-urbana',
    priceUsd: 22,
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=900&q=80',
    description:
      'Camiseta gráfica de algodón peinado. Print exclusivo LatinStyle en el pecho.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'jacket-urban-wind',
    name: 'Urban Wind Jacket',
    category: 'ropa-urbana',
    priceUsd: 67,
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=900&q=80',
    description:
      'Chaqueta cortavientos ligera con bolsillos ocultos. Lista para cualquier clima.',
    sizes: ['S', 'M', 'L', 'XL'],
  },
  {
    id: 'cap-latin-logo',
    name: 'Latin Logo Cap',
    category: 'ropa-urbana',
    priceUsd: 18,
    image:
      'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=900&q=80',
    description:
      'Gorra ajustable con bordado 3D. El accesorio final para completar tu outfit.',
    sizes: ['Única', 'One size'],
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getProductsByCategory(category: Category): Product[] {
  return products.filter((product) => product.category === category)
}

export function isValidCategory(value: string): value is Category {
  return ['relojes', 'gafas', 'carteras', 'correas', 'ropa-urbana'].includes(
    value,
  )
}
