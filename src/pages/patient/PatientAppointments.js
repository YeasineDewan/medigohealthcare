import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, Video, MapPin, Plus, Filter, Search, Edit, Trash2, 
  CheckCircle, XCircle, AlertCircle, User, Stethoscope, Phone, Mail,
  ChevronRight, ChevronDown, MoreVertical, Download, Upload, Camera,
  MessageSquare, VideoOff, Mic, MicOff, Wifi, Battery, Star, Heart,
  TrendingUp, Activity, FileText, Shield, Award, Target, Zap,
  BarChart3, PieChart, LineChart, TestTube, FlaskConical, Microscope,
  Pill, Hospital, Building, Globe, Languages, BookOpen, GraduationCap,
  Briefcase, Users, UserCheck, UserPlus, UserMinus, FileSearch, FileDown, FileUp, FileSignature, Receipt, Wallet, PiggyBank,
ShoppingBasket, HelpCircle, Settings, Bell, LogOut, Menu, Home,
Store, Package as PackageIcon, Truck as TruckIcon,
  ShoppingBasket as ShoppingBasketIcon,
  CreditCard as CreditCardIcon, Wallet as WalletIcon, Receipt as ReceiptIcon,
  FileText as FileTextIcon, FileDown as FileDownIcon, FileUp as FileUpIcon,
  Download as DownloadIcon, Upload as UploadIcon, Search as SearchIcon,
  Filter as FilterIcon, Plus as PlusIcon, Edit as EditIcon, Trash2 as Trash2Icon,
  Save as SaveIcon, X as XIcon, Bell as BellIcon, Settings as SettingsIcon,
  HelpCircle as HelpCircleIcon, LogOut as LogOutIcon, Menu as MenuIcon
} from 'lucide-react';

const appointments = [
  { 
    id: 1, 
    doctor: 'Dr. Fatima Rahman', 
    specialty: 'Cardiology',
    date: 'Feb 2, 2025', 
    time: '10:00 AM', 
    type: 'In-person', 
    status: 'confirmed',
    location: 'City Hospital, Room 201',
    duration: '30 minutes',
    fee: 'BDT 1,500',
    rating: 4.8,
    image: 'https://picsum.photos/seed/doctor1/100/100'
  },
  { 
    id: 2, 
    doctor: 'Dr. Karim Ahmed', 
    specialty: 'General Medicine',
    date: 'Feb 5, 2025', 
    time: '02:00 PM', 
    type: 'Video', 
    status: 'upcoming',
    location: 'Online Consultation',
    duration: '45 minutes',
    fee: 'BDT 800',
    rating: 4.9,
    image: 'https://picsum.photos/seed/doctor2/100/100'
  },
  { 
    id: 3, 
    doctor: 'Dr. Nusrat Jahan', 
    specialty: 'Pediatrics',
    date: 'Jan 28, 2025', 
    time: '11:00 AM', 
    type: 'In-person', 
    status: 'completed',
    location: 'Medical Center, Floor 3',
    duration: '30 minutes',
    fee: 'BDT 1,200',
    rating: 4.7,
    image: 'https://picsum.photos/seed/doctor3/100/100'
  },
  { 
    id: 4, 
    doctor: 'Dr. Ahmed Hassan', 
    specialty: 'Orthopedics',
    date: 'Jan 25, 2025', 
    time: '03:30 PM', 
    type: 'Video', 
    status: 'cancelled',
    location: 'Online Consultation',
    duration: '30 minutes',
    fee: 'BDT 1,000',
    rating: 4.6,
    image: 'https://picsum.photos/seed/doctor4/100/100'
  }
];

const doctors = [
  { id: 1, name: 'Dr. Fatima Rahman', specialty: 'Cardiology', rating: 4.8, experience: '15 years', fee: 'BDT 1,500', available: true },
  { id: 2, name: 'Dr. Karim Ahmed', specialty: 'General Medicine', rating: 4.9, experience: '12 years', fee: 'BDT 800', available: true },
  { id: 3, name: 'Dr. Nusrat Jahan', specialty: 'Pediatrics', rating: 4.7, experience: '10 years', fee: 'BDT 1,200', available: false },
  { id: 4, name: 'Dr. Ahmed Hassan', specialty: 'Orthopedics', rating: 4.6, experience: '18 years', fee: 'BDT 1,000', available: true }
];

export default function PatientAppointments() {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showDetails, setShowDetails] = useState(null);

  const filteredAppointments = appointments.filter(apt => {
    const matchesFilter = filter === 'all' || apt.status === filter;
    const matchesSearch = apt.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         apt.specialty?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const handleBookAppointment = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
  };

  const handleConfirmBooking = () => {
    // In production, this would save to backend
    console.log('Booking confirmed:', { selectedDoctor, selectedDate, selectedTime });
    setShowBookingModal(false);
    setSelectedDoctor(null);
    setSelectedDate('');
    setSelectedTime('');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-700';
      case 'upcoming': return 'bg-blue-100 text-blue-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return CheckCircle;
      case 'upcoming': return AlertCircle;
      case 'completed': return CheckCircle;
      case 'cancelled': return XCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
          <p className="text-gray-600 mt-1">View and manage your appointments with healthcare providers</p>
        </div>
        <button
          onClick={() => setShowBookingModal(true)}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Book Appointment
        </button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <Calendar className="w-5 h-5 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">12</span>
          </div>
          <p className="text-sm text-gray-600">Total Appointments</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">8</span>
          </div>
          <p className="text-sm text-gray-600">Completed</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className="w-5 h-5 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">3</span>
          </div>
          <p className="text-sm text-gray-600">Upcoming</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <span className="text-2xl font-bold text-gray-900">1</span>
          </div>
          <p className="text-sm text-gray-600">Cancelled</p>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search appointments..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'upcoming', 'completed', 'cancelled'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-lg font-medium capitalize transition-colors ${
                filter === f ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Appointments List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {filteredAppointments.map((apt, index) => (
          <motion.div
            key={apt.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <img
                    src={apt.image}
                    alt={apt.doctor}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{apt.doctor}</h3>
                      {apt.rating && (
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm text-gray-600">{apt.rating}</span>
                        </div>
                      )}
                    </div>
                    {apt.specialty && (
                      <p className="text-sm text-gray-600 mb-2">{apt.specialty}</p>
                    )}
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{apt.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{apt.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        {apt.type === 'Video' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                        <span>{apt.type}</span>
                      </div>
                      {apt.duration && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{apt.duration}</span>
                        </div>
                      )}
                    </div>
                    {apt.location && (
                      <p className="text-sm text-gray-500 mt-1">{apt.location}</p>
                    )}
                    {apt.fee && (
                      <p className="text-sm font-medium text-gray-900 mt-2">Consultation Fee: {apt.fee}</p>
                    )}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(apt.status)}`}>
                    {(() => {
                      const StatusIcon = getStatusIcon(apt.status);
                      return <StatusIcon className="w-3 h-3" />;
                    })()}
                    {apt.status}
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setShowDetails(apt.id)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    {apt.status === 'upcoming' && (
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowBookingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Book Appointment</h2>
                <button
                  onClick={() => setShowBookingModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              {!selectedDoctor ? (
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Select Doctor</h3>
                  {doctors.map((doctor) => (
                    <div
                      key={doctor.id}
                      onClick={() => setSelectedDoctor(doctor)}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 cursor-pointer transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{doctor.name}</h4>
                          <p className="text-sm text-gray-600">{doctor.specialty}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span>Experience: {doctor.experience}</span>
                            <span>Fee: {doctor.fee}</span>
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              doctor.available ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                            }`}>
                              {doctor.available ? 'Available' : 'Busy'}
                            </span>
                          </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-2">Selected Doctor</h3>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] text-white flex items-center justify-center font-semibold">
                        {selectedDoctor.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{selectedDoctor.name}</p>
                        <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                        <p className="text-sm text-gray-500">Fee: {selectedDoctor.fee}</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                    <div className="grid grid-cols-4 gap-2">
                      {['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'].map((time) => (
                        <button
                          key={time}
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 border rounded-lg text-sm transition-colors ${
                            selectedTime === time
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-300 hover:border-gray-400'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setSelectedDoctor(null)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleConfirmBooking}
                      disabled={!selectedDate || !selectedTime}
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
