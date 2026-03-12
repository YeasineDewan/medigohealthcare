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
  Microscope,
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
  Package,
  Wrench,
  Settings,
  Gauge,
  Thermometer,
  Zap,
  Battery,
  Wifi,
  Cpu,
  HardDrive,
  Scan,
  Shield,
  TrendingUp,
  TrendingDown,
  CalendarDays,
  ClipboardList,
  History,
  Bell,
  BatteryCharging,
  Monitor,
  Printer as PrinterIcon,
  Centrifuge,
  TestTube,
  FlaskConical,
  Dna,
  Syringe,
  Stethoscope,
  Building,
  MapPin
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV, printDocument } from '../../../utils/exportUtils';

const LabEquipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showMaintenanceModal, setShowMaintenanceModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    category: 'all',
    condition: 'all'
  });

  // Mock data
  const mockEquipment = [
    {
      id: 'EQ-001',
      name: 'Automated Hematology Analyzer',
      model: 'Sysmex XN-1000',
      serialNumber: 'SN-XN1000-2023-001',
      manufacturer: 'Sysmex Corporation',
      category: 'Hematology',
      location: 'Lab Room 1',
      purchaseDate: '2023-01-15',
      purchaseCost: 45000,
      warrantyExpiry: '2026-01-15',
      status: 'operational',
      condition: 'excellent',
      lastCalibration: '2024-02-01',
      nextCalibration: '2024-05-01',
      lastMaintenance: '2024-02-10',
      nextMaintenance: '2024-05-10',
      totalTests: 15420,
      uptime: 99.2,
      image: null,
      specifications: {
        throughput: '100 samples/hour',
        sampleVolume: '50 μL',
        parameters: '28 parameters',
        power: 'AC 220V'
      },
      maintenanceHistory: [
        { date: '2024-02-10', type: 'Preventive', description: 'Annual maintenance', cost: 1200, performedBy: 'TechServ Inc.' },
        { date: '2024-01-05', type: 'Calibration', description: 'Routine calibration', cost: 450, performedBy: 'Sysmex Tech' },
        { date: '2023-11-20', type: 'Repair', description: 'Replaced pump module', cost: 2800, performedBy: 'TechServ Inc.' }
      ],
      accessories: ['Sample cups', 'Reagent packs', 'Control materials'],
      notes: 'Primary analyzer for CBC tests'
    },
    {
      id: 'EQ-002',
      name: 'Clinical Chemistry Analyzer',
      model: 'Roche Cobas c701',
      serialNumber: 'SN-COBAS-2022-045',
      manufacturer: 'Roche Diagnostics',
      category: 'Biochemistry',
      location: 'Lab Room 2',
      purchaseDate: '2022-06-20',
      purchaseCost: 85000,
      warrantyExpiry: '2025-06-20',
      status: 'operational',
      condition: 'excellent',
      lastCalibration: '2024-02-05',
      nextCalibration: '2024-03-05',
      lastMaintenance: '2024-01-25',
      nextMaintenance: '2024-04-25',
      totalTests: 28500,
      uptime: 98.8,
      image: null,
      specifications: {
        throughput: '2000 tests/hour',
        sampleVolume: '2-35 μL',
        parameters: '100+ assays',
        power: 'AC 110-240V'
      },
      maintenanceHistory: [
        { date: '2024-01-25', type: 'Preventive', description: 'Quarterly maintenance', cost: 1800, performedBy: 'Roche Service' },
        { date: '2023-10-15', type: 'Calibration', description: 'Multi-point calibration', cost: 600, performedBy: 'Roche Tech' }
      ],
      accessories: ['Reagent cartridges', 'Calibrators', 'Quality controls'],
      notes: 'Primary chemistry analyzer'
    },
    {
      id: 'EQ-003',
      name: 'ELISA Reader',
      model: 'BioTek ELx800',
      serialNumber: 'SN-ELX800-2021-089',
      manufacturer: 'BioTek Instruments',
      category: 'Immunology',
      location: 'Lab Room 3',
      purchaseDate: '2021-03-10',
      purchaseCost: 18000,
      warrantyExpiry: '2024-03-10',
      status: 'operational',
      condition: 'good',
      lastCalibration: '2024-01-20',
      nextCalibration: '2024-04-20',
      lastMaintenance: '2023-12-15',
      nextMaintenance: '2024-03-15',
      totalTests: 8500,
      uptime: 97.5,
      image: null,
      specifications: {
        throughput: '96 wells/minute',
        wavelength: '400-750 nm',
        filters: '405, 450, 492, 630 nm',
        power: 'AC 100-240V'
      },
      maintenanceHistory: [
        { date: '2023-12-15', type: 'Preventive', description: 'Annual service', cost: 800, performedBy: 'BioTek Service' }
      ],
      accessories: ['Plate shaker', 'Incubator', 'Pipette tips'],
      notes: 'Used for antibody tests'
    },
    {
      id: 'EQ-004',
      name: 'Centrifuge',
      model: 'Eppendorf 5430R',
      serialNumber: 'SN-EP-5430-2020-156',
      manufacturer: 'Eppendorf',
      category: 'General',
      location: 'Lab Room 1',
      purchaseDate: '2020-08-25',
      purchaseCost: 8500,
      warrantyExpiry: '2023-08-25',
      status: 'operational',
      condition: 'good',
      lastCalibration: '2024-02-01',
      nextCalibration: '2024-08-01',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-07-10',
      totalTests: 0,
      uptime: 99.8,
      image: null,
      specifications: {
        maxSpeed: '15,000 rpm',
        capacity: '48 x 1.5 mL',
        temperature: '-10 to +40°C',
        power: 'AC 230V'
      },
      maintenanceHistory: [
        { date: '2024-01-10', type: 'Preventive', description: 'Rotor inspection', cost: 200, performedBy: 'Internal' }
      ],
      accessories: ['Rotors', 'Adapters', 'Buckets'],
      notes: 'Refrigerated centrifuge'
    },
    {
      id: 'EQ-005',
      name: 'PCR Thermal Cycler',
      model: 'Bio-Rad T100',
      serialNumber: 'SN-BIO-T100-2023-012',
      manufacturer: 'Bio-Rad Laboratories',
      category: 'Molecular Diagnostics',
      location: 'Lab Room 4',
      purchaseDate: '2023-05-15',
      purchaseCost: 12000,
      warrantyExpiry: '2026-05-15',
      status: 'maintenance',
      condition: 'fair',
      lastCalibration: '2024-01-15',
      nextCalibration: '2024-04-15',
      lastMaintenance: '2024-02-12',
      nextMaintenance: '2024-05-12',
      totalTests: 3200,
      uptime: 95.2,
      image: null,
      specifications: {
        capacity: '96 wells',
        tempRange: '4-99°C',
        heatingRate: '5°C/sec',
        power: 'AC 100-240V'
      },
      maintenanceHistory: [
        { date: '2024-02-12', type: 'Repair', description: 'Replaced heating block', cost: 1500, performedBy: 'Bio-Rad Service' }
      ],
      accessories: ['PCR tubes', 'Plate seals', 'Tubes'],
      notes: 'Currently under maintenance - expected return Feb 20'
    },
    {
      id: 'EQ-006',
      name: 'Urine Analyzer',
      model: 'Siemens Clinitek Status+',
      serialNumber: 'SN-CLINITEK-2022-078',
      manufacturer: 'Siemens Healthineers',
      category: 'Clinical Pathology',
      location: 'Lab Room 1',
      purchaseDate: '2022-02-28',
      purchaseCost: 4500,
      warrantyExpiry: '2025-02-28',
      status: 'operational',
      condition: 'excellent',
      lastCalibration: '2024-02-08',
      nextCalibration: '2024-05-08',
      lastMaintenance: '2024-01-20',
      nextMaintenance: '2024-04-20',
      totalTests: 12500,
      uptime: 99.5,
      image: null,
      specifications: {
        throughput: '120 tests/hour',
        parameters: '14 parameters',
        sampleVolume: '2 mL',
        power: 'AC 110-240V'
      },
      maintenanceHistory: [
        { date: '2024-01-20', type: 'Preventive', description: 'Strip loader cleaning', cost: 150, performedBy: 'Internal' }
      ],
      accessories: ['Urine strips', 'Calibration strips'],
      notes: 'Automated urine analysis'
    },
    {
      id: 'EQ-007',
      name: 'Blood Gas Analyzer',
      model: 'Radiometer ABL90 Flex',
      serialNumber: 'SN-ABL90-2023-034',
      manufacturer: 'Radiometer Medical',
      category: 'Biochemistry',
      location: 'Emergency Lab',
      purchaseDate: '2023-09-01',
      purchaseCost: 35000,
      warrantyExpiry: '2026-09-01',
      status: 'operational',
      condition: 'excellent',
      lastCalibration: '2024-02-14',
      nextCalibration: '2024-02-21',
      lastMaintenance: '2024-02-10',
      nextMaintenance: '2024-05-10',
      totalTests: 4800,
      uptime: 99.8,
      image: null,
      specifications: {
        throughput: '30 samples/hour',
        parameters: '17 parameters',
        sampleVolume: '65 μL',
        power: 'AC 100-240V'
      },
      maintenanceHistory: [
        { date: '2024-02-10', type: 'Preventive', description: 'Monthly maintenance', cost: 350, performedBy: 'Radiometer Service' }
      ],
      accessories: ['Syringes', 'Control solutions', 'Sensor modules'],
      notes: 'Critical for emergency cases'
    },
    {
      id: 'EQ-008',
      name: 'Microscope',
      model: 'Olympus CX23',
      serialNumber: 'SN-OLY-CX23-2021-045',
      manufacturer: 'Olympus Corporation',
      category: 'General',
      location: 'Lab Room 1',
      purchaseDate: '2021-06-15',
      purchaseCost: 2500,
      warrantyExpiry: '2024-06-15',
      status: 'operational',
      condition: 'good',
      lastCalibration: '2024-01-05',
      nextCalibration: '2024-07-05',
      lastMaintenance: '2023-12-01',
      nextMaintenance: '2024-06-01',
      totalTests: 0,
      uptime: 100,
      image: null,
      specifications: {
        magnification: '4x-1000x',
        objectives: '4, 10, 40, 100x',
        illumination: 'LED',
        power: 'AC 100-240V'
      },
      maintenanceHistory: [
        { date: '2023-12-01', type: 'Preventive', description: 'Lens cleaning', cost: 50, performedBy: 'Internal' }
      ],
      accessories: ['Slide boxes', 'Immersion oil', 'Lens paper'],
      notes: 'Research microscope'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setEquipment(mockEquipment);
      setLoading(false);
    }, 800);
  }, []);

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || item.status === filters.status;
    const matchesCategory = filters.category === 'all' || item.category === filters.category;
    const matchesCondition = filters.condition === 'all' || item.condition === filters.condition;
    return matchesSearch && matchesStatus && matchesCategory && matchesCondition;
  });

  const handleExport = (format) => {
    const columns = [
      { key: 'id', label: 'Equipment ID' },
      { key: 'name', label: 'Name' },
      { key: 'model', label: 'Model' },
      { key: 'category', label: 'Category' },
      { key: 'location', label: 'Location' },
      { key: 'status', label: 'Status' },
      { key: 'condition', label: 'Condition' }
    ];
    
    const data = filteredEquipment.map(e => ({
      ...e,
      status: e.status.charAt(0).toUpperCase() + e.status.slice(1),
      condition: e.condition.charAt(0).toUpperCase() + e.condition.slice(1)
    }));

    switch (format) {
      case 'pdf':
        exportToPDF(data, 'Lab Equipment Report', columns);
        break;
      case 'csv':
        exportToCSV(data, 'lab-equipment');
        break;
      case 'print':
        printDocument('Lab Equipment Report');
        break;
      default:
        break;
    }
  };

  const handleAddEquipment = () => {
    setShowAddModal(true);
  };

  const handleViewEquipment = (item) => {
    setSelectedEquipment(item);
    setShowViewModal(true);
  };

  const handleMaintenance = (item) => {
    setSelectedEquipment(item);
    setShowMaintenanceModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-700';
      case 'maintenance': return 'bg-yellow-100 text-yellow-700';
      case 'out-of-service': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getConditionColor = (condition) => {
    switch (condition) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'fair': return 'text-yellow-600';
      case 'poor': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getCalibrationStatus = (nextCalibration) => {
    const next = new Date(nextCalibration);
    const today = new Date();
    const daysUntil = Math.ceil((next - today) / (1000 * 60 * 60 * 24));
    
    if (daysUntil < 0) return { status: 'overdue', color: 'text-red-600', bg: 'bg-red-50' };
    if (daysUntil <= 14) return { status: 'due soon', color: 'text-yellow-600', bg: 'bg-yellow-50' };
    return { status: 'ok', color: 'text-green-600', bg: 'bg-green-50' };
  };

  // Stats
  const totalEquipment = filteredEquipment.length;
  const operational = filteredEquipment.filter(e => e.status === 'operational').length;
  const underMaintenance = filteredEquipment.filter(e => e.status === 'maintenance').length;
  const dueForCalibration = filteredEquipment.filter(e => {
    const status = getCalibrationStatus(e.nextCalibration);
    return status.status !== 'ok';
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
          <h1 className="text-3xl font-bold text-gray-900">Lab Equipment</h1>
          <p className="text-gray-500 mt-1">Manage laboratory equipment inventory and maintenance</p>
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
            onClick={handleAddEquipment}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
          >
            <Plus className="w-4 h-4" />
            Add Equipment
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Equipment</p>
              <p className="text-2xl font-bold text-gray-900">{totalEquipment}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Microscope className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Operational</p>
              <p className="text-2xl font-bold text-green-600">{operational}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Under Maintenance</p>
              <p className="text-2xl font-bold text-yellow-600">{underMaintenance}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-lg">
              <Wrench className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Calibration Due</p>
              <p className="text-2xl font-bold text-orange-600">{dueForCalibration}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Gauge className="w-6 h-6 text-orange-600" />
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
                  <option value="operational">Operational</option>
                  <option value="maintenance">Under Maintenance</option>
                  <option value="out-of-service">Out of Service</option>
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
                  <option value="Immunology">Immunology</option>
                  <option value="Molecular Diagnostics">Molecular Diagnostics</option>
                  <option value="Clinical Pathology">Clinical Pathology</option>
                  <option value="General">General</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Condition</label>
                <select
                  value={filters.condition}
                  onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="all">All Conditions</option>
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
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
            placeholder="Search by equipment name, model, serial number, or manufacturer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          />
        </div>
      </div>

      {/* Equipment Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEquipment.map((item, index) => {
          const calibStatus = getCalibrationStatus(item.nextCalibration);
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-3 rounded-lg ${
                      item.status === 'operational' ? 'bg-green-100' : 
                      item.status === 'maintenance' ? 'bg-yellow-100' : 'bg-red-100'
                    }`}>
                      <Microscope className={`w-6 h-6 ${
                        item.status === 'operational' ? 'text-green-600' : 
                        item.status === 'maintenance' ? 'text-yellow-600' : 'text-red-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.model}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                    {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                  </span>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Serial Number</span>
                    <span className="font-mono text-gray-900">{item.serialNumber}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Category</span>
                    <span className="text-gray-900">{item.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Location</span>
                    <span className="text-gray-900">{item.location}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Condition</span>
                    <span className={`font-medium capitalize ${getConditionColor(item.condition)}`}>
                      {item.condition}
                    </span>
                  </div>
                </div>

                <div className={`p-3 rounded-lg ${calibStatus.bg} mb-4`}>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Next Calibration</span>
                    <span className={`text-sm font-medium ${calibStatus.color}`}>
                      {calibStatus.status === 'ok' ? `${item.nextCalibration}` : `${calibStatus.status.toUpperCase()} - ${item.nextCalibration}`}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Uptime</p>
                    <p className="font-semibold text-green-600">{item.uptime}%</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500">Total Tests</p>
                    <p className="font-semibold text-gray-900">{item.totalTests.toLocaleString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => handleViewEquipment(item)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                  >
                    <Eye className="w-4 h-4" />
                    View
                  </button>
                  <button
                    onClick={() => handleMaintenance(item)}
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                  >
                    <Wrench className="w-4 h-4" />
                    Service
                  </button>
                  <button
                    className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedEquipment && (
          <ViewEquipmentModal
            equipment={selectedEquipment}
            onClose={() => {
              setShowViewModal(false);
              setSelectedEquipment(null);
            }}
            onMaintenance={() => {
              setShowViewModal(false);
              setShowMaintenanceModal(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* Maintenance Modal */}
      <AnimatePresence>
        {showMaintenanceModal && selectedEquipment && (
          <MaintenanceModal
            equipment={selectedEquipment}
            onClose={() => {
              setShowMaintenanceModal(false);
              setSelectedEquipment(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* Add Equipment Modal */}
      <AnimatePresence>
        {showAddModal && (
          <AddEquipmentModal
            onClose={() => setShowAddModal(false)}
            onSave={(data) => {
              const newEquipment = {
                id: `EQ-${String(equipment.length + 1).padStart(3, '0')}`,
                ...data,
                status: 'operational',
                totalTests: 0,
                uptime: 100,
                maintenanceHistory: []
              };
              setEquipment([...equipment, newEquipment]);
              setShowAddModal(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// View Equipment Modal
const ViewEquipmentModal = ({ equipment, onClose, onMaintenance }) => {
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
            <Microscope className="w-6 h-6 text-blue-600" />
            <div>
              <h2 className="text-xl font-semibold text-gray-900">{equipment.name}</h2>
              <p className="text-sm text-gray-500">{equipment.model}</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Banner */}
          <div className={`p-4 rounded-lg ${
            equipment.status === 'operational' ? 'bg-green-50' : 
            equipment.status === 'maintenance' ? 'bg-yellow-50' : 'bg-red-50'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                {equipment.status === 'operational' ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : equipment.status === 'maintenance' ? (
                  <Wrench className="w-6 h-6 text-yellow-600" />
                ) : (
                  <XCircle className="w-6 h-6 text-red-600" />
                )}
                <span className={`font-semibold ${
                  equipment.status === 'operational' ? 'text-green-700' : 
                  equipment.status === 'maintenance' ? 'text-yellow-700' : 'text-red-700'
                }`}>
                  {equipment.status.charAt(0).toUpperCase() + equipment.status.slice(1)}
                </span>
              </div>
              <span className="text-sm text-gray-600">Condition: {equipment.condition}</span>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Serial Number</p>
              <p className="font-mono font-medium">{equipment.serialNumber}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Manufacturer</p>
              <p className="font-medium">{equipment.manufacturer}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Location</p>
              <p className="font-medium">{equipment.location}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Purchase Date</p>
              <p className="font-medium">{equipment.purchaseDate}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Purchase Cost</p>
              <p className="font-medium">${equipment.purchaseCost.toLocaleString()}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-500">Warranty Expiry</p>
              <p className="font-medium">{equipment.warrantyExpiry}</p>
            </div>
          </div>

          {/* Performance */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-600">Uptime</span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{equipment.uptime}%</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TestTube className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">Total Tests</span>
              </div>
              <p className="text-2xl font-bold text-purple-600">{equipment.totalTests.toLocaleString()}</p>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {Object.entries(equipment.specifications).map(([key, value]) => (
                <div key={key} className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="font-medium text-sm">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Maintenance History */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Maintenance History</h3>
            <div className="space-y-3">
              {equipment.maintenanceHistory.map((record, index) => (
                <div key={index} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Wrench className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{record.description}</p>
                      <span className="text-sm text-gray-500">{record.date}</span>
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                      <span>Type: {record.type}</span>
                      <span>Cost: ${record.cost}</span>
                      <span>By: {record.performedBy}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accessories */}
          {equipment.accessories && equipment.accessories.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Accessories</h3>
              <div className="flex flex-wrap gap-2">
                {equipment.accessories.map((acc, i) => (
                  <span key={i} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {acc}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Notes */}
          {equipment.notes && (
            <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
              <p className="text-sm text-gray-600 mb-1">Notes</p>
              <p className="text-gray-700">{equipment.notes}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
            <button
              onClick={onMaintenance}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              <Wrench className="w-4 h-4" />
              Schedule Maintenance
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Printer className="w-4 h-4" />
              Print Details
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Maintenance Modal
const MaintenanceModal = ({ equipment, onClose }) => {
  const [formData, setFormData] = useState({
    type: 'Preventive',
    description: '',
    date: new Date().toISOString().split('T')[0],
    cost: '',
    performedBy: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In real app, save to backend
    console.log('Maintenance record:', formData);
    onClose();
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
        className="bg-white rounded-xl w-full max-w-lg"
      >
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Schedule Maintenance</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <p className="text-sm text-gray-600 mb-2">{equipment.name}</p>
            <p className="text-xs text-gray-500">{equipment.model} - {equipment.serialNumber}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Maintenance Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              >
                <option value="Preventive">Preventive</option>
                <option value="Calibration">Calibration</option>
                <option value="Repair">Repair</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              placeholder="Describe the maintenance work..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Estimated Cost ($)</label>
              <input
                type="number"
                value={formData.cost}
                onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Provider</label>
              <input
                type="text"
                value={formData.performedBy}
                onChange={(e) => setFormData({ ...formData, performedBy: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                placeholder="Company name"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg">
              <Save className="w-4 h-4 inline mr-2" />
              Schedule
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Add Equipment Modal
const AddEquipmentModal = ({ onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    model: '',
    serialNumber: '',
    manufacturer: '',
    category: 'General',
    location: '',
    purchaseDate: '',
    purchaseCost: '',
    warrantyExpiry: '',
    specifications: {
      throughput: '',
      parameters: '',
      power: ''
    },
    accessories: [],
    notes: ''
  });

  const [accInput, setAccInput] = useState('');

  const addAccessory = () => {
    if (accInput.trim()) {
      setFormData({
        ...formData,
        accessories: [...formData.accessories, accInput.trim()]
      });
      setAccInput('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      condition: 'excellent',
      lastCalibration: new Date().toISOString().split('T')[0],
      nextCalibration: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastMaintenance: new Date().toISOString().split('T')[0],
      nextMaintenance: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
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
        className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Add New Equipment</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
              <input
                type="text"
                required
                value={formData.model}
                onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number *</label>
              <input
                type="text"
                required
                value={formData.serialNumber}
                onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              >
                <option value="General">General</option>
                <option value="Hematology">Hematology</option>
                <option value="Biochemistry">Biochemistry</option>
                <option value="Immunology">Immunology</option>
                <option value="Molecular Diagnostics">Molecular Diagnostics</option>
                <option value="Clinical Pathology">Clinical Pathology</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
              <input
                type="text"
                required
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
              <input
                type="date"
                value={formData.purchaseDate}
                onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Cost ($)</label>
              <input
                type="number"
                value={formData.purchaseCost}
                onChange={(e) => setFormData({ ...formData, purchaseCost: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              Cancel
            </button>
            <button type="submit" className="px-6 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg">
              <Save className="w-4 h-4 inline mr-2" />
              Add Equipment
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default LabEquipment;

