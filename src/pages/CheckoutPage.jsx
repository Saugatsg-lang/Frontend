import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Icon from '../components/common/Icon'

const CheckoutPage = ({ navigate }) => {
  const { cart, cartTotal, addToast, setOrders, orders } = useApp()
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", zip: "", country: "", card: "", expiry: "", cvv: "" })
  const [step, setStep] = useState(1)

  const handleOrder = () => {
    const newOrder = { id: `SS-${Date.now()}`, date: new Date().toISOString().split("T")[0], status: "processing", total: cartTotal, items: cart }
    setOrders(o => [...o, newOrder])
    addToast("Order placed successfully! 🎉")
    navigate("/orders")
  }

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 900, color: "var(--text)", marginBottom: 28 }}>Checkout</h1>

      {/* Steps */}
      <div style={{ display: "flex", gap: 0, marginBottom: 32 }}>
        {["Shipping", "Payment", "Review"].map((s, i) => (
          <div key={s} style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div style={{ width: 32, height: 32, borderRadius: "50%", background: step > i ? "#6366f1" : step === i+1 ? "#6366f1" : "var(--hover-bg)", color: step > i || step === i+1 ? "#fff" : "var(--text-muted)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13 }}>{step > i+1 ? "✓" : i+1}</div>
              <span style={{ fontSize: 11, color: step === i+1 ? "#6366f1" : "var(--text-muted)", fontWeight: 600 }}>{s}</span>
            </div>
            {i < 2 && <div style={{ flex: 1, height: 2, background: step > i+1 ? "#6366f1" : "var(--border)", margin: "0 4px", marginBottom: 18 }} />}
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr min(320px, 100%)", gap: 28 }} className="checkout-layout">
        <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 16, padding: 24 }}>
          {step === 1 && (
            <div>
              <h2 style={{ fontWeight: 800, color: "var(--text)", marginBottom: 20, fontSize: 18 }}>Shipping Details</h2>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {[["name","Full Name","John Doe"], ["email","Email","john@example.com"], ["phone","Phone","+1 234 567 890"], ["address","Address","123 Main Street"]].map(([k,l,ph]) => (
                  <div key={k} style={{ gridColumn: k === "address" ? "1 / -1" : "auto" }}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>{l}</label>
                    <input value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} placeholder={ph} style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1.5px solid var(--border)", background: "var(--input-bg)", color: "var(--text)", fontSize: 14, boxSizing: "border-box" }} />
                  </div>
                ))}
                {[["city","City","New York"], ["zip","ZIP Code","10001"], ["country","Country","United States"]].map(([k,l,ph]) => (
                  <div key={k}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>{l}</label>
                    <input value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} placeholder={ph} style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1.5px solid var(--border)", background: "var(--input-bg)", color: "var(--text)", fontSize: 14, boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
              <button onClick={() => setStep(2)} style={{ marginTop: 20, width: "100%", padding: "14px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 800, fontSize: 15 }}>Continue to Payment →</button>
            </div>
          )}
          {step === 2 && (
            <div>
              <h2 style={{ fontWeight: 800, color: "var(--text)", marginBottom: 20, fontSize: 18 }}>Payment Details</h2>
              <div style={{ display: "flex", gap: 12, marginBottom: 20 }}>
                {["💳 Card", "🏦 Bank", "📱 UPI"].map(m => (
                  <button key={m} style={{ flex: 1, padding: "10px", border: m === "💳 Card" ? "2px solid #6366f1" : "1.5px solid var(--border)", borderRadius: 8, background: m === "💳 Card" ? "rgba(99,102,241,0.08)" : "var(--card-bg)", cursor: "pointer", fontWeight: 600, fontSize: 13, color: "var(--text)" }}>{m}</button>
                ))}
              </div>
              <div style={{ display: "grid", gap: 14 }}>
                {[["card","Card Number","1234 5678 9012 3456"], ["expiry","Expiry Date","MM/YY"], ["cvv","CVV","123"]].map(([k,l,ph]) => (
                  <div key={k}>
                    <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "var(--text-muted)", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.5px" }}>{l}</label>
                    <input value={form[k]} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} placeholder={ph} style={{ width: "100%", padding: "11px 14px", borderRadius: 8, border: "1.5px solid var(--border)", background: "var(--input-bg)", color: "var(--text)", fontSize: 14, boxSizing: "border-box" }} />
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                <button onClick={() => setStep(1)} style={{ flex: 1, padding: "14px", background: "var(--hover-bg)", border: "1.5px solid var(--border)", borderRadius: 10, cursor: "pointer", fontWeight: 700, color: "var(--text)", fontSize: 14 }}>← Back</button>
                <button onClick={() => setStep(3)} style={{ flex: 2, padding: "14px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 800, fontSize: 15 }}>Review Order →</button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div>
              <h2 style={{ fontWeight: 800, color: "var(--text)", marginBottom: 20, fontSize: 18 }}>Review Your Order</h2>
              {cart.map(item => (
                <div key={item.id} style={{ display: "flex", gap: 12, marginBottom: 12, alignItems: "center" }}>
                  <img src={item.image} alt="" style={{ width: 54, height: 54, borderRadius: 8, objectFit: "cover" }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 600, color: "var(--text)", fontSize: 14 }}>{item.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Qty: {item.qty} · {item.size}</div>
                  </div>
                  <div style={{ fontWeight: 700, color: "var(--text)" }}>Rs. {(item.price * item.qty).toFixed(2)}</div>
                </div>
              ))}
              <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
                <button onClick={() => setStep(2)} style={{ flex: 1, padding: "14px", background: "var(--hover-bg)", border: "1.5px solid var(--border)", borderRadius: 10, cursor: "pointer", fontWeight: 700, color: "var(--text)", fontSize: 14 }}>← Back</button>
                <button onClick={handleOrder} style={{ flex: 2, padding: "14px", background: "linear-gradient(135deg, #10b981, #059669)", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 800, fontSize: 15 }}>Place Order ✓</button>
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 16, padding: 20, height: "fit-content" }}>
          <div style={{ fontWeight: 800, color: "var(--text)", marginBottom: 16, fontSize: 16 }}>Summary</div>
          {cart.map(i => (
            <div key={i.id} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 13, color: "var(--text-muted)" }}>
              <span>{i.name} x{i.qty}</span>
              <span style={{ color: "var(--text)", fontWeight: 600 }}>Rs. {(i.price * i.qty).toFixed(2)}</span>
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--border)", marginTop: 12, paddingTop: 12, display: "flex", justifyContent: "space-between", fontWeight: 900, color: "var(--text)", fontSize: 17 }}>
            <span>Total</span>
            <span>Rs. {cartTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage