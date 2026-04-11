import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText, Download, Upload, Search, Filter, Plus, Edit, Trash2, Save, X,
  Calendar, Clock, User, Stethoscope, TestTube, Microscope, FlaskConical,
  Heart, Activity, Brain, Eye, Ear, Smile, Bone, Baby, Pill,
  FileSearch, FileDown, FileUp, FileSignature, Receipt,
  CreditCard, Wallet, Shield, Award, Target, Zap, BarChart3, PieChart,
  LineChart, TrendingUp, TrendingDown, AlertCircle, CheckCircle, XCircle,
  Star, Bell, Settings, HelpCircle, LogOut, Menu, Home, ChevronRight,
  ChevronDown, MoreVertical, Eye as EyeIcon, EyeOff, Lock, Unlock,
  Key, Badge, Fingerprint, ShieldCheck, ShieldAlert, ShieldX,
  Building, Hospital, Globe, Languages, BookOpen, GraduationCap,
  Briefcase, Users, UserCheck, UserPlus, UserMinus, Camera, Video,
  MessageSquare, PhoneCall, VideoOff, Mic, MicOff, Wifi, Battery,
  Sun, Moon, MapPin, Phone, Mail, DollarSign, TrendingUp as TrendingUpIcon,
  Activity as ActivityIcon, Heart as HeartIcon, Shield as ShieldIcon,
  Award as AwardIcon, Target as TargetIcon, Zap as ZapIcon
} from 'lucide-react';

const medicalRecords = [
  {
    id: 1,
    type: 'Blood Test',
    category: 'Laboratory',
    date: '2024-01-15',
    doctor: 'Dr. Ahmed Hassan',
    hospital: 'City Hospital',
    status: 'completed',
    results: 'Normal',
    file: 'blood_test_2024.pdf',
    size: '2.4 MB',
    description: 'Complete blood count, lipid panel, liver function tests',
    urgency: 'normal',
    shareable: true
  },
  {
    id: 2,
    type: 'X-Ray',
    category: 'Radiology',
    date: '2024-01-10',
    doctor: 'Dr. Sarah Smith',
    hospital: 'Medical Center',
    status: 'completed',
    results: 'No abnormalities detected',
    file: 'xray_chest_2024.pdf',
    size: '1.8 MB',
    description: 'Chest X-ray PA view',
    urgency: 'normal',
    shareable: true
  },
  {
    id: 3,
    type: 'ECG',
    category: 'Cardiology',
    date: '2024-01-08',
    doctor: 'Dr. Fatima Rahman',
    hospital: 'Heart Care Center',
    status: 'completed',
    results: 'Normal sinus rhythm',
    file: 'ecg_2024.pdf',
    size: '0.8 MB',
    description: '12-lead ECG with rhythm analysis',
    urgency: 'normal',
    shareable: true
  },
  {
    id: 4,
    type: 'MRI',
    category: 'Radiology',
    date: '2024-01-05',
    doctor: 'Dr. Karim Ahmed',
    hospital: 'Advanced Imaging',
    status: 'completed',
    results: 'Minor inflammation detected',
    file: 'mri_knee_2024.pdf',
    size: '5.2 MB',
    description: 'MRI of right knee joint',
    urgency: 'high',
    shareable: false
  },
  {
    id: 5,
    type: 'Urine Test',
    category: 'Laboratory',
    date: '2024-01-03',
    doctor: 'Dr. Nusrat Jahan',
    hospital: 'City Hospital',
    status: 'completed',
    results: 'Normal',
    file: 'urine_test_2024.pdf',
    size: '1.2 MB',
    description: 'Complete urine analysis',
    urgency: 'normal',
    shareable: true
  }
];

const categories = [
  { id: 'all', name: 'All Records', icon: FileText, color: 'blue' },
  { id: 'laboratory', name: 'Laboratory', icon: TestTube, color: 'green' },
  { id: 'radiology', name: 'Radiology', icon: Microscope, color: 'purple' },
  { id: 'cardiology', name: 'Cardiology', icon: Heart, color: 'red' },
  { id: 'neurology', name: 'Neurology', icon: Brain, color: 'orange' },
  { id: 'ophthalmology', name: 'Ophthalmology', icon: Eye, color: 'teal' },
  { id: 'ent', name: 'ENT', icon: Ear, color: 'indigo' },
  { id: 'dental', name: 'Dental', icon: Smile, color: 'pink' }
];

export default function PatientMedicalRecords() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredRecords = medicalRecords.filter(record => {
    const matchesSearch = record.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.hospital.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || record.category.toLowerCase() === selectedCategory;
    return matchesSearch && matchesCategory;
  }).sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleDownload = (record) => {
    // In production, this would download the actual file
    console.log('Downloading:', record.file);
  };

  const handleShare = (record) => {
    setSelectedRecord(record);
    setShowShareModal(true);
  };

  const handleUpload = () => {
    setShowUploadModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-700';
      case 'medium': return 'bg-orange-100 text-orange-700';
      case 'normal': return 'bg-green-100 text-green-700';
      default: return 'bg-gray-100 text-gray-700';
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
          <h1 className="text-3xl font-bold text-gray-900">Medical Records</h1>
          <p className="text-gray-600 mt-1">Access and manage your medical documents and test results</p>
        </div>
        <button
          onClick={handleUpload}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
        >
          <Upload className="w-5 h-5" />
          Upload Records
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
            <FileText className="w-5 h-5 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">{medicalRecords.length}</span>
          </div>
          <p className="text-sm text-gray-600">Total Records</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <TestTube className="w-5 h-5 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">3</span>
          </div>
          <p className="text-sm text-gray-600">Laboratory Tests</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <Microscope className="w-5 h-5 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">2</span>
          </div>
          <p className="text-sm text-gray-600">Radiology Reports</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <Heart className="w-5 h-5 text-red-600" />
            <span className="text-2xl font-bold text-gray-900">1</span>
          </div>
          <p className="text-sm text-gray-600">Cardiology Tests</p>
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2"
      >
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2 ${
              selectedCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <category.icon className="w-4 h-4" />
            {category.name}
          </button>
        ))}
      </motion.div>

      {/* Search and Sort */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search records..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="type">Sort by Type</option>
            <option value="doctor">Sort by Doctor</option>
            <option value="hospital">Sort by Hospital</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </motion.div>

      {/* Records List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-4"
      >
        {filteredRecords.map((record, index) => (
          <motion.div
            key={record.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg ${
                    record.category === 'Laboratory' ? 'bg-green-50' :
                    record.category === 'Radiology' ? 'bg-purple-50' :
                    record.category === 'Cardiology' ? 'bg-red-50' :
                    'bg-blue-50'
                  }`}>
                    {
                      record.category === 'Laboratory' ? <TestTube className="w-6 h-6 text-green-600" /> :
                      record.category === 'Radiology' ? <Microscope className="w-6 h-6 text-purple-600" /> :
                      record.category === 'Cardiology' ? <Heart className="w-6 h-6 text-red-600" /> :
                      <FileText className="w-6 h-6 text-blue-600" />
                    }
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{record.type}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(record.urgency)}`}>
                        {record.urgency}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(record.status)}`}>
                        {record.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{record.description}</p>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{record.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{record.doctor}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Hospital className="w-4 h-4" />
                        <span>{record.hospital}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileText className="w-4 h-4" />
                        <span>{record.file}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Activity className="w-4 h-4" />
                        <span>{record.size}</span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900 mt-2">Results: {record.results}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(record)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedRecord(record)}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleShare(record)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Share"
                      disabled={!record.shareable}
                    >
                      <ShareIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Upload Modal */}
      <AnimatePresence>
        {showUploadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowUploadModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Upload Medical Record</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Record Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Blood Test</option>
                    <option>X-Ray</option>
                    <option>ECG</option>
                    <option>MRI</option>
                    <option>CT Scan</option>
                    <option>Ultrasound</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter description..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-500 mt-1">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowUploadModal(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Upload
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && selectedRecord && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Share Medical Record</h2>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">{selectedRecord.type}</p>
                  <p className="text-sm text-gray-600">{selectedRecord.description}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Share with</label>
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message (optional)</label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Add a message..."
                  />
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setShowShareModal(false)}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Share
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Missing imports
import { Share2 as ShareIcon } from 'lucide-react';
