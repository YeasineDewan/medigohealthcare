import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  Video,
  ShoppingBag,
  FileText,
  Pill,
  User,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Bell,
  Stethoscope,
  Home,
  Clock,
  Heart,
  Activity,
  Award,
  CreditCard,
  Settings,
  MessageCircle,
  Download,
  Upload,
  ChevronDown,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  AlertCircle,
  XCircle,
  Phone,
  Mail,
  MapPin,
  Camera,
  Fingerprint,
  Weight,
  Ruler,
  Thermometer,
  Droplet,
  BarChart3,
  PieChart,
  TrendingUp,
  Baby,
  Shield,
  BookOpen,
  ArrowUpRight,
  RefreshCw,
  File,
  Image,
  Paperclip,
  Send,
  MoreHorizontal,
  Building,
  Wallet,
  CalendarClock,
  FlaskConical,
  TestTube,
  StickyNote,
  AlertTriangle,
  Info,
  CheckSquare,
  Square,
  Star,
  PhoneCall,
  MapPinned,
  Globe,
  Languages,
  Briefcase,
  GraduationCap,
} from 'lucide-react';

const menuItems = [
  { path: '/patient', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/patient/book', icon: Calendar, label: 'Book Appointment' },
  { path: '/patient/live-consult', icon: Video, label: '24/7 Live Consult' },
  { path: '/patient/appointments', icon: ClipboardList, label: 'My Appointments' },
  { path: '/patient/orders', icon: ShoppingBag, label: 'Pharmacy Orders' },
  { path: '/patient/records', icon: FileText, label: 'Health Records' },
  { path: '/patient/prescriptions', icon: Pill, label: 'Prescriptions' },
  { path: '/patient/profile', icon: User, label: 'Profile' },
];

const healthStats = [
  { label: 'Health Score', value: '85/100', icon: Heart, color: 'from-red-500 to-red-600', change: '+5', trend: 'up' },
  { label: 'Active Prescriptions', value: '3', icon: Pill, color: 'from-blue-500 to-blue-600', change: 'Active', trend: 'stable' },
  { label: 'Upcoming Appointments', value: '2', icon: Calendar, color: 'from-[#5DBB63] to-[#165028]', change: 'This week', trend: 'up' },
  { label: 'Health Points', value: '1,250', icon: Award, color: 'from-purple-500 to-purple-600', change: '+150', trend: 'up' },
];

const upcomingAppointments = [
  { id: 1, doctor: 'Dr. Fatima Rahman', specialty: 'Cardiology', time: '10:00 AM', date: 'Feb 2, 2025', type: 'In-person', duration: '30 min', status: 'confirmed', location: 'Dhaka Medical Hospital', notes: 'Follow-up consultation', doctorImage: null },
  { id: 2, doctor: 'Dr. Karim Ahmed', specialty: 'Dermatology', time: '02:00 PM', date: 'Feb 5, 2025', type: 'Video', duration: '45 min', status: 'confirmed', location: 'Online', notes: 'Initial consultation', doctorImage: null },
];

const recentOrders = [
  { id: 1, items: 3, total: 1250, status: 'Delivered', date: 'Jan 28, 2025', medicines: ['Paracetamol', 'Vitamin C', 'Antibiotics'] },
  { id: 2, items: 2, total: 680, status: 'Shipped', date: 'Jan 30, 2025', medicines: ['Blood Pressure Med', 'Diabetes Med'] },
];

const healthMetrics = [
  { name: 'Blood Pressure', value: '120/80', status: 'normal', icon: Heart, unit: 'mmHg' },
  { name: 'Blood Sugar', value: '95', status: 'normal', icon: Droplet, unit: 'mg/dL' },
  { name: 'Heart Rate', value: '72', status: 'normal', icon: Activity, unit: 'bpm' },
  { name: 'Temperature', value: '98.6', status: 'normal', icon: Thermometer, unit: '°F' },
];

const medications = [
  { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', nextDose: '2:00 PM', remaining: '15 days', doctor: 'Dr. Ahmed Hassan', instructions: 'Take with food' },
  { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', nextDose: '8:00 PM', remaining: '30 days', doctor: 'Dr. Sarah Johnson', instructions: 'Morning dose' },
  { name: 'Vitamin D', dosage: '1000 IU', frequency: 'Once daily', nextDose: '9:00 AM', remaining: '45 days', doctor: 'Dr. Emily Williams', instructions: 'With breakfast' },
];

const notifications = [
  { id: 1, type: 'appointment', message: 'Appointment reminder with Dr. Fatima Rahman tomorrow', time: '5 min ago', read: false },
  { id: 2, type: 'medication', message: 'Time to take your Vitamin D supplement', time: '1 hour ago', read: false },
  { id: 3, type: 'order', message: 'Your medicine order has been delivered', time: '2 hours ago', read: true },
  { id: 4, type: 'lab', message: 'Lab test results are ready for viewing', time: '5 hours ago', read: true },
  { id: 5, type: 'prescription', message: 'New prescription from Dr. Ahmed Hassan', time: '1 day ago', read: true },
];

const healthTips = [
  { id: 1, title: 'Stay Hydrated', description: 'Drink at least 8 glasses of water daily', icon: Droplet },
  { id: 2, title: 'Regular Exercise', description: '30 minutes of moderate exercise daily', icon: Activity },
  { id: 3, title: 'Quality Sleep', description: 'Aim for 7-8 hours of sleep each night', icon: Clock },
];

const quickActions = [
  { id: 'book', label: 'Book Appointment', icon: Calendar, path: '/patient/book', color: 'bg-emerald-500' },
  { id: 'consult', label: 'Video Consult', icon: Video, path: '/patient/live-consult', color: 'bg-blue-500' },
  { id: 'prescription', label: 'Upload Prescription', icon: Upload, path: '/patient/prescriptions', color: 'bg-purple-500' },
  { id: 'records', label: 'View Records', icon: FileText, path: '/patient/records', color: 'bg-orange-500' },
  { id: 'lab', label: 'Lab Tests', icon: FlaskConical, path: '/lab-tests', color: 'bg-cyan-500' },
  { id: 'order', label: 'Order Medicine', icon: ShoppingBag, path: '/patient/orders', color: 'bg-pink-500' },
];

export default function PatientLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const location = window.location.pathname;
  const navigate = (path) => { window.location.href = path; };

  const handleLogout = () => window.location.href = '/auth';

  const currentUser = {
    name: 'Ahmed Khan',
    email: 'ahmed.khan@email.com',
    phone: '+880 123 456 7890',
    avatar: null,
    role: 'Patient',
    memberSince: '2023-01-15',
    healthCardNumber: 'MED-2023-001234',
    bloodType: 'O+',
    dateOfBirth: '1990-05-15',
    gender: 'Male',
    address: 'House 45, Road 12, Dhanmondi, Dhaka 1209',
    emergencyContact: {
      name: 'Fatema Khan',
      relation: 'Wife',
      phone: '+880 987 654 3210'
    },
    insurance: {
      provider: 'Blue Cross Blue Shield',
      policyNumber: 'BCBS-2024-567890',
      validUntil: '2025-12-31'
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden lg:flex flex-col w-72 bg-[#165028] text-white fixed inset-y-0 left-0 z-40">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Medigo Healthcare Logo" className="w-10 h-10 object-contain" />
            <div className="flex flex-col">
              <span className="font-bold text-2xl text-white">Medigo</span>
              <span className="text-xs text-[#5DBB63] font-medium">Patient Portal</span>
            </div>
          </Link>
        </div>

        <div className="px-4 py-3 mx-3 mt-4 bg-white/10 rounded-xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-medium text-sm">{currentUser.name}</p>
              <p className="text-xs text-white/70">ID: 12345</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto mt-4">
          {menuItems.map((item) => {
            const isActive = location === item.path || (item.path !== '/patient' && location.startsWith(item.path));
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200 ${
                  isActive 
                    ? 'bg-[#5DBB63] text-white shadow-lg shadow-[#5DBB63]/30' 
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium text-sm">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-72 bg-[#165028] text-white overflow-y-auto">
            <div className="p-6 flex justify-between items-center border-b border-white/10">
              <div className="flex items-center gap-3">
                <img src="/logo.png" alt="Logo" className="w-8 h-8" />
                <span className="font-bold text-xl">Medigo</span>
              </div>
              <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-white/10 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 ${
                    location === item.path ? 'bg-[#5DBB63]' : 'text-white/80'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
              <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 w-full rounded-xl mt-4 text-white/80 hover:bg-white/10"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </nav>
          </aside>
        </div>
      )}

      <div className="flex-1 lg:ml-72">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu className="w-6 h-6" />
            </button>
            
            <div className="flex-1 max-w-md mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search doctors, appointments, records..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-100 border border-transparent rounded-xl focus:bg-white focus:border-[#5DBB63] focus:outline-none text-sm"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button 
                onClick={() => navigate('/patient/profile')}
                className="hidden sm:flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-right">
                  <p className="font-medium text-sm text-gray-900">{currentUser.name}</p>
                  <p className="text-xs text-gray-500">{currentUser.role}</p>
                </div>
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <PatientDashboardContent 
            currentUser={currentUser}
            healthStats={healthStats}
            upcomingAppointments={upcomingAppointments}
            recentOrders={recentOrders}
            healthMetrics={healthMetrics}
            medications={medications}
            notifications={notifications}
            healthTips={healthTips}
            quickActions={quickActions}
            selectedTimeRange={selectedTimeRange}
            setSelectedTimeRange={setSelectedTimeRange}
          />
        </main>
      </div>
    </div>
  );
}

function PatientDashboardContent({ 
  currentUser, 
  healthStats, 
  upcomingAppointments, 
  recentOrders, 
  healthMetrics, 
  medications, 
  notifications,
  healthTips,
  quickActions,
  selectedTimeRange,
  setSelectedTimeRange 
}) {
  const [activeSection, setActiveSection] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#111827]">Patient Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, {currentUser.name.split(' ')[0]}!</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#5DBB63]/10 rounded-lg">
            <Award className="w-5 h-5 text-[#5DBB63]" />
            <span className="font-medium text-[#5DBB63]">Gold Member</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <motion.div
            key={action.id}
            whileHover={{ scale: 1.02 }}
            onClick={() => window.location.href = action.path}
            className="cursor-pointer p-4 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-all"
          >
            <div className={`w-12 h-12 rounded-xl ${action.color} flex items-center justify-center mb-3`}>
              <action.icon className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-900">{action.label}</span>
          </motion.div>
        ))}
      </div>

      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5DBB63] to-[#165028] p-6 text-white">
        <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16" />
        <div className="relative flex items-center justify-between flex-wrap gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2">Your Health Score</h2>
            <p className="text-white/90 mb-4">Great job! Your health is improving</p>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold">85/100</div>
              <div className="flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full">
                <TrendingUp className="w-4 h-4" />
                <span className="text-sm font-medium">+5 from last month</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="relative">
              <Heart className="w-32 h-32 text-white/20" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-2xl font-bold">85%</p>
                  <p className="text-xs text-white/70">Excellent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {healthStats.map((stat, i) => (
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
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center group-hover:scale-110 transition-transform`}>
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

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-[#111827] text-lg">Upcoming Appointments</h2>
                <button 
                  onClick={() => window.location.href = '/patient/appointments'} 
                  className="text-[#5DBB63] font-medium text-sm flex items-center gap-1"
                >
                  View all <ArrowUpRight className="w-4 h-4" />
                </button>
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
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#5DBB63]/20 to-[#165028]/20 flex items-center justify-center">
                          <Stethoscope className="w-7 h-7 text-[#5DBB63]" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          apt.status === 'confirmed' ? 'bg-green-500' : 
                          apt.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`} />
                      </div>
                      <div>
                        <p className="font-semibold text-[#111827] group-hover:text-[#5DBB63] transition-colors">{apt.doctor}</p>
                        <p className="text-sm text-gray-500">{apt.specialty}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" /> {apt.date}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" /> {apt.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <Video className="w-3 h-3" /> {apt.type}
                          </span>
                        </div>
                        {apt.location && (
                          <p className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                            <MapPinned className="w-3 h-3" /> {apt.location}
                          </p>
                        )}
                      </div>
                    </div>
                    <button className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      apt.type === 'Video' 
                        ? 'bg-blue-500 text-white hover:bg-blue-600' 
                        : 'bg-[#5DBB63] text-white hover:bg-[#4a9a4f]'
                    }`}>
                      {apt.type === 'Video' ? 'Join Call' : 'View Details'}
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-[#111827] text-lg">Health Metrics</h2>
              <button 
                onClick={() => window.location.href = '/patient/records'}
                className="text-[#5DBB63] font-medium text-sm flex items-center gap-1"
              >
                Update <Edit className="w-4 h-4" />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {healthMetrics.map((metric, i) => (
                <div key={metric.name} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <metric.icon className="w-5 h-5 text-[#5DBB63]" />
                      <span className="font-medium text-[#111827]">{metric.name}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      metric.status === 'normal' ? 'bg-green-100 text-green-700' :
                      metric.status === 'high' ? 'bg-red-100 text-red-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {metric.status}
                    </span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-[#111827]">{metric.value}</span>
                    <span className="text-sm text-gray-500">{metric.unit}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-[#111827] text-lg">Recent Orders</h2>
              <button 
                onClick={() => window.location.href = '/patient/orders'}
                className="text-[#5DBB63] font-medium text-sm flex items-center gap-1"
              >
                View all <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div>
                    <p className="font-medium text-[#111827]">Order #{order.id}</p>
                    <p className="text-sm text-gray-500">{order.items} items · ৳{order.total}</p>
                    <p className="text-xs text-gray-400">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      order.status === 'Delivered' ? 'bg-green-100 text-green-700' :
                      order.status === 'Shipped' ? 'bg-blue-100 text-blue-700' :
                      'bg-yellow-100 text-yellow-700'
                    }`}>
                      {order.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-2">{order.medicines.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-[#111827] text-lg">Health Activity</h2>
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
            <div className="grid md:grid-cols-3 gap-6">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-[#5DBB63]" />
                  <span className="font-medium">Exercise</span>
                </div>
                <div className="space-y-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div key={day} className="flex items-center gap-3">
                      <span className="text-sm text-gray-500 w-8">{day}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-[#5DBB63] h-2 rounded-full" 
                          style={{ width: `${Math.random() * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <span className="font-medium">Sleep</span>
                </div>
                <div className="space-y-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div key={day} className="flex items-center gap-3">
                      <span className="text-sm text-gray-500 w-8">{day}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${Math.random() * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Droplet className="w-5 h-5 text-cyan-500" />
                  <span className="font-medium">Hydration</span>
                </div>
                <div className="space-y-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                    <div key={day} className="flex items-center gap-3">
                      <span className="text-sm text-gray-500 w-8">{day}</span>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-cyan-500 h-2 rounded-full" 
                          style={{ width: `${Math.random() * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#111827]">Medications</h3>
              <button 
                onClick={() => window.location.href = '/patient/prescriptions'}
                className="text-[#5DBB63] font-medium text-sm"
              >
                View all
              </button>
            </div>
            <div className="space-y-4">
              {medications.map((med, i) => (
                <div key={med.name} className="p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-medium text-[#111827]">{med.name}</p>
                      <p className="text-sm text-gray-500">{med.dosage} · {med.frequency}</p>
                    </div>
                    <Pill className="w-5 h-5 text-[#5DBB63]" />
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{med.instructions}</p>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Next: {med.nextDose}</span>
                    <span className="text-amber-600 font-medium">{med.remaining} left</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#111827]">Daily Health Tips</h3>
              <Award className="w-5 h-5 text-amber-500" />
            </div>
            <div className="space-y-3">
              {healthTips.map((tip, i) => (
                <div key={tip.id} className="p-3 rounded-lg bg-[#5DBB63]/10 hover:bg-[#5DBB63]/20 transition-colors">
                  <div className="flex items-start gap-3">
                    <tip.icon className="w-5 h-5 text-[#5DBB63] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-[#111827] text-sm">{tip.title}</p>
                      <p className="text-xs text-gray-600 mt-1">{tip.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#111827]">Notifications</h3>
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
            </div>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {notifications.slice(0, 5).map((notif) => (
                <div key={notif.id} className={`p-3 rounded-lg ${notif.read ? 'bg-gray-50' : 'bg-[#5DBB63]/10'}`}>
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      notif.type === 'appointment' ? 'bg-blue-500' :
                      notif.type === 'medication' ? 'bg-amber-500' :
                      notif.type === 'order' ? 'bg-green-500' :
                      notif.type === 'lab' ? 'bg-purple-500' :
                      'bg-orange-500'
                    }`} />
                    <div className="flex-1">
                      <p className="text-sm text-gray-700">{notif.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notif.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button 
              onClick={() => window.location.href = '/patient/notifications'}
              className="w-full mt-4 text-[#5DBB63] text-sm font-medium hover:text-[#165028]"
            >
              View all notifications
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-[#111827] mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <button 
                onClick={() => window.location.href = '/patient/records'}
                className="w-full p-3 rounded-lg hover:bg-gray-50 text-left flex items-center gap-3"
              >
                <FileText className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Download Health Report</span>
              </button>
              <button 
                onClick={() => window.location.href = '/patient/profile'}
                className="w-full p-3 rounded-lg hover:bg-gray-50 text-left flex items-center gap-3"
              >
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Update Profile</span>
              </button>
              <button 
                onClick={() => window.location.href = '/patient/appointments'}
                className="w-full p-3 rounded-lg hover:bg-gray-50 text-left flex items-center gap-3"
              >
                <CalendarClock className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Appointment History</span>
              </button>
              <button 
                onClick={() => window.location.href = '/patient/orders'}
                className="w-full p-3 rounded-lg hover:bg-gray-50 text-left flex items-center gap-3"
              >
                <ShoppingBag className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Order History</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}