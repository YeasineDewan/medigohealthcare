import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  FileText,
  FileSpreadsheet,
  Printer,
  Plus,
  Eye,
  Edit3,
  Trash2,
  X,
  Save,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Calendar,
  User,
  Pill,
  ChevronDown,
  ChevronRight,
  Package,
  Send,
  RefreshCw,
  MoreHorizontal,
  TrendingUp,
  TrendingDown,
  BarChart3
} from 'lucide-react';
import { exportToPDF, exportToWord, printDocument } from '../../../utils/exportUtils';

// Mock prescription orders data
const generateOrders = () => {
  const patients = [
    { id: 1, name: 'John Smith', email: 'john.smith@email.com', phone: '+1-234-567-8901' },
    { id: 2, name: 'Emma Wilson', email: 'emma.wilson@email.com', phone: '+1-234-567-8902' },
    { id: 3, name: 'Michael Brown', email: 'michael.brown@email.com', phone: '+1-234-567-8903' },
    { id: 4, name: 'Sarah Davis', email: 'sarah.davis@email.com', phone: '+1-234-567-8904' },
    { id: 5, name: 'David Johnson', email: 'david.johnson@email.com', phone: '+1-234-567-8905' },
  ];

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiology' },
    { id: 2, name: 'Dr. Michael Chen', specialization: 'Neurology' },
    { id: 3, name: 'Dr. Emily Williams', specialization: 'Pediatrics' },
  ];

  const statuses = ['pending', 'processing', 'completed', 'cancelled'];
  const paymentStatuses = ['paid', 'pending', 'refunded'];

  return Array.from({ length: 15 }, (_, i) => {
    const patient = patients[Math.floor(Math.random() * patients.length)];
    const doctor = doctors[Math.floor(Math.random() * doctors.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];
    const paymentStatus = paymentStatuses[Math.floor(Math.random() * paymentStatuses.length)];
    const itemCount = Math.floor(Math.random() * 5) + 1;
    const subtotal = Math.floor(Math.random() * 500) + 50;
    const tax = subtotal * 0.1;
    const total = subtotal + tax;

    return {
      id: 1000 + i,
      orderNumber: `RX-${1000 + i}`,
      patient,
      doctor,
      items: Array.from({ length: itemCount }, (_, j) => ({
        name: ['Paracetamol 500mg', 'Amoxicillin 250mg', 'Ibuprofen 400mg', 'Vitamin C 1000mg', 'Aspirin 75mg'][Math.floor(Math.random() * 5)],
        quantity: Math.floor(Math.random() * 3) + 1,
        unitPrice: Math.floor(Math.random() * 20) + 5,
      })),
      status,
      paymentStatus,
      subtotal,
      tax,
      total,
      orderDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      deliveryDate: status === 'completed' ? new Date(Date.now() - Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : null,
      notes: '',
    };
  });
};

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  processing: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const paymentColors = {
  paid: 'bg-green-100 text-green-700',
  pending: 'bg-orange-100 text-orange-700',
  refunded: 'bg-purple-100 text-purple-700',
};

export default function PrescriptionOrders() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [orders] = useState(generateOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || order.paymentStatus === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Stats
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'pending').length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const totalRevenue = orders.filter(o => o.paymentStatus === 'paid').reduce((sum, o) => sum + o.total, 0);

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const handleEditOrder = (order) => {
    setEditingOrder({ ...order });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    alert(`Order ${editingOrder.orderNumber} updated successfully`);
    setShowEditModal(false);
    setEditingOrder(null);
  };

  const handleExportPDF = () => {
    const columns = [
      { key: 'orderNumber', label: 'Order #' },
      { key: 'patient', label: 'Patient', transform: (v) => v.name },
      { key: 'doctor', label: 'Doctor', transform: (v) => v.name },
      { key: 'status', label: 'Status' },
      { key: 'paymentStatus', label: 'Payment' },
      { key: 'total', label: 'Total', transform: (v) => `$${v.toFixed(2)}` },
      { key: 'orderDate', label: 'Date' },
    ];
    const exportData = filteredOrders.map(o => ({
      ...o,
      patient: o.patient,
      doctor: o.doctor,
    }));
    exportToPDF(exportData, 'Prescription Orders Report', columns);
  };

  const handleExportWord = () => {
    const columns = [
      { key: 'orderNumber', label: 'Order #' },
      { key: 'patient', label: 'Patient', transform: (v) => v.name },
      { key: 'doctor', label: 'Doctor', transform: (v) => v.name },
      { key: 'status', label: 'Status' },
      { key: 'paymentStatus', label: 'Payment' },
      { key: 'total', label: 'Total', transform: (v) => `$${v.toFixed(2)}` },
      { key: 'orderDate', label: 'Date' },
    ];
    const exportData = filteredOrders.map(o => ({
      ...o,
      patient: o.patient,
      doctor: o.doctor,
    }));
    exportToWord(exportData, 'Prescription Orders Report', columns);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <RefreshCw className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescription Orders</h1>
          <p className="text-gray-500 mt-1">Manage prescription orders and track fulfillment</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FileText className="w-4 h-4" />PDF
          </button>
          <button onClick={handleExportWord} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FileSpreadsheet className="w-4 h-4" />Word
          </button>
          <button onClick={printDocument} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Printer className="w-4 h-4" />Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]">
            <Plus className="w-4 h-4" />New Order
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
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
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
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingOrders}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
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
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedOrders}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
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
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-purple-600">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
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
              placeholder="Search orders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          >
            <option value="all">All Payments</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order #</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Doctor</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Items</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Total</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Payment</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order, index) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <span className="font-mono font-medium text-gray-900">{order.orderNumber}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white text-sm font-medium">
                        {order.patient.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{order.patient.name}</p>
                        <p className="text-xs text-gray-500">{order.patient.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{order.doctor.name}</p>
                      <p className="text-xs text-gray-500">{order.doctor.specialization}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-sm text-gray-600">{order.items.length} items</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-medium text-gray-900">${order.total.toFixed(2)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                      {getStatusIcon(order.status)}
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${paymentColors[order.paymentStatus]}`}>
                      {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-500">{order.orderDate}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleViewOrder(order)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleEditOrder(order)} className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg" title="Edit">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedOrder && (
          <OrderViewModal order={selectedOrder} onClose={() => setShowViewModal(false)} />
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && editingOrder && (
          <OrderEditModal order={editingOrder} onClose={() => setShowEditModal(false)} onSave={handleSaveEdit} />
        )}
      </AnimatePresence>
    </div>
  );
}

function OrderViewModal({ order, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Order {order.orderNumber}</h2>
              <p className="text-gray-500">{order.orderDate}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
          {/* Patient Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Patient Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Name</p>
                <p className="font-medium">{order.patient.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <p className="font-medium">{order.patient.phone}</p>
              </div>
            </div>
          </div>

          {/* Doctor Info */}
          <div className="bg-green-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Prescribed By</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="font-medium">{order.doctor.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Specialization</p>
                <p className="font-medium">{order.doctor.specialization}</p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Prescribed Items</h3>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Item</th>
                    <th className="px-4 py-2 text-center text-xs font-semibold text-gray-600">Qty</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Price</th>
                    <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Total</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {order.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <Pill className="w-4 h-4 text-gray-400" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-2 text-center">{item.quantity}</td>
                      <td className="px-4 py-2 text-right">${item.unitPrice.toFixed(2)}</td>
                      <td className="px-4 py-2 text-right font-medium">${(item.quantity * item.unitPrice).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Totals */}
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-medium">${order.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-medium">${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg text-green-600">${order.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function OrderEditModal({ order, onClose, onSave }) {
  const [formData, setFormData] = useState(order);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-md"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Edit Order {order.orderNumber}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Order Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            >
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
            <select
              value={formData.paymentStatus}
              onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            >
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="refunded">Refunded</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              placeholder="Add notes..."
            />
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={onSave} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg">
            <Save className="w-4 h-4" />Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
