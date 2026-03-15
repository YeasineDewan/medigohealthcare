import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Edit, Trash2, Eye, EyeOff, Search, Image as ImageIcon, 
  Upload, X, ChevronDown, Calendar, Link as LinkIcon, Type, 
  Palette, ArrowUpDown, AlertCircle, Check, Loader2, 
  Sparkles, Target, Zap, Shield, Star
} from 'lucide-react';
import { Button } from '../../components/core/Button';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { env } from '../../config/env';
const API_BASE = env.apiBase;

export default function ProfessionalBannerManagement() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [search, setSearch] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [dragActive, setDragActive] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState('');
  const fileInputRef = useRef(null);

  // Enhanced form state with more fields
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
    end_date: '',
    target_audience: 'all',
    priority: 'medium',
    animation_type: 'fade',
    overlay_opacity: 20
  });

  // Enhanced background colors with gradients
  const backgroundColors = [
    { value: 'from-blue-500 to-blue-700', label: 'Ocean Blue', preview: 'bg-gradient-to-r from-blue-500 to-blue-700' },
    { value: 'from-green-500 to-green-700', label: 'Forest Green', preview: 'bg-gradient-to-r from-green-500 to-green-700' },
    { value: 'from-purple-500 to-purple-700', label: 'Royal Purple', preview: 'bg-gradient-to-r from-purple-500 to-purple-700' },
    { value: 'from-red-500 to-red-700', label: 'Sunset Red', preview: 'bg-gradient-to-r from-red-500 to-red-700' },
    { value: 'from-orange-500 to-orange-700', label: 'Tangerine', preview: 'bg-gradient-to-r from-orange-500 to-orange-700' },
    { value: 'from-pink-500 to-pink-700', label: 'Cherry Pink', preview: 'bg-gradient-to-r from-pink-500 to-pink-700' },
    { value: 'from-indigo-500 to-indigo-700', label: 'Deep Indigo', preview: 'bg-gradient-to-r from-indigo-500 to-indigo-700' },
    { value: 'from-teal-500 to-teal-700', label: 'Teal Waters', preview: 'bg-gradient-to-r from-teal-500 to-teal-700' },
    { value: 'from-emerald-500 to-emerald-700', label: 'Emerald Dream', preview: 'bg-gradient-to-r from-emerald-500 to-emerald-700' },
    { value: 'from-cyan-500 to-cyan-700', label: 'Arctic Cyan', preview: 'bg-gradient-to-r from-cyan-500 to-cyan-700' },
  ];

  // Banner types with icons
  const bannerTypes = [
    { value: 'hero', label: 'Hero Banner', icon: Sparkles, description: 'Main homepage banner' },
    { value: 'promotional', label: 'Promotional', icon: Target, description: 'Special offers and deals' },
    { value: 'announcement', label: 'Announcement', icon: Zap, description: 'Important announcements' },
  ];

  // Priority levels
  const priorities = [
    { value: 'low', label: 'Low Priority', color: 'bg-gray-100 text-gray-700' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-100 text-yellow-700' },
    { value: 'high', label: 'High Priority', color: 'bg-red-100 text-red-700' },
  ];

  // Animation types
  const animationTypes = [
    { value: 'fade', label: 'Fade', description: 'Smooth fade transition' },
    { value: 'slide', label: 'Slide', description: 'Slide in from sides' },
    { value: 'zoom', label: 'Zoom', description: 'Zoom in effect' },
    { value: 'flip', label: 'Flip', description: '3D flip animation' },
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
      toast.error('Failed to fetch banners');
    } finally {
      setLoading(false);
    }
  };

  // Enhanced form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.title || formData.title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters';
    }
    if (formData.title && formData.title.length > 255) {
      errors.title = 'Title must be less than 255 characters';
    }
    
    if (formData.subtitle && formData.subtitle.length > 255) {
      errors.subtitle = 'Subtitle must be less than 255 characters';
    }
    
    if (formData.description && formData.description.length > 1000) {
      errors.description = 'Description must be less than 1000 characters';
    }
    
    if (!formData.background_color) {
      errors.background_color = 'Background color is required';
    }
    
    if (formData.cta_text && formData.cta_text.length > 100) {
      errors.cta_text = 'CTA text must be less than 100 characters';
    }
    
    if (formData.cta_link && !isValidUrl(formData.cta_link)) {
      errors.cta_link = 'Please enter a valid URL';
    }
    
    if (!formData.type) {
      errors.type = 'Banner type is required';
    }
    
    if (formData.start_date && formData.end_date && new Date(formData.end_date) < new Date(formData.start_date)) {
      errors.end_date = 'End date must be after start date';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  // Drag and drop handlers
  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, []);

  // Enhanced file upload with progress
  const handleFileUpload = async (file) => {
    if (!file) return;
    
    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB
    
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid image file (JPEG, PNG, GIF, WebP)');
      return;
    }
    
    if (file.size > maxSize) {
      toast.error('File size must be less than 10MB');
      return;
    }

    const formData = new FormData();
    formData.append('image', file);
    formData.append('title', 'Banner Image');
    
    try {
      setIsUploading(true);
      setUploadProgress(0);
      
      const response = await axios.post(`${API_BASE}/upload-banner`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });
      
      setFormData(prev => ({ ...prev, image: response.data.url }));
      toast.success('Image uploaded successfully');
      setUploadProgress(100);
      
      setTimeout(() => {
        setIsUploading(false);
        setUploadProgress(0);
      }, 1000);
      
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image');
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
    }
  };

  // Enhanced submit with validation
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix validation errors');
      return;
    }
    
    setSubmitStatus('loading');
    try {
      if (editingBanner) {
        await axios.put(`${API_BASE}/banners/${editingBanner.id}`, formData);
        toast.success('Banner updated successfully');
      } else {
        await axios.post(`${API_BASE}/banners`, formData);
        toast.success('Banner created successfully');
      }
      
      setSubmitStatus('success');
      fetchBanners();
      
      setTimeout(() => {
        closeModal();
        setSubmitStatus('');
      }, 1500);
      
    } catch (error) {
      setSubmitStatus('error');
      if (error.response?.data?.errors) {
        setValidationErrors(error.response.data.errors);
        toast.error('Please fix validation errors');
      } else {
        toast.error('Failed to save banner');
      }
      console.error('Save error:', error);
      
      setTimeout(() => {
        setSubmitStatus('');
      }, 3000);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this banner? This action cannot be undone.')) return;
    try {
      await axios.delete(`${API_BASE}/banners/${id}`);
      toast.success('Banner deleted successfully');
      fetchBanners();
    } catch (error) {
      console.error('Error deleting banner:', error);
      toast.error('Failed to delete banner');
    }
  };

  const toggleActive = async (id) => {
    try {
      await axios.put(`${API_BASE}/banners/${id}/toggle`);
      toast.success('Banner status updated successfully');
      fetchBanners();
    } catch (error) {
      console.error('Error toggling banner:', error);
      toast.error('Failed to update banner status');
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
        end_date: banner.end_date || '',
        target_audience: banner.target_audience || 'all',
        priority: banner.priority || 'medium',
        animation_type: banner.animation_type || 'fade',
        overlay_opacity: banner.overlay_opacity || 20
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
        end_date: '',
        target_audience: 'all',
        priority: 'medium',
        animation_type: 'fade',
        overlay_opacity: 20
      });
    }
    setValidationErrors({});
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingBanner(null);
    setValidationErrors({});
    setSubmitStatus('');
  };

  const filteredBanners = banners.filter(banner => {
    const matchesSearch = banner.title.toLowerCase().includes(search.toLowerCase()) ||
                         banner.subtitle?.toLowerCase().includes(search.toLowerCase()) ||
                         banner.description?.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === 'all' || banner.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 p-6">
      {/* Professional Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl shadow-lg"
              >
                <Sparkles className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  Marketing Banner Management
                </h1>
                <p className="text-gray-600 mt-2">Create and manage stunning marketing banners with advanced features</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    {banners.length} Active Banners
                  </span>
                  <span>•</span>
                  <span>Professional UI/UX Design</span>
                </div>
              </div>
            </div>
            
            <Button onClick={() => openModal()} className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
              <Plus className="w-5 h-5 mr-2" />
              Create New Banner
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Enhanced Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search banners by title, subtitle, or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
              />
            </div>
            <div className="flex gap-3">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none appearance-none bg-white cursor-pointer"
              >
                <option value="all">🎯 All Types</option>
                <option value="hero">🦸 Hero Banners</option>
                <option value="promotional">🎁 Promotional</option>
                <option value="announcement">📢 Announcements</option>
              </select>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Banners Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full"
          />
        </div>
      ) : filteredBanners.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white rounded-2xl shadow-lg border border-gray-100"
        >
          <ImageIcon className="w-20 h-20 text-gray-300 mx-auto mb-6" />
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No banners found</h3>
          <p className="text-gray-500 mb-6">Start by creating your first marketing banner</p>
          <Button onClick={() => openModal()}>
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Banner
          </Button>
        </motion.div>
      ) : (
        <div className="grid gap-8">
          {filteredBanners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300"
            >
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Enhanced Banner Preview */}
                <div className={`relative h-64 lg:h-full bg-gradient-to-br ${banner.background_color} overflow-hidden`}>
                  {banner.image && (
                    <img 
                      src={banner.image} 
                      alt={banner.title}
                      className="w-full h-full object-cover mix-blend-overlay opacity-40"
                    />
                  )}
                  <div className="absolute inset-0 flex items-center p-6">
                    <div>
                      <h3 className="text-white font-bold text-xl mb-3 drop-shadow-lg">{banner.title}</h3>
                      {banner.subtitle && (
                        <p className="text-white/95 text-sm drop-shadow-lg">{banner.subtitle}</p>
                      )}
                    </div>
                  </div>
                  
                  {/* Status badges */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                    {!banner.active && (
                      <div className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                        Inactive
                      </div>
                    )}
                    <div className={`px-3 py-1 rounded-full text-xs font-bold shadow-lg ${
                      banner.priority === 'high' ? 'bg-red-500 text-white' :
                      banner.priority === 'medium' ? 'bg-yellow-500 text-white' :
                      'bg-green-500 text-white'
                    }`}>
                      {banner.priority?.toUpperCase() || 'MEDIUM'}
                    </div>
                  </div>
                </div>

                {/* Enhanced Banner Details */}
                <div className="lg:col-span-2 p-6">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-blue-100 text-purple-700 text-xs font-bold rounded-full border border-purple-200">
                          {bannerTypes.find(t => t.value === banner.type)?.label || banner.type}
                        </span>
                        <span className="text-gray-400 text-sm">Order: {banner.display_order}</span>
                        <span className="text-gray-400 text-sm">Animation: {banner.animation_type || 'fade'}</span>
                      </div>
                      <h3 className="font-bold text-gray-900 text-xl mb-2">{banner.title}</h3>
                      {banner.subtitle && (
                        <p className="text-gray-600 text-sm mb-3">{banner.subtitle}</p>
                      )}
                      {banner.description && (
                        <p className="text-gray-500 text-sm line-clamp-2">{banner.description}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mb-6 text-sm">
                    {banner.cta_text && (
                      <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg">
                        <Type className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-700 font-medium">CTA: {banner.cta_text}</span>
                      </div>
                    )}
                    {banner.cta_link && (
                      <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg">
                        <LinkIcon className="w-4 h-4 text-green-600" />
                        <span className="text-green-700 font-medium truncate">{banner.cta_link}</span>
                      </div>
                    )}
                    {banner.start_date && (
                      <div className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg">
                        <Calendar className="w-4 h-4 text-purple-600" />
                        <span className="text-purple-700">Start: {banner.start_date}</span>
                      </div>
                    )}
                    {banner.end_date && (
                      <div className="flex items-center gap-2 p-2 bg-orange-50 rounded-lg">
                        <Calendar className="w-4 h-4 text-orange-600" />
                        <span className="text-orange-700">End: {banner.end_date}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleActive(banner.id)}
                      className={`p-3 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                        banner.active
                          ? 'bg-green-100 text-green-700 hover:bg-green-200'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                      title={banner.active ? 'Deactivate' : 'Activate'}
                    >
                      {banner.active ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                    <button
                      onClick={() => openModal(banner)}
                      className="p-3 bg-blue-100 text-blue-700 rounded-xl hover:bg-blue-200 transition-all duration-300 transform hover:scale-105"
                      title="Edit"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(banner.id)}
                      className="p-3 bg-red-100 text-red-700 rounded-xl hover:bg-red-200 transition-all duration-300 transform hover:scale-105"
                      title="Delete"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Enhanced Modal with Drag & Drop */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-5xl max-h-[95vh] overflow-hidden"
            >
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 p-6 flex items-center justify-between bg-gradient-to-r from-purple-50 to-blue-50">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl">
                    <Sparkles className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {editingBanner ? 'Edit Banner' : 'Create New Banner'}
                    </h2>
                    <p className="text-gray-600 text-sm">Design your perfect marketing banner</p>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  className="p-3 hover:bg-gray-100 rounded-xl transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Modal Body with Scroll */}
              <div className="overflow-y-auto max-h-[calc(95vh-120px)]">
                <form onSubmit={handleSubmit} className="p-6 space-y-8">
                  {/* Image Upload Section with Drag & Drop */}
                  <div className="space-y-4">
                    <label className="block text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <ImageIcon className="w-5 h-5 text-purple-600" />
                      Banner Image
                    </label>
                    
                    <div
                      className={`relative border-3 border-dashed rounded-2xl p-8 text-center transition-all duration-300 ${
                        dragActive 
                          ? 'border-purple-500 bg-purple-50' 
                          : 'border-gray-300 bg-gray-50 hover:border-purple-400 hover:bg-purple-50'
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                      
                      {isUploading ? (
                        <div className="space-y-4">
                          <Loader2 className="w-12 h-12 text-purple-600 mx-auto animate-spin" />
                          <div className="space-y-2">
                            <div className="text-sm font-medium text-gray-700">Uploading...</div>
                            <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
                              <motion.div 
                                className="h-full bg-gradient-to-r from-purple-500 to-blue-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${uploadProgress}%` }}
                                transition={{ duration: 0.3 }}
                              />
                            </div>
                            <div className="text-xs text-gray-500">{uploadProgress}%</div>
                          </div>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          <Upload className="w-16 h-16 text-gray-400 mx-auto" />
                          <div>
                            <p className="text-lg font-medium text-gray-700 mb-2">
                              Drag & Drop your image here
                            </p>
                            <p className="text-sm text-gray-500 mb-4">or</p>
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => fileInputRef.current?.click()}
                              className="border-purple-500 text-purple-600 hover:bg-purple-50"
                            >
                              <Upload className="w-4 h-4 mr-2" />
                              Browse Files
                            </Button>
                          </div>
                          <p className="text-xs text-gray-400">
                            Supported formats: JPEG, PNG, GIF, WebP (Max 10MB)
                          </p>
                        </div>
                      )}
                      
                      {formData.image && !isUploading && (
                        <div className="mt-4">
                          <img 
                            src={formData.image} 
                            alt="Preview" 
                            className="mx-auto max-h-40 rounded-lg shadow-md"
                          />
                          <p className="text-xs text-green-600 mt-2">✓ Image uploaded successfully</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Form Fields in Grid */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all ${
                          validationErrors.title ? 'border-red-500 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="Enter compelling banner title"
                      />
                      {validationErrors.title && (
                        <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {validationErrors.title}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Subtitle
                      </label>
                      <input
                        type="text"
                        value={formData.subtitle}
                        onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all ${
                          validationErrors.subtitle ? 'border-red-500 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="Supporting subtitle text"
                      />
                      {validationErrors.subtitle && (
                        <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {validationErrors.subtitle}
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Description
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      rows="3"
                      className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all resize-none ${
                        validationErrors.description ? 'border-red-500 bg-red-50' : 'border-gray-200'
                      }`}
                      placeholder="Detailed description for the banner"
                    />
                    {validationErrors.description && (
                      <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        {validationErrors.description}
                      </div>
                    )}
                  </div>

                  {/* Background Color Selection */}
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-4">
                      Background Color *
                    </label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                      {backgroundColors.map((color) => (
                        <button
                          key={color.value}
                          type="button"
                          onClick={() => setFormData({ ...formData, background_color: color.value })}
                          className={`relative h-16 rounded-xl overflow-hidden transform transition-all duration-300 hover:scale-105 ${
                            formData.background_color === color.value ? 'ring-4 ring-purple-500 scale-105' : ''
                          }`}
                        >
                          <div className={`absolute inset-0 ${color.preview}`} />
                          <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold drop-shadow-lg">
                            {color.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* CTA Section */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        CTA Text
                      </label>
                      <input
                        type="text"
                        value={formData.cta_text}
                        onChange={(e) => setFormData({ ...formData, cta_text: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all ${
                          validationErrors.cta_text ? 'border-red-500 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="Shop Now"
                      />
                      {validationErrors.cta_text && (
                        <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {validationErrors.cta_text}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        CTA Link
                      </label>
                      <input
                        type="text"
                        value={formData.cta_link}
                        onChange={(e) => setFormData({ ...formData, cta_link: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all ${
                          validationErrors.cta_link ? 'border-red-500 bg-red-50' : 'border-gray-200'
                        }`}
                        placeholder="/pharmacy"
                      />
                      {validationErrors.cta_link && (
                        <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {validationErrors.cta_link}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Advanced Settings */}
                  <div className="grid md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Banner Type *
                      </label>
                      <div className="space-y-2">
                        {bannerTypes.map((type) => {
                          const Icon = type.icon;
                          return (
                            <label key={type.value} className="flex items-start gap-3 p-3 border rounded-xl cursor-pointer transition-all hover:bg-purple-50">
                              <input
                                type="radio"
                                name="bannerType"
                                value={type.value}
                                checked={formData.type === type.value}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                className="mt-1"
                              />
                              <div>
                                <div className="flex items-center gap-2 font-medium">
                                  <Icon className="w-4 h-4 text-purple-600" />
                                  {type.label}
                                </div>
                                <p className="text-xs text-gray-500">{type.description}</p>
                              </div>
                            </label>
                          );
                        })}
                      </div>
                      {validationErrors.type && (
                        <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {validationErrors.type}
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Priority
                      </label>
                      <div className="space-y-2">
                        {priorities.map((priority) => (
                          <label key={priority.value} className="flex items-center gap-3 p-3 border rounded-xl cursor-pointer transition-all hover:bg-purple-50">
                            <input
                              type="radio"
                              name="priority"
                              value={priority.value}
                              checked={formData.priority === priority.value}
                              onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                              className="mt-1"
                            />
                            <span className={`px-3 py-1 rounded-lg text-xs font-medium ${priority.color}`}>
                              {priority.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Display Order
                      </label>
                      <input
                        type="number"
                        value={formData.display_order}
                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  {/* Date Settings */}
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={formData.start_date}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        End Date
                      </label>
                      <input
                        type="date"
                        value={formData.end_date}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                        className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500 outline-none transition-all ${
                          validationErrors.end_date ? 'border-red-500 bg-red-50' : 'border-gray-200'
                        }`}
                      />
                      {validationErrors.end_date && (
                        <div className="flex items-center gap-2 mt-2 text-red-600 text-sm">
                          <AlertCircle className="w-4 h-4" />
                          {validationErrors.end_date}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Status Toggle */}
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-1">
                        Banner Status
                      </label>
                      <p className="text-xs text-gray-500">Active banners will be displayed on the website</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.active}
                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                        className="sr-only peer"
                      />
                      <div className="w-14 h-7 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-500/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-blue-500"></div>
                      <span className="ml-4 text-sm font-medium text-gray-700">
                        {formData.active ? 'Active' : 'Inactive'}
                      </span>
                    </label>
                  </div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="sticky bottom-0 bg-white border-t border-gray-100 p-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">
                    {editingBanner ? 'Editing existing banner' : 'Creating new banner'}
                  </div>
                  <div className="flex items-center gap-4">
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={closeModal}
                      disabled={submitStatus === 'loading'}
                      className="border-gray-300 text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit"
                      onClick={handleSubmit}
                      disabled={submitStatus === 'loading'}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 min-w-32"
                    >
                      {submitStatus === 'loading' && (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      )}
                      {submitStatus === 'success' && (
                        <Check className="w-4 h-4 mr-2" />
                      )}
                      {submitStatus === 'error' && (
                        <AlertCircle className="w-4 h-4 mr-2" />
                      )}
                      {submitStatus === 'loading' ? 'Saving...' :
                       submitStatus === 'success' ? 'Saved Successfully!' :
                       submitStatus === 'error' ? 'Error - Try Again' :
                       (editingBanner ? 'Update Banner' : 'Create Banner')}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
