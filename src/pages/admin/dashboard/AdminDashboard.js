import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  UserCheck,
  Calendar,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Activity,
  Clock,
  AlertCircle,
  CheckCircle,
  BarChart3,
  PieChart,
  FileText,
  Shield,
  Zap,
  Server,
  Database,
  Cpu,
  HardDrive,
  Wifi,
  RefreshCw
} from 'lucide-react';
import { dashboardApi } from '../../../services/apiService';

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [recentDoctors, setRecentDoctors] = useState([]);
  const [departmentStats, setDepartmentStats] = useState([]);
  const [appointmentTrends, setAppointmentTrends] = useState([]);
  const [revenueTrends, setRevenueTrends] = useState([]);
  const [systemStats, setSystemStats] = useState(null);
  const [realTimeStats, setRealTimeStats] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [lastUpdated, setLastUpdated] = useState(null);

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(() => {
      fetchRealTimeStats();
    }, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await dashboardApi.getAdminDashboard();
      setStats(response.data.stats);
      setRecentAppointments(response.data.recent_appointments);
      setRecentPatients(response.data.recent_patients);
      setRecentDoctors(response.data.recent_doctors);
      setDepartmentStats(response.data.department_stats);
      setAppointmentTrends(response.data.appointment_trends);
      setRevenueTrends(response.data.revenue_trends);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRealTimeStats = async () => {
    try {
      const response = await dashboardApi.getRealTimeStats();
      setRealTimeStats(response.data);
    } catch (error) {
      console.error('Error fetching real-time stats:', error);
    }
  };

  const fetchSystemStats = async () => {
    try {
      const response = await dashboardApi.getSystemStats();
      setSystemStats(response.data);
    } catch (error) {
      console.error('Error fetching system stats:', error);
    }
  };

  const StatCard = ({ title, value, icon: Icon, change, color = 'blue' }) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      red: 'from-red-500 to-red-600',
      yellow: 'from-yellow-500 to-yellow-600',
      purple: 'from-purple-500 to-purple-600',
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`p-3 rounded-lg bg-gradient-to-r ${colors[color]}`}>
              <Icon className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{title}</p>
              <p className="text-2xl font-bold text-gray-900">{value}</p>
              {change !== undefined && (
                <div className={`flex items-center text-sm ${
                  change > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {change > 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span className="ml-1">{Math.abs(change)}%</span>
                </div>
              )}
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs text-gray-500">
              Last updated: {lastUpdated?.toLocaleTimeString()}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5DBB63]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">System overview and analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          <button
            onClick={() => fetchDashboardData()}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4 text-gray-600" />
            Refresh
          </button>
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          >
            <option value="week">Last Week</option>
            <option value="month">Last Month</option>
            <option value="year">Last Year</option>
            <option value="custom">Custom Range</option>
          </select>
          <button
            onClick={fetchSystemStats}
            className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Server className="w-4 h-4 text-gray-600" />
            System Stats
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Users"
          value={stats?.total_users || 0}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Total Doctors"
          value={stats?.total_doctors || 0}
          icon={UserCheck}
          color="green"
        />
        <StatCard
          title="Total Patients"
          value={stats?.total_patients || 0}
          icon={Users}
          color="purple"
        />
        <StatCard
          title="Total Appointments"
          value={stats?.total_appointments || 0}
          icon={Calendar}
          color="yellow"
        />
        <StatCard
          title="Today's Appointments"
          value={stats?.today_appointments || 0}
          icon={Clock}
          color="orange"
        />
        <StatCard
          title="Pending Appointments"
          value={stats?.pending_appointments || 0}
          icon={AlertCircle}
          color="red"
        />
        <StatCard
          title="Completed Appointments"
          value={stats?.completed_appointments || 0}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats?.total_revenue?.toFixed(2) || '0.00'}`}
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${stats?.monthly_revenue?.toFixed(2) || '0.00'}`}
          icon={TrendingUp}
          color="blue"
          change={stats?.monthly_revenue_change || 0}
        />
      </div>

      {/* Real-time Stats */}
      {realTimeStats && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Online Users"
            value={realTimeStats.online_users}
            icon={Wifi}
            color="green"
          />
          <StatCard
            title="Active Sessions"
            value={realTimeStats.active_sessions}
            icon={Activity}
            color="blue"
          />
          <StatCard
            title="Current Appointments"
            value={realTimeStats.current_appointments}
            icon={Calendar}
            color="orange"
          />
          <StatCard
            title="System Load"
            value={`${realTimeStats.system_load?.toFixed(2)}%`}
            icon={Cpu}
            color={realTimeStats.system_load > 80 ? 'red' : 'green'}
          />
          <StatCard
            title="Memory Usage"
            value={`${realTimeStats.memory_usage}%`}
            icon={HardDrive}
            color={realTimeStats.memory_usage > 80 ? 'red' : 'green'}
          />
          <StatCard
            title="Disk Usage"
            value={`${realTimeStats.disk_usage}%`}
            icon={Database}
            color={realTimeStats.disk_usage > 80 ? 'red' : 'green'}
          />
        </div>
      )}

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Appointments</h3>
          <div className="space-y-3">
            {recentAppointments.slice(0, 5).map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">{appointment.patient?.name}</p>
                    <p className="text-sm text-gray-600">{appointment.appointment_number}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{appointment.appointment_date}</p>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
                    appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Patients */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Patients</h3>
          <div className="space-y-3">
            {recentPatients.slice(0, 5).map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Users className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">{patient.name}</p>
                    <p className="text-sm text-gray-600">{patient.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{patient.registration_date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Recent Doctors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Doctors</h3>
          <div className="space-y-3">
            {recentDoctors.slice(0, 5).map((doctor) => (
              <div key={doctor.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <UserCheck className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">{doctor.name}</p>
                    <p className="text-sm text-gray-600">{doctor.specialization}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{doctor.join_date}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Stats Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Statistics</h3>
          <div className="space-y-3">
            {departmentStats.map((dept, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{dept.department}</span>
                <div className="flex items-center space-x-2">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(dept.count / Math.max(...departmentStats.map(d => d.count))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-900">{dept.count}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Revenue Trends Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h3>
          <div className="h-64 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-gray-400" />
            <p className="text-sm text-gray-600">Revenue chart will be displayed here</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
