// app/categories/[slug]/page.tsx
import { getCategoryBySlug, getProductsByCategory, getCategories } from '@/lib/cosmic'
import ProductCard from '@/components/ProductCard'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface CategoryPageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)
  if (!category) {
    return { title: 'Category Not Found | My Online Store' }
  }
  return {
    title: `${category.title} | My Online Store`,
    description: category.metadata?.description || `Browse products in ${category.title}`
  }
}

export async function generateStaticParams() {
  const categories = await getCategories()
  return categories.map((category) => ({ slug: category.slug }))
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategoryBySlug(slug)

  if (!category) {
    notFound()
  }

  const products = await getProductsByCategory(category.id)
  const categoryImage = category.metadata?.image

  return (
    <div>
      {/* Category Hero */}
      <div className="relative bg-gray-900 text-white overflow-hidden">
        {categoryImage && (
          <div className="absolute inset-0">
            <img
              src={`${categoryImage.imgix_url}?w=1920&h=600&fit=crop&auto=format,compress`}
              alt={category.title}
              width={1920}
              height={400}
              className="w-full h-full object-cover opacity-30"
            />
          </div>
        )}
        <div className="relative container-main py-16 md:py-24">
          <div className="flex items-center gap-2 text-sm text-gray-300 mb-4">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <Link href="/categories" className="hover:text-white transition-colors">Categories</Link>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-white font-medium">{category.title}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-3">{category.title}</h1>
          {category.metadata?.description && (
            <p className="text-gray-300 text-lg max-w-2xl">{category.metadata.description}</p>
          )}
          <p className="text-gray-400 mt-4">
            {products.length} {products.length === 1 ? 'product' : 'products'}
          </p>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container-main py-12 md:py-16">
        {products.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No products in this category</h3>
            <p className="text-gray-500 mb-6">Check back later or browse other categories.</p>
            <Link
              href="/categories"
              className="inline-flex items-center px-6 py-2.5 bg-brand-500 text-white font-medium rounded-lg hover:bg-brand-600 transition-colors"
            >
              Browse Categories
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}