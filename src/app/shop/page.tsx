'use client'
import Link from "next/link";
import { ShoppingBagIcon, UserIcon, HeartIcon, FunnelIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';
import { useCart } from "@/lib/cart-context";

export default function Shop() {
  const { addItem, getCartCount } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<{[key: number]: string}>({});
  
  const handleAddToCart = (product: any) => {
    const selectedSize = selectedSizes[product.id] || product.sizes[0];
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      category: product.category,
      image: product.image
    });
    
    // Show success message
    alert(`Added ${product.name} (Size: ${selectedSize}) to cart!`);
  };

  const handleSizeSelect = (productId: number, size: string) => {
    setSelectedSizes(prev => ({
      ...prev,
      [productId]: size
    }));
  };
  const [products] = useState<Array<{
    id: number;
    name: string;
    price: number;
    category: string;
    image: string;
    inStock: boolean;
    sizes: string[];
  }>>([
    // Empty array - ready for your sister to add her own products
  ]);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedSize, setSelectedSize] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  const categories = ["All", "Dresses", "Tops", "Bottoms", "Outerwear", "Accessories"];
  const sizes = ["All", "XS", "S", "M", "L", "XL", "24", "26", "28", "30", "32"];
  const priceRanges = ["All", "Under ₵150", "₵150-₵300", "₵300-₵500", "Over ₵500"];

  const filteredProducts = products.filter(product => {
    if (selectedCategory !== "All" && product.category !== selectedCategory) return false;
    if (selectedSize !== "All" && !product.sizes.includes(selectedSize)) return false;
    if (priceRange !== "All") {
      if (priceRange === "Under ₵150" && product.price >= 150) return false;
      if (priceRange === "₵150-₵300" && (product.price < 150 || product.price > 300)) return false;
      if (priceRange === "₵300-₵500" && (product.price < 300 || product.price > 500)) return false;
      if (priceRange === "Over ₵500" && product.price <= 500) return false;
    }
    return true;
  });

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
                <Link href="/shop" className="text-gray-900 hover:text-gray-600 px-3 py-2 text-sm font-medium">
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

      {/* Page Header */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900">Shop All Items</h1>
          <p className="mt-4 text-gray-800">Discover our complete collection of premium clothing</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white border border-gray-300 rounded-lg p-6 sticky top-4 shadow-sm">
              <div className="flex items-center mb-6">
                <FunnelIcon className="h-5 w-5 mr-2 text-gray-700" />
                <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-800">Category</h3>
                {categories.map((category) => (
                  <label key={category} className="flex items-center mb-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="mr-3 h-4 w-4 text-black focus:ring-black"
                    />
                    <span className="text-gray-700 font-medium">{category}</span>
                  </label>
                ))}
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-800">Size</h3>
                {sizes.map((size) => (
                  <label key={size} className="flex items-center mb-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="radio"
                      name="size"
                      value={size}
                      checked={selectedSize === size}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="mr-3 h-4 w-4 text-black focus:ring-black"
                    />
                    <span className="text-gray-700 font-medium">{size}</span>
                  </label>
                ))}
              </div>

              {/* Price Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-3 text-gray-800">Price Range</h3>
                {priceRanges.map((range) => (
                  <label key={range} className="flex items-center mb-3 cursor-pointer hover:bg-gray-50 p-2 rounded">
                    <input
                      type="radio"
                      name="price"
                      value={range}
                      checked={priceRange === range}
                      onChange={(e) => setPriceRange(e.target.value)}
                      className="mr-3 h-4 w-4 text-black focus:ring-black"
                    />
                    <span className="text-gray-700 font-medium">{range}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-800">
                Showing {filteredProducts.length} of {products.length} products
              </p>
              <select 
                className="border border-gray-300 rounded-md px-3 py-2"
                aria-label="Sort products"
              >
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest First</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <div key={product.id} className="group cursor-pointer">
                  <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden group-hover:opacity-75 transition-opacity">
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-300 flex items-center justify-center">
                      <span className="text-gray-500 text-sm">{product.name}</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-sm text-gray-500">{product.category}</p>
                    <h3 className="text-lg font-medium text-gray-900">{product.name}</h3>
                    <p className="text-xl font-bold text-gray-900">₵{product.price}</p>
                    
                    {/* Size Selection */}
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Size:</p>
                      <div className="flex flex-wrap gap-2">
                        {product.sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => handleSizeSelect(product.id, size)}
                            className={`px-3 py-1 text-sm border rounded-md transition-colors ${
                              selectedSizes[product.id] === size || (!selectedSizes[product.id] && size === product.sizes[0])
                                ? 'border-black bg-black text-white'
                                : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full mt-4 bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors font-medium"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products match your current filters.</p>
                <button 
                  onClick={() => {
                    setSelectedCategory("All");
                    setSelectedSize("All");
                    setPriceRange("All");
                  }}
                  className="mt-4 bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
