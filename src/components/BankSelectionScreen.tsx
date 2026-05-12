'use client';

import { useState } from 'react';
import { useConnect } from '@/context/ConnectContext';
import { NIGERIAN_BANKS, searchBanks } from '@/lib/banks';
import { Bank } from '@/types';
import { Search, ChevronLeft } from 'lucide-react';

export function BankSelectionScreen() {
  const { selectBank, setFlow } = useConnect();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredBanks, setFilteredBanks] = useState(NIGERIAN_BANKS);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setFilteredBanks(searchBanks(query));
  };

  const handleSelectBank = (bank: Bank) => {
    selectBank(bank);
    setFlow('login-method');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 z-10">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setFlow('intro')}
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <div className="text-lg font-semibold text-gray-900 flex-1 text-center">Choose your bank</div>
          <div className="w-6" />
        </div>

        {/* Search Box */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search Institution"
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full bg-gray-100 text-gray-900 placeholder-gray-500 pl-10 pr-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
        </div>
      </div>

      {/* Bank Grid */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {filteredBanks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12">
            <svg className="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <p className="text-gray-600 text-center">
              <p className="font-semibold mb-1">No institutions found</p>
              <p className="text-sm">No institution available at the moment, please try again later.</p>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 pb-4">
            {filteredBanks.map((bank) => (
              <button
                key={bank.id}
                onClick={() => handleSelectBank(bank)}
                className="flex items-center justify-center p-4 bg-white border-2 border-gray-200 rounded-lg hover:border-blue-600 hover:bg-blue-50 transition-all group"
              >
                <div className="flex flex-col items-center gap-2">
                  {/* Bank Logo Placeholder */}
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center group-hover:from-blue-200 group-hover:to-blue-300 transition-all">
                    <span className="text-sm font-bold text-blue-600">{bank.name.substring(0, 2).toUpperCase()}</span>
                  </div>
                  <span className="text-xs font-medium text-gray-900 text-center">{bank.name}</span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
