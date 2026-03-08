import { useState, useEffect } from 'react';
import { 
  TestTube, Search, Filter, Plus, Edit2, Trash2, Save, X, TrendingUp, 
  TrendingDown, Activity, Eye, Download, Upload, AlertTriangle, CheckCircle,
  Clock, BarChart3, PieChart, FlaskConical, Microscope, Package
} from 'lucide-react';

const specimenData = [
  { id: 1, name: 'EDTA PLASMA', usage: 245, category: 'Blood Tests', trend: 'up', stock: 89, criticalLevel: 50, lastRestock: '2024-03-01' },
  { id: 2, name: 'NG SERUM & SODIUM FLUORIDE PLASMA', usage: 189, category: 'Metabolic', trend: 'up', stock: 67, criticalLevel: 40, lastRestock: '2024-03-02' },
  { id: 3, name: 'EDTA WHOLE BLOOD', usage: 312, category: 'Hematology', trend: 'stable', stock: 145, criticalLevel: 80, lastRestock: '2024-02-28' },
  { id: 4, name: 'SPUTUM', usage: 98, category: 'Microbiology', trend: 'down', stock: 34, criticalLevel: 30, lastRestock: '2024-03-03' },
  { id: 5, name: 'SODIUM CITRATE PLASMA', usage: 156, category: 'Coagulation', trend: 'up', stock: 78, criticalLevel: 50, lastRestock: '2024-03-01' },
  { id: 6, name: 'LITHIUM HEPARIN BLOOD', usage: 201, category: 'Blood Tests', trend: 'up', stock: 92, criticalLevel: 60, lastRestock: '2024-02-27' },
  { id: 7, name: 'ASCITIC FLUID', usage: 45, category: 'Fluid Analysis', trend: 'stable', stock: 23, criticalLevel: 20, lastRestock: '2024-03-02' },
  { id: 8, name: 'SWAB', usage: 134, category: 'Microbiology', trend: 'up', stock: 156, criticalLevel: 100, lastRestock: '2024-03-01' },
  { id: 9, name: 'NAIL CLIP', usage: 67, category: 'Dermatology', trend: 'stable', stock: 45, criticalLevel: 30, lastRestock: '2024-02-25' },
  { id: 10, name: 'PROSTATE SMEAR', usage: 89, category: 'Urology', trend: 'up', stock: 38, criticalLevel: 40, lastRestock: '2024-03-03' },
  { id: 11, name: 'SKIN SCRAP', usage: 78, category: 'Dermatology', trend: 'stable', stock: 52, criticalLevel: 40, lastRestock: '2024-02-28' },
  { id: 12, name: 'STOOL', usage: 145, category: 'Gastroenterology', trend: 'up', stock: 89, criticalLevel: 60, lastRestock: '2024-03-02' },
  { id: 13, name: 'URINE', usage: 289, category: 'Urinalysis', trend: 'up', stock: 234, criticalLevel: 150, lastRestock: '2024-03-01' },
  { id: 14, name: 'BODY FLUID', usage: 56, category: 'Fluid Analysis', trend: 'stable', stock: 34, criticalLevel: 30, lastRestock: '2024-03-03' },
  { id: 15, name: 'SERUM & EDTA WHOLE BLOOD', usage: 178, category: 'Blood Tests', trend: 'up', stock: 98, criticalLevel: 70, lastRestock: '2024-02-27' },
  { id: 16, name: 'SODIUM CITRATE BLOOD', usage: 123, category: 'Coagulation', trend: 'stable', stock: 67, criticalLevel: 50, lastRestock: '2024-03-02' },
  { id: 17, name: 'PUS', usage: 34, category: 'Microbiology', trend: 'down', stock: 28, criticalLevel: 25, lastRestock: '2024-03-03' },
  { id: 18, name: 'BLOOD', usage: 423, category: 'Blood Tests', trend: 'up', stock: 189, criticalLevel: 120, lastRestock: '2024-03-01' },
  { id: 19, name: 'FLUID', usage: 89, category: 'Fluid Analysis', trend: 'stable', stock: 45, criticalLevel: 40, lastRestock: '2024-03-02' },
  { id: 20, name: '24HRS URINE & URINE VOLUME', usage: 67, category: 'Urinalysis', trend: 'up', stock: 38, criticalLevel: 35, lastRestock: '2024-03-03' },
  { id: 21, name: 'SERUM & SODIUM FLUORIDE PLASMA', usage: 145, category: 'Metabolic', trend: 'up', stock: 76, criticalLevel: 50, lastRestock: '2024-02-28' },
  { id: 22, name: 'VAGINAL SWAB', usage: 98, category: 'Gynecology', trend: 'stable', stock: 89, criticalLevel: 60, lastRestock: '2024-03-01' },
  { id: 23, name: 'THROAT SWAB', usage: 112, category: 'Microbiology', trend: 'up', stock: 134, criticalLevel: 80, lastRestock: '2024-03-02' },
  { id: 24, name: 'SMEAR', usage: 76, category: 'Pathology', trend: 'stable', stock: 56, criticalLevel: 40, lastRestock: '2024-03-03' },
  { id: 25, name: 'SERUM', usage: 367, category: 'Blood Tests', trend: 'up', stock: 267, criticalLevel: 180, lastRestock: '2024-03-01' },
  { id: 26, name: 'SPOT URINE', usage: 134, category: 'Urinalysis', trend: 'up', stock: 98, criticalLevel: 70, lastRestock: '2024-03-02' },
  { id: 27, name: 'RANDOM URINE', usage: 156, category: 'Urinalysis', trend: 'up', stock: 112, criticalLevel: 80, lastRestock: '2024-03-01' },
  { id: 28, name: 'HAIR PLUCK', usage: 23, category: 'Dermatology', trend: 'stable', stock: 34, criticalLevel: 20, lastRestock: '2024-02-25' },
  { id: 29, name: 'PLEURAL FLUID', usage: 41, category: 'Fluid Analysis', trend: 'stable', stock: 28, criticalLevel: 25, lastRestock: '2024-03-03' },
  { id: 30, name: 'TRACHEAL ASPIRATE', usage: 28, category: 'Respiratory', trend: 'down', stock: 22, criticalLevel: 20, lastRestock: '2024-03-03' },
  { id: 31, name: 'SEMEN', usage: 56, category: 'Andrology', trend: 'stable', stock: 41, criticalLevel: 30, lastRestock: '2024-03-02' },
];

const categories = ['all', 'Blood Tests', 'Metabolic', 'Hematology', 'Microbiology', 'Coagulation', 'Fluid Analysis', 'Dermatology', 'Urology', 'Gastroenterology', 'Urinalysis', 'Gynecology', 'Pathology', 'Respiratory', 'Andrology'];

export default function SpecimenManagement() {
  const [specimens, setSpecimens] = useState(specimenData);
  const [searchTerm, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSpecimen, setSelectedSpecimen] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    criticalLevel: 0,
    stock: 0,
  });

  const filteredSpecimens = specimens.filter(specimen => {
    const matchesSearch = specimen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         specimen.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || specimen.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const criticalSpecimens = specimens.filter(specimen => specimen.stock <= specimen.criticalLevel);
  const totalUsage = specimens.reduce((sum, specimen) => sum + specimen.usage, 0);
  const totalStock = specimens.reduce((sum, specimen) => sum + specimen.stock, 0);

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <Activity className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStockStatus = (stock, criticalLevel) => {
    if (stock <= criticalLevel) return 'critical';
    if (stock <= criticalLevel * 1.5) return 'low';
    return 'normal';
  };

  const getStockColor = (stock, criticalLevel) => {
    const status = getStockStatus(stock, criticalLevel);
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'low': return 'bg-amber-100 text-amber-700 border-amber-200';
      default: return 'bg-green-100 text-green-700 border-green-200';
    }
  };

  const openAddModal = () => {
    setFormData({
      name: '',
      category: '',
      criticalLevel: 0,
      stock: 0,
    });
    setShowAddModal(true);
  };

  const openEditModal = (specimen) => {
    setSelectedSpecimen(specimen);
    setFormData({
      name: specimen.name,
      category: specimen.category,
      criticalLevel: specimen.criticalLevel,
      stock: specimen.stock,
    });
    setShowEditModal(true);
  };

  const handleAdd = () => {
    const newSpecimen = {
      ...formData,
      id: Math.max(...specimens.map(s => s.id)) + 1,
      usage: 0,
      trend: 'stable',
      lastRestock: new Date().toISOString().split('T')[0],
    };
    setSpecimens([...specimens, newSpecimen]);
    setShowAddModal(false);
  };

  const handleEdit = () => {
    const updatedSpecimen = {
      ...selectedSpecimen,
      ...formData,
    };
    setSpecimens(specimens.map(specimen => 
      specimen.id === selectedSpecimen.id ? updatedSpecimen : specimen
    ));
    setShowEditModal(false);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this specimen?')) {
      setSpecimens(specimens.filter(specimen => specimen.id !== id));
    }
  };

  const handleRestock = (specimen) => {
    const restockAmount = prompt(`Enter restock amount for ${specimen.name}:`, '50');
    if (restockAmount && !isNaN(restockAmount)) {
      const updatedSpecimen = {
        ...specimen,
        stock: specimen.stock + parseInt(restockAmount),
        lastRestock: new Date().toISOString().split('T')[0],
      };
      setSpecimens(specimens.map(s => s.id === specimen.id ? updatedSpecimen : s));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <TestTube className="w-8 h-8 text-blue-600" />
            <span className="text-sm text-gray-500">Total Types</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{specimens.length}</p>
          <p className="text-sm text-gray-600">Different specimen types</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Activity className="w-8 h-8 text-purple-600" />
            <span className="text-sm text-gray-500">Monthly Usage</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalUsage.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Total specimens processed</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <Package className="w-8 h-8 text-green-600" />
            <span className="text-sm text-gray-500">Current Stock</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{totalStock.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Available specimens</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-8 h-8 text-red-600" />
            <span className="text-sm text-gray-500">Critical Stock</span>
          </div>
          <p className="text-2xl font-bold text-red-600">{criticalSpecimens.length}</p>
          <p className="text-sm text-gray-600">Need immediate restock</p>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search specimens..."
              value={searchTerm}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              onClick={openAddModal}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Specimen
            </button>
            <button className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Critical Alerts */}
      {criticalSpecimens.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-semibold text-red-900">Critical Stock Alert</h3>
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-medium">
              {criticalSpecimens.length} items
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {criticalSpecimens.map(specimen => (
              <div key={specimen.id} className="flex items-center justify-between bg-white rounded-lg p-3">
                <div>
                  <p className="font-medium text-gray-900">{specimen.name}</p>
                  <p className="text-sm text-red-600">Stock: {specimen.stock} (Critical: {specimen.criticalLevel})</p>
                </div>
                <button
                  onClick={() => handleRestock(specimen)}
                  className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                >
                  Restock
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Specimens Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredSpecimens.map((specimen) => (
          <div key={specimen.id} className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-lg flex items-center justify-center">
                  <TestTube className="w-6 h-6 text-blue-600" />
                </div>
                <div className="flex items-center gap-1">
                  {getTrendIcon(specimen.trend)}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStockColor(specimen.stock, specimen.criticalLevel)}`}>
                    {getStockStatus(specimen.stock, specimen.criticalLevel)}
                  </span>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">{specimen.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{specimen.category}</p>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Monthly Usage</span>
                  <span className="font-medium">{specimen.usage}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Current Stock</span>
                  <span className={`font-medium ${
                    specimen.stock <= specimen.criticalLevel ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {specimen.stock}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Critical Level</span>
                  <span className="font-medium text-amber-600">{specimen.criticalLevel}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Last Restock</span>
                  <span className="text-xs">{specimen.lastRestock}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100 flex gap-2">
                <button
                  onClick={() => openEditModal(specimen)}
                  className="flex-1 px-3 py-2 text-sm bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors flex items-center justify-center gap-1"
                >
                  <Edit2 className="w-3 h-3" />
                  Edit
                </button>
                <button
                  onClick={() => handleRestock(specimen)}
                  className="flex-1 px-3 py-2 text-sm bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-1"
                >
                  <Package className="w-3 h-3" />
                  Restock
                </button>
                <button
                  onClick={() => handleDelete(specimen.id)}
                  className="p-2 text-sm bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                >
                  <Trash2 className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-bold text-gray-900">Add New Specimen</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specimen Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  placeholder="Enter specimen name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                >
                  <option value="">Select category</option>
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Critical Level</label>
                <input
                  type="number"
                  value={formData.criticalLevel}
                  onChange={(e) => setFormData({...formData, criticalLevel: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  placeholder="Enter critical stock level"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Initial Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                  placeholder="Enter initial stock"
                />
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
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
              >
                <Save className="w-4 h-4" />
                Add Specimen
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
              <h2 className="text-xl font-bold text-gray-900">Edit Specimen</h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Specimen Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                >
                  {categories.slice(1).map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Critical Level</label>
                <input
                  type="number"
                  value={formData.criticalLevel}
                  onChange={(e) => setFormData({...formData, criticalLevel: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Current Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value) || 0})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none"
                />
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
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
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
