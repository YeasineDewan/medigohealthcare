import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  List, Plus, Edit2, Trash2, Search, 
  X, Save, DollarSign, Clock, CheckCircle, XCircle,
  Filter, Download, Upload, Eye
} from 'lucide-react';

// Mock data for services
const initialServices = [
  { id: 1, name: 'General Consultation', category: 'Consultation Services', price: 500, duration: 30, featured: true, active: true },
  { id: 2, name: 'Specialist Consultation', category: 'Consultation Services', price: 1000, duration: 45, featured: true, active: true },
  { id: 3, name: 'Complete Blood Count', category: 'Diagnostic Services', price: 350, duration: 15, featured: false, active: true },
  { id: 4, name: 'Liver Function Test', category: 'Diagnostic Services', price: 800, duration: 20, featured: true, active: true },
  { id: 5, name: 'Physical Therapy Session', category: 'Treatment Services', price: 600, duration: 60, featured: false, active: true },
  { id: 6, name: 'Annual Health Checkup', category: 'Preventive Care', price: 3500, duration: 120, featured: true, active: true },
  { id: 7, name: 'ECG Test', category: 'Diagnostic Services', price: 400, duration: 15, featured: false, active: true },
  { id: 8, name: 'Emergency Care', category: 'Emergency Services', price: 2000, duration: 0, featured: false, active: false },
];

const categories = [
  'Consultation Services',
  'Diagnostic Services',
  'Treatment Services',
  'Preventive Care',
  'Emergency Services'
];

export default function ServiceList() {
  const [services, setServices] = useState(initialServices);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: categories[0],
    price: 0,
    duration: 30,
    featured: false,
    active: true,
    description: '',
    requirements: ''
  });

  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filterCategory || service.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingService) {
      setServices(services.map(s => 
        s.id === editingService.id ? { ...s, ...formData } : s
      ));
    } else {
      setServices([...services, { id: Date.now(), ...formData }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      setServices(services.filter(s => s.id !== id));
    }
  };

  const handleToggleActive = (id) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, active: !s.active } : s
    ));
  };

  const handleToggleFeatured = (id) => {
    setServices(services.map(s => 
      s.id === id ? { ...s, featured: !s.featured } : s
    ));
  };

  const openModal = (service = null) => {
    if (service) {
      setEditingService(service);
      setFormData({
        name: service.name,
        category: service.category,
        price: service.price,
        duration: service.duration,
        featured: service.featured,
        active: service.active,
        description: '',
        requirements: ''
      });
    } else {
      setEditingService(null);
      setFormData({
        name: '',
        category: categories[0],
        price: 0,
        duration: 30,
        featured: false,
        active: true,
        description: '',
        requirements: ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingService(null);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT' }).format(price);
  };

  const formatDuration = (minutes) => {
    if (minutes === 0) return 'N/A';
    if (minutes < 60) return `${minutes} min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service List</h1>
          <p className="text-gray-500 mt-1">Manage all healthcare services offered by your platform</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => openModal()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#165028] text-white rounded-xl hover:bg-[#0f3d1c] transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Service
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="pl-10 pr-8 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none appearance-none bg-white min-w-[200px]"
          >
            <option value="">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Services Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Service</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Duration</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Featured</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredServices.map((service) => (
                <motion.tr
                  key={service.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#f0fdf2] flex items-center justify-center">
                        <List className="w-5 h-5 text-[#5DBB63]" />
                      </div>
                      <span className="font-medium text-gray-900">{service.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{service.category}</td>
                  <td className="px-6 py-4 font-medium text-gray-900">{formatPrice(service.price)}</td>
                  <td className="px-6 py-4 text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-gray-400" />
                      {formatDuration(service.duration)}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleActive(service.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        service.active 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {service.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleFeatured(service.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        service.featured 
                          ? 'text-amber-500 bg-amber-50' 
                          : 'text-gray-400 hover:bg-gray-100'
                      }`}
                    >
                      <StarIcon filled={service.featured} />
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openModal(service)}
                        className="p-2 text-gray-400 hover:text-[#5DBB63] hover:bg-[#f0fdf2] rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(service.id)}
                        className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <List className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No services found</p>
          </div>
        )}
      </div>

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
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingService ? 'Edit Service' : 'Add Service'}
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
                    Service Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Price (BDT)
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                      min="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (minutes)
                  </label>
                  <input
                    type="number"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                    min="0"
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

                <div className="flex gap-6">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.active}
                      onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                      className="w-5 h-5 text-[#5DBB63] rounded focus:ring-2 focus:ring-[#5DBB63]/20"
                    />
                    <span className="text-gray-700">Active</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-5 h-5 text-[#5DBB63] rounded focus:ring-2 focus:ring-[#5DBB63]/20"
                    />
                    <span className="text-gray-700">Featured</span>
                  </label>
                </div>

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
                    {editingService ? 'Update' : 'Create'}
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

function StarIcon({ filled }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill={filled ? "currentColor" : "none"} 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className="w-4 h-4"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

