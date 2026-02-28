import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Download, 
  DollarSign, 
  Calendar, 
  Users, 
  FileText,
  FileSpreadsheet,
  Printer,
  Plus,
  Edit3,
  Trash2,
  Eye,
  MoreHorizontal,
  X,
  Save,
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  CreditCard,
  Building,
  Banknote
} from 'lucide-react';
import { exportToPDF, exportToWord, printDocument } from '../../utils/exportUtils';

const hrLedgerData = [
  { id: 1, transactionDate: '2024-01-15', employeeId: 'EMP001', employeeName: 'Dr. Sarah Johnson', department: 'Cardiology', transactionType: 'Salary Payment', amount: 15500, paymentMethod: 'Bank Transfer', status: 'completed', reference: 'SAL/2024/001' },
  { id: 2, transactionDate: '2024-01-15', employeeId: 'EMP002', employeeName: 'Dr. Michael Chen', department: 'Neurology', transactionType: 'Salary Payment', amount: 18800, paymentMethod: 'Bank Transfer', status: 'completed', reference: 'SAL/2024/002' },
  { id: 3, transactionDate: '2024-01-15', employeeId: 'EMP003', employeeName: 'Emily Williams', department: 'Emergency', transactionType: 'Salary Payment', amount: 8300, paymentMethod: 'Cash', status: 'completed', reference: 'SAL/2024/003' },
  { id: 4, transactionDate: '2024-01-10', employeeId: 'EMP004', employeeName: 'James Brown', department: 'Laboratory', transactionType: 'Advance Payment', amount: 2000, paymentMethod: 'Bank Transfer', status: 'completed', reference: 'ADV/2024/001' },
  { id: 5, transactionDate: '2024-01-08', employeeId: 'EMP001', employeeName: 'Dr. Sarah Johnson', department: 'Cardiology', transactionType: 'Bonus', amount: 1500, paymentMethod: 'Bank Transfer', status: 'completed', reference: 'BON/2024/001' },
  { id: 6, transactionDate: '2024-01-20', employeeId: 'EMP005', employeeName: 'Dr. Lisa Anderson', department: 'Pediatrics', transactionType: 'Salary Payment', amount: 16700, paymentMethod: 'Cheque', status: 'completed', reference: 'SAL/2024/004' },
  { id: 7, transactionDate: '2024-01-18', employeeId: 'EMP006', employeeName: 'Robert Martinez', department: 'Pharmacy', transactionType: 'Reimbursement', amount: 500, paymentMethod: 'Cash', status: 'completed', reference: 'REF/2024/001' },
  { id: 8, transactionDate: '2024-01-25', employeeId: 'EMP003', employeeName: 'Emily Williams', department: 'Emergency', transactionType: 'Overtime Payment', amount: 350, paymentMethod: 'Bank Transfer', status: 'pending', reference: 'OT/2024/001' },
];

const departments = ['All', 'Cardiology', 'Neurology', 'Emergency', 'Laboratory', 'Pediatrics', 'Pharmacy'];
const transactionTypes = ['All', 'Salary Payment', 'Advance Payment', 'Bonus', 'Reimbursement', 'Overtime Payment'];
const paymentMethods = ['All', 'Bank Transfer', 'Cash', 'Cheque', 'Mobile Banking'];

export default function HRLedger() {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [typeFilter, setTypeFilter] = useState('All');
  const [methodFilter, setMethodFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingEntry, setEditingEntry] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const filteredData = hrLedgerData.filter(entry => {
    const matchesSearch = entry.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.employeeId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.reference.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'All' || entry.department === deptFilter;
    const matchesType = typeFilter === 'All' || entry.transactionType === typeFilter;
    const matchesMethod = methodFilter === 'All' || entry.paymentMethod === methodFilter;
    const matchesStatus = statusFilter === 'all' || entry.status === statusFilter;
    return matchesSearch && matchesDept && matchesType && matchesMethod && matchesStatus;
  });

  const totalCredits = filteredData.reduce((sum, e) => sum + e.amount, 0);
  const totalDebits = 0;
  const netAmount = totalCredits - totalDebits;
  const totalTransactions = filteredData.length;

  const handleViewDetails = (entry) => {
    setSelectedEntry(entry);
    setShowViewModal(true);
  };

  const handleEdit = (entry) => {
    setEditingEntry({ ...entry });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    alert(`Ledger entry ${editingEntry.reference} updated successfully`);
    setShowEditModal(false);
    setEditingEntry(null);
  };

  const handleDelete = (entry) => {
    if (confirm(`Are you sure you want to delete entry ${entry.reference}?`)) {
      alert(`Entry ${entry.reference} deleted`);
    }
  };

  const handleExportPDF = () => {
    const columns = [
      { key: 'transactionDate', label: 'Date' },
      { key: 'reference', label: 'Reference' },
      { key: 'employeeName', label: 'Employee' },
      { key: 'department', label: 'Department' },
      { key: 'transactionType', label: 'Type' },
      { key: 'amount', label: 'Amount' },
      { key: 'paymentMethod', label: 'Method' },
      { key: 'status', label: 'Status' }
    ];
    exportToPDF(filteredData, 'HR Ledger Report', columns);
  };

  const handleExportWord = () => {
    const columns = [
      { key: 'transactionDate', label: 'Date' },
      { key: 'reference', label: 'Reference' },
      { key: 'employeeName', label: 'Employee' },
      { key: 'department', label: 'Department' },
      { key: 'transactionType', label: 'Type' },
      { key: 'amount', label: 'Amount' },
      { key: 'paymentMethod', label: 'Method' },
      { key: 'status', label: 'Status' }
    ];
    exportToWord(filteredData, 'HR Ledger Report', columns);
  };

  const getStatusColor = (status) => status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700';
  const getTypeColor = (type) => {
    switch(type) {
      case 'Salary Payment': return 'bg-blue-100 text-blue-700';
      case 'Bonus': return 'bg-purple-100 text-purple-700';
      case 'Advance Payment': return 'bg-yellow-100 text-yellow-700';
      case 'Reimbursement': return 'bg-green-100 text-green-700';
      case 'Overtime Payment': return 'bg-indigo-100 text-indigo-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">HR Ledger</h1>
          <p className="text-gray-500 mt-1">Track and manage all HR financial transactions</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]">
            <Plus className="w-4 h-4" />Add Entry
          </button>
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
            <div><p className="text-sm text-gray-500">Total Credits</p><p className="text-2xl font-bold text-green-600">${totalCredits.toLocaleString()}</p></div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><ArrowUpRight className="w-6 h-6 text-green-600" /></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Total Debits</p><p className="text-2xl font-bold text-red-600">${totalDebits.toLocaleString()}</p></div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center"><ArrowDownRight className="w-6 h-6 text-red-600" /></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Net Amount</p><p className="text-2xl font-bold text-blue-600">${netAmount.toLocaleString()}</p></div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><Wallet className="w-6 h-6 text-blue-600" /></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Transactions</p><p className="text-2xl font-bold text-gray-900">{totalTransactions}</p></div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"><FileText className="w-6 h-6 text-purple-600" /></div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search by employee name, ID, or reference..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" />
          </div>
          <select value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]">{departments.map(d => <option key={d} value={d}>{d}</option>)}</select>
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]">{transactionTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>
          <select value={methodFilter} onChange={(e) => setMethodFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]">{paymentMethods.map(m => <option key={m} value={m}>{m}</option>)}</select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]">
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* HR Ledger Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Reference</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Department</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Transaction Type</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Payment Method</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((entry, index) => (
                <motion.tr key={entry.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="hover:bg-gray-50">
                  <td className="px-4 py-3"><div className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-400" /><span className="text-sm text-gray-600">{entry.transactionDate}</span></div></td>
                  <td className="px-4 py-3"><span className="text-sm font-medium text-blue-600">{entry.reference}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white font-semibold text-sm">{entry.employeeName.charAt(0)}</div>
                      <div><p className="font-medium text-gray-900">{entry.employeeName}</p><p className="text-xs text-gray-500">{entry.employeeId}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-sm text-gray-600">{entry.department}</span></td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(entry.transactionType)}`}>{entry.transactionType}</span></td>
                  <td className="px-4 py-3 text-right"><span className="font-bold text-gray-900">${entry.amount.toLocaleString()}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      {entry.paymentMethod === 'Bank Transfer' && <CreditCard className="w-4 h-4 text-blue-500" />}
                      {entry.paymentMethod === 'Cash' && <Banknote className="w-4 h-4 text-green-500" />}
                      {entry.paymentMethod === 'Cheque' && <Building className="w-4 h-4 text-purple-500" />}
                      <span className="text-sm text-gray-600">{entry.paymentMethod}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(entry.status)}`}>{entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleViewDetails(entry)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="View"><Eye className="w-4 h-4" /></button>
                      <button onClick={() => handleEdit(entry)} className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg" title="Edit"><Edit3 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(entry)} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Delete"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t-2 border-gray-200">
              <tr><td colSpan="5" className="px-4 py-4 font-bold text-gray-900">TOTAL</td><td className="px-4 py-4 text-right font-bold text-gray-900">${filteredData.reduce((sum, e) => sum + e.amount, 0).toLocaleString()}</td><td colSpan="3"></td></tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Add Modal */}
      <AnimatePresence>{showAddModal && <AddLedgerModal onClose={() => setShowAddModal(false)} />}</AnimatePresence>
      {/* View Modal */}
      <AnimatePresence>{showViewModal && selectedEntry && <ViewLedgerModal entry={selectedEntry} onClose={() => setShowViewModal(false)} />}</AnimatePresence>
      {/* Edit Modal */}
      <AnimatePresence>{showEditModal && editingEntry && <EditLedgerModal entry={editingEntry} onClose={() => setShowEditModal(false)} onSave={handleSaveEdit} />}</AnimatePresence>
    </div>
  );
}

function AddLedgerModal({ onClose }) {
  const [formData, setFormData] = useState({ employeeId: '', employeeName: '', department: '', transactionType: 'Salary Payment', amount: '', paymentMethod: 'Bank Transfer', reference: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('New ledger entry added successfully');
    onClose();
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl w-full max-w-lg">
        <div className="p-6 border-b border-gray-200"><div className="flex items-center justify-between"><h2 className="text-xl font-bold text-gray-900">Add HR Ledger Entry</h2><button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button></div></div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label><input type="text" value={formData.employeeId} onChange={(e) => setFormData({...formData, employeeId: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" required /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Employee Name</label><input type="text" value={formData.employeeName} onChange={(e) => setFormData({...formData, employeeName: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" required /></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Department</label><select value={formData.department} onChange={(e) => setFormData({...formData, department: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"><option value="">Select</option>{['Cardiology', 'Neurology', 'Emergency', 'Laboratory', 'Pediatrics', 'Pharmacy'].map(d => <option key={d} value={d}>{d}</option>)}</select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Transaction Type</label><select value={formData.transactionType} onChange={(e) => setFormData({...formData, transactionType: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]">{['Salary Payment', 'Advance Payment', 'Bonus', 'Reimbursement', 'Overtime Payment'].map(t => <option key={t} value={t}>{t}</option>)}</select></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Amount</label><input type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" required /></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label><select value={formData.paymentMethod} onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]">{['Bank Transfer', 'Cash', 'Cheque'].map(m => <option key={m} value={m}>{m}</option>)}</select></div>
            </div>
          </div>
          <div className="p-6 border-t border-gray-200 flex justify-end gap-3"><button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button><button type="submit" className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg"><Save className="w-4 h-4" />Save Entry</button></div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function ViewLedgerModal({ entry, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl w-full max-w-lg">
        <div className="p-6 border-b border-gray-200"><div className="flex items-center justify-between"><h2 className="text-xl font-bold text-gray-900">Transaction Details</h2><button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button></div></div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white text-xl font-bold">{entry.employeeName.charAt(0)}</div>
            <div><p className="text-lg font-bold text-gray-900">{entry.employeeName}</p><p className="text-gray-500">{entry.employeeId} - {entry.department}</p></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><p className="text-sm text-gray-500">Reference</p><p className="font-medium text-blue-600">{entry.reference}</p></div>
            <div><p className="text-sm text-gray-500">Date</p><p className="font-medium">{entry.transactionDate}</p></div>
            <div><p className="text-sm text-gray-500">Transaction Type</p><span className={`px-2 py-1 rounded-full text-xs font-medium ${entry.transactionType === 'Salary Payment' ? 'bg-blue-100 text-blue-700' : entry.transactionType === 'Bonus' ? 'bg-purple-100 text-purple-700' : 'bg-green-100 text-green-700'}`}>{entry.transactionType}</span></div>
            <div><p className="text-sm text-gray-500">Amount</p><p className="font-bold text-lg">${entry.amount.toLocaleString()}</p></div>
            <div><p className="text-sm text-gray-500">Payment Method</p><p className="font-medium">{entry.paymentMethod}</p></div>
            <div><p className="text-sm text-gray-500">Status</p><span className={`px-2 py-1 rounded-full text-xs font-medium ${entry.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{entry.status}</span></div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end"><button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Close</button></div>
      </motion.div>
    </motion.div>
  );
}

function EditLedgerModal({ entry, onClose, onSave }) {
  const [formData, setFormData] = useState(entry);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl w-full max-w-lg">
        <div className="p-6 border-b border-gray-200"><div className="flex items-center justify-between"><h2 className="text-xl font-bold text-gray-900">Edit Ledger Entry</h2><button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button></div></div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white font-bold">{entry.employeeName.charAt(0)}</div>
            <div><p className="font-medium text-gray-900">{entry.employeeName}</p><p className="text-sm text-gray-500">{entry.employeeId}</p></div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Amount</label><input type="number" value={formData.amount} onChange={(e) => setFormData({...formData, amount: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label><select value={formData.paymentMethod} onChange={(e) => setFormData({...formData, paymentMethod: e.target.value})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]">{['Bank Transfer', 'Cash', 'Cheque'].map(m => <option key={m} value={m}>{m}</option>)}</select></div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3"><button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button><button onClick={onSave} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg"><Save className="w-4 h-4" />Save Changes</button></div>
      </motion.div>
    </motion.div>
  );
}
