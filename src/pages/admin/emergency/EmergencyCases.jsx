import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  AlertCircle,
  Phone,
  MapPin,
  Clock,
  User,
  Ambulance,
  Activity,
  Heart,
  Plus,
  CheckCircle,
  XCircle,
  Calendar,
  FileText,
  TrendingUp,
  RefreshCw,
  ChevronRight,
  Eye
} from 'lucide-react';

// Mock emergency cases data
const emergencyCases = [
  { id: 'EM001', patientName: 'John Smith', age: 45, gender: 'Male', type: 'Cardiac', severity: 'critical', location: 'Emergency Room 1', status: 'admitted', assignedDoctor: 'Dr. Sarah Johnson', arrivalTime: '2024-01-20 10:30 AM', notes: 'Chest pain, ECG abnormal' },
  { id: 'EM002', patientName: 'Sarah Davis', age: 32, gender: 'Female', type: 'Accident', severity: 'high', location: 'Emergency Room 2', status: 'treatment', assignedDoctor: 'Dr. Michael Chen', arrivalTime: '2024-01-20 11:15 AM', notes: 'Road accident, multiple injuries' },
  { id: 'EM003', patientName: 'Robert Wilson', age: 58, gender: 'Male', type: 'Stroke', severity: 'critical', location: 'ICU', status: 'admitted', assignedDoctor: 'Dr. Lisa Anderson', arrivalTime: '2024-01-20 09:45 AM', notes: 'Sudden loss of consciousness' },
  { id: 'EM004', patientName: 'Emily Brown', age: 28, gender: 'Female', type: 'Allergic Reaction', severity: 'moderate', location: 'Emergency Room 3', status: 'discharged', assignedDoctor: 'Dr. James Brown', arrivalTime: '2024-01-20 08:00 AM', notes: 'Severe allergic reaction to medication' },
  { id: 'EM005', patientName: 'Michael Johnson', age: 65, gender: 'Male', type: 'Respiratory', severity: 'high', location: 'Emergency Room 1', status: 'treatment', assignedDoctor: 'Dr. Sarah Johnson', arrivalTime: '2024-01-20 12:00 PM', notes: 'Difficulty breathing, O2 saturation low' },
];

const severityColors = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  moderate: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-green-100 text-green-700 border-green-200'
};

const statusColors = {
  admitted: 'bg-purple-100 text-purple-700',
  treatment: 'bg-blue-100 text-blue-700',
  discharged: 'bg-green-100 text-green-700',
  'in-transit': 'bg-yellow-100 text-yellow-700'
};

export default function EmergencyCases() {
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredCases = emergencyCases.filter(case_ => {
    const matchesSearch = case_.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      case_.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = severityFilter === 'all' || case_.severity === severityFilter;
    const matchesStatus = statusFilter === 'all' || case_.status === statusFilter;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  // Stats
  const criticalCases = emergencyCases.filter(c => c.severity === 'critical').length;
  const admittedCases = emergencyCases.filter(c => c.status === 'admitted').length;
  const inTreatment = emergencyCases.filter(c => c.status === 'treatment').length;
  const todayCases = emergencyCases.length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Emergency Cases</h1>
          <p className="text-gray-500 mt-1">Manage emergency and critical care cases</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700">
            <Plus className="w-4 h-4" />
            New Case
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
              <p className="text-sm text-gray-500">Today's Cases</p>
              <p className="text-2xl font-bold text-gray-900">{todayCases}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-blue-600" />
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
              <p className="text-sm text-gray-500">Critical</p>
              <p className="text-2xl font-bold text-red-600">{criticalCases}</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-red-600" />
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
              <p className="text-sm text-gray-500">In Treatment</p>
              <p className="text-2xl font-bold text-orange-600">{inTreatment}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6 text-orange-600" />
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
              <p className="text-sm text-gray-500">Admitted</p>
              <p className="text-2xl font-bold text-purple-600">{admittedCases}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Ambulance className="w-6 h-6 text-purple-600" />
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
              placeholder="Search cases..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            />
          </div>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          >
            <option value="all">All Severity</option>
            <option value="critical">Critical</option>
            <option value="high">High</option>
            <option value="moderate">Moderate</option>
            <option value="low">Low</option>
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="admitted">Admitted</option>
            <option value="treatment">In Treatment</option>
            <option value="discharged">Discharged</option>
          </select>
        </div>
      </div>

      {/* Cases Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Case ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Severity</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Location</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Doctor</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Arrival</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCases.map((case_, index) => (
                <motion.tr
                  key={case_.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <span className="font-mono font-medium text-gray-900">{case_.id}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white font-semibold">
                        {case_.patientName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{case_.patientName}</p>
                        <p className="text-sm text-gray-500">{case_.age} yrs / {case_.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-900">{case_.type}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${severityColors[case_.severity]}`}>
                      {case_.severity.charAt(0).toUpperCase() + case_.severity.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                      <MapPin className="w-3 h-3" />
                      {case_.location}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[case_.status]}`}>
                      {case_.status.charAt(0).toUpperCase() + case_.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-600">{case_.assignedDoctor}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-500">{case_.arrivalTime}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg" title="Update Status">
                        <ChevronRight className="w-4 h-4" />
                      </button>
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
