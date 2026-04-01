import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Plus,
  Activity,
  FileText,
  User,
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Edit3,
  Trash2,
  Eye,
  X,
  Save,
  Microscope,
  TestTube,
  Heart,
  Brain,
  Bone,
  FileCheck
} from 'lucide-react';

const diagnostics = [
  { id: 'DIA001', patientName: 'John Smith', testType: 'Blood Test', doctor: 'Dr. Sarah Johnson', date: '2024-01-20', time: '10:30 AM', status: 'completed', result: 'Normal', amount: 45.00 },
  { id: 'DIA002', patientName: 'Sarah Davis', testType: 'ECG', doctor: 'Dr. Michael Chen', date: '2024-01-20', time: '11:00 AM', status: 'pending', result: '-', amount: 75.00 },
  { id: 'DIA003', patientName: 'Robert Wilson', testType: 'MRI Scan', doctor: 'Dr. Lisa Anderson', date: '2024-01-20', time: '02:00 PM', status: 'in-progress', result: '-', amount: 250.00 },
  { id: 'DIA004', patientName: 'Emily Brown', testType: 'X-Ray', doctor: 'Dr. James Brown', date: '2024-01-19', time: '09:00 AM', status: 'completed', result: 'Normal', amount: 50.00 },
  { id: 'DIA005', patientName: 'Michael Johnson', testType: 'CT Scan', doctor: 'Dr. Sarah Johnson', date: '2024-01-19', time: '03:00 PM', status: 'completed', result: 'Abnormal', amount: 180.00 },
];

const testTypes = ['All', 'Blood Test', 'ECG', 'MRI Scan', 'X-Ray', 'CT Scan', 'Ultrasound'];
const statusColors = { completed: 'bg-green-100 text-green-700', pending: 'bg-yellow-100 text-yellow-700', 'in-progress': 'bg-blue-100 text-blue-700', cancelled: 'bg-red-100 text-red-700' };

export default function Diagnostic() {
  const [searchTerm, setSearchTerm] = useState('');
  const [testFilter, setTestFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = diagnostics.filter(d => {
    const matchesSearch = d.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || d.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTest = testFilter === 'All' || d.testType === testFilter;
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchesSearch && matchesTest && matchesStatus;
  });

  const totalTests = filtered.length;
  const completedTests = filtered.filter(d => d.status === 'completed').length;
  const pendingTests = filtered.filter(d => d.status === 'pending' || d.status === 'in-progress').length;
  const totalRevenue = filtered.reduce((sum, d) => sum + d.amount, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Diagnostic Transactions</h1>
          <p className="text-gray-500 mt-1">Manage diagnostic tests and results</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"><Download className="w-4 h-4" />Export</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"><Plus className="w-4 h-4" />New Diagnostic</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Total Diagnostics</p><p className="text-2xl font-bold text-gray-900">{totalTests}</p></div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><Activity className="w-6 h-6 text-blue-600" /></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Completed</p><p className="text-2xl font-bold text-green-600">{completedTests}</p></div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><FileCheck className="w-6 h-6 text-green-600" /></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Pending</p><p className="text-2xl font-bold text-orange-600">{pendingTests}</p></div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center"><Clock className="w-6 h-6 text-orange-600" /></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Total Revenue</p><p className="text-2xl font-bold text-purple-600">${totalRevenue.toLocaleString()}</p></div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"><DollarSign className="w-6 h-6 text-purple-600" /></div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search diagnostics..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" />
          </div>
          <select value={testFilter} onChange={(e) => setTestFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]">
            {testTypes.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]">
            <option value="all">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Test Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Doctor</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date & Time</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Result</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((dia, index) => (
                <motion.tr key={dia.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="hover:bg-gray-50">
                  <td className="px-4 py-3"><span className="font-mono text-sm text-gray-900">{dia.id}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white text-sm font-medium">{dia.patientName.charAt(0)}</div>
                      <span className="font-medium text-gray-900">{dia.patientName}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{dia.testType}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{dia.doctor}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{dia.date} {dia.time}</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900">${dia.amount.toFixed(2)}</td>
                  <td className="px-4 py-3"><span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[dia.status]}`}>{dia.status.replace('-', ' ')}</span></td>
                  <td className="px-4 py-3 text-sm">{dia.result === 'Normal' ? <span className="text-green-600 flex items-center gap-1"><CheckCircle className="w-3 h-3" />{dia.result}</span> : dia.result === 'Abnormal' ? <span className="text-red-600 flex items-center gap-1"><AlertTriangle className="w-3 h-3" />{dia.result}</span> : <span className="text-gray-400">-</span>}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg"><Edit3 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
