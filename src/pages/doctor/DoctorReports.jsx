import { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Users, Calendar, DollarSign, Clock, Download, Filter, FileText, Eye } from 'lucide-react';

export default function DoctorReports() {
  const [dateRange, setDateRange] = useState('this-month');
  const [reportType, setReportType] = useState('all');

  const stats = [
    { label: 'Total Consultations', value: '156', change: '+12%', icon: Users, color: 'from-blue-500 to-blue-600' },
    { label: 'Total Earnings', value: '৳84,500', change: '+18%', icon: DollarSign, color: 'from-green-500 to-green-600' },
    { label: 'Avg. Duration', value: '18 min', change: '-2 min', icon: Clock, color: 'from-purple-500 to-purple-600' },
    { label: 'Patient Satisfaction', value: '4.9/5', change: '+0.2', icon: TrendingUp, color: 'from-amber-500 to-amber-600' },
  ];

  const consultations = [
    { id: 1, date: '2024-01-15', patient: 'Ahmed Khan', type: 'Video', duration: '25 min', fee: '৳800', status: 'Completed' },
    { id: 2, date: '2024-01-15', patient: 'Sara Ali', type: 'In-person', duration: '30 min', fee: '৳1,200', status: 'Completed' },
    { id: 3, date: '2024-01-14', patient: 'Rahman Hossain', type: 'Video', duration: '20 min', fee: '৳800', status: 'Completed' },
    { id: 4, date: '2024-01-14', patient: 'Fatema Begum', type: 'In-person', duration: '35 min', fee: '৳1,200', status: 'Completed' },
    { id: 5, date: '2024-01-13', patient: 'Karim Uddin', type: 'Video', duration: '15 min', fee: '৳800', status: 'Completed' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500 mt-1">Track your performance and earnings</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-[#5DBB63]"
          >
            <option value="today">Today</option>
            <option value="this-week">This Week</option>
            <option value="this-month">This Month</option>
            <option value="this-year">This Year</option>
          </select>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {stat.change}
                </span>
              </div>
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-100 shadow-sm">
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-gray-900">Consultation History</h2>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg hover:bg-gray-50">
                  <Filter className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Duration</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fee</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {consultations.map((consultation, i) => (
                  <motion.tr
                    key={consultation.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 text-sm text-gray-900">{consultation.date}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{consultation.patient}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        consultation.type === 'Video' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {consultation.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{consultation.duration}</td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">{consultation.fee}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {consultation.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-2 rounded-lg hover:bg-gray-100">
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Consultation Types</h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Video Consultations</span>
                  <span className="text-sm font-medium">65%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-600 h-2 rounded-full" style={{ width: '65%' }} />
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">In-person</span>
                  <span className="text-sm font-medium">35%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '35%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Peak Hours</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Morning (9-12)</span>
                <span className="text-sm font-medium">28 consults</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Afternoon (12-5)</span>
                <span className="text-sm font-medium">45 consults</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Evening (5-9)</span>
                <span className="text-sm font-medium">32 consults</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-[#5DBB63] to-[#165028] rounded-xl p-6 text-white">
            <BarChart3 className="w-12 h-12 mb-4 opacity-80" />
            <h3 className="font-bold text-lg mb-2">Monthly Target</h3>
            <p className="text-white/80 text-sm mb-4">You've completed 78% of your monthly consultation goal</p>
            <div className="w-full bg-white/20 rounded-full h-2 mb-2">
              <div className="bg-white h-2 rounded-full" style={{ width: '78%' }} />
            </div>
            <p className="text-sm text-white/80">156 / 200 consultations</p>
          </div>
        </div>
      </div>
    </div>
  );
}
