import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Plus,
  Activity,
  Users,
  Stethoscope,
  Microscope,
  HeartPulse,
  Package,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Edit3,
  Eye,
  Receipt,
  TrendingUp,
  FileSpreadsheet,
  Zap,
  Layers
} from 'lucide-react';

const mockCombinedBookings = [
  { 
    id: 'CBK001', 
    patientName: 'Aisha Rahman', 
    package: 'Executive Health Checkup', 
    services: ['Consultation', 'Blood Test', 'ECG', 'Lipid Profile'], 
    doctor: 'Dr. Fatima Khan', 
    date: '2025-01-16', 
    time: '10:00 AM', 
    total: 4500.00, 
    paid: 4500.00, 
    status: 'completed',
    progress: 100
  },
  { 
    id: 'CBK002', 
    patientName: 'Rahul Patel', 
    package: 'Diabetes Wellness Package', 
    services: ['Endocrinology Consult', 'HbA1c Test', 'Diabetic Retinopathy'], 
    doctor: 'Dr. Priya Sharma', 
    date: '2025-01-17', 
    time: '02:30 PM', 
    total: 3200.00, 
    paid: 1600.00, 
    status: 'in-progress',
    progress: 60
  },
  { 
    id: 'CBK003', 
    patientName: 'Fatima Ali', 
    package: 'Women Wellness Complete', 
    services: ['Gynecology Consult', 'Pap Smear', 'Mammogram', 'Thyroid Profile'], 
    doctor: 'Dr. Ayesha Siddiqui', 
    date: '2025-01-18', 
    time: '11:00 AM', 
    total: 5800.00, 
    paid: 0, 
    status: 'scheduled',
    progress: 0
  },
  { 
    id: 'CBK004', 
    patientName: 'Vikram Singh', 
    package: 'Cardiac Health Package', 
    services: ['Cardiology Consult', 'ECG', 'Stress Test', 'Lipid Profile'], 
    doctor: 'Dr. Rajesh Gupta', 
    date: '2025-01-15', 
    time: '03:00 PM', 
    total: 4200.00, 
    paid: 4200.00, 
    status: 'completed',
    progress: 100
  },
  { 
    id: 'CBK005', 
    patientName: 'Priya Desai', 
    package: 'Pediatric Wellness', 
    services: ['Pediatrics Consult', 'Growth Assessment', 'Vaccination Review'], 
    doctor: 'Dr. Anita Reddy', 
    date: '2025-01-17', 
    time: '04:00 PM', 
    total: 1800.00, 
    paid: 900.00, 
    status: 'partial',
    progress: 50
  }
];

const packageTypes = ['All', 'Executive Health', 'Diabetes Wellness', 'Women Wellness', 'Cardiac Health', 'Pediatric Wellness'];
const statusColors = { 
  completed: 'bg-emerald-100 text-emerald-700', 
  'in-progress': 'bg-blue-100 text-blue-700', 
  scheduled: 'bg-orange-100 text-orange-700', 
  partial: 'bg-yellow-100 text-yellow-700',
  cancelled: 'bg-red-100 text-red-700' 
};

export default function Combined() {
  const [searchTerm, setSearchTerm] = useState('');
  const [packageFilter, setPackageFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredBookings = mockCombinedBookings.filter(booking => {
    const matchesSearch = booking.patientName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          booking.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          booking.package.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPackage = packageFilter === 'All' || booking.package.includes(packageFilter);
    const matchesStatus = statusFilter === 'all' || booking.status === statusFilter;
    return matchesSearch && matchesPackage && matchesStatus;
  });

  const stats = {
    total: filteredBookings.length,
    revenue: filteredBookings.reduce((sum, b) => sum + b.paid, 0),
    completed: filteredBookings.filter(b => b.status === 'completed').length,
    pending: filteredBookings.filter(b => b.status !== 'completed').length
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-emerald-500 bg-clip-text text-transparent">
            Medical + Diagnostic
          </h1>
          <p className="text-gray-500 mt-1">Integrated wellness packages & bundled services</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <button className="flex items-center gap-2 px-6 py-2.5 border-2 border-purple-200 rounded-2xl hover:bg-purple-50 hover:border-purple-300 transition-all text-purple-700 font-medium shadow-sm">
            <Download className="w-4 h-4" /> Reports
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:from-pink-600 hover:to-emerald-500 shadow-xl hover:shadow-2xl transition-all font-semibold">
            <Plus className="w-4 h-4" /> New Package
          </button>
        </div>
      </div>

      {/* Enhanced Stats with Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="group bg-gradient-to-br from-purple-50 to-pink-50/50 backdrop-blur-xl rounded-2xl p-6 border border-purple-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-opacity-50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-bold uppercase tracking-wide">Total Packages</p>
              <p className="text-3xl font-black text-gray-900 mt-2">{stats.total}</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all duration-300">
              <Package className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all" style={{width: '85%'}} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.1 }}
          className="group bg-gradient-to-br from-emerald-50 to-blue-50/50 backdrop-blur-xl rounded-2xl p-6 border border-emerald-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-emerald-600 font-bold uppercase tracking-wide">Package Revenue</p>
              <p className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent mt-2">
                ₹{stats.revenue.toLocaleString()}
              </p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
              <TrendingUp className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.2 }}
          className="group bg-gradient-to-br from-orange-50 to-yellow-50/50 backdrop-blur-xl rounded-2xl p-6 border border-orange-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-bold uppercase tracking-wide">Completed</p>
              <p className="text-3xl font-black text-gray-900 mt-2">{stats.completed}</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 h-2 rounded-full transition-all" style={{width: `${(stats.completed/stats.total)*100}%`}} />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
          className="group bg-gradient-to-br from-blue-50 to-indigo-50/50 backdrop-blur-xl rounded-2xl p-6 border border-blue-100 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-bold uppercase tracking-wide">Pending Bookings</p>
              <p className="text-3xl font-black text-gray-900 mt-2">{stats.pending}</p>
            </div>
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-all">
              <Clock className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Smart Filters */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-2xl p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#5DBB63]" />
            <input
              type="text"
              placeholder="🔍 Search patients, packages, or doctors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-16 pr-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-purple-200/50 focus:border-purple-400 transition-all duration-300 shadow-inner hover:shadow-md"
            />
          </div>
          <select 
            value={packageFilter} 
            onChange={(e) => setPackageFilter(e.target.value)}
            className="px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-emerald-200/50 focus:border-emerald-400 transition-all shadow-inner hover:shadow-md"
          >
            {packageTypes.map(type => <option key={type} value={type}>{type}</option>)}
          </select>
          <select 
            value={statusFilter} 
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-blue-200/50 focus:border-blue-400 transition-all shadow-inner hover:shadow-md"
          >
            <option value="all">All Status</option>
            <option value="completed">✅ Completed</option>
            <option value="in-progress">⏳ In Progress</option>
            <option value="scheduled">📅 Scheduled</option>
            <option value="partial">💳 Partial Payment</option>
          </select>
        </div>
      </div>

      {/* Combined Services Table */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl border border-white/60 shadow-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gradient-start to-gradient-end border-b-2 border-purple-100">
              <tr>
                <th className="px-8 py-6 text-left text-xl font-black text-gray-800 uppercase tracking-widest">Package ID</th>
                <th className="px-8 py-6 text-left text-xl font-black text-gray-800 uppercase tracking-widest">Patient Details</th>
                <th className="px-8 py-6 text-left text-xl font-black text-gray-800 uppercase tracking-widest">Package</th>
                <th className="px-8 py-6 text-left text-xl font-black text-gray-800 uppercase tracking-widest">Services Included</th>
                <th className="px-8 py-6 text-left text-xl font-black text-gray-800 uppercase tracking-widest">Doctor</th>
                <th className="px-8 py-6 text-left text-xl font-black text-gray-800 uppercase tracking-widest">Schedule</th>
                <th className="px-8 py-6 text-right text-xl font-black text-gray-800 uppercase tracking-widest">Total</th>
                <th className="px-8 py-6 text-right text-xl font-black text-gray-800 uppercase tracking-widest">Progress</th>
                <th className="px-8 py-6 text-left text-xl font-black text-gray-800 uppercase tracking-widest">Status</th>
                <th className="px-8 py-6 text-right text-xl font-black text-gray-800 uppercase tracking-widest">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-purple-100/50">
              {filteredBookings.map((booking, index) => (
                <motion.tr 
                  key={booking.id} 
                  initial={{ opacity: 0, scale: 0.95 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="hover:bg-gradient-to-r hover:from-purple-50 hover:to-emerald-50/30 transition-all duration-500 hover:shadow-lg"
                >
                  <td className="px-8 py-6 font-mono text-lg font-black text-purple-700 bg-purple-100/50 rounded-2xl">{booking.id}</td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-xl shadow-xl">
                        {booking.patientName.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-xl text-gray-900">{booking.patientName}</div>
                        <div className="text-sm text-gray-500 mt-1">ID: {booking.id.slice(-4)}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="font-black text-xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      {booking.package}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-2">
                      {booking.services.map((service, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 px-3 py-2 bg-white/60 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-all">
                          <Layers className="w-4 h-4 text-gray-500" />
                          <span className="font-medium text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="bg-emerald-100 px-4 py-2 rounded-xl font-semibold text-emerald-800">
                      {booking.doctor}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-lg font-semibold">
                    <div>{booking.date}</div>
                    <div className="text-blue-600 font-bold">{booking.time}</div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="text-2xl font-black text-gray-900">₹{booking.total.toLocaleString()}</div>
                    <div className="text-lg text-emerald-600 font-bold">Paid: ₹{booking.paid.toLocaleString()}</div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="w-full bg-gray-200 rounded-full h-4">
                      <motion.div 
                        className="bg-gradient-to-r from-emerald-500 to-blue-500 h-4 rounded-full shadow-lg flex items-center justify-center"
                        initial={{ width: 0 }}
                        animate={{ width: `${booking.progress}%` }}
                        transition={{ duration: 1.5 }}
                      >
                        <span className="text-xs font-bold text-white">{booking.progress}%</span>
                      </motion.div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className={`px-6 py-3 rounded-2xl text-lg font-bold shadow-lg ${statusColors[booking.status]}`}>
                      {booking.status.replace('-', ' ').toUpperCase()}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <motion.button 
                        whileHover={{ scale: 1.1, rotate: 5 }} 
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-white/70 hover:bg-white rounded-2xl shadow-lg border hover:border-blue-200 hover:shadow-xl transition-all duration-300"
                      >
                        <Eye className="w-5 h-5 text-blue-600" />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }} 
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-white/70 hover:bg-white rounded-2xl shadow-lg border hover:border-emerald-200 hover:shadow-xl transition-all duration-300"
                      >
                        <Edit3 className="w-5 h-5 text-emerald-600" />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1, rotate: -5 }} 
                        whileTap={{ scale: 0.95 }}
                        className="p-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        <Zap className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredBookings.length === 0 && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="text-center py-20 px-8 rounded-3xl bg-gradient-to-br from-purple-50 to-emerald-50/50 border-2 border-dashed border-purple-200"
        >
          <Activity className="w-24 h-24 text-purple-400 mx-auto mb-8 animate-pulse" />
          <h3 className="text-2xl font-black text-gray-900 mb-4">No Combined Bookings Yet</h3>
          <p className="text-xl text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            Create comprehensive wellness packages combining medical consultations with diagnostic tests for better patient outcomes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-bold rounded-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300">
              🎯 Create First Package
            </button>
            <button className="px-10 py-4 border-2 border-purple-200 text-purple-700 font-bold rounded-2xl hover:bg-purple-50 hover:shadow-lg transition-all duration-300">
              📖 Package Templates
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
}

