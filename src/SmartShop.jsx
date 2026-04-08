import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation, useParams } from 'react-router-dom'
import { useApp } from './context/AppContext'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import ChatWidget from './components/layout/ChatWidget'
import ToastContainer from './components/common/ToastContainer'
import HomePage from './pages/HomePage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import AuthPage from './pages/AuthPage'
import AdminPage from './pages/AdminPage'
import ContactPage from './pages/ContactPage'
import './styles/global.css'

function SmartShop() {
  const { darkMode } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  const theme = {
    "--bg": darkMode ? "#0f0f1a" : "#f8f8fc",
    "--card-bg": darkMode ? "#1a1a2e" : "#ffffff",
    "--navbar-bg": darkMode ? "rgba(15,15,26,0.95)" : "rgba(255,255,255,0.95)",
    "--footer-bg": darkMode ? "#0d0d1a" : "#fafafa",
    "--text": darkMode ? "#e8e8f0" : "#1a1a2e",
    "--text-muted": darkMode ? "#8888a0" : "#6b7280",
    "--border": darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)",
    "--hover-bg": darkMode ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
    "--input-bg": darkMode ? "rgba(255,255,255,0.05)" : "#f9f9fc",
    "--img-bg": darkMode ? "#1e1e30" : "#f0f0f8",
    "--accent": "#6366f1",
  }

  // Wrapper component for ProductDetail to get id from params
  const ProductDetailWrapper = () => {
    const { id } = useParams()
    return <ProductDetailPage id={id} navigate={navigate} />
  }

  return (
    <div style={{ ...theme, background: "var(--bg)", minHeight: "100vh", fontFamily: "'Segoe UI', system-ui, -apple-system, sans-serif", color: "var(--text)", transition: "all 0.3s ease" }}>
      <Navbar navigate={navigate} path={location.pathname} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage navigate={navigate} />} />
          <Route path="/products" element={<ProductsPage navigate={navigate} />} />
          <Route path="/product/:id" element={<ProductDetailWrapper />} />
          <Route path="/cart" element={<CartPage navigate={navigate} />} />
          <Route path="/wishlist" element={<WishlistPage navigate={navigate} />} />
          <Route path="/checkout" element={<CheckoutPage navigate={navigate} />} />
          <Route path="/orders" element={<OrdersPage navigate={navigate} />} />
          <Route path="/signin" element={<AuthPage type="signin" navigate={navigate} />} />
          <Route path="/signup" element={<AuthPage type="signup" navigate={navigate} />} />
          <Route path="/admin" element={<AdminPage navigate={navigate} />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </main>
      <Footer navigate={navigate} />
      <ToastContainer />
      <ChatWidget />
    </div>
  )
}

export default SmartShop