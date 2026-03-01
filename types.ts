export interface CosmicObject {
  id: string
  slug: string
  title: string
  content?: string
  metadata: Record<string, unknown>
  type: string
  created_at: string
  modified_at: string
}

export interface CosmicImage {
  url: string
  imgix_url: string
}

export interface Category extends CosmicObject {
  type: 'categories'
  metadata: {
    name?: string
    description?: string
    image?: CosmicImage
  }
}

export interface Product extends CosmicObject {
  type: 'products'
  metadata: {
    name?: string
    description?: string
    image?: CosmicImage
    gallery?: CosmicImage[]
    price?: number
    sale_price?: number
    category?: Category
    inventory_status?: string
  }
}

export interface Review extends CosmicObject {
  type: 'reviews'
  metadata: {
    product?: Product
    reviewer_name?: string
    rating?: number
    comment?: string
  }
}

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error
}