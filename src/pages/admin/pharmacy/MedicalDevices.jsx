import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  Settings
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV } from '../../../utils/exportUtils';

const MedicalDevices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [editingDevice, setEditingDevice] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    stockLevel: '',
    manufacturer: ''
  });

  // Mock data
  const mockDevices = [
    {
      id: 1,
      name: 'Digital Blood Pressure Monitor',
      model: 'BP-MON-2000',
      category: 'Monitoring',
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
      sterile: false
    },
    {
      id: 2,
      name: 'Digital Thermometer',
      model: 'TEMP-DIG-100',
      category: 'Diagnostic',
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
      sterile: false
    },
    {
      id: 3,
      name: 'Syringe 5ml',
      model: 'SYR-DIS-005',
      category: 'Consumables',
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
      sterile: true
    },
    {
      id: 4,
      name: 'Pulse Oximeter',
      model: 'POX-FING-300',
      category: 'Monitoring',
      manufacturer: 'CardioTech',
      barcode: '5556667778884',
      serialNumber: 'SN30009012',
      purchaseDate: '2024-01-20',
      warrantyExpiry: '2026-01-20',
      unitPrice: 45.99,
      sellingPrice: 79.99,
      currentStock: 15,
      minStockLevel: 8,
      maxStockLevel: 40,
      reorderLevel: 16,
      unit: 'Units',
      description: 'Finger pulse oximeter with SpO2 and pulse rate monitoring',
      specifications: 'SpO2 range: 70-100%, Pulse rate: 30-240 bpm',
      features: 'LED display, low battery indicator, automatic power-off',
      powerSource: 'Rechargeable battery (USB charging)',
      dimensions: '60mm x 35mm x 35mm',
      weight: '50g',
      certification: 'FDA Approved, CE Marked',
      status: 'Active',
      lastMaintenance: '2024-02-15',
      nextMaintenance: '2024-05-15',
      supplier: 'CardioSupply Ltd.',
      calibrationRequired: true,
      disposable: false,
      sterile: false
    },
    {
      id: 5,
      name: 'Stethoscope Classic',
      model: 'STETH-CLAS-100',
      category: 'Diagnostic',
      manufacturer: 'Auscultation Pro',
      barcode: '5556667778885',
      serialNumber: 'SN10003456',
      purchaseDate: '2024-01-10',
      warrantyExpiry: '2027-01-10',
      unitPrice: 35.99,
      sellingPrice: 59.99,
      currentStock: 30,
      minStockLevel: 15,
      maxStockLevel: 60,
      reorderLevel: 25,
      unit: 'Units',
      description: 'Classic acoustic stethoscope for medical professionals',
      specifications: 'Chest piece: Dual-sided, Tubing length: 56cm',
      features: 'High acoustic sensitivity, comfortable ear tips, chrome-plated chest piece',
      powerSource: 'N/A',
      dimensions: '180mm x 80mm x 30mm',
      weight: '180g',
      certification: 'ISO 9001, CE Marked',
      status: 'Active',
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-04-01',
      supplier: 'DiagnosticSupply Inc.',
      calibrationRequired: false,
      disposable: false,
      sterile: false
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDevices(mockDevices);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.barcode.includes(searchTerm) ||
                         device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filters.category || device.category === filters.category;
    const matchesStatus = !filters.status || device.status === filters.status;
    const matchesStockLevel = !filters.stockLevel || 
      (filters.stockLevel === 'low' && device.currentStock <= device.minStockLevel) ||
      (filters.stockLevel === 'critical' && device.currentStock <= device.reorderLevel) ||
      (filters.stockLevel === 'normal' && device.currentStock > device.reorderLevel);
    const matchesManufacturer = !filters.manufacturer || device.manufacturer === filters.manufacturer;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesStockLevel && matchesManufacturer;
  });

  const handleAddDevice = () => {
    setEditingDevice(null);
    setShowAddModal(true);
  };

  const handleEditDevice = (device) => {
    setEditingDevice(device);
    setShowAddModal(true);
  };

  const handleViewDevice = (device) => {
    setSelectedDevice(device);
    setShowViewModal(true);
  };

  const handleDeleteDevice = (deviceId) => {
    if (window.confirm('Are you sure you want to delete this medical device?')) {
      setDevices(devices.filter(d => d.id !== deviceId));
    }
  };

  const handleSaveDevice = (deviceData) => {
    if (editingDevice) {
      // Update existing device
      setDevices(devices.map(d => 
        d.id === editingDevice.id ? { ...d, ...deviceData } : d
      ));
    } else {
      // Add new device
      const newDevice = {
        id: Math.max(...devices.map(d => d.id)) + 1,
        ...deviceData,
        purchaseDate: new Date().toISOString().slice(0, 10)
      };
      setDevices([...devices, newDevice]);
    }
    setShowAddModal(false);
    setEditingDevice(null);
  };

  const handleExport = (format) => {
    const data = filteredDevices;
    const columns = [
      { key: 'name', label: 'Device Name' },
      { key: 'model', label: 'Model' },
      { key: 'category', label: 'Category' },
      { key: 'manufacturer', label: 'Manufacturer' },
      { key: 'serialNumber', label: 'Serial Number' },
      { key: 'currentStock', label: 'Current Stock' },
      { key: 'unitPrice', label: 'Unit Price' },
      { key: 'sellingPrice', label: 'Selling Price' },
      { key: 'status', label: 'Status' },
      { key: 'supplier', label: 'Supplier' },
      { key: 'certification', label: 'Certification' }
    ];

    switch (format) {
      case 'pdf':
        exportToPDF(data, 'Medical Devices Inventory Report', columns);
        break;
      case 'word':
        exportToWord(data, 'Medical Devices Inventory Report', columns);
        break;
      case 'csv':
        exportToCSV(data, 'medical-devices-inventory');
        break;
      default:
        break;
    }
  };

  const getStockStatus = (device) => {
    if (device.currentStock <= device.minStockLevel) return 'critical';
    if (device.currentStock <= device.reorderLevel) return 'low';
    return 'normal';
  };

  const totalDevices = filteredDevices.length;
  const lowStock = filteredDevices.filter(d => getStockStatus(d) === 'low').length;
  const criticalStock = filteredDevices.filter(d => getStockStatus(d) === 'critical').length;
  const totalValue = filteredDevices.reduce((sum, d) => sum + (d.currentStock * d.unitPrice), 0);
  const calibratedDevices = filteredDevices.filter(d => !d.calibrationRequired || d.lastMaintenance).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5DBB63]"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Medical Devices</h1>
            <p className="text-gray-600 mt-1">Manage medical equipment and devices inventory</p>
          </div>
          <button
            onClick={handleAddDevice}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
          >
            <Plus className="w-5 h-5" />
            Add Device
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Devices</p>
                <p className="text-2xl font-bold text-gray-900">{totalDevices}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Activity className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-600">{lowStock}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Critical Stock</p>
                <p className="text-2xl font-bold text-red-600">{criticalStock}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Value</p>
                <p className="text-2xl font-bold text-green-600">${totalValue.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Calibrated</p>
                <p className="text-2xl font-bold text-purple-600">{calibratedDevices}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search devices by name, model, serial number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              
              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 hidden">
                  <button
                    onClick={() => handleExport('pdf')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Export as PDF
                  </button>
                  <button
                    onClick={() => handleExport('word')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Export as Word
                  </button>
                  <button
                    onClick={() => handleExport('csv')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Export as CSV
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              >
                <option value="">All Categories</option>
                <option value="Monitoring">Monitoring</option>
                <option value="Diagnostic">Diagnostic</option>
                <option value="Therapeutic">Therapeutic</option>
                <option value="Surgical">Surgical</option>
                <option value="Consumables">Consumables</option>
              </select>
              
              <select
                value={filters.stockLevel}
                onChange={(e) => setFilters({ ...filters, stockLevel: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              >
                <option value="">All Stock Levels</option>
                <option value="normal">Normal</option>
                <option value="low">Low Stock</option>
                <option value="critical">Critical</option>
              </select>
              
              <select
                value={filters.manufacturer}
                onChange={(e) => setFilters({ ...filters, manufacturer: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              >
                <option value="">All Manufacturers</option>
                <option value="MedTech Solutions">MedTech Solutions</option>
                <option value="HealthTech Corp">HealthTech Corp</option>
                <option value="SteriMed">SteriMed</option>
                <option value="CardioTech">CardioTech</option>
              </select>
              
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Maintenance">Maintenance</option>
                <option value="Discontinued">Discontinued</option>
              </select>
            </div>
          )}
        </div>

        {/* Devices Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selling Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Warranty</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDevices.map((device) => {
                  const stockStatus = getStockStatus(device);
                  return (
                    <tr key={device.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{device.name}</div>
                          <div className="text-sm text-gray-500">{device.model}</div>
                          <div className="text-xs text-gray-400">SN: {device.serialNumber}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{device.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${
                            stockStatus === 'critical' ? 'text-red-600' :
                            stockStatus === 'low' ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {device.currentStock} {device.unit}
                          </span>
                          {stockStatus !== 'normal' && (
                            <AlertTriangle className="w-4 h-4 ml-2 text-yellow-500" />
                          )}
                        </div>
                        <div className="text-xs text-gray-500">Min: {device.minStockLevel}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${device.unitPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${device.sellingPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className={`text-sm ${
                          new Date(device.warrantyExpiry) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) 
                            ? 'text-red-600 font-medium' : 'text-gray-900'
                        }`}>
                          {new Date(device.warrantyExpiry).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          device.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : device.status === 'Maintenance'
                            ? 'bg-yellow-100 text-yellow-800'
                            : device.status === 'Inactive'
                            ? 'bg-gray-100 text-gray-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {device.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewDevice(device)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditDevice(device)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteDevice(device.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <DeviceModal
          device={editingDevice}
          onSave={handleSaveDevice}
          onClose={() => {
            setShowAddModal(false);
            setEditingDevice(null);
          }}
        />
      )}

      {/* View Modal */}
      {showViewModal && selectedDevice && (
        <ViewDeviceModal
          device={selectedDevice}
          onClose={() => {
            setShowViewModal(false);
            setSelectedDevice(null);
          }}
        />
      )}
    </div>
  );
};

// Device Modal Component
const DeviceModal = ({ device, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: device?.name || '',
    model: device?.model || '',
    category: device?.category || '',
    manufacturer: device?.manufacturer || '',
    barcode: device?.barcode || '',
    serialNumber: device?.serialNumber || '',
    purchaseDate: device?.purchaseDate || '',
    warrantyExpiry: device?.warrantyExpiry || '',
    unitPrice: device?.unitPrice || 0,
    sellingPrice: device?.sellingPrice || 0,
    currentStock: device?.currentStock || 0,
    minStockLevel: device?.minStockLevel || 5,
    maxStockLevel: device?.maxStockLevel || 50,
    reorderLevel: device?.reorderLevel || 10,
    unit: device?.unit || 'Units',
    description: device?.description || '',
    specifications: device?.specifications || '',
    features: device?.features || '',
    powerSource: device?.powerSource || '',
    dimensions: device?.dimensions || '',
    weight: device?.weight || '',
    certification: device?.certification || '',
    status: device?.status || 'Active',
    lastMaintenance: device?.lastMaintenance || '',
    nextMaintenance: device?.nextMaintenance || '',
    supplier: device?.supplier || '',
    calibrationRequired: device?.calibrationRequired || false,
    disposable: device?.disposable || false,
    sterile: device?.sterile || false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              {device ? 'Edit Medical Device' : 'Add New Medical Device'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Device Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Monitoring">Monitoring</option>
                    <option value="Diagnostic">Diagnostic</option>
                    <option value="Therapeutic">Therapeutic</option>
                    <option value="Surgical">Surgical</option>
                    <option value="Consumables">Consumables</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer *</label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
                  <input
                    type="text"
                    value={formData.barcode}
                    onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                  <input
                    type="text"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  >
                    <option value="Units">Units</option>
                    <option value="Pieces">Pieces</option>
                    <option value="Sets">Sets</option>
                    <option value="Kits">Kits</option>
                    <option value="Boxes">Boxes</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Stock</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.unitPrice}
                    onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.sellingPrice}
                    onChange={(e) => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock *</label>
                  <input
                    type="number"
                    value={formData.currentStock}
                    onChange={(e) => setFormData({ ...formData, currentStock: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock Level *</label>
                  <input
                    type="number"
                    value={formData.minStockLevel}
                    onChange={(e) => setFormData({ ...formData, minStockLevel: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Stock Level *</label>
                  <input
                    type="number"
                    value={formData.maxStockLevel}
                    onChange={(e) => setFormData({ ...formData, maxStockLevel: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Level *</label>
                  <input
                    type="number"
                    value={formData.reorderLevel}
                    onChange={(e) => setFormData({ ...formData, reorderLevel: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date *</label>
                  <input
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Warranty Expiry *</label>
                  <input
                    type="date"
                    value={formData.warrantyExpiry}
                    onChange={(e) => setFormData({ ...formData, warrantyExpiry: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                  <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Discontinued">Discontinued</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
                  <textarea
                    value={formData.specifications}
                    onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Power Source</label>
                  <input
                    type="text"
                    value={formData.powerSource}
                    onChange={(e) => setFormData({ ...formData, powerSource: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certification</label>
                  <input
                    type="text"
                    value={formData.certification}
                    onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Maintenance</label>
                  <input
                    type="date"
                    value={formData.lastMaintenance}
                    onChange={(e) => setFormData({ ...formData, lastMaintenance: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Next Maintenance</label>
                  <input
                    type="date"
                    value={formData.nextMaintenance}
                    onChange={(e) => setFormData({ ...formData, nextMaintenance: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.calibrationRequired}
                      onChange={(e) => setFormData({ ...formData, calibrationRequired: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Calibration Required</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.disposable}
                      onChange={(e) => setFormData({ ...formData, disposable: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Disposable</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.sterile}
                      onChange={(e) => setFormData({ ...formData, sterile: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Sterile</span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {device ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// View Device Modal Component
const ViewDeviceModal = ({ device, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Device Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Name:</span>
                  <div className="font-medium">{device.name}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Model:</span>
                  <div className="font-medium">{device.model}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Category:</span>
                  <div className="font-medium">{device.category}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Manufacturer:</span>
                  <div className="font-medium">{device.manufacturer}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Barcode:</span>
                  <div className="font-medium">{device.barcode}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Serial Number:</span>
                  <div className="font-medium">{device.serialNumber}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Unit:</span>
                  <div className="font-medium">{device.unit}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock & Pricing</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Current Stock:</span>
                  <div className="font-medium text-lg">{device.currentStock} {device.unit}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Min Stock Level:</span>
                  <div className="font-medium">{device.minStockLevel} {device.unit}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Max Stock Level:</span>
                  <div className="font-medium">{device.maxStockLevel} {device.unit}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Reorder Level:</span>
                  <div className="font-medium">{device.reorderLevel} {device.unit}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Unit Price:</span>
                  <div className="font-medium">${device.unitPrice.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Selling Price:</span>
                  <div className="font-medium">${device.sellingPrice.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Purchase Date:</span>
                  <div className="font-medium">{new Date(device.purchaseDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Warranty Expiry:</span>
                  <div className={`font-medium ${
                    new Date(device.warrantyExpiry) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) 
                      ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {new Date(device.warrantyExpiry).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                    device.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : device.status === 'Maintenance'
                      ? 'bg-yellow-100 text-yellow-800'
                      : device.status === 'Inactive'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {device.status}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Supplier:</span>
                  <div className="font-medium">{device.supplier}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Last Maintenance:</span>
                  <div className="font-medium">{new Date(device.lastMaintenance).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Next Maintenance:</span>
                  <div className="font-medium">{new Date(device.nextMaintenance).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Certification:</span>
                  <div className="font-medium">{device.certification}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Properties:</span>
                  <div className="flex items-center gap-2 mt-1">
                    {device.calibrationRequired && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                        <Settings className="w-3 h-3 mr-1" />
                        Calibration Required
                      </span>
                    )}
                    {device.disposable && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded">
                        <Trash2 className="w-3 h-3 mr-1" />
                        Disposable
                      </span>
                    )}
                    {device.sterile && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                        <Shield className="w-3 h-3 mr-1" />
                        Sterile
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Description:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{device.description}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Specifications:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{device.specifications}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Features:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{device.features}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Physical Properties</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Power Source:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{device.powerSource}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Dimensions:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{device.dimensions}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Weight:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{device.weight}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MedicalDevices;
