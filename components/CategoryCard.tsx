import Link from 'next/link'
import type { Category } from '@/types'

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const image = category.metadata?.image

  return (
    <Link href={`/categories/${category.slug}`} className="group">
      <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-[4/3] hover:shadow-xl transition-shadow duration-300">
        {image ? (
          <img
            src={`${image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
            alt={category.title}
            width={400}
            height={300}
            className="w-full h-full object-cover opacity-60 group-hover:opacity-50 group-hover:scale-105 transition-all duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-brand-500 to-brand-700 opacity-80" />
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <h3 className="text-xl font-bold text-white mb-1 group-hover:translate-y-[-2px] transition-transform duration-300">
            {category.title}
          </h3>
          {category.metadata?.description && (
            <p className="text-sm text-gray-300 line-clamp-2">
              {category.metadata.description}
            </p>
          )}
          <span className="inline-flex items-center text-sm text-brand-300 font-medium mt-3 group-hover:text-brand-200 transition-colors">
            Browse Products
            <svg className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  )
}