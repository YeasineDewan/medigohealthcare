import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  MoreVertical,
  FileText,
  DollarSign,
  CheckCircle,
  XCircle,
  Download,
  Upload,
  Filter,
  X,
  Save,
  ArrowLeft,
  ArrowRight,
  Building,
  Wallet,
  CreditCard,
  Banknote,
  User,
  Calendar,
  TrendingUp,
  TrendingDown,
  MinusCircle,
  AlertCircle
} from 'lucide-react';

// Mock data for ledgers
const initialLedgers = [
  { id: 1, code: '1001', name: 'Cash in Hand', group: 'Assets - Current Assets', nature: 'Debit', openingBalance: 500000, currentBalance: 750000, type: 'Cash', isActive: true, lastTransaction: '2024-01-20' },
  { id: 2, code: '1002', name: 'Bank Account', group: 'Assets - Current Assets', nature: 'Debit', openingBalance: 1000000, currentBalance: 1250000, type: 'Bank', isActive: true, lastTransaction: '2024-01-20' },
  { id: 3, code: '2001', name: 'Accounts Payable', group: 'Liabilities - Current Liabilities', nature: 'Credit', openingBalance: 200000, currentBalance: 180000, type: 'Creditor', isActive: true, lastTransaction: '2024-01-19' },
  { id: 4, code: '3001', name: 'Capital Account', group: 'Equity', nature: 'Credit', openingBalance: 2000000, currentBalance: 2500000, type: 'Capital', isActive: true, lastTransaction: '2024-01-15' },
  { id: 5, code: '4001', name: 'Sales Revenue', group: 'Revenue - Direct Income', nature: 'Credit', openingBalance: 0, currentBalance: 3500000, type: 'Income', isActive: true, lastTransaction: '2024-01-20' },
  { id: 6, code: '5001', name: 'Purchase Account', group: 'Expenses - Direct Expenses', nature: 'Debit', openingBalance: 0, currentBalance: 1800000, type: 'Expense', isActive: true, lastTransaction: '2024-01-20' },
];

const natureColors = {
  Debit: 'bg-blue-100 text-blue-700 border-blue-200',
  Credit: 'bg-green-100 text-green-700 border-green-200'
};

const typeColors = {
  Cash: 'bg-amber-100 text-amber-700 border-amber-200',
  Bank: 'bg-purple-100 text-purple-700 border-purple-200',
  Creditor: 'bg-red-100 text-red-700 border-red-200',
  Capital: 'bg-indigo-100 text-indigo-700 border-indigo-200',
  Income: 'bg-green-100 text-green-700 border-green-200',
  Expense: 'bg-red-100 text-red-700 border-red-200'
};

export default function CreateLedger() {
  const [ledgers, setLedgers] = useState(initialLedgers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedLedger, setSelectedLedger] = useState(null);
  const [sortBy, setSortBy] = useState('code');
  const [sortOrder, setSortOrder] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  // Filter ledgers
  const filteredLedgers = ledgers.filter(ledger =>
    ledger.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ledger.code.includes(searchTerm) ||
    ledger.group.toLowerCase().includes(searchTerm)
  );

  // Sort ledgers
  const sortedLedgers = [...filteredLedgers].sort((a, b) => {
    let aVal = a[sortBy];
    let bVal = b[sortBy];
    if (typeof aVal === 'string') {
      aVal = aVal.toLowerCase();
      bVal = bVal.toLowerCase();
    }
    if (sortOrder === 'asc') return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  // Pagination
  const totalPages = Math.ceil(sortedLedgers.length / itemsPerPage);
  const paginatedLedgers = sortedLedgers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const handleAddLedger = () => {
    setModalMode('add');
    setSelectedLedger(null);
    setShowModal(true);
  };

  const handleEditLedger = (ledger) => {
    setModalMode('edit');
    setSelectedLedger(ledger);
    setShowModal(true);
  };

  const handleDeleteLedger = (ledger) => {
    setLedgers(ledgers.filter(l => l.id !== ledger.id));
  };

  const handleToggleActive = (ledger) => {
    setLedgers(ledgers.map(l =>
      l.id === ledger.id ? { ...l, isActive: !l.isActive } : l
    ));
  };

  const handleSaveLedger = (ledgerData) => {
    if (modalMode === 'add') {
      const newLedger = {
        ...ledgerData,
        id: Date.now(),
        currentBalance: ledgerData.openingBalance,
        lastTransaction: new Date().toISOString().split('T')[0]
      };
      setLedgers([...ledgers, newLedger]);
    } else {
      setLedgers(ledgers.map(l =>
        l.id === selectedLedger.id ? { ...l, ...ledgerData } : l
      ));
    }
    setShowModal(false);
  };

  // Calculate totals
  const totals = {
    totalDebit: ledgers.filter(l => l.nature === 'Debit').reduce((sum, l) => sum + l.currentBalance, 0),
    totalCredit: ledgers.filter(l => l.nature === 'Credit').reduce((sum, l) => sum + l.currentBalance, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ledger Accounts</h1>
          <p className="text-gray-500 mt-1">Manage individual ledger accounts and transactions</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button
            onClick={handleAddLedger}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            Add Ledger
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Ledgers</p>
              <p className="text-2xl font-bold text-gray-900">{ledgers.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
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
              <p className="text-sm text-gray-500">Total Debit</p>
              <p className="text-2xl font-bold text-blue-600">${(totals.totalDebit / 1000000).toFixed(2)}M</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-blue-600" />
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
              <p className="text-sm text-gray-500">Total Credit</p>
              <p className="text-2xl font-bold text-green-600">${(totals.totalCredit / 1000000).toFixed(2)}M</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
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
              <p className="text-2xl font-bold text-purple-600">${((totals.totalDebit - totals.totalCredit) / 1000000).toFixed(2)}M</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Wallet className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name, code, or group..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="w-4 h-4" />
            More Filters
          </button>
        </div>
      </div>

      {/* Ledgers Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('code')}
                >
                  <div className="flex items-center gap-1">
                    Code
                    {sortBy === 'code' && (
                      <span className="text-[#5DBB63]">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center gap-1">
                    Ledger Name
                    {sortBy === 'name' && (
                      <span className="text-[#5DBB63]">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Group
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Nature
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Type
                </th>
                <th
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSort('currentBalance')}
                >
                  <div className="flex items-center gap-1">
                    Balance
                    {sortBy === 'currentBalance' && (
                      <span className="text-[#5DBB63]">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                    )}
                  </div>
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedLedgers.map((ledger, index) => (
                <motion.tr
                  key={ledger.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <span className="font-mono font-medium text-gray-900">{ledger.code}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="font-medium text-gray-900">{ledger.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{ledger.group}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${natureColors[ledger.nature]}`}>
                      {ledger.nature}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${typeColors[ledger.type]}`}>
                      {ledger.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {ledger.nature === 'Debit' ? (
                        <TrendingDown className="w-4 h-4 text-blue-500" />
                      ) : (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      )}
                      <span className="font-medium text-gray-900">
                        ${ledger.currentBalance.toLocaleString()}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                      ledger.isActive
                        ? 'bg-green-100 text-green-700 border-green-200'
                        : 'bg-gray-100 text-gray-700 border-gray-200'
                    }`}>
                      {ledger.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEditLedger(ledger)}
                        className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleToggleActive(ledger)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          ledger.isActive
                            ? 'text-gray-500 hover:text-orange-600 hover:bg-orange-50'
                            : 'text-gray-500 hover:text-green-600 hover:bg-green-50'
                        }`}
                        title={ledger.isActive ? 'Deactivate' : 'Activate'}
                      >
                        {ledger.isActive ? <XCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleDeleteLedger(ledger)}
                        className="p-1.5 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, sortedLedgers.length)} of {sortedLedgers.length} results
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded-lg text-sm font-medium ${
                  currentPage === page
                    ? 'bg-[#5DBB63] text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <LedgerModal
            mode={modalMode}
            ledger={selectedLedger}
            onClose={() => setShowModal(false)}
            onSave={handleSaveLedger}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

// Ledger Modal Component
function LedgerModal({ mode, ledger, onClose, onSave }) {
  const [formData, setFormData] = useState(ledger || {
    code: '',
    name: '',
    group: '',
    nature: 'Debit',
    type: 'Cash',
    openingBalance: 0,
    isActive: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const groups = [
    'Assets - Current Assets',
    'Assets - Fixed Assets',
    'Liabilities - Current Liabilities',
    'Liabilities - Long Term',
    'Equity',
    'Revenue - Direct Income',
    'Revenue - Indirect Income',
    'Expenses - Direct Expenses',
    'Expenses - Indirect Expenses'
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-lg"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {mode === 'add' ? 'Add Ledger Account' : 'Edit Ledger Account'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ledger Code</label>
                <input
                  type="text"
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                  placeholder="1001"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ledger Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Cash in Hand"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Account Group</label>
              <select
                value={formData.group}
                onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              >
                <option value="">Select Group</option>
                {groups.map(group => (
                  <option key={group} value={group}>{group}</option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nature</label>
                <select
                  value={formData.nature}
                  onChange={(e) => setFormData({ ...formData, nature: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  <option value="Debit">Debit</option>
                  <option value="Credit">Credit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  <option value="Cash">Cash</option>
                  <option value="Bank">Bank</option>
                  <option value="Creditor">Creditor</option>
                  <option value="Debtor">Debtor</option>
                  <option value="Capital">Capital</option>
                  <option value="Income">Income</option>
                  <option value="Expense">Expense</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Opening Balance</label>
              <input
                type="number"
                value={formData.openingBalance}
                onChange={(e) => setFormData({ ...formData, openingBalance: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              />
            </div>

            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                className="w-5 h-5 rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
              />
              <span className="font-medium text-gray-900">Active</span>
            </label>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] transition-all flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {mode === 'add' ? 'Add Ledger' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
