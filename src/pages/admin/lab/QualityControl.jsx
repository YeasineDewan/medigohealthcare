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
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  TrendingUp,
  TrendingDown,
  Minus,
  Calendar,
  Clock,
  Droplet,
  TestTube,
  ClipboardList,
  BarChart3,
  AlertCircle,
  ChevronDown,
  RefreshCw,
  Bell,
  User,
  Building,
  Scale,
  Beaker,
  Award
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV, printDocument } from '../../../utils/exportUtils';

const QualityControl = () => {
  const [qcData, setQcData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedQC, setSelectedQC] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    type: 'all',
    controlLevel: 'all'
  });

  // Mock data
  const mockQC = [
    {
      id: 'QC-2024-001',
      controlName: ' Hematology Control Level 1',
      lotNumber: 'LOT-HEM-2024-001',
      manufacturer: 'Sysmex',
      expiryDate: '2024-06-30',
      controlType: 'Internal',
      controlLevel: 'Level 1',
      parameters: ['WBC', 'RBC', 'Hemoglobin', 'Hematocrit', 'Platelets'],
      assignedTo: 'Hematology Analyzer',
      status: 'active',
      openedDate: '2024-01-15',
      usedCount: 45,
      remainingUses: 5,
      targetValues: {
        'WBC': { mean: 7.2, sd: 0.5 },
        'RBC': { mean: 4.5, sd: 0.3 },
        'Hemoglobin': { mean: 14.0, sd: 0.8 },
        'Hematocrit': { mean: 42.0, sd: 2.0 },
        'Platelets': { mean: 250, sd: 30 }
      },
      currentValues: null,
      lastRunDate: '2024-02-15',
      lastRunResult: 'passed',
      sdValues: {
        'WBC': 0.3,
        'RBC': 0.2,
        'Hemoglobin': 0.5,
        'Hematocrit': 1.2,
        'Platelets': 20
      },
      acceptableRange: { min: -2, max: 2 },
      notes: 'Primary control for daily CBC testing'
    },
    {
      id: 'QC-2024-002',
      controlName: 'Chemistry Control Level 2',
      lotNumber: 'LOT-CHEM-2024-015',
      manufacturer: 'Roche',
      expiryDate: '2024-08-15',
      controlType: 'Internal',
      controlLevel: 'Level 2',
      parameters: ['Glucose', 'Creatinine', 'ALT', 'AST', 'Bilirubin'],
      assignedTo: 'Biochemistry Analyzer',
      status: 'active',
      openedDate: '2024-01-20',
      usedCount: 38,
      remainingUses: 12,
      targetValues: {
        'Glucose': { mean: 120, sd: 8 },
        'Creatinine': { mean: 1.2, sd: 0.1 },
        'ALT': { mean: 35, sd: 5 },
        'AST': { mean: 30, sd: 4 },
        'Bilirubin': { mean: 1.0, sd: 0.2 }
      },
      currentValues: {
        'Glucose': 118,
        'Creatinine': 1.15,
        'ALT': 38,
        'AST': 28,
        'Bilirubin': 0.95
      },
      lastRunDate: '2024-02-15',
      lastRunResult: 'passed',
      sdValues: {
        'Glucose': -0.25,
        'RBC': -0.5,
        'Hemoglobin': -0.625,
        'Hematocrit': -0.4,
        'Platelets': -0.33
      },
      acceptableRange: { min: -2, max: 2 },
      notes: 'Elevated ALT - monitor closely'
    },
    {
      id: 'QC-2024-003',
      controlName: 'Blood Gas Control',
      lotNumber: 'LOT-BG-2024-008',
      manufacturer: 'Radiometer',
      expiryDate: '2024-05-20',
      controlType: 'Internal',
      controlLevel: 'Level 1',
      parameters: ['pH', 'pCO2', 'pO2', 'HCO3', 'Lactate'],
      assignedTo: 'Blood Gas Analyzer',
      status: 'active',
      openedDate: '2024-02-01',
      usedCount: 28,
      remainingUses: 22,
      targetValues: {
        'pH': { mean: 7.40, sd: 0.02 },
        'pCO2': { mean: 40, sd: 2 },
        'pO2': { mean: 100, sd: 5 },
        'HCO3': { mean: 24, sd: 1 },
        'Lactate': { mean: 1.5, sd: 0.3 }
      },
      currentValues: null,
      lastRunDate: '2024-02-14',
      lastRunResult: 'warning',
      sdValues: {
        'pH': 1.5,
        'pCO2': 1.0,
        'pO2': 0.8,
        'HCO3': 0.5,
        'Lactate': 1.8
      },
      acceptableRange: { min: -2, max: 2 },
      notes: 'Lactate slightly elevated - check calibration'
    },
    {
      id: 'QC-2024-004',
      controlName: 'Urine Analysis Control',
      lotNumber: 'LOT-UA-2024-003',
      manufacturer: 'Siemens',
      expiryDate: '2024-07-31',
      controlType: 'Internal',
      controlLevel: 'Level 1',
      parameters: ['Glucose', 'Protein', 'Ketones', 'Blood', 'pH'],
      assignedTo: 'Urine Analyzer',
      status: 'active',
      openedDate: '2024-01-10',
      usedCount: 52,
      remainingUses: 8,
      targetValues: {
        'Glucose': 'Negative',
        'Protein': 'Negative',
        'Ketones': 'Negative',
        'Blood': 'Negative',
        'pH': { mean: 6.0, sd: 0.3 }
      },
      currentValues: {
        'Glucose': 'Negative',
        'Protein': 'Negative',
        'Ketones': 'Negative',
        'Blood': 'Negative',
        'pH': 6.2
      },
      lastRunDate: '2024-02-15',
      lastRunResult: 'passed',
      sdValues: null,
      acceptableRange: null,
      notes: 'All parameters within acceptable range'
    },
    {
      id: 'QC-2024-005',
      controlName: 'External Quality Assessment',
      lotNumber: 'EQA-2024-Q1',
      manufacturer: 'CAP',
      expiryDate: '2024-12-31',
      controlType: 'External',
      controlLevel: 'Survey',
      parameters: ['All Parameters'],
      assignedTo: 'Laboratory',
      status: 'active',
      openedDate: '2024-01-01',
      usedCount: 2,
      remainingUses: 3,
      targetValues: {},
      currentValues: null,
      lastRunDate: '2024-02-01',
      lastRunResult: 'pending',
      sdValues: null,
      acceptableRange: null,
      notes: 'Q1 2024 CAP Survey - due Feb 28'
    },
    {
      id: 'QC-2024-006',
      controlName: 'Immunology Control Level 3',
      lotNumber: 'LOT-IMM-2024-010',
      manufacturer: 'Abbott',
      expiryDate: '2024-04-30',
      controlType: 'Internal',
      controlLevel: 'Level 3',
      parameters: ['TSH', 'FT4', 'FT3', 'Anti-TPO'],
      assignedTo: 'Immunoassay Analyzer',
      status: 'expired',
      openedDate: '2023-11-15',
      usedCount: 95,
      remainingUses: 0,
      targetValues: {
        'TSH': { mean: 4.5, sd: 0.5 },
        'FT4': { mean: 1.2, sd: 0.1 },
        'FT3': { mean: 3.0, sd: 0.3 },
        'Anti-TPO': { mean: 50, sd: 10 }
      },
      currentValues: null,
      lastRunDate: '2024-01-20',
      lastRunResult: 'failed',
      sdValues: {
        'TSH': 2.5,
        'FT4': -1.2,
        'FT3': 0.8,
        'Anti-TPO': -2.1
      },
      acceptableRange: { min: -2, max: 2 },
      notes: 'Expired - SD values exceeded limits before expiry'
    },
    {
      id: 'QC-2024-007',
      controlName: 'Coagulation Control',
      lotNumber: 'LOT-COAG-2024-005',
      manufacturer: 'Stago',
      expiryDate: '2024-09-30',
      controlType: 'Internal',
      controlLevel: 'Level 2',
      parameters: ['PT', 'aPTT', 'Fibrinogen', 'D-Dimer'],
      assignedTo: 'Coagulation Analyzer',
      status: 'active',
      openedDate: '2024-02-05',
      usedCount: 15,
      remainingUses: 35,
      targetValues: {
        'PT': { mean: 12.0, sd: 1.0 },
        'aPTT': { mean: 30, sd: 3 },
        'Fibrinogen': { mean: 250, sd: 30 },
        'D-Dimer': { mean: 0.5, sd: 0.1 }
      },
      currentValues: null,
      lastRunDate: '2024-02-15',
      lastRunResult: 'passed',
      sdValues: {
        'PT': 0.5,
        'aPTT': -0.3,
        'Fibrinogen': 0.2,
        'D-Dimer': 0.8
      },
      acceptableRange: { min: -2, max: 2 },
      notes: 'New lot - monitoring closely'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setQcData(mockQC);
      setLoading(false);
    }, 800);
  }, []);

  const filteredQC = qcData.filter(qc => {
    const matchesSearch = 
      qc.controlName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qc.lotNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qc.manufacturer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      qc.parameters.some(p => p.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = filters.status === 'all' || qc.status === filters.status;
    const matchesType = filters.type === 'all' || qc.controlType === filters.type;
    const matchesLevel = filters.controlLevel === 'all' || qc.controlLevel === filters.controlLevel;
    return matchesSearch && matchesStatus && matchesType && matchesLevel;
  });

  const handleExport = (format) => {
    const columns = [
      { key: 'id', label: 'QC ID' },
      { key: 'controlName', label: 'Control Name' },
      { key: 'lotNumber', label: 'Lot Number' },
      { key: 'manufacturer', label: 'Manufacturer' },
      { key: 'controlType', label: 'Type' },
      { key: 'controlLevel', label: 'Level' },
      { key: 'status', label: 'Status' },
      { key: 'lastRunResult', label: 'Last Result' }
    ];
    
    const data = filteredQC.map(q => ({
      ...q,
      status: q.status.charAt(0).toUpperCase() + q.status.slice(1),
      lastRunResult: q.lastRunResult ? q.lastRunResult.charAt(0).toUpperCase() + q.lastRunResult.slice(1) : 'N/A'
    }));

    switch (format) {
      case 'pdf':
        exportToPDF(data, 'Quality Control Report', columns);
        break;
      case 'csv':
        exportToCSV(data, 'quality-control');
        break;
      case 'print':
        printDocument('Quality Control Report');
        break;
      default:
        break;
    }
  };

  const handleViewQC = (qc) => {
    setSelectedQC(qc);
    setShowViewModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'expired': return 'bg-red-100 text-red-700';
      case 'low-stock': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getResultColor = (result) => {
    switch (result) {
      case 'passed': return 'bg-green-100 text-green-700';
      case 'warning': return 'bg-yellow-100 text-yellow-700';
      case 'failed': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSDStatus = (sd) => {
    if (sd === null || sd === undefined) return 'N/A';
    const absSD = Math.abs(sd);
    if (absSD <= 1) return { color: 'text-green-600', bg: 'bg-green-50', icon: <CheckCircle className="w-4 h-4" /> };
    if (absSD <= 2) return { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: <AlertTriangle className="w-4 h-4" /> };
    return { color: 'text-red-600', bg: 'bg-red-50', icon: <XCircle className="w-4 h-4" /> };
  };

  // Stats
  const totalControls = filteredQC.length;
  const activeControls = filteredQC.filter(q => q.status === 'active').length;
  const passedToday = filteredQC.filter(q => q.lastRunResult === 'passed').length;
  const warnings = filteredQC.filter(q => q.lastRunResult === 'warning').length;
  const failed = filteredQC.filter(q => q.lastRunResult === 'failed').length;
  const expiringSoon = filteredQC.filter(q => {
    const exp = new Date(q.expiryDate);
    const today = new Date();
    const daysUntil = Math.ceil((exp - today) / (1000 * 60 * 60 * 24));
    return daysUntil <= 30 && daysUntil > 0;
  }).length;

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
          <h1 className="text-3xl font-bold text-gray-900">Quality Control</h1>
          <p className="text-gray-500 mt-1">Monitor and manage laboratory quality control</p>
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
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
          >
            <Plus className="w-4 h-4" />
            Add Control
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Controls</p>
              <p className="text-2xl font-bold text-gray-900">{totalControls}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{activeControls}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Passed</p>
              <p className="text-2xl font-bold text-green-600">{passedToday}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Activity className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Warnings</p>
              <p className="text-2xl font-bold text-yellow-600">{warnings}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Expiring Soon</p>
              <p className="text-2xl font-bold text-orange-600">{expiringSoon}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="low-stock">Low Stock</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Control Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="all">All Types</option>
                  <option value="Internal">Internal</option>
                  <option value="External">External</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Control Level</label>
                <select
                  value={filters.controlLevel}
                  onChange={(e) => setFilters({ ...filters, controlLevel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="all">All Levels</option>
                  <option value="Level 1">Level 1</option>
                  <option value="Level 2">Level 2</option>
                  <option value="Level 3">Level 3</option>
                  <option value="Survey">Survey</option>
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
            placeholder="Search by control name, lot number, manufacturer, or parameter..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          />
        </div>
      </div>

      {/* QC Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Control</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Lot / Expiry</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Type / Level</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Parameters</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Last Run</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Control Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredQC.map((qc, index) => (
                <motion.tr
                  key={qc.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-4">
                    <div>
                      <p className="font-medium text-gray-900">{qc.controlName}</p>
                      <p className="text-sm text-gray-500">{qc.manufacturer}</p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm font-mono text-gray-900">{qc.lotNumber}</p>
                      <p className={`text-xs ${new Date(qc.expiryDate) <= new Date() ? 'text-red-600' : 'text-gray-500'}`}>
                        Exp: {qc.expiryDate}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-col gap-1">
                      <span className={`px-2 py-1 text-xs rounded ${qc.controlType === 'Internal' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'}`}>
                        {qc.controlType}
                      </span>
                      <span className="text-xs text-gray-500">{qc.controlLevel}</span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1">
                      {qc.parameters.slice(0, 3).map((param, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          {param}
                        </span>
                      ))}
                      {qc.parameters.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                          +{qc.parameters.length - 3}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm text-gray-900">{qc.lastRunDate}</p>
                      <span className={`px-2 py-1 text-xs rounded ${getResultColor(qc.lastRunResult)}`}>
                        {qc.lastRunResult ? qc.lastRunResult.charAt(0).toUpperCase() + qc.lastRunResult.slice(1) : 'N/A'}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div>
                      <p className="text-sm text-gray-900">{qc.remainingUses} uses left</p>
                      <div className="w-20 h-2 bg-gray-200 rounded-full mt-1">
                        <div 
                          className={`h-2 rounded-full ${qc.remainingUses <= 10 ? 'bg-red-500' : qc.remainingUses <= 20 ? 'bg-yellow-500' : 'bg-green-500'}`}
                          style={{ width: `${Math.min((qc.remainingUses / 50) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(qc.status)}`}>
                      {qc.status.charAt(0).toUpperCase() + qc.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewQC(qc)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Run QC"
                      >
                        <Play className="w-4 h-4" />
                      </button>
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
        {showViewModal && selectedQC && (
          <ViewQCModal
            qc={selectedQC}
            onClose={() => {
              setShowViewModal(false);
              setSelectedQC(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <AddQCModal
            onClose={() => setShowAddModal(false)}
            onSave={(data) => {
              const newQC = {
                id: `QC-2024-${String(qcData.length + 1).padStart(3, '0')}`,
                ...data,
                status: 'active',
                usedCount: 0,
                remainingUses: data.totalUses || 50,
                currentValues: null,
                lastRunDate: null,
                lastRunResult: 'pending',
                sdValues: null
              };
              setQcData([...qcData, newQC]);
              setShowAddModal(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// View QC Modal
const ViewQCModal = ({ qc, onClose }) => {
  const getSDStatus = (sd) => {
    if (sd === null || sd === undefined) return { color: 'text-gray-500', bg: 'bg-gray-50', icon: '—', label: 'N/A' };
    const absSD = Math.abs(sd);
    if (absSD <= 1) return { color: 'text-green-600', bg: 'bg-green-50', icon: '✓', label: 'Good' };
    if (absSD <= 2) return { color: 'text-yellow-600', bg: 'bg-yellow-50', icon: '⚠', label: 'Warning' };
    return { color: 'text-red-600', bg: 'bg-red-50', icon: '✗', label: 'Failed' };
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
          <div className="flex items-center gap-3">
            <Shield className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{qc.controlName}</h2>
              <p className="text-sm text-gray-500">{qc.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Banner */}
          <div className={`p-4 rounded-lg ${
            qc.status === 'active' ? 'bg-green-50' : 
            qc.status === 'expired' ? 'bg-red-50' : 'bg-yellow-50'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {qc.status === 'active' ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : qc.status === 'expired' ? (
                  <XCircle className="w-6 h-6 text-red-600" />
                ) : (
                  <AlertTriangle className="w-6 h-6 text-yellow-600" />
                )}
                <span className={`font-semibold ${
                  qc.status === 'active' ? 'text-green-700' : 
                  qc.status === 'expired' ? 'text-red-700' : 'text-yellow-700'
                }`}>
                  {qc.status.charAt(0).toUpperCase() + qc.status.slice(1)}
                </span>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                qc.lastRunResult === 'passed' ? 'bg-green-100 text-green-700' :
                qc.lastRunResult === 'warning' ? 'bg-yellow-100 text-yellow-700' :
                qc.lastRunResult === 'failed' ? 'bg-red-100 text-red-700' :
                'bg-gray-100 text-gray-700'
              }`}>
                Last Run: {qc.lastRunResult ? qc.lastRunResult.charAt(0).toUpperCase() + qc.lastRunResult.slice(1) : 'Pending'}
              </span>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Lot Number</p>
              <p className="font-mono font-medium">{qc.lotNumber}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Expiry Date</p>
              <p className={`font-medium ${new Date(qc.expiryDate) <= new Date() ? 'text-red-600' : ''}`}>{qc.expiryDate}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Control Type</p>
              <p className="font-medium">{qc.controlType}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Control Level</p>
              <p className="font-medium">{qc.controlLevel}</p>
            </div>
          </div>

          {/* Usage Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Beaker className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Used / Remaining</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{qc.usedCount} / {qc.remainingUses}</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">Last Run</span>
              </div>
              <p className="text-xl font-bold text-gray-900">{qc.lastRunDate || 'Not run yet'}</p>
            </div>
          </div>

          {/* Parameters & SD Values */}
          {qc.sdValues && Object.keys(qc.sdValues).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">SD Values</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {Object.entries(qc.sdValues).map(([param, sd]) => {
                  const status = getSDStatus(sd);
                  return (
                    <div key={param} className={`p-3 rounded-lg ${status.bg}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">{param}</span>
                        <span className={`font-bold ${status.color}`}>{sd !== null ? sd.toFixed(2) : '—'}</span>
                      </div>
                      <div className="mt-2 h-2 bg-gray-200 rounded-full">
                        <div 
                          className={`h-2 rounded-full ${
                            Math.abs(sd) <= 1 ? 'bg-green-500' :
                            Math.abs(sd) <= 2 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${Math.min(Math.abs(sd) * 40, 100)}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Target Values */}
          {qc.targetValues && Object.keys(qc.targetValues).length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Target Values</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Parameter</th>
                      <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Mean</th>
                      <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">SD</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(qc.targetValues).map(([param, value]) => (
                      <tr key={param} className="border-t border-gray-100">
                        <td className="px-4 py-2 text-sm text-gray-900">{param}</td>
                        <td className="px-4 py-2 text-sm text-right font-medium">{typeof value === 'object' ? value.mean : value}</td>
                        <td className="px-4 py-2 text-sm text-right text-gray-500">{typeof value === 'object' ? `±${value.sd}` : '—'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Notes */}
          {qc.notes && (
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-600 mb-1">Notes</p>
              <p className="text-gray-700">{qc.notes}</p>
            </div>
          )}
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex justify-between">
          <button
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Printer className="w-4 h-4" />
            Print Report
          </button>
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

// Add QC Modal
const AddQCModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    controlName: '',
    lotNumber: '',
    manufacturer: '',
    expiryDate: '',
    controlType: 'Internal',
    controlLevel: 'Level 1',
    parameters: [],
    assignedTo: '',
    totalUses: 50,
    notes: ''
  });

  const [paramInput, setParamInput] = useState('');

  const addParam = () => {
    if (paramInput.trim()) {
      setFormData({
        ...formData,
        parameters: [...formData.parameters, paramInput.trim()]
      });
      setParamInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
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
        className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Add Quality Control</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Control Name *</label>
              <input
                type="text"
                required
                value={formData.controlName}
                onChange={(e) => setFormData({ ...formData, controlName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Lot Number *</label>
              <input
                type="text"
                required
                value={formData.lotNumber}
                onChange={(e) => setFormData({ ...formData, lotNumber: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer *</label>
              <input
                type="text"
                required
                value={formData.manufacturer}
                onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
              <input
                type="date"
                required
                value={formData.expiryDate}
                onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Control Type</label>
              <select
                value={formData.controlType}
                onChange={(e) => setFormData({ ...formData, controlType: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              >
                <option value="Internal">Internal</option>
                <option value="External">External</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Control Level</label>
              <select
                value={formData.controlLevel}
                onChange={(e) => setFormData({ ...formData, controlLevel: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              >
                <option value="Level 1">Level 1</option>
                <option value="Level 2">Level 2</option>
                <option value="Level 3">Level 3</option>
                <option value="Survey">Survey</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Assigned To</label>
              <input
                type="text"
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                placeholder="e.g., Hematology Analyzer"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Uses</label>
              <input
                type="number"
                value={formData.totalUses}
                onChange={(e) => setFormData({ ...formData, totalUses: parseInt(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Parameters</label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={paramInput}
                onChange={(e) => setParamInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addParam())}
                placeholder="Add a parameter..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              />
              <button
                type="button"
                onClick={addParam}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.parameters.map((param, i) => (
                <span key={i} className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                  {param}
                  <button type="button" onClick={() => setFormData({ ...formData, parameters: formData.parameters.filter((_, idx) => idx !== i) })} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg">
              <Save className="w-4 h-4 inline mr-2" />
              Add Control
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Play icon component
const Play = ({ className }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="5 3 19 12 5 21 5 3" />
  </svg>
);

export default QualityControl;

