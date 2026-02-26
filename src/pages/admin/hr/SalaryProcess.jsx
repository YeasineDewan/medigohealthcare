import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  DollarSign,
  Calendar,
  Users,
  TrendingUp,
  TrendingDown,
  Plus,
  Minus,
  FileText,
  CheckCircle,
  Clock,
  CreditCard,
  Banknote,
  Calculator,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  Send
} from 'lucide-react';

// Mock salary data
const salaryData = [
  { id: 1, employeeId: 'EMP001', name: 'Dr. Sarah Johnson', department: 'Cardiology', basicSalary: 15000, allowances: 3000, deductions: 2500, netSalary: 15500, status: 'paid', paymentDate: '2024-01-15' },
  { id: 2, employeeId: 'EMP002', name: 'Dr. Michael Chen', department: 'Neurology', basicSalary: 18000, allowances: 4000, deductions: 3200, netSalary: 18800, status: 'paid', paymentDate: '2024-01-15' },
  { id: 3, employeeId: 'EMP003', name: 'Emily Williams', department: 'Emergency', basicSalary: 8000, allowances: 1500, deductions: 1200, netSalary: 8300, status: 'pending', paymentDate: '-' },
  { id: 4, employeeId: 'EMP004', name: 'James Brown', department: 'Laboratory', basicSalary: 6500, allowances: 1200, deductions: 900, netSalary: 6800, status: 'pending', paymentDate: '-' },
  { id: 5, employeeId: 'EMP005', name: 'Dr. Lisa Anderson', department: 'Pediatrics', basicSalary: 16000, allowances: 3500, deductions: 2800, netSalary: 16700, status: 'paid', paymentDate: '2024-01-15' },
  { id: 6, employeeId: 'EMP006', name: 'Robert Martinez', department: 'Pharmacy', basicSalary: 7000, allowances: 1400, deductions: 1000, netSalary: 7400, status: 'pending', paymentDate: '-' },
];

const departments = ['All', 'Cardiology', 'Neurology', 'Emergency', 'Laboratory', 'Pediatrics', 'Pharmacy'];

export default function SalaryProcess() {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');
  const [month, setMonth] = useState('2024-01');

  const filteredSalaries = salaryData.filter(salary => {
    const matchesSearch = salary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      salary.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'All' || salary.department === deptFilter;
    const matchesStatus = statusFilter === 'all' || salary.status === statusFilter;
    return matchesSearch && matchesDept && matchesStatus;
  });

  // Calculate totals
  const totalBasic = filteredSalaries.reduce((sum, s) => sum + s.basicSalary, 0);
  const totalAllowances = filteredSalaries.reduce((sum, s) => sum + s.allowances, 0);
  const totalDeductions = filteredSalaries.reduce((sum, s) => sum + s.deductions, 0);
  const totalNet = filteredSalaries.reduce((sum, s) => sum + s.netSalary, 0);
  const paidCount = filteredSalaries.filter(s => s.status === 'paid').length;
  const pendingCount = filteredSalaries.filter(s => s.status === 'pending').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Salary Process</h1>
          <p className="text-gray-500 mt-1">Process and manage employee salaries</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]">
            <Calculator className="w-4 h-4" />
            Calculate
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
              <p className="text-sm text-gray-500">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{filteredSalaries.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
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
              <p className="text-sm text-gray-500">Total Payroll</p>
              <p className="text-2xl font-bold text-green-600">${totalNet.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
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
              <p className="text-sm text-gray-500">Paid</p>
              <p className="text-2xl font-bold text-blue-600">{paidCount}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" />
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
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-orange-600">{pendingCount}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
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
              placeholder="Search employees..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            />
          </div>
          <select
            value={deptFilter}
            onChange={(e) => setDeptFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="paid">Paid</option>
            <option value="pending">Pending</option>
          </select>
        </div>
      </div>

      {/* Salary Table */}
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Payment Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSalaries.map((salary, index) => (
                <motion.tr
                  key={salary.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white font-semibold">
                        {salary.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{salary.name}</p>
                        <p className="text-sm text-gray-500">{salary.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{salary.department}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-medium text-gray-900">${salary.basicSalary.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-green-600">+${salary.allowances.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="text-red-600">-${salary.deductions.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-bold text-gray-900">${salary.netSalary.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      salary.status === 'paid'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-orange-100 text-orange-700'
                    }`}>
                      {salary.status.charAt(0).toUpperCase() + salary.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-500">{salary.paymentDate}</span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
            <tfoot className="bg-gray-50 border-t-2 border-gray-200">
              <tr>
                <td colSpan="2" className="px-4 py-4 font-bold text-gray-900">TOTAL</td>
                <td className="px-4 py-4 text-right font-bold text-gray-900">${totalBasic.toLocaleString()}</td>
                <td className="px-4 py-4 text-right font-bold text-green-600">+${totalAllowances.toLocaleString()}</td>
                <td className="px-4 py-4 text-right font-bold text-red-600">-${totalDeductions.toLocaleString()}</td>
                <td className="px-4 py-4 text-right font-bold text-gray-900">${totalNet.toLocaleString()}</td>
                <td colSpan="2"></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
}
