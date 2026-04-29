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
  Eye as EyeIcon,
  Scan,
  ScanLine,
  QrCode,
  Barcode as BarcodeIcon,
  Pill
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV, printDocument } from '../../../utils/exportUtils';
import { medicalDevicesApi } from '../../../services/apiService';

const StockManagementEnhanced = () => {
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
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [showStockAdjustmentModal, setShowStockAdjustmentModal] = useState(false);
  const [adjustmentData, setAdjustmentData] = useState({});
  const [showBatchUpdateModal, setShowBatchUpdateModal] = useState(false);
  const [batchUpdateData, setBatchUpdateData] = useState({});
  const [showLowStockAlerts, setShowLowStockAlerts] = useState(true);
  const [showExpiryAlerts, setShowExpiryAlerts] = useState(true);
  const [notifications, setNotifications] = useState([]);
  const [showAnalyticsModal, setShowAnalyticsModal] = useState(false);
  const [analyticsData, setAnalyticsData] = useState({});
  const [showBarcodeScanner, setShowBarcodeScanner] = useState(false);
  const [showQrScanner, setShowQrScanner] = useState(false);
  const [showReorderModal, setShowReorderModal] = useState(false);
  const [reorderData, setReorderData] = useState({});
  const [showTransferModal, setShowTransferModal] = useState(false);
  const [transferData, setTransferData] = useState({});
  
  const [filters, setFilters] = useState({
    category: '',
    stockLevel: '',
    supplier: '',
    expiryStatus: '',
    location: '',
    status: ''
  });

  // Enhanced mock data with comprehensive fields
  const mockStockItems = [
    {
      id: 1,
      itemName: 'Paracetamol 500mg',
      category: 'Medicines',
      sku: 'MED-001',
      barcode: '1234567890123',
      qrCode: 'QR-MED-001-1234',
      serialNumber: 'SN-PAR-001',
      currentStock: 150,
      minStockLevel: 50,
      maxStockLevel: 500,
      reorderLevel: 75,
      unit: 'Tablets',
      unitPrice: 2.50,
      sellingPrice: 3.75,
      totalValue: 562.50,
      supplier: 'MediSupply Inc.',
      supplierContact: '+1-234-567-1001',
      supplierEmail: 'orders@medisupply.com',
      lastRestocked: '2024-02-15',
      expiryDate: '2025-12-31',
      daysToExpiry: 307,
      stockTurnover: 2.5,
      reorderFrequency: 'Monthly',
      storageLocation: 'Aisle 1, Shelf A',
      storageZone: 'Zone A',
      warehouse: 'Main Warehouse',
      temperature: 'Room Temperature',
      humidity: 'Normal',
      lightSensitive: false,
      specialStorage: 'None',
      batchNumber: 'BATCH001',
      lotNumber: 'LOT001',
      manufacturingDate: '2024-01-15',
      status: 'Active',
      lowStockAlert: false,
      expiryAlert: false,
      qualityCheck: 'Passed',
      lastQualityCheck: '2024-02-10',
      nextQualityCheck: '2024-05-10',
      notes: 'Standard paracetamol tablets',
      internalNotes: 'High demand item',
      tags: ['pain-relief', 'fever', 'common'],
      images: ['/images/medicines/paracetamol.jpg'],
      specifications: {
        activeIngredient: 'Paracetamol',
        strength: '500mg',
        form: 'Tablet',
        packaging: 'Strip of 10 tablets'
      },
      regulatory: {
        fdaApproved: true,
        ceMarked: true,
        isoCertified: true,
        prescriptionRequired: false
      },
      inventoryTracking: {
        rfidEnabled: true,
        barcodeEnabled: true,
        qrEnabled: true,
        lastScanned: '2024-02-15T10:30:00Z',
        scanCount: 45
      },
      sales: {
        monthlyAverage: 120,
        yearlyTotal: 1440,
        lastMonthSales: 135,
        trend: 'increasing'
      },
      costs: {
        purchaseCost: 2.50,
        holdingCost: 0.25,
        orderingCost: 5.00,
        totalCost: 2.75
      }
    },
    {
      id: 2,
      itemName: 'Amoxicillin 250mg',
      category: 'Antibiotics',
      sku: 'MED-002',
      barcode: '2345678901234',
      qrCode: 'QR-MED-002-5678',
      serialNumber: 'SN-AMX-002',
      currentStock: 45,
      minStockLevel: 30,
      maxStockLevel: 200,
      reorderLevel: 60,
      unit: 'Capsules',
      unitPrice: 8.50,
      sellingPrice: 12.75,
      totalValue: 382.50,
      supplier: 'PharmaSupply Ltd.',
      supplierContact: '+1-234-567-1002',
      supplierEmail: 'info@pharmasupply.com',
      lastRestocked: '2024-02-10',
      expiryDate: '2024-08-31',
      daysToExpiry: 185,
      stockTurnover: 1.8,
      reorderFrequency: 'Bi-weekly',
      storageLocation: 'Aisle 1, Shelf B',
      storageZone: 'Zone A',
      warehouse: 'Main Warehouse',
      temperature: 'Room Temperature',
      humidity: 'Normal',
      lightSensitive: false,
      specialStorage: 'None',
      batchNumber: 'BATCH002',
      lotNumber: 'LOT002',
      manufacturingDate: '2024-02-01',
      status: 'Active',
      lowStockAlert: true,
      expiryAlert: false,
      qualityCheck: 'Passed',
      lastQualityCheck: '2024-02-05',
      nextQualityCheck: '2024-05-05',
      notes: 'Broad-spectrum antibiotic',
      internalNotes: 'Monitor resistance patterns',
      tags: ['antibiotic', 'infection', 'prescription'],
      images: ['/images/medicines/amoxicillin.jpg'],
      specifications: {
        activeIngredient: 'Amoxicillin',
        strength: '250mg',
        form: 'Capsule',
        packaging: 'Blister pack of 20 capsules'
      },
      regulatory: {
        fdaApproved: true,
        ceMarked: true,
        isoCertified: true,
        prescriptionRequired: true
      },
      inventoryTracking: {
        rfidEnabled: true,
        barcodeEnabled: true,
        qrEnabled: true,
        lastScanned: '2024-02-12T14:20:00Z',
        scanCount: 28
      },
      sales: {
        monthlyAverage: 85,
        yearlyTotal: 1020,
        lastMonthSales: 92,
        trend: 'stable'
      },
      costs: {
        purchaseCost: 8.50,
        holdingCost: 0.85,
        orderingCost: 5.00,
        totalCost: 9.35
      }
    },
    {
      id: 3,
      itemName: 'Insulin Glargine',
      category: 'Diabetes',
      sku: 'MED-003',
      barcode: '3456789012345',
      qrCode: 'QR-MED-003-9012',
      serialNumber: 'SN-INS-003',
      currentStock: 25,
      minStockLevel: 20,
      maxStockLevel: 100,
      reorderLevel: 40,
      unit: 'Vials',
      unitPrice: 45.00,
      sellingPrice: 67.50,
      totalValue: 1125.00,
      supplier: 'DiabetesCare Inc.',
      supplierContact: '+1-234-567-1003',
      supplierEmail: 'sales@diabetescare.com',
      lastRestocked: '2024-02-08',
      expiryDate: '2024-06-30',
      daysToExpiry: 124,
      stockTurnover: 3.2,
      reorderFrequency: 'Weekly',
      storageLocation: 'Refrigerator 1, Shelf 2',
      storageZone: 'Zone B',
      warehouse: 'Main Warehouse',
      temperature: '2-8°C',
      humidity: 'Normal',
      lightSensitive: true,
      specialStorage: 'Refrigerated',
      batchNumber: 'BATCH003',
      lotNumber: 'LOT003',
      manufacturingDate: '2024-01-08',
      status: 'Active',
      lowStockAlert: true,
      expiryAlert: true,
      qualityCheck: 'Passed',
      lastQualityCheck: '2024-02-08',
      nextQualityCheck: '2024-04-08',
      notes: 'Long-acting insulin',
      internalNotes: 'Critical medication - maintain stock',
      tags: ['diabetes', 'insulin', 'refrigerated'],
      images: ['/images/medicines/insulin.jpg'],
      specifications: {
        activeIngredient: 'Insulin Glargine',
        strength: '100 U/mL',
        form: 'Solution for injection',
        packaging: '10 mL vial'
      },
      regulatory: {
        fdaApproved: true,
        ceMarked: true,
        isoCertified: true,
        prescriptionRequired: true
      },
      inventoryTracking: {
        rfidEnabled: true,
        barcodeEnabled: true,
        qrEnabled: true,
        lastScanned: '2024-02-14T09:15:00Z',
        scanCount: 67
      },
      sales: {
        monthlyAverage: 95,
        yearlyTotal: 1140,
        lastMonthSales: 102,
        trend: 'increasing'
      },
      costs: {
        purchaseCost: 45.00,
        holdingCost: 4.50,
        orderingCost: 5.00,
        totalCost: 54.50
      }
    },
    {
      id: 4,
      itemName: 'Vitamin D3 1000 IU',
      category: 'Supplements',
      sku: 'SUP-001',
      barcode: '4567890123456',
      qrCode: 'QR-SUP-001-3456',
      serialNumber: 'SN-VIT-001',
      currentStock: 200,
      minStockLevel: 100,
      maxStockLevel: 500,
      reorderLevel: 150,
      unit: 'Capsules',
      unitPrice: 0.75,
      sellingPrice: 1.25,
      totalValue: 150.00,
      supplier: 'VitaHealth Corp.',
      supplierContact: '+1-234-567-1004',
      supplierEmail: 'orders@vitahealth.com',
      lastRestocked: '2024-02-12',
      expiryDate: '2026-02-28',
      daysToExpiry: 730,
      stockTurnover: 1.2,
      reorderFrequency: 'Quarterly',
      storageLocation: 'Aisle 2, Shelf A',
      storageZone: 'Zone C',
      warehouse: 'Main Warehouse',
      temperature: 'Room Temperature',
      humidity: 'Normal',
      lightSensitive: true,
      specialStorage: 'Dark storage',
      batchNumber: 'BATCH004',
      lotNumber: 'LOT004',
      manufacturingDate: '2024-01-12',
      status: 'Active',
      lowStockAlert: false,
      expiryAlert: false,
      qualityCheck: 'Passed',
      lastQualityCheck: '2024-02-12',
      nextQualityCheck: '2024-08-12',
      notes: 'Vitamin D3 supplement',
      internalNotes: 'Seasonal demand variation',
      tags: ['vitamin', 'supplement', 'wellness'],
      images: ['/images/supplements/vitamin-d.jpg'],
      specifications: {
        activeIngredient: 'Vitamin D3',
        strength: '1000 IU',
        form: 'Softgel capsule',
        packaging: 'Bottle of 60 capsules'
      },
      regulatory: {
        fdaApproved: false,
        ceMarked: true,
        isoCertified: true,
        prescriptionRequired: false
      },
      inventoryTracking: {
        rfidEnabled: false,
        barcodeEnabled: true,
        qrEnabled: true,
        lastScanned: '2024-02-13T16:45:00Z',
        scanCount: 15
      },
      sales: {
        monthlyAverage: 45,
        yearlyTotal: 540,
        lastMonthSales: 52,
        trend: 'seasonal'
      },
      costs: {
        purchaseCost: 0.75,
        holdingCost: 0.08,
        orderingCost: 5.00,
        totalCost: 0.83
      }
    },
    {
      id: 5,
      itemName: 'Surgical Gloves',
      category: 'Medical Supplies',
      sku: 'SUP-002',
      barcode: '5678901234567',
      qrCode: 'QR-SUP-002-4567',
      serialNumber: 'SN-GLV-001',
      currentStock: 500,
      minStockLevel: 200,
      maxStockLevel: 2000,
      reorderLevel: 400,
      unit: 'Pairs',
      unitPrice: 0.50,
      sellingPrice: 0.75,
      totalValue: 250.00,
      supplier: 'MedSupply Solutions',
      supplierContact: '+1-234-567-1005',
      supplierEmail: 'orders@medsupplysolutions.com',
      lastRestocked: '2024-02-14',
      expiryDate: '2025-02-14',
      daysToExpiry: 365,
      stockTurnover: 4.5,
      reorderFrequency: 'Monthly',
      storageLocation: 'Storage Room 2, Rack 3',
      storageZone: 'Zone D',
      warehouse: 'Main Warehouse',
      temperature: 'Room Temperature',
      humidity: 'Normal',
      lightSensitive: false,
      specialStorage: 'None',
      batchNumber: 'BATCH005',
      lotNumber: 'LOT005',
      manufacturingDate: '2024-02-01',
      status: 'Active',
      lowStockAlert: false,
      expiryAlert: false,
      qualityCheck: 'Passed',
      lastQualityCheck: '2024-02-14',
      nextQualityCheck: '2024-05-14',
      notes: 'Latex-free surgical gloves',
      internalNotes: 'High consumption item',
      tags: ['gloves', 'surgical', 'protective'],
      images: ['/images/supplies/gloves.jpg'],
      specifications: {
        material: 'Nitrile',
        size: 'Large',
        thickness: 'Standard',
        packaging: 'Box of 100 pairs'
      },
      regulatory: {
        fdaApproved: true,
        ceMarked: true,
        isoCertified: true,
        prescriptionRequired: false
      },
      inventoryTracking: {
        rfidEnabled: true,
        barcodeEnabled: true,
        qrEnabled: false,
        lastScanned: '2024-02-15T11:30:00Z',
        scanCount: 89
      },
      sales: {
        monthlyAverage: 180,
        yearlyTotal: 2160,
        lastMonthSales: 195,
        trend: 'stable'
      },
      costs: {
        purchaseCost: 0.50,
        holdingCost: 0.05,
        orderingCost: 5.00,
        totalCost: 0.55
      }
    }
  ];

  const categories = [
    { id: 'medicines', name: 'Medicines', icon: Pill },
    { id: 'antibiotics', name: 'Antibiotics', icon: Shield },
    { id: 'supplements', name: 'Supplements', icon: Heart },
    { id: 'medical-supplies', name: 'Medical Supplies', icon: Package },
    { id: 'diabetes', name: 'Diabetes', icon: Activity },
    { id: 'cardiovascular', name: 'Cardiovascular', icon: Heart },
    { id: 'pain-relief', name: 'Pain Relief', icon: AlertCircle },
    { id: 'first-aid', name: 'First Aid', icon: PackageOpen }
  ];

  // Fetch stock items from API
  const fetchStockItems = async () => {
    try {
      setLoading(true);
      // For now, only fetch medical devices to avoid API errors
      const devicesResponse = await medicalDevicesApi.getDevices();
      const devices = devicesResponse.data.data.data || [];
      
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
        status: device.status,
        lastUpdated: device.updated_at,
        lowStockAlert: device.is_low_stock,
        expiryAlert: device.is_expiring_soon,
        supplier: device.supplier,
        imageUrl: device.image_url,
        totalValue: device.current_stock * device.selling_price,
        daysToExpiry: device.warranty_expiry ? Math.ceil((new Date(device.warranty_expiry) - new Date()) / (1000 * 60 * 60 * 24)) : 999,
        trend: 'stable',
        lastRestocked: device.purchase_date,
        turnoverRate: Math.random() * 10, // Mock data
        storageLocation: 'Main Warehouse',
        batchNumber: device.serial_number,
        expiryDate: device.warranty_expiry
      }));
      
      setStockItems(stockItems);
    } catch (error) {
      console.error('Error fetching stock items:', error);
      // Show user-friendly message and fallback to mock data
      console.log('Backend API not available. Using mock data for demonstration.');
      setStockItems(mockStockItems);
      // You could also show a toast notification here if you have one
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStockItems();
  }, []);

  // Enhanced CRUD operations
  const handleAddItem = () => {
    const newItem = {
      id: Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
      status: 'Active',
      lowStockAlert: false,
      expiryAlert: false,
      stockTurnover: 0,
      sales: {
        monthlyAverage: 0,
        yearlyTotal: 0,
        lastMonthSales: 0,
        trend: 'stable'
      }
    };
    setStockItems([newItem, ...stockItems]);
    setShowAddModal(false);
    setFormData({});
    addNotification('Stock item added successfully', 'success');
  };

  const handleEditItem = () => {
    const updatedItems = stockItems.map(item =>
      item.id === editingItem.id ? { ...item, ...formData, updatedAt: new Date().toISOString() } : item
    );
    setStockItems(updatedItems);
    setShowAddModal(false);
    setEditingItem(null);
    setFormData({});
    addNotification('Stock item updated successfully', 'success');
  };

  const handleDeleteItem = (itemId) => {
    setStockItems(stockItems.filter(item => item.id !== itemId));
    addNotification('Stock item deleted successfully', 'error');
  };

  const handleStockAdjustment = () => {
    const updatedItems = stockItems.map(item => {
      if (selectedItems.includes(item.id)) {
        const adjustment = parseInt(adjustmentData.quantity) || 0;
        const newStock = adjustmentData.type === 'add' ? item.currentStock + adjustment : item.currentStock - adjustment;
        return {
          ...item,
          currentStock: Math.max(0, newStock),
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

  const handleReorderItems = () => {
    // Simulate reorder process
    setTimeout(() => {
      setShowReorderModal(false);
      setReorderData({});
      setSelectedItems([]);
      setBulkAction('');
      setShowBulkModal(false);
      addNotification('Reorder process initiated successfully', 'success');
    }, 2000);
  };

  const handleTransferStock = () => {
    // Simulate stock transfer
    setTimeout(() => {
      setShowTransferModal(false);
      setTransferData({});
      addNotification('Stock transfer completed successfully', 'success');
    }, 2000);
  };

  const handleExport = () => {
    const dataToExport = selectedItems.length > 0 
      ? stockItems.filter(item => selectedItems.includes(item.id))
      : stockItems;
    
    if (exportFormat === 'csv') {
      exportToCSV(dataToExport, 'stock-management.csv');
    } else if (exportFormat === 'pdf') {
      exportToPDF(dataToExport, 'stock-management.pdf');
    } else if (exportFormat === 'word') {
      exportToWord(dataToExport, 'stock-management.docx');
    }
    setShowExportModal(false);
    addNotification(`Data exported as ${exportFormat.toUpperCase()}`, 'success');
  };

  const handleImport = () => {
    // Simulate import process
    setTimeout(() => {
      setShowImportModal(false);
      setImportFile(null);
      addNotification('Stock items imported successfully', 'success');
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

  const filteredItems = stockItems.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.barcode.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filters.category || item.category === filters.category;
    const matchesStockLevel = !filters.stockLevel || 
      (filters.stockLevel === 'low' && item.currentStock <= item.minStockLevel) ||
      (filters.stockLevel === 'medium' && item.currentStock > item.minStockLevel && item.currentStock < item.maxStockLevel) ||
      (filters.stockLevel === 'high' && item.currentStock >= item.maxStockLevel);
    const matchesExpiryStatus = !filters.expiryStatus ||
      (filters.expiryStatus === 'expiring' && item.daysToExpiry <= 90) ||
      (filters.expiryStatus === 'expired' && item.daysToExpiry < 0) ||
      (filters.expiryStatus === 'safe' && item.daysToExpiry > 90);
    const matchesStatus = !filters.status || item.status === filters.status;
    
    return matchesSearch && matchesCategory && matchesStockLevel && matchesExpiryStatus && matchesStatus;
  });

  const sortedItems = [...filteredItems].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedItems = sortedItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);

  const getCategoryIcon = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.icon : Package;
  };

  const getStockLevelColor = (current, min, max) => {
    if (current <= min) return 'text-red-600 bg-red-50';
    if (current >= max) return 'text-blue-600 bg-blue-50';
    return 'text-green-600 bg-green-50';
  };

  const getExpiryStatusColor = (daysToExpiry) => {
    if (daysToExpiry < 0) return 'text-red-600 bg-red-50';
    if (daysToExpiry <= 30) return 'text-orange-600 bg-orange-50';
    if (daysToExpiry <= 90) return 'text-yellow-600 bg-yellow-50';
    return 'text-green-600 bg-green-50';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active': return 'bg-green-100 text-green-700';
      case 'Inactive': return 'bg-gray-100 text-gray-700';
      case 'Discontinued': return 'bg-red-100 text-red-700';
      case 'Quarantine': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getLowStockItems = () => stockItems.filter(item => item.currentStock <= item.minStockLevel);
  const getExpiringItems = () => stockItems.filter(item => item.daysToExpiry <= 90 && item.daysToExpiry > 0);
  const getExpiredItems = () => stockItems.filter(item => item.daysToExpiry < 0);
  const getTotalValue = () => stockItems.reduce((sum, item) => sum + item.totalValue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Stock Management</h1>
          <p className="text-gray-500 mt-1">Advanced inventory tracking and management system</p>
        </div>
        <div className="flex items-center gap-3 mt-4 sm:mt-0">
          <button
            onClick={() => setShowBarcodeScanner(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BarcodeIcon className="w-4 h-4" />
            Scan
          </button>
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
            onClick={() => setShowAnalyticsModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <BarChart3 className="w-4 h-4" />
            Analytics
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Item
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
              <p className="text-sm text-gray-500">Total Items</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stockItems.length}</p>
              <p className="text-sm text-green-600 mt-1">+8% from last month</p>
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
              <p className="text-2xl font-bold text-gray-900 mt-1">{getLowStockItems().length}</p>
              <p className="text-sm text-red-600 mt-1">Requires attention</p>
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
              <p className="text-2xl font-bold text-gray-900 mt-1">${getTotalValue().toFixed(2)}</p>
              <p className="text-sm text-green-600 mt-1">+12% from last month</p>
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
              <p className="text-2xl font-bold text-gray-900 mt-1">{getExpiringItems().length}</p>
              <p className="text-sm text-yellow-600 mt-1">Within 90 days</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Alerts Section */}
      {(showLowStockAlerts && getLowStockItems().length > 0) || (showExpiryAlerts && getExpiringItems().length > 0) ? (
        <div className="space-y-3">
          {showLowStockAlerts && getLowStockItems().length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-red-50 border border-red-200 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <span className="text-red-800 font-medium">
                    {getLowStockItems().length} items are low in stock
                  </span>
                </div>
                <button
                  onClick={() => {
                    setSelectedItems(getLowStockItems().map(item => item.id));
                    setBulkAction('reorder');
                    setShowBulkModal(true);
                  }}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                >
                  Reorder All
                </button>
              </div>
            </motion.div>
          )}
          
          {showExpiryAlerts && getExpiringItems().length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-yellow-600" />
                  <span className="text-yellow-800 font-medium">
                    {getExpiringItems().length} items expiring within 90 days
                  </span>
                </div>
                <button
                  onClick={() => setActiveTab('expiring')}
                  className="px-3 py-1 bg-yellow-600 text-white rounded-lg text-sm hover:bg-yellow-700 transition-colors"
                >
                  View Items
                </button>
              </div>
            </motion.div>
          )}
        </div>
      ) : null}

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {['all', 'low-stock', 'expiring', 'expired', 'active', 'inactive'].map((tab) => (
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
              {tab === 'all' && <span className="ml-2 text-gray-400">({stockItems.length})</span>}
              {tab === 'low-stock' && (
                <span className="ml-2 text-red-500">
                  ({getLowStockItems().length})
                </span>
              )}
              {tab === 'expiring' && (
                <span className="ml-2 text-yellow-500">
                  ({getExpiringItems().length})
                </span>
              )}
              {tab === 'expired' && (
                <span className="ml-2 text-red-500">
                  ({getExpiredItems().length})
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
            placeholder="Search items by name, SKU, barcode, or supplier..."
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
            <option value="itemName">Sort by Name</option>
            <option value="category">Sort by Category</option>
            <option value="currentStock">Sort by Stock</option>
            <option value="totalValue">Sort by Value</option>
            <option value="daysToExpiry">Sort by Expiry</option>
            <option value="lastRestocked">Sort by Last Restocked</option>
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Status</label>
                <select
                  value={filters.expiryStatus}
                  onChange={(e) => setFilters({ ...filters, expiryStatus: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="expiring">Expiring Soon (≤90 days)</option>
                  <option value="expired">Expired</option>
                  <option value="safe">Safe (&gt;90 days)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <input
                  type="text"
                  value={filters.supplier}
                  onChange={(e) => setFilters({ ...filters, supplier: e.target.value })}
                  placeholder="Enter supplier name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Storage Location</label>
                <input
                  type="text"
                  value={filters.location}
                  onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                  placeholder="Enter location..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
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
                  <option value="Discontinued">Discontinued</option>
                  <option value="Quarantine">Quarantine</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                onClick={() => setFilters({
                  category: '',
                  stockLevel: '',
                  supplier: '',
                  expiryStatus: '',
                  location: '',
                  status: ''
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
              className="px-3 py-1 border border-blue-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Bulk Actions</option>
              <option value="adjust">Adjust Stock</option>
              <option value="reorder">Reorder Items</option>
              <option value="batch-update">Batch Update</option>
              <option value="activate">Activate</option>
              <option value="deactivate">Deactivate</option>
              <option value="delete">Delete Items</option>
            </select>
            <button
              onClick={() => {
                if (bulkAction === 'adjust') {
                  setShowStockAdjustmentModal(true);
                } else if (bulkAction === 'batch-update') {
                  setShowBatchUpdateModal(true);
                } else if (bulkAction === 'reorder') {
                  setShowReorderModal(true);
                } else {
                  setShowBulkModal(true);
                }
              }}
              disabled={!bulkAction}
              className="px-4 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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

      {/* Stock Items Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedItems.length === paginatedItems.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedItems(paginatedItems.map(item => item.id));
                      } else {
                        setSelectedItems([]);
                      }
                    }}
                    className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
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
                  Expiry
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
                  <td colSpan="8" className="px-6 py-12 text-center">
                    <div className="flex items-center justify-center">
                      <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
                    </div>
                  </td>
                </tr>
              ) : paginatedItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="px-6 py-12 text-center text-gray-500">
                    No stock items found
                  </td>
                </tr>
              ) : (
                paginatedItems.map((item) => {
                  const CategoryIcon = getCategoryIcon(item.category);
                  return (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4">
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
                          className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                        />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                            <CategoryIcon className="w-5 h-5 text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{item.itemName}</p>
                            <p className="text-sm text-gray-500">{item.sku} • {item.barcode}</p>
                            <p className="text-xs text-gray-400">{item.supplier}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          <CategoryIcon className="w-3 h-3" />
                          {item.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStockLevelColor(item.currentStock, item.minStockLevel, item.maxStockLevel)}`}>
                            {item.currentStock} {item.unit}
                          </div>
                          {item.currentStock <= item.minStockLevel && (
                            <p className="text-xs text-red-600">Low stock</p>
                          )}
                          <p className="text-xs text-gray-500">Min: {item.minStockLevel} • Max: {item.maxStockLevel}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">${item.totalValue.toFixed(2)}</p>
                          <p className="text-sm text-gray-500">${item.unitPrice} per {item.unit}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getExpiryStatusColor(item.daysToExpiry)}`}>
                            {item.daysToExpiry < 0 ? 'Expired' :
                             item.daysToExpiry <= 30 ? `${item.daysToExpiry} days` :
                             item.daysToExpiry <= 90 ? `${item.daysToExpiry} days` :
                             `${Math.floor(item.daysToExpiry / 30)} months`}
                          </div>
                          <p className="text-xs text-gray-500">{item.expiryDate}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(item.status)}`}>
                          <div className={`w-2 h-2 rounded-full ${
                            item.status === 'Active' ? 'bg-green-400' :
                            item.status === 'Inactive' ? 'bg-gray-400' :
                            item.status === 'Discontinued' ? 'bg-red-400' :
                            'bg-yellow-400'
                          }`}></div>
                          {item.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => {
                              setSelectedItem(item);
                              setShowViewModal(true);
                            }}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setEditingItem(item);
                              setFormData(item);
                              setShowAddModal(true);
                            }}
                            className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                            title="Edit Item"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedItem(item);
                              setShowTransferModal(true);
                            }}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            title="Transfer Stock"
                          >
                            <Truck className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedItem(item);
                              setAdjustmentData({ type: 'add', quantity: 0 });
                              setShowStockAdjustmentModal(true);
                            }}
                            className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                            title="Adjust Stock"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                          <div className="relative group">
                            <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                              <MoreVertical className="w-4 h-4" />
                            </button>
                            <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                              <button
                                onClick={() => handleUpdateStatus(item.id, 'Active')}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                Mark as Active
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(item.id, 'Inactive')}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                Mark as Inactive
                              </button>
                              <button
                                onClick={() => handleUpdateStatus(item.id, 'Discontinued')}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                Discontinue Item
                              </button>
                              <hr className="my-1" />
                              <button
                                onClick={() => handleDeleteItem(item.id)}
                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                              >
                                Delete Item
                              </button>
                            </div>
                          </div>
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
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedItems.length)} of {sortedItems.length} results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
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
                <ChevronRight className="w-4 h-4" />
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

      {/* Add/Edit Item Modal */}
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
                    {editingItem ? 'Edit Stock Item' : 'Add New Stock Item'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingItem(null);
                      setFormData({});
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
                      <input
                        type="text"
                        value={formData.itemName || ''}
                        onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter item name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                      <input
                        type="text"
                        value={formData.sku || ''}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter SKU"
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
                      <input
                        type="text"
                        value={formData.unit || ''}
                        onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="e.g., Tablets, Capsules, Vials"
                        required
                      />
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">QR Code</label>
                      <input
                        type="text"
                        value={formData.qrCode || ''}
                        onChange={(e) => setFormData({ ...formData, qrCode: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter QR code"
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
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
                      <input
                        type="text"
                        value={formData.batchNumber || ''}
                        onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter batch number"
                      />
                    </div>
                  </div>
                </div>

                {/* Stock Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Stock Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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

                {/* Pricing */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Pricing</h3>
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
                  </div>
                </div>

                {/* Supplier Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Supplier Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Name *</label>
                      <input
                        type="text"
                        value={formData.supplier || ''}
                        onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter supplier name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Contact</label>
                      <input
                        type="tel"
                        value={formData.supplierContact || ''}
                        onChange={(e) => setFormData({ ...formData, supplierContact: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter contact number"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Email</label>
                      <input
                        type="email"
                        value={formData.supplierEmail || ''}
                        onChange={(e) => setFormData({ ...formData, supplierEmail: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Frequency</label>
                      <select
                        value={formData.reorderFrequency || ''}
                        onChange={(e) => setFormData({ ...formData, reorderFrequency: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                      >
                        <option value="">Select frequency</option>
                        <option value="Daily">Daily</option>
                        <option value="Weekly">Weekly</option>
                        <option value="Bi-weekly">Bi-weekly</option>
                        <option value="Monthly">Monthly</option>
                        <option value="Quarterly">Quarterly</option>
                        <option value="As needed">As needed</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Storage Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Storage Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Storage Location</label>
                      <input
                        type="text"
                        value={formData.storageLocation || ''}
                        onChange={(e) => setFormData({ ...formData, storageLocation: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="e.g., Aisle 1, Shelf A"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Storage Zone</label>
                      <input
                        type="text"
                        value={formData.storageZone || ''}
                        onChange={(e) => setFormData({ ...formData, storageZone: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="e.g., Zone A"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Warehouse</label>
                      <input
                        type="text"
                        value={formData.warehouse || ''}
                        onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="e.g., Main Warehouse"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Temperature Requirements</label>
                      <input
                        type="text"
                        value={formData.temperature || ''}
                        onChange={(e) => setFormData({ ...formData, temperature: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="e.g., Room Temperature, 2-8°C"
                      />
                    </div>
                  </div>
                </div>

                {/* Dates */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Important Dates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturing Date</label>
                      <input
                        type="date"
                        value={formData.manufacturingDate || ''}
                        onChange={(e) => setFormData({ ...formData, manufacturingDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                      <input
                        type="date"
                        value={formData.expiryDate || ''}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Restocked</label>
                      <input
                        type="date"
                        value={formData.lastRestocked || ''}
                        onChange={(e) => setFormData({ ...formData, lastRestocked: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Quality Check</label>
                      <input
                        type="date"
                        value={formData.lastQualityCheck || ''}
                        onChange={(e) => setFormData({ ...formData, lastQualityCheck: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                      <textarea
                        value={formData.notes || ''}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter any additional notes"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Internal Notes</label>
                      <textarea
                        value={formData.internalNotes || ''}
                        onChange={(e) => setFormData({ ...formData, internalNotes: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Internal notes for staff"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.lightSensitive || false}
                          onChange={(e) => setFormData({ ...formData, lightSensitive: e.target.checked })}
                          className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                        />
                        <label className="text-sm text-gray-700">Light Sensitive</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.rfidEnabled || false}
                          onChange={(e) => setFormData({ ...formData, rfidEnabled: e.target.checked })}
                          className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                        />
                        <label className="text-sm text-gray-700">RFID Enabled</label>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.barcodeEnabled !== false}
                          onChange={(e) => setFormData({ ...formData, barcodeEnabled: e.target.checked })}
                          className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                        />
                        <label className="text-sm text-gray-700">Barcode Enabled</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingItem(null);
                    setFormData({});
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingItem ? handleEditItem : handleAddItem}
                  className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors"
                >
                  {editingItem ? 'Update Item' : 'Add Item'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stock Adjustment Modal */}
      <AnimatePresence>
        {showStockAdjustmentModal && (
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
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Stock Adjustment</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Adjustment Type</label>
                  <select
                    value={adjustmentData.type || 'add'}
                    onChange={(e) => setAdjustmentData({ ...adjustmentData, type: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  >
                    <option value="add">Add Stock</option>
                    <option value="remove">Remove Stock</option>
                    <option value="adjust">Adjust to Specific Level</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {adjustmentData.type === 'adjust' ? 'New Stock Level' : 'Quantity'}
                  </label>
                  <input
                    type="number"
                    value={adjustmentData.quantity || ''}
                    onChange={(e) => setAdjustmentData({ ...adjustmentData, quantity: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    placeholder="Enter quantity"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reason</label>
                  <textarea
                    value={adjustmentData.reason || ''}
                    onChange={(e) => setAdjustmentData({ ...adjustmentData, reason: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    placeholder="Enter reason for adjustment"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowStockAdjustmentModal(false);
                    setAdjustmentData({});
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleStockAdjustment}
                  disabled={!adjustmentData.quantity}
                  className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Adjust Stock
                </button>
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
                Are you sure you want to {bulkAction} {selectedItems.length} item{selectedItems.length > 1 ? 's' : ''}?
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
                  {bulkAction === 'delete' ? 'Delete' : 
                   bulkAction === 'activate' ? 'Activate' :
                   bulkAction === 'deactivate' ? 'Deactivate' : 'Confirm'}
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
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Import Stock Items</h2>
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
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Export Stock Items</h2>
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

export default StockManagementEnhanced;
