import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "sonner"
import { queryClient } from "@/lib/queryClient"
import { AuthProvider, useAuth } from "@/context/authContext"
import { WatchlistProvider } from "@/context/watchlistContext"
import SearchPage from "@/pages/searchPage"
import LoginPage from "@/pages/loginPage"
// import WatchlistPage from "@/pages/watchlistPage"
import { ROUTES } from "@/constants/routes"

/**
 * ProtectedRoute — redirects to /login if not authenticated.
 * Falls through while auth is still loading (avoids flash).
 */
function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()
  if (loading) return null
  return isAuthenticated ? children : <Navigate to={ROUTES.LOGIN} replace />
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <WatchlistProvider>
            <Routes>
              {/* Public routes */}
              <Route path={ROUTES.LOGIN} element={<LoginPage />} />
              <Route path={ROUTES.REGISTER} element={<LoginPage />} />

              {/* Semi-protected: accessible without auth (watchlist works guest-mode via context),
                  but header shows "Sign In" if not logged in */}
              <Route path={ROUTES.SEARCH} element={<SearchPage />} />
              <Route path={ROUTES.HOME} element={<Navigate to={ROUTES.SEARCH} replace />} />

              {/* Protected routes */}
              {/* <Route
                path={ROUTES.WATCHLIST}
                element={
                  <ProtectedRoute>
                    <WatchlistPage />
                  </ProtectedRoute>
                }
              /> */}

              {/* Fallback */}
              <Route path="*" element={<Navigate to={ROUTES.SEARCH} replace />} />
            </Routes>

            <Toaster position="bottom-right" richColors closeButton />
          </WatchlistProvider>
        </AuthProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}
