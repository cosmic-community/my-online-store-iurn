# My Online Store

![My Online Store](https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1200&h=300&fit=crop&auto=format)

A modern, responsive e-commerce storefront built with Next.js 16 and Cosmic CMS. Browse products by category, view detailed product pages with image galleries, and read customer reviews — all powered by your Cosmic content.

## Features

- 🛍️ **Product Catalog** — Full product listing with search, category filtering, and sorting
- 📂 **Category Pages** — Browse products organized by category with visual cards
- ⭐ **Customer Reviews** — Star ratings and testimonials linked to products
- 💰 **Sale Pricing** — Visual price comparisons with discount percentage badges
- 📦 **Inventory Status** — Real-time stock availability indicators
- 🖼️ **Image Gallery** — Product detail pages with multiple images
- 📱 **Fully Responsive** — Beautiful on mobile, tablet, and desktop
- 🔍 **Search & Filter** — Find products quickly with built-in search
- ⚡ **Server-Side Rendering** — Fast page loads with Next.js 16 App Router

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](http://localhost:3040/projects/new?clone_bucket=69a4805e0aa1495df3c23c0c&clone_repository=69a481b90aa1495df3c23c37)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews."

### Code Generation Prompt

> "Build a Next.js application for an online business called 'My Online Store'. The content is managed in Cosmic CMS with the following object types: categories, products, reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [Cosmic](https://www.cosmicjs.com/docs) — Headless CMS for content management
- [Tailwind CSS](https://tailwindcss.com/) — Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) — Type-safe JavaScript

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with content configured

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   bun install
   ```
3. Set up environment variables:
   ```
   COSMIC_BUCKET_SLUG=your-bucket-slug
   COSMIC_READ_KEY=your-read-key
   COSMIC_WRITE_KEY=your-write-key
   ```
4. Run the development server:
   ```bash
   bun dev
   ```

## Cosmic SDK Examples

### Fetching Products
```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)
```

### Fetching a Single Product by Slug
```typescript
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'my-product' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

### Fetching Reviews for a Product
```typescript
const { objects: reviews } = await cosmic.objects
  .find({ type: 'reviews', 'metadata.product': productId })
  .props(['id', 'title', 'metadata'])
  .depth(1)
```

## Cosmic CMS Integration

This application uses three content types from Cosmic:

| Object Type | Fields | Description |
|-------------|--------|-------------|
| **Products** | name, description, image, gallery, price, sale_price, category, inventory_status | Product catalog items |
| **Categories** | name, description, image | Product categorization |
| **Reviews** | product, reviewer_name, rating, comment | Customer reviews |

## Deployment Options

### Vercel (Recommended)
1. Push to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Netlify
1. Push to GitHub
2. Import project in [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy
<!-- README_END -->