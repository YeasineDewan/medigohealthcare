import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  User, Calendar, Clock, Heart, Activity, FileText, Download, Upload,
  Bell, Settings, Search, Filter, Plus, Edit, Trash2, Save, X, ChevronRight,
  TrendingUp, TrendingDown, AlertCircle, CheckCircle, XCircle, Star,
  Phone, Mail, MapPin, CreditCard, Shield, Award, Target, Zap,
  BarChart3, PieChart, LineChart, Stethoscope, Pill, FlaskConical,
  Microscope, TestTube, Clipboard, ClipboardCheck, Camera, Video,
  MessageSquare, PhoneCall, VideoOff, Mic, MicOff, Wifi, Battery,
  Sun, Moon, Globe, Languages, BookOpen, GraduationCap, Briefcase,
  Building, Hospital, Users, UserCheck, UserPlus, UserMinus,
  FileSearch, FileDown, FileUp, FileSignature, Receipt, Wallet, PiggyBank, DollarSign, TrendingUp as TrendingUpIcon,
  Activity as ActivityIcon, Heart as HeartIcon, Shield as ShieldIcon,
  Award as AwardIcon, Target as TargetIcon, Zap as ZapIcon
} from 'lucide-react';

export default function AdvancedPatientDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);

  // Patient Profile State
  const [patientProfile, setPatientProfile] = useState({
    personalInfo: {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@email.com',
      phone: '+8801234567890',
      dateOfBirth: '1990-01-15',
      gender: 'Male',
      bloodGroup: 'O+',
      address: '123 Main Street, Dhaka, Bangladesh',
      emergencyContact: {
        name: 'Jane Doe',
        relationship: 'Spouse',
        phone: '+8800987654321'
      }
    },
    medicalInfo: {
      height: '175',
      weight: '70',
      allergies: ['Penicillin', 'Peanuts'],
      chronicConditions: ['Hypertension', 'Diabetes Type 2'],
      medications: ['Metformin', 'Lisinopril'],
      lastCheckup: '2024-01-15',
      primaryPhysician: 'Dr. Ahmed Hassan',
      insurance: {
        provider: 'HealthCare Plus',
        policyNumber: 'HC-123456789',
        coverage: 'Premium'
      }
    },
    preferences: {
      language: 'English',
      notifications: 'email',
      appointmentReminders: true,
      healthTips: true,
      dataSharing: false
    }
  });

  // Sample data
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      doctor: 'Dr. Ahmed Hassan',
      specialty: 'Cardiology',
      date: '2024-01-20',
      time: '10:00 AM',
      type: 'Follow-up',
      status: 'confirmed',
      location: 'City Hospital, Room 201'
    },
    {
      id: 2,
      doctor: 'Dr. Sarah Smith',
      specialty: 'General Medicine',
      date: '2024-01-25',
      time: '2:30 PM',
      type: 'Consultation',
      status: 'pending',
      location: 'Medical Center, Floor 3'
    }
  ]);

  const [medicalRecords, setMedicalRecords] = useState([
    {
      id: 1,
      type: 'Blood Test',
      date: '2024-01-15',
      doctor: 'Dr. Ahmed Hassan',
      status: 'completed',
      results: 'Normal',
      file: 'blood_test_2024.pdf'
    },
    {
      id: 2,
      type: 'X-Ray',
      date: '2024-01-10',
      doctor: 'Dr. Sarah Smith',
      status: 'completed',
      results: 'No abnormalities',
      file: 'xray_chest_2024.pdf'
    }
  ]);

  const [notifications, setNotifications] = useState([
    { id: 1, title: 'Appointment Reminder', message: 'Your appointment with Dr. Ahmed Hassan is tomorrow', time: '2 hours ago', type: 'reminder' },
    { id: 2, title: 'Test Results Ready', message: 'Your blood test results are now available', time: '1 day ago', type: 'info' },
    { id: 3, title: 'Payment Confirmation', message: 'Your payment for consultation has been received', time: '2 days ago', type: 'success' }
  ]);

  const healthStats = [
    { title: 'Heart Rate', value: '72', unit: 'bpm', status: 'normal', icon: Heart, color: 'red' },
    { title: 'Blood Pressure', value: '120/80', unit: 'mmHg', status: 'normal', icon: Activity, color: 'blue' },
    { title: 'Blood Sugar', value: '95', unit: 'mg/dL', status: 'normal', icon: FlaskConical, color: 'green' },
    { title: 'BMI', value: '22.9', unit: 'kg/m²', status: 'normal', icon: Target, color: 'purple' }
  ];

  const quickActions = [
    { title: 'Book Appointment', description: 'Schedule a new appointment', icon: Calendar, color: 'blue', action: () => navigate('/patient/book') },
    { title: 'View Records', description: 'Access your medical records', icon: FileText, color: 'green', action: () => setActiveTab('records') },
    { title: 'Consult Doctor', description: 'Start video consultation', icon: Video, color: 'purple', action: () => navigate('/patient/live-consult') },
    { title: 'Order Medicine', description: 'Order prescribed medicines', icon: Pill, color: 'orange', action: () => navigate('/patient/orders') }
  ];

  const handleProfileUpdate = (section, field, value) => {
    setPatientProfile(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSaveProfile = () => {
    // In production, this would save to backend
    console.log('Saving profile:', patientProfile);
    setEditingProfile(false);
  };

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.5, ease: "easeOut" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
      >
        {healthStats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`p-2 rounded-lg bg-${stat.color}-50`}>
                <stat.icon className={`w-5 h-5 text-${stat.color}-600`} />
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                stat.status === 'normal' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {stat.status}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-600">{stat.title}</p>
              <p className="text-xs text-gray-500">{stat.unit}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action, index) => (
            <motion.button
              key={action.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              onClick={action.action}
              className="p-4 rounded-lg border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all text-left"
            >
              <div className={`p-2 rounded-lg bg-${action.color}-50 mb-3`}>
                <action.icon className={`w-6 h-6 text-${action.color}-600`} />
              </div>
              <h4 className="font-medium text-gray-900 mb-1">{action.title}</h4>
              <p className="text-sm text-gray-600">{action.description}</p>
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Upcoming Appointments */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
          <button
            onClick={() => setActiveTab('appointments')}
            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
          >
            View All
          </button>
        </div>
        <div className="space-y-3">
          {appointments.slice(0, 2).map((appointment) => (
            <div key={appointment.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Calendar className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{appointment.doctor}</p>
                  <p className="text-sm text-gray-600">{appointment.specialty} • {appointment.type}</p>
                  <p className="text-xs text-gray-500">{appointment.date} at {appointment.time}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {appointment.status}
              </span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderProfile = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Profile Information</h3>
          <button
            onClick={() => setEditingProfile(!editingProfile)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              editingProfile
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {editingProfile ? (
              <>
                <X className="w-4 h-4 inline mr-2" />
                Cancel
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 inline mr-2" />
                Edit Profile
              </>
            )}
          </button>
        </div>

        {/* Personal Information */}
        <div className="space-y-6">
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Personal Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  value={patientProfile.personalInfo.firstName}
                  onChange={(e) => handleProfileUpdate('personalInfo', 'firstName', e.target.value)}
                  disabled={!editingProfile}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  value={patientProfile.personalInfo.lastName}
                  onChange={(e) => handleProfileUpdate('personalInfo', 'lastName', e.target.value)}
                  disabled={!editingProfile}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={patientProfile.personalInfo.email}
                  onChange={(e) => handleProfileUpdate('personalInfo', 'email', e.target.value)}
                  disabled={!editingProfile}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  value={patientProfile.personalInfo.phone}
                  onChange={(e) => handleProfileUpdate('personalInfo', 'phone', e.target.value)}
                  disabled={!editingProfile}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={patientProfile.personalInfo.dateOfBirth}
                  onChange={(e) => handleProfileUpdate('personalInfo', 'dateOfBirth', e.target.value)}
                  disabled={!editingProfile}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Group</label>
                <select
                  value={patientProfile.personalInfo.bloodGroup}
                  onChange={(e) => handleProfileUpdate('personalInfo', 'bloodGroup', e.target.value)}
                  disabled={!editingProfile}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Medical Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (cm)</label>
                <input
                  type="number"
                  value={patientProfile.medicalInfo.height}
                  onChange={(e) => handleProfileUpdate('medicalInfo', 'height', e.target.value)}
                  disabled={!editingProfile}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (kg)</label>
                <input
                  type="number"
                  value={patientProfile.medicalInfo.weight}
                  onChange={(e) => handleProfileUpdate('medicalInfo', 'weight', e.target.value)}
                  disabled={!editingProfile}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Primary Physician</label>
                <input
                  type="text"
                  value={patientProfile.medicalInfo.primaryPhysician}
                  onChange={(e) => handleProfileUpdate('medicalInfo', 'primaryPhysician', e.target.value)}
                  disabled={!editingProfile}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Provider</label>
                <input
                  type="text"
                  value={patientProfile.medicalInfo.insurance.provider}
                  onChange={(e) => handleProfileUpdate('medicalInfo', 'insurance', { ...patientProfile.medicalInfo.insurance, provider: e.target.value })}
                  disabled={!editingProfile}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div>
            <h4 className="text-md font-medium text-gray-900 mb-4">Address</h4>
            <textarea
              value={patientProfile.personalInfo.address}
              onChange={(e) => handleProfileUpdate('personalInfo', 'address', e.target.value)}
              disabled={!editingProfile}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>
        </div>

        {editingProfile && (
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={() => setEditingProfile(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSaveProfile}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Save className="w-4 h-4 inline mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Appointments</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4 inline mr-2" />
            Book Appointment
          </button>
        </div>

        <div className="space-y-4">
          {appointments.map((appointment) => (
            <motion.div
              key={appointment.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <Stethoscope className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{appointment.doctor}</h4>
                    <p className="text-sm text-gray-600">{appointment.specialty}</p>
                    <p className="text-xs text-gray-500">{appointment.location}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">{appointment.date}</p>
                  <p className="text-sm text-gray-600">{appointment.time}</p>
                  <span className={`inline-block mt-1 px-2 py-1 rounded-full text-xs font-medium ${
                    appointment.status === 'confirmed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {appointment.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  const renderRecords = () => (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Medical Records</h3>
          <div className="flex gap-2">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4 inline mr-2" />
              Filter
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Upload className="w-4 h-4 inline mr-2" />
              Upload Records
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {medicalRecords.map((record) => (
            <motion.div
              key={record.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-lg bg-green-50">
                    <FileText className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">{record.type}</h4>
                    <p className="text-sm text-gray-600">Dr. {record.doctor}</p>
                    <p className="text-xs text-gray-500">{record.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    record.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {record.status}
                  </span>
                  <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold text-gray-900">Patient Dashboard</h1>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 rounded-lg hover:bg-gray-100"
              >
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                {darkMode ? <Sun className="w-5 h-5 text-gray-600" /> : <Moon className="w-5 h-5 text-gray-600" />}
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100"
                >
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="px-6">
          <nav className="flex space-x-8">
            {['overview', 'profile', 'appointments', 'records'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="p-6">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'profile' && renderProfile()}
          {activeTab === 'appointments' && renderAppointments()}
          {activeTab === 'records' && renderRecords()}
        </motion.div>
      </main>
    </div>
  );
}
