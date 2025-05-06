import React from 'react';
import { Outlet } from 'react-router-dom';
import { CreditCard } from 'lucide-react';

const OnboardingLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <CreditCard className="h-8 w-8 text-primary-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">MerchantPay</span>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="max-w-3xl mx-auto px-4 py-8 sm:py-12">
        <Outlet />
      </main>
    </div>
  );
};

export default OnboardingLayout;