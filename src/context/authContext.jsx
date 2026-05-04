import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { getMe } from "@/features/auth/api/authApi"
import { storeToken, removeToken, getToken } from "@/features/auth/utils/tokenHelpers"

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(() => getToken())

  // On mount, if a token exists, validate it by fetching /auth/me
  useEffect(() => {
    const boot = async () => {
      if (!getToken()) { setLoading(false); return }
      try {
        const data = await getMe()
        setUser(data.user ?? data)
      } catch {
        removeToken()
      } finally {
        setLoading(false)
      }
    }
    boot()
  }, [])

  const signIn = useCallback(({ token, user }) => {
    storeToken(token)
    setUser(user)
    setToken(token)
  }, [])

  const signOut = useCallback(() => {
    removeToken()
    setUser(null)
    setToken(null)
  }, [])

  return (
    <AuthContext.Provider value={{ user, token, loading, signIn, signOut, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error("useAuth must be used inside <AuthProvider>")
  return ctx
}
