import React from 'react';
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
  LogOut
} from 'lucide-react';

interface SidebarProps {
  mobile?: boolean;
  closeSidebar?: () => void;
}

const Sidebar = ({ mobile = false, closeSidebar }: SidebarProps) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  
  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Payments', href: '/payments', icon: CreditCard },
    { name: 'Bills', href: '/bills', icon: Receipt },
    { name: 'Transfers', href: '/transfers', icon: ArrowRightLeft },
    { name: 'Flyers', href: '/flyers', icon: Megaphone },
  ];

  const secondaryNavigation = [
    { name: 'Settings', href: '/settings', icon: Settings },
    { name: 'Help', href: '/help', icon: HelpCircle },
  ];

  const handleClick = () => {
    if (mobile && closeSidebar) {
      closeSidebar();
    }
  };

  const navItemClasses = (isActive: boolean) => 
    `flex items-center px-4 py-2 my-1 text-sm font-medium rounded-md ${
      isActive 
        ? 'bg-primary-50 text-primary-700' 
        : 'text-gray-700 hover:bg-gray-100'
    }`;

  return (
    <div className="flex flex-col h-full bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-gray-200">
        <div className="flex items-center space-x-2">
          <CreditCard className="h-6 w-6 text-primary-600" />
          <span className="text-lg font-bold text-gray-900">MerchantPay</span>
        </div>
      </div>

      {/* User info */}
      {user && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center">
            <div className="h-9 w-9 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-medium">
              {user.name.charAt(0) + user.name.split(' ')[1]?.charAt(0)}
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">{user.name}</p>
              <p className="text-xs text-gray-500">{user.businessName}</p>
            </div>
          </div>
        </div>
      )}

      {/* Primary Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        <div className="mb-8">
          <div className="px-3 mb-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Main
            </h3>
          </div>
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={navItemClasses(isActive)}
                onClick={handleClick}
              >
                <item.icon 
                  className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} 
                />
                {item.name}
              </NavLink>
            );
          })}
        </div>

        <div>
          <div className="px-3 mb-2">
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
              Support
            </h3>
          </div>
          {secondaryNavigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.name}
                to={item.href}
                className={navItemClasses(isActive)}
                onClick={handleClick}
              >
                <item.icon 
                  className={`mr-3 h-5 w-5 ${isActive ? 'text-primary-600' : 'text-gray-500'}`} 
                />
                {item.name}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-4">
        <button
          onClick={() => {
            logout();
            if (mobile && closeSidebar) {
              closeSidebar();
            }
          }}
          className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 w-full"
        >
          <LogOut className="mr-3 h-5 w-5 text-gray-500" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;