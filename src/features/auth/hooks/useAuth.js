import { useCallback, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"
import { login, register, logout } from "../api/authApi"
import { useAuth } from "@/context/authContext"
import { ROUTES } from "@/constants/routes"

export const useAuthActions = () => {
  const { signIn, signOut } = useAuth()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = useCallback(async (credentials) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await login(credentials)
      signIn({ token: data.token, user: data.user })
      toast.success(`Welcome back, ${data.user.first_name}!`)
      navigate(ROUTES.SEARCH)
    } catch (err) {
      const msg = err.response?.data?.error ?? "Invalid email or password."
      setError(msg)
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }, [signIn, navigate])

  const handleRegister = useCallback(async (formData) => {
    setIsLoading(true)
    setError(null)
    try {
      const data = await register(formData)
      signIn({ token: data.token, user: data.user })
      toast.success(`Welcome, ${data.user.first_name}! Your account is ready.`)
      navigate(ROUTES.SEARCH)
    } catch (err) {
      const msg =
        err.response?.data?.errors?.join(", ") ??
        err.response?.data?.error ??
        "Registration failed."
      setError(msg)
      toast.error(msg)
    } finally {
      setIsLoading(false)
    }
  }, [signIn, navigate])

  const handleLogout = useCallback(async () => {
    try {
      await logout()
    } catch {
      // ignore network errors on logout
    } finally {
      signOut()
      navigate(ROUTES.LOGIN)
      toast.success("You've been logged out.")
    }
  }, [signOut, navigate])

  return { handleLogin, handleRegister, handleLogout, isLoading, error }
}
