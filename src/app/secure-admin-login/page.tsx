'use client'
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LockClosedIcon, EyeIcon, EyeSlashIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

export default function SecureAdminLogin() {
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
    twoFactorCode: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loginStep, setLoginStep] = useState(1); // 1: username/password, 2: 2FA
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [isBlocked, setIsBlocked] = useState(false);

  // Check if already authenticated
  useEffect(() => {
    const adminToken = localStorage.getItem('admin-token');
    const tokenExpiry = localStorage.getItem('admin-token-expiry');
    
    if (adminToken && tokenExpiry) {
      const now = new Date().getTime();
      if (now < parseInt(tokenExpiry)) {
        router.push('/admin-dashboard');
        return;
      }
    }

    // Check if blocked due to too many attempts
    const blockedUntil = localStorage.getItem('admin-blocked-until');
    if (blockedUntil && new Date().getTime() < parseInt(blockedUntil)) {
      setIsBlocked(true);
      const remaining = Math.ceil((parseInt(blockedUntil) - new Date().getTime()) / 1000 / 60);
      setError(`Too many failed attempts. Try again in ${remaining} minutes.`);
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const validateCredentials = () => {
    // In production, this would be handled by your backend API
    const validUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME || 'thefinethings_admin';
    const validPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || 'TFT@admin2025!';
    
    return credentials.username === validUsername && credentials.password === validPassword;
  };

  const generateTwoFactorCode = () => {
    // In production, this would be sent via SMS/email
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    localStorage.setItem('temp-2fa-code', code);
    alert(`Your 2FA code is: ${code}\n\n(In production, this would be sent to your phone/email)`);
    return code;
  };

  const validateTwoFactorCode = () => {
    const validCode = localStorage.getItem('temp-2fa-code');
    return credentials.twoFactorCode === validCode;
  };

  const handleFirstStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isBlocked) return;

    setIsLoading(true);
    setError('');

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (validateCredentials()) {
      // Generate and send 2FA code
      generateTwoFactorCode();
      setLoginStep(2);
      setIsLoading(false);
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        // Block for 30 minutes after 3 failed attempts
        const blockUntil = new Date().getTime() + (30 * 60 * 1000);
        localStorage.setItem('admin-blocked-until', blockUntil.toString());
        setIsBlocked(true);
        setError('Too many failed attempts. Access blocked for 30 minutes.');
      } else {
        setError(`Invalid credentials. ${3 - newAttempts} attempts remaining.`);
      }
      setIsLoading(false);
    }
  };

  const handleSecondStepSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));

    if (validateTwoFactorCode()) {
      // Generate secure token
      const token = btoa(JSON.stringify({
        username: credentials.username,
        timestamp: new Date().getTime(),
        role: 'admin'
      }));
      
      // Set token with 8-hour expiry
      const expiry = new Date().getTime() + (8 * 60 * 60 * 1000);
      localStorage.setItem('admin-token', token);
      localStorage.setItem('admin-token-expiry', expiry.toString());
      localStorage.removeItem('temp-2fa-code');
      
      // Reset attempts
      setAttempts(0);
      localStorage.removeItem('admin-blocked-until');
      
      router.push('/admin-dashboard');
    } else {
      setError('Invalid 2FA code. Please try again.');
    }
    setIsLoading(false);
  };

  const resendTwoFactorCode = () => {
    generateTwoFactorCode();
    setError('');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <ShieldCheckIcon className="mx-auto h-12 w-12 text-red-600" />
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Secure Admin Access
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {loginStep === 1 ? 'Step 1: Enter your credentials' : 'Step 2: Two-factor authentication'}
          </p>
        </div>

        {/* Warning Banner */}
        <div className="bg-red-50 border border-red-200 rounded-md p-4">
          <div className="flex">
            <LockClosedIcon className="h-5 w-5 text-red-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Authorized Personnel Only
              </h3>
              <p className="mt-1 text-sm text-red-700">
                This is a secure area. All access attempts are logged and monitored.
              </p>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={loginStep === 1 ? handleFirstStepSubmit : handleSecondStepSubmit}>
          <div className="bg-white p-6 rounded-lg shadow-md">
            {loginStep === 1 ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Admin Username
                  </label>
                  <input
                    id="username"
                    name="username"
                    type="text"
                    required
                    value={credentials.username}
                    onChange={handleInputChange}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500"
                    placeholder="Enter admin username"
                    disabled={isLoading || isBlocked}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Admin Password
                  </label>
                  <div className="mt-1 relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={credentials.password}
                      onChange={handleInputChange}
                      className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 pr-10"
                      placeholder="Enter admin password"
                      disabled={isLoading || isBlocked}
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                      ) : (
                        <EyeIcon className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="twoFactorCode" className="block text-sm font-medium text-gray-700">
                    6-Digit Verification Code
                  </label>
                  <input
                    id="twoFactorCode"
                    name="twoFactorCode"
                    type="text"
                    required
                    maxLength={6}
                    value={credentials.twoFactorCode}
                    onChange={handleInputChange}
                    className="mt-1 appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-red-500 focus:border-red-500 text-center text-2xl tracking-widest"
                    placeholder="000000"
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="button"
                  onClick={resendTwoFactorCode}
                  className="w-full text-sm text-red-600 hover:text-red-800"
                >
                  Resend verification code
                </button>
              </div>
            )}

            {error && (
              <div className="mt-4 bg-red-50 border border-red-200 rounded-md p-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading || isBlocked}
              className="mt-6 group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Verifying...
                </div>
              ) : (
                <>
                  <LockClosedIcon className="h-5 w-5 mr-2" />
                  {loginStep === 1 ? 'Continue to 2FA' : 'Access Admin Dashboard'}
                </>
              )}
            </button>
          </div>
        </form>

        {loginStep === 2 && (
          <button
            onClick={() => setLoginStep(1)}
            className="w-full text-center text-sm text-gray-600 hover:text-gray-800"
          >
            ← Back to login
          </button>
        )}

        {/* Security Notice */}
        <div className="text-center text-xs text-gray-500">
          <p>This system uses bank-level security protocols</p>
          <p>Session expires after 8 hours of inactivity</p>
        </div>
      </div>
    </div>
  );
}
