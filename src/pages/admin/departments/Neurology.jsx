import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Users, Calendar, Activity, FileText, TrendingUp, Plus, Search, Filter } from 'lucide-react';

const mockPatients = [
  { id: 1, name: 'John Doe', age: 45, diagnosis: 'Migraine', doctor: 'Dr. Sarah Johnson', lastVisit: '2024-01-15', status: 'ongoing' },
  { id: 2, name: 'Jane Smith', age: 62, diagnosis: 'Alzheimer\'s Disease', doctor: 'Dr. Michael Chen', lastVisit: '2024-01-14', status: 'ongoing' },
  { id: 3, name: 'Robert Brown', age: 38, diagnosis: 'Epilepsy', doctor: 'Dr. Sarah Johnson', lastVisit: '2024-01-13', status: 'stable' },
  { id: 4, name: 'Emily Davis', age: 55, diagnosis: 'Parkinson\'s Disease', doctor: 'Dr. Michael Chen', lastVisit: '2024-01-12', status: 'ongoing' },
];

const stats = [
  { label: 'Total Patients', value: '234', icon: Users, color: 'blue', change: '+12' },
  { label: 'Appointments Today', value: '18', icon: Calendar, color: 'green', change: '+3' },
  { label: 'Active Cases', value: '156', icon: Activity, color: 'purple', change: '+8' },
  { label: 'Consultations', value: '89', icon: FileText, color: 'amber', change: '+15' },
];

export default function Neurology() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredPatients = mockPatients.filter(p => {
    if (statusFilter !== 'all' && p.status !== statusFilter) return false;
    if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && 
        !p.diagnosis.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            Neurology Department
          </h2>
          <p className="text-gray-500 mt-1">Neurological care and patient management</p>
        </div>
        <button className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          New Patient
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className="text-sm font-semibold text-green-600">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'ongoing', 'stable', 'critical'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  statusFilter === status
                    ? 'bg-[#5DBB63] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Patient</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Age</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Diagnosis</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Doctor</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Last Visit</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">{patient.name}</td>
                  <td className="py-4 px-4 text-gray-600">{patient.age}</td>
                  <td className="py-4 px-4 text-gray-900">{patient.diagnosis}</td>
                  <td className="py-4 px-4 text-gray-600">{patient.doctor}</td>
                  <td className="py-4 px-4 text-gray-600">{patient.lastVisit}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'ongoing' ? 'bg-blue-100 text-blue-700' :
                      patient.status === 'stable' ? 'bg-green-100 text-green-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-[#5DBB63] hover:underline text-sm font-medium">
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Common Diagnoses</h3>
          <div className="space-y-3">
            {[
              { name: 'Migraine', count: 45, percentage: 35 },
              { name: 'Epilepsy', count: 32, percentage: 25 },
              { name: 'Alzheimer\'s', count: 28, percentage: 22 },
              { name: 'Parkinson\'s', count: 23, percentage: 18 },
            ].map((diagnosis) => (
              <div key={diagnosis.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-gray-900">{diagnosis.name}</span>
                  <span className="text-sm text-gray-500">{diagnosis.count} patients</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${diagnosis.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Upcoming Appointments</h3>
          <div className="space-y-3">
            {[
              { patient: 'John Doe', time: '10:00 AM', doctor: 'Dr. Sarah Johnson' },
              { patient: 'Jane Smith', time: '11:30 AM', doctor: 'Dr. Michael Chen' },
              { patient: 'Robert Brown', time: '2:00 PM', doctor: 'Dr. Sarah Johnson' },
              { patient: 'Emily Davis', time: '3:30 PM', doctor: 'Dr. Michael Chen' },
            ].map((apt, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">{apt.patient}</p>
                  <p className="text-sm text-gray-500">{apt.doctor}</p>
                </div>
                <span className="text-sm font-medium text-gray-900">{apt.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
