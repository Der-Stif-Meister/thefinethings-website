'use client'
import Link from "next/link";
import { ShoppingBagIcon, UserIcon, HeartIcon, MagnifyingGlassIcon, CheckCircleIcon, TruckIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

export default function TrackOrder() {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [orderData, setOrderData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Sample order data - in a real app, this would come from your backend
  const sampleOrders: { [key: string]: any } = {
    'TFT-2025-001': {
      orderNumber: 'TFT-2025-001',
      email: 'customer@example.com',
      orderDate: '2025-01-15',
      status: 'shipped',
      estimatedDelivery: '2025-01-20',
      trackingNumber: 'TRK123456789',
      items: [
        {
          id: 1,
          name: "Summer Floral Dress",
          price: 249.99,
          quantity: 1,
          size: "M",
          image: "/api/placeholder/100/100"
        }
      ],
      shipping: {
        address: '123 Main St',
        city: 'Accra',
        state: 'Greater Accra',
        zipCode: 'GA-001'
      },
      total: 274.99,
      timeline: [
        { status: 'Order Placed', date: '2025-01-15T10:00:00Z', completed: true },
        { status: 'Payment Confirmed', date: '2025-01-15T10:05:00Z', completed: true },
        { status: 'Preparing for Shipment', date: '2025-01-16T09:00:00Z', completed: true },
        { status: 'Shipped', date: '2025-01-17T14:30:00Z', completed: true },
        { status: 'Out for Delivery', date: null, completed: false },
        { status: 'Delivered', date: null, completed: false }
      ]
    },
    'TFT-2025-002': {
      orderNumber: 'TFT-2025-002',
      email: 'jane.doe@email.com',
      orderDate: '2025-01-16',
      status: 'preparing',
      estimatedDelivery: '2025-01-22',
      items: [
        {
          id: 2,
          name: "Casual Denim Jacket",
          price: 79.99,
          quantity: 1,
          size: "L",
          image: "/api/placeholder/100/100"
        }
      ],
      shipping: {
        address: '456 Oak Ave',
        city: 'Los Angeles',
        state: 'CA',
        zipCode: '90210'
      },
      total: 89.98,
      timeline: [
        { status: 'Order Placed', date: '2025-01-16T15:30:00Z', completed: true },
        { status: 'Payment Confirmed', date: '2025-01-16T15:35:00Z', completed: true },
        { status: 'Preparing for Shipment', date: '2025-01-17T08:00:00Z', completed: true },
        { status: 'Shipped', date: null, completed: false },
        { status: 'Out for Delivery', date: null, completed: false },
        { status: 'Delivered', date: null, completed: false }
      ]
    }
  };

  const handleTrackOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      const order = sampleOrders[orderNumber.toUpperCase()];
      if (order && order.email.toLowerCase() === email.toLowerCase()) {
        setOrderData(order);
      } else {
        alert('Order not found. Please check your order number and email address.');
        setOrderData(null);
      }
      setLoading(false);
    }, 1000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'preparing': return 'text-blue-600 bg-blue-100';
      case 'shipped': return 'text-green-600 bg-green-100';
      case 'delivered': return 'text-green-800 bg-green-200';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatDateTime = (dateString: string | null) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Track Your Order</h1>

        {/* Order Lookup Form */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
          <form onSubmit={handleTrackOrder}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order Number
                </label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="TFT-2025-001"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center"
            >
              {loading ? (
                'Tracking...'
              ) : (
                <>
                  <MagnifyingGlassIcon className="h-4 w-4 mr-2" />
                  Track Order
                </>
              )}
            </button>
          </form>

          <div className="mt-4 text-sm text-gray-800">
            <p>💡 <strong>Sample Order Numbers:</strong></p>
            <p>• TFT-2025-001 (email: customer@example.com) - Shipped</p>
            <p>• TFT-2025-002 (email: jane.doe@email.com) - Preparing</p>
          </div>
        </div>

        {/* Order Details */}
        {orderData && (
          <div className="space-y-6">
            {/* Order Status */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold">Order #{orderData.orderNumber}</h2>
                  <p className="text-gray-800">Placed on {formatDate(orderData.orderDate)}</p>
                </div>
                <div className="mt-2 md:mt-0">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(orderData.status)}`}>
                    {orderData.status.charAt(0).toUpperCase() + orderData.status.slice(1)}
                  </span>
                </div>
              </div>

              {orderData.trackingNumber && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center">
                    <TruckIcon className="h-5 w-5 text-blue-600 mr-2" />
                    <div>
                      <p className="font-medium text-blue-800">Tracking Number: {orderData.trackingNumber}</p>
                      <p className="text-sm text-blue-600">Estimated delivery: {formatDate(orderData.estimatedDelivery)}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t pt-4">
                <p className="font-medium mb-2">Shipping to:</p>
                <p className="text-gray-800">
                  {orderData.shipping.address}<br />
                  {orderData.shipping.city}, {orderData.shipping.state} {orderData.shipping.zipCode}
                </p>
              </div>
            </div>

            {/* Order Timeline */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Order Timeline</h3>
              <div className="space-y-4">
                {orderData.timeline.map((step: any, index: number) => (
                  <div key={index} className="flex items-start">
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {step.completed ? (
                        <CheckCircleIcon className="h-5 w-5" />
                      ) : (
                        <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                      )}
                    </div>
                    <div className="ml-4 flex-grow">
                      <p className={`font-medium ${step.completed ? 'text-gray-900' : 'text-gray-500'}`}>
                        {step.status}
                      </p>
                      {step.date && (
                        <p className="text-sm text-gray-600">{formatDateTime(step.date)}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Items Ordered</h3>
              <div className="space-y-4">
                {orderData.items.map((item: any) => (
                  <div key={item.id} className="flex items-center space-x-4 pb-4 border-b last:border-b-0">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                        <span className="text-gray-500 text-xs text-center px-1">{item.name.split(' ')[0]}</span>
                      </div>
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-800">{item.size} • Quantity: {item.quantity}</p>
                      <p className="font-medium">₵{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Total</span>
                  <span className="font-semibold text-lg">₵{orderData.total}</span>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-2">Need Help?</h3>
              <p className="text-gray-800 mb-4">
                If you have questions about your order, our customer service team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <Link
                  href="/contact"
                  className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800 transition-colors text-center"
                >
                  Contact Support
                </Link>
                <Link
                  href="/faq"
                  className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md hover:bg-gray-50 transition-colors text-center"
                >
                  View FAQ
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
