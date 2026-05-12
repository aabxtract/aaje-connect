'use client';

import { useConnect } from '@/context/ConnectContext';
import { CheckCircle } from 'lucide-react';

export function SuccessScreen() {
  const { session } = useConnect();
  const whatsappBotNumber = process.env.NEXT_PUBLIC_WHATSAPP_BOT_NUMBER || '234123456789';
  const whatsappLink = `https://wa.me/${whatsappBotNumber}?text=done`;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white px-6">
      {/* Success Icon */}
      <div className="mb-6">
        <div className="relative">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-16 h-16 text-green-600" />
          </div>
          <div className="absolute top-0 right-0 w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

      {/* Success Message */}
      <div className="text-center max-w-sm mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Bank account connected!</h1>
        <p className="text-gray-600 mb-6">
          Your {session.selectedBank?.name} account has been successfully linked to AAJE.
        </p>

        {/* Connection Details */}
        <div className="bg-gray-50 rounded-lg p-4 mb-8">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Bank</span>
              <span className="text-sm font-medium text-gray-900">{session.selectedBank?.name}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Login Method</span>
              <span className="text-sm font-medium text-gray-900">
                {session.loginMethod === 'internet-banking' ? 'Internet Banking' : 'Mobile Banking'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Status</span>
              <span className="text-sm font-medium text-green-600">Connected</span>
            </div>
          </div>
        </div>

        {/* Return to WhatsApp Button */}
        <a
          href={whatsappLink}
          className="inline-block w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-colors mb-4"
        >
          Return to WhatsApp
        </a>

        {/* Additional Info */}
        <p className="text-xs text-gray-500">
          You can now continue with your AAJE onboarding in WhatsApp.
        </p>
      </div>
    </div>
  );
}
