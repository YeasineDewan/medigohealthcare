import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Download,
  Calendar,
  Printer,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Wallet,
  CreditCard,
  FileText,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  Target,
  PieChart,
  BarChart3
} from 'lucide-react';

// Mock income statement data
const incomeStatementData = {
  revenue: {
    direct: [
      { name: 'Consultation Fees', amount: 1500000, previous: 1200000 },
      { name: 'Service Charges', amount: 1000000, previous: 900000 },
      { name: 'Pharmacy Sales', amount: 1000000, previous: 850000 },
      { name: 'Lab Test Charges', amount: 500000, previous: 450000 },
    ],
    indirect: [
      { name: 'Interest Income', amount: 50000, previous: 40000 },
      { name: 'Miscellaneous Income', amount: 30000, previous: 25000 },
    ]
  },
  expenses: {
    direct: [
      { name: 'Medicine Purchase', amount: 800000, previous: 700000 },
      { name: 'Medical Supplies', amount: 500000, previous: 450000 },
      { name: 'Lab Test Costs', amount: 500000, previous: 420000 },
      { name: 'Doctor Commission', amount: 300000, previous: 250000 },
    ],
    indirect: [
      { name: 'Staff Salaries', amount: 400000, previous: 350000 },
      { name: 'Rent', amount: 180000, previous: 180000 },
      { name: 'Utility Expenses', amount: 150000, previous: 140000 },
      { name: 'Maintenance', amount: 150000, previous: 120000 },
      { name: 'Insurance', amount: 80000, previous: 75000 },
      { name: 'Marketing', amount: 50000, previous: 40000 },
      { name: 'Office Supplies', amount: 30000, previous: 28000 },
      { name: 'Professional Fees', amount: 25000, previous: 22000 },
    ]
  }
};

export default function IncomeStatement() {
  const [dateRange, setDateRange] = useState('this-month');
  const [showDetails, setShowDetails] = useState(true);

  // Calculate totals
  const totalDirectRevenue = incomeStatementData.revenue.direct.reduce((s, i) => s + i.amount, 0);
  const totalIndirectRevenue = incomeStatementData.revenue.indirect.reduce((s, i) => s + i.amount, 0);
  const totalRevenue = totalDirectRevenue + totalIndirectRevenue;

  const totalDirectExpenses = incomeStatementData.expenses.direct.reduce((s, i) => s + i.amount, 0);
  const totalIndirectExpenses = incomeStatementData.expenses.indirect.reduce((s, i) => s + i.amount, 0);
  const totalExpenses = totalDirectExpenses + totalIndirectExpenses;

  const grossProfit = totalDirectRevenue - totalDirectExpenses;
  const netProfit = totalRevenue - totalExpenses;
  const profitMargin = (netProfit / totalRevenue * 100).toFixed(1);

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
          <h1 className="text-2xl font-bold text-gray-900">Income Statement</h1>
          <p className="text-gray-500 mt-1">Statement of revenue, expenses, and profit/loss</p>
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

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Total Revenue</p>
              <p className="text-3xl font-bold mt-1">{formatCurrency(totalRevenue)}</p>
              <p className="text-green-200 text-sm mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +{calculateChange(totalRevenue, totalRevenue * 0.85)}%
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-white/30" />
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
              <p className="text-red-100 text-sm">Total Expenses</p>
              <p className="text-3xl font-bold mt-1">{formatCurrency(totalExpenses)}</p>
              <p className="text-red-200 text-sm mt-2 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                +{calculateChange(totalExpenses, totalExpenses * 0.9)}%
              </p>
            </div>
            <TrendingDown className="w-12 h-12 text-white/30" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Gross Profit</p>
              <p className="text-3xl font-bold mt-1">{formatCurrency(grossProfit)}</p>
              <p className="text-blue-200 text-sm mt-2">
                Margin: {((grossProfit / totalDirectRevenue) * 100).toFixed(1)}%
              </p>
            </div>
            <Wallet className="w-12 h-12 text-white/30" />
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className={`rounded-xl p-5 shadow-lg ${
            netProfit >= 0 
              ? 'bg-gradient-to-br from-purple-500 to-purple-600' 
              : 'bg-gradient-to-br from-orange-500 to-orange-600'
          }`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-white/80 text-sm">Net Profit</p>
              <p className="text-3xl font-bold mt-1">{formatCurrency(netProfit)}</p>
              <p className="text-white/80 text-sm mt-2 flex items-center gap-1">
                <Percent className="w-3 h-3" />
                {profitMargin}% margin
              </p>
            </div>
            <DollarSign className="w-12 h-12 text-white/30" />
          </div>
        </motion.div>
      </div>

      {/* Income Statement Table */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Column */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              REVENUE & INCOME
            </h2>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Direct Revenue */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Direct Revenue</h3>
              <div className="space-y-2">
                {incomeStatementData.revenue.direct.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <span className="text-gray-700">{item.name}</span>
                      {showDetails && (
                        <p className={`text-xs ${parseFloat(calculateChange(item.amount, item.previous)) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          Prev: {formatCurrency(item.previous)}
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(item.amount)}</p>
                      <p className={`text-xs ${parseFloat(calculateChange(item.amount, item.previous)) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {parseFloat(calculateChange(item.amount, item.previous)) >= 0 ? '+' : ''}
                        {calculateChange(item.amount, item.previous)}%
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between p-3 mt-2 bg-green-50 rounded-lg border border-green-100">
                <span className="font-semibold text-green-800">Total Direct Revenue</span>
                <span className="font-bold text-green-800">{formatCurrency(totalDirectRevenue)}</span>
              </div>
            </div>

            {/* Indirect Revenue */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Indirect Revenue</h3>
              <div className="space-y-2">
                {incomeStatementData.revenue.indirect.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 4) * 0.05 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <span className="text-gray-700">{item.name}</span>
                      {showDetails && (
                        <p className="text-xs text-gray-500">Prev: {formatCurrency(item.previous)}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(item.amount)}</p>
                      <p className={`text-xs ${parseFloat(calculateChange(item.amount, item.previous)) >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {parseFloat(calculateChange(item.amount, item.previous)) >= 0 ? '+' : ''}
                        {calculateChange(item.amount, item.previous)}%
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between p-3 mt-2 bg-green-50 rounded-lg border border-green-100">
                <span className="font-semibold text-green-800">Total Indirect Revenue</span>
                <span className="font-bold text-green-800">{formatCurrency(totalIndirectRevenue)}</span>
              </div>
            </div>

            {/* Total Revenue */}
            <div className="flex justify-between p-4 bg-gradient-to-r from-green-600 to-green-700 rounded-lg">
              <span className="text-lg font-bold text-white">TOTAL REVENUE</span>
              <span className="text-lg font-bold text-white">{formatCurrency(totalRevenue)}</span>
            </div>
          </div>
        </div>

        {/* Expenses Column */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-red-500 to-red-600 px-6 py-4">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingDown className="w-5 h-5" />
              EXPENSES
            </h2>
          </div>
          
          <div className="p-6 space-y-6">
            {/* Direct Expenses */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Direct Expenses</h3>
              <div className="space-y-2">
                {incomeStatementData.expenses.direct.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <span className="text-gray-700">{item.name}</span>
                      {showDetails && (
                        <p className="text-xs text-gray-500">Prev: {formatCurrency(item.previous)}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(item.amount)}</p>
                      <p className={`text-xs ${parseFloat(calculateChange(item.amount, item.previous)) <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {parseFloat(calculateChange(item.amount, item.previous)) >= 0 ? '+' : ''}
                        {calculateChange(item.amount, item.previous)}%
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between p-3 mt-2 bg-red-50 rounded-lg border border-red-100">
                <span className="font-semibold text-red-800">Total Direct Expenses</span>
                <span className="font-bold text-red-800">{formatCurrency(totalDirectExpenses)}</span>
              </div>
            </div>

            {/* Indirect Expenses */}
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase mb-3">Indirect Expenses</h3>
              <div className="space-y-2">
                {incomeStatementData.expenses.indirect.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: (index + 4) * 0.05 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <span className="text-gray-700">{item.name}</span>
                      {showDetails && (
                        <p className="text-xs text-gray-500">Prev: {formatCurrency(item.previous)}</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900">{formatCurrency(item.amount)}</p>
                      <p className={`text-xs ${parseFloat(calculateChange(item.amount, item.previous)) <= 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {parseFloat(calculateChange(item.amount, item.previous)) >= 0 ? '+' : ''}
                        {calculateChange(item.amount, item.previous)}%
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="flex justify-between p-3 mt-2 bg-red-50 rounded-lg border border-red-100">
                <span className="font-semibold text-red-800">Total Indirect Expenses</span>
                <span className="font-bold text-red-800">{formatCurrency(totalIndirectExpenses)}</span>
              </div>
            </div>

            {/* Total Expenses */}
            <div className="flex justify-between p-4 bg-gradient-to-r from-red-600 to-red-700 rounded-lg">
              <span className="text-lg font-bold text-white">TOTAL EXPENSES</span>
              <span className="text-lg font-bold text-white">{formatCurrency(totalExpenses)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Net Profit Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`rounded-xl p-8 border-2 ${
          netProfit >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-6">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center ${
              netProfit >= 0 ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {netProfit >= 0 ? (
                <TrendingUp className="w-10 h-10 text-green-600" />
              ) : (
                <TrendingDown className="w-10 h-10 text-red-600" />
              )}
            </div>
            <div>
              <h2 className={`text-3xl font-bold ${netProfit >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                {netProfit >= 0 ? 'NET PROFIT' : 'NET LOSS'}
              </h2>
              <p className="text-4xl font-bold mt-1">{formatCurrency(Math.abs(netProfit))}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-gray-600">Profit Margin</p>
            <p className={`text-3xl font-bold ${netProfit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {profitMargin}%
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
