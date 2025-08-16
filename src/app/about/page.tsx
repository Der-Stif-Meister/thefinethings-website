'use client'
import Link from "next/link";
import { useCart } from "@/lib/cart-context";

export default function About() {
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
              <Link href="/" className="text-gray-800 hover:text-gray-900 font-medium">Home</Link>
              <Link href="/shop" className="text-gray-800 hover:text-gray-900 font-medium">Shop</Link>
              <Link href="/about" className="text-gray-900 hover:text-gray-600 font-medium border-b-2 border-black">About</Link>
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
      <section className="bg-gradient-to-br from-gray-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-black">TheFineThings</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              Where elegance meets affordability, and every piece tells a story of style and sophistication.
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-700 text-lg">
                <p>
                  TheFineThings was born from a passion for bringing premium fashion to every woman who believes in expressing her unique style. We understand that clothing is more than just fabric—it's a statement, a confidence booster, and a reflection of your personality.
                </p>
                <p>
                  Our journey began with a simple vision: to create a boutique where quality meets affordability, where every piece is carefully selected to ensure it meets our high standards of style, comfort, and craftsmanship.
                </p>
                <p>
                  From elegant dresses that make you feel like royalty to casual wear that doesn't compromise on style, we curate collections that celebrate the modern woman in all her glory.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-lg p-8">
              <div className="text-center">
                <div className="text-6xl mb-4">👑</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Mission</h3>
                <p className="text-gray-700 text-lg">
                  To empower every woman with clothing that makes her feel confident, beautiful, and authentically herself.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visit Our Store */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Boutique</h2>
            <p className="text-xl text-gray-700">Experience our collections in person</p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">📍 Our Location</h3>
                <div className="space-y-3 text-gray-700">
                  <p className="text-lg">
                    <strong>TheFineThings Boutique</strong>
                  </p>
                  <p>
                    Shop at Tse Addo, Labadi<br/>
                    Accra, Greater Accra Region<br/>
                    Ghana, West Africa
                  </p>
                  <div className="mt-6">
                    <p className="text-sm text-gray-600 mb-2">Find us on Google Maps:</p>
                    <div className="bg-gray-100 p-3 rounded-md">
                      <p className="text-sm font-mono text-gray-800">Tse Addo, Labadi, Accra, Ghana</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">🕒 Store Hours</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex justify-between">
                    <span>Monday - Friday:</span>
                    <span className="font-medium">9:00 AM - 7:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Saturday:</span>
                    <span className="font-medium">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Sunday:</span>
                    <span className="font-medium">11:00 AM - 6:00 PM</span>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-3">💫 What to Expect</h4>
                  <ul className="space-y-2 text-gray-700 text-sm">
                    <li>• Personal styling consultations</li>
                    <li>• Try-on sessions in comfortable fitting rooms</li>
                    <li>• Expert advice on sizing and styling</li>
                    <li>• Exclusive in-store collections</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Follow Us */}
      <section className="bg-black py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Stay Connected</h2>
          <p className="text-gray-300 mb-8 text-lg max-w-2xl mx-auto">
            Follow us on Instagram for the latest collections, styling tips, and behind-the-scenes content
          </p>
          
          <div className="flex justify-center">
            <a 
              href="https://www.instagram.com/thefinethings.store?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center text-lg font-medium"
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              Follow @thefinethings.store
            </a>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Us</h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
              We're more than just a clothing store - we're your style partner
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality First</h3>
              <p className="text-gray-700">Every piece is carefully selected and quality-tested to ensure you get the best value for your investment.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💝</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Personal Touch</h3>
              <p className="text-gray-700">We provide personalized styling advice and ensure every customer feels special and confident.</p>
            </div>
            
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="bg-black w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Local & Global</h3>
              <p className="text-gray-700">Proudly serving from Accra, Ghana, with a global perspective on fashion and trends.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-800 pt-8 text-center">
            <p className="text-gray-400">&copy; 2025 TheFineThings. All rights reserved.</p>
            <div className="flex items-center justify-center mt-4">
              <span className="text-gray-500 text-sm mr-2">Developed by</span>
              <div className="flex items-center">
                <div className="bg-white rounded-lg p-2 mr-3">
                  <img 
                    src="/developer-logo.png" 
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
