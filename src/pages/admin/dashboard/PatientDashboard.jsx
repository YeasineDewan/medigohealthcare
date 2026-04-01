import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Calendar,
  Clock,
  DollarSign,
  Activity,
  CheckCircle,
  AlertCircle,
  FileText,
  Stethoscope,
  Heart,
  TrendingUp,
  RefreshCw,
  Search,
  Eye,
  Plus,
  Filter,
  BarChart3,
  LineChart,
  PieChart,
  Shield,
  Baby,
  Weight,
  Activity as ActivityIcon,
  Thermometer,
  Pill,
  TestTube,
  Brain
} from 'lucide-react';
import { dashboardApi } from '../../../services/apiService';

const PatientDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentMedicalRecords, setRecentMedicalRecords] = useState([]);
  const [recentPrescriptions, setRecentPrescriptions] = useState([]);
  const [recentLabTests, setRecentLabTests] = useState([]);
  const [billingHistory, setBillingHistory] = useState([]);
  const [appointmentHistory, setAppointmentHistory] = useState([]);
  const [vitalSignsHistory, setVitalSignsHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const response = await dashboardApi.getPatientDashboard();
      setStats(response.data.stats);
      setUpcomingAppointments(response.data.upcoming_appointments);
      setRecentMedicalRecords(response.data.recent_medical_records);
      setRecentPrescriptions(response.data.recent_prescriptions);
      setRecentLabTests(response.data.recent_lab_tests);
      setBillingHistory(response.data.billing_history);
      setAppointmentHistory(response.data.appointment_history);
      setVitalSignsHistory(response.data.vital_signs_history);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const StatCard = ({ title, value, icon: Icon, color = 'blue', subtitle = '' }) => {
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
              {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
            </div>
          </div>
        </div>
      </motion.div>
    );
  };

  const AppointmentCard = ({ appointment }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Calendar className="w-4 h-4 text-gray-600" />
          <div>
            <p className="font-medium text-gray-900">{appointment.doctor?.name}</p>
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
    </motion.div>
  );

  const MedicalRecordCard = ({ record }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <FileText className="w-4 h-4 text-gray-600" />
          <div>
            <p className="font-medium text-gray-900">{record.record_number}</p>
            <p className="text-sm text-gray-600">{record.visit_date}</p>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          Dr. {record.doctor?.name}
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-sm font-medium text-gray-700">Diagnosis:</p>
          <p className="text-sm text-gray-600">{record.diagnosis}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Treatment:</p>
          <p className="text-sm text-gray-600">{record.treatment}</p>
        </div>
        {record.symptoms && (
          <div>
            <p className="text-sm font-medium text-gray-700">Symptoms:</p>
            <p className="text-sm text-gray-600">{record.symptoms}</p>
          </div>
        )}
      </div>
    </motion.div>
  );

  const PrescriptionCard = ({ prescription }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <Pill className="w-4 h-4 text-gray-600" />
          <div>
            <p className="font-medium text-gray-900">{prescription.prescription_number}</p>
            <p className="text-sm text-gray-600">{prescription.issued_date}</p>
          </div>
        </div>
        <div className="text-sm text-gray-600">
          Dr. {prescription.doctor?.name}
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-sm font-medium text-gray-700">Medication:</p>
          <p className="text-sm text-gray-600">{prescription.medication}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Dosage:</p>
          <p className="text-sm text-gray-600">{prescription.dosage}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Duration:</p>
          <p className="text-sm text-gray-600">{prescription.duration}</p>
        </div>
      </div>
    </motion.div>
  );

  const BillingCard = ({ bill }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <DollarSign className="w-4 h-4 text-gray-600" />
          <div>
            <p className="font-medium text-gray-900">{bill.bill_number}</p>
            <p className="text-sm text-gray-600">{bill.created_date}</p>
          </div>
        </div>
        <div className="text-right">
          <span className={`px-2 py-1 text-xs rounded-full ${
            bill.status === 'paid' ? 'bg-green-100 text-green-800' :
            bill.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
            bill.status === 'overdue' ? 'bg-red-100 text-red-800' :
            'bg-gray-100 text-gray-800'
          }`}>
            {bill.status}
          </span>
          <span className="text-lg font-bold text-gray-900 ml-2">${bill.amount}</span>
        </div>
      </div>
      <div className="space-y-2">
        <div>
          <p className="text-sm font-medium text-gray-700">Description:</p>
          <p className="text-sm text-gray-600">{bill.description}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Payment Method:</p>
          <p className="text-sm text-gray-600">{bill.payment_method || 'Not specified'}</p>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700">Due Date:</p>
          <p className="text-sm text-gray-600">{bill.due_date}</p>
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
    appointment.doctor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.appointment_number?.toLowerCase().includes(searchTerm.toLowerCase())
  ).filter(appointment => filterStatus === 'all' || appointment.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
          <p className="text-gray-600">Your health information and appointments</p>
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
          title="Total Appointments"
          value={stats?.total_appointments || 0}
          icon={Calendar}
          color="blue"
        />
        <StatCard
          title="Upcoming Appointments"
          value={stats?.upcoming_appointments || 0}
          icon={Clock}
          color="green"
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
          title="Total Medical Records"
          value={stats?.total_medical_records || 0}
          icon={FileText}
          color="purple"
        />
        <StatCard
          title="Total Prescriptions"
          value={stats?.total_prescriptions || 0}
          icon={Pill}
          color="blue"
        />
        <StatCard
          title="Total Lab Tests"
          value={stats?.total_lab_tests || 0}
          icon={TestTube}
          color="yellow"
        />
        <StatCard
          title="Outstanding Balance"
          value={`$${stats?.outstanding_balance?.toFixed(2) || '0.00'}`}
          icon={DollarSign}
          color="red"
        />
        <StatCard
          title="Total Spent"
          value={`$${stats?.total_spent?.toFixed(2) || '0.00'}`}
          icon={TrendingUp}
          color="green"
        />
        <StatCard
          title="Insurance Coverage"
          value={stats?.insurance_coverage || 'Not specified'}
          icon={Shield}
          color="blue"
        />
        <StatCard
          title="Primary Physician"
          value={stats?.primary_physician || 'Not assigned'}
          icon={Stethoscope}
          color="green"
        />
      </div>

      {/* Upcoming Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
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
            />
          ))}
        </div>
      </motion.div>

      {/* Recent Medical Records */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Medical Records</h3>
        <div className="space-y-3">
          {recentMedicalRecords.slice(0, 5).map((record) => (
            <MedicalRecordCard
              key={record.id}
              record={record}
            />
          ))}
        </div>
      </motion.div>

      {/* Recent Prescriptions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Prescriptions</h3>
        <div className="space-y-3">
          {recentPrescriptions.slice(0, 5).map((prescription) => (
            <PrescriptionCard
              key={prescription.id}
              prescription={prescription}
            />
          ))}
        </div>
      </motion.div>

      {/* Recent Lab Tests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Lab Tests</h3>
        <div className="space-y-3">
          {recentLabTests.slice(0, 5).map((test) => (
            <motion.div
              key={test.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-sm p-4 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <TestTube className="w-4 h-4 text-gray-600" />
                  <div>
                    <p className="font-medium text-gray-900">{test.test_name}</p>
                    <p className="text-sm text-gray-600">{test.test_date}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  {test.status === 'completed' ? (
                    <CheckCircle className="w-4 h-4 text-green-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-yellow-600" />
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  <p className="text-sm font-medium text-gray-700">Test Type:</p>
                  <p className="text-sm text-gray-600">{test.test_type}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Results:</p>
                  <p className="text-sm text-gray-600">{test.results || 'Pending'}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Doctor:</p>
                  <p className="text-sm text-gray-600">{test.doctor?.name || 'Not assigned'}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Billing History */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Billing History</h3>
        <div className="space-y-3">
          {billingHistory.slice(0, 5).map((bill) => (
            <BillingCard
              key={bill.id}
              bill={bill}
            />
          ))}
        </div>
      </motion.div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vital Signs Trends */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Vital Signs Trends</h3>
          <div className="h-64 flex items-center justify-center">
            <LineChart className="w-6 h-6 text-gray-400" />
            <p className="text-sm text-gray-600">Vital signs chart will be displayed here</p>
          </div>
        </motion.div>

        {/* Health Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Overview</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center">
              <ActivityIcon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Activity Level</p>
              <p className="text-lg font-bold text-green-600">Good</p>
            </div>
            <div className="text-center">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Heart Health</p>
              <p className="text-lg font-bold text-green-600">Normal</p>
            </div>
            <div className="text-center">
              <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Mental Health</p>
              <p className="text-lg font-bold text-yellow-600">Stable</p>
            </div>
            <div className="text-center">
              <Weight className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">BMI Status</p>
              <p className="text-lg font-bold text-blue-600">24.5</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PatientDashboard;
