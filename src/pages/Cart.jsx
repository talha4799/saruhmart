import React from 'react'
import { Link } from 'react-router-dom'
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag } from 'lucide-react'
import './Cart.css'

export default function Cart({ cartItems, removeFromCart, updateQty }) {
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0)
  const delivery = subtotal >= 1500 ? 0 : 150
  const discount = Math.round(subtotal * 0.05)
  const total = subtotal + delivery - discount

  if (cartItems.length === 0) return (
    <div className="empty-cart">
      <div className="empty-cart-inner">
        <div className="empty-icon">🛒</div>
        <h2>Your Cart is Empty</h2>
        <p>Add some products to get started!</p>
        <Link to="/products" className="continue-btn">
          <ShoppingBag size={18} /> Continue Shopping
        </Link>
      </div>
    </div>
  )

  return (
    <div className="cart-page">
      <div className="cart-header-bar">
        <div className="cart-header-inner container">
          <h1>Shopping Cart</h1>
          <span>{cartItems.reduce((a, b) => a + b.qty, 0)} items</span>
        </div>
      </div>

      <div className="cart-layout container">
        {/* Cart Items */}
        <div className="cart-items">
          <div className="cart-items-header">
            <span>Product</span>
            <span>Price</span>
            <span>Qty</span>
            <span>Total</span>
            <span></span>
          </div>

          {cartItems.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-product">
                <img src={item.image} alt={item.name} />
                <div>
                  <span className="cart-item-cat">{item.category}</span>
                  <Link to={`/product/${item.id}`} className="cart-item-name">{item.name}</Link>
                  <span className="cart-item-orig">Rs. {item.originalPrice.toLocaleString()}</span>
                </div>
              </div>
              <div className="cart-item-price">Rs. {item.price.toLocaleString()}</div>
              <div className="cart-qty">
                <button onClick={() => updateQty(item.id, item.qty - 1)}><Minus size={14} /></button>
                <span>{item.qty}</span>
                <button onClick={() => updateQty(item.id, item.qty + 1)}><Plus size={14} /></button>
              </div>
              <div className="cart-item-total">Rs. {(item.price * item.qty).toLocaleString()}</div>
              <button className="cart-remove" onClick={() => removeFromCart(item.id)}>
                <Trash2 size={16} />
              </button>
            </div>
          ))}

          <div className="cart-actions">
            <Link to="/products" className="continue-link">← Continue Shopping</Link>
            <div className="coupon-row">
              <input type="text" placeholder="Enter coupon code" />
              <button><Tag size={14} /> Apply</button>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="cart-summary">
          <h3>Order Summary</h3>

          <div className="summary-row">
            <span>Subtotal ({cartItems.reduce((a, b) => a + b.qty, 0)} items)</span>
            <span>Rs. {subtotal.toLocaleString()}</span>
          </div>
          <div className="summary-row">
            <span>Delivery</span>
            <span className={delivery === 0 ? 'free' : ''}>
              {delivery === 0 ? 'FREE' : `Rs. ${delivery}`}
            </span>
          </div>
          <div className="summary-row discount">
            <span>Discount (5%)</span>
            <span>- Rs. {discount.toLocaleString()}</span>
          </div>

          {delivery === 0 ? (
            <div className="free-delivery-msg">🎉 You qualify for free delivery!</div>
          ) : (
            <div className="delivery-msg">
              Add Rs. {(1500 - subtotal).toLocaleString()} more for free delivery
            </div>
          )}

          <div className="summary-total">
            <span>Total</span>
            <span>Rs. {total.toLocaleString()}</span>
          </div>

          <button className="checkout-btn">
            Proceed to Checkout <ArrowRight size={18} />
          </button>

          <div className="pay-badges">
            {['JazzCash', 'EasyPaisa', 'Visa', 'MC', 'COD'].map(p => (
              <span key={p} className="pay-badge">{p}</span>
            ))}
          </div>

          <div className="secure-notice">
            🔒 100% Secure & Encrypted Checkout
          </div>
        </div>
      </div>
    </div>
  )
}
