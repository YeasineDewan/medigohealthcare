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
  DollarSign,
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Calendar,
  Package,
  ShoppingCart,
  Users,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  RefreshCw,
  MoreHorizontal,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV } from '../../../utils/exportUtils';

// Mock sales data
const generateSalesData = () => {
  const products = [
    'Paracetamol 500mg',
    'Amoxicillin 250mg',
    'Ibuprofen 400mg',
    'Vitamin C 1000mg',
    'Aspirin 75mg',
    'Cough Syrup',
    'Bandages (Large)',
    'Surgical Gloves',
    'Digital Thermometer',
    'Blood Pressure Monitor',
  ];

  const paymentMethods = ['cash', 'card', 'upi', 'insurance'];
  const statuses = ['completed', 'pending', 'refunded', 'cancelled'];

  return Array.from({ length: 30 }, (_, i) => {
    const itemCount = Math.floor(Math.random() * 5) + 1;
    const items = Array.from({ length: itemCount }, () => ({
      name: products[Math.floor(Math.random() * products.length)],
      quantity: Math.floor(Math.random() * 3) + 1,
      unitPrice: Math.floor(Math.random() * 50) + 5,
    }));
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const discount = subtotal * (Math.random() * 0.1);
    const tax = (subtotal - discount) * 0.1;
    const total = subtotal - discount + tax;
    const paymentMethod = paymentMethods[Math.floor(Math.random() * paymentMethods.length)];
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    return {
      id: 2000 + i,
      invoiceNumber: `INV-${2000 + i}`,
      items,
      subtotal,
      discount,
      tax,
      total,
      paymentMethod,
      status,
      customer: {
        name: ['John Smith', 'Emma Wilson', 'Michael Brown', 'Sarah Davis', 'David Johnson'][Math.floor(Math.random() * 5)],
        phone: `+1-234-567-${8900 + i}`,
      },
      salesDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      salesTime: `${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}:${String(Math.floor(Math.random() * 60)).padStart(2, '0')} ${Math.random() > 0.5 ? 'AM' : 'PM'}`,
    };
  });
};

const paymentMethodIcons = {
  cash: <DollarSign className="w-4 h-4" />,
  card: <CreditCard className="w-4 h-4" />,
  upi: <Wallet className="w-4 h-4" />,
  insurance: <Package className="w-4 h-4" />,
};

const statusColors = {
  completed: 'bg-green-100 text-green-700',
  pending: 'bg-yellow-100 text-yellow-700',
  refunded: 'bg-purple-100 text-purple-700',
  cancelled: 'bg-red-100 text-red-700',
};

export default function Sales() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sales] = useState(generateSalesData);
  const [selectedSale, setSelectedSale] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const filteredSales = sales.filter(sale => {
    const matchesSearch = 
      sale.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sale.customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || sale.status === statusFilter;
    const matchesPayment = paymentFilter === 'all' || sale.paymentMethod === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  // Stats
  const totalSales = sales.length;
  const totalRevenue = sales.filter(s => s.status === 'completed').reduce((sum, s) => sum + s.total, 0);
  const totalDiscount = sales.reduce((sum, s) => sum + s.discount, 0);
  const avgOrderValue = totalRevenue / sales.filter(s => s.status === 'completed').length;
  
  // Today's sales
  const today = new Date().toISOString().split('T')[0];
  const todaySales = sales.filter(s => s.salesDate === today);
  const todayRevenue = todaySales.filter(s => s.status === 'completed').reduce((sum, s) => sum + s.total, 0);

  // Payment method breakdown
  const paymentBreakdown = {
    cash: sales.filter(s => s.paymentMethod === 'cash' && s.status === 'completed').reduce((sum, s) => sum + s.total, 0),
    card: sales.filter(s => s.paymentMethod === 'card' && s.status === 'completed').reduce((sum, s) => sum + s.total, 0),
    upi: sales.filter(s => s.paymentMethod === 'upi' && s.status === 'completed').reduce((sum, s) => sum + s.total, 0),
    insurance: sales.filter(s => s.paymentMethod === 'insurance' && s.status === 'completed').reduce((sum, s) => sum + s.total, 0),
  };

  const handleViewSale = (sale) => {
    setSelectedSale(sale);
    setShowViewModal(true);
  };

  const handleExportCSV = () => {
    const csvData = sales.map(sale => ({
      'Invoice Number': sale.invoiceNumber,
      'Customer': sale.customer.name,
      'Phone': sale.customer.phone,
      'Date': sale.salesDate,
      'Time': sale.salesTime,
      'Items': sale.items.map(item => `${item.name} (${item.quantity}x $${item.unitPrice})`).join(', '),
      'Subtotal': sale.subtotal.toFixed(2),
      'Discount': sale.discount.toFixed(2),
      'Tax': sale.tax.toFixed(2),
      'Total': sale.total.toFixed(2),
      'Payment Method': sale.paymentMethod,
      'Status': sale.status
    }));
    
    exportToCSV(csvData, 'sales-report');
  };

  const handleExportPDF = () => {
    const columns = [
      { key: 'invoiceNumber', label: 'Invoice #' },
      { key: 'customer', label: 'Customer', transform: (v) => v.name },
      { key: 'items', label: 'Items', transform: (v) => `${v.length} items` },
      { key: 'subtotal', label: 'Subtotal', transform: (v) => `$${v.toFixed(2)}` },
      { key: 'discount', label: 'Discount', transform: (v) => `$${v.toFixed(2)}` },
      { key: 'total', label: 'Total', transform: (v) => `$${v.toFixed(2)}` },
      { key: 'paymentMethod', label: 'Payment' },
      { key: 'status', label: 'Status' },
      { key: 'salesDate', label: 'Date' },
    ];
    const exportData = filteredSales.map(s => ({
      ...s,
      customer: s.customer,
    }));
    exportToPDF(exportData, 'Sales Report', columns);
  };

  const handleExportWord = () => {
    const columns = [
      { key: 'invoiceNumber', label: 'Invoice #' },
      { key: 'customer', label: 'Customer', transform: (v) => v.name },
      { key: 'items', label: 'Items', transform: (v) => `${v.length} items` },
      { key: 'subtotal', label: 'Subtotal', transform: (v) => `$${v.toFixed(2)}` },
      { key: 'discount', label: 'Discount', transform: (v) => `$${v.toFixed(2)}` },
      { key: 'total', label: 'Total', transform: (v) => `$${v.toFixed(2)}` },
      { key: 'paymentMethod', label: 'Payment' },
      { key: 'status', label: 'Status' },
      { key: 'salesDate', label: 'Date' },
    ];
    const exportData = filteredSales.map(s => ({
      ...s,
      customer: s.customer,
    }));
    exportToWord(exportData, 'Sales Report', columns);
  };

  const printDocument = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Sales</h1>
          <p className="text-gray-500 mt-1">Track sales, revenue, and analytics</p>
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
            <Plus className="w-4 h-4" />New Sale
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
              <p className="text-sm text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-green-600">
            <ArrowUpRight className="w-4 h-4" />
            <span className="text-sm">+12.5% from last month</span>
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
              <p className="text-sm text-gray-500">Today's Revenue</p>
              <p className="text-2xl font-bold text-blue-600">${todayRevenue.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {todaySales.length} transactions today
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
              <p className="text-sm text-gray-500">Avg. Order Value</p>
              <p className="text-2xl font-bold text-purple-600">${avgOrderValue.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1 text-green-600">
            <ArrowUpRight className="w-4 h-4" />
            <span className="text-sm">+5.2% from last month</span>
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
              <p className="text-sm text-gray-500">Total Discount</p>
              <p className="text-2xl font-bold text-orange-600">${totalDiscount.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Payment Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <h3 className="font-semibold text-gray-900 mb-4">Payment Methods</h3>
          <div className="space-y-3">
            {Object.entries(paymentBreakdown).map(([method, amount]) => (
              <div key={method} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    {paymentMethodIcons[method]}
                  </div>
                  <span className="text-sm text-gray-600 capitalize">{method}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-24 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] rounded-full"
                      style={{ width: `${totalRevenue > 0 ? (amount / totalRevenue) * 100 : 0}%` }}
                    />
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-20 text-right">${amount.toLocaleString()}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{totalSales}</p>
              <p className="text-sm text-gray-600">Total Sales</p>
            </div>
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{sales.filter(s => s.status === 'completed').length}</p>
              <p className="text-sm text-gray-600">Completed</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{sales.filter(s => s.status === 'pending').length}</p>
              <p className="text-sm text-gray-600">Pending</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{sales.filter(s => s.status === 'refunded').length}</p>
              <p className="text-sm text-gray-600">Refunded</p>
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
              placeholder="Search sales..."
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
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="refunded">Refunded</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select
            value={paymentFilter}
            onChange={(e) => setPaymentFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          >
            <option value="all">All Payments</option>
            <option value="cash">Cash</option>
            <option value="card">Card</option>
            <option value="upi">UPI</option>
            <option value="insurance">Insurance</option>
          </select>
        </div>
      </div>

      {/* Sales Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Invoice #</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Items</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Subtotal</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Discount</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Total</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Payment</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSales.slice(0, 15).map((sale, index) => (
                <motion.tr
                  key={sale.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.02 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <span className="font-mono font-medium text-gray-900">{sale.invoiceNumber}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white text-sm font-medium">
                        {sale.customer.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{sale.customer.name}</p>
                        <p className="text-xs text-gray-500">{sale.customer.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="text-sm text-gray-600">{sale.items.length} items</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm text-gray-600">${sale.subtotal.toFixed(2)}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-sm text-red-500">-${sale.discount.toFixed(2)}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-medium text-gray-900">${sale.total.toFixed(2)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {paymentMethodIcons[sale.paymentMethod]}
                      <span className="text-sm text-gray-600 capitalize">{sale.paymentMethod}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[sale.status]}`}>
                      {sale.status.charAt(0).toUpperCase() + sale.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="text-sm text-gray-600">{sale.salesDate}</p>
                      <p className="text-xs text-gray-400">{sale.salesTime}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleViewSale(sale)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg" title="Edit">
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
        {showViewModal && selectedSale && (
          <SaleViewModal sale={selectedSale} onClose={() => setShowViewModal(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function SaleViewModal({ sale, onClose }) {
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
              <h2 className="text-xl font-bold text-gray-900">Invoice {sale.invoiceNumber}</h2>
              <p className="text-gray-500">{sale.salesDate} at {sale.salesTime}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
          {/* Customer Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-2">Customer Information</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white font-bold">
                {sale.customer.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{sale.customer.name}</p>
                <p className="text-sm text-gray-500">{sale.customer.phone}</p>
              </div>
            </div>
          </div>

          {/* Items */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Items</h3>
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
                  {sale.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="px-4 py-2 font-medium">{item.name}</td>
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
                <span className="font-medium">${sale.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Discount</span>
                <span>-${sale.discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (10%)</span>
                <span className="font-medium">${sale.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-lg text-green-600">${sale.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Payment & Status */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Payment Method</p>
              <p className="font-semibold capitalize">{sale.paymentMethod}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">Status</p>
              <p className={`font-semibold capitalize ${statusColors[sale.status]}`}>{sale.status}</p>
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
