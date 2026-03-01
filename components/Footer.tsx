import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container-main py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">My Online Store</span>
            </div>
            <p className="text-sm leading-relaxed max-w-xs">
              Quality products, curated for you. Browse our collection and find exactly what you need.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="/" className="text-sm hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="/products" className="text-sm hover:text-white transition-colors">Products</Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm hover:text-white transition-colors">Categories</Link>
              </li>
              <li>
                <Link href="/reviews" className="text-sm hover:text-white transition-colors">Reviews</Link>
              </li>
            </ul>
          </div>

          {/* Powered By */}
          <div>
            <h4 className="text-white font-semibold mb-4">Powered By</h4>
            <ul className="space-y-2.5">
              <li>
                <a href="https://www.cosmicjs.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">
                  Cosmic CMS
                </a>
              </li>
              <li>
                <a href="https://nextjs.org" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">
                  Next.js
                </a>
              </li>
              <li>
                <a href="https://tailwindcss.com" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-white transition-colors">
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-8 text-center">
          <p className="text-sm">
            &copy; {currentYear} My Online Store. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}