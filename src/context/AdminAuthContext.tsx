import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const AUTH_KEY = 'latinstyle-admin-auth'
const ADMIN_PIN = '1234'

interface AdminAuthContextValue {
  isAuthenticated: boolean
  login: (pin: string) => boolean
  logout: () => void
}

const AdminAuthContext = createContext<AdminAuthContextValue | null>(null)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem(AUTH_KEY) === '1'
  })

  useEffect(() => {
    localStorage.setItem(AUTH_KEY, isAuthenticated ? '1' : '0')
  }, [isAuthenticated])

  const login = useCallback((pin: string) => {
    const ok = pin.trim() === ADMIN_PIN
    if (ok) setIsAuthenticated(true)
    return ok
  }, [])

  const logout = useCallback(() => {
    setIsAuthenticated(false)
  }, [])

  const value = useMemo(
    () => ({ isAuthenticated, login, logout }),
    [isAuthenticated, login, logout],
  )

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth(): AdminAuthContextValue {
  const context = useContext(AdminAuthContext)
  if (!context) {
    throw new Error('useAdminAuth debe usarse dentro de AdminAuthProvider')
  }
  return context
}

export { ADMIN_PIN }
