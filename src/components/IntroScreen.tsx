'use client';

import { useConnect } from '@/context/ConnectContext';
import { ChevronRight } from 'lucide-react';

export function IntroScreen() {
  const { setFlow } = useConnect();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      {/* Header */}
      <div className="absolute top-6 left-6">
        <div className="text-2xl font-bold text-blue-600">AAJE</div>
      </div>

      {/* Close button placeholder - can be used for modal */}
      <div className="absolute top-6 right-6">
        <button className="text-gray-400 hover:text-gray-600">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* Intro Content */}
      <div className="flex flex-col items-center text-center max-w-sm">
        {/* Avatar Circle */}
        <div className="w-20 h-20 bg-gradient-to-br from-orange-200 to-orange-300 rounded-full flex items-center justify-center mb-8">
          <span className="text-3xl font-bold text-white">A</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Aaje uses <span className="text-blue-600">AAJE Connect</span> to link your account
        </h1>

        {/* Description */}
        <p className="text-gray-600 text-sm mb-8">
          Securely connect your bank account to get started with AAJE
        </p>

        {/* Trust Points */}
        <div className="space-y-4 mb-12 w-full">
          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center mt-0.5 flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 text-sm">Trust</p>
              <p className="text-gray-600 text-xs">Over 100 businesses trust AAJE Connect</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center mt-0.5 flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 text-sm">Private</p>
              <p className="text-gray-600 text-xs">Your credentials are safe and private</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-blue-600 flex items-center justify-center mt-0.5 flex-shrink-0">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-gray-900 text-sm">Secure</p>
              <p className="text-gray-600 text-xs">AES-256 encryption protects your data</p>
            </div>
          </div>
        </div>

        {/* Link Account Button */}
        <button
          onClick={() => setFlow('bank-selection')}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors"
        >
          Link account
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Footer text */}
        <p className="text-xs text-gray-500 mt-8 text-center">
          By clicking &apos;Link account&apos; you agree to AAJE&apos;s{' '}
          <a href="#" className="text-blue-600 hover:underline">
            End-user Policy
          </a>
        </p>
      </div>
    </div>
  );
}
