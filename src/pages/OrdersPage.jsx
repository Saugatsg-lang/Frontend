import { useState } from 'react'
import { useApp } from '../context/AppContext'
import Icon from '../components/common/Icon'

const OrdersPage = ({ navigate }) => {
  const { orders, user } = useApp()
  const [selected, setSelected] = useState(null)

  const statuses = { processing: 1, confirmed: 2, shipped: 3, "out-for-delivery": 4, delivered: 5 }
  const steps = ["Order Placed", "Confirmed", "Shipped", "Out for Delivery", "Delivered"]

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "32px 20px" }}>
      <h1 style={{ fontSize: 28, fontWeight: 900, color: "var(--text)", marginBottom: 28 }}>My Orders</h1>
      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: 60 }}>
          <div style={{ fontSize: 64 }}>📦</div>
          <h3 style={{ color: "var(--text)", marginTop: 16 }}>No Orders Yet</h3>
          <button onClick={() => navigate("/products")} style={{ marginTop: 16, padding: "12px 24px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700 }}>Start Shopping</button>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {orders.map(order => (
            <div key={order.id} style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                <div>
                  <div style={{ fontWeight: 800, color: "var(--text)", fontSize: 15 }}>Order {order.id}</div>
                  <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>Placed on {order.date}</div>
                </div>
                <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, background: order.status === "delivered" ? "#dcfce7" : "#fef3c7", color: order.status === "delivered" ? "#16a34a" : "#d97706", textTransform: "capitalize" }}>{order.status}</span>
                  <span style={{ fontWeight: 800, color: "var(--text)" }}>Rs. {order.total.toFixed ? order.total.toFixed(2) : order.total}</span>
                  <button onClick={() => setSelected(selected === order.id ? null : order.id)} style={{ background: "none", border: "1.5px solid var(--border)", borderRadius: 8, padding: "6px 14px", cursor: "pointer", color: "var(--text)", fontSize: 12, fontWeight: 600 }}>
                    {selected === order.id ? "Hide" : "Track"} Order
                  </button>
                </div>
              </div>
              {selected === order.id && (
                <div style={{ padding: "0 20px 20px", borderTop: "1px solid var(--border)" }}>
                  {/* Timeline */}
                  <div style={{ marginTop: 20, marginBottom: 24 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
                      <div style={{ position: "absolute", top: 16, left: "10%", right: "10%", height: 3, background: "var(--border)", zIndex: 0 }}>
                        <div style={{ height: "100%", background: "#6366f1", width: `${((statuses[order.status] || 1) - 1) / 4 * 100}%`, transition: "width 0.5s ease" }} />
                      </div>
                      {steps.map((step, i) => {
                        const done = i < (statuses[order.status] || 1)
                        const current = i === (statuses[order.status] || 1) - 1
                        return (
                          <div key={step} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, zIndex: 1, flex: 1 }}>
                            <div style={{ width: 32, height: 32, borderRadius: "50%", background: done ? "#6366f1" : "var(--card-bg)", border: `3px solid ${done ? "#6366f1" : "var(--border)"}`, display: "flex", alignItems: "center", justifyContent: "center", boxShadow: current ? "0 0 0 4px rgba(99,102,241,0.2)" : "none" }}>
                              {done && <Icon name="check" size={14} color="#fff" />}
                            </div>
                            <span style={{ fontSize: 10, color: done ? "#6366f1" : "var(--text-muted)", fontWeight: done ? 700 : 400, textAlign: "center" }}>{step}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  {/* Items */}
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {(order.items || []).map((item, i) => (
                      <div key={i} style={{ display: "flex", gap: 10, background: "var(--hover-bg)", borderRadius: 10, padding: 10, alignItems: "center" }}>
                        <img src={item.image} alt="" style={{ width: 44, height: 44, borderRadius: 6, objectFit: "cover" }} />
                        <div style={{ fontSize: 13, color: "var(--text)", fontWeight: 600 }}>{item.name}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default OrdersPage