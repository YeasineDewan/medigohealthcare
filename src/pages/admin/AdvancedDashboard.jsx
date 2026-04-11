import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users, DollarSign, FileText, Activity, TrendingUp, TrendingDown,
  Calendar, Clock, Heart, Stethoscope, Building, Shield, Award,
  BarChart3, PieChart, LineChart, Target, Zap, AlertCircle,
  CheckCircle, XCircle, Bell, Mail, Phone, MapPin, Globe,
  Wifi, Battery, Signal, ChevronRight, MoreVertical, Eye,
  Download, Upload, RefreshCw, Filter, Search, Plus, Edit,
  Trash2, Save, X, Menu, Settings, HelpCircle, LogOut,
  User, Home, FileSearch, FileDown, FileUp, Receipt,
  CreditCard, Wallet, PiggyBank, Briefcase, GraduationCap,
  BookOpen, Database, Server, Cloud, TestTube, Microscope,
  FlaskConical, Clipboard, ClipboardCheck, ClipboardX,
  FileSignature, FileSpreadsheet, Calculator, UserCheck, UserPlus, UserMinus
} from 'lucide-react';

export default function AdvancedDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [showNotifications, setShowNotifications] = useState(false);

  const statsCards = [
    {
      title: 'Total Patients',
      value: '1,234',
      change: '+12%',
      trend: 'up',
      icon: Users,
      color: 'blue',
      description: '12% increase from last month'
    },
    {
      title: 'Today\'s Revenue',
      value: 'BDT 45,678',
      change: '+8%',
      trend: 'up',
      icon: DollarSign,
      color: 'green',
      description: '8% increase from yesterday'
    },
    {
      title: 'Pending Reports',
      value: '23',
      change: '-5%',
      trend: 'down',
      icon: FileText,
      color: 'orange',
      description: '5% decrease from last week'
    },
    {
      title: 'Active Staff',
      value: '45',
      change: '+2%',
      trend: 'up',
      icon: UserCheck,
      color: 'purple',
      description: '2 new staff members'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'patient',
      title: 'New Patient Registration',
      description: 'John Doe registered for medical checkup',
      time: '5 min ago',
      icon: UserPlus,
      color: 'blue'
    },
    {
      id: 2,
      type: 'payment',
      title: 'Payment Received',
      description: 'BDT 5,000 received from patient #1234',
      time: '15 min ago',
      icon: CreditCard,
      color: 'green'
    },
    {
      id: 3,
      type: 'report',
      title: 'Report Ready',
      description: 'Blood test report for patient #5678 is ready',
      time: '1 hour ago',
      icon: FileText,
      color: 'orange'
    },
    {
      id: 4,
      type: 'system',
      title: 'System Update',
      description: 'System will be updated tonight at 2:00 AM',
      time: '2 hours ago',
      icon: Settings,
      color: 'purple'
    },
    {
      id: 5,
      type: 'backup',
      title: 'Backup Completed',
      description: 'Daily backup completed successfully',
      time: '3 hours ago',
      icon: Shield,
      color: 'green'
    }
  ];

  const upcomingAppointments = [
    {
      id: 1,
      patient: 'Sarah Johnson',
      time: '10:00 AM',
      type: 'Consultation',
      doctor: 'Dr. Ahmed Hassan',
      status: 'confirmed'
    },
    {
      id: 2,
      patient: 'Michael Brown',
      time: '11:30 AM',
      type: 'Medical Checkup',
      doctor: 'Dr. Sarah Smith',
      status: 'pending'
    },
    {
      id: 3,
      patient: 'Emma Wilson',
      time: '2:00 PM',
      type: 'Follow-up',
      doctor: 'Dr. Ahmed Hassan',
      status: 'confirmed'
    },
    {
      id: 4,
      patient: 'James Davis',
      time: '3:30 PM',
      type: 'Emergency',
      doctor: 'Dr. Sarah Smith',
      status: 'urgent'
    }
  ];

  const quickActions = [
    {
      title: 'Add Patient',
      description: 'Register new patient',
      icon: UserPlus,
      color: 'blue',
      path: '/admin/patients/add'
    },
    {
      title: 'Create Invoice',
      description: 'Generate new invoice',
      icon: FileText,
      color: 'green',
      path: '/admin/invoices/create'
    },
    {
      title: 'View Reports',
      description: 'Check medical reports',
      icon: FileText,
      color: 'orange',
      path: '/admin/reports'
    },
    {
      title: 'Manage Staff',
      description: 'Staff management',
      icon: Users,
      color: 'purple',
      path: '/admin/staff'
    }
  ];

  const colorClasses = {
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
      gradient: 'from-blue-500 to-blue-600',
      light: 'bg-blue-100'
    },
    green: {
      bg: 'bg-green-50',
      text: 'text-green-600',
      border: 'border-green-200',
      gradient: 'from-green-500 to-green-600',
      light: 'bg-green-100'
    },
    orange: {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-200',
      gradient: 'from-orange-500 to-orange-600',
      light: 'bg-orange-100'
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200',
      gradient: 'from-purple-500 to-purple-600',
      light: 'bg-purple-100'
    }
  };

  const renderStatCard = (stat, index) => {
    const colors = colorClasses[stat.color];
    
    return (
      <motion.div
        key={stat.title}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
      >
        <div className="flex items-center justify-between mb-4">
          <div className={`p-3 rounded-lg ${colors.bg}`}>
            <stat.icon className={`w-6 h-6 ${colors.text}`} />
          </div>
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
            stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
          }`}>
            {stat.trend === 'up' ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            <span className="text-xs font-medium">{stat.change}</span>
          </div>
        </div>
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</h3>
          <p className="text-sm text-gray-600 mb-2">{stat.title}</p>
          <p className="text-xs text-gray-500">{stat.description}</p>
        </div>
      </motion.div>
    );
  };

  const renderActivityItem = (activity, index) => {
    const colors = colorClasses[activity.color];
    
    return (
      <motion.div
        key={activity.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3, delay: index * 0.05 }}
        className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <div className={`p-2 rounded-lg ${colors.bg} mt-1`}>
          <activity.icon className={`w-4 h-4 ${colors.text}`} />
        </div>
        <div className="flex-1">
          <p className="font-medium text-gray-900">{activity.title}</p>
          <p className="text-sm text-gray-600">{activity.description}</p>
          <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
        </div>
      </motion.div>
    );
  };

  const renderAppointmentItem = (appointment, index) => (
    <motion.div
      key={appointment.id}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-white" />
        </div>
        <div>
          <p className="font-medium text-gray-900">{appointment.patient}</p>
          <p className="text-sm text-gray-600">{appointment.type} • {appointment.doctor}</p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-sm font-medium text-gray-900">{appointment.time}</p>
        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
          appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' :
          appointment.status === 'pending' ? 'bg-orange-100 text-orange-700' :
          'bg-red-100 text-red-700'
        }`}>
          {appointment.status === 'confirmed' && <CheckCircle className="w-3 h-3" />}
          {appointment.status === 'pending' && <Clock className="w-3 h-3" />}
          {appointment.status === 'urgent' && <AlertCircle className="w-3 h-3" />}
          {appointment.status}
        </span>
      </div>
    </motion.div>
  );

  const renderQuickAction = (action, index) => {
    const colors = colorClasses[action.color];
    
    return (
      <motion.button
        key={action.title}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all hover:scale-105 text-left"
      >
        <div className={`p-3 rounded-lg ${colors.bg} mb-4`}>
          <action.icon className={`w-6 h-6 ${colors.text}`} />
        </div>
        <h3 className="font-semibold text-gray-900 mb-2">{action.title}</h3>
        <p className="text-sm text-gray-600">{action.description}</p>
      </motion.button>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map(renderStatCard)}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activities</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-2">
            {recentActivities.map(renderActivityItem)}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>
          <div className="space-y-2">
            {upcomingAppointments.map(renderAppointmentItem)}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            Customize
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map(renderQuickAction)}
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Export
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Revenue chart will be displayed here</p>
            </div>
          </div>
        </div>

        {/* Patient Statistics */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Patient Statistics</h2>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Export
            </button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <PieChart className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Patient statistics will be displayed here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
