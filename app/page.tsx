import Link from 'next/link'
import { getProducts, getCategories, getReviews } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import CategoryCard from '@/components/CategoryCard'
import ReviewCard from '@/components/ReviewCard'

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getProducts(),
    getCategories(),
    getReviews()
  ])

  const featuredProducts = products.slice(0, 4)
  const latestReviews = reviews
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3)

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=800&fit=crop&auto=format,compress')] bg-cover bg-center opacity-20" />
        <div className="relative container-main py-24 md:py-36">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1.5 bg-brand-500/20 text-brand-300 text-sm font-medium rounded-full mb-6 border border-brand-500/30">
              Welcome to our store
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight mb-6">
              Discover Quality <br />
              <span className="text-brand-400">Products</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-10 leading-relaxed max-w-lg">
              Browse our curated collection of premium products. Quality craftsmanship meets modern design.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center px-8 py-3.5 bg-brand-500 hover:bg-brand-600 text-white font-semibold rounded-lg transition-colors duration-200 shadow-lg shadow-brand-500/25"
              >
                Shop Now
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors duration-200 border border-white/20"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="container-main py-16 md:py-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-brand-500 font-semibold text-sm uppercase tracking-wider">Shop by</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">Categories</h2>
            </div>
            <Link
              href="/categories"
              className="hidden sm:inline-flex items-center text-brand-600 hover:text-brand-700 font-medium transition-colors"
            >
              View All
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="bg-white py-16 md:py-24">
          <div className="container-main">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="text-brand-500 font-semibold text-sm uppercase tracking-wider">Handpicked</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">Featured Products</h2>
              </div>
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center text-brand-600 hover:text-brand-700 font-medium transition-colors"
              >
                View All
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      {latestReviews.length > 0 && (
        <section className="container-main py-16 md:py-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <span className="text-brand-500 font-semibold text-sm uppercase tracking-wider">What customers say</span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-1">Latest Reviews</h2>
            </div>
            <Link
              href="/reviews"
              className="hidden sm:inline-flex items-center text-brand-600 hover:text-brand-700 font-medium transition-colors"
            >
              View All
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestReviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-brand-500 to-brand-600 text-white">
        <div className="container-main py-16 md:py-20 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to explore?</h2>
          <p className="text-brand-100 text-lg mb-8 max-w-xl mx-auto">
            Discover our full catalog of quality products and find exactly what you&#39;re looking for.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-8 py-3.5 bg-white text-brand-600 font-semibold rounded-lg hover:bg-gray-100 transition-colors shadow-lg"
          >
            Browse All Products
          </Link>
        </div>
      </section>
    </div>
  )
}