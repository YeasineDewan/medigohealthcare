import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api';

const AdminNotices = () => {
  const [notices, setNotices] = useState([]);
  const [form, setForm] = useState({ title: '', text: '', type: 'notice', priority: 'medium' });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const fetchNotices = async () => {
    try {
      const res = await adminService.getNotices();
      setNotices(res.data.data || res.data || []);
    } catch (err) {
      console.error('Failed to fetch notices:', err);
    }
  };

  useEffect(() => {
    fetchNotices();
  }, []);

  const saveNotice = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await adminService.updateNotice(editingId, form);
      } else {
        await adminService.createNotice(form);
      }
      
      fetchNotices();
      setForm({ title: '', text: '', type: 'notice', priority: 'medium' });
      setEditingId(null);
    } catch (err) {
      console.error('Failed to save notice:', err);
      alert('Failed to save notice. Please try again.');
    }
    setLoading(false);
  };

  const editNotice = (notice) => {
    setForm({
      title: notice.title,
      text: notice.text,
      type: notice.type,
      priority: notice.priority
    });
    setEditingId(notice.id);
  };

  const deleteNotice = async (id) => {
    if (confirm('Delete notice? This action cannot be undone.')) {
      try {
        await adminService.deleteNotice(id);
        fetchNotices();
      } catch (err) {
        console.error('Failed to delete notice:', err);
        alert('Failed to delete notice. Please try again.');
      }
    }
  };

  const toggleNotice = async (id) => {
    try {
      await adminService.toggleNotice(id);
      fetchNotices();
    } catch (err) {
      console.error('Failed to toggle notice:', err);
      alert('Failed to toggle notice status. Please try again.');
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Notices & Offers</h1>
      
      <form onSubmit={saveNotice} className="bg-white p-6 rounded-lg shadow mb-8">
        <input 
          placeholder="Title" 
          value={form.title} 
          onChange={(e) => setForm({...form, title: e.target.value})}
          className="w-full p-3 border rounded mb-4"
          required
        />
        <textarea 
          placeholder="Message" 
          value={form.text} 
          onChange={(e) => setForm({...form, text: e.target.value})}
          className="w-full p-3 border rounded mb-4 h-24"
          required
        />
        <select value={form.type} onChange={(e) => setForm({...form, type: e.target.value})} className="p-3 border rounded mb-4">
          <option value="notice">Notice</option>
          <option value="offer">Offer</option>
          <option value="alert">Alert</option>
        </select>
        <select value={form.priority} onChange={(e) => setForm({...form, priority: e.target.value})} className="p-3 border rounded mb-4">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" disabled={loading} className="bg-blue-500 text-white px-6 py-2 rounded">
          {editingId ? 'Update' : 'Create'} Notice
        </button>
        {editingId && <button type="button" onClick={() => setEditingId(null)} className="ml-2 bg-gray-500 text-white px-6 py-2 rounded">
          Cancel
        </button>}
      </form>

      <div className="grid gap-4">
        {notices.map((notice) => (
          <div key={notice.id} className="bg-white p-6 rounded-lg shadow border-l-4 border-blue-500">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-bold text-lg">{notice.title}</h3>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${notice.priority === 'high' ? 'bg-red-100 text-red-800' : notice.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                  {notice.priority.toUpperCase()}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${notice.type === 'offer' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}`}>
                  {notice.type}
                </span>
                <span className={`text-xs ${notice.is_active ? 'text-green-600' : 'text-red-600'}`}>
                  {notice.is_active ? 'Active' : 'Inactive'}
                </span>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{notice.text}</p>
            <div className="flex gap-2">
              <button onClick={() => editNotice(notice)} className="bg-blue-500 text-white px-4 py-1 rounded text-sm">
                Edit
              </button>
              <button onClick={() => toggleNotice(notice.id)} className="bg-yellow-500 text-white px-4 py-1 rounded text-sm">
                Toggle
              </button>
              <button onClick={() => deleteNotice(notice.id)} className="bg-red-500 text-white px-4 py-1 rounded text-sm">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNotices;

