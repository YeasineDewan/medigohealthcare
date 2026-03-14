import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, TrendingUp, Users, Calendar, DollarSign, Clock, Download, Filter, FileText, Eye,
  Edit, Trash2, Search, ChevronDown, ChevronUp, ArrowUpRight, ArrowDownRight, Activity,
  Heart, Thermometer, Stethoscope, Award, Shield, Zap, Globe, Languages, Settings, Bell,
  CheckCircle, XCircle, AlertCircle, Star, MessageCircle, Phone, Video, MapPin, Mail,
  FileImage, FileScan, Printer, Share2, Save, Copy, Plus, X, RefreshCw, MoreVertical,
  Grid, List, FilterIcon, SearchIcon, CalendarDays, TrendingDown, PieChart, LineChart,
  Target, AwardIcon, Briefcase, CreditCard, User, Building, Home, Camera, Mic,
  Headphones, Monitor, Wifi, Battery, Signal, Cloud, Database, Server, HardDrive,
  DownloadCloud, UploadCloud, FileDown, FileUp, FolderOpen, Folder, Archive,
  FileSpreadsheet, FileText2, FileCheck, FileX, FileWarning, FileQuestion,
  Clipboard, ClipboardList, ClipboardCheck, ClipboardX, ClipboardPlus,
  Pill, Capsules, Syringe, TestTube, Microscope,
  Brain, HeartPulse,
  ActivitySquare, HeartHandshake
} from 'lucide-react';

const patientReports = [
  {
    id: 'RPT-001',
    patient: 'Ahmed Khan',
    age: 34,
    date: '2024-01-15',
    type: 'Blood Test',
    category: 'Laboratory',
    status: 'Completed',
    priority: 'Normal',
    doctor: 'Dr. Ahmed Hassan',
    findings: 'Normal blood parameters. Slightly elevated cholesterol.',
    recommendations: 'Diet modification and regular exercise.',
    attachments: ['blood_report.pdf', 'cholesterol_chart.pdf'],
    images: ['blood_sample_1.jpg', 'blood_sample_2.jpg'],
    vitalSigns: {
      bloodPressure: '120/80',
      heartRate: '72',
      temperature: '98.6°F',
      oxygen: '98%'
    },
    followUp: '2024-02-15',
    cost: '৳1,500',
    insurance: 'Covered',
    emergencyContact: '01712345678'
  },
  {
    id: 'RPT-002',
    patient: 'Sara Ali',
    age: 28,
    date: '2024-01-14',
    type: 'X-Ray',
    category: 'Radiology',
    status: 'Completed',
    priority: 'Urgent',
    doctor: 'Dr. Ahmed Hassan',
    findings: 'Fracture in left tibia. No displacement.',
    recommendations: 'Cast immobilization for 6 weeks. Follow-up X-ray in 2 weeks.',
    attachments: ['xray_report.pdf', 'fracture_analysis.pdf'],
    images: ['xray_leg_1.jpg', 'xray_leg_2.jpg'],
    vitalSigns: {
      bloodPressure: '110/70',
      heartRate: '68',
      temperature: '98.4°F',
      oxygen: '99%'
    },
    followUp: '2024-01-28',
    cost: '৳3,000',
    insurance: 'Partial',
    emergencyContact: '01823456789'
  },
  {
    id: 'RPT-003',
    patient: 'Rahman Hossain',
    age: 45,
    date: '2024-01-13',
    type: 'ECG',
    category: 'Cardiology',
    status: 'In Progress',
    priority: 'High',
    doctor: 'Dr. Ahmed Hassan',
    findings: 'Irregular heartbeat pattern detected.',
    recommendations: 'Further cardiac evaluation required.',
    attachments: ['ecg_raw_data.pdf'],
    images: ['ecg_trace_1.jpg'],
    vitalSigns: {
      bloodPressure: '140/90',
      heartRate: '95',
      temperature: '99.0°F',
      oxygen: '97%'
    },
    followUp: '2024-01-20',
    cost: '৳2,000',
    insurance: 'Pending',
    emergencyContact: '01934567890'
  },
  {
    id: 'RPT-004',
    patient: 'Fatema Begum',
    age: 52,
    date: '2024-01-12',
    type: 'MRI',
    category: 'Radiology',
    status: 'Completed',
    priority: 'Normal',
    doctor: 'Dr. Ahmed Hassan',
    findings: 'Mild disc bulge at L4-L5 level.',
    recommendations: 'Physical therapy and pain management.',
    attachments: ['mri_report.pdf', 'spine_analysis.pdf'],
    images: ['mri_spine_1.jpg', 'mri_spine_2.jpg', 'mri_spine_3.jpg'],
    vitalSigns: {
      bloodPressure: '130/85',
      heartRate: '75',
      temperature: '98.2°F',
      oxygen: '98%'
    },
    followUp: '2024-02-12',
    cost: '৳8,000',
    insurance: 'Covered',
    emergencyContact: '01645678901'
  }
];

const reportCategories = [
  { name: 'Laboratory', icon: TestTube, color: 'from-blue-500 to-blue-600', count: 145 },
  { name: 'Radiology', icon: Camera, color: 'from-purple-500 to-purple-600', count: 89 },
  { name: 'Cardiology', icon: Heart, color: 'from-red-500 to-red-600', count: 67 },
  { name: 'Pathology', icon: Microscope, color: 'from-green-500 to-green-600', count: 34 },
  { name: 'Neurology', icon: Brain, color: 'from-pink-500 to-pink-600', count: 23 },
  { name: 'Orthopedics', icon: Bone, color: 'from-amber-500 to-amber-600', count: 45 }
];

export default function EnhancedReportsSystem() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('date');
  const [selectedReport, setSelectedReport] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingReport, setEditingReport] = useState(null);

  const filteredReports = patientReports.filter(report => {
    const matchesSearch = report.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         report.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || report.category === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const stats = {
    total: patientReports.length,
    completed: patientReports.filter(r => r.status === 'Completed').length,
    inProgress: patientReports.filter(r => r.status === 'In Progress').length,
    urgent: patientReports.filter(r => r.priority === 'Urgent' || r.priority === 'High').length,
    thisMonth: patientReports.filter(r => r.date.startsWith('2024-01')).length,
    totalRevenue: patientReports.reduce((acc, r) => acc + parseInt(r.cost.replace('৳', '').replace(',', '')), 0)
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'completed': return 'bg-green-100 text-green-700 border-green-200';
      case 'in progress': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'pending': return 'bg-orange-100 text-orange-700 border-orange-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'normal': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getCategoryIcon = (category) => {
    const cat = reportCategories.find(c => c.name === category);
    return cat ? cat.icon : FileText;
  };

  const getCategoryColor = (category) => {
    const cat = reportCategories.find(c => c.name === category);
    return cat ? cat.color : 'from-gray-500 to-gray-600';
  };

  const handleEditReport = (report) => {
    setEditingReport({ ...report });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    // In a real app, this would save to the backend
    console.log('Saving edited report:', editingReport);
    setShowEditModal(false);
    setEditingReport(null);
  };

  const handleDeleteReport = (reportId) => {
    // In a real app, this would delete from the backend
    console.log('Deleting report:', reportId);
  };

  const handleDownloadReport = (report) => {
    // In a real app, this would generate and download a PDF
    console.log('Downloading report:', report.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-2xl p-8 backdrop-blur-xl bg-white/95">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 p-1">
                  <div className="w-full h-full rounded-2xl bg-white flex items-center justify-center">
                    <FileSpreadsheet className="w-8 h-8 text-transparent bg-gradient-to-br from-blue-600 to-purple-600" />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-4 border-white">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Professional Reports System</h1>
                <p className="text-gray-600 mt-2">Comprehensive medical reports management with advanced analytics</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-bold shadow-lg shadow-blue-500/25">
                <Plus className="w-5 h-5" />
                New Report
              </button>
              <button className="relative group p-3 rounded-xl hover:bg-gray-100 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl opacity-0 group-hover:opacity-10 transition-opacity" />
                <Bell className="w-6 h-6 text-gray-700 relative z-10" />
                <span className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full animate-pulse border-2 border-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden backdrop-blur-xl bg-white/95"
          >
            <div className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-500 text-sm mb-1">Total Reports</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              <div className="flex items-center gap-2 mt-3">
                <TrendingUp className="w-4 h-4 text-green-500" />
                <span className="text-sm text-green-600 font-medium">+15% this month</span>
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
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-500 text-sm mb-1">Completed</p>
              <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
              <div className="flex items-center gap-2 mt-3">
                <Activity className="w-4 h-4 text-blue-500" />
                <span className="text-sm text-blue-600 font-medium">75% completion</span>
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
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-yellow-500 to-yellow-600 flex items-center justify-center mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-500 text-sm mb-1">In Progress</p>
              <p className="text-2xl font-bold text-gray-900">{stats.inProgress}</p>
              <div className="flex items-center gap-2 mt-3">
                <AlertCircle className="w-4 h-4 text-yellow-500" />
                <span className="text-sm text-yellow-600 font-medium">Processing</span>
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
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-500 text-sm mb-1">Urgent</p>
              <p className="text-2xl font-bold text-gray-900">{stats.urgent}</p>
              <div className="flex items-center gap-2 mt-3">
                <Zap className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-600 font-medium">Immediate</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden backdrop-blur-xl bg-white/95"
          >
            <div className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-500 text-sm mb-1">This Month</p>
              <p className="text-2xl font-bold text-gray-900">{stats.thisMonth}</p>
              <div className="flex items-center gap-2 mt-3">
                <TrendingUp className="w-4 h-4 text-purple-500" />
                <span className="text-sm text-purple-600 font-medium">+8% growth</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-3xl border border-gray-200 shadow-xl overflow-hidden backdrop-blur-xl bg-white/95"
          >
            <div className="p-6">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-500 text-sm mb-1">Revenue</p>
              <p className="text-2xl font-bold text-gray-900">৳{stats.totalRevenue.toLocaleString()}</p>
              <div className="flex items-center gap-2 mt-3">
                <Award className="w-4 h-4 text-amber-500" />
                <span className="text-sm text-amber-600 font-medium">+12% profit</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Categories */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-6 backdrop-blur-xl bg-white/95">
          <h3 className="font-bold text-lg text-gray-900 mb-6">Report Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {reportCategories.map((category, index) => (
              <motion.button
                key={category.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(selectedCategory === category.name ? 'all' : category.name)}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 ${
                  selectedCategory === category.name
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center mx-auto mb-3`}>
                  <category.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="font-bold text-gray-900 text-sm">{category.name}</h4>
                <p className="text-xs text-gray-500 mt-1">{category.count} reports</p>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-6 backdrop-blur-xl bg-white/95">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by patient name, report ID, or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              />
            </div>
            <div className="flex items-center gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-3 border-2 border-gray-200 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
              >
                <option value="all">All Status</option>
                <option value="Completed">Completed</option>
                <option value="In Progress">In Progress</option>
                <option value="Pending">Pending</option>
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

        {/* Reports Grid/List */}
        <div className={viewMode === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6' : 'space-y-4'}>
          {filteredReports.map((report, index) => (
            <motion.div
              key={report.id}
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
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryColor(report.category)} flex items-center justify-center`}>
                        {React.createElement(getCategoryIcon(report.category), { className: "w-6 h-6 text-white" })}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{report.patient}</h3>
                        <p className="text-sm text-gray-500">Age: {report.age}</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(report.status)}`}>
                        {report.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(report.priority)}`}>
                        {report.priority}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Report ID</span>
                      <span className="text-sm font-bold text-gray-900">{report.id}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Type</span>
                      <span className="text-sm font-medium text-gray-900">{report.type}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Date</span>
                      <span className="text-sm font-medium text-gray-900">{report.date}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Category</span>
                      <span className="text-sm font-medium text-gray-900">{report.category}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Cost</span>
                      <span className="text-sm font-bold text-green-600">{report.cost}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Attachments</span>
                      <span className="text-sm font-medium text-gray-900">{report.attachments.length + report.images.length} files</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => setSelectedReport(report)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-purple-100 text-purple-700 rounded-xl hover:bg-purple-200 transition-colors font-medium text-sm"
                    >
                      <Eye className="w-4 h-4" />
                      View
                    </button>
                    <button
                      onClick={() => handleEditReport(report)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-colors font-medium text-sm"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDownloadReport(report)}
                      className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-green-100 text-green-700 rounded-xl hover:bg-green-200 transition-colors font-medium text-sm"
                    >
                      <Download className="w-4 h-4" />
                      Download
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getCategoryColor(report.category)} flex items-center justify-center`}>
                      {React.createElement(getCategoryIcon(report.category), { className: "w-6 h-6 text-white" })}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{report.patient}</h3>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>{report.id}</span>
                        <span>{report.type}</span>
                        <span>{report.date}</span>
                        <span>{report.category}</span>
                        <span>{report.cost}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(report.status)}`}>
                      {report.status}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getPriorityColor(report.priority)}`}>
                      {report.priority}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedReport(report)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleEditReport(report)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDownloadReport(report)}
                        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <Download className="w-4 h-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDeleteReport(report.id)}
                        className="p-2 rounded-lg hover:bg-red-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Report Detail Modal */}
        <AnimatePresence>
          {selectedReport && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setSelectedReport(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">Medical Report Details</h2>
                      <p className="text-gray-600">ID: {selectedReport.id}</p>
                    </div>
                    <button
                      onClick={() => setSelectedReport(null)}
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
                        <p className="font-medium text-gray-900">{selectedReport.patient}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Age</p>
                        <p className="font-medium text-gray-900">{selectedReport.age} years</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Emergency Contact</p>
                        <p className="font-medium text-gray-900">{selectedReport.emergencyContact}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Insurance</p>
                        <p className="font-medium text-gray-900">{selectedReport.insurance}</p>
                      </div>
                    </div>
                  </div>

                  {/* Report Information */}
                  <div className="bg-blue-50 rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Report Information</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Type</p>
                        <p className="font-medium text-gray-900">{selectedReport.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Category</p>
                        <p className="font-medium text-gray-900">{selectedReport.category}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Date</p>
                        <p className="font-medium text-gray-900">{selectedReport.date}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Cost</p>
                        <p className="font-medium text-gray-900">{selectedReport.cost}</p>
                      </div>
                    </div>
                  </div>

                  {/* Vital Signs */}
                  <div className="bg-green-50 rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Vital Signs</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="flex items-center gap-3">
                        <Heart className="w-5 h-5 text-red-500" />
                        <div>
                          <p className="text-sm text-gray-500">Blood Pressure</p>
                          <p className="font-medium text-gray-900">{selectedReport.vitalSigns.bloodPressure}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Activity className="w-5 h-5 text-blue-500" />
                        <div>
                          <p className="text-sm text-gray-500">Heart Rate</p>
                          <p className="font-medium text-gray-900">{selectedReport.vitalSigns.heartRate} bpm</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Thermometer className="w-5 h-5 text-orange-500" />
                        <div>
                          <p className="text-sm text-gray-500">Temperature</p>
                          <p className="font-medium text-gray-900">{selectedReport.vitalSigns.temperature}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Lungs className="w-5 h-5 text-purple-500" />
                        <div>
                          <p className="text-sm text-gray-500">Oxygen Level</p>
                          <p className="font-medium text-gray-900">{selectedReport.vitalSigns.oxygen}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Medical Findings */}
                  <div className="bg-purple-50 rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Medical Findings</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedReport.findings}</p>
                  </div>

                  {/* Recommendations */}
                  <div className="bg-yellow-50 rounded-2xl p-6">
                    <h3 className="font-bold text-lg text-gray-900 mb-4">Recommendations</h3>
                    <p className="text-gray-700 leading-relaxed">{selectedReport.recommendations}</p>
                  </div>

                  {/* Attachments */}
                  {(selectedReport.attachments.length > 0 || selectedReport.images.length > 0) && (
                    <div className="bg-orange-50 rounded-2xl p-6">
                      <h3 className="font-bold text-lg text-gray-900 mb-4">Attachments</h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {selectedReport.attachments.map((attachment, index) => (
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
                        {selectedReport.images.map((image, index) => (
                          <div key={index} className="flex items-center justify-between bg-white rounded-lg p-3 border border-orange-200">
                            <div className="flex items-center gap-3">
                              <FileImage className="w-5 h-5 text-orange-600" />
                              <span className="text-sm font-medium text-gray-900">{image}</span>
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
                    <button
                      onClick={() => handleDownloadReport(selectedReport)}
                      className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 font-bold shadow-lg"
                    >
                      <Download className="w-5 h-5" />
                      Download PDF
                    </button>
                    <button
                      onClick={() => handleEditReport(selectedReport)}
                      className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-bold shadow-lg"
                    >
                      <Edit className="w-5 h-5" />
                      Edit Report
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 font-bold shadow-lg">
                      <Share2 className="w-5 h-5" />
                      Share
                    </button>
                    <button className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-2xl hover:from-red-700 hover:to-orange-700 transition-all duration-300 font-bold shadow-lg">
                      <Printer className="w-5 h-5" />
                      Print
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Edit Report Modal */}
        <AnimatePresence>
          {showEditModal && editingReport && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
              onClick={() => setShowEditModal(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
                  <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold text-gray-900">Edit Report</h2>
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="p-3 rounded-xl hover:bg-gray-100 transition-colors"
                    >
                      <X className="w-6 h-6 text-gray-600" />
                    </button>
                  </div>
                </div>
                
                <div className="p-8 space-y-6">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Patient Name</label>
                      <input
                        type="text"
                        value={editingReport.patient}
                        onChange={(e) => setEditingReport({ ...editingReport, patient: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                      <input
                        type="text"
                        value={editingReport.type}
                        onChange={(e) => setEditingReport({ ...editingReport, type: e.target.value })}
                        className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Findings</label>
                    <textarea
                      value={editingReport.findings}
                      onChange={(e) => setEditingReport({ ...editingReport, findings: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Recommendations</label>
                    <textarea
                      value={editingReport.recommendations}
                      onChange={(e) => setEditingReport({ ...editingReport, recommendations: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>

                  <div className="flex gap-4 pt-6 border-t border-gray-200">
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-2xl hover:from-green-700 hover:to-emerald-700 transition-all duration-300 font-bold shadow-lg"
                    >
                      <Save className="w-5 h-5" />
                      Save Changes
                    </button>
                    <button
                      onClick={() => setShowEditModal(false)}
                      className="flex-1 flex items-center justify-center gap-3 px-6 py-3 bg-gray-200 text-gray-700 rounded-2xl hover:bg-gray-300 transition-all duration-300 font-bold"
                    >
                      <X className="w-5 h-5" />
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
