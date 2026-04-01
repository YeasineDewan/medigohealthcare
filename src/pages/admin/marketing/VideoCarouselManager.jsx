import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Film,
  X,
  Check,
  Save,
  RefreshCw,
  Play,
  Pause,
  ArrowUp,
  ArrowDown,
  Grid3x3,
  List,
  Star,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { videoCarouselApi } from '../../../services/apiService';

const defaultFormData = {
  title: '',
  description: '',
  url: '',
  thumbnail: '',
  category: 'General',
  status: 'active',
  featured: false,
  autoplay: true,
  mute: true,
  loop: true,
  showControls: true,
  displayPages: ['home'],
  tags: [],
};

const VideoCarouselManager = () => {
  const [videos, setVideos] = useState([]);
  const [stats, setStats] = useState({ total: 0, active: 0, featured: 0, totalViews: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFeatured, setFilterFeatured] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState({});
  const [sortBy, setSortBy] = useState('order');
  const [sortOrder, setSortOrder] = useState('asc');
  const [formData, setFormData] = useState(defaultFormData);

  const fetchVideos = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await videoCarouselApi.adminList({
        search: searchTerm || undefined,
        category: filterCategory !== 'all' ? filterCategory : undefined,
        status: filterStatus !== 'all' ? filterStatus : undefined,
        featured: filterFeatured === 'featured' ? 'true' : filterFeatured === 'not-featured' ? 'false' : undefined,
        per_page: 100,
      });
      const list = data?.videos ?? [];
      setVideos(Array.isArray(list) ? list : []);
      if (data?.stats) setStats(data.stats);
    } catch (err) {
      console.error('Video carousel fetch error:', err);
      setError(err?.response?.data?.message || err?.message || 'Failed to load videos');
      setVideos([]);
      toast.error('Could not load video carousel');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, filterCategory, filterStatus, filterFeatured]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  const categories = ['General', 'Doctors', 'Technology', 'Services', 'Patient Stories', 'Emergency'];
  const pageOptions = ['home', 'doctors', 'about', 'services', 'contact'];

  const filteredVideos = useMemo(() => {
    return [...videos].sort((a, b) => {
      let comparison = 0;
      switch (sortBy) {
        case 'title': comparison = (a.title || '').localeCompare(b.title || ''); break;
        case 'views': comparison = (a.views || 0) - (b.views || 0); break;
        case 'date': comparison = new Date(a.createdAt || 0) - new Date(b.createdAt || 0); break;
        default: comparison = (a.order ?? 0) - (b.order ?? 0);
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [videos, sortBy, sortOrder]);

  const toPayload = (fd) => ({
    title: fd.title,
    description: fd.description || null,
    video_url: fd.url,
    thumbnail_url: fd.thumbnail || null,
    category: fd.category || 'General',
    status: fd.status,
    featured: fd.featured,
    autoplay: fd.autoplay,
    mute: fd.mute,
    loop: fd.loop,
    show_controls: fd.showControls,
    display_pages: Array.isArray(fd.displayPages) ? fd.displayPages : ['home'],
    tags: Array.isArray(fd.tags) ? fd.tags : [],
  });

  const handleAddVideo = async () => {
    if (!formData.title?.trim() || !formData.url?.trim()) {
      toast.error('Title and video URL are required');
      return;
    }
    setSaving(true);
    try {
      const { data } = await videoCarouselApi.create(toPayload(formData));
      const newVideo = data?.video;
      if (newVideo) setVideos(prev => [...prev, newVideo]);
      setShowAddModal(false);
      setFormData(defaultFormData);
      if (data?.stats) setStats(data.stats);
      toast.success('Video added successfully');
      fetchVideos();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to add video');
    } finally {
      setSaving(false);
    }
  };

  const handleEditVideo = async () => {
    if (!selectedVideo?.id || !formData.title?.trim() || !formData.url?.trim()) {
      toast.error('Title and video URL are required');
      return;
    }
    setSaving(true);
    try {
      const { data } = await videoCarouselApi.update(selectedVideo.id, toPayload(formData));
      if (data?.video) setVideos(prev => prev.map(v => v.id === selectedVideo.id ? data.video : v));
      setShowEditModal(false);
      setFormData(defaultFormData);
      setSelectedVideo(null);
      toast.success('Video updated successfully');
      fetchVideos();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to update video');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteVideo = async (id) => {
    try {
      await videoCarouselApi.delete(id);
      setVideos(prev => prev.filter(v => v.id !== id));
      toast.success('Video removed');
      fetchVideos();
    } catch (err) {
      toast.error(err?.response?.data?.message || 'Failed to delete video');
    }
  };

  const handleToggleStatus = async (id) => {
    try {
      const { data } = await videoCarouselApi.toggleStatus(id);
      if (data?.video) setVideos(prev => prev.map(v => v.id === id ? data.video : v));
      toast.success(data?.video?.status === 'active' ? 'Video activated' : 'Video deactivated');
    } catch (err) {
      toast.error('Failed to update status');
    }
  };

  const handleToggleFeatured = async (id) => {
    try {
      const { data } = await videoCarouselApi.toggleFeatured(id);
      if (data?.video) setVideos(prev => prev.map(v => v.id === id ? data.video : v));
      toast.success(data?.video?.featured ? 'Marked as featured' : 'Removed from featured');
    } catch (err) {
      toast.error('Failed to update featured');
    }
  };

  const handleReorder = async (id, direction) => {
    const index = videos.findIndex(v => v.id === id);
    const newOrder = [...videos];
    if (direction === 'up' && index > 0) {
      [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
    } else if (direction === 'down' && index < videos.length - 1 && index >= 0) {
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    } else return;
    const orderIds = newOrder.map(v => v.id);
    try {
      const { data } = await videoCarouselApi.reorder(orderIds);
      if (data?.videos?.length) setVideos(data.videos);
      toast.success('Order updated');
    } catch (err) {
      toast.error('Failed to reorder');
    }
  };

  const handlePlayPause = (id) => {
    setIsPlaying(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const resetForm = () => setFormData(defaultFormData);

  const openEditModal = (video) => {
    setSelectedVideo(video);
    setFormData({
      title: video.title ?? '',
      description: video.description ?? '',
      url: video.url ?? video.video_url ?? '',
      thumbnail: video.thumbnail ?? video.thumbnail_url ?? '',
      category: video.category ?? 'General',
      status: video.status ?? 'active',
      featured: !!video.featured,
      autoplay: video.autoplay !== false,
      mute: video.mute !== false,
      loop: video.loop !== false,
      showControls: (video.showControls ?? video.show_controls) !== false,
      displayPages: Array.isArray(video.displayPages) ? video.displayPages : (Array.isArray(video.display_pages) ? video.display_pages : ['home']),
      tags: Array.isArray(video.tags) ? video.tags : [],
    });
    setShowEditModal(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-[#165028] to-[#5DBB63] rounded-3xl p-8 text-white shadow-xl"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Video Carousel Manager</h1>
            <p className="text-xl opacity-90">Manage promotional videos across Home, Doctors, About and more</p>
          </div>
          <div className="flex items-center gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={fetchVideos}
              disabled={loading}
              className="flex items-center gap-2 px-4 py-3 bg-white/20 rounded-xl hover:bg-white/30 transition-all disabled:opacity-60"
            >
              <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} /> Refresh
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-3 px-8 py-4 bg-white text-[#165028] font-bold rounded-2xl hover:bg-gray-100 transition-all"
            >
              <Plus className="w-6 h-6" /> Add New Video
            </motion.button>
          </div>
        </div>
      </motion.div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between gap-4 p-4 bg-amber-50 border border-amber-200 rounded-2xl text-amber-800"
        >
          <span className="flex items-center gap-2"><AlertCircle className="w-5 h-5" /> {error}</span>
          <button onClick={fetchVideos} className="px-4 py-2 bg-amber-200 rounded-lg font-medium hover:bg-amber-300">Retry</button>
        </motion.div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Videos', value: stats.total, icon: Film, color: 'from-blue-500 to-blue-600' },
          { title: 'Active Videos', value: stats.active, icon: Play, color: 'from-green-500 to-green-600' },
          { title: 'Featured Videos', value: stats.featured, icon: Star, color: 'from-yellow-500 to-orange-500' },
          { title: 'Total Views', value: (stats.totalViews ?? 0).toLocaleString(), icon: Eye, color: 'from-purple-500 to-pink-500' }
        ].map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium mb-1">{stat.title}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-14 h-14 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="w-7 h-7 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Filters and Controls */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100"
      >
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search videos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>
          
          <select 
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select 
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>

          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('grid')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <Grid3x3 className="w-5 h-5" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setViewMode('list')}
              className={`p-3 rounded-xl transition-all ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-600'}`}
            >
              <List className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Videos Grid/List */}
      <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
        {loading ? (
          [...Array(6)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-200" />
              <div className="p-6 space-y-3">
                <div className="h-5 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-1/2" />
                <div className="flex gap-2 mt-4">
                  <div className="h-8 w-20 bg-gray-100 rounded-lg" />
                  <div className="h-8 w-16 bg-gray-100 rounded-lg" />
                </div>
              </div>
            </div>
          ))
        ) : (
        <AnimatePresence>
          {filteredVideos.map((video, index) => (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Video Thumbnail */}
              <div className={`relative ${viewMode === 'list' ? 'w-48' : ''} bg-gray-100`}>
                <img
                  src={video.thumbnail || video.thumbnail_url || ''}
                  alt={video.title}
                  className={`w-full ${viewMode === 'list' ? 'h-full' : 'h-48'} object-cover`}
                  onError={(e) => { e.target.src = 'https://placehold.co/400x225?text=No+thumbnail'; }}
                />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handlePlayPause(video.id)}
                    className="p-3 bg-white/90 rounded-full"
                  >
                    {isPlaying[video.id] ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </motion.button>
                </div>
                
                {/* Status Badge */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    video.status === 'active' 
                      ? 'bg-green-100 text-green-700' 
                      : 'bg-red-100 text-red-700'
                  }`}>
                    {video.status.toUpperCase()}
                  </span>
                </div>

                {/* Featured Badge */}
                {video.featured && (
                  <div className="absolute top-3 right-3">
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-bold">
                      ⭐ FEATURED
                    </span>
                  </div>
                )}

                {/* Duration */}
                <div className="absolute bottom-3 right-3">
                  <span className="px-2 py-1 bg-black/70 text-white rounded text-xs">
                    {video.duration || '–'}
                  </span>
                </div>
              </div>

              {/* Video Info */}
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{video.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">{video.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">
                    {video.category}
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                    {(video.views ?? 0).toLocaleString()} views
                  </span>
                </div>

                {/* Display Pages */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Display on:</p>
                  <div className="flex flex-wrap gap-1">
                    {(video.displayPages || video.display_pages || []).map(page => (
                      <span key={page} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                        {page}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openEditModal(video)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-all"
                    >
                      <Edit3 className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleToggleStatus(video.id)}
                      className={`p-2 rounded-lg transition-all ${
                        video.status === 'active' 
                          ? 'bg-red-100 text-red-600 hover:bg-red-200' 
                          : 'bg-green-100 text-green-600 hover:bg-green-200'
                      }`}
                    >
                      {video.status === 'active' ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleToggleFeatured(video.id)}
                      className={`p-2 rounded-lg transition-all ${
                        video.featured 
                          ? 'bg-yellow-100 text-yellow-600 hover:bg-yellow-200' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <Star className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteVideo(video.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>

                  {/* Reorder Controls */}
                  <div className="flex gap-1">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleReorder(video.id, 'up')}
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all"
                      disabled={index === 0}
                    >
                      <ArrowUp className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleReorder(video.id, 'down')}
                      className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-all"
                      disabled={index === filteredVideos.length - 1}
                    >
                      <ArrowDown className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => {
              setShowAddModal(false);
              setShowEditModal(false);
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {showAddModal ? 'Add New Video' : 'Edit Video'}
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                  }}
                  className="p-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
                >
                  <X className="w-5 h-5" />
                </motion.button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Enter video title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={3}
                    placeholder="Enter video description"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Video URL</label>
                    <input
                      type="url"
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="https://example.com/video.mp4"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Thumbnail URL</label>
                    <input
                      type="url"
                      value={formData.thumbnail}
                      onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="https://example.com/thumbnail.jpg"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Display Pages</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {pageOptions.map(page => (
                      <label key={page} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.displayPages.includes(page)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setFormData({ 
                                ...formData, 
                                displayPages: [...formData.displayPages, page] 
                              });
                            } else {
                              setFormData({ 
                                ...formData, 
                                displayPages: formData.displayPages.filter(p => p !== page) 
                              });
                            }
                          }}
                          className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                        />
                        <span className="text-sm text-gray-700 capitalize">{page}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Video Settings</label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">Featured</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.autoplay}
                        onChange={(e) => setFormData({ ...formData, autoplay: e.target.checked })}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">Autoplay</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.mute}
                        onChange={(e) => setFormData({ ...formData, mute: e.target.checked })}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">Muted</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.loop}
                        onChange={(e) => setFormData({ ...formData, loop: e.target.checked })}
                        className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                      />
                      <span className="text-sm text-gray-700">Loop</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={showAddModal ? handleAddVideo : handleEditVideo}
                  disabled={saving}
                  className="flex-1 py-3 bg-gradient-to-r from-[#165028] to-[#5DBB63] text-white font-bold rounded-xl hover:opacity-90 transition-all disabled:opacity-60 flex items-center justify-center gap-2"
                >
                  {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                  {showAddModal ? 'Add Video' : 'Save Changes'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setShowAddModal(false);
                    setShowEditModal(false);
                    resetForm();
                  }}
                  className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all"
                >
                  Cancel
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default VideoCarouselManager;
