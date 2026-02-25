import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Video,
  Users,
  DollarSign,
  ArrowUpRight,
  Clock,
  Activity,
  TrendingUp,
  Star,
  MessageCircle,
  FileText,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  Heart,
  Stethoscope,
  Award,
  Target,
  Zap,
  AlertCircle,
  CheckCircle,
  XCircle,
  BarChart3,
  PieChart,
  User,
  Phone,
  Mail,
  MapPin,
  Briefcase,
  GraduationCap,
  Globe,
  Languages,
  Camera,
  Edit,
  Settings,
  LogOut,
  ChevronRight,
  Plus,
  RefreshCw,
  Pause,
  Play,
  Square,
} from 'lucide-react';

const stats = [
  { label: "Today's Appointments", value: '8', icon: Calendar, color: 'bg-gradient-to-br from-[#5DBB63] to-[#4a9a4f]', change: '+2', trend: 'up' },
  { label: 'Live Consultations', value: '3', icon: Video, color: 'bg-gradient-to-br from-blue-500 to-blue-600', change: 'Active', trend: 'stable' },
  { label: 'Total Patients', value: '1,234', icon: Users, color: 'bg-gradient-to-br from-[#165028] to-[#0f3d1c]', change: '+45', trend: 'up' },
  { label: 'This Month Earnings', value: '৳84,500', icon: DollarSign, color: 'bg-gradient-to-br from-amber-500 to-amber-600', change: '+18%', trend: 'up' },
];

const upcomingAppointments = [
  { 
    id: 1, 
    patient: 'Ahmed Khan', 
    time: '10:00 AM', 
    type: 'In-person',
    duration: '30 min',
    status: 'confirmed',
    payment: 'Paid',
    notes: 'Follow-up consultation'
  },
  { 
    id: 2, 
    patient: 'Sara Ali', 
    time: '10:30 AM', 
    type: 'Video',
    duration: '45 min',
    status: 'confirmed',
    payment: 'Paid',
    notes: 'Initial consultation'
  },
  { 
    id: 3, 
    patient: 'Rahman Hossain', 
    time: '11:00 AM', 
    type: 'In-person',
    duration: '30 min',
    status: 'pending',
    payment: 'Pending',
    notes: 'Emergency case'
  },
];

const recentPatients = [
  { id: 1, name: 'Fatema Begum', age: 45, lastVisit: '2 days ago', condition: 'Diabetes', status: 'stable' },
  { id: 2, name: 'Karim Uddin', age: 32, lastVisit: '1 week ago', condition: 'Hypertension', status: 'improving' },
  { id: 3, name: 'Ayesha Siddique', age: 28, lastVisit: '3 days ago', condition: 'Anemia', status: 'recovering' },
];

const earningsData = [
  { month: 'Jan', earnings: 75000, consultations: 45 },
  { month: 'Feb', earnings: 84500, consultations: 52 },
  { month: 'Mar', earnings: 78000, consultations: 48 },
  { month: 'Apr', earnings: 92000, consultations: 58 },
];

const notifications = [
  { id: 1, type: 'appointment', message: 'New appointment request from John Doe', time: '5 min ago', read: false },
  { id: 2, type: 'message', message: 'Patient sent you a message', time: '1 hour ago', read: false },
  { id: 3, type: 'payment', message: 'Payment received for consultation #1234', time: '2 hours ago', read: true },
];

export default function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#111827]">Doctor Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Dr. Ahmed Hassan</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button className="p-4 rounded-xl bg-gradient-to-br from-[#5DBB63] to-[#4a9a4f] text-white hover:shadow-lg transition-all">
          <Video className="w-6 h-6 mb-2" />
          <span className="text-sm font-medium">Start Consultation</span>
        </button>
        <button className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-lg transition-all">
          <Calendar className="w-6 h-6 mb-2" />
          <span className="text-sm font-medium">View Schedule</span>
        </button>
        <button className="p-4 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white hover:shadow-lg transition-all">
          <FileText className="w-6 h-6 mb-2" />
          <span className="text-sm font-medium">Prescriptions</span>
        </button>
        <button className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-lg transition-all">
          <BarChart3 className="w-6 h-6 mb-2" />
          <span className="text-sm font-medium">Analytics</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="group relative overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-transparent to-[#5DBB63]/5 rounded-full -translate-y-16 translate-x-16" />
            <div className="relative p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  stat.trend === 'up' ? 'bg-green-100 text-green-700' : 
                  stat.trend === 'down' ? 'bg-red-100 text-red-700' : 
                  'bg-blue-100 text-blue-700'
                }`}>
                  {stat.trend === 'up' && <TrendingUp className="w-3 h-3" />}
                  {stat.change}
                </div>
              </div>
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-[#111827]">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Upcoming Appointments */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-[#111827] text-lg">Today's Schedule</h2>
                <div className="flex items-center gap-2">
                  <button className="p-2 rounded-lg hover:bg-gray-50">
                    <Filter className="w-4 h-4 text-gray-600" />
                  </button>
                  <Link to="/doctor/schedule" className="text-[#5DBB63] font-medium text-sm flex items-center gap-1">
                    View all <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {upcomingAppointments.map((apt, i) => (
                <motion.div
                  key={apt.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group p-4 rounded-xl border border-gray-100 hover:border-[#5DBB63]/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5DBB63]/20 to-[#165028]/20 flex items-center justify-center">
                          <User className="w-6 h-6 text-[#5DBB63]" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          apt.status === 'confirmed' ? 'bg-green-500' : 
                          apt.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-[#111827] group-hover:text-[#5DBB63] transition-colors">
                          {apt.patient}
                        </p>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {apt.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Video className="w-3 h-3" /> {apt.type}
                          </span>
                          <span>{apt.duration}</span>
                        </div>
                        {apt.notes && (
                          <p className="text-xs text-gray-400 mt-1">{apt.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        apt.payment === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {apt.payment}
                      </span>
                      <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        apt.type === 'Video' 
                          ? 'bg-blue-500 text-white hover:bg-blue-600' 
                          : 'bg-[#5DBB63] text-white hover:bg-[#4a9a4f]'
                      }`}>
                        {apt.type === 'Video' ? 'Join Call' : 'Start'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Recent Patients */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-[#111827] text-lg">Recent Patients</h2>
              <Link to="/doctor/patients" className="text-[#5DBB63] font-medium text-sm flex items-center gap-1">
                View all <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="space-y-4">
              {recentPatients.map((patient, i) => (
                <div key={patient.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5DBB63]/20 to-[#165028]/20 flex items-center justify-center">
                      <User className="w-5 h-5 text-[#5DBB63]" />
                    </div>
                    <div>
                      <p className="font-medium text-[#111827]">{patient.name}</p>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <span>Age: {patient.age}</span>
                        <span>{patient.condition}</span>
                        <span>{patient.lastVisit}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'stable' ? 'bg-green-100 text-green-700' :
                      patient.status === 'improving' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {patient.status}
                    </span>
                    <button className="p-2 rounded-lg hover:bg-gray-200">
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Live Consultation Card */}
          <Link to="/doctor/live-consult">
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5DBB63] to-[#165028] p-6 text-white hover:shadow-xl transition-all duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Video className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">24/7 Live Consultation</h3>
                    <p className="text-white/80 text-sm">Accept video calls anytime</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <p className="text-white/90 text-sm">3 patients waiting</p>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="w-6 h-6 rounded-full bg-white/30 border-2 border-white flex items-center justify-center">
                        <User className="w-3 h-3 text-white" />
                      </div>
                    ))}
                  </div>
                </div>
                <button className="w-full py-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors font-medium flex items-center justify-center gap-2">
                  <Play className="w-4 h-4" /> Go Live
                </button>
              </div>
            </div>
          </Link>

          {/* Performance Stats */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-[#111827] mb-4">Performance Metrics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Avg. consultation time</span>
                <span className="font-medium">18 min</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Patient satisfaction</span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">4.9</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Response rate</span>
                <span className="font-medium">98%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Completed today</span>
                <span className="font-medium">5/8</span>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#111827]">Notifications</h3>
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="space-y-3">
              {notifications.slice(0, 3).map((notif) => (
                <div key={notif.id} className={`p-3 rounded-lg ${notif.read ? 'bg-gray-50' : 'bg-[#5DBB63]/10'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notif.type === 'appointment' ? 'bg-blue-500' :
                      notif.type === 'message' ? 'bg-green-500' :
                      'bg-amber-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-[#5DBB63] text-sm font-medium hover:text-[#165028]">
              View all notifications
            </button>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-[#111827] mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button className="w-full p-3 rounded-lg hover:bg-gray-50 text-left flex items-center gap-3">
                <FileText className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Write Prescription</span>
              </button>
              <button className="w-full p-3 rounded-lg hover:bg-gray-50 text-left flex items-center gap-3">
                <MessageCircle className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Patient Messages</span>
              </button>
              <button className="w-full p-3 rounded-lg hover:bg-gray-50 text-left flex items-center gap-3">
                <Download className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Download Reports</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Earnings Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-semibold text-[#111827] text-lg">Earnings Overview</h2>
          <select 
            value={selectedTimeRange}
            onChange={(e) => setSelectedTimeRange(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 text-sm"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
          </select>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {earningsData.map((data, i) => (
              <div key={data.month} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <span className="text-sm font-medium">{data.month}</span>
                <div className="text-right">
                  <p className="font-semibold">৳{data.earnings.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{data.consultations} consultations</p>
                </div>
              </div>
            ))}
          </div>
          <div className="flex items-center justify-center bg-gradient-to-br from-[#5DBB63]/10 to-[#165028]/10 rounded-xl">
            <div className="text-center">
              <PieChart className="w-24 h-24 text-[#5DBB63] mx-auto mb-4" />
              <p className="text-sm text-gray-600">Total Earnings</p>
              <p className="text-2xl font-bold text-[#165028]">৳329,500</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
