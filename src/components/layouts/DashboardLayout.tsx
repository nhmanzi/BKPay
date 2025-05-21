import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../navigation/Sidebar';
import Header from '../navigation/Header';
import { 
  Menu,
  X,
  Check
} from 'lucide-react';
const welcomeImg = '/assets/welcome.png';

type DashboardWelcomeModalProps = {
  open: boolean;
  onClose: () => void;
  merchantName?: string;
  merchantCode?: string;
};

const DashboardWelcomeModal = ({ open, onClose, merchantName = "Ngabo", merchantCode = "23456" }: DashboardWelcomeModalProps) => {
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(merchantCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-80" >
      <div className="rounded-2xl bg-white relative w-full max-w-md mx-auto overflow-hidden" >
        <div className="h-48 w-full bg-gray-200 relative">
          {/* Placeholder image, replace src with actual asset if available */}
          <img src={welcomeImg} alt="Welcome" className="object-cover w-full h-full" />
          <button onClick={onClose} className="absolute top-3 right-3 bg-white bg-opacity-80 rounded-full p-1.5 hover:bg-opacity-100 transition">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-gray-700">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-8 pb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">Welcome {merchantName} <span className='text-2xl'>🥳</span></h2>
          <p className="text-gray-500 mb-6">Below is your merchant code</p>
          <div className="flex justify-center gap-3 mb-6">
            {merchantCode.split('').map((digit, idx) => (
              <div key={idx} className="w-12 h-12 flex items-center justify-center rounded-lg border border-gray-200 text-2xl font-medium bg-gray-50">{digit}</div>
            ))}
          </div>
          <div className="flex gap-3 justify-center">
            <button
              className={`font-medium rounded-lg px-6 py-2 transition flex items-center justify-center gap-2 ${copied ? 'bg-white text-green-600 shadow border border-green-100' : 'bg-primary-600 hover:bg-primary-700 text-white'}`}
              onClick={handleCopy}
              disabled={copied}
            >
              {copied ? <><Check className="w-5 h-5 text-green-600" />Copied</> : 'Copy code'}
            </button>
            <button
              className="bg-white border border-gray-200 hover:bg-gray-50 text-gray-900 font-medium rounded-lg px-6 py-2 transition"
              onClick={() => {
                onClose();
                setTimeout(() => navigate('/flyers'), 200);
              }}
            >Get brand kit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowWelcome(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 overflow-x-hidden w-full">
      {/* Modal for dashboard welcome */}
      <DashboardWelcomeModal open={showWelcome} onClose={() => setShowWelcome(false)} />
      {/* Mobile sidebar */}
      <div className="lg:hidden">
        {sidebarOpen && (
          <motion.div
            initial={false}
            animate={sidebarOpen ? "open" : "closed"}
            className="fixed inset-0 z-50 flex"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-gray-600 bg-opacity-75"
              onClick={() => setSidebarOpen(false)}
            />

            {/* Sidebar below header */}
            <motion.div
              variants={{
                open: { x: 0 },
                closed: { x: "-100%" }
              }}
              transition={{ duration: 0.2 }}
              className="relative flex w-full max-w-xs flex-1 flex-col bg-white mt-16 h-[calc(100vh-4rem)]"
              style={{ top: 0 }}
            >
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                  onClick={() => setSidebarOpen(false)}
                >
                  <X className="h-6 w-6 text-gray-600" />
                </button>
              </div>
              <Sidebar mobile closeSidebar={() => setSidebarOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <div className="fixed inset-y-0 left-0 w-64 bg-white border-r border-gray-200 z-30 flex flex-col">
          <Sidebar />
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1 flex-col min-h-screen w-full lg:ml-64">
        {/* Fixed header on mobile/tablet */}
        <div className="bg-white border-b border-gray-100 z-50 fixed top-0 left-0 w-full h-16 lg:static lg:h-auto">
          <Header>
            <button
              className="lg:hidden -ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md text-gray-600 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
              onClick={() => { console.log('Burger menu clicked'); setSidebarOpen(true); }}
            >
              <Menu className="h-6 w-6" />
            </button>
          </Header>
        </div>
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 md:p-6 lg:p-8 w-full pt-16 lg:pt-0">
          <div className="max-w-[1400px] mx-auto pt-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;