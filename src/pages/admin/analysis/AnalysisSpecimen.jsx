import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Search,
  Filter,
  Download,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Save,
  X,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Users,
  MapPin,
  Bed,
  Stethoscope,
  Syringe,
  TestTube,
  FlaskConical,
  Package,
  Thermometer,
  Snowflake,
  Droplets,
  Zap,
  Target,
  Shield,
  Loader2,
  User,
  FileText,
  TrendingUp,
  AlertTriangle,
  Info,
  Phone,
  Mail,
  Building,
  Settings,
  Heart,
  Brain,
  Dna,
  Microscope,
  Beaker,
  QrCode,
  Barcode,
  Tag
} from 'lucide-react';

const AnalysisSpecimen = () => {
  const [specimens, setSpecimens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSpecimen, setSelectedSpecimen] = useState(null);
  const [formData, setFormData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [filters, setFilters] = useState({
    type: '',
    status: '',
    priority: '',
    storage: ''
  });

  // Mock data for demonstration
  const mockSpecimens = [
    {
      id: 1,
      specimenId: 'SPEC001',
      patientId: 'P2024001',
      patientName: 'John Smith',
      type: 'Blood',
      category: 'Hematology',
      testRequested: 'Complete Blood Count',
      collectionDate: '2024-01-30',
      collectionTime: '08:30',
      collectedBy: 'Nurse Sarah Johnson',
      storageLocation: 'Refrigerator A-1',
      storageCondition: '2-8°C',
      volume: '5 mL',
      container: 'EDTA Tube',
      status: 'received',
      priority: 'routine',
      expectedCompletion: '2024-01-30 14:00',
      actualCompletion: null,
      results: null,
      notes: 'Patient fasting for 12 hours',
      barcode: 'BC001234567',
      qrCode: 'QR001234567',
      department: 'Hematology Department',
      technician: 'Dr. Lisa Anderson',
      qualityCheck: 'passed',
      rejectionReason: null,
      processingTime: null,
      storageDuration: '24 hours',
      specialInstructions: 'Gentle mixing required',
      temperature: '4°C',
      hemolysis: 'none',
      clotting: 'none'
    },
    {
      id: 2,
      specimenId: 'SPEC002',
      patientId: 'P2024002',
      patientName: 'Emily Davis',
      type: 'Urine',
      category: 'Biochemistry',
      testRequested: 'Urinalysis Complete',
      collectionDate: '2024-01-30',
      collectionTime: '09:15',
      collectedBy: 'Nurse Michael Chen',
      storageLocation: 'Room Temperature B-2',
      storageCondition: '15-25°C',
      volume: '50 mL',
      container: 'Sterile Container',
      status: 'processing',
      priority: 'routine',
      expectedCompletion: '2024-01-30 16:00',
      actualCompletion: null,
      results: null,
      notes: 'First morning sample',
      barcode: 'BC001234568',
      qrCode: 'QR001234568',
      department: 'Biochemistry Laboratory',
      technician: 'Dr. Emily Davis',
      qualityCheck: 'passed',
      rejectionReason: null,
      processingTime: null,
      storageDuration: '2 hours',
      specialInstructions: 'Analyze within 2 hours',
      temperature: '20°C',
      hemolysis: 'none',
      clotting: 'none'
    },
    {
      id: 3,
      specimenId: 'SPEC003',
      patientId: 'P2024003',
      patientName: 'Robert Wilson',
      type: 'Blood',
      category: 'Biochemistry',
      testRequested: 'Comprehensive Metabolic Panel',
      collectionDate: '2024-01-30',
      collectionTime: '07:45',
      collectedBy: 'Nurse Lisa Anderson',
      storageLocation: 'Refrigerator A-2',
      storageCondition: '2-8°C',
      volume: '10 mL',
      container: 'Serum Separator Tube',
      status: 'completed',
      priority: 'urgent',
      expectedCompletion: '2024-01-30 12:00',
      actualCompletion: '2024-01-30 11:45',
      results: 'Normal ranges observed',
      notes: 'Patient on medication monitoring',
      barcode: 'BC001234569',
      qrCode: 'QR001234569',
      department: 'Biochemistry Laboratory',
      technician: 'Dr. James Wilson',
      qualityCheck: 'passed',
      rejectionReason: null,
      processingTime: '4 hours',
      storageDuration: '48 hours',
      specialInstructions: 'Separate serum within 30 minutes',
      temperature: '4°C',
      hemolysis: 'minimal',
      clotting: 'none'
    },
    {
      id: 4,
      specimenId: 'SPEC004',
      patientId: 'P2024004',
      patientName: 'Maria Garcia',
      type: 'Tissue',
      category: 'Pathology',
      testRequested: 'Histopathology Examination',
      collectionDate: '2024-01-30',
      collectionTime: '10:00',
      collectedBy: 'Dr. Robert Taylor',
      storageLocation: 'Formalin Container C-1',
      storageCondition: 'Room Temperature',
      volume: '2 cm³',
      container: 'Formalin Jar',
      status: 'processing',
      priority: 'urgent',
      expectedCompletion: '2024-02-02',
      actualCompletion: null,
      results: null,
      notes: 'Biopsy from left breast lesion',
      barcode: 'BC001234570',
      qrCode: 'QR001234570',
      department: 'Pathology Laboratory',
      technician: 'Dr. Sarah Johnson',
      qualityCheck: 'passed',
      rejectionReason: null,
      processingTime: null,
      storageDuration: '7 days',
      specialInstructions: 'Adequate fixation required',
      temperature: '20°C',
      hemolysis: 'na',
      clotting: 'na'
    },
    {
      id: 5,
      specimenId: 'SPEC005',
      patientId: 'P2024005',
      patientName: 'James Brown',
      type: 'Blood',
      category: 'Microbiology',
      testRequested: 'Culture and Sensitivity',
      collectionDate: '2024-01-30',
      collectionTime: '11:30',
      collectedBy: 'Nurse Emily Davis',
      storageLocation: 'Incubator D-1',
      storageCondition: '35-37°C',
      volume: '5 mL',
      container: 'Blood Culture Bottle',
      status: 'processing',
      priority: 'urgent',
      expectedCompletion: '2024-02-02',
      actualCompletion: null,
      results: null,
      notes: 'Suspected sepsis',
      barcode: 'BC001234571',
      qrCode: 'QR001234571',
      department: 'Microbiology Laboratory',
      technician: 'Dr. James Wilson',
      qualityCheck: 'passed',
      rejectionReason: null,
      processingTime: null,
      storageDuration: '5 days',
      specialInstructions: 'Immediate incubation required',
      temperature: '37°C',
      hemolysis: 'none',
      clotting: 'none'
    },
    {
      id: 6,
      specimenId: 'SPEC006',
      patientId: 'P2024006',
      patientName: 'Patricia Martinez',
      type: 'Swab',
      category: 'Microbiology',
      testRequested: 'Throat Culture',
      collectionDate: '2024-01-30',
      collectionTime: '13:00',
      collectedBy: 'Nurse Michael Chen',
      storageLocation: 'Transport Media E-1',
      storageCondition: '2-8°C',
      volume: 'N/A',
      container: 'Swab with Transport Media',
      status: 'rejected',
      priority: 'routine',
      expectedCompletion: null,
      actualCompletion: null,
      results: null,
      notes: 'Inadequate sample collection',
      barcode: 'BC001234572',
      qrCode: 'QR001234572',
      department: 'Microbiology Laboratory',
      technician: 'Dr. James Wilson',
      qualityCheck: 'failed',
      rejectionReason: 'Insufficient bacterial growth',
      processingTime: null,
      storageDuration: '24 hours',
      specialInstructions: 'Repeat collection required',
      temperature: '4°C',
      hemolysis: 'na',
      clotting: 'na'
    }
  ];

  const specimenTypes = [
    'Blood',
    'Urine',
    'Tissue',
    'Swab',
    'CSF',
    'Saliva',
    'Stool',
    'Semen',
    'Synovial Fluid',
    'Pleural Fluid'
  ];

  const categories = [
    'Hematology',
    'Biochemistry',
    'Microbiology',
    'Pathology',
    'Immunology',
    'Molecular Diagnostics',
    'Cytogenetics',
    'Toxicology'
  ];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setSpecimens(mockSpecimens);
      setLoading(false);
      addNotification('Analysis specimens loaded successfully', 'success');
    }, 1000);
  }, []);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleAddSpecimen = () => {
    const newSpecimen = {
      id: Date.now(),
      specimenId: `SPEC${String(Date.now()).slice(-3)}`,
      ...formData,
      collectionDate: new Date().toISOString().split('T')[0],
      collectionTime: new Date().toTimeString().slice(0, 5),
      status: 'collected',
      qualityCheck: 'pending',
      barcode: `BC${String(Date.now()).slice(-6)}`,
      qrCode: `QR${String(Date.now()).slice(-6)}`
    };
    setSpecimens([...specimens, newSpecimen]);
    setShowAddModal(false);
    setFormData({});
    addNotification('Specimen added successfully', 'success');
  };

  const handleEditSpecimen = () => {
    setSpecimens(specimens.map(specimen => 
      specimen.id === selectedSpecimen.id 
        ? { ...specimen, ...formData }
        : specimen
    ));
    setShowEditModal(false);
    setSelectedSpecimen(null);
    setFormData({});
    addNotification('Specimen updated successfully', 'success');
  };

  const handleDeleteSpecimen = (id) => {
    setSpecimens(specimens.filter(specimen => specimen.id !== id));
    addNotification('Specimen deleted successfully', 'success');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'collected': return 'text-blue-600 bg-blue-100';
      case 'received': return 'text-purple-600 bg-purple-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'routine': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'Blood': return <Droplets className="w-4 h-4" />;
      case 'Urine': return <TestTube className="w-4 h-4" />;
      case 'Tissue': return <Dna className="w-4 h-4" />;
      case 'Swab': return <TestTube className="w-4 h-4" />;
      case 'CSF': return <Brain className="w-4 h-4" />;
      case 'Saliva': return <Droplets className="w-4 h-4" />;
      default: return <FlaskConical className="w-4 h-4" />;
    }
  };

  const getQualityCheckColor = (qualityCheck) => {
    switch (qualityCheck) {
      case 'passed': return 'text-green-600 bg-green-100';
      case 'failed': return 'text-red-600 bg-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const filteredSpecimens = specimens.filter(specimen => {
    const matchesSearch = specimen.specimenId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         specimen.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         specimen.testRequested.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = !filters.type || specimen.type === filters.type;
    const matchesStatus = !filters.status || specimen.status === filters.status;
    const matchesPriority = !filters.priority || specimen.priority === filters.priority;
    const matchesStorage = !filters.storage || specimen.storageLocation.includes(filters.storage);
    
    return matchesSearch && matchesType && matchesStatus && matchesPriority && matchesStorage;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading specimens...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl">
              <FlaskConical className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analysis Specimen</h1>
              <p className="text-gray-600">Track and manage laboratory specimens and samples</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search specimens..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Specimen
            </button>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-white rounded-lg shadow-lg border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specimen Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  {specimenTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="collected">Collected</option>
                  <option value="received">Received</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={filters.priority}
                  onChange={(e) => setFilters({...filters, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="routine">Routine</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Storage Location</label>
                <input
                  type="text"
                  value={filters.storage}
                  onChange={(e) => setFilters({...filters, storage: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Search location..."
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => setFilters({ type: '', status: '', priority: '', storage: '' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Specimens', value: specimens.length, icon: FlaskConical, color: 'from-orange-500 to-orange-600' },
          { label: 'Processing', value: specimens.filter(s => s.status === 'processing').length, icon: Activity, color: 'from-yellow-500 to-yellow-600' },
          { label: 'Completed', value: specimens.filter(s => s.status === 'completed').length, icon: CheckCircle, color: 'from-green-500 to-green-600' },
          { label: 'Urgent Samples', value: specimens.filter(s => s.priority === 'urgent').length, icon: AlertTriangle, color: 'from-red-500 to-red-600' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Specimens Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Specimen Info
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Requested
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Collection
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Storage
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSpecimens.map((specimen, index) => (
                <motion.tr
                  key={specimen.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        {getTypeIcon(specimen.type)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{specimen.specimenId}</div>
                        <div className="text-sm text-gray-500">{specimen.type}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900">{specimen.patientName}</div>
                      <div className="text-sm text-gray-500">{specimen.patientId}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{specimen.testRequested}</div>
                      <div className="text-sm text-gray-500">{specimen.category}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{specimen.collectionDate}</div>
                      <div className="text-sm text-gray-500">{specimen.collectionTime}</div>
                      <div className="text-xs text-gray-400">by {specimen.collectedBy}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm text-gray-900">{specimen.storageLocation}</div>
                      <div className="text-sm text-gray-500">{specimen.storageCondition}</div>
                      <div className="text-xs text-gray-400">{specimen.volume}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(specimen.status)}`}>
                        {specimen.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getQualityCheckColor(specimen.qualityCheck)}`}>
                        {specimen.qualityCheck}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(specimen.priority)}`}>
                      {specimen.priority}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedSpecimen(specimen);
                          setShowViewModal(true);
                        }}
                        className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-1 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedSpecimen(specimen);
                          setFormData(specimen);
                          setShowEditModal(true);
                        }}
                        className="text-gray-600 hover:text-green-600 hover:bg-green-50 p-1 rounded"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteSpecimen(specimen.id)}
                        className="text-gray-600 hover:text-red-600 hover:bg-red-50 p-1 rounded"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">
                    {showAddModal ? 'Add Specimen' : 'Edit Specimen'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      setFormData({});
                      setSelectedSpecimen(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name *</label>
                    <input
                      type="text"
                      value={formData.patientName || ''}
                      onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID *</label>
                    <input
                      type="text"
                      value={formData.patientId || ''}
                      onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specimen Type *</label>
                    <select
                      value={formData.type || ''}
                      onChange={(e) => setFormData({...formData, type: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Type</option>
                      {specimenTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      value={formData.category || ''}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Test Requested *</label>
                    <input
                      type="text"
                      value={formData.testRequested || ''}
                      onChange={(e) => setFormData({...formData, testRequested: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Volume</label>
                    <input
                      type="text"
                      value={formData.volume || ''}
                      onChange={(e) => setFormData({...formData, volume: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., 5 mL"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Container</label>
                    <input
                      type="text"
                      value={formData.container || ''}
                      onChange={(e) => setFormData({...formData, container: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., EDTA Tube"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Storage Location *</label>
                    <input
                      type="text"
                      value={formData.storageLocation || ''}
                      onChange={(e) => setFormData({...formData, storageLocation: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Storage Condition</label>
                    <input
                      type="text"
                      value={formData.storageCondition || ''}
                      onChange={(e) => setFormData({...formData, storageCondition: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="e.g., 2-8°C"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={formData.priority || 'routine'}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    >
                      <option value="urgent">Urgent</option>
                      <option value="high">High</option>
                      <option value="routine">Routine</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Collected By</label>
                    <input
                      type="text"
                      value={formData.collectedBy || ''}
                      onChange={(e) => setFormData({...formData, collectedBy: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={formData.notes || ''}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                    <textarea
                      value={formData.specialInstructions || ''}
                      onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      setFormData({});
                      setSelectedSpecimen(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={showAddModal ? handleAddSpecimen : handleEditSpecimen}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {showAddModal ? 'Add Specimen' : 'Update Specimen'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedSpecimen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Specimen Details</h2>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      setSelectedSpecimen(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Specimen Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Specimen ID:</span>
                        <div className="font-medium flex items-center">
                          <Tag className="w-4 h-4 mr-1" />
                          {selectedSpecimen.specimenId}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Type:</span>
                        <div className="font-medium flex items-center">
                          {getTypeIcon(selectedSpecimen.type)}
                          <span className="ml-2">{selectedSpecimen.type}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Category:</span>
                        <div className="font-medium">{selectedSpecimen.category}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Volume:</span>
                        <div className="font-medium">{selectedSpecimen.volume}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Container:</span>
                        <div className="font-medium">{selectedSpecimen.container}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedSpecimen.status)}`}>
                          {selectedSpecimen.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Patient Name:</span>
                        <div className="font-medium flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {selectedSpecimen.patientName}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Patient ID:</span>
                        <div className="font-medium">{selectedSpecimen.patientId}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Test Requested:</span>
                        <div className="font-medium">{selectedSpecimen.testRequested}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Priority:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedSpecimen.priority)}`}>
                          {selectedSpecimen.priority}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Department:</span>
                        <div className="font-medium">{selectedSpecimen.department}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Technician:</span>
                        <div className="font-medium">{selectedSpecimen.technician}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Collection Details</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Collection Date:</span>
                        <div className="font-medium flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {selectedSpecimen.collectionDate}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Collection Time:</span>
                        <div className="font-medium flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {selectedSpecimen.collectionTime}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Collected By:</span>
                        <div className="font-medium">{selectedSpecimen.collectedBy}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Expected Completion:</span>
                        <div className="font-medium">{selectedSpecimen.expectedCompletion}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Actual Completion:</span>
                        <div className="font-medium">{selectedSpecimen.actualCompletion || 'Pending'}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Processing Time:</span>
                        <div className="font-medium">{selectedSpecimen.processingTime || 'N/A'}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Storage Location:</span>
                        <div className="font-medium flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {selectedSpecimen.storageLocation}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Storage Condition:</span>
                        <div className="font-medium flex items-center">
                          <Thermometer className="w-4 h-4 mr-1" />
                          {selectedSpecimen.storageCondition}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Temperature:</span>
                        <div className="font-medium">{selectedSpecimen.temperature}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Storage Duration:</span>
                        <div className="font-medium">{selectedSpecimen.storageDuration}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Quality Check:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getQualityCheckColor(selectedSpecimen.qualityCheck)}`}>
                          {selectedSpecimen.qualityCheck}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Identification Codes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Barcode className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Barcode</span>
                      </div>
                      <div className="font-mono text-sm">{selectedSpecimen.barcode}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <QrCode className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">QR Code</span>
                      </div>
                      <div className="font-mono text-sm">{selectedSpecimen.qrCode}</div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quality Assessment</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <span className="text-sm text-gray-600">Hemolysis:</span>
                      <div className="font-medium">{selectedSpecimen.hemolysis}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Clotting:</span>
                      <div className="font-medium">{selectedSpecimen.clotting}</div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-600">Rejection Reason:</span>
                      <div className="font-medium text-red-600">
                        {selectedSpecimen.rejectionReason || 'None'}
                      </div>
                    </div>
                  </div>
                </div>

                {selectedSpecimen.notes && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{selectedSpecimen.notes}</p>
                    </div>
                  </div>
                )}

                {selectedSpecimen.specialInstructions && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Instructions</h3>
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="w-4 h-4 text-yellow-600 mt-0.5" />
                        <p className="text-gray-700">{selectedSpecimen.specialInstructions}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedSpecimen.results && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h3>
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                        <p className="text-gray-700">{selectedSpecimen.results}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications */}
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
              notification.type === 'success' ? 'bg-green-500 text-white' :
              notification.type === 'error' ? 'bg-red-500 text-white' :
              'bg-blue-500 text-white'
            }`}
          >
            {notification.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AnalysisSpecimen;
