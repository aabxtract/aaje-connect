export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-6">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">AAJE Connect</h1>
        <p className="text-gray-700 mb-8">A secure bank account linking experience for AAJE WhatsApp users.</p>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Getting Started</h2>
          <p className="text-sm text-gray-600 mb-4">
            This application handles the bank linking flow for AAJE onboarding. Users are redirected here from WhatsApp with a unique reference.
          </p>

          <div className="bg-blue-50 rounded p-4 mb-6">
            <p className="text-xs font-mono text-gray-800">/connect?reference=USER_REFERENCE</p>
          </div>

          <div className="text-left space-y-3 mb-6">
            <h3 className="font-semibold text-gray-900">Features:</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>✓ Mono-like multi-step flow</li>
              <li>✓ Bank selection with search</li>
              <li>✓ Login method selection</li>
              <li>✓ Mock credentials & OTP forms</li>
              <li>✓ Backend integration</li>
              <li>✓ WhatsApp handoff</li>
            </ul>
          </div>
        </div>

        <p className="text-xs text-gray-600">Built with Next.js + Tailwind CSS</p>
      </div>
    </div>
  );
}
