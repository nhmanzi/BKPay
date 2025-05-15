import React, { useState } from 'react';
import { 
  Download, 
  Filter, 
  Search, 
  ChevronDown, 
  ChevronRight,
  ArrowUpDown,
  MoreHorizontal,
  X
} from 'lucide-react';

const paymentData = [
  { id: '45612378', customer: 'Jado Mugabo', email: 'jado.mugabo@example.com', amount: 125000, status: 'completed', date: '2023-04-23', type: 'credit' },
  { id: '89123456', customer: 'Sifa Mutesi', email: 'sifa.mutesi@example.com', amount: 75000, status: 'processing', date: '2023-04-22', type: 'debit' },
  { id: '87651234', customer: 'Theo Iradukunda', email: 'theo.iradukunda@example.com', amount: 234000, status: 'completed', date: '2023-04-21', type: 'credit' },
  { id: '54612378', customer: 'Lina Umutesi', email: 'lina.umutesi@example.com', amount: 180900, status: 'completed', date: '2023-04-20', type: 'credit' },
  { id: '56712378', customer: 'Brian Nkurunziza', email: 'brian.nkurunziza@example.com', amount: 149000, status: 'failed', date: '2023-04-19', type: 'debit' },
  { id: '76512378', customer: 'Diane Mukamana', email: 'diane.mukamana@example.com', amount: 149000, status: 'completed', date: '2023-04-18', type: 'credit' },
  { id: '96312378', customer: 'Nina Uwizeye', email: 'nina.uwizeye@example.com', amount: 56800, status: 'processing', date: '2023-04-17', type: 'credit' },
  { id: '87122378', customer: 'Allan Gatera', email: 'allan.gatera@example.com', amount: 320000, status: 'completed', date: '2023-04-16', type: 'credit' },
  { id: '36512378', customer: 'Lysa Niyitegeka', email: 'lysa.niyitegeka@example.com', amount: 199000, status: 'failed', date: '2023-04-15', type: 'debit' },
  { id: '41512378', customer: 'Tony Habineza', email: 'tony.habineza@example.com', amount: 89900, status: 'completed', date: '2023-04-14', type: 'credit' },
];

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showNewPaymentModal, setShowNewPaymentModal] = useState(false);
  const [newPayment, setNewPayment] = useState({
    customer: '',
    email: '',
    amount: '',
    type: 'credit',
    status: 'processing'
  });
  
  const handleAddPayment = () => {
    const payment = {
      id: Math.floor(Math.random() * 90000000 + 10000000).toString(),
      customer: newPayment.customer,
      email: newPayment.email,
      amount: parseInt(newPayment.amount),
      status: newPayment.status,
      date: new Date().toISOString().split('T')[0],
      type: newPayment.type
    };
    
    paymentData.unshift(payment);
    setShowNewPaymentModal(false);
    setNewPayment({
      customer: '',
      email: '',
      amount: '',
      type: 'credit',
      status: 'processing'
    });
  };

  const filteredPayments = paymentData.filter(payment => {
    const matchesSearch = 
      payment.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.id.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    const matchesType = typeFilter === 'all' || payment.type === typeFilter;
    
    return matchesSearch && matchesStatus && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Payments</h1>
        <div className="flex items-center space-x-4">
          <button className="btn btn-outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button 
            className="btn btn-primary hidden"
            onClick={() => setShowNewPaymentModal(true)}
          >
            + New Payment
          </button>
        </div>
      </div>

      {/* New Payment Modal */}
      {showNewPaymentModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">New Payment</h2>
              <button 
                onClick={() => setShowNewPaymentModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Customer Name
                </label>
                <input
                  type="text"
                  value={newPayment.customer}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, customer: e.target.value }))}
                  className="input w-full"
                  placeholder="Enter customer name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  value={newPayment.email}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, email: e.target.value }))}
                  className="input w-full"
                  placeholder="Enter customer email"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-2 top-2 text-gray-500">RWF</span>
                  <input
                    type="number"
                    value={newPayment.amount}
                    onChange={(e) => setNewPayment(prev => ({ ...prev, amount: e.target.value }))}
                    className="input w-full pl-[48px]"
                    placeholder="0"
                    min="0"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Payment Type
                </label>
                <select
                  value={newPayment.type}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, type: e.target.value }))}
                  className="input w-full"
                >
                  <option value="credit">Credit</option>
                  <option value="debit">Debit</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  value={newPayment.status}
                  onChange={(e) => setNewPayment(prev => ({ ...prev, status: e.target.value }))}
                  className="input w-full"
                >
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  className="btn btn-primary w-full"
                  onClick={handleAddPayment}
                  disabled={!newPayment.customer || !newPayment.email || !newPayment.amount}
                >
                  Add Payment
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200 p-5">
        <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by customer, email or ID"
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
                <option value="processing">Processing</option>
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
                <option value="credit">Credit</option>
                <option value="debit">Debit</option>
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

      {/* Payments Table */}
      <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    ID
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Customer
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Amount
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Status
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Date
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Type
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                    #{payment.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{payment.customer}</div>
                    <div className="text-sm text-gray-500">{payment.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">RWF {payment.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      payment.status === 'completed' 
                        ? 'bg-success-100 text-success-800' 
                        : payment.status === 'processing' 
                          ? 'bg-warning-100 text-warning-800' 
                          : 'bg-error-100 text-error-800'
                    }`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(payment.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      payment.type === 'credit' 
                        ? 'bg-primary-100 text-primary-800' 
                        : 'bg-secondary-100 text-secondary-800'
                    }`}>
                      {payment.type.charAt(0).toUpperCase() + payment.type.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-gray-500 hover:text-gray-700">
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="flex-1 flex justify-between md:hidden">
            <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Previous
            </button>
            <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
              Next
            </button>
          </div>
          <div className="hidden md:flex-1 md:flex md:items-center md:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
                <span className="font-medium">20</span> results
              </p>
            </div>
            <div>
              <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Previous</span>
                  <ChevronRight className="h-5 w-5 transform rotate-180" />
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-primary-50 text-sm font-medium text-primary-600 hover:bg-primary-100">
                  2
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  3
                </button>
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  8
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  9
                </button>
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  10
                </button>
                <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  <span className="sr-only">Next</span>
                  <ChevronRight className="h-5 w-5" />
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;