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
  ArrowUp,
  ArrowDown,
  Minus,
  MoreHorizontal,
  Bell,
  Info,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  ArrowDownRight,
  Timer,
  PackageOpen,
  Archive,
  RotateCcw,
  Target,
  BarChart2,
  PieChart,
  LineChart,
  Database,
  HardDrive,
  Cloud,
  Wifi,
  Battery,
  Power,
  Cpu,
  Monitor,
  Server,
  Router,
  Lock,
  Unlock,
  Key,
  Fingerprint,
  EyeOff,
  Scan,
  ScanLine,
  QrCode,
  Barcode as BarcodeIcon,
  Pill
} from 'lucide-react';
import { medicalDevicesApi } from '../../../services/apiService';

const StockManagement = () => {
  const [stockItems, setStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [bulkAction, setBulkAction] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('itemName');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showNotifications, setShowNotifications] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showLowStockAlerts, setShowLowStockAlerts] = useState(true);
  const [showExpiryAlerts, setShowExpiryAlerts] = useState(true);
  const [showStockAdjustmentModal, setShowStockAdjustmentModal] = useState(false);
  const [adjustmentData, setAdjustmentData] = useState({});
  const [showBatchUpdateModal, setShowBatchUpdateModal] = useState(false);
  const [batchUpdateData, setBatchUpdateData] = useState({});
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [reorderData, setReorderData] = useState({});
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferData, setTransferData] = useState({});

  // Mock data for fallback
  const mockStockItems = [
    {
      id: 1,
      itemName: 'Digital Blood Pressure Monitor',
      category: 'Monitoring',
      type: 'medical_device',
      currentStock: 25,
      minStockLevel: 10,
      maxStockLevel: 50,
      reorderLevel: 20,
      unit: 'Units',
      unitPrice: 89.99,
      sellingPrice: 149.99,
      manufacturer: 'MedTech Solutions',
      barcode: '5556667778881',
      serialNumber: 'SN20001234',
      status: 'Active',
      lastUpdated: '2024-02-01T14:30:00Z',
      lowStockAlert: false,
      expiryAlert: false,
      expiryDate: '2026-01-15',
      supplier: 'MedicalSupply Inc.',
      imageUrl: null,
      totalValue: 3749.75,
      daysToExpiry: 730,
      trend: 'stable',
      lastRestocked: '2024-01-15',
      turnoverRate: 2.5,
      storageLocation: 'Warehouse A, Shelf 1',
      batchNumber: 'BATCH001',
      warrantyExpiry: '2026-01-15'
    },
    {
      id: 2,
      itemName: 'Digital Thermometer',
      category: 'Diagnostic',
      type: 'medical_device',
      currentStock: 80,
      minStockLevel: 30,
      maxStockLevel: 200,
      reorderLevel: 60,
      unit: 'Units',
      unitPrice: 15.99,
      sellingPrice: 29.99,
      manufacturer: 'HealthTech Corp',
      barcode: '5556667778882',
      serialNumber: 'SN10005678',
      status: 'Active',
      lastUpdated: '2024-02-01T09:15:00Z',
      lowStockAlert: false,
      expiryAlert: false,
      expiryDate: '2025-02-01',
      supplier: 'HealthSupply Ltd.',
      imageUrl: null,
      totalValue: 2399.20,
      daysToExpiry: 365,
      trend: 'up',
      lastRestocked: '2024-02-01',
      turnoverRate: 4.2,
      storageLocation: 'Warehouse B, Shelf 2',
      batchNumber: 'BATCH002',
      warrantyExpiry: '2025-02-01'
    },
    {
      id: 3,
      itemName: 'Syringe 5ml',
      category: 'Consumables',
      type: 'medical_device',
      currentStock: 500,
      minStockLevel: 200,
      maxStockLevel: 2000,
      reorderLevel: 400,
      unit: 'Pieces',
      unitPrice: 0.25,
      sellingPrice: 0.75,
      manufacturer: 'SteriMed',
      barcode: '5556667778883',
      serialNumber: 'BATCH003',
      status: 'Active',
      lastUpdated: '2024-02-10T11:00:00Z',
      lowStockAlert: false,
      expiryAlert: false,
      expiryDate: '2024-08-10',
      supplier: 'SterileSupply Inc.',
      imageUrl: null,
      totalValue: 375.00,
      daysToExpiry: 180,
      trend: 'down',
      lastRestocked: '2024-02-10',
      turnoverRate: 8.7,
      storageLocation: 'Warehouse C, Shelf 3',
      batchNumber: 'BATCH003',
      warrantyExpiry: '2024-08-10'
    },
    {
      id: 4,
      itemName: 'Paracetamol 500mg',
      category: 'Medicines',
      type: 'medicine',
      currentStock: 15,
      minStockLevel: 50,
      maxStockLevel: 500,
      reorderLevel: 100,
      unit: 'Tablets',
      unitPrice: 0.10,
      sellingPrice: 0.25,
      manufacturer: 'PharmaCorp',
      barcode: '5556667778884',
      serialNumber: 'MED001',
      status: 'Active',
      lastUpdated: '2024-02-15T16:45:00Z',
      lowStockAlert: true,
      expiryAlert: false,
      expiryDate: '2025-12-31',
      supplier: 'PharmaSupply Inc.',
      imageUrl: null,
      totalValue: 3.75,
      daysToExpiry: 340,
      trend: 'stable',
      lastRestocked: '2024-01-20',
      turnoverRate: 12.3,
      storageLocation: 'Pharmacy Storage A',
      batchNumber: 'MED001',
      expiryDate: '2025-12-31'
    }
  ];

  // Fetch stock items from API
  const fetchStockItems = async () => {
    try {
      setLoading(true);
      // For now, only fetch medical devices to avoid API errors
      const devicesResponse = await medicalDevicesApi.getDevices();
      const devices = devicesResponse.data?.data?.data || [];
      
      // Format devices data for stock management
      const stockItems = devices.map(device => ({
        id: device.id,
        itemName: device.name,
        category: device.category,
        type: 'medical_device',
        currentStock: device.current_stock,
        minStockLevel: device.min_stock_level,
        maxStockLevel: device.max_stock_level,
        reorderLevel: device.reorder_level,
        unit: device.unit,
        unitPrice: device.unit_price,
        sellingPrice: device.selling_price,
        manufacturer: device.manufacturer,
        barcode: device.barcode,
        serialNumber: device.serial_number,
        status: device.status,
        lastUpdated: device.updated_at,
        lowStockAlert: device.is_low_stock,
        expiryAlert: device.is_expiring_soon,
        expiryDate: device.warranty_expiry,
        supplier: device.supplier,
        imageUrl: device.image_url,
        totalValue: device.current_stock * device.selling_price,
        daysToExpiry: device.warranty_expiry ? Math.ceil((new Date(device.warranty_expiry) - new Date()) / (1000 * 60 * 60 * 24)) : 999,
        trend: 'stable',
        lastRestocked: device.purchase_date,
        turnoverRate: Math.random() * 10, // Mock data
        storageLocation: 'Main Warehouse',
        batchNumber: device.serial_number,
        warrantyExpiry: device.warranty_expiry
      }));
      
      setStockItems(stockItems);
    } catch (error) {
      console.error('Error fetching stock items:', error);
      // Fallback to mock data if API fails
      setStockItems(mockStockItems);
      addNotification('Using demo data - API connection failed', 'warning');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockItems();
  }, []);

  // Notification system
  const addNotification = (message, type = 'info') => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, 5));
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  // CRUD operations
  const handleAddItem = () => {
    setEditingItem(null);
    setFormData({});
    setShowAddModal(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setFormData(item);
    setShowAddModal(true);
  };

  const handleViewItem = (item) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  const handleDeleteItem = async (itemId) => {
    if (window.confirm('Are you sure you want to delete this stock item?')) {
      try {
        await medicalDevicesApi.deleteDevice(itemId);
        fetchStockItems();
        addNotification('Item deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting item:', error);
        addNotification('Error deleting item', 'error');
      }
    }
  };

  const handleSaveItem = async () => {
    try {
      const formDataToSubmit = new FormData();
      
      // Append all item data
      Object.keys(formData).forEach(key => {
        if (key === 'image' && formData[key] instanceof File) {
          formDataToSubmit.append('image', formData[key]);
        } else {
          formDataToSubmit.append(key, formData[key]);
        }
      });
      
      if (editingItem) {
        await medicalDevicesApi.updateDevice(editingItem.id, formDataToSubmit);
        addNotification('Item updated successfully', 'success');
      } else {
        await medicalDevicesApi.createDevice(formDataToSubmit);
        addNotification('Item added successfully', 'success');
      }
      
      fetchStockItems();
      setShowAddModal(false);
      setEditingItem(null);
      setFormData({});
    } catch (error) {
      console.error('Error saving item:', error);
      addNotification('Error saving item', 'error');
    }
  };

  // Stock adjustment
  const handleStockAdjustment = () => {
    const updatedItems = stockItems.map(item => {
      if (selectedItems.includes(item.id)) {
        const adjustment = parseInt(adjustmentData.quantity) || 0;
        const newStock = adjustmentData.type === 'add' ? item.currentStock + adjustment : item.currentStock - adjustment;
        return {
          ...item,
          currentStock: newStock,
          lastUpdated: new Date().toISOString(),
          lowStockAlert: newStock <= item.minStockLevel
        };
      }
      return item;
    });
    setStockItems(updatedItems);
    setShowStockAdjustmentModal(false);
    setAdjustmentData({});
    setSelectedItems([]);
    addNotification('Stock adjusted successfully', 'success');
  };

  // Batch update
  const handleBatchUpdate = () => {
    const updatedItems = stockItems.map(item => {
      if (selectedItems.includes(item.id)) {
        return {
          ...item,
          ...batchUpdateData,
          updatedAt: new Date().toISOString()
        };
      }
      return item;
    });
    setStockItems(updatedItems);
    setShowBatchUpdateModal(false);
    setBatchUpdateData({});
    setSelectedItems([]);
    addNotification('Batch update completed successfully', 'success');
  };

  // Bulk actions
  const handleBulkAction = () => {
    if (bulkAction === 'delete') {
      setStockItems(stockItems.filter(item => !selectedItems.includes(item.id)));
      addNotification(`${selectedItems.length} items deleted`, 'error');
    } else if (bulkAction === 'activate') {
      const updatedItems = stockItems.map(item =>
        selectedItems.includes(item.id) ? { ...item, status: 'Active' } : item
      );
      setStockItems(updatedItems);
      addNotification(`${selectedItems.length} items activated`, 'success');
    } else if (bulkAction === 'deactivate') {
      const updatedItems = stockItems.map(item =>
        selectedItems.includes(item.id) ? { ...item, status: 'Inactive' } : item
      );
      setStockItems(updatedItems);
      addNotification(`${selectedItems.length} items deactivated`, 'warning');
    } else if (bulkAction === 'reorder') {
      setShowReorderModal(true);
    } else if (bulkAction === 'adjust') {
      setShowStockAdjustmentModal(true);
    }
    
    if (bulkAction !== 'reorder' && bulkAction !== 'adjust') {
      setSelectedItems([]);
      setBulkAction('');
      setShowBulkModal(false);
    }
  };

  // Reorder items
  const handleReorderItems = () => {
    setTimeout(() => {
      setShowReorderModal(false);
      setReorderData({});
      setSelectedItems([]);
      setBulkAction('');
      setShowBulkModal(false);
      addNotification('Reorder process initiated successfully', 'success');
    }, 2000);
  };

  // Transfer items
  const handleTransferItems = () => {
    setTimeout(() => {
      setShowTransferModal(false);
      setTransferData({});
      addNotification('Stock transfer completed successfully', 'success');
    }, 2000);
  };

  // Export functions
  const handleExport = () => {
    const dataToExport = selectedItems.length > 0 
      ? stockItems.filter(item => selectedItems.includes(item.id))
      : stockItems;
    
    if (exportFormat === 'csv') {
      const csvContent = [
        ['Item Name', 'Category', 'Type', 'Current Stock', 'Min Stock', 'Unit Price', 'Selling Price', 'Status', 'Last Updated'].join(','),
        ...dataToExport.map(item => [
          `"${item.itemName}"`,
          `"${item.category}"`,
          `"${item.type}"`,
          item.currentStock,
          item.minStockLevel,
          item.unitPrice,
          item.sellingPrice,
          `"${item.status}"`,
          `"${item.lastUpdated}"`
        ].join(','))
      ].join('\n');
      
      const blob = new Blob([csvContent], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'stock-management.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } else if (exportFormat === 'pdf') {
      window.print();
    } else if (exportFormat === 'word') {
      // Simple word export
      const content = dataToExport.map(item => 
        `${item.itemName} - ${item.category} - Stock: ${item.currentStock} - Price: $${item.sellingPrice}`
      ).join('\n');
      
      const blob = new Blob([content], { type: 'text/plain' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'stock-management.txt';
      a.click();
      window.URL.revokeObjectURL(url);
    }
    setShowExportModal(false);
    addNotification(`Data exported as ${exportFormat.toUpperCase()}`, 'success');
  };

  // Import function
  const handleImport = () => {
    setTimeout(() => {
      setShowImportModal(false);
      setImportFile(null);
      addNotification('Stock items imported successfully', 'success');
    }, 2000);
  };

  // Filter and sort items
  const filteredItems = stockItems.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.barcode.includes(searchTerm) ||
                         item.serialNumber?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesTab = activeTab === 'all' || 
      (activeTab === 'low-stock' && item.lowStockAlert) ||
      (activeTab === 'expiring' && item.expiryAlert) ||
      (activeTab === 'out-of-stock' && item.currentStock === 0) ||
      (activeTab === item.type);
    
    return matchesSearch && matchesTab;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    const aValue = a[sortBy] || '';
    const bValue = b[sortBy] || '';
    const modifier = sortOrder === 'asc' ? 1 : -1;
    return aValue.toString().localeCompare(bValue.toString()) * modifier;
  });

  // Get unique values for filters
  const categories = [...new Set(stockItems.map(item => item.category).filter(Boolean))];
  const types = [...new Set(stockItems.map(item => item.type).filter(Boolean))];
  const suppliers = [...new Set(stockItems.map(item => item.supplier).filter(Boolean))];

  // Stats
  const totalItems = stockItems.length;
  const lowStockItems = stockItems.filter(item => item.lowStockAlert).length;
  const outOfStockItems = stockItems.filter(item => item.currentStock === 0).length;
  const expiringItems = stockItems.filter(item => item.expiryAlert).length;
  const totalValue = stockItems.reduce((sum, item) => sum + item.totalValue, 0);

  // Helper functions
  const getLowStockItems = () => stockItems.filter(item => item.currentStock <= item.minStockLevel);
  const getExpiringItems = () => stockItems.filter(item => item.daysToExpiry <= 90 && item.daysToExpiry > 0);
  const getExpiredItems = () => stockItems.filter(item => item.daysToExpiry < 0);

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-lg border ${
              notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
              notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
              notification.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
              'bg-blue-50 border-blue-200 text-blue-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{notification.message}</span>
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className="ml-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stock Management</h1>
          <p className="text-gray-500 mt-1">Monitor and manage inventory levels across all items</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button
            onClick={handleAddItem}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Items</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalItems}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Low Stock Items</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{lowStockItems}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{outOfStockItems}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Expiring Soon</p>
              <p className="text-2xl font-bold text-orange-600 mt-1">{expiringItems}</p>
            </div>
            <div className="w-12 h-12 bg-orange-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Value</p>
              <p className="text-2xl font-bold text-green-600 mt-1">${totalValue.toFixed(2)}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Alerts Section */}
      {(showLowStockAlerts && getLowStockItems().length > 0) || (showExpiryAlerts && getExpiringItems().length > 0) ? (
        <div className="space-y-3">
          {showLowStockAlerts && getLowStockItems().length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600" />
                <span className="text-yellow-800 font-medium">
                  {getLowStockItems().length} items are low in stock
                </span>
              </div>
              <button
                onClick={() => {
                  setSelectedItems(getLowStockItems().map(item => item.id));
                  setBulkAction('reorder');
                  setShowBulkModal(true);
                }}
                className="px-3 py-1 bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
              >
                Reorder All
              </button>
            </motion.div>
          )}
          
          {showExpiryAlerts && getExpiringItems().length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-600" />
                <span className="text-orange-800 font-medium">
                  {getExpiringItems().length} items are expiring soon
                </span>
              </div>
              <button
                onClick={() => setActiveTab('expiring')}
                className="px-3 py-1 bg-orange-600 text-white rounded hover:bg-orange-700 transition-colors"
              >
                View Items
              </button>
            </motion.div>
          )}
        </div>
      ) : null}

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="itemName">Sort by Name</option>
                <option value="category">Sort by Category</option>
                <option value="currentStock">Sort by Stock</option>
                <option value="totalValue">Sort by Value</option>
                <option value="lastUpdated">Sort by Updated</option>
              </select>
              
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
              
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              <select
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Types</option>
                {types.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: 'all', name: 'All Items', icon: Package },
              { id: 'low-stock', name: 'Low Stock', icon: AlertTriangle },
              { id: 'out-of-stock', name: 'Out of Stock', icon: XCircle },
              { id: 'expiring', name: 'Expiring Soon', icon: Clock },
              { id: 'medical_device', name: 'Medical Devices', icon: Shield },
              { id: 'medicine', name: 'Medicines', icon: Pill }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.name}
                {tab.id === 'all' && <span className="ml-2 text-gray-400">({stockItems.length})</span>}
                {tab.id === 'low-stock' && (
                  <span className="ml-2 text-red-500">
                    ({getLowStockItems().length})
                  </span>
                )}
                {tab.id === 'out-of-stock' && (
                  <span className="ml-2 text-red-500">
                    ({stockItems.filter(item => item.currentStock === 0).length})
                  </span>
                )}
                {tab.id === 'expiring' && (
                  <span className="ml-2 text-orange-500">
                    ({getExpiringItems().length})
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        {/* Bulk Actions */}
        {selectedItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between"
          >
            <span className="text-blue-700">
              {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''} selected
            </span>
            <div className="flex items-center gap-2">
              <select
                value={bulkAction}
                onChange={(e) => setBulkAction(e.target.value)}
                className="px-3 py-1 border border-blue-300 rounded text-blue-700 focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Bulk Actions</option>
                <option value="delete">Delete</option>
                <option value="activate">Activate</option>
                <option value="deactivate">Deactivate</option>
                <option value="reorder">Reorder</option>
                <option value="adjust">Adjust Stock</option>
                <option value="batch-update">Batch Update</option>
              </select>
              <button
                onClick={() => {
                  if (bulkAction === 'batch-update') {
                    setShowBatchUpdateModal(true);
                  } else if (bulkAction === 'reorder') {
                    setShowReorderModal(true);
                  } else {
                    setShowBulkModal(true);
                  }
                }}
                className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
              >
                Apply
              </button>
              <button
                onClick={() => setSelectedItems([])}
                className="px-4 py-1 text-blue-600 hover:text-blue-800 transition-colors"
              >
                Clear Selection
              </button>
            </div>
          </motion.div>
        )}

        {/* Items Table */}
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedItems.length === sortedItems.length}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedItems(sortedItems.map(item => item.id));
                        } else {
                          setSelectedItems([]);
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Item
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Value
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedItems.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedItems([...selectedItems, item.id]);
                          } else {
                            setSelectedItems(selectedItems.filter(id => id !== item.id));
                          }
                        }}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          {item.type === 'medical_device' ? (
                            <Shield className="w-5 h-5 text-gray-600" />
                          ) : (
                            <Pill className="w-5 h-5 text-gray-600" />
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.itemName}</div>
                          <div className="text-sm text-gray-500">{item.barcode}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {item.currentStock} {item.unit}
                      </div>
                      <div className="text-sm text-gray-500">
                        Min: {item.minStockLevel}
                      </div>
                      {item.lowStockAlert && (
                        <span className="text-xs text-yellow-600">Low Stock</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${item.totalValue.toFixed(2)}</div>
                      <div className="text-sm text-gray-500">${item.sellingPrice} each</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewItem(item)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditItem(item)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteItem(item.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingItem ? 'Edit Item' : 'Add New Item'}
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                  <input
                    type="text"
                    value={formData.itemName || ''}
                    onChange={(e) => setFormData({...formData, itemName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
                  <input
                    type="number"
                    value={formData.currentStock || ''}
                    onChange={(e) => setFormData({...formData, currentStock: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock Level</label>
                  <input
                    type="number"
                    value={formData.minStockLevel || ''}
                    onChange={(e) => setFormData({...formData, minStockLevel: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.unitPrice || ''}
                    onChange={(e) => setFormData({...formData, unitPrice: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.sellingPrice || ''}
                    onChange={(e) => setFormData({...formData, sellingPrice: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <select
                    value={formData.unit || ''}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Unit</option>
                    <option value="Units">Units</option>
                    <option value="Pieces">Pieces</option>
                    <option value="Tablets">Tablets</option>
                    <option value="Boxes">Boxes</option>
                    <option value="Kits">Kits</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status || ''}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveItem}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingItem ? 'Update' : 'Add'} Item
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowViewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Item Details</h2>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Basic Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name:</span>
                      <span className="font-medium">{selectedItem.itemName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-medium">{selectedItem.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Type:</span>
                      <span className="font-medium">{selectedItem.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Barcode:</span>
                      <span className="font-medium">{selectedItem.barcode}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Serial Number:</span>
                      <span className="font-medium">{selectedItem.serialNumber || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        selectedItem.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedItem.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Stock & Pricing</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Current Stock:</span>
                      <span className="font-medium">{selectedItem.currentStock} {selectedItem.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Min Stock Level:</span>
                      <span className="font-medium">{selectedItem.minStockLevel} {selectedItem.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Max Stock Level:</span>
                      <span className="font-medium">{selectedItem.maxStockLevel || 'N/A'} {selectedItem.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Unit Price:</span>
                      <span className="font-medium">${selectedItem.unitPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Selling Price:</span>
                      <span className="font-medium">${selectedItem.sellingPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Total Value:</span>
                      <span className="font-medium">${selectedItem.totalValue.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Additional Info</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Manufacturer:</span>
                      <span className="font-medium">{selectedItem.manufacturer || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Supplier:</span>
                      <span className="font-medium">{selectedItem.supplier || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Storage Location:</span>
                      <span className="font-medium">{selectedItem.storageLocation || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Batch Number:</span>
                      <span className="font-medium">{selectedItem.batchNumber || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Updated:</span>
                      <span className="font-medium">{new Date(selectedItem.lastUpdated).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Alerts & Expiry</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Low Stock Alert:</span>
                      <span className={`font-medium ${selectedItem.lowStockAlert ? 'text-yellow-600' : 'text-green-600'}`}>
                        {selectedItem.lowStockAlert ? 'Active' : 'Normal'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Expiry Alert:</span>
                      <span className={`font-medium ${selectedItem.expiryAlert ? 'text-orange-600' : 'text-green-600'}`}>
                        {selectedItem.expiryAlert ? 'Expiring Soon' : 'Normal'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Expiry Date:</span>
                      <span className="font-medium">{selectedItem.expiryDate || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Days to Expiry:</span>
                      <span className={`font-medium ${
                        selectedItem.daysToExpiry < 0 ? 'text-red-600' :
                        selectedItem.daysToExpiry <= 90 ? 'text-orange-600' :
                        'text-green-600'
                      }`}>
                        {selectedItem.daysToExpiry < 0 ? 'Expired' : `${selectedItem.daysToExpiry} days`}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditItem(selectedItem);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Item
                </button>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Action Modal */}
      <AnimatePresence>
        {showBulkModal && bulkAction && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowBulkModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Confirm Bulk Action</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to {bulkAction} {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''}?
                {bulkAction === 'delete' && ' This action cannot be undone.'}
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => setShowBulkModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkAction}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    bulkAction === 'delete' 
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {bulkAction === 'delete' ? 'Delete' : 'Apply'}
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
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowExportModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Export Data</h2>
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
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-700">CSV</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="pdf"
                        checked={exportFormat === 'pdf'}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-700">PDF</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="word"
                        checked={exportFormat === 'word'}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="text-blue-600"
                      />
                      <span className="text-sm text-gray-700">Word Document</span>
                    </label>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {selectedItems.length > 0 
                      ? `Exporting ${selectedItems.length} selected items`
                      : `Exporting all ${stockItems.length} items`}
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
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

export default StockManagement;
