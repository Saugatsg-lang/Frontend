import { useState, useEffect } from 'react'
import { useApp } from '../context/AppContext'
import ProductCard from '../components/common/ProductCard'
import Icon from '../components/common/Icon'
import Stars from '../components/common/Stars'

const ProductsPage = ({ navigate }) => {
  const { PRODUCTS, CATEGORIES, BRANDS } = useApp()
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("all")
  const [brand, setBrand] = useState("all")
  const [sort, setSort] = useState("popular")
  const [priceRange, setPriceRange] = useState(300)
  const [minRating, setMinRating] = useState(0)
  const [page, setPage] = useState(1)
  const [layout, setLayout] = useState("grid")
  const [showFilters, setShowFilters] = useState(false)
  const PER_PAGE = 12

  // Read URL params
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    const catParam = searchParams.get('cat')
    if (catParam) setCategory(catParam)
  }, [])

  let filtered = PRODUCTS.filter(p => {
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false
    if (category !== "all" && p.category !== category) return false
    if (brand !== "all" && p.brand !== brand) return false
    if (p.price > priceRange) return false
    if (p.rating < minRating) return false
    return true
  })

  if (sort === "price-low") filtered = [...filtered].sort((a, b) => a.price - b.price)
  else if (sort === "price-high") filtered = [...filtered].sort((a, b) => b.price - a.price)
  else if (sort === "rating") filtered = [...filtered].sort((a, b) => b.rating - a.rating)
  else if (sort === "newest") filtered = [...filtered].sort((a, b) => b.id - a.id)

  const totalPages = Math.ceil(filtered.length / PER_PAGE)
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE)

  const FilterPanel = () => (
    <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 16, padding: 20, position: "sticky", top: 80 }}>
      <div style={{ fontWeight: 700, fontSize: 16, color: "var(--text)", marginBottom: 20 }}>Filters</div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>Category</div>
        {[["all", "All Products"], ...CATEGORIES.map(c => [c.id, c.label])].map(([v, l]) => (
          <label key={v} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer", fontSize: 14, color: "var(--text)" }}>
            <input type="radio" name="cat" checked={category === v} onChange={() => { setCategory(v); setPage(1) }} />
            {l}
          </label>
        ))}
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>Max Price: Rs. {priceRange}</div>
        <input type="range" min={20} max={300} value={priceRange} onChange={e => { setPriceRange(+e.target.value); setPage(1) }} style={{ width: "100%", accentColor: "#6366f1" }} />
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--text-muted)" }}><span>Rs. 20</span><span>Rs. 300</span></div>
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>Min Rating</div>
        {[0, 3, 3.5, 4, 4.5].map(r => (
          <label key={r} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, cursor: "pointer", fontSize: 14, color: "var(--text)" }}>
            <input type="radio" name="rating" checked={minRating === r} onChange={() => { setMinRating(r); setPage(1) }} />
            {r === 0 ? "All" : `${r}+ ⭐`}
          </label>
        ))}
      </div>

      <div style={{ marginBottom: 20 }}>
        <div style={{ fontWeight: 600, fontSize: 13, color: "var(--text)", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.5px" }}>Brand</div>
        <select value={brand} onChange={e => { setBrand(e.target.value); setPage(1) }} style={{ width: "100%", padding: "8px 10px", borderRadius: 8, border: "1.5px solid var(--border)", background: "var(--input-bg)", color: "var(--text)", fontSize: 13 }}>
          <option value="all">All Brands</option>
          {BRANDS.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      <button onClick={() => { setCategory("all"); setBrand("all"); setPriceRange(300); setMinRating(0); setPage(1) }} style={{ width: "100%", padding: "10px", background: "var(--hover-bg)", border: "1px solid var(--border)", borderRadius: 8, cursor: "pointer", color: "var(--text)", fontWeight: 600, fontSize: 13 }}>
        Reset Filters
      </button>
    </div>
  )

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "32px 20px" }}>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)", fontWeight: 900, color: "var(--text)", letterSpacing: "-0.5px" }}>All Products</h1>
        <p style={{ color: "var(--text-muted)", marginTop: 4 }}>{filtered.length} products found</p>
      </div>

      {/* Mobile Filter Toggle */}
      <button onClick={() => setShowFilters(f => !f)} style={{ display: "none", marginBottom: 16, padding: "10px 18px", borderRadius: 8, background: "var(--card-bg)", border: "1px solid var(--border)", cursor: "pointer", color: "var(--text)", fontWeight: 600, alignItems: "center", gap: 8 }} className="mobile-filter-btn">
        <Icon name="filter" size={16} color="var(--text)" /> Filters
      </button>
      {showFilters && <div style={{ marginBottom: 20 }} className="mobile-filter"><FilterPanel /></div>}

      {/* Search + Sort Bar */}
      <div style={{ display: "flex", gap: 12, marginBottom: 24, flexWrap: "wrap", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--input-bg)", border: "1.5px solid var(--border)", borderRadius: 10, padding: "9px 14px", flex: 1, minWidth: 200 }}>
          <Icon name="search" size={16} color="var(--text-muted)" />
          <input value={search} onChange={e => { setSearch(e.target.value); setPage(1) }} placeholder="Search products..." style={{ border: "none", background: "transparent", outline: "none", color: "var(--text)", fontSize: 14, flex: 1 }} />
        </div>
        <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: "10px 14px", borderRadius: 10, border: "1.5px solid var(--border)", background: "var(--input-bg)", color: "var(--text)", fontSize: 13, cursor: "pointer" }}>
          <option value="popular">Most Popular</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
          <option value="newest">Newest</option>
        </select>
        <div style={{ display: "flex", border: "1.5px solid var(--border)", borderRadius: 10, overflow: "hidden" }}>
          {[["grid", "grid"], ["list", "list"]].map(([v, icon]) => (
            <button key={v} onClick={() => setLayout(v)} style={{ padding: "9px 12px", background: layout === v ? "#6366f1" : "var(--input-bg)", border: "none", cursor: "pointer", display: "flex" }}>
              <Icon name={icon} size={16} color={layout === v ? "#fff" : "var(--text-muted)"} />
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 28 }} className="products-layout">
        <div className="desktop-filters"><FilterPanel /></div>
        <div>
          {paginated.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 20px" }}>
              <div style={{ fontSize: 56, marginBottom: 16 }}>🔍</div>
              <h3 style={{ color: "var(--text)", fontSize: 20, fontWeight: 700 }}>No Products Found</h3>
              <p style={{ color: "var(--text-muted)", marginTop: 8 }}>Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: layout === "grid" ? "repeat(auto-fill, minmax(210px, 1fr))" : "1fr", gap: 20 }}>
              {paginated.map(p => layout === "grid" ? <ProductCard key={p.id} product={p} navigate={navigate} /> : (
                <div key={p.id} style={{ display: "flex", gap: 16, background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: 14, padding: 14, cursor: "pointer" }} onClick={() => navigate(`/product/${p.id}`)}>
                  <img src={p.image} alt={p.name} style={{ width: 100, height: 100, borderRadius: 10, objectFit: "cover", flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700, color: "var(--text)", marginBottom: 4 }}>{p.name}</div>
                    <div style={{ fontSize: 12, color: "var(--accent)", marginBottom: 4 }}>{p.brand}</div>
                    <Stars rating={p.rating} size={12} />
                    <div style={{ marginTop: 6, fontWeight: 800, color: "var(--text)", fontSize: 17 }}>Rs. {p.price}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 32, flexWrap: "wrap" }}>
              <button onClick={() => setPage(p => Math.max(1, p-1))} disabled={page === 1} style={{ padding: "8px 16px", borderRadius: 8, border: "1.5px solid var(--border)", background: "var(--card-bg)", color: "var(--text)", cursor: page === 1 ? "not-allowed" : "pointer", opacity: page === 1 ? 0.5 : 1 }}>← Prev</button>
              {Array.from({ length: totalPages }, (_, i) => i+1).map(n => (
                <button key={n} onClick={() => setPage(n)} style={{ padding: "8px 14px", borderRadius: 8, border: "1.5px solid var(--border)", background: page === n ? "#6366f1" : "var(--card-bg)", color: page === n ? "#fff" : "var(--text)", cursor: "pointer", fontWeight: page === n ? 700 : 400 }}>{n}</button>
              ))}
              <button onClick={() => setPage(p => Math.min(totalPages, p+1))} disabled={page === totalPages} style={{ padding: "8px 16px", borderRadius: 8, border: "1.5px solid var(--border)", background: "var(--card-bg)", color: "var(--text)", cursor: page === totalPages ? "not-allowed" : "pointer", opacity: page === totalPages ? 0.5 : 1 }}>Next →</button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProductsPage