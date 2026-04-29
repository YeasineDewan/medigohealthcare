import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bone, Users, Calendar, Activity, Plus, Search, FileText, TrendingUp } from 'lucide-react';

const mockPatients = [
  { id: 1, name: 'Michael Johnson', age: 52, diagnosis: 'Knee Replacement', doctor: 'Dr. Robert Smith', surgery: 'Scheduled', date: '2024-01-20' },
  { id: 2, name: 'Sarah Williams', age: 34, diagnosis: 'Fracture - Tibia', doctor: 'Dr. Emily Brown', surgery: 'Completed', date: '2024-01-10' },
  { id: 3, name: 'David Lee', age: 67, diagnosis: 'Hip Replacement', doctor: 'Dr. Robert Smith', surgery: 'Scheduled', date: '2024-01-25' },
  { id: 4, name: 'Lisa Anderson', age: 41, diagnosis: 'Spinal Fusion', doctor: 'Dr. Emily Brown', surgery: 'In Progress', date: '2024-01-15' },
];

const stats = [
  { label: 'Total Patients', value: '189', icon: Users, color: 'blue', change: '+8' },
  { label: 'Surgeries Today', value: '5', icon: Activity, color: 'green', change: '+2' },
  { label: 'Scheduled', value: '23', icon: Calendar, color: 'purple', change: '+4' },
  { label: 'Recovery Rate', value: '94%', icon: TrendingUp, color: 'amber', change: '+2%' },
];

export default function Orthopedics() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
              <Bone className="w-6 h-6 text-blue-600" />
            </div>
            Orthopedics Department
          </h2>
          <p className="text-gray-500 mt-1">Bone and joint care management</p>
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
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Patient List</h3>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            />
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
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Surgery Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {mockPatients.map((patient) => (
                <tr key={patient.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-4 font-medium text-gray-900">{patient.name}</td>
                  <td className="py-4 px-4 text-gray-600">{patient.age}</td>
                  <td className="py-4 px-4 text-gray-900">{patient.diagnosis}</td>
                  <td className="py-4 px-4 text-gray-600">{patient.doctor}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      patient.surgery === 'Completed' ? 'bg-green-100 text-green-700' :
                      patient.surgery === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {patient.surgery}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{patient.date}</td>
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
          <h3 className="font-semibold text-gray-900 mb-4">Common Procedures</h3>
          <div className="space-y-3">
            {[
              { name: 'Knee Replacement', count: 45 },
              { name: 'Hip Replacement', count: 32 },
              { name: 'Spinal Surgery', count: 28 },
              { name: 'Fracture Treatment', count: 67 },
            ].map((procedure) => (
              <div key={procedure.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium text-gray-900">{procedure.name}</span>
                <span className="text-sm text-gray-500">{procedure.count} cases</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Upcoming Surgeries</h3>
          <div className="space-y-3">
            {mockPatients.filter(p => p.surgery === 'Scheduled').map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <p className="font-medium text-gray-900">{patient.name}</p>
                  <p className="text-sm text-gray-500">{patient.diagnosis}</p>
                </div>
                <span className="text-sm font-medium text-gray-900">{patient.date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
