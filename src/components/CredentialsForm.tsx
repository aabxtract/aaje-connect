'use client';

import { useState } from 'react';
import { useConnect } from '@/context/ConnectContext';
import { ChevronLeft } from 'lucide-react';

export function CredentialsForm() {
  const { session, setCredentials, setFlow } = useConnect();
  const { selectedBank, loginMethod } = session;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!username || !password) {
      return;
    }

    setCredentials(username, password);
    setIsLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setIsLoading(false);
      setFlow('otp');
    }, 1500);
  };

  const loginMethodLabel =
    loginMethod === 'internet-banking'
      ? 'Internet Banking'
      : 'Mobile Banking';

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFlow('login-method')}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{selectedBank?.name}</h1>
            <p className="text-xs text-gray-600">{loginMethodLabel}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username/Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Username or Email
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white transition-colors"
              disabled={isLoading}
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white transition-colors pr-12"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                {showPassword ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Info Text */}
          <p className="text-xs text-gray-600 mt-6">
            This is a secure connection. Your credentials are never stored and are used only to verify your account.
          </p>

          {/* Submit Button */}
          <div className="pt-6">
            <button
              type="submit"
              disabled={!username || !password || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : (
                'Continue'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
