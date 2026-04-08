import { useState } from 'react'

const ManageOrders = ({ addToast }) => {
  const [orders, setOrders] = useState([
    { id: "SS-2024-001", customer: "John Doe", total: 234, status: "delivered", items: 3, date: "2024-12-01" },
    { id: "SS-2024-002", customer: "Sarah M.", total: 145, status: "shipped", items: 1, date: "2024-12-05" },
    { id: "SS-2024-003", customer: "James K.", total: 89, status: "processing", items: 2, date: "2024-12-07" },
    { id: "SS-2024-004", customer: "Emily R.", total: 312, status: "pending", items: 4, date: "2024-12-08" },
  ])

  const statusOptions = ["pending", "processing", "confirmed", "shipped", "out-for-delivery", "delivered"]

  const handleStatusChange = (id, newStatus) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus } : o))
    addToast(`Order ${id} status updated to ${newStatus}`)
  }

  const getStatusColor = (status) => {
    const colors = {
      pending: "#f59e0b",
      processing: "#3b82f6",
      confirmed: "#8b5cf6",
      shipped: "#10b981",
      "out-for-delivery": "#f97316",
      delivered: "#22c55e"
    }
    return colors[status] || "#6b7280"
  }

  return (
    <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", fontWeight: 700, color: "var(--text)" }}>All Orders ({orders.length})</div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--hover-bg)" }}>
              {["Order ID", "Customer", "Date", "Items", "Total", "Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ padding: "12px 16px", fontWeight: 600, color: "var(--text)", fontSize: 13 }}>{o.id}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--text-muted)" }}>{o.customer}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--text-muted)" }}>{o.date}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--text-muted)" }}>{o.items} items</td>
                <td style={{ padding: "12px 16px", fontWeight: 700, color: "var(--text)", fontSize: 13 }}>${o.total}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, background: `${getStatusColor(o.status)}20`, color: getStatusColor(o.status), textTransform: "capitalize" }}>
                    {o.status}
                  </span>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <select value={o.status} onChange={e => handleStatusChange(o.id, e.target.value)} style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--input-bg)", color: "var(--text)", fontSize: 12, cursor: "pointer" }}>
                    {statusOptions.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageOrders