import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  DollarSign, Plus, Edit2, Trash2, Search, 
  X, Save, Percent, Clock, CheckCircle, XCircle,
  Filter, Download, TrendingUp, TrendingDown
} from 'lucide-react';

// Mock data for service pricing
const initialPricing = [
  { id: 1, service: 'General Consultation', basePrice: 500, discount: 0, finalPrice: 500, discountType: 'percentage', validUntil: '2025-12-31', active: true },
  { id: 2, service: 'Specialist Consultation', basePrice: 1000, discount: 10, finalPrice: 900, discountType: 'percentage', validUntil: '2025-06-30', active: true },
  { id: 3, service: 'Complete Blood Count', basePrice: 350, discount: 50, finalPrice: 300, discountType: 'fixed', validUntil: '2025-03-31', active: true },
  { id: 4, service: 'Liver Function Test', basePrice: 800, discount: 15, finalPrice: 680, discountType: 'percentage', validUntil: '2025-04-15', active: true },
  { id: 5, service: 'Physical Therapy Session', basePrice: 600, discount: 0, finalPrice: 600, discountType: 'percentage', validUntil: '2025-12-31', active: false },
  { id: 6, service: 'Annual Health Checkup', basePrice: 3500, discount: 20, finalPrice: 2800, discountType: 'percentage', validUntil: '2025-02-28', active: true },
  { id: 7, service: 'ECG Test', basePrice: 400, discount: 0, finalPrice: 400, discountType: 'percentage', validUntil: '2025-12-31', active: true },
  { id: 8, service: 'MRI Scan (Brain)', basePrice: 15000, discount: 25, finalPrice: 11250, discountType: 'percentage', validUntil: '2025-05-20', active: true },
];

export default function ServicePricing() {
  const [pricing, setPricing] = useState(initialPricing);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingPrice, setEditingPrice] = useState(null);
  const [formData, setFormData] = useState({
    service: '',
    basePrice: 0,
    discount: 0,
    discountType: 'percentage',
    validUntil: '',
    active: true
  });

  const filteredPricing = pricing.filter(p => 
    p.service.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const calculateFinalPrice = (basePrice, discount, discountType) => {
    if (discountType === 'percentage') {
      return basePrice - (basePrice * discount / 100);
    }
    return basePrice - discount;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalPrice = calculateFinalPrice(formData.basePrice, formData.discount, formData.discountType);
    
    if (editingPrice) {
      setPricing(pricing.map(p => 
        p.id === editingPrice.id 
          ? { ...p, ...formData, finalPrice }
          : p
      ));
    } else {
      setPricing([...pricing, { id: Date.now(), service: formData.service, finalPrice, ...formData }]);
    }
    closeModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this pricing?')) {
      setPricing(pricing.filter(p => p.id !== id));
    }
  };

  const handleToggleActive = (id) => {
    setPricing(pricing.map(p => 
      p.id === id ? { ...p, active: !p.active } : p
    ));
  };

  const openModal = (price = null) => {
    if (price) {
      setEditingPrice(price);
      setFormData({
        service: price.service,
        basePrice: price.basePrice,
        discount: price.discount,
        discountType: price.discountType,
        validUntil: price.validUntil,
        active: price.active
      });
    } else {
      setEditingPrice(null);
      setFormData({
        service: '',
        basePrice: 0,
        discount: 0,
        discountType: 'percentage',
        validUntil: '',
        active: true
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingPrice(null);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BD', { style: 'currency', currency: 'BDT' }).format(price);
  };

  const getSavings = (basePrice, finalPrice) => {
    return ((basePrice - finalPrice) / basePrice * 100).toFixed(0);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Service Pricing</h1>
          <p className="text-gray-500 mt-1">Manage pricing and discounts for all services</p>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-[#165028] text-white rounded-xl hover:bg-[#0f3d1c] transition-colors"
        >
          <Plus className="w-5 h-5" />
          Add Pricing
        </button>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Services</p>
              <p className="text-2xl font-bold text-gray-900">{pricing.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Pricing</p>
              <p className="text-2xl font-bold text-green-600">{pricing.filter(p => p.active).length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">With Discounts</p>
              <p className="text-2xl font-bold text-amber-600">{pricing.filter(p => p.discount > 0).length}</p>
            </div>
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <Percent className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Discount</p>
              <p className="text-2xl font-bold text-purple-600">
                {(pricing.reduce((sum, p) => sum + p.discount, 0) / pricing.length).toFixed(0)}%
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingDown className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
        />
      </div>

      {/* Pricing Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Service</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Base Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Discount</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Final Price</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Valid Until</th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-4 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPricing.map((price) => (
                <motion.tr
                  key={price.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4">
                    <span className="font-medium text-gray-900">{price.service}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    <span className="line-through">{formatPrice(price.basePrice)}</span>
                  </td>
                  <td className="px-6 py-4">
                    {price.discount > 0 ? (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">
                        <TrendingDown className="w-3 h-3" />
                        {price.discountType === 'percentage' ? `${price.discount}%` : formatPrice(price.discount)}
                      </span>
                    ) : (
                      <span className="text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-semibold text-gray-900">{formatPrice(price.finalPrice)}</span>
                    {price.discount > 0 && (
                      <span className="ml-2 text-xs text-green-600">Save {getSavings(price.basePrice, price.finalPrice)}%</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {price.validUntil ? new Date(price.validUntil).toLocaleDateString('en-BD') : '—'}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => handleToggleActive(price.id)}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        price.active 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {price.active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => openModal(price)}
                        className="p-2 text-gray-400 hover:text-[#5DBB63] hover:bg-[#f0fdf2] rounded-lg transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(price.id)}
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

        {filteredPricing.length === 0 && (
          <div className="text-center py-12">
            <DollarSign className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No pricing found</p>
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
              className="relative bg-white rounded-2xl shadow-xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingPrice ? 'Edit Pricing' : 'Add Pricing'}
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
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Base Price (BDT)
                  </label>
                  <input
                    type="number"
                    value={formData.basePrice}
                    onChange={(e) => setFormData({ ...formData, basePrice: parseInt(e.target.value) })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                    min="0"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Discount
                    </label>
                    <input
                      type="number"
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                      min="0"
                      max={formData.discountType === 'percentage' ? 100 : undefined}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type
                    </label>
                    <select
                      value={formData.discountType}
                      onChange={(e) => setFormData({ ...formData, discountType: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed (BDT)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Valid Until
                  </label>
                  <input
                    type="date"
                    value={formData.validUntil}
                    onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                  />
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Final Price:</span>
                    <span className="text-lg font-bold text-gray-900">
                      {formatPrice(calculateFinalPrice(formData.basePrice, formData.discount, formData.discountType))}
                    </span>
                  </div>
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
                    {editingPrice ? 'Update' : 'Create'}
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

