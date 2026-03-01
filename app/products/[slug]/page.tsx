// app/products/[slug]/page.tsx
import { getProductBySlug, getReviewsByProduct, getProducts } from '@/lib/cosmic'
import StarRating from '@/components/StarRating'
import ReviewCard from '@/components/ReviewCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface ProductPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) {
    return { title: 'Product Not Found | My Online Store' }
  }
  return {
    title: `${product.title} | My Online Store`,
    description: product.metadata?.description || `View details for ${product.title}`
  }
}

export async function generateStaticParams() {
  const products = await getProducts()
  return products.map((product) => ({ slug: product.slug }))
}

// Changed: Helper to safely extract a string from a select-dropdown metafield (object or string)
function extractDropdownString(value: unknown): string {
  if (typeof value === 'string') return value
  if (value && typeof value === 'object' && 'value' in value) {
    return String((value as { value: string }).value)
  }
  if (value && typeof value === 'object' && 'key' in value) {
    return String((value as { key: string }).key)
  }
  return ''
}

// Changed: Helper to safely extract a numeric rating from a select-dropdown metafield
function extractRatingNumber(value: unknown): number {
  if (typeof value === 'number') return value
  if (typeof value === 'string') {
    const parsed = parseFloat(value)
    return isNaN(parsed) ? 0 : parsed
  }
  if (value && typeof value === 'object' && 'value' in value) {
    const parsed = parseFloat(String((value as { value: string }).value))
    return isNaN(parsed) ? 0 : parsed
  }
  if (value && typeof value === 'object' && 'key' in value) {
    const parsed = parseFloat(String((value as { key: string }).key))
    return isNaN(parsed) ? 0 : parsed
  }
  return 0
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const reviews = await getReviewsByProduct(product.id)

  const price = product.metadata?.price
  const salePrice = product.metadata?.sale_price
  const hasSale = salePrice && price && salePrice < price
  const discountPercent = hasSale ? Math.round(((price - salePrice) / price) * 100) : 0
  // Changed: Safely extract inventory_status as a string from select-dropdown object
  const inventoryStatus = extractDropdownString(product.metadata?.inventory_status) || 'Unknown'
  const category = product.metadata?.category
  const mainImage = product.metadata?.image
  const gallery = product.metadata?.gallery || []

  // Changed: Safely extract rating as a number from select-dropdown object
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + extractRatingNumber(r.metadata?.rating), 0) / reviews.length
    : 0

  return (
    <div className="container-main py-12 md:py-16">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <Link href="/products" className="hover:text-brand-600 transition-colors">Products</Link>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-900 font-medium truncate max-w-[200px]">{product.title}</span>
      </div>

      {/* Product Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Image Section */}
        <div>
          {mainImage ? (
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 mb-4">
              <img
                src={`${mainImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="aspect-square rounded-2xl bg-gray-100 flex items-center justify-center mb-4">
              <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Gallery Thumbnails */}
          {gallery.length > 0 && (
            <div className="grid grid-cols-4 gap-3">
              {gallery.map((img, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden bg-gray-100 border-2 border-transparent hover:border-brand-400 transition-colors cursor-pointer">
                  <img
                    src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                    alt={`${product.title} gallery ${index + 1}`}
                    width={150}
                    height={150}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Info Section */}
        <div>
          {category && typeof category === 'object' && 'slug' in category && (
            <Link
              href={`/categories/${category.slug}`}
              className="inline-block text-sm font-medium text-brand-600 bg-brand-50 px-3 py-1 rounded-full hover:bg-brand-100 transition-colors mb-4"
            >
              {category.title}
            </Link>
          )}

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{product.title}</h1>

          {/* Rating */}
          {reviews.length > 0 && (
            <div className="flex items-center gap-3 mb-6">
              <StarRating rating={averageRating} />
              <span className="text-sm text-gray-500">
                {averageRating.toFixed(1)} ({reviews.length} {reviews.length === 1 ? 'review' : 'reviews'})
              </span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-baseline gap-3 mb-6">
            {hasSale ? (
              <>
                <span className="text-3xl font-bold text-brand-600">${salePrice.toFixed(2)}</span>
                <span className="text-xl text-gray-400 line-through">${price.toFixed(2)}</span>
                <span className="px-2.5 py-0.5 bg-red-100 text-red-700 text-sm font-semibold rounded-full">
                  -{discountPercent}%
                </span>
              </>
            ) : price ? (
              <span className="text-3xl font-bold text-gray-900">${price.toFixed(2)}</span>
            ) : (
              <span className="text-xl text-gray-500">Price not available</span>
            )}
          </div>

          {/* Inventory Status */}
          <div className="flex items-center gap-2 mb-8">
            <span
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${
                inventoryStatus.toLowerCase().includes('in stock') || inventoryStatus.toLowerCase().includes('in_stock') || inventoryStatus.toLowerCase().includes('available')
                  ? 'bg-green-100 text-green-700'
                  : inventoryStatus.toLowerCase().includes('low') || inventoryStatus.toLowerCase().includes('limited')
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
              }`}
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  inventoryStatus.toLowerCase().includes('in stock') || inventoryStatus.toLowerCase().includes('in_stock') || inventoryStatus.toLowerCase().includes('available')
                    ? 'bg-green-500'
                    : inventoryStatus.toLowerCase().includes('low') || inventoryStatus.toLowerCase().includes('limited')
                      ? 'bg-yellow-500'
                      : 'bg-red-500'
                }`}
              />
              {inventoryStatus}
            </span>
          </div>

          {/* Description */}
          {product.metadata?.description && (
            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
                {product.metadata.description}
              </p>
            </div>
          )}

          {/* Content */}
          {product.content && (
            <div
              className="prose prose-gray max-w-none mb-8"
              dangerouslySetInnerHTML={{ __html: product.content }}
            />
          )}
        </div>
      </div>

      {/* Reviews Section */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Customer Reviews
          {reviews.length > 0 && (
            <span className="text-lg font-normal text-gray-500 ml-2">({reviews.length})</span>
          )}
        </h2>

        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <svg className="w-12 h-12 mx-auto text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            <p className="text-gray-500">No reviews yet for this product.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} showProduct={false} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}