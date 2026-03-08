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
  Grid,
  List,
  Pill,
  Stethoscope,
  AlertCircle,
  BarChart3,
  PieChart,
  User,
  Phone,
  MapPin,
  Globe,
  Settings,
  ChevronRight,
  RefreshCw,
  Play,
  Mic,
  MicOff,
  Wifi,
  WifiOff,
  Battery,
  Shield,
  HardDrive,
  Cloud,
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
  const [searchQuery, setSearchQuery] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    status: 'all',
    priority: 'all',
    type: 'all',
    dateRange: 'all'
  });
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'urgent', message: 'Emergency case - Patient needs immediate attention', time: '2 min ago', read: false, priority: 'high' },
    { id: 2, type: 'appointment', message: 'New appointment request from John Doe', time: '5 min ago', read: false, priority: 'medium' },
    { id: 3, type: 'message', message: 'Patient sent you a message', time: '1 hour ago', read: false, priority: 'low' },
    { id: 4, type: 'payment', message: 'Payment received for consultation #1234', time: '2 hours ago', read: true, priority: 'low' },
    { id: 5, type: 'system', message: 'System maintenance scheduled for tonight', time: '3 hours ago', read: true, priority: 'medium' }
  ]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [quickActions, setQuickActions] = useState([
    { id: 1, name: 'Start Video Consult', icon: Video, shortcut: 'Ctrl+V', color: 'from-blue-500 to-blue-600', route: '/doctor/live-consult' },
    { id: 2, name: 'New Prescription', icon: FileText, shortcut: 'Ctrl+P', color: 'from-green-500 to-green-600', route: '/doctor/prescriptions/enhanced' },
    { id: 3, name: 'View Schedule', icon: Calendar, shortcut: 'Ctrl+S', color: 'from-purple-500 to-purple-600', route: '/doctor/schedule/enhanced' },
    { id: 4, name: 'Patient Search', icon: Search, shortcut: 'Ctrl+F', color: 'from-amber-500 to-amber-600', route: '/doctor/patients' },
    { id: 5, name: 'Emergency Mode', icon: AlertCircle, shortcut: 'Ctrl+E', color: 'from-red-500 to-red-600', route: '#' },
    { id: 6, name: 'Reports', icon: BarChart3, shortcut: 'Ctrl+R', color: 'from-pink-500 to-pink-600', route: '/doctor/reports/enhanced' }
  ]);
  const [recentPatients, setRecentPatients] = useState([
    { id: 1, name: 'Fatema Begum', age: 45, lastVisit: '2 days ago', condition: 'Diabetes', status: 'stable', urgency: 'normal', nextAppointment: '2024-01-20', medications: 3, allergies: 'Penicillin' },
    { id: 2, name: 'Karim Uddin', age: 32, lastVisit: '1 week ago', condition: 'Hypertension', status: 'improving', urgency: 'normal', nextAppointment: '2024-01-25', medications: 2, allergies: 'None' },
    { id: 3, name: 'Ayesha Siddique', age: 28, lastVisit: '3 days ago', condition: 'Anemia', status: 'recovering', urgency: 'low', nextAppointment: '2024-01-18', medications: 1, allergies: 'Sulfa' },
    { id: 4, name: 'Rahman Hossain', age: 45, lastVisit: '5 days ago', condition: 'Heart Disease', status: 'critical', urgency: 'high', nextAppointment: '2024-01-17', medications: 5, allergies: 'None' },
    { id: 5, name: 'Sara Ali', age: 28, lastVisit: '1 day ago', condition: 'Pregnancy', status: 'stable', urgency: 'normal', nextAppointment: '2024-01-22', medications: 2, allergies: 'None' }
  ]);
  const [systemStatus, setSystemStatus] = useState({
    connection: 'excellent',
    battery: 85,
    storage: 67,
    security: 'enabled',
    backup: 'completed',
    sync: 'synced'
  });
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('en');
  const [offlineMode, setOfflineMode] = useState(false);

  return (
    <div className="space-y-8">
      {/* Enhanced Header with Search */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Section */}
          <div className="flex-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5DBB63] to-[#165028] p-1">
                  <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 text-[#5DBB63]" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#111827]">Professional Dashboard</h1>
                <p className="text-gray-500 mt-1">Dr. Ahmed Hassan • Cardiology Specialist</p>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex items-center gap-1 px-2 py-1 bg-green-100 rounded-full">
                    <Wifi className="w-3 h-3 text-green-600" />
                    <span className="text-xs font-medium text-green-700">Online</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-blue-100 rounded-full">
                    <Shield className="w-3 h-3 text-blue-600" />
                    <span className="text-xs font-medium text-blue-700">Secure</span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-1 bg-purple-100 rounded-full">
                    <Clock className="w-3 h-3 text-purple-600" />
                    <span className="text-xs font-medium text-purple-700">Available</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Advanced Search Bar */}
            <div className="relative">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients, prescriptions, reports, appointments..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onFocus={() => setShowAdvancedSearch(true)}
                    onBlur={() => setTimeout(() => setShowAdvancedSearch(false), 200)}
                    className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-[#5DBB63] focus:border-[#5DBB63] transition-all duration-300"
                  />
                  <button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className={`absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${
                      voiceEnabled ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {voiceEnabled ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                  </button>
                </div>
                <button className="p-3 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
                  <Filter className="w-5 h-5 text-gray-600" />
                </button>
                <button className="p-3 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
                  <RefreshCw className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              
              {/* Advanced Search Dropdown */}
              {showAdvancedSearch && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl p-4 z-50"
                >
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                      <option>All Patients</option>
                      <option>Active Patients</option>
                      <option>New Patients</option>
                      <option>Critical Patients</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                      <option>All Types</option>
                      <option>Prescriptions</option>
                      <option>Reports</option>
                      <option>Appointments</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                      <option>All Status</option>
                      <option>Active</option>
                      <option>Pending</option>
                      <option>Completed</option>
                    </select>
                    <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm">
                      <option>All Time</option>
                      <option>Today</option>
                      <option>This Week</option>
                      <option>This Month</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg text-sm font-medium">
                      Search
                    </button>
                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium">
                      Clear
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
          
          {/* Right Section - System Status */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-3 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-all duration-300"
              >
                <Bell className="w-6 h-6 text-gray-600" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full right-0 mt-2 w-80 bg-white border-2 border-gray-200 rounded-2xl shadow-2xl z-50"
                >
                  <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Notifications</h3>
                      <button className="text-sm text-[#5DBB63] hover:text-[#4a9a4f]">
                        Mark all read
                      </button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div key={notification.id} className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                        !notification.read ? 'bg-blue-50' : ''
                      }`}>
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.priority === 'high' ? 'bg-red-500' :
                            notification.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                          <div className="flex-1">
                            <p className={`text-sm ${!notification.read ? 'font-semibold' : ''} text-gray-900`}>
                              {notification.message}
                            </p>
                            <div className="flex items-center gap-2 mt-1">
                              <span className="text-xs text-gray-500">{notification.time}</span>
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                notification.type === 'urgent' ? 'bg-red-100 text-red-700' :
                                notification.type === 'appointment' ? 'bg-blue-100 text-blue-700' :
                                notification.type === 'message' ? 'bg-green-100 text-green-700' :
                                notification.type === 'payment' ? 'bg-purple-100 text-purple-700' :
                                'bg-gray-100 text-gray-700'
                              }`}>
                                {notification.type}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-4 border-t border-gray-200">
                    <button className="w-full text-center text-sm text-[#5DBB63] hover:text-[#4a9a4f] font-medium">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
            
            {/* System Status */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-xl">
                <Battery className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">{systemStatus.battery}%</span>
              </div>
              <div className="flex items-center gap-1 px-3 py-2 bg-gray-100 rounded-xl">
                <Wifi className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700 capitalize">{systemStatus.connection}</span>
              </div>
              <button className="p-3 rounded-xl border-2 border-gray-200 hover:bg-gray-50 transition-colors">
                <Settings className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Quick Actions Toolbar */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold text-gray-900">Quick Actions</h2>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <Grid className="w-4 h-4 text-gray-600" />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
              <List className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action, index) => (
            <Link key={action.id} to={action.route}>
              <motion.button
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative p-4 rounded-2xl border-2 border-gray-200 hover:border-gray-300 transition-all duration-300 w-full"
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-900">{action.name}</p>
                    <p className="text-xs text-gray-500 mt-1">{action.shortcut}</p>
                  </div>
                </div>
              </motion.button>
            </Link>
          ))}
        </div>
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

          {/* Enhanced Recent Patients */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-[#111827] text-lg">Recent Patients</h2>
              <div className="flex items-center gap-2">
                <button className="text-sm text-[#5DBB63] hover:text-[#4a9a4f] font-medium">
                  View all
                </button>
                <button className="p-2 rounded-lg hover:bg-gray-50">
                  <RefreshCw className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
            <div className="space-y-4">
              {recentPatients.map((patient, index) => (
                <motion.div
                  key={patient.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5DBB63]/20 to-[#165028]/20 flex items-center justify-center">
                          <User className="w-6 h-6 text-[#5DBB63]" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          patient.urgency === 'high' ? 'bg-red-500' :
                          patient.urgency === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900 group-hover:text-[#5DBB63] transition-colors">{patient.name}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <span>Age: {patient.age}</span>
                          <span>•</span>
                          <span>{patient.condition}</span>
                          <span>•</span>
                          <span>{patient.lastVisit}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            patient.status === 'stable' ? 'bg-green-100 text-green-700' :
                            patient.status === 'improving' ? 'bg-blue-100 text-blue-700' :
                            patient.status === 'recovering' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {patient.status}
                          </span>
                          <span className="text-xs text-gray-500">
                            Next: {patient.nextAppointment}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <Pill className="w-3 h-3" />
                          <span>{patient.medications} meds</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-gray-500">
                          <AlertCircle className="w-3 h-3" />
                          <span>{patient.allergies}</span>
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                          <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-gray-200 transition-colors">
                          <MessageCircle className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Patient Summary Stats */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-gray-900">{recentPatients.length}</p>
                  <p className="text-sm text-gray-500">Recent Patients</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-orange-600">{recentPatients.filter(p => p.urgency === 'high').length}</p>
                  <p className="text-sm text-gray-500">Need Attention</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-blue-600">{recentPatients.filter(p => p.status === 'improving').length}</p>
                  <p className="text-sm text-gray-500">Improving</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Enhanced Live Consultation Card */}
          <Link to="/doctor/live-consult">
            <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#5DBB63] via-[#4a9a4f] to-[#165028] p-8 text-white hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02] backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-24 translate-x-24 animate-pulse" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full translate-y-20 -translate-x-20" />
              
              <div className="relative">
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border-2 border-white/30">
                    <Video className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-bold text-2xl text-white group-hover:text-white/90 transition-colors">24/7 Live Consultation</h3>
                    <p className="text-white/80 text-lg font-medium">Enterprise-grade telemedicine platform</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/70 font-bold">Waiting</span>
                      <div className="w-3 h-3 bg-yellow-400 rounded-full animate-pulse" />
                    </div>
                    <span className="text-3xl font-bold">3</span>
                    <span className="text-sm text-white/60 block">Patients</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/70 font-bold">Active</span>
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    </div>
                    <span className="text-3xl font-bold">1</span>
                    <span className="text-sm text-white/60 block">Consultation</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/70 font-bold">Completed</span>
                      <div className="w-3 h-3 bg-blue-400 rounded-full" />
                    </div>
                    <span className="text-3xl font-bold">8</span>
                    <span className="text-sm text-white/60 block">Today</span>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl px-6 py-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-white/70 font-bold">Rating</span>
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                    <span className="text-3xl font-bold">4.9</span>
                    <span className="text-sm text-white/60 block">Average</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-3 mb-8">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center hover:bg-white/20 transition-all duration-300">
                    <FileText className="w-5 h-5 mx-auto mb-2" />
                    <p className="text-xs font-bold">E-Prescription</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center hover:bg-white/20 transition-all duration-300">
                    <Activity className="w-5 h-5 mx-auto mb-2" />
                    <p className="text-xs font-bold">Vital Signs</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 text-center hover:bg-white/20 transition-all duration-300">
                    <MessageCircle className="w-5 h-5 mx-auto mb-2" />
                    <p className="text-xs font-bold">Live Chat</p>
                  </div>
                </div>
                
                <button className="w-full py-4 rounded-2xl bg-white text-[#5DBB63] hover:bg-white/90 transition-all duration-300 font-bold flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] text-lg">
                  <Play className="w-6 h-6" /> 
                  <span>Start Professional Consultation</span>
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </Link>

          {/* System Monitoring Panel */}
          <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">System Status</h3>
              <button className="p-2 rounded-lg hover:bg-gray-50 transition-colors">
                <RefreshCw className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Wifi className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Connection</span>
                </div>
                <span className="text-sm font-bold text-green-600 capitalize">{systemStatus.connection}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Battery className="w-4 h-4 text-amber-500" />
                  <span className="text-sm font-medium">Battery</span>
                </div>
                <span className="text-sm font-bold text-amber-600">{systemStatus.battery}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Storage</span>
                </div>
                <span className="text-sm font-bold text-blue-600">{systemStatus.storage}%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span className="text-sm font-medium">Security</span>
                </div>
                <span className="text-sm font-bold text-green-600 capitalize">{systemStatus.security}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Cloud className="w-4 h-4 text-purple-500" />
                  <span className="text-sm font-medium">Backup</span>
                </div>
                <span className="text-sm font-bold text-purple-600 capitalize">{systemStatus.backup}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 text-blue-500" />
                  <span className="text-sm font-medium">Sync</span>
                </div>
                <span className="text-sm font-bold text-blue-600 capitalize">{systemStatus.sync}</span>
              </div>
            </div>
            
            {/* Quick Settings */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-medium text-gray-900 mb-3">Quick Settings</h4>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mic className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">Voice Commands</span>
                  </div>
                  <button
                    onClick={() => setVoiceEnabled(!voiceEnabled)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      voiceEnabled ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      voiceEnabled ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <WifiOff className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">Offline Mode</span>
                  </div>
                  <button
                    onClick={() => setOfflineMode(!offlineMode)}
                    className={`w-12 h-6 rounded-full transition-colors ${
                      offlineMode ? 'bg-green-500' : 'bg-gray-300'
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                      offlineMode ? 'translate-x-6' : 'translate-x-0.5'
                    }`} />
                  </button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-gray-600" />
                    <span className="text-sm">Language</span>
                  </div>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="px-2 py-1 text-sm border border-gray-200 rounded-lg"
                  >
                    <option value="en">English</option>
                    <option value="bn">বাংলা</option>
                    <option value="hi">हिंदी</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          
          {/* Emergency Quick Actions */}
          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-3xl p-6 text-white">
            <div className="flex items-center gap-3 mb-4">
              <AlertCircle className="w-6 h-6" />
              <h3 className="font-bold text-lg">Emergency</h3>
            </div>
            <div className="space-y-3">
              <button className="w-full p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                <span className="font-medium">Call Emergency</span>
              </button>
              <button className="w-full p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4" />
                <span className="font-medium">Nearest Hospital</span>
              </button>
              <button className="w-full p-3 bg-white/20 backdrop-blur-sm rounded-xl hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
                <Users className="w-4 h-4" />
                <span className="font-medium">Emergency Contacts</span>
              </button>
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
