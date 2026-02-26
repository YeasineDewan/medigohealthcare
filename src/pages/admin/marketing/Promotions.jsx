import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  MoreVertical,
  Image,
  Calendar,
  DollarSign,
  Percent,
  Users,
  Eye,
  MousePointer,
  TrendingUp,
  TrendingDown,
  X,
  Save,
  Filter,
  Download,
  ToggleLeft,
  ToggleRight,
  Tag,
  Gift,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

// Mock promotions data
const initialPromotions = [
  {
    id: 1,
    title: 'Summer Health Checkup',
    description: 'Get 30% off on all health checkup packages this summer',
    type: 'discount',
    discount: 30,
    code: 'SUMMER30',
    startDate: '2024-01-01',
    endDate: '2024-03-31',
    target: 'all',
    status: 'active',
    views: 12500,
    clicks: 3200,
    usage: 156,
    limit: 500,
    image: null
  },
  {
    id: 2,
    title: 'New Patient Welcome',
    description: 'First consultation free for all new patients',
    type: 'free',
    discount: 100,
    code: 'WELCOME',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    target: 'new',
    status: 'active',
    views: 8500,
    clicks: 2100,
    usage: 89,
    limit: 200,
    image: null
  },
  {
    id: 3,
    title: 'Pharmacy Cashback',
    description: 'Get 10% cashback on all pharmacy orders above $50',
    type: 'cashback',
    discount: 10,
    code: 'PHARMA10',
    startDate: '2024-02-01',
    endDate: '2024-02-28',
    target: 'all',
    status: 'scheduled',
    views: 0,
    clicks: 0,
    usage: 0,
    limit: 1000,
    image: null
  },
  {
    id: 4,
    title: 'Lab Test Combo',
    description: 'Book 3+ lab tests and get 25% off',
    type: 'discount',
    discount: 25,
    code: 'LAB25',
    startDate: '2023-12-01',
    endDate: '2024-01-15',
    target: 'all',
    status: 'expired',
    views: 6200,
    clicks: 1800,
    usage: 245,
    limit: 300,
    image: null
  }
];

export default function Promotions() {
  const [promotions, setPromotions] = useState(initialPromotions);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedPromotion, setSelectedPromotion] = useState(null);

  const filteredPromotions = promotions.filter(promo => {
    const matchesSearch = promo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      promo.code.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || promo.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAddPromo = () => {
    setModalMode('add');
    setSelectedPromotion(null);
    setShowModal(true);
  };

  const handleEditPromo = (promo) => {
    setModalMode('edit');
    setSelectedPromotion(promo);
    setShowModal(true);
  };

  const handleDeletePromo = (promo) => {
    setPromotions(promotions.filter(p => p.id !== promo.id));
  };

  const handleToggleStatus = (promo) => {
    setPromotions(promotions.map(p =>
      p.id === promo.id ? { ...p, status: p.status === 'active' ? 'inactive' : 'active' } : p
    ));
  };

  const handleSavePromo = (promoData) => {
    if (modalMode === 'add') {
      const newPromo = {
        ...promoData,
        id: Date.now(),
        views: 0,
        clicks: 0,
        usage: 0
      };
      setPromotions([...promotions, newPromo]);
    } else {
      setPromotions(promotions.map(p =>
        p.id === selectedPromotion.id ? { ...p, ...promoData } : p
      ));
    }
    setShowModal(false);
  };

  const statusColors = {
    active: 'bg-green-100 text-green-700 border-green-200',
    scheduled: 'bg-blue-100 text-blue-700 border-blue-200',
    expired: 'bg-gray-100 text-gray-700 border-gray-200',
    inactive: 'bg-red-100 text-red-700 border-red-200'
  };

  const typeColors = {
    discount: 'bg-purple-100 text-purple-700',
    free: 'bg-green-100 text-green-700',
    cashback: 'bg-blue-100 text-blue-700'
  };

  // Stats
  const activePromos = promotions.filter(p => p.status === 'active');
  const totalViews = activePromos.reduce((sum, p) => sum + p.views, 0);
  const totalClicks = activePromos.reduce((sum, p) => sum + p.clicks, 0);
  const totalUsage = activePromos.reduce((sum, p) => sum + p.usage, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Promotions</h1>
          <p className="text-gray-500 mt-1">Create and manage promotional campaigns</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={handleAddPromo}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
          >
            <Plus className="w-4 h-4" />
            New Promotion
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Promotions</p>
              <p className="text-2xl font-bold text-green-600">{activePromos.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Tag className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Views</p>
              <p className="text-2xl font-bold text-blue-600">{totalViews.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Clicks</p>
              <p className="text-2xl font-bold text-purple-600">{totalClicks.toLocaleString()}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <MousePointer className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Redemptions</p>
              <p className="text-2xl font-bold text-orange-600">{totalUsage}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Gift className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search promotions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="scheduled">Scheduled</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      {/* Promotions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredPromotions.map((promo, index) => (
          <motion.div
            key={promo.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${typeColors[promo.type]}`}>
                      {promo.type.toUpperCase()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs font-medium border ${statusColors[promo.status]}`}>
                      {promo.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">{promo.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{promo.description}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditPromo(promo)}
                    className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                  >
                    <Edit3 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDeletePromo(promo)}
                    className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Promo Code:</span>
                  <span className="font-mono font-bold text-lg text-[#5DBB63]">{promo.code}</span>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{promo.discount}%</p>
                  <p className="text-xs text-gray-500">Discount</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">{promo.usage}/{promo.limit}</p>
                  <p className="text-xs text-gray-500">Usage</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-gray-900">
                    {promo.views > 0 ? ((promo.clicks / promo.views) * 100).toFixed(1) : 0}%
                  </p>
                  <p className="text-xs text-gray-500">CTR</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {promo.startDate} - {promo.endDate}
                </div>
                <button
                  onClick={() => handleToggleStatus(promo)}
                  className={`flex items-center gap-1 ${promo.status === 'active' ? 'text-green-600' : 'text-gray-400'}`}
                >
                  {promo.status === 'active' ? <ToggleRight className="w-5 h-5" /> : <ToggleLeft className="w-5 h-5" />}
                  {promo.status === 'active' ? 'Active' : 'Inactive'}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <PromotionModal
            mode={modalMode}
            promotion={selectedPromotion}
            onClose={() => setShowModal(false)}
            onSave={handleSavePromo}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function PromotionModal({ mode, promotion, onClose, onSave }) {
  const [formData, setFormData] = useState(promotion || {
    title: '',
    description: '',
    type: 'discount',
    discount: 10,
    code: '',
    startDate: new Date().toISOString().split('T')[0],
    endDate: '',
    target: 'all',
    status: 'scheduled',
    limit: 100
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-lg"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {mode === 'add' ? 'Create Promotion' : 'Edit Promotion'}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  <option value="discount">Discount</option>
                  <option value="free">Free</option>
                  <option value="cashback">Cashback</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Discount %</label>
                <input
                  type="number"
                  value={formData.discount}
                  onChange={(e) => setFormData({ ...formData, discount: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Promo Code</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Target</label>
                <select
                  value={formData.target}
                  onChange={(e) => setFormData({ ...formData, target: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  <option value="all">All Patients</option>
                  <option value="new">New Patients</option>
                  <option value="existing">Existing Patients</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Usage Limit</label>
                <input
                  type="number"
                  value={formData.limit}
                  onChange={(e) => setFormData({ ...formData, limit: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {mode === 'add' ? 'Create' : 'Save'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
