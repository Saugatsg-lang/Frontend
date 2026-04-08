import { useState } from 'react'
import Icon from '../common/Icon'

const ChatWidget = () => {
  const [open, setOpen] = useState(false)
  const [msgs, setMsgs] = useState([{ from: "bot", text: "Hi! Welcome to SmartShop 👋 How can I help you today?" }])
  const [input, setInput] = useState("")

  const send = () => {
    if (!input.trim()) return
    setMsgs(m => [...m, { from: "user", text: input }, { from: "bot", text: "Thanks for your message! Our team will get back to you shortly. In the meantime, feel free to browse our amazing collection! 🛍️" }])
    setInput("")
  }

  return (
    <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 999 }}>
      {open && (
        <div style={{ position: "absolute", bottom: 60, right: 0, width: 300, background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 16, boxShadow: "0 8px 40px rgba(0,0,0,0.15)", overflow: "hidden" }}>
          <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>SmartShop Support</div>
              <div style={{ color: "rgba(255,255,255,0.8)", fontSize: 11 }}>🟢 Online • Usually replies instantly</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", cursor: "pointer" }}><Icon name="close" size={18} color="#fff" /></button>
          </div>
          <div style={{ height: 200, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "80%", padding: "8px 12px", borderRadius: m.from === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", background: m.from === "user" ? "#6366f1" : "var(--hover-bg)", color: m.from === "user" ? "#fff" : "var(--text)", fontSize: 13 }}>{m.text}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: "10px 12px", borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Type a message..." style={{ flex: 1, padding: "8px 10px", borderRadius: 8, border: "1px solid var(--border)", background: "var(--input-bg)", color: "var(--text)", fontSize: 13 }} />
            <button onClick={send} style={{ padding: "8px 12px", background: "#6366f1", border: "none", borderRadius: 8, cursor: "pointer", color: "#fff", fontWeight: 700, fontSize: 12 }}>Send</button>
          </div>
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} style={{ width: 50, height: 50, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 20px rgba(99,102,241,0.4)" }}>
        <Icon name={open ? "close" : "chat"} size={22} color="#fff" />
      </button>
    </div>
  )
}

export default ChatWidget