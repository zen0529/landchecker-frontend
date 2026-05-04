import { api } from "@/api/axiosInstance"

/**
 * POST /auth/register
 * body: { user: { first_name, last_name, email, password, password_confirmation } }
 */
export const register = async (data) => {
  const res = await api.post("/auth/register", { user: data })
  return res.data
}

/**
 * POST /auth/login
 * body: { user: { email, password } }
 */
export const login = async (data) => {
  const res = await api.post("/auth/login", { user: data })
  return res.data
}

/**
 * DELETE /auth/logout
 */
export const logout = async () => {
  const res = await api.delete("/auth/logout")
  return res.data
}

/**
 * GET /auth/me — returns current user from token
 */
export const getMe = async () => {
  const res = await api.get("/auth/me")
  return res.data
}
