import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Icon from '../components/common/Icon'

const CartPage = ({ navigate }) => {
  const { cart, removeFromCart, updateQty, cartTotal, COUPONS, addToast } = useApp()
  const [coupon, setCoupon] = useState("")
  const [discount, setDiscount] = useState(0)
  const tax = cartTotal * 0.08
  const shipping = cartTotal > 100 ? 0 : 9.99
  const total = cartTotal - (cartTotal * discount / 100) + tax + shipping

  const applyCoupon = () => {
    const d = COUPONS[coupon.toUpperCase()]
    if (d) { setDiscount(d); addToast(`Coupon applied! ${d}% off 🎉`) }
    else addToast("Invalid coupon code", "error")
  }

  if (cart.length === 0) return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <div style={{ fontSize: 72, marginBottom: 20 }}>🛒</div>
      <h2 style={{ color: "var(--text)", fontSize: 26, fontWeight: 900 }}>Your Cart is Empty</h2>
      <p style={{ color: "var(--text-muted)", marginTop: 8, marginBottom: 24 }}>Looks like you haven't added anything yet.</p>
      <button onClick={() => navigate("/products")} style={{ padding: "14px 32px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: 50, cursor: "pointer", fontWeight: 700, fontSize: 15 }}>Start Shopping</button>
    </div>
  )

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 20px" }}>
      <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, color: "var(--text)", marginBottom: 28 }}>Shopping Cart ({cart.reduce((s,i) => s+i.qty, 0)} items)</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr min(360px, 100%)", gap: 28 }} className="cart-layout">
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {cart.map(item => (
            <div key={`${item.id}-${item.size}-${item.color}`} style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 14, padding: 16, display: "flex", gap: 14, alignItems: "center" }}>
              <img src={item.image} alt={item.name} style={{ width: 90, height: 90, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, color: "var(--text)", fontSize: 15, marginBottom: 2 }}>{item.name}</div>
                <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>{item.size} · {item.color}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", border: "1px solid var(--border)", borderRadius: 8 }}>
                    <button onClick={() => updateQty(`${item.id}-${item.size}-${item.color}`, item.qty - 1)} style={{ width: 32, height: 32, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="minus" size={14} color="var(--text)" />
                    </button>
                    <span style={{ width: 36, textAlign: "center", fontWeight: 700, color: "var(--text)", fontSize: 14 }}>{item.qty}</span>
                    <button onClick={() => updateQty(`${item.id}-${item.size}-${item.color}`, item.qty + 1)} style={{ width: 32, height: 32, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Icon name="plus" size={14} color="var(--text)" />
                    </button>
                  </div>
                  <span style={{ fontWeight: 800, color: "var(--text)", fontSize: 16 }}>Rs. {(item.price * item.qty).toFixed(2)}</span>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.id)} style={{ background: "none", border: "none", cursor: "pointer", padding: 6, color: "#ef4444", flexShrink: 0 }}>
                <Icon name="trash" size={18} color="#ef4444" />
              </button>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, height: "fit-content", position: "sticky", top: 80 }}>
          <div style={{ fontWeight: 800, fontSize: 18, color: "var(--text)", marginBottom: 20 }}>Order Summary</div>
          {[
            ["Subtotal", `Rs. ${cartTotal.toFixed(2)}`], 
            ["Shipping", shipping === 0 ? "FREE" : `Rs. ${shipping.toFixed(2)}`], 
            ["Tax (8%)", `Rs. ${tax.toFixed(2)}`], 
            discount > 0 ? [`Discount (${discount}%)`, `- Rs. ${(cartTotal * discount / 100).toFixed(2)}`] : null
          ].filter(Boolean).map(([l, v]) => (
            <div key={l} style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 14, color: l === "Shipping" && shipping === 0 ? "#10b981" : "var(--text-muted)" }}>
              <span>{l}</span>
              <span style={{ fontWeight: 600, color: l.includes("Discount") ? "#10b981" : "var(--text)" }}>{v}</span>
            </div>
          ))}
          <div style={{ borderTop: "1.5px solid var(--border)", marginTop: 12, paddingTop: 16, display: "flex", justifyContent: "space-between", fontWeight: 900, fontSize: 19, color: "var(--text)", marginBottom: 20 }}>
            <span>Total</span>
            <span>Rs. {total.toFixed(2)}</span>
          </div>

          {/* Coupon */}
          <div style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", gap: 8 }}>
              <input value={coupon} onChange={e => setCoupon(e.target.value)} placeholder="Coupon code" style={{ flex: 1, padding: "9px 12px", borderRadius: 8, border: "1.5px solid var(--border)", background: "var(--input-bg)", color: "var(--text)", fontSize: 13 }} />
              <button onClick={applyCoupon} style={{ padding: "9px 14px", background: "var(--hover-bg)", border: "1.5px solid var(--border)", borderRadius: 8, cursor: "pointer", fontWeight: 600, color: "var(--text)", fontSize: 13 }}>Apply</button>
            </div>
            <div style={{ marginTop: 8, fontSize: 11, color: "var(--text-muted)" }}>Try: SAVE10, SAVE20, SMARTSHOP, WELCOME</div>
          </div>

          <button onClick={() => navigate("/checkout")} style={{ width: "100%", padding: "15px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: 12, cursor: "pointer", fontWeight: 800, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
            Proceed to Checkout <Icon name="arrowRight" size={18} color="#fff" />
          </button>
          <button onClick={() => navigate("/products")} style={{ width: "100%", padding: "12px", background: "none", border: "none", cursor: "pointer", color: "#6366f1", fontWeight: 600, fontSize: 14, marginTop: 8 }}>← Continue Shopping</button>
        </div>
      </div>
    </div>
  )
}

export default CartPage