import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import { HERO_SLIDES } from '../data'
import ProductCard from '../components/common/ProductCard'
import Icon from '../components/common/Icon'
import Stars from '../components/common/Stars'

const HomePage = ({ navigate }) => {
  const { PRODUCTS, CATEGORIES, addToast } = useApp()
  const [slide, setSlide] = useState(0)
  const [email, setEmail] = useState("")

  useEffect(() => {
    const t = setInterval(() => setSlide(s => (s + 1) % HERO_SLIDES.length), 4500)
    return () => clearInterval(t)
  }, [])

  const featured = PRODUCTS.filter(p => p.badge === "Bestseller" || p.badge === "Trending").slice(0, 8)
  const newArrivals = PRODUCTS.filter(p => p.badge === "New" || p.badge === "Hot").slice(0, 4)

  return (
    <div>
      {/* Hero Slider */}
      <div style={{ position: "relative", height: "min(580px, 80vw)", overflow: "hidden", background: "#0f0f1a" }}>
        {HERO_SLIDES.map((s, i) => (
          <div key={s.id} style={{ position: "absolute", inset: 0, transition: "opacity 0.7s ease, transform 0.7s ease", opacity: i === slide ? 1 : 0, transform: `translateX(${(i - slide) * 30}px)`, display: "flex", alignItems: "center" }}>
            <img src={s.image} alt={s.title} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.45 }} />
            <div style={{ position: "absolute", inset: 0, background: s.bg, opacity: 0.55 }} />
            <div style={{ position: "relative", zIndex: 2, maxWidth: 1280, margin: "0 auto", padding: "0 20px 0 40px", width: "100%" }}>
              <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", backdropFilter: "blur(10px)", borderRadius: 20, padding: "6px 16px", color: "#fff", fontSize: 12, fontWeight: 600, marginBottom: 16, letterSpacing: "1px" }}>NEW SEASON 2025</div>
              <h1 style={{ color: "#fff", fontSize: "clamp(28px, 5vw, 56px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 16, letterSpacing: "-1px" }}>{s.title}</h1>
              <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "clamp(14px, 2vw, 20px)", marginBottom: 28, maxWidth: 400 }}>{s.subtitle}</p>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <button onClick={() => navigate("/products")} style={{ padding: "14px 32px", borderRadius: 50, background: "#fff", color: "#6366f1", border: "none", cursor: "pointer", fontWeight: 800, fontSize: 15, transition: "all 0.2s" }}>{s.cta}</button>
                <button onClick={() => navigate("/products")} style={{ padding: "14px 32px", borderRadius: 50, background: "transparent", color: "#fff", border: "2px solid rgba(255,255,255,0.6)", cursor: "pointer", fontWeight: 600, fontSize: 15 }}>Browse All</button>
              </div>
            </div>
          </div>
        ))}
        {/* Slide Dots */}
        <div style={{ position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)", display: "flex", gap: 8, zIndex: 5 }}>
          {HERO_SLIDES.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} style={{ width: i === slide ? 24 : 8, height: 8, borderRadius: 4, background: i === slide ? "#fff" : "rgba(255,255,255,0.5)", border: "none", cursor: "pointer", transition: "all 0.3s" }} />
          ))}
        </div>
        {/* Arrows */}
        <button onClick={() => setSlide(s => (s - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)} style={{ position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 44, height: 44, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5 }}>
          <Icon name="chevronLeft" size={22} color="#fff" />
        </button>
        <button onClick={() => setSlide(s => (s + 1) % HERO_SLIDES.length)} style={{ position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)", background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%", width: 44, height: 44, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 5 }}>
          <Icon name="chevronRight" size={22} color="#fff" />
        </button>
      </div>

      {/* Stats Bar */}
      <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", padding: "20px 20px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", justifyContent: "space-around", flexWrap: "wrap", gap: 16 }}>
          {[["50K+", "Happy Customers"], ["36+", "Products"], ["Fast", "Free Shipping"], ["24/7", "Customer Support"]].map(([v, l]) => (
            <div key={l} style={{ textAlign: "center", color: "#fff" }}>
              <div style={{ fontWeight: 900, fontSize: 22 }}>{v}</div>
              <div style={{ fontSize: 12, opacity: 0.85 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 20px" }}>
        {/* Categories */}
        <section style={{ padding: "60px 0 0" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ color: "#6366f1", fontWeight: 700, fontSize: 13, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>Browse By Category</div>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.5px" }}>Shop Our Collections</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16 }}>
            {CATEGORIES.map(cat => (
              <div key={cat.id} onClick={() => navigate(`/products?cat=${cat.id}`)} style={{ borderRadius: 16, overflow: "hidden", cursor: "pointer", position: "relative", height: 220, transition: "transform 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.03)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                <img src={cat.image} alt={cat.label} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 60%)" }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: 16 }}>
                  <div style={{ fontSize: 24 }}>{cat.icon}</div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 15 }}>{cat.label}</div>
                  <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>{cat.count} items</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Products */}
        <section style={{ padding: "60px 0 0" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 28, flexWrap: "wrap", gap: 12 }}>
            <div>
              <div style={{ color: "#6366f1", fontWeight: 700, fontSize: 13, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>Hand-Picked For You</div>
              <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.5px" }}>Featured Products</h2>
            </div>
            <button onClick={() => navigate("/products")} style={{ background: "none", border: "2px solid #6366f1", color: "#6366f1", padding: "10px 24px", borderRadius: 50, cursor: "pointer", fontWeight: 700, fontSize: 14 }}>View All →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
            {featured.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
          </div>
        </section>

        {/* Promo Banner */}
        <section style={{ padding: "60px 0 0" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20 }}>
            <div style={{ borderRadius: 20, padding: "36px 28px", background: "linear-gradient(135deg, #1e1b4b, #312e81)", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontSize: 36 }}>🏷️</div>
              <div style={{ color: "#a5b4fc", fontWeight: 700, fontSize: 12, letterSpacing: "2px" }}>LIMITED TIME OFFER</div>
              <h3 style={{ color: "#fff", fontSize: 24, fontWeight: 900, lineHeight: 1.2 }}>Up to 40% OFF Sale Items</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>Use code <strong style={{ color: "#a5b4fc" }}>SAVE20</strong> at checkout</p>
              <button onClick={() => navigate("/products")} style={{ width: "fit-content", padding: "10px 24px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 50, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>Shop Sale →</button>
            </div>
            <div style={{ borderRadius: 20, padding: "36px 28px", background: "linear-gradient(135deg, #064e3b, #065f46)", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontSize: 36 }}>🚚</div>
              <div style={{ color: "#6ee7b7", fontWeight: 700, fontSize: 12, letterSpacing: "2px" }}>PREMIUM MEMBER PERK</div>
              <h3 style={{ color: "#fff", fontSize: 24, fontWeight: 900, lineHeight: 1.2 }}>Free Shipping on All Orders</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>No minimum spend required for members</p>
              <button onClick={() => navigate("/signup")} style={{ width: "fit-content", padding: "10px 24px", background: "#10b981", color: "#fff", border: "none", borderRadius: 50, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>Join Free →</button>
            </div>
            <div style={{ borderRadius: 20, padding: "36px 28px", background: "linear-gradient(135deg, #4c1d95, #7c3aed)", display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontSize: 36 }}>✨</div>
              <div style={{ color: "#ddd6fe", fontWeight: 700, fontSize: 12, letterSpacing: "2px" }}>NEW ARRIVALS</div>
              <h3 style={{ color: "#fff", fontSize: 24, fontWeight: 900, lineHeight: 1.2 }}>Fresh Styles Every Week</h3>
              <p style={{ color: "rgba(255,255,255,0.7)", fontSize: 14 }}>Be first to discover latest trends</p>
              <button onClick={() => navigate("/products")} style={{ width: "fit-content", padding: "10px 24px", background: "#8b5cf6", color: "#fff", border: "none", borderRadius: 50, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>Explore →</button>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        <section style={{ padding: "60px 0 0" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <div style={{ color: "#6366f1", fontWeight: 700, fontSize: 13, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>Fresh Drops</div>
            <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.5px" }}>New Arrivals</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 20 }}>
            {newArrivals.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ padding: "60px 0 0", textAlign: "center" }}>
          <div style={{ color: "#6366f1", fontWeight: 700, fontSize: 13, letterSpacing: "2px", textTransform: "uppercase", marginBottom: 8 }}>What Customers Say</div>
          <h2 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.5px", marginBottom: 32 }}>Loved By Thousands</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
            {[
              { name: "Sishir ", avatar: "SS", text: "Absolutely love the quality! The leather tote bag I bought is stunning and so durable.", rating: 5, product: "Leather Tote Bag" },
              { name: "Pranisha", avatar: "PK", text: "Fast shipping, great packaging, and the Oxford shirt fits perfectly. Will definitely shop again!", rating: 5, product: "Classic Oxford Shirt" },
              { name: "Sabina", avatar: "SB", text: "The floral dress is even more beautiful in person. SmartShop never disappoints!", rating: 5, product: "Floral Summer Dress" },
            ].map(t => (
              <div key={t.name} style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 16, padding: 24, textAlign: "left" }}>
                <Stars rating={t.rating} />
                <p style={{ color: "var(--text)", fontSize: 14, lineHeight: 1.7, margin: "12px 0 16px", fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 38, height: 38, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)" }}>{t.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Purchased: {t.product}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletter */}
        <section style={{ padding: "60px 0", textAlign: "center" }}>
          <div style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", borderRadius: 24, padding: "48px 24px" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>📬</div>
            <h2 style={{ color: "#fff", fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, marginBottom: 8 }}>Stay In The Loop</h2>
            <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: 28, fontSize: 15 }}>Get exclusive deals, new arrivals, and style tips straight to your inbox.</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <input value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email address" style={{ padding: "14px 20px", borderRadius: 50, border: "none", fontSize: 14, minWidth: 260, outline: "none" }} />
              <button onClick={() => { if(email) { addToast("🎉 Subscribed successfully!"); setEmail(""); } }} style={{ padding: "14px 28px", borderRadius: 50, background: "#fff", color: "#6366f1", border: "none", cursor: "pointer", fontWeight: 800, fontSize: 14 }}>Subscribe Now</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

export default HomePage