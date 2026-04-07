import React, { useState, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Filter, ChevronDown, Grid, List, SlidersHorizontal } from 'lucide-react'
import ProductCard from '../components/ProductCard'
import { products, categories } from '../data/products'
import './Products.css'

const SORT_OPTIONS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
  { value: 'discount', label: 'Biggest Discount' },
]

export default function Products({ addToCart, wishlist, toggleWishlist }) {
  const [searchParams] = useSearchParams()
  const [selectedCat, setSelectedCat] = useState(searchParams.get('cat') || 'All')
  const [sort, setSort] = useState('default')
  const [priceRange, setPriceRange] = useState([0, 15000])
  const [filterOpen, setFilterOpen] = useState(false)
  const [view, setView] = useState('grid')

  const filtered = useMemo(() => {
    let result = [...products]
    if (selectedCat !== 'All') result = result.filter(p => p.category === selectedCat)
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1])
    switch (sort) {
      case 'price-asc': return result.sort((a, b) => a.price - b.price)
      case 'price-desc': return result.sort((a, b) => b.price - a.price)
      case 'rating': return result.sort((a, b) => b.rating - a.rating)
      case 'discount': return result.sort((a, b) => (b.originalPrice - b.price) / b.originalPrice - (a.originalPrice - a.price) / a.originalPrice)
      default: return result
    }
  }, [selectedCat, sort, priceRange])

  const allCats = ['All', ...categories.map(c => c.name)]

  return (
    <div className="products-page">
      <div className="products-hero">
        <div className="products-hero-inner">
          <h1>All Products</h1>
          <p>Discover amazing deals across all categories</p>
        </div>
      </div>

      <div className="products-layout container">
        {/* Sidebar */}
        <aside className={`sidebar ${filterOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <h3><SlidersHorizontal size={16} /> Filters</h3>
            <button className="close-filter" onClick={() => setFilterOpen(false)}>✕</button>
          </div>

          {/* Categories */}
          <div className="filter-group">
            <h4>Categories</h4>
            {allCats.map(cat => (
              <label key={cat} className={`filter-option ${selectedCat === cat ? 'active' : ''}`}>
                <input
                  type="radio"
                  name="category"
                  checked={selectedCat === cat}
                  onChange={() => setSelectedCat(cat)}
                />
                <span>{cat}</span>
                <span className="count">
                  {cat === 'All' ? products.length : products.filter(p => p.category === cat).length}
                </span>
              </label>
            ))}
          </div>

          {/* Price Range */}
          <div className="filter-group">
            <h4>Price Range</h4>
            <div className="price-display">
              <span>Rs. {priceRange[0].toLocaleString()}</span>
              <span>Rs. {priceRange[1].toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={0}
              max={15000}
              step={100}
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], +e.target.value])}
              className="range-slider"
            />
          </div>

          {/* Rating Filter */}
          <div className="filter-group">
            <h4>Minimum Rating</h4>
            {[4.5, 4.0, 3.5, 3.0].map(r => (
              <label key={r} className="filter-option">
                <input type="radio" name="rating" />
                <span>{'⭐'.repeat(Math.floor(r))} {r}+</span>
              </label>
            ))}
          </div>
        </aside>

        {/* Overlay */}
        {filterOpen && <div className="sidebar-overlay" onClick={() => setFilterOpen(false)} />}

        {/* Main */}
        <div className="products-main">
          {/* Toolbar */}
          <div className="toolbar">
            <div className="toolbar-left">
              <button className="filter-toggle-btn" onClick={() => setFilterOpen(true)}>
                <Filter size={16} /> Filters
              </button>
              <span className="result-count"><strong>{filtered.length}</strong> products found</span>
            </div>
            <div className="toolbar-right">
              <div className="sort-select">
                <select value={sort} onChange={e => setSort(e.target.value)}>
                  {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
                <ChevronDown size={14} />
              </div>
              <div className="view-toggle">
                <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}><Grid size={16} /></button>
                <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><List size={16} /></button>
              </div>
            </div>
          </div>

          {/* Category Pills */}
          <div className="cat-pills">
            {allCats.map(cat => (
              <button
                key={cat}
                className={`cat-pill ${selectedCat === cat ? 'active' : ''}`}
                onClick={() => setSelectedCat(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">🔍</div>
              <h3>No products found</h3>
              <p>Try adjusting your filters</p>
              <button onClick={() => { setSelectedCat('All'); setPriceRange([0, 15000]) }} className="reset-btn">
                Reset Filters
              </button>
            </div>
          ) : (
            <div className={`products-grid ${view === 'list' ? 'list-view' : ''}`}>
              {filtered.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  addToCart={addToCart}
                  wishlist={wishlist}
                  toggleWishlist={toggleWishlist}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
