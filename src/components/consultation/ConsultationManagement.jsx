import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calendar, Clock, Users, Video, Phone, MessageSquare, FileText, Search, Filter,
  Plus, Edit, Trash2, Eye, Download, Send, CheckCircle, XCircle, AlertCircle,
  ChevronLeft, ChevronRight, RefreshCw, Star, Heart, Activity, Stethoscope,
  User, Mail, MapPin, DollarSign, TrendingUp, TrendingDown, BarChart3,
  FilterIcon, SortAsc, SortDesc, CalendarDays, Clock3, UserCheck, Shield,
  Zap, Globe, Languages, Award, ThumbsUp, ThumbsDown,
  Settings, Bell, Archive, Flag, MoreVertical, Share2, ExternalLink
} from 'lucide-react';

const ConsultationManagement = () => {
  const [consultations, setConsultations] = useState([]);
  const [filteredConsultations, setFilteredConsultations] = useState([]);
  const [selectedConsultation, setSelectedConsultation] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    upcoming: 0,
    cancelled: 0,
    revenue: 0
  });

  // Sample data
  const sampleConsultations = [
    {
      id: 1,
      patientName: 'Ahmed Khan',
      patientEmail: 'ahmed.khan@email.com',
      patientPhone: '+880 1234567890',
      doctorName: 'Dr. Ahmed Hassan',
      doctorSpecialty: 'Cardiology',
      type: 'video',
      status: 'completed',
      date: '2024-01-15',
      time: '10:30 AM',
      duration: '25 min',
      fee: 150,
      paymentStatus: 'paid',
      symptoms: 'Chest pain, shortness of breath',
      diagnosis: 'Angina',
      prescription: 'Atenolol 50mg, Nitroglycerin',
      notes: 'Patient responded well to treatment',
      rating: 5,
      review: 'Excellent consultation, very professional',
      followUpRequired: true,
      followUpDate: '2024-01-22',
      emergencyContact: 'Fatima Khan - Wife',
      createdAt: '2024-01-10T09:00:00Z',
      updatedAt: '2024-01-15T10:55:00Z'
    },
    {
      id: 2,
      patientName: 'Sara Ali',
      patientEmail: 'sara.ali@email.com',
      patientPhone: '+880 2345678901',
      doctorName: 'Dr. Fatima Khan',
      doctorSpecialty: 'Pediatrics',
      type: 'audio',
      status: 'upcoming',
      date: '2024-01-20',
      time: '2:00 PM',
      duration: '15 min',
      fee: 120,
      paymentStatus: 'pending',
      symptoms: 'Fever, cough, loss of appetite',
      diagnosis: 'Viral infection',
      prescription: 'Paracetamol, rest, fluids',
      notes: 'Parent consultation scheduled',
      rating: null,
      review: null,
      followUpRequired: false,
      followUpDate: null,
      emergencyContact: 'Mohammed Ali - Father',
      createdAt: '2024-01-18T14:30:00Z',
      updatedAt: '2024-01-18T14:30:00Z'
    },
    {
      id: 3,
      patientName: 'Rahman Hossain',
      patientEmail: 'rahman.h@email.com',
      patientPhone: '+880 3456789012',
      doctorName: 'Dr. Rahman Ali',
      doctorSpecialty: 'General Medicine',
      type: 'chat',
      status: 'cancelled',
      date: '2024-01-18',
      time: '4:30 PM',
      duration: '0 min',
      fee: 100,
      paymentStatus: 'refunded',
      symptoms: 'Headache, nausea',
      diagnosis: null,
      prescription: null,
      notes: 'Patient cancelled due to emergency',
      rating: null,
      review: null,
      followUpRequired: false,
      followUpDate: null,
      emergencyContact: 'Ayesha Begum - Sister',
      createdAt: '2024-01-17T16:00:00Z',
      updatedAt: '2024-01-18T16:45:00Z'
    },
    {
      id: 4,
      patientName: 'Fatima Begum',
      patientEmail: 'fatima.b@email.com',
      patientPhone: '+880 4567890123',
      doctorName: 'Dr. Sarah Johnson',
      doctorSpecialty: 'Dermatology',
      type: 'video',
      status: 'completed',
      date: '2024-01-16',
      time: '11:00 AM',
      duration: '20 min',
      fee: 130,
      paymentStatus: 'paid',
      symptoms: 'Skin rash, itching',
      diagnosis: 'Allergic dermatitis',
      prescription: 'Antihistamine, topical cream',
      notes: 'Allergy testing recommended',
      rating: 4,
      review: 'Good consultation, clear instructions',
      followUpRequired: true,
      followUpDate: '2024-01-23',
      emergencyContact: 'Karim Begum - Husband',
      createdAt: '2024-01-14T10:30:00Z',
      updatedAt: '2024-01-16T11:20:00Z'
    }
  ];

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setConsultations(sampleConsultations);
      setFilteredConsultations(sampleConsultations);
      calculateStats(sampleConsultations);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    filterAndSortConsultations();
  }, [consultations, searchQuery, statusFilter, typeFilter, dateFilter, sortBy, sortOrder]);

  const calculateStats = (data) => {
    const stats = {
      total: data.length,
      completed: data.filter(c => c.status === 'completed').length,
      upcoming: data.filter(c => c.status === 'upcoming').length,
      cancelled: data.filter(c => c.status === 'cancelled').length,
      revenue: data.filter(c => c.paymentStatus === 'paid').reduce((sum, c) => sum + c.fee, 0)
    };
    setStats(stats);
  };

  const filterAndSortConsultations = () => {
    let filtered = [...consultations];

    // Apply filters
    if (searchQuery) {
      filtered = filtered.filter(c =>
        c.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.doctorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.symptoms.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter(c => c.status === statusFilter);
    }

    if (typeFilter !== 'all') {
      filtered = filtered.filter(c => c.type === typeFilter);
    }

    if (dateFilter !== 'all') {
      const today = new Date();
      const filterDate = new Date();
      
      switch (dateFilter) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(c => new Date(c.date) >= filterDate && new Date(c.date) < new Date(today.getTime() + 24 * 60 * 60 * 1000));
          break;
        case 'week':
          filterDate.setDate(today.getDate() - 7);
          filtered = filtered.filter(c => new Date(c.date) >= filterDate);
          break;
        case 'month':
          filterDate.setMonth(today.getMonth() - 1);
          filtered = filtered.filter(c => new Date(c.date) >= filterDate);
          break;
      }
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case 'patient':
          comparison = a.patientName.localeCompare(b.patientName);
          break;
        case 'doctor':
          comparison = a.doctorName.localeCompare(b.doctorName);
          break;
        case 'fee':
          comparison = a.fee - b.fee;
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });

    setFilteredConsultations(filtered);
  };

  const handleViewDetails = (consultation) => {
    setSelectedConsultation(consultation);
    setShowDetailsModal(true);
  };

  const handleEdit = (consultation) => {
    setSelectedConsultation(consultation);
    setShowEditModal(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this consultation?')) {
      setConsultations(consultations.filter(c => c.id !== id));
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setConsultations(consultations.map(c =>
      c.id === id ? { ...c, status: newStatus, updatedAt: new Date().toISOString() } : c
    ));
  };

  const handleSendReminder = (consultation) => {
    // Simulate sending reminder
    alert(`Reminder sent to ${consultation.patientName} for upcoming consultation`);
  };

  const handleReschedule = (consultation) => {
    // Implement reschedule logic
    alert(`Reschedule consultation for ${consultation.patientName}`);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'upcoming': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'video': return Video;
      case 'audio': return Phone;
      case 'chat': return MessageSquare;
      default: return MessageSquare;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'video': return 'text-blue-600 bg-blue-100';
      case 'audio': return 'text-green-600 bg-green-100';
      case 'chat': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT'
    }).format(price);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Pagination
  const totalPages = Math.ceil(filteredConsultations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedConsultations = filteredConsultations.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Consultation Management</h1>
          <p className="text-gray-600">Manage and track all medical consultations</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.total}</h3>
            <p className="text-gray-600 text-sm">Total Consultations</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.completed}</h3>
            <p className="text-gray-600 text-sm">Completed</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.upcoming}</h3>
            <p className="text-gray-600 text-sm">Upcoming</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
                <XCircle className="w-6 h-6 text-red-600" />
              </div>
              <TrendingDown className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stats.cancelled}</h3>
            <p className="text-gray-600 text-sm">Cancelled</p>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{formatPrice(stats.revenue)}</h3>
            <p className="text-gray-600 text-sm">Total Revenue</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search consultations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="upcoming">Upcoming</option>
                <option value="cancelled">Cancelled</option>
                <option value="in-progress">In Progress</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Types</option>
                <option value="video">Video</option>
                <option value="audio">Audio</option>
                <option value="chat">Chat</option>
              </select>

              <select
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="date">Sort by Date</option>
                <option value="patient">Sort by Patient</option>
                <option value="doctor">Sort by Doctor</option>
                <option value="fee">Sort by Fee</option>
                <option value="status">Sort by Status</option>
              </select>

              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
              </button>

              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Consultations Table */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <RefreshCw className="w-8 h-8 text-blue-600 animate-spin" />
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Patient
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Doctor
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date & Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Fee
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rating
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {paginatedConsultations.map((consultation) => {
                      const TypeIcon = getTypeIcon(consultation.type);
                      return (
                        <tr key={consultation.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{consultation.patientName}</div>
                              <div className="text-sm text-gray-500">{consultation.patientEmail}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{consultation.doctorName}</div>
                              <div className="text-sm text-gray-500">{consultation.doctorSpecialty}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${getTypeColor(consultation.type)}`}>
                              <TypeIcon className="w-3 h-3" />
                              {consultation.type}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm text-gray-900">{formatDate(consultation.date)}</div>
                              <div className="text-sm text-gray-500">{consultation.time}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium border ${getStatusColor(consultation.status)}`}>
                              {consultation.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{formatPrice(consultation.fee)}</div>
                            <div className={`text-xs ${consultation.paymentStatus === 'paid' ? 'text-green-600' : 'text-red-600'}`}>
                              {consultation.paymentStatus}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {consultation.rating ? (
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm text-gray-900">{consultation.rating}</span>
                              </div>
                            ) : (
                              <span className="text-sm text-gray-400">-</span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleViewDetails(consultation)}
                                className="p-1 text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                title="View Details"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleEdit(consultation)}
                                className="p-1 text-gray-600 hover:bg-gray-50 rounded transition-colors"
                                title="Edit"
                              >
                                <Edit className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDelete(consultation.id)}
                                className="p-1 text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                              {consultation.status === 'upcoming' && (
                                <button
                                  onClick={() => handleSendReminder(consultation)}
                                  className="p-1 text-green-600 hover:bg-green-50 rounded transition-colors"
                                  title="Send Reminder"
                                >
                                  <Bell className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="px-6 py-4 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-700">
                    Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredConsultations.length)} of{' '}
                    {filteredConsultations.length} consultations
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 text-sm text-gray-700">
                      Page {currentPage} of {totalPages}
                    </span>
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Details Modal */}
        <AnimatePresence>
          {showDetailsModal && selectedConsultation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Consultation Details</h2>
                    <button
                      onClick={() => setShowDetailsModal(false)}
                      className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-gray-500" />
                    </button>
                  </div>
                </div>

                <div className="p-6 space-y-6">
                  {/* Patient Information */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Patient Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Name:</span>
                        <span className="ml-2 font-medium">{selectedConsultation.patientName}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Email:</span>
                        <span className="ml-2 font-medium">{selectedConsultation.patientEmail}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Phone:</span>
                        <span className="ml-2 font-medium">{selectedConsultation.patientPhone}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Emergency Contact:</span>
                        <span className="ml-2 font-medium">{selectedConsultation.emergencyContact}</span>
                      </div>
                    </div>
                  </div>

                  {/* Consultation Details */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Consultation Details</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Doctor:</span>
                        <span className="ml-2 font-medium">{selectedConsultation.doctorName}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Specialty:</span>
                        <span className="ml-2 font-medium">{selectedConsultation.doctorSpecialty}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Type:</span>
                        <span className="ml-2 font-medium">{selectedConsultation.type}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <span className="ml-2 font-medium">{selectedConsultation.status}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Date:</span>
                        <span className="ml-2 font-medium">{formatDate(selectedConsultation.date)}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Time:</span>
                        <span className="ml-2 font-medium">{selectedConsultation.time}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Duration:</span>
                        <span className="ml-2 font-medium">{selectedConsultation.duration}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Fee:</span>
                        <span className="ml-2 font-medium">{formatPrice(selectedConsultation.fee)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Medical Information */}
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Medical Information</h3>
                    <div className="space-y-3 text-sm">
                      <div>
                        <span className="text-gray-600">Symptoms:</span>
                        <p className="mt-1 font-medium">{selectedConsultation.symptoms}</p>
                      </div>
                      {selectedConsultation.diagnosis && (
                        <div>
                          <span className="text-gray-600">Diagnosis:</span>
                          <p className="mt-1 font-medium">{selectedConsultation.diagnosis}</p>
                        </div>
                      )}
                      {selectedConsultation.prescription && (
                        <div>
                          <span className="text-gray-600">Prescription:</span>
                          <p className="mt-1 font-medium">{selectedConsultation.prescription}</p>
                        </div>
                      )}
                      {selectedConsultation.notes && (
                        <div>
                          <span className="text-gray-600">Notes:</span>
                          <p className="mt-1 font-medium">{selectedConsultation.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Review and Rating */}
                  {selectedConsultation.rating && (
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Patient Review</h3>
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex items-center">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-5 h-5 ${
                                star <= selectedConsultation.rating
                                  ? 'text-yellow-500 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({selectedConsultation.rating}/5)</span>
                      </div>
                      {selectedConsultation.review && (
                        <p className="text-sm text-gray-700">{selectedConsultation.review}</p>
                      )}
                    </div>
                  )}

                  {/* Follow-up Information */}
                  {selectedConsultation.followUpRequired && (
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h3 className="font-semibold text-gray-900 mb-3">Follow-up Required</h3>
                      <div className="text-sm">
                        <span className="text-gray-600">Follow-up Date:</span>
                        <span className="ml-2 font-medium">{formatDate(selectedConsultation.followUpDate)}</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6 border-t border-gray-200">
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowDetailsModal(false)}
                      className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
                    >
                      Close
                    </button>
                    <button
                      onClick={() => {
                        setShowDetailsModal(false);
                        handleEdit(selectedConsultation);
                      }}
                      className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                    >
                      Edit Consultation
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
};

export default ConsultationManagement;
