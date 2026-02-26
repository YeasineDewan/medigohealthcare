import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Calendar,
  Printer,
  Users,
  UserPlus,
  UserCheck,
  CalendarCheck,
  DollarSign,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  FileText,
  BarChart3,
  PieChart,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Activity,
  Heart,
  AlertCircle
} from 'lucide-react';

// Mock patient data
const patientStats = {
  total: 2847,
  active: 2156,
  newThisMonth: 156,
  avgVisit: 3.2
};

const patientData = [
  { id: 1, name: 'John Smith', email: 'john.smith@email.com', phone: '+1234567890', age: 45, gender: 'Male', bloodType: 'A+', department: 'Cardiology', lastVisit: '2024-01-20', totalVisits: 12, totalSpent: 4500, status: 'active' },
  { id: 2, name: 'Sarah Johnson', email: 'sarah.j@email.com', phone: '+1234567891', age: 32, gender: 'Female', bloodType: 'O+', department: 'General Medicine', lastVisit: '2024-01-19', totalVisits: 8, totalSpent: 2800, status: 'active' },
  { id: 3, name: 'Michael Brown', email: 'm.brown@email.com', phone: '+1234567892', age: 58, gender: 'Male', bloodType: 'B+', department: 'Neurology', lastVisit: '2024-01-18', totalVisits: 15, totalSpent: 8200, status: 'active' },
  { id: 4, name: 'Emily Davis', email: 'emily.d@email.com', phone: '+1234567893', age: 28, gender: 'Female', bloodType: 'AB-', department: 'Pediatrics', lastVisit: '2024-01-17', totalVisits: 5, totalSpent: 1500, status: 'active' },
  { id: 5, name: 'Robert Wilson', email: 'r.wilson@email.com', phone: '+1234567894', age: 62, gender: 'Male', bloodType: 'A-', department: 'Orthopedics', lastVisit: '2024-01-15', totalVisits: 20, totalSpent: 12000, status: 'inactive' },
];

export default function PatientReports() {
  const [dateRange, setDateRange] = useState('this-month');
  const [searchTerm, setSearchTerm] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [viewMode, setViewMode] = useState('table');

  const filteredPatients = patientData.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = departmentFilter === 'all' || patient.department === departmentFilter;
    return matchesSearch && matchesDept;
  });

  const departments = [...new Set(patientData.map(p => p.department))];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Patient Reports</h1>
          <p className="text-gray-500 mt-1">Comprehensive patient analytics and statistics</p>
        </div>
        <div className="flex gap-3">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent appearance-none bg-white"
            >
              <option value="today">Today</option>
              <option value="this-week">This Week</option>
              <option value="this-month">This Month</option>
              <option value="this-quarter">This Quarter</option>
              <option value="this-year">This Year</option>
            </select>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Printer className="w-4 h-4" />
            Print
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg">
            <Download className="w-4 h-4" />
            Export
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
              <p className="text-sm text-gray-500">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">{patientStats.total.toLocaleString()}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUpRight className="w-3 h-3" /> +12% from last month
              </p>
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
              <p className="text-sm text-gray-500">Active Patients</p>
              <p className="text-2xl font-bold text-green-600">{patientStats.active.toLocaleString()}</p>
              <p className="text-sm text-gray-500 mt-1">75.7% of total</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <UserCheck className="w-6 h-6 text-green-600" />
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
              <p className="text-sm text-gray-500">New This Month</p>
              <p className="text-2xl font-bold text-purple-600">+{patientStats.newThisMonth}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <ArrowUpRight className="w-3 h-3" /> +8% from last month
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-purple-600" />
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
              <p className="text-sm text-gray-500">Avg. Visits</p>
              <p className="text-2xl font-bold text-orange-600">{patientStats.avgVisit}</p>
              <p className="text-sm text-gray-500 mt-1">per patient</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <CalendarCheck className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex-1 relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            >
              <option value="all">All Departments</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
            <div className="flex rounded-lg border border-gray-300 overflow-hidden">
              <button
                onClick={() => setViewMode('table')}
                className={`px-4 py-2 ${viewMode === 'table' ? 'bg-[#5DBB63] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <FileText className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('chart')}
                className={`px-4 py-2 ${viewMode === 'chart' ? 'bg-[#5DBB63] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
              >
                <BarChart3 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Age/Gender</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Blood Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Department</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Visits</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Total Spent</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Last Visit</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredPatients.map((patient, index) => (
                  <motion.tr
                    key={patient.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white font-semibold">
                          {patient.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{patient.name}</p>
                          <p className="text-sm text-gray-500">ID: P{patient.id.toString().padStart(4, '0')}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <p className="text-sm text-gray-900">{patient.email}</p>
                      <p className="text-sm text-gray-500">{patient.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-900">{patient.age} yrs / {patient.gender}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-medium">
                        {patient.bloodType}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-900">{patient.department}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-gray-900">{patient.totalVisits}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm font-medium text-green-600">${patient.totalSpent.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-500">{patient.lastVisit}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        patient.status === 'active' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-700'
                      }`}>
                        {patient.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Chart View */}
      {viewMode === 'chart' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Patients by Department</h3>
            <div className="space-y-4">
              {departments.map((dept, i) => {
                const count = patientData.filter(p => p.department === dept).length;
                const percentage = (count / patientData.length * 100).toFixed(1);
                const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-red-500'];
                return (
                  <div key={dept}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{dept}</span>
                      <span className="text-gray-500">{count} ({percentage}%)</span>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-3">
                      <div className={`${colors[i % colors.length]} h-3 rounded-full`} style={{ width: `${percentage}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Gender Distribution</h3>
            <div className="flex items-center justify-center gap-8">
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-blue-600">60%</span>
                </div>
                <p className="font-medium">Male</p>
              </div>
              <div className="text-center">
                <div className="w-24 h-24 rounded-full bg-pink-100 flex items-center justify-center mb-2">
                  <span className="text-2xl font-bold text-pink-600">40%</span>
                </div>
                <p className="font-medium">Female</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
