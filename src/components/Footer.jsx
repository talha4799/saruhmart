import React from 'react'
import { Link } from 'react-router-dom'
import { Facebook, Instagram, Twitter, Youtube, Phone, Mail, MapPin, CreditCard, Truck, Shield, RotateCcw } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer">
      {/* Trust badges */}
      <div className="trust-bar">
        <div className="trust-inner">
          {[
            { icon: <Truck size={28} />, title: 'Free Delivery', sub: 'On orders above Rs. 1500' },
            { icon: <Shield size={28} />, title: '100% Secure', sub: 'Safe & secure payment' },
            { icon: <RotateCcw size={28} />, title: 'Easy Returns', sub: '7-day return policy' },
            { icon: <CreditCard size={28} />, title: 'All Cards', sub: 'Visa, Mastercard, JazzCash' },
          ].map((item, i) => (
            <div key={i} className="trust-item">
              <div className="trust-icon">{item.icon}</div>
              <div>
                <div className="trust-title">{item.title}</div>
                <div className="trust-sub">{item.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main footer */}
      <div className="footer-main">
        <div className="footer-inner">
          {/* Brand */}
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-s">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M16 10a4 4 0 01-8 0" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
              <span>Zarq<b>Mart</b></span>
            </div>
            <p>Pakistan's premium online shopping destination. Quality products at unbeatable prices, delivered to your doorstep.</p>
            <div className="contact-info">
              <div><Phone size={14} /> +92 300 1234567</div>
              <div><Mail size={14} /> support@zarqmart.pk</div>
              <div><MapPin size={14} /> Lahore, Pakistan</div>
            </div>
            <div className="socials">
              <a href="#" aria-label="Facebook"><Facebook size={18} /></a>
              <a href="#" aria-label="Instagram"><Instagram size={18} /></a>
              <a href="#" aria-label="Twitter"><Twitter size={18} /></a>
              <a href="#" aria-label="Youtube"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Links */}
          <div className="footer-col">
            <h4>Quick Links</h4>
            <Link to="/">Home</Link>
            <Link to="/products">All Products</Link>
            <Link to="/">About Us</Link>
            <Link to="/">Contact Us</Link>
            <Link to="/">Blog</Link>
            <Link to="/">Careers</Link>
          </div>

          <div className="footer-col">
            <h4>Categories</h4>
            <Link to="/products?cat=Fashion">Fashion</Link>
            <Link to="/products?cat=Electronics">Electronics</Link>
            <Link to="/products?cat=Footwear">Footwear</Link>
            <Link to="/products?cat=Beauty">Beauty & Care</Link>
            <Link to="/products?cat=Bags">Bags & Accessories</Link>
            <Link to="/products?cat=Home">Home & Living</Link>
          </div>

          <div className="footer-col">
            <h4>Help & Support</h4>
            <Link to="/">Track My Order</Link>
            <Link to="/">Return Policy</Link>
            <Link to="/">Privacy Policy</Link>
            <Link to="/">Terms & Conditions</Link>
            <Link to="/">FAQs</Link>
            <Link to="/">Seller Support</Link>
          </div>

          {/* Newsletter */}
          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Get the latest deals and offers directly in your inbox.</p>
            <div className="newsletter-form">
              <input type="email" placeholder="Your email address" />
              <button>Subscribe</button>
            </div>
            <div className="payment-methods">
              <span>We Accept:</span>
              <div className="pay-icons">
                {['JazzCash', 'EasyPaisa', 'Visa', 'Mastercard'].map(p => (
                  <span key={p} className="pay-chip">{p}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <p>© 2025 ZarqMart. All rights reserved. Made with ❤️ in Pakistan</p>
        <p>Designed & Developed by ZarqMart Team</p>
      </div>
    </footer>
  )
}
