import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  FileText,
  FileSpreadsheet,
  Printer,
  Plus,
  Eye,
  Edit3,
  Trash2,
  X,
  Calendar,
  Clock,
  User,
  Stethoscope,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Video,
  DollarSign,
  RefreshCw,
  CalendarDays,
  Clock3,
  Bell,
  Check
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV, printData } from '../../../utils/exportUtils';

const PatientAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('list'); // list or calendar
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [filters, setFilters] = useState({
    status: 'all',
    doctor: 'all',
    department: 'all',
    dateRange: 'all'
  });

  // Mock data
  const mockAppointments = [
    {
      id: 1,
      appointmentId: 'APT-2024-001',
      patient: { id: 1, name: 'Ahmed Khan', phone: '+880 1712345678', email: 'ahmed@email.com', patientId: 'PT-2024-0001' },
      doctor: { id: 1, name: 'Dr. Mohammad Hasan', department: 'General Medicine', specialization: 'Internal Medicine' },
      date: '2024-03-15',
      time: '09:00 AM',
      duration: 30,
      type: 'consultation',
      status: 'confirmed',
      symptoms: 'Regular checkup',
      notes: 'Follow up from previous visit',
      fee: 500,
      paymentStatus: 'paid'
    },
    {
      id: 2,
      appointmentId: 'APT-2024-002',
      patient: { id: 2, name: 'Sara Ali', phone: '+880 1912345678', email: 'sara@email.com', patientId: 'PT-2024-0002' },
      doctor: { id: 2, name: 'Dr. Fatima Ahmed', department: 'Cardiology', specialization: 'Heart Specialist' },
      date: '2024-03-15',
      time: '10:00 AM',
      duration: 45,
      type: 'follow-up',
      status: 'confirmed',
      symptoms: 'Chest discomfort',
      notes: 'ECG results review',
      fee: 800,
      paymentStatus: 'paid'
    },
    {
      id: 3,
      appointmentId: 'APT-2024-003',
      patient: { id: 3, name: 'Rahman Hossain', phone: '+880 1612345678', email: 'rahman@email.com', patientId: 'PT-2024-0003' },
      doctor: { id: 3, name: 'Dr. Kamal Ahmed', department: 'Neurology', specialization: 'Brain & Nerves' },
      date: '2024-03-15',
      time: '11:30 AM',
      duration: 30,
      type: 'consultation',
      status: 'pending',
      symptoms: 'Headache',
      notes: 'First visit',
      fee: 600,
      paymentStatus: 'unpaid'
    },
    {
      id: 4,
      appointmentId: 'APT-2024-004',
      patient: { id: 4, name: 'Fatema Begum', phone: '+880 1512345678', email: 'fatema@email.com', patientId: 'PT-2024-0004' },
      doctor: { id: 1, name: 'Dr. Mohammad Hasan', department: 'General Medicine', specialization: 'Internal Medicine' },
      date: '2024-03-16',
      time: '09:30 AM',
      duration: 30,
      type: 'checkup',
      status: 'confirmed',
      symptoms: 'Annual checkup',
      notes: '',
      fee: 500,
      paymentStatus: 'paid'
    },
    {
      id: 5,
      appointmentId: 'APT-2024-005',
      patient: { id: 5, name: 'Mohammad Yusuf', phone: '+880 1812345679', email: 'yusuf@email.com', patientId: 'PT-2024-0005' },
      doctor: { id: 4, name: 'Dr. Lisa Rahman', department: 'Pediatrics', specialization: 'Child Specialist' },
      date: '2024-03-16',
      time: '10:30 AM',
      duration: 30,
      type: 'consultation',
      status: 'cancelled',
      symptoms: 'Child fever',
      notes: 'Cancelled by patient',
      fee: 400,
      paymentStatus: 'refunded'
    },
    {
      id: 6,
      appointmentId: 'APT-2024-006',
      patient: { id: 6, name: 'Jasmine Ahmed', phone: '+880 1912345670', email: 'jasmine@email.com', patientId: 'PT-2024-0006' },
      doctor: { id: 2, name: 'Dr. Fatima Ahmed', department: 'Cardiology', specialization: 'Heart Specialist' },
      date: '2024-03-17',
      time: '02:00 PM',
      duration: 45,
      type: 'follow-up',
      status: 'confirmed',
      symptoms: 'Post-surgery follow-up',
      notes: 'Review echocardiogram',
      fee: 1000,
      paymentStatus: 'paid'
    },
    {
      id: 7,
      appointmentId: 'APT-2024-007',
      patient: { id: 1, name: 'Ahmed Khan', phone: '+880 1712345678', email: 'ahmed@email.com', patientId: 'PT-2024-0001' },
      doctor: { id: 5, name: 'Dr. Robert Chen', department: 'Orthopedics', specialization: 'Bone & Joint' },
      date: '2024-03-17',
      time: '11:00 AM',
      duration: 30,
      type: 'consultation',
      status: 'completed',
      symptoms: 'Knee pain',
      notes: 'X-ray recommended',
      fee: 700,
      paymentStatus: 'paid'
    },
    {
      id: 8,
      appointmentId: 'APT-2024-008',
      patient: { id: 2, name: 'Sara Ali', phone: '+880 1912345678', email: 'sara@email.com', patientId: 'PT-2024-0002' },
      doctor: { id: 1, name: 'Dr. Mohammad Hasan', department: 'General Medicine', specialization: 'Internal Medicine' },
      date: '2024-03-18',
      time: '03:00 PM',
      duration: 30,
      type: 'checkup',
      status: 'confirmed',
      symptoms: 'General wellness',
      notes: '',
      fee: 500,
      paymentStatus: 'unpaid'
    }
  ];

  const doctors = ['All Doctors', 'Dr. Mohammad Hasan', 'Dr. Fatima Ahmed', 'Dr. Kamal Ahmed', 'Dr. Lisa Rahman', 'Dr. Robert Chen'];
  const departments = ['All Departments', 'General Medicine', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics'];
  const statuses = [
    { value: 'all', label: 'All Status', color: 'gray' },
    { value: 'pending', label: 'Pending', color: 'yellow' },
    { value: 'confirmed', label: 'Confirmed', color: 'blue' },
    { value: 'completed', label: 'Completed', color: 'green' },
    { value: 'cancelled', label: 'Cancelled', color: 'red' }
  ];
  const appointmentTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'consultation', label: 'Consultation' },
    { value: 'follow-up', label: 'Follow-up' },
    { value: 'checkup', label: 'Checkup' },
    { value: 'emergency', label: 'Emergency' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setAppointments(mockAppointments);
      setLoading(false);
    }, 800);
  }, []);

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = 
      apt.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.patient.phone.includes(searchTerm) ||
      apt.doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.appointmentId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = filters.status === 'all' || apt.status === filters.status;
    const matchesDoctor = filters.doctor === 'all' || apt.doctor.name === filters.doctor;
    const matchesDepartment = filters.department === 'all' || apt.doctor.department === filters.department;
    
    return matchesSearch && matchesStatus && matchesDoctor && matchesDepartment;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', icon: Clock },
      confirmed: { bg: 'bg-blue-100', text: 'text-blue-700', icon: Bell },
      completed: { bg: 'bg-green-100', text: 'text-green-700', icon: CheckCircle },
      cancelled: { bg: 'bg-red-100', text: 'text-red-700', icon: XCircle }
    };
    const config = statusConfig[status] || statusConfig.pending;
    const Icon = config.icon;
    
    return (
      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const handleStatusChange = (appointmentId, newStatus) => {
    setAppointments(appointments.map(apt => 
      apt.id === appointmentId ? { ...apt, status: newStatus } : apt
    ));
  };

  const handleExport = (format) => {
    const columns = [
      { key: 'appointmentId', label: 'Appointment ID' },
      { key: 'patientName', label: 'Patient' },
      { key: 'patientId', label: 'Patient ID' },
      { key: 'doctor', label: 'Doctor' },
      { key: 'department', label: 'Department' },
      { key: 'date', label: 'Date' },
      { key: 'time', label: 'Time' },
      { key: 'type', label: 'Type' },
      { key: 'status', label: 'Status' },
      { key: 'fee', label: 'Fee' }
    ];
    
    const data = filteredAppointments.map(apt => ({
      ...apt,
      patientName: apt.patient.name,
      doctor: apt.doctor.name,
      department: apt.doctor.department,
      fee: `$${apt.fee}`
    }));

    switch (format) {
      case 'pdf':
        exportToPDF(data, 'Appointments Report', columns);
        break;
      case 'csv':
        exportToCSV(data, 'appointments-report');
        break;
      case 'print':
        printData(data, 'Appointments Report');
        break;
      default:
        break;
    }
  };

  // Statistics
  const totalAppointments = appointments.length;
  const todayAppointments = appointments.filter(a => a.date === '2024-03-15').length;
  const confirmedAppointments = appointments.filter(a => a.status === 'confirmed').length;
  const pendingAppointments = appointments.filter(a => a.status === 'pending').length;
  const completedAppointments = appointments.filter(a => a.status === 'completed').length;
  const totalRevenue = appointments.filter(a => a.paymentStatus === 'paid').reduce((sum, a) => sum + a.fee, 0);

  // Calendar helper
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDay = firstDay.getDay();
    
    return { daysInMonth, startingDay, year, month };
  };

  const formatDate = (date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  };

  const getAppointmentsForDate = (dateStr) => {
    return appointments.filter(apt => apt.date === dateStr);
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
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Appointments</h1>
          <p className="text-gray-500 mt-1">Manage and track all patient appointments</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          
          {/* View Toggle */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 ${viewMode === 'list' ? 'bg-[#5DBB63] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-2 ${viewMode === 'calendar' ? 'bg-[#5DBB63] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <CalendarDays className="w-4 h-4" />
            </button>
          </div>

          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <button onClick={() => handleExport('pdf')} className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                <FileText className="w-4 h-4" /> Export as PDF
              </button>
              <button onClick={() => handleExport('csv')} className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                <FileSpreadsheet className="w-4 h-4" /> Export as CSV
              </button>
              <button onClick={() => handleExport('print')} className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                <Printer className="w-4 h-4" /> Print
              </button>
            </div>
          </div>
          
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]">
            <Plus className="w-4 h-4" />
            New Appointment
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-xl font-bold text-gray-900">{totalAppointments}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <Clock className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-xl font-bold text-gray-900">{pendingAppointments}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Bell className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Confirmed</p>
              <p className="text-xl font-bold text-gray-900">{confirmedAppointments}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Check className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-xl font-bold text-gray-900">{completedAppointments}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <DollarSign className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">Revenue</p>
              <p className="text-xl font-bold text-gray-900">৳{totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  {statuses.map(s => (
                    <option key={s.value} value={s.value}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                <select
                  value={filters.doctor}
                  onChange={(e) => setFilters({ ...filters, doctor: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  {doctors.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={filters.department}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  {departments.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Appointment Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]">
                  {appointmentTypes.map(t => (
                    <option key={t.value} value={t.value}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search appointments by patient, doctor, or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          />
        </div>
      </div>

      {/* List View */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Appointment</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date & Time</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fee</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredAppointments.map((apt, index) => (
                  <motion.tr
                    key={apt.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-mono text-sm text-gray-600">{apt.appointmentId}</p>
                        <p className="text-xs text-gray-500">{apt.duration} minutes</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{apt.patient.name}</p>
                          <p className="text-xs text-gray-500">{apt.patient.patientId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{apt.doctor.name}</p>
                        <p className="text-xs text-gray-500">{apt.doctor.department}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-900">{apt.date}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm mt-1">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-500">{apt.time}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded capitalize">
                        {apt.type}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(apt.status)}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">৳{apt.fee}</p>
                        <p className={`text-xs ${apt.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {apt.paymentStatus}
                        </p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {apt.status === 'pending' && (
                          <button
                            onClick={() => handleStatusChange(apt.id, 'confirmed')}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Confirm"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                        )}
                        {apt.status === 'confirmed' && (
                          <button
                            onClick={() => handleStatusChange(apt.id, 'completed')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Complete"
                          >
                            <Check className="w-4 h-4" />
                          </button>
                        )}
                        <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Edit">
                          <Edit3 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Calendar View */}
      {viewMode === 'calendar' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() - 1, 1))}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => setSelectedDate(new Date())}
                className="px-3 py-1 text-sm bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50]"
              >
                Today
              </button>
              <button
                onClick={() => setSelectedDate(new Date(selectedDate.getFullYear(), selectedDate.getMonth() + 1, 1))}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-medium text-gray-600 py-2">
                {day}
              </div>
            ))}
            
            {(() => {
              const { daysInMonth, startingDay, year, month } = getDaysInMonth(selectedDate);
              const days = [];
              
              // Empty cells for days before the first day of month
              for (let i = 0; i < startingDay; i++) {
                days.push(<div key={`empty-${i}`} className="h-24"></div>);
              }
              
              // Days of the month
              for (let day = 1; day <= daysInMonth; day++) {
                const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                const dayAppointments = getAppointmentsForDate(dateStr);
                const isToday = dateStr === formatDate(new Date());
                
                days.push(
                  <div
                    key={day}
                    className={`h-24 border border-gray-200 rounded-lg p-2 overflow-y-auto ${
                      isToday ? 'bg-blue-50 border-blue-300' : 'hover:bg-gray-50'
                    }`}
                  >
                    <p className={`text-sm font-medium ${isToday ? 'text-blue-600' : 'text-gray-700'}`}>
                      {day}
                    </p>
                    <div className="mt-1 space-y-1">
                      {dayAppointments.slice(0, 2).map(apt => (
                        <div
                          key={apt.id}
                          className={`text-xs p-1 rounded truncate ${
                            apt.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                            apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            apt.status === 'completed' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}
                        >
                          {apt.time} - {apt.patient.name}
                        </div>
                      ))}
                      {dayAppointments.length > 2 && (
                        <p className="text-xs text-gray-500">+{dayAppointments.length - 2} more</p>
                      )}
                    </div>
                  </div>
                );
              }
              
              return days;
            })()}
          </div>
        </div>
      )}

      {/* No Results */}
      {filteredAppointments.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No appointments found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilters({ status: 'all', doctor: 'all', department: 'all', dateRange: 'all' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-[#5DBB63] font-medium hover:underline"
          >
            <RefreshCw className="w-4 h-4" />
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;

