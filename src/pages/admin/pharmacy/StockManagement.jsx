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
  FileText,
  Save,
  X,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  ShoppingCart,
  RefreshCw,
  ArrowUp,
  ArrowDown,
  Activity,
  Zap,
  Truck
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV } from '../../../utils/exportUtils';

const StockManagement = () => {
  const [stockItems, setStockItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    stockLevel: '',
    supplier: '',
    expiryStatus: ''
  });

  // Mock data
  const mockStockItems = [
    {
      id: 1,
      itemName: 'Paracetamol 500mg',
      category: 'Medicines',
      sku: 'MED-001',
      barcode: '1234567890123',
      currentStock: 150,
      minStockLevel: 50,
      maxStockLevel: 500,
      reorderLevel: 75,
      unit: 'Tablets',
      unitPrice: 2.50,
      sellingPrice: 3.75,
      totalValue: 562.50,
      supplier: 'MediSupply Inc.',
      lastRestocked: '2024-02-15',
      expiryDate: '2025-12-31',
      daysToExpiry: 307,
      stockTurnover: 2.5,
      reorderFrequency: 'Monthly',
      storageLocation: 'Aisle 1, Shelf A',
      batchNumber: 'BATCH001',
      status: 'Active',
      lowStockAlert: false,
      expiryAlert: false
    },
    {
      id: 2,
      itemName: 'Amoxicillin 250mg',
      category: 'Medicines',
      sku: 'MED-002',
      barcode: '2345678901234',
      currentStock: 45,
      minStockLevel: 30,
      maxStockLevel: 200,
      reorderLevel: 60,
      unit: 'Capsules',
      unitPrice: 8.50,
      sellingPrice: 12.75,
      totalValue: 382.50,
      supplier: 'PharmaSupply Ltd.',
      lastRestocked: '2024-02-10',
      expiryDate: '2024-08-31',
      daysToExpiry: 185,
      stockTurnover: 1.8,
      reorderFrequency: 'Bi-weekly',
      storageLocation: 'Aisle 1, Shelf B',
      batchNumber: 'BATCH002',
      status: 'Active',
      lowStockAlert: true,
      expiryAlert: false
    },
    {
      id: 3,
      itemName: 'Vitamin D3 1000 IU',
      category: 'Supplements',
      sku: 'SUP-001',
      barcode: '9876543210123',
      currentStock: 200,
      minStockLevel: 50,
      maxStockLevel: 500,
      reorderLevel: 100,
      unit: 'Softgels',
      unitPrice: 12.99,
      sellingPrice: 19.99,
      totalValue: 2598.00,
      supplier: 'NutriSupply Inc.',
      lastRestocked: '2024-02-10',
      expiryDate: '2025-06-30',
      daysToExpiry: 488,
      stockTurnover: 3.2,
      reorderFrequency: 'Monthly',
      storageLocation: 'Aisle 2, Shelf A',
      batchNumber: 'SUP001',
      status: 'Active',
      lowStockAlert: false,
      expiryAlert: false
    },
    {
      id: 4,
      itemName: 'Digital Blood Pressure Monitor',
      category: 'Medical Devices',
      sku: 'DEV-001',
      barcode: '5556667778881',
      currentStock: 25,
      minStockLevel: 10,
      maxStockLevel: 50,
      reorderLevel: 20,
      unit: 'Units',
      unitPrice: 89.99,
      sellingPrice: 149.99,
      totalValue: 2249.75,
      supplier: 'MedicalSupply Inc.',
      lastRestocked: '2024-02-15',
      expiryDate: '2026-01-15',
      daysToExpiry: 687,
      stockTurnover: 1.5,
      reorderFrequency: 'Quarterly',
      storageLocation: 'Aisle 3, Shelf A',
      batchNumber: 'DEV001',
      status: 'Active',
      lowStockAlert: false,
      expiryAlert: false
    },
    {
      id: 5,
      itemName: 'Adhesive Bandages',
      category: 'First Aid',
      sku: 'FA-001',
      barcode: '7778889990001',
      currentStock: 80,
      minStockLevel: 50,
      maxStockLevel: 200,
      reorderLevel: 100,
      unit: 'Boxes',
      unitPrice: 2.99,
      sellingPrice: 4.99,
      totalValue: 239.20,
      supplier: 'FirstAid Supply Inc.',
      lastRestocked: '2024-02-10',
      expiryDate: '2024-06-30',
      daysToExpiry: 123,
      stockTurnover: 2.8,
      reorderFrequency: 'Monthly',
      storageLocation: 'Aisle 4, Shelf A',
      batchNumber: 'FA001',
      status: 'Active',
      lowStockAlert: false,
      expiryAlert: true
    },
    {
      id: 6,
      itemName: 'Omega-3 Fish Oil',
      category: 'Supplements',
      sku: 'SUP-002',
      barcode: '9876543210124',
      currentStock: 15,
      minStockLevel: 40,
      maxStockLevel: 200,
      reorderLevel: 80,
      unit: 'Softgels',
      unitPrice: 24.99,
      sellingPrice: 34.99,
      totalValue: 374.85,
      supplier: 'MarineSupply Ltd.',
      lastRestocked: '2024-02-15',
      expiryDate: '2025-09-30',
      daysToExpiry: 580,
      stockTurnover: 1.2,
      reorderFrequency: 'Monthly',
      storageLocation: 'Aisle 2, Shelf B',
      batchNumber: 'SUP002',
      status: 'Active',
      lowStockAlert: true,
      expiryAlert: false
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStockItems(mockStockItems);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredStockItems = stockItems.filter(item => {
    const matchesSearch = item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.barcode.includes(searchTerm) ||
                         item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filters.category || item.category === filters.category;
    const matchesStockLevel = !filters.stockLevel || 
      (filters.stockLevel === 'low' && item.currentStock <= item.minStockLevel) ||
      (filters.stockLevel === 'critical' && item.currentStock <= item.reorderLevel) ||
      (filters.stockLevel === 'normal' && item.currentStock > item.reorderLevel) ||
      (filters.stockLevel === 'overstock' && item.currentStock >= item.maxStockLevel);
    const matchesSupplier = !filters.supplier || item.supplier === filters.supplier;
    const matchesExpiryStatus = !filters.expiryStatus ||
      (filters.expiryStatus === 'expired' && item.daysToExpiry < 0) ||
      (filters.expiryStatus === 'expiring-soon' && item.daysToExpiry > 0 && item.daysToExpiry <= 90) ||
      (filters.expiryStatus === 'good' && item.daysToExpiry > 90);
    
    return matchesSearch && matchesCategory && matchesStockLevel && matchesSupplier && matchesExpiryStatus;
  });

  const handleAddItem = () => {
    setEditingItem(null);
    setShowAddModal(true);
  };

  const handleEditItem = (item) => {
    setEditingItem(item);
    setShowAddModal(true);
  };

  const handleViewItem = (item) => {
    setSelectedItem(item);
    setShowViewModal(true);
  };

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Are you sure you want to delete this stock item?')) {
      setStockItems(stockItems.filter(i => i.id !== itemId));
    }
  };

  const handleSaveItem = (itemData) => {
    if (editingItem) {
      // Update existing item
      setStockItems(stockItems.map(i => 
        i.id === editingItem.id ? { ...i, ...itemData } : i
      ));
    } else {
      // Add new item
      const newItem = {
        id: Math.max(...stockItems.map(i => i.id)) + 1,
        ...itemData,
        lastRestocked: new Date().toISOString().slice(0, 10)
      };
      setStockItems([...stockItems, newItem]);
    }
    setShowAddModal(false);
    setEditingItem(null);
  };

  const handleExport = (format) => {
    const data = filteredStockItems;
    const columns = [
      { key: 'itemName', label: 'Item Name' },
      { key: 'category', label: 'Category' },
      { key: 'sku', label: 'SKU' },
      { key: 'currentStock', label: 'Current Stock' },
      { key: 'minStockLevel', label: 'Min Stock' },
      { key: 'maxStockLevel', label: 'Max Stock' },
      { key: 'unitPrice', label: 'Unit Price' },
      { key: 'totalValue', label: 'Total Value' },
      { key: 'supplier', label: 'Supplier' },
      { key: 'expiryDate', label: 'Expiry Date' },
      { key: 'stockTurnover', label: 'Stock Turnover' }
    ];

    switch (format) {
      case 'pdf':
        exportToPDF(data, 'Stock Management Report', columns);
        break;
      case 'word':
        exportToWord(data, 'Stock Management Report', columns);
        break;
      case 'csv':
        exportToCSV(data, 'stock-management');
        break;
      default:
        break;
    }
  };

  const getStockStatus = (item) => {
    if (item.currentStock <= item.minStockLevel) return 'critical';
    if (item.currentStock <= item.reorderLevel) return 'low';
    if (item.currentStock >= item.maxStockLevel) return 'overstock';
    return 'normal';
  };

  const getExpiryStatus = (daysToExpiry) => {
    if (daysToExpiry < 0) return 'expired';
    if (daysToExpiry <= 30) return 'expiring-soon';
    if (daysToExpiry <= 90) return 'expiring-soon';
    return 'good';
  };

  const totalItems = filteredStockItems.length;
  const lowStockItems = filteredStockItems.filter(i => getStockStatus(i) === 'low').length;
  const criticalStockItems = filteredStockItems.filter(i => getStockStatus(i) === 'critical').length;
  const overstockItems = filteredStockItems.filter(i => getStockStatus(i) === 'overstock').length;
  const expiringSoonItems = filteredStockItems.filter(i => getExpiryStatus(i.daysToExpiry) === 'expiring-soon').length;
  const expiredItems = filteredStockItems.filter(i => getExpiryStatus(i.daysToExpiry) === 'expired').length;
  const totalValue = filteredStockItems.reduce((sum, i) => sum + i.totalValue, 0);
  const averageTurnover = filteredStockItems.reduce((sum, i) => sum + i.stockTurnover, 0) / filteredStockItems.length;

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
            <h1 className="text-3xl font-bold text-gray-900">Stock Management</h1>
            <p className="text-gray-600 mt-1">Monitor and manage pharmacy inventory levels</p>
          </div>
          <button
            onClick={handleAddItem}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
          >
            <Plus className="w-5 h-5" />
            Add Item
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Total Items</p>
                <p className="text-xl font-bold text-gray-900">{totalItems}</p>
              </div>
              <div className="p-2 bg-blue-100 rounded-lg">
                <Package className="w-4 h-4 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Low Stock</p>
                <p className="text-xl font-bold text-yellow-600">{lowStockItems}</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <AlertTriangle className="w-4 h-4 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Critical</p>
                <p className="text-xl font-bold text-red-600">{criticalStockItems}</p>
              </div>
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Overstock</p>
                <p className="text-xl font-bold text-purple-600">{overstockItems}</p>
              </div>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Package className="w-4 h-4 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Expiring Soon</p>
                <p className="text-xl font-bold text-orange-600">{expiringSoonItems}</p>
              </div>
              <div className="p-2 bg-orange-100 rounded-lg">
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Total Value</p>
                <p className="text-xl font-bold text-green-600">${totalValue.toFixed(0)}</p>
              </div>
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-4 h-4 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Stock Turnover</h3>
              <Activity className="w-5 h-5 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">{averageTurnover.toFixed(1)}</div>
            <div className="text-sm text-gray-600 mt-1">Average turnover rate</div>
            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">High turnover (&gt;3):</span>
                <span className="font-medium">{filteredStockItems.filter(i => i.stockTurnover > 3).length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Normal (1-3):</span>
                <span className="font-medium">{filteredStockItems.filter(i => i.stockTurnover >= 1 && i.stockTurnover <= 3).length}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Low (&lt;1):</span>
                <span className="font-medium">{filteredStockItems.filter(i => i.stockTurnover < 1).length}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Category Distribution</h3>
              <BarChart3 className="w-5 h-5 text-green-600" />
            </div>
            <div className="space-y-3">
              {['Medicines', 'Supplements', 'Medical Devices', 'First Aid'].map(category => {
                const count = filteredStockItems.filter(i => i.category === category).length;
                const percentage = (count / filteredStockItems.length) * 100;
                return (
                  <div key={category} className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{category}</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] h-2 rounded-full"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12 text-right">{count}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Quick Actions</h3>
              <Zap className="w-5 h-5 text-purple-600" />
            </div>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100">
                <span className="text-sm font-medium text-red-700">Reorder Critical Items</span>
                <span className="bg-red-600 text-white text-xs px-2 py-1 rounded-full">{criticalStockItems}</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg hover:bg-yellow-100">
                <span className="text-sm font-medium text-yellow-700">Review Low Stock</span>
                <span className="bg-yellow-600 text-white text-xs px-2 py-1 rounded-full">{lowStockItems}</span>
              </button>
              <button className="w-full flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg hover:bg-orange-100">
                <span className="text-sm font-medium text-orange-700">Expiring Soon</span>
                <span className="bg-orange-600 text-white text-xs px-2 py-1 rounded-full">{expiringSoonItems}</span>
              </button>
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
                  placeholder="Search items by name, SKU, barcode..."
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
                <option value="Medicines">Medicines</option>
                <option value="Supplements">Supplements</option>
                <option value="Medical Devices">Medical Devices</option>
                <option value="First Aid">First Aid</option>
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
                <option value="overstock">Overstock</option>
              </select>
              
              <select
                value={filters.expiryStatus}
                onChange={(e) => setFilters({ ...filters, expiryStatus: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              >
                <option value="">All Expiry Status</option>
                <option value="good">Good</option>
                <option value="expiring-soon">Expiring Soon</option>
                <option value="expired">Expired</option>
              </select>
              
              <select
                value={filters.supplier}
                onChange={(e) => setFilters({ ...filters, supplier: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              >
                <option value="">All Suppliers</option>
                <option value="MediSupply Inc.">MediSupply Inc.</option>
                <option value="PharmaSupply Ltd.">PharmaSupply Ltd.</option>
                <option value="NutriSupply Inc.">NutriSupply Inc.</option>
                <option value="MedicalSupply Inc.">MedicalSupply Inc.</option>
              </select>
            </div>
          )}
        </div>

        {/* Stock Items Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Level</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Turnover</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredStockItems.map((item) => {
                  const stockStatus = getStockStatus(item);
                  const expiryStatus = getExpiryStatus(item.daysToExpiry);
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.itemName}</div>
                          <div className="text-sm text-gray-500">{item.sku}</div>
                          <div className="text-xs text-gray-400">{item.barcode}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-center">
                          <div className={`text-sm font-medium ${
                            stockStatus === 'critical' ? 'text-red-600' :
                            stockStatus === 'low' ? 'text-yellow-600' :
                            stockStatus === 'overstock' ? 'text-purple-600' : 'text-green-600'
                          }`}>
                            {item.currentStock} {item.unit}
                          </div>
                          <div className="text-xs text-gray-500">
                            Min: {item.minStockLevel} | Max: {item.maxStockLevel}
                          </div>
                          <div className="flex justify-center gap-1 mt-1">
                            {stockStatus !== 'normal' && (
                              <AlertTriangle className="w-3 h-3 text-yellow-500" />
                            )}
                            {stockStatus === 'overstock' && (
                              <Package className="w-3 h-3 text-purple-500" />
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">${item.totalValue.toFixed(2)}</div>
                        <div className="text-xs text-gray-500">${item.unitPrice.toFixed(2)} / {item.unit}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{item.stockTurnover.toFixed(1)}</div>
                        <div className="text-xs text-gray-500">{item.reorderFrequency}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className={`text-sm ${
                          expiryStatus === 'expired' ? 'text-red-600 font-medium' :
                          expiryStatus === 'expiring-soon' ? 'text-orange-600 font-medium' : 'text-gray-900'
                        }`}>
                          {new Date(item.expiryDate).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.daysToExpiry > 0 ? `${item.daysToExpiry} days` : 'Expired'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex gap-1">
                          {stockStatus !== 'normal' && (
                            <span className={`px-2 py-1 text-xs font-medium rounded ${
                              stockStatus === 'critical' ? 'bg-red-100 text-red-800' :
                              stockStatus === 'low' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-purple-100 text-purple-800'
                            }`}>
                              {stockStatus}
                            </span>
                          )}
                          {expiryStatus === 'expiring-soon' && (
                            <span className="px-2 py-1 text-xs font-medium rounded bg-orange-100 text-orange-800">
                              Expiring
                            </span>
                          )}
                          {expiryStatus === 'expired' && (
                            <span className="px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-800">
                              Expired
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <StockItemModal
          item={editingItem}
          onSave={handleSaveItem}
          onClose={() => {
            setShowAddModal(false);
            setEditingItem(null);
          }}
        />
      )}

      {/* View Modal */}
      {showViewModal && selectedItem && (
        <ViewStockItemModal
          item={selectedItem}
          onClose={() => {
            setShowViewModal(false);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
};

// Stock Item Modal Component
const StockItemModal = ({ item, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    itemName: item?.itemName || '',
    category: item?.category || '',
    sku: item?.sku || '',
    barcode: item?.barcode || '',
    currentStock: item?.currentStock || 0,
    minStockLevel: item?.minStockLevel || 10,
    maxStockLevel: item?.maxStockLevel || 100,
    reorderLevel: item?.reorderLevel || 20,
    unit: item?.unit || 'Units',
    unitPrice: item?.unitPrice || 0,
    sellingPrice: item?.sellingPrice || 0,
    supplier: item?.supplier || '',
    lastRestocked: item?.lastRestocked || '',
    expiryDate: item?.expiryDate || '',
    stockTurnover: item?.stockTurnover || 0,
    reorderFrequency: item?.reorderFrequency || 'Monthly',
    storageLocation: item?.storageLocation || '',
    batchNumber: item?.batchNumber || '',
    status: item?.status || 'Active'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalValue = formData.currentStock * formData.unitPrice;
    onSave({ ...formData, totalValue });
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
              {item ? 'Edit Stock Item' : 'Add New Stock Item'}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Item Name *</label>
                  <input
                    type="text"
                    value={formData.itemName}
                    onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
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
                    <option value="Medicines">Medicines</option>
                    <option value="Supplements">Supplements</option>
                    <option value="Medical Devices">Medical Devices</option>
                    <option value="First Aid">First Aid</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                  <input
                    type="text"
                    value={formData.sku}
                    onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  >
                    <option value="Tablets">Tablets</option>
                    <option value="Capsules">Capsules</option>
                    <option value="Softgels">Softgels</option>
                    <option value="Units">Units</option>
                    <option value="Boxes">Boxes</option>
                    <option value="Bottles">Bottles</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Discontinued">Discontinued</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Information</h3>
              <div className="space-y-4">
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Stock Turnover</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.stockTurnover}
                    onChange={(e) => setFormData({ ...formData, stockTurnover: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Frequency</label>
                  <select
                    value={formData.reorderFrequency}
                    onChange={(e) => setFormData({ ...formData, reorderFrequency: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Bi-weekly">Bi-weekly</option>
                    <option value="Monthly">Monthly</option>
                    <option value="Quarterly">Quarterly</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Supplier</h3>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supplier *</label>
                  <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Restocked</label>
                  <input
                    type="date"
                    value={formData.lastRestocked}
                    onChange={(e) => setFormData({ ...formData, lastRestocked: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Storage Location</label>
                  <input
                    type="text"
                    value={formData.storageLocation}
                    onChange={(e) => setFormData({ ...formData, storageLocation: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
                  <input
                    type="text"
                    value={formData.batchNumber}
                    onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
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
              {item ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// View Stock Item Modal Component
const ViewStockItemModal = ({ item, onClose }) => {
  const getStockStatus = (item) => {
    if (item.currentStock <= item.minStockLevel) return 'critical';
    if (item.currentStock <= item.reorderLevel) return 'low';
    if (item.currentStock >= item.maxStockLevel) return 'overstock';
    return 'normal';
  };

  const getExpiryStatus = (daysToExpiry) => {
    if (daysToExpiry < 0) return 'expired';
    if (daysToExpiry <= 30) return 'expiring-soon';
    if (daysToExpiry <= 90) return 'expiring-soon';
    return 'good';
  };

  const stockStatus = getStockStatus(item);
  const expiryStatus = getExpiryStatus(item.daysToExpiry);

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
            <h2 className="text-xl font-bold text-gray-900">Stock Item Details</h2>
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
                  <span className="text-sm text-gray-600">Item Name:</span>
                  <div className="font-medium">{item.itemName}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Category:</span>
                  <div className="font-medium">{item.category}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">SKU:</span>
                  <div className="font-medium">{item.sku}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Barcode:</span>
                  <div className="font-medium">{item.barcode}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Unit:</span>
                  <div className="font-medium">{item.unit}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                    item.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : item.status === 'Inactive'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {item.status}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Current Stock:</span>
                  <div className={`font-medium text-lg ${
                    stockStatus === 'critical' ? 'text-red-600' :
                    stockStatus === 'low' ? 'text-yellow-600' :
                    stockStatus === 'overstock' ? 'text-purple-600' : 'text-green-600'
                  }`}>
                    {item.currentStock} {item.unit}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Min Stock Level:</span>
                  <div className="font-medium">{item.minStockLevel} {item.unit}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Max Stock Level:</span>
                  <div className="font-medium">{item.maxStockLevel} {item.unit}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Reorder Level:</span>
                  <div className="font-medium">{item.reorderLevel} {item.unit}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Stock Turnover:</span>
                  <div className="font-medium">{item.stockTurnover.toFixed(1)}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Reorder Frequency:</span>
                  <div className="font-medium">{item.reorderFrequency}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Stock Status:</span>
                  <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
                    stockStatus === 'critical' ? 'bg-red-100 text-red-800' :
                    stockStatus === 'low' ? 'bg-yellow-100 text-yellow-800' :
                    stockStatus === 'overstock' ? 'bg-purple-100 text-purple-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {stockStatus}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Supplier</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Unit Price:</span>
                  <div className="font-medium">${item.unitPrice.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Selling Price:</span>
                  <div className="font-medium">${item.sellingPrice.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Total Value:</span>
                  <div className="font-medium text-lg">${item.totalValue.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Supplier:</span>
                  <div className="font-medium">{item.supplier}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Last Restocked:</span>
                  <div className="font-medium">{new Date(item.lastRestocked).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Expiry Date:</span>
                  <div className={`font-medium ${
                    expiryStatus === 'expired' ? 'text-red-600' :
                    expiryStatus === 'expiring-soon' ? 'text-orange-600' : 'text-gray-900'
                  }`}>
                    {new Date(item.expiryDate).toLocaleDateString()}
                  </div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Days to Expiry:</span>
                  <div className={`font-medium ${
                    expiryStatus === 'expired' ? 'text-red-600' :
                    expiryStatus === 'expiring-soon' ? 'text-orange-600' : 'text-gray-900'
                  }`}>
                    {item.daysToExpiry > 0 ? `${item.daysToExpiry} days` : 'Expired'}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Storage Location:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{item.storageLocation}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Batch Number:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{item.batchNumber}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Status Indicators</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Stock Alert:</span>
                    {stockStatus !== 'normal' && (
                      <span className={`px-2 py-1 text-xs font-medium rounded ${
                        stockStatus === 'critical' ? 'bg-red-100 text-red-800' :
                        stockStatus === 'low' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {stockStatus}
                      </span>
                    )}
                    {stockStatus === 'normal' && (
                      <span className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
                        Normal
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Expiry Alert:</span>
                    {expiryStatus === 'expiring-soon' && (
                      <span className="px-2 py-1 text-xs font-medium rounded bg-orange-100 text-orange-800">
                        Expiring Soon
                      </span>
                    )}
                    {expiryStatus === 'expired' && (
                      <span className="px-2 py-1 text-xs font-medium rounded bg-red-100 text-red-800">
                        Expired
                      </span>
                    )}
                    {expiryStatus === 'good' && (
                      <span className="px-2 py-1 text-xs font-medium rounded bg-green-100 text-green-800">
                        Good
                      </span>
                    )}
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

export default StockManagement;
