import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingCart, Search, Heart, Menu, X, ChevronDown, Phone, MapPin } from 'lucide-react'
import './Navbar.css'

export default function Navbar({ cartCount }) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <>
      {/* Top bar */}
      <div className="topbar">
        <div className="topbar-inner">
          <div className="topbar-left">
            <span><Phone size={13} /> +92 300 1234567</span>
            <span><MapPin size={13} /> Free Delivery on Orders Above Rs. 1500</span>
          </div>
          <div className="topbar-right">
            <Link to="/">Track Order</Link>
            <Link to="/">Help</Link>
            <Link to="/">Sell on ZarqMart</Link>
          </div>
        </div>
      </div>

      {/* Main navbar */}
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="logo">
            <span className="logo-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                <path d="M16 10a4 4 0 01-8 0" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </span>
            <div>
              <span className="logo-main">Zarq<span>Mart</span></span>
              <span className="logo-sub">Pakistan's Premium Store</span>
            </div>
          </Link>

          {/* Search */}
          <div className={`search-box ${searchOpen ? 'open' : ''}`}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search products, brands..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <button className="search-btn">Search</button>
          </div>

          {/* Nav actions */}
          <div className="nav-actions">
            <button className="icon-btn mobile-search" onClick={() => setSearchOpen(!searchOpen)}>
              <Search size={20} />
            </button>
            <Link to="/" className="icon-btn">
              <Heart size={20} />
            </Link>
            <Link to="/cart" className="icon-btn cart-btn">
              <ShoppingCart size={20} />
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </Link>
            <Link to="/" className="btn-login">Login</Link>
            <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Category nav */}
        <div className="cat-nav">
          <div className="cat-nav-inner">
            <Link to="/products" className="cat-link all-cats">
              <Menu size={16} /> All Categories <ChevronDown size={14} />
            </Link>
            {['Fashion', 'Electronics', 'Footwear', 'Beauty', 'Bags', 'Home & Living', 'Sports', 'Kids'].map(cat => (
              <Link key={cat} to={`/products?cat=${cat}`} className="cat-link">{cat}</Link>
            ))}
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/products?cat=Fashion">Fashion</Link>
          <Link to="/products?cat=Electronics">Electronics</Link>
          <Link to="/cart">Cart ({cartCount})</Link>
          <Link to="/" className="mob-login">Login / Register</Link>
        </div>
      </nav>
    </>
  )
}
