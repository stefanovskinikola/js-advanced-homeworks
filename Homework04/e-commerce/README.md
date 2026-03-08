# 🛒 GoodsVault — E-Commerce Website Prototype

An interactive e-commerce storefront prototype built with **HTML5**, **CSS3**, **Bootstrap 5**, and **Vanilla JavaScript (ES6+)**. Product data is fetched live from the [DummyJSON API](https://dummyjson.com).

---

## 🔌 API Used

| API       | Base URL                | Notes                                                   |
| --------- | ----------------------- | ------------------------------------------------------- |
| DummyJSON | `https://dummyjson.com` | Supports search, categories, pagination, single product |

### API Calls Made

1. **`GET /products?limit=12&skip=0`** — Fetch paginated products
2. **`GET /products/categories`** — Fetch all categories
3. **`GET /products/category/{slug}`** — Fetch products by category
4. **`GET /products/search?q=...`** — Search products by keyword
5. **`GET /products/{id}`** — Fetch single product detail

---

## ✨ Features

- **Hero Carousel** with animated slides and call-to-action buttons
- **Product Listing** with grid layout and responsive cards
- **Filter by Category** using the API's category endpoint
- **Search** products via the API's search endpoint
- **Sort** by price (low→high, high→low), rating, or name
- **Pagination** with API-powered `limit`/`skip` params
- **Product Detail Modal** with image gallery and quantity selector
- **Shopping Cart** (offcanvas sidebar):
  - Add / remove / update quantity
  - Stock-limit awareness
  - Subtotal and shipping calculation
  - `localStorage` persistence
  - Real-time badge updates
  - Empty state with "Continue Shopping"
- **Multi-Step Checkout** (Shipping → Review → Confirmation)
  - Client-side form validation
  - Order summary & totals
  - EmailJS integration for confirmation emails
- **Toast Notifications** for user feedback
- **Loading Skeletons** while data is fetched
- **Error States** with retry button
- **Responsive Design** (mobile-first with Bootstrap 5)
- **Best Deals Section** highlighting top-discount products
- **Active Navigation Highlighting** — scroll-aware nav links with animated underline
- **Back-to-Top** floating button
- **XSS Prevention** — all DOM rendering uses `createElement`/`appendChild`
- **Fetch Timeout** — API calls abort after 10s via `AbortSignal.timeout`

---

## 🛠 Technologies

| Technology                                 | Purpose                                      |
| ------------------------------------------ | -------------------------------------------- |
| HTML5                                      | Semantic markup                              |
| CSS3                                       | Custom properties, animations                |
| JavaScript ES6+                            | Modules, async/await, classes, destructuring |
| [Bootstrap 5](https://getbootstrap.com/)   | Responsive grid, components, utilities       |
| [Font Awesome 6](https://fontawesome.com/) | Icons                                        |
| [EmailJS](https://www.emailjs.com/)        | Order confirmation emails (no backend)       |
| [DummyJSON](https://dummyjson.com/)        | Product REST API                             |

---

## 🏗 Architecture

The codebase follows a **modular MVC-like** pattern. Every layer has a single responsibility:

| Layer           | Folder            | Role                                                                    |
| --------------- | ----------------- | ----------------------------------------------------------------------- |
| **Entry point** | `js/main.js`      | Wires services, controllers & events                                    |
| **State**       | `js/state.js`     | Centralized mutable application state                                   |
| **Models**      | `js/models/`      | `Product` and `CartItem` data classes                                   |
| **Services**    | `js/services/`    | API calls (`apiService`) and cart logic (`cartService`)                 |
| **Controllers** | `js/controllers/` | Product loading, cart bridging, checkout flow, UI helpers, event wiring |
| **Renders**     | `js/renders/`     | Pure DOM-rendering functions (grouped by feature)                       |
| **Utilities**   | `js/utils/`       | Safe DOM helpers (`dom.js`), cached DOM refs (`domRefs.js`), formatters |
| **Config**      | `js/config.js`    | API URLs, EmailJS keys, shipping thresholds                             |
| **CSS**         | `css/style.css`   | Entry point (`@import` chain) → `base/` + `components/` partials        |

---

## 📦 Project Structure

```
├── index.html                  # Single-page HTML shell
├── css/
│   ├── style.css               # CSS entry point (@import chain)
│   ├── base/
│   │   ├── reset.css           # Global reset, typography, forms
│   │   ├── utilities.css       # Utility classes
│   │   └── responsive.css      # Media-query breakpoints
│   └── components/
│       ├── navbar.css
│       ├── hero.css
│       ├── product-card.css
│       ├── product-detail.css
│       ├── cart.css
│       ├── checkout.css
│       ├── footer.css
│       └── back-to-top.css
├── js/
│   ├── main.js                 # App entry point
│   ├── config.js               # API URLs, EmailJS keys, constants
│   ├── state.js                # Shared mutable application state
│   ├── models/
│   │   ├── Product.js          # Product data model
│   │   └── CartItem.js         # Cart item model
│   ├── services/
│   │   ├── apiService.js       # All fetch() calls (with timeout)
│   │   └── cartService.js      # Cart state management + localStorage
│   ├── controllers/
│   │   ├── productController.js  # Loading, sorting, categories, detail modal
│   │   ├── cartController.js     # Cart → render bridge
│   │   ├── checkoutController.js # Multi-step checkout + EmailJS
│   │   ├── uiController.js       # Nav highlighting, back-to-top, search clearing
│   │   └── eventBindings.js      # All DOM event wiring
│   ├── renders/
│   │   ├── productRenders.js       # Product grid, skeletons, categories, results count
│   │   ├── productDetailRenders.js # Product detail modal content
│   │   ├── cartRenders.js          # Cart panel, empty cart, badge
│   │   ├── checkoutRenders.js      # Shipping summary, order items, totals
│   │   ├── paginationRenders.js    # Pagination controls
│   │   └── feedback.js             # Toast notifications, error toggle
│   └── utils/
│       ├── dom.js              # Safe createElement helpers (XSS-free)
│       ├── domRefs.js          # Cached getElementById references
│       └── formatters.js       # Pure formatting utilities
└── README.md
```

---

## 📝 License

This project is for educational purposes.
