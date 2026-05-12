'use client';

import { useConnect } from '@/context/ConnectContext';
import { AlertCircle, ChevronLeft } from 'lucide-react';

export function ErrorScreen() {
  const { session, setFlow } = useConnect();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      {/* Header */}
      <div className="absolute top-6 left-6">
        <button
          onClick={() => setFlow('intro')}
          className="text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </div>

      {/* Error Icon */}
      <div className="mb-6">
        <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
          <AlertCircle className="w-16 h-16 text-red-600" />
        </div>
      </div>

      {/* Error Message */}
      <div className="text-center max-w-sm mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Connection failed</h1>
        <p className="text-gray-600 mb-4">
          {session.error || 'An error occurred while connecting your bank account.'}
        </p>
        <p className="text-sm text-gray-500 mb-8">
          Please try again or contact support if the problem persists.
        </p>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => setFlow('intro')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Try again
          </button>
          <button
            onClick={() => setFlow('bank-selection')}
            className="w-full bg-gray-100 hover:bg-gray-200 text-gray-900 font-semibold py-3 rounded-lg transition-colors"
          >
            Choose different bank
          </button>
        </div>
      </div>
    </div>
  );
}
