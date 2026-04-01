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
  Package,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  Calendar,
  Barcode,
  Upload,
  Image,
  ChevronDown,
  MoreHorizontal,
  CheckCircle,
  XCircle,
  Clock,
  Building,
  Tag,
  Shield,
  Activity
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV, printDocument } from '../../../utils/exportUtils';

const Medicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [editingMedicine, setEditingMedicine] = useState(null);
  const [filters, setFilters] = useState({
    category: 'All',
    status: 'all',
    supplier: 'All',
    stockLevel: 'all'
  });

  // Mock data with more comprehensive fields
  const mockMedicines = [
    {
      id: 1,
      name: 'Paracetamol 500mg',
      sku: 'MED001',
      barcode: '1234567890123',
      category: 'Pain Relief',
      supplier: 'Pharma Corp',
      manufacturer: 'MediTech Labs',
      price: 5.99,
      costPrice: 3.50,
      stock: 1500,
      minStock: 500,
      maxStock: 5000,
      reorderLevel: 300,
      unit: 'Tablets',
      packSize: '100 tablets',
      strength: '500mg',
      dosageForm: 'Tablets',
      route: 'Oral',
      expiryDate: '2025-12-31',
      manufactureDate: '2023-01-15',
      batchNumber: 'BCH001',
      storageConditions: 'Store at room temperature',
      prescriptionRequired: false,
      controlledSubstance: false,
      description: 'Paracetamol tablets for pain relief and fever reduction',
      indications: 'Headache, fever, mild to moderate pain',
      contraindications: 'Severe liver disease, hypersensitivity',
      sideEffects: 'Rare: liver dysfunction at high doses',
      interactions: 'Warfarin, alcohol',
      status: 'active',
      image: null,
      lastRestocked: '2024-02-15',
      averageMonthlySales: 450,
      rating: 4.5,
      reviews: 128,
      tags: ['pain', 'fever', 'otc'],
      regulatoryInfo: {
        ndc: '12345-678-90',
        deaSchedule: 'Not controlled',
        fdaStatus: 'Approved'
      }
    },
    {
      id: 2,
      name: 'Amoxicillin 250mg',
      sku: 'MED002',
      barcode: '2345678901234',
      category: 'Antibiotics',
      supplier: 'Pharma Corp',
      manufacturer: 'BioPharma Inc',
      price: 12.50,
      costPrice: 8.00,
      stock: 320,
      minStock: 300,
      maxStock: 2000,
      reorderLevel: 250,
      unit: 'Capsules',
      packSize: '30 capsules',
      strength: '250mg',
      dosageForm: 'Capsules',
      route: 'Oral',
      expiryDate: '2025-06-30',
      manufactureDate: '2023-06-30',
      batchNumber: 'BCH002',
      storageConditions: 'Store below 25°C, protect from moisture',
      prescriptionRequired: true,
      controlledSubstance: false,
      description: 'Broad-spectrum antibiotic for bacterial infections',
      indications: 'Bacterial infections, respiratory tract infections',
      contraindications: 'Penicillin allergy',
      sideEffects: 'Nausea, diarrhea, allergic reactions',
      interactions: 'Probenecid, oral contraceptives',
      status: 'active',
      image: null,
      lastRestocked: '2024-02-10',
      averageMonthlySales: 280,
      rating: 4.7,
      reviews: 95,
      tags: ['antibiotic', 'infection', 'prescription'],
      regulatoryInfo: {
        ndc: '23456-789-01',
        deaSchedule: 'Not controlled',
        fdaStatus: 'Approved'
      }
    },
    {
      id: 3,
      name: 'Ibuprofen 400mg',
      sku: 'MED003',
      barcode: '3456789012345',
      category: 'Pain Relief',
      supplier: 'MedSupply Inc',
      manufacturer: 'PainCare Labs',
      price: 8.99,
      costPrice: 5.20,
      stock: 80,
      minStock: 200,
      maxStock: 3000,
      reorderLevel: 150,
      unit: 'Tablets',
      packSize: '50 tablets',
      strength: '400mg',
      dosageForm: 'Tablets',
      route: 'Oral',
      expiryDate: '2025-09-30',
      manufactureDate: '2023-03-30',
      batchNumber: 'BCH003',
      storageConditions: 'Store at room temperature',
      prescriptionRequired: false,
      controlledSubstance: false,
      description: 'NSAID for pain, inflammation, and fever',
      indications: 'Arthritis, menstrual pain, headache',
      contraindications: 'Active ulcer, severe heart failure',
      sideEffects: 'Stomach irritation, renal effects',
      interactions: 'Anticoagulants, ACE inhibitors',
      status: 'low-stock',
      image: null,
      lastRestocked: '2024-01-20',
      averageMonthlySales: 380,
      rating: 4.3,
      reviews: 156,
      tags: ['pain', 'inflammation', 'nsaid'],
      regulatoryInfo: {
        ndc: '34567-890-23',
        deaSchedule: 'Not controlled',
        fdaStatus: 'Approved'
      }
    }
  ];

  const categories = ['All', 'Pain Relief', 'Antibiotics', 'Allergy', 'Diabetes', 'Gastrointestinal', 'Cardiovascular', 'Respiratory'];
  const suppliers = ['All', 'Pharma Corp', 'MedSupply Inc', 'BioPharma Inc', 'PainCare Labs'];
  const dosageForms = ['Tablets', 'Capsules', 'Liquid', 'Injection', 'Cream', 'Ointment', 'Inhaler'];

  useEffect(() => {
    setTimeout(() => {
      setMedicines(mockMedicines);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredMedicines = medicines.filter(medicine => {
    const matchesSearch = medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         medicine.barcode.includes(searchTerm);
    const matchesCategory = filters.category === 'All' || medicine.category === filters.category;
    const matchesStatus = filters.status === 'all' || medicine.status === filters.status;
    const matchesSupplier = filters.supplier === 'All' || medicine.supplier === filters.supplier;
    const matchesStockLevel = filters.stockLevel === 'all' || 
      (filters.stockLevel === 'low' && medicine.stock <= medicine.reorderLevel) ||
      (filters.stockLevel === 'critical' && medicine.stock <= medicine.minStock) ||
      (filters.stockLevel === 'overstock' && medicine.stock >= medicine.maxStock * 0.8);
    
    return matchesSearch && matchesCategory && matchesStatus && matchesSupplier && matchesStockLevel;
  });

  const handleExport = (format) => {
    const columns = [
      { key: 'name', label: 'Medicine Name' },
      { key: 'sku', label: 'SKU' },
      { key: 'category', label: 'Category' },
      { key: 'supplier', label: 'Supplier' },
      { key: 'price', label: 'Price' },
      { key: 'stock', label: 'Stock' },
      { key: 'expiryDate', label: 'Expiry Date' },
      { key: 'status', label: 'Status' }
    ];
    
    const data = filteredMedicines.map(med => ({
      ...med,
      price: `$${med.price.toFixed(2)}`
    }));

    switch (format) {
      case 'pdf':
        exportToPDF(data, 'Medines Inventory Report', columns);
        break;
      case 'word':
        exportToWord(data, 'Medicines Inventory Report', columns);
        break;
      case 'csv':
        exportToCSV(data, 'medicines-inventory');
        break;
      case 'print':
        printDocument('Medicines Inventory Report');
        break;
      default:
        break;
    }
  };

  const handleAddMedicine = () => {
    setEditingMedicine(null);
    setShowAddModal(true);
  };

  const handleEditMedicine = (medicine) => {
    setEditingMedicine(medicine);
    setShowAddModal(true);
  };

  const handleViewMedicine = (medicine) => {
    setSelectedMedicine(medicine);
    setShowViewModal(true);
  };

  const handleDeleteMedicine = (medicineId) => {
    if (window.confirm('Are you sure you want to delete this medicine?')) {
      setMedicines(medicines.filter(m => m.id !== medicineId));
    }
  };

  const handleSaveMedicine = (medicineData) => {
    if (editingMedicine) {
      setMedicines(medicines.map(m => 
        m.id === editingMedicine.id ? { ...m, ...medicineData } : m
      ));
    } else {
      const newMedicine = {
        id: Math.max(...medicines.map(m => m.id)) + 1,
        ...medicineData,
        status: 'active',
        averageMonthlySales: 0,
        rating: 0,
        reviews: 0
      };
      setMedicines([...medicines, newMedicine]);
    }
    setShowAddModal(false);
    setEditingMedicine(null);
  };

  const getStockStatus = (medicine) => {
    if (medicine.stock === 0) return { status: 'out-of-stock', color: 'red', label: 'Out of Stock' };
    if (medicine.stock <= medicine.minStock) return { status: 'critical', color: 'red', label: 'Critical' };
    if (medicine.stock <= medicine.reorderLevel) return { status: 'low-stock', color: 'orange', label: 'Low Stock' };
    if (medicine.stock >= medicine.maxStock * 0.8) return { status: 'overstock', color: 'blue', label: 'Overstock' };
    return { status: 'active', color: 'green', label: 'Active' };
  };

  const totalMedicines = filteredMedicines.length;
  const totalStock = filteredMedicines.reduce((sum, m) => sum + m.stock, 0);
  const totalValue = filteredMedicines.reduce((sum, m) => sum + (m.stock * m.price), 0);
  const lowStockItems = filteredMedicines.filter(m => m.stock <= m.reorderLevel).length;
  const criticalItems = filteredMedicines.filter(m => m.stock <= m.minStock).length;
  const outOfStockItems = filteredMedicines.filter(m => m.stock === 0).length;
  const expiringSoon = filteredMedicines.filter(m => {
    const expiryDate = new Date(m.expiryDate);
    const threeMonthsFromNow = new Date();
    threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);
    return expiryDate <= threeMonthsFromNow;
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
          <h1 className="text-3xl font-bold text-gray-900">Medicines Management</h1>
          <p className="text-gray-500 mt-1">Comprehensive pharmacy inventory management system</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <div className="relative">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
              Filters
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <button onClick={() => handleExport('pdf')} className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                <FileText className="w-4 h-4" /> Export as PDF
              </button>
              <button onClick={() => handleExport('word')} className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                <FileText className="w-4 h-4" /> Export as Word
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
            onClick={handleAddMedicine}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
          >
            <Plus className="w-4 h-4" />
            Add Medicine
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Medicines</p>
              <p className="text-2xl font-bold text-gray-900">{totalMedicines}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Stock</p>
              <p className="text-2xl font-bold text-green-600">{totalStock.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <Package className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Stock Value</p>
              <p className="text-2xl font-bold text-purple-600">${totalValue.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical Items</p>
              <p className="text-2xl font-bold text-red-600">{criticalItems + outOfStockItems}</p>
            </div>
            <div className="p-3 bg-red-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-600" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <select
                  value={filters.supplier}
                  onChange={(e) => setFilters({ ...filters, supplier: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  {suppliers.map(sup => (
                    <option key={sup} value={sup}>{sup}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stock Level</label>
                <select
                  value={filters.stockLevel}
                  onChange={(e) => setFilters({ ...filters, stockLevel: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="all">All Levels</option>
                  <option value="critical">Critical</option>
                  <option value="low">Low Stock</option>
                  <option value="overstock">Overstock</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="low-stock">Low Stock</option>
                  <option value="critical">Critical</option>
                  <option value="out-of-stock">Out of Stock</option>
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
            placeholder="Search medicines by name, SKU, or barcode..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          />
        </div>
      </div>

      {/* Medicines Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Medicine</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Supplier</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Price</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Stock</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Expiry</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredMedicines.map((medicine, index) => {
                const stockStatus = getStockStatus(medicine);
                return (
                  <motion.tr
                    key={medicine.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          {medicine.image ? (
                            <img src={medicine.image} alt={medicine.name} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <Package className="w-6 h-6 text-white" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{medicine.name}</p>
                          <p className="text-sm text-gray-500">{medicine.sku} • {medicine.strength}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{medicine.category}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{medicine.supplier}</td>
                    <td className="px-6 py-4 text-right font-medium text-gray-900">${medicine.price.toFixed(2)}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`font-medium ${
                        stockStatus.color === 'red' ? 'text-red-600' :
                        stockStatus.color === 'orange' ? 'text-orange-600' :
                        stockStatus.color === 'blue' ? 'text-blue-600' :
                        'text-green-600'
                      }`}>
                        {medicine.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{medicine.expiryDate}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        stockStatus.color === 'red' ? 'bg-red-100 text-red-700' :
                        stockStatus.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                        stockStatus.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {stockStatus.label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleViewMedicine(medicine)}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditMedicine(medicine)}
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteMedicine(medicine.id)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Medicine Modal */}
      <AnimatePresence>
        {showAddModal && (
          <MedicineModal
            medicine={editingMedicine}
            onSave={handleSaveMedicine}
            onClose={() => {
              setShowAddModal(false);
              setEditingMedicine(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* View Medicine Modal */}
      <AnimatePresence>
        {showViewModal && selectedMedicine && (
          <ViewMedicineModal
            medicine={selectedMedicine}
            onClose={() => {
              setShowViewModal(false);
              setSelectedMedicine(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Medicine Modal Component
const MedicineModal = ({ medicine, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: medicine?.name || '',
    sku: medicine?.sku || '',
    barcode: medicine?.barcode || '',
    category: medicine?.category || 'Pain Relief',
    supplier: medicine?.supplier || '',
    manufacturer: medicine?.manufacturer || '',
    price: medicine?.price || '',
    costPrice: medicine?.costPrice || '',
    stock: medicine?.stock || '',
    minStock: medicine?.minStock || '',
    maxStock: medicine?.maxStock || '',
    reorderLevel: medicine?.reorderLevel || '',
    unit: medicine?.unit || 'Tablets',
    packSize: medicine?.packSize || '',
    strength: medicine?.strength || '',
    dosageForm: medicine?.dosageForm || 'Tablets',
    route: medicine?.route || 'Oral',
    expiryDate: medicine?.expiryDate || '',
    manufactureDate: medicine?.manufactureDate || '',
    batchNumber: medicine?.batchNumber || '',
    storageConditions: medicine?.storageConditions || '',
    prescriptionRequired: medicine?.prescriptionRequired || false,
    controlledSubstance: medicine?.controlledSubstance || false,
    description: medicine?.description || '',
    indications: medicine?.indications || '',
    contraindications: medicine?.contraindications || '',
    sideEffects: medicine?.sideEffects || '',
    interactions: medicine?.interactions || '',
    image: medicine?.image || null,
    tags: medicine?.tags || []
  });

  const [imagePreview, setImagePreview] = useState(formData.image);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const categories = ['Pain Relief', 'Antibiotics', 'Allergy', 'Diabetes', 'Gastrointestinal', 'Cardiovascular', 'Respiratory'];
  const suppliers = ['Pharma Corp', 'MedSupply Inc', 'BioPharma Inc', 'PainCare Labs'];
  const dosageForms = ['Tablets', 'Capsules', 'Liquid', 'Injection', 'Cream', 'Ointment', 'Inhaler'];
  const routes = ['Oral', 'Topical', 'Injection', 'Inhalation', 'Rectal', 'Nasal'];

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
          <h2 className="text-xl font-semibold text-gray-900">
            {medicine ? 'Edit Medicine' : 'Add New Medicine'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">SKU *</label>
                <input
                  type="text"
                  required
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Supplier *</label>
                <select
                  required
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  {suppliers.map(sup => (
                    <option key={sup} value={sup}>{sup}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
                <input
                  type="text"
                  value={formData.manufacturer}
                  onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Image</h3>
            <div className="flex items-center gap-6">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                  >
                    <Upload className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">Choose image or drag and drop</span>
                  </label>
                </div>
              </div>
              <div className="w-24 h-24 rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-50">
                {imagePreview ? (
                  <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Image className="w-8 h-8 text-gray-400" />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Pricing and Stock */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Stock</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price *</label>
                <input
                  type="number"
                  step="0.01"
                  required
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cost Price</label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.costPrice}
                  onChange={(e) => setFormData({ ...formData, costPrice: parseFloat(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock *</label>
                <input
                  type="number"
                  required
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Stock</label>
                <input
                  type="number"
                  value={formData.minStock}
                  onChange={(e) => setFormData({ ...formData, minStock: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Stock</label>
                <input
                  type="number"
                  value={formData.maxStock}
                  onChange={(e) => setFormData({ ...formData, maxStock: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Level</label>
                <input
                  type="number"
                  value={formData.reorderLevel}
                  onChange={(e) => setFormData({ ...formData, reorderLevel: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Dosage Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dosage Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Strength</label>
                <input
                  type="text"
                  value={formData.strength}
                  onChange={(e) => setFormData({ ...formData, strength: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Dosage Form</label>
                <select
                  value={formData.dosageForm}
                  onChange={(e) => setFormData({ ...formData, dosageForm: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  {dosageForms.map(form => (
                    <option key={form} value={form}>{form}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Route</label>
                <select
                  value={formData.route}
                  onChange={(e) => setFormData({ ...formData, route: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  {routes.map(route => (
                    <option key={route} value={route}>{route}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pack Size</label>
                <input
                  type="text"
                  value={formData.packSize}
                  onChange={(e) => setFormData({ ...formData, packSize: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Dates and Batch */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dates & Batch</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date *</label>
                <input
                  type="date"
                  required
                  value={formData.expiryDate}
                  onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Manufacture Date</label>
                <input
                  type="date"
                  value={formData.manufactureDate}
                  onChange={(e) => setFormData({ ...formData, manufactureDate: e.target.value })}
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

          {/* Medical Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Indications</label>
                  <textarea
                    value={formData.indications}
                    onChange={(e) => setFormData({ ...formData, indications: e.target.value })}
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
                  <label className="block text-sm font-medium text-gray-700 mb-1">Side Effects</label>
                  <textarea
                    value={formData.sideEffects}
                    onChange={(e) => setFormData({ ...formData, sideEffects: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Drug Interactions</label>
                  <textarea
                    value={formData.interactions}
                    onChange={(e) => setFormData({ ...formData, interactions: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Storage Conditions</label>
                <textarea
                  value={formData.storageConditions}
                  onChange={(e) => setFormData({ ...formData, storageConditions: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Regulatory Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Regulatory Information</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.prescriptionRequired}
                    onChange={(e) => setFormData({ ...formData, prescriptionRequired: e.target.checked })}
                    className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                  />
                  <span className="text-sm text-gray-700">Prescription Required</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.controlledSubstance}
                    onChange={(e) => setFormData({ ...formData, controlledSubstance: e.target.checked })}
                    className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                  />
                  <span className="text-sm text-gray-700">Controlled Substance</span>
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] transition-colors"
            >
              <Save className="w-4 h-4 inline mr-2" />
              {medicine ? 'Update Medicine' : 'Add Medicine'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// View Medicine Modal Component
const ViewMedicineModal = ({ medicine, onClose }) => {
  const getStockStatus = (medicine) => {
    if (medicine.stock === 0) return { status: 'out-of-stock', color: 'red', label: 'Out of Stock' };
    if (medicine.stock <= medicine.minStock) return { status: 'critical', color: 'red', label: 'Critical' };
    if (medicine.stock <= medicine.reorderLevel) return { status: 'low-stock', color: 'orange', label: 'Low Stock' };
    if (medicine.stock >= medicine.maxStock * 0.8) return { status: 'overstock', color: 'blue', label: 'Overstock' };
    return { status: 'active', color: 'green', label: 'Active' };
  };

  const stockStatus = getStockStatus(medicine);

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
        className="bg-white rounded-xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Medicine Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Header Section */}
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-50 flex-shrink-0">
              {medicine.image ? (
                <img src={medicine.image} alt={medicine.name} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-gray-900">{medicine.name}</h3>
              <p className="text-gray-600 mt-1">{medicine.description}</p>
              <div className="flex items-center gap-4 mt-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  stockStatus.color === 'red' ? 'bg-red-100 text-red-700' :
                  stockStatus.color === 'orange' ? 'bg-orange-100 text-orange-700' :
                  stockStatus.color === 'blue' ? 'bg-blue-100 text-blue-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {stockStatus.label}
                </span>
                {medicine.prescriptionRequired && (
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-800 rounded">
                    <Shield className="w-3 h-3 mr-1" />
                    Prescription Required
                  </span>
                )}
                {medicine.controlledSubstance && (
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Controlled Substance
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">SKU:</span>
                  <div className="font-medium">{medicine.sku}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Barcode:</span>
                  <div className="font-medium">{medicine.barcode || 'Not set'}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Category:</span>
                  <div className="font-medium">{medicine.category}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Supplier:</span>
                  <div className="font-medium">{medicine.supplier}</div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Manufacturer:</span>
                  <div className="font-medium">{medicine.manufacturer || 'Not set'}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Strength:</span>
                  <div className="font-medium">{medicine.strength || 'Not set'}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Dosage Form:</span>
                  <div className="font-medium">{medicine.dosageForm}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Route:</span>
                  <div className="font-medium">{medicine.route}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Pricing and Stock */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Stock</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Selling Price:</span>
                  <div className="font-medium text-green-600">${medicine.price.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Cost Price:</span>
                  <div className="font-medium">${medicine.costPrice ? medicine.costPrice.toFixed(2) : 'Not set'}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Current Stock:</span>
                  <div className={`font-medium ${
                    stockStatus.color === 'red' ? 'text-red-600' :
                    stockStatus.color === 'orange' ? 'text-orange-600' :
                    stockStatus.color === 'blue' ? 'text-blue-600' :
                    'text-green-600'
                  }`}>
                    {medicine.stock} {medicine.unit}
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Minimum Stock:</span>
                  <div className="font-medium">{medicine.minStock} {medicine.unit}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Maximum Stock:</span>
                  <div className="font-medium">{medicine.maxStock} {medicine.unit}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Reorder Level:</span>
                  <div className="font-medium">{medicine.reorderLevel} {medicine.unit}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Dates and Batch */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dates & Batch</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <span className="text-sm text-gray-600">Expiry Date:</span>
                <div className="font-medium">{medicine.expiryDate}</div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Manufacture Date:</span>
                <div className="font-medium">{medicine.manufactureDate || 'Not set'}</div>
              </div>
              <div>
                <span className="text-sm text-gray-600">Batch Number:</span>
                <div className="font-medium">{medicine.batchNumber || 'Not set'}</div>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
            <div className="space-y-4">
              {medicine.indications && (
                <div>
                  <span className="text-sm text-gray-600">Indications:</span>
                  <div className="font-medium bg-gray-50 p-3 rounded">{medicine.indications}</div>
                </div>
              )}
              {medicine.contraindications && (
                <div>
                  <span className="text-sm text-gray-600">Contraindications:</span>
                  <div className="font-medium bg-gray-50 p-3 rounded">{medicine.contraindications}</div>
                </div>
              )}
              {medicine.sideEffects && (
                <div>
                  <span className="text-sm text-gray-600">Side Effects:</span>
                  <div className="font-medium bg-gray-50 p-3 rounded">{medicine.sideEffects}</div>
                </div>
              )}
              {medicine.interactions && (
                <div>
                  <span className="text-sm text-gray-600">Drug Interactions:</span>
                  <div className="font-medium bg-gray-50 p-3 rounded">{medicine.interactions}</div>
                </div>
              )}
              {medicine.storageConditions && (
                <div>
                  <span className="text-sm text-gray-600">Storage Conditions:</span>
                  <div className="font-medium bg-gray-50 p-3 rounded">{medicine.storageConditions}</div>
                </div>
              )}
            </div>
          </div>

          {/* Performance Metrics */}
          {medicine.averageMonthlySales > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-gray-600">Monthly Sales:</span>
                  </div>
                  <div className="font-medium text-lg">{medicine.averageMonthlySales}</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-blue-600" />
                    <span className="text-sm text-gray-600">Rating:</span>
                  </div>
                  <div className="font-medium text-lg">{medicine.rating.toFixed(1)}/5.0</div>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-purple-600" />
                    <span className="text-sm text-gray-600">Reviews:</span>
                  </div>
                  <div className="font-medium text-lg">{medicine.reviews}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Medicines;
