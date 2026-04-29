import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Shield,
  Database,
  Key,
  Users,
  Bell,
  Globe,
  Smartphone,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Download,
  Upload,
  RefreshCw,
  Save,
  X,
  Plus,
  Edit3,
  Trash2,
  Check,
  AlertCircle,
  Clock,
  Calendar,
  FileText,
  HardDrive,
  Cloud,
  Wifi,
  Monitor,
  Cpu,
  Zap,
  Activity,
  AlertTriangle,
  CheckCircle,
  Info,
  HelpCircle,
  User,
  UserPlus,
  UserMinus,
  Ban,
  Crown,
  Star,
  Award,
  Target,
  TrendingUp,
  BarChart3,
  PieChart,
  FileSpreadsheet,
  FileImage,
  FileVideo,
  FileAudio,
  Archive,
  Folder,
  FolderOpen,
  Search,
  Filter,
  Heart,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Copy,
  Share2,
  Link,
  QrCode,
  Fingerprint,
  CreditCard,
  Building,
  MapPin,
  Phone,
  MessageSquare,
  Video,
  Mic,
  Camera,
  Volume2,
  WifiOff,
  Battery,
  BatteryCharging,
  Cpu as CpuIcon,
  Thermometer,
  Wind,
  Droplets,
  Sun,
  Moon,
  CloudRain,
  CloudSnow,
  Zap as ZapIcon
} from 'lucide-react';

const SystemSettings = () => {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [showPassword, setShowPassword] = useState(false);
  const [settings, setSettings] = useState({
    general: {
      siteName: 'Medigo Healthcare',
      siteUrl: 'https://medigo.com',
      adminEmail: 'admin@medigo.com',
      timezone: 'UTC-5',
      language: 'en',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
      currency: 'USD',
      maintenance: false,
      debugMode: false
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      passwordMinLength: 8,
      passwordRequireSpecial: true,
      passwordRequireNumbers: true,
      maxLoginAttempts: 5,
      lockoutDuration: 15,
      ipWhitelist: ['192.168.1.1', '10.0.0.1'],
      allowedDomains: ['medigo.com', 'hospital.com'],
      apiRateLimit: 1000,
      logRetention: 90
    },
    backup: {
      autoBackup: true,
      backupFrequency: 'daily',
      backupTime: '02:00',
      backupLocation: 'cloud',
      retentionDays: 30,
      compression: true,
      encryption: true,
      emailNotifications: true,
      lastBackup: '2024-01-15 02:00:00',
      nextBackup: '2024-01-16 02:00:00',
      backupSize: '2.4 GB'
    },
    notifications: {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      appointmentReminders: true,
      billingAlerts: true,
      systemAlerts: true,
      securityAlerts: true,
      maintenanceAlerts: true,
      emailTemplate: 'default',
      smsProvider: 'twilio',
      pushProvider: 'firebase'
    },
    integrations: {
      googleAnalytics: true,
      facebookPixel: false,
      mailchimp: true,
      stripe: true,
      paypal: false,
      quickbooks: true,
      salesforce: false,
      slack: true,
      zoom: true,
      dropbox: false
    },
    performance: {
      caching: true,
      cacheTimeout: 3600,
      compressionEnabled: true,
      imageOptimization: true,
      minifyAssets: true,
      cdnEnabled: true,
      databaseOptimization: true,
      indexOptimization: true,
      queryCache: true
    }
  });

  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Super Admin',
      description: 'Full system access with all permissions',
      permissions: ['all'],
      userCount: 2,
      color: 'purple',
      icon: Crown,
      level: 1
    },
    {
      id: 2,
      name: 'Admin',
      description: 'Administrative access to most features',
      permissions: ['users', 'patients', 'doctors', 'appointments', 'reports', 'settings'],
      userCount: 5,
      color: 'blue',
      icon: Shield,
      level: 2
    },
    {
      id: 3,
      name: 'Doctor',
      description: 'Medical staff access to patient records and appointments',
      permissions: ['patients', 'appointments', 'prescriptions', 'medical_records'],
      userCount: 156,
      color: 'green',
      icon: User,
      level: 3
    },
    {
      id: 4,
      name: 'Nurse',
      description: 'Nursing staff access to patient care',
      permissions: ['patients', 'appointments', 'vitals', 'medications'],
      userCount: 89,
      color: 'teal',
      icon: Heart,
      level: 4
    },
    {
      id: 5,
      name: 'Receptionist',
      description: 'Front desk staff access to scheduling and billing',
      permissions: ['appointments', 'billing', 'patient_registration'],
      userCount: 12,
      color: 'orange',
      icon: Calendar,
      level: 5
    },
    {
      id: 6,
      name: 'Lab Technician',
      description: 'Laboratory staff access to test results',
      permissions: ['lab_tests', 'test_results', 'samples'],
      userCount: 23,
      color: 'yellow',
      icon: Activity,
      level: 6
    },
    {
      id: 7,
      name: 'Pharmacist',
      description: 'Pharmacy staff access to medications and prescriptions',
      permissions: ['medications', 'prescriptions', 'inventory'],
      userCount: 15,
      color: 'pink',
      icon: Pill,
      level: 7
    },
    {
      id: 8,
      name: 'Viewer',
      description: 'Read-only access to reports and analytics',
      permissions: ['reports', 'analytics', 'view_only'],
      userCount: 8,
      color: 'gray',
      icon: Eye,
      level: 8
    }
  ]);

  const [permissions] = useState([
    { id: 'users', name: 'User Management', category: 'administration', icon: Users },
    { id: 'patients', name: 'Patient Management', category: 'clinical', icon: Heart },
    { id: 'doctors', name: 'Doctor Management', category: 'clinical', icon: User },
    { id: 'appointments', name: 'Appointment Management', category: 'clinical', icon: Calendar },
    { id: 'billing', name: 'Billing & Payments', category: 'administrative', icon: CreditCard },
    { id: 'reports', name: 'Reports & Analytics', category: 'administrative', icon: BarChart3 },
    { id: 'settings', name: 'System Settings', category: 'administration', icon: Settings },
    { id: 'prescriptions', name: 'Prescriptions', category: 'clinical', icon: Pill },
    { id: 'medical_records', name: 'Medical Records', category: 'clinical', icon: FileText },
    { id: 'lab_tests', name: 'Lab Tests', category: 'clinical', icon: Activity },
    { id: 'test_results', name: 'Test Results', category: 'clinical', icon: FileSpreadsheet },
    { id: 'samples', name: 'Sample Management', category: 'clinical', icon: Droplets },
    { id: 'medications', name: 'Medication Management', category: 'clinical', icon: Pill },
    { id: 'inventory', name: 'Inventory Management', category: 'administrative', icon: Package },
    { id: 'analytics', name: 'Analytics', category: 'administrative', icon: PieChart },
    { id: 'view_only', name: 'View Only', category: 'system', icon: Eye }
  ]);

  const [systemStats, setSystemStats] = useState({
    cpuUsage: 45,
    memoryUsage: 68,
    diskUsage: 72,
    networkLatency: 12,
    uptime: '99.9%',
    activeUsers: 234,
    totalRequests: 125678,
    errorRate: 0.2,
    responseTime: 145,
    databaseConnections: 45,
    cacheHitRate: 94.5,
    backupStatus: 'success',
    lastBackup: '2 hours ago'
  });

  const [showAddRoleModal, setShowAddRoleModal] = useState(false);
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: [],
    color: 'blue'
  });

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const handleSaveSettings = (category) => {
    // Simulate saving settings
    console.log(`Saving ${category} settings:`, settings[category]);
  };

  const handleBackup = () => {
    setShowBackupModal(true);
    // Simulate backup process
    setTimeout(() => {
      setSystemStats(prev => ({
        ...prev,
        lastBackup: 'Just now',
        backupStatus: 'success'
      }));
      setShowBackupModal(false);
    }, 2000);
  };

  const handleAddRole = () => {
    if (newRole.name && newRole.permissions.length > 0) {
      const role = {
        id: roles.length + 1,
        ...newRole,
        userCount: 0,
        icon: Shield,
        level: roles.length + 1
      };
      setRoles([...roles, role]);
      setNewRole({ name: '', description: '', permissions: [], color: 'blue' });
      setShowAddRoleModal(false);
    }
  };

  const handleDeleteRole = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  const togglePermission = (permissionId) => {
    setNewRole(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permissionId)
        ? prev.permissions.filter(p => p !== permissionId)
        : [...prev.permissions, permissionId]
    }));
  };

  const tabs = [
    { id: 'general', name: 'General', icon: Settings },
    { id: 'security', name: 'Security', icon: Shield },
    { id: 'backup', name: 'Backup', icon: Database },
    { id: 'notifications', name: 'Notifications', icon: Bell },
    { id: 'integrations', name: 'Integrations', icon: Link },
    { id: 'performance', name: 'Performance', icon: Zap },
    { id: 'roles', name: 'Roles & Permissions', icon: Users },
    { id: 'monitoring', name: 'System Monitoring', icon: Activity }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5DBB63]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">Configure and manage your healthcare system</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export Settings
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Upload className="w-4 h-4" />
            Import Settings
          </button>
          <button
            onClick={() => handleSaveSettings(activeTab)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
          >
            <Save className="w-4 h-4" />
            Save Changes
          </button>
        </div>
      </div>

      {/* System Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">CPU Usage</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{systemStats.cpuUsage}%</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <CpuIcon className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-blue-500 h-2 rounded-full"
                style={{ width: `${systemStats.cpuUsage}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Memory Usage</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{systemStats.memoryUsage}%</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full"
                style={{ width: `${systemStats.memoryUsage}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Disk Usage</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{systemStats.diskUsage}%</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
              <HardDrive className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full"
                style={{ width: `${systemStats.diskUsage}%` }}
              ></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Uptime</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{systemStats.uptime}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="mt-3">
            <p className="text-xs text-gray-600">Last backup: {systemStats.lastBackup}</p>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
        <div className="flex flex-wrap gap-2 p-4 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab.id
                  ? 'bg-[#5DBB63] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.name}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* General Settings */}
          {activeTab === 'general' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900">General Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site Name</label>
                  <input
                    type="text"
                    value={settings.general.siteName}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, siteName: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Site URL</label>
                  <input
                    type="url"
                    value={settings.general.siteUrl}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, siteUrl: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Admin Email</label>
                  <input
                    type="email"
                    value={settings.general.adminEmail}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, adminEmail: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
                  <select
                    value={settings.general.timezone}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, timezone: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  >
                    <option value="UTC-8">UTC-8 (PST)</option>
                    <option value="UTC-5">UTC-5 (EST)</option>
                    <option value="UTC+0">UTC+0 (GMT)</option>
                    <option value="UTC+1">UTC+1 (CET)</option>
                    <option value="UTC+5:30">UTC+5:30 (IST)</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                  <select
                    value={settings.general.language}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, language: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="zh">Chinese</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                  <select
                    value={settings.general.currency}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, currency: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  >
                    <option value="USD">USD ($)</option>
                    <option value="EUR">EUR (€)</option>
                    <option value="GBP">GBP (£)</option>
                    <option value="JPY">JPY (¥)</option>
                    <option value="CNY">CNY (¥)</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="maintenance"
                    checked={settings.general.maintenance}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, maintenance: e.target.checked }
                    }))}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <label htmlFor="maintenance" className="text-sm text-gray-700">Enable Maintenance Mode</label>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="debug"
                    checked={settings.general.debugMode}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      general: { ...prev.general, debugMode: e.target.checked }
                    }))}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <label htmlFor="debug" className="text-sm text-gray-700">Enable Debug Mode</label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900">Security Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    value={settings.security.sessionTimeout}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, sessionTimeout: parseInt(e.target.value) }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Password Minimum Length</label>
                  <input
                    type="number"
                    value={settings.security.passwordMinLength}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, passwordMinLength: parseInt(e.target.value) }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Max Login Attempts</label>
                  <input
                    type="number"
                    value={settings.security.maxLoginAttempts}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, maxLoginAttempts: parseInt(e.target.value) }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Lockout Duration (minutes)</label>
                  <input
                    type="number"
                    value={settings.security.lockoutDuration}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, lockoutDuration: parseInt(e.target.value) }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">API Rate Limit (requests/hour)</label>
                  <input
                    type="number"
                    value={settings.security.apiRateLimit}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, apiRateLimit: parseInt(e.target.value) }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Log Retention (days)</label>
                  <input
                    type="number"
                    value={settings.security.logRetention}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, logRetention: parseInt(e.target.value) }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="2fa"
                    checked={settings.security.twoFactorAuth}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, twoFactorAuth: e.target.checked }
                    }))}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <label htmlFor="2fa" className="text-sm text-gray-700">Enable Two-Factor Authentication</label>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="special"
                    checked={settings.security.passwordRequireSpecial}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, passwordRequireSpecial: e.target.checked }
                    }))}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <label htmlFor="special" className="text-sm text-gray-700">Require Special Characters in Password</label>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="numbers"
                    checked={settings.security.passwordRequireNumbers}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      security: { ...prev.security, passwordRequireNumbers: e.target.checked }
                    }))}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <label htmlFor="numbers" className="text-sm text-gray-700">Require Numbers in Password</label>
                </div>
              </div>
            </motion.div>
          )}

          {/* Backup Settings */}
          {activeTab === 'backup' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Backup Settings</h3>
                <button
                  onClick={handleBackup}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
                >
                  <Database className="w-4 h-4" />
                  Backup Now
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                  <select
                    value={settings.backup.backupFrequency}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      backup: { ...prev.backup, backupFrequency: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  >
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Backup Time</label>
                  <input
                    type="time"
                    value={settings.backup.backupTime}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      backup: { ...prev.backup, backupTime: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Backup Location</label>
                  <select
                    value={settings.backup.backupLocation}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      backup: { ...prev.backup, backupLocation: e.target.value }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  >
                    <option value="cloud">Cloud Storage</option>
                    <option value="local">Local Server</option>
                    <option value="both">Both Cloud & Local</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Retention Days</label>
                  <input
                    type="number"
                    value={settings.backup.retentionDays}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      backup: { ...prev.backup, retentionDays: parseInt(e.target.value) }
                    }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="autoBackup"
                    checked={settings.backup.autoBackup}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      backup: { ...prev.backup, autoBackup: e.target.checked }
                    }))}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <label htmlFor="autoBackup" className="text-sm text-gray-700">Enable Automatic Backup</label>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="compression"
                    checked={settings.backup.compression}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      backup: { ...prev.backup, compression: e.target.checked }
                    }))}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <label htmlFor="compression" className="text-sm text-gray-700">Enable Compression</label>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="encryption"
                    checked={settings.backup.encryption}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      backup: { ...prev.backup, encryption: e.target.checked }
                    }))}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <label htmlFor="encryption" className="text-sm text-gray-700">Enable Encryption</label>
                </div>
                
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    checked={settings.backup.emailNotifications}
                    onChange={(e) => setSettings(prev => ({
                      ...prev,
                      backup: { ...prev.backup, emailNotifications: e.target.checked }
                    }))}
                    className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                  />
                  <label htmlFor="emailNotifications" className="text-sm text-gray-700">Email Notifications</label>
                </div>
              </div>
              
              {/* Backup Status */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold text-gray-900 mb-3">Backup Status</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Last Backup</p>
                    <p className="text-sm font-medium text-gray-900">{settings.backup.lastBackup}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Next Backup</p>
                    <p className="text-sm font-medium text-gray-900">{settings.backup.nextBackup}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Backup Size</p>
                    <p className="text-sm font-medium text-gray-900">{settings.backup.backupSize}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Status</p>
                    <p className="text-sm font-medium text-green-600">Success</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Roles & Permissions */}
          {activeTab === 'roles' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Roles & Permissions</h3>
                <button
                  onClick={() => setShowAddRoleModal(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
                >
                  <Plus className="w-4 h-4" />
                  Add Role
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {roles.map((role) => (
                  <motion.div
                    key={role.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: role.id * 0.1 }}
                    className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 bg-${role.color}-100 rounded-lg`}>
                          <role.icon className={`w-5 h-5 text-${role.color}-600`} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{role.name}</h4>
                          <p className="text-sm text-gray-600">{role.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit3 className="w-4 h-4 text-gray-600" />
                        </button>
                        {role.level > 2 && (
                          <button
                            onClick={() => handleDeleteRole(role.id)}
                            className="p-1 hover:bg-gray-100 rounded"
                          >
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Users</span>
                        <span className="text-sm font-medium text-gray-900">{role.userCount}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Permissions</span>
                        <span className="text-sm font-medium text-gray-900">{role.permissions.length}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">Level</span>
                        <span className="text-sm font-medium text-gray-900">{role.level}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex flex-wrap gap-1">
                      {role.permissions.slice(0, 3).map((permission) => (
                        <span
                          key={permission}
                          className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs"
                        >
                          {permission.replace('_', ' ')}
                        </span>
                      ))}
                      {role.permissions.length > 3 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                          +{role.permissions.length - 3} more
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* System Monitoring */}
          {activeTab === 'monitoring' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-semibold text-gray-900">System Monitoring</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Active Users</h4>
                      <p className="text-sm text-gray-600">Currently logged in</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.activeUsers}</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Activity className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Total Requests</h4>
                      <p className="text-sm text-gray-600">Last 24 hours</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.totalRequests.toLocaleString()}</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Error Rate</h4>
                      <p className="text-sm text-gray-600">Last 24 hours</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.errorRate}%</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <Clock className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Response Time</h4>
                      <p className="text-sm text-gray-600">Average</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.responseTime}ms</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Database className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">DB Connections</h4>
                      <p className="text-sm text-gray-600">Active</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.databaseConnections}</p>
                </div>
                
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 bg-teal-100 rounded-lg">
                      <Zap className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Cache Hit Rate</h4>
                      <p className="text-sm text-gray-600">Performance</p>
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{systemStats.cacheHitRate}%</p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Add Role Modal */}
      {showAddRoleModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowAddRoleModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Add New Role</h3>
                <button
                  onClick={() => setShowAddRoleModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Role Name</label>
                  <input
                    type="text"
                    value={newRole.name}
                    onChange={(e) => setNewRole(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                    placeholder="Enter role name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <select
                    value={newRole.color}
                    onChange={(e) => setNewRole(prev => ({ ...prev, color: e.target.value }))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  >
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    <option value="purple">Purple</option>
                    <option value="orange">Orange</option>
                    <option value="red">Red</option>
                    <option value="teal">Teal</option>
                    <option value="pink">Pink</option>
                    <option value="yellow">Yellow</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={newRole.description}
                  onChange={(e) => setNewRole(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  rows={3}
                  placeholder="Enter role description"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Permissions</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {permissions.map((permission) => (
                    <div key={permission.id} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id={permission.id}
                        checked={newRole.permissions.includes(permission.id)}
                        onChange={() => togglePermission(permission.id)}
                        className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                      />
                      <label htmlFor={permission.id} className="text-sm text-gray-700">
                        {permission.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowAddRoleModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddRole}
                  className="px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
                >
                  Add Role
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

      {/* Backup Modal */}
      {showBackupModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowBackupModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Database className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Creating Backup</h3>
                <p className="text-sm text-gray-600">Please wait while we create your backup...</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                <span className="text-sm text-gray-700">Connecting to database...</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                <span className="text-sm text-gray-700">Creating backup file...</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                <span className="text-sm text-gray-700">Compressing data...</span>
              </div>
              <div className="flex items-center gap-3">
                <RefreshCw className="w-4 h-4 text-blue-600 animate-spin" />
                <span className="text-sm text-gray-700">Uploading to cloud...</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default SystemSettings;
