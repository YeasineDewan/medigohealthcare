import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  Send,
  Eye,
  X,
  Building,
  Mail,
  Phone,
  MapPin
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
  const [isCalculating, setIsCalculating] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showSalarySlip, setShowSalarySlip] = useState(false);

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

  const handleCalculate = () => {
    setIsCalculating(true);
    // Simulate calculation process
    setTimeout(() => {
      setIsCalculating(false);
      alert(`Salary calculated for ${filteredSalaries.length} employees for ${month}`);
    }, 1500);
  };

  const handleExport = () => {
    setIsExporting(true);
    const exportData = filteredSalaries.map(s => ({
      'Employee ID': s.employeeId,
      'Name': s.name,
      'Department': s.department,
      'Basic Salary': s.basicSalary,
      'Allowances': s.allowances,
      'Deductions': s.deductions,
      'Net Salary': s.netSalary,
      'Status': s.status,
      'Payment Date': s.paymentDate
    }));
    
    const headers = Object.keys(exportData[0]).join(',');
    const rows = exportData.map(row => Object.values(row).join(',')).join('\n');
    const csv = `${headers}\n${rows}`;
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Salary_Report_${month}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    setTimeout(() => setIsExporting(false), 1000);
  };

  const handleViewSalarySlip = (employee) => {
    setSelectedEmployee(employee);
    setShowSalarySlip(true);
  };

  const downloadSalarySlipPDF = (employee) => {
    const content = generateSalarySlipHTML(employee);
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write(content);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => {
      printWindow.print();
      printWindow.close();
    }, 250);
  };

  const downloadSalarySlipWord = (employee) => {
    const content = generateSalarySlipHTML(employee);
    const blob = new Blob([content], { type: 'application/msword' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Salary_Slip_${employee.employeeId}_${month}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  const generateSalarySlipHTML = (emp) => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>Salary Slip - ${emp.name}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 40px; }
          .header { text-align: center; border-bottom: 3px solid #5DBB63; padding-bottom: 20px; margin-bottom: 30px; }
          .company-name { font-size: 28px; font-weight: bold; color: #5DBB63; margin-bottom: 5px; }
          .slip-title { font-size: 20px; color: #333; margin-top: 10px; }
          .info-section { display: flex; justify-content: space-between; margin-bottom: 30px; }
          .info-box { width: 48%; }
          .info-row { margin-bottom: 8px; font-size: 14px; }
          .label { font-weight: bold; color: #555; }
          table { width: 100%; border-collapse: collapse; margin: 20px 0; }
          th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
          th { background-color: #5DBB63; color: white; font-weight: bold; }
          .earnings { color: #059669; }
          .deductions { color: #DC2626; }
          .total-row { font-weight: bold; font-size: 16px; background-color: #f9fafb; }
          .net-salary { background-color: #5DBB63; color: white; font-size: 18px; }
          .footer { margin-top: 50px; padding-top: 20px; border-top: 2px solid #ddd; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="company-name">MediGo Healthcare</div>
          <div class="slip-title">SALARY SLIP</div>
          <div style="margin-top: 10px; color: #666;">Month: ${new Date(month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</div>
        </div>
        
        <div class="info-section">
          <div class="info-box">
            <div class="info-row"><span class="label">Employee Name:</span> ${emp.name}</div>
            <div class="info-row"><span class="label">Employee ID:</span> ${emp.employeeId}</div>
            <div class="info-row"><span class="label">Department:</span> ${emp.department}</div>
          </div>
          <div class="info-box">
            <div class="info-row"><span class="label">Payment Date:</span> ${emp.paymentDate}</div>
            <div class="info-row"><span class="label">Status:</span> ${emp.status.toUpperCase()}</div>
            <div class="info-row"><span class="label">Generated:</span> ${new Date().toLocaleDateString()}</div>
          </div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Earnings</th>
              <th style="text-align: right;">Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Basic Salary</td>
              <td class="earnings" style="text-align: right;">${emp.basicSalary.toLocaleString()}</td>
            </tr>
            <tr>
              <td>Allowances (HRA, Medical, Transport)</td>
              <td class="earnings" style="text-align: right;">${emp.allowances.toLocaleString()}</td>
            </tr>
            <tr class="total-row">
              <td>Gross Salary</td>
              <td style="text-align: right;">$${(emp.basicSalary + emp.allowances).toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        <table>
          <thead>
            <tr>
              <th>Deductions</th>
              <th style="text-align: right;">Amount ($)</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Tax & Insurance</td>
              <td class="deductions" style="text-align: right;">${emp.deductions.toLocaleString()}</td>
            </tr>
            <tr class="total-row">
              <td>Total Deductions</td>
              <td style="text-align: right;">$${emp.deductions.toLocaleString()}</td>
            </tr>
          </tbody>
        </table>

        <table>
          <tbody>
            <tr class="net-salary">
              <td><strong>NET SALARY</strong></td>
              <td style="text-align: right;"><strong>$${emp.netSalary.toLocaleString()}</strong></td>
            </tr>
          </tbody>
        </table>

        <div class="footer">
          <p>This is a computer-generated salary slip and does not require a signature.</p>
          <p>MediGo Healthcare | HR Department | hr@medigohealthcare.com</p>
        </div>
      </body>
      </html>
    `;
  };

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
          <button 
            onClick={handleExport}
            disabled={isExporting || filteredSalaries.length === 0}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isExporting ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Download className="w-4 h-4" />
            )}
            {isExporting ? 'Exporting...' : 'Export'}
          </button>
          <button 
            onClick={handleCalculate}
            disabled={isCalculating || filteredSalaries.length === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {isCalculating ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Calculator className="w-4 h-4" />
            )}
            {isCalculating ? 'Calculating...' : 'Calculate'}
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
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Actions</th>
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
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewSalarySlip(salary)}
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Salary Slip"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => downloadSalarySlipPDF(salary)}
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Download PDF"
                      >
                        <FileText className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => downloadSalarySlipWord(salary)}
                        className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Download Word"
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
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

      {/* Salary Slip Modal */}
      <AnimatePresence>
        {showSalarySlip && selectedEmployee && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowSalarySlip(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Salary Slip</h2>
                  <p className="text-sm text-gray-500 mt-1">{new Date(month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => downloadSalarySlipPDF(selectedEmployee)}
                    className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    <FileText className="w-4 h-4" />
                    PDF
                  </button>
                  <button
                    onClick={() => downloadSalarySlipWord(selectedEmployee)}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Word
                  </button>
                  <button
                    onClick={() => setShowSalarySlip(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Salary Slip Content */}
              <div className="p-8">
                {/* Company Header */}
                <div className="text-center border-b-4 border-[#5DBB63] pb-6 mb-6">
                  <h1 className="text-3xl font-bold text-[#5DBB63] mb-2">MediGo Healthcare</h1>
                  <p className="text-gray-600">SALARY SLIP</p>
                  <p className="text-sm text-gray-500 mt-2">{new Date(month).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
                </div>

                {/* Employee Info */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-gray-700 min-w-[120px]">Employee Name:</span>
                      <span className="text-gray-900">{selectedEmployee.name}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-gray-700 min-w-[120px]">Employee ID:</span>
                      <span className="text-gray-900">{selectedEmployee.employeeId}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-gray-700 min-w-[120px]">Department:</span>
                      <span className="text-gray-900">{selectedEmployee.department}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-gray-700 min-w-[120px]">Payment Date:</span>
                      <span className="text-gray-900">{selectedEmployee.paymentDate}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-gray-700 min-w-[120px]">Status:</span>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        selectedEmployee.status === 'paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                      }`}>
                        {selectedEmployee.status.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="font-semibold text-gray-700 min-w-[120px]">Generated:</span>
                      <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>

                {/* Earnings */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 bg-[#5DBB63] text-white px-4 py-2 rounded-t-lg">Earnings</h3>
                  <div className="border border-gray-200 rounded-b-lg overflow-hidden">
                    <div className="flex justify-between p-4 border-b border-gray-200">
                      <span className="text-gray-700">Basic Salary</span>
                      <span className="font-semibold text-green-600">${selectedEmployee.basicSalary.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-4 border-b border-gray-200">
                      <span className="text-gray-700">Allowances (HRA, Medical, Transport)</span>
                      <span className="font-semibold text-green-600">${selectedEmployee.allowances.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-4 bg-gray-50">
                      <span className="font-bold text-gray-900">Gross Salary</span>
                      <span className="font-bold text-gray-900">${(selectedEmployee.basicSalary + selectedEmployee.allowances).toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Deductions */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3 bg-red-600 text-white px-4 py-2 rounded-t-lg">Deductions</h3>
                  <div className="border border-gray-200 rounded-b-lg overflow-hidden">
                    <div className="flex justify-between p-4 border-b border-gray-200">
                      <span className="text-gray-700">Tax & Insurance</span>
                      <span className="font-semibold text-red-600">${selectedEmployee.deductions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between p-4 bg-gray-50">
                      <span className="font-bold text-gray-900">Total Deductions</span>
                      <span className="font-bold text-gray-900">${selectedEmployee.deductions.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                {/* Net Salary */}
                <div className="bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg p-6">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">NET SALARY</span>
                    <span className="text-3xl font-bold">${selectedEmployee.netSalary.toLocaleString()}</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
                  <p>This is a computer-generated salary slip and does not require a signature.</p>
                  <p className="mt-2">MediGo Healthcare | HR Department | hr@medigohealthcare.com</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
