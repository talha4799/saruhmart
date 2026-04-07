import React from 'react'
import { Link } from 'react-router-dom'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import './ProductCard.css'

export default function ProductCard({ product, addToCart, wishlist, toggleWishlist }) {
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  const isWishlisted = wishlist?.includes(product.id)

  return (
    <div className="product-card">
      <div className="card-img-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.badge && <span className="badge">{product.badge}</span>}
        <span className="discount-tag">-{discount}%</span>
        <div className="card-actions">
          <button
            className={`wishlist-btn ${isWishlisted ? 'active' : ''}`}
            onClick={() => toggleWishlist?.(product.id)}
            title="Add to Wishlist"
          >
            <Heart size={16} fill={isWishlisted ? 'var(--primary)' : 'none'} />
          </button>
          <Link to={`/product/${product.id}`} className="quick-view" title="Quick View">
            <Eye size={16} />
          </Link>
        </div>
        <button className="add-cart-overlay" onClick={() => addToCart(product)}>
          <ShoppingCart size={15} /> Add to Cart
        </button>
      </div>

      <div className="card-body">
        <span className="card-category">{product.category}</span>
        <Link to={`/product/${product.id}`}>
          <h3 className="card-title">{product.name}</h3>
        </Link>
        <div className="card-rating">
          <div className="stars">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={13}
                fill={i < Math.floor(product.rating) ? '#f59e0b' : 'none'}
                color={i < Math.floor(product.rating) ? '#f59e0b' : '#d1d5db'}
              />
            ))}
          </div>
          <span className="rating-count">({product.reviews})</span>
        </div>
        <div className="card-price">
          <span className="price">Rs. {product.price.toLocaleString()}</span>
          <span className="original-price">Rs. {product.originalPrice.toLocaleString()}</span>
        </div>
        <button className="add-cart-btn" onClick={() => addToCart(product)}>
          <ShoppingCart size={15} /> Add to Cart
        </button>
      </div>
    </div>
  )
}
