'use client'
import Link from "next/link";
import { ShoppingBagIcon, UserIcon, HeartIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useCart } from '@/lib/cart-context';

// Country data with subdivision types
const countryData = {
  "Afghanistan": { subdivisionType: "Province" },
  "Albania": { subdivisionType: "County" },
  "Algeria": { subdivisionType: "Province" },
  "Andorra": { subdivisionType: "Parish" },
  "Angola": { subdivisionType: "Province" },
  "Argentina": { subdivisionType: "Province" },
  "Armenia": { subdivisionType: "Region" },
  "Australia": { subdivisionType: "State/Territory" },
  "Austria": { subdivisionType: "State" },
  "Azerbaijan": { subdivisionType: "Region" },
  "Bahamas": { subdivisionType: "District" },
  "Bahrain": { subdivisionType: "Governorate" },
  "Bangladesh": { subdivisionType: "Division" },
  "Barbados": { subdivisionType: "Parish" },
  "Belarus": { subdivisionType: "Region" },
  "Belgium": { subdivisionType: "Region" },
  "Belize": { subdivisionType: "District" },
  "Benin": { subdivisionType: "Department" },
  "Bhutan": { subdivisionType: "District" },
  "Bolivia": { subdivisionType: "Department" },
  "Bosnia and Herzegovina": { subdivisionType: "Entity" },
  "Botswana": { subdivisionType: "District" },
  "Brazil": { subdivisionType: "State" },
  "Brunei": { subdivisionType: "District" },
  "Bulgaria": { subdivisionType: "Region" },
  "Burkina Faso": { subdivisionType: "Region" },
  "Burundi": { subdivisionType: "Province" },
  "Cambodia": { subdivisionType: "Province" },
  "Cameroon": { subdivisionType: "Region" },
  "Canada": { subdivisionType: "Province/Territory" },
  "Cape Verde": { subdivisionType: "Island" },
  "Central African Republic": { subdivisionType: "Prefecture" },
  "Chad": { subdivisionType: "Region" },
  "Chile": { subdivisionType: "Region" },
  "China": { subdivisionType: "Province" },
  "Colombia": { subdivisionType: "Department" },
  "Comoros": { subdivisionType: "Island" },
  "Congo": { subdivisionType: "Department" },
  "Costa Rica": { subdivisionType: "Province" },
  "Croatia": { subdivisionType: "County" },
  "Cuba": { subdivisionType: "Province" },
  "Cyprus": { subdivisionType: "District" },
  "Czech Republic": { subdivisionType: "Region" },
  "Denmark": { subdivisionType: "Region" },
  "Djibouti": { subdivisionType: "Region" },
  "Dominica": { subdivisionType: "Parish" },
  "Dominican Republic": { subdivisionType: "Province" },
  "Ecuador": { subdivisionType: "Province" },
  "Egypt": { subdivisionType: "Governorate" },
  "El Salvador": { subdivisionType: "Department" },
  "Equatorial Guinea": { subdivisionType: "Province" },
  "Eritrea": { subdivisionType: "Region" },
  "Estonia": { subdivisionType: "County" },
  "Eswatini": { subdivisionType: "Region" },
  "Ethiopia": { subdivisionType: "Region" },
  "Fiji": { subdivisionType: "Division" },
  "Finland": { subdivisionType: "Region" },
  "France": { subdivisionType: "Region" },
  "Gabon": { subdivisionType: "Province" },
  "Gambia": { subdivisionType: "Division" },
  "Georgia": { subdivisionType: "Region" },
  "Germany": { subdivisionType: "State" },
  "Ghana": { subdivisionType: "Region" },
  "Greece": { subdivisionType: "Region" },
  "Grenada": { subdivisionType: "Parish" },
  "Guatemala": { subdivisionType: "Department" },
  "Guinea": { subdivisionType: "Region" },
  "Guinea-Bissau": { subdivisionType: "Region" },
  "Guyana": { subdivisionType: "Region" },
  "Haiti": { subdivisionType: "Department" },
  "Honduras": { subdivisionType: "Department" },
  "Hungary": { subdivisionType: "County" },
  "Iceland": { subdivisionType: "Region" },
  "India": { subdivisionType: "State/Territory" },
  "Indonesia": { subdivisionType: "Province" },
  "Iran": { subdivisionType: "Province" },
  "Iraq": { subdivisionType: "Governorate" },
  "Ireland": { subdivisionType: "County" },
  "Israel": { subdivisionType: "District" },
  "Italy": { subdivisionType: "Region" },
  "Jamaica": { subdivisionType: "Parish" },
  "Japan": { subdivisionType: "Prefecture" },
  "Jordan": { subdivisionType: "Governorate" },
  "Kazakhstan": { subdivisionType: "Region" },
  "Kenya": { subdivisionType: "County" },
  "Kiribati": { subdivisionType: "Island" },
  "Kuwait": { subdivisionType: "Governorate" },
  "Kyrgyzstan": { subdivisionType: "Region" },
  "Laos": { subdivisionType: "Province" },
  "Latvia": { subdivisionType: "Region" },
  "Lebanon": { subdivisionType: "Governorate" },
  "Lesotho": { subdivisionType: "District" },
  "Liberia": { subdivisionType: "County" },
  "Libya": { subdivisionType: "District" },
  "Liechtenstein": { subdivisionType: "Municipality" },
  "Lithuania": { subdivisionType: "County" },
  "Luxembourg": { subdivisionType: "Canton" },
  "Madagascar": { subdivisionType: "Region" },
  "Malawi": { subdivisionType: "Region" },
  "Malaysia": { subdivisionType: "State" },
  "Maldives": { subdivisionType: "Atoll" },
  "Mali": { subdivisionType: "Region" },
  "Malta": { subdivisionType: "Region" },
  "Marshall Islands": { subdivisionType: "Municipality" },
  "Mauritania": { subdivisionType: "Region" },
  "Mauritius": { subdivisionType: "District" },
  "Mexico": { subdivisionType: "State" },
  "Micronesia": { subdivisionType: "State" },
  "Moldova": { subdivisionType: "District" },
  "Monaco": { subdivisionType: "Ward" },
  "Mongolia": { subdivisionType: "Province" },
  "Montenegro": { subdivisionType: "Municipality" },
  "Morocco": { subdivisionType: "Region" },
  "Mozambique": { subdivisionType: "Province" },
  "Myanmar": { subdivisionType: "State/Region" },
  "Namibia": { subdivisionType: "Region" },
  "Nauru": { subdivisionType: "District" },
  "Nepal": { subdivisionType: "Province" },
  "Netherlands": { subdivisionType: "Province" },
  "New Zealand": { subdivisionType: "Region" },
  "Nicaragua": { subdivisionType: "Department" },
  "Niger": { subdivisionType: "Region" },
  "Nigeria": { subdivisionType: "State" },
  "North Korea": { subdivisionType: "Province" },
  "North Macedonia": { subdivisionType: "Region" },
  "Norway": { subdivisionType: "County" },
  "Oman": { subdivisionType: "Governorate" },
  "Pakistan": { subdivisionType: "Province" },
  "Palau": { subdivisionType: "State" },
  "Panama": { subdivisionType: "Province" },
  "Papua New Guinea": { subdivisionType: "Province" },
  "Paraguay": { subdivisionType: "Department" },
  "Peru": { subdivisionType: "Region" },
  "Philippines": { subdivisionType: "Region" },
  "Poland": { subdivisionType: "Voivodeship" },
  "Portugal": { subdivisionType: "District" },
  "Qatar": { subdivisionType: "Municipality" },
  "Romania": { subdivisionType: "County" },
  "Russia": { subdivisionType: "Federal Subject" },
  "Rwanda": { subdivisionType: "Province" },
  "Saint Kitts and Nevis": { subdivisionType: "Parish" },
  "Saint Lucia": { subdivisionType: "Quarter" },
  "Saint Vincent and the Grenadines": { subdivisionType: "Parish" },
  "Samoa": { subdivisionType: "District" },
  "San Marino": { subdivisionType: "Municipality" },
  "Saudi Arabia": { subdivisionType: "Province" },
  "Senegal": { subdivisionType: "Region" },
  "Serbia": { subdivisionType: "District" },
  "Seychelles": { subdivisionType: "District" },
  "Sierra Leone": { subdivisionType: "Province" },
  "Singapore": { subdivisionType: "District" },
  "Slovakia": { subdivisionType: "Region" },
  "Slovenia": { subdivisionType: "Region" },
  "Solomon Islands": { subdivisionType: "Province" },
  "Somalia": { subdivisionType: "Region" },
  "South Africa": { subdivisionType: "Province" },
  "South Korea": { subdivisionType: "Province" },
  "South Sudan": { subdivisionType: "State" },
  "Spain": { subdivisionType: "Autonomous Community" },
  "Sri Lanka": { subdivisionType: "Province" },
  "Sudan": { subdivisionType: "State" },
  "Suriname": { subdivisionType: "District" },
  "Sweden": { subdivisionType: "County" },
  "Switzerland": { subdivisionType: "Canton" },
  "Syria": { subdivisionType: "Governorate" },
  "Taiwan": { subdivisionType: "County/City" },
  "Tajikistan": { subdivisionType: "Region" },
  "Tanzania": { subdivisionType: "Region" },
  "Thailand": { subdivisionType: "Province" },
  "Timor-Leste": { subdivisionType: "District" },
  "Togo": { subdivisionType: "Region" },
  "Tonga": { subdivisionType: "Division" },
  "Trinidad and Tobago": { subdivisionType: "Region" },
  "Tunisia": { subdivisionType: "Governorate" },
  "Turkey": { subdivisionType: "Province" },
  "Turkmenistan": { subdivisionType: "Region" },
  "Tuvalu": { subdivisionType: "Island" },
  "Uganda": { subdivisionType: "District" },
  "Ukraine": { subdivisionType: "Region" },
  "United Arab Emirates": { subdivisionType: "Emirate" },
  "United Kingdom": { subdivisionType: "Country/Region" },
  "United States": { subdivisionType: "State" },
  "Uruguay": { subdivisionType: "Department" },
  "Uzbekistan": { subdivisionType: "Region" },
  "Vanuatu": { subdivisionType: "Province" },
  "Vatican City": { subdivisionType: "District" },
  "Venezuela": { subdivisionType: "State" },
  "Vietnam": { subdivisionType: "Province" },
  "Yemen": { subdivisionType: "Governorate" },
  "Zambia": { subdivisionType: "Province" },
  "Zimbabwe": { subdivisionType: "Province" }
};

export default function Checkout() {
  const { items: cartItems, getCartTotal, getCartCount } = useCart();
  
  const [orderData, setOrderData] = useState({
    // Customer Information
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Shipping Address
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Ghana', // Default to Ghana since it's for a Ghana business
    
    // Payment
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: '',
    
    // Special Instructions
    specialInstructions: ''
  });

  // Function to get subdivision type based on country
  const getSubdivisionType = (country: string): string => {
    return countryData[country as keyof typeof countryData]?.subdivisionType || 'State';
  };

  const currentSubdivisionType = getSubdivisionType(orderData.country);

  const subtotal = getCartTotal();
  const shipping = subtotal > 500 ? 0 : 25.00;
  const tax = subtotal * 0.15; // 15% VAT for Ghana
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setOrderData({
      ...orderData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create order object
    const order = {
      items: cartItems,
      customer: {
        firstName: orderData.firstName,
        lastName: orderData.lastName,
        email: orderData.email,
        phone: orderData.phone,
      },
      shipping: {
        address: orderData.address,
        city: orderData.city,
        state: orderData.state,
        zipCode: orderData.zipCode,
        country: orderData.country,
      },
      payment: {
        method: orderData.paymentMethod,
        // In a real app, payment details would be handled securely
      },
      pricing: {
        subtotal,
        shipping,
        tax,
        total
      },
      specialInstructions: orderData.specialInstructions,
      status: 'processing',
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString() // 5 days from now
    };

    // In a real app, this would be sent to your backend
    console.log('Order placed:', order);
    
    // Redirect to confirmation page
    alert('Order placed successfully! You will receive an email confirmation shortly.');
    // In a real app: router.push('/order-confirmation');
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
                  {getCartCount()}
                </span>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Checkout Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              
              {/* Customer Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Customer Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      value={orderData.firstName}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      value={orderData.lastName}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={orderData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Phone *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={orderData.phone}
                      onChange={handleInputChange}
                      required
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Shipping Address</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Address *</label>
                    <input
                      type="text"
                      name="address"
                      value={orderData.address}
                      onChange={handleInputChange}
                      required
                      placeholder="Street address, apartment, suite, etc."
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1">City *</label>
                      <input
                        type="text"
                        name="city"
                        value={orderData.city}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1">{currentSubdivisionType} *</label>
                      <input
                        type="text"
                        name="state"
                        value={orderData.state}
                        onChange={handleInputChange}
                        required
                        placeholder={`Enter ${currentSubdivisionType.toLowerCase()}`}
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-1">ZIP Code *</label>
                      <input
                        type="text"
                        name="zipCode"
                        value={orderData.zipCode}
                        onChange={handleInputChange}
                        required
                        className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Country *</label>
                    <select
                      name="country"
                      value={orderData.country}
                      onChange={handleInputChange}
                      required
                      title="Select your country"
                      className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    >
                      {Object.keys(countryData).sort().map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Payment Information */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900 flex items-center">
                  <CreditCardIcon className="h-5 w-5 mr-2" />
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-1">Payment Method</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center text-gray-900">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={orderData.paymentMethod === 'card'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        Credit/Debit Card
                      </label>
                      <label className="flex items-center text-gray-900">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="paypal"
                          checked={orderData.paymentMethod === 'paypal'}
                          onChange={handleInputChange}
                          className="mr-2"
                        />
                        PayPal
                      </label>
                    </div>
                  </div>

                  {orderData.paymentMethod === 'card' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1">Card Number *</label>
                        <input
                          type="text"
                          name="cardNumber"
                          value={orderData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-1">Expiry Date *</label>
                          <input
                            type="text"
                            name="expiryDate"
                            value={orderData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-1">CVV *</label>
                          <input
                            type="text"
                            name="cvv"
                            value={orderData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            required
                            className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-900 mb-1">Name on Card *</label>
                        <input
                          type="text"
                          name="nameOnCard"
                          value={orderData.nameOnCard}
                          onChange={handleInputChange}
                          required
                          className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Special Instructions */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Special Instructions (Optional)</h2>
                <textarea
                  name="specialInstructions"
                  value={orderData.specialInstructions}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Any special delivery instructions or notes..."
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-4">
                <h2 className="text-lg font-semibold mb-4 text-gray-900">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center">
                      <div className="flex-grow">
                        <p className="font-medium text-sm text-gray-900">{item.name}</p>
                        <p className="text-gray-900 text-xs">Size: {item.size} • Qty: {item.quantity}</p>
                      </div>
                      <p className="font-medium text-gray-900">₵{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>
                
                <div className="border-t border-gray-300 pt-4 space-y-2">
                  <div className="flex justify-between text-gray-900">
                    <span>Subtotal</span>
                    <span>₵{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-900">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `₵${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-gray-900">
                    <span>Tax</span>
                    <span>₵{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-semibold pt-2 border-t text-gray-900">
                    <span>Total</span>
                    <span>₵{total.toFixed(2)}</span>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-black text-white py-3 px-4 rounded-md hover:bg-gray-800 transition-colors mt-6 font-semibold"
                >
                  Place Order
                </button>

                <div className="mt-4 text-sm text-gray-700 text-center">
                  <p>🔒 Your payment information is secure</p>
                  <p className="mt-2">You&apos;ll receive order updates via email</p>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
