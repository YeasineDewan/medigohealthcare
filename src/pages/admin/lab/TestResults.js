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
  TestTube,
  User,
  Clock,
  Calendar,
  Phone,
  ChevronDown,
  CheckCircle,
  XCircle,
  AlertCircle,
  AlertTriangle,
  Activity,
  BarChart3,
  RefreshCw,
  Send,
  Mail,
  FileCheck,
  ArrowUpDown,
  BadgeCheck,
  Clock4,
  PrinterCheck,
  Share2,
  FlaskConical,
  ClipboardList,
  TrendingUp,
  TrendingDown,
  Minus
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV, printData } from '../../../utils/exportUtils';

const TestResults = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showEntryModal, setShowEntryModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    priority: 'all'
  });

  // Mock data with test parameters and reference ranges
  const mockResults = [
    {
      id: 'TR-2024-001',
      sampleId: 'SPL-2024-001',
      patientName: 'Ahmed Hassan',
      patientPhone: '+1 234-567-8901',
      patientAge: 45,
      patientGender: 'Male',
      referrer: 'Dr. Fatima Khan',
      tests: ['CBC', 'Lipid Profile'],
      category: 'Hematology',
      testDate: '2024-02-15',
      receivedTime: '09:00 AM',
      dueDate: '2024-02-15',
      status: 'pending',
      priority: 'normal',
      parameters: [
        { name: 'Hemoglobin', value: null, unit: 'g/dL', refRange: '13.5-17.5', status: 'pending' },
        { name: 'WBC', value: null, unit: 'cells/μL', refRange: '4500-11000', status: 'pending' },
        { name: 'RBC', value: null, unit: 'million/μL', refRange: '4.5-5.5', status: 'pending' },
        { name: 'Platelets', value: null, unit: 'cells/μL', refRange: '150000-400000', status: 'pending' },
        { name: 'Hematocrit', value: null, unit: '%', refRange: '38.8-50.0', status: 'pending' }
      ],
      amount: 45.00,
      notes: ''
    },
    {
      id: 'TR-2024-002',
      sampleId: 'SPL-2024-002',
      patientName: 'Sarah Johnson',
      patientPhone: '+1 234-567-8902',
      patientAge: 32,
      patientGender: 'Female',
      referrer: 'Dr. Rahman Ali',
      tests: ['Thyroid Profile'],
      category: 'Endocrinology',
      testDate: '2024-02-15',
      receivedTime: '09:30 AM',
      dueDate: '2024-02-16',
      status: 'in-progress',
      priority: 'normal',
      parameters: [
        { name: 'TSH', value: 3.2, unit: 'μIU/mL', refRange: '0.4-4.0', status: 'normal' },
        { name: 'Free T4', value: null, unit: 'ng/dL', refRange: '0.8-1.8', status: 'pending' },
        { name: 'Free T3', value: null, unit: 'pg/mL', refRange: '2.3-4.2', status: 'pending' }
      ],
      amount: 85.00,
      notes: ''
    },
    {
      id: 'TR-2024-003',
      sampleId: 'SPL-2024-003',
      patientName: 'Mohammed Ali',
      patientPhone: '+1 234-567-8903',
      patientAge: 58,
      patientGender: 'Male',
      referrer: 'Dr. Ahmed Hassan',
      tests: ['Kidney Function', 'Electrolytes'],
      category: 'Biochemistry',
      testDate: '2024-02-15',
      receivedTime: '10:15 AM',
      dueDate: '2024-02-15',
      status: 'completed',
      priority: 'urgent',
      parameters: [
        { name: 'Creatinine', value: 1.8, unit: 'mg/dL', refRange: '0.7-1.3', status: 'high' },
        { name: 'BUN', value: 28, unit: 'mg/dL', refRange: '7-20', status: 'high' },
        { name: 'Sodium', value: 138, unit: 'mEq/L', refRange: '136-145', status: 'normal' },
        { name: 'Potassium', value: 5.8, unit: 'mEq/L', refRange: '3.5-5.0', status: 'high' },
        { name: 'Chloride', value: 102, unit: 'mEq/L', refRange: '98-106', status: 'normal' }
      ],
      amount: 75.00,
      notes: 'Elevated creatinine - monitor kidney function',
      published: true,
      publishedDate: '2024-02-15',
      publishedTime: '02:30 PM'
    },
    {
      id: 'TR-2024-004',
      sampleId: 'SPL-2024-004',
      patientName: 'Fatima Ahmed',
      patientPhone: '+1 234-567-8904',
      patientAge: 28,
      patientGender: 'Female',
      referrer: 'Dr. Lisa Chen',
      tests: ['Liver Function'],
      category: 'Biochemistry',
      testDate: '2024-02-15',
      receivedTime: '10:30 AM',
      dueDate: '2024-02-15',
      status: 'completed',
      priority: 'normal',
      parameters: [
        { name: 'ALT', value: 25, unit: 'U/L', refRange: '7-56', status: 'normal' },
        { name: 'AST', value: 22, unit: 'U/L', refRange: '10-40', status: 'normal' },
        { name: 'Bilirubin Total', value: 0.8, unit: 'mg/dL', refRange: '0.1-1.2', status: 'normal' },
        { name: 'Albumin', value: 4.2, unit: 'g/dL', refRange: '3.5-5.0', status: 'normal' },
        { name: 'Total Protein', value: 7.0, unit: 'g/dL', refRange: '6.0-8.3', status: 'normal' }
      ],
      amount: 65.00,
      notes: 'All values within normal range',
      published: true,
      publishedDate: '2024-02-15',
      publishedTime: '03:00 PM'
    },
    {
      id: 'TR-2024-005',
      sampleId: 'SPL-2024-005',
      patientName: 'Robert Williams',
      patientPhone: '+1 234-567-8905',
      patientAge: 62,
      patientGender: 'Male',
      referrer: 'Dr. Sarah Miller',
      tests: ['Lipid Profile', 'HbA1c'],
      category: 'Biochemistry',
      testDate: '2024-02-15',
      receivedTime: '11:45 AM',
      dueDate: '2024-02-16',
      status: 'pending',
      priority: 'normal',
      parameters: [
        { name: 'Total Cholesterol', value: null, unit: 'mg/dL', refRange: '<200', status: 'pending' },
        { name: 'LDL Cholesterol', value: null, unit: 'mg/dL', refRange: '<100', status: 'pending' },
        { name: 'HDL Cholesterol', value: null, unit: 'mg/dL', refRange: '>40', status: 'pending' },
        { name: 'Triglycerides', value: null, unit: 'mg/dL', refRange: '<150', status: 'pending' },
        { name: 'HbA1c', value: null, unit: '%', refRange: '<5.7', status: 'pending' }
      ],
      amount: 95.00,
      notes: ''
    },
    {
      id: 'TR-2024-006',
      sampleId: 'SPL-2024-006',
      patientName: 'Amina Bibi',
      patientPhone: '+1 234-567-8906',
      patientAge: 35,
      patientGender: 'Female',
      referrer: 'Dr. Fatima Khan',
      tests: ['Pregnancy Test', 'CBC'],
      category: 'Serology',
      testDate: '2024-02-14',
      receivedTime: '02:45 PM',
      dueDate: '2024-02-14',
      status: 'completed',
      priority: 'urgent',
      parameters: [
        { name: 'hCG', value: 2500, unit: 'mIU/mL', refRange: '<5 (Non-pregnant)', status: 'high' },
        { name: 'Hemoglobin', value: 12.5, unit: 'g/dL', refRange: '12.0-15.5', status: 'normal' },
        { name: 'WBC', value: 7500, unit: 'cells/μL', refRange: '4500-11000', status: 'normal' }
      ],
      amount: 55.00,
      notes: 'Positive pregnancy - 5 weeks estimated',
      published: true,
      publishedDate: '2024-02-14',
      publishedTime: '05:00 PM'
    },
    {
      id: 'TR-2024-007',
      sampleId: 'SPL-2024-007',
      patientName: 'James Wilson',
      patientPhone: '+1 234-567-8907',
      patientAge: 50,
      patientGender: 'Male',
      referrer: 'Dr. Rahman Ali',
      tests: ['PSA', 'CBC'],
      category: 'Biochemistry',
      testDate: '2024-02-14',
      receivedTime: '03:15 PM',
      dueDate: '2024-02-15',
      status: 'completed',
      priority: 'normal',
      parameters: [
        { name: 'Total PSA', value: 2.8, unit: 'ng/mL', refRange: '<4.0', status: 'normal' },
        { name: 'Free PSA', value: 0.4, unit: 'ng/mL', refRange: '>0.25', status: 'normal' },
        { name: 'Hemoglobin', value: 14.2, unit: 'g/dL', refRange: '13.5-17.5', status: 'normal' }
      ],
      amount: 75.00,
      notes: 'PSA ratio favorable',
      published: false,
      publishedDate: '',
      publishedTime: ''
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setResults(mockResults);
      setLoading(false);
    }, 800);
  }, []);

  const filteredResults = results.filter(result => {
    const matchesSearch = 
      result.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.sampleId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.tests.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filters.status === 'all' || result.status === filters.status;
    const matchesCategory = filters.category === 'all' || result.category === filters.category;
    const matchesPriority = filters.priority === 'all' || result.priority === filters.priority;
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });

  const handleExport = (format) => {
    const columns = [
      { key: 'id', label: 'Result ID' },
      { key: 'patientName', label: 'Patient Name' },
      { key: 'tests', label: 'Tests' },
      { key: 'category', label: 'Category' },
      { key: 'testDate', label: 'Test Date' },
      { key: 'status', label: 'Status' }
    ];
    
    const data = filteredResults.map(r => ({
      ...r,
      tests: r.tests.join(', ')
    }));

    switch (format) {
      case 'pdf':
        exportToPDF(data, 'Test Results Report', columns);
        break;
      case 'csv':
        exportToCSV(data, 'test-results');
        break;
      case 'print':
        printData(data, 'Test Results Report');
        break;
      default:
        break;
    }
  };

  const handleEnterResults = (result) => {
    setSelectedResult(result);
    setShowEntryModal(true);
  };

  const handleViewResult = (result) => {
    setSelectedResult(result);
    setShowViewModal(true);
  };

  const updateParameterValue = (paramIndex, value) => {
    if (!selectedResult) return;
    
    const updatedParams = [...selectedResult.parameters];
    const param = updatedParams[paramIndex];
    
    // Parse the reference range to determine if value is normal/high/low
    const refRange = param.refRange;
    let status = 'normal';
    
    if (value !== '' && value !== null) {
      const numValue = parseFloat(value);
      
      if (refRange.includes('<')) {
        const threshold = parseFloat(refRange.replace('<', '').trim());
        if (numValue > threshold) status = 'high';
      } else if (refRange.includes('>')) {
        const threshold = parseFloat(refRange.replace('>', '').trim());
        if (numValue < threshold) status = 'low';
      } else if (refRange.includes('-')) {
        const [min, max] = refRange.split('-').map(v => parseFloat(v.trim()));
        if (numValue < min) status = 'low';
        else if (numValue > max) status = 'high';
      }
    } else {
      status = 'pending';
    }
    
    updatedParams[paramIndex] = { ...param, value: value !== '' ? parseFloat(value) : null, status };
    
    setSelectedResult({ ...selectedResult, parameters: updatedParams });
  };

  const saveResults = () => {
    const allEntered = selectedResult.parameters.every(p => p.value !== null && p.value !== '');
    const newStatus = allEntered ? 'completed' : 'in-progress';
    
    setResults(results.map(r => 
      r.id === selectedResult.id ? { ...selectedResult, status: newStatus } : r
    ));
    setShowEntryModal(false);
  };

  const publishResult = (resultId) => {
    const now = new Date();
    setResults(results.map(r => 
      r.id === resultId ? { 
        ...r, 
        published: true, 
        publishedDate: now.toISOString().split('T')[0],
        publishedTime: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
      } : r
    ));
  };

  // Stats
  const totalResults = filteredResults.length;
  const pendingResults = filteredResults.filter(r => r.status === 'pending').length;
  const inProgressResults = filteredResults.filter(r => r.status === 'in-progress').length;
  const completedResults = filteredResults.filter(r => r.status === 'completed').length;
  const publishedResults = filteredResults.filter(r => r.published).length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-700';
      case 'in-progress': return 'bg-blue-100 text-blue-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getParamStatusColor = (status) => {
    switch (status) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      case 'normal': return 'text-green-600 bg-green-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const getParamStatusIcon = (status) => {
    switch (status) {
      case 'high': return <TrendingUp className="w-4 h-4" />;
      case 'low': return <TrendingDown className="w-4 h-4" />;
      case 'normal': return <Minus className="w-4 h-4" />;
      default: return <Clock4 className="w-4 h-4" />;
    }
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
          <h1 className="text-3xl font-bold text-gray-900">Test Results</h1>
          <p className="text-gray-500 mt-1">Enter and manage laboratory test results</p>
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
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-2xl font-bold text-gray-900">{totalResults}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FlaskConical className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-yellow-600">{pendingResults}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">In Progress</p>
              <p className="text-2xl font-bold text-blue-600">{inProgressResults}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Completed</p>
              <p className="text-2xl font-bold text-green-600">{completedResults}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Published</p>
              <p className="text-2xl font-bold text-purple-600">{publishedResults}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Send className="w-6 h-6 text-purple-600" />
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
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="all">All Categories</option>
                  <option value="Hematology">Hematology</option>
                  <option value="Biochemistry">Biochemistry</option>
                  <option value="Endocrinology">Endocrinology</option>
                  <option value="Serology">Serology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={filters.priority}
                  onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="all">All Priority</option>
                  <option value="urgent">Urgent</option>
                  <option value="normal">Normal</option>
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
            placeholder="Search by patient name, result ID, sample ID, or test name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          />
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Result ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Tests</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Test Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Published</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredResults.map((result, index) => (
                <motion.tr
                  key={result.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      {result.priority === 'urgent' && (
                        <AlertCircle className="w-4 h-4 text-red-500" />
                      )}
                      <span className="font-mono font-medium text-gray-900">{result.id}</span>
                    </div>
                    <p className="text-xs text-gray-500">{result.sampleId}</p>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{result.patientName}</p>
                      <p className="text-sm text-gray-500">{result.patientAge}y • {result.patientGender}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {result.tests.slice(0, 2).map((test, i) => (
                        <span key={i} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded">
                          {test}
                        </span>
                      ))}
                      {result.tests.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{result.tests.length - 2}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-600">{result.category}</td>
                  <td className="px-4 py-4 text-sm text-gray-600">{result.testDate}</td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(result.status)}`}>
                      {result.status.charAt(0).toUpperCase() + result.status.slice(1).replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    {result.published ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        <BadgeCheck className="w-3 h-3" />
                        Published
                      </span>
                    ) : (
                      <span className="text-gray-400 text-xs">Not published</span>
                    )}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewResult(result)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {(result.status === 'pending' || result.status === 'in-progress') && (
                        <button
                          onClick={() => handleEnterResults(result)}
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Enter Results"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                      )}
                      {result.status === 'completed' && !result.published && (
                        <button
                          onClick={() => publishResult(result.id)}
                          className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                          title="Publish Result"
                        >
                          <Send className="w-4 h-4" />
                        </button>
                      )}
                      {result.published && (
                        <button
                          className="p-2 text-gray-500 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Print Report"
                        >
                          <PrinterCheck className="w-4 h-4" />
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

      {/* Entry Modal */}
      <AnimatePresence>
        {showEntryModal && selectedResult && (
          <ResultEntryModal
            result={selectedResult}
            onClose={() => {
              setShowEntryModal(false);
              setSelectedResult(null);
            }}
            onUpdateValue={updateParameterValue}
            onSave={saveResults}
          />
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedResult && (
          <ViewResultModal
            result={selectedResult}
            onClose={() => {
              setShowViewModal(false);
              setSelectedResult(null);
            }}
            onPublish={() => publishResult(selectedResult.id)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Result Entry Modal Component
const ResultEntryModal = ({ result, onClose, onUpdateValue, onSave }) => {
  const [localParams, setLocalParams] = useState(result.parameters);

  const handleValueChange = (index, value) => {
    const updated = [...localParams];
    const param = updated[index];
    
    let status = 'pending';
    if (value !== '' && value !== null) {
      const numValue = parseFloat(value);
      const refRange = param.refRange;
      
      if (refRange.includes('<')) {
        const threshold = parseFloat(refRange.replace('<', '').trim());
        status = numValue > threshold ? 'high' : 'normal';
      } else if (refRange.includes('>')) {
        const threshold = parseFloat(refRange.replace('>', '').trim());
        status = numValue < threshold ? 'low' : 'normal';
      } else if (refRange.includes('-')) {
        const [min, max] = refRange.split('-').map(v => parseFloat(v.trim()));
        if (numValue < min) status = 'low';
        else if (numValue > max) status = 'high';
        else status = 'normal';
      }
    }
    
    updated[index] = { ...param, value: value !== '' ? parseFloat(value) : null, status };
    setLocalParams(updated);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'high': return 'border-red-500 bg-red-50';
      case 'low': return 'border-blue-500 bg-blue-50';
      case 'normal': return 'border-green-500 bg-green-50';
      default: return 'border-gray-300';
    }
  };

  const handleSave = () => {
    // Update the result with local params
    const updatedResult = { ...result, parameters: localParams };
    onUpdateValue(0, ''); // Trigger parent update
    // Actually update with correct values
    result.parameters.forEach((_, i) => {
      if (localParams[i].value !== null) {
        onUpdateValue(i, localParams[i].value);
      }
    });
    onSave();
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
        className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Enter Test Results</h2>
            <p className="text-sm text-gray-500">{result.id} - {result.patientName}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Patient Info */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500">Patient</p>
                <p className="font-medium">{result.patientName}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Age/Gender</p>
                <p className="font-medium">{result.patientAge}/{result.patientGender}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Tests</p>
                <p className="font-medium">{result.tests.join(', ')}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="font-medium">{result.category}</p>
              </div>
            </div>
          </div>

          {/* Parameters */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Parameters</h3>
            <div className="space-y-3">
              {localParams.map((param, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border-2 ${getStatusColor(param.status)}`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <p className="font-medium text-gray-900">{param.name}</p>
                      <p className="text-sm text-gray-500">Ref: {param.refRange} {param.unit}</p>
                    </div>
                    <div className="md:col-span-2">
                      <input
                        type="number"
                        step="any"
                        value={param.value ?? ''}
                        onChange={(e) => handleValueChange(index, e.target.value)}
                        placeholder="Enter value..."
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      />
                    </div>
                    <div className="flex items-center justify-end">
                      {param.status !== 'pending' ? (
                        <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                          param.status === 'high' ? 'bg-red-200 text-red-800' :
                          param.status === 'low' ? 'bg-blue-200 text-blue-800' :
                          'bg-green-200 text-green-800'
                        }`}>
                          {param.status === 'high' ? '↑ High' : param.status === 'low' ? '↓ Low' : '✓ Normal'}
                        </span>
                      ) : (
                        <span className="text-gray-400 text-sm">Pending</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={result.notes}
              onChange={(e) => result.notes = e.target.value}
              rows={3}
              placeholder="Add any notes about the results..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
            >
              <Save className="w-4 h-4 inline mr-2" />
              Save Results
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// View Result Modal Component
const ViewResultModal = ({ result, onClose, onPublish }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'low': return 'text-blue-600 bg-blue-50';
      case 'normal': return 'text-green-600 bg-green-50';
      default: return 'text-gray-500 bg-gray-50';
    }
  };

  const getParamStatusIcon = (status) => {
    switch (status) {
      case 'high': return <TrendingUp className="w-4 h-4" />;
      case 'low': return <TrendingDown className="w-4 h-4" />;
      case 'normal': return <Minus className="w-4 h-4" />;
      default: return <Clock4 className="w-4 h-4" />;
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
        className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">Test Result Details</h2>
            <p className="text-sm text-gray-500">{result.id}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FlaskConical className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">{result.patientName}</p>
                <p className="text-sm text-gray-500">{result.patientAge} years • {result.patientGender}</p>
              </div>
            </div>
            <div className="text-right">
              <p className={`px-3 py-1 rounded-full text-sm font-medium ${
                result.status === 'completed' ? 'bg-green-100 text-green-700' :
                result.status === 'in-progress' ? 'bg-blue-100 text-blue-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {result.status.charAt(0).toUpperCase() + result.status.slice(1).replace('-', ' ')}
              </p>
              {result.published && (
                <p className="text-xs text-green-600 mt-1">Published on {result.publishedDate} at {result.publishedTime}</p>
              )}
            </div>
          </div>

          {/* Patient & Test Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">Referrer</p>
              <p className="font-medium">{result.referrer}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500 mb-2">Category</p>
              <p className="font-medium">{result.category}</p>
            </div>
          </div>

          {/* Parameters Results */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h3>
            <div className="space-y-2">
              {result.parameters.map((param, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-lg border ${param.status !== 'pending' ? getStatusColor(param.status) : 'border-gray-200'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{param.name}</p>
                      <p className="text-sm text-gray-500">Reference: {param.refRange} {param.unit}</p>
                    </div>
                    <div className="text-right">
                      <p className={`text-2xl font-bold ${
                        param.status === 'high' ? 'text-red-600' :
                        param.status === 'low' ? 'text-blue-600' :
                        param.status === 'normal' ? 'text-green-600' :
                        'text-gray-400'
                      }`}>
                        {param.value !== null ? param.value : '—'}
                      </p>
                      <p className="text-xs text-gray-500">{param.unit}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          {result.notes && (
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="font-medium text-gray-900 mb-1">Notes</p>
              <p className="text-gray-700">{result.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Printer className="w-4 h-4" />
                Print
              </button>
              <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Mail className="w-4 h-4" />
                Email
              </button>
            </div>
            {!result.published && result.status === 'completed' && (
              <button
                onClick={() => { onPublish(); onClose(); }}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
              >
                <Send className="w-4 h-4" />
                Publish to Patient
              </button>
            )}
            {result.published && (
              <span className="flex items-center gap-2 text-green-600">
                <BadgeCheck className="w-5 h-5" />
                Published
              </span>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TestResults;

