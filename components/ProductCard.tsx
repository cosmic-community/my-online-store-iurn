import Link from 'next/link'
import type { Product } from '@/types'

interface ProductCardProps {
  product: Product
}

// Changed: Helper to safely call toLowerCase on any value
function safeToLowerCase(value: unknown): string {
  if (typeof value === 'string') return value.toLowerCase()
  return String(value ?? '').toLowerCase()
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = product.metadata?.price
  const salePrice = product.metadata?.sale_price
  const hasSale = salePrice && price && salePrice < price
  const discountPercent = hasSale ? Math.round(((price - salePrice) / price) * 100) : 0
  const image = product.metadata?.image
  const category = product.metadata?.category

  // Changed: Safely extract inventory_status as a string
  // select-dropdown metafields can return an object with key/value or a plain string
  const rawInventoryStatus = product.metadata?.inventory_status
  const inventoryStatus: string =
    typeof rawInventoryStatus === 'string'
      ? rawInventoryStatus
      : rawInventoryStatus && typeof rawInventoryStatus === 'object' && 'value' in rawInventoryStatus
        ? String((rawInventoryStatus as { value: unknown }).value ?? '')
        : rawInventoryStatus && typeof rawInventoryStatus === 'object' && 'key' in rawInventoryStatus
          ? String((rawInventoryStatus as { key: unknown }).key ?? '')
          : ''

  // Changed: Pre-compute lowercased version to avoid calling .toLowerCase() on non-strings
  const inventoryStatusLower = safeToLowerCase(inventoryStatus)

  // Changed: Safely extract category title as a string
  const categoryTitle: string =
    typeof category === 'string'
      ? category
      : category && typeof category === 'object' && 'title' in category
        ? String(category.title)
        : ''

  return (
    <Link href={`/products/${product.slug}`} className="group">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg hover:border-gray-300 transition-all duration-300">
        {/* Image */}
        <div className="relative aspect-square bg-gray-100 overflow-hidden">
          {image ? (
            <img
              src={`${image.imgix_url}?w=600&h=600&fit=crop&auto=format,compress`}
              alt={product.title}
              width={300}
              height={300}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          )}

          {/* Sale Badge */}
          {hasSale && (
            <span className="absolute top-3 left-3 px-2.5 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
              -{discountPercent}%
            </span>
          )}

          {/* Inventory Badge */}
          {/* Changed: Use pre-computed inventoryStatusLower */}
          {inventoryStatus && (
            <span
              className={`absolute top-3 right-3 px-2.5 py-1 text-xs font-medium rounded-full ${
                inventoryStatusLower.includes('in stock') || inventoryStatusLower.includes('in_stock') || inventoryStatusLower.includes('available')
                  ? 'bg-green-100 text-green-700'
                  : inventoryStatusLower.includes('low') || inventoryStatusLower.includes('limited')
                    ? 'bg-yellow-100 text-yellow-700'
                    : 'bg-red-100 text-red-700'
              }`}
            >
              {inventoryStatus}
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-4">
          {categoryTitle && (
            <span className="text-xs font-medium text-brand-600 uppercase tracking-wider">
              {categoryTitle}
            </span>
          )}
          <h3 className="text-base font-semibold text-gray-900 mt-1 group-hover:text-brand-600 transition-colors line-clamp-2">
            {product.title}
          </h3>

          {/* Price */}
          <div className="flex items-baseline gap-2 mt-3">
            {hasSale ? (
              <>
                <span className="text-lg font-bold text-brand-600">${salePrice.toFixed(2)}</span>
                <span className="text-sm text-gray-400 line-through">${price.toFixed(2)}</span>
              </>
            ) : price ? (
              <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
            ) : (
              <span className="text-sm text-gray-500">Price not available</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}