'use client'
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function Home() {
  const { getCartCount } = useCart();
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold text-gray-900">
              TheFineThings
            </Link>
            
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-900 hover:text-gray-600 font-medium">Home</Link>
              <Link href="/shop" className="text-gray-800 hover:text-gray-900 font-medium">Shop</Link>
              <Link href="/about" className="text-gray-800 hover:text-gray-900 font-medium">About</Link>
              <Link href="/contact" className="text-gray-800 hover:text-gray-900 font-medium">Contact</Link>
              <Link href="/track-order" className="text-gray-800 hover:text-gray-900 font-medium">Track Order</Link>
              <Link href="/cart" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 relative font-medium">
                Cart ({getCartCount()})
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Welcome to <span className="text-black">TheFineThings</span>
          </h1>
          <p className="text-xl text-gray-800 mb-8 max-w-3xl mx-auto">
            Your premium clothing boutique. Discover curated fashion pieces that celebrate your unique style. 
            From elegant dresses to casual wear, we have everything you need to look and feel amazing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/shop"
              className="bg-black text-white px-8 py-4 rounded-md hover:bg-gray-800 transition-colors text-lg font-medium"
            >
              Shop Collection
            </Link>
            <Link 
              href="/track-order"
              className="border-2 border-black text-black px-8 py-4 rounded-md hover:bg-black hover:text-white transition-colors text-lg font-medium"
            >
              Track Your Order
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-800 max-w-2xl mx-auto">
              Explore our carefully curated collections
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/shop?category=dresses" className="group">
              <div className="aspect-square bg-gradient-to-br from-pink-100 to-pink-200 rounded-lg overflow-hidden group-hover:shadow-lg transition-shadow">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">👗</div>
                    <h3 className="text-lg font-semibold text-gray-900">Dresses</h3>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/shop?category=tops" className="group">
              <div className="aspect-square bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg overflow-hidden group-hover:shadow-lg transition-shadow">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">👚</div>
                    <h3 className="text-lg font-semibold text-gray-900">Tops</h3>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/shop?category=bottoms" className="group">
              <div className="aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-lg overflow-hidden group-hover:shadow-lg transition-shadow">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">👖</div>
                    <h3 className="text-lg font-semibold text-gray-900">Bottoms</h3>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/shop?category=outerwear" className="group">
              <div className="aspect-square bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg overflow-hidden group-hover:shadow-lg transition-shadow">
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🧥</div>
                    <h3 className="text-lg font-semibold text-gray-900">Outerwear</h3>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose TheFineThings?</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🛍️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Easy Online Shopping</h3>
              <p className="text-gray-800">Browse our collection, add to cart, and checkout with ease. Simple and secure shopping experience.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🚚</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery & Tracking</h3>
              <p className="text-gray-800">Quick delivery with real-time order tracking. Know exactly when your package will arrive.</p>
            </div>
            
            <div className="text-center">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Premium Quality</h3>
              <p className="text-gray-800">Carefully selected pieces with attention to quality, style, and comfort.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Discover Your Style?</h2>
          <p className="text-gray-300 mb-8 text-lg">Join our community and stay updated with the latest fashion trends</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/shop"
              className="bg-white text-black px-8 py-4 rounded-md hover:bg-gray-100 transition-colors font-medium"
            >
              Start Shopping
            </Link>
            <Link 
              href="/track-order"
              className="border border-white text-white px-8 py-4 rounded-md hover:bg-white hover:text-black transition-colors font-medium"
            >
              Track Existing Order
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">TheFineThings</h3>
              <p className="text-gray-400 mb-4">
                Premium clothing boutique offering curated fashion pieces for the modern woman.
              </p>
              <p className="text-gray-400">
                Email: hello@thefinethings.com<br/>
                Phone: (233) 550-117-514
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/shop" className="hover:text-white transition-colors">Shop All</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link href="/track-order" className="hover:text-white transition-colors">Track Order</Link></li>
                <li><Link href="/cart" className="hover:text-white transition-colors">Shopping Cart</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="space-y-2">
                <a 
                  href="https://www.instagram.com/thefinethings.store?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @thefinethings.store
                </a>
              </div>
              <h4 className="font-semibold mb-4 mt-6">Customer Service</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Shipping Information</li>
                <li>Returns & Exchanges</li>
                <li>Size Guide</li>
                <li>Contact Support</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 TheFineThings. All rights reserved.</p>
            <div className="flex items-center justify-center mt-4">
              <span className="text-gray-500 text-sm mr-2">Developed by</span>
              <div className="flex items-center">
                <div className="bg-white rounded-lg p-2 mr-3">
                  <img 
                    src="/developer_logo.png" 
                    alt="DM Logo" 
                    className="h-8 w-8 object-contain"
                    onError={(e) => {
                      // Fallback to text if image not found
                      const target = e.currentTarget as HTMLImageElement;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'block';
                    }}
                  />
                  <div className="text-blue-900 font-bold text-lg hidden">DM</div>
                </div>
                <span className="text-white font-medium">Der Meister Nyamekye's IT Solutions</span>
              </div>
            </div>
            <p className="text-blue-400 text-sm mt-1">Just think. We build.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
