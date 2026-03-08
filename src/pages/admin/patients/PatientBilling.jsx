import { useState, useEffect } from 'react';
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
  User,
  DollarSign,
  CreditCard,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronRight,
  Receipt,
  TrendingUp,
  TrendingDown,
  Wallet,
  Percent,
  RefreshCw,
  Send,
  Building,
  CreditCard as CreditCardIcon,
  Banknote,
  ArrowRight,
  FileCheck,
  AlertTriangle,
  FilterIcon
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV, printDocument } from '../../../utils/exportUtils';

const PatientBilling = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    dateRange: 'all',
    paymentMethod: 'all'
  });

  // Mock data
  const mockInvoices = [
    {
      id: 1,
      invoiceNumber: 'INV-2024-0001',
      patient: { id: 1, name: 'Ahmed Khan', phone: '+880 1712345678', email: 'ahmed@email.com', patientId: 'PT-2024-0001' },
      invoiceDate: '2024-03-10',
      dueDate: '2024-03-25',
      items: [
        { name: 'Consultation Fee - Dr. Hasan', quantity: 1, unitPrice: 500, total: 500, category: 'consultation' },
        { name: 'Blood Test (CBC)', quantity: 1, unitPrice: 350, total: 350, category: 'lab' },
        { name: 'Blood Sugar Test', quantity: 1, unitPrice: 200, total: 200, category: 'lab' }
      ],
      subtotal: 1050,
      discount: 50,
      tax: 100,
      total: 1100,
      paid: 1100,
      due: 0,
      status: 'paid',
      paymentDate: '2024-03-10',
      paymentMethod: 'Cash',
      notes: ''
    },
    {
      id: 2,
      invoiceNumber: 'INV-2024-0002',
      patient: { id: 2, name: 'Sara Ali', phone: '+880 1912345678', email: 'sara@email.com', patientId: 'PT-2024-0002' },
      invoiceDate: '2024-03-12',
      dueDate: '2024-03-27',
      items: [
        { name: 'Cardiology Consultation - Dr. Fatima', quantity: 1, unitPrice: 800, total: 800, category: 'consultation' },
        { name: 'ECG', quantity: 1, unitPrice: 500, total: 500, category: 'procedure' },
        { name: 'Echo Cardiogram', quantity: 1, unitPrice: 2500, total: 2500, category: 'procedure' }
      ],
      subtotal: 3800,
      discount: 200,
      tax: 360,
      total: 3960,
      paid: 2000,
      due: 1960,
      status: 'partial',
      paymentDate: '2024-03-12',
      paymentMethod: 'Card',
      notes: 'Partial payment of 2000 made'
    },
    {
      id: 3,
      invoiceNumber: 'INV-2024-0003',
      patient: { id: 3, name: 'Rahman Hossain', phone: '+880 1612345678', email: 'rahman@email.com', patientId: 'PT-2024-0003' },
      invoiceDate: '2024-03-14',
      dueDate: '2024-03-29',
      items: [
        { name: 'Neurology Consultation - Dr. Kamal', quantity: 1, unitPrice: 600, total: 600, category: 'consultation' },
        { name: 'MRI Brain', quantity: 1, unitPrice: 5000, total: 5000, category: 'lab' }
      ],
      subtotal: 5600,
      discount: 0,
      tax: 560,
      total: 6160,
      paid: 0,
      due: 6160,
      status: 'pending',
      paymentDate: null,
      paymentMethod: null,
      notes: ''
    },
    {
      id: 4,
      invoiceNumber: 'INV-2024-0004',
      patient: { id: 4, name: 'Fatema Begum', phone: '+880 1512345678', email: 'fatema@email.com', patientId: 'PT-2024-0004' },
      invoiceDate: '2024-03-08',
      dueDate: '2024-03-23',
      items: [
        { name: 'General Checkup - Dr. Hasan', quantity: 1, unitPrice: 500, total: 500, category: 'consultation' }
      ],
      subtotal: 500,
      discount: 50,
      tax: 45,
      total: 495,
      paid: 495,
      due: 0,
      status: 'paid',
      paymentDate: '2024-03-08',
      paymentMethod: 'Mobile Banking',
      notes: ''
    },
    {
      id: 5,
      invoiceNumber: 'INV-2024-0005',
      patient: { id: 5, name: 'Mohammad Yusuf', phone: '+880 1812345679', email: 'yusuf@email.com', patientId: 'PT-2024-0005' },
      invoiceDate: '2024-02-28',
      dueDate: '2024-03-15',
      items: [
        { name: 'Pediatrics Consultation - Dr. Lisa', quantity: 1, unitPrice: 400, total: 400, category: 'consultation' },
        { name: 'Lab Tests', quantity: 1, unitPrice: 800, total: 800, category: 'lab' }
      ],
      subtotal: 1200,
      discount: 0,
      tax: 120,
      total: 1320,
      paid: 0,
      due: 1320,
      status: 'overdue',
      paymentDate: null,
      paymentMethod: null,
      notes: 'Payment overdue - patient not responding'
    },
    {
      id: 6,
      invoiceNumber: 'INV-2024-0006',
      patient: { id: 6, name: 'Jasmine Ahmed', phone: '+880 1912345670', email: 'jasmine@email.com', patientId: 'PT-2024-0006' },
      invoiceDate: '2024-03-15',
      dueDate: '2024-03-30',
      items: [
        { name: 'Cardiology Follow-up - Dr. Fatima', quantity: 1, unitPrice: 600, total: 600, category: 'consultation' },
        { name: 'ECG', quantity: 1, unitPrice: 500, total: 500, category: 'procedure' },
        { name: 'Medications', quantity: 1, unitPrice: 450, total: 450, category: 'medicine' }
      ],
      subtotal: 1550,
      discount: 100,
      tax: 145,
      total: 1595,
      paid: 1595,
      due: 0,
      status: 'paid',
      paymentDate: '2024-03-15',
      paymentMethod: 'Card',
      notes: ''
    }
  ];

  const statuses = [
    { value: 'all', label: 'All Status', color: 'gray' },
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'partial', label: 'Partial', color: 'blue' },
    { value: 'paid', label: 'Paid', color: 'green' },
    { value: 'overdue', label: 'Overdue', color: 'red' }
  ];

  const paymentMethods = ['All Methods', 'Cash', 'Card', 'Mobile Banking', 'Bank Transfer', 'Insurance'];

  useEffect(() => {
    setTimeout(() => {
      setInvoices(mockInvoices);
      setLoading(false);
    }, 800);
  }, []);

  const filteredInvoices = invoices.filter(inv => {
    const matchesSearch = 
      inv.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inv.patient.phone.includes(searchTerm) ||
      inv.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || inv.status === filters.status;
    const matchesPayment = filters.paymentMethod === 'all' || inv.paymentMethod === filters.paymentMethod;
    
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
      partial: { bg: 'bg-blue-100', text: 'text-blue-700', icon: CreditCard },
      paid: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      overdue: { bg: 'bg-red-100', text: 'text-red-700', icon: AlertCircle },
      cancelled: { bg: 'bg-gray-100', text: 'text-gray-700', icon: XCircle }
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handlePayment = (invoice) => {
    setSelectedInvoice(invoice);
    setShowPaymentModal(true);
  };

  const handleExport = (format) => {
    const columns = [
      { key: 'invoiceNumber', label: 'Invoice No.' },
      { key: 'patientName', label: 'Patient' },
      { key: 'patientId', label: 'Patient ID' },
      { key: 'invoiceDate', label: 'Invoice Date' },
      { key: 'dueDate', label: 'Due Date' },
      { key: 'total', label: 'Total' },
      { key: 'paid', label: 'Paid' },
      { key: 'due', label: 'Due' },
      { key: 'status', label: 'Status' }
    ];
    
    const data = filteredInvoices.map(inv => ({
      ...inv,
      patientName: inv.patient.name,
      patientId: inv.patient.patientId,
      total: `$${inv.total}`,
      paid: `$${inv.paid}`,
      due: `$${inv.due}`
    }));

    switch (format) {
      case 'pdf':
        exportToPDF(data, 'Billing Report', columns);
        break;
      case 'csv':
        exportToCSV(data, 'billing-report');
        break;
      case 'print':
        printDocument('Billing Report');
        break;
      default:
        break;
    }
  };

  // Statistics
  const totalInvoices = invoices.length;
  const totalAmount = invoices.reduce((sum, inv) => sum + inv.total, 0);
  const totalPaid = invoices.reduce((sum, inv) => sum + inv.paid, 0);
  const totalDue = invoices.reduce((sum, inv) => sum + inv.due, 0);
  const pendingInvoices = invoices.filter(inv => inv.status === 'pending' || inv.status === 'partial').length;
  const overdueInvoices = invoices.filter(inv => inv.status === 'overdue').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5DBB63]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Billing</h1>
          <p className="text-gray-500 mt-1">Manage patient invoices and payments</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FilterIcon className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <button onClick={() => handleExport('pdf')} className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                <FileText className="w-4 h-4" /> Export as PDF
              </button>
              <button onClick={() => handleExport('csv')} className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                <FileSpreadsheet className="w-4 h-4" /> Export as CSV
              </button>
              <button onClick={() => handleExport('print')} className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                <Printer className="w-4 h-4" /> Print
              </button>
            </div>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]">
            <Plus className="w-4 h-4" />
            Create Invoice
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Receipt className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Invoices</p>
              <p className="text-xl font-bold text-gray-900">{totalInvoices}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-xl font-bold text-gray-900">৳{totalAmount.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <CheckCircle className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Paid</p>
              <p className="text-xl font-bold text-green-600">৳{totalPaid.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Due</p>
              <p className="text-xl font-bold text-yellow-600">৳{totalDue.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Overdue</p>
              <p className="text-xl font-bold text-red-600">{overdueInvoices}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  {statuses.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                <select
                  value={filters.paymentMethod}
                  onChange={(e) => setFilters({ ...filters, paymentMethod: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  {paymentMethods.map(m => (
                    <option key={m} value={m === 'All Methods' ? 'all' : m}>{m}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]">
                  <option value="all">All Time</option>
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search invoices by patient name, ID, or invoice number..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          />
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Invoice</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Dates</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Paid</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Due</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredInvoices.map((inv, index) => (
                <motion.tr
                  key={inv.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div>
                      <p className="font-mono text-sm font-medium text-gray-900">{inv.invoiceNumber}</p>
                      <p className="text-xs text-gray-500">{inv.items.length} items</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{inv.patient.name}</p>
                        <p className="text-xs text-gray-500">{inv.patient.patientId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-gray-900">Invoice: {inv.invoiceDate}</p>
                      <p className={`text-xs ${inv.status === 'overdue' ? 'text-red-600' : 'text-gray-500'}`}>
                        Due: {inv.dueDate}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-medium text-gray-900">৳{inv.total.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className="font-medium text-green-600">৳{inv.paid.toLocaleString()}</p>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <p className={`font-medium ${inv.due > 0 ? 'text-yellow-600' : 'text-gray-400'}`}>
                      ৳{inv.due.toLocaleString()}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    {getStatusBadge(inv.status)}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      {inv.due > 0 && (
                        <button
                          onClick={() => handlePayment(inv)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50]"
                          title="Record Payment"
                        >
                          <CreditCard className="w-3 h-3" />
                          Pay
                        </button>
                      )}
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Print">
                        <Printer className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && selectedInvoice && (
          <PaymentModal
            invoice={selectedInvoice}
            onClose={() => {
              setShowPaymentModal(false);
              setSelectedInvoice(null);
            }}
            onPayment={(invoiceId, amount, method) => {
              setInvoices(invoices.map(inv => 
                inv.id === invoiceId 
                  ? { 
                      ...inv, 
                      paid: inv.paid + amount, 
                      due: inv.due - amount,
                      status: inv.paid + amount >= inv.total ? 'paid' : 'partial',
                      paymentDate: new Date().toISOString().split('T')[0],
                      paymentMethod: method
                    } 
                  : inv
              ));
              setShowPaymentModal(false);
              setSelectedInvoice(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* No Results */}
      {filteredInvoices.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Receipt className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No invoices found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilters({ status: 'all', dateRange: 'all', paymentMethod: 'all' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-[#5DBB63] font-medium hover:underline"
          >
            <RefreshCw className="w-4 h-4" />
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

// Payment Modal Component
const PaymentModal = ({ invoice, onClose, onPayment }) => {
  const [paymentAmount, setPaymentAmount] = useState(invoice.due);
  const [paymentMethod, setPaymentMethod] = useState('Cash');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onPayment(invoice.id, paymentAmount, paymentMethod);
  };

  const paymentMethods = [
    { value: 'Cash', icon: Banknote },
    { value: 'Card', icon: CreditCardIcon },
    { value: 'Mobile Banking', icon: Smartphone },
    { value: 'Bank Transfer', icon: Building }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl w-full max-w-md"
      >
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Record Payment</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Invoice Summary */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              <User className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-medium text-gray-900">{invoice.patient.name}</p>
              <p className="text-sm text-gray-500">{invoice.invoiceNumber}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div className="text-center p-2 bg-white rounded-lg">
              <p className="text-gray-500">Total</p>
              <p className="font-bold text-gray-900">৳{invoice.total}</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg">
              <p className="text-gray-500">Paid</p>
              <p className="font-bold text-green-600">৳{invoice.paid}</p>
            </div>
            <div className="text-center p-2 bg-white rounded-lg">
              <p className="text-gray-500">Due</p>
              <p className="font-bold text-yellow-600">৳{invoice.due}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">৳</span>
              <input
                type="number"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(Math.min(parseFloat(e.target.value) || 0, invoice.due))}
                max={invoice.due}
                min={0}
                step="0.01"
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              />
            </div>
            <div className="flex gap-2 mt-2">
              <button
                type="button"
                onClick={() => setPaymentAmount(invoice.due)}
                className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                Full Due
              </button>
              <button
                type="button"
                onClick={() => setPaymentAmount(invoice.due / 2)}
                className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                Half
              </button>
              <button
                type="button"
                onClick={() => setPaymentAmount(1000)}
                className="text-xs px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
              >
                1000
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <div className="grid grid-cols-2 gap-2">
              {paymentMethods.map(method => (
                <button
                  key={method.value}
                  type="button"
                  onClick={() => setPaymentMethod(method.value)}
                  className={`flex items-center gap-2 p-3 border rounded-lg transition-colors ${
                    paymentMethod === method.value
                      ? 'border-[#5DBB63] bg-green-50 text-[#5DBB63]'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <method.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{method.value}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              placeholder="Add any notes..."
            />
          </div>

          {/* New Balance */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">After Payment:</span>
              <span className="font-bold text-gray-900">৳{(invoice.due - paymentAmount).toLocaleString()}</span>
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
            >
              <CreditCard className="w-4 h-4 inline mr-2" />
              Record Payment
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PatientBilling;

