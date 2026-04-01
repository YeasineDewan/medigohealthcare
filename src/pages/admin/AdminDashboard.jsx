import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAdminData } from '../../hooks/useAdminData';
import { 
  Users, Stethoscope, Calendar, ShoppingCart, TrendingUp, 
  ArrowUpRight, Package, Activity, DollarSign, AlertTriangle,
  Clock, BarChart3, PieChart, Filter, Search, Bell,
  FileText, FlaskConical, Heart, Brain, Bone, Ambulance,
  MessageSquare, Megaphone, CreditCard, Calculator, Briefcase,
  Eye, Download, RefreshCw, Settings, ChevronRight,
  UserCheck, Shield, Building, Mail, Video, Award,
  Target, Zap, TrendingDown, ArrowDownRight, Hospital,
  Pill, Beaker, FileSpreadsheet, Phone, MapPin,
  Star, ThumbsUp, AlertCircle, CheckCircle, XCircle
} from 'lucide-react';

export default function ProfessionalAdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [searchQuery, setSearchQuery] = useState('');
  const [notifications, setNotifications] = useState(5);
  const [currentTime, setCurrentTime] = useState(new Date());

  const {
    stats,
    recentActivity,
    upcomingAppointments,
    departmentStats,
    loading,
    error,
    refetch
  } = useAdminData();

  const quickActions = [
    { icon: Users, label: 'Manage Banners', color: 'from-indigo-500 to-indigo-600', path: '/admin/banners', description: 'Update promotional banners' },
    { icon: Bell, label: 'Manage Notices', color: 'from-orange-500 to-orange-600', path: '/admin/notices', description: 'Site notifications' },
    { icon: Stethoscope, label: 'Doctors', color: 'from-green-500 to-green-600', path: '/admin/doctors', description: 'Manage doctors' },
    { icon: Users, label: 'Patients', color: 'from-blue-500 to-blue-600', path: '/admin/patients', description: 'Patient management' },
    { icon: Calendar, label: 'Appointments', color: 'from-purple-500 to-purple-600', path: '/admin/appointments', description: 'Schedule management' },
    { icon: Package, label: 'Inventory', color: 'from-pink-500 to-pink-600', path: '/admin/inventory', description: 'Stock management' }
  ];

  useEffect(() => {
    // Update current time
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const StatCard = ({ icon: Icon, label, value, change, changeType, color, iconBg, description }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
      className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}>
          <Icon className="w-6 h-6" />
        </div>
        {change && (
          <div className={`flex items-center text-sm font-medium px-2 py-1 rounded-full ${
            changeType === 'positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {changeType === 'positive' ? (
              <ArrowUpRight className="w-4 h-4 mr-1" />
            ) : (
              <ArrowDownRight className="w-4 h-4 mr-1" />
            )}
            {change}
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{label}</p>
        <p className="text-3xl font-bold text-gray-900 mb-1">{value}</p>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <div className="relative mb-8">
            <div className="w-24 h-24 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-24 h-24 border-4 border-transparent border-b-purple-600 rounded-full animate-spin mx-auto -ml-1"></div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Activity className="w-8 h-8 text-blue-500 animate-pulse" />
              <h3 className="text-2xl font-bold text-gray-900">Loading Dashboard Data</h3>
            </div>
            <p className="text-lg text-gray-600">Fetching real-time healthcare metrics and statistics...</p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-ping"></div>
              <span>Connected to backend</span>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-8">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md bg-white rounded-2xl p-8 shadow-xl border"
        >
          <AlertCircle className="w-16 h-16 text-orange-500 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-gray-900 mb-2">Data Load Warning</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <div className="space-x-3">
            <button 
              onClick={refetch}
              className="px-6 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors"
            >
              Retry
            </button>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
            >
              Reload Page
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              Professional Dashboard
            </h1>
            <p className="text-gray-600 text-lg">
              Welcome back! Here's your comprehensive healthcare overview at {currentTime.toLocaleTimeString()}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm text-gray-500">System Status</p>
              <p className="text-lg font-semibold text-green-600 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                All Systems Operational
              </p>
            </div>
          </div>
        </div>

        {/* Quick Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-default"
          >
            <p className="text-2xl font-bold text-blue-600">{stats.bedOccupancy ?? '--'}%</p>
            <p className="text-xs text-gray-600">Bed Occupancy</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-default"
          >
            <p className="text-2xl font-bold text-green-600">{stats.avgWaitTime ?? '--'}m</p>
            <p className="text-xs text-gray-600">Avg Wait Time</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-default"
          >
            <p className="text-2xl font-bold text-purple-600">{stats.systemUptime ?? '--'}%</p>
            <p className="text-xs text-gray-600">System Uptime</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-default"
          >
            <p className="text-2xl font-bold text-orange-600">{stats.satisfactionRate ?? '--'}%</p>
            <p className="text-xs text-gray-600">Satisfaction</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-default"
          >
            <p className="text-2xl font-bold text-red-600">{stats.emergencyCases ?? 0}</p>
            <p className="text-xs text-gray-600">Emergency Cases</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100 hover:shadow-lg transition-all cursor-default"
          >
            <p className="text-2xl font-bold text-indigo-600">{stats.totalNotices ?? 0}</p>
            <p className="text-xs text-gray-600">Active Notices</p>
          </motion.div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={Users}
          label="Total Patients"
          value={stats.totalPatients.toLocaleString()}
          change="+12.5%"
          changeType="positive"
          color="from-blue-500 to-blue-600"
          description="Active registered patients"
        />
        <StatCard
          icon={Stethoscope}
          label="Medical Staff"
          value={stats.totalDoctors}
          change="+3.2%"
          changeType="positive"
          color="from-green-500 to-green-600"
          description="Qualified healthcare professionals"
        />
        <StatCard
          icon={Calendar}
          label="Today's Appointments"
          value={stats.todayAppointments}
          change="+8.1%"
          changeType="positive"
          color="from-purple-500 to-purple-600"
          description="Scheduled for today"
        />
        <StatCard
          icon={DollarSign}
          label="Monthly Revenue"
          value={`$${stats.monthlyRevenue.toLocaleString()}`}
          change="+15.3%"
          changeType="positive"
          color="from-orange-500 to-orange-600"
          description="Total revenue this month"
        />
        <StatCard
          icon={ShoppingCart}
          label="Total Orders"
          value={stats.totalOrders.toLocaleString()}
          change="+18.7%"
          changeType="positive"
          color="from-indigo-500 to-indigo-600"
          description="Pharmacy and supply orders"
        />
        <StatCard
          icon={Package}
          label="Inventory Items"
          value={stats.totalProducts.toLocaleString()}
          change="+5.4%"
          changeType="positive"
          color="from-pink-500 to-pink-600"
          description="Products in inventory"
        />
        <StatCard
          icon={FlaskConical}
          label="Lab Tests"
          value={stats.labTests}
          change="+22.1%"
          changeType="positive"
          color="from-cyan-500 to-cyan-600"
          description="Tests conducted this month"
        />
        <StatCard
          icon={Heart}
          label="Satisfaction Rate"
          value={`${stats.satisfactionRate}%`}
          change="+2.3%"
          changeType="positive"
          color="from-red-500 to-red-600"
          description="Patient satisfaction score"
        />
      </div>

      {/* Quick Actions & System Health */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-yellow-500" />
            Quick Actions
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                to={action.path}
                className="group relative overflow-hidden rounded-xl border border-gray-200 hover:border-blue-300 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="relative p-6 text-center">
                  <div className={`w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br ${action.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                    <action.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{action.label}</h3>
                  <p className="text-xs text-gray-600">{action.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </motion.div>

        {/* System Health */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-500" />
            System Health
          </h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Server Status</span>
              </div>
              <span className="px-2 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-full">Operational</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Database</span>
              </div>
              <span className="px-2 py-1 text-xs font-bold text-green-700 bg-green-100 rounded-full">Healthy</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Activity className="w-5 h-5 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">API Response</span>
              </div>
              <span className="text-sm font-bold text-blue-700">124ms</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Uptime</span>
              </div>
              <span className="text-sm font-bold text-gray-700">99.9%</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Download className="w-5 h-5 text-orange-600" />
                <span className="text-sm font-medium text-gray-700">Last Backup</span>
              </div>
              <span className="text-sm font-bold text-orange-700">2 hours ago</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activity & Upcoming Appointments */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Activity className="w-5 h-5 text-blue-500" />
              Recent Activity
            </h2>
            <Link to="/admin/reports/hub" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              View all →
            </Link>
          </div>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className={`p-2 rounded-full ${
                  activity.type === 'appointment' ? 'bg-blue-100' :
                  activity.type === 'order' ? 'bg-green-100' :
                  activity.type === 'lab' ? 'bg-purple-100' :
                  activity.type === 'emergency' ? 'bg-red-100' : 'bg-gray-100'
                }`}>
                  {
                    activity.type === 'appointment' ? <Calendar className="w-4 h-4 text-blue-600" /> :
                    activity.type === 'order' ? <ShoppingCart className="w-4 h-4 text-green-600" /> :
                    activity.type === 'lab' ? <FlaskConical className="w-4 h-4 text-purple-600" /> :
                    activity.type === 'emergency' ? <Ambulance className="w-4 h-4 text-red-600" /> :
                    <FileText className="w-4 h-4 text-gray-600" />
                  }
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <p className="font-semibold text-gray-900">{activity.user}</p>
                    <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                      activity.priority === 'critical' ? 'bg-red-100 text-red-700' :
                      activity.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                      activity.priority === 'normal' ? 'bg-green-100 text-green-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {activity.priority || 'normal'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{activity.action}</p>
                  <div className="flex items-center gap-4 mt-1">
                    <p className="text-xs text-gray-500">{activity.time}</p>
                    <p className="text-xs text-gray-500">{activity.department}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-purple-500" />
              Upcoming Appointments
            </h2>
            <Link to="/admin/appointments" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Schedule →
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingAppointments.map((appointment, index) => (
              <motion.div
                key={appointment.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
                    {appointment.patient.charAt(0)}
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{appointment.patient}</p>
                    <p className="text-sm text-gray-600">{appointment.doctor}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{appointment.time}</p>
                  <p className="text-xs text-gray-500">{appointment.department}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Department Statistics & Revenue Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Department Statistics */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <Hospital className="w-5 h-5 text-blue-500" />
            Department Statistics
          </h2>
          <div className="space-y-4">
            {departmentStats.map((dept, index) => (
              <div key={index} className="border-b border-gray-100 pb-4 last:border-0">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-gray-900">{dept.name}</span>
                  <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                    dept.growth > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {dept.growth > 0 ? '+' : ''}{dept.growth}%
                  </span>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Patients</p>
                    <p className="font-semibold text-gray-900">{dept.patients}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Revenue</p>
                    <p className="font-semibold text-gray-900">${dept.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Doctors</p>
                    <p className="font-semibold text-gray-900">{dept.doctors}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Occupancy</p>
                    <p className="font-semibold text-gray-900">{dept.occupancy}%</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-green-500" />
              Revenue Overview
            </h2>
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            >
              <option value="week">Last Week</option>
              <option value="month">Last Month</option>
              <option value="quarter">Last Quarter</option>
              <option value="year">Last Year</option>
            </select>
          </div>
          
          {/* Revenue Chart */}
          <div className="h-64 flex items-end justify-between space-x-2 mb-4">
            {(stats.revenueData || []).map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div 
                  className="w-full bg-gradient-to-t from-blue-500 to-purple-500 rounded-t-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 relative group"
                  style={{ height: `${(data.revenue / 150000) * 100}%` }}
                >
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                    ${data.revenue.toLocaleString()}
                  </div>
                </div>
                <span className="text-xs text-gray-600 mt-2 font-medium">{data.month}</span>
              </div>
            ))}
          </div>
          
          {/* Additional Metrics */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{(stats.revenueData || [])[0]?.appointments || 0}</p>
              <p className="text-xs text-gray-600">Appointments</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{(stats.revenueData || [])[0]?.patients || 0}</p>
              <p className="text-xs text-gray-600">Patients</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-purple-600">${(stats.revenueData || [])[0] ? Math.round((stats.revenueData[0].revenue || 0) / (stats.revenueData[0].patients || 1)) : 0}</p>
              <p className="text-xs text-gray-600">Avg Revenue/Patient</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Performance Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
      >
        <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-indigo-500" />
          Performance Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-24 h-24">
                <circle cx="48" cy="48" r="36" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle 
                  cx="48" cy="48" r="36" 
                  stroke="#10b981" 
                  strokeWidth="8" 
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 36 * 0.945} ${2 * Math.PI * 36}`}
                  transform="rotate(-90 48 48)"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute">
                <p className="text-2xl font-bold text-gray-900">94.5%</p>
              </div>
            </div>
            <p className="mt-2 text-sm font-medium text-gray-900">Patient Satisfaction</p>
            <p className="text-xs text-gray-500">Based on 1,247 reviews</p>
          </div>
          
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-24 h-24">
                <circle cx="48" cy="48" r="36" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle 
                  cx="48" cy="48" r="36" 
                  stroke="#3b82f6" 
                  strokeWidth="8" 
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 36 * 0.783} ${2 * Math.PI * 36}`}
                  transform="rotate(-90 48 48)"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute">
                <p className="text-2xl font-bold text-gray-900">78.3%</p>
              </div>
            </div>
            <p className="mt-2 text-sm font-medium text-gray-900">Bed Occupancy</p>
            <p className="text-xs text-gray-500">245 of 313 beds occupied</p>
          </div>
          
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-24 h-24">
                <circle cx="48" cy="48" r="36" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle 
                  cx="48" cy="48" r="36" 
                  stroke="#f59e0b" 
                  strokeWidth="8" 
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 36 * 0.667} ${2 * Math.PI * 36}`}
                  transform="rotate(-90 48 48)"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute">
                <p className="text-2xl font-bold text-gray-900">12m</p>
              </div>
            </div>
            <p className="mt-2 text-sm font-medium text-gray-900">Avg Wait Time</p>
            <p className="text-xs text-gray-500">From check-in to consultation</p>
          </div>
          
          <div className="text-center">
            <div className="relative inline-flex items-center justify-center">
              <svg className="w-24 h-24">
                <circle cx="48" cy="48" r="36" stroke="#e5e7eb" strokeWidth="8" fill="none" />
                <circle 
                  cx="48" cy="48" r="36" 
                  stroke="#8b5cf6" 
                  strokeWidth="8" 
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 36 * 0.999} ${2 * Math.PI * 36}`}
                  transform="rotate(-90 48 48)"
                  className="transition-all duration-1000"
                />
              </svg>
              <div className="absolute">
                <p className="text-2xl font-bold text-gray-900">99.9%</p>
              </div>
            </div>
            <p className="mt-2 text-sm font-medium text-gray-900">System Uptime</p>
            <p className="text-xs text-gray-500">Last 30 days</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

