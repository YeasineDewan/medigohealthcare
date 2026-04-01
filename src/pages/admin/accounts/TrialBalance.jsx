import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Calendar,
  Printer,
  Share2,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  FileCheck,
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownRight,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Mock trial balance data
const initialTrialBalance = [
  { id: 1, code: '1110', name: 'Cash in Hand', debit: 750000, credit: 50000, balance: 700000 },
  { id: 2, code: '1120', name: 'Bank Accounts', debit: 1250000, credit: 0, balance: 1250000 },
  { id: 3, code: '1130', name: 'Accounts Receivable', debit: 500000, credit: 0, balance: 500000 },
  { id: 4, code: '1210', name: 'Office Equipment', debit: 500000, credit: 0, balance: 500000 },
  { id: 5, code: '1220', name: 'Furniture & Fixtures', debit: 750000, credit: 0, balance: 750000 },
  { id: 6, code: '1230', name: 'Medical Equipment', debit: 1250000, credit: 0, balance: 1250000 },
  { id: 7, code: '2110', name: 'Accounts Payable', debit: 200000, credit: 400000, balance: -200000 },
  { id: 8, code: '2120', name: 'Short Term Loans', debit: 0, credit: 400000, balance: -400000 },
  { id: 9, code: '2210', name: 'Long Term Loans', debit: 0, credit: 700000, balance: -700000 },
  { id: 10, code: '3110', name: 'Owner Capital', debit: 0, credit: 2000000, balance: -2000000 },
  { id: 11, code: '3120', name: 'Retained Earnings', debit: 0, credit: 500000, balance: -500000 },
  { id: 12, code: '4110', name: 'Consultation Fees', debit: 0, credit: 1500000, balance: -1500000 },
  { id: 13, code: '4120', name: 'Service Charges', debit: 0, credit: 1000000, balance: -1000000 },
  { id: 14, code: '4130', name: 'Pharmacy Sales', debit: 0, credit: 1000000, balance: -1000000 },
  { id: 15, code: '5110', name: 'Medicine Purchase', debit: 800000, credit: 0, balance: 800000 },
  { id: 16, code: '5120', name: 'Medical Supplies', debit: 500000, credit: 0, balance: 500000 },
  { id: 17, code: '5130', name: 'Lab Test Costs', debit: 500000, credit: 0, balance: 500000 },
  { id: 18, code: '5210', name: 'Staff Salaries', debit: 400000, credit: 0, balance: 400000 },
  { id: 19, code: '5220', name: 'Utility Expenses', debit: 150000, credit: 0, balance: 150000 },
  { id: 20, code: '5230', name: 'Maintenance', debit: 150000, credit: 0, balance: 150000 },
];

export default function TrialBalance() {
  const [dateRange, setDateRange] = useState('this-month');
  const [searchTerm, setSearchTerm] = useState('');
  const [showDetails, setShowDetails] = useState({});

  // Filter data
  const filteredData = initialTrialBalance.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.code.includes(searchTerm)
  );

  // Calculate totals
  const totalDebit = filteredData.reduce((sum, item) => sum + item.debit, 0);
  const totalCredit = filteredData.reduce((sum, item) => sum + item.credit, 0);
  const totalBalance = filteredData.reduce((sum, item) => sum + item.balance, 0);

  const isBalanced = totalDebit === totalCredit;

  const toggleDetails = (id) => {
    setShowDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  // Group by account type
  const assets = filteredData.filter(item => item.code.startsWith('1'));
  const liabilities = filteredData.filter(item => item.code.startsWith('2'));
  const equity = filteredData.filter(item => item.code.startsWith('3'));
  const revenue = filteredData.filter(item => item.code.startsWith('4'));
  const expenses = filteredData.filter(item => item.code.startsWith('5'));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Trial Balance</h1>
          <p className="text-gray-500 mt-1">View all account balances as of the selected date</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent appearance-none bg-white"
            >
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="this-year">This Year</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Balance Status Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl p-6 border-2 ${
          isBalanced 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
              isBalanced ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {isBalanced ? (
                <CheckCircle className="w-8 h-8 text-green-600" />
              ) : (
                <AlertCircle className="w-8 h-8 text-red-600" />
              )}
            </div>
            <div>
              <h2 className={`text-xl font-bold ${isBalanced ? 'text-green-700' : 'text-red-700'}`}>
                {isBalanced ? 'Trial Balance is Balanced' : 'Trial Balance is NOT Balanced'}
              </h2>
              <p className="text-gray-600">
                Total Debit: <span className="font-semibold">${totalDebit.toLocaleString()}</span> | 
                Total Credit: <span className="font-semibold">${totalCredit.toLocaleString()}</span>
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Difference</p>
            <p className={`text-2xl font-bold ${isBalanced ? 'text-green-600' : 'text-red-600'}`}>
              ${Math.abs(totalDebit - totalCredit).toLocaleString()}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Debit</p>
              <p className="text-2xl font-bold text-blue-600">${totalDebit.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <ArrowDownRight className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Credit</p>
              <p className="text-2xl font-bold text-green-600">${totalCredit.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Accounts</p>
              <p className="text-2xl font-bold text-purple-600">{filteredData.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <FileCheck className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Net Balance</p>
              <p className={`text-2xl font-bold ${totalBalance >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                ${Math.abs(totalBalance).toLocaleString()}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
              totalBalance >= 0 ? 'bg-blue-100' : 'bg-red-100'
            }`}>
              {totalBalance >= 0 ? (
                <TrendingUp className="w-6 h-6 text-blue-600" />
              ) : (
                <TrendingDown className="w-6 h-6 text-red-600" />
              )}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search accounts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          />
        </div>
      </div>

      {/* Trial Balance Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase w-16"></th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Account Code</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Account Name</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Debit</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Credit</th>
              <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Balance</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.map((item, index) => (
              <motion.tr
                key={item.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.02 }}
                className="hover:bg-gray-50"
              >
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleDetails(item.id)}
                    className="p-1 hover:bg-gray-100 rounded"
                  >
                    {showDetails[item.id] ? (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    )}
                  </button>
                </td>
                <td className="px-4 py-3">
                  <span className="font-mono font-medium text-gray-900">{item.code}</span>
                </td>
                <td className="px-4 py-3">
                  <span className="text-gray-900">{item.name}</span>
                </td>
                <td className="px-4 py-3 text-right">
                  {item.debit > 0 ? (
                    <span className="font-medium text-gray-900">${item.debit.toLocaleString()}</span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  {item.credit > 0 ? (
                    <span className="font-medium text-gray-900">${item.credit.toLocaleString()}</span>
                  ) : (
                    <span className="text-gray-400">-</span>
                  )}
                </td>
                <td className="px-4 py-3 text-right">
                  <span className={`font-medium ${item.balance >= 0 ? 'text-gray-900' : 'text-red-600'}`}>
                    ${Math.abs(item.balance).toLocaleString()}
                    {item.balance < 0 && ' (Cr)'}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
          <tfoot className="bg-gray-50 border-t-2 border-gray-200">
            <tr>
              <td colSpan="3" className="px-4 py-4 text-right font-bold text-gray-900">
                TOTAL
              </td>
              <td className="px-4 py-4 text-right font-bold text-blue-600">
                ${totalDebit.toLocaleString()}
              </td>
              <td className="px-4 py-4 text-right font-bold text-green-600">
                ${totalCredit.toLocaleString()}
              </td>
              <td className="px-4 py-4 text-right font-bold text-gray-900">
                ${Math.abs(totalBalance).toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Grouped Summary */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
          <h3 className="font-semibold text-blue-800 mb-2">Assets</h3>
          <p className="text-2xl font-bold text-blue-600">
            ${assets.reduce((s, i) => s + i.balance, 0).toLocaleString()}
          </p>
          <p className="text-sm text-blue-500">{assets.length} accounts</p>
        </div>
        <div className="bg-red-50 rounded-xl p-4 border border-red-100">
          <h3 className="font-semibold text-red-800 mb-2">Liabilities</h3>
          <p className="text-2xl font-bold text-red-600">
            ${Math.abs(liabilities.reduce((s, i) => s + i.balance, 0)).toLocaleString()}
          </p>
          <p className="text-sm text-red-500">{liabilities.length} accounts</p>
        </div>
        <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
          <h3 className="font-semibold text-purple-800 mb-2">Equity</h3>
          <p className="text-2xl font-bold text-purple-600">
            ${Math.abs(equity.reduce((s, i) => s + i.balance, 0)).toLocaleString()}
          </p>
          <p className="text-sm text-purple-500">{equity.length} accounts</p>
        </div>
        <div className="bg-green-50 rounded-xl p-4 border border-green-100">
          <h3 className="font-semibold text-green-800 mb-2">Revenue</h3>
          <p className="text-2xl font-bold text-green-600">
            ${Math.abs(revenue.reduce((s, i) => s + i.balance, 0)).toLocaleString()}
          </p>
          <p className="text-sm text-green-500">{revenue.length} accounts</p>
        </div>
        <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
          <h3 className="font-semibold text-orange-800 mb-2">Expenses</h3>
          <p className="text-2xl font-bold text-orange-600">
            ${expenses.reduce((s, i) => s + i.balance, 0).toLocaleString()}
          </p>
          <p className="text-sm text-orange-500">{expenses.length} accounts</p>
        </div>
      </div>
    </div>
  );
}
