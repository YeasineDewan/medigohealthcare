import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Calendar,
  Clock,
  DollarSign,
  TrendingUp,
  Activity,
  Star,
  Award,
  Heart,
  Brain,
  Baby,
  Pill,
  TestTube,
  Stethoscope,
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
  Trash2,
  Plus,
  ChevronRight,
  Bell,
  LogOut,
  Menu,
  Video,
  Phone,
  Mail,
  MapPin,
  Award as AwardIcon,
  TrendingDown,
  UserCheck,
  CalendarDays,
  UserPlus,
  Settings,
  Download,
  Upload,
  Zap,
  Target
} from 'lucide-react';

const DoctorPanel = () => {
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState(3);
  const [selectedTimeRange, setSelectedTimeRange] = useState('week');
  const [darkMode, setDarkMode] = useState(false);

  const [doctorProfile, setDoctorProfile] = useState({
    name: 'Dr. Sarah Johnson',
    specialization: 'Cardiology',
    department: 'Cardiology',
    experience: 12,
    rating: 4.9,
    patients: 234,
    appointments: 1567,
    availability: 'Available',
    consultationFee: 200,
    languages: ['English', 'Spanish'],
    education: [
      { degree: 'MD', university: 'Harvard Medical School', year: '2008' },
      { degree: 'PhD', university: 'Johns Hopkins University', year: '2012' }
    ],
    awards: ['Best Doctor 2023', 'Research Excellence Award'],
    availableSlots: [
      { day: 'Monday', time: '09:00-17:00' },
      { day: 'Wednesday', time: '09:00-17:00' },
      { day: 'Friday', time: '09:00-17:00' }
    ]
  });

  const [stats, setStats] = useState({
    todayAppointments: 8,
    upcomingAppointments: 24,
    completedAppointments: 1567,
    cancelledAppointments: 12,
    monthlyRevenue: 12345,
    averageRating: 4.9,
    patientSatisfaction: 96,
    responseTime: '2.3 hours',
    newPatients: 15
  });

  const [todayAppointments, setTodayAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [recentPatients, setRecentPatients] = useState([]);
  const [patientReviews, setPatientReviews] = useState([]);
  const [earningsData, setEarningsData] = useState([]);

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
        setTodayAppointments([
          {
            id: 1,
            patientName: 'John Doe',
            patientImage: '/api/placeholder/1',
            time: '09:00 AM',
            duration: '30 min',
            type: 'Consultation',
            status: 'confirmed',
            payment: 'Paid'
          },
          {
            id: 2,
            patientName: 'Emily Davis',
            patientImage: '/api/placeholder/2',
            time: '10:30 AM',
            duration: '45 min',
            type: 'Follow-up',
            status: 'confirmed',
            payment: 'Pending'
          },
          {
            id: 3,
            patientName: 'Michael Chen',
            patientImage: '/api/placeholder/3',
            time: '02:00 PM',
            duration: '60 min',
            type: 'Surgery Consultation',
            status: 'scheduled',
            payment: 'Pending'
          }
        ]);

        setUpcomingAppointments([
          {
            id: 4,
            patientName: 'Sarah Williams',
            patientImage: '/api/placeholder/4',
            date: 'Tomorrow',
            time: '11:00 AM',
            duration: '30 min',
            type: 'Consultation',
            status: 'confirmed'
          },
          {
            id: 5,
            patientName: 'Robert Johnson',
            patientImage: '/api/placeholder/5',
            date: 'Apr 5, 2024',
            time: '03:30 PM',
            duration: '45 min',
            type: 'Follow-up',
            status: 'scheduled'
          }
        ]);

        setRecentPatients([
          {
            id: 1,
            name: 'Alice Brown',
            age: 34,
            gender: 'Female',
            lastVisit: '2 days ago',
            condition: 'Hypertension',
            avatar: '/api/placeholder/6'
          },
          {
            id: 2,
            name: 'David Wilson',
            age: 45,
            gender: 'Male',
            lastVisit: '1 week ago',
            condition: 'Diabetes Type 2',
            avatar: '/api/placeholder/7'
          }
        ]);

        setPatientReviews([
          {
            id: 1,
            patientName: 'John Doe',
            rating: 5,
            comment: 'Excellent doctor! Very thorough and caring.',
            date: '2 days ago',
            avatar: '/api/placeholder/1'
          },
          {
            id: 2,
            patientName: 'Emily Davis',
            rating: 4,
            comment: 'Dr. Johnson is very knowledgeable and takes time to explain everything.',
            date: '1 week ago',
            avatar: '/api/placeholder/2'
          }
        ]);

        setEarningsData([
          { month: 'Jan', earnings: 8900 },
          { month: 'Feb', earnings: 9200 },
          { month: 'Mar', earnings: 10500 },
          { month: 'Apr', earnings: 9800 },
          { month: 'May', earnings: 11200 },
          { month: 'Jun', earnings: 12345 }
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
      className={`fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-teal-600 to-teal-800 text-white z-50 ${sidebarOpen ? 'block' : 'hidden lg:block'}`}
    >
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-8">
          <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
            <Stethoscope className="w-6 h-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold">Doctor Panel</h2>
            <p className="text-xs text-teal-200">{doctorProfile.specialization}</p>
          </div>
        </div>

        <nav className="space-y-2">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'appointments', label: 'Appointments', icon: Calendar },
            { id: 'patients', label: 'Patients', icon: Users },
            { id: 'schedule', label: 'Schedule', icon: CalendarDays },
            { id: 'medical-records', label: 'Medical Records', icon: FileText },
            { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
            { id: 'earnings', label: 'Earnings', icon: DollarSign },
            { id: 'reviews', label: 'Reviews', icon: Star },
            { id: 'telemedicine', label: 'Telemedicine', icon: Video },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-teal-700 text-white'
                  : 'hover:bg-teal-700 text-teal-200'
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
            placeholder="Search patients, appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <select
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        >
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="year">This Year</option>
        </select>

        <button className="flex items-center space-x-2 px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700">
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>

        <div className="flex items-center space-x-3 pl-4 border-l border-gray-300">
          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-full"></div>
          <div>
            <p className="text-sm font-medium text-gray-900">{doctorProfile.name}</p>
            <p className="text-xs text-gray-500">{doctorProfile.specialization}</p>
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
        <StatCard title="Today's Appointments" value={stats.todayAppointments} icon={Calendar} color="blue" />
        <StatCard title="Upcoming" value={stats.upcomingAppointments} icon={Clock} color="green" />
        <StatCard title="Completed" value={stats.completedAppointments} icon={CheckCircle} color="purple" />
        <StatCard title="Cancelled" value={stats.cancelledAppointments} icon={AlertCircle} color="red" />
        <StatCard title="Monthly Revenue" value={`$${stats.monthlyRevenue.toLocaleString()}`} icon={DollarSign} color="green" change={15.3} trend="up" />
        <StatCard title="Avg Rating" value={stats.averageRating} icon={Star} color="yellow" />
        <StatCard title="Satisfaction" value={`${stats.patientSatisfaction}%`} icon={Heart} color="pink" />
        <StatCard title="Response Time" value={stats.responseTime} icon={Zap} color="orange" />
        <StatCard title="New Patients" value={stats.newPatients} icon={UserPlus} color="teal" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-blue-600" />
            Today's Appointments
          </h3>
          <div className="space-y-3">
            {todayAppointments.map((appointment) => (
              <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <img
                    src={appointment.patientImage}
                    alt={appointment.patientName}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{appointment.patientName}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Clock className="w-3 h-3" />
                      <span>{appointment.time} • {appointment.duration}</span>
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        appointment.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        appointment.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    appointment.payment === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {appointment.payment}
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
            <Users className="w-5 h-5 mr-2 text-teal-600" />
            Recent Patients
          </h3>
          <div className="space-y-3">
            {recentPatients.map((patient) => (
              <div key={patient.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <img
                    src={patient.avatar}
                    alt={patient.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{patient.name}</p>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{patient.age} years • {patient.gender}</span>
                      <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                        {patient.condition}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">Last visit: {patient.lastVisit}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
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
        <UserCheck className="w-5 h-5 mr-2 text-teal-600" />
        Doctor Profile
      </h3>
      <div className="flex items-start space-x-6">
        <div className="flex-shrink-0">
          <div className="w-24 h-24 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
            <Stethoscope className="w-12 h-12 text-white" />
          </div>
        </div>
        <div className="flex-1 space-y-4">
          <div>
            <h4 className="text-xl font-bold text-gray-900">{doctorProfile.name}</h4>
            <p className="text-gray-600">{doctorProfile.specialization} • {doctorProfile.department}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Experience</p>
              <p className="font-medium">{doctorProfile.experience} years</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Rating</p>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-medium">{doctorProfile.rating}</span>
              </div>
            </div>
            <div>
              <p className="text-sm text-gray-600">Consultation Fee</p>
              <p className="font-medium">${doctorProfile.consultationFee}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Availability</p>
              <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
                {doctorProfile.availability}
              </span>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Languages</p>
            <div className="flex flex-wrap gap-2">
              {doctorProfile.languages.map((lang, index) => (
                <span key={index} className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                  {lang}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-2">Education</p>
            <div className="space-y-2">
              {doctorProfile.education.map((edu, index) => (
                <div key={index} className="flex items-center space-x-2 text-sm">
                  <AwardIcon className="w-4 h-4 text-yellow-500" />
                  <span>{edu.degree} • {edu.university} ({edu.year})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
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
            <h1 className="text-3xl font-bold text-gray-900">Doctor Dashboard</h1>
            <p className="text-gray-600">Manage your practice and patients</p>
          </div>

          {activeSection === 'dashboard' && <DashboardSection />}
          {activeSection === 'appointments' && <DashboardSection />}
          {activeSection === 'patients' && <DashboardSection />}
          {activeSection === 'schedule' && <DashboardSection />}
          {activeSection === 'medical-records' && <DashboardSection />}
          {activeSection === 'prescriptions' && <DashboardSection />}
          {activeSection === 'earnings' && <DashboardSection />}
          {activeSection === 'reviews' && <DashboardSection />}
          {activeSection === 'telemedicine' && <DashboardSection />}
          {activeSection === 'settings' && <ProfileSection />}
        </main>
      </div>
    </div>
  );
};

export default DoctorPanel;
