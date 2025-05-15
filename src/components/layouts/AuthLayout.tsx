import React from 'react';
import { Outlet } from 'react-router-dom';
import { CreditCard } from 'lucide-react';

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - Brand/illustration */}
      <div className="hidden md:flex md:w-1/2 bg-primary-600 flex-col justify-center items-center p-8 text-white">
        <div className="max-w-md mx-auto text-center">
          <div className="bg-white/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <CreditCard className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold mb-4">MerchantPay</h1>
          <p className="text-lg mb-8 text-white/90">
            The complete merchant solution for payments, bills, transfers, and marketing.
          </p>
          
          <div className="space-y-8 mt-16">
            <div className="bg-white/10 rounded-lg p-6 text-left">
              <p className="font-medium mb-2">Streamlined Payments</p>
              <p className="text-sm text-white/80">
                "MerchantPay transformed how we handle transactions. The dashboard gives us 
                insights we never had before."
              </p>
              <div className="mt-4 flex items-center">
                <div className="h-8 w-8 rounded-full bg-primary-300 flex items-center justify-center text-primary-800 font-bold">
                  JD
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Jane Doe</p>
                  <p className="text-xs text-white/70">Business Owner</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right side - Auth forms */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4 sm:p-8">
        <div className="w-full ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;