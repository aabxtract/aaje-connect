'use client';

import { useEffect } from 'react';
import { useConnect } from '@/context/ConnectContext';
import { completeConnection } from '@/lib/api';

export function ProcessingScreen() {
  const { session, setFlow, setError } = useConnect();

  useEffect(() => {
    const handleCompletion = async () => {
      try {
        if (!session.selectedBank || !session.loginMethod) {
          throw new Error('Missing bank or login method');
        }

        // Generate mock account ID
        const accountId = `mock_${session.selectedBank.id}_${session.reference}`;

        // Call backend to complete connection
        await completeConnection({
          reference: session.reference,
          bank: session.selectedBank.name,
          login_method: session.loginMethod === 'internet-banking' ? 'Internet Banking' : 'Mobile Banking',
          account_id: accountId,
          status: 'connected',
        });

        // Transition to success screen
        setTimeout(() => {
          setFlow('success');
        }, 1500);
      } catch (err) {
        console.error('Error completing connection:', err);
        setError(err instanceof Error ? err.message : 'Failed to complete connection');
        setFlow('error');
      }
    };

    handleCompletion();
  }, [session, setFlow, setError]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white">
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative w-20 h-20">
          <div className="absolute inset-0 border-4 border-gray-200 rounded-full" />
          <div className="absolute inset-0 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
        </div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Processing your account</h2>
          <p className="text-sm text-gray-600">This may take a moment. Please don&apos;t close this window.</p>
        </div>
      </div>
    </div>
  );
}
