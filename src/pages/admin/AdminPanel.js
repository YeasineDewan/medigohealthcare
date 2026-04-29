import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  UserCheck,
  Calendar,
  DollarSign,
  TrendingUp,
  Activity,
  Shield,
  Settings,
  BarChart3,
  PieChart,
  Clock,
  CheckCircle,
  AlertCircle,
  TrendingDown,
  Zap,
  Database,
  Server,
  Wifi,
  RefreshCw,
  Filter,
  Search,
  Download,
  Upload,
  Eye,
  Edit3,
  Trash2,
  Plus,
  ChevronRight,
  Bell,
  LogOut,
  Menu,
  X,
  ChevronDown,
  FileText,
  Stethoscope,
  Heart,
  Brain,
  Baby,
  Pill,
  TestTube,
  Award,
  Star,
  ThumbsUp,
  ThumbsDown
} from 'lucide-react';

const AdminPanel = () => {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(5);
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');
  const [darkMode, setDarkMode] = useState(false);

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    todayAppointments: 0,
    monthlyRevenue: 0,
    systemUptime: '99.9%',
    activeUsers: 0,
    serverLoad: '45%',
    storageUsed: '67%',
    databaseConnections: 23
  });

  const [recentActivities, setRecentActivities] = useState([]);
  const [systemAlerts, setSystemAlerts] = useState([]);
  const [topPerformers, setTopPerformers] = useState([]);
  const [departmentStats, setDepartmentStats] = useState([]);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(() => {
      fetchDashboardData();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        setStats({
          totalUsers: 1247,
          totalDoctors: 45,
          totalPatients: 1202,
          totalAppointments: 8432,
          todayAppointments: 127,
          monthlyRevenue: 45678,
          systemUptime: '99.9%',
          activeUsers: 234,
          serverLoad: '45%',
          storageUsed: '67%',
          databaseConnections: 23
        });
        setRecentActivities([
          { id: 1, type: 'user', action: 'New user registered', user: 'John Doe', time: '2 minutes ago', status: 'success' },
          { id: 2, type: 'appointment', action: 'Appointment cancelled', user: 'Dr. Smith', time: '5 minutes ago', status: 'warning' },
          { id: 3, type: 'system', action: 'Database backup completed', user: 'System', time: '10 minutes ago', status: 'success' },
          { id: 4, type: 'security', action: 'Failed login attempt', user: 'Unknown', time: '15 minutes ago', status: 'error' },
          { id: 5, type: 'user', action: 'Doctor profile updated', user: 'Dr. Johnson', time: '20 minutes ago', status: 'success' }
        ]);
        setSystemAlerts([
          { id: 1, type: 'warning', message: 'High server load detected', time: '5 minutes ago' },
          { id: 2, type: 'error', message: 'Database connection timeout', time: '15 minutes ago' },
          { id: 3, type: 'info', message: 'System update available', time: '1 hour ago' }
        ]);
        setTopPerformers([
          { id: 1, name: 'Dr. Sarah Johnson', role: 'Doctor', appointments: 156, rating: 4.9, revenue: 12345 },
          { id: 2, name: 'Dr. Michael Chen', role: 'Doctor', appointments: 142, rating: 4.8, revenue: 11234 },
          { id: 3, name: 'Emily Davis', role: 'Nurse', patients: 89, rating: 4.7, efficiency: 98 }
        ]);
        setDepartmentStats([
          { name: 'Cardiology', patients: 345, appointments: 1234, revenue: 45678 },
          { name: 'Neurology', patients: 234, appointments: 876, revenue: 34567 },
          { name: 'Orthopedics', patients: 189, appointments: 654, revenue: 23456 },
          { name: 'Pediatrics', patients: 434, appointments: 1567, revenue: 56789 }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color = 'blue', change, subtitle, trend }) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      red: 'from-red-500 to-red-600',
      yellow: 'from-yellow-500 to-yellow-600',
      purple: 'from-purple-500 to-purple-600',
      orange: 'from-orange-500 to-orange-600'
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className={`bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${colors[color]}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">{title}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
            </div>
          </div>
          {change !== undefined && (
            <div className={`flex items-center space-x-1 ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend === 'up' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
              <span className="text-sm font-medium">{Math.abs(change)}%</span>
            </div>
          )}
        </div>
      </motion.div>
    );
  };

  const Sidebar = () => (
    <motion.div
      initial={{ x: -300 }}
      animate={{ x: sidebarOpen ? 0 : -300 }}
      className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white z-50 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}
    >
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Admin Panel</h2>
            <p className="text-xs text-gray-400">Healthcare Management</p>
          </div>
        </div>

        <nav className="space-y-2">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'users', label: 'Users', icon: Users },
            { id: 'doctors', label: 'Doctors', icon: UserCheck },
            { id: 'patients', label: 'Patients', icon: Users },
            { id: 'appointments', label: 'Appointments', icon: Calendar },
            { id: 'billing', label: 'Billing', icon: DollarSign },
            { id: 'medical-records', label: 'Medical Records', icon: FileText },
            { id: 'analytics', label: 'Analytics', icon: PieChart },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-blue-600 text-white'
                  : 'hover:bg-gray-700 text-gray-300'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </motion.div>
  );

  const Header = () => (
    <motion.div
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between"
    >
      <div className="flex items-center space-x-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search users, appointments, patients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <select
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>

        <button
          onClick={() => setDarkMode(!darkMode)}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        <div className="relative">
          <button className="p-2 rounded-lg hover:bg-gray-100 relative">
            <Bell className="w-5 h-5" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {notifications}
              </span>
            )}
          </button>
        </div>

        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>

        <div className="flex items-center space-x-3 pl-4 border-l border-gray-300">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
          <div>
            <p className="text-sm font-medium text-gray-900">Admin User</p>
            <p className="text-xs text-gray-500">admin@medigo.com</p>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <LogOut className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const OverviewSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Users" value={stats.totalUsers.toLocaleString()} icon={Users} color="blue" change={12.5} trend="up" />
        <StatCard title="Total Doctors" value={stats.totalDoctors} icon={UserCheck} color="green" change={8.2} trend="up" />
        <StatCard title="Total Patients" value={stats.totalPatients.toLocaleString()} icon={Users} color="purple" change={15.3} trend="up" />
        <StatCard title="Total Appointments" value={stats.totalAppointments.toLocaleString()} icon={Calendar} color="orange" />
        <StatCard title="Today's Appointments" value={stats.todayAppointments} icon={Clock} color="yellow" />
        <StatCard title="Monthly Revenue" value={`$${stats.monthlyRevenue.toLocaleString()}`} icon={DollarSign} color="green" change={23.4} trend="up" />
        <StatCard title="System Uptime" value={stats.systemUptime} icon={Activity} color="blue" subtitle="Last 30 days" />
        <StatCard title="Active Users" value={stats.activeUsers} icon={Wifi} color="purple" />
        <StatCard title="Server Load" value={stats.serverLoad} icon={Server} color="orange" />
        <StatCard title="Storage Used" value={stats.storageUsed} icon={Database} color="red" />
        <StatCard title="DB Connections" value={stats.databaseConnections} icon={Database} color="blue" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Activity className="w-5 h-5 mr-2 text-blue-600" />
            Recent Activity
          </h3>
          <div className="space-y-3">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' :
                    activity.status === 'error' ? 'bg-red-500' : 'bg-blue-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.user} • {activity.time}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  activity.type === 'user' ? 'bg-blue-100 text-blue-800' :
                  activity.type === 'appointment' ? 'bg-green-100 text-green-800' :
                  activity.type === 'system' ? 'bg-purple-100 text-purple-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {activity.type}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-orange-600" />
            System Alerts
          </h3>
          <div className="space-y-3">
            {systemAlerts.map((alert) => (
              <div key={alert.id} className={`flex items-center justify-between p-3 rounded-lg border ${
                alert.type === 'error' ? 'bg-red-50 border-red-200' :
                alert.type === 'warning' ? 'bg-yellow-50 border-yellow-200' :
                'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-center space-x-3">
                  {alert.type === 'error' ? <X className="w-4 h-4 text-red-600" /> :
                   alert.type === 'warning' ? <AlertCircle className="w-4 h-4 text-yellow-600" /> :
                   <Bell className="w-4 h-4 text-blue-600" />}
                  <div>
                    <p className="font-medium text-gray-900">{alert.message}</p>
                    <p className="text-sm text-gray-600">{alert.time}</p>
                  </div>
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-800">View Details</button>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );

  const TopPerformersSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Award className="w-5 h-5 mr-2 text-yellow-600" />
        Top Performers
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Name</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Role</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Performance</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Rating</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Revenue</th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {topPerformers.map((performer, index) => (
              <tr key={performer.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                    <span className="font-medium text-gray-900">{performer.name}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {performer.role}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">{performer.appointments || performer.patients}</span>
                    <span className="text-sm text-gray-600">
                      {performer.role === 'Doctor' ? 'appointments' : 'patients'}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="font-medium">{performer.rating}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className="font-medium text-green-600">${performer.revenue.toLocaleString()}</span>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center space-x-2">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );

  const DepartmentStatsSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Stethoscope className="w-5 h-5 mr-2 text-blue-600" />
        Department Statistics
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {departmentStats.map((dept, index) => (
          <div key={index} className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">{dept.name}</h4>
              <div className="flex items-center space-x-2">
                <ThumbsUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600">+12%</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Patients</span>
                <span className="font-medium">{dept.patients}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Appointments</span>
                <span className="font-medium">{dept.appointments}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Revenue</span>
                <span className="font-medium text-green-600">${dept.revenue.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className={`transition-all duration-300 ${sidebarOpen ? 'lg:ml-64' : 'lg:ml-0'}`}>
        <Header />
        <main className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600">Complete healthcare system management</p>
          </div>

          {activeSection === 'overview' && <OverviewSection />}
          {activeSection === 'users' && <TopPerformersSection />}
          {activeSection === 'doctors' && <TopPerformersSection />}
          {activeSection === 'patients' && <TopPerformersSection />}
          {activeSection === 'appointments' && <TopPerformersSection />}
          {activeSection === 'billing' && <TopPerformersSection />}
          {activeSection === 'medical-records' && <TopPerformersSection />}
          {activeSection === 'analytics' && <DepartmentStatsSection />}
          {activeSection === 'settings' && <DepartmentStatsSection />}
        </main>
      </div>
    </div>
  );
};

export default AdminPanel;
