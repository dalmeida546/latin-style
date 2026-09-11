import type { Category, Locale } from '../types'

type LocalizedText = Record<Locale, string>

export const categoryContent: Record<
  Category,
  { label: LocalizedText; description: LocalizedText }
> = {
  relojes: {
    label: { es: 'Relojes', en: 'Watches' },
    description: {
      es: 'Cronómetros urbanos con actitud',
      en: 'Urban timepieces with attitude',
    },
  },
  gafas: {
    label: { es: 'Gafas', en: 'Glasses' },
    description: {
      es: 'Estilo que protege tu mirada',
      en: 'Style that protects your eyes',
    },
  },
  carteras: {
    label: { es: 'Carteras', en: 'Wallets' },
    description: {
      es: 'Lleva lo esencial con clase',
      en: 'Carry essentials with class',
    },
  },
  correas: {
    label: { es: 'Correas', en: 'Belts' },
    description: {
      es: 'Detalles que completan tu look',
      en: 'Details that complete your look',
    },
  },
  'ropa-urbana': {
    label: { es: 'Ropa urbana', en: 'Streetwear' },
    description: {
      es: 'Streetwear con sabor latino',
      en: 'Streetwear with Latin flavor',
    },
  },
}

export function getCategoryLabel(category: Category, locale: Locale): string {
  return categoryContent[category].label[locale]
}

export function getCategoryDescription(
  category: Category,
  locale: Locale,
): string {
  return categoryContent[category].description[locale]
}
