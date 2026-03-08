import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gift, Plus, Edit2, Trash2, Search, 
  X, Save, DollarSign, Clock, CheckCircle, XCircle,
  Package, Users, Star, Calendar, Eye
} from 'lucide-react';

// Mock data for service packages
const initialPackages = [
  { 
    id: 1, 
    name: 'Basic Health Checkup', 
    description: 'Essential health screening package',
    services: ['Complete Blood Count', 'Urine Analysis', 'Blood Glucose'],
    price: 1500,
    discount: 10,
    validity: 30,
    bookings: 45,
    featured: true,
    active: true
  },
  { 
    id: 2, 
    name: 'Comprehensive Health Package', 
    description: 'Complete health checkup with all major tests',
    services: ['Complete Blood Count', 'Liver Function Test', 'Kidney Function Test', 'Lipid Profile', 'ECG', 'Chest X-Ray'],
    price: 8500,
    discount: 15,
    validity: 60,
    bookings: 28,
    featured: true,
    active: true
  },
  { 
    id: 3, 
    name: 'Diabetes Screening', 
    description: 'Specialized diabetes detection package',
    services: ['Fasting Blood Glucose', 'HbA1c', 'Lipid Profile', 'Kidney Function Test'],
    price: 2500,
    discount: 5,
    validity: 30,
    bookings: 62,
    featured: false,
    active: true
  },
  { 
    id: 4, 
    name: 'Senior Citizen Package', 
    description: 'Health checkup designed for elderly',
    services: ['Complete Blood Count', 'Liver Function Test', 'Kidney Function Test', 'Lipid Profile', 'Thyroid Profile', 'Vitamin D', 'Bone Density'],
    price: 12000,
    discount: 20,
    validity: 90,
    bookings: 15,
    featured: true,
    active: true
  },
  { 
    id: 5, 
    name: 'Women Health Package', 
    description: 'Comprehensive health screening for women',
    services: ['Complete Blood Count', 'Thyroid Profile', 'Vitamin D', 'Iron Studies', 'Mammography'],
    price: 6500,
    discount: 12,
    validity: 45,
    bookings: 33,
    featured: false,
    active: false
  },
];

const availableServices = [
  'Complete Blood Count',
  'Urine Analysis',
  'Blood Glucose',
  'Liver Function Test',
  'Kidney Function Test',
  'Lipid Profile',
  'ECG',
  'Chest X-Ray',
  'Thyroid Profile',
  'HbA1c',
  'Vitamin D',
  'Iron Studies',
  'Bone Density',
  'Mammography',
  'Ultrasound',
  'CT Scan',
  'MRI',
];

export default function ServicePackages() {
  const [packages, setPackages] = useState(initialPackages);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [showDetails, setShowDetails] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    services: [],
    price: 0,
    discount: 0,
    validity: 30,
    featured: false,
    active: true
  });

  const filteredPackages = packages.filter(pkg => 
    pkg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pkg.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateDiscountedPrice = (price, discount) => {
    return price - (price * discount / 100);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPackage) {
      setPackages(packages.map(pkg => 
        pkg.id === editingPackage.id 
          ? { ...pkg, ...formData, bookings: editingPackage.bookings }
          : pkg
      ));
    } else {
      setPackages([...packages, { id: Date.now(), ...formData, bookings: 0 }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      setPackages(packages.filter(pkg => pkg.id !== id));
    }
  };

  const handleToggleActive = (id) => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, active: !pkg.active } : pkg
    ));
  };

  const handleToggleFeatured = (id) => {
    setPackages(packages.map(pkg => 
      pkg.id === id ? { ...pkg, featured: !pkg.featured } : pkg
    ));
  };

  const toggleService = (service) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.includes(service)
        ? prev.services.filter(s => s !== service)
        : [...prev.services, service]
    }));
  };

  const openModal = (pkg = null) => {
    if (pkg) {
      setEditingPackage(pkg);
      setFormData({
        name: pkg.name,
        description: pkg.description,
        services: pkg.services,
        price: pkg.price,
        discount: pkg.discount,
        validity: pkg.validity,
        featured: pkg.featured,
        active: pkg.active
      });
    } else {
      setEditingPackage(null);
      setFormData({
        name: '',
        description: '',
        services: [],
        price: 0,
        discount: 0,
        validity: 30,
        featured: false,
        active: true
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPackage(null);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT' }).format(price);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Packages</h1>
          <p className="text-gray-500 mt-1">Create and manage bundled service packages</p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#165028] text-white rounded-xl hover:bg-[#0f3d1c] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Create Package
        </button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Packages</p>
              <p className="text-2xl font-bold text-gray-900">{packages.length}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Packages</p>
              <p className="text-2xl font-bold text-green-600">{packages.filter(p => p.active).length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Featured</p>
              <p className="text-2xl font-bold text-amber-600">{packages.filter(p => p.featured).length}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Bookings</p>
              <p className="text-2xl font-bold text-blue-600">{packages.reduce((sum, p) => sum + p.bookings, 0)}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search packages..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
        />
      </div>

      {/* Packages Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPackages.map((pkg) => (
          <motion.div
            key={pkg.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
          >
            {/* Header */}
            <div className="p-5 border-b border-gray-100">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Package className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{pkg.name}</h3>
                    <p className="text-xs text-gray-500">{pkg.services.length} services</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  {pkg.featured && (
                    <span className="p-1 bg-amber-100 rounded-lg">
                      <Star className="w-3 h-3 text-amber-600" fill="currentColor" />
                    </span>
                  )}
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    pkg.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {pkg.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-500">{pkg.description}</p>
            </div>

            {/* Services Preview */}
            <div className="px-5 py-3 bg-gray-50">
              <p className="text-xs font-medium text-gray-500 mb-2">Included Services:</p>
              <div className="flex flex-wrap gap-1">
                {pkg.services.slice(0, 3).map((service, idx) => (
                  <span key={idx} className="px-2 py-0.5 bg-white border border-gray-200 rounded text-xs text-gray-600">
                    {service}
                  </span>
                ))}
                {pkg.services.length > 3 && (
                  <span className="px-2 py-0.5 bg-white border border-gray-200 rounded text-xs text-gray-500">
                    +{pkg.services.length - 3} more
                  </span>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-500">Package Price</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-gray-900">
                      {formatPrice(calculateDiscountedPrice(pkg.price, pkg.discount))}
                    </span>
                    {pkg.discount > 0 && (
                      <span className="text-sm text-gray-400 line-through">
                        {formatPrice(pkg.price)}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Valid for</p>
                  <p className="font-medium text-gray-900">{pkg.validity} days</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <Users className="w-4 h-4" />
                  {pkg.bookings} bookings
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setShowDetails(pkg.id)}
                    className="p-2 text-gray-400 hover:text-[#5DBB63] hover:bg-[#f0fdf2] rounded-lg transition-colors"
                    title="View Details"
                  >
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => openModal(pkg)}
                    className="p-2 text-gray-400 hover:text-[#5DBB63] hover:bg-[#f0fdf2] rounded-lg transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(pkg.id)}
                    className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredPackages.length === 0 && (
        <div className="text-center py-12">
          <Gift className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No packages found</p>
        </div>
      )}

      {/* Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowDetails(null)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6"
            >
              {(() => {
                const pkg = packages.find(p => p.id === showDetails);
                if (!pkg) return null;
                return (
                  <>
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-xl font-semibold text-gray-900">{pkg.name}</h2>
                      <button
                        onClick={() => setShowDetails(null)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <X className="w-5 h-5 text-gray-500" />
                      </button>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    
                    <div className="bg-gray-50 rounded-xl p-4 mb-4">
                      <h3 className="font-medium text-gray-900 mb-2">Included Services ({pkg.services.length})</h3>
                      <ul className="space-y-2">
                        {pkg.services.map((service, idx) => (
                          <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {service}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div className="bg-gray-50 rounded-xl p-4 text-center">
                        <p className="text-sm text-gray-500">Original Price</p>
                        <p className="font-semibold text-gray-900 line-through">{formatPrice(pkg.price)}</p>
                      </div>
                      <div className="bg-green-50 rounded-xl p-4 text-center">
                        <p className="text-sm text-gray-500">Discount</p>
                        <p className="font-semibold text-green-600">{pkg.discount}%</p>
                      </div>
                      <div className="bg-[#f0fdf2] rounded-xl p-4 text-center">
                        <p className="text-sm text-gray-500">Final Price</p>
                        <p className="font-semibold text-[#165028]">{formatPrice(calculateDiscountedPrice(pkg.price, pkg.discount))}</p>
                      </div>
                    </div>
                  </>
                );
              })()}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Create/Edit Modal */}
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
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 max-h-[90vh] overflow-y-auto"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingPackage ? 'Edit Package' : 'Create Package'}
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
                    Package Name
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
                    rows={2}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none resize-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Services
                  </label>
                  <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto border border-gray-200 rounded-xl p-3">
                    {availableServices.map((service) => (
                      <label key={service} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded">
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service)}
                          onChange={() => toggleService(service)}
                          className="w-4 h-4 text-[#5DBB63] rounded focus:ring-2 focus:ring-[#5DBB63]/20"
                        />
                        <span className="text-sm text-gray-700">{service}</span>
                      </label>
                    ))}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">{formData.services.length} services selected</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Total Price (BDT)
                    </label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                      min="0"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount (%)
                    </label>
                    <input
                      type="number"
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                      min="0"
                      max="100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Validity (days)
                  </label>
                  <input
                    type="number"
                    value={formData.validity}
                    onChange={(e) => setFormData({ ...formData, validity: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                    min="1"
                  />
                </div>

                {formData.price > 0 && (
                  <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Final Price:</p>
                        <p className="text-xs text-gray-500">After {formData.discount}% discount</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          {formatPrice(calculateDiscountedPrice(formData.price, formData.discount))}
                        </p>
                        <p className="text-xs text-gray-500">Save {formData.discount}%</p>
                      </div>
                    </div>
                  </div>
                )}

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
                    {editingPackage ? 'Update' : 'Create'}
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

