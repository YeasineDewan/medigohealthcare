import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users, Stethoscope, Calendar, DollarSign, TrendingUp, Activity, 
  Package, FlaskConical, Ambulance, Heart, Brain, TestTube, 
  ShoppingCart, Target, Mail, Bell, ArrowUpRight, BarChart3,
  Clock, CheckCircle, AlertTriangle, Eye, Pill, Building
} from 'lucide-react';

const stats = [
  { label: 'Total Revenue', value: '$1.2M', change: '+23%', icon: DollarSign, color: 'green', trend: 'up' },
  { label: 'Total Patients', value: '24,892', change: '+12%', icon: Users, color: 'blue', trend: 'up' },
  { label: 'Active Doctors', value: '156', change: '+5', icon: Stethoscope, color: 'purple', trend: 'up' },
  { label: 'Appointments', value: '89', change: '+8', icon: Calendar, color: 'amber', trend: 'up' },
  { label: 'Lab Tests', value: '456', change: '+15%', icon: TestTube, color: 'indigo', trend: 'up' },
  { label: 'Emergency Cases', value: '12', change: '-3', icon: Ambulance, color: 'red', trend: 'down' },
  { label: 'Pharmacy Sales', value: '$45K', change: '+18%', icon: Pill, color: 'teal', trend: 'up' },
  { label: 'Bed Occupancy', value: '87%', change: '+5%', icon: Building, color: 'orange', trend: 'up' },
];

const recentActivities = [
  { id: 1, type: 'appointment', message: 'New appointment booked for Dr. Ahmed', time: '5 min ago', icon: Calendar, color: 'blue' },
  { id: 2, type: 'lab', message: 'Lab test completed for Patient #1234', time: '12 min ago', icon: FlaskConical, color: 'purple' },
  { id: 3, type: 'emergency', message: 'Emergency case admitted', time: '25 min ago', icon: Ambulance, color: 'red' },
  { id: 4, type: 'payment', message: 'Payment received: $2,500', time: '1 hour ago', icon: DollarSign, color: 'green' },
];

const departmentPerformance = [
  { name: 'Cardiology', patients: 234, revenue: 125000, satisfaction: 96, icon: Heart, color: 'red' },
  { name: 'Neurology', patients: 189, revenue: 98000, satisfaction: 94, icon: Brain, color: 'purple' },
  { name: 'Laboratory', patients: 456, revenue: 67000, satisfaction: 92, icon: FlaskConical, color: 'blue' },
  { name: 'Emergency', patients: 123, revenue: 89000, satisfaction: 88, icon: Ambulance, color: 'amber' },
];

const quickActions = [
  { label: 'New Patient', icon: Users, path: '/admin/patients/registration', color: 'blue' },
  { label: 'Book Appointment', icon: Calendar, path: '/admin/patients/appointments', color: 'green' },
  { label: 'Lab Test', icon: TestTube, path: '/admin/lab/tests', color: 'purple' },
  { label: 'Pharmacy', icon: Pill, path: '/admin/pharmacy/medicines', color: 'teal' },
  { label: 'Emergency', icon: Ambulance, path: '/admin/emergency/cases', color: 'red' },
  { label: 'Reports', icon: BarChart3, path: '/admin/reports/hub', color: 'indigo' },
];

export default function EnhancedDashboard() {
  const [timeRange, setTimeRange] = useState('today');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard Overview</h1>
          <p className="text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          {['today', 'week', 'month'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                timeRange === range
                  ? 'bg-[#5DBB63] text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {range.charAt(0).toUpperCase() + range.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-lg bg-${stat.color}-100 flex items-center justify-center`}>
                <stat.icon className={`w-6 h-6 text-${stat.color}-600`} />
              </div>
              <span className={`text-sm font-semibold ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-sm text-gray-600 mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              to={action.path}
              className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-gray-50 transition-colors group"
            >
              <div className={`w-14 h-14 rounded-xl bg-${action.color}-100 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                <action.icon className={`w-7 h-7 text-${action.color}-600`} />
              </div>
              <span className="text-sm font-medium text-gray-900 text-center">{action.label}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Department Performance */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Department Performance</h2>
            <Link to="/admin/reports/hub" className="text-[#5DBB63] text-sm font-medium flex items-center gap-1">
              View All <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {departmentPerformance.map((dept) => (
              <div key={dept.name} className="p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors">
                <div className="flex items-center gap-4 mb-3">
                  <div className={`w-10 h-10 rounded-lg bg-${dept.color}-100 flex items-center justify-center`}>
                    <dept.icon className={`w-5 h-5 text-${dept.color}-600`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{dept.name}</h3>
                    <p className="text-sm text-gray-500">{dept.patients} patients</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-900">${(dept.revenue / 1000).toFixed(0)}K</p>
                    <p className="text-sm text-gray-500">{dept.satisfaction}% satisfaction</p>
                  </div>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`bg-${dept.color}-600 h-2 rounded-full`}
                    style={{ width: `${dept.satisfaction}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Recent Activities</h2>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3">
                <div className={`w-10 h-10 rounded-lg bg-${activity.color}-100 flex items-center justify-center flex-shrink-0`}>
                  <activity.icon className={`w-5 h-5 text-${activity.color}-600`} />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900 font-medium">{activity.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Revenue Trends</h2>
            <button className="text-sm text-[#5DBB63] hover:underline">View Details</button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 rounded-lg">
            <div className="text-center">
              <TrendingUp className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Revenue chart placeholder</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-900">Patient Distribution</h2>
            <button className="text-sm text-[#5DBB63] hover:underline">View Details</button>
          </div>
          <div className="h-64 flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-16 h-16 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Distribution chart placeholder</p>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts & Notifications */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-lg bg-amber-50 border border-amber-200">
            <div className="flex items-center gap-3 mb-2">
              <AlertTriangle className="w-5 h-5 text-amber-600" />
              <h3 className="font-semibold text-amber-900">Low Stock Alert</h3>
            </div>
            <p className="text-sm text-amber-700">5 medicines running low on stock</p>
          </div>
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200">
            <div className="flex items-center gap-3 mb-2">
              <Clock className="w-5 h-5 text-blue-600" />
              <h3 className="font-semibold text-blue-900">Pending Approvals</h3>
            </div>
            <p className="text-sm text-blue-700">12 lab reports awaiting approval</p>
          </div>
          <div className="p-4 rounded-lg bg-green-50 border border-green-200">
            <div className="flex items-center gap-3 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <h3 className="font-semibold text-green-900">System Status</h3>
            </div>
            <p className="text-sm text-green-700">All systems operational</p>
          </div>
        </div>
      </div>
    </div>
  );
}
