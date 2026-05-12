'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { ConnectProvider, useConnect } from '@/context/ConnectContext';
import { validateSession } from '@/lib/api';
import { IntroScreen } from '@/components/IntroScreen';
import { BankSelectionScreen } from '@/components/BankSelectionScreen';
import { LoginMethodBottomSheet } from '@/components/LoginMethodBottomSheet';
import { CredentialsForm } from '@/components/CredentialsForm';
import { OTPForm } from '@/components/OTPForm';
import { ProcessingScreen } from '@/components/ProcessingScreen';
import { SuccessScreen } from '@/components/SuccessScreen';
import { ErrorScreen } from '@/components/ErrorScreen';

function ConnectFlow() {
  const { session } = useConnect();
  const searchParams = useSearchParams();
  const [isValidating, setIsValidating] = useState(true);
  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    const validateReference = async () => {
      const reference = searchParams.get('reference');

      if (!reference) {
        setValidationError('Invalid or missing reference');
        setIsValidating(false);
        return;
      }

      try {
        await validateSession(reference);
        setIsValidating(false);
      } catch (error) {
        console.error('Error validating session:', error);
        setValidationError('This bank connection link is invalid or has expired. Please return to WhatsApp and request a new link.');
        setIsValidating(false);
      }
    };

    validateReference();
  }, [searchParams]);

  if (isValidating) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  if (validationError) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white px-6">
        <div className="text-center max-w-sm">
          <svg className="w-16 h-16 text-red-600 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-xl font-bold text-gray-900 mb-2">Invalid Session</h1>
          <p className="text-gray-600 mb-6">{validationError}</p>
          <a
            href="https://wa.me"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            Return to WhatsApp
          </a>
        </div>
      </div>
    );
  }

  // Render appropriate screen based on current flow
  switch (session.currentFlow) {
    case 'intro':
      return <IntroScreen />;
    case 'bank-selection':
      return <BankSelectionScreen />;
    case 'login-method':
      return <LoginMethodBottomSheet />;
    case 'credentials':
      return <CredentialsForm />;
    case 'otp':
      return <OTPForm />;
    case 'processing':
      return <ProcessingScreen />;
    case 'success':
      return <SuccessScreen />;
    case 'error':
      return <ErrorScreen />;
    default:
      return <IntroScreen />;
  }
}

export default function ConnectPage() {
  const reference = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('reference') : null;

  if (!reference) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-white px-6">
        <div className="text-center max-w-sm">
          <h1 className="text-xl font-bold text-gray-900 mb-2">Invalid Session</h1>
          <p className="text-gray-600">No reference provided. Please start from WhatsApp.</p>
        </div>
      </div>
    );
  }

  return (
    <ConnectProvider reference={reference}>
      <ConnectFlow />
    </ConnectProvider>
  );
}
