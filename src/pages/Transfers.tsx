import React, { useState } from 'react';
import { ArrowUpDown, ChevronDown, Filter, Search, ArrowDown, ArrowUp, MoreHorizontal, Calendar, Wallet, CreditCard, Ban as Bank } from 'lucide-react';
import { format } from 'date-fns';

const transfersData = [
  { id: 'TR-001', type: 'deposit', amount: 5000.00, status: 'completed', date: '2023-04-23', source: 'Bank Account' },
  { id: 'TR-002', type: 'withdrawal', amount: 1200.00, status: 'pending', date: '2023-04-22', destination: 'Bank Account' },
  { id: 'TR-003', type: 'deposit', amount: 3500.00, status: 'completed', date: '2023-04-21', source: 'Credit Card' },
  { id: 'TR-004', type: 'withdrawal', amount: 800.00, status: 'completed', date: '2023-04-20', destination: 'Bank Account' },
  { id: 'TR-005', type: 'deposit', amount: 1200.00, status: 'failed', date: '2023-04-19', source: 'Bank Account' },
  { id: 'TR-006', type: 'withdrawal', amount: 2500.00, status: 'completed', date: '2023-04-18', destination: 'Bank Account' },
  { id: 'TR-007', type: 'deposit', amount: 4200.00, status: 'completed', date: '2023-04-17', source: 'Credit Card' },
  { id: 'TR-008', type: 'withdrawal', amount: 1800.00, status: 'pending', date: '2023-04-16', destination: 'Bank Account' },
];

const Transfers = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showNewTransfer, setShowNewTransfer] = useState(false);
  
  const filteredTransfers = transfersData.filter(transfer => {
    const matchesSearch = 
      transfer.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || transfer.status === statusFilter;
    const matchesType = typeFilter === 'all' || transfer.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success-100 text-success-800';
      case 'pending':
        return 'bg-warning-100 text-warning-800';
      case 'failed':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    if (type === 'deposit') {
      return <ArrowDown className="h-5 w-5 text-success-500" />;
    }
    return <ArrowUp className="h-5 w-5 text-primary-500" />;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Transfers</h1>
        <button 
          className="btn btn-primary"
          onClick={() => setShowNewTransfer(true)}
        >
          + New Transfer
        </button>
      </div>

      {/* Balance Cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">Available Balance</div>
              <Wallet className="h-5 w-5 text-primary-500" />
            </div>
            <div className="text-3xl font-semibold text-gray-900">$12,250.75</div>
            <div className="mt-1 text-sm text-gray-500">
              Last updated: {format(new Date(), 'MMM d, yyyy')}
            </div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">Pending</div>
              <Calendar className="h-5 w-5 text-warning-500" />
            </div>
            <div className="text-3xl font-semibold text-gray-900">$3,000.00</div>
            <div className="mt-1 text-sm text-gray-500">2 pending transfers</div>
          </div>
        </div>
        
        <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200 lg:col-span-1 sm:col-span-2">
          <div className="p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-sm font-medium text-gray-500">Transfer Limit</div>
              <ArrowUpDown className="h-5 w-5 text-gray-500" />
            </div>
            <div className="text-3xl font-semibold text-gray-900">$50,000.00<span className="text-sm font-normal text-gray-500 ml-2">/ month</span></div>
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <div className="flex justify-between mt-1 text-xs text-gray-500">
                <span>$15,000 used</span>
                <span>$35,000 remaining</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200 p-5">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by ID"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex space-x-4">
            <div className="relative">
              <select
                className="appearance-none block pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="pending">Pending</option>
                <option value="failed">Failed</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            <div className="relative">
              <select
                className="appearance-none block pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
              >
                <option value="all">All Types</option>
                <option value="deposit">Deposits</option>
                <option value="withdrawal">Withdrawals</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            <button className="btn btn-outline px-3 py-2 h-full">
              <Filter className="h-5 w-5" />
              <span className="sr-only">More filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* New Transfer Form */}
      {showNewTransfer && (
        <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200 p-5">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-medium text-gray-900">New Transfer</h3>
            <button 
              onClick={() => setShowNewTransfer(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <ChevronDown className="h-5 w-5" />
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Transfer Type
                </label>
                <div className="flex space-x-4">
                  <label className="flex items-center p-3 border rounded-md cursor-pointer transition-colors hover:bg-gray-50 bg-primary-50 border-primary-300">
                    <input type="radio" name="transferType" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300" defaultChecked />
                    <span className="ml-2 text-sm font-medium text-gray-900">Deposit</span>
                  </label>
                  <label className="flex items-center p-3 border rounded-md cursor-pointer transition-colors hover:bg-gray-50">
                    <input type="radio" name="transferType" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300" />
                    <span className="ml-2 text-sm font-medium text-gray-900">Withdrawal</span>
                  </label>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-7 pr-12 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                    placeholder="0.00"
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <span className="text-gray-500">USD</span>
                  </div>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  From Account
                </label>
                <div className="relative">
                  <select className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500">
                    <option>Select account</option>
                    <option>Bank Account (****4567)</option>
                    <option>Credit Card (****8901)</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description (Optional)
                </label>
                <textarea
                  className="block w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                  rows={4}
                  placeholder="Add a note for this transfer"
                ></textarea>
              </div>
              
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                  <span className="ml-2 text-sm text-gray-700">Save this transfer as a template</span>
                </label>
              </div>
              
              <div className="pt-4">
                <button className="btn btn-primary w-full">
                  Continue
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Transfers Table */}
      <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transfer ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTransfers.map((transfer) => (
                <tr key={transfer.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                    {transfer.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {getTypeIcon(transfer.type)}
                      <span className="ml-2 text-sm text-gray-900 capitalize">
                        {transfer.type}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${transfer.amount.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(transfer.status)}`}>
                      {transfer.status.charAt(0).toUpperCase() + transfer.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transfer.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transfer.type === 'deposit' ? (
                      <div className="flex items-center">
                        {transfer.source === 'Bank Account' ? (
                          <Bank className="h-4 w-4 mr-1 text-gray-400" />
                        ) : (
                          <CreditCard className="h-4 w-4 mr-1 text-gray-400" />
                        )}
                        <span>From: {transfer.source}</span>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <Bank className="h-4 w-4 mr-1 text-gray-400" />
                        <span>To: {transfer.destination}</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-400 hover:text-gray-700">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">8</span> of{' '}
                <span className="font-medium">20</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Previous</span>
                  <ChevronDown className="h-5 w-5 transform rotate-90" />
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary-50 text-sm font-medium text-primary-600"
                >
                  1
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  2
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  3
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                >
                  <span className="sr-only">Next</span>
                  <ChevronDown className="h-5 w-5 transform -rotate-90" />
                </a>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfers;