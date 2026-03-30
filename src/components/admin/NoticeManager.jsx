import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  ToggleLeft, 
  ToggleRight, 
  X, 
  Save, 
  AlertCircle,
  Search,
  Filter,
  Calendar,
  Megaphone,
  Tag,
  Clock,
  CheckCircle,
  Eye,
  EyeOff
} from 'lucide-react';
import { noticeService } from '../../services/noticeService';

export default function NoticeManager() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState({
    text: '',
    type: 'notice',
    priority: 'medium',
    isActive: true,
    startDate: '',
    endDate: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      const data = await noticeService.getAllNotices();
      console.log('Fetched notices:', data);
      setNotices(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error('Failed to fetch notices:', error);
      setError('Failed to fetch notices');
      // Set fallback data for development
      const fallbackNotices = [
        {
          id: 1,
          text: "🎉 Special Offer: 20% off on all health checkups this month!",
          type: "offer",
          priority: "high",
          isActive: true,
          startDate: "2024-01-01",
          endDate: "2024-12-31",
          created_at: "2024-01-01",
          updated_at: "2024-01-01"
        },
        {
          id: 2,
          text: "📢 New: Online doctor consultations now available 24/7",
          type: "notice",
          priority: "medium",
          isActive: true,
          startDate: "2024-01-01",
          endDate: "2024-12-31",
          created_at: "2024-01-01",
          updated_at: "2024-01-01"
        }
      ];
      setNotices(fallbackNotices);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      if (editingNotice) {
        await noticeService.updateNotice(editingNotice.id, formData);
        setSuccess('Notice updated successfully!');
      } else {
        await noticeService.createNotice(formData);
        setSuccess('Notice created successfully!');
      }
      
      resetForm();
      fetchNotices();
    } catch (error) {
      console.error('Failed to save notice:', error);
      setError('Failed to save notice');
    }
  };

  const handleToggle = async (id) => {
    try {
      await noticeService.toggleNoticeStatus(id);
      fetchNotices();
      setSuccess('Notice status updated!');
    } catch (error) {
      console.error('Failed to toggle notice status:', error);
      setError('Failed to toggle notice status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice? This action cannot be undone.')) {
      try {
        await noticeService.deleteNotice(id);
        fetchNotices();
        setSuccess('Notice deleted successfully!');
      } catch (error) {
        console.error('Failed to delete notice:', error);
        setError('Failed to delete notice');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      text: '',
      type: 'notice',
      priority: 'medium',
      isActive: true,
      startDate: '',
      endDate: ''
    });
    setEditingNotice(null);
    setShowForm(false);
  };

  const startEdit = (notice) => {
    setFormData({
      text: notice.text,
      type: notice.type,
      priority: notice.priority,
      isActive: notice.isActive,
      startDate: notice.startDate || '',
      endDate: notice.endDate || ''
    });
    setEditingNotice(notice);
    setShowForm(true);
  };

  // Filter notices based on search and filters
  const filteredNotices = notices.filter(notice => {
    const matchesSearch = notice.text.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || notice.type === filterType;
    const matchesStatus = filterStatus === 'all' || 
      (filterStatus === 'active' && notice.isActive) || 
      (filterStatus === 'inactive' && !notice.isActive);
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'low': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getTypeColor = (type) => {
    return type === 'offer' 
      ? 'bg-yellow-100 text-yellow-800 border-yellow-200' 
      : 'bg-blue-100 text-blue-800 border-blue-200';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="flex flex-col items-center gap-3">
          <div className="animate-spin text-2xl">⏳</div>
          <span className="text-gray-500">Loading notices...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Megaphone className="w-8 h-8 text-[#165028]" />
            Notice & Offer Management
          </h2>
          <p className="text-gray-600 mt-1">Manage announcements, offers, and notifications displayed on the website</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#165028] to-[#0f3d1c] text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Add Notice
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search notices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
              />
            </div>
          </div>
          
          <div className="flex gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="notice">Notices</option>
              <option value="offer">Offers</option>
            </select>
            
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Alerts */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3"
          >
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
            <span className="text-red-700">{error}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3"
          >
            <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
            <span className="text-green-700">{success}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingNotice ? 'Edit Notice' : 'Add New Notice'}
                </h3>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Notice Text <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent resize-none"
                    rows={3}
                    placeholder="Enter notice or offer text..."
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    This text will be displayed in the header notification area
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                    >
                      <option value="notice">📢 Notice</option>
                      <option value="offer">🎉 Offer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                    >
                      <option value="low">📌 Low</option>
                      <option value="medium">⭐ Medium</option>
                      <option value="high">🔥 High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                    <div className="flex items-center h-12">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, isActive: !formData.isActive })}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                          formData.isActive 
                            ? 'bg-green-50 border-green-300 text-green-700' 
                            : 'bg-gray-50 border-gray-300 text-gray-500'
                        }`}
                      >
                        {formData.isActive ? (
                          <>
                            <Eye className="w-4 h-4" />
                            Active
                          </>
                        ) : (
                          <>
                            <EyeOff className="w-4 h-4" />
                            Inactive
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">End Date</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>💡 Tip:</strong> High priority notices will appear with a 🔥 icon, 
                    medium with ⭐, and low with 📌. Offers are typically used for promotions 
                    while notices are for general announcements.
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#165028] to-[#0f3d1c] text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <Save className="w-5 h-5" />
                    {editingNotice ? 'Update Notice' : 'Create Notice'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-3 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notices List */}
      <div className="space-y-4">
        {filteredNotices.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No notices found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm || filterType !== 'all' || filterStatus !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Create your first notice to get started'
              }
            </p>
            {!searchTerm && filterType === 'all' && filterStatus === 'all' && (
              <button
                onClick={() => setShowForm(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#165028] to-[#0f3d1c] text-white rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Plus className="w-5 h-5" />
                Create Your First Notice
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-4">
            {filteredNotices.map((notice) => (
              <motion.div
                key={notice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="flex flex-col lg:flex-row justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTypeColor(notice.type)}`}>
                        <Tag className="w-3 h-3 inline mr-1" />
                        {notice.type.toUpperCase()}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(notice.priority)}`}>
                        {notice.priority.toUpperCase()}
                      </span>
                      {!notice.isActive && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-600 border border-gray-200">
                          INACTIVE
                        </span>
                      )}
                      {(notice.startDate || notice.endDate) && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 text-blue-600 border border-blue-200">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          Scheduled
                        </span>
                      )}
                    </div>
                    <p className="text-gray-800 text-lg leading-relaxed mb-2">{notice.text}</p>
                    {(notice.startDate || notice.endDate) && (
                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        {notice.startDate && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            From: {new Date(notice.startDate).toLocaleDateString()}
                          </span>
                        )}
                        {notice.startDate && notice.endDate && <span>•</span>}
                        {notice.endDate && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            To: {new Date(notice.endDate).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggle(notice.id)}
                      className="p-3 hover:bg-gray-100 rounded-full transition-colors group"
                      title={notice.isActive ? 'Deactivate' : 'Activate'}
                    >
                      {notice.isActive ? (
                        <ToggleRight className="w-5 h-5 text-green-600 group-hover:scale-110 transition-transform" />
                      ) : (
                        <ToggleLeft className="w-5 h-5 text-gray-400 group-hover:scale-110 transition-transform" />
                      )}
                    </button>
                    <button
                      onClick={() => startEdit(notice)}
                      className="p-3 hover:bg-gray-100 rounded-full transition-colors group"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-transform" />
                    </button>
                    <button
                      onClick={() => handleDelete(notice.id)}
                      className="p-3 hover:bg-red-50 rounded-full transition-colors group"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-600 group-hover:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
