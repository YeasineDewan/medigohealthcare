import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, 
  Clock, 
  Users, 
  Search, 
  Filter, 
  Download, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  FileText,
  FileSpreadsheet,
  Printer,
  BarChart3,
  PieChart,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  Eye,
  Edit3,
  MoreHorizontal,
  X,
  Save
} from 'lucide-react';
import { exportToPDF, exportToWord, printDocument } from '../../../utils/exportUtils';

const generateReportData = () => {
  const employees = [
    { id: 1, name: 'Dr. Sarah Johnson', employeeId: 'EMP001', department: 'Cardiology', designation: 'Senior Cardiologist' },
    { id: 2, name: 'Dr. Michael Chen', employeeId: 'EMP002', department: 'Neurology', designation: 'Neurologist' },
    { id: 3, name: 'Emily Williams', employeeId: 'EMP003', department: 'Emergency', designation: 'Head Nurse' },
    { id: 4, name: 'James Brown', employeeId: 'EMP004', department: 'Laboratory', designation: 'Lab Technician' },
    { id: 5, name: 'Dr. Lisa Anderson', employeeId: 'EMP005', department: 'Pediatrics', designation: 'Pediatrician' },
    { id: 6, name: 'Robert Martinez', employeeId: 'EMP006', department: 'Pharmacy', designation: 'Chief Pharmacist' },
    { id: 7, name: 'Jennifer Davis', employeeId: 'EMP007', department: 'Radiology', designation: 'Radiologist' },
    { id: 8, name: 'David Wilson', employeeId: 'EMP008', department: 'ICU', designation: 'ICU Nurse' },
  ];

  return employees.map(emp => {
    const totalDays = 30;
    const present = Math.floor(Math.random() * 5) + 22;
    const absent = Math.floor(Math.random() * 5);
    const late = Math.floor(Math.random() * 5);
    const halfDay = Math.floor(Math.random() * 3);
    const holidays = 4;
    const workingDays = totalDays - holidays;
    
    return {
      ...emp,
      totalDays,
      workingDays,
      present,
      absent,
      late,
      halfDay,
      holidays,
      attendanceRate: ((present + halfDay * 0.5) / workingDays * 100).toFixed(1),
      lateArrivals: late,
      earlyLeaves: Math.floor(Math.random() * 3),
      overtime: (Math.random() * 10).toFixed(1),
      monthlyData: Array.from({ length: 12 }, (_, i) => ({
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'][i],
        attendance: (85 + Math.random() * 15).toFixed(1)
      }))
    };
  });
};

const departments = ['All', 'Cardiology', 'Neurology', 'Emergency', 'Laboratory', 'Pediatrics', 'Pharmacy', 'Radiology', 'ICU'];

const reportTypes = [
  { id: 'summary', label: 'Summary Report', icon: BarChart3 },
  { id: 'detailed', label: 'Detailed Report', icon: FileText },
  { id: 'trends', label: 'Trends Analysis', icon: TrendingUp },
  { id: 'department', label: 'Department Wise', icon: Users },
];

export default function AttendanceReport() {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [reportType, setReportType] = useState('summary');
  const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-01-31' });
  const [showFilters, setShowFilters] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingReport, setEditingReport] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const reportData = generateReportData();

  const filteredData = reportData.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'All' || emp.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const avgAttendance = filteredData.length > 0 
    ? (filteredData.reduce((sum, e) => sum + parseFloat(e.attendanceRate), 0) / filteredData.length).toFixed(1)
    : 0;
  const totalPresent = filteredData.reduce((sum, e) => sum + e.present, 0);
  const totalAbsent = filteredData.reduce((sum, e) => sum + e.absent, 0);
  const totalLate = filteredData.reduce((sum, e) => sum + e.late, 0);

  const handleViewDetails = (emp) => {
    setSelectedReport(emp);
    setShowViewModal(true);
  };

  const handleEdit = (emp) => {
    setEditingReport({ ...emp });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    alert(`Report updated for ${editingReport.name}`);
    setShowEditModal(false);
    setEditingReport(null);
  };

  const handleExportPDF = () => {
    const columns = [
      { key: 'name', label: 'Employee' },
      { key: 'employeeId', label: 'ID' },
      { key: 'department', label: 'Department' },
      { key: 'present', label: 'Present' },
      { key: 'absent', label: 'Absent' },
      { key: 'late', label: 'Late' },
      { key: 'attendanceRate', label: 'Attendance %' },
      { key: 'overtime', label: 'Overtime (hrs)' }
    ];
    exportToPDF(filteredData, 'Attendance Report', columns);
  };

  const handleExportWord = () => {
    const columns = [
      { key: 'name', label: 'Employee' },
      { key: 'employeeId', label: 'ID' },
      { key: 'department', label: 'Department' },
      { key: 'present', label: 'Present' },
      { key: 'absent', label: 'Absent' },
      { key: 'late', label: 'Late' },
      { key: 'attendanceRate', label: 'Attendance %' },
      { key: 'overtime', label: 'Overtime (hrs)' }
    ];
    exportToWord(filteredData, 'Attendance Report', columns);
  };

  const handlePrint = () => {
    printDocument();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Attendance Report</h1>
          <p className="text-gray-500 mt-1">Generate and analyze employee attendance reports</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FileText className="w-4 h-4" />PDF
          </button>
          <button onClick={handleExportWord} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FileSpreadsheet className="w-4 h-4" />Word
          </button>
          <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Printer className="w-4 h-4" />Print
          </button>
        </div>
      </div>

      {/* Report Type Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-wrap gap-2">
          {reportTypes.map(type => (
            <button
              key={type.id}
              onClick={() => setReportType(type.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                reportType === type.id 
                  ? 'bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <type.icon className="w-4 h-4" />
              {type.label}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Attendance</p>
              <p className="text-2xl font-bold text-gray-900">{avgAttendance}%</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm text-green-600">+2.5% from last month</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Present</p>
              <p className="text-2xl font-bold text-green-600">{totalPresent}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Absent</p>
              <p className="text-2xl font-bold text-red-600">{totalAbsent}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1">
            <TrendingDown className="w-4 h-4 text-red-500" />
            <span className="text-sm text-red-600">-1.2% from last month</span>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Late</p>
              <p className="text-2xl font-bold text-yellow-600">{totalLate}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-yellow-600" />
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
            {departments.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
          <div className="flex items-center gap-2">
            <input
              type="date"
              value={dateRange.start}
              onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            />
            <span className="text-gray-500">to</span>
            <input
              type="date"
              value={dateRange.end}
              onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            />
          </div>
        </div>
      </div>

      {/* Report Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Department</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Working Days</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Present</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Absent</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Late</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Attendance %</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Overtime (hrs)</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((emp, index) => (
                <motion.tr key={emp.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white font-semibold">
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{emp.name}</p>
                        <p className="text-sm text-gray-500">{emp.employeeId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="text-sm text-gray-600">{emp.department}</span></td>
                  <td className="px-4 py-3 text-center"><span className="text-sm text-gray-900">{emp.workingDays}</span></td>
                  <td className="px-4 py-3 text-center"><span className="font-medium text-green-600">{emp.present}</span></td>
                  <td className="px-4 py-3 text-center"><span className="font-medium text-red-600">{emp.absent}</span></td>
                  <td className="px-4 py-3 text-center"><span className="font-medium text-yellow-600">{emp.late}</span></td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] rounded-full" style={{ width: `${emp.attendanceRate}%` }} />
                      </div>
                      <span className={`text-sm font-medium ${parseFloat(emp.attendanceRate) >= 90 ? 'text-green-600' : parseFloat(emp.attendanceRate) >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {emp.attendanceRate}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center"><span className="text-sm text-blue-600 font-medium">{emp.overtime}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleViewDetails(emp)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleEdit(emp)} className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg" title="Edit">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg" title="More">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Trends Section */}
      {reportType === 'trends' && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Attendance Trends</h3>
          <div className="h-64 flex items-end justify-around gap-2">
            {filteredData[0]?.monthlyData.map((month, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${month.attendance}%` }}
                  transition={{ delay: idx * 0.05, duration: 0.5 }}
                  className="w-12 bg-gradient-to-t from-[#5DBB63] to-[#4CAF50] rounded-t-lg"
                />
                <span className="text-xs text-gray-500 mt-2">{month.month}</span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedReport && (
          <ViewReportModal report={selectedReport} onClose={() => setShowViewModal(false)} />
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && editingReport && (
          <EditReportModal report={editingReport} onClose={() => setShowEditModal(false)} onSave={handleSaveEdit} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ViewReportModal({ report, onClose }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl w-full max-w-lg">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Attendance Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white text-xl font-bold">
              {report.name.charAt(0)}
            </div>
            <div>
              <p className="text-lg font-bold text-gray-900">{report.name}</p>
              <p className="text-gray-500">{report.employeeId} - {report.department}</p>
              <p className="text-sm text-gray-500">{report.designation}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{report.present}</p>
              <p className="text-sm text-gray-600">Present Days</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{report.absent}</p>
              <p className="text-sm text-gray-600">Absent Days</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{report.late}</p>
              <p className="text-sm text-gray-600">Late Days</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{report.attendanceRate}%</p>
              <p className="text-sm text-gray-600">Attendance</p>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">Close</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function EditReportModal({ report, onClose, onSave }) {
  const [formData, setFormData] = useState(report);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl w-full max-w-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Edit Attendance Report</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white font-bold">
              {report.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-900">{report.name}</p>
              <p className="text-sm text-gray-500">{report.employeeId}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Present Days</label>
              <input type="number" value={formData.present} onChange={(e) => setFormData({...formData, present: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Absent Days</label>
              <input type="number" value={formData.absent} onChange={(e) => setFormData({...formData, absent: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Late Days</label>
              <input type="number" value={formData.late} onChange={(e) => setFormData({...formData, late: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Half Days</label>
              <input type="number" value={formData.halfDay} onChange={(e) => setFormData({...formData, halfDay: parseInt(e.target.value)})} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" />
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
