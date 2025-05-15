import React, { useState } from 'react';

const loans = [
  {
    name: 'Car Loan',
    description: 'Finance your new or used car with flexible repayment options.',
    illustration: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="6" y="24" width="36" height="12" rx="6" fill="#3B82F6" fillOpacity="0.15" />
        <rect x="12" y="16" width="24" height="12" rx="6" fill="#3B82F6" fillOpacity="0.3" />
        <rect x="18" y="10" width="12" height="10" rx="5" fill="#3B82F6" />
      </svg>
    )
  },
  {
    name: 'Micro Loan',
    description: 'Quick, small loans for urgent needs or business capital.',
    illustration: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="20" fill="#10B981" fillOpacity="0.15" />
        <circle cx="24" cy="24" r="12" fill="#10B981" fillOpacity="0.3" />
        <circle cx="24" cy="24" r="6" fill="#10B981" />
      </svg>
    )
  },
  {
    name: 'Home Loan',
    description: 'Affordable rates for buying or renovating your home.',
    illustration: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="20" width="32" height="16" rx="4" fill="#F59E42" fillOpacity="0.15" />
        <rect x="14" y="26" width="20" height="10" rx="3" fill="#F59E42" fillOpacity="0.3" />
        <polygon points="24,10 8,20 40,20" fill="#F59E42" />
      </svg>
    )
  },
  {
    name: 'Education Loan',
    description: 'Support your studies with easy education financing.',
    illustration: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="24" cy="36" rx="16" ry="6" fill="#6366F1" fillOpacity="0.15" />
        <rect x="14" y="14" width="20" height="12" rx="4" fill="#6366F1" fillOpacity="0.3" />
        <rect x="20" y="10" width="8" height="8" rx="4" fill="#6366F1" />
      </svg>
    )
  },
  {
    name: 'Personal Loan',
    description: 'Unsecured loans for personal expenses and emergencies.',
    illustration: (
      <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="10" y="28" width="28" height="10" rx="5" fill="#EC4899" fillOpacity="0.15" />
        <circle cx="24" cy="20" r="10" fill="#EC4899" fillOpacity="0.3" />
        <circle cx="24" cy="20" r="5" fill="#EC4899" />
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
                <p className="text-gray-600 mt-1">{loan.description}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestLoan; 