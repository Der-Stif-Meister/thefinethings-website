'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  ShoppingBagIcon, 
  UserIcon, 
  PlusIcon,
  PencilIcon,
  TrashIcon,
  PhotoIcon,
  EyeIcon,
  ArrowRightOnRectangleIcon,
  ShieldCheckIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function AdminDashboard() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [sessionExpiry, setSessionExpiry] = useState<number>(0);
  const [activeTab, setActiveTab] = useState('products');
  const [showAddProduct, setShowAddProduct] = useState(false);
  
  // Check authentication on load
  useEffect(() => {
    const adminToken = localStorage.getItem('admin-token');
    const tokenExpiry = localStorage.getItem('admin-token-expiry');
    
    if (!adminToken || !tokenExpiry) {
      router.push('/secure-admin-login');
      return;
    }

    const now = new Date().getTime();
    const expiry = parseInt(tokenExpiry);
    
    if (now >= expiry) {
      localStorage.removeItem('admin-token');
      localStorage.removeItem('admin-token-expiry');
      router.push('/secure-admin-login');
      return;
    }

    setIsAuthenticated(true);
    setSessionExpiry(expiry);
  }, [router]);

  // Auto logout when session expires
  useEffect(() => {
    if (sessionExpiry > 0) {
      const timeUntilExpiry = sessionExpiry - new Date().getTime();
      const timer = setTimeout(() => {
        handleLogout();
      }, timeUntilExpiry);

      return () => clearTimeout(timer);
    }
  }, [sessionExpiry]);

  const handleLogout = () => {
    localStorage.removeItem('admin-token');
    localStorage.removeItem('admin-token-expiry');
    router.push('/secure-admin-login');
  };

  const formatTimeRemaining = () => {
    const now = new Date().getTime();
    const remaining = sessionExpiry - now;
    if (remaining <= 0) return 'Expired';
    
    const hours = Math.floor(remaining / (1000 * 60 * 60));
    const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const [products, setProducts] = useState([
    // Empty array - ready for your sister to add her own products
  ]);

  const [orders, setOrders] = useState([
    // Empty array - ready for real customer orders
  ]);

  // Product form state
  const [productForm, setProductForm] = useState({
    name: '',
    category: '',
    price: '',
    stock: '',
    description: '',
    media: [] as File[]
  });

  const handleMediaUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      const isValidSize = file.size <= 50 * 1024 * 1024; // 50MB limit
      return (isImage || isVideo) && isValidSize;
    });

    setProductForm(prev => ({
      ...prev,
      media: [...prev.media, ...validFiles]
    }));
  };

  const removeMedia = (index: number) => {
    setProductForm(prev => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      category: '',
      price: '',
      stock: '',
      description: '',
      media: []
    });
  };

  // Don't render anything until authentication is verified
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <ShieldCheckIcon className="mx-auto h-12 w-12 text-gray-400 animate-pulse" />
          <p className="mt-2 text-gray-500">Verifying access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Secure Admin Header */}
      <header className="bg-red-700 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <ShieldCheckIcon className="h-8 w-8" />
              <div>
                <h1 className="text-xl font-bold">TheFineThings Admin</h1>
                <p className="text-xs text-red-200">Secure Dashboard</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm">
                <ClockIcon className="h-4 w-4 mr-1" />
                <span>Session: {formatTimeRemaining()}</span>
              </div>
              <button
                onClick={() => router.push('/admin-settings')}
                className="flex items-center px-3 py-1 bg-red-600 rounded-md hover:bg-red-700 transition-colors text-sm"
              >
                <ShieldCheckIcon className="h-4 w-4 mr-1" />
                Settings
              </button>
              <button
                onClick={handleLogout}
                className="flex items-center px-3 py-1 bg-red-800 rounded-md hover:bg-red-900 transition-colors text-sm"
              >
                <ArrowRightOnRectangleIcon className="h-4 w-4 mr-1" />
                Secure Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Security Warning */}
        <div className="mb-6 bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                <strong>Security Notice:</strong> This admin area is monitored. All actions are logged for security purposes.
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'products'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Products Management
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'orders'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Orders Management
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'analytics'
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              Analytics
            </button>
          </nav>
        </div>

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium text-gray-900">Products</h2>
              <button 
                onClick={() => setShowAddProduct(true)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center"
              >
                <PlusIcon className="h-4 w-4 mr-2" />
                Add Product
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {products.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        <ShoppingBagIcon className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No products yet</h3>
                        <p className="text-gray-500 mb-4">Get started by adding your first product to the store.</p>
                        <button 
                          onClick={() => setShowAddProduct(true)}
                          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
                        >
                          Add Your First Product
                        </button>
                      </td>
                    </tr>
                  ) : (
                    products.map((product: any) => (
                    <tr key={product.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 bg-gray-200 rounded-md flex items-center justify-center">
                            <PhotoIcon className="h-6 w-6 text-gray-400" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.category}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₵{product.price}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          product.status === 'active' 
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.status === 'active' ? 'Active' : 'Out of Stock'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-red-600 hover:text-red-900 mr-3">
                          <PencilIcon className="h-4 w-4" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-600">
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">Recent Orders</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {orders.map((order) => (
                    <tr key={order.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.orderNumber}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.items} item(s)
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {order.customer}
                        </div>
                        <div className="text-sm text-gray-500">
                          {order.email}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ₵{order.total.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          order.status === 'shipped' 
                            ? 'bg-green-100 text-green-800'
                            : order.status === 'processing'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-red-600 hover:text-red-900">
                          <EyeIcon className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-red-600">₵0.00</div>
              <div className="text-sm text-gray-500">Total Revenue</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-red-600">0</div>
              <div className="text-sm text-gray-500">Total Orders</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-red-600">0</div>
              <div className="text-sm text-gray-500">Active Products</div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-2xl font-bold text-red-600">₵0.00</div>
              <div className="text-sm text-gray-500">Average Order</div>
            </div>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-60 overflow-y-auto h-full w-full z-50 flex items-center justify-center p-4">
          <div className="relative mx-auto border shadow-2xl rounded-lg bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Add New Product</h3>
                <button
                  onClick={() => {
                    setShowAddProduct(false);
                    resetProductForm();
                  }}
                  className="text-gray-500 hover:text-gray-700 text-xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <form className="space-y-6">
                {/* Product Name */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Product Name *</label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-900 bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 placeholder-gray-500"
                    placeholder="Enter product name"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Category *</label>
                  <select 
                    value={productForm.category}
                    onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                    className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-900 bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200"
                    required
                  >
                    <option value="" className="text-gray-500">Select category</option>
                    <option value="Dresses" className="text-gray-900">Dresses</option>
                    <option value="Tops" className="text-gray-900">Tops</option>
                    <option value="Bottoms" className="text-gray-900">Bottoms</option>
                    <option value="Outerwear" className="text-gray-900">Outerwear</option>
                    <option value="Accessories" className="text-gray-900">Accessories</option>
                  </select>
                </div>

                {/* Price and Stock Row */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Price (₵) *</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={productForm.price}
                      onChange={(e) => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                      className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-900 bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 placeholder-gray-500"
                      placeholder="0.00"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-2">Stock Quantity *</label>
                    <input
                      type="number"
                      min="0"
                      value={productForm.stock}
                      onChange={(e) => setProductForm(prev => ({ ...prev, stock: e.target.value }))}
                      className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-900 bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 placeholder-gray-500"
                      placeholder="0"
                      required
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Description</label>
                  <textarea
                    rows={3}
                    value={productForm.description}
                    onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                    className="w-full border-2 border-gray-400 rounded-lg px-4 py-3 text-gray-900 bg-white focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 placeholder-gray-500 resize-none"
                    placeholder="Describe your product (optional)"
                  />
                </div>

                {/* Media Upload */}
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-2">Product Images & Videos</label>
                  <div className="border-2 border-dashed border-gray-400 rounded-lg p-6 text-center hover:border-red-400 transition-colors">
                    <input
                      type="file"
                      id="media-upload"
                      multiple
                      accept="image/*,video/*"
                      onChange={handleMediaUpload}
                      className="hidden"
                    />
                    <label htmlFor="media-upload" className="cursor-pointer">
                      <PhotoIcon className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                      <p className="text-sm font-medium text-gray-700 mb-1">Click to upload images or videos</p>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF, MP4, MOV up to 50MB each</p>
                    </label>
                  </div>

                  {/* Media Preview */}
                  {productForm.media.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      {productForm.media.map((file, index) => (
                        <div key={index} className="relative border border-gray-300 rounded-lg p-3 bg-gray-50">
                          <div className="flex items-center space-x-2">
                            {file.type.startsWith('image/') ? (
                              <PhotoIcon className="h-8 w-8 text-blue-500" />
                            ) : (
                              <div className="h-8 w-8 bg-purple-500 rounded flex items-center justify-center">
                                <span className="text-white text-xs font-bold">▶</span>
                              </div>
                            )}
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-gray-900 truncate">{file.name}</p>
                              <p className="text-xs text-gray-500">{(file.size / 1024 / 1024).toFixed(1)}MB</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeMedia(index)}
                              className="text-red-500 hover:text-red-700 font-bold"
                            >
                              ×
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </form>
              
              <div className="flex space-x-3 mt-8 pt-4 border-t border-gray-200">
                <button
                  onClick={() => {
                    // Validate required fields
                    if (!productForm.name || !productForm.category || !productForm.price || !productForm.stock) {
                      alert('Please fill in all required fields (marked with *)');
                      return;
                    }
                    
                    alert(`Product "${productForm.name}" ready to be saved!\nMedia files: ${productForm.media.length}\nFull functionality will be implemented soon!`);
                    setShowAddProduct(false);
                    resetProductForm();
                  }}
                  className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 font-semibold transition-colors"
                >
                  Add Product
                </button>
                <button
                  onClick={() => {
                    setShowAddProduct(false);
                    resetProductForm();
                  }}
                  className="flex-1 bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 font-semibold transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
