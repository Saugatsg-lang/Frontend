import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import Icon from '../common/Icon'

const Footer = ({ navigate }) => {
  const [email, setEmail] = useState("")
  const { addToast } = useApp()

  // Social media handlers
  const openInstagram = () => {
    window.open('https://www.instagram.com/devi_khadka7/', '_blank')
  }

  const openWhatsApp = () => {
    window.open('https://wa.me/9841016421?text=Hello%20SmartShop%2C%20I%20need%20help%20with%20my%20order', '_blank')
  }

  return (
    <footer style={{ background: "var(--footer-bg)", borderTop: "1px solid var(--border)", marginTop: 80 }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "60px 20px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ fontWeight: 800, fontSize: 22, color: "var(--text)", marginBottom: 12 }}>Smart<span style={{ color: "#6366f1" }}>Shop</span></div>
            <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 16 }}>Your premium destination for fashion, accessories, and lifestyle products.</p>
            <div style={{ display: "flex", gap: 10 }}>
              {/* Instagram Icon */}
              <div 
                onClick={openInstagram}
                style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: "50%", 
                  background: "linear-gradient(135deg, #833AB4, #E4405F, #F77737, #FCAF45)",
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.1)"
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)"
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)"
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" stroke="#fff" strokeWidth="1.5" fill="none"/>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" stroke="#fff" strokeWidth="1.5" fill="none"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="#fff" strokeWidth="2"/>
                </svg>
              </div>

              {/* WhatsApp Icon */}
              <div 
                onClick={openWhatsApp}
                style={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: "50%", 
                  background: "#25D366",
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  cursor: "pointer",
                  transition: "all 0.3s ease",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = "scale(1.1)"
                  e.currentTarget.style.boxShadow = "0 4px 12px rgba(37,211,102,0.4)"
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = "scale(1)"
                  e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.1)"
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12.032 2.00195C6.648 1.99495 2.235 6.27695 2.106 11.6599C2.068 13.4149 2.545 15.1399 3.476 16.6359L2.5 20.9999L7.016 19.5339C9.36 20.8499 12.088 21.0429 14.588 20.0599C18.179 18.6149 20.567 14.9969 20.463 11.0539C20.372 7.30495 17.632 3.66895 13.976 2.30095C13.366 2.06195 12.708 1.97195 12.032 2.00195ZM12.361 18.6539C10.291 18.7749 8.289 18.0259 6.814 16.6099L6.209 16.0169L3.919 16.7779L4.441 14.7769L3.947 14.1719C2.79 12.5609 2.419 10.5169 2.936 8.58995C3.569 6.21895 5.693 4.36395 8.175 4.12595C10.268 3.92295 12.332 4.67495 13.812 6.17595C15.384 7.76195 16.182 9.99395 15.955 12.2409C15.759 14.1929 14.332 15.7929 12.425 16.4109C12.396 16.4199 12.361 16.4399 12.333 16.4499C12.286 16.4669 12.241 16.4769 12.192 16.4869C12.178 16.4899 12.164 16.4969 12.149 16.4999C12.219 16.5629 12.289 16.6249 12.361 16.6539Z" fill="white"/>
                  <path d="M15.738 13.9079C15.458 13.7669 14.518 13.3049 14.268 13.1999C14.018 13.0949 13.838 13.0429 13.658 13.3229C13.478 13.6029 13.038 14.0259 12.888 14.1999C12.738 14.3739 12.588 14.3959 12.308 14.2549C11.506 13.8819 10.877 13.3709 10.392 12.7569C10.019 12.2919 9.745 11.7669 9.595 11.1929C9.518 10.9129 9.618 10.7649 9.746 10.6239C9.864 10.4939 10.011 10.3089 10.136 10.1469C10.261 9.98492 10.306 9.85992 10.386 9.65892C10.466 9.45792 10.426 9.28692 10.356 9.14492C10.286 9.00292 10.006 8.06492 9.892 7.72492C9.782 7.39492 9.664 7.42492 9.578 7.41992C9.493 7.41492 9.388 7.40792 9.285 7.40792C9.144 7.40792 8.927 7.45392 8.741 7.66192C8.554 7.86992 8.018 8.37392 8.018 9.38992C8.018 10.4059 8.763 11.3839 8.87 11.5259C8.977 11.6679 9.738 12.8579 10.927 13.3749C11.293 13.5259 11.766 13.7189 12.287 13.7919C12.626 13.8389 13.047 13.8219 13.404 13.6919C13.786 13.5529 14.563 13.1359 14.743 12.6649C14.923 12.1939 14.923 11.7919 14.853 11.7039C14.783 11.6159 14.613 11.5549 14.363 11.4499Z" fill="white"/>
                </svg>
              </div>
            </div>
          </div>
          {[
            { title: "Shop", links: [["/products", "All Products"], ["/products?cat=shirts", "Men's Fashion"], ["/products?cat=girls", "Women's Fashion"], ["/products?cat=bags", "Bags"], ["/products?cat=accessories", "Accessories"]] },
            { title: "Help", links: [["/contact", "Contact Us"], ["/orders", "Order Tracking"], ["/", "FAQs"], ["/", "Shipping Policy"], ["/", "Returns"]] },
            { title: "Account", links: [["/signin", "Sign In"], ["/signup", "Create Account"], ["/cart", "My Cart"], ["/wishlist", "Wishlist"], ["/orders", "Orders"]] },
          ].map(({ title, links }) => (
            <div key={title}>
              <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)", marginBottom: 14, textTransform: "uppercase", letterSpacing: "1px" }}>{title}</div>
              {links.map(([href, label]) => (
                <div key={label} onClick={() => navigate(href)} style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 8, cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = "#6366f1"}
                  onMouseLeave={e => e.target.style.color = "var(--text-muted)"}
                >{label}</div>
              ))}
            </div>
          ))}
          <div>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)", marginBottom: 14, textTransform: "uppercase", letterSpacing: "1px" }}>Newsletter</div>
            <p style={{ color: "var(--text-muted)", fontSize: 13, marginBottom: 12 }}>Subscribe for exclusive deals and new arrivals.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Your email" style={{ padding: "10px 14px", borderRadius: 8, border: "1.5px solid var(--border)", background: "var(--input-bg)", color: "var(--text)", fontSize: 13 }} />
              <button onClick={() => { if(email) { addToast("Subscribed! 🎉"); setEmail(""); } }} style={{ padding: "10px 0", borderRadius: 8, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", cursor: "pointer", fontWeight: 600, fontSize: 13 }}>Subscribe</button>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid var(--border)", paddingTop: 20, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: "var(--text-muted)", fontSize: 13 }}>© 2025 SmartShop - Devi Khadka. All rights reserved.</p>
          <div style={{ display: "flex", gap: 16 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(l => (
              <span key={l} style={{ color: "var(--text-muted)", fontSize: 13, cursor: "pointer" }}>{l}</span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer