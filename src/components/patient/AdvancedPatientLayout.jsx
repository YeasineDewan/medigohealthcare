import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Home, Calendar, Clock, Heart, Activity, FileText, Download, Upload,
  Bell, Settings, Search, Filter, Plus, Edit, Trash2, Save, X, ChevronDown,
  ChevronRight, TrendingUp, TrendingDown, AlertCircle, CheckCircle, XCircle, Star,
  Phone, Mail, MapPin, CreditCard, Shield, Award, Target, Zap,
  BarChart, PieChart, LineChart, Stethoscope, Pill, FlaskConical,
  Microscope, TestTube, Clipboard, ClipboardCheck, Camera, Video,
  MessageSquare, PhoneCall, VideoOff, Mic, MicOff, Wifi, Battery,
  Sun, Moon, Globe, Languages, BookOpen, GraduationCap, Briefcase,
  Building, Hospital, Users, UserCheck, UserPlus, UserMinus,
  FileSearch, FileDown, FileUp, FileSignature, Receipt, Wallet, PiggyBank, DollarSign, ShoppingCart, Package,
  Truck, MapPin as MapPinIcon, Navigation, User, LogOut, Menu,
  HelpCircle, ChevronLeft, ChevronUp, ChevronDown as ChevronDownIcon,
  MoreVertical, MoreHorizontal, Eye, EyeOff, Badge, Fingerprint, ShieldCheck, ShieldAlert, ShieldX,
  Building2, Warehouse, Store, 
  Package as PackageIcon, Truck as TruckIcon, ShoppingBasket,
  CreditCard as CreditCardIcon, Wallet as WalletIcon, Receipt as ReceiptIcon,
  FileText as FileTextIcon, FileDown as FileDownIcon, FileUp as FileUpIcon,
  Download as DownloadIcon, Upload as UploadIcon, Search as SearchIcon,
  Filter as FilterIcon, Plus as PlusIcon, Edit as EditIcon, Trash2 as Trash2Icon,
  Save as SaveIcon, X as XIcon, Bell as BellIcon, Settings as SettingsIcon,
  HelpCircle as HelpCircleIcon, LogOut as LogOutIcon, Menu as MenuIcon
} from 'lucide-react';

const patientMenuItems = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    icon: Home,
    path: '/patient/dashboard',
    color: 'blue'
  },
  {
    id: 'profile',
    title: 'My Profile',
    icon: User,
    path: '/patient/profile',
    color: 'purple'
  },
  {
    id: 'appointments',
    title: 'Appointments',
    icon: Calendar,
    path: '/patient/appointments',
    color: 'green'
  },
  {
    id: 'medical-records',
    title: 'Medical Records',
    icon: FileText,
    path: '/patient/records',
    color: 'orange'
  },
  {
    id: 'prescriptions',
    title: 'Prescriptions',
    icon: FileText,
    path: '/patient/prescriptions',
    color: 'red'
  },
  {
    id: 'lab-results',
    title: 'Lab Results',
    icon: TestTube,
    path: '/patient/lab-results',
    color: 'teal'
  },
  {
    id: 'billing',
    title: 'Billing & Payments',
    icon: CreditCard,
    path: '/patient/billing',
    color: 'indigo'
  },
  {
    id: 'insurance',
    title: 'Insurance',
    icon: Shield,
    path: '/patient/insurance',
    color: 'pink'
  },
  {
    id: 'pharmacy',
    title: 'Pharmacy',
    icon: Pill,
    path: '/patient/pharmacy',
    color: 'emerald'
  },
  {
    id: 'orders',
    title: 'My Orders',
    icon: Package,
    path: '/patient/orders',
    color: 'cyan'
  },
  {
    id: 'consultation',
    title: 'Video Consultation',
    icon: Video,
    path: '/patient/live-consult',
    color: 'violet'
  },
  {
    id: 'messages',
    title: 'Messages',
    icon: MessageSquare,
    path: '/patient/messages',
    color: 'amber'
  },
  {
    id: 'health-tracking',
    title: 'Health Tracking',
    icon: Activity,
    path: '/patient/health-tracking',
    color: 'rose'
  },
  {
    id: 'emergency',
    title: 'Emergency',
    icon: AlertCircle,
    path: '/patient/emergency',
    color: 'red'
  },
  {
    id: 'help-support',
    title: 'Help & Support',
    icon: HelpCircle,
    path: '/patient/help',
    color: 'gray'
  },
  {
    id: 'settings',
    title: 'Settings',
    icon: Settings,
    path: '/patient/settings',
    color: 'slate'
  }
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    hover: 'hover:bg-blue-100',
    active: 'bg-blue-100 text-blue-700',
    border: 'border-blue-200',
    gradient: 'from-blue-500 to-blue-600'
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    hover: 'hover:bg-purple-100',
    active: 'bg-purple-100 text-purple-700',
    border: 'border-purple-200',
    gradient: 'from-purple-500 to-purple-600'
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    hover: 'hover:bg-green-100',
    active: 'bg-green-100 text-green-700',
    border: 'border-green-200',
    gradient: 'from-green-500 to-green-600'
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    hover: 'hover:bg-orange-100',
    active: 'bg-orange-100 text-orange-700',
    border: 'border-orange-200',
    gradient: 'from-orange-500 to-orange-600'
  },
  red: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    hover: 'hover:bg-red-100',
    active: 'bg-red-100 text-red-700',
    border: 'border-red-200',
    gradient: 'from-red-500 to-red-600'
  },
  teal: {
    bg: 'bg-teal-50',
    text: 'text-teal-600',
    hover: 'hover:bg-teal-100',
    active: 'bg-teal-100 text-teal-700',
    border: 'border-teal-200',
    gradient: 'from-teal-500 to-teal-600'
  },
  indigo: {
    bg: 'bg-indigo-50',
    text: 'text-indigo-600',
    hover: 'hover:bg-indigo-100',
    active: 'bg-indigo-100 text-indigo-700',
    border: 'border-indigo-200',
    gradient: 'from-indigo-500 to-indigo-600'
  },
  pink: {
    bg: 'bg-pink-50',
    text: 'text-pink-600',
    hover: 'hover:bg-pink-100',
    active: 'bg-pink-100 text-pink-700',
    border: 'border-pink-200',
    gradient: 'from-pink-500 to-pink-600'
  },
  emerald: {
    bg: 'bg-emerald-50',
    text: 'text-emerald-600',
    hover: 'hover:bg-emerald-100',
    active: 'bg-emerald-100 text-emerald-700',
    border: 'border-emerald-200',
    gradient: 'from-emerald-500 to-emerald-600'
  },
  cyan: {
    bg: 'bg-cyan-50',
    text: 'text-cyan-600',
    hover: 'hover:bg-cyan-100',
    active: 'bg-cyan-100 text-cyan-700',
    border: 'border-cyan-200',
    gradient: 'from-cyan-500 to-cyan-600'
  },
  violet: {
    bg: 'bg-violet-50',
    text: 'text-violet-600',
    hover: 'hover:bg-violet-100',
    active: 'bg-violet-100 text-violet-700',
    border: 'border-violet-200',
    gradient: 'from-violet-500 to-violet-600'
  },
  amber: {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    hover: 'hover:bg-amber-100',
    active: 'bg-amber-100 text-amber-700',
    border: 'border-amber-200',
    gradient: 'from-amber-500 to-amber-600'
  },
  rose: {
    bg: 'bg-rose-50',
    text: 'text-rose-600',
    hover: 'hover:bg-rose-100',
    active: 'bg-rose-100 text-rose-700',
    border: 'border-rose-200',
    gradient: 'from-rose-500 to-rose-600'
  },
  gray: {
    bg: 'bg-gray-50',
    text: 'text-gray-600',
    hover: 'hover:bg-gray-100',
    active: 'bg-gray-100 text-gray-700',
    border: 'border-gray-200',
    gradient: 'from-gray-500 to-gray-600'
  },
  slate: {
    bg: 'bg-slate-50',
    text: 'text-slate-600',
    hover: 'hover:bg-slate-100',
    active: 'bg-slate-100 text-slate-700',
    border: 'border-slate-200',
    gradient: 'from-slate-500 to-slate-600'
  }
};

export default function AdvancedPatientLayout({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const notifications = [
    { id: 1, title: 'Appointment Reminder', message: 'Your appointment is tomorrow at 10:00 AM', time: '2 hours ago', type: 'reminder' },
    { id: 2, title: 'Lab Results Ready', message: 'Your blood test results are available', time: '1 day ago', type: 'info' },
    { id: 3, title: 'Payment Due', message: 'Your consultation payment is due', time: '2 days ago', type: 'warning' },
    { id: 4, title: 'New Message', message: 'Dr. Ahmed sent you a message', time: '3 days ago', type: 'message' }
  ];

  const patientInfo = {
    name: 'John Doe',
    email: 'john.doe@email.com',
    phone: '+8801234567890',
    bloodGroup: 'O+',
    lastVisit: '2024-01-15',
    upcomingAppointment: '2024-01-20'
  };

  const handleNavigate = (path) => {
    navigate(path);
  };

  const filteredMenuItems = patientMenuItems.filter(item =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
        sidebarOpen ? 'w-64' : 'w-20'
      } shadow-xl`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {sidebarOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center gap-3"
              >
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-900">Medigo</h2>
                  <p className="text-xs text-gray-500">Patient Portal</p>
                </div>
              </motion.div>
            )}
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {sidebarOpen ? <ChevronLeft className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
            </button>
          </div>

          {/* Search */}
          {sidebarOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4"
            >
              <div className="relative">
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search menu..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </motion.div>
          )}
        </div>

        {/* Patient Info */}
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="p-4 border-b border-gray-200"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{patientInfo.name}</p>
                <p className="text-sm text-gray-500">{patientInfo.email}</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                    {patientInfo.bloodGroup}
                  </span>
                  <span className="text-xs text-gray-500">
                    Last visit: {patientInfo.lastVisit}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Menu Items */}
        <div className="p-4 overflow-y-auto h-[calc(100%-280px)]">
          <div className="space-y-2">
            {filteredMenuItems.map((item, index) => {
              const colors = colorClasses[item.color];
              const isActive = location.pathname === item.path;

              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  onClick={() => handleNavigate(item.path)}
                  className={`w-full p-3 rounded-lg transition-all duration-200 group ${
                    isActive ? colors.active : colors.hover
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg transition-all duration-200 ${
                      isActive ? 'bg-white shadow-md' : colors.bg
                    }`}>
                      <item.icon className={`w-5 h-5 ${isActive ? colors.text : colors.text}`} />
                    </div>
                    {sidebarOpen && (
                      <span className={`font-medium text-sm ${isActive ? colors.text : colors.text}`}>
                        {item.title}
                      </span>
                    )}
                    {isActive && sidebarOpen && (
                      <ChevronRight className={`w-4 h-4 ${colors.text} ml-auto`} />
                    )}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 mt-auto">
          <button
            onClick={() => navigate('/')}
            className="w-full p-3 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors flex items-center gap-3"
          >
            <LogOut className="w-5 h-5 text-gray-600" />
            {sidebarOpen && <span className="text-sm font-medium text-gray-700">Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-gray-900">
                  {patientMenuItems.find(item => item.path === location.pathname)?.title || 'Dashboard'}
                </h1>
              </div>
              <div className="flex items-center gap-4">
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <BellIcon className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>

                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-200 z-50"
                      >
                        <div className="p-4 border-b border-gray-200">
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                          <p className="text-sm text-gray-500">You have {notifications.length} notifications</p>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.map((notification) => (
                            <div key={notification.id} className="p-4 hover:bg-gray-50 border-b border-gray-100">
                              <div className="flex items-start gap-3">
                                <div className={`w-2 h-2 rounded-full mt-2 ${
                                  notification.type === 'reminder' ? 'bg-blue-500' :
                                  notification.type === 'info' ? 'bg-green-500' :
                                  notification.type === 'warning' ? 'bg-orange-500' :
                                  'bg-purple-500'
                                }`}></div>
                                <div className="flex-1">
                                  <p className="font-medium text-gray-900">{notification.title}</p>
                                  <p className="text-sm text-gray-600">{notification.message}</p>
                                  <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Theme Toggle */}
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  {darkMode ? <Sun className="w-5 h-5 text-gray-600" /> : <Moon className="w-5 h-5 text-gray-600" />}
                </button>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6">
            {children}
          </div>
        </main>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>© 2024 Medigo Healthcare</span>
              <span>•</span>
              <span>Patient Portal v2.0</span>
            </div>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Wifi className="w-4 h-4 text-green-500" />
                <span>Connected</span>
              </div>
              <div className="flex items-center gap-1">
                <Battery className="w-4 h-4 text-green-500" />
                <span>85%</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-4 h-4 text-gray-400" />
                <span>{new Date().toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
