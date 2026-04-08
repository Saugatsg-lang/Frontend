import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import Icon from '../common/Icon'

const Navbar = ({ navigate, path }) => {
  const { cartCount, wishlist, darkMode, setDarkMode, user, setUser, PRODUCTS } = useApp()
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchQ, setSearchQ] = useState("")
  const [profileOpen, setProfileOpen] = useState(false)

  const searchResults = searchQ.length > 1 ? PRODUCTS.filter(p => p.name.toLowerCase().includes(searchQ.toLowerCase())).slice(0, 5) : []

  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 1000, background: "var(--navbar-bg)", backdropFilter: "blur(20px)", borderBottom: "1px solid var(--border)", WebkitBackdropFilter: "blur(20px)" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", height: 64, gap: 16 }}>
        {/* Logo */}
        <div onClick={() => navigate("/")} style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name="package" size={18} color="#fff" />
          </div>
          <span style={{ fontWeight: 800, fontSize: 20, color: "var(--text)", letterSpacing: "-0.5px" }}>Smart<span style={{ color: "#6366f1" }}>Shop</span></span>
        </div>

        {/* Desktop Nav Links */}
        <div style={{ display: "flex", gap: 4, marginLeft: 16, flex: 1 }} className="desktop-nav">
          {[["/", "Home"], ["/products", "Products"], ["/products?cat=shirts", "Men"], ["/products?cat=girls", "Women"], ["/products?cat=bags", "Bags"]].map(([href, label]) => (
            <button key={href} onClick={() => navigate(href)} style={{ background: "none", border: "none", padding: "6px 12px", borderRadius: 8, cursor: "pointer", fontWeight: 500, fontSize: 14, color: "var(--text)", transition: "all 0.2s" }}
              onMouseEnter={e => e.target.style.background = "var(--hover-bg)"}
              onMouseLeave={e => e.target.style.background = "none"}
            >{label}</button>
          ))}
        </div>

        {/* Search Bar */}
        <div style={{ position: "relative", flex: 1, maxWidth: 280 }} className="desktop-search">
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--input-bg)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "7px 12px" }}>
            <Icon name="search" size={16} color="var(--text-muted)" />
            <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search products..." style={{ border: "none", background: "transparent", outline: "none", color: "var(--text)", fontSize: 14, width: "100%" }} />
          </div>
          {searchResults.length > 0 && (
            <div style={{ position: "absolute", top: "110%", left: 0, right: 0, background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.15)", zIndex: 100, overflow: "hidden" }}>
              {searchResults.map(p => (
                <div key={p.id} onClick={() => { navigate(`/product/${p.id}`); setSearchQ(""); }} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", cursor: "pointer", transition: "background 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--hover-bg)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                >
                  <img src={p.image} alt={p.name} style={{ width: 36, height: 36, borderRadius: 6, objectFit: "cover" }} />
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 13, color: "var(--text)" }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "#6366f1", fontWeight: 600 }}>Rs. {p.price}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Icons */}
        <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <button onClick={() => setDarkMode(d => !d)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, borderRadius: 8, color: "var(--text)", display: "flex", alignItems: "center" }}>
            <Icon name={darkMode ? "sun" : "moon"} size={18} color="var(--text)" />
          </button>
          <button onClick={() => navigate("/wishlist")} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, borderRadius: 8, display: "flex", position: "relative" }}>
            <Icon name="heart" size={20} color="var(--text)" />
            {wishlist.length > 0 && <span style={{ position: "absolute", top: 2, right: 2, background: "#ef4444", color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{wishlist.length}</span>}
          </button>
          <button onClick={() => navigate("/cart")} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, borderRadius: 8, display: "flex", position: "relative" }}>
            <Icon name="cart" size={20} color="var(--text)" />
            {cartCount > 0 && <span style={{ position: "absolute", top: 2, right: 2, background: "#6366f1", color: "#fff", borderRadius: "50%", width: 16, height: 16, fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700 }}>{cartCount}</span>}
          </button>
          <div style={{ position: "relative" }}>
            <button onClick={() => setProfileOpen(p => !p)} style={{ background: "var(--hover-bg)", border: "none", cursor: "pointer", padding: 6, borderRadius: 8, display: "flex", alignItems: "center" }}>
              <Icon name="user" size={20} color="var(--text)" />
            </button>
            {profileOpen && (
              <div style={{ position: "absolute", right: 0, top: "110%", background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.15)", zIndex: 200, minWidth: 200, overflow: "hidden" }}>
                {user ? (
                  <>
                    <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
                      <div style={{ fontWeight: 600, color: "var(--text)" }}>{user.name}</div>
                      <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{user.email}</div>
                    </div>
                    {[["/orders", "My Orders", "package"], ["/admin", "Admin Dashboard", "settings"]].map(([href, label, icon]) => (
                      <div key={href} onClick={() => { navigate(href); setProfileOpen(false); }} style={{ padding: "10px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: "var(--text)", fontSize: 14 }}
                        onMouseEnter={e => e.currentTarget.style.background = "var(--hover-bg)"}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        <Icon name={icon} size={15} color="var(--text-muted)" /> {label}
                      </div>
                    ))}
                    <div onClick={() => { setUser(null); setProfileOpen(false); }} style={{ padding: "10px 16px", cursor: "pointer", display: "flex", alignItems: "center", gap: 8, color: "#ef4444", fontSize: 14, borderTop: "1px solid var(--border)" }}
                      onMouseEnter={e => e.currentTarget.style.background = "var(--hover-bg)"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                    >
                      <Icon name="logout" size={15} color="#ef4444" /> Logout
                    </div>
                  </>
                ) : (
                  <>
                    <div onClick={() => { navigate("/signin"); setProfileOpen(false); }} style={{ padding: "12px 16px", cursor: "pointer", fontWeight: 600, color: "#6366f1", fontSize: 14 }}>Sign In</div>
                    <div onClick={() => { navigate("/signup"); setProfileOpen(false); }} style={{ padding: "12px 16px", cursor: "pointer", color: "var(--text)", fontSize: 14, borderTop: "1px solid var(--border)" }}>Create Account</div>
                  </>
                )}
              </div>
            )}
          </div>
          <button onClick={() => setMenuOpen(m => !m)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8 }} className="mobile-menu-btn">
            <Icon name={menuOpen ? "close" : "menu"} size={22} color="var(--text)" />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ background: "var(--navbar-bg)", borderTop: "1px solid var(--border)", padding: "12px 20px 20px" }}>
          <div style={{ marginBottom: 12 }}>
            <input value={searchQ} onChange={e => setSearchQ(e.target.value)} placeholder="Search products..." style={{ width: "100%", padding: "10px 14px", borderRadius: 10, border: "1.5px solid var(--border)", background: "var(--input-bg)", color: "var(--text)", fontSize: 14, boxSizing: "border-box" }} />
          </div>
          {[["/", "Home"], ["/products", "Products"], ["/cart", "Cart"], ["/wishlist", "Wishlist"], ["/orders", "Orders"], ["/contact", "Contact"]].map(([href, label]) => (
            <div key={href} onClick={() => { navigate(href); setMenuOpen(false); }} style={{ padding: "12px 0", borderBottom: "1px solid var(--border)", color: "var(--text)", fontWeight: 500, cursor: "pointer" }}>{label}</div>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar