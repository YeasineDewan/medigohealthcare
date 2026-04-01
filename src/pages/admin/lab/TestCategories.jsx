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
  FolderOpen,
  TestTube,
  Clock,
  DollarSign,
  AlertTriangle,
  TrendingUp,
  Calendar,
  ChevronDown,
  CheckCircle,
  XCircle,
  Activity,
  BarChart3,
  Package,
  ArrowLeftRight,
  RefreshCw
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV, printDocument } from '../../../utils/exportUtils';

const TestCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [editingCategory, setEditingCategory] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    department: 'all'
  });

  // Mock data with comprehensive fields
  const mockCategories = [
    {
      id: 1,
      name: 'Hematology',
      code: 'HEM',
      description: 'Blood tests including CBC, coagulation studies, and blood morphology',
      department: 'Pathology',
      tests: 45,
      activeTests: 42,
      priceRange: { min: 25, max: 250 },
      avgTurnaround: '2-4 hours',
      containerType: 'EDTA Tube',
      volume: '2-5 ml',
      instructions: 'Fast for 8-12 hours. Water allowed.',
      status: 'active',
      requiresFasting: true,
      accredited: true,
      homeCollection: true,
      reportsAvailable: 'Online & Print',
      lastUpdated: '2024-02-15'
    },
    {
      id: 2,
      name: 'Biochemistry',
      code: 'BIO',
      description: 'Liver, kidney, lipid profile, and metabolic panel tests',
      department: 'Pathology',
      tests: 78,
      activeTests: 75,
      priceRange: { min: 30, max: 350 },
      avgTurnaround: '4-6 hours',
      containerType: 'Serum Tube',
      volume: '5-10 ml',
      instructions: 'Fasting for 10-12 hours required.',
      status: 'active',
      requiresFasting: true,
      accredited: true,
      homeCollection: true,
      reportsAvailable: 'Online & Print',
      lastUpdated: '2024-02-20'
    },
    {
      id: 3,
      name: 'Microbiology',
      code: 'MIC',
      description: 'Bacterial, viral, fungal cultures and sensitivity tests',
      department: 'Pathology',
      tests: 56,
      activeTests: 52,
      priceRange: { min: 50, max: 500 },
      avgTurnaround: '24-72 hours',
      containerType: 'Sterile Container',
      volume: 'Various',
      instructions: 'Collect as per specific test requirements.',
      status: 'active',
      requiresFasting: false,
      accredited: true,
      homeCollection: false,
      reportsAvailable: 'Online & Print',
      lastUpdated: '2024-02-18'
    },
    {
      id: 4,
      name: 'Immunology',
      code: 'IMM',
      description: 'Autoimmune markers, allergy tests, and免疫学检测',
      department: 'Pathology',
      tests: 34,
      activeTests: 30,
      priceRange: { min: 100, max: 800 },
      avgTurnaround: '24-48 hours',
      containerType: 'Serum Tube',
      volume: '5-10 ml',
      instructions: 'No specific fasting required for most tests.',
      status: 'active',
      requiresFasting: false,
      accredited: true,
      homeCollection: true,
      reportsAvailable: 'Online & Print',
      lastUpdated: '2024-02-12'
    },
    {
      id: 5,
      name: 'Endocrinology',
      code: 'END',
      description: 'Thyroid, hormone panels, and diabetes markers',
      department: 'Pathology',
      tests: 42,
      activeTests: 38,
      priceRange: { min: 80, max: 600 },
      avgTurnaround: '24-48 hours',
      containerType: 'Serum Tube',
      volume: '5-10 ml',
      instructions: 'Morning sample preferred. Certain tests require specific timing.',
      status: 'active',
      requiresFasting: true,
      accredited: true,
      homeCollection: true,
      reportsAvailable: 'Online & Print',
      lastUpdated: '2024-02-22'
    },
    {
      id: 6,
      name: 'Molecular Diagnostics',
      code: 'MOL',
      description: 'PCR, genetic testing, and infectious disease molecular assays',
      department: 'Pathology',
      tests: 28,
      activeTests: 25,
      priceRange: { min: 200, max: 2500 },
      avgTurnaround: '48-96 hours',
      containerType: 'EDTA Tube',
      volume: '2-5 ml',
      instructions: 'Special collection kit required. Consult lab.',
      status: 'active',
      requiresFasting: false,
      accredited: true,
      homeCollection: false,
      reportsAvailable: 'Online Only',
      lastUpdated: '2024-02-10'
    },
    {
      id: 7,
      name: 'Clinical Pathology',
      code: 'CLP',
      description: 'Urine analysis, stool examination, and body fluid analysis',
      department: 'Pathology',
      tests: 32,
      activeTests: 30,
      priceRange: { min: 20, max: 150 },
      avgTurnaround: '1-4 hours',
      containerType: 'Sterile Container',
      volume: 'Various',
      instructions: 'Collect in sterile container. Morning sample preferred.',
      status: 'inactive',
      requiresFasting: false,
      accredited: true,
      homeCollection: true,
      reportsAvailable: 'Online & Print',
      lastUpdated: '2024-01-15'
    },
    {
      id: 8,
      name: 'Serology',
      code: 'SER',
      description: 'Antibody tests, antigen detection, and infectious disease screening',
      department: 'Pathology',
      tests: 38,
      activeTests: 35,
      priceRange: { min: 40, max: 400 },
      avgTurnaround: '12-24 hours',
      containerType: 'Serum Tube',
      volume: '5 ml',
      instructions: 'No special preparation required.',
      status: 'active',
      requiresFasting: false,
      accredited: true,
      homeCollection: true,
      reportsAvailable: 'Online & Print',
      lastUpdated: '2024-02-08'
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setCategories(mockCategories);
      setLoading(false);
    }, 800);
  }, []);

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filters.status === 'all' || category.status === filters.status;
    const matchesDepartment = filters.department === 'all' || category.department === filters.department;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const handleExport = (format) => {
    const columns = [
      { key: 'name', label: 'Category Name' },
      { key: 'code', label: 'Code' },
      { key: 'department', label: 'Department' },
      { key: 'tests', label: 'Total Tests' },
      { key: 'activeTests', label: 'Active Tests' },
      { key: 'priceRange', label: 'Price Range' },
      { key: 'avgTurnaround', label: 'Turnaround' },
      { key: 'status', label: 'Status' }
    ];
    
    const data = filteredCategories.map(cat => ({
      ...cat,
      priceRange: `$${cat.priceRange.min} - $${cat.priceRange.max}`
    }));

    switch (format) {
      case 'pdf':
        exportToPDF(data, 'Lab Test Categories Report', columns);
        break;
      case 'csv':
        exportToCSV(data, 'lab-test-categories');
        break;
      case 'print':
        printDocument('Lab Test Categories Report');
        break;
      default:
        break;
    }
  };

  const handleAddCategory = () => {
    setEditingCategory(null);
    setShowAddModal(true);
  };

  const handleEditCategory = (category) => {
    setEditingCategory(category);
    setShowAddModal(true);
  };

  const handleViewCategory = (category) => {
    setSelectedCategory(category);
    setShowViewModal(true);
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(c => c.id !== categoryId));
    }
  };

  const handleSaveCategory = (categoryData) => {
    if (editingCategory) {
      setCategories(categories.map(c => 
        c.id === editingCategory.id ? { ...c, ...categoryData, lastUpdated: new Date().toISOString().split('T')[0] } : c
      ));
    } else {
      const newCategory = {
        id: Math.max(...categories.map(c => c.id)) + 1,
        ...categoryData,
        tests: 0,
        activeTests: 0,
        lastUpdated: new Date().toISOString().split('T')[0]
      };
      setCategories([...categories, newCategory]);
    }
    setShowAddModal(false);
    setEditingCategory(null);
  };

  const toggleCategoryStatus = (categoryId) => {
    setCategories(categories.map(c => 
      c.id === categoryId ? { ...c, status: c.status === 'active' ? 'inactive' : 'active' } : c
    ));
  };

  // Stats
  const totalCategories = filteredCategories.length;
  const activeCategories = filteredCategories.filter(c => c.status === 'active').length;
  const totalTests = filteredCategories.reduce((sum, c) => sum + c.tests, 0);
  const avgPrice = filteredCategories.length > 0 
    ? Math.round(filteredCategories.reduce((sum, c) => sum + (c.priceRange.min + c.priceRange.max) / 2, 0) / filteredCategories.length)
    : 0;

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
          <h1 className="text-3xl font-bold text-gray-900">Test Categories</h1>
          <p className="text-gray-500 mt-1">Manage laboratory test categories and departments</p>
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
            onClick={handleAddCategory}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
          >
            <Plus className="w-4 h-4" />
            Add Category
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Categories</p>
              <p className="text-2xl font-bold text-gray-900">{totalCategories}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <FolderOpen className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Categories</p>
              <p className="text-2xl font-bold text-green-600">{activeCategories}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Tests</p>
              <p className="text-2xl font-bold text-purple-600">{totalTests}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <TestTube className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg. Price</p>
              <p className="text-2xl font-bold text-orange-600">${avgPrice}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <DollarSign className="w-6 h-6 text-orange-600" />
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={filters.department}
                  onChange={(e) => setFilters({ ...filters, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="all">All Departments</option>
                  <option value="Pathology">Pathology</option>
                  <option value="Radiology">Radiology</option>
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
            placeholder="Search categories by name, code, or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          />
        </div>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg ${category.status === 'active' ? 'bg-green-100' : 'bg-gray-100'}`}>
                    <FolderOpen className={`w-6 h-6 ${category.status === 'active' ? 'text-green-600' : 'text-gray-500'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">{category.code}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  category.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                </span>
              </div>

              <p className="text-sm text-gray-600 mb-4 line-clamp-2">{category.description}</p>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Total Tests</p>
                  <p className="font-semibold text-gray-900">{category.tests}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Active</p>
                  <p className="font-semibold text-green-600">{category.activeTests}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{category.avgTurnaround}</span>
                </div>
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  <span>${category.priceRange.min} - ${category.priceRange.max}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-4">
                {category.accredited && (
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-700 rounded">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Accredited
                  </span>
                )}
                {category.homeCollection && (
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-purple-100 text-purple-700 rounded">
                    <Activity className="w-3 h-3 mr-1" />
                    Home Collection
                  </span>
                )}
                {category.requiresFasting && (
                  <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-yellow-100 text-yellow-700 rounded">
                    <AlertTriangle className="w-3 h-3 mr-1" />
                    Fasting
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 pt-4 border-t border-gray-100">
                <button
                  onClick={() => handleViewCategory(category)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => handleEditCategory(category)}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => toggleCategoryStatus(category.id)}
                  className={`flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm rounded-lg transition-colors ${
                    category.status === 'active' 
                      ? 'text-orange-600 hover:bg-orange-50' 
                      : 'text-green-600 hover:bg-green-50'
                  }`}
                >
                  {category.status === 'active' ? (
                    <>
                      <XCircle className="w-4 h-4" />
                      Deactivate
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4" />
                      Activate
                    </>
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <CategoryModal
            category={editingCategory}
            onSave={handleSaveCategory}
            onClose={() => {
              setShowAddModal(false);
              setEditingCategory(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedCategory && (
          <ViewCategoryModal
            category={selectedCategory}
            onClose={() => {
              setShowViewModal(false);
              setSelectedCategory(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Category Modal Component
const CategoryModal = ({ category, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: category?.name || '',
    code: category?.code || '',
    description: category?.description || '',
    department: category?.department || 'Pathology',
    containerType: category?.containerType || '',
    volume: category?.volume || '',
    instructions: category?.instructions || '',
    avgTurnaround: category?.avgTurnaround || '',
    requiresFasting: category?.requiresFasting || false,
    accredited: category?.accredited || true,
    homeCollection: category?.homeCollection || false,
    reportsAvailable: category?.reportsAvailable || 'Online & Print',
    status: category?.status || 'active',
    priceRange: category?.priceRange || { min: 50, max: 500 }
  });

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
        className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {category ? 'Edit Category' : 'Add New Category'}
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="e.g., Hematology"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Code *</label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="e.g., HEM"
                  maxLength={5}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                <select
                  required
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="Pathology">Pathology</option>
                  <option value="Radiology">Radiology</option>
                  <option value="Biochemistry">Biochemistry</option>
                  <option value="Microbiology">Microbiology</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="Describe the category and tests included..."
                />
              </div>
            </div>
          </div>

          {/* Sample Collection Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Sample Collection Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Container Type</label>
                <input
                  type="text"
                  value={formData.containerType}
                  onChange={(e) => setFormData({ ...formData, containerType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="e.g., EDTA Tube, Serum Tube"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Required Volume</label>
                <input
                  type="text"
                  value={formData.volume}
                  onChange={(e) => setFormData({ ...formData, volume: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="e.g., 2-5 ml"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Avg. Turnaround Time</label>
                <input
                  type="text"
                  value={formData.avgTurnaround}
                  onChange={(e) => setFormData({ ...formData, avgTurnaround: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="e.g., 24-48 hours"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reports Available</label>
                <select
                  value={formData.reportsAvailable}
                  onChange={(e) => setFormData({ ...formData, reportsAvailable: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="Online & Print">Online & Print</option>
                  <option value="Online Only">Online Only</option>
                  <option value="Print Only">Print Only</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Patient Instructions</label>
                <textarea
                  value={formData.instructions}
                  onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  placeholder="Instructions for patients before sample collection..."
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Range</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Minimum Price ($)</label>
                <input
                  type="number"
                  value={formData.priceRange.min}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    priceRange: { ...formData.priceRange, min: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Price ($)</label>
                <input
                  type="number"
                  value={formData.priceRange.max}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    priceRange: { ...formData.priceRange, max: parseInt(e.target.value) }
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                />
              </div>
            </div>
          </div>

          {/* Options */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Options</h3>
            <div className="flex flex-wrap gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.accredited}
                  onChange={(e) => setFormData({ ...formData, accredited: e.target.checked })}
                  className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                />
                <span className="text-sm text-gray-700">Accredited</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.homeCollection}
                  onChange={(e) => setFormData({ ...formData, homeCollection: e.target.checked })}
                  className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                />
                <span className="text-sm text-gray-700">Home Collection Available</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.requiresFasting}
                  onChange={(e) => setFormData({ ...formData, requiresFasting: e.target.checked })}
                  className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                />
                <span className="text-sm text-gray-700">Requires Fasting</span>
              </label>
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
              {category ? 'Update Category' : 'Add Category'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// View Category Modal Component
const ViewCategoryModal = ({ category, onClose }) => {
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
        className="bg-white rounded-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Category Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-6">
            <div className={`p-4 rounded-xl ${category.status === 'active' ? 'bg-green-100' : 'bg-gray-100'}`}>
              <FolderOpen className={`w-10 h-10 ${category.status === 'active' ? 'text-green-600' : 'text-gray-500'}`} />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="text-2xl font-bold text-gray-900">{category.name}</h3>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  category.status === 'active' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                </span>
              </div>
              <p className="text-gray-600">{category.description}</p>
              <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                <span>Code: {category.code}</span>
                <span>•</span>
                <span>Department: {category.department}</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TestTube className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-600">Total Tests</span>
              </div>
              <p className="text-2xl font-bold text-gray-900">{category.tests}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-600">Active Tests</span>
              </div>
              <p className="text-2xl font-bold text-green-600">{category.activeTests}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-gray-600">Price Range</span>
              </div>
              <p className="text-xl font-bold text-gray-900">${category.priceRange.min} - ${category.priceRange.max}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-600">Turnaround</span>
              </div>
              <p className="text-lg font-bold text-gray-900">{category.avgTurnaround}</p>
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {category.accredited && (
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-blue-100 text-blue-700 rounded-full">
                <CheckCircle className="w-4 h-4 mr-1" />
                Accredited
              </span>
            )}
            {category.homeCollection && (
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-purple-100 text-purple-700 rounded-full">
                <Activity className="w-4 h-4 mr-1" />
                Home Collection Available
              </span>
            )}
            {category.requiresFasting && (
              <span className="inline-flex items-center px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-700 rounded-full">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Fasting Required
              </span>
            )}
          </div>

          {/* Sample Collection Info */}
          <div className="border-t border-gray-200 pt-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Sample Collection Information</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Container Type:</span>
                  <div className="font-medium">{category.containerType}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Required Volume:</span>
                  <div className="font-medium">{category.volume}</div>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Reports Available:</span>
                  <div className="font-medium">{category.reportsAvailable}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Last Updated:</span>
                  <div className="font-medium">{category.lastUpdated}</div>
                </div>
              </div>
            </div>
            {category.instructions && (
              <div className="mt-4">
                <span className="text-sm text-gray-600">Patient Instructions:</span>
                <div className="mt-1 p-3 bg-gray-50 rounded-lg text-gray-700">{category.instructions}</div>
              </div>
            )}
          </div>
        </div>

        <div className="border-t border-gray-200 px-6 py-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TestCategories;

