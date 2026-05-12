import { Bank } from '@/types';

export const NIGERIAN_BANKS: Bank[] = [
  {
    id: 'gtbank',
    name: 'GTBank',
    code: '007',
    searchable: ['gtbank', 'guarantee trust', 'gt'],
  },
  {
    id: 'zenith',
    name: 'Zenith Bank',
    code: '014',
    searchable: ['zenith', 'zenith bank'],
  },
  {
    id: 'access',
    name: 'Access Bank',
    code: '044',
    searchable: ['access', 'access bank'],
  },
  {
    id: 'firstbank',
    name: 'FirstBank',
    code: '011',
    searchable: ['firstbank', 'first bank', 'fbng'],
  },
  {
    id: 'uba',
    name: 'UBA',
    code: '033',
    searchable: ['uba', 'united bank for africa'],
  },
  {
    id: 'kuda',
    name: 'Kuda',
    code: '050',
    searchable: ['kuda', 'kuda bank'],
  },
  {
    id: 'fcmb',
    name: 'FCMB',
    code: '001',
    searchable: ['fcmb', 'first city monument bank'],
  },
  {
    id: 'fidelity',
    name: 'Fidelity Bank',
    code: '070',
    searchable: ['fidelity', 'fidelity bank'],
  },
  {
    id: 'stanbic',
    name: 'Stanbic IBTC',
    code: '221',
    searchable: ['stanbic', 'stanbic ibtc'],
  },
  {
    id: 'alat',
    name: 'ALAT',
    code: '035',
    searchable: ['alat', 'wema', 'wema bank'],
  },
];

export function searchBanks(query: string): Bank[] {
  if (!query.trim()) return NIGERIAN_BANKS;
  
  const lowerQuery = query.toLowerCase().trim();
  return NIGERIAN_BANKS.filter(bank =>
    bank.searchable.some(searchTerm => searchTerm.includes(lowerQuery))
  );
}
