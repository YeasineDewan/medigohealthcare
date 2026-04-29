import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Database,
  Save,
  RefreshCw,
  Download,
  Trash2,
  Upload,
  Clock,
  Check,
  X,
  AlertTriangle,
  Loader,
  Server,
  HardDrive,
  Cloud,
  Calendar,
  History,
  Play,
  Pause,
  Settings,
  Eye,
  EyeOff,
  FolderOpen,
  File,
  Archive,
  Zap,
  Shield,
  Activity,
  ChevronRight,
  ChevronDown,
  Info,
  Bell,
  BellOff,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

// Backup history data
const initialBackups = [
  {
    id: 1,
    name: 'full_backup_2024_01_20.sql',
    type: 'full',
    size: '2.4 GB',
    createdAt: '2024-01-20 10:30 AM',
    status: 'completed',
    location: 'Local Storage',
    duration: '45 min'
  },
  {
    id: 2,
    name: 'incremental_backup_2024_01_19.sql',
    type: 'incremental',
    size: '156 MB',
    createdAt: '2024-01-19 10:30 AM',
    status: 'completed',
    location: 'Local Storage',
    duration: '12 min'
  },
  {
    id: 3,
    name: 'full_backup_2024_01_18.sql',
    type: 'full',
    size: '2.3 GB',
    createdAt: '2024-01-18 10:30 AM',
    status: 'completed',
    location: 'Cloud (AWS S3)',
    duration: '42 min'
  },
  {
    id: 4,
    name: 'database_only_2024_01_17.sql',
    type: 'database',
    size: '890 MB',
    createdAt: '2024-01-17 10:30 AM',
    status: 'completed',
    location: 'Local Storage',
    duration: '18 min'
  },
  {
    id: 5,
    name: 'incremental_backup_2024_01_16.sql',
    type: 'incremental',
    size: '142 MB',
    createdAt: '2024-01-16 10:30 AM',
    status: 'failed',
    location: 'Local Storage',
    duration: '-',
    error: 'Connection timeout'
  }
];

const backupTypes = [
  { id: 'full', label: 'Full Backup', description: 'Complete backup of all data', icon: Database },
  { id: 'incremental', label: 'Incremental', description: 'Changes since last backup', icon: RefreshCw },
  { id: 'database', label: 'Database Only', description: 'Database only, no files', icon: Archive },
  { id: 'files', label: 'Files Only', description: 'Media and file backups', icon: FolderOpen }
];

export default function BackupRestore() {
  const [backups, setBackups] = useState(initialBackups);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);
  const [backupProgress, setBackupProgress] = useState(0);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [backupToDelete, setBackupToDelete] = useState(null);
  const [showRestoreConfirm, setShowRestoreConfirm] = useState(false);
  const [backupToRestore, setBackupToRestore] = useState(null);
  const [isRestoring, setIsRestoring] = useState(false);
  const [restoreProgress, setRestoreProgress] = useState(0);
  const [activeTab, setActiveTab] = useState('backups');

  const [scheduleSettings, setScheduleSettings] = useState({
    enabled: true,
    frequency: 'daily',
    time: '02:00',
    retention: 30,
    compress: true,
    encrypt: false,
    notifyOnComplete: true,
    backupType: 'full',
    cloudBackup: false,
    cloudProvider: 'aws',
    bucketName: 'medigo-backups'
  });

  const handleCreateBackup = async (type) => {
    setIsCreatingBackup(true);
    setBackupProgress(0);

    // Simulate backup process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise(resolve => setTimeout(resolve, 500));
      setBackupProgress(i);
    }

    const newBackup = {
      id: Date.now(),
      name: `${type}_backup_${new Date().toISOString().split('T')[0]}.sql`,
      type: type,
      size: type === 'full' ? '2.4 GB' : type === 'incremental' ? '156 MB' : '890 MB',
      createdAt: new Date().toLocaleString(),
      status: 'completed',
      location: scheduleSettings.cloudBackup ? 'Cloud (AWS S3)' : 'Local Storage',
      duration: type === 'full' ? '45 min' : type === 'incremental' ? '12 min' : '18 min'
    };

    setBackups([newBackup, ...backups]);
    setIsCreatingBackup(false);
    setBackupProgress(0);
  };

  const handleDeleteBackup = (backup) => {
    setBackupToDelete(backup);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    setBackups(backups.filter(b => b.id !== backupToDelete.id));
    setShowDeleteConfirm(false);
    setBackupToDelete(null);
  };

  const handleRestoreBackup = (backup) => {
    setBackupToRestore(backup);
    setShowRestoreConfirm(true);
  };

  const confirmRestore = async () => {
    setIsRestoring(true);
    setRestoreProgress(0);

    // Simulate restore process
    for (let i = 0; i <= 100; i += 5) {
      await new Promise(resolve => setTimeout(resolve, 300));
      setRestoreProgress(i);
    }

    setIsRestoring(false);
    setRestoreProgress(0);
    setShowRestoreConfirm(false);
    setBackupToRestore(null);
  };

  const handleDownloadBackup = (backup) => {
    // Simulate download
    console.log('Downloading:', backup.name);
  };

  const handleSaveSchedule = async () => {
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 1000));
    alert('Schedule settings saved successfully!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'failed':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'in_progress':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getTypeIcon = (type) => {
    const typeData = backupTypes.find(t => t.id === type);
    return typeData ? typeData.icon : Database;
  };

  // Calculate storage stats
  const totalSize = backups
    .filter(b => b.status === 'completed')
    .reduce((acc, b) => {
      const size = parseFloat(b.size);
      return acc + (b.size.includes('GB') ? size * 1024 : size);
    }, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Backup & Restore</h1>
          <p className="text-gray-500 mt-1">Manage database backups and restore points</p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Backups</p>
              <p className="text-2xl font-bold text-gray-900">{backups.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Archive className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Storage Used</p>
              <p className="text-2xl font-bold text-purple-600">
                {(totalSize / 1024).toFixed(1)} GB
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <HardDrive className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Last Backup</p>
              <p className="text-2xl font-bold text-green-600">2h ago</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Scheduled</p>
              <p className="text-2xl font-bold text-orange-600">
                {scheduleSettings.enabled ? 'Active' : 'Disabled'}
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            <button
              onClick={() => setActiveTab('backups')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'backups'
                  ? 'border-[#5DBB63] text-[#5DBB63]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Archive className="w-4 h-4" />
              Backups
            </button>
            <button
              onClick={() => setActiveTab('schedule')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'schedule'
                  ? 'border-[#5DBB63] text-[#5DBB63]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Schedule
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'settings'
                  ? 'border-[#5DBB63] text-[#5DBB63]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Settings className="w-4 h-4" />
              Settings
            </button>
          </nav>
        </div>

        {/* Backups Tab */}
        {activeTab === 'backups' && (
          <div className="p-6">
            {/* Quick Actions */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-4">Create New Backup</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {backupTypes.map((type) => {
                  const Icon = type.icon;
                  return (
                    <button
                      key={type.id}
                      onClick={() => handleCreateBackup(type.id)}
                      disabled={isCreatingBackup}
                      className="p-4 border-2 border-gray-200 rounded-xl hover:border-[#5DBB63] hover:bg-[#5DBB63]/5 transition-all disabled:opacity-50 text-left group"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-gray-100 group-hover:bg-[#5DBB63]/20 flex items-center justify-center transition-colors">
                          <Icon className="w-5 h-5 text-gray-600 group-hover:text-[#5DBB63]" />
                        </div>
                        <span className="font-medium text-gray-900">{type.label}</span>
                      </div>
                      <p className="text-sm text-gray-500">{type.description}</p>
                    </button>
                  );
                })}
              </div>

              {/* Progress Bar */}
              <AnimatePresence>
                {isCreatingBackup && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 p-4 bg-gray-50 rounded-xl"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-700">Creating backup...</span>
                      <span className="text-sm text-gray-500">{backupProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <motion.div
                        className="bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${backupProgress}%` }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Backup History */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Backup History</h3>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <RefreshCw className="w-4 h-4 text-gray-500" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {backups.map((backup, index) => {
                  const TypeIcon = getTypeIcon(backup.type);
                  return (
                    <motion.div
                      key={backup.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="p-4 border border-gray-200 rounded-xl hover:border-[#5DBB63]/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center">
                            <TypeIcon className="w-6 h-6 text-gray-600" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-medium text-gray-900">{backup.name}</h4>
                              <span className={`px-2 py-0.5 text-xs font-medium rounded-full border ${getStatusColor(backup.status)}`}>
                                {backup.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                              <span className="flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {backup.createdAt}
                              </span>
                              <span className="flex items-center gap-1">
                                <HardDrive className="w-3 h-3" />
                                {backup.size}
                              </span>
                              <span className="flex items-center gap-1">
                                <Cloud className="w-3 h-3" />
                                {backup.location}
                              </span>
                              {backup.duration !== '-' && (
                                <span className="flex items-center gap-1">
                                  <Zap className="w-3 h-3" />
                                  {backup.duration}
                                </span>
                              )}
                            </div>
                            {backup.error && (
                              <p className="text-sm text-red-500 mt-1">Error: {backup.error}</p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {backup.status === 'completed' && (
                            <>
                              <button
                                onClick={() => handleDownloadBackup(backup)}
                                className="p-2 text-gray-500 hover:text-[#5DBB63] hover:bg-[#5DBB63]/10 rounded-lg transition-colors"
                                title="Download"
                              >
                                <Download className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleRestoreBackup(backup)}
                                className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Restore"
                              >
                                <RefreshCw className="w-4 h-4" />
                              </button>
                            </>
                          )}
                          <button
                            onClick={() => handleDeleteBackup(backup)}
                            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Schedule Tab */}
        {activeTab === 'schedule' && (
          <div className="p-6 space-y-6">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-[#5DBB63]/20 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#5DBB63]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Automated Backups</h3>
                  <p className="text-sm text-gray-500">Schedule automatic backups</p>
                </div>
              </div>
              <button
                onClick={() => setScheduleSettings({ ...scheduleSettings, enabled: !scheduleSettings.enabled })}
                className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                  scheduleSettings.enabled ? 'bg-[#5DBB63]' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform ${
                    scheduleSettings.enabled ? 'translate-x-7' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>

            {scheduleSettings.enabled && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Backup Frequency</label>
                  <select
                    value={scheduleSettings.frequency}
                    onChange={(e) => setScheduleSettings({ ...scheduleSettings, frequency: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
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
                    value={scheduleSettings.time}
                    onChange={(e) => setScheduleSettings({ ...scheduleSettings, time: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Retention Period (days)</label>
                  <input
                    type="number"
                    value={scheduleSettings.retention}
                    onChange={(e) => setScheduleSettings({ ...scheduleSettings, retention: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Backup Type</label>
                  <select
                    value={scheduleSettings.backupType}
                    onChange={(e) => setScheduleSettings({ ...scheduleSettings, backupType: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  >
                    <option value="full">Full Backup</option>
                    <option value="incremental">Incremental</option>
                    <option value="database">Database Only</option>
                  </select>
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Additional Options</h3>
              <div className="space-y-4">
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={scheduleSettings.compress}
                    onChange={(e) => setScheduleSettings({ ...scheduleSettings, compress: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Compress Backups</p>
                    <p className="text-sm text-gray-500">Reduce backup file size using compression</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={scheduleSettings.encrypt}
                    onChange={(e) => setScheduleSettings({ ...scheduleSettings, encrypt: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Encrypt Backups</p>
                    <p className="text-sm text-gray-500">Add encryption for security</p>
                  </div>
                </label>
                <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={scheduleSettings.notifyOnComplete}
                    onChange={(e) => setScheduleSettings({ ...scheduleSettings, notifyOnComplete: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                  />
                  <div>
                    <p className="font-medium text-gray-900">Notify on Completion</p>
                    <p className="text-sm text-gray-500">Send notification when backup completes</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveSchedule}
                className="px-6 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Schedule
              </button>
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="p-6 space-y-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Cloud Storage</h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <Cloud className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Cloud Backup</h4>
                    <p className="text-sm text-gray-500">Store backups in cloud storage</p>
                  </div>
                </div>
                <button
                  onClick={() => setScheduleSettings({ ...scheduleSettings, cloudBackup: !scheduleSettings.cloudBackup })}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    scheduleSettings.cloudBackup ? 'bg-[#5DBB63]' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white shadow-md transition-transform ${
                      scheduleSettings.cloudBackup ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              {scheduleSettings.cloudBackup && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-xl">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Cloud Provider</label>
                    <select
                      value={scheduleSettings.cloudProvider}
                      onChange={(e) => setScheduleSettings({ ...scheduleSettings, cloudProvider: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    >
                      <option value="aws">AWS S3</option>
                      <option value="google">Google Cloud Storage</option>
                      <option value="azure">Azure Blob Storage</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Bucket Name</label>
                    <input
                      type="text"
                      value={scheduleSettings.bucketName}
                      onChange={(e) => setScheduleSettings({ ...scheduleSettings, bucketName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">Danger Zone</h3>
              <div className="p-4 border border-red-200 bg-red-50 rounded-xl">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h4 className="font-semibold text-red-700">Warning: Irreversible Actions</h4>
                </div>
                <div className="space-y-3">
                  <button className="w-full px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                    <Trash2 className="w-4 h-4" />
                    Delete All Local Backups
                  </button>
                  <button className="w-full px-4 py-2 bg-white border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center gap-2">
                    <RefreshCw className="w-4 h-4" />
                    Reset to Default Settings
                  </button>
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSaveSchedule}
                className="px-6 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] transition-all flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                Save Settings
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Restore Confirmation Modal */}
      <AnimatePresence>
        {showRestoreConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-lg p-6"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-blue-100 rounded-full mb-4">
                <RefreshCw className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Restore Backup</h3>
              <p className="text-gray-500 text-center mb-6">
                Are you sure you want to restore from <span className="font-semibold text-gray-900">{backupToRestore?.name}</span>? Current data will be overwritten.
              </p>
              
              {isRestoring && (
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">Restoring...</span>
                    <span className="text-sm text-gray-500">{restoreProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <motion.div
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${restoreProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3">
                <button
                  onClick={() => setShowRestoreConfirm(false)}
                  disabled={isRestoring}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmRestore}
                  disabled={isRestoring}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isRestoring ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Restoring...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      Restore
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Delete Backup</h3>
              <p className="text-gray-500 text-center mb-6">
                Are you sure you want to delete <span className="font-semibold text-gray-900">{backupToDelete?.name}</span>? This action cannot be undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
