import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Video,
  ShoppingBag,
  FileText,
  ArrowUpRight,
  Clock,
  Heart,
  Activity,
  TrendingUp,
  Star,
  MessageCircle,
  Bell,
  Search,
  Filter,
  Download,
  Eye,
  Pill,
  Stethoscope,
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
  Zap,
  Target,
  Award,
  Shield,
  Brain,
  Bone,
  Baby,
  Thermometer,
  Droplet,
  Apple,
  Dumbbell,
  Moon,
  Sun,
  Cloud,
  Wind,
  Printer,
  Save,
} from 'lucide-react';
import { useNotification } from '../../components/core/NotificationProvider';

const healthStats = [
  { label: 'Health Score', value: '85/100', icon: Heart, color: 'bg-gradient-to-br from-red-500 to-red-600', change: '+5', trend: 'up' },
  { label: 'Active Prescriptions', value: '3', icon: Pill, color: 'bg-gradient-to-br from-blue-500 to-blue-600', change: 'Active', trend: 'stable' },
  { label: 'Upcoming Appointments', value: '2', icon: Calendar, color: 'bg-gradient-to-br from-[#5DBB63] to-[#4a9a4f]', change: 'This week', trend: 'up' },
  { label: 'Health Points', value: '1,250', icon: Award, color: 'bg-gradient-to-br from-purple-500 to-purple-600', change: '+150', trend: 'up' },
];

const upcomingAppointments = [
  { 
    id: 1, 
    doctor: 'Dr. Fatima Rahman', 
    specialty: 'Cardiology',
    time: '10:00 AM', 
    date: 'Feb 2, 2025', 
    type: 'In-person',
    duration: '30 min',
    status: 'confirmed',
    location: 'Dhaka Medical Hospital',
    notes: 'Follow-up consultation'
  },
  { 
    id: 2, 
    doctor: 'Dr. Karim Ahmed', 
    specialty: 'Dermatology',
    time: '02:00 PM', 
    date: 'Feb 5, 2025', 
    type: 'Video',
    duration: '45 min',
    status: 'confirmed',
    location: 'Online',
    notes: 'Initial consultation'
  },
];

const recentOrders = [
  { 
    id: 1, 
    items: 3, 
    total: 1250, 
    status: 'Delivered',
    date: 'Jan 28, 2025',
    medicines: ['Paracetamol', 'Vitamin C', 'Antibiotics']
  },
  { 
    id: 2, 
    items: 2, 
    total: 680, 
    status: 'Shipped',
    date: 'Jan 30, 2025',
    medicines: ['Blood Pressure Med', 'Diabetes Med']
  },
];

const healthMetrics = [
  { name: 'Blood Pressure', value: '120/80', status: 'normal', icon: Heart, unit: 'mmHg' },
  { name: 'Blood Sugar', value: '95', status: 'normal', icon: Droplet, unit: 'mg/dL' },
  { name: 'Heart Rate', value: '72', status: 'normal', icon: Activity, unit: 'bpm' },
  { name: 'Temperature', value: '98.6', status: 'normal', icon: Thermometer, unit: '°F' },
];

const medications = [
  { 
    name: 'Metformin', 
    dosage: '500mg', 
    frequency: 'Twice daily',
    nextDose: '2:00 PM',
    remaining: '15 days',
    doctor: 'Dr. Ahmed Hassan'
  },
  { 
    name: 'Lisinopril', 
    dosage: '10mg', 
    frequency: 'Once daily',
    nextDose: '8:00 PM',
    remaining: '30 days',
    doctor: 'Dr. Sarah Johnson'
  },
  { 
    name: 'Vitamin D', 
    dosage: '1000 IU', 
    frequency: 'Once daily',
    nextDose: '9:00 AM',
    remaining: '45 days',
    doctor: 'Dr. Emily Williams'
  },
];

const notifications = [
  { id: 1, type: 'appointment', message: 'Appointment reminder with Dr. Fatima Rahman tomorrow', time: '5 min ago', read: false, category: 'appointment', title: 'Appointment Reminder' },
  { id: 2, type: 'medication', message: 'Time to take your Vitamin D supplement', time: '1 hour ago', read: false, category: 'medication', title: 'Medication Reminder' },
  { id: 3, type: 'order', message: 'Your medicine order has been delivered', time: '2 hours ago', read: true, category: 'order', title: 'Order Delivered' },
];

const healthTips = [
  { id: 1, title: 'Stay Hydrated', description: 'Drink at least 8 glasses of water daily', icon: Droplet },
  { id: 2, title: 'Regular Exercise', description: '30 minutes of moderate exercise daily', icon: Dumbbell },
  { id: 3, title: 'Quality Sleep', description: 'Aim for 7-8 hours of sleep each night', icon: Moon },
];

export default function PatientDashboard() {
  const { showNotification } = useNotification();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');

  // Prescription download handler
  const downloadPrescription = (prescriptionId) => {
    // In a real app, this would fetch the prescription file
    showNotification('Prescription downloaded successfully!', 'success');
    // Simulate download
    const link = document.createElement('a');
    link.href = '#';
    link.download = `prescription_${prescriptionId}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Quick action handlers
  const handleQuickAction = (action) => {
    switch(action) {
      case 'book':
        showNotification('Redirecting to book appointment...', 'info');
        break;
      case 'consult':
        showNotification('Starting live consultation...', 'info');
        break;
      case 'pharmacy':
        showNotification('Opening pharmacy...', 'info');
        break;
      case 'records':
        showNotification('Loading health records...', 'info');
        break;
      default:
        showNotification('Action not implemented yet', 'warning');
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#111827]">Patient Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Ahmed</p>
        </div>
        <div className="flex items-center gap-3">
          <NotificationCenter />
          <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50">
            <Settings className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Health Score Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5DBB63] to-[#165028] p-6 text-white">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16" />
        <div className="relative flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold mb-2">Your Health Score</h2>
            <p className="text-white/90 mb-4">Great job! Your health is improving</p>
            <div className="flex items-center gap-4">
              <div className="text-3xl font-bold">85/100</div>
              <div className="flex items-center gap-1">
                <TrendingUp className="w-5 h-5" />
                <span className="text-sm">+5 from last month</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Heart className="w-32 h-32 text-white/20" />
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => handleQuickAction('book')}
          className="p-4 rounded-xl bg-gradient-to-br from-[#5DBB63] to-[#4a9a4f] text-white hover:shadow-lg transition-all cursor-pointer"
        >
          <Calendar className="w-6 h-6 mb-2" />
          <span className="text-sm font-medium">Book Doctor</span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => handleQuickAction('consult')}
          className="p-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-lg transition-all cursor-pointer"
        >
          <Video className="w-6 h-6 mb-2" />
          <span className="text-sm font-medium">Live Consult</span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => handleQuickAction('pharmacy')}
          className="p-4 rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white hover:shadow-lg transition-all cursor-pointer"
        >
          <ShoppingBag className="w-6 h-6 mb-2" />
          <span className="text-sm font-medium">Pharmacy</span>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          onClick={() => handleQuickAction('records')}
          className="p-4 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white hover:shadow-lg transition-all cursor-pointer"
        >
          <FileText className="w-6 h-6 mb-2" />
          <span className="text-sm font-medium">Health Records</span>
        </motion.div>
      </div>

      {/* Health Stats Cards */}
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
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm">
            <div className="p-6 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-[#111827] text-lg">Upcoming Appointments</h2>
                <Link to="/patient/appointments" className="text-[#5DBB63] font-medium text-sm flex items-center gap-1">
                  View all <ArrowUpRight className="w-4 h-4" />
                </Link>
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
                          <Stethoscope className="w-6 h-6 text-[#5DBB63]" />
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          apt.status === 'confirmed' ? 'bg-green-500' : 
                          apt.status === 'pending' ? 'bg-yellow-500' : 'bg-gray-400'
                        }`} />
                      </div>
                      <div>
                        <p className="font-medium text-[#111827] group-hover:text-[#5DBB63] transition-colors">
                          {apt.doctor}
                        </p>
                        <p className="text-sm text-gray-500">{apt.specialty}</p>
                        <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
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
                          <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                            <MapPin className="w-3 h-3" /> {apt.location}
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

          {/* Health Metrics */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-[#111827] text-lg">Health Metrics</h2>
              <button className="text-[#5DBB63] font-medium text-sm flex items-center gap-1">
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

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-semibold text-[#111827] text-lg">Recent Orders</h2>
              <Link to="/patient/orders" className="text-[#5DBB63] font-medium text-sm flex items-center gap-1">
                View all <ArrowUpRight className="w-4 h-4" />
              </Link>
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
                    <p className="text-xs text-gray-500 mt-1">{order.medicines.join(', ')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Medication Reminder */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-[#111827]">Medications</h3>
              <Link to="/patient/prescriptions" className="text-[#5DBB63] font-medium text-sm">
                View all
              </Link>
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
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">Next dose: {med.nextDose}</span>
                    <span className="text-amber-600 font-medium">{med.remaining} left</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Health Tips */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h3 className="font-semibold text-[#111827] mb-4">Daily Health Tips</h3>
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
                      notif.type === 'medication' ? 'bg-amber-500' :
                      'bg-green-500'
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
              <button 
                onClick={() => handleQuickAction('health-check')}
                className="w-full p-3 rounded-lg hover:bg-gray-50 text-left flex items-center gap-3"
              >
                <Heart className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Health Check-up</span>
              </button>
              <button 
                onClick={() => handleQuickAction('lab-reports')}
                className="w-full p-3 rounded-lg hover:bg-gray-50 text-left flex items-center gap-3"
              >
                <FileText className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Lab Reports</span>
              </button>
              <button 
                onClick={() => handleQuickAction('messages')}
                className="w-full p-3 rounded-lg hover:bg-gray-50 text-left flex items-center gap-3"
              >
                <MessageCircle className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Doctor Messages</span>
              </button>
              <button 
                onClick={() => handleQuickAction('download-records')}
                className="w-full p-3 rounded-lg hover:bg-gray-50 text-left flex items-center gap-3"
              >
                <Download className="w-4 h-4 text-gray-600" />
                <span className="text-sm">Download Records</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Health Activity Chart */}
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
                      style={{ width: `${(i * 15) % 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Moon className="w-5 h-5 text-blue-500" />
              <span className="font-medium">Sleep</span>
            </div>
            <div className="space-y-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, i) => (
                <div key={day} className="flex items-center gap-3">
                  <span className="text-sm text-gray-500 w-8">{day}</span>
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full" 
                      style={{ width: `${(i * 20) % 100}%` }}
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
                      style={{ width: `${(i * 25) % 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
