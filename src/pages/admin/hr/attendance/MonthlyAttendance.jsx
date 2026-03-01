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
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  FileText,
  FileSpreadsheet,
  Edit3,
  Eye,
  Printer,
  X,
  Save,
  Trash2,
  Plus
} from 'lucide-react';
import { exportToPDF, exportToWord, printDocument } from '../../../../utils/exportUtils';

// Mock monthly attendance data
const generateMonthlyData = (year, month) => {
  const employees = [
    { id: 1, name: 'Dr. Sarah Johnson', employeeId: 'EMP001', department: 'Cardiology', designation: 'Senior Cardiologist' },
    { id: 2, name: 'Dr. Michael Chen', employeeId: 'EMP002', department: 'Neurology', designation: 'Neurologist' },
    { id: 3, name: 'Emily Williams', employeeId: 'EMP003', department: 'Emergency', designation: 'Head Nurse' },
    { id: 4, name: 'James Brown', employeeId: 'EMP004', department: 'Laboratory', designation: 'Lab Technician' },
    { id: 5, name: 'Dr. Lisa Anderson', employeeId: 'EMP005', department: 'Pediatrics', designation: 'Pediatrician' },
    { id: 6, name: 'Robert Martinez', employeeId: 'EMP006', department: 'Pharmacy', designation: 'Chief Pharmacist' },
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  return employees.map(emp => {
    let present = 0, absent = 0, late = 0, halfDay = 0;
    const dailyData = [];
    
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dayOfWeek = date.getDay();
      
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        dailyData.push({ day, status: 'weekend', checkIn: '-', checkOut: '-' });
        continue;
      }
      
      const rand = Math.random();
      let status, checkIn, checkOut;
      
      if (rand < 0.7) {
        status = 'present';
        present++;
        checkIn = '09:00 AM';
        checkOut = '05:30 PM';
      } else if (rand < 0.85) {
        status = 'late';
        late++;
        checkIn = '09:30 AM';
        checkOut = '05:30 PM';
      } else if (rand < 0.95) {
        status = 'absent';
        absent++;
        checkIn = '-';
        checkOut = '-';
      } else {
        status = 'halfday';
        halfDay++;
        checkIn = '09:00 AM';
        checkOut = '01:00 PM';
      }
      
      dailyData.push({ day, status, checkIn, checkOut });
    }
    
    const totalWorkingDays = present + absent + late + halfDay;
    const attendancePercentage = totalWorkingDays > 0 ? ((present + halfDay * 0.5) / totalWorkingDays * 100).toFixed(1) : 0;
    
    return {
      ...emp,
      present,
      absent,
      late,
      halfDay,
      totalWorkingDays,
      attendancePercentage,
      dailyData
    };
  });
};

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const departments = ['All', 'Cardiology', 'Neurology', 'Emergency', 'Laboratory', 'Pediatrics', 'Pharmacy'];

export default function MonthlyAttendance() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const attendanceData = generateMonthlyData(selectedYear, selectedMonth);

  const filteredData = attendanceData.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'All' || emp.department === deptFilter;
    return matchesSearch && matchesDept;
  });

  const totalEmployees = filteredData.length;
  const avgAttendance = filteredData.length > 0 
    ? (filteredData.reduce((sum, e) => sum + parseFloat(e.attendancePercentage), 0) / filteredData.length).toFixed(1)
    : 0;
  const totalPresent = filteredData.reduce((sum, e) => sum + e.present, 0);
  const totalAbsent = filteredData.reduce((sum, e) => sum + e.absent, 0);

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  const handleViewDetails = (emp) => {
    setSelectedEmployee(emp);
    setShowDetailModal(true);
  };

  const handleEdit = (emp) => {
    setEditingEmployee({ ...emp });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    // In a real app, you'd make an API call here
    alert(`Attendance updated for ${editingEmployee.name}`);
    setShowEditModal(false);
    setEditingEmployee(null);
  };

  const handleExportPDF = () => {
    const columns = [
      { key: 'name', label: 'Employee' },
      { key: 'employeeId', label: 'ID' },
      { key: 'department', label: 'Department' },
      { key: 'present', label: 'Present' },
      { key: 'absent', label: 'Absent' },
      { key: 'late', label: 'Late' },
      { key: 'halfDay', label: 'Half Day' },
      { key: 'attendancePercentage', label: 'Attendance %' }
    ];
    exportToPDF(filteredData, `Monthly Attendance - ${months[selectedMonth]} ${selectedYear}`, columns);
  };

  const handleExportWord = () => {
    const columns = [
      { key: 'name', label: 'Employee' },
      { key: 'employeeId', label: 'ID' },
      { key: 'department', label: 'Department' },
      { key: 'present', label: 'Present' },
      { key: 'absent', label: 'Absent' },
      { key: 'late', label: 'Late' },
      { key: 'halfDay', label: 'Half Day' },
      { key: 'attendancePercentage', label: 'Attendance %' }
    ];
    exportToWord(filteredData, `Monthly Attendance - ${months[selectedMonth]} ${selectedYear}`, columns);
  };

  const handlePrint = () => {
    printDocument();
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'present': return 'bg-green-100 text-green-800';
      case 'absent': return 'bg-red-100 text-red-800';
      case 'late': return 'bg-yellow-100 text-yellow-800';
      case 'halfday': return 'bg-blue-100 text-blue-800';
      case 'weekend': return 'bg-gray-100 text-gray-400';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'present': return <CheckCircle className="w-3 h-3 text-green-500" />;
      case 'absent': return <XCircle className="w-3 h-3 text-red-500" />;
      case 'late': return <AlertCircle className="w-3 h-3 text-yellow-500" />;
      case 'halfday': return <Clock className="w-3 h-3 text-blue-500" />;
      default: return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Monthly Attendance</h1>
          <p className="text-gray-500 mt-1">Track and manage monthly employee attendance</p>
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

      {/* Month Selector */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <button onClick={handlePrevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-gray-500" />
            <span className="text-lg font-semibold text-gray-900">{months[selectedMonth]} {selectedYear}</span>
          </div>
          <button onClick={handleNextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{totalEmployees}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Attendance</p>
              <p className="text-2xl font-bold text-green-600">{avgAttendance}%</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Present</p>
              <p className="text-2xl font-bold text-blue-600">{totalPresent}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Absent</p>
              <p className="text-2xl font-bold text-red-600">{totalAbsent}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
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
        </div>
      </div>

      {/* Monthly Attendance Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Employee</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Department</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Present</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Absent</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Late</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Half Day</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Attendance %</th>
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
                  <td className="px-4 py-3 text-center"><span className="font-medium text-green-600">{emp.present}</span></td>
                  <td className="px-4 py-3 text-center"><span className="font-medium text-red-600">{emp.absent}</span></td>
                  <td className="px-4 py-3 text-center"><span className="font-medium text-yellow-600">{emp.late}</span></td>
                  <td className="px-4 py-3 text-center"><span className="font-medium text-blue-600">{emp.halfDay}</span></td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] rounded-full" style={{ width: `${emp.attendancePercentage}%` }} />
                      </div>
                      <span className={`text-sm font-medium ${parseFloat(emp.attendancePercentage) >= 90 ? 'text-green-600' : parseFloat(emp.attendancePercentage) >= 75 ? 'text-yellow-600' : 'text-red-600'}`}>
                        {emp.attendancePercentage}%
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleViewDetails(emp)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleEdit(emp)} className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg" title="Edit">
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

      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && selectedEmployee && (
          <EmployeeDetailModal 
            employee={selectedEmployee} 
            month={selectedMonth}
            year={selectedYear}
            onClose={() => setShowDetailModal(false)}
            getStatusColor={getStatusColor}
            getStatusIcon={getStatusIcon}
          />
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && editingEmployee && (
          <EditAttendanceModal
            employee={editingEmployee}
            onClose={() => setShowEditModal(false)}
            onSave={handleSaveEdit}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function EmployeeDetailModal({ employee, month, year, onClose, getStatusColor, getStatusIcon }) {
  const firstDay = new Date(year, month, 1).getDay();

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">{employee.name}</h2>
              <p className="text-gray-500">{employee.employeeId} - {employee.department}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{employee.present}</p>
              <p className="text-sm text-gray-600">Present</p>
            </div>
            <div className="bg-red-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-red-600">{employee.absent}</p>
              <p className="text-sm text-gray-600">Absent</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{employee.late}</p>
              <p className="text-sm text-gray-600">Late</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-blue-600">{employee.attendancePercentage}%</p>
              <p className="text-sm text-gray-600">Attendance</p>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">{day}</div>
            ))}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="aspect-square" />
            ))}
            {employee.dailyData.map((day, idx) => (
              <div key={idx} className={`aspect-square flex flex-col items-center justify-center text-xs rounded ${getStatusColor(day.status)}`}>
                <span className="font-medium">{day.day}</span>
                {getStatusIcon(day.status)}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function EditAttendanceModal({ employee, onClose, onSave }) {
  const [formData, setFormData] = useState(employee);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} className="bg-white rounded-2xl w-full max-w-md">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Edit Attendance</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white font-bold">
              {employee.name.charAt(0)}
            </div>
            <div>
              <p className="font-medium text-gray-900">{employee.name}</p>
              <p className="text-sm text-gray-500">{employee.employeeId}</p>
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
