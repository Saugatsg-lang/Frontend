import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/common/ProductCard'
import Icon from '../components/common/Icon'
import Stars from '../components/common/Stars'

const ProductDetailPage = ({ id, navigate }) => {
  const { PRODUCTS, addToCart, toggleWishlist, wishlist, addToast } = useApp()
  const product = PRODUCTS.find(p => p.id === +id)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [qty, setQty] = useState(1)
  const [activeImg, setActiveImg] = useState(0)
  const inWish = product && wishlist.find(i => i.id === product.id)

  useEffect(() => { if (product) { setSelectedSize(product.sizes[0]); setSelectedColor(product.colors[0]); setActiveImg(0) } }, [id])

  if (!product) return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>😕</div>
      <h2 style={{ color: "var(--text)" }}>Product Not Found</h2>
      <button onClick={() => navigate("/products")} style={{ marginTop: 16, padding: "12px 24px", background: "#6366f1", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 700 }}>Browse Products</button>
    </div>
  )

  const images = [product.image, product.image2]
  const related = PRODUCTS.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  const mockReviews = [
    { name: "Alex T.", rating: 5, date: "Dec 2024", text: "Absolutely love this product! The quality exceeded my expectations. Will buy again.", verified: true },
    { name: "Maria S.", rating: 4, date: "Nov 2024", text: "Great product, fast shipping. Fits perfectly as described.", verified: true },
    { name: "John D.", rating: 5, date: "Nov 2024", text: "Best purchase I've made this year. Highly recommend to everyone!", verified: false },
  ]

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 20px" }}>
      {/* Breadcrumb */}
      <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 24, fontSize: 13, color: "var(--text-muted)" }}>
        <span onClick={() => navigate("/")} style={{ cursor: "pointer", color: "#6366f1" }}>Home</span>
        <Icon name="chevronRight" size={14} color="var(--text-muted)" />
        <span onClick={() => navigate("/products")} style={{ cursor: "pointer", color: "#6366f1" }}>Products</span>
        <Icon name="chevronRight" size={14} color="var(--text-muted)" />
        <span>{product.name}</span>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 40, marginBottom: 60 }}>
        {/* Gallery */}
        <div>
          <div style={{ borderRadius: 20, overflow: "hidden", marginBottom: 12, height: 420, background: "var(--img-bg)" }}>
            <img src={images[activeImg]} alt={product.name} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "opacity 0.3s" }} />
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            {images.map((img, i) => (
              <div key={i} onClick={() => setActiveImg(i)} style={{ width: 80, height: 80, borderRadius: 10, overflow: "hidden", border: `2px solid ${activeImg === i ? "#6366f1" : "var(--border)"}`, cursor: "pointer" }}>
                <img src={img} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            {product.badge && <span style={{ background: "#6366f1", color: "#fff", padding: "3px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>{product.badge}</span>}
            {discount > 0 && <span style={{ background: "#ef4444", color: "#fff", padding: "3px 12px", borderRadius: 20, fontSize: 11, fontWeight: 700 }}>-{discount}% OFF</span>}
          </div>
          <div style={{ color: "#6366f1", fontWeight: 700, fontSize: 13, marginBottom: 6 }}>{product.brand}</div>
          <h1 style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 900, color: "var(--text)", marginBottom: 12, lineHeight: 1.2 }}>{product.name}</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
            <Stars rating={product.rating} size={18} />
            <span style={{ color: "var(--text-muted)", fontSize: 14 }}>{product.rating} ({product.reviews} reviews)</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: 32, fontWeight: 900, color: "var(--text)" }}>Rs. {product.price}</span>
            {product.originalPrice > product.price && <span style={{ fontSize: 18, color: "var(--text-muted)", textDecoration: "line-through" }}>Rs. {product.originalPrice}</span>}
          </div>
          <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{product.description}</p>

          {/* Sizes */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)", marginBottom: 10 }}>Size: <span style={{ color: "#6366f1" }}>{selectedSize}</span></div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {product.sizes.map(s => (
                <button key={s} onClick={() => setSelectedSize(s)} style={{ padding: "7px 16px", borderRadius: 8, border: `2px solid ${selectedSize === s ? "#6366f1" : "var(--border)"}`, background: selectedSize === s ? "#6366f1" : "var(--card-bg)", color: selectedSize === s ? "#fff" : "var(--text)", cursor: "pointer", fontWeight: 600, fontSize: 13, transition: "all 0.2s" }}>{s}</button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontWeight: 700, fontSize: 14, color: "var(--text)", marginBottom: 10 }}>Color: <span style={{ color: "#6366f1" }}>{selectedColor}</span></div>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {product.colors.map(c => (
                <button key={c} onClick={() => setSelectedColor(c)} style={{ padding: "6px 14px", borderRadius: 20, border: `2px solid ${selectedColor === c ? "#6366f1" : "var(--border)"}`, background: "var(--card-bg)", color: "var(--text)", cursor: "pointer", fontSize: 12, fontWeight: 600 }}>{c}</button>
              ))}
            </div>
          </div>

          {/* Qty & Buttons */}
          <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", border: "1.5px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
              <button onClick={() => setQty(q => Math.max(1, q-1))} style={{ width: 40, height: 46, background: "var(--hover-bg)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="minus" size={16} color="var(--text)" />
              </button>
              <span style={{ width: 48, textAlign: "center", fontWeight: 700, color: "var(--text)" }}>{qty}</span>
              <button onClick={() => setQty(q => q+1)} style={{ width: 40, height: 46, background: "var(--hover-bg)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="plus" size={16} color="var(--text)" />
              </button>
            </div>
            <button onClick={() => addToCart(product, selectedSize, selectedColor, qty)} style={{ flex: 1, padding: "12px 24px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontWeight: 800, fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
              <Icon name="cart" size={18} color="#fff" /> Add to Cart
            </button>
            <button onClick={() => toggleWishlist(product)} style={{ width: 46, height: 46, border: `2px solid ${inWish ? "#ef4444" : "var(--border)"}`, background: "var(--card-bg)", borderRadius: 10, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Icon name={inWish ? "heartFill" : "heart"} size={20} color={inWish ? "#ef4444" : "var(--text-muted)"} />
            </button>
          </div>

          {/* Trust Badges */}
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[["truck", "Free Shipping"], ["shield", "Secure Payment"], ["refresh", "Easy Returns"]].map(([icon, label]) => (
              <div key={label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-muted)" }}>
                <Icon name={icon} size={16} color="#10b981" /> {label}
              </div>
            ))}
          </div>
          {product.stock <= 10 && <div style={{ marginTop: 12, padding: "8px 14px", background: "#fef2f2", borderRadius: 8, color: "#dc2626", fontSize: 13, fontWeight: 600, display: "inline-block" }}>⚠ Only {product.stock} in stock!</div>}
        </div>
      </div>

      {/* Reviews */}
      <div style={{ marginBottom: 60 }}>
        <h2 style={{ fontSize: 24, fontWeight: 900, color: "var(--text)", marginBottom: 24 }}>Customer Reviews</h2>
        <div style={{ display: "grid", gap: 16 }}>
          {mockReviews.map((r, i) => (
            <div key={i} style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 14, padding: 20 }}>
              <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 13 }}>{r.name[0]}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: "var(--text)", fontSize: 14 }}>{r.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text-muted)" }}>{r.date}</div>
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Stars rating={r.rating} />
                  {r.verified && <span style={{ background: "#dcfce7", color: "#16a34a", fontSize: 11, padding: "2px 8px", borderRadius: 20, fontWeight: 600 }}>✓ Verified</span>}
                </div>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>{r.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div>
          <h2 style={{ fontSize: 24, fontWeight: 900, color: "var(--text)", marginBottom: 24 }}>You May Also Like</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 20 }}>
            {related.map(p => <ProductCard key={p.id} product={p} navigate={navigate} />)}
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductDetailPage