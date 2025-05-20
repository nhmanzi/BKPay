import React from 'react';
import { Outlet } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import HomeImage from '/assets/HomeImage.png'; // Adjust extension if needed

const AuthLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side - Brand/illustration */}
      <div
        className="hidden md:flex md:w-1/2 flex-col justify-end items-center p-8 text-white relative overflow-hidden"
        style={{
          backgroundImage: `url(${HomeImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Overlay for readability */}

        <div className="max-w-md mx-auto text-center relative z-10 mb-0 "> 
            <div
              className="text-left "
              style={{
                borderRadius: '15px',
                border: '2px solid rgba(255, 255, 255, 0.50)',
                background: 'rgba(212, 212, 212, 0.10)',
                backdropFilter: 'blur(16.7px)',
                display: 'flex',
                width: '451px',
                padding: '31px 20px 20px 20px',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'flex-start',
        
      
              }}
            >
              <p className="font-medium mb-2">Streamlined Payments</p>
              <p className="text-sm text-white/80">
                BKPAY merchant transformed how we handle transactions. The dashboard gives us 
                insights we never had before.
              </p>
              <div className="mt-4 flex items-center">
                <div
                  className="h-8 w-8 flex items-center justify-center text-sm text-white font-bold"
                  style={{
                    borderRadius: '20px',
                    background: 'linear-gradient(151deg, #FFF 13.07%, rgba(255, 255, 255, 0.20) 82.79%)'
                  }}
                >
                RK
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">Rukundo Jean Baptiste</p>
                  <p className="text-xs text-white/70">Business Owner</p>
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