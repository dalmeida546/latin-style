import type { Category } from '../types'

export interface CategoryInfo {
  id: Category
  image: string
}

export const categories: CategoryInfo[] = [
  {
    id: 'relojes',
    image:
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&q=80',
  },
  {
    id: 'gafas',
    image:
      'https://images.unsplash.com/photo-1577803643763-f2b2545982e2?w=800&q=80',
  },
  {
    id: 'carteras',
    image:
      'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
  },
  {
    id: 'correas',
    image:
      'https://images.unsplash.com/photo-1624222247344-550fb60583fd?w=800&q=80',
  },
  {
    id: 'ropa-urbana',
    image:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800&q=80',
  },
]

export function getCategoryInfo(id: Category): CategoryInfo | undefined {
  return categories.find((category) => category.id === id)
}
