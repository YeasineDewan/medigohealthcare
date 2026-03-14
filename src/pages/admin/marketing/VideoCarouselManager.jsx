import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Upload,
  Film,
  X,
  Check,
  AlertTriangle,
  Save,
  RefreshCw,
  Play,
  Pause,
  Volume2,
  VolumeX,
  DragHandleDots2Icon,
  ArrowUp,
  ArrowDown,
  Copy,
  Share2,
  Download,
  Settings,
  Grid3x3,
  List,
  Filter,
  Star,
  MoreVertical,
  Calendar,
  Clock,
  TrendingUp,
  BarChart3,
  PieChart,
  Activity,
  Zap,
  Heart,
  MessageSquare,
  Link,
  ExternalLink,
  CopyCheck,
  Trash,
  Edit,
  View,
  SlidersHorizontal
} from 'lucide-react';

const VideoCarouselManager = () => {
  const [videos, setVideos] = useState([
    {
      id: 1,
      title: "Welcome to Medigo Healthcare",
      description: "Experience world-class healthcare with our expert medical team",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      thumbnail: "https://picsum.photos/seed/medigo1/400/225",
      category: "General",
      status: "active",
      order: 1,
      duration: "0:30",
      views: 1250,
      featured: true,
      autoplay: true,
      mute: true,
      loop: true,
      showControls: true,
      displayPages: ["home", "doctors", "about"],
      createdAt: "2025-01-15",
      updatedAt: "2025-01-15",
      tags: ["healthcare", "welcome", "intro"],
      engagement: {
        likes: 45,
        shares: 12,
        comments: 8,
        avgWatchTime: "0:25"
      }
    },
    {
      id: 2,
      title: "Our Expert Doctors",
      description: "Meet our team of experienced medical professionals",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      thumbnail: "https://picsum.photos/seed/medigo2/400/225",
      category: "Doctors",
      status: "active",
      order: 2,
      duration: "0:45",
      views: 890,
      featured: false,
      autoplay: true,
      mute: true,
      loop: false,
      showControls: true,
      displayPages: ["home", "doctors"],
      createdAt: "2025-01-14",
      updatedAt: "2025-01-14",
      tags: ["doctors", "medical", "team"],
      engagement: {
        likes: 32,
        shares: 8,
        comments: 5,
        avgWatchTime: "0:38"
      }
    },
    {
      id: 3,
      title: "Advanced Medical Technology",
      description: "State-of-the-art equipment and facilities",
      url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      thumbnail: "https://picsum.photos/seed/medigo3/400/225",
      category: "Technology",
      status: "active",
      order: 3,
      duration: "0:25",
      views: 650,
      featured: false,
      autoplay: true,
      mute: true,
      loop: true,
      showControls: true,
      displayPages: ["home", "about"],
      createdAt: "2025-01-13",
      updatedAt: "2025-01-13",
      tags: ["technology", "equipment", "facilities"],
      engagement: {
        likes: 28,
        shares: 6,
        comments: 3,
        avgWatchTime: "0:20"
      }
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterFeatured, setFilterFeatured] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlaying, setIsPlaying] = useState({});
  const [sortBy, setSortBy] = useState('order'); // 'order', 'title', 'views', 'date'
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc', 'desc'
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [formData, setFormData] = useState({
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
    tags: []
  });

  const categories = ['General', 'Doctors', 'Technology', 'Services', 'Patient Stories', 'Emergency'];
  const pageOptions = ['home', 'doctors', 'about', 'services', 'contact'];

  // Enhanced filtering and sorting
  const filteredVideos = useMemo(() => {
    return videos.filter(video => {
      const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           video.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesCategory = filterCategory === 'all' || video.category === filterCategory;
      const matchesStatus = filterStatus === 'all' || video.status === filterStatus;
      const matchesFeatured = filterFeatured === 'all' || 
                           (filterFeatured === 'featured' && video.featured) ||
                           (filterFeatured === 'not-featured' && !video.featured);
      
      return matchesSearch && matchesCategory && matchesStatus && matchesFeatured;
    }).sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'title':
          comparison = a.title.localeCompare(b.title);
          break;
        case 'views':
          comparison = a.views - b.views;
          break;
        case 'date':
          comparison = new Date(a.createdAt) - new Date(b.createdAt);
          break;
        case 'order':
        default:
          comparison = a.order - b.order;
          break;
      }
      
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [videos, searchTerm, filterCategory, filterStatus, filterFeatured, sortBy, sortOrder]);

  const stats = useMemo(() => ({
    total: videos.length,
    active: videos.filter(v => v.status === 'active').length,
    featured: videos.filter(v => v.featured).length,
    totalViews: videos.reduce((sum, v) => sum + v.views, 0),
    totalEngagement: videos.reduce((sum, v) => 
      sum + (v.engagement?.likes || 0) + (v.engagement?.shares || 0) + (v.engagement?.comments || 0), 0
    ),
    avgWatchTime: videos.length > 0 
      ? videos.reduce((sum, v) => sum + (v.engagement?.avgWatchTime ? parseInt(v.engagement.avgWatchTime.split(':')[0]) * 60 + parseInt(v.engagement.avgWatchTime.split(':')[1]) : 0), 0) / videos.length
      : 0
  }), [videos]);

  // Enhanced handlers
  const handleSelectVideo = useCallback((videoId) => {
    setSelectedVideos(prev => 
      prev.includes(videoId) 
        ? prev.filter(id => id !== videoId)
        : [...prev, videoId]
    );
  }, []);

  const handleSelectAll = useCallback(() => {
    if (selectedVideos.length === filteredVideos.length) {
      setSelectedVideos([]);
    } else {
      setSelectedVideos(filteredVideos.map(v => v.id));
    }
  }, [selectedVideos.length, filteredVideos]);

  const handleBulkDelete = useCallback(() => {
    setVideos(prev => prev.filter(video => !selectedVideos.includes(video.id)));
    setSelectedVideos([]);
    setShowBulkActions(false);
  }, [selectedVideos]);

  const handleBulkStatusChange = useCallback((status) => {
    setVideos(prev => prev.map(video => 
      selectedVideos.includes(video.id) 
        ? { ...video, status, updatedAt: new Date().toISOString().split('T')[0] }
        : video
    ));
    setSelectedVideos([]);
    setShowBulkActions(false);
  }, [selectedVideos]);

  const handleDuplicateVideo = useCallback((video) => {
    const duplicatedVideo = {
      ...video,
      id: Math.max(...videos.map(v => v.id)) + 1,
      title: `${video.title} (Copy)`,
      views: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      engagement: {
        likes: 0,
        shares: 0,
        comments: 0,
        avgWatchTime: "0:00"
      }
    };
    setVideos(prev => [...prev, duplicatedVideo]);
  }, [videos]);

  const handleExportData = useCallback(() => {
    const dataStr = JSON.stringify(videos, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'video-carousel-data.json';
    link.click();
    URL.revokeObjectURL(url);
  }, [videos]);

  const handleAddVideo = () => {
    const newVideo = {
      id: Math.max(...videos.map(v => v.id)) + 1,
      ...formData,
      order: videos.length + 1,
      duration: "0:30",
      views: 0,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      engagement: {
        likes: 0,
        shares: 0,
        comments: 0,
        avgWatchTime: "0:00"
      }
    };
    setVideos([...videos, newVideo]);
    setShowAddModal(false);
    resetForm();
  };

  const handleEditVideo = () => {
    setVideos(videos.map(video => 
      video.id === selectedVideo.id 
        ? { ...video, ...formData, updatedAt: new Date().toISOString().split('T')[0] }
        : video
    ));
    setShowEditModal(false);
    resetForm();
  };

  const handleDeleteVideo = (id) => {
    setVideos(videos.filter(video => video.id !== id));
  };

  const handleToggleStatus = (id) => {
    setVideos(videos.map(video => 
      video.id === id 
        ? { ...video, status: video.status === 'active' ? 'inactive' : 'active' }
        : video
    ));
  };

  const handleToggleFeatured = (id) => {
    setVideos(videos.map(video => 
      video.id === id 
        ? { ...video, featured: !video.featured }
        : video
    ));
  };

  const handleReorder = (id, direction) => {
    const index = videos.findIndex(v => v.id === id);
    if (direction === 'up' && index > 0) {
      const newVideos = [...videos];
      [newVideos[index], newVideos[index - 1]] = [newVideos[index - 1], newVideos[index]];
      setVideos(newVideos.map((v, i) => ({ ...v, order: i + 1 })));
    } else if (direction === 'down' && index < videos.length - 1) {
      const newVideos = [...videos];
      [newVideos[index], newVideos[index + 1]] = [newVideos[index + 1], newVideos[index]];
      setVideos(newVideos.map((v, i) => ({ ...v, order: i + 1 })));
    }
  };

  const handlePlayPause = (id) => {
    setIsPlaying(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const resetForm = () => {
    setFormData({
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
      displayPages: ['home']
    });
  };

  const openEditModal = (video) => {
    setSelectedVideo(video);
    setFormData({
      title: video.title,
      description: video.description,
      url: video.url,
      thumbnail: video.thumbnail,
      category: video.category,
      status: video.status,
      featured: video.featured,
      autoplay: video.autoplay,
      mute: video.mute,
      loop: video.loop,
      showControls: video.showControls,
      displayPages: video.displayPages
    });
    setShowEditModal(true);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">Video Carousel Manager</h1>
            <p className="text-xl opacity-90">Manage promotional videos across all pages</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-3 px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl hover:bg-gray-100 transition-all"
          >
            <Plus className="w-6 h-6" /> Add New Video
          </motion.button>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Videos', value: stats.total, icon: Film, color: 'from-blue-500 to-blue-600' },
          { title: 'Active Videos', value: stats.active, icon: Play, color: 'from-green-500 to-green-600' },
          { title: 'Featured Videos', value: stats.featured, icon: Star, color: 'from-yellow-500 to-orange-500' },
          { title: 'Total Views', value: stats.totalViews.toLocaleString(), icon: Eye, color: 'from-purple-500 to-pink-500' }
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
                  src={video.thumbnail}
                  alt={video.title}
                  className={`w-full ${viewMode === 'list' ? 'h-full' : 'h-48'} object-cover`}
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
                    {video.duration}
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
                    {video.views.toLocaleString()} views
                  </span>
                </div>

                {/* Display Pages */}
                <div className="mb-4">
                  <p className="text-sm text-gray-500 mb-2">Display on:</p>
                  <div className="flex flex-wrap gap-1">
                    {video.displayPages.map(page => (
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
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all"
                >
                  <Save className="w-5 h-5 inline mr-2" />
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
