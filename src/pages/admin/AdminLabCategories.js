import { useState, useEffect } from 'react';
import { 
  Search, Plus, FolderOpen, Edit2, Trash2, Save, X, Filter, Download,
  TrendingUp, TrendingDown, DollarSign, Clock, CheckCircle, AlertTriangle,
  Calendar, User, BarChart3, Activity, TestTube, Microscope, Hash,
  FileText, Eye, EyeOff, Lock, Unlock, Copy, Archive, Star
} from 'lucide-react';

const initialCategories = [
  { 
    id: 1, 
    name: 'Hematology', 
    code: 'HEM',
    description: 'Blood and blood-forming tissues analysis',
    testCount: 45,
    totalRequests: 1234,
    avgPrice: 350,
    status: 'active',
    icon: 'TestTube',
    color: '#ef4444',
    isPopular: true,
    department: 'Pathology',
    sampleTypes: ['Blood', 'Plasma', 'Serum'],
    equipment: ['Hematology Analyzer', 'Microscope'],
    turnaroundTime: '2-4 hours'
  },
  { 
    id: 2, 
    name: 'Biochemistry', 
    code: 'BIO',
    description: 'Chemical processes and substances in living organisms',
    testCount: 67,
    totalRequests: 2156,
    avgPrice: 450,
    status: 'active',
    icon: 'FlaskConical',
    color: '#3b82f6',
    isPopular: true,
    department: 'Pathology',
    sampleTypes: ['Blood', 'Serum', 'Plasma', 'Urine'],
    equipment: ['Autoanalyzer', 'Spectrophotometer'],
    turnaroundTime: '4-6 hours'
  },
  { 
    id: 3, 
    name: 'Microbiology', 
    code: 'MIC',
    description: 'Study of microorganisms and their effects',
    testCount: 34,
    totalRequests: 892,
    avgPrice: 280,
    status: 'active',
    icon: 'Microscope',
    color: '#10b981',
    isPopular: false,
    department: 'Pathology',
    sampleTypes: ['Swab', 'Urine', 'Stool', 'Blood'],
    equipment: ['Incubator', 'Microscope', 'Culture Media'],
    turnaroundTime: '24-72 hours'
  },
  { 
    id: 4, 
    name: 'Immunology', 
    code: 'IMM',
    description: 'Immune system and immune responses analysis',
    testCount: 28,
    totalRequests: 567,
    avgPrice: 620,
    status: 'active',
    icon: 'Shield',
    color: '#8b5cf6',
    isPopular: false,
    department: 'Pathology',
    sampleTypes: ['Blood', 'Serum'],
    equipment: ['ELISA Reader', 'Flow Cytometer'],
    turnaroundTime: '6-8 hours'
  },
  { 
    id: 5, 
    name: 'Endocrinology', 
    code: 'END',
    description: 'Hormone and endocrine gland analysis',
    testCount: 22,
    totalRequests: 445,
    avgPrice: 750,
    status: 'active',
    icon: 'Activity',
    color: '#f59e0b',
    isPopular: false,
    department: 'Pathology',
    sampleTypes: ['Blood', 'Serum', 'Urine'],
    equipment: ['Immunoassay Analyzer', 'Gamma Counter'],
    turnaroundTime: '4-6 hours'
  },
];

export default function AdminLabCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterDepartment, setFilterDepartment] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    department: '',
    sampleTypes: [],
    equipment: [],
    turnaroundTime: '',
    avgPrice: 0,
    icon: 'TestTube',
    color: '#3b82f6',
    isPopular: false,
    status: 'active'
  });

  const departments = ['all', 'Pathology', 'Radiology', 'Cardiology', 'Neurology'];
  const statuses = ['all', 'active', 'inactive'];
  const iconOptions = [
    { value: 'TestTube', label: 'Test Tube' },
    { value: 'FlaskConical', label: 'Flask' },
    { value: 'Microscope', label: 'Microscope' },
    { value: 'Shield', label: 'Shield' },
    { value: 'Activity', label: 'Activity' },
    { value: 'Dna', label: 'DNA' },
    { value: 'Heart', label: 'Heart' },
    { value: 'Brain', label: 'Brain' }
  ];

  const totalRevenue = categories.reduce((sum, cat) => sum + (cat.totalRequests * cat.avgPrice), 0);
  const totalTests = categories.reduce((sum, cat) => sum + cat.testCount, 0);

  const filteredCategories = categories.filter(cat => {
    const matchesSearch = cat.name.toLowerCase().includes(search.toLowerCase()) || 
                         cat.code.toLowerCase().includes(search.toLowerCase()) ||
                         cat.description.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === 'all' || cat.status === filterStatus;
    const matchesDepartment = filterDepartment === 'all' || cat.department === filterDepartment;
    return matchesSearch && matchesStatus && matchesDepartment;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50 border-green-200';
      case 'inactive': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const openAddModal = () => {
    setFormData({
      name: '',
      code: '',
      description: '',
      department: '',
      sampleTypes: [],
      equipment: [],
      turnaroundTime: '',
      avgPrice: 0,
      icon: 'TestTube',
      color: '#3b82f6',
      isPopular: false,
      status: 'active'
    });
    setShowAddModal(true);
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      code: category.code,
      description: category.description,
      department: category.department,
      sampleTypes: category.sampleTypes,
      equipment: category.equipment,
      turnaroundTime: category.turnaroundTime,
      avgPrice: category.avgPrice,
      icon: category.icon,
      color: category.color,
      isPopular: category.isPopular,
      status: category.status
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (category) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const openViewModal = (category) => {
    setSelectedCategory(category);
    setShowViewModal(true);
  };

  const handleAdd = () => {
    const newCategory = {
      ...formData,
      id: Math.max(...categories.map(c => c.id)) + 1,
      testCount: 0,
      totalRequests: 0
    };
    setCategories([...categories, newCategory]);
    setShowAddModal(false);
  };

  const handleEdit = () => {
    const updatedCategory = {
      ...selectedCategory,
      ...formData
    };
    setCategories(categories.map(cat => cat.id === selectedCategory.id ? updatedCategory : cat));
    setShowEditModal(false);
  };

  const handleDelete = () => {
    setCategories(categories.filter(cat => cat.id !== selectedCategory.id));
    setShowDeleteModal(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayInputChange = (field, value) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({ ...prev, [field]: items }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl">
                <FolderOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Test Categories</h1>
                <p className="text-gray-600">Professional test category management system</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-4 h-4" />
                Add Category
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <FolderOpen className="w-8 h-8 text-purple-600" />
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-gray-500 text-sm">Total Categories</p>
            <p className="text-3xl font-bold text-gray-900">{categories.length}</p>
            <p className="text-xs text-green-600 mt-1">+2 new this month</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <TestTube className="w-8 h-8 text-blue-600" />
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-gray-500 text-sm">Total Tests</p>
            <p className="text-3xl font-bold text-gray-900">{totalTests}</p>
            <p className="text-xs text-green-600 mt-1">+12% from last month</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-600" />
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-1">+18% from last month</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Star className="w-8 h-8 text-amber-600" />
              <BarChart3 className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-gray-500 text-sm">Popular Categories</p>
            <p className="text-3xl font-bold text-gray-900">{categories.filter(c => c.isPopular).length}</p>
            <p className="text-xs text-amber-600 mt-1">High demand tests</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                placeholder="Search by name, code, or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none"
              />
            </div>
            <select
              value={filterDepartment}
              onChange={(e) => setFilterDepartment(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none"
            >
              {departments.map(dept => (
                <option key={dept} value={dept}>
                  {dept === 'all' ? 'All Departments' : dept}
                </option>
              ))}
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="h-2" style={{ backgroundColor: category.color }}></div>
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${category.color}20` }}
                    >
                      <TestTube className="w-6 h-6" style={{ color: category.color }} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{category.name}</h3>
                      <p className="text-sm text-gray-500">Code: {category.code}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {category.isPopular && <Star className="w-4 h-4 text-amber-500 fill-current" />}
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(category.status)}`}>
                      {category.status}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{category.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Department</span>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-lg">{category.department}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Tests</span>
                    <span className="font-medium">{category.testCount} tests</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Requests</span>
                    <span className="font-medium">{category.totalRequests}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Avg Price</span>
                    <span className="font-bold text-green-600">${category.avgPrice}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Turnaround</span>
                    <span className="font-medium text-xs">{category.turnaroundTime}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{category.turnaroundTime}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openViewModal(category)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openEditModal(category)}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(category)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View Modal */}
        {showViewModal && selectedCategory && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Category Details</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Basic Information</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-500">Name</label>
                        <p className="font-medium">{selectedCategory.name}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Code</label>
                        <p className="font-medium">{selectedCategory.code}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Description</label>
                        <p className="font-medium">{selectedCategory.description}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Department</label>
                        <p className="font-medium">{selectedCategory.department}</p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-4">Technical Details</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-500">Sample Types</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedCategory.sampleTypes.map((type, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 rounded-lg text-sm">{type}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Equipment</label>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {selectedCategory.equipment.map((equip, idx) => (
                            <span key={idx} className="px-2 py-1 bg-gray-100 rounded-lg text-sm">{equip}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="text-sm text-gray-500">Turnaround Time</label>
                        <p className="font-medium">{selectedCategory.turnaroundTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Add New Category</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter category name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Code</label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => handleInputChange('code', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter category code"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Select department</option>
                      {departments.slice(1).map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Average Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.avgPrice}
                      onChange={(e) => handleInputChange('avgPrice', parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter average price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                    <select
                      value={formData.icon}
                      onChange={(e) => handleInputChange('icon', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      {iconOptions.map(icon => (
                        <option key={icon.value} value={icon.value}>{icon.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => handleInputChange('color', e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sample Types</label>
                    <input
                      type="text"
                      value={formData.sampleTypes.join(', ')}
                      onChange={(e) => handleArrayInputChange('sampleTypes', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Blood, Serum, Plasma..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Equipment</label>
                    <input
                      type="text"
                      value={formData.equipment.join(', ')}
                      onChange={(e) => handleArrayInputChange('equipment', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Analyzer, Microscope..."
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Turnaround Time</label>
                    <input
                      type="text"
                      value={formData.turnaroundTime}
                      onChange={(e) => handleInputChange('turnaroundTime', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., 2-4 hours"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter category description"
                    />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.isPopular}
                        onChange={(e) => handleInputChange('isPopular', e.target.checked)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Popular Category</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  className="px-6 py-2 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Add Category
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Modal */}
        {showEditModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Edit Category</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category Code</label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => handleInputChange('code', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                    <select
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      {departments.slice(1).map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Average Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.avgPrice}
                      onChange={(e) => handleInputChange('avgPrice', parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                    <select
                      value={formData.icon}
                      onChange={(e) => handleInputChange('icon', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      {iconOptions.map(icon => (
                        <option key={icon.value} value={icon.value}>{icon.label}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) => handleInputChange('color', e.target.value)}
                      className="w-full h-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sample Types</label>
                    <input
                      type="text"
                      value={formData.sampleTypes.join(', ')}
                      onChange={(e) => handleArrayInputChange('sampleTypes', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Equipment</label>
                    <input
                      type="text"
                      value={formData.equipment.join(', ')}
                      onChange={(e) => handleArrayInputChange('equipment', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Turnaround Time</label>
                    <input
                      type="text"
                      value={formData.turnaroundTime}
                      onChange={(e) => handleInputChange('turnaroundTime', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div className="md:col-span-2 flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.isPopular}
                        onChange={(e) => handleInputChange('isPopular', e.target.checked)}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Popular Category</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
                <button
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEdit}
                  className="px-6 py-2 rounded-xl bg-purple-600 text-white font-medium hover:bg-purple-700 transition-colors flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Delete Modal */}
        {showDeleteModal && selectedCategory && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Delete Category</h2>
                    <p className="text-gray-600">Are you sure you want to delete this category?</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg mb-4">
                  <p className="font-medium text-gray-900">{selectedCategory.name}</p>
                  <p className="text-sm text-gray-500">Code: {selectedCategory.code}</p>
                  <p className="text-sm text-gray-500">Tests: {selectedCategory.testCount}</p>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="px-6 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    className="px-6 py-2 rounded-xl bg-red-600 text-white font-medium hover:bg-red-700 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
