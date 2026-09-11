import type { Currency, Locale } from '../types'

export const CURRENCY_RATES: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  COP: 4000,
}

export const LOCALE_TAGS: Record<Locale, string> = {
  es: 'es',
  en: 'en',
}

export function convertPrice(priceUsd: number, currency: Currency): number {
  return priceUsd * CURRENCY_RATES[currency]
}

export function formatPrice(
  priceUsd: number,
  currency: Currency,
  locale: Locale,
): string {
  const amount = convertPrice(priceUsd, currency)
  const localeTag = locale === 'es' ? 'es-CO' : 'en-US'

  return new Intl.NumberFormat(localeTag, {
    style: 'currency',
    currency,
    maximumFractionDigits: currency === 'COP' ? 0 : 2,
  }).format(amount)
}

export function generateOrderId(): string {
  const segment = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `LS-${segment}`
}
