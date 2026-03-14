import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Plus, Search, Filter, Download, Eye, Edit, Send, Calendar, User, Pill, Clock, 
  CheckCircle, Video, MapPin, Mail, Phone, Star, AlertCircle, X, Upload, Image, Camera, 
  Mic, MicOff, VideoOff, VideoIcon, Headphones, Share2, Save, Trash2, Copy, Printer,
  ChevronDown, ChevronUp, ArrowUpRight, ArrowDownRight, TrendingUp, Activity, Heart,
  Thermometer, Stethoscope, Award, Shield, Zap, Globe, Languages, Settings, Bell,
  FilterIcon, Grid, List, SearchIcon, RefreshCw, MoreVertical, Paperclip, Smile,
  Frown, Meh, MessageCircle, PhoneCall, Home, Building, Briefcase,
  CreditCard, DollarSign, Tag, Barcode, QrCode, FileImage, FileScan, Signature,
  Stamp, Clipboard, NotePencil
} from 'lucide-react';

const videoConsultationPrescriptions = [
  {
    id: 'VC-001',
    patient: 'Ahmed Khan',
    age: 34,
    date: '2024-01-15',
    time: '10:30 AM',
    duration: '25 min',
    diagnosis: 'Hypertension',
    medicines: [
      { name: 'Amlodipine 5mg', dosage: '1-0-0', duration: '30 days', instructions: 'Take after meals' },
      { name: 'Aspirin 75mg', dosage: '0-0-1', duration: '30 days', instructions: 'Take at bedtime' }
    ],
    instructions: 'Monitor blood pressure daily. Reduce salt intake. Exercise regularly.',
    followUp: '2 weeks',
    status: 'Active',
    payment: 'Paid',
    rating: 5,
    notes: 'Patient responded well to treatment. BP controlled.',
    attachments: ['blood_report.pdf', 'ecg_report.pdf']
  },
  {
    id: 'VC-002',
    patient: 'Sara Ali',
    age: 28,
    date: '2024-01-14',
    time: '2:15 PM',
    duration: '30 min',
    diagnosis: 'Common Cold',
    medicines: [
      { name: 'Paracetamol 500mg', dosage: '1-1-1', duration: '5 days', instructions: 'Take after food' },
      { name: 'Cetirizine 10mg', dosage: '0-0-1', duration: '7 days', instructions: 'Take at night' }
    ],
    instructions: 'Rest and drink plenty of fluids. Gargle with warm water.',
    followUp: '1 week if symptoms persist',
    status: 'Active',
    payment: 'Paid',
    rating: 4,
    notes: 'Patient recovering well.',
    attachments: []
  }
];

const chamberVisitPrescriptions = [
  {
    id: 'CV-001',
    patient: 'Rahman Hossain',
    age: 45,
    date: '2024-01-13',
    time: '11:00 AM',
    duration: '35 min',
    diagnosis: 'Diabetes Type 2',
    medicines: [
      { name: 'Metformin 500mg', dosage: '1-0-1', duration: '90 days', instructions: 'Take before meals' },
      { name: 'Glimepiride 2mg', dosage: '1-0-0', duration: '90 days', instructions: 'Take before breakfast' }
    ],
    instructions: 'Regular blood sugar monitoring required. Follow diabetic diet.',
    followUp: '1 month',
    status: 'Active',
    payment: 'Paid',
    rating: 5,
    notes: 'Patient compliant with treatment. Good glycemic control.',
    attachments: ['blood_sugar_chart.pdf', 'diet_plan.pdf']
  },
  {
    id: 'CV-002',
    patient: 'Fatema Begum',
    age: 52,
    date: '2024-01-12',
    time: '3:30 PM',
    duration: '40 min',
    diagnosis: 'Osteoarthritis',
    medicines: [
      { name: 'Ibuprofen 400mg', dosage: '1-1-1', duration: '7 days', instructions: 'Take after meals' },
      { name: 'Calcium Carbonate 500mg', dosage: '1-0-1', duration: '60 days', instructions: 'Take with meals' }
    ],
    instructions: 'Physical therapy recommended. Avoid heavy lifting.',
    followUp: '3 weeks',
    status: 'Active',
    payment: 'Paid',
    rating: 4,
    notes: 'Patient showing improvement with therapy.',
    attachments: ['xray_report.pdf']
  }
];

const onlineQuotePrescriptions = [
  {
    id: 'OQ-001',
    patient: 'Karim Uddin',
    age: 38,
    date: '2024-01-11',
    time: '4:45 PM',
    duration: '15 min',
    diagnosis: 'Acidity',
    medicines: [
      { name: 'Omeprazole 20mg', dosage: '0-1-0', duration: '14 days', instructions: 'Take before breakfast' },
      { name: 'Antacid Gel', dosage: 'SOS', duration: '30 days', instructions: 'Take when needed' }
    ],
    instructions: 'Avoid spicy food. Eat small frequent meals.',
    followUp: '2 weeks',
    status: 'Pending',
    payment: 'Pending',
    rating: 0,
    notes: 'Online consultation via quote system.',
    attachments: ['symptom_image.jpg'],
    quoteAmount: '৳500',
    quoteStatus: 'Pending Approval'
  },
  {
    id: 'OQ-002',
    patient: 'Ayesha Siddique',
    age: 25,
    date: '2024-01-10',
    time: '6:00 PM',
    duration: '20 min',
    diagnosis: 'Migraine',
    medicines: [
      { name: 'Sumatriptan 50mg', dosage: 'SOS', duration: '30 days', instructions: 'Take at onset of headache' },
      { name: 'Propranolol 40mg', dosage: '1-0-1', duration: '60 days', instructions: 'Take regularly' }
    ],
    instructions: 'Identify triggers. Maintain headache diary.',
    followUp: '1 month',
    status: 'Active',
    payment: 'Paid',
    rating: 5,
    notes: 'Patient responding well to preventive therapy.',
    attachments: ['headache_diary.pdf'],
    quoteAmount: '৳800',
    quoteStatus: 'Approved'
  }
];

export default function EnhancedPrescriptionSystem() {
  const [activeTab, setActiveTab] = useState('video');
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPrescription, setShowNewPrescription] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');
  const [filterStatus, setFilterStatus] = useState('all');

  const getPrescriptionsByType = () => {
    switch (activeTab) {
      case 'video':
        return videoConsultationPrescriptions;
      case 'chamber':
        return chamberVisitPrescriptions;
      case 'online':
        return onlineQuotePrescriptions;
      default:
        return [];
    }
  };

  const filteredPrescriptions = getPrescriptionsByType().filter(rx => {
    const matchesSearch = rx.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rx.diagnosis.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || rx.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const stats = {
    video: {
      total: videoConsultationPrescriptions.length,
      thisMonth: videoConsultationPrescriptions.filter(rx => rx.date.startsWith('2024-01')).length,
      active: videoConsultationPrescriptions.filter(rx => rx.status === 'Active').length,
      avgRating: (videoConsultationPrescriptions.reduce((acc, rx) => acc + rx.rating, 0) / videoConsultationPrescriptions.length).toFixed(1)
    },
    chamber: {
      total: chamberVisitPrescriptions.length,
      thisMonth: chamberVisitPrescriptions.filter(rx => rx.date.startsWith('2024-01')).length,
      active: chamberVisitPrescriptions.filter(rx => rx.status === 'Active').length,
      avgRating: (chamberVisitPrescriptions.reduce((acc, rx) => acc + rx.rating, 0) / chamberVisitPrescriptions.length).toFixed(1)
    },
    online: {
      total: onlineQuotePrescriptions.length,
      thisMonth: onlineQuotePrescriptions.filter(rx => rx.date.startsWith('2024-01')).length,
      active: onlineQuotePrescriptions.filter(rx => rx.status === 'Active').length,
      avgRating: (onlineQuotePrescriptions.reduce((acc, rx) => acc + rx.rating, 0) / onlineQuotePrescriptions.length).toFixed(1)
    }
  };

  const currentStats = stats[activeTab];

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? 'text-yellow-500 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'completed': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPaymentColor = (payment) => {
    switch (payment.toLowerCase()) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getTabIcon = (tab) => {
    switch (tab) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'chamber': return <Building className="w-5 h-5" />;
      case 'online': return <Globe className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getTabColor = (tab) => {
    switch (tab) {
      case 'video': return 'from-blue-500 to-blue-600';
      case 'chamber': return 'from-green-500 to-green-600';
      case 'online': return 'from-purple-500 to-purple-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-8 backdrop-blur-xl bg-white/95">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-1">
                  <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                    <FileText className="w-8 h-8 text-transparent bg-gradient-to-br from-purple-600 to-pink-600" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Professional Prescription System</h1>
                <p className="text-gray-600 mt-2">Comprehensive prescription management for all consultation types</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowNewPrescription(true)}
                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-bold shadow-lg shadow-purple-500/25"
              >
                <Plus className="w-5 h-5" />
                New Prescription
              </button>
              <button className="relative group p-3 rounded-xl hover:bg-gray-100 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity" />
                <Bell className="w-6 h-6 text-gray-700 relative z-10" />
                <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-2 backdrop-blur-xl bg-white/95">
          <div className="grid grid-cols-3 gap-2">
            {['video', 'chamber', 'online'].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab(tab)}
                className={`flex items-center justify-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300 ${
                  activeTab === tab
                    ? `bg-gradient-to-r ${getTabColor(tab)} text-white shadow-lg`
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {getTabIcon(tab)}
                <span className="capitalize">
                  {tab === 'video' ? 'Video Consultation' : tab === 'chamber' ? 'Chamber Visit' : 'Online Quote'}
                </span>
                {activeTab === tab && (
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                )}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden backdrop-blur-xl bg-white/95"
          >
            <div className="p-6">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${getTabColor(activeTab)} flex items-center justify-center mb-4`}>
                <FileText className="w-7 h-7 text-white" />
              </div>
              <p className="text-gray-500 text-sm mb-1">Total Prescriptions</p>
              <p className="text-3xl font-bold text-gray-900">{currentStats.total}</p>
              <div className="flex items-center gap-2 mt-3">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">+12% this month</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden backdrop-blur-xl bg-white/95"
          >
            <div className="p-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                <Calendar className="w-7 h-7 text-white" />
              </div>
              <p className="text-gray-500 text-sm mb-1">This Month</p>
              <p className="text-3xl font-bold text-gray-900">{currentStats.thisMonth}</p>
              <div className="flex items-center gap-2 mt-3">
                <Activity className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-blue-600 font-medium">Active prescriptions</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden backdrop-blur-xl bg-white/95"
          >
            <div className="p-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
                <CheckCircle className="w-7 h-7 text-white" />
              </div>
              <p className="text-gray-500 text-sm mb-1">Active</p>
              <p className="text-3xl font-bold text-gray-900">{currentStats.active}</p>
              <div className="flex items-center gap-2 mt-3">
                <Zap className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-purple-600 font-medium">Currently active</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden backdrop-blur-xl bg-white/95"
          >
            <div className="p-6">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-4">
                <Star className="w-7 h-7 text-white" />
              </div>
              <p className="text-gray-500 text-sm mb-1">Average Rating</p>
              <p className="text-3xl font-bold text-gray-900">{currentStats.avgRating}</p>
              <div className="flex items-center gap-1 mt-3">
                {renderStars(Math.round(currentStats.avgRating))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-6 backdrop-blur-xl bg-white/95">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by patient name, prescription ID, or diagnosis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              />
            </div>
            <div className="flex items-center gap-3">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="completed">Completed</option>
              </select>
              <button className="p-3 border-2 border-gray-200 rounded-2xl hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center border-2 border-gray-200 rounded-2xl">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-l-xl transition-colors ${
                    viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-r-xl transition-colors ${
                    viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'hover:bg-gray-50'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Prescriptions Grid/List */}
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
          {filteredPrescriptions.map((prescription, index) => (
            <motion.div
              key={prescription.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden backdrop-blur-xl bg-white/95 hover:shadow-2xl transition-all duration-300 ${
                viewMode === 'list' ? 'p-6' : ''
              }`}
            >
              {viewMode === 'grid' ? (
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{prescription.patient}</h3>
                        <p className="text-sm text-gray-500">Age: {prescription.age}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(prescription.status)}`}>
                        {prescription.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPaymentColor(prescription.payment)}`}>
                        {prescription.payment}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Prescription ID</span>
                      <span className="text-sm font-bold text-gray-900">{prescription.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Date & Time</span>
                      <span className="text-sm font-medium text-gray-900">{prescription.date} • {prescription.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Duration</span>
                      <span className="text-sm font-medium text-gray-900">{prescription.duration}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Diagnosis</span>
                      <span className="text-sm font-medium text-gray-900">{prescription.diagnosis}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Medicines</span>
                      <span className="text-sm font-medium text-gray-900">{prescription.medicines.length} items</span>
                    </div>
                    {prescription.rating > 0 && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Rating</span>
                        <div className="flex items-center gap-1">
                          {renderStars(prescription.rating)}
                        </div>
                      </div>
                    )}
                    {prescription.quoteAmount && (
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500">Quote Amount</span>
                        <span className="text-sm font-bold text-purple-600">{prescription.quoteAmount}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setSelectedPrescription(prescription)}
                      className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors font-medium"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors font-medium">
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors font-medium">
                      <Send className="w-4 h-4" />
                      Send
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{prescription.patient}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{prescription.id}</span>
                        <span>{prescription.date}</span>
                        <span>{prescription.diagnosis}</span>
                        <span>{prescription.medicines.length} medicines</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(prescription.status)}`}>
                      {prescription.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getPaymentColor(prescription.payment)}`}>
                      {prescription.payment}
                    </span>
                    {prescription.rating > 0 && (
                      <div className="flex items-center gap-1">
                        {renderStars(prescription.rating)}
                      </div>
                    )}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedPrescription(prescription)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                        <Send className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Prescription Detail Modal */}
        <AnimatePresence>
          {selectedPrescription && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedPrescription(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Prescription Details</h2>
                      <p className="text-gray-600">ID: {selectedPrescription.id}</p>
                    </div>
                    <button
                      onClick={() => setSelectedPrescription(null)}
                      className="p-3 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                </div>
                
                <div className="p-8 space-y-8">
                  {/* Patient Information */}
                  <div className="bg-gray-50 rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Patient Information</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Name</p>
                        <p className="font-medium text-gray-900">{selectedPrescription.patient}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Age</p>
                        <p className="font-medium text-gray-900">{selectedPrescription.age} years</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Date</p>
                        <p className="font-medium text-gray-900">{selectedPrescription.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Time</p>
                        <p className="font-medium text-gray-900">{selectedPrescription.time}</p>
                      </div>
                    </div>
                  </div>

                  {/* Consultation Details */}
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Consultation Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Duration</p>
                        <p className="font-medium text-gray-900">{selectedPrescription.duration}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Diagnosis</p>
                        <p className="font-medium text-gray-900">{selectedPrescription.diagnosis}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Follow-up</p>
                        <p className="font-medium text-gray-900">{selectedPrescription.followUp}</p>
                      </div>
                    </div>
                  </div>

                  {/* Medicines */}
                  <div className="bg-purple-50 rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Prescribed Medicines</h3>
                    <div className="space-y-4">
                      {selectedPrescription.medicines.map((medicine, index) => (
                        <div key={index} className="bg-white rounded-xl p-4 border border-purple-200">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-bold text-gray-900">{medicine.name}</h4>
                            <Pill className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="grid grid-cols-3 gap-4 text-sm">
                            <div>
                              <span className="text-gray-500">Dosage:</span>
                              <span className="ml-2 font-medium text-gray-900">{medicine.dosage}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Duration:</span>
                              <span className="ml-2 font-medium text-gray-900">{medicine.duration}</span>
                            </div>
                            <div>
                              <span className="text-gray-500">Instructions:</span>
                              <span className="ml-2 font-medium text-gray-900">{medicine.instructions}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-green-50 rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Medical Instructions</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedPrescription.instructions}</p>
                  </div>

                  {/* Notes */}
                  {selectedPrescription.notes && (
                    <div className="bg-yellow-50 rounded-2xl p-6">
                      <h3 className="font-bold text-lg text-gray-900 mb-4">Doctor's Notes</h3>
                      <p className="text-gray-700 leading-relaxed">{selectedPrescription.notes}</p>
                    </div>
                  )}

                  {/* Attachments */}
                  {selectedPrescription.attachments && selectedPrescription.attachments.length > 0 && (
                    <div className="bg-orange-50 rounded-2xl p-6">
                      <h3 className="font-bold text-lg text-gray-900 mb-4">Attachments</h3>
                      <div className="space-y-2">
                        {selectedPrescription.attachments.map((attachment, index) => (
                          <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 border border-orange-200">
                            <div className="flex items-center gap-3">
                              <FileText className="w-5 h-5 text-orange-600" />
                              <span className="text-sm font-medium text-gray-900">{attachment}</span>
                            </div>
                            <button className="text-orange-600 hover:text-orange-700 font-medium text-sm">
                              View
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <button className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-bold shadow-lg">
                      <Download className="w-5 h-5" />
                      Download PDF
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-bold shadow-lg">
                      <Send className="w-5 h-5" />
                      Send to Patient
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-bold shadow-lg">
                      <Edit className="w-5 h-5" />
                      Edit
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
