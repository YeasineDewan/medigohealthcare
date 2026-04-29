import React, { useState, useEffect } from 'react';
import { adminService } from '../../services/api';

const AdminBanners = () => {
  const [banners, setBanners] = useState([]);
  const [form, setForm] = useState({ title: '', image: null, isActive: true });
  const [loading, setLoading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [listLoading, setListLoading] = useState(true);

  const fetchBanners = async () => {
    setListLoading(true);
    try {
      const res = await adminService.getBanners();
      const newBanners = res.data?.data || res.data || [];
      setBanners(Array.isArray(newBanners) ? newBanners : []);
    } catch (err) {
      console.error('Failed to fetch banners:', err);
      setBanners([]);
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const saveBanner = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append('title', form.title);
      formData.append('is_active', form.isActive);
      
      if (form.image) {
        formData.append('image', form.image);
      }
      
      if (editingId) {
        await adminService.updateBanner(editingId, formData);
      } else {
        await adminService.createBanner(formData);
      }
      
      fetchBanners();
      setForm({ title: '', image: null, isActive: true });
      setEditingId(null);
    } catch (err) {
      console.error('Failed to save banner:', err);
      alert('Failed to save banner. Please try again.');
    }
    setLoading(false);
  };

  const editBanner = (banner) => {
    setForm({
      title: banner.title,
      image: null,
      isActive: banner.is_active
    });
    setEditingId(banner.id);
  };

  const deleteBanner = async (id) => {
    if (confirm('Delete banner?')) {
      try {
        await adminService.deleteBanner(id);
        fetchBanners();
      } catch (err) {
        console.error(err);
        alert('Failed to delete.');
      }
    }
  };

  const toggleBanner = async (id) => {
    try {
      await adminService.toggleBanner(id);
      fetchBanners();
    } catch (err) {
      console.error(err);
      alert('Failed to toggle.');
    }
  };

  if (listLoading) {
    return <div className="p-6 flex justify-center">Loading banners...</div>;
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Manage Banners</h1>
      
      <form onSubmit={saveBanner} className="bg-white p-8 rounded-xl shadow-lg mb-8 border">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input 
            type="text"
            placeholder="Banner Title" 
            value={form.title} 
            onChange={(e) => setForm({...form, title: e.target.value})}
            className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            required
          />
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Banner Image</label>
            <input 
              type="file" 
              accept="image/*"
              onChange={(e) => setForm({...form, image: e.target.files[0]})}
              className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#5DBB63]"
            />
            {form.image && (
              <img src={URL.createObjectURL(form.image)} alt="preview" className="mt-2 w-24 h-24 object-cover rounded-lg border" />
            )}
          </div>
        </div>
        <label className="flex items-center p-4 border border-gray-200 rounded-xl mt-6">
          <input 
            type="checkbox"
            checked={form.isActive}
            onChange={(e) => setForm({...form, isActive: e.target.checked})}
            className="w-5 h-5 text-[#5DBB63] rounded focus:ring-[#5DBB63]"
          />
          <span className="ml-3 text-lg font-medium text-gray-900">Active</span>
        </label>
        <div className="flex gap-4 mt-6">
          <button type="submit" disabled={loading} className="bg-[#5DBB63] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#4CAF50] transition-all disabled:opacity-50 flex-1">
            {loading ? 'Saving...' : (editingId ? 'Update' : 'Create')}
          </button>
          {editingId && <button type="button" onClick={() => setEditingId(null)} className="border border-gray-300 px-8 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all">
            Cancel
          </button>}
        </div>
      </form>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(banners) && banners.length > 0 ? banners.map((banner) => (
          <div key={banner.id} className="bg-white p-6 rounded-xl shadow border-l-4 border-[#5DBB63] hover:shadow-lg transition-all">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-bold text-xl">{banner.title}</h3>
              <span className={`px-3 py-1 rounded-full text-sm font-bold ${banner.is_active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                {banner.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <img src={banner.image_url || banner.image || '/placeholder.jpg'} alt={banner.title} className="w-full h-48 object-cover rounded-lg mb-4 border" />
            <div className="flex gap-2">
              <button onClick={() => editBanner(banner)} className="flex-1 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Edit</button>
              <button onClick={() => toggleBanner(banner.id)} className="flex-1 bg-yellow-500 text-white py-2 rounded-lg hover:bg-yellow-600">
                {banner.is_active ? 'Deactivate' : 'Activate'}
              </button>
              <button onClick={() => deleteBanner(banner.id)} className="flex-1 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">Delete</button>
            </div>
          </div>
        )) : (
          <div className="col-span-full text-center py-12 text-gray-500">
            <p>No banners found. Create your first banner above!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBanners;
