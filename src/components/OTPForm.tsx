'use client';

import { useState, useRef } from 'react';
import { useConnect } from '@/context/ConnectContext';
import { ChevronLeft } from 'lucide-react';

export function OTPForm() {
  const { session, setOTP, setFlow } = useConnect();
  const { selectedBank } = session;
  const [otp, setOtpLocal] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtpLocal(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      return;
    }

    setOTP(otpValue);
    setIsLoading(true);

    // Simulate OTP verification
    setTimeout(() => {
      setIsLoading(false);
      setFlow('processing');
    }, 1500);
  };

  const isComplete = otp.every(digit => digit !== '');

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setFlow('credentials')}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Verify with OTP</h1>
            <p className="text-xs text-gray-600">{selectedBank?.name}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 px-6 py-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <p className="text-sm text-gray-900 mb-2">
              Enter the 6-digit code sent to your registered phone
            </p>
            <p className="text-xs text-gray-600">
              This is a mock verification. Enter any 6 digits to proceed.
            </p>
          </div>

          {/* OTP Input */}
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isLoading}
                className="w-12 h-14 text-center text-2xl font-bold bg-gray-50 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-600 focus:bg-white transition-colors disabled:bg-gray-200"
              />
            ))}
          </div>

          {/* Resend Link */}
          <div className="text-center">
            <p className="text-xs text-gray-600">
              Didn&apos;t receive code?{' '}
              <button
                type="button"
                disabled={isLoading}
                className="text-blue-600 hover:underline font-medium disabled:text-gray-400"
              >
                Resend OTP
              </button>
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={!isComplete || isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Verifying...
                </span>
              ) : (
                'Verify'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
