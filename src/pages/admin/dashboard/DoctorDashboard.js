import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Activity,
  CheckCircle,
  AlertCircle,
  UserCheck,
  Stethoscope,
  BarChart3,
  PieChart,
  RefreshCw,
  Filter,
  Search,
  Eye,
  Edit3,
  Trash2,
  Plus,
  ChevronLeft,
  ChevronRight,
  Star,
  Award,
  Heart,
  Brain,
  Baby
} from 'lucide-react';
import { dashboardApi } from '../../../services/apiService';

const DoctorDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [todayAppointments, setTodayAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [appointmentStats, setAppointmentStats] = useState([]);
  const [monthlyRevenue, setMonthlyRevenue] = useState([]);
  const [patientDemographics, setPatientDemographics] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await dashboardApi.getDoctorDashboard();
      setStats(response.data.stats);
      setTodayAppointments(response.data.today_appointments);
      setUpcomingAppointments(response.data.upcoming_appointments);
      setRecentPatients(response.data.recent_patients);
      setAppointmentStats(response.data.appointment_stats);
      setMonthlyRevenue(response.data.monthly_revenue);
      setPatientDemographics(response.data.patient_demographics);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color = 'blue' }) => {
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
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const AppointmentCard = ({ appointment, onView, onEdit, onCancel }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Calendar className="w-4 h-4 text-gray-600" />
          <div>
            <p className="font-medium text-gray-900">{appointment.patient?.name}</p>
            <p className="text-sm text-gray-600">{appointment.appointment_number}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className={`px-2 py-1 text-xs rounded-full ${
            appointment.status === 'completed' ? 'bg-green-100 text-green-800' :
            appointment.status === 'cancelled' ? 'bg-red-100 text-red-800' :
            appointment.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
            'bg-yellow-100 text-yellow-800'
          }`}>
            {appointment.status}
          </span>
          <span className="text-sm text-gray-600 ml-2">
            {appointment.appointment_date} at {appointment.appointment_time}
          </span>
        </div>
      </div>
      <div className="text-sm text-gray-600 mb-2">
        {appointment.notes && <p><strong>Notes:</strong> {appointment.notes}</p>}
      </div>
      <div className="flex justify-end space-x-2">
        <button
          onClick={() => onView(appointment)}
          className="p-2 text-blue-600 hover:bg-blue-50 rounded"
        >
          <Eye className="w-4 h-4" />
        </button>
        <button
          onClick={() => onEdit(appointment)}
          className="p-2 text-gray-600 hover:bg-gray-50 rounded"
        >
          <Edit3 className="w-4 h-4" />
        </button>
        <button
          onClick={() => onCancel(appointment)}
          className="p-2 text-red-600 hover:bg-red-50 rounded"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );

  const PatientCard = ({ patient }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Users className="w-4 h-4 text-gray-600" />
          <div>
            <p className="font-medium text-gray-900">{patient.name}</p>
            <p className="text-sm text-gray-600">{patient.email}</p>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          {patient.registration_date}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-gray-600">Age:</span>
          <span className="font-medium">{patient.age}</span>
        </div>
        <div>
          <span className="text-gray-600">Gender:</span>
          <span className="font-medium">{patient.gender}</span>
        </div>
        <div>
          <span className="text-gray-600">Blood Type:</span>
          <span className="font-medium">{patient.blood_type}</span>
        </div>
        <div>
          <span className="text-gray-600">Primary Physician:</span>
          <span className="font-medium">{patient.primary_physician}</span>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5DBB63]"></div>
      </div>
    );
  }

  const filteredAppointments = upcomingAppointments.filter(appointment => 
    appointment.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.appointment_number?.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(appointment => filterStatus === 'all' || appointment.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
          <p className="text-gray-600">Manage your appointments and patients</p>
        </div>
        <button
          onClick={fetchDashboardData}
          className="flex items-center space-x-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          <RefreshCw className="w-4 h-4 text-gray-600" />
          Refresh
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Patients"
          value={stats?.total_patients || 0}
          icon={Users}
          color="blue"
        />
        <StatCard
          title="Today's Appointments"
          value={stats?.today_appointments || 0}
          icon={Calendar}
          color="green"
        />
        <StatCard
          title="Upcoming Appointments"
          value={stats?.upcoming_appointments || 0}
          icon={Clock}
          color="yellow"
        />
        <StatCard
          title="Completed Appointments"
          value={stats?.completed_appointments || 0}
          icon={CheckCircle}
          color="green"
        />
        <StatCard
          title="Cancelled Appointments"
          value={stats?.cancelled_appointments || 0}
          icon={AlertCircle}
          color="red"
        />
        <StatCard
          title="Total Revenue"
          value={`$${stats?.total_revenue?.toFixed(2) || '0.00'}`}
          icon={DollarSign}
          color="green"
        />
        <StatCard
          title="Average Rating"
          value={`${stats?.average_rating?.toFixed(1) || '0.0'}`}
          icon={Star}
          color="yellow"
        />
        <StatCard
          title="Availability Status"
          value={stats?.availability_status || 'Unknown'}
          icon={UserCheck}
          color={stats?.availability_status === 'Available' ? 'green' : 'red'}
        />
      </div>

      {/* Today's Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Today's Appointments</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search appointments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              />
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="scheduled">Scheduled</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>

        <div className="space-y-3">
          {filteredAppointments.slice(0, 5).map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onView={(apt) => console.log('View appointment:', apt)}
              onEdit={(apt) => console.log('Edit appointment:', apt)}
              onCancel={(apt) => console.log('Cancel appointment:', apt)}
            />
          ))}
        </div>
      </motion.div>

      {/* Upcoming Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Upcoming Appointments (Next 7 Days)</h3>
        <div className="space-y-3">
          {upcomingAppointments.slice(0, 10).map((appointment) => (
            <AppointmentCard
              key={appointment.id}
              appointment={appointment}
              onView={(apt) => console.log('View appointment:', apt)}
              onEdit={(apt) => console.log('Edit appointment:', apt)}
              onCancel={(apt) => console.log('Cancel appointment:', apt)}
            />
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
            <PatientCard
              key={patient.id}
              patient={patient}
            />
          ))}
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appointment Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Statistics</h3>
          <div className="space-y-3">
            {appointmentStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 p-2 rounded-full ${
                    stat.type === 'consultation' ? 'bg-blue-500' :
                    stat.type === 'follow_up' ? 'bg-green-500' :
                    stat.type === 'surgery' ? 'bg-red-500' :
                    'bg-yellow-500'
                  }`}>
                    <Stethoscope className="w-3 h-3 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{stat.type}</p>
                    <p className="text-sm text-gray-600">{stat.count} appointments</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-24 bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: `${(stat.count / Math.max(...appointmentStats.map(s => s.count))) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm text-gray-900 ml-2">{stat.count}</span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Monthly Revenue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue (Last 6 Months)</h3>
          <div className="h-64 flex items-center justify-center">
            <BarChart3 className="w-6 h-6 text-gray-400" />
            <p className="text-sm text-gray-600">Revenue chart will be displayed here</p>
          </div>
        </motion.div>
      </div>

      {/* Patient Demographics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Demographics</h3>
        <div className="space-y-3">
          {patientDemographics.map((demo, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className={`w-4 h-4 p-2 rounded-full ${
                  demo.gender === 'male' ? 'bg-blue-500' :
                  demo.gender === 'female' ? 'bg-pink-500' :
                  'bg-gray-500'
                }`}>
                  {demo.gender === 'male' ? <Users className="w-3 h-3 text-white" /> :
                   demo.gender === 'female' ? <Heart className="w-3 h-3 text-white" /> :
                   <Brain className="w-3 h-3 text-white" />}
                </div>
                <div>
                  <p className="font-medium text-gray-900 capitalize">{demo.gender}</p>
                  <p className="text-sm text-gray-600">{demo.count} patients</p>
                </div>
              </div>
              <div className="text-right">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full"
                    style={{ width: `${(demo.count / Math.max(...patientDemographics.map(d => d.count))) * 100}%` }}
                  />
                </div>
                <span className="text-sm text-gray-900 ml-2">{demo.count}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default DoctorDashboard;
