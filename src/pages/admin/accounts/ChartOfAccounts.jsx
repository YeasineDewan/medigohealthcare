import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  ChevronRight,
  ChevronDown,
  FolderPlus,
  FileText,
  Wallet,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  ArrowUpRight,
  ArrowDownRight,
  PieChart,
  BarChart3,
  RefreshCw,
  Printer,
  Share2
} from 'lucide-react';

// Mock data for chart of accounts
const accountData = [
  {
    id: 1,
    code: '1000',
    name: 'Assets',
    nature: 'Debit',
    type: 'Primary',
    children: [
      { id: 11, code: '1100', name: 'Current Assets', type: 'Sub', balance: 2500000, children: [
        { id: 111, code: '1110', name: 'Cash in Hand', type: 'Ledger', balance: 750000 },
        { id: 112, code: '1120', name: 'Bank Accounts', type: 'Ledger', balance: 1250000 },
        { id: 113, code: '1130', name: 'Accounts Receivable', type: 'Ledger', balance: 500000 }
      ]},
      { id: 12, code: '1200', name: 'Fixed Assets', type: 'Sub', balance: 2500000, children: [
        { id: 121, code: '1210', name: 'Office Equipment', type: 'Ledger', balance: 500000 },
        { id: 122, code: '1220', name: 'Furniture & Fixtures', type: 'Ledger', balance: 750000 },
        { id: 123, code: '1230', name: 'Medical Equipment', type: 'Ledger', balance: 1250000 }
      ]}
    ]
  },
  {
    id: 2,
    code: '2000',
    name: 'Liabilities',
    nature: 'Credit',
    type: 'Primary',
    children: [
      { id: 21, code: '2100', name: 'Current Liabilities', type: 'Sub', balance: 800000, children: [
        { id: 211, code: '2110', name: 'Accounts Payable', type: 'Ledger', balance: 400000 },
        { id: 212, code: '2120', name: 'Short Term Loans', type: 'Ledger', balance: 400000 }
      ]},
      { id: 22, code: '2200', name: 'Long Term Liabilities', type: 'Sub', balance: 700000, children: [
        { id: 221, code: '2210', name: 'Long Term Loans', type: 'Ledger', balance: 700000 }
      ]}
    ]
  },
  {
    id: 3,
    code: '3000',
    name: 'Equity',
    nature: 'Credit',
    type: 'Primary',
    children: [
      { id: 31, code: '3100', name: 'Capital Accounts', type: 'Sub', balance: 2500000, children: [
        { id: 311, code: '3110', name: 'Owner Capital', type: 'Ledger', balance: 2000000 },
        { id: 312, code: '3120', name: 'Retained Earnings', type: 'Ledger', balance: 500000 }
      ]}
    ]
  },
  {
    id: 4,
    code: '4000',
    name: 'Revenue',
    nature: 'Credit',
    type: 'Primary',
    children: [
      { id: 41, code: '4100', name: 'Direct Income', type: 'Sub', balance: 3500000, children: [
        { id: 411, code: '4110', name: 'Consultation Fees', type: 'Ledger', balance: 1500000 },
        { id: 412, code: '4120', name: 'Service Charges', type: 'Ledger', balance: 1000000 },
        { id: 413, code: '4130', name: 'Pharmacy Sales', type: 'Ledger', balance: 1000000 }
      ]}
    ]
  },
  {
    id: 5,
    code: '5000',
    name: 'Expenses',
    nature: 'Debit',
    type: 'Primary',
    children: [
      { id: 51, code: '5100', name: 'Direct Expenses', type: 'Sub', balance: 1800000, children: [
        { id: 511, code: '5110', name: 'Medicine Purchase', type: 'Ledger', balance: 800000 },
        { id: 512, code: '5120', name: 'Medical Supplies', type: 'Ledger', balance: 500000 },
        { id: 513, code: '5130', name: 'Lab Test Costs', type: 'Ledger', balance: 500000 }
      ]},
      { id: 52, code: '5200', name: 'Indirect Expenses', type: 'Sub', balance: 700000, children: [
        { id: 521, code: '5210', name: 'Staff Salaries', type: 'Ledger', balance: 400000 },
        { id: 522, code: '5220', name: 'Utility Expenses', type: 'Ledger', balance: 150000 },
        { id: 523, code: '5230', name: 'Maintenance', type: 'Ledger', balance: 150000 }
      ]}
    ]
  }
];

export default function ChartOfAccounts() {
  const [expandedGroups, setExpandedGroups] = useState([1]);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('tree'); // tree, list, summary

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const calculateTotal = (group) => {
    if (!group.children) return group.balance || 0;
    return group.children.reduce((sum, child) => sum + calculateTotal(child), 0);
  };

  // Flatten tree for search
  const flattenAccounts = (accounts, level = 0) => {
    let result = [];
    accounts.forEach(account => {
      result.push({ ...account, level });
      if (account.children) {
        result = result.concat(flattenAccounts(account.children, level + 1));
      }
    });
    return result;
  };

  const filteredAccounts = searchTerm
    ? flattenAccounts(accountData).filter(a => 
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.code.includes(searchTerm)
      )
    : accountData;

  const totals = {
    assets: accountData[0]?.children?.reduce((sum, c) => sum + calculateTotal(c), 0) || 0,
    liabilities: accountData[1]?.children?.reduce((sum, c) => sum + calculateTotal(c), 0) || 0,
    equity: accountData[2]?.children?.reduce((sum, c) => sum + calculateTotal(c), 0) || 0,
    revenue: accountData[3]?.children?.reduce((sum, c) => sum + calculateTotal(c), 0) || 0,
    expenses: accountData[4]?.children?.reduce((sum, c) => sum + calculateTotal(c), 0) || 0,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Chart of Accounts</h1>
          <p className="text-gray-500 mt-1">Complete hierarchy of all accounts with balances</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Share2 className="w-4 h-4" />
            Share
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-5 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-100 text-sm">Total Assets</p>
              <p className="text-2xl font-bold mt-1">${(totals.assets / 1000000).toFixed(2)}M</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6" />
            </div>
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
              <p className="text-red-100 text-sm">Liabilities</p>
              <p className="text-2xl font-bold mt-1">${(totals.liabilities / 1000000).toFixed(2)}M</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6" />
            </div>
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
              <p className="text-purple-100 text-sm">Equity</p>
              <p className="text-2xl font-bold mt-1">${(totals.equity / 1000000).toFixed(2)}M</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-5 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">Revenue</p>
              <p className="text-2xl font-bold mt-1">${(totals.revenue / 1000000).toFixed(2)}M</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-5 text-white shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-100 text-sm">Expenses</p>
              <p className="text-2xl font-bold mt-1">${(totals.expenses / 1000000).toFixed(2)}M</p>
            </div>
            <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and View Toggle */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search accounts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setViewMode('tree')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${viewMode === 'tree' ? 'bg-[#5DBB63] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <FolderPlus className="w-4 h-4" />
              Tree
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${viewMode === 'list' ? 'bg-[#5DBB63] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <FileText className="w-4 h-4" />
              List
            </button>
            <button
              onClick={() => setViewMode('summary')}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 ${viewMode === 'summary' ? 'bg-[#5DBB63] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              <BarChart3 className="w-4 h-4" />
              Summary
            </button>
          </div>
        </div>
      </div>

      {/* Accounts Tree View */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {viewMode === 'tree' && (
          <div className="divide-y divide-gray-100">
            {filteredAccounts.map((group, index) => (
              <motion.div
                key={group.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                {/* Primary Group */}
                <div 
                  className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-pointer bg-gray-50"
                  onClick={() => toggleGroup(group.id)}
                >
                  <div className="flex items-center gap-3">
                    {expandedGroups.includes(group.id) ? (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    )}
                    <span className="font-mono font-semibold text-gray-900">{group.code}</span>
                    <span className="font-semibold text-gray-900">{group.name}</span>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                      group.nature === 'Debit' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {group.nature}
                    </span>
                  </div>
                  <span className="font-semibold text-gray-900">
                    ${calculateTotal(group).toLocaleString()}
                  </span>
                </div>

                {/* Children */}
                {expandedGroups.includes(group.id) && group.children && (
                  <div className="bg-white">
                    {group.children.map(subGroup => (
                      <div key={subGroup.id} className="pl-8">
                        <div 
                          className="flex items-center justify-between p-3 hover:bg-gray-50 cursor-pointer border-l-2 border-gray-200 ml-4"
                          onClick={() => toggleGroup(subGroup.id)}
                        >
                          <div className="flex items-center gap-3">
                            {expandedGroups.includes(subGroup.id) ? (
                              <ChevronDown className="w-4 h-4 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-4 h-4 text-gray-400" />
                            )}
                            <span className="font-mono text-gray-700">{subGroup.code}</span>
                            <span className="text-gray-700">{subGroup.name}</span>
                          </div>
                          <span className="font-medium text-gray-900">
                            ${calculateTotal(subGroup).toLocaleString()}
                          </span>
                        </div>

                        {/* Ledger Accounts */}
                        {expandedGroups.includes(subGroup.id) && subGroup.children && (
                          <div className="pl-16">
                            {subGroup.children.map(ledger => (
                              <div
                                key={ledger.id}
                                className="flex items-center justify-between p-2 hover:bg-gray-50 border-l-2 border-gray-100 ml-4"
                              >
                                <div className="flex items-center gap-3">
                                  <FileText className="w-4 h-4 text-gray-400" />
                                  <span className="font-mono text-gray-600">{ledger.code}</span>
                                  <span className="text-gray-600">{ledger.name}</span>
                                </div>
                                <span className="font-medium text-gray-900">
                                  ${ledger.balance.toLocaleString()}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Code</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Nature</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {flattenAccounts(filteredAccounts).map((account, index) => (
                <motion.tr
                  key={account.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className="hover:bg-gray-50"
                  style={{ paddingLeft: `${account.level * 16 + 16}px` }}
                >
                  <td className="px-4 py-3">
                    <span className="font-mono" style={{ paddingLeft: `${account.level * 16}px` }}>
                      {account.code}
                    </span>
                  </td>
                  <td className="px-4 py-3">{account.name}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      account.type === 'Primary' ? 'bg-purple-100 text-purple-700' :
                      account.type === 'Sub' ? 'bg-amber-100 text-amber-700' :
                      'bg-cyan-100 text-cyan-700'
                    }`}>
                      {account.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      account.nature === 'Debit' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {account.nature}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium">
                    ${(account.balance || 0).toLocaleString()}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Summary View */}
        {viewMode === 'summary' && (
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Assets Pie Chart Representation */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-blue-600" />
                  Assets Breakdown
                </h3>
                <div className="space-y-3">
                  {accountData[0]?.children?.map((item, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full bg-blue-${(i+1)*100}`} />
                        <span className="text-gray-700">{item.name}</span>
                      </div>
                      <span className="font-medium">${calculateTotal(item).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Revenue vs Expenses */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-green-600" />
                  Income vs Expenses
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Revenue</span>
                      <span className="font-semibold text-green-600">${totals.revenue.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-green-500 h-3 rounded-full" style={{ width: '100%' }} />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-600">Expenses</span>
                      <span className="font-semibold text-red-600">${totals.expenses.toLocaleString()}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div className="bg-red-500 h-3 rounded-full" style={{ width: `${(totals.expenses/totals.revenue)*100}%` }} />
                    </div>
                  </div>
                  <div className="pt-2 border-t border-gray-200">
                    <div className="flex justify-between">
                      <span className="font-medium">Net Profit</span>
                      <span className="font-bold text-green-600 text-lg">
                        ${(totals.revenue - totals.expenses).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
