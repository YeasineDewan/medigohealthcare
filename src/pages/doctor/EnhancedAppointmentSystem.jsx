import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, Users, Video, Phone, MapPin, Plus, Search, Filter, Download, Eye, Edit, Trash2,
  ChevronLeft, ChevronRight, ChevronDown, ChevronUp, CheckCircle, XCircle, AlertCircle, Bell,
  Settings, RefreshCw, MoreVertical, Star, MessageCircle, FileText, Heart, Activity, Thermometer,
  X
} from 'lucide-react';

const appointments = [
  {
    id: 1,
    patient: 'Ahmed Khan',
    age: 34,
    date: '2024-01-15',
    time: '10:00 AM',
    duration: '30 min',
    type: 'Video',
    status: 'confirmed',
    payment: 'Paid',
    notes: 'Follow-up consultation for hypertension',
    urgency: 'normal',
    previousVisits: 3,
    medications: 2,
    allergies: 'Penicillin',
    insurance: 'HealthGuard Plus',
    contact: '+8801712345678',
    email: 'ahmed.khan@email.com',
    location: 'Video Call',
    doctorNotes: 'Patient responding well to treatment. BP controlled.',
    reminders: ['15 min before', '1 hour before'],
    documents: ['previous_prescription.pdf', 'lab_results.pdf']
  },
  {
    id: 2,
    patient: 'Sara Ali',
    age: 28,
    date: '2024-01-15',
    time: '10:30 AM',
    duration: '45 min',
    type: 'In-person',
    status: 'confirmed',
    payment: 'Paid',
    notes: 'Initial consultation - anxiety symptoms',
    urgency: 'normal',
    previousVisits: 0,
    medications: 0,
    allergies: 'None',
    insurance: 'MediCare Basic',
    contact: '+8801823456789',
    email: 'sara.ali@email.com',
    location: 'Chamber - Room 201',
    doctorNotes: 'New patient - first consultation.',
    reminders: ['30 min before', '1 day before'],
    documents: []
  },
  {
    id: 3,
    patient: 'Rahman Hossain',
    age: 45,
    date: '2024-01-15',
    time: '11:00 AM',
    duration: '30 min',
    type: 'In-person',
    status: 'pending',
    payment: 'Pending',
    notes: 'Emergency case - chest pain',
    urgency: 'high',
    previousVisits: 1,
    medications: 3,
    allergies: 'None',
    insurance: 'None',
    contact: '+8801934567890',
    email: 'rahman.h@email.com',
    location: 'Emergency Ward',
    doctorNotes: 'Urgent case - needs immediate attention.',
    reminders: ['ASAP', '30 min before'],
    documents: ['ecg_report.pdf']
  },
  {
    id: 4,
    patient: 'Fatema Begum',
    age: 52,
    date: '2024-01-15',
    time: '2:00 PM',
    duration: '45 min',
    type: 'Video',
    status: 'confirmed',
    payment: 'Paid',
    notes: 'Diabetes follow-up',
    urgency: 'normal',
    previousVisits: 8,
    medications: 4,
    allergies: 'Sulfa drugs',
    insurance: 'HealthGuard Premium',
    contact: '+8801645678901',
    email: 'fatema.begum@email.com',
    location: 'Video Call',
    doctorNotes: 'Regular diabetes review. Monitor blood sugar.',
    reminders: ['1 hour before', '1 day before'],
    documents: ['blood_sugar_log.pdf', 'diet_plan.pdf']
  },
  {
    id: 5,
    patient: 'Karim Uddin',
    age: 32,
    date: '2024-01-15',
    time: '3:00 PM',
    duration: '30 min',
    type: 'Phone',
    status: 'confirmed',
    payment: 'Paid',
    notes: 'Post-surgery follow-up',
    urgency: 'normal',
    previousVisits: 5,
    medications: 2,
    allergies: 'None',
    insurance: 'MediCare Plus',
    contact: '+8801556789012',
    email: 'karim.uddin@email.com',
    location: 'Phone Call',
    doctorNotes: 'Recovery check after appendectomy.',
    reminders: ['30 min before'],
    documents: ['surgery_report.pdf']
  }
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
  '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
];

const appointmentTypes = [
  { id: 'video', name: 'Video Consultation', icon: Video, color: 'from-blue-500 to-blue-600', duration: '30 min' },
  { id: 'in-person', name: 'In-person Visit', icon: MapPin, color: 'from-green-500 to-green-600', duration: '45 min' },
  { id: 'phone', name: 'Phone Consultation', icon: Phone, color: 'from-purple-500 to-purple-600', duration: '20 min' },
  { id: 'emergency', name: 'Emergency', icon: AlertCircle, color: 'from-red-500 to-red-600', duration: '60 min' }
];

export default function EnhancedAppointmentSystem() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('day'); // day, week, month
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showAppointmentDetails, setShowAppointmentDetails] = useState(false);
  const [showNewAppointment, setShowNewAppointment] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [selectedType, setSelectedType] = useState('video');
  const [calendarView, setCalendarView] = useState('schedule');
  const [showReminders, setShowReminders] = useState(true);
  const [autoConfirm, setAutoConfirm] = useState(false);
  const [bufferTime, setBufferTime] = useState(15);

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.patient.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.notes.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || apt.status === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'confirmed': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-700 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'normal': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    const appointmentType = appointmentTypes.find(t => t.id === type.toLowerCase());
    return appointmentType ? appointmentType.icon : Calendar;
  };

  const formatTime = (time) => {
    const date = new Date(`2024-01-15 ${time}`);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  };

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Enhanced Appointment System</h1>
              <p className="text-gray-600">Comprehensive scheduling and calendar management</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center border-2 border-gray-200 rounded-2xl">
                <button
                  onClick={() => setViewMode('day')}
                  className={`px-4 py-2 rounded-l-xl transition-colors ${
                    viewMode === 'day' ? 'bg-blue-500 text-white' : 'hover:bg-gray-50'
                  }`}
                >
                  Day
                </button>
                <button
                  onClick={() => setViewMode('week')}
                  className={`px-4 py-2 transition-colors ${
                    viewMode === 'week' ? 'bg-blue-500 text-white' : 'hover:bg-gray-50'
                  }`}
                >
                  Week
                </button>
                <button
                  onClick={() => setViewMode('month')}
                  className={`px-4 py-2 rounded-r-xl transition-colors ${
                    viewMode === 'month' ? 'bg-blue-500 text-white' : 'hover:bg-gray-50'
                  }`}
                >
                  Month
                </button>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors">
                <Calendar className="w-4 h-4" />
                Today
              </button>
              <button
                onClick={() => setShowNewAppointment(true)}
                className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-colors"
              >
                <Plus className="w-4 h-4" />
                New Appointment
              </button>
            </div>
          </div>
        </div>

        {/* Calendar Navigation */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-lg hover:bg-gray-50">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xl font-bold text-gray-900">
                {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </h2>
              <button className="p-2 rounded-lg hover:bg-gray-50">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search appointments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="confirmed">Confirmed</option>
                <option value="pending">Pending</option>
                <option value="cancelled">Cancelled</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          {/* Calendar Grid */}
          {viewMode === 'month' && (
            <div className="grid grid-cols-7 gap-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} className="text-center font-semibold text-gray-600 py-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: getFirstDayOfMonth(selectedDate) }, (_, i) => (
                <div key={`empty-${i}`} className="p-2" />
              ))}
              {Array.from({ length: getDaysInMonth(selectedDate) }, (_, i) => (
                <div
                  key={`day-${i + 1}`}
                  className={`p-2 border-2 border-gray-200 rounded-xl hover:border-blue-500 cursor-pointer transition-colors ${
                    i + 1 === selectedDate.getDate() ? 'bg-blue-500 text-white' : ''
                  }`}
                >
                  <div className="text-center font-medium">{i + 1}</div>
                  <div className="flex justify-center gap-1 mt-1">
                    {appointments.filter(apt => 
                      new Date(apt.date).getDate() === i + 1
                    ).slice(0, 3).map((_, idx) => (
                      <div key={idx} className="w-1 h-1 bg-blue-500 rounded-full" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Day View */}
          {viewMode === 'day' && (
            <div className="space-y-4">
              {timeSlots.map((time, index) => (
                <div key={time} className="flex gap-4">
                  <div className="w-20 text-sm font-medium text-gray-600 py-4">
                    {formatTime(time)}
                  </div>
                  <div className="flex-1 border-2 border-gray-200 rounded-xl p-4 min-h-[80px]">
                    {appointments
                      .filter(apt => apt.time === formatTime(time))
                      .map(appointment => (
                        <motion.div
                          key={appointment.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border border-blue-200 cursor-pointer hover:shadow-lg transition-all"
                          onClick={() => {
                            setSelectedAppointment(appointment);
                            setShowAppointmentDetails(true);
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${appointmentTypes.find(t => t.id === appointment.type.toLowerCase())?.color || 'from-gray-500 to-gray-600'} flex items-center justify-center`}>
                                {React.createElement(getTypeIcon(appointment.type), { className: "w-5 h-5 text-white" })}
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{appointment.patient}</h4>
                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                  <span>{appointment.age} years</span>
                                  <span>•</span>
                                  <span>{appointment.duration}</span>
                                  <span>•</span>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                                    {appointment.status}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(appointment.urgency)}`}>
                                {appointment.urgency}
                              </span>
                              <button className="p-1 rounded hover:bg-gray-200">
                                <MoreVertical className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Appointment Details Modal */}
        <AnimatePresence>
          {showAppointmentDetails && selectedAppointment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowAppointmentDetails(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
                      <p className="text-gray-600 mt-1">ID: #{selectedAppointment.id}</p>
                    </div>
                    <button
                      onClick={() => setShowAppointmentDetails(false)}
                      className="p-3 rounded-xl hover:bg-gray-100"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                
                <div className="p-8 space-y-6">
                  {/* Patient Information */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Patient Information</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Name</p>
                        <p className="font-medium text-gray-900">{selectedAppointment.patient}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Age</p>
                        <p className="font-medium text-gray-900">{selectedAppointment.age} years</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Contact</p>
                        <p className="font-medium text-gray-900">{selectedAppointment.contact}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Email</p>
                        <p className="font-medium text-gray-900">{selectedAppointment.email}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Insurance</p>
                        <p className="font-medium text-gray-900">{selectedAppointment.insurance}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Allergies</p>
                        <p className="font-medium text-gray-900">{selectedAppointment.allergies}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Medications</p>
                        <p className="font-medium text-gray-900">{selectedAppointment.medications}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Previous Visits</p>
                        <p className="font-medium text-gray-900">{selectedAppointment.previousVisits}</p>
                      </div>
                    </div>
                  </div>

                  {/* Appointment Details */}
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Appointment Details</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Date</p>
                        <p className="font-medium text-gray-900">{selectedAppointment.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Time</p>
                        <p className="font-medium text-gray-900">{selectedAppointment.time}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Duration</p>
                        <p className="font-medium text-gray-900">{selectedAppointment.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Type</p>
                        <p className="font-medium text-gray-900">{selectedAppointment.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Location</p>
                        <p className="font-medium text-gray-900">{selectedAppointment.location}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Status</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedAppointment.status)}`}>
                          {selectedAppointment.status}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Payment</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                          selectedAppointment.payment === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {selectedAppointment.payment}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Urgency</p>
                        <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(selectedAppointment.urgency)}`}>
                          {selectedAppointment.urgency}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Notes and Documents */}
                  <div className="bg-purple-50 rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Medical Notes</h3>
                    <p className="text-gray-700 mb-4">{selectedAppointment.notes}</p>
                    <div className="bg-white rounded-xl p-4">
                      <p className="font-medium text-gray-900 mb-2">Doctor's Notes:</p>
                      <p className="text-gray-600">{selectedAppointment.doctorNotes}</p>
                    </div>
                  </div>

                  {/* Reminders */}
                  {selectedAppointment.reminders && (
                    <div className="bg-yellow-50 rounded-2xl p-6">
                      <h3 className="font-bold text-lg text-gray-900 mb-4">Reminders</h3>
                      <div className="space-y-2">
                        {selectedAppointment.reminders.map((reminder, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Bell className="w-4 h-4 text-yellow-600" />
                            <span className="text-gray-700">{reminder}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors font-medium">
                      <Video className="w-5 h-5" />
                      Start Consultation
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-green-500 text-white rounded-2xl hover:bg-green-600 transition-colors font-medium">
                      <MessageCircle className="w-5 h-5" />
                      Send Message
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-purple-500 text-white rounded-2xl hover:bg-purple-600 transition-colors font-medium">
                      <Edit className="w-5 h-5" />
                      Reschedule
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* New Appointment Modal */}
        <AnimatePresence>
          {showNewAppointment && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowNewAppointment(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">New Appointment</h2>
                    <button
                      onClick={() => setShowNewAppointment(false)}
                      className="p-3 rounded-xl hover:bg-gray-100"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>
                
                <div className="p-8 space-y-6">
                  {/* Appointment Type Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Appointment Type</label>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {appointmentTypes.map((type) => (
                        <button
                          key={type.id}
                          onClick={() => setSelectedType(type.id)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            selectedType === type.id
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${type.color} flex items-center justify-center mx-auto mb-2`}>
                            <type.icon className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-sm font-medium text-gray-900">{type.name}</p>
                          <p className="text-xs text-gray-500">{type.duration}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Date and Time Selection */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                      <input
                        type="date"
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
                      <select
                        value={selectedTimeSlot || ''}
                        onChange={(e) => setSelectedTimeSlot(e.target.value)}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>{time}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Patient Search */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Patient</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        placeholder="Search patient by name or ID..."
                        className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea
                      rows={4}
                      placeholder="Add appointment notes..."
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  {/* Settings */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Bell className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium">Send Reminders</span>
                      </div>
                      <button
                        onClick={() => setShowReminders(!showReminders)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          showReminders ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          showReminders ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium">Auto-confirm</span>
                      </div>
                      <button
                        onClick={() => setAutoConfirm(!autoConfirm)}
                        className={`w-12 h-6 rounded-full transition-colors ${
                          autoConfirm ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                      >
                        <div className={`w-5 h-5 bg-white rounded-full transition-transform ${
                          autoConfirm ? 'translate-x-6' : 'translate-x-0.5'
                        }`} />
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Buffer Time (minutes)</label>
                      <input
                        type="number"
                        value={bufferTime}
                        onChange={(e) => setBufferTime(parseInt(e.target.value))}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <button className="flex-1 px-6 py-3 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 transition-colors font-medium">
                      Create Appointment
                    </button>
                    <button
                      onClick={() => setShowNewAppointment(false)}
                      className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-colors font-medium"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
