'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  KeyIcon, 
  UserIcon, 
  ShieldCheckIcon,
  PencilIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

export default function AdminSettings() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showPasswords, setShowPasswords] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const [credentials, setCredentials] = useState({
    currentUsername: '',
    currentPassword: '',
    newUsername: '',
    newPassword: '',
    confirmPassword: '',
    adminPhone: '' // Phone number for OTP verification
  });

  // Check authentication on load
  useEffect(() => {
    const adminToken = localStorage.getItem('admin-token');
    const tokenExpiry = localStorage.getItem('admin-token-expiry');
    
    if (!adminToken || !tokenExpiry) {
      router.push('/secure-admin-login');
      return;
    }

    const now = new Date().getTime();
    if (now >= parseInt(tokenExpiry)) {
      localStorage.removeItem('admin-token');
      localStorage.removeItem('admin-token-expiry');
      router.push('/secure-admin-login');
      return;
    }

    setIsAuthenticated(true);
    
    // Load current credentials for display
    const currentUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'thefinethings_admin';
    const currentPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'TFT@admin2025!';
    setCredentials(prev => ({
      ...prev,
      currentUsername,
      currentPassword
    }));
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setMessage({ type: '', text: '' });
  };

  const validatePassword = (password: string) => {
    const requirements = [];
    if (password.length < 8) requirements.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) requirements.push('One uppercase letter');
    if (!/[a-z]/.test(password)) requirements.push('One lowercase letter');
    if (!/[0-9]/.test(password)) requirements.push('One number');
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) requirements.push('One special character');
    
    return requirements;
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate new password
    const passwordRequirements = validatePassword(credentials.newPassword);
    if (passwordRequirements.length > 0) {
      setMessage({
        type: 'error',
        text: `Password must have: ${passwordRequirements.join(', ')}`
      });
      return;
    }

    // Check if passwords match
    if (credentials.newPassword !== credentials.confirmPassword) {
      setMessage({
        type: 'error',
        text: 'New passwords do not match'
      });
      return;
    }

    // In production, this would update the environment variables or database
    // For now, we'll simulate the update
    try {
      // Simulate API call to update credentials
      localStorage.setItem('admin-username', credentials.newUsername || credentials.currentUsername);
      localStorage.setItem('admin-password', credentials.newPassword);
      
      setMessage({
        type: 'success',
        text: 'Credentials updated successfully! Changes will take effect on next login.'
      });
      
      // Update current credentials display
      setCredentials(prev => ({
        ...prev,
        currentUsername: credentials.newUsername || credentials.currentUsername,
        currentPassword: credentials.newPassword,
        newUsername: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
    } catch (error) {
      setMessage({
        type: 'error',
        text: 'Failed to update credentials. Please try again.'
      });
    }
  };

  const generateStrongPassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*(),.?":{}|<>';
    
    let password = '';
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    const allChars = uppercase + lowercase + numbers + symbols;
    for (let i = 4; i < 12; i++) {
      password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    setCredentials(prev => ({
      ...prev,
      newPassword: password,
      confirmPassword: password
    }));
  };

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
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/admin-dashboard')}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                ← Back to Dashboard
              </button>
            </div>
            <h1 className="text-xl font-semibold text-gray-900">Admin Settings</h1>
            <div></div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <KeyIcon className="h-5 w-5 mr-2" />
              Login Credentials Management
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Change your admin login username and password
            </p>
          </div>

          <div className="p-6">
            {/* Current Credentials Display */}
            <div className="mb-8 bg-gray-50 rounded-lg p-4">
              <h3 className="text-md font-medium text-gray-900 mb-3">Current Credentials</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Username</label>
                  <div className="mt-1 flex items-center">
                    <UserIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <code className="text-sm bg-white px-2 py-1 rounded border">
                      {credentials.currentUsername}
                    </code>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Password</label>
                  <div className="mt-1 flex items-center">
                    <KeyIcon className="h-4 w-4 text-gray-400 mr-2" />
                    <code className="text-sm bg-white px-2 py-1 rounded border">
                      {showPasswords ? credentials.currentPassword : '••••••••••••'}
                    </code>
                    <button
                      onClick={() => setShowPasswords(!showPasswords)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      {showPasswords ? (
                        <EyeSlashIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Update Form */}
            <form onSubmit={handlePasswordChange} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  New Username (optional - leave blank to keep current)
                </label>
                <input
                  type="text"
                  name="newUsername"
                  value={credentials.newUsername}
                  onChange={handleInputChange}
                  placeholder={credentials.currentUsername}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Admin Phone Number (for OTP verification)
                </label>
                <input
                  type="tel"
                  name="adminPhone"
                  value={credentials.adminPhone}
                  onChange={handleInputChange}
                  placeholder="+233 XX XXX XXXX"
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="mt-1 text-xs text-gray-600">
                  This phone number will be used to send OTP codes for secure login
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-sm font-medium text-gray-700">
                    New Password
                  </label>
                  <button
                    type="button"
                    onClick={generateStrongPassword}
                    className="text-sm text-blue-600 hover:text-blue-800"
                  >
                    Generate Strong Password
                  </button>
                </div>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  name="newPassword"
                  value={credentials.newPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                />
                <div className="mt-2 text-xs text-gray-600">
                  <p>Password must have:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>At least 8 characters</li>
                    <li>One uppercase letter (A-Z)</li>
                    <li>One lowercase letter (a-z)</li>
                    <li>One number (0-9)</li>
                    <li>One special character (!@#$%^&*)</li>
                  </ul>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type={showPasswords ? 'text' : 'password'}
                  name="confirmPassword"
                  value={credentials.confirmPassword}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm new password"
                />
              </div>

              {message.text && (
                <div className={`p-4 rounded-md flex items-center ${
                  message.type === 'success' 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {message.type === 'success' ? (
                    <CheckCircleIcon className="h-5 w-5 mr-2" />
                  ) : (
                    <ExclamationTriangleIcon className="h-5 w-5 mr-2" />
                  )}
                  {message.text}
                </div>
              )}

              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => router.push('/admin-dashboard')}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
                >
                  <PencilIcon className="h-4 w-4 mr-2" />
                  Update Credentials
                </button>
              </div>
            </form>

            {/* Security Notice */}
            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-md p-4">
              <div className="flex">
                <ExclamationTriangleIcon className="h-5 w-5 text-yellow-400" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Important Security Notes
                  </h3>
                  <div className="mt-2 text-sm text-yellow-700">
                    <ul className="list-disc list-inside space-y-1">
                      <li>Changes take effect immediately</li>
                      <li>You'll need to log in again with new credentials</li>
                      <li>Keep your credentials secure and don't share them</li>
                      <li>Use a strong, unique password</li>
                      <li>Change credentials regularly for security</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
