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
  Heart,
  FileText,
  Save,
  X,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  ShoppingCart,
  Shield,
  Zap,
  Activity,
  Droplets
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV } from '../../../utils/exportUtils';

const FirstAid = () => {
  const [firstAidItems, setFirstAidItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    stockLevel: '',
    brand: ''
  });

  // Mock data
  const mockFirstAidItems = [
    {
      id: 1,
      name: 'Adhesive Bandages',
      brand: 'FirstAid Pro',
      category: 'Bandages',
      barcode: '7778889990001',
      batchNumber: 'FA001',
      expiryDate: '2025-06-30',
      unitPrice: 2.99,
      sellingPrice: 4.99,
      currentStock: 200,
      minStockLevel: 50,
      maxStockLevel: 500,
      reorderLevel: 100,
      unit: 'Boxes',
      description: 'Sterile adhesive bandages for minor cuts and wounds',
      specifications: 'Size: 1" x 3", Sterile, Latex-free',
      usage: 'For minor cuts, scrapes, and wounds',
      storage: 'Store in cool, dry place',
      status: 'Active',
      lastRestocked: '2024-02-10',
      supplier: 'FirstAid Supply Inc.',
      sterile: true,
      waterproof: false,
      size: 'Standard',
      quantityPerBox: 100
    },
    {
      id: 2,
      name: 'Antiseptic Wipes',
      brand: 'CleanCare',
      category: 'Antiseptics',
      barcode: '7778889990002',
      batchNumber: 'FA002',
      expiryDate: '2024-12-31',
      unitPrice: 8.99,
      sellingPrice: 12.99,
      currentStock: 85,
      minStockLevel: 30,
      maxStockLevel: 200,
      reorderLevel: 60,
      unit: 'Canisters',
      description: 'Alcohol-based antiseptic wipes for wound cleaning',
      specifications: '70% Isopropyl alcohol, 40 wipes per canister',
      usage: 'For cleaning minor wounds and skin preparation',
      storage: 'Store at room temperature',
      status: 'Active',
      lastRestocked: '2024-02-05',
      supplier: 'CleanSupply Ltd.',
      sterile: true,
      waterproof: false,
      size: 'Standard',
      quantityPerCanister: 40
    },
    {
      id: 3,
      name: 'Medical Gloves',
      brand: 'SafeHands',
      category: 'Protective Equipment',
      barcode: '7778889990003',
      batchNumber: 'FA003',
      expiryDate: '2025-09-30',
      unitPrice: 12.99,
      sellingPrice: 18.99,
      currentStock: 150,
      minStockLevel: 40,
      maxStockLevel: 300,
      reorderLevel: 80,
      unit: 'Boxes',
      description: 'Disposable medical examination gloves',
      specifications: 'Latex-free, Powder-free, Size: Large',
      usage: 'For medical examinations and procedures',
      storage: 'Store in cool, dry place',
      status: 'Active',
      lastRestocked: '2024-02-15',
      supplier: 'SafeSupply Inc.',
      sterile: true,
      waterproof: true,
      size: 'Large',
      quantityPerBox: 100
    },
    {
      id: 4,
      name: 'Gauze Pads',
      brand: 'WoundCare',
      category: 'Dressings',
      barcode: '7778889990004',
      batchNumber: 'FA004',
      expiryDate: '2026-03-15',
      unitPrice: 6.99,
      sellingPrice: 10.99,
      currentStock: 120,
      minStockLevel: 35,
      maxStockLevel: 250,
      reorderLevel: 70,
      unit: 'Packages',
      description: 'Sterile gauze pads for wound dressing',
      specifications: 'Size: 4" x 4", 8-ply, Sterile',
      usage: 'For wound dressing and absorption',
      storage: 'Store in cool, dry place',
      status: 'Active',
      lastRestocked: '2024-02-20',
      supplier: 'WoundSupply Ltd.',
      sterile: true,
      waterproof: false,
      size: '4" x 4"',
      quantityPerPackage: 25
    },
    {
      id: 5,
      name: 'Medical Tape',
      brand: 'TapePro',
      category: 'Tapes',
      barcode: '7778889990005',
      batchNumber: 'FA005',
      expiryDate: '2025-08-31',
      unitPrice: 4.99,
      sellingPrice: 7.99,
      currentStock: 45,
      minStockLevel: 20,
      maxStockLevel: 150,
      reorderLevel: 40,
      unit: 'Rolls',
      description: 'Medical-grade adhesive tape for securing dressings',
      specifications: 'Width: 1", Length: 10 yards, Hypoallergenic',
      usage: 'For securing bandages and dressings',
      storage: 'Store at room temperature',
      status: 'Active',
      lastRestocked: '2024-02-08',
      supplier: 'TapeSupply Inc.',
      sterile: false,
      waterproof: false,
      size: '1" x 10 yards',
      quantityPerRoll: 1
    },
    {
      id: 6,
      name: 'Instant Cold Pack',
      brand: 'ColdCare',
      category: 'Cold Therapy',
      barcode: '7778889990006',
      batchNumber: 'FA006',
      expiryDate: '2024-11-30',
      unitPrice: 3.99,
      sellingPrice: 6.99,
      currentStock: 30,
      minStockLevel: 15,
      maxStockLevel: 100,
      reorderLevel: 25,
      unit: 'Boxes',
      description: 'Single-use instant cold packs for injuries',
      specifications: 'Size: 5" x 6", Activates by squeezing',
      usage: 'For sprains, strains, and swelling',
      storage: 'Store at room temperature',
      status: 'Active',
      lastRestocked: '2024-02-12',
      supplier: 'ColdSupply Ltd.',
      sterile: false,
      waterproof: false,
      size: '5" x 6"',
      quantityPerBox: 10
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setFirstAidItems(mockFirstAidItems);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredItems = firstAidItems.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.barcode.includes(searchTerm) ||
                         item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filters.category || item.category === filters.category;
    const matchesStatus = !filters.status || item.status === filters.status;
    const matchesStockLevel = !filters.stockLevel || 
      (filters.stockLevel === 'low' && item.currentStock <= item.minStockLevel) ||
      (filters.stockLevel === 'critical' && item.currentStock <= item.reorderLevel) ||
      (filters.stockLevel === 'normal' && item.currentStock > item.reorderLevel);
    const matchesBrand = !filters.brand || item.brand === filters.brand;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesStockLevel && matchesBrand;
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
    if (window.confirm('Are you sure you want to delete this first aid item?')) {
      setFirstAidItems(firstAidItems.filter(i => i.id !== itemId));
    }
  };

  const handleSaveItem = (itemData) => {
    if (editingItem) {
      // Update existing item
      setFirstAidItems(firstAidItems.map(i => 
        i.id === editingItem.id ? { ...i, ...itemData } : i
      ));
    } else {
      // Add new item
      const newItem = {
        id: Math.max(...firstAidItems.map(i => i.id)) + 1,
        ...itemData,
        lastRestocked: new Date().toISOString().slice(0, 10)
      };
      setFirstAidItems([...firstAidItems, newItem]);
    }
    setShowAddModal(false);
    setEditingItem(null);
  };

  const handleExport = (format) => {
    const data = filteredItems;
    const columns = [
      { key: 'name', label: 'Item Name' },
      { key: 'brand', label: 'Brand' },
      { key: 'category', label: 'Category' },
      { key: 'barcode', label: 'Barcode' },
      { key: 'batchNumber', label: 'Batch Number' },
      { key: 'expiryDate', label: 'Expiry Date' },
      { key: 'currentStock', label: 'Current Stock' },
      { key: 'unitPrice', label: 'Unit Price' },
      { key: 'sellingPrice', label: 'Selling Price' },
      { key: 'status', label: 'Status' },
      { key: 'supplier', label: 'Supplier' },
      { key: 'sterile', label: 'Sterile' }
    ];

    switch (format) {
      case 'pdf':
        exportToPDF(data, 'First Aid Supplies Report', columns);
        break;
      case 'word':
        exportToWord(data, 'First Aid Supplies Report', columns);
        break;
      case 'csv':
        exportToCSV(data, 'first-aid-supplies');
        break;
      default:
        break;
    }
  };

  const getStockStatus = (item) => {
    if (item.currentStock <= item.minStockLevel) return 'critical';
    if (item.currentStock <= item.reorderLevel) return 'low';
    return 'normal';
  };

  const totalItems = filteredItems.length;
  const lowStock = filteredItems.filter(i => getStockStatus(i) === 'low').length;
  const criticalStock = filteredItems.filter(i => getStockStatus(i) === 'critical').length;
  const totalValue = filteredItems.reduce((sum, i) => sum + (i.currentStock * i.unitPrice), 0);
  const sterileItems = filteredItems.filter(i => i.sterile).length;

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
            <h1 className="text-3xl font-bold text-gray-900">First Aid Supplies</h1>
            <p className="text-gray-600 mt-1">Manage first aid supplies and emergency medical items</p>
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
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Heart className="w-6 h-6 text-blue-600" />
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
                <p className="text-sm text-gray-600">Sterile Items</p>
                <p className="text-2xl font-bold text-purple-600">{sterileItems}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <Shield className="w-6 h-6 text-purple-600" />
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
                  placeholder="Search first aid items by name, brand, barcode..."
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
                <option value="Bandages">Bandages</option>
                <option value="Antiseptics">Antiseptics</option>
                <option value="Protective Equipment">Protective Equipment</option>
                <option value="Dressings">Dressings</option>
                <option value="Tapes">Tapes</option>
                <option value="Cold Therapy">Cold Therapy</option>
                <option value="Hot Therapy">Hot Therapy</option>
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
                value={filters.brand}
                onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              >
                <option value="">All Brands</option>
                <option value="FirstAid Pro">FirstAid Pro</option>
                <option value="CleanCare">CleanCare</option>
                <option value="SafeHands">SafeHands</option>
                <option value="WoundCare">WoundCare</option>
              </select>
              
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
                <option value="Discontinued">Discontinued</option>
              </select>
            </div>
          )}
        </div>

        {/* First Aid Items Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selling Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredItems.map((item) => {
                  const stockStatus = getStockStatus(item);
                  return (
                    <tr key={item.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{item.name}</div>
                          <div className="text-sm text-gray-500">{item.brand}</div>
                          <div className="text-xs text-gray-400">{item.barcode}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${
                            stockStatus === 'critical' ? 'text-red-600' :
                            stockStatus === 'low' ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {item.currentStock} {item.unit}
                          </span>
                          {stockStatus !== 'normal' && (
                            <AlertTriangle className="w-4 h-4 ml-2 text-yellow-500" />
                          )}
                        </div>
                        <div className="text-xs text-gray-500">Min: {item.minStockLevel}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.unitPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${item.sellingPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        <div className={`text-sm ${
                          new Date(item.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) 
                            ? 'text-red-600 font-medium' : 'text-gray-900'
                        }`}>
                          {new Date(item.expiryDate).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          item.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : item.status === 'Inactive'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {item.status}
                        </span>
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
        <FirstAidModal
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
        <ViewFirstAidModal
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

// First Aid Modal Component
const FirstAidModal = ({ item, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: item?.name || '',
    brand: item?.brand || '',
    category: item?.category || '',
    barcode: item?.barcode || '',
    batchNumber: item?.batchNumber || '',
    expiryDate: item?.expiryDate || '',
    unitPrice: item?.unitPrice || 0,
    sellingPrice: item?.sellingPrice || 0,
    currentStock: item?.currentStock || 0,
    minStockLevel: item?.minStockLevel || 10,
    maxStockLevel: item?.maxStockLevel || 100,
    reorderLevel: item?.reorderLevel || 20,
    unit: item?.unit || 'Units',
    description: item?.description || '',
    specifications: item?.specifications || '',
    usage: item?.usage || '',
    storage: item?.storage || '',
    status: item?.status || 'Active',
    supplier: item?.supplier || '',
    sterile: item?.sterile || false,
    waterproof: item?.waterproof || false,
    size: item?.size || '',
    quantityPerUnit: item?.quantityPerUnit || 1,
    image: item?.image || null
  });

  const [imagePreview, setImagePreview] = useState(item?.image || null);

  const handleImageChange = (e) => {
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
              {item ? 'Edit First Aid Item' : 'Add New First Aid Item'}
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
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Brand *</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
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
                    <option value="Bandages">Bandages</option>
                    <option value="Antiseptics">Antiseptics</option>
                    <option value="Protective Equipment">Protective Equipment</option>
                    <option value="Dressings">Dressings</option>
                    <option value="Tapes">Tapes</option>
                    <option value="Cold Therapy">Cold Therapy</option>
                    <option value="Hot Therapy">Hot Therapy</option>
                  </select>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Batch Number</label>
                  <input
                    type="text"
                    value={formData.batchNumber}
                    onChange={(e) => setFormData({ ...formData, batchNumber: e.target.value })}
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
                    <option value="Boxes">Boxes</option>
                    <option value="Canisters">Canisters</option>
                    <option value="Packages">Packages</option>
                    <option value="Rolls">Rolls</option>
                    <option value="Units">Units</option>
                    <option value="Bottles">Bottles</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img src={imagePreview} alt="Preview" className="w-full h-32 object-cover rounded-lg" />
                    </div>
                  )}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                  <input
                    type="date"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
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
                    <option value="Discontinued">Discontinued</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Usage Instructions</label>
                  <textarea
                    value={formData.usage}
                    onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Storage Instructions</label>
                  <textarea
                    value={formData.storage}
                    onChange={(e) => setFormData({ ...formData, storage: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Size</label>
                  <input
                    type="text"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity Per Unit</label>
                  <input
                    type="number"
                    value={formData.quantityPerUnit}
                    onChange={(e) => setFormData({ ...formData, quantityPerUnit: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.sterile}
                      onChange={(e) => setFormData({ ...formData, sterile: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Sterile</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.waterproof}
                      onChange={(e) => setFormData({ ...formData, waterproof: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Waterproof</span>
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
              {item ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// View First Aid Modal Component
const ViewFirstAidModal = ({ item, onClose }) => {
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
            <h2 className="text-xl font-bold text-gray-900">First Aid Item Details</h2>
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
                  <div className="font-medium">{item.name}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Brand:</span>
                  <div className="font-medium">{item.brand}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Category:</span>
                  <div className="font-medium">{item.category}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Barcode:</span>
                  <div className="font-medium">{item.barcode}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Batch Number:</span>
                  <div className="font-medium">{item.batchNumber}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Unit:</span>
                  <div className="font-medium">{item.unit}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock & Pricing</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Current Stock:</span>
                  <div className="font-medium text-lg">{item.currentStock} {item.unit}</div>
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
                  <span className="text-sm text-gray-600">Unit Price:</span>
                  <div className="font-medium">${item.unitPrice.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Selling Price:</span>
                  <div className="font-medium">${item.sellingPrice.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Expiry Date:</span>
                  <div className={`font-medium ${
                    new Date(item.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) 
                      ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {new Date(item.expiryDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Item Information</h3>
              <div className="space-y-3">
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
                <div>
                  <span className="text-sm text-gray-600">Supplier:</span>
                  <div className="font-medium">{item.supplier}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Last Restocked:</span>
                  <div className="font-medium">{new Date(item.lastRestocked).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Size:</span>
                  <div className="font-medium">{item.size}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Quantity Per Unit:</span>
                  <div className="font-medium">{item.quantityPerUnit}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Properties:</span>
                  <div className="flex items-center gap-2 mt-1">
                    {item.sterile && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                        <Shield className="w-3 h-3 mr-1" />
                        Sterile
                      </span>
                    )}
                    {item.waterproof && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                        <Droplet className="w-3 h-3 mr-1" />
                        Waterproof
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
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Details</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Description:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{item.description}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Specifications:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{item.specifications}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Usage Instructions:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{item.usage}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Storage Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Storage Instructions:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{item.storage}</div>
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

export default FirstAid;
