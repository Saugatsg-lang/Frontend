import { createContext, useContext, useState } from 'react'
import { PRODUCTS, CATEGORIES, BRANDS, COUPONS } from '../data'

const AppContext = createContext()

export function AppProvider({ children }) {
  const [cart, setCart] = useState([])
  const [wishlist, setWishlist] = useState([])
  const [darkMode, setDarkMode] = useState(false)
  const [toasts, setToasts] = useState([])
  const [user, setUser] = useState(null)
  const [orders, setOrders] = useState([{ id: "SS-2024-001", date: "2024-12-01", status: "delivered", total: 234, items: [PRODUCTS[0], PRODUCTS[2]] }])

  const addToast = (msg, type = "success") => {
    const id = Date.now()
    setToasts(p => [...p, { id, msg, type }])
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3000)
  }

  const addToCart = (product, size = product.sizes[0], color = product.colors[0], qty = 1) => {
    setCart(prev => {
      const ex = prev.find(i => i.id === product.id && i.size === size && i.color === color)
      if (ex) return prev.map(i => i.id === product.id && i.size === size && i.color === color ? { ...i, qty: i.qty + qty } : i)
      return [...prev, { ...product, size, color, qty }]
    })
    addToast(`${product.name} added to cart!`)
  }

  const removeFromCart = id => { 
    setCart(p => p.filter(i => i.id !== id))
    addToast("Item removed", "info")
  }

  const updateQty = (id, qty) => { 
    if (qty < 1) return removeFromCart(id)
    setCart(p => p.map(i => i.id === id ? { ...i, qty } : i))
  }

  const toggleWishlist = (product) => {
    const inWish = wishlist.find(i => i.id === product.id)
    if (inWish) { 
      setWishlist(p => p.filter(i => i.id !== product.id))
      addToast("Removed from wishlist", "info")
    } else { 
      setWishlist(p => [...p, product])
      addToast("Added to wishlist ❤️")
    }
  }

  const cartTotal = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const cartCount = cart.reduce((s, i) => s + i.qty, 0)

  return (
    <AppContext.Provider value={{ 
      cart, wishlist, darkMode, setDarkMode, toasts, addToast, 
      user, setUser, orders, setOrders, addToCart, removeFromCart, 
      updateQty, toggleWishlist, cartTotal, cartCount, 
      PRODUCTS, CATEGORIES, BRANDS, COUPONS 
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)