import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Currency, Locale } from '../types'
import { translations, type Translation } from '../i18n/translations'

const LOCALE_KEY = 'latinstyle-locale'
const CURRENCY_KEY = 'latinstyle-currency'

interface LocaleContextValue {
  locale: Locale
  currency: Currency
  t: Translation
  setLocale: (locale: Locale) => void
  setCurrency: (currency: Currency) => void
}

const LocaleContext = createContext<LocaleContextValue | null>(null)

function loadLocale(): Locale {
  const stored = localStorage.getItem(LOCALE_KEY)
  if (stored === 'es' || stored === 'en') return stored
  const browser = navigator.language.toLowerCase()
  return browser.startsWith('es') ? 'es' : 'en'
}

function loadCurrency(): Currency {
  const stored = localStorage.getItem(CURRENCY_KEY)
  if (stored === 'USD' || stored === 'EUR' || stored === 'COP') return stored
  return 'USD'
}

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => loadLocale())
  const [currency, setCurrencyState] = useState<Currency>(() => loadCurrency())

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    localStorage.setItem(LOCALE_KEY, next)
  }, [])

  const setCurrency = useCallback((next: Currency) => {
    setCurrencyState(next)
    localStorage.setItem(CURRENCY_KEY, next)
  }, [])

  useEffect(() => {
    document.documentElement.lang = locale
  }, [locale])

  const t = translations[locale]

  const value = useMemo(
    () => ({ locale, currency, t, setLocale, setCurrency }),
    [locale, currency, t, setLocale, setCurrency],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

export function useLocale(): LocaleContextValue {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocale debe usarse dentro de LocaleProvider')
  }
  return context
}
