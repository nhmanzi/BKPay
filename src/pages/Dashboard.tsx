import React, { useState, useEffect } from 'react';
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
import ResponsiveDataCard from '../components/ResponsiveDataCard';

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
  { id: 1, customer: 'Léon Muneza', amount: 1240.00, status: 'completed', date: '2h ago' },
  { id: 2, customer: 'Teta Irakoze', amount: 75050, status: 'processing', date: '3h ago' },
  { id: 3, customer: 'Eric Hirwa', amount: 23400, status: 'completed', date: '4h ago' },
  { id: 4, customer: 'Ines Kamanzi', amount: 18090, status: 'completed', date: '6h ago' },
  { id: 5, customer: 'Rita Nikuze', amount: 1490, status: 'failed', date: '12h ago' },
];

const Dashboard = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640); // 640px is the sm breakpoint in Tailwind
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  return (
    <div className="space-y-6 px-2 sm:px-4 md:px-6 lg:px-8 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
        <div className="flex flex-row xs:flex-col xs:items-center gap-4 xs:gap-4 w-full sm:w-auto">
          <select className="rounded-md border-gray-300 text-sm bg-white py-1.5 px-3 shadow-sm focus:border-primary-500 focus:ring-primary-500 w-full xs:w-auto">
            <option>Last 7 days</option>
            <option>Last 30 days</option>
            <option>Last 3 months</option>
            <option>Last year</option>
          </select>
          <button className="btn btn-primary w-full xs:w-auto">
            <BarChart3 className="h-4 w-4 mr-2" />
            Reports
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
                    <div className="text-lg font-semibold text-gray-900">RWF 338,192</div>
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
                    <div className="text-lg font-semibold text-gray-900">RWF 24,000</div>
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
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
          <div className="p-4 sm:p-5 w-full min-w-[340px] overflow-x-scroll">
            <div className="h-64 sm:h-80 w-full min-w-[600px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={data}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.05}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                  />
                  <YAxis 
                    axisLine={false}
                    tickLine={false}
                    tick={{ fill: '#6B7280', fontSize: 12 }}
                    width={60}
                    orientation="left"
                    tickFormatter={(value) => `${value}k`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white',
                      border: '1px solid #E5E7EB',
                      borderRadius: '6px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    formatter={(value) => [`RWF ${value}k`, 'Revenue']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="revenue" 
                    stroke="#3B82F6" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorRevenue)" 
                    name="Revenue"
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
          <div className="p-4 sm:p-5">
            <div className="w-full min-w-[340px] overflow-x-scroll ">
              <div className="h-64 sm:h-80 w-full min-w-[600px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={data}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} width={60} orientation="left" tickFormatter={(value) => `${value}k`} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'white',
                        border: '1px solid #E5E7EB',
                        borderRadius: '6px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}
                      formatter={(value) => [`RWF ${value}k`, 'Transactions']}
                    />
                    <Bar dataKey="transactions" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white overflow-hidden rounded-lg shadow-sm border border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between px-3 sm:px-5 py-4 border-b border-gray-200 gap-2">
          <h3 className="text-base font-semibold text-gray-900">Recent Transactions</h3>
          <a href="/payments" className="text-sm font-medium text-primary-600 hover:text-primary-700 flex items-center">
            View all
            <ChevronRight className="h-4 w-4 ml-1" />
          </a>
        </div>
        <div className="p-2 sm:p-3">
          {isMobile ? (
            <div className="space-y-2">
              {recentTransactions.map((transaction) => (
                <ResponsiveDataCard key={transaction.id} transaction={transaction} />
              ))}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th scope="col" className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th scope="col" className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-2 sm:px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="hover:bg-gray-50">
                      <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {transaction.customer}
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          RWF {transaction.amount.toFixed(2)}
                        </div>
                      </td>
                      <td className="px-2 sm:px-4 py-3 whitespace-nowrap">
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
                      <td className="px-2 sm:px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                        {transaction.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;