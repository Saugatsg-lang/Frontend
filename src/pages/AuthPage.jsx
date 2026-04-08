import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Icon from '../components/common/Icon'

const AuthPage = ({ type, navigate }) => {
  const { setUser, addToast } = useApp()
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" })
  const [errors, setErrors] = useState({})
  const isLogin = type === "signin"

  const validate = () => {
    const e = {}
    if (!isLogin && !form.name) e.name = "Name is required"
    if (!form.email.includes("@")) e.email = "Valid email required"
    if (form.password.length < 6) e.password = "Min 6 characters"
    if (!isLogin && form.password !== form.confirm) e.confirm = "Passwords don't match"
    return e
  }

  const submit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setUser({ name: form.name || "Demo User", email: form.email })
    addToast(`Welcome${isLogin ? " back" : ""}! 👋`)
    navigate("/")
  }

  const Field = ({ field, label, type = "text", placeholder }) => (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>{label}</label>
      <input type={type} value={form[field]} onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))} placeholder={placeholder} style={{ width: "100%", padding: "12px 16px", borderRadius: 10, border: `1.5px solid ${errors[field] ? "#ef4444" : "var(--border)"}`, background: "var(--input-bg)", color: "var(--text)", fontSize: 14, boxSizing: "border-box", outline: "none" }} />
      {errors[field] && <div style={{ color: "#ef4444", fontSize: 11, marginTop: 4 }}>{errors[field]}</div>}
    </div>
  )

  return (
    <div style={{ minHeight: "70vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 20px" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Icon name="user" size={26} color="#fff" />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: "var(--text)", marginBottom: 6 }}>{isLogin ? "Welcome Back" : "Create Account"}</h1>
          <p style={{ color: "var(--text-muted)", fontSize: 14 }}>{isLogin ? "Sign in to your SmartShop account" : "Join SmartShop for exclusive benefits"}</p>
        </div>
        <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 20, padding: 28, boxShadow: "0 8px 40px rgba(0,0,0,0.08)" }}>
          {!isLogin && <Field field="name" label="Full Name" placeholder="John Doe" />}
          <Field field="email" label="Email Address" type="email" placeholder="john@example.com" />
          <Field field="password" label="Password" type="password" placeholder="••••••••" />
          {!isLogin && <Field field="confirm" label="Confirm Password" type="password" placeholder="••••••••" />}
          <button onClick={submit} style={{ width: "100%", padding: "14px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 800, fontSize: 16, marginTop: 4 }}>
            {isLogin ? "Sign In" : "Create Account"}
          </button>
          {/* Demo login */}
          <button onClick={() => { setUser({ name: "Demo User", email: "demo@smartshop.com" }); addToast("Logged in as Demo User 👋"); navigate("/") }} style={{ width: "100%", padding: "12px", background: "var(--hover-bg)", border: "1.5px solid var(--border)", borderRadius: 10, cursor: "pointer", fontWeight: 600, color: "var(--text)", fontSize: 14, marginTop: 10 }}>
            Continue as Demo User
          </button>
          <div style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: "var(--text-muted)" }}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span onClick={() => navigate(isLogin ? "/signup" : "/signin")} style={{ color: "#6366f1", cursor: "pointer", fontWeight: 700 }}>{isLogin ? "Sign Up" : "Sign In"}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AuthPage