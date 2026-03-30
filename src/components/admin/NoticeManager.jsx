import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, X, Save, AlertCircle } from 'lucide-react';
import { noticeService } from '../../services/noticeService';

export default function NoticeManager() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingNotice, setEditingNotice] = useState(null);
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
      setNotices(data);
    } catch (error) {
      setError('Failed to fetch notices');
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
      setError('Failed to save notice');
    }
  };

  const handleToggle = async (id) => {
    try {
      await noticeService.toggleNoticeStatus(id);
      fetchNotices();
      setSuccess('Notice status updated!');
    } catch (error) {
      setError('Failed to toggle notice status');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this notice?')) {
      try {
        await noticeService.deleteNotice(id);
        fetchNotices();
        setSuccess('Notice deleted successfully!');
      } catch (error) {
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

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin text-2xl">⏳</div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Notice & Offer Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#165028] text-white rounded-full hover:bg-[#0f3d1c] transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Notice
        </button>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600" />
          <span className="text-red-700">{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700">
          {success}
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold">
                  {editingNotice ? 'Edit Notice' : 'Add New Notice'}
                </h3>
                <button
                  onClick={resetForm}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Notice Text</label>
                  <textarea
                    value={formData.text}
                    onChange={(e) => setFormData({ ...formData, text: e.target.value })}
                    className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                    rows={3}
                    placeholder="Enter notice or offer text..."
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Type</label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                    >
                      <option value="notice">Notice</option>
                      <option value="offer">Offer</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Priority</label>
                    <select
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Start Date</label>
                    <input
                      type="date"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">End Date</label>
                    <input
                      type="date"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                      className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={formData.isActive}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                    className="w-4 h-4 text-[#165028] rounded focus:ring-[#165028]"
                  />
                  <label htmlFor="isActive" className="text-sm font-medium">
                    Active
                  </label>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#165028] text-white rounded-full hover:bg-[#0f3d1c] transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    {editingNotice ? 'Update' : 'Create'}
                  </button>
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-3">
        {notices.map((notice) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white border rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  notice.type === 'offer' 
                    ? 'bg-yellow-100 text-yellow-800' 
                    : 'bg-blue-100 text-blue-800'
                }`}>
                  {notice.type}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  notice.priority === 'high' 
                    ? 'bg-red-100 text-red-800'
                    : notice.priority === 'medium'
                    ? 'bg-orange-100 text-orange-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {notice.priority}
                </span>
                {!notice.isActive && (
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Inactive
                  </span>
                )}
              </div>
              <p className="text-gray-800">{notice.text}</p>
              {(notice.startDate || notice.endDate) && (
                <p className="text-sm text-gray-500 mt-1">
                  {notice.startDate && `From: ${new Date(notice.startDate).toLocaleDateString()}`}
                  {notice.startDate && notice.endDate && ' | '}
                  {notice.endDate && `To: ${new Date(notice.endDate).toLocaleDateString()}`}
                </p>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleToggle(notice.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title={notice.isActive ? 'Deactivate' : 'Activate'}
              >
                {notice.isActive ? (
                  <ToggleRight className="w-5 h-5 text-green-600" />
                ) : (
                  <ToggleLeft className="w-5 h-5 text-gray-400" />
                )}
              </button>
              <button
                onClick={() => startEdit(notice)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Edit"
              >
                <Edit2 className="w-4 h-4 text-blue-600" />
              </button>
              <button
                onClick={() => handleDelete(notice.id)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                title="Delete"
              >
                <Trash2 className="w-4 h-4 text-red-600" />
              </button>
            </div>
          </motion.div>
        ))}

        {notices.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <div className="text-4xl mb-4">📝</div>
            <p>No notices or offers found</p>
            <p className="text-sm mt-2">Create your first notice to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}
