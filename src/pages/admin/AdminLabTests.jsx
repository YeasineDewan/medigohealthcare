import { useState, useEffect } from 'react';
import { 
  Search, Plus, FlaskConical, Edit2, Trash2, Save, X, Filter, Download,
  TrendingUp, TrendingDown, DollarSign, Clock, CheckCircle, AlertTriangle,
  Calendar, User, BarChart3, Activity, TestTube, Microscope
} from 'lucide-react';

const initialTests = [
  { 
    id: 1, 
    name: 'Complete Blood Count', 
    code: 'CBC-001',
    price: 500, 
    requests: 234,
    category: 'Hematology',
    duration: '2 hours',
    preparation: 'Fasting required',
    description: 'Comprehensive blood analysis including RBC, WBC, platelets',
    status: 'active'
  },
  { 
    id: 2, 
    name: 'Lipid Profile', 
    code: 'LIP-002',
    price: 800, 
    requests: 156,
    category: 'Cardiology',
    duration: '4 hours',
    preparation: '12 hours fasting',
    description: 'Cholesterol and triglycerides analysis',
    status: 'active'
  },
  { 
    id: 3, 
    name: 'Thyroid Function', 
    code: 'THY-003',
    price: 900, 
    requests: 89,
    category: 'Endocrinology',
    duration: '3 hours',
    preparation: 'No special preparation',
    description: 'T3, T4, and TSH hormone levels',
    status: 'active'
  },
];

export default function AdminLabTests() {
  const [tests, setTests] = useState(initialTests);
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    price: 0,
    category: '',
    duration: '',
    preparation: '',
    description: '',
    status: 'active'
  });

  const categories = ['all', 'Hematology', 'Cardiology', 'Endocrinology', 'Biochemistry', 'Microbiology', 'Immunology', 'Pathology'];
  const statuses = ['all', 'active', 'inactive'];

  const totalRevenue = tests.reduce((sum, test) => sum + (test.requests * test.price), 0);
  const totalRequests = tests.reduce((sum, test) => sum + test.requests, 0);

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(search.toLowerCase()) || 
                         test.code.toLowerCase().includes(search.toLowerCase()) ||
                         test.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = filterCategory === 'all' || test.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || test.status === filterStatus;
    return matchesSearch && matchesCategory && matchesStatus;
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
      price: 0,
      category: '',
      duration: '',
      preparation: '',
      description: '',
      status: 'active'
    });
    setShowAddModal(true);
  };

  const openEditModal = (test) => {
    setSelectedTest(test);
    setFormData({
      name: test.name,
      code: test.code,
      price: test.price,
      category: test.category,
      duration: test.duration,
      preparation: test.preparation,
      description: test.description,
      status: test.status
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (test) => {
    setSelectedTest(test);
    setShowDeleteModal(true);
  };

  const handleAdd = () => {
    const newTest = {
      ...formData,
      id: Math.max(...tests.map(t => t.id)) + 1,
      requests: 0
    };
    setTests([...tests, newTest]);
    setShowAddModal(false);
  };

  const handleEdit = () => {
    const updatedTest = {
      ...selectedTest,
      ...formData
    };
    setTests(tests.map(test => test.id === selectedTest.id ? updatedTest : test));
    setShowEditModal(false);
  };

  const handleDelete = () => {
    setTests(tests.filter(test => test.id !== selectedTest.id));
    setShowDeleteModal(false);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl">
                <FlaskConical className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Lab Tests Management</h1>
                <p className="text-gray-600">Comprehensive test catalog management system</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={openAddModal}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:from-purple-700 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Plus className="w-4 h-4" />
                Add Test
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <TestTube className="w-8 h-8 text-purple-600" />
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-gray-500 text-sm">Total Tests</p>
            <p className="text-3xl font-bold text-gray-900">{tests.length}</p>
            <p className="text-xs text-green-600 mt-1">+5 new this month</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Activity className="w-8 h-8 text-blue-600" />
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-gray-500 text-sm">Total Requests</p>
            <p className="text-3xl font-bold text-gray-900">{totalRequests}</p>
            <p className="text-xs text-green-600 mt-1">+18% from last month</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <DollarSign className="w-8 h-8 text-green-600" />
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
            <p className="text-xs text-green-600 mt-1">+22% from last month</p>
          </div>
          <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
            <div className="flex items-center justify-between mb-2">
              <Clock className="w-8 h-8 text-amber-600" />
              <BarChart3 className="w-4 h-4 text-blue-500" />
            </div>
            <p className="text-gray-500 text-sm">Avg. Duration</p>
            <p className="text-3xl font-bold text-gray-900">3.2h</p>
            <p className="text-xs text-blue-600 mt-1">Across all tests</p>
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
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 outline-none"
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>
                  {cat === 'all' ? 'All Categories' : cat}
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

        {/* Tests Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTests.map((test) => (
            <div key={test.id} className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center">
                      <Microscope className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">{test.name}</h3>
                      <p className="text-sm text-gray-500">Code: {test.code}</p>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(test.status)}`}>
                    {test.status}
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{test.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Category</span>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 rounded-lg">{test.category}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium">{test.duration}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Preparation</span>
                    <span className="font-medium text-xs">{test.preparation}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-500">Price</span>
                    <span className="font-bold text-lg text-green-600">${test.price}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Activity className="w-4 h-4" />
                      <span>{test.requests} requests</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEditModal(test)}
                      className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => openDeleteModal(test)}
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

        {/* Add Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Add New Lab Test</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Test Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter test name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Test Code</label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => handleInputChange('code', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter test code"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter price"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="">Select category</option>
                      {categories.slice(1).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., 2 hours"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preparation</label>
                    <input
                      type="text"
                      value={formData.preparation}
                      onChange={(e) => handleInputChange('preparation', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="e.g., Fasting required"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      placeholder="Enter test description"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
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
                  Add Test
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
                <h2 className="text-xl font-bold text-gray-900">Edit Lab Test</h2>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Test Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Test Code</label>
                    <input
                      type="text"
                      value={formData.code}
                      onChange={(e) => handleInputChange('code', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => handleInputChange('price', parseFloat(e.target.value))}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => handleInputChange('category', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      {categories.slice(1).map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <input
                      type="text"
                      value={formData.duration}
                      onChange={(e) => handleInputChange('duration', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preparation</label>
                    <input
                      type="text"
                      value={formData.preparation}
                      onChange={(e) => handleInputChange('preparation', e.target.value)}
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => handleInputChange('status', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
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
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Delete Test</h2>
                    <p className="text-gray-600">Are you sure you want to delete this test?</p>
                  </div>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg mb-4">
                  <p className="font-medium text-gray-900">{selectedTest?.name}</p>
                  <p className="text-sm text-gray-500">Code: {selectedTest?.code}</p>
                  <p className="text-sm text-gray-500">Price: ${selectedTest?.price}</p>
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
