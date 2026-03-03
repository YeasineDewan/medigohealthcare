import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Barcode,
  Activity,
  FileText,
  Save,
  X,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  ShoppingCart,
  Zap,
  Shield,
  Settings,
  Upload,
  Image as ImageIcon,
  Star,
  MoreVertical,
  ChevronDown,
  RefreshCw,
  Printer,
  FileSpreadsheet,
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
  Users,
  Truck,
  Box,
  Wrench,
  Heart,
  Brain,
  Bone,
  Stethoscope,
  Thermometer,
  Syringe,
  Bandage,
  Scissors,
  TestTube,
  Camera
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV } from '../../../utils/exportUtils';

const MedicalDevicesEnhanced = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [editingDevice, setEditingDevice] = useState(null);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [bulkAction, setBulkAction] = useState('');
  const [selectedDevices, setSelectedDevices] = useState([]);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [notifications, setNotifications] = useState([]);
  
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    stockLevel: '',
    manufacturer: '',
    priceRange: '',
    certification: '',
    warrantyStatus: '',
    expiryStatus: ''
  });

  // Categories for medical devices
  const categories = [
    { id: 'monitoring', name: 'Monitoring', icon: Heart },
    { id: 'diagnostic', name: 'Diagnostic', icon: Stethoscope },
    { id: 'surgical', name: 'Surgical', icon: Scissors },
    { id: 'consumables', name: 'Consumables', icon: Syringe },
    { id: 'therapeutic', name: 'Therapeutic', icon: Zap },
    { id: 'emergency', name: 'Emergency', icon: AlertTriangle },
    { id: 'laboratory', name: 'Laboratory', icon: TestTube },
    { id: 'imaging', name: 'Imaging', icon: Camera }
  ];

  // Enhanced mock data with more comprehensive fields
  const mockDevices = [
    {
      id: 1,
      name: 'Digital Blood Pressure Monitor',
      model: 'BP-MON-2000',
      category: 'monitoring',
      manufacturer: 'MedTech Solutions',
      barcode: '5556667778881',
      serialNumber: 'SN20001234',
      purchaseDate: '2024-01-15',
      warrantyExpiry: '2026-01-15',
      unitPrice: 89.99,
      sellingPrice: 149.99,
      currentStock: 25,
      minStockLevel: 10,
      maxStockLevel: 50,
      reorderLevel: 20,
      unit: 'Units',
      description: 'Automatic digital blood pressure monitor with memory',
      specifications: 'Measurement range: 0-300 mmHg, Accuracy: ±3 mmHg',
      features: 'Large LCD display, memory for 90 readings, irregular heartbeat detection',
      powerSource: 'Battery operated (4 AA batteries)',
      dimensions: '120mm x 90mm x 50mm',
      weight: '250g',
      certification: 'FDA Approved, CE Marked',
      status: 'Active',
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-05-01',
      supplier: 'MedicalSupply Inc.',
      calibrationRequired: true,
      disposable: false,
      sterile: false,
      rating: 4.5,
      reviews: 128,
      images: ['/images/devices/bp-monitor-1.jpg', '/images/devices/bp-monitor-2.jpg'],
      warrantyPeriod: '24 months',
      userManual: '/manuals/bp-monitor-2000.pdf',
      videoTutorial: '/videos/bp-monitor-demo.mp4',
      compatibility: 'Windows, Mac, iOS, Android',
      accessories: ['Cuff (22-42cm)', '4 AA batteries', 'Carrying case', 'User manual'],
      regulatoryInfo: {
        fdaApproved: true,
        ceMarked: true,
        isoCertified: true,
        medicalDeviceClass: 'II'
      },
      inventoryTracking: {
        rfidEnabled: true,
        qrCode: 'QR-BP2000-1234',
        lastScanned: '2024-02-15T10:30:00Z',
        location: 'Warehouse A, Shelf 15'
      }
    },
    {
      id: 2,
      name: 'Digital Thermometer',
      model: 'TEMP-DIG-100',
      category: 'diagnostic',
      manufacturer: 'HealthTech Corp',
      barcode: '5556667778882',
      serialNumber: 'SN10005678',
      purchaseDate: '2024-02-01',
      warrantyExpiry: '2025-02-01',
      unitPrice: 15.99,
      sellingPrice: 29.99,
      currentStock: 80,
      minStockLevel: 30,
      maxStockLevel: 200,
      reorderLevel: 60,
      unit: 'Units',
      description: 'Digital clinical thermometer with fever alarm',
      specifications: 'Temperature range: 32°C - 42.9°C, Accuracy: ±0.1°C',
      features: 'Fever alarm, memory for last reading, fast measurement (10 seconds)',
      powerSource: 'Battery operated (1 LR41 battery)',
      dimensions: '130mm x 20mm x 10mm',
      weight: '15g',
      certification: 'FDA Approved, CE Marked',
      status: 'Active',
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-08-01',
      supplier: 'HealthSupply Ltd.',
      calibrationRequired: true,
      disposable: false,
      sterile: false,
      rating: 4.2,
      reviews: 89,
      images: ['/images/devices/thermometer-1.jpg'],
      warrantyPeriod: '12 months',
      userManual: '/manuals/thermometer-100.pdf',
      videoTutorial: '/videos/thermometer-demo.mp4',
      compatibility: 'Standalone device',
      accessories: ['LR41 battery', 'Protective case', 'User manual'],
      regulatoryInfo: {
        fdaApproved: true,
        ceMarked: true,
        isoCertified: true,
        medicalDeviceClass: 'II'
      },
      inventoryTracking: {
        rfidEnabled: false,
        qrCode: 'QR-TEMP100-5678',
        lastScanned: '2024-02-10T14:20:00Z',
        location: 'Warehouse B, Shelf 8'
      }
    },
    {
      id: 3,
      name: 'Syringe 5ml',
      model: 'SYR-DIS-005',
      category: 'consumables',
      manufacturer: 'SteriMed',
      barcode: '5556667778883',
      serialNumber: 'BATCH001',
      purchaseDate: '2024-02-10',
      warrantyExpiry: '2024-08-10',
      unitPrice: 0.25,
      sellingPrice: 0.75,
      currentStock: 500,
      minStockLevel: 200,
      maxStockLevel: 2000,
      reorderLevel: 400,
      unit: 'Pieces',
      description: 'Disposable sterile syringe with needle',
      specifications: 'Capacity: 5ml, Needle gauge: 23G, Sterile, Single-use',
      features: 'Luer lock, clear barrel, smooth plunger action',
      powerSource: 'N/A',
      dimensions: '85mm x 10mm',
      weight: '5g',
      certification: 'ISO 7886-1, CE Marked',
      status: 'Active',
      lastMaintenance: '2024-02-10',
      nextMaintenance: '2024-02-10',
      supplier: 'SterileSupply Inc.',
      calibrationRequired: false,
      disposable: true,
      sterile: true,
      rating: 4.8,
      reviews: 245,
      images: ['/images/devices/syringe-1.jpg'],
      warrantyPeriod: 'N/A (Disposable)',
      userManual: '/manuals/syringe-usage.pdf',
      videoTutorial: '/videos/syringe-safety.mp4',
      compatibility: 'Universal',
      accessories: ['Needle (23G)', 'Protective cap'],
      regulatoryInfo: {
        fdaApproved: true,
        ceMarked: true,
        isoCertified: true,
        medicalDeviceClass: 'II'
      },
      inventoryTracking: {
        rfidEnabled: true,
        qrCode: 'QR-SYR005-001',
        lastScanned: '2024-02-12T09:15:00Z',
        location: 'Warehouse C, Shelf 25'
      }
    }
  ];

  useEffect(() => {
    // Simulate API call
    const timer = setTimeout(() => {
      try {
        setDevices(mockDevices);
        setLoading(false);
      } catch (error) {
        console.error('Error loading medical devices:', error);
        setLoading(false);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  // Enhanced CRUD operations
  const handleAddDevice = () => {
    const newDevice = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
      status: 'Active',
      rating: 0,
      reviews: 0
    };
    setDevices([...devices, newDevice]);
    setShowAddModal(false);
    setFormData({});
    setImagePreview(null);
    addNotification('Device added successfully', 'success');
  };

  const handleEditDevice = () => {
    const updatedDevices = devices.map(device =>
      device.id === editingDevice.id ? { ...device, ...formData, updatedAt: new Date().toISOString() } : device
    );
    setDevices(updatedDevices);
    setShowAddModal(false);
    setEditingDevice(null);
    setFormData({});
    setImagePreview(null);
    addNotification('Device updated successfully', 'success');
  };

  const handleDeleteDevice = (deviceId) => {
    setDevices(devices.filter(device => device.id !== deviceId));
    addNotification('Device deleted successfully', 'error');
  };

  const handleBulkAction = () => {
    if (bulkAction === 'delete') {
      setDevices(devices.filter(device => !selectedDevices.includes(device.id)));
      addNotification(`${selectedDevices.length} devices deleted`, 'error');
    } else if (bulkAction === 'activate') {
      const updatedDevices = devices.map(device =>
        selectedDevices.includes(device.id) ? { ...device, status: 'Active' } : device
      );
      setDevices(updatedDevices);
      addNotification(`${selectedDevices.length} devices activated`, 'success');
    } else if (bulkAction === 'deactivate') {
      const updatedDevices = devices.map(device =>
        selectedDevices.includes(device.id) ? { ...device, status: 'Inactive' } : device
      );
      setDevices(updatedDevices);
      addNotification(`${selectedDevices.length} devices deactivated`, 'warning');
    }
    setSelectedDevices([]);
    setBulkAction('');
    setShowBulkModal(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleExport = () => {
    const dataToExport = selectedDevices.length > 0 
      ? devices.filter(device => selectedDevices.includes(device.id))
      : devices;
    
    if (exportFormat === 'csv') {
      exportToCSV(dataToExport, 'medical-devices.csv');
    } else if (exportFormat === 'pdf') {
      exportToPDF(dataToExport, 'medical-devices.pdf');
    } else if (exportFormat === 'word') {
      exportToWord(dataToExport, 'medical-devices.docx');
    }
    setShowExportModal(false);
    addNotification(`Data exported as ${exportFormat.toUpperCase()}`, 'success');
  };

  const handleImport = () => {
    // Simulate import process
    setTimeout(() => {
      setShowImportModal(false);
      setImportFile(null);
      addNotification('Devices imported successfully', 'success');
    }, 2000);
  };

  const addNotification = (message, type) => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications([newNotification, ...notifications].slice(0, 5));
  };

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filters.category || device.category === filters.category;
    const matchesStatus = !filters.status || device.status === filters.status;
    const matchesStockLevel = !filters.stockLevel || 
      (filters.stockLevel === 'low' && device.currentStock <= device.minStockLevel) ||
      (filters.stockLevel === 'medium' && device.currentStock > device.minStockLevel && device.currentStock < device.maxStockLevel) ||
      (filters.stockLevel === 'high' && device.currentStock >= device.maxStockLevel);
    
    return matchesSearch && matchesCategory && matchesStatus && matchesStockLevel;
  });

  const sortedDevices = [...filteredDevices].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedDevices = sortedDevices.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedDevices.length / itemsPerPage);

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : Package;
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Inactive': return 'bg-gray-100 text-gray-700';
      case 'Maintenance': return 'bg-yellow-100 text-yellow-700';
      case 'Discontinued': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStockLevelColor = (current, min, max) => {
    if (current <= min) return 'text-red-600 bg-red-50';
    if (current >= max) return 'text-blue-600 bg-blue-50';
    return 'text-green-600 bg-green-50';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medical Devices Management</h1>
          <p className="text-gray-500 mt-1">Comprehensive medical device inventory and tracking system</p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => setShowBarcodeScanner(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Barcode className="w-4 h-4" />
            Scan
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Device
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Devices</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{devices.length}</p>
              <p className="text-sm text-green-600 mt-1">+12% from last month</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {devices.filter(d => d.currentStock <= d.minStockLevel).length}
              </p>
              <p className="text-sm text-red-600 mt-1">Needs attention</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Value</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${devices.reduce((sum, d) => sum + (d.currentStock * d.unitPrice), 0).toFixed(2)}
              </p>
              <p className="text-sm text-green-600 mt-1">+8% from last month</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Expiring Soon</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {devices.filter(d => {
                  const daysToExpiry = Math.ceil((new Date(d.warrantyExpiry) - new Date()) / (1000 * 60 * 60 * 24));
                  return daysToExpiry <= 90 && daysToExpiry > 0;
                }).length}
              </p>
              <p className="text-sm text-yellow-600 mt-1">Within 90 days</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {['all', 'active', 'inactive', 'maintenance', 'low-stock'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'border-[#5DBB63] text-[#5DBB63]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
              {tab === 'all' && <span className="ml-2 text-gray-400">({devices.length})</span>}
              {tab === 'low-stock' && (
                <span className="ml-2 text-red-500">
                  ({devices.filter(d => d.currentStock <= d.minStockLevel).length})
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search devices by name, model, or manufacturer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
            {Object.values(filters).some(v => v) && (
              <span className="w-2 h-2 bg-[#5DBB63] rounded-full"></span>
            )}
          </button>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          >
            <option value="name">Sort by Name</option>
            <option value="category">Sort by Category</option>
            <option value="currentStock">Sort by Stock</option>
            <option value="unitPrice">Sort by Price</option>
            <option value="purchaseDate">Sort by Date</option>
          </select>
          
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {sortOrder === 'asc' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Maintenance">Maintenance</option>
                  <option value="Discontinued">Discontinued</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Level</label>
                <select
                  value={filters.stockLevel}
                  onChange={(e) => setFilters({ ...filters, stockLevel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  <option value="">All Levels</option>
                  <option value="low">Low Stock</option>
                  <option value="medium">Medium Stock</option>
                  <option value="high">High Stock</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
                <input
                  type="text"
                  value={filters.manufacturer}
                  onChange={(e) => setFilters({ ...filters, manufacturer: e.target.value })}
                  placeholder="Enter manufacturer..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                onClick={() => setFilters({
                  category: '',
                  status: '',
                  stockLevel: '',
                  manufacturer: '',
                  priceRange: '',
                  certification: '',
                  warrantyStatus: '',
                  expiryStatus: ''
                })}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Actions */}
      {selectedDevices.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between"
        >
          <span className="text-blue-700">
            {selectedDevices.length} device{selectedDevices.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="px-3 py-1 border border-blue-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Bulk Actions</option>
              <option value="activate">Activate</option>
              <option value="deactivate">Deactivate</option>
              <option value="delete">Delete</option>
            </select>
            <button
              onClick={() => setShowBulkModal(true)}
              disabled={!bulkAction}
              className="px-4 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </button>
            <button
              onClick={() => setSelectedDevices([])}
              className="px-4 py-1 text-blue-600 hover:text-blue-800 transition-colors"
            >
              Clear Selection
            </button>
          </div>
        </motion.div>
      )}

      {/* Devices Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedDevices.length === paginatedDevices.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedDevices(paginatedDevices.map(d => d.id));
                      } else {
                        setSelectedDevices([]);
                      }
                    }}
                    className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Device
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <RefreshCw className="w-8 h-8 animate-spin text-[#5DBB63]" />
                      <p className="text-gray-600">Loading medical devices...</p>
                    </div>
                  </td>
                </tr>
              ) : filteredDevices.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <Package className="w-12 h-12 text-gray-400" />
                      <div>
                        <p className="text-gray-900 font-medium">No medical devices found</p>
                        <p className="text-gray-500 text-sm">Get started by adding your first medical device</p>
                      </div>
                      <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add First Device
                      </button>
                    </div>
                  </td>
                </tr>
              ) : paginatedDevices.length === 0 ? (
                <tr>
                  <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                    No devices found
                  </td>
                </tr>
              ) : (
                paginatedDevices.map((device) => {
                  const CategoryIcon = getCategoryIcon(device.category);
                  return (
                    <motion.tr
                      key={device.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <input
                          type="checkbox"
                          checked={selectedDevices.includes(device.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedDevices([...selectedDevices, device.id]);
                            } else {
                              setSelectedDevices(selectedDevices.filter(id => id !== device.id));
                            }
                          }}
                          className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <CategoryIcon className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{device.name}</p>
                            <p className="text-sm text-gray-500">{device.model} • {device.manufacturer}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          <CategoryIcon className="w-3 h-3" />
                          {device.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStockLevelColor(device.currentStock, device.minStockLevel, device.maxStockLevel)}`}>
                          {device.currentStock} {device.unit}
                        </div>
                        {device.currentStock <= device.minStockLevel && (
                          <p className="text-xs text-red-600 mt-1">Low stock</p>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">${device.unitPrice}</p>
                          <p className="text-sm text-gray-500">${device.sellingPrice}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(device.status)}`}>
                          <div className={`w-2 h-2 rounded-full ${
                            device.status === 'Active' ? 'bg-green-400' :
                            device.status === 'Inactive' ? 'bg-gray-400' :
                            device.status === 'Maintenance' ? 'bg-yellow-400' :
                            'bg-red-400'
                          }`}></div>
                          {device.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setSelectedDevice(device);
                              setShowViewModal(true);
                            }}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingDevice(device);
                              setFormData(device);
                              setShowAddModal(true);
                            }}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteDevice(device.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedDevices.length)} of {sortedDevices.length} results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronDown className="w-4 h-4 rotate-90" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-[#5DBB63] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronDown className="w-4 h-4 -rotate-90" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`p-4 rounded-lg shadow-lg ${
              notification.type === 'success' ? 'bg-green-500 text-white' :
              notification.type === 'error' ? 'bg-red-500 text-white' :
              notification.type === 'warning' ? 'bg-yellow-500 text-white' :
              'bg-blue-500 text-white'
            }`}
          >
            <p className="text-sm font-medium">{notification.message}</p>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingDevice ? 'Edit Device' : 'Add New Device'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingDevice(null);
                      setFormData({});
                      setImagePreview(null);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Basic Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Device Name *</label>
                      <input
                        type="text"
                        value={formData.name || ''}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter device name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Model Number *</label>
                      <input
                        type="text"
                        value={formData.model || ''}
                        onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter model number"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                      <select
                        value={formData.category || ''}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        required
                      >
                        <option value="">Select category</option>
                        {categories.map(cat => (
                          <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer *</label>
                      <input
                        type="text"
                        value={formData.manufacturer || ''}
                        onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter manufacturer name"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Pricing and Stock */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing & Stock</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.unitPrice || ''}
                        onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.sellingPrice || ''}
                        onChange={(e) => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="0.00"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock *</label>
                      <input
                        type="number"
                        value={formData.currentStock || ''}
                        onChange={(e) => setFormData({ ...formData, currentStock: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="0"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                      <input
                        type="text"
                        value={formData.unit || ''}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="e.g., Units, Pieces, Boxes"
                      />
                    </div>
                  </div>
                </div>

                {/* Stock Levels */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Stock Levels</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Stock Level</label>
                      <input
                        type="number"
                        value={formData.minStockLevel || ''}
                        onChange={(e) => setFormData({ ...formData, minStockLevel: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Stock Level</label>
                      <input
                        type="number"
                        value={formData.maxStockLevel || ''}
                        onChange={(e) => setFormData({ ...formData, maxStockLevel: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Level</label>
                      <input
                        type="number"
                        value={formData.reorderLevel || ''}
                        onChange={(e) => setFormData({ ...formData, reorderLevel: parseInt(e.target.value) })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="0"
                      />
                    </div>
                  </div>
                </div>

                {/* Device Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Device Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                      <textarea
                        value={formData.description || ''}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter device description"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
                        <textarea
                          value={formData.specifications || ''}
                          onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                          placeholder="Enter technical specifications"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                        <textarea
                          value={formData.features || ''}
                          onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                          rows={2}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                          placeholder="Enter key features"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Identification */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Identification</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
                      <input
                        type="text"
                        value={formData.barcode || ''}
                        onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter barcode"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                      <input
                        type="text"
                        value={formData.serialNumber || ''}
                        onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter serial number"
                      />
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Important Dates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date</label>
                      <input
                        type="date"
                        value={formData.purchaseDate || ''}
                        onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Warranty Expiry</label>
                      <input
                        type="date"
                        value={formData.warrantyExpiry || ''}
                        onChange={(e) => setFormData({ ...formData, warrantyExpiry: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                      <input
                        type="text"
                        value={formData.supplier || ''}
                        onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter supplier name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Certification</label>
                      <input
                        type="text"
                        value={formData.certification || ''}
                        onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="e.g., FDA Approved, CE Marked"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.calibrationRequired || false}
                        onChange={(e) => setFormData({ ...formData, calibrationRequired: e.target.checked })}
                        className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                      />
                      <label className="text-sm text-gray-700">Calibration Required</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.disposable || false}
                        onChange={(e) => setFormData({ ...formData, disposable: e.target.checked })}
                        className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                      />
                      <label className="text-sm text-gray-700">Disposable</label>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.sterile || false}
                        onChange={(e) => setFormData({ ...formData, sterile: e.target.checked })}
                        className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                      />
                      <label className="text-sm text-gray-700">Sterile</label>
                    </div>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Device Image</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {imagePreview ? (
                      <div className="space-y-4">
                        <img src={imagePreview} alt="Device preview" className="mx-auto h-32 w-32 object-cover rounded-lg" />
                        <button
                          onClick={() => setImagePreview(null)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                        <div>
                          <label htmlFor="image-upload" className="cursor-pointer">
                            <span className="text-[#5DBB63] hover:text-[#4CAF50]">Upload an image</span>
                            <span className="text-gray-500"> or drag and drop</span>
                          </label>
                          <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            className="hidden"
                          />
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingDevice(null);
                    setFormData({});
                    setImagePreview(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingDevice ? handleEditDevice : handleAddDevice}
                  className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors"
                >
                  {editingDevice ? 'Update Device' : 'Add Device'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedDevice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Device Details</h2>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      setSelectedDevice(null);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Left Column */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
                      <dl className="space-y-3">
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500">Device Name</dt>
                          <dd className="text-sm font-medium text-gray-900">{selectedDevice.name}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500">Model</dt>
                          <dd className="text-sm font-medium text-gray-900">{selectedDevice.model}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500">Category</dt>
                          <dd className="text-sm font-medium text-gray-900">{selectedDevice.category}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500">Manufacturer</dt>
                          <dd className="text-sm font-medium text-gray-900">{selectedDevice.manufacturer}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500">Status</dt>
                          <dd>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedDevice.status)}`}>
                              {selectedDevice.status}
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing & Stock</h3>
                      <dl className="space-y-3">
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500">Unit Price</dt>
                          <dd className="text-sm font-medium text-gray-900">${selectedDevice.unitPrice}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500">Selling Price</dt>
                          <dd className="text-sm font-medium text-gray-900">${selectedDevice.sellingPrice}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500">Current Stock</dt>
                          <dd className="text-sm font-medium text-gray-900">{selectedDevice.currentStock} {selectedDevice.unit}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500">Stock Level</dt>
                          <dd>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStockLevelColor(selectedDevice.currentStock, selectedDevice.minStockLevel, selectedDevice.maxStockLevel)}`}>
                              {selectedDevice.currentStock <= selectedDevice.minStockLevel ? 'Low' : 
                               selectedDevice.currentStock >= selectedDevice.maxStockLevel ? 'High' : 'Normal'}
                            </span>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  {/* Right Column */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Device Details</h3>
                      <dl className="space-y-3">
                        <div>
                          <dt className="text-sm text-gray-500">Description</dt>
                          <dd className="text-sm text-gray-900 mt-1">{selectedDevice.description}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500">Specifications</dt>
                          <dd className="text-sm text-gray-900 mt-1">{selectedDevice.specifications}</dd>
                        </div>
                        <div>
                          <dt className="text-sm text-gray-500">Features</dt>
                          <dd className="text-sm text-gray-900 mt-1">{selectedDevice.features}</dd>
                        </div>
                      </dl>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Identification</h3>
                      <dl className="space-y-3">
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500">Barcode</dt>
                          <dd className="text-sm font-medium text-gray-900">{selectedDevice.barcode}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500">Serial Number</dt>
                          <dd className="text-sm font-medium text-gray-900">{selectedDevice.serialNumber}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500">Certification</dt>
                          <dd className="text-sm font-medium text-gray-900">{selectedDevice.certification}</dd>
                        </div>
                      </dl>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Important Dates</h3>
                      <dl className="space-y-3">
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500">Purchase Date</dt>
                          <dd className="text-sm font-medium text-gray-900">{selectedDevice.purchaseDate}</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt className="text-sm text-gray-500">Warranty Expiry</dt>
                          <dd className="text-sm font-medium text-gray-900">{selectedDevice.warrantyExpiry}</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      setEditingDevice(selectedDevice);
                      setFormData(selectedDevice);
                      setShowViewModal(false);
                      setShowAddModal(true);
                    }}
                    className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors"
                  >
                    Edit Device
                  </button>
                  <button
                    onClick={() => {
                      handleDeleteDevice(selectedDevice.id);
                      setShowViewModal(false);
                      setSelectedDevice(null);
                    }}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete Device
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Action Confirmation Modal */}
      <AnimatePresence>
        {showBulkModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Confirm Bulk Action</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to {bulkAction} {selectedDevices.length} device{selectedDevices.length > 1 ? 's' : ''}?
                {bulkAction === 'delete' && ' This action cannot be undone.'}
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setShowBulkModal(false);
                    setBulkAction('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkAction}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    bulkAction === 'delete' 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-[#5DBB63] text-white hover:bg-[#4CAF50]'
                  }`}
                >
                  {bulkAction === 'delete' ? 'Delete' : bulkAction === 'activate' ? 'Activate' : 'Deactivate'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Import Modal */}
      <AnimatePresence>
        {showImportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Import Devices</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-[#5DBB63] hover:text-[#4CAF50]">Upload a file</span>
                    <span className="text-gray-500"> or drag and drop</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={(e) => setImportFile(e.target.files[0])}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">CSV, XLS, XLSX up to 10MB</p>
              </div>
              {importFile && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">Selected: {importFile.name}</p>
                </div>
              )}
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowImportModal(false);
                    setImportFile(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  disabled={!importFile}
                  className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Import
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Export Devices</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="csv"
                        checked={exportFormat === 'csv'}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="text-[#5DBB63]"
                      />
                      <span className="text-sm text-gray-700">CSV</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="pdf"
                        checked={exportFormat === 'pdf'}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="text-[#5DBB63]"
                      />
                      <span className="text-sm text-gray-700">PDF</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="word"
                        checked={exportFormat === 'word'}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="text-[#5DBB63]"
                      />
                      <span className="text-sm text-gray-700">Word Document</span>
                    </label>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {selectedDevices.length > 0 
                      ? `Exporting ${selectedDevices.length} selected devices`
                      : `Exporting all ${devices.length} devices`}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors"
                >
                  Export
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MedicalDevicesEnhanced;
