import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Heart, ShoppingCart, Star, Truck, Shield, RotateCcw, Minus, Plus, ChevronRight, Check } from 'lucide-react'
import { products } from '../data/products'
import ProductCard from '../components/ProductCard'
import './ProductDetail.css'

export default function ProductDetail({ addToCart, wishlist, toggleWishlist }) {
  const { id } = useParams()
  const product = products.find(p => p.id === +id)
  const [qty, setQty] = useState(1)
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '')
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '')
  const [activeTab, setActiveTab] = useState('description')
  const [added, setAdded] = useState(false)

  if (!product) return (
    <div className="not-found">
      <h2>Product not found</h2>
      <Link to="/products">← Back to Products</Link>
    </div>
  )

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  const isWishlisted = wishlist?.includes(product.id)

  const related = products.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) addToCart(product)
    setAdded(true)
    setTimeout(() => setAdded(false), 2000)
  }

  return (
    <div className="detail-page">
      {/* Breadcrumb */}
      <div className="breadcrumb container">
        <Link to="/">Home</Link>
        <ChevronRight size={14} />
        <Link to="/products">Products</Link>
        <ChevronRight size={14} />
        <Link to={`/products?cat=${product.category}`}>{product.category}</Link>
        <ChevronRight size={14} />
        <span>{product.name}</span>
      </div>

      {/* Main detail */}
      <div className="detail-main container">
        {/* Image */}
        <div className="detail-image-wrap">
          <div className="detail-badges">
            {product.badge && <span className="badge-big">{product.badge}</span>}
            <span className="discount-big">-{discount}%</span>
          </div>
          <img src={product.image} alt={product.name} />
          <button
            className={`wishlist-big ${isWishlisted ? 'active' : ''}`}
            onClick={() => toggleWishlist?.(product.id)}
          >
            <Heart size={20} fill={isWishlisted ? 'var(--primary)' : 'none'} />
          </button>
        </div>

        {/* Info */}
        <div className="detail-info">
          <span className="detail-category">{product.category}</span>
          <h1>{product.name}</h1>

          <div className="detail-rating">
            <div className="stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={16} fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'} color={i < Math.floor(product.rating) ? '#f59e0b' : '#d1d5db'} />
              ))}
            </div>
            <span className="rating-val">{product.rating}</span>
            <span className="rating-reviews">({product.reviews} reviews)</span>
          </div>

          <div className="detail-price">
            <span className="big-price">Rs. {product.price.toLocaleString()}</span>
            <span className="big-orig">Rs. {product.originalPrice.toLocaleString()}</span>
            <span className="big-save">You save Rs. {(product.originalPrice - product.price).toLocaleString()}</span>
          </div>

          <p className="detail-desc">{product.description}</p>

          {/* Colors */}
          {product.colors?.length > 0 && (
            <div className="option-group">
              <div className="option-label">Color: <strong>{selectedColor}</strong></div>
              <div className="color-options">
                {product.colors.map(c => (
                  <button
                    key={c}
                    className={`color-btn ${selectedColor === c ? 'selected' : ''}`}
                    onClick={() => setSelectedColor(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Sizes */}
          {product.sizes?.length > 0 && (
            <div className="option-group">
              <div className="option-label">Size: <strong>{selectedSize}</strong></div>
              <div className="size-options">
                {product.sizes.map(s => (
                  <button
                    key={s}
                    className={`size-btn ${selectedSize === s ? 'selected' : ''}`}
                    onClick={() => setSelectedSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="qty-row">
            <div className="qty-control">
              <button onClick={() => setQty(Math.max(1, qty - 1))}><Minus size={16} /></button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}><Plus size={16} /></button>
            </div>
            <button className={`add-to-cart-main ${added ? 'added' : ''}`} onClick={handleAddToCart}>
              {added ? <><Check size={18} /> Added!</> : <><ShoppingCart size={18} /> Add to Cart</>}
            </button>
            <button className="buy-now-btn">Buy Now</button>
          </div>

          {/* Features */}
          <div className="features-row">
            {[
              { icon: <Truck size={18} />, text: 'Free Delivery above Rs.1500' },
              { icon: <Shield size={18} />, text: '100% Authentic Product' },
              { icon: <RotateCcw size={18} />, text: '7-Day Easy Returns' },
            ].map((f, i) => (
              <div key={i} className="feature-item">
                {f.icon}
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="detail-tabs container">
        <div className="tab-header">
          {['description', 'reviews', 'shipping'].map(t => (
            <button
              key={t}
              className={`tab-btn ${activeTab === t ? 'active' : ''}`}
              onClick={() => setActiveTab(t)}
            >
              {t.charAt(0).toUpperCase() + t.slice(1)}
            </button>
          ))}
        </div>
        <div className="tab-content">
          {activeTab === 'description' && (
            <div>
              <p>{product.description}</p>
              <ul>
                <li>Premium quality material</li>
                <li>Carefully crafted by skilled artisans</li>
                <li>Suitable for all occasions</li>
                <li>Easy care and maintenance</li>
                <li>Available in multiple sizes and colors</li>
              </ul>
            </div>
          )}
          {activeTab === 'reviews' && (
            <div className="reviews-section">
              <div className="review-summary">
                <div className="big-rating">{product.rating}</div>
                <div>
                  <div className="stars">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={20} fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'} color={i < Math.floor(product.rating) ? '#f59e0b' : '#d1d5db'} />
                    ))}
                  </div>
                  <p>Based on {product.reviews} reviews</p>
                </div>
              </div>
              {['Great product!', 'Excellent quality, fast delivery', 'Worth the price, highly recommend'].map((r, i) => (
                <div key={i} className="review-item">
                  <div className="reviewer-avatar">{String.fromCharCode(65 + i)}</div>
                  <div>
                    <div className="reviewer-name">Customer {i + 1}</div>
                    <div className="stars">{[...Array(5)].map((_, j) => <Star key={j} size={13} fill="#f59e0b" color="#f59e0b" />)}</div>
                    <p>{r}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'shipping' && (
            <div>
              <p><strong>Standard Delivery:</strong> 3-5 business days</p>
              <p><strong>Express Delivery:</strong> 1-2 business days (additional charges apply)</p>
              <p><strong>Free Delivery:</strong> On all orders above Rs. 1500</p>
              <p><strong>Return Policy:</strong> 7-day easy returns for unused items in original packaging.</p>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <div className="related-section container">
          <h2>Related Products</h2>
          <div className="products-grid">
            {related.map(p => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} wishlist={wishlist} toggleWishlist={toggleWishlist} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
