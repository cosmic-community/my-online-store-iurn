import Link from 'next/link'
import StarRating from '@/components/StarRating'
import type { Review } from '@/types'

interface ReviewCardProps {
  review: Review
  showProduct?: boolean
}

export default function ReviewCard({ review, showProduct = true }: ReviewCardProps) {
  const rating = review.metadata?.rating || 0
  const reviewerName = review.metadata?.reviewer_name || 'Anonymous'
  const comment = review.metadata?.comment || ''
  const product = review.metadata?.product

  const initials = reviewerName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow duration-300">
      {/* Header */}
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 bg-brand-100 text-brand-700 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-semibold text-gray-900 truncate">{reviewerName}</h4>
          <StarRating rating={rating} size="sm" />
        </div>
      </div>

      {/* Comment */}
      {comment && (
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">
          &ldquo;{comment}&rdquo;
        </p>
      )}

      {/* Linked Product */}
      {showProduct && product && (
        <Link
          href={`/products/${product.slug}`}
          className="flex items-center gap-3 pt-4 border-t border-gray-100 group"
        >
          {product.metadata?.image && (
            <img
              src={`${product.metadata.image.imgix_url}?w=80&h=80&fit=crop&auto=format,compress`}
              alt={product.title}
              width={40}
              height={40}
              className="w-10 h-10 rounded-lg object-cover"
            />
          )}
          <div className="flex-1 min-w-0">
            <span className="text-xs text-gray-500">Reviewed</span>
            <p className="text-sm font-medium text-gray-900 group-hover:text-brand-600 transition-colors truncate">
              {product.title}
            </p>
          </div>
          <svg className="w-4 h-4 text-gray-400 group-hover:text-brand-500 flex-shrink-0 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      )}
    </div>
  )
}