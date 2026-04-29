import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FolderOpen, Plus, Edit2, Trash2, Search, 
  ChevronRight, X, Save, Image, CheckCircle, XCircle
} from 'lucide-react';

// Mock data for service categories
const initialCategories = [
  { id: 1, name: 'Consultation Services', slug: 'consultation', description: 'Doctor consultation services', icon: 'Stethoscope', services: 12, active: true },
  { id: 2, name: 'Diagnostic Services', slug: 'diagnostic', description: 'Lab tests and diagnostics', icon: 'FlaskConical', services: 45, active: true },
  { id: 3, name: 'Treatment Services', slug: 'treatment', description: 'Medical treatments', icon: 'Activity', services: 28, active: true },
  { id: 4, name: 'Preventive Care', slug: 'preventive', description: 'Health checkups and prevention', icon: 'Shield', services: 15, active: true },
  { id: 5, name: 'Emergency Services', slug: 'emergency', description: 'Emergency medical services', icon: 'Ambulance', services: 8, active: false },
];

const iconOptions = [
  { value: 'Stethoscope', label: 'Stethoscope' },
  { value: 'FlaskConical', label: 'Lab Test' },
  { value: 'Activity', label: 'Activity' },
  { value: 'Shield', label: 'Shield' },
  { value: 'Ambulance', label: 'Ambulance' },
  { value: 'Heart', label: 'Heart' },
  { value: 'Brain', label: 'Brain' },
  { value: 'Eye', label: 'Eye' },
  { value: 'Bone', label: 'Bone' },
  { value: 'Baby', label: 'Baby' },
];

export default function ServiceCategories() {
  const [categories, setCategories] = useState(initialCategories);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    icon: 'Stethoscope',
    active: true
  });

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingCategory) {
      setCategories(categories.map(cat => 
        cat.id === editingCategory.id 
          ? { ...cat, ...formData, slug: formData.name.toLowerCase().replace(/\s+/g, '-') }
          : cat
      ));
    } else {
      setCategories([...categories, {
        id: Date.now(),
        ...formData,
        slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
        services: 0,
        active: true
      }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  const handleToggleActive = (id) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, active: !cat.active } : cat
    ));
  };

  const openModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({
        name: category.name,
        description: category.description,
        icon: category.icon,
        active: category.active
      });
    } else {
      setEditingCategory(null);
      setFormData({ name: '', description: '', icon: 'Stethoscope', active: true });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingCategory(null);
    setFormData({ name: '', description: '', icon: 'Stethoscope', active: true });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Categories</h1>
          <p className="text-gray-500 mt-1">Manage service categories for your healthcare platform</p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#165028] text-white rounded-xl hover:bg-[#0f3d1c] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search categories..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
        />
      </div>

      {/* Categories Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-[#f0fdf2] flex items-center justify-center">
                <FolderOpen className="w-6 h-6 text-[#5DBB63]" />
              </div>
              <button
                onClick={() => handleToggleActive(category.id)}
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  category.active 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {category.active ? 'Active' : 'Inactive'}
              </button>
            </div>
            
            <h3 className="font-semibold text-gray-900 mb-1">{category.name}</h3>
            <p className="text-sm text-gray-500 mb-4">{category.description}</p>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <span className="text-sm text-gray-500">{category.services} services</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => openModal(category)}
                  className="p-2 text-gray-400 hover:text-[#5DBB63] hover:bg-[#f0fdf2] rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(category.id)}
                  className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredCategories.length === 0 && (
        <div className="text-center py-12">
          <FolderOpen className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No categories found</p>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingCategory ? 'Edit Category' : 'Add Category'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Icon
                  </label>
                  <select
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                  >
                    {iconOptions.map((icon) => (
                      <option key={icon.value} value={icon.value}>{icon.label}</option>
                    ))}
                  </select>
                </div>

                <label className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                    className="w-5 h-5 text-[#5DBB63] rounded focus:ring-2 focus:ring-[#5DBB63]/20"
                  />
                  <span className="text-gray-700">Active</span>
                </label>

                <div className="flex gap-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2.5 bg-[#165028] text-white rounded-xl hover:bg-[#0f3d1c] transition-colors flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {editingCategory ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

