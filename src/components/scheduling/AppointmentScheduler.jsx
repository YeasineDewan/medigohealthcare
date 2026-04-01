import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  Users,
  Stethoscope,
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Video,
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  AlertCircle,
  X,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  Download,
  Bell,
  DollarSign,
  FileText,
  Settings,
  TrendingUp,
  Activity,
  User,
  Heart,
  Brain,
  Baby,
  Pill,
  TestTube,
  Award,
  Star,
  MessageSquare,
  ChevronDown,
  ChevronUp,
  Zap,
  Target
} from 'lucide-react';

const AppointmentScheduler = () => {
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patients, setPatients] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('calendar'); // calendar, list, timeline
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDoctor, setFilterDoctor] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    duration: '30',
    type: 'consultation',
    notes: '',
    location: '',
    isVirtual: false,
    reminderEnabled: true,
    paymentMethod: 'insurance'
  });

  const appointmentTypes = [
    { value: 'consultation', label: 'Consultation', icon: Stethoscope, color: 'blue' },
    { value: 'follow_up', label: 'Follow-up', icon: Heart, color: 'green' },
    { value: 'surgery', label: 'Surgery', icon: Brain, color: 'red' },
    { value: 'emergency', label: 'Emergency', icon: Zap, color: 'orange' },
    { value: 'checkup', label: 'Check-up', icon: Activity, color: 'purple' },
    { value: 'vaccination', label: 'Vaccination', icon: Baby, color: 'pink' }
  ];

  const statusColors = {
    scheduled: 'bg-blue-100 text-blue-800',
    confirmed: 'bg-green-100 text-green-800',
    completed: 'bg-gray-100 text-gray-800',
    cancelled: 'bg-red-100 text-red-800',
    no_show: 'bg-yellow-100 text-yellow-800'
  };

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
    fetchPatients();
  }, []);

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      // Mock data
      setTimeout(() => {
        setAppointments([
          {
            id: 1,
            patientId: 1,
            patientName: 'John Doe',
            patientEmail: 'john@example.com',
            patientPhone: '+1234567890',
            doctorId: 1,
            doctorName: 'Dr. Sarah Johnson',
            doctorSpecialization: 'Cardiology',
            date: '2024-04-01',
            time: '10:00',
            duration: 30,
            type: 'consultation',
            status: 'confirmed',
            notes: 'Regular checkup for hypertension',
            location: 'Main Hospital, Room 204',
            isVirtual: false,
            paymentStatus: 'paid',
            reminderEnabled: true,
            createdAt: '2024-03-15T10:00:00Z',
            updatedAt: '2024-03-15T10:00:00Z'
          },
          {
            id: 2,
            patientId: 2,
            patientName: 'Emily Davis',
            patientEmail: 'emily@example.com',
            patientPhone: '+1234567891',
            doctorId: 2,
            doctorName: 'Dr. Michael Chen',
            doctorSpecialization: 'Neurology',
            date: '2024-04-01',
            time: '14:30',
            duration: 45,
            type: 'follow_up',
            status: 'scheduled',
            notes: 'Follow-up on migraine treatment',
            location: 'Medical Center, Building A',
            isVirtual: true,
            paymentStatus: 'pending',
            reminderEnabled: true,
            createdAt: '2024-03-20T14:30:00Z',
            updatedAt: '2024-03-20T14:30:00Z'
          },
          {
            id: 3,
            patientId: 3,
            patientName: 'Robert Johnson',
            patientEmail: 'robert@example.com',
            patientPhone: '+1234567892',
            doctorId: 1,
            doctorName: 'Dr. Sarah Johnson',
            doctorSpecialization: 'Cardiology',
            date: '2024-04-02',
            time: '09:00',
            duration: 60,
            type: 'surgery',
            status: 'scheduled',
            notes: 'Cardiac catheterization procedure',
            location: 'Surgical Center, OR 3',
            isVirtual: false,
            paymentStatus: 'pending',
            reminderEnabled: true,
            createdAt: '2024-03-18T09:00:00Z',
            updatedAt: '2024-03-18T09:00:00Z'
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setLoading(false);
    }
  };

  const fetchDoctors = async () => {
    try {
      // Mock data
      setDoctors([
        { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiology', availability: 'Available' },
        { id: 2, name: 'Dr. Michael Chen', specialization: 'Neurology', availability: 'Busy' },
        { id: 3, name: 'Dr. Robert Williams', specialization: 'Orthopedics', availability: 'Available' },
        { id: 4, name: 'Dr. Emily Davis', specialization: 'Pediatrics', availability: 'Available' }
      ]);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchPatients = async () => {
    try {
      // Mock data
      setPatients([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890' },
        { id: 2, name: 'Emily Davis', email: 'emily@example.com', phone: '+1234567891' },
        { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '+1234567892' }
      ]);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const handleCreateAppointment = async () => {
    try {
      // Simulate API call
      console.log('Creating appointment:', formData);
      setShowCreateModal(false);
      fetchAppointments();
    } catch (error) {
      console.error('Error creating appointment:', error);
    }
  };

  const handleUpdateAppointment = async (id, updates) => {
    try {
      // Simulate API call
      console.log('Updating appointment:', id, updates);
      fetchAppointments();
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  const handleDeleteAppointment = async (id) => {
    try {
      // Simulate API call
      console.log('Deleting appointment:', id);
      fetchAppointments();
    } catch (error) {
      console.error('Error deleting appointment:', error);
    }
  };

  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = appointment.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         appointment.notes.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || appointment.status === filterStatus;
    const matchesDoctor = filterDoctor === 'all' || appointment.doctorId.toString() === filterDoctor;
    return matchesSearch && matchesStatus && matchesDoctor;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(a.date + ' ' + a.time) - new Date(b.date + ' ' + b.time);
      case 'patient':
        return a.patientName.localeCompare(b.patientName);
      case 'doctor':
        return a.doctorName.localeCompare(b.doctorName);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const AppointmentCard = ({ appointment }) => {
    const typeInfo = appointmentTypes.find(t => t.value === appointment.type);
    const TypeIcon = typeInfo?.icon || Calendar;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
      >
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-${typeInfo?.color || 'blue'}-100`}>
              <TypeIcon className={`w-5 h-5 text-${typeInfo?.color || 'blue'}-600`} />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{appointment.patientName}</h4>
              <p className="text-sm text-gray-600">{appointment.doctorName}</p>
              <p className="text-xs text-gray-500">{appointment.doctorSpecialization}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full ${statusColors[appointment.status]}`}>
              {appointment.status}
            </span>
            <div className="flex items-center space-x-1">
              <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                <Eye className="w-4 h-4" />
              </button>
              <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                <Edit3 className="w-4 h-4" />
              </button>
              <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{appointment.date}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{appointment.time} ({appointment.duration} min)</span>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{appointment.location}</span>
          </div>
          <div className="flex items-center space-x-2">
            {appointment.isVirtual ? (
              <Video className="w-4 h-4 text-blue-500" />
            ) : (
              <Stethoscope className="w-4 h-4 text-gray-400" />
            )}
            <span className="text-gray-600">{appointment.isVirtual ? 'Virtual' : 'In-person'}</span>
          </div>
        </div>

        {appointment.notes && (
          <div className="mt-3 p-2 bg-gray-50 rounded">
            <p className="text-sm text-gray-600">{appointment.notes}</p>
          </div>
        )}

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span className={`text-xs px-2 py-1 rounded ${
              appointment.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
            }`}>
              {appointment.paymentStatus}
            </span>
            {appointment.reminderEnabled && (
              <div className="flex items-center space-x-1">
                <Bell className="w-3 h-3 text-blue-500" />
                <span className="text-xs text-gray-500">Reminder set</span>
              </div>
            )}
          </div>
          <div className="flex items-center space-x-2">
            {appointment.isVirtual && (
              <>
                <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                  <Video className="w-4 h-4" />
                </button>
                <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
                  <Phone className="w-4 h-4" />
                </button>
              </>
            )}
            <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const CreateAppointmentModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Create Appointment</h2>
            <button
              onClick={() => setShowCreateModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
              <select
                value={formData.patientId}
                onChange={(e) => setFormData(prev => ({ ...prev, patientId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Patient</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
              <select
                value={formData.doctorId}
                onChange={(e) => setFormData(prev => ({ ...prev, doctorId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Doctor</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>{doctor.name} - {doctor.specialization}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData(prev => ({ ...prev, date: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
              <input
                type="time"
                value={formData.time}
                onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duration (min)</label>
              <select
                value={formData.duration}
                onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="15">15</option>
                <option value="30">30</option>
                <option value="45">45</option>
                <option value="60">60</option>
                <option value="90">90</option>
                <option value="120">120</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {appointmentTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Enter location"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
              placeholder="Enter appointment notes"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div className="space-y-3">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isVirtual"
                checked={formData.isVirtual}
                onChange={(e) => setFormData(prev => ({ ...prev, isVirtual: e.target.checked }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="isVirtual" className="ml-2 text-sm text-gray-700">Virtual Appointment</label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="reminderEnabled"
                checked={formData.reminderEnabled}
                onChange={(e) => setFormData(prev => ({ ...prev, reminderEnabled: e.target.checked }))}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <label htmlFor="reminderEnabled" className="ml-2 text-sm text-gray-700">Enable Reminder</label>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => setShowCreateModal(false)}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateAppointment}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Appointment
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Appointment Scheduler</h2>
          <p className="text-gray-600">Manage and schedule appointments</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              showFilters ? 'bg-blue-100 text-blue-700' : 'bg-white border border-gray-300 text-gray-700'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Appointment</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="scheduled">Scheduled</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
                <option value="no_show">No Show</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
              <select
                value={filterDoctor}
                onChange={(e) => setFilterDoctor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Doctors</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Date</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* View Mode Selector */}
      <div className="flex items-center space-x-2 bg-white rounded-lg shadow-sm border border-gray-200 p-1">
        {['calendar', 'list', 'timeline'].map(mode => (
          <button
            key={mode}
            onClick={() => setViewMode(mode)}
            className={`px-4 py-2 rounded-md transition-colors capitalize ${
              viewMode === mode
                ? 'bg-blue-600 text-white'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {mode}
          </button>
        ))}
      </div>

      {/* Appointments List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredAppointments.map(appointment => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>

      {/* Create Appointment Modal */}
      {showCreateModal && <CreateAppointmentModal />}
    </div>
  );
};

export default AppointmentScheduler;
