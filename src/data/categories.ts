import type { Category } from '../types'

export interface CategoryInfo {
  id: Category
  label: string
  description: string
  image: string
}

export const categories: CategoryInfo[] = [
  {
    id: 'relojes',
    label: 'Relojes',
    description: 'Cronómetros urbanos con actitud',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
  },
  {
    id: 'gafas',
    label: 'Gafas',
    description: 'Estilo que protege tu mirada',
    image:
      'https://images.unsplash.com/photo-1577803643763-f2b2545982e2?w=800&q=80',
  },
  {
    id: 'carteras',
    label: 'Carteras',
    description: 'Lleva lo esencial con clase',
    image:
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
  },
  {
    id: 'correas',
    label: 'Correas',
    description: 'Detalles que completan tu look',
    image:
      'https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=800&q=80',
  },
  {
    id: 'ropa-urbana',
    label: 'Ropa urbana',
    description: 'Streetwear con sabor latino',
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
  },
]

export const categoryLabels: Record<Category, string> = {
  relojes: 'Relojes',
  gafas: 'Gafas',
  carteras: 'Carteras',
  correas: 'Correas',
  'ropa-urbana': 'Ropa urbana',
}

export function getCategoryInfo(id: Category): CategoryInfo | undefined {
  return categories.find((category) => category.id === id)
}
