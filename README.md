# 🛒 ZarqMart — E-Commerce Shopping App

> A modern, responsive e-commerce web application built with React + Vite. Browse products, manage your cart, and enjoy a smooth shopping experience.

---

## 📸 Overview

ZarqMart is a fully functional front-end shopping app featuring product listings, detailed product pages, a wishlist system, and a shopping cart — all built with React 18 and styled with custom CSS.

---

## ✨ Features

- 🏠 **Home Page** — Hero banner, featured products, and trending items
- 🛍️ **Products Page** — Browse all products with category filtering
- 📄 **Product Detail Page** — View full details, select color/size, and add to cart
- 🛒 **Shopping Cart** — Add, remove, and update item quantities
- ❤️ **Wishlist** — Save favourite products with a toggle
- 📱 **Responsive Design** — Works on mobile, tablet, and desktop
- 🔍 **Search Bar** — Search products from the Navbar
- 🎨 **Smooth Animations** — Scroll-reveal effects with IntersectionObserver

---

## 🗂️ Project Structure

```
saruhmart/
├── index.html
├── vite.config.js
├── package.json
└── src/
    ├── main.jsx
    ├── App.jsx              # Root component — routing & global state
    ├── App.css
    ├── index.css
    ├── components/
    │   ├── Navbar.jsx       # Top navigation with search & cart count
    │   ├── Navbar.css
    │   ├── Footer.jsx       # Site footer
    │   ├── Footer.css
    │   ├── ProductCard.jsx  # Reusable product card
    │   └── ProductCard.css
    ├── pages/
    │   ├── Home.jsx         # Landing page
    │   ├── Home.css
    │   ├── Products.jsx     # All products listing
    │   ├── Products.css
    │   ├── ProductDetail.jsx # Single product view
    │   ├── ProductDetail.css
    │   ├── Cart.jsx         # Shopping cart
    │   └── Cart.css
    └── data/
        ├── products.js      # Product data (id, name, price, category, etc.)
        └── index.js
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React 18** | UI framework |
| **Vite 5** | Build tool & dev server |
| **React Router DOM v6** | Client-side routing |
| **Lucide React** | Icons |
| **Custom CSS** | Styling (no UI library) |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** (v16 or above) installed.

### Installation

```bash
# 1. Clone or extract the project
cd saruhmart

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will run at **http://localhost:5173**

### Build for Production

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server (hot reload) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |

---

## 🛍️ Product Categories

The app includes products across these categories:

- 👗 **Fashion** — Kurtas, clothing items
- 📱 **Electronics** — Earbuds, gadgets
- 👜 **Bags** — Handbags, accessories
- *(More can be added via `src/data/products.js`)*

---

## 🔧 How to Add Products

Open `src/data/products.js` and add a new object to the `products` array:

```js
{
  id: 10,                          // Unique ID
  name: "Your Product Name",
  category: "Electronics",         // Category label
  price: 1999,                     // Sale price (PKR)
  originalPrice: 3500,             // Original price
  rating: 4.5,                     // Rating out of 5
  reviews: 50,                     // Number of reviews
  image: "https://...",            // Product image URL
  badge: "New",                    // Optional badge (New / Hot Deal / Best Seller)
  description: "Product details...",
  colors: ["Black", "White"],      // Available colors
  sizes: ["S", "M", "L"],         // Leave empty [] if not applicable
}
```

---

## 🧠 State Management

Global state is managed in `App.jsx` using React `useState` and passed as props:

| State | Description |
|---|---|
| `cartItems` | Array of products added to cart (with `qty`) |
| `wishlist` | Array of product IDs saved to wishlist |

Key functions:
- `addToCart(product)` — Adds item or increments quantity
- `removeFromCart(id)` — Removes item from cart
- `updateQty(id, qty)` — Updates item quantity
- `toggleWishlist(id)` — Adds or removes from wishlist

---

## 📄 Pages & Routes

| Route | Page | Description |
|---|---|---|
| `/` | Home | Hero section + featured & trending products |
| `/products` | Products | Full product listing with filters |
| `/product/:id` | Product Detail | Single product view |
| `/cart` | Cart | Shopping cart with totals |

---

## 📝 License

This project is for educational/personal use.

---

*Built with ❤️ using React & Vite*
