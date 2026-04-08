import { useApp } from '../../context/AppContext'

const ToastContainer = () => {
  const { toasts } = useApp()
  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
      {toasts.map(t => (
        <div key={t.id} style={{
          padding: "12px 20px", borderRadius: 12, fontWeight: 500, fontSize: 14,
          background: t.type === "success" ? "#10b981" : t.type === "info" ? "#6366f1" : "#ef4444",
          color: "#fff", boxShadow: "0 8px 32px rgba(0,0,0,0.18)", animation: "slideIn 0.3s ease",
          display: "flex", alignItems: "center", gap: 8, minWidth: 200
        }}>
          <span>{t.type === "success" ? "✓" : "ℹ"}</span> {t.msg}
        </div>
      ))}
    </div>
  )
}

export default ToastContainer