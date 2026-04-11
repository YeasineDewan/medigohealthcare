import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bell, Search, Menu, X, Home, Settings, HelpCircle, LogOut,
  User, Mail, Phone, MapPin, Calendar, Clock, TrendingUp,
  Activity, Users, DollarSign, FileText, Shield, Globe,
  Wifi, Battery, Signal, ChevronDown, MoreVertical,
  Sun, Moon, Monitor, Smartphone, Tablet
} from 'lucide-react';
import AdvancedSidebar from './AdvancedSidebar';

export default function AdvancedAdminLayout({ children }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPath, setCurrentPath] = useState('/admin/dashboard');

  const handleNavigate = (path) => {
    setCurrentPath(path);
    navigate(path);
  };

  const notifications = [
    { id: 1, title: 'New Patient Registration', message: 'John Doe registered for medical checkup', time: '5 min ago', type: 'info' },
    { id: 2, title: 'Payment Received', message: 'BDT 5,000 received from patient #1234', time: '15 min ago', type: 'success' },
    { id: 3, title: 'Report Ready', message: 'Blood test report for patient #5678 is ready', time: '1 hour ago', type: 'info' },
    { id: 4, title: 'System Update', message: 'System will be updated tonight at 2:00 AM', time: '2 hours ago', type: 'warning' },
    { id: 5, title: 'Backup Completed', message: 'Daily backup completed successfully', time: '3 hours ago', type: 'success' }
  ];

  const quickStats = [
    { title: 'Total Patients', value: '1,234', change: '+12%', icon: Users, color: 'blue' },
    { title: 'Today\'s Revenue', value: 'BDT 45,678', change: '+8%', icon: DollarSign, color: 'green' },
    { title: 'Pending Reports', value: '23', change: '-5%', icon: FileText, color: 'orange' },
    { title: 'Active Staff', value: '45', change: '+2%', icon: Shield, color: 'purple' }
  ];

  const colorClasses = {
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    purple: 'bg-purple-500'
  };

  return (
    <div className="h-screen flex bg-gray-50">
      {/* Sidebar */}
      <AdvancedSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        onNavigate={handleNavigate}
        currentPath={currentPath}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Left Section */}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setSidebarOpen(!sidebarOpen)}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Menu className="w-5 h-5 text-gray-600" />
                </button>
                
                {/* Search Bar */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search anything..."
                    className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-4">
                {/* Quick Stats */}
                <div className="hidden lg:flex items-center gap-6 mr-6">
                  {quickStats.map((stat, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${colorClasses[stat.color]}`}></div>
                      <div>
                        <p className="text-xs text-gray-500">{stat.title}</p>
                        <p className="text-sm font-semibold text-gray-900">{stat.value}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
                  >
                    <Bell className="w-5 h-5 text-gray-600" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                  </button>

                  <AnimatePresence>
                    {showNotifications && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-96 bg-white rounded-xl shadow-xl border border-gray-200 z-50"
                      >
                        <div className="p-4 border-b border-gray-200">
                          <h3 className="font-semibold text-gray-900">Notifications</h3>
                          <p className="text-sm text-gray-500">You have 5 new notifications</p>
                        </div>
                        <div className="max-h-96 overflow-y-auto">
                          {notifications.map((notification) => (
                            <div key={notification.id} className="p-4 hover:bg-gray-50 border-b border-gray-100">
                              <div className="flex items-start gap-3">
                                <div className={`w-2 h-2 rounded-full mt-2 ${
                                  notification.type === 'success' ? 'bg-green-500' :
                                  notification.type === 'warning' ? 'bg-orange-500' :
                                  notification.type === 'error' ? 'bg-red-500' :
                                  'bg-blue-500'
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
                        <div className="p-4 border-t border-gray-200">
                          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                            View all notifications
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* User Menu */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <div className="hidden md:block text-left">
                      <p className="text-sm font-medium text-gray-900">Admin User</p>
                      <p className="text-xs text-gray-500">admin@medigo.com</p>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-600" />
                  </button>

                  <AnimatePresence>
                    {showUserMenu && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-50"
                      >
                        <div className="p-4 border-b border-gray-200">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">Admin User</p>
                              <p className="text-sm text-gray-500">admin@medigo.com</p>
                            </div>
                          </div>
                        </div>
                        <div className="p-2">
                          <button className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-lg flex items-center gap-3">
                            <User className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">Profile</span>
                          </button>
                          <button className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-lg flex items-center gap-3">
                            <Settings className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">Settings</span>
                          </button>
                          <button className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-lg flex items-center gap-3">
                            <HelpCircle className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">Help</span>
                          </button>
                          <button className="w-full px-4 py-2 text-left hover:bg-gray-100 rounded-lg flex items-center gap-3">
                            <LogOut className="w-4 h-4 text-gray-600" />
                            <span className="text-sm text-gray-700">Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
              <span>Version 2.0.1</span>
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
