import React, { useState } from 'react';

const loans = [
  {
    name: 'Buying Inventory',
    description: 'Get funds to purchase stock and keep your shelves full.',
    illustration: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="18" width="28" height="18" rx="4" fill="#3B82F6" fillOpacity="0.15" />
        <rect x="16" y="24" width="16" height="8" rx="2" fill="#3B82F6" fillOpacity="0.3" />
        <rect x="20" y="28" width="8" height="4" rx="1" fill="#3B82F6" />
      </svg>
    )
  },
  {
    name: 'Paying Rent or Salaries',
    description: 'Cover essential business expenses like rent and staff wages.',
    illustration: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="20" width="32" height="16" rx="4" fill="#10B981" fillOpacity="0.15" />
        <rect x="14" y="26" width="20" height="10" rx="3" fill="#10B981" fillOpacity="0.3" />
        <rect x="20" y="30" width="8" height="4" rx="2" fill="#10B981" />
      </svg>
    )
  },
  {
    name: 'Expanding Store',
    description: 'Finance renovations or open a new branch for your business.',
    illustration: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="16" width="24" height="16" rx="4" fill="#F59E42" fillOpacity="0.15" />
        <rect x="18" y="22" width="12" height="8" rx="2" fill="#F59E42" fillOpacity="0.3" />
        <rect x="22" y="26" width="4" height="4" rx="1" fill="#F59E42" />
      </svg>
    )
  },
  {
    name: 'Cash Flow Support',
    description: 'Bridge short-term gaps in your business finances.',
    illustration: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="24" cy="28" rx="16" ry="8" fill="#6366F1" fillOpacity="0.15" />
        <rect x="16" y="20" width="16" height="12" rx="4" fill="#6366F1" fillOpacity="0.3" />
        <rect x="20" y="24" width="8" height="4" rx="2" fill="#6366F1" />
      </svg>
    )
  }
];

const RequestLoan: React.FC = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Select a Loan Type</h2>
        <div className="grid gap-6">
          {loans.map((loan, idx) => (
            <button
              key={loan.name}
              className={`w-full flex items-center text-left rounded-xl border-2 p-5 transition focus:outline-none ${selected === idx ? 'border-primary-500 bg-primary-50' : 'border-gray-200 bg-white hover:border-primary-300'}`}
              onClick={() => setSelected(idx)}
            >
              <div className="flex-shrink-0 mr-6">{loan.illustration}</div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-gray-900">{loan.name}</span>
                  {selected === idx && <span className="ml-4 text-primary-600 font-bold">Selected</span>}
                </div>
                <div className="text-gray-600 mt-1">{loan.description}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestLoan; 