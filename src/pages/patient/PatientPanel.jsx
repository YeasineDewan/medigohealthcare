import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  DollarSign,
  Heart,
  Brain,
  Baby,
  Pill,
  TestTube,
  FileText,
  BarChart3,
  PieChart,
  CheckCircle,
  AlertCircle,
  RefreshCw,
  Search,
  Filter,
  Eye,
  Edit3,
  Plus,
  ChevronRight,
  Bell,
  LogOut,
  Menu,
  Video,
  Phone,
  Mail,
  MapPin,
  User,
  Activity,
  TrendingUp,
  TrendingDown,
  Shield,
  Download,
  Upload,
  Stethoscope,
  Award,
  Star,
  Thermometer,
  Weight,
  Zap,
  Target,
  Users,
  Settings,
  CreditCard,
  FileDown,
  CalendarDays,
  Clock3,
  CheckSquare,
  AlertTriangle
} from 'lucide-react';

const PatientPanel = () => {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(2);
  const [selectedTimeRange, setSelectedTimeRange] = useState('month');
  const [darkMode, setDarkMode] = useState(false);

  const [patientProfile, setPatientProfile] = useState({
    name: 'John Doe',
    age: 34,
    gender: 'Male',
    bloodType: 'A+',
    email: 'john.doe@email.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main St, Boston, MA 02101',
    primaryPhysician: 'Dr. Sarah Johnson',
    insuranceProvider: 'Blue Cross Blue Shield',
    policyNumber: 'POL123456',
    registrationDate: '2022-03-15',
    lastVisit: '2024-03-28',
    bmi: '24.5',
    outstandingBalance: 250.00
  });

  const [healthStats, setHealthStats] = useState({
    totalAppointments: 23,
    upcomingAppointments: 3,
    completedAppointments: 20,
    cancelledAppointments: 0,
    totalMedicalRecords: 15,
    totalPrescriptions: 8,
    totalLabTests: 12,
    outstandingBalance: 250.00,
    totalSpent: 1850.00,
    insuranceCoverage: '80%',
    primaryPhysician: 'Dr. Sarah Johnson'
  });

  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentMedicalRecords, setRecentMedicalRecords] = useState([]);
  const [currentMedications, setCurrentMedications] = useState([]);
  const [recentLabTests, setRecentLabTests] = useState([]);
  const [billingHistory, setBillingHistory] = useState([]);
  const [vitalSigns, setVitalSigns] = useState([]);
  const [healthMetrics, setHealthMetrics] = useState({});

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
      setTimeout(() => {
        setUpcomingAppointments([
          {
            id: 1,
            doctorName: 'Dr. Sarah Johnson',
            doctorSpecialization: 'Cardiology',
            date: 'Tomorrow',
            time: '10:00 AM',
            duration: '30 min',
            type: 'Follow-up',
            status: 'confirmed',
            location: 'Main Hospital, Room 204',
            notes: 'Regular checkup for hypertension monitoring'
          },
          {
            id: 2,
            doctorName: 'Dr. Michael Chen',
            doctorSpecialization: 'Neurology',
            date: 'Apr 8, 2024',
            time: '02:30 PM',
            duration: '45 min',
            type: 'Consultation',
            status: 'scheduled',
            location: 'Medical Center, Building A',
            notes: 'Follow-up on migraine treatment'
          }
        ]);

        setRecentMedicalRecords([
          {
            id: 1,
            recordNumber: 'MR20240315001',
            doctorName: 'Dr. Sarah Johnson',
            visitDate: '2024-03-15',
            diagnosis: 'Hypertension Stage 1',
            treatment: 'Lifestyle modifications and medication',
            symptoms: 'Occasional headaches, elevated blood pressure',
            vitalSigns: {
              bloodPressure: '140/90',
              heartRate: '85',
              temperature: '98.6'
            }
          },
          {
            id: 2,
            recordNumber: 'MR20240228001',
            doctorName: 'Dr. Robert Williams',
            visitDate: '2024-02-28',
            diagnosis: 'Vitamin D deficiency',
            treatment: 'Vitamin D supplements and sun exposure',
            symptoms: 'Fatigue, muscle weakness, bone pain',
            vitalSigns: {
              bloodPressure: '120/80',
              heartRate: '72',
              temperature: '98.2'
            }
          }
        ]);

        setCurrentMedications([
          {
            id: 1,
            name: 'Lisinopril',
            dosage: '10mg',
            frequency: 'Once daily',
            prescribedBy: 'Dr. Sarah Johnson',
            startDate: '2024-03-15',
            endDate: '2024-06-15',
            remaining: '45 days'
          },
          {
            id: 2,
            name: 'Vitamin D3',
            dosage: '2000 IU',
            frequency: 'Once daily',
            prescribedBy: 'Dr. Robert Williams',
            startDate: '2024-02-28',
            endDate: '2024-05-28',
            remaining: '60 days'
          }
        ]);

        setRecentLabTests([
          {
            id: 1,
            testName: 'Complete Blood Count',
            testDate: '2024-03-15',
            status: 'Completed',
            result: 'Normal',
            doctorName: 'Dr. Sarah Johnson',
            criticalValues: []
          },
          {
            id: 2,
            testName: 'Lipid Panel',
            testDate: '2024-03-10',
            status: 'Completed',
            result: 'Borderline High',
            doctorName: 'Dr. Sarah Johnson',
            criticalValues: ['LDL Cholesterol']
          }
        ]);

        setBillingHistory([
          {
            id: 1,
            billNumber: 'BILL20240315001',
            date: '2024-03-15',
            description: 'Cardiology Consultation',
            amount: 200.00,
            status: 'Paid',
            paymentMethod: 'Credit Card',
            insuranceClaim: 'Submitted'
          },
          {
            id: 2,
            billNumber: 'BILL20240228001',
            date: '2024-02-28',
            description: 'Lab Tests - Blood Work',
            amount: 150.00,
            status: 'Paid',
            paymentMethod: 'Insurance',
            insuranceClaim: 'Approved'
          }
        ]);

        setVitalSigns([
          {
            date: '2024-03-15',
            bloodPressure: '120/80',
            heartRate: 72,
            temperature: 98.6,
            weight: 180,
            height: 72,
            bmi: 24.4
          },
          {
            date: '2024-03-01',
            bloodPressure: '135/85',
            heartRate: 78,
            temperature: 98.2,
            weight: 182,
            height: 72,
            bmi: 24.7
          }
        ]);

        setHealthMetrics({
          activityLevel: 'Moderate',
          heartHealth: 'Good',
          mentalHealth: 'Stable',
          bmiStatus: 'Normal',
          riskFactors: ['Controlled Hypertension'],
          healthScore: 85
        });

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
      orange: 'from-orange-500 to-orange-600',
      pink: 'from-pink-500 to-pink-600'
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 cursor-pointer"
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
      className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-blue-600 to-indigo-800 text-white z-50 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}
    >
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
            <Heart className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Patient Portal</h2>
            <p className="text-xs text-blue-200">Health Management</p>
          </div>
        </div>

        <nav className="space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'appointments', label: 'Appointments', icon: Calendar },
            { id: 'medical-records', label: 'Medical Records', icon: FileText },
            { id: 'medications', label: 'Medications', icon: Pill },
            { id: 'lab-results', label: 'Lab Results', icon: TestTube },
            { id: 'billing', label: 'Billing', icon: DollarSign },
            { id: 'vitals', label: 'Vital Signs', icon: Activity },
            { id: 'health-metrics', label: 'Health Metrics', icon: Heart },
            { id: 'telemedicine', label: 'Telemedicine', icon: Video },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-blue-700 text-white'
                  : 'hover:bg-blue-700 text-blue-200'
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
            placeholder="Search appointments, records, medications..."
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

        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>

        <div className="flex items-center space-x-3 pl-4 border-l border-gray-300">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          <div>
            <p className="text-sm font-medium text-gray-900">{patientProfile.name}</p>
            <p className="text-xs text-gray-500">Patient ID: PT2024001</p>
          </div>
          <button className="p-2 rounded-lg hover:bg-gray-100">
            <LogOut className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  const DashboardSection = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Total Appointments" value={healthStats.totalAppointments} icon={Calendar} color="blue" />
        <StatCard title="Upcoming" value={healthStats.upcomingAppointments} icon={Clock} color="green" />
        <StatCard title="Completed" value={healthStats.completedAppointments} icon={CheckCircle} color="purple" />
        <StatCard title="Medical Records" value={healthStats.totalMedicalRecords} icon={FileText} color="orange" />
        <StatCard title="Prescriptions" value={healthStats.totalPrescriptions} icon={Pill} color="pink" />
        <StatCard title="Lab Tests" value={healthStats.totalLabTests} icon={TestTube} color="yellow" />
        <StatCard title="Outstanding Balance" value={`$${healthStats.outstandingBalance.toFixed(2)}`} icon={DollarSign} color="red" />
        <StatCard title="Total Spent" value={`$${healthStats.totalSpent.toFixed(2)}`} icon={CreditCard} color="green" />
        <StatCard title="Insurance Coverage" value={healthStats.insuranceCoverage} icon={Shield} color="blue" />
        <StatCard title="Primary Physician" value={healthStats.primaryPhysician} icon={Stethoscope} color="teal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            Upcoming Appointments
          </h3>
          <div className="space-y-3">
            {upcomingAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{appointment.doctorName}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {appointment.doctorSpecialization}
                      </span>
                      <span>{appointment.date} • {appointment.time}</span>
                      <span>{appointment.duration}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{appointment.location}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {appointment.status}
                  </span>
                  <div className="flex items-center space-x-1">
                    <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Video className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                      <Mail className="w-4 h-4" />
                    </button>
                  </div>
                </div>
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
            <Activity className="w-5 h-5 mr-2 text-green-600" />
            Health Overview
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <Activity className="w-8 h-8 text-blue-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Activity Level</p>
              <p className="text-lg font-bold text-green-600">{healthMetrics.activityLevel}</p>
            </div>
            <div className="text-center p-4 bg-red-50 rounded-lg">
              <Heart className="w-8 h-8 text-red-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Heart Health</p>
              <p className="text-lg font-bold text-green-600">{healthMetrics.heartHealth}</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">Mental Health</p>
              <p className="text-lg font-bold text-yellow-600">{healthMetrics.mentalHealth}</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <Weight className="w-8 h-8 text-orange-500 mx-auto mb-2" />
              <p className="text-sm text-gray-600">BMI Status</p>
              <p className="text-lg font-bold text-blue-600">{healthMetrics.bmiStatus}</p>
            </div>
          </div>
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-600">Overall Health Score</p>
              <div className="flex items-center space-x-1">
                <Target className="w-4 h-4 text-green-500" />
                <span className="text-2xl font-bold text-green-600">{healthMetrics.healthScore}</span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-500 h-2 rounded-full" 
                style={{ width: `${healthMetrics.healthScore}%` }}
              ></div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const ProfileSection = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-lg p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <User className="w-5 h-5 mr-2 text-blue-600" />
        Patient Profile
      </h3>
      <div className="flex items-start space-x-6">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            <User className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h4 className="text-xl font-bold text-gray-900">{patientProfile.name}</h4>
            <p className="text-gray-600">Patient ID: PT2024001</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Age</p>
              <p className="font-medium">{patientProfile.age} years</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Gender</p>
              <p className="font-medium">{patientProfile.gender}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Blood Type</p>
              <p className="font-medium">{patientProfile.bloodType}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">BMI</p>
              <p className="font-medium">{patientProfile.bmi}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Contact Information</p>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-sm">
                <Mail className="w-4 h-4 text-gray-500" />
                <span>{patientProfile.email}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Phone className="w-4 h-4 text-gray-500" />
                <span>{patientProfile.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{patientProfile.address}</span>
              </div>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Medical Information</p>
            <div className="space-y-1">
              <div className="flex items-center space-x-2 text-sm">
                <Stethoscope className="w-4 h-4 text-gray-500" />
                <span>Primary: {patientProfile.primaryPhysician}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Shield className="w-4 h-4 text-gray-500" />
                <span>Insurance: {patientProfile.insuranceProvider}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>Member Since: {patientProfile.registrationDate}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm">
                <CalendarDays className="w-4 h-4 text-gray-500" />
                <span>Last Visit: {patientProfile.lastVisit}</span>
              </div>
            </div>
          </div>
        </div>
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
            <h1 className="text-3xl font-bold text-gray-900">Patient Dashboard</h1>
            <p className="text-gray-600">Manage your health and appointments</p>
          </div>

          {activeSection === 'dashboard' && <DashboardSection />}
          {activeSection === 'appointments' && <DashboardSection />}
          {activeSection === 'medical-records' && <DashboardSection />}
          {activeSection === 'medications' && <DashboardSection />}
          {activeSection === 'lab-results' && <DashboardSection />}
          {activeSection === 'billing' && <DashboardSection />}
          {activeSection === 'vitals' && <DashboardSection />}
          {activeSection === 'health-metrics' && <DashboardSection />}
          {activeSection === 'telemedicine' && <DashboardSection />}
          {activeSection === 'settings' && <ProfileSection />}
        </main>
      </div>
    </div>
  );
};

export default PatientPanel;
