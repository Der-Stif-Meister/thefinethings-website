'use client'
import Link from "next/link";
import { ShoppingBagIcon, UserIcon, HeartIcon, XMarkIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';
import { useCart } from '@/lib/cart-context';

export default function Cart() {
  const { items, updateQuantity, removeItem, getCartTotal, getCartCount } = useCart();
  
  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 25.00;
  const total = subtotal + shipping;

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
              <Link href="/wishlist" className="text-gray-600 hover:text-gray-900">
                <HeartIcon className="h-6 w-6" />
              </Link>
              <Link href="/cart" className="text-gray-900 hover:text-gray-600 relative">
                <ShoppingBagIcon className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {getCartCount()}
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

        {items.length === 0 ? (
          <div className="text-center py-12">
            <ShoppingBagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-800 mb-8">Add some items to get started!</p>
            <Link 
              href="/shop"
              className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size}`} className="border-b border-gray-200 last:border-b-0 p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-24 h-24 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                        <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                          <span className="text-gray-800 text-xs text-center px-2">{item.name}</span>
                        </div>
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="text-gray-800">{item.category}</p>
                        <p className="text-gray-800">Size: {item.size}</p>
                        <p className="text-lg font-bold text-gray-900">₵{item.price}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <MinusIcon className="h-4 w-4" />
                        </button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                          className="p-1 rounded-full hover:bg-gray-100"
                        >
                          <PlusIcon className="h-4 w-4" />
                        </button>
                      </div>
                      
                      <button
                        onClick={() => removeItem(item.id, item.size)}
                        className="p-2 text-gray-700 hover:text-gray-900"
                      >
                        <XMarkIcon className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-4">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₵{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₵${shipping.toFixed(2)}`}</span>
                  </div>
                  {subtotal > 0 && subtotal < 500 && (
                    <p className="text-sm text-gray-800">
                      Add ₵{(500 - subtotal).toFixed(2)} more for free shipping!
                    </p>
                  )}
                </div>
                
                <div className="border-t border-gray-300 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>₵{total.toFixed(2)}</span>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors text-center block mb-3"
                >
                  Proceed to Checkout
                </Link>
                
                <Link
                  href="/shop"
                  className="w-full bg-white text-black border border-gray-300 py-3 px-4 rounded-md hover:bg-gray-50 transition-colors text-center block"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
