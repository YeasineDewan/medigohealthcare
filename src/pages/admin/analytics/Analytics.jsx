import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Calendar,
  Activity,
  PieChart,
  Download,
  Filter,
  Search,
  RefreshCw,
  Eye,
  Target,
  Zap,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('30d');
  const [selectedMetric, setSelectedMetric] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  // Mock analytics data
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalRevenue: 2456789,
      totalPatients: 12847,
      totalDoctors: 156,
      totalAppointments: 3421,
      revenueGrowth: 12.5,
      patientGrowth: 8.3,
      doctorGrowth: 3.2,
      appointmentGrowth: 15.7
    },
    revenueData: [
      { month: 'Jan', revenue: 180000, appointments: 280, patients: 1200 },
      { month: 'Feb', revenue: 195000, appointments: 310, patients: 1350 },
      { month: 'Mar', revenue: 210000, appointments: 340, patients: 1480 },
      { month: 'Apr', revenue: 198000, appointments: 320, patients: 1420 },
      { month: 'May', revenue: 225000, appointments: 360, patients: 1580 },
      { month: 'Jun', revenue: 245000, appointments: 390, patients: 1720 }
    ],
    departmentPerformance: [
      { name: 'Cardiology', patients: 3420, revenue: 450000, satisfaction: 92 },
      { name: 'Neurology', patients: 2180, revenue: 320000, satisfaction: 88 },
      { name: 'Orthopedics', patients: 2890, revenue: 380000, satisfaction: 90 },
      { name: 'Pediatrics', patients: 1950, revenue: 280000, satisfaction: 94 },
      { name: 'Emergency', patients: 1230, revenue: 180000, satisfaction: 85 },
      { name: 'Radiology', patients: 1670, revenue: 240000, satisfaction: 91 }
    ],
    patientDemographics: [
      { age: '0-18', count: 2340, percentage: 18.2 },
      { age: '19-35', count: 3890, percentage: 30.3 },
      { age: '36-50', count: 3120, percentage: 24.3 },
      { age: '51-65', count: 2180, percentage: 17.0 },
      { age: '65+', count: 1317, percentage: 10.2 }
    ],
    topServices: [
      { service: 'General Consultation', bookings: 892, revenue: 89000 },
      { service: 'Cardiac Checkup', bookings: 456, revenue: 136800 },
      { service: 'Blood Test', bookings: 678, revenue: 33900 },
      { service: 'X-Ray', bookings: 234, revenue: 70200 },
      { service: 'MRI Scan', bookings: 123, revenue: 61500 }
    ]
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  };

  const COLORS = ['#5DBB63', '#4CAF50', '#8BC34A', '#CDDC39', '#FFC107', '#FF9800'];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5DBB63]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
          <p className="text-gray-600 mt-1">Comprehensive insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button
            onClick={handleRefresh}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            disabled={refreshing}
          >
            <RefreshCw className={`w-4 h-4 ${refreshing ? 'animate-spin' : ''}`} />
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: DollarSign, label: 'Total Revenue', value: `$${analyticsData.overview.totalRevenue.toLocaleString()}`, change: analyticsData.overview.revenueGrowth, positive: true },
          { icon: Users, label: 'Total Patients', value: analyticsData.overview.totalPatients.toLocaleString(), change: analyticsData.overview.patientGrowth, positive: true },
          { icon: Users, label: 'Total Doctors', value: analyticsData.overview.totalDoctors, change: analyticsData.overview.doctorGrowth, positive: true },
          { icon: Calendar, label: 'Appointments', value: analyticsData.overview.totalAppointments.toLocaleString(), change: analyticsData.overview.appointmentGrowth, positive: true }
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                <div className="flex items-center gap-1 mt-2">
                  {stat.positive ? (
                    <TrendingUp className="w-4 h-4 text-green-600" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-600" />
                  )}
                  <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}%
                  </span>
                </div>
              </div>
              <div className="p-3 bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] rounded-lg">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={analyticsData.revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="revenue" stroke="#5DBB63" fill="#5DBB63" fillOpacity={0.6} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Demographics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={analyticsData.patientDemographics}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ age, percentage }) => `${age}: ${percentage}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {analyticsData.patientDemographics.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Department Performance */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={analyticsData.departmentPerformance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="patients" fill="#5DBB63" />
            <Bar dataKey="revenue" fill="#4CAF50" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Top Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Services</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Service</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Bookings</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Revenue</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Performance</th>
              </tr>
            </thead>
            <tbody>
              {analyticsData.topServices.map((service, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4 text-[#5DBB63]" />
                      {service.service}
                    </div>
                  </td>
                  <td className="py-3 px-4">{service.bookings}</td>
                  <td className="py-3 px-4">${service.revenue.toLocaleString()}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] h-2 rounded-full"
                          style={{ width: `${(service.bookings / 892) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-600">{Math.round((service.bookings / 892) * 100)}%</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
};

export default Analytics;
