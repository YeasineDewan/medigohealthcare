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
  Save,
  Droplet,
  User,
  Clock,
  Calendar,
  Phone,
  MapPin,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  Activity,
  BarChart3,
  RefreshCw,
  Stethoscope,
  TestTube,
  Package,
  ArrowLeftRight,
  Truck,
  AlertTriangle,
  BadgeCheck,
  ClipboardList,
  Bell
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV, printDocument } from '../../../utils/exportUtils';

const SampleCollection = () => {
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSample, setSelectedSample] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    collectionType: 'all',
    dateRange: 'all'
  });

  // Mock data
  const mockSamples = [
    {
      id: 'SPL-2024-001',
      bookingId: 'LBK-001',
      patientName: 'Ahmed Hassan',
      patientPhone: '+1 234-567-8901',
      patientAge: 45,
      patientGender: 'Male',
      tests: ['CBC', 'Lipid Profile', 'Liver Function'],
      category: 'Biochemistry',
      collectionType: 'Home Collection',
      collectionAddress: '123 Main Street, Apt 4B, New York',
      referrer: 'Dr. Fatima Khan',
      phlebotomist: 'John Smith',
      sampleType: 'Blood',
      containerType: 'EDTA Tube + Serum Tube',
      volume: '10 ml',
      collectionDate: '2024-02-15',
      collectionTime: '08:30 AM',
      scheduledTime: '09:00 AM',
      status: 'collected',
      priority: 'normal',
      instructions: 'Fasting for 10-12 hours',
      notes: 'Patient has difficult veins - use butterfly needle',
      amount: 85.00,
      paymentStatus: 'paid',
      reportsDelivery: 'Online',
      barcode: 'SPL2024001'
    },
    {
      id: 'SPL-2024-002',
      bookingId: 'LBK-002',
      patientName: 'Sarah Johnson',
      patientPhone: '+1 234-567-8902',
      patientAge: 32,
      patientGender: 'Female',
      tests: ['Thyroid Profile', 'CBC'],
      category: 'Hematology',
      collectionType: 'Walk-in',
      collectionAddress: 'Lab Center',
      referrer: 'Dr. Rahman Ali',
      phlebotomist: 'Emily Davis',
      sampleType: 'Blood',
      containerType: 'EDTA Tube',
      volume: '5 ml',
      collectionDate: '2024-02-15',
      collectionTime: '09:15 AM',
      scheduledTime: '09:30 AM',
      status: 'pending',
      priority: 'normal',
      instructions: 'Morning sample preferred',
      notes: '',
      amount: 65.00,
      paymentStatus: 'pending',
      reportsDelivery: 'Print',
      barcode: 'SPL2024002'
    },
    {
      id: 'SPL-2024-003',
      bookingId: 'LBK-003',
      patientName: 'Mohammed Ali',
      patientPhone: '+1 234-567-8903',
      patientAge: 58,
      patientGender: 'Male',
      tests: ['Kidney Function', 'Electrolytes', 'Blood Sugar'],
      category: 'Biochemistry',
      collectionType: 'Home Collection',
      collectionAddress: '456 Oak Avenue, Brooklyn',
      referrer: 'Dr. Ahmed Hassan',
      phlebotomist: 'John Smith',
      sampleType: 'Blood',
      containerType: 'Sodium Fluoride + Serum Tube',
      volume: '8 ml',
      collectionDate: '2024-02-15',
      collectionTime: '',
      scheduledTime: '10:00 AM',
      status: 'scheduled',
      priority: 'urgent',
      instructions: 'Fasting required - diabetic patient',
      notes: 'Monitor blood sugar closely',
      amount: 95.00,
      paymentStatus: 'paid',
      reportsDelivery: 'Online',
      barcode: 'SPL2024003'
    },
    {
      id: 'SPL-2024-004',
      bookingId: 'LBK-004',
      patientName: 'Fatima Ahmed',
      patientPhone: '+1 234-567-8904',
      patientAge: 28,
      patientGender: 'Female',
      tests: ['Urine Analysis'],
      category: 'Clinical Pathology',
      collectionType: 'Walk-in',
      collectionAddress: 'Lab Center',
      referrer: 'Dr. Lisa Chen',
      phlebotomist: 'Emily Davis',
      sampleType: 'Urine',
      containerType: 'Sterile Container',
      volume: '50 ml',
      collectionDate: '2024-02-15',
      collectionTime: '10:00 AM',
      scheduledTime: '10:00 AM',
      status: 'collected',
      priority: 'normal',
      instructions: 'Morning urine sample',
      notes: '',
      amount: 25.00,
      paymentStatus: 'paid',
      reportsDelivery: 'Online',
      barcode: 'SPL2024004'
    },
    {
      id: 'SPL-2024-005',
      bookingId: 'LBK-005',
      patientName: 'Robert Williams',
      patientPhone: '+1 234-567-8905',
      patientAge: 62,
      patientGender: 'Male',
      tests: ['Lipid Profile', 'HbA1c', 'Kidney Function'],
      category: 'Biochemistry',
      collectionType: 'Home Collection',
      collectionAddress: '789 Pine Street, Queens',
      referrer: 'Dr. Sarah Miller',
      phlebotomist: 'Michael Brown',
      sampleType: 'Blood',
      containerType: 'EDTA + Serum + Sodium Fluoride',
      volume: '15 ml',
      collectionDate: '2024-02-15',
      collectionTime: '',
      scheduledTime: '11:30 AM',
      status: 'scheduled',
      priority: 'normal',
      instructions: 'Strictly fasting - 12 hours',
      notes: 'Elderly patient - handle with care',
      amount: 120.00,
      paymentStatus: 'pending',
      reportsDelivery: 'Online',
      barcode: 'SPL2024005'
    },
    {
      id: 'SPL-2024-006',
      bookingId: 'LBK-006',
      patientName: 'Amina Bibi',
      patientPhone: '+1 234-567-8906',
      patientAge: 35,
      patientGender: 'Female',
      tests: ['Pregnancy Test', 'CBC'],
      category: 'Serology',
      collectionType: 'Walk-in',
      collectionAddress: 'Lab Center',
      referrer: 'Dr. Fatima Khan',
      phlebotomist: 'Emily Davis',
      sampleType: 'Blood',
      containerType: 'Serum Tube',
      volume: '5 ml',
      collectionDate: '2024-02-14',
      collectionTime: '02:30 PM',
      scheduledTime: '02:30 PM',
      status: 'collected',
      priority: 'normal',
      instructions: 'Morning sample preferred',
      notes: '',
      amount: 45.00,
      paymentStatus: 'paid',
      reportsDelivery: 'Print',
      barcode: 'SPL2024006'
    },
    {
      id: 'SPL-2024-007',
      bookingId: 'LBK-007',
      patientName: 'James Wilson',
      patientPhone: '+1 234-567-8907',
      patientAge: 50,
      patientGender: 'Male',
      tests: ['PSA', 'CBC', 'Liver Function'],
      category: 'Biochemistry',
      collectionType: 'Home Collection',
      collectionAddress: '321 Elm Street, Bronx',
      referrer: 'Dr. Rahman Ali',
      phlebotomist: 'John Smith',
      sampleType: 'Blood',
      containerType: 'EDTA + Serum',
      volume: '10 ml',
      collectionDate: '2024-02-14',
      collectionTime: '03:00 PM',
      scheduledTime: '03:00 PM',
      status: 'delivered',
      priority: 'normal',
      instructions: 'No specific instructions',
      notes: '',
      amount: 95.00,
      paymentStatus: 'paid',
      reportsDelivery: 'Online',
      barcode: 'SPL2024007'
    },
    {
      id: 'SPL-2024-008',
      bookingId: 'LBK-008',
      patientName: 'Maria Garcia',
      patientPhone: '+1 234-567-8908',
      patientAge: 40,
      patientGender: 'Female',
      tests: ['Allergy Panel'],
      category: 'Immunology',
      collectionType: 'Walk-in',
      collectionAddress: 'Lab Center',
      referrer: 'Dr. Ahmed Hassan',
      phlebotomist: 'Emily Davis',
      sampleType: 'Blood',
      containerType: 'Serum Tube',
      volume: '10 ml',
      collectionDate: '2024-02-14',
      collectionTime: '04:00 PM',
      scheduledTime: '04:00 PM',
      status: 'collected',
      priority: 'normal',
      instructions: 'No antihistamines for 5 days',
      notes: '',
      amount: 150.00,
      paymentStatus: 'paid',
      reportsDelivery: 'Online',
      barcode: 'SPL2024008'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setSamples(mockSamples);
      setLoading(false);
    }, 800);
  }, []);

  const filteredSamples = samples.filter(sample => {
    const matchesSearch = 
      sample.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.patientPhone.includes(searchTerm) ||
      sample.tests.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filters.status === 'all' || sample.status === filters.status;
    const matchesCollectionType = filters.collectionType === 'all' || sample.collectionType === filters.collectionType;
    return matchesSearch && matchesStatus && matchesCollectionType;
  });

  const handleExport = (format) => {
    const columns = [
      { key: 'id', label: 'Sample ID' },
      { key: 'patientName', label: 'Patient Name' },
      { key: 'tests', label: 'Tests' },
      { key: 'collectionType', label: 'Collection Type' },
      { key: 'collectionDate', label: 'Collection Date' },
      { key: 'status', label: 'Status' },
      { key: 'phlebotomist', label: 'Phlebotomist' }
    ];
    
    const data = filteredSamples.map(s => ({
      ...s,
      tests: s.tests.join(', ')
    }));

    switch (format) {
      case 'pdf':
        exportToPDF(data, 'Sample Collection Report', columns);
        break;
      case 'csv':
        exportToCSV(data, 'sample-collection');
        break;
      case 'print':
        printDocument('Sample Collection Report');
        break;
      default:
        break;
    }
  };

  const handleAddSample = () => {
    setShowAddModal(true);
  };

  const handleViewSample = (sample) => {
    setSelectedSample(sample);
    setShowViewModal(true);
  };

  const updateSampleStatus = (sampleId, newStatus) => {
    setSamples(samples.map(s => 
      s.id === sampleId ? { ...s, status: newStatus } : s
    ));
  };

  // Stats
  const totalSamples = filteredSamples.length;
  const collectedSamples = filteredSamples.filter(s => s.status === 'collected').length;
  const pendingSamples = filteredSamples.filter(s => s.status === 'pending').length;
  const scheduledSamples = filteredSamples.filter(s => s.status === 'scheduled').length;
  const homeCollection = filteredSamples.filter(s => s.collectionType === 'Home Collection').length;
  const totalRevenue = filteredSamples.reduce((sum, s) => sum + s.amount, 0);

  const getStatusColor = (status) => {
    switch (status) {
      case 'collected': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'delivered': return 'bg-purple-100 text-purple-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityIcon = (priority) => {
    return priority === 'urgent' ? <AlertCircle className="w-4 h-4 text-red-500" /> : null;
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
          <h1 className="text-3xl font-bold text-gray-900">Sample Collection</h1>
          <p className="text-gray-500 mt-1">Manage sample collection appointments and tracking</p>
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
          <button
            onClick={handleAddSample}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
          >
            <Plus className="w-4 h-4" />
            New Collection
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Samples</p>
              <p className="text-2xl font-bold text-gray-900">{totalSamples}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Droplet className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Collected Today</p>
              <p className="text-2xl font-bold text-green-600">{collectedSamples}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Scheduled</p>
              <p className="text-2xl font-bold text-blue-600">{scheduledSamples}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Home Collection</p>
              <p className="text-2xl font-bold text-purple-600">{homeCollection}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Truck className="w-6 h-6 text-purple-600" />
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="all">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="pending">Pending</option>
                  <option value="collected">Collected</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Collection Type</label>
                <select
                  value={filters.collectionType}
                  onChange={(e) => setFilters({ ...filters, collectionType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="all">All Types</option>
                  <option value="Walk-in">Walk-in</option>
                  <option value="Home Collection">Home Collection</option>
                  <option value="Referral">Referral</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <select
                  value={filters.dateRange}
                  onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="tomorrow">Tomorrow</option>
                  <option value="week">This Week</option>
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
            placeholder="Search by patient name, sample ID, phone, or test name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          />
        </div>
      </div>

      {/* Samples Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Sample ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tests</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Collection</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Scheduled</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSamples.map((sample, index) => (
                <motion.tr
                  key={sample.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {getPriorityIcon(sample.priority)}
                      <span className="font-mono font-medium text-gray-900">{sample.id}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{sample.patientName}</p>
                      <p className="text-sm text-gray-500">{sample.patientAge}y • {sample.patientGender}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {sample.tests.slice(0, 2).map((test, i) => (
                        <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                          {test}
                        </span>
                      ))}
                      {sample.tests.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{sample.tests.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm text-gray-900">{sample.collectionType}</p>
                      <p className="text-xs text-gray-500">{sample.sampleType}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm text-gray-900">{sample.scheduledTime || 'Not set'}</p>
                      <p className="text-xs text-gray-500">{sample.collectionDate}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(sample.status)}`}>
                      {sample.status.charAt(0).toUpperCase() + sample.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${sample.amount.toFixed(2)}</p>
                      <p className={`text-xs ${sample.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                        {sample.paymentStatus === 'paid' ? 'Paid' : 'Pending'}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewSample(sample)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {sample.status === 'scheduled' && (
                        <button
                          onClick={() => updateSampleStatus(sample.id, 'collected')}
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Mark as Collected"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {sample.status === 'collected' && (
                        <button
                          onClick={() => updateSampleStatus(sample.id, 'delivered')}
                          className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Mark as Delivered"
                        >
                          <Truck className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedSample && (
          <ViewSampleModal
            sample={selectedSample}
            onClose={() => {
              setShowViewModal(false);
              setSelectedSample(null);
            }}
            onUpdateStatus={updateSampleStatus}
          />
        )}
      </AnimatePresence>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <AddSampleModal
            onClose={() => setShowAddModal(false)}
            onSave={(data) => {
              const newSample = {
                id: `SPL-2024-${String(samples.length + 1).padStart(3, '0')}`,
                ...data,
                status: 'scheduled',
                barcode: `SPL2024${String(samples.length + 1).padStart(3, '0')}`
              };
              setSamples([newSample, ...samples]);
              setShowAddModal(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// View Sample Modal Component
const ViewSampleModal = ({ sample, onClose, onUpdateStatus }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'collected': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'scheduled': return 'bg-blue-100 text-blue-700';
      case 'delivered': return 'bg-purple-100 text-purple-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Droplet className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">Sample Collection Details</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Header Status */}
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-lg font-bold text-gray-900">{sample.id}</p>
              <p className="text-sm text-gray-500">Booking: {sample.bookingId}</p>
            </div>
            <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(sample.status)}`}>
              {sample.status.charAt(0).toUpperCase() + sample.status.slice(1)}
            </span>
          </div>

          {/* Patient Info */}
          <div className="border-t border-b border-gray-200 py-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Patient Name</p>
                  <p className="font-medium text-gray-900">{sample.patientName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Phone className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{sample.patientPhone}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Calendar className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Age / Gender</p>
                  <p className="font-medium text-gray-900">{sample.patientAge} years / {sample.patientGender}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Stethoscope className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Referrer</p>
                  <p className="font-medium text-gray-900">{sample.referrer}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Test Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">Tests Ordered</p>
                <div className="flex flex-wrap gap-2">
                  {sample.tests.map((test, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">
                      {test}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">Category</p>
                <p className="font-medium text-gray-900">{sample.category}</p>
              </div>
            </div>
          </div>

          {/* Sample Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Sample Type</p>
                <p className="font-medium text-gray-900">{sample.sampleType}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Container</p>
                <p className="font-medium text-gray-900">{sample.containerType}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500">Volume</p>
                <p className="font-medium text-gray-900">{sample.volume}</p>
              </div>
            </div>
          </div>

          {/* Collection Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Collection Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Collection Type</p>
                  <p className="font-medium text-gray-900">{sample.collectionType}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Scheduled Time</p>
                  <p className="font-medium text-gray-900">{sample.scheduledTime || 'Not scheduled'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Collection Time</p>
                  <p className="font-medium text-gray-900">{sample.collectionTime || 'Not collected'}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-500">Phlebotomist</p>
                  <p className="font-medium text-gray-900">{sample.phlebotomist}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Collection Date</p>
                  <p className="font-medium text-gray-900">{sample.collectionDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Instructions</p>
                  <p className="font-medium text-gray-900">{sample.instructions}</p>
                </div>
              </div>
            </div>
            {sample.collectionType === 'Home Collection' && (
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-blue-600" />
                  <p className="font-medium text-gray-900">{sample.collectionAddress}</p>
                </div>
              </div>
            )}
          </div>

          {/* Payment & Reports */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Amount</p>
              <p className="text-2xl font-bold text-green-600">${sample.amount.toFixed(2)}</p>
              <p className={`text-sm ${sample.paymentStatus === 'paid' ? 'text-green-600' : 'text-yellow-600'}`}>
                {sample.paymentStatus === 'paid' ? '✓ Paid' : '⏳ Payment Pending'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Reports Delivery</p>
              <p className="font-medium text-gray-900">{sample.reportsDelivery}</p>
              <p className="text-sm text-gray-500 mt-1">Barcode: {sample.barcode}</p>
            </div>
          </div>

          {/* Notes */}
          {sample.notes && (
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <p className="font-medium text-gray-900">Notes</p>
              </div>
              <p className="text-gray-700">{sample.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            {sample.status === 'scheduled' && (
              <button
                onClick={() => { onUpdateStatus(sample.id, 'collected'); onClose(); }}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                <CheckCircle className="w-4 h-4" />
                Mark as Collected
              </button>
            )}
            {sample.status === 'collected' && (
              <button
                onClick={() => { onUpdateStatus(sample.id, 'delivered'); onClose(); }}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Truck className="w-4 h-4" />
                Mark as Delivered to Lab
              </button>
            )}
            {sample.status !== 'cancelled' && sample.status !== 'delivered' && (
              <button
                onClick={() => { onUpdateStatus(sample.id, 'cancelled'); onClose(); }}
                className="flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200"
              >
                <XCircle className="w-4 h-4" />
                Cancel Collection
              </button>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Add Sample Modal Component
const AddSampleModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    patientName: '',
    patientPhone: '',
    patientAge: '',
    patientGender: 'Male',
    tests: [],
    category: 'Biochemistry',
    collectionType: 'Walk-in',
    collectionAddress: '',
    referrer: '',
    phlebotomist: '',
    sampleType: 'Blood',
    containerType: 'EDTA Tube',
    volume: '5 ml',
    scheduledDate: '',
    scheduledTime: '',
    instructions: '',
    notes: '',
    amount: 0,
    paymentStatus: 'pending',
    reportsDelivery: 'Online'
  });

  const [testInput, setTestInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      collectionDate: formData.scheduledDate,
      collectionTime: '',
      bookingId: `LBK-${Date.now()}`
    });
  };

  const addTest = () => {
    if (testInput.trim()) {
      setFormData({
        ...formData,
        tests: [...formData.tests, testInput.trim()]
      });
      setTestInput('');
    }
  };

  const removeTest = (index) => {
    setFormData({
      ...formData,
      tests: formData.tests.filter((_, i) => i !== index)
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">New Sample Collection</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Patient Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name *</label>
                <input
                  type="text"
                  required
                  value={formData.patientName}
                  onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.patientPhone}
                  onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                <input
                  type="number"
                  value={formData.patientAge}
                  onChange={(e) => setFormData({ ...formData, patientAge: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={formData.patientGender}
                  onChange={(e) => setFormData({ ...formData, patientGender: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          {/* Tests */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tests</h3>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={testInput}
                onChange={(e) => setTestInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTest())}
                placeholder="Add a test..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              />
              <button
                type="button"
                onClick={addTest}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.tests.map((test, i) => (
                <span key={i} className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {test}
                  <button type="button" onClick={() => removeTest(i)} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Collection Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Collection Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Collection Type</label>
                <select
                  value={formData.collectionType}
                  onChange={(e) => setFormData({ ...formData, collectionType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="Walk-in">Walk-in</option>
                  <option value="Home Collection">Home Collection</option>
                  <option value="Referral">Referral</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Sample Type</label>
                <select
                  value={formData.sampleType}
                  onChange={(e) => setFormData({ ...formData, sampleType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="Blood">Blood</option>
                  <option value="Urine">Urine</option>
                  <option value="Stool">Stool</option>
                  <option value="Sputum">Sputum</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date</label>
                <input
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) => setFormData({ ...formData, scheduledDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Time</label>
                <input
                  type="time"
                  value={formData.scheduledTime}
                  onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                />
              </div>
              {formData.collectionType === 'Home Collection' && (
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Collection Address</label>
                  <textarea
                    value={formData.collectionAddress}
                    onChange={(e) => setFormData({ ...formData, collectionAddress: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] transition-colors"
            >
              <Save className="w-4 h-4 inline mr-2" />
              Create Collection
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default SampleCollection;

