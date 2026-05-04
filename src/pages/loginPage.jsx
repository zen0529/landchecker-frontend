import { Navigate, useLocation, useNavigate } from "react-router-dom"
import LoginForm from "@/features/auth/components/LoginForm"
import RegisterForm from "@/features/auth/components/RegisterForm"
import { useAuth } from "@/context/authContext"
import { ROUTES } from "@/constants/routes"

export default function LoginPage() {
  const { isAuthenticated, loading } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const mode = location.pathname === ROUTES.REGISTER ? "register" : "login"

  if (loading) return null
  if (isAuthenticated) return <Navigate to={ROUTES.SEARCH} replace />

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans items-center justify-center p-4">
      <div className="w-full max-w-[420px]">
        {/* Logo */}
        <div className="mb-6 text-center">
          <span className="text-2xl font-extrabold tracking-tight text-slate-900">
            Land<span className="text-brand">checker</span>
          </span>
          <p className="mt-1 text-[13px] font-medium text-slate-500">
            Australia's smartest property search platform.
          </p>
        </div>

        {/* Tab switcher */}
        <div className="mb-5 flex rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
          <button
            id="tab-login"
            onClick={() => navigate(ROUTES.LOGIN)}
            className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-all ${
              mode === "login"
                ? "bg-brand text-slate shadow-md shadow-brand/20"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Sign In
          </button>
          <button
            id="tab-register"
            onClick={() => navigate(ROUTES.REGISTER)}
            className={`flex-1 rounded-xl py-2 text-sm font-semibold transition-all ${
              mode === "register"
                ? "bg-brand text-slate shadow-md shadow-brand/20"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-premium">
          <div className="mb-4">
            <h3 className="text-[15px] font-bold tracking-tight text-slate-900" style={{ margin: 0 }}>
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h3>
            <p className="mt-1 text-[12px] text-slate-500">
              {mode === "login"
                ? "Sign in to access your saved properties."
                : "Join thousands of Australians finding their ideal property."}
            </p>
          </div>

          {mode === "login" ? <LoginForm /> : <RegisterForm />}
        </div>

        {/* <p className="mt-8 text-center text-[12px] text-slate-400">
          By continuing, you agree to our{" "}
          <span className="cursor-pointer font-medium text-slate-500 hover:text-slate-700">Terms of Service</span>{" "}
          and{" "}
          <span className="cursor-pointer font-medium text-slate-500 hover:text-slate-700">Privacy Policy</span>.
        </p> */}
      </div>
    </div>
  )
}
