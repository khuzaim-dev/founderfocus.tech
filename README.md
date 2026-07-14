# FounderFocus — Signal for Builders

`founderfocus.tech` is a live field manual and news aggregator designed for developers, operators, and builders navigating the next software economy. It curates high-signal insights on Artificial Intelligence, software engineering, and startup operations, eliminating the noise of traditional social feeds.

## 🚀 Key Features

- **Live Ticker:** A real-time, looping horizontal news tick marquee displaying the latest developer announcements and platform moves.
- **X Threads Marquee:** A true infinite, CSS-animated marquee container pulling curated developer discussions directly from X (Twitter) using the `react-fast-marquee` library. Supports hover-to-pause and fully interactive link clicks / video playbacks.
- **Headless WordPress Integration:** Dynamically pulls posts, authors, and category taxonomies from a WordPress REST API.
- **Fluid & Responsive Typography:** Uses CSS `clamp()` calculations to automatically scale titles, headers, and body text beautifully across all viewport sizes—from high-definition desktop monitors down to tiny `300px` mobile devices.
- **Hamburger Mobile Nav Menu:** Collapses navigation links into a sleek sliding hamburger dropdown drawer under `900px` screen widths.
- **Premium Tech Aesthetic:** Features a custom CSS variables design system, matrix-style dotted hover background effects, high-contrast typography (Geist Mono and Manrope), and structural layout grid wrapping.

---

## 🛠️ Tech Stack

- **Framework:** Next.js (React App Router)
- **Styling:** Custom CSS + CSS Variable System (`globals.css`)
- **Marquee Slider:** `react-fast-marquee`
- **Typographic Engine:** Native fluid font scaling via CSS `clamp()`
- **Headless Integration:** Custom WordPress API Service client (`/services/posts.ts` & `/lib/wordpress.ts`)

---

## 📦 Project Structure

```
├── app/
│   ├── blog/
│   │   └── [slug]/          # Single article details page
│   ├── category/
│   │   └── [slug]/          # Category list grid page
│   ├── globals.css          # Core CSS variables, typography and animations
│   ├── layout.tsx           # Global site layout structure
│   └── page.tsx             # Homepage structure
├── components/
│   ├── blog/
│   │   ├── ArticleCard.tsx  # Dynamic article feed cards
│   │   ├── ArticleGrid.tsx  # Grid wrapper layout
│   │   ├── FeaturedCard.tsx # Sticky editorial content
│   │   └── SponsorCard.tsx  # Sticky sponsor slot
│   ├── home/
│   │   ├── Hero.tsx         # Responsive headline banner
│   │   ├── StatusPanel.tsx  # Live builder stats dashboard
│   │   └── Ticker.tsx       # Live feed headline ticker
│   ├── layout/
│   │   ├── Header.tsx       # Responsive header with mobile hamburger drawer
│   │   └── Footer.tsx       # Aligned widescreen layout shell
│   └── twitter/
│       ├── TweetCarousel.tsx# Marquee wrapper using react-fast-marquee
│       └── TweetMarquee.tsx # Legacy CSS marquee container
├── services/                # WordPress data fetching functions
└── utils/                   # SEO JSON-LD builders and date formatters
```

---

## 🏃 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
Create a `.env.local` file at the root if custom headless WordPress API endpoints are needed.

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view it locally.

### 4. Build for Production
```bash
npm run build
npm start
```
