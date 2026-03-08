import { useState, useEffect } from 'react';
import { 
  FlaskConical, Search, Plus, Edit2, Trash2, Save, X, TrendingUp, 
  DollarSign, Activity, Eye, Download, Upload, Filter, BarChart3,
  PieChart, TestTube, Microscope, AlertTriangle, CheckCircle, Clock
} from 'lucide-react';

const testCategoriesData = [
  { id: 1, name: 'AUDIOLOGY', department: 'ENT (Ear, Nose & Thyroid)', tests: 12, revenue: 45000, status: 'active', avgDuration: '2 hours', description: 'Hearing and balance related tests' },
  { id: 2, name: 'HORMONAL', department: 'LAB', tests: 28, revenue: 89000, status: 'active', avgDuration: '4 hours', description: 'Endocrine hormone level analysis' },
  { id: 3, name: 'Molecular Biology', department: 'LAB', tests: 15, revenue: 120000, status: 'active', avgDuration: '6 hours', description: 'DNA and RNA molecular testing' },
  { id: 4, name: 'ENDOSCOPY REPORT', department: 'GASTROENTEROLOGY', tests: 8, revenue: 34000, status: 'active', avgDuration: '1 hour', description: 'Endoscopic procedure reports' },
  { id: 5, name: 'OTHERS REPORT', department: 'GENERAL', tests: 6, revenue: 12000, status: 'inactive', avgDuration: '3 hours', description: 'Miscellaneous test reports' },
  { id: 6, name: 'UROLOGY REPORT', department: 'UROLOGY', tests: 10, revenue: 28000, status: 'active', avgDuration: '2 hours', description: 'Urological diagnostic tests' },
  { id: 7, name: 'FNAC REPORT', department: 'PATHOLOGY', tests: 14, revenue: 42000, status: 'active', avgDuration: '1 day', description: 'Fine Needle Aspiration Cytology' },
  { id: 8, name: 'CYTO-PATHOLOGY REPORT', department: 'PATHOLOGY', tests: 18, revenue: 67000, status: 'active', avgDuration: '2 days', description: 'Cellular pathology analysis' },
  { id: 9, name: 'CLINICAL PATHOLOGY REPORT', department: 'PATHOLOGY', tests: 22, revenue: 78000, status: 'active', avgDuration: '1 day', description: 'Clinical laboratory pathology' },
  { id: 10, name: 'BLOOD TRANSFUSION & BLOOD BANK', department: 'HEMATOLOGY', tests: 9, revenue: 31000, status: 'active', avgDuration: '4 hours', description: 'Blood banking and transfusion services' },
  { id: 11, name: 'IMMUNOLOGY REPORT', department: 'IMMUNOLOGY', tests: 16, revenue: 56000, status: 'active', avgDuration: '6 hours', description: 'Immune system diagnostic tests' },
  { id: 12, name: 'HEMATOLOGY REPORT', department: 'HEMATOLOGY', tests: 25, revenue: 98000, status: 'active', avgDuration: '3 hours', description: 'Blood and blood disorder tests' },
  { id: 13, name: 'ECHO REPORT', department: 'CARDIOLOGY', tests: 11, revenue: 87000, status: 'active', avgDuration: '1 hour', description: 'Echocardiography reports' },
  { id: 14, name: 'HISTO-PATHOLOGY REPORT', department: 'PATHOLOGY', tests: 20, revenue: 89000, status: 'active', avgDuration: '3 days', description: 'Tissue pathology examination' },
  { id: 15, name: 'ECG REPORT', department: 'CARDIOLOGY', tests: 13, revenue: 45000, status: 'active', avgDuration: '30 mins', description: 'Electrocardiogram analysis' },
];

const departments = ['all', ...new Set(testCategoriesData.map(cat => cat.department))];

export default function TestCategoriesManagement() {
  const [categories, setCategories] = useState(testCategoriesData);
  const [searchTerm, setSearch] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [formData, setFormData] = useState({
    name: '',
    department: '',
    description: '',
    avgDuration: '',
    status: 'active'
  });

  const filteredCategories = categories.filter(category => {
    const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         category.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || category.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  const totalRevenue = categories.reduce((sum, category) => sum + category.revenue, 0);
  const totalTests = categories.reduce((sum, category) => sum + category.tests, 0);
  const activeCategories = categories.filter(cat => cat.status === 'active').length;
  const avgRevenuePerTest = totalRevenue / totalTests;

  const getTopCategories = () => {
    return [...categories].sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  };

  const getDepartmentStats = () => {
    const stats = categories.reduce((acc, cat) => {
      if (!acc[cat.department]) {
        acc[cat.department] = { revenue: 0, tests: 0, categories: 0 };
      }
      acc[cat.department].revenue += cat.revenue;
      acc[cat.department].tests += cat.tests;
      acc[cat.department].categories += 1;
      return acc;
    }, {});
    return Object.entries(stats).sort((a, b) => b[1].revenue - a[1].revenue);
  };

  const openAddModal = () => {
    setFormData({
      name: '',
      department: '',
      description: '',
      avgDuration: '',
      status: 'active'
    });
    setShowAddModal(true);
  };

  const openEditModal = (category) => {
    setSelectedCategory(category);
    setFormData({
      name: category.name,
      department: category.department,
      description: category.description,
      avgDuration: category.avgDuration,
      status: category.status
    });
    setShowEditModal(true);
  };

  const handleAdd = () => {
    const newCategory = {
      ...formData,
      id: Math.max(...categories.map(c => c.id)) + 1,
      tests: 0,
      revenue: 0,
    };
    setCategories([...categories, newCategory]);
    setShowAddModal(false);
  };

  const handleEdit = () => {
    const updatedCategory = {
      ...selectedCategory,
      ...formData,
    };
    setCategories(categories.map(category => 
      category.id === selectedCategory.id ? updatedCategory : category
    ));
    setShowEditModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(category => category.id !== id));
    }
  };

  const toggleStatus = (category) => {
    const updatedCategory = {
      ...category,
      status: category.status === 'active' ? 'inactive' : 'active'
    };
    setCategories(categories.map(cat => cat.id === category.id ? updatedCategory : cat));
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <FlaskConical className="w-8 h-8 text-purple-600" />
            <span className="text-sm text-gray-500">Total Categories</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{categories.length}</p>
          <p className="text-sm text-gray-600">Test categories available</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-blue-600" />
            <span className="text-sm text-gray-500">Total Tests</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalTests}</p>
          <p className="text-sm text-gray-600">Across all categories</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8 text-green-600" />
            <span className="text-sm text-gray-500">Total Revenue</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Monthly revenue</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
            <span className="text-sm text-gray-500">Active</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{activeCategories}</p>
          <p className="text-sm text-gray-600">Currently active</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
            />
          </div>
          
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>
                {dept === 'all' ? 'All Departments' : dept}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              {viewMode === 'grid' ? <BarChart3 className="w-4 h-4" /> : <PieChart className="w-4 h-4" />}
              {viewMode === 'grid' ? 'List View' : 'Grid View'}
            </button>
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Category
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Categories */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-purple-600" />
            Top Revenue Categories
          </h3>
          <div className="space-y-3">
            {getTopCategories().map((category, index) => (
              <div key={category.id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-medium text-gray-900">{category.name}</p>
                    <p className="text-sm text-gray-500">{category.tests} tests</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">${category.revenue.toLocaleString()}</p>
                  <p className="text-sm text-gray-500">{category.avgDuration}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Department Performance */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-blue-600" />
            Department Performance
          </h3>
          <div className="space-y-3">
            {getDepartmentStats().slice(0, 5).map(([dept, stats]) => (
              <div key={dept} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{dept}</span>
                  <span className="text-sm text-gray-500">${stats.revenue.toLocaleString()}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(stats.revenue / totalRevenue) * 100}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{stats.categories} categories</span>
                  <span>{stats.tests} tests</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Categories Display */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
                    <FlaskConical className="w-6 h-6 text-purple-600" />
                  </div>
                  <button
                    onClick={() => toggleStatus(category)}
                    className={`px-2 py-1 rounded-full text-xs font-medium ${
                      category.status === 'active' 
                        ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    {category.status}
                  </button>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">{category.name}</h3>
                <p className="text-sm text-gray-500 mb-4">{category.department}</p>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{category.description}</p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Tests</span>
                    <span className="font-medium">{category.tests}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Revenue</span>
                    <span className="font-medium text-green-600">${category.revenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Avg Duration</span>
                    <span className="font-medium">{category.avgDuration}</span>
                  </div>
                </div>
              </div>
              
              <div className="px-6 py-3 bg-gray-50 border-t border-gray-100">
                <div className="flex gap-2">
                  <button
                    onClick={() => openEditModal(category)}
                    className="flex-1 px-3 py-1 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
                  >
                    <Edit2 className="w-3 h-3" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="flex-1 px-3 py-1 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors flex items-center justify-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Department</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tests</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Revenue</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Duration</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredCategories.map((category) => (
                  <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{category.name}</p>
                        <p className="text-sm text-gray-500 line-clamp-1">{category.description}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{category.department}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium">{category.tests}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-green-600">${category.revenue.toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-sm text-gray-700">{category.avgDuration}</span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => toggleStatus(category)}
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          category.status === 'active' 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        } transition-colors`}
                      >
                        {category.status}
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(category)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(category.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
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
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Add New Category</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                  placeholder="Enter category name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                >
                  <option value="">Select department</option>
                  {departments.slice(1).map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none resize-none"
                  placeholder="Enter category description"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Average Duration</label>
                <input
                  type="text"
                  value={formData.avgDuration}
                  onChange={(e) => setFormData({...formData, avgDuration: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                  placeholder="e.g., 2 hours"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
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
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Edit Category</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                <select
                  value={formData.department}
                  onChange={(e) => setFormData({...formData, department: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                >
                  {departments.slice(1).map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none resize-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Average Duration</label>
                <input
                  type="text"
                  value={formData.avgDuration}
                  onChange={(e) => setFormData({...formData, avgDuration: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({...formData, status: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="p-6 border-t border-gray-200 flex gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleEdit}
                className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
