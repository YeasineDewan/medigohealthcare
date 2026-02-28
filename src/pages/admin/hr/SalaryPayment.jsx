import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  DollarSign, 
  Calendar, 
  Users, 
  CreditCard,
  Banknote,
  CheckCircle,
  Clock,
  FileText,
  FileSpreadsheet,
  Printer,
  Send,
  Eye,
  Edit3,
  Trash2,
  MoreHorizontal,
  X,
  Save
} from 'lucide-react';
import { exportToPDF, exportToWord, printDocument } from '../../utils/exportUtils';

const salaryPayments = [
  { id: 1, employeeId: 'EMP001', name: 'Dr. Sarah Johnson', department: 'Cardiology', basicSalary: 15000, allowances: 3000, deductions: 2500, netSalary: 15500, paymentDate: '2024-01-15', paymentMethod: 'Bank Transfer', status: 'completed', transactionId: 'TXN001' },
  { id: 2, employeeId: 'EMP002', name: 'Dr. Michael Chen', department: 'Neurology', basicSalary: 18000, allowances: 4000, deductions: 3200, netSalary: 18800, paymentDate: '2024-01-15', paymentMethod: 'Bank Transfer', status: 'completed', transactionId: 'TXN002' },
  { id: 3, employeeId: 'EMP003', name: 'Emily Williams', department: 'Emergency', basicSalary: 8000, allowances: 1500, deductions: 1200, netSalary: 8300, paymentDate: '2024-01-20', paymentMethod: 'Cash', status: 'completed', transactionId: 'TXN003' },
  { id: 4, employeeId: 'EMP004', name: 'James Brown', department: 'Laboratory', basicSalary: 6500, allowances: 1200, deductions: 900, netSalary: 6800, paymentDate: '-', paymentMethod: '-', status: 'pending', transactionId: '-' },
  { id: 5, employeeId: 'EMP005', name: 'Dr. Lisa Anderson', department: 'Pediatrics', basicSalary: 16000, allowances: 3500, deductions: 2800, netSalary: 16700, paymentDate: '2024-01-15', paymentMethod: 'Cheque', status: 'completed', transactionId: 'TXN004' },
  { id: 6, employeeId: 'EMP006', name: 'Robert Martinez', department: 'Pharmacy', basicSalary: 7000, allowances: 1400, deductions: 1000, netSalary: 7400, paymentDate: '-', paymentMethod: '-', status: 'pending', transactionId: '-' },
];

const departments = ['All', 'Cardiology', 'Neurology', 'Emergency', 'Laboratory', 'Pediatrics', 'Pharmacy'];
const paymentMethods = ['All', 'Bank Transfer', 'Cash', 'Cheque', 'Mobile Banking'];

export default function SalaryPayment() {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [methodFilter, setMethodFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');
  const [month, setMonth] = useState('2024-01');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredPayments = salaryPayments.filter(payment => {
    const matchesSearch = payment.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'All' || payment.department === deptFilter;
    const matchesMethod = methodFilter === 'All' || payment.paymentMethod === methodFilter;
    const matchesStatus = statusFilter === 'all' || payment.status === statusFilter;
    return matchesSearch && matchesDept && matchesMethod && matchesStatus;
  });

  const totalPayable = filteredPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.netSalary, 0);
  const totalPaid = filteredPayments.filter(p => p.status === 'completed').reduce((sum, p) => sum + p.netSalary, 0);
  const pendingCount = filteredPayments.filter(p => p.status === 'pending').length;
  const completedCount = filteredPayments.filter(p => p.status === 'completed').length;

  const handleViewDetails = (payment) => {
    setSelectedPayment(payment);
    setShowViewModal(true);
  };

  const handleEdit = (payment) => {
    setEditingPayment({ ...payment });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    alert(`Payment updated for ${editingPayment.name}`);
    setShowEditModal(false);
    setEditingPayment(null);
  };

  const handleProcessPayment = (payment) => {
    setSelectedPayment(payment);
    setShowPaymentModal(true);
  };

  const handleExportPDF = () => {
    const columns = [
      { key: 'name', label: 'Employee' },
      { key: 'employeeId', label: 'ID' },
      { key: 'department', label: 'Department' },
      { key: 'basicSalary', label: 'Basic Salary' },
      { key: 'allowances', label: 'Allowances' },
      { key: 'deductions', label: 'Deductions' },
      { key: 'netSalary', label: 'Net Salary' },
      { key: 'paymentMethod', label: 'Method' },
      { key: 'status', label: 'Status' }
    ];
    exportToPDF(filteredPayments, 'Salary Payment Report', columns);
  };

  const handleExportWord = () => {
    const columns = [
      { key: 'name', label: 'Employee' },
      { key: 'employeeId', label: 'ID' },
      { key: 'department', label: 'Department' },
      { key: 'basicSalary', label: 'Basic Salary' },
      { key: 'allowances', label: 'Allowances' },
      { key: 'deductions', label: 'Deductions' },
      { key: 'netSalary', label: 'Net Salary' },
      { key: 'paymentMethod', label: 'Method' },
      { key: 'status', label: 'Status' }
    ];
    exportToWord(filteredPayments, 'Salary Payment Report', columns);
  };

  const getStatusColor = (status) => status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Salary Payment</h1>
          <p className="text-gray-500 mt-1">Process and manage employee salary payments</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="month" value={month} onChange={(e) => setMonth(e.target.value)} className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" />
          </div>
          <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FileText className="w-4 h-4" />PDF
          </button>
          <button onClick={handleExportWord} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FileSpreadsheet className="w-4 h-4" />Word
          </button>
          <button onClick={printDocument} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Printer className="w-4 h-4" />Print
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Payable</p>
              <p className="text-2xl font-bold text-orange-600">${totalPayable.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Paid</p>
              <p className="text-2xl font-bold text-green-600">${totalPaid.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedCount}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search employees..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" />
          </div>
          <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]">
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]">
            {paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]">
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Salary Payment Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Department</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Basic Salary</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Allowances</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Deductions</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Net Salary</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Payment Method</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPayments.map((payment, index) => (
                <motion.tr key={payment.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white font-semibold">
                        {payment.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{payment.name}</p>
                        <p className="text-sm text-gray-500">{payment.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-sm text-gray-600">{payment.department}</span></td>
                  <td className="px-4 py-3 text-right"><span className="font-medium text-gray-900">${payment.basicSalary.toLocaleString()}</span></td>
                  <td className="px-4 py-3 text-right"><span className="text-green-600">+${payment.allowances.toLocaleString()}</span></td>
                  <td className="px-4 py-3 text-right"><span className="text-red-600">-${payment.deductions.toLocaleString()}</span></td>
                  <td className="px-4 py-3 text-right"><span className="font-bold text-gray-900">${payment.netSalary.toLocaleString()}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {payment.paymentMethod === 'Bank Transfer' && <CreditCard className="w-4 h-4 text-blue-500" />}
                      {payment.paymentMethod === 'Cash' && <Banknote className="w-4 h-4 text-green-500" />}
                      {payment.paymentMethod === 'Cheque' && <FileText className="w-4 h-4 text-purple-500" />}
                      <span className="text-sm text-gray-600">{payment.paymentMethod}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                      {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      {payment.status === 'pending' && (
                        <button onClick={() => handleProcessPayment(payment)} className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700">
                          <Send className="w-3 h-3" />Pay
                        </button>
                      )}
                      <button onClick={() => handleViewDetails(payment)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleEdit(payment)} className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg" title="Edit">
                        <Edit3 className="w-4 h-4" />
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
        {showPaymentModal && selectedPayment && (
          <PaymentModal payment={selectedPayment} onClose={() => setShowPaymentModal(false)} />
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedPayment && (
          <ViewPaymentModal payment={selectedPayment} onClose={() => setShowViewModal(false)} />
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && editingPayment && (
          <EditPaymentModal payment={editingPayment} onClose={() => setShowEditModal(false)} onSave={handleSaveEdit} />
        )}
      </AnimatePresence>
    </div>
  );
}

function PaymentModal({ payment, onClose }) {
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');
  const [transactionId, setTransactionId] = useState('');

  const handleProcess = () => {
    alert(`Processing payment of $${payment.netSalary} to ${payment.name} via ${paymentMethod}`);
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl w-full max-w-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Process Salary Payment</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white font-bold">
              {payment.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-900">{payment.name}</p>
              <p className="text-sm text-gray-500">{payment.employeeId} - {payment.department}</p>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm"><span className="text-gray-600">Basic Salary</span><span className="font-medium">${payment.basicSalary.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-600">Allowances</span><span className="text-green-600">+${payment.allowances.toLocaleString()}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-600">Deductions</span><span className="text-red-600">-${payment.deductions.toLocaleString()}</span></div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t">
              <span>Net Salary</span>
              <span className="text-green-600">${payment.netSalary.toLocaleString()}</span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              {['Bank Transfer', 'Cash', 'Cheque'].map(method => (
                <button key={method} onClick={() => setPaymentMethod(method)} className={`p-3 rounded-lg border-2 transition-all ${paymentMethod === method ? 'border-[#5DBB63] bg-green-50 text-[#5DBB63]' : 'border-gray-200 hover:border-gray-300'}`}>
                  <div className="flex flex-col items-center gap-1">
                    {method === 'Bank Transfer' && <CreditCard className="w-5 h-5" />}
                    {method === 'Cash' && <Banknote className="w-5 h-5" />}
                    {method === 'Cheque' && <FileText className="w-5 h-5" />}
                    <span className="text-xs">{method}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
          <button onClick={handleProcess} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg">
            <Send className="w-4 h-4" />Process Payment
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ViewPaymentModal({ payment, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl w-full max-w-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Payment Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white text-xl font-bold">
              {payment.name.charAt(0)}
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{payment.name}</p>
              <p className="text-gray-500">{payment.employeeId}</p>
              <p className="text-sm text-gray-500">{payment.department}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><p className="text-sm text-gray-500">Basic Salary</p><p className="font-medium">${payment.basicSalary.toLocaleString()}</p></div>
            <div><p className="text-sm text-gray-500">Allowances</p><p className="font-medium text-green-600">+${payment.allowances.toLocaleString()}</p></div>
            <div><p className="text-sm text-gray-500">Deductions</p><p className="font-medium text-red-600">-${payment.deductions.toLocaleString()}</p></div>
            <div><p className="text-sm text-gray-500">Net Salary</p><p className="font-bold text-lg">${payment.netSalary.toLocaleString()}</p></div>
            <div><p className="text-sm text-gray-500">Payment Method</p><p className="font-medium">{payment.paymentMethod}</p></div>
            <div><p className="text-sm text-gray-500">Payment Date</p><p className="font-medium">{payment.paymentDate}</p></div>
            <div><p className="text-sm text-gray-500">Transaction ID</p><p className="font-medium text-blue-600">{payment.transactionId}</p></div>
            <div><p className="text-sm text-gray-500">Status</p><span className={`px-2 py-1 rounded-full text-xs font-medium ${payment.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{payment.status}</span></div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Close</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function EditPaymentModal({ payment, onClose, onSave }) {
  const [formData, setFormData] = useState(payment);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl w-full max-w-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Edit Payment</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white font-bold">
              {payment.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-900">{payment.name}</p>
              <p className="text-sm text-gray-500">{payment.employeeId}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Basic Salary</label>
              <input type="number" value={formData.basicSalary} onChange={(e) => setFormData({...formData, basicSalary: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Allowances</label>
              <input type="number" value={formData.allowances} onChange={(e) => setFormData({...formData, allowances: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Deductions</label>
              <input type="number" value={formData.deductions} onChange={(e) => setFormData({...formData, deductions: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
              <select value={formData.paymentMethod} onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]">
                <option>Bank Transfer</option>
                <option>Cash</option>
                <option>Cheque</option>
              </select>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
          <button onClick={onSave} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg">
            <Save className="w-4 h-4" />Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
