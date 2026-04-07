import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Zap, Tag, TrendingUp } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'
import './Home.css'

export default function Home({ addToCart, wishlist, toggleWishlist }) {
  const heroRef = useRef()

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) e.target.classList.add('visible')
      })
    }, { threshold: 0.1 })
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const featured = products.slice(0, 4)
  const trending = products.slice(4, 8)

  return (
    <div className="home">
      {/* Hero Banner */}
      <section className="hero" ref={heroRef}>
        <div className="hero-bg">
          <div className="hero-shape1"></div>
          <div className="hero-shape2"></div>
        </div>
        <div className="hero-inner">
          <div className="hero-content">
            <span className="hero-pill"><Zap size={13} /> Mega Sale — Up to 70% Off!</span>
            <h1 className="hero-title">
              Shop the Best<br />
              <span>Brands in Pakistan</span>
            </h1>
            <p className="hero-desc">
              Discover thousands of products across fashion, electronics, beauty, and more —
              delivered fast to your door.
            </p>
            <div className="hero-btns">
              <Link to="/products" className="btn-primary">
                Shop Now <ArrowRight size={18} />
              </Link>
              <Link to="/products" className="btn-outline">Explore Deals</Link>
            </div>
            <div className="hero-stats">
              <div className="stat"><strong>50K+</strong><span>Products</span></div>
              <div className="stat-divider"></div>
              <div className="stat"><strong>1M+</strong><span>Happy Customers</span></div>
              <div className="stat-divider"></div>
              <div className="stat"><strong>100+</strong><span>Brands</span></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-img-wrap">
              <img src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80" alt="Shopping" />
              <div className="hero-float-card">
                <div className="float-icon">🎉</div>
                <div>
                  <div className="float-title">Flash Sale Live!</div>
                  <div className="float-sub">Ends in 02:14:55</div>
                </div>
              </div>
              <div className="hero-float-card2">
                <div className="float-icon">📦</div>
                <div>
                  <div className="float-title">Free Delivery</div>
                  <div className="float-sub">Orders above Rs.1500</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Offer Banners */}
      <section className="offer-banners container">
        <div className="offer-grid">
          <div className="offer-card offer-red">
            <div>
              <span className="offer-label">Limited Time</span>
              <h3>Fashion Sale</h3>
              <p>Up to 60% off on latest arrivals</p>
              <Link to="/products?cat=Fashion">Shop Now →</Link>
            </div>
            <div className="offer-img">👗</div>
          </div>
          <div className="offer-card offer-dark">
            <div>
              <span className="offer-label">Hot Deal</span>
              <h3>Electronics</h3>
              <p>Premium gadgets at best prices</p>
              <Link to="/products?cat=Electronics">Shop Now →</Link>
            </div>
            <div className="offer-img">📱</div>
          </div>
          <div className="offer-card offer-orange">
            <div>
              <span className="offer-label">New Arrivals</span>
              <h3>Beauty & Care</h3>
              <p>Glow up with top brands</p>
              <Link to="/products?cat=Beauty">Shop Now →</Link>
            </div>
            <div className="offer-img">💄</div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section container reveal">
        <div className="section-header">
          <div>
            <span className="section-tag"><Tag size={13} /> Browse By</span>
            <h2>Top Categories</h2>
          </div>
          <Link to="/products" className="see-all">View All <ArrowRight size={15} /></Link>
        </div>
        <div className="categories-grid">
          {categories.map((cat, i) => (
            <Link key={i} to={`/products?cat=${cat.name}`} className="cat-card">
              <div className="cat-emoji">{cat.icon}</div>
              <div className="cat-name">{cat.name}</div>
              <div className="cat-count">{cat.count.toLocaleString()} items</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="section container reveal">
        <div className="section-header">
          <div>
            <span className="section-tag"><Zap size={13} /> Don't Miss</span>
            <h2>Featured Products</h2>
          </div>
          <Link to="/products" className="see-all">See All <ArrowRight size={15} /></Link>
        </div>
        <div className="products-grid">
          {featured.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* Big Banner */}
      <section className="big-banner">
        <div className="big-banner-inner container">
          <div className="big-banner-content">
            <span className="hero-pill"><Zap size={13} /> Flash Sale</span>
            <h2>Up to 70% Off<br />This Weekend Only!</h2>
            <p>Grab the best deals before they're gone. Limited stock available.</p>
            <Link to="/products" className="btn-primary">
              Shop Flash Sale <ArrowRight size={18} />
            </Link>
          </div>
          <div className="big-banner-img">🛍️</div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="section container reveal">
        <div className="section-header">
          <div>
            <span className="section-tag"><TrendingUp size={13} /> Hot Right Now</span>
            <h2>Trending Products</h2>
          </div>
          <Link to="/products" className="see-all">See All <ArrowRight size={15} /></Link>
        </div>
        <div className="products-grid">
          {trending.map(p => (
            <ProductCard
              key={p.id}
              product={p}
              addToCart={addToCart}
              wishlist={wishlist}
              toggleWishlist={toggleWishlist}
            />
          ))}
        </div>
      </section>
    </div>
  )
}
