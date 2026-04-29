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
  Heart,
  Activity,
  Zap
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV } from '../../../utils/exportUtils';

const Supplements = () => {
  const [supplements, setSupplements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedSupplement, setSelectedSupplement] = useState(null);
  const [editingSupplement, setEditingSupplement] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    stockLevel: '',
    brand: ''
  });

  // Mock data
  const mockSupplements = [
    {
      id: 1,
      name: 'Vitamin D3 1000 IU',
      brand: 'NutriHealth',
      category: 'Vitamins',
      barcode: '9876543210123',
      batchNumber: 'SUP001',
      expiryDate: '2025-06-30',
      unitPrice: 12.99,
      sellingPrice: 19.99,
      currentStock: 200,
      minStockLevel: 50,
      maxStockLevel: 500,
      reorderLevel: 100,
      unit: 'Softgels',
      description: 'Vitamin D3 supplement for bone health',
      ingredients: 'Vitamin D3 (as cholecalciferol), olive oil, gelatin',
      dosage: '1 softgel daily with meal',
      benefits: 'Supports bone health, immune function, mood',
      sideEffects: 'Generally well tolerated',
      contraindications: 'Hypercalcemia',
      storage: 'Store in a cool, dry place',
      status: 'Active',
      lastRestocked: '2024-02-10',
      supplier: 'NutriSupply Inc.',
      prescriptionRequired: false,
      certified: true,
      organic: false,
      gmpCertified: true,
      allergenInfo: 'Contains gelatin',
      servingSize: '1 softgel',
      servingsPerContainer: 120
    },
    {
      id: 2,
      name: 'Omega-3 Fish Oil',
      brand: 'MarineHealth',
      category: 'Omega-3',
      barcode: '9876543210124',
      batchNumber: 'SUP002',
      expiryDate: '2025-09-30',
      unitPrice: 24.99,
      sellingPrice: 34.99,
      currentStock: 85,
      minStockLevel: 40,
      maxStockLevel: 200,
      reorderLevel: 80,
      unit: 'Softgels',
      description: 'High-purity fish oil supplement',
      ingredients: 'Fish oil, gelatin, glycerin, water',
      dosage: '2 softgels daily with meals',
      benefits: 'Heart health, brain function, joint support',
      sideEffects: 'Fishy aftertaste, mild digestive issues',
      contraindications: 'Fish allergy, blood thinners',
      storage: 'Refrigerate after opening',
      status: 'Active',
      lastRestocked: '2024-02-15',
      supplier: 'MarineSupply Ltd.',
      prescriptionRequired: false,
      certified: true,
      organic: false,
      gmpCertified: true,
      allergenInfo: 'Contains fish',
      servingSize: '2 softgels',
      servingsPerContainer: 90
    },
    {
      id: 3,
      name: 'Probiotic 50 Billion CFU',
      brand: 'GutHealth',
      category: 'Probiotics',
      barcode: '9876543210125',
      batchNumber: 'SUP003',
      expiryDate: '2024-12-31',
      unitPrice: 29.99,
      sellingPrice: 44.99,
      currentStock: 45,
      minStockLevel: 30,
      maxStockLevel: 150,
      reorderLevel: 60,
      unit: 'Capsules',
      description: 'Multi-strain probiotic supplement',
      ingredients: 'Multiple probiotic strains, cellulose capsule',
      dosage: '1 capsule daily',
      benefits: 'Digestive health, immune support, gut flora balance',
      sideEffects: 'Mild bloating initially',
      contraindications: 'Immunocompromised patients',
      storage: 'Refrigerate',
      status: 'Active',
      lastRestocked: '2024-02-05',
      supplier: 'GutSupply Inc.',
      prescriptionRequired: false,
      certified: true,
      organic: false,
      gmpCertified: true,
      allergenInfo: 'Dairy-free, gluten-free',
      servingSize: '1 capsule',
      servingsPerContainer: 60
    },
    {
      id: 4,
      name: 'Magnesium Glycinate 400mg',
      brand: 'MineralHealth',
      category: 'Minerals',
      barcode: '9876543210126',
      batchNumber: 'SUP004',
      expiryDate: '2026-02-28',
      unitPrice: 18.99,
      sellingPrice: 28.99,
      currentStock: 120,
      minStockLevel: 40,
      maxStockLevel: 300,
      reorderLevel: 80,
      unit: 'Capsules',
      description: 'Highly bioavailable magnesium supplement',
      ingredients: 'Magnesium glycinate, cellulose capsule',
      dosage: '2 capsules daily',
      benefits: 'Muscle relaxation, sleep quality, stress relief',
      sideEffects: 'Mild digestive upset',
      contraindications: 'Kidney disease',
      storage: 'Store at room temperature',
      status: 'Active',
      lastRestocked: '2024-02-20',
      supplier: 'MineralSupply Ltd.',
      prescriptionRequired: false,
      certified: true,
      organic: false,
      gmpCertified: true,
      allergenInfo: 'Allergen-free',
      servingSize: '2 capsules',
      servingsPerContainer: 90
    },
    {
      id: 5,
      name: 'Vitamin C 1000mg',
      brand: 'ImmuneHealth',
      category: 'Vitamins',
      barcode: '9876543210127',
      batchNumber: 'SUP005',
      expiryDate: '2025-03-31',
      unitPrice: 9.99,
      sellingPrice: 15.99,
      currentStock: 25,
      minStockLevel: 50,
      maxStockLevel: 200,
      reorderLevel: 75,
      unit: 'Tablets',
      description: 'High-potency vitamin C supplement',
      ingredients: 'Ascorbic acid, rose hips, bioflavonoids',
      dosage: '1 tablet daily',
      benefits: 'Immune support, antioxidant, skin health',
      sideEffects: 'High doses may cause digestive upset',
      contraindications: 'Kidney stones, iron overload',
      storage: 'Store in a cool, dry place',
      status: 'Active',
      lastRestocked: '2024-01-15',
      supplier: 'ImmuneSupply Inc.',
      prescriptionRequired: false,
      certified: true,
      organic: true,
      gmpCertified: true,
      allergenInfo: 'Allergen-free',
      servingSize: '1 tablet',
      servingsPerContainer: 100
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setSupplements(mockSupplements);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredSupplements = supplements.filter(supplement => {
    const matchesSearch = supplement.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplement.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         supplement.barcode.includes(searchTerm) ||
                         supplement.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filters.category || supplement.category === filters.category;
    const matchesStatus = !filters.status || supplement.status === filters.status;
    const matchesStockLevel = !filters.stockLevel || 
      (filters.stockLevel === 'low' && supplement.currentStock <= supplement.minStockLevel) ||
      (filters.stockLevel === 'critical' && supplement.currentStock <= supplement.reorderLevel) ||
      (filters.stockLevel === 'normal' && supplement.currentStock > supplement.reorderLevel);
    const matchesBrand = !filters.brand || supplement.brand === filters.brand;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesStockLevel && matchesBrand;
  });

  const handleAddSupplement = () => {
    setEditingSupplement(null);
    setShowAddModal(true);
  };

  const handleEditSupplement = (supplement) => {
    setEditingSupplement(supplement);
    setShowAddModal(true);
  };

  const handleViewSupplement = (supplement) => {
    setSelectedSupplement(supplement);
    setShowViewModal(true);
  };

  const handleDeleteSupplement = (supplementId) => {
    if (window.confirm('Are you sure you want to delete this supplement?')) {
      setSupplements(supplements.filter(s => s.id !== supplementId));
    }
  };

  const handleSaveSupplement = (supplementData) => {
    if (editingSupplement) {
      // Update existing supplement
      setSupplements(supplements.map(s => 
        s.id === editingSupplement.id ? { ...s, ...supplementData } : s
      ));
    } else {
      // Add new supplement
      const newSupplement = {
        id: Math.max(...supplements.map(s => s.id)) + 1,
        ...supplementData,
        lastRestocked: new Date().toISOString().slice(0, 10)
      };
      setSupplements([...supplements, newSupplement]);
    }
    setShowAddModal(false);
    setEditingSupplement(null);
  };

  const handleExport = (format) => {
    const data = filteredSupplements;
    const columns = [
      { key: 'name', label: 'Supplement Name' },
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
      { key: 'certified', label: 'Certified' }
    ];

    switch (format) {
      case 'pdf':
        exportToPDF(data, 'Supplements Inventory Report', columns);
        break;
      case 'word':
        exportToWord(data, 'Supplements Inventory Report', columns);
        break;
      case 'csv':
        exportToCSV(data, 'supplements-inventory');
        break;
      default:
        break;
    }
  };

  const getStockStatus = (supplement) => {
    if (supplement.currentStock <= supplement.minStockLevel) return 'critical';
    if (supplement.currentStock <= supplement.reorderLevel) return 'low';
    return 'normal';
  };

  const totalSupplements = filteredSupplements.length;
  const lowStock = filteredSupplements.filter(s => getStockStatus(s) === 'low').length;
  const criticalStock = filteredSupplements.filter(s => getStockStatus(s) === 'critical').length;
  const totalValue = filteredSupplements.reduce((sum, s) => sum + (s.currentStock * s.unitPrice), 0);
  const certifiedProducts = filteredSupplements.filter(s => s.certified).length;

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
            <h1 className="text-3xl font-bold text-gray-900">Supplements</h1>
            <p className="text-gray-600 mt-1">Manage dietary supplements and nutritional products</p>
          </div>
          <button
            onClick={handleAddSupplement}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
          >
            <Plus className="w-5 h-5" />
            Add Supplement
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Products</p>
                <p className="text-2xl font-bold text-gray-900">{totalSupplements}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Package className="w-6 h-6 text-blue-600" />
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
                <p className="text-sm text-gray-600">Certified</p>
                <p className="text-2xl font-bold text-purple-600">{certifiedProducts}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-purple-600" />
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
                  placeholder="Search supplements by name, brand, barcode..."
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
                <option value="Vitamins">Vitamins</option>
                <option value="Minerals">Minerals</option>
                <option value="Omega-3">Omega-3</option>
                <option value="Probiotics">Probiotics</option>
                <option value="Herbal">Herbal</option>
                <option value="Protein">Protein</option>
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
                <option value="NutriHealth">NutriHealth</option>
                <option value="MarineHealth">MarineHealth</option>
                <option value="GutHealth">GutHealth</option>
                <option value="MineralHealth">MineralHealth</option>
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

        {/* Supplements Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Supplement</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Unit Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selling Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certified</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSupplements.map((supplement) => {
                  const stockStatus = getStockStatus(supplement);
                  return (
                    <tr key={supplement.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{supplement.name}</div>
                          <div className="text-sm text-gray-500">{supplement.brand}</div>
                          <div className="text-xs text-gray-400">{supplement.barcode}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{supplement.category}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className={`text-sm font-medium ${
                            stockStatus === 'critical' ? 'text-red-600' :
                            stockStatus === 'low' ? 'text-yellow-600' : 'text-green-600'
                          }`}>
                            {supplement.currentStock} {supplement.unit}
                          </span>
                          {stockStatus !== 'normal' && (
                            <AlertTriangle className="w-4 h-4 ml-2 text-yellow-500" />
                          )}
                        </div>
                        <div className="text-xs text-gray-500">Min: {supplement.minStockLevel}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${supplement.unitPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${supplement.sellingPrice.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          {supplement.certified && (
                            <CheckCircle className="w-4 h-4 text-green-500" title="Certified" />
                          )}
                          {supplement.organic && (
                            <Heart className="w-4 h-4 text-green-500" title="Organic" />
                          )}
                          {supplement.gmpCertified && (
                            <Activity className="w-4 h-4 text-blue-500" title="GMP Certified" />
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          supplement.status === 'Active' 
                            ? 'bg-green-100 text-green-800' 
                            : supplement.status === 'Inactive'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {supplement.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleViewSupplement(supplement)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleEditSupplement(supplement)}
                            className="text-green-600 hover:text-green-900"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteSupplement(supplement.id)}
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
        <SupplementModal
          supplement={editingSupplement}
          onSave={handleSaveSupplement}
          onClose={() => {
            setShowAddModal(false);
            setEditingSupplement(null);
          }}
        />
      )}

      {/* View Modal */}
      {showViewModal && selectedSupplement && (
        <ViewSupplementModal
          supplement={selectedSupplement}
          onClose={() => {
            setShowViewModal(false);
            setSelectedSupplement(null);
          }}
        />
      )}
    </div>
  );
};

// Supplement Modal Component
const SupplementModal = ({ supplement, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: supplement?.name || '',
    brand: supplement?.brand || '',
    category: supplement?.category || '',
    barcode: supplement?.barcode || '',
    batchNumber: supplement?.batchNumber || '',
    expiryDate: supplement?.expiryDate || '',
    unitPrice: supplement?.unitPrice || 0,
    sellingPrice: supplement?.sellingPrice || 0,
    currentStock: supplement?.currentStock || 0,
    minStockLevel: supplement?.minStockLevel || 10,
    maxStockLevel: supplement?.maxStockLevel || 100,
    reorderLevel: supplement?.reorderLevel || 20,
    unit: supplement?.unit || 'Capsules',
    description: supplement?.description || '',
    ingredients: supplement?.ingredients || '',
    dosage: supplement?.dosage || '',
    benefits: supplement?.benefits || '',
    sideEffects: supplement?.sideEffects || '',
    contraindications: supplement?.contraindications || '',
    storage: supplement?.storage || '',
    status: supplement?.status || 'Active',
    supplier: supplement?.supplier || '',
    certified: supplement?.certified || false,
    organic: supplement?.organic || false,
    gmpCertified: supplement?.gmpCertified || false,
    allergenInfo: supplement?.allergenInfo || '',
    servingSize: supplement?.servingSize || '',
    servingsPerContainer: supplement?.servingsPerContainer || 0,
    image: supplement?.image || null
  });

  const [imagePreview, setImagePreview] = useState(supplement?.image || null);

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
              {supplement ? 'Edit Supplement' : 'Add New Supplement'}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supplement Name *</label>
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
                    <option value="Vitamins">Vitamins</option>
                    <option value="Minerals">Minerals</option>
                    <option value="Omega-3">Omega-3</option>
                    <option value="Probiotics">Probiotics</option>
                    <option value="Herbal">Herbal</option>
                    <option value="Protein">Protein</option>
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
                    <option value="Capsules">Capsules</option>
                    <option value="Tablets">Tablets</option>
                    <option value="Softgels">Softgels</option>
                    <option value="Powder">Powder</option>
                    <option value="Liquid">Liquid</option>
                    <option value="Gummies">Gummies</option>
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Ingredients</label>
                  <textarea
                    value={formData.ingredients}
                    onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dosage Instructions</label>
                  <textarea
                    value={formData.dosage}
                    onChange={(e) => setFormData({ ...formData, dosage: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Benefits</label>
                  <textarea
                    value={formData.benefits}
                    onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Side Effects</label>
                  <textarea
                    value={formData.sideEffects}
                    onChange={(e) => setFormData({ ...formData, sideEffects: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contraindications</label>
                  <textarea
                    value={formData.contraindications}
                    onChange={(e) => setFormData({ ...formData, contraindications: e.target.value })}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Allergen Information</label>
                  <textarea
                    value={formData.allergenInfo}
                    onChange={(e) => setFormData({ ...formData, allergenInfo: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Serving Size</label>
                    <input
                      type="text"
                      value={formData.servingSize}
                      onChange={(e) => setFormData({ ...formData, servingSize: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Servings Per Container</label>
                    <input
                      type="number"
                      value={formData.servingsPerContainer}
                      onChange={(e) => setFormData({ ...formData, servingsPerContainer: parseInt(e.target.value) })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.certified}
                      onChange={(e) => setFormData({ ...formData, certified: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Certified Product</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.organic}
                      onChange={(e) => setFormData({ ...formData, organic: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Organic</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.gmpCertified}
                      onChange={(e) => setFormData({ ...formData, gmpCertified: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">GMP Certified</span>
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
              {supplement ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// View Supplement Modal Component
const ViewSupplementModal = ({ supplement, onClose }) => {
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
            <h2 className="text-xl font-bold text-gray-900">Supplement Details</h2>
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
                  <div className="font-medium">{supplement.name}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Brand:</span>
                  <div className="font-medium">{supplement.brand}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Category:</span>
                  <div className="font-medium">{supplement.category}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Barcode:</span>
                  <div className="font-medium">{supplement.barcode}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Batch Number:</span>
                  <div className="font-medium">{supplement.batchNumber}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Unit:</span>
                  <div className="font-medium">{supplement.unit}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock & Pricing</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Current Stock:</span>
                  <div className="font-medium text-lg">{supplement.currentStock} {supplement.unit}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Min Stock Level:</span>
                  <div className="font-medium">{supplement.minStockLevel} {supplement.unit}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Max Stock Level:</span>
                  <div className="font-medium">{supplement.maxStockLevel} {supplement.unit}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Reorder Level:</span>
                  <div className="font-medium">{supplement.reorderLevel} {supplement.unit}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Unit Price:</span>
                  <div className="font-medium">${supplement.unitPrice.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Selling Price:</span>
                  <div className="font-medium">${supplement.sellingPrice.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Expiry Date:</span>
                  <div className={`font-medium ${
                    new Date(supplement.expiryDate) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) 
                      ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {new Date(supplement.expiryDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                    supplement.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : supplement.status === 'Inactive'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {supplement.status}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Supplier:</span>
                  <div className="font-medium">{supplement.supplier}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Last Restocked:</span>
                  <div className="font-medium">{new Date(supplement.lastRestocked).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Serving Size:</span>
                  <div className="font-medium">{supplement.servingSize}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Servings Per Container:</span>
                  <div className="font-medium">{supplement.servingsPerContainer}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Certifications:</span>
                  <div className="flex items-center gap-2 mt-1">
                    {supplement.certified && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Certified
                      </span>
                    )}
                    {supplement.organic && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                        <Heart className="w-3 h-3 mr-1" />
                        Organic
                      </span>
                    )}
                    {supplement.gmpCertified && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                        <Activity className="w-3 h-3 mr-1" />
                        GMP
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
                    <div className="font-medium bg-gray-50 p-3 rounded">{supplement.description}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Ingredients:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{supplement.ingredients}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Dosage:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{supplement.dosage}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Benefits:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{supplement.benefits}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Safety Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Side Effects:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{supplement.sideEffects}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Contraindications:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{supplement.contraindications}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Allergen Information:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{supplement.allergenInfo}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Storage Instructions:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{supplement.storage}</div>
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

export default Supplements;
