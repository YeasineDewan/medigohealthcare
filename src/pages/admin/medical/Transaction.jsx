import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Plus,
  DollarSign,
  Users,
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit3,
  Trash2,
  Eye,
  Receipt,
  CreditCard,
  TrendingUp,
  Activity,
  FileSpreadsheet,
  Zap,
  Package
} from 'lucide-react';

const mockTransactions = [
  { 
    id: 'TXN001', 
    patientName: 'John Smith', 
    doctor: 'Dr. Sarah Johnson', 
    services: ['Consultation', 'Blood Test', 'ECG'], 
    date: '2025-01-15', 
    amount: 245.00, 
    paid: 200.00, 
    due: 45.00, 
    status: 'partial', 
    invoiceId: 'INV-2025-001'
  },
  { 
    id: 'TXN002', 
    patientName: 'Sarah Davis', 
    doctor: 'Dr. Michael Chen', 
    services: ['Full Body Checkup'], 
    date: '2025-01-14', 
    amount: 3500.00, 
    paid: 3500.00, 
    due: 0, 
    status: 'paid', 
    invoiceId: 'INV-2025-002'
  },
  { 
    id: 'TXN003', 
    patientName: 'Robert Wilson', 
    doctor: 'Dr. Lisa Anderson', 
    services: ['MRI Scan', 'Consultation'], 
    date: '2025-01-14', 
    amount: 450.00, 
    paid: 0, 
    due: 450.00, 
    status: 'pending', 
    invoiceId: 'INV-2025-003'
  },
  { 
    id: 'TXN004', 
    patientName: 'Emily Brown', 
    doctor: 'Dr. James Brown', 
    services: ['X-Ray', 'Pharmacy'], 
    date: '2025-01-13', 
    amount: 125.00, 
    paid: 125.00, 
    due: 0, 
    status: 'paid', 
    invoiceId: 'INV-2025-004'
  },
  { 
    id: 'TXN005', 
    patientName: 'Michael Johnson', 
    doctor: 'Dr. Sarah Johnson', 
    services: ['CT Scan', 'Follow-up'], 
    date: '2025-01-13', 
    amount: 280.00, 
    paid: 100.00, 
    due: 180.00, 
    status: 'partial', 
    invoiceId: 'INV-2025-005'
  }
];

const serviceTypes = ['All', 'Consultation', 'Diagnostic', 'Package', 'Pharmacy'];
const statusColors = { 
  paid: 'bg-green-100 text-green-700', 
  partial: 'bg-yellow-100 text-yellow-700', 
  pending: 'bg-orange-100 text-orange-700', 
  overdue: 'bg-red-100 text-red-700' 
};

export default function Transaction() {
  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateRange, setDateRange] = useState('30d');

  const filteredTransactions = mockTransactions.filter(t => {
    const matchesSearch = t.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          t.invoiceId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesService = serviceFilter === 'All' || t.services.some(s => s === serviceFilter);
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesService && matchesStatus;
  });

  const stats = {
    total: filteredTransactions.length,
    revenue: filteredTransactions.reduce((sum, t) => sum + t.paid, 0),
    pending: filteredTransactions.filter(t => t.status === 'pending' || t.status === 'partial').reduce((sum, t) => sum + t.due, 0),
    paid: filteredTransactions.filter(t => t.status === 'paid').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Medical Transactions</h1>
          <p className="text-gray-500 mt-1">Complete transaction management & billing system</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-xl hover:from-[#4CAF50] hover:to-[#45a049] shadow-lg hover:shadow-xl transition-all">
            <Plus className="w-4 h-4" /> New Transaction
          </button>
        </div>
      </div>

      {/* Stats Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="group bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Total Transactions</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="group bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Total Revenue</p>
              <p className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-emerald-500 bg-clip-text text-transparent mt-1">
                ${stats.revenue.toLocaleString()}
              </p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="group bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Pending Amount</p>
              <p className="text-3xl font-bold text-orange-600 mt-1">${stats.pending.toLocaleString()}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <Clock className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
          className="group bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 font-medium uppercase tracking-wide">Paid Transactions</p>
              <p className="text-3xl font-bold text-green-600 mt-1">{stats.paid}</p>
            </div>
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Advanced Filters */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient, ID, or invoice..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent transition-all"
            />
          </div>
          <select 
            value={serviceFilter} 
            onChange={(e) => setServiceFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          >
            {serviceTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="partial">Partial</option>
            <option value="pending">Pending</option>
            <option value="overdue">Overdue</option>
          </select>
          <select 
            value={dateRange} 
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl border border-white/50 shadow-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Transaction ID</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Doctor</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Services</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Paid</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Due</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">Invoice</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.map((txn, index) => (
                <motion.tr 
                  key={txn.id} 
                  initial={{ opacity: 0, x: -20 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gradient-to-r hover:from-blue-50 hover:to-emerald-50 transition-all duration-200"
                >
                  <td className="px-6 py-4 font-mono text-sm font-semibold text-gray-900">{txn.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white font-semibold text-sm shadow-lg">
                        {txn.patientName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{txn.patientName}</div>
                        <div className="text-sm text-gray-500">Patient ID: {txn.id.slice(-4)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-medium text-gray-900">{txn.doctor}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {txn.services.map((service, sIndex) => (
                        <span key={sIndex} className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-700">
                          {service}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 font-medium">{txn.date}</td>
                  <td className="px-6 py-4 text-right">
                    <div className="text-lg font-bold text-gray-900">${txn.amount.toLocaleString()}</div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-lg font-bold text-emerald-600">${txn.paid.toLocaleString()}</span>
                  </td>
                  <td className={`px-6 py-4 text-right text-lg font-bold ${txn.due > 0 ? 'text-orange-600' : 'text-emerald-600'}`}>
                    ${txn.due.toLocaleString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-4 py-2 rounded-full text-sm font-semibold ${statusColors[txn.status]}`}>
                      {txn.status.charAt(0).toUpperCase() + txn.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm bg-blue-100 text-blue-800 px-3 py-1 rounded-full">
                      {txn.invoiceId}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl transition-all">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      {txn.due > 0 && (
                        <button className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-xl transition-all">
                          <CreditCard className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all">
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredTransactions.length === 0 && (
          <div className="text-center py-12">
            <FileSpreadsheet className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No transactions found</h3>
            <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
            <button className="px-6 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-xl hover:from-[#4CAF50] hover:to-[#45a049] transition-all shadow-lg">
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

