import { useState } from 'react'
import Icon from '../common/Icon'

const ManageUsers = ({ addToast }) => {
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@example.com", role: "user", orders: 5, joined: "2024-01-15" },
    { id: 2, name: "Sarah Smith", email: "sarah@example.com", role: "user", orders: 12, joined: "2024-02-20" },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", role: "admin", orders: 0, joined: "2024-03-10" },
    { id: 4, name: "Emma Wilson", email: "emma@example.com", role: "user", orders: 8, joined: "2024-04-05" },
  ])

  const handleDelete = (id) => {
    setUsers(users.filter(u => u.id !== id))
    addToast("User deleted successfully")
  }

  const handleRoleChange = (id, newRole) => {
    setUsers(users.map(u => u.id === id ? { ...u, role: newRole } : u))
    addToast(`User role updated to ${newRole}`)
  }

  return (
    <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontWeight: 700, color: "var(--text)" }}>Users ({users.length})</div>
        <button onClick={() => addToast("Add user feature (UI only)")} style={{ padding: "8px 16px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600, fontSize: 13 }}>+ Add User</button>
      </div>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: "var(--hover-bg)" }}>
              {["User", "Email", "Role", "Orders", "Joined", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.5px" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {users.map(u => (
              <tr key={u.id} style={{ borderTop: "1px solid var(--border)" }}>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14 }}>{u.name[0]}</div>
                    <div style={{ fontWeight: 600, color: "var(--text)", fontSize: 13 }}>{u.name}</div>
                  </div>
                </td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--text-muted)" }}>{u.email}</td>
                <td style={{ padding: "12px 16px" }}>
                  <select value={u.role} onChange={e => handleRoleChange(u.id, e.target.value)} style={{ padding: "4px 8px", borderRadius: 6, border: "1px solid var(--border)", background: "var(--input-bg)", color: "var(--text)", fontSize: 12, cursor: "pointer" }}>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--text-muted)" }}>{u.orders} orders</td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: "var(--text-muted)" }}>{u.joined}</td>
                <td style={{ padding: "12px 16px" }}>
                  <button onClick={() => handleDelete(u.id)} style={{ padding: "4px 10px", background: "rgba(239,68,68,0.1)", border: "none", borderRadius: 6, cursor: "pointer", color: "#ef4444", fontSize: 11, fontWeight: 600 }}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default ManageUsers