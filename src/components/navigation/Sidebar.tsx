import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { 
  LayoutDashboard, 
  CreditCard, 
  Receipt, 
  ArrowRightLeft, 
  Megaphone,
  Settings,
  HelpCircle,
  LogOut,
  HandCoins,
  ShieldAlert
} from 'lucide-react';
const BKPayLogo = '/assets/BKPAY-white.svg';
import SidebarBg from '/assets/Sidebar.png';
import VerificationModal from '../modals/VerificationModal';

interface SidebarProps {
  mobile?: boolean;
  closeSidebar?: () => void;
}

const Sidebar = ({ mobile = false, closeSidebar }: SidebarProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    // { name: 'Payments', href: '/payments', icon: CreditCard },
    { name: 'Bills', href: '/bills', icon: Receipt },
    { name: 'Transfers', href: '/transfers', icon: ArrowRightLeft },
    { name: 'Request Loan', href: '/request-loan', icon: HandCoins },
    { name: 'Brand kits', href: '/flyers', icon: Megaphone },
    { name: 'Loyalty Points', href: '/loyalty', icon: ShieldAlert },
  ];

  // const secondaryNavigation = [
  //   { name: 'Settings', href: '/settings', icon: Settings },
  //   { name: 'Help', href: '/help', icon: HelpCircle },
  // ];

  const handleClick = () => {
    if (mobile && closeSidebar) {
      closeSidebar();
    }
  };

  // const navItemClasses = (isActive: boolean) => 
  //   `flex items-center px-4 py-2 my-1 text-sm font-medium rounded-md ${
  //     isActive 
  //       ? 'bg-primary-50 text-primary-700' 
  //       : 'text-gray-700 hover:bg-gray-100'
  //   }`;

  return (
    <div
      className="flex flex-col h-full"
      style={{
        backgroundColor:'#061525',
        backgroundImage: `url(${SidebarBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-gray-800">
        <div className="flex items-center my-3">
          <span className="text-primary-200 font-bold rounded-full px-3 py-1 text-2xl mr-2">
            <img src={BKPayLogo} alt="BKPay Logo" className="h-10 w-auto" />
          </span>
        </div>
      </div>

      {/* Merchant Code - prominent display */}
      {user && (
        <div className="p-4 border-b border-gray-800 flex flex-col items-center">
          <div className="bg-gradient-to-r from-primary-400 to-primary-700 shadow-lg rounded-xl px-6 py-4 flex flex-col items-center w-full animate-pulse-slow">
            <span className="text-xs font-semibold text-white uppercase tracking-widest mb-1">Merchant Code</span>
            <span className="text-3xl font-mono font-bold text-white tracking-widest drop-shadow-lg select-all">11333357</span>
          </div>
        </div>
      )}

      {/* Primary Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <div className="mb-8">
          <div className="px-3 mb-2">
            <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
              Main
            </h3>
          </div>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={`flex items-center px-4 py-2 my-1 text-sm font-medium rounded-md transition-colors duration-150 ${
                  isActive
                    ? 'bg-primary-700/80 text-white border border-primary-400'
                    : 'text-gray-100 hover:bg-gray-800/80 hover:text-white'
                }`}
                onClick={handleClick}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-200' : 'text-gray-400 group-hover:text-white'}`}
                />
                {item.name}
              </NavLink>
            );
          })}
        </div>

        {/* Verification Card */}
      
        {!user?.isVerified && (
          <button
            onClick={() => setShowVerificationModal(true)}
            className="w-4/5 flex flex-col px-4 ml-3 py-4 my-1 text-sm font-medium rounded-lg bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border border-yellow-500/30 hover:bg-gradient-to-br hover:from-yellow-500/30 hover:to-yellow-600/30 transition-all duration-300 shadow-lg shadow-yellow-500/10 hover:shadow-yellow-500/20 group text-left"
          >
            <div className="flex items-center mb-2">
              <span className="font-semibold text-yellow-300">Verify Account</span>
            </div>
            <p className="text-xs text-yellow-300/90 leading-relaxed">
              Verify your account to get access to extra features
            </p>
            <div className="mt-2">
              <span className="inline-flex items-center text-xs text-yellow-300/80 group-hover:text-yellow-300 transition-colors duration-300">
                Click to verify
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </button>
        )}
      </nav>

      {/* <div>
        <div className="px-3 mb-2">
          <h3 className="text-xs font-semibold text-gray-300 uppercase tracking-wider">
            Support
          </h3>
        </div>
        {secondaryNavigation.map((item) => (
          <div
            key={item.name}
            className="flex items-center px-4 py-2 my-1 text-sm font-medium rounded-md text-gray-500 bg-gray-800/60 cursor-not-allowed"
          >
            <item.icon className="mr-3 h-5 w-5 text-gray-700" />
            {item.name}
          </div>
        ))}
      </div> */}

      {/* Logout */}
      <div className="border-t border-gray-800 p-4">
        <button
          onClick={() => {
            logout();
            if (mobile && closeSidebar) {
              closeSidebar();
            }
          }}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-100 rounded-md hover:bg-gray-800/80 w-full"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-400 group-hover:text-white" />
          Logout
        </button>
      </div>

      {/* Verification Modal */}
      <VerificationModal 
        isOpen={showVerificationModal}
        onClose={() => setShowVerificationModal(false)}
      />
    </div>
  );
};

export default Sidebar;