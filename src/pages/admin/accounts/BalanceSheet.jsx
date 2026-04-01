import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Calendar,
  Printer,
  Share2,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  CreditCard,
  Building,
  FileText,
  Plus,
  Minus,
  ArrowRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Mock balance sheet data
const balanceSheetData = {
  assets: {
    current: [
      { name: 'Cash in Hand', amount: 750000, previous: 500000 },
      { name: 'Bank Accounts', amount: 1250000, previous: 1000000 },
      { name: 'Accounts Receivable', amount: 500000, previous: 450000 },
      { name: 'Inventory', amount: 300000, previous: 280000 },
      { name: 'Prepaid Expenses', amount: 100000, previous: 80000 },
    ],
    fixed: [
      { name: 'Office Equipment', amount: 500000, previous: 450000 },
      { name: 'Furniture & Fixtures', amount: 750000, previous: 700000 },
      { name: 'Medical Equipment', amount: 1250000, previous: 1100000 },
      { name: 'Vehicles', amount: 300000, previous: 350000 },
    ]
  },
  liabilities: {
    current: [
      { name: 'Accounts Payable', amount: 400000, previous: 350000 },
      { name: 'Short Term Loans', amount: 400000, previous: 500000 },
      { name: 'Accrued Expenses', amount: 150000, previous: 120000 },
      { name: 'Tax Payable', amount: 100000, previous: 80000 },
    ],
    longTerm: [
      { name: 'Long Term Loans', amount: 700000, previous: 800000 },
      { name: 'Deferred Tax Liabilities', amount: 50000, previous: 50000 },
    ]
  },
  equity: [
    { name: 'Owner Capital', amount: 2000000, previous: 1800000 },
    { name: 'Retained Earnings', amount: 500000, previous: 350000 },
    { name: 'Current Year Profit', amount: 850000, previous: 650000 },
  ]
};

export default function BalanceSheet() {
  const [dateRange, setDateRange] = useState('this-month');
  const [comparative, setComparative] = useState(true);

  // Calculate totals
  const totalCurrentAssets = balanceSheetData.assets.current.reduce((s, i) => s + i.amount, 0);
  const totalFixedAssets = balanceSheetData.assets.fixed.reduce((s, i) => s + i.amount, 0);
  const totalAssets = totalCurrentAssets + totalFixedAssets;

  const totalCurrentLiabilities = balanceSheetData.liabilities.current.reduce((s, i) => s + i.amount, 0);
  const totalLongTermLiabilities = balanceSheetData.liabilities.longTerm.reduce((s, i) => s + i.amount, 0);
  const totalLiabilities = totalCurrentLiabilities + totalLongTermLiabilities;

  const totalEquity = balanceSheetData.equity.reduce((s, i) => s + i.amount, 0);

  const isBalanced = totalAssets === totalLiabilities + totalEquity;

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const calculateChange = (current, previous) => {
    if (previous === 0) return 0;
    return ((current - previous) / previous * 100).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Balance Sheet</h1>
          <p className="text-gray-500 mt-1">Statement of assets, liabilities, and equity</p>
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

      {/* Balance Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl p-6 border-2 ${
          isBalanced ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isBalanced ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {isBalanced ? (
                <CheckCircle className="w-6 h-6 text-green-600" />
              ) : (
                <AlertCircle className="w-6 h-6 text-red-600" />
              )}
            </div>
            <div>
              <h2 className={`text-lg font-bold ${isBalanced ? 'text-green-700' : 'text-red-700'}`}>
                {isBalanced ? 'Balance Sheet is Balanced' : 'Balance Sheet is NOT Balanced'}
              </h2>
              <p className="text-sm text-gray-600">
                Assets: {formatCurrency(totalAssets)} = Liabilities + Equity: {formatCurrency(totalLiabilities + totalEquity)}
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Assets</p>
              <p className="text-3xl font-bold mt-1">{formatCurrency(totalAssets)}</p>
              <p className="text-blue-200 text-sm mt-2">
                {parseFloat(calculateChange(totalAssets, totalAssets * 0.9)) > 0 ? '+' : ''}
                {calculateChange(totalAssets, totalAssets * 0.9)}% from last period
              </p>
            </div>
            <Wallet className="w-12 h-12 text-white/30" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-5 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-100 text-sm">Total Liabilities</p>
              <p className="text-3xl font-bold mt-1">{formatCurrency(totalLiabilities)}</p>
              <p className="text-red-200 text-sm mt-2">
                {parseFloat(calculateChange(totalLiabilities, totalLiabilities * 1.1)) > 0 ? '+' : ''}
                {calculateChange(totalLiabilities, totalLiabilities * 1.1)}% from last period
              </p>
            </div>
            <CreditCard className="w-12 h-12 text-white/30" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-5 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-100 text-sm">Total Equity</p>
              <p className="text-3xl font-bold mt-1">{formatCurrency(totalEquity)}</p>
              <p className="text-purple-200 text-sm mt-2">
                {parseFloat(calculateChange(totalEquity, totalEquity * 0.85)) > 0 ? '+' : ''}
                {calculateChange(totalEquity, totalEquity * 0.85)}% from last period
              </p>
            </div>
            <Building className="w-12 h-12 text-white/30" />
          </div>
        </motion.div>
      </div>

      {/* Balance Sheet Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets Column */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              ASSETS
            </h2>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Current Assets */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Current Assets</h3>
              <div className="space-y-2">
                {balanceSheetData.assets.current.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{item.name}</span>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(item.amount)}</p>
                      {comparative && (
                        <p className={`text-xs ${item.amount >= item.previous ? 'text-green-600' : 'text-red-600'}`}>
                          {item.amount >= item.previous ? <TrendingUp className="w-3 h-3 inline" /> : <TrendingDown className="w-3 h-3 inline" />}
                          {' '}{Math.abs(calculateChange(item.amount, item.previous))}%
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between p-3 mt-2 bg-blue-50 rounded-lg border border-blue-100">
                <span className="font-semibold text-blue-800">Total Current Assets</span>
                <span className="font-bold text-blue-800">{formatCurrency(totalCurrentAssets)}</span>
              </div>
            </div>

            {/* Fixed Assets */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Fixed Assets</h3>
              <div className="space-y-2">
                {balanceSheetData.assets.fixed.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 5) * 0.05 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{item.name}</span>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(item.amount)}</p>
                      {comparative && (
                        <p className={`text-xs ${item.amount >= item.previous ? 'text-green-600' : 'text-red-600'}`}>
                          {item.amount >= item.previous ? <TrendingUp className="w-3 h-3 inline" /> : <TrendingDown className="w-3 h-3 inline" />}
                          {' '}{Math.abs(calculateChange(item.amount, item.previous))}%
                        </p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between p-3 mt-2 bg-blue-50 rounded-lg border border-blue-100">
                <span className="font-semibold text-blue-800">Total Fixed Assets</span>
                <span className="font-bold text-blue-800">{formatCurrency(totalFixedAssets)}</span>
              </div>
            </div>

            {/* Total Assets */}
            <div className="flex justify-between p-4 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg">
              <span className="text-lg font-bold text-white">TOTAL ASSETS</span>
              <span className="text-lg font-bold text-white">{formatCurrency(totalAssets)}</span>
            </div>
          </div>
        </div>

        {/* Liabilities and Equity Column */}
        <div className="space-y-6">
          {/* Liabilities */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                LIABILITIES
              </h2>
            </div>
            
            <div className="p-6 space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Current Liabilities</h3>
                <div className="space-y-2">
                  {balanceSheetData.liabilities.current.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-gray-700">{item.name}</span>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{formatCurrency(item.amount)}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex justify-between p-3 mt-2 bg-red-50 rounded-lg border border-red-100">
                  <span className="font-semibold text-red-800">Total Current Liabilities</span>
                  <span className="font-bold text-red-800">{formatCurrency(totalCurrentLiabilities)}</span>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Long Term Liabilities</h3>
                <div className="space-y-2">
                  {balanceSheetData.liabilities.longTerm.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="text-gray-700">{item.name}</span>
                      <p className="font-semibold text-gray-900">{formatCurrency(item.amount)}</p>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between p-3 mt-2 bg-red-50 rounded-lg border border-red-100">
                  <span className="font-semibold text-red-800">Total Long Term Liabilities</span>
                  <span className="font-bold text-red-800">{formatCurrency(totalLongTermLiabilities)}</span>
                </div>
              </div>

              <div className="flex justify-between p-4 bg-gradient-to-r from-red-600 to-red-700 rounded-lg">
                <span className="text-lg font-bold text-white">TOTAL LIABILITIES</span>
                <span className="text-lg font-bold text-white">{formatCurrency(totalLiabilities)}</span>
              </div>
            </div>
          </div>

          {/* Equity */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <Building className="w-5 h-5" />
                EQUITY
              </h2>
            </div>
            
            <div className="p-6">
              <div className="space-y-2">
                {balanceSheetData.equity.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 4) * 0.05 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="text-gray-700">{item.name}</span>
                    <p className="font-semibold text-gray-900">{formatCurrency(item.amount)}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-between p-4 mt-4 bg-gradient-to-r from-purple-600 to-purple-700 rounded-lg">
                <span className="text-lg font-bold text-white">TOTAL EQUITY</span>
                <span className="text-lg font-bold text-white">{formatCurrency(totalEquity)}</span>
              </div>

              <div className="flex justify-between p-4 mt-2 bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg">
                <span className="text-lg font-bold text-white">TOTAL LIABILITIES + EQUITY</span>
                <span className="text-lg font-bold text-white">{formatCurrency(totalLiabilities + totalEquity)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
