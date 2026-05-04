import axios from "axios"

const API_BASE = import.meta.env.VITE_API_URL

export const api = axios.create({
  baseURL: `${API_BASE}/api/v1`,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
})

// Attach JWT on every request if present
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("lc_token")
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Global 401 handler — clear token and redirect to /login
api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      localStorage.removeItem("lc_token")
      window.location.href = "/login"
    }
    return Promise.reject(err)
  }
)
