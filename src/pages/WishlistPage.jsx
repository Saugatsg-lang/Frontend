import { useApp } from '../context/AppContext'
import Icon from '../components/common/Icon'

const WishlistPage = ({ navigate }) => {
  const { wishlist, toggleWishlist, addToCart } = useApp()

  if (wishlist.length === 0) return (
    <div style={{ textAlign: "center", padding: "80px 20px" }}>
      <div style={{ fontSize: 72, marginBottom: 20 }}>❤️</div>
      <h2 style={{ color: "var(--text)", fontSize: 26, fontWeight: 900 }}>Your Wishlist is Empty</h2>
      <p style={{ color: "var(--text-muted)", marginTop: 8, marginBottom: 24 }}>Save items you love and come back to them later.</p>
      <button onClick={() => navigate("/products")} style={{ padding: "14px 32px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: 50, cursor: "pointer", fontWeight: 700, fontSize: 15 }}>Browse Products</button>
    </div>
  )

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 20px" }}>
      <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, color: "var(--text)", marginBottom: 28 }}>My Wishlist ({wishlist.length})</h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 20 }}>
        {wishlist.map(p => (
          <div key={p.id} style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 16, overflow: "hidden" }}>
            <div style={{ position: "relative", height: 220, cursor: "pointer" }} onClick={() => navigate(`/product/${p.id}`)}>
              <img src={p.image} alt={p.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <button onClick={e => { e.stopPropagation(); toggleWishlist(p) }} style={{ position: "absolute", top: 10, right: 10, width: 34, height: 34, borderRadius: "50%", border: "none", background: "rgba(255,255,255,0.9)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Icon name="heartFill" size={16} color="#ef4444" />
              </button>
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{p.name}</div>
              <div style={{ fontWeight: 800, color: "var(--text)", fontSize: 17, marginBottom: 10 }}>Rs. {p.price}</div>
              <button onClick={() => addToCart(p)} style={{ width: "100%", padding: "9px", background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 700, fontSize: 13 }}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default WishlistPage