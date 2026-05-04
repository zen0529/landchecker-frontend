import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, LogIn, ArrowRight } from "lucide-react"
import { useAuthActions } from "../hooks/useAuth"
import { ROUTES } from "@/constants/routes"

export default function LoginForm() {
  const { handleLogin, isLoading, error } = useAuthActions()
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({ email: "", password: "" })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    handleLogin(form)
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4">
      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-2 text-[13px] font-medium text-red-600">
          {error}
        </div>
      )}

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-[12px] font-bold text-slate-700 text-start">
          Email address
        </label>
        <input
          id="login-email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={set("email")}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-slate-900 transition-all focus:border-brand focus:bg-white focus:outline-none focus:ring-brand/10"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1 text-start">
        <div className="flex items-center justify-between">
          <label className="text-[12px] font-bold text-slate-700">
            Password
          </label>
          <button
            type="button"
            className="text-[11px] font-semibold text-brand hover:text-brand-dark transition-colors"
          >
            {/* Forgot password? */}
          </button>
        </div>
        <div className="relative">
          <input
            id="login-password"
            type={showPass ? "text" : "password"}
            autoComplete="current-password"
            required
            value={form.password}
            onChange={set("password")}
            placeholder="••••••••"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 pr-10 text-[13px] text-slate-900 transition-all focus:border-brand focus:bg-white focus:outline-none focus:ring-brand/10"
          />
          <button
            type="button"
            onClick={() => setShowPass((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
          </button>
        </div>
      </div>

      {/* Submit */}
      <button
        id="login-submit"
        type="submit"
        disabled={isLoading}
        className="group relative flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-[14px] font-bold text-slate-500 shadow-lg shadow-brand/25 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/30 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Signing in…
          </span>
        ) : (
          <>
            <div className="flex items-center gap-2">
              <LogIn size={15} />
              
              Sign In
            <ArrowRight size={13} className="ml-auto opacity-0 -translate-x-2 transi  tion-all group-hover:opacity-100 group-hover:translate-x-0" />

            </div>
          </>
        )}
      </button>

      <p className="text-center text-[12px] text-slate-500">
        Don&apos;t have an account?{" "}
        <Link to={ROUTES.REGISTER} className="font-semibold text-brand hover:text-brand-dark transition-colors">
          Create one free
        </Link>
      </p>
    </form>
  )
}
