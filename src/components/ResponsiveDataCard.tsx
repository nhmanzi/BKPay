import React from 'react';

interface Transaction {
  id: number;
  customer: string;
  amount: number;
  status: string;
  date: string;
}

interface ResponsiveDataCardProps {
  transaction: Transaction;
}

const ResponsiveDataCard: React.FC<ResponsiveDataCardProps> = ({ transaction }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 mb-3">
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-sm font-medium text-gray-900">{transaction.customer}</h3>
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          transaction.status === 'completed' 
            ? 'bg-success-100 text-success-800' 
            : transaction.status === 'processing' 
              ? 'bg-warning-100 text-warning-800' 
              : 'bg-error-100 text-error-800'
        }`}>
          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
        </span>
      </div>
      <div className="flex justify-between items-center">
        <div className="text-sm font-semibold text-gray-900">
          RWF {transaction.amount.toFixed(2)}
        </div>
        <div className="text-xs text-gray-500">
          {transaction.date}
        </div>
      </div>
    </div>
  );
};

export default ResponsiveDataCard; 