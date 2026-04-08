import { useState } from 'react'
import Stars from '../common/Stars'

const ManageProducts = ({ products, setProducts, addToast }) => {
  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id))
    addToast("Product deleted")
  }

  return (
    <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700, color: "var(--text)" }}>Products ({products.length})</div>
        <button onClick={() => addToast("Add product feature (UI only)")} style={{ padding: "8px 16px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>+ Add Product</button>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--hover-bg)" }}>
              {["Product", "Category", "Price", "Stock", "Rating", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.slice(0, 12).map(p => (
              <tr key={p.id} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img src={p.image} alt="" style={{ width: 40, height: 40, borderRadius: 8, objectFit: "cover" }} />
                    <div style={{ fontWeight: 600, color: "var(--text)", fontSize: 13 }}>{p.name}</div>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--text-muted)", textTransform: "capitalize" }}>{p.category}</td>
                <td style={{ padding: "12px 16px", fontWeight: 700, color: "var(--text)", fontSize: 13 }}>${p.price}</td>
                <td style={{ padding: "12px 16px" }}><span style={{ fontSize: 12, fontWeight: 600, color: p.stock <= 10 ? "#ef4444" : "#10b981" }}>{p.stock}</span></td>
                <td style={{ padding: "12px 16px" }}><Stars rating={p.rating} size={12} /></td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button onClick={() => addToast("Edit product (UI only)")} style={{ padding: "4px 10px", background: "rgba(99,102,241,0.1)", border: "none", borderRadius: 6, cursor: "pointer", color: "#6366f1", fontSize: 11, fontWeight: 600 }}>Edit</button>
                    <button onClick={() => handleDelete(p.id)} style={{ padding: "4px 10px", background: "rgba(239,68,68,0.1)", border: "none", borderRadius: 6, cursor: "pointer", color: "#ef4444", fontSize: 11, fontWeight: 600 }}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageProducts