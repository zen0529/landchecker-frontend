import { useState } from "react"
import { Link } from "react-router-dom"
import { Eye, EyeOff, UserPlus, ArrowRight } from "lucide-react"
import { useAuthActions } from "../hooks/useAuth"
import { ROUTES } from "@/constants/routes"

export default function RegisterForm() {
  const { handleRegister, isLoading, error } = useAuthActions()
  const [showPass, setShowPass] = useState(false)
  const [form, setForm] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password_confirmation: "",
  })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const passMatch = form.password && form.password_confirmation && form.password !== form.password_confirmation

  const onSubmit = (e) => {
    e.preventDefault()
    if (passMatch) return
    handleRegister(form)
  }

  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-3">
      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-2 text-[13px] font-medium text-red-600">
          {error}
        </div>
      )}

      {/* Name row */}
      <div className="grid grid-cols-2 gap-3 align-center justify-center">
        <div className="flex flex-col gap-1">
          <label className="text-[12px] font-bold text-slate-700 text-start">First name</label>
          <input
            id="reg-first-name"
            type="text"
            autoComplete="given-name"
            required
            value={form.first_name}
            onChange={set("first_name")}
            placeholder="Alex"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-slate-900 transition-all focus:border-brand focus:bg-white focus:outline-none  focus:ring-brand/10"
          />
        </div>
        <div className="flex flex-col gap-1  text-start">
          <label className="text-[12px] font-bold text-slate-700">Last name</label>
          <input
            id="reg-last-name"
            type="text"
            autoComplete="family-name"
            required
            value={form.last_name}
            onChange={set("last_name")}
            placeholder="Johnson"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-slate-900 transition-all focus:border-brand focus:bg-white focus:outline-none  focus:ring-brand/10"
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-[12px] font-bold text-slate-700  text-start">Email address</label>
        <input
          id="reg-email"
          type="email"
          autoComplete="email"
          required
          value={form.email}
          onChange={set("email")}
          placeholder="you@example.com"
          className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[13px] text-slate-900 transition-all focus:border-brand focus:bg-white focus:outline-none  focus:ring-brand/10"
        />
      </div>

      {/* Password */}
      <div className="flex flex-col gap-1 ">
        <label className="text-[12px] font-bold text-slate-700  text-start">Password</label>
        <div className="relative">
          <input
            id="reg-password"
            type={showPass ? "text" : "password"}
            autoComplete="new-password"
            required
            minLength={8}
            value={form.password}
            onChange={set("password")}
            placeholder="Min. 8 characters"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 pr-10 text-[13px] text-slate-900 transition-all focus:border-brand focus:bg-white focus:outline-none  focus:ring-brand/10"
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

      {/* Confirm Password */}
      <div className="flex flex-col gap-1">
        <label className="text-[12px] font-bold text-slate-700  text-start">Confirm password</label>
        <input
          id="reg-password-confirm"
          type={showPass ? "text" : "password"}
          autoComplete="new-password"
          required
          value={form.password_confirmation}
          onChange={set("password_confirmation")}
          placeholder="Repeat password"
          className={`w-full rounded-xl border bg-slate-50 px-3 py-2 text-[13px] text-slate-900 transition-all focus:outline-none  ${
            passMatch
              ? "border-red-300 focus:border-red-400 focus:ring-red-100"
              : "border-slate-200 focus:border-brand focus:ring-brand/10"
          }`}
        />
        {passMatch && (
          <p className="text-[11px] font-medium text-red-500">Passwords do not match.</p>
        )}
      </div>

      {/* Submit */}
      <button
        id="reg-submit"
        type="submit"
        disabled={isLoading || !!passMatch}
        className="group relative mt-1 flex items-center justify-center gap-2 rounded-xl bg-brand px-6 py-2.5 text-[14px] font-bold text-slate-500 shadow-lg shadow-brand/25 transition-all hover:bg-brand-dark hover:shadow-xl hover:shadow-brand/30 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Creating account…
          </span>
        ) : (
          <div className="flex items-center gap-2">
            <UserPlus size={15} />
            Create Account
            <ArrowRight size={13} className="ml-auto opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
          </div>
        )}
      </button>

      <p className="text-center text-[12px] text-slate-500">
        Already have an account?{" "}
        <Link to={ROUTES.LOGIN} className="font-semibold text-brand hover:text-brand-dark transition-colors">
          Sign in
        </Link>
      </p>
    </form>
  )
}
