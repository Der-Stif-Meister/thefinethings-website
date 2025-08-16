'use client'
import Link from "next/link";
import { ShoppingBagIcon, UserIcon, HeartIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function Wishlist() {
  const [wishlistItems] = useState([
    // Empty for now - ready for your sister to add functionality
  ]);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b border-gray-200">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-gray-900">
                TheFineThings
              </Link>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link href="/" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Home
                </Link>
                <Link href="/shop" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Shop
                </Link>
                <Link href="/about" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  About
                </Link>
                <Link href="/contact" className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm font-medium">
                  Contact
                </Link>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/account" className="text-gray-600 hover:text-gray-900">
                <UserIcon className="h-6 w-6" />
              </Link>
              <Link href="/wishlist" className="text-gray-900 hover:text-gray-600">
                <HeartIcon className="h-6 w-6" />
              </Link>
              <Link href="/cart" className="text-gray-600 hover:text-gray-900 relative">
                <ShoppingBagIcon className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  0
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">My Wishlist</h1>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-12">
            <HeartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-gray-900 mb-2">Your wishlist is empty</h2>
            <p className="text-gray-800 mb-8">Save items you love to view them later!</p>
            <Link 
              href="/shop"
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Explore Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map((item: any) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-w-1 aspect-h-1 bg-gray-200">
                  <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                    <span className="text-gray-500 text-sm text-center px-4">{item.name}</span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                  <p className="text-gray-800 mb-2">{item.category}</p>
                  <p className="text-lg font-bold text-gray-900 mb-3">₵{item.price}</p>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors text-sm">
                      Add to Cart
                    </button>
                    <button className="p-2 text-gray-400 hover:text-red-500 border border-gray-300 rounded-md">
                      <XMarkIcon className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
