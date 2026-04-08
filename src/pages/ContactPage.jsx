import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Icon from '../components/common/Icon'

const ContactPage = () => {
  const { addToast } = useApp()
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" })

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 20px" }}>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <div style={{ color: "#6366f1", fontWeight: 700, fontSize: 13, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>Get In Touch</div>
        <h1 style={{ fontSize: "clamp(24px, 4vw, 40px)", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.5px" }}>Contact Us</h1>
        <p style={{ color: "var(--text-muted)", marginTop: 8, fontSize: 15, maxWidth: 480, margin: "8px auto 0" }}>Have a question or need help? We're here for you 24/7.</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 32 }}>
        <div>
          <h2 style={{ fontWeight: 800, color: "var(--text)", marginBottom: 24, fontSize: 20 }}>Send Us a Message</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {[["name", "Full Name", "text", "John Doe"], ["email", "Email Address", "email", "john@example.com"], ["subject", "Subject", "text", "Order issue, Product question..."]].map(([k, l, t, ph]) => (
              <div key={k}>
                <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>{l}</label>
                <input type={t} value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} placeholder={ph} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid var(--border)", background: "var(--input-bg)", color: "var(--text)", fontSize: 14, boxSizing: "border-box" }} />
              </div>
            ))}
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>Message</label>
              <textarea value={form.message} onChange={e => setForm(f => ({ ...f, message: e.target.value }))} placeholder="Tell us how we can help you..." rows={5} style={{ width: "100%", padding: "11px 14px", borderRadius: 10, border: "1.5px solid var(--border)", background: "var(--input-bg)", color: "var(--text)", fontSize: 14, boxSizing: "border-box", resize: "vertical" }} />
            </div>
            <button onClick={() => { if (form.name && form.email && form.message) { addToast("Message sent! We'll respond within 24 hours. 📧"); setForm({ name:"", email:"", subject:"", message:"" }) } else addToast("Please fill all fields", "error") }} style={{ padding: "14px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 800, fontSize: 15 }}>
              Send Message
            </button>
          </div>
        </div>

        <div>
          <h2 style={{ fontWeight: 800, color: "var(--text)", marginBottom: 24, fontSize: 20 }}>Get In Touch</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 28 }}>
            {[["📍", "Our Location", "123 Fashion Ave, Kathmandu,Thamel Nepal"], ["📧", "Email Us", "khadkadevi24@gmail.com"], ["📞", "Call Us", "+977 (986695432) SMART-SHOP"], ["🕒", "Business Hours", "Mon–Fri: 9AM–8PM EST"]].map(([icon, label, val]) => (
              <div key={label} style={{ display: "flex", gap: 14, background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 12, padding: 16 }}>
                <div style={{ fontSize: 22, flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 700, color: "var(--text)", fontSize: 14 }}>{label}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 2 }}>{val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div style={{ borderRadius: 16, overflow: "hidden", height: 200, background: "linear-gradient(135deg, #f0f0ff, #e0e8ff)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", border: "1.5px solid var(--border)" }}>
            <Icon name="mapPin" size={40} color="#6366f1" />
            <div style={{ fontWeight: 700, color: "#6366f1", marginTop: 8 }}>Kathmandu Thamel, Nepal</div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 4 }}>123 Fashion Avenue</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage