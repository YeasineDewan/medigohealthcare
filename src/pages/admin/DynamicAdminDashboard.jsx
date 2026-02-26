import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminData } from '../../hooks/useAdminData';
import { dashboardService } from '../../services/adminService';
import DynamicTable from '../../components/admin/DynamicTable';
import { 
  Users, Stethoscope, Calendar, ShoppingCart, TrendingUp, 
  ArrowUpRight, Package, Activity, DollarSign, AlertTriangle,
  Clock, CheckCircle, XCircle
} from 'lucide-react';

export default function DynamicAdminDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [refreshInterval, setRefreshInterval] = useState(30000); // 30 seconds

  // Fetch dashboard stats
  const { data: stats, loading: statsLoading, refetch: refetchStats } = useAdminData(
    () => dashboardService.getStats(),
    [selectedPeriod],
    {
      cacheTime: 60000, // 1 minute cache
      transform: (data) => ({
        totalPatients: data.patients?.total || 0,
        totalDoctors: data.doctors?.total || 0,
        appointmentsToday: data.appointments?.today || 0,
        ordersThisMonth: data.orders?.month || 0,
        revenue: data.revenue?.total || 0,
        growth: data.growth || {}
      })
    }
  );

  // Fetch recent appointments
  const { data: appointments, loading: appointmentsLoading, refetch: refetchAppointments } = useAdminData(
    () => dashboardService.getRecentAppointments(),
    [],
    { cacheTime: 30000 }
  );

  // Fetch revenue data
  const { data: revenueData, loading: revenueLoading } = useAdminData(
    () => dashboardService.getRevenueData(selectedPeriod),
    [selectedPeriod],
    { cacheTime: 120000 }
  );

  // Auto-refresh effect
  useEffect(() => {
    const interval = setInterval(() => {
      refetchStats();
      refetchAppointments();
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [refreshInterval, refetchStats, refetchAppointments]);

  const statCards = [
    {
      label: 'Total Patients',
      value: stats?.totalPatients || 0,
      icon: Users,
      color: 'bg-blue-500',
      change: stats?.growth?.patients || '+0%',
      trend: 'up'
    },
    {
      label: 'Doctors',
      value: stats?.totalDoctors || 0,
      icon: Stethoscope,
      color: 'bg-green-500',
      change: stats?.growth?.doctors || '+0%',
      trend: 'up'
    },
    {
      label: 'Appointments Today',
      value: stats?.appointmentsToday || 0,
      icon: Calendar,
      color: 'bg-purple-500',
      change: stats?.growth?.appointments || '+0%',
      trend: 'up'
    },
    {
      label: 'Orders This Month',
      value: stats?.ordersThisMonth || 0,
      icon: ShoppingCart,
      color: 'bg-amber-500',
      change: stats?.growth?.orders || '+0%',
      trend: 'up'
    }
  ];

  const appointmentColumns = [
    {
      key: 'patient',
      label: 'Patient',
      render: (value, item) => (
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <span className="text-sm font-bold text-blue-600">
              {value.split(' ').map(n => n[0]).join('')}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{value}</div>
            <div className="text-sm text-gray-500">ID: {item.patientId}</div>
          </div>
        </div>
      )
    },
    {
      key: 'doctor',
      label: 'Doctor',
      render: (value) => (
        <div className="flex items-center">
          <Stethoscope className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: 'time',
      label: 'Time',
      render: (value) => (
        <div className="flex items-center">
          <Clock className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      type: 'badge',
      badgeConfig: {
        confirmed: 'green',
        pending: 'yellow',
        completed: 'blue',
        cancelled: 'red'
      }
    },
    {
      key: 'type',
      label: 'Type',
      render: (value) => (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
          {value}
        </span>
      )
    }
  ];

  const handleViewAppointment = (appointment) => {
    console.log('View appointment:', appointment);
  };

  const handleEditAppointment = (appointment) => {
    console.log('Edit appointment:', appointment);
  };

  const handleExportData = () => {
    // Export dashboard data
    const exportData = {
      stats,
      appointments,
      revenueData,
      exportedAt: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `dashboard-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dynamic Dashboard</h1>
          <p className="text-gray-500 mt-1">Real-time healthcare management overview</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button
            onClick={() => {
              refetchStats();
              refetchAppointments();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Activity className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <TrendingUp className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value.toLocaleString()}</p>
                <p className="text-sm text-green-600 font-medium mt-1 flex items-center gap-1">
                  <ArrowUpRight className="w-3 h-3" />
                  {stat.change} from last period
                </p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Appointments */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl border border-gray-200"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-gray-900">Recent Appointments</h2>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Activity className={`w-4 h-4 ${appointmentsLoading ? 'animate-spin' : ''}`} />
                  Auto-refreshing
                </div>
              </div>
            </div>
            
            <DynamicTable
              data={appointments || []}
              columns={appointmentColumns}
              loading={appointmentsLoading}
              onView={handleViewAppointment}
              onEdit={handleEditAppointment}
              pagination={false}
              searchable={false}
              className="border-0"
            />
          </motion.div>
        </div>

        {/* Quick Actions & System Status */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h2 className="font-semibold text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-2">
              {[
                { icon: Users, label: 'Add Patient', color: 'blue' },
                { icon: Stethoscope, label: 'Schedule Appointment', color: 'green' },
                { icon: Package, label: 'Manage Inventory', color: 'purple' },
                { icon: ShoppingCart, label: 'View Orders', color: 'amber' },
              ].map((action, i) => (
                <button
                  key={action.label}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group"
                >
                  <div className={`w-10 h-10 rounded-lg bg-${action.color}-100 flex items-center justify-center group-hover:bg-${action.color}-200`}>
                    <action.icon className={`w-5 h-5 text-${action.color}-600`} />
                  </div>
                  <span className="font-medium text-gray-900 text-left">{action.label}</span>
                  <ArrowUpRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-gray-600" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h2 className="font-semibold text-gray-900 mb-4">System Status</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Database</span>
                </div>
                <span className="text-xs text-green-600 font-medium">Operational</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">API Server</span>
                </div>
                <span className="text-xs text-green-600 font-medium">Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm text-gray-700">Backup Service</span>
                </div>
                <span className="text-xs text-yellow-600 font-medium">Warning</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span className="text-sm text-gray-700">Email Service</span>
                </div>
                <span className="text-xs text-green-600 font-medium">Connected</span>
              </div>
            </div>
          </motion.div>

          {/* Revenue Overview */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-xl border border-gray-200 p-6"
          >
            <h2 className="font-semibold text-gray-900 mb-4">Revenue Overview</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Revenue</span>
                <span className="text-lg font-bold text-green-600">
                  ${stats?.revenue?.toLocaleString() || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Growth Rate</span>
                <span className="text-sm font-medium text-green-600">
                  {stats?.growth?.revenue || '+0%'}
                </span>
              </div>
              <div className="h-32 flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl">
                <TrendingUp className="w-12 h-12 text-green-500 opacity-50" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
