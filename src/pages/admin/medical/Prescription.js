import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Plus,
  FileText,
  Pill,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Edit3,
  Eye,
  Upload,
  Printer,
  Zap,
  Filter
} from 'lucide-react';

const mockPrescriptions = [
  { id: 'RX001', patientName: 'Ahmed Khan', doctor: 'Dr. Fatima Ali', date: '2025-01-16', medicines: 3, status: 'approved', pharmacyStatus: 'ready', urgent: false },
  { id: 'RX002', patientName: 'Priya Sharma', doctor: 'Dr. Rajesh Gupta', date: '2025-01-15', medicines: 2, status: 'pending', pharmacyStatus: 'reviewing', urgent: true },
  { id: 'RX003', patientName: 'Sara Ahmed', doctor: 'Dr. Ayesha Khan', date: '2025-01-14', medicines: 2, status: 'approved', pharmacyStatus: 'dispensed', urgent: false },
  { id: 'RX004', patientName: 'Vikram Singh', doctor: 'Dr. Priya Reddy', date: '2025-01-13', medicines: 2, status: 'rejected', pharmacyStatus: 'cancelled', urgent: false },
  { id: 'RX005', patientName: 'Rohit Patel', doctor: 'Dr. Sanjay Joshi', date: '2025-01-12', medicines: 2, status: 'approved', pharmacyStatus: 'processing', urgent: true }
];

const statusConfig = {
  approved: { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: CheckCircle },
  pending: { color: 'bg-yellow-100 text-yellow-800 border-yellow-200', icon: Clock },
  rejected: { color: 'bg-red-100 text-red-800 border-red-200', icon: AlertTriangle },
  processing: { color: 'bg-blue-100 text-blue-800 border-blue-200', icon: Zap }
};

const pharmacyStatusConfig = {
  ready: { color: 'bg-green-100 text-green-800 border-green-200', label: 'Ready' },
  reviewing: { color: 'bg-orange-100 text-orange-800 border-orange-200', label: 'Review' },
  processing: { color: 'bg-blue-100 text-blue-800 border-blue-200', label: 'Processing' },
  dispensed: { color: 'bg-emerald-100 text-emerald-800 border-emerald-200', label: 'Dispensed' },
  cancelled: { color: 'bg-red-100 text-red-800 border-red-200', label: 'Cancelled' }
};

export default function Prescription() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({ status: 'all', urgent: 'all' });

  const filteredPrescriptions = mockPrescriptions.filter(rx => 
    rx.patientName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filters.status === 'all' || rx.status === filters.status) &&
    (filters.urgent === 'all' || rx.urgent === (filters.urgent === 'true'))
  );

  const stats = {
    total: filteredPrescriptions.length,
    approved: filteredPrescriptions.filter(p => p.status === 'approved').length,
    pending: filteredPrescriptions.filter(p => p.status === 'pending').length
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Compact Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-gray-200">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescription Management</h1>
          <p className="text-sm text-gray-500">Manage digital prescriptions and pharmacy orders</p>
        </div>
        <div className="flex gap-2">
          <motion.button 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white text-sm font-medium rounded-xl shadow-sm hover:bg-emerald-700 transition-colors"
          >
            <Plus size={16} /> New
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-2 px-4 py-2 bg-white text-gray-700 border border-gray-200 text-sm font-medium rounded-xl shadow-sm hover:bg-gray-50 transition-colors"
          >
            <Printer size={16} /> Print
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Total</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <FileText className="w-10 h-10 text-blue-500" />
          </div>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Approved</p>
              <p className="text-2xl font-bold text-emerald-600">{stats.approved}</p>
            </div>
            <CheckCircle className="w-10 h-10 text-emerald-500" />
          </div>
        </div>
        <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <Clock className="w-10 h-10 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by patient, Rx ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />
          </div>
          <select 
            value={filters.status} 
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="all">All Status</option>
            <option value="approved">Approved</option>
            <option value="pending">Pending</option>
          </select>
          <select 
            value={filters.urgent} 
            onChange={(e) => setFilters({...filters, urgent: e.target.value})}
            className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          >
            <option value="all">All Urgent</option>
            <option value="true">Urgent Only</option>
          </select>
        </div>
      </div>

      {/* Professional Compact Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-emerald-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Patient</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Doctor</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Items</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Pharmacy</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPrescriptions.map((rx, index) => (
                <motion.tr 
                  key={rx.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-4 py-3 font-mono font-semibold text-emerald-600 text-sm">{rx.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center">
                        <span className="text-xs font-bold text-white">{rx.patientName.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-sm text-gray-900">{rx.patientName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">{rx.doctor}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-gray-100 text-xs font-medium text-gray-700 rounded-full">{rx.medicines} items</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="text-sm font-medium text-gray-900">{rx.date}</div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={'px-3 py-1 rounded-full text-xs font-semibold border ' + statusConfig[rx.status]?.color}>
                      {rx.status.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={'px-3 py-1 rounded-full text-xs font-semibold border ' + pharmacyStatusConfig[rx.pharmacyStatus]?.color}>
                      {pharmacyStatusConfig[rx.pharmacyStatus]?.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right space-x-1">
                    <motion.button whileHover={{ scale: 1.1 }} className="p-1.5 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                      <Eye size={16} />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit3 size={16} />
                    </motion.button>
                    <motion.button whileHover={{ scale: 1.1 }} className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors">
                      <Printer size={16} />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
              {filteredPrescriptions.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-500">
                    <FileText className="mx-auto h-12 w-12" />
                    <p className="mt-2 text-sm">No prescriptions found</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {filteredPrescriptions.length > 0 && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{filteredPrescriptions.length}</span> prescriptions
          </div>
          <div className="text-sm text-gray-700">
            Page 1 of 1
          </div>
        </div>
      )}
    </div>
  );
}
