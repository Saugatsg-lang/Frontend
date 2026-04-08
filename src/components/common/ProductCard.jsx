import { useState } from 'react'
import { useApp } from '../../context/AppContext'
import Icon from './Icon'
import Stars from './Stars'

const ProductCard = ({ product, navigate }) => {
  const { addToCart, toggleWishlist, wishlist } = useApp()
  const [hovered, setHovered] = useState(false)
  const [imgError, setImgError] = useState(false)
  const inWish = wishlist.find(i => i.id === product.id)
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 16, overflow: "hidden", background: "var(--card-bg)",
        border: "1px solid var(--border)", transition: "all 0.3s ease",
        boxShadow: hovered ? "0 20px 60px rgba(0,0,0,0.15)" : "0 2px 12px rgba(0,0,0,0.06)",
        transform: hovered ? "translateY(-4px)" : "translateY(0)", cursor: "pointer",
        position: "relative"
      }}
    >
      {product.badge && (
        <div style={{ position: "absolute", top: 12, left: 12, zIndex: 2, background: product.badge === "Sale" ? "#ef4444" : product.badge === "New" ? "#10b981" : product.badge === "Trending" ? "#f59e0b" : "#6366f1", color: "#fff", padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700, letterSpacing: "0.5px" }}>
          {product.badge}
        </div>
      )}
      <div style={{ position: "absolute", top: 12, right: 12, zIndex: 2, display: "flex", flexDirection: "column", gap: 6 }}>
        <button onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }} style={{ width: 34, height: 34, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.9)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <Icon name={inWish ? "heartFill" : "heart"} size={16} color={inWish ? "#ef4444" : "#666"} />
        </button>
        <button onClick={(e) => { e.stopPropagation(); navigate(`/product/${product.id}`); }} style={{ width: 34, height: 34, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.9)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}>
          <Icon name="eye" size={16} color="#666" />
        </button>
      </div>
      <div style={{ position: "relative", height: 260, overflow: "hidden", background: "var(--img-bg)" }} onClick={() => navigate(`/product/${product.id}`)}>
        <img
          src={hovered && !imgError ? product.image2 : product.image}
          alt={product.name}
          onError={() => setImgError(true)}
          loading="lazy"
          style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.4s ease, opacity 0.3s ease", transform: hovered ? "scale(1.06)" : "scale(1)" }}
        />
        {discount > 0 && <div style={{ position: "absolute", bottom: 8, left: 8, background: "#ef4444", color: "#fff", padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700 }}>-{discount}%</div>}
      </div>
      <div style={{ padding: "14px 16px 16px" }}>
        <div style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.5px" }}>{product.brand}</div>
        <div style={{ fontWeight: 600, fontSize: 15, color: "var(--text)", marginBottom: 6, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.name}</div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 10 }}>
          <Stars rating={product.rating} />
          <span style={{ fontSize: 12, color: "var(--text-muted)" }}>({product.reviews})</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontWeight: 800, fontSize: 18, color: "var(--text)" }}>Rs. {product.price}</span>
            {product.originalPrice > product.price && <span style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "line-through", marginLeft: 6 }}>Rs. {product.originalPrice}</span>}
          </div>
          <button onClick={(e) => { e.stopPropagation(); addToCart(product); }} style={{ background: "var(--accent)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 14px", cursor: "pointer", fontSize: 12, fontWeight: 600, transition: "all 0.2s", display: "flex", alignItems: "center", gap: 4 }}>
            <Icon name="plus" size={14} color="#fff" /> Add
          </button>
        </div>
        {product.stock <= 10 && <div style={{ marginTop: 6, fontSize: 11, color: "#ef4444", fontWeight: 500 }}>Only {product.stock} left!</div>}
      </div>
    </div>
  )
}

export default ProductCard