import React from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  CreditCard, 
  ArrowUpRight,
  ArrowDownRight,
  CircleDollarSign,
  ChevronRight
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';

const data = [
  { name: 'Jan', revenue: 2400, transactions: 240 },
  { name: 'Feb', revenue: 1398, transactions: 139 },
  { name: 'Mar', revenue: 9800, transactions: 980 },
  { name: 'Apr', revenue: 3908, transactions: 390 },
  { name: 'May', revenue: 4800, transactions: 480 },
  { name: 'Jun', revenue: 3800, transactions: 380 },
  { name: 'Jul', revenue: 4300, transactions: 430 },
];

const recentTransactions = [
  { id: 1, customer: 'Jane Cooper', amount: 124.00, status: 'completed', date: '2h ago' },
  { id: 2, customer: 'Wade Warren', amount: 75.50, status: 'processing', date: '3h ago' },
  { id: 3, customer: 'Esther Howard', amount: 234.00, status: 'completed', date: '4h ago' },
  { id: 4, customer: 'Cameron Williamson', amount: 180.90, status: 'completed', date: '6h ago' },
  { id: 5, customer: 'Brooklyn Simmons', amount: 14.90, status: 'failed', date: '12h ago' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex items-center space-x-4">
          <select className="rounded-md border-gray-300 text-sm bg-white py-1.5 px-3 shadow-sm focus:border-primary-500 focus:ring-primary-500">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
          <button className="btn btn-primary">
            <BarChart3 className="h-4 w-4 mr-2" />
            Reports
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-primary-100 p-3">
                <TrendingUp className="h-5 w-5 text-primary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Revenue</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">RWF 31,938,192</div>
                    <div className="flex items-center text-xs font-medium text-success-600">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span>12.5% from last week</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-secondary-100 p-3">
                <Users className="h-5 w-5 text-secondary-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Customers</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">1,234</div>
                    <div className="flex items-center text-xs font-medium text-success-600">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span>5.2% from last week</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-accent-100 p-3">
                <CreditCard className="h-5 w-5 text-accent-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Transactions</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">RWF 37,960</div>
                    <div className="flex items-center text-xs font-medium text-error-600">
                      <ArrowDownRight className="h-3 w-3 mr-1" />
                      <span>3.1% from last week</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200">
          <div className="p-5">
            <div className="flex items-center">
              <div className="flex-shrink-0 rounded-md bg-success-100 p-3">
                <CircleDollarSign className="h-5 w-5 text-success-600" />
              </div>
              <div className="ml-5 w-0 flex-1">
                <dl>
                  <dt className="text-sm font-medium text-gray-500 truncate">Average Sale</dt>
                  <dd>
                    <div className="text-lg font-semibold text-gray-900">RWF 29.20</div>
                    <div className="flex items-center text-xs font-medium text-success-600">
                      <ArrowUpRight className="h-3 w-3 mr-1" />
                      <span>7.3% from last week</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Revenue Overview</h3>
            <div>
              <select className="text-sm bg-white pr-8 py-1 pl-2 border border-gray-300 rounded focus:outline-none focus:border-primary-500">
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
          </div>
          <div className="p-5">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center justify-between p-5 border-b border-gray-200">
            <h3 className="text-base font-semibold text-gray-900">Transactions</h3>
            <div>
              <select className="text-sm bg-white pr-8 py-1 pl-2 border border-gray-300 rounded focus:outline-none focus:border-primary-500">
                <option>This Week</option>
                <option>This Month</option>
                <option>This Year</option>
              </select>
            </div>
          </div>
          <div className="p-5">
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="transactions" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-900">Recent Transactions</h3>
          <a href="/payments" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center">
            View all
            <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {transaction.customer}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        RWF {transaction.amount.toFixed(2)}
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        transaction.status === 'completed' 
                          ? 'bg-success-100 text-success-800' 
                          : transaction.status === 'processing' 
                            ? 'bg-warning-100 text-warning-800' 
                            : 'bg-error-100 text-error-800'
                      }`}>
                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                      {transaction.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;