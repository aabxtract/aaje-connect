'use client';

import { useConnect } from '@/context/ConnectContext';
import { LoginMethod } from '@/types';
import { ChevronLeft, Smartphone, Globe } from 'lucide-react';

export function LoginMethodBottomSheet() {
  const { session, selectLoginMethod, setFlow } = useConnect();
  const { selectedBank } = session;

  const handleSelectMethod = (method: LoginMethod) => {
    selectLoginMethod(method);
    setFlow('credentials');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4 mb-2">
          <button
            onClick={() => setFlow('bank-selection')}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{selectedBank?.name}</h1>
            <p className="text-xs text-gray-600">Choose log in method</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8">
        <div className="space-y-3">
          {/* Internet Banking Option */}
          <button
            onClick={() => handleSelectMethod('internet-banking')}
            className="w-full bg-white border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 rounded-lg p-4 flex items-start gap-4 transition-all group"
          >
            <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <Globe className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left flex-1">
              <p className="font-semibold text-gray-900">Link with Internet Banking</p>
              <p className="text-xs text-gray-600 mt-1">Credentials you use with their website</p>
            </div>
          </button>

          {/* Mobile Banking Option */}
          <button
            onClick={() => handleSelectMethod('mobile-banking')}
            className="w-full bg-white border-2 border-gray-200 hover:border-blue-600 hover:bg-blue-50 rounded-lg p-4 flex items-start gap-4 transition-all group"
          >
            <div className="w-10 h-10 bg-blue-100 group-hover:bg-blue-200 rounded-lg flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-left flex-1">
              <p className="font-semibold text-gray-900">Link with Mobile Banking</p>
              <p className="text-xs text-gray-600 mt-1">Credentials you use with their mobile app</p>
            </div>
          </button>
        </div>

        <p className="text-xs text-gray-500 mt-8 text-center">
          Your bank login details are not stored and are only used to verify your account.
        </p>
      </div>
    </div>
  );
}
