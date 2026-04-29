import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Microscope,
  TestTube,
  FlaskConical,
  Activity,
  Users,
  Building,
  FileText,
  Settings,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Calendar,
  Search,
  Filter,
  Download,
  Plus,
  Edit3,
  Trash2,
  Eye,
  BarChart3,
  PieChart,
  Target,
  Zap,
  Shield,
  Database,
  Beaker,
  Dna,
  Stethoscope,
  Heart,
  Brain,
  Loader2
} from 'lucide-react';

const AnalysisSetup = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [stats, setStats] = useState({
    totalDepartments: 0,
    totalTests: 0,
    totalSpecimens: 0,
    totalCollections: 0,
    activeTests: 0,
    pendingSamples: 0,
    completedToday: 0,
    avgProcessingTime: 0
  });

  // Mock data for demonstration
  const mockStats = {
    totalDepartments: 8,
    totalTests: 156,
    totalSpecimens: 1240,
    totalCollections: 892,
    activeTests: 45,
    pendingSamples: 23,
    completedToday: 67,
    avgProcessingTime: 2.5
  };

  const mockRecentActivity = [
    { id: 1, type: 'test', name: 'CBC Blood Test', time: '2 mins ago', status: 'completed' },
    { id: 2, type: 'specimen', name: 'Urine Analysis', time: '5 mins ago', status: 'processing' },
    { id: 3, type: 'collection', name: 'Blood Sample', time: '10 mins ago', status: 'collected' },
    { id: 4, type: 'department', name: 'Pathology Lab', time: '15 mins ago', status: 'active' },
    { id: 5, type: 'test', name: 'X-Ray Chest', time: '20 mins ago', status: 'scheduled' }
  ];

  const mockDepartments = [
    { id: 1, name: 'Pathology', head: 'Dr. Sarah Johnson', tests: 45, status: 'active', efficiency: 94 },
    { id: 2, name: 'Radiology', head: 'Dr. Michael Chen', tests: 32, status: 'active', efficiency: 89 },
    { id: 3, name: 'Biochemistry', head: 'Dr. Emily Davis', tests: 28, status: 'active', efficiency: 92 },
    { id: 4, name: 'Microbiology', head: 'Dr. James Wilson', tests: 24, status: 'maintenance', efficiency: 87 },
    { id: 5, name: 'Hematology', head: 'Dr. Lisa Anderson', tests: 18, status: 'active', efficiency: 95 },
    { id: 6, name: 'Immunology', head: 'Dr. Robert Taylor', tests: 15, status: 'active', efficiency: 91 }
  ];

  const menuItems = [
    { id: 'overview', name: 'Overview', icon: BarChart3, color: 'from-blue-500 to-blue-600' },
    { id: 'departments', name: 'Analysis Department', icon: Building, color: 'from-purple-500 to-purple-600' },
    { id: 'tests', name: 'Test/Service Entry', icon: TestTube, color: 'from-green-500 to-green-600' },
    { id: 'specimens', name: 'Analysis Specimen', icon: FlaskConical, color: 'from-orange-500 to-orange-600' },
    { id: 'collection', name: 'Sample Collection Room', icon: Activity, color: 'from-red-500 to-red-600' }
  ];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setStats(mockStats);
      setLoading(false);
      addNotification('Analysis Setup loaded successfully', 'success');
    }, 1000);
  }, []);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-emerald-600 bg-emerald-100';
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'maintenance': return 'text-orange-600 bg-orange-100';
      case 'scheduled': return 'text-purple-600 bg-purple-100';
      case 'collected': return 'text-indigo-600 bg-indigo-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'test': return <TestTube className="w-4 h-4" />;
      case 'specimen': return <FlaskConical className="w-4 h-4" />;
      case 'collection': return <Activity className="w-4 h-4" />;
      case 'department': return <Building className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading Analysis Setup...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl">
              <Microscope className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analysis Setup</h1>
              <p className="text-gray-600">Manage laboratory analysis departments, tests, specimens, and collections</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search analysis setup..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Navigation Tabs */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === item.id
                  ? `bg-gradient-to-r ${item.color} text-white shadow-lg transform scale-105`
                  : 'text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              <item.icon className="w-4 h-4" />
              <span className="font-medium">{item.name}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Notifications */}
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
              notification.type === 'success' ? 'bg-green-500 text-white' :
              notification.type === 'error' ? 'bg-red-500 text-white' :
              'bg-blue-500 text-white'
            }`}
          >
            {notification.message}
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Content based on active tab */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { label: 'Total Departments', value: stats.totalDepartments, icon: Building, color: 'from-purple-500 to-purple-600', change: '+2' },
                  { label: 'Total Tests', value: stats.totalTests, icon: TestTube, color: 'from-green-500 to-green-600', change: '+12' },
                  { label: 'Total Specimens', value: stats.totalSpecimens, icon: FlaskConical, color: 'from-orange-500 to-orange-600', change: '+45' },
                  { label: 'Total Collections', value: stats.totalCollections, icon: Activity, color: 'from-red-500 to-red-600', change: '+28' }
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-lg`}>
                        <stat.icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm font-medium text-green-600 bg-green-100 px-2 py-1 rounded">
                        {stat.change}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                    <p className="text-gray-600 text-sm">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* Additional Stats */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Active Tests</h3>
                    <Zap className="w-5 h-5 text-yellow-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stats.activeTests}</div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    Avg processing: {stats.avgProcessingTime} hrs
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Pending Samples</h3>
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{stats.pendingSamples}</div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <Calendar className="w-4 h-4 mr-1" />
                    {stats.completedToday} completed today
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-white rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">Efficiency Rate</h3>
                    <Target className="w-5 h-5 text-green-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900">92%</div>
                  <div className="flex items-center mt-2 text-sm text-gray-600">
                    <TrendingUp className="w-4 h-4 mr-1" />
                    +3% from last week
                  </div>
                </motion.div>
              </div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {mockRecentActivity.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg ${getStatusColor(activity.status)}`}>
                          {getActivityIcon(activity.type)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{activity.name}</p>
                          <p className="text-sm text-gray-600">{activity.time}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
                        {activity.status}
                      </span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Department Overview */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {mockDepartments.slice(0, 6).map((dept) => (
                    <div key={dept.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-gray-900">{dept.name}</h4>
                        <span className={`w-2 h-2 rounded-full ${
                          dept.status === 'active' ? 'bg-green-500' : 'bg-orange-500'
                        }`} />
                      </div>
                      <p className="text-sm text-gray-600 mb-1">{dept.head}</p>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">{dept.tests} tests</span>
                        <span className="text-gray-500">{dept.efficiency}% efficient</span>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          )}

          {/* Placeholder content for other tabs */}
          {activeTab !== 'overview' && (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <div className="flex justify-center mb-4">
                <div className={`p-4 bg-gradient-to-r ${
                  menuItems.find(item => item.id === activeTab)?.color || 'from-gray-500 to-gray-600'
                } rounded-xl`}>
                  {React.createElement(menuItems.find(item => item.id === activeTab)?.icon || FileText, {
                    className: "w-8 h-8 text-white"
                  })}
                </div>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {menuItems.find(item => item.id === activeTab)?.name || 'Section'}
              </h3>
              <p className="text-gray-600 mb-6">
                This section is under development. Full functionality coming soon.
              </p>
              <div className="flex justify-center space-x-4">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  <Plus className="w-4 h-4 inline mr-2" />
                  Add New
                </button>
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <Eye className="w-4 h-4 inline mr-2" />
                  View Details
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default AnalysisSetup;
