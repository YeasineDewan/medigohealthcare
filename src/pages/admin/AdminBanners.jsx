import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit, Trash2, Eye, EyeOff, Search, Image as ImageIcon, 
  Calendar, Link as LinkIcon, Type, Palette, ArrowUpDown, X
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

export default function AdminBanners() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    background_color: 'from-blue-500 to-blue-700',
    cta_text: '',
    cta_link: '',
    display_order: 0,
    active: true,
    type: 'hero',
    start_date: '',
    end_date: ''
  });

  const backgroundColors = [
    { value: 'from-blue-500 to-blue-700', label: 'Blue', preview: 'bg-gradient-to-r from-blue-500 to-blue-700' },
    { value: 'from-green-500 to-green-700', label: 'Green', preview: 'bg-gradient-to-r from-green-500 to-green-700' },
    { value: 'from-purple-500 to-purple-700', label: 'Purple', preview: 'bg-gradient-to-r from-purple-500 to-purple-700' },
    { value: 'from-red-500 to-red-700', label: 'Red', preview: 'bg-gradient-to-r from-red-500 to-red-700' },
    { value: 'from-orange-500 to-orange-700', label: 'Orange', preview: 'bg-gradient-to-r from-orange-500 to-orange-700' },
    { value: 'from-pink-500 to-pink-700', label: 'Pink', preview: 'bg-gradient-to-r from-pink-500 to-pink-700' },
    { value: 'from-indigo-500 to-indigo-700', label: 'Indigo', preview: 'bg-gradient-to-r from-indigo-500 to-indigo-700' },
    { value: 'from-teal-500 to-teal-700', label: 'Teal', preview: 'bg-gradient-to-r from-teal-500 to-teal-700' },
  ];

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/banners?include_inactive=true`);
      setBanners(response.data.data || []);
    } catch (error) {
      console.error('Error fetching banners:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingBanner) {
        await axios.put(`${API_BASE}/banners/${editingBanner.id}`, formData);
      } else {
        await axios.post(`${API_BASE}/banners`, formData);
      }
      fetchBanners();
      closeModal();
    } catch (error) {
      console.error('Error saving banner:', error);
      alert('Failed to save banner');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;
    try {
      await axios.delete(`${API_BASE}/banners/${id}`);
      fetchBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
      alert('Failed to delete banner');
    }
  };

  const toggleActive = async (id) => {
    try {
      await axios.put(`${API_BASE}/banners/${id}/toggle`);
      fetchBanners();
    } catch (error) {
      console.error('Error toggling banner:', error);
    }
  };

  const openModal = (banner = null) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({
        title: banner.title || '',
        subtitle: banner.subtitle || '',
        description: banner.description || '',
        image: banner.image || '',
        background_color: banner.background_color || 'from-blue-500 to-blue-700',
        cta_text: banner.cta_text || '',
        cta_link: banner.cta_link || '',
        display_order: banner.display_order || 0,
        active: banner.active ?? true,
        type: banner.type || 'hero',
        start_date: banner.start_date || '',
        end_date: banner.end_date || ''
      });
    } else {
      setEditingBanner(null);
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        image: '',
        background_color: 'from-blue-500 to-blue-700',
        cta_text: '',
        cta_link: '',
        display_order: 0,
        active: true,
        type: 'hero',
        start_date: '',
        end_date: ''
      });
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBanner(null);
  };

  const filteredBanners = banners.filter(banner => {
    const matchesSearch = banner.title.toLowerCase().includes(search.toLowerCase()) ||
                         banner.subtitle?.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'all' || banner.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#165028]">Banner Management</h1>
          <p className="text-gray-600 mt-1">Manage homepage and promotional banners</p>
        </div>
        <Button onClick={() => openModal()}>
          <Plus className="w-4 h-4 mr-2" />
          Add Banner
        </Button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search banners..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
            />
          </div>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
          >
            <option value="all">All Types</option>
            <option value="hero">Hero Banners</option>
            <option value="promotional">Promotional</option>
            <option value="announcement">Announcements</option>
          </select>
        </div>
      </div>

      {/* Banners Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block w-8 h-8 border-4 border-[#5DBB63] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredBanners.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl border border-gray-100">
          <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500">No banners found</p>
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredBanners.map((banner) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
            >
              <div className="grid md:grid-cols-3 gap-4">
                {/* Banner Preview */}
                <div className={`relative h-48 bg-gradient-to-r ${banner.background_color}`}>
                  {banner.image && (
                    <img 
                      src={banner.image} 
                      alt={banner.title}
                      className="w-full h-full object-cover mix-blend-overlay opacity-40"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center p-6">
                    <div>
                      <h3 className="text-white font-bold text-lg mb-2">{banner.title}</h3>
                      <p className="text-white/90 text-sm">{banner.subtitle}</p>
                    </div>
                  </div>
                  {!banner.active && (
                    <div className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                      Inactive
                    </div>
                  )}
                </div>

                {/* Banner Details */}
                <div className="md:col-span-2 p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                          {banner.type}
                        </span>
                        <span className="text-gray-400 text-sm">Order: {banner.display_order}</span>
                      </div>
                      <h3 className="font-semibold text-[#111827] text-lg">{banner.title}</h3>
                      {banner.subtitle && (
                        <p className="text-gray-600 text-sm mt-1">{banner.subtitle}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    {banner.cta_text && (
                      <div className="flex items-center gap-2">
                        <Type className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">CTA: {banner.cta_text}</span>
                      </div>
                    )}
                    {banner.cta_link && (
                      <div className="flex items-center gap-2">
                        <LinkIcon className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 truncate">{banner.cta_link}</span>
                      </div>
                    )}
                    {banner.start_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">Start: {banner.start_date}</span>
                      </div>
                    )}
                    {banner.end_date && (
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600">End: {banner.end_date}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleActive(banner.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        banner.active
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      title={banner.active ? 'Deactivate' : 'Activate'}
                    >
                      {banner.active ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => openModal(banner)}
                      className="p-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="p-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between">
                <h2 className="text-xl font-bold text-[#165028]">
                  {editingBanner ? 'Edit Banner' : 'Add New Banner'}
                </h2>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="p-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Title *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                      placeholder="Banner title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Subtitle
                    </label>
                    <input
                      type="text"
                      value={formData.subtitle}
                      onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                      placeholder="Banner subtitle"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                    placeholder="Banner description (optional)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color *
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {backgroundColors.map((color) => (
                      <button
                        key={color.value}
                        type="button"
                        onClick={() => setFormData({ ...formData, background_color: color.value })}
                        className={`relative h-12 rounded-lg ${color.preview} ${
                          formData.background_color === color.value ? 'ring-4 ring-[#5DBB63]' : ''
                        }`}
                      >
                        <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-medium">
                          {color.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CTA Text
                    </label>
                    <input
                      type="text"
                      value={formData.cta_text}
                      onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                      placeholder="Shop Now"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      CTA Link
                    </label>
                    <input
                      type="text"
                      value={formData.cta_link}
                      onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                      placeholder="/pharmacy"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Type *
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                    >
                      <option value="hero">Hero Banner</option>
                      <option value="promotional">Promotional</option>
                      <option value="announcement">Announcement</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Status
                    </label>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.active}
                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#5DBB63]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5DBB63]"></div>
                      <span className="ml-3 text-sm font-medium text-gray-700">Active</span>
                    </label>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Start Date
                    </label>
                    <input
                      type="date"
                      value={formData.start_date}
                      onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      End Date
                    </label>
                    <input
                      type="date"
                      value={formData.end_date}
                      onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#5DBB63]/20 focus:border-[#5DBB63] outline-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                  <Button type="button" variant="outline" onClick={closeModal}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingBanner ? 'Update Banner' : 'Create Banner'}
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
