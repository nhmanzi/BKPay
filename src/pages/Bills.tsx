import React, { useState } from 'react';
import { 
  FilePlus, 
  Download, 
  Search, 
  Filter, 
  ChevronDown,
  ArrowUpDown,
  MoreVertical,
  Eye,
  Download as DownloadIcon,
  Copy,
  Printer,
  X,
  Loader2
} from 'lucide-react';
import QRCode from 'qrcode';

interface NewBillData {
  customerName: string;
  amount: number;
}

const billsData = [
  { id: 'INV-001', customer: 'Jane Cooper', email: 'jane.cooper@example.com', amount: 1240.00, status: 'paid', date: '2023-04-23', dueDate: '2023-05-23' },
  { id: 'INV-002', customer: 'Wade Warren', email: 'wade.warren@example.com', amount: 755.50, status: 'pending', date: '2023-04-22', dueDate: '2023-05-22' },
  { id: 'INV-003', customer: 'Esther Howard', email: 'esther.howard@example.com', amount: 2340.00, status: 'paid', date: '2023-04-21', dueDate: '2023-05-21' },
  { id: 'INV-004', customer: 'Cameron Williamson', email: 'cameron.williamson@example.com', amount: 1809.90, status: 'overdue', date: '2023-04-20', dueDate: '2023-05-10' },
  { id: 'INV-005', customer: 'Brooklyn Simmons', email: 'brooklyn.simmons@example.com', amount: 149.90, status: 'pending', date: '2023-04-19', dueDate: '2023-05-19' },
  { id: 'INV-006', customer: 'Leslie Alexander', email: 'leslie.alexander@example.com', amount: 1490.00, status: 'paid', date: '2023-04-18', dueDate: '2023-05-18' },
  { id: 'INV-007', customer: 'Dianne Russell', email: 'dianne.russell@example.com', amount: 568.80, status: 'overdue', date: '2023-04-17', dueDate: '2023-05-01' },
  { id: 'INV-008', customer: 'Guy Hawkins', email: 'guy.hawkins@example.com', amount: 3200.00, status: 'paid', date: '2023-04-16', dueDate: '2023-05-16' }
];

const Bills = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [showNewBillModal, setShowNewBillModal] = useState(false);
  const [newBillData, setNewBillData] = useState<NewBillData>({
    customerName: '',
    amount: 0
  });
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const filteredBills = billsData.filter(bill => {
    const matchesSearch = 
      bill.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bill.id.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || bill.status === statusFilter;
    
    let matchesDate = true;
    if (dateFilter === 'this-month') {
      const billDate = new Date(bill.date);
      const now = new Date();
      matchesDate = billDate.getMonth() === now.getMonth() && billDate.getFullYear() === now.getFullYear();
    }
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getBadgeColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-success-100 text-success-800';
      case 'pending':
        return 'bg-warning-100 text-warning-800';
      case 'overdue':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateBill = async () => {
    setIsGenerating(true);
    const billId = `INV-${Math.random().toString(36).substr(2, 6).toUpperCase()}`;
    
    try {
      const qrData = JSON.stringify({
        billId,
        amount: newBillData.amount,
        customerName: newBillData.customerName
      });
      
      const qrCodeDataUrl = await QRCode.toDataURL(qrData);
      setQrCodeUrl(qrCodeDataUrl);
    } catch (err) {
      console.error('Error generating QR code:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
        <h1 className="text-2xl font-semibold text-gray-900">Bills & Invoices</h1>
        <div className="flex items-center space-x-4">
          <button className="btn btn-outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </button>
          <button 
            className="btn btn-primary"
            onClick={() => setShowNewBillModal(true)}
          >
            <FilePlus className="h-4 w-4 mr-2" />
            New Bill
          </button>
        </div>
      </div>

      {/* New Bill Modal */}
      {showNewBillModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Create New Bill</h2>
              <button 
                onClick={() => {
                  setShowNewBillModal(false);
                  setQrCodeUrl(null);
                }}
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
                  value={newBillData.customerName}
                  onChange={(e) => setNewBillData(prev => ({ ...prev, customerName: e.target.value }))}
                  className="input w-full"
                  placeholder="Enter customer name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={newBillData.amount || ''}
                    onChange={(e) => setNewBillData(prev => ({ ...prev, amount: parseFloat(e.target.value) }))}
                    className="input w-full pl-7"
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              {qrCodeUrl ? (
                <div className="text-center space-y-4">
                  <img 
                    src={qrCodeUrl} 
                    alt="Bill QR Code"
                    className="mx-auto w-48 h-48"
                  />
                  <p className="text-sm text-gray-600">
                    Scan this QR code to view bill details
                  </p>
                  <div className="flex space-x-2 justify-center">
                    <button 
                      className="btn btn-outline"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = qrCodeUrl;
                        link.download = 'bill-qr.png';
                        link.click();
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download QR
                    </button>
                    <button 
                      className="btn btn-primary"
                      onClick={() => {
                        setShowNewBillModal(false);
                        setQrCodeUrl(null);
                        setNewBillData({ customerName: '', amount: 0 });
                      }}
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  className="btn btn-primary w-full"
                  onClick={handleCreateBill}
                  disabled={isGenerating || !newBillData.customerName || !newBillData.amount}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="animate-spin h-4 w-4 mr-2" />
                      Generating...
                    </>
                  ) : (
                    'Generate Bill & QR Code'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200">
          <div className="p-5">
            <div className="text-sm font-medium text-gray-500">Total Bills</div>
            <div className="mt-1 text-3xl font-semibold text-gray-900">124</div>
          </div>
        </div>
        <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200">
          <div className="p-5">
            <div className="text-sm font-medium text-gray-500">Paid</div>
            <div className="mt-1 text-3xl font-semibold text-success-600">92</div>
          </div>
        </div>
        <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200">
          <div className="p-5">
            <div className="text-sm font-medium text-gray-500">Pending</div>
            <div className="mt-1 text-3xl font-semibold text-warning-600">22</div>
          </div>
        </div>
        <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200">
          <div className="p-5">
            <div className="text-sm font-medium text-gray-500">Overdue</div>
            <div className="mt-1 text-3xl font-semibold text-error-600">10</div>
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
              placeholder="Search by customer, email or invoice ID"
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
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
                <ChevronDown className="h-4 w-4" />
              </div>
            </div>
            <div className="relative">
              <select
                className="appearance-none block pl-3 pr-10 py-2 border border-gray-300 rounded-md bg-white focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">All Dates</option>
                <option value="this-month">This Month</option>
                <option value="last-month">Last Month</option>
                <option value="this-year">This Year</option>
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

      {/* Bills Table */}
      <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Invoice
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
                    Issue Date
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <div className="flex items-center">
                    Due Date
                    <ArrowUpDown className="h-4 w-4 ml-1" />
                  </div>
                </th>
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBills.map((bill) => (
                <tr key={bill.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                    {bill.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">{bill.customer}</div>
                    <div className="text-sm text-gray-500">{bill.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${bill.amount.toFixed(2)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getBadgeColor(bill.status)}`}>
                      {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(bill.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(bill.dueDate).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button className="text-gray-600 hover:text-gray-900">
                        <Eye className="h-5 w-5" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <DownloadIcon className="h-5 w-5" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-900">
                        <Printer className="h-5 w-5" />
                      </button>
                      <div className="relative group">
                        <button className="text-gray-600 hover:text-gray-900">
                          <MoreVertical className="h-5 w-5" />
                        </button>
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Edit Bill</a>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Send Reminder</a>
                          <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Mark as Paid</a>
                          <a href="#" className="block px-4 py-2 text-sm text-error-600 hover:bg-gray-100">Delete</a>
                        </div>
                      </div>
                    </div>
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
                <span className="font-medium">124</span> results
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
                <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                  ...
                </span>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  15
                </a>
                <a
                  href="#"
                  className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  16
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

export default Bills;