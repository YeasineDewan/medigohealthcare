import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  Search,
  Filter,
  Check,
  CheckCheck,
  Trash2,
  Send,
  Settings,
  Calendar,
  Users,
  AlertCircle,
  Info,
  CheckCircle,
  XCircle,
  Clock,
  ChevronDown,
  X,
  Plus,
  Edit3,
  Eye,
  RefreshCw,
  Mail,
  MessageSquare,
  Smartphone,
  ToggleLeft,
  ToggleRight
} from 'lucide-react';

// Mock notifications data
const initialNotifications = [
  {
    id: 1,
    title: 'New Appointment Booked',
    message: 'Dr. Sarah Johnson has a new appointment with Patient John Smith at 2:00 PM today.',
    type: 'appointment',
    channel: ['push', 'email'],
    status: 'sent',
    sentAt: '2024-01-20 10:30 AM',
    recipients: 1,
    read: false
  },
  {
    id: 2,
    title: 'Lab Results Ready',
    message: 'Lab test results for Patient Michael Brown are now available.',
    type: 'lab',
    channel: ['push'],
    status: 'sent',
    sentAt: '2024-01-20 09:15 AM',
    recipients: 1,
    read: true
  },
  {
    id: 3,
    title: 'Appointment Reminder',
    message: 'Reminder: You have 3 appointments scheduled for today.',
    type: 'reminder',
    channel: ['push', 'sms'],
    status: 'sent',
    sentAt: '2024-01-20 08:00 AM',
    recipients: 3,
    read: true
  },
  {
    id: 4,
    title: 'System Maintenance',
    message: 'System maintenance scheduled for tonight at 11:00 PM. Expected downtime: 30 minutes.',
    type: 'system',
    channel: ['email'],
    status: 'scheduled',
    scheduledFor: '2024-01-20 11:00 PM',
    recipients: 45,
    read: false
  },
  {
    id: 5,
    title: 'Payment Received',
    message: 'Payment of $250 received from Patient Emily Davis for Invoice #INV-2024-0156.',
    type: 'payment',
    channel: ['push', 'email'],
    status: 'sent',
    sentAt: '2024-01-19 04:30 PM',
    recipients: 1,
    read: true
  },
  {
    id: 6,
    title: 'Low Inventory Alert',
    message: 'Stock level for Paracetamol 500mg is below minimum threshold. Current stock: 50 units.',
    type: 'alert',
    channel: ['push', 'email'],
    status: 'sent',
    sentAt: '2024-01-19 02:00 PM',
    recipients: 2,
    read: true
  },
];

const notificationTemplates = [
  { id: 1, name: 'Appointment Confirmation', type: 'appointment', usage: 1250 },
  { id: 2, name: 'Appointment Reminder', type: 'reminder', usage: 3100 },
  { id: 3, name: 'Lab Results Ready', type: 'lab', usage: 890 },
  { id: 4, name: 'Payment Receipt', type: 'payment', usage: 560 },
  { id: 5, name: 'Prescription Ready', type: 'prescription', usage: 420 },
  { id: 6, name: 'Feedback Request', type: 'feedback', usage: 180 },
];

export default function Notifications() {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [showCompose, setShowCompose] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [selectedTab, setSelectedTab] = useState('all');

  const filteredNotifications = notifications.filter(notif => {
    const matchesSearch = notif.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || notif.type === typeFilter;
    const matchesTab = selectedTab === 'all' || 
      (selectedTab === 'unread' && !notif.read) ||
      (selectedTab === 'sent' && notif.status === 'sent') ||
      (selectedTab === 'scheduled' && notif.status === 'scheduled');
    return matchesSearch && matchesType && matchesTab;
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'appointment': return <Calendar className="w-4 h-4" />;
      case 'lab': return <CheckCircle className="w-4 h-4" />;
      case 'reminder': return <Bell className="w-4 h-4" />;
      case 'system': return <Settings className="w-4 h-4" />;
      case 'payment': return <CheckCircle className="w-4 h-4" />;
      case 'alert': return <AlertCircle className="w-4 h-4" />;
      default: return <Info className="w-4 h-4" />;
    }
  };

  const getTypeColors = (type) => {
    switch (type) {
      case 'appointment': return 'bg-blue-100 text-blue-600';
      case 'lab': return 'bg-green-100 text-green-600';
      case 'reminder': return 'bg-purple-100 text-purple-600';
      case 'system': return 'bg-gray-100 text-gray-600';
      case 'payment': return 'bg-green-100 text-green-600';
      case 'alert': return 'bg-red-100 text-red-600';
      default: return 'bg-blue-100 text-blue-600';
    }
  };

  // Stats
  const totalSent = notifications.filter(n => n.status === 'sent').length;
  const totalScheduled = notifications.filter(n => n.status === 'scheduled').length;
  const totalRecipients = notifications.reduce((sum, n) => sum + n.recipients, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-500 mt-1">Manage notifications and templates</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowTemplates(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Settings className="w-4 h-4" />
            Templates
          </button>
          <button
            onClick={() => setShowCompose(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
          >
            <Send className="w-4 h-4" />
            Compose
          </button>
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
              <p className="text-sm text-gray-500">Total Notifications</p>
              <p className="text-2xl font-bold text-gray-900">{notifications.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Bell className="w-6 h-6 text-blue-600" />
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
              <p className="text-sm text-gray-500">Unread</p>
              <p className="text-2xl font-bold text-orange-600">{unreadCount}</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-6 h-6 text-orange-600" />
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
              <p className="text-sm text-gray-500">Sent</p>
              <p className="text-2xl font-bold text-green-600">{totalSent}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Send className="w-6 h-6 text-green-600" />
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
              <p className="text-sm text-gray-500">Total Recipients</p>
              <p className="text-2xl font-bold text-purple-600">{totalRecipients}</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            {['all', 'unread', 'sent', 'scheduled'].map(tab => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`px-4 py-2 rounded-lg text-sm font-medium ${
                  selectedTab === tab
                    ? 'bg-[#5DBB63] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'unread' && unreadCount > 0 && (
                  <span className="ml-2 px-2 py-0.5 bg-red-500 text-white rounded-full text-xs">
                    {unreadCount}
                  </span>
                )}
              </button>
            ))}
          </div>
          <div className="flex gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search notifications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              />
            </div>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="appointment">Appointment</option>
              <option value="lab">Lab Results</option>
              <option value="reminder">Reminder</option>
              <option value="system">System</option>
              <option value="payment">Payment</option>
              <option value="alert">Alert</option>
            </select>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="flex items-center gap-2 px-4 py-2 text-[#5DBB63] border border-[#5DBB63] rounded-lg hover:bg-[#5DBB63]/10"
              >
                <CheckCheck className="w-4 h-4" />
                Mark all read
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="divide-y divide-gray-100">
          {filteredNotifications.map((notif, index) => (
            <motion.div
              key={notif.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-blue-50/50' : ''}`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColors(notif.type)}`}>
                  {getTypeIcon(notif.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className={`font-semibold ${notif.read ? 'text-gray-700' : 'text-gray-900'}`}>
                        {notif.title}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{notif.message}</p>
                    </div>
                    {!notif.read && (
                      <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2" />
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      {notif.status === 'scheduled' ? <Clock className="w-3 h-3" /> : <Send className="w-3 h-3" />}
                      {notif.status === 'scheduled' ? notif.scheduledFor : notif.sentAt}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {notif.recipients} recipient{notif.recipients > 1 ? 's' : ''}
                    </span>
                    <span className="flex items-center gap-1">
                      {notif.channel.includes('push') && <Bell className="w-3 h-3" />}
                      {notif.channel.includes('email') && <Mail className="w-3 h-3" />}
                      {notif.channel.includes('sms') && <Smartphone className="w-3 h-3" />}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {!notif.read && (
                    <button
                      onClick={() => handleMarkAsRead(notif.id)}
                      className="p-2 text-gray-400 hover:text-[#5DBB63] hover:bg-[#5DBB63]/10 rounded-lg"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(notif.id)}
                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Compose Modal */}
      <AnimatePresence>
        {showCompose && (
          <ComposeModal onClose={() => setShowCompose(false)} />
        )}
      </AnimatePresence>

      {/* Templates Modal */}
      <AnimatePresence>
        {showTemplates && (
          <TemplatesModal templates={notificationTemplates} onClose={() => setShowTemplates(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

function ComposeModal({ onClose }) {
  const [formData, setFormData] = useState({
    title: '',
    message: '',
    type: 'appointment',
    channel: ['push'],
    recipients: 'all',
    schedule: false,
    scheduledTime: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
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
        className="bg-white rounded-2xl w-full max-w-lg"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Compose Notification</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  <option value="appointment">Appointment</option>
                  <option value="reminder">Reminder</option>
                  <option value="lab">Lab Results</option>
                  <option value="payment">Payment</option>
                  <option value="system">System</option>
                  <option value="alert">Alert</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Recipients</label>
                <select
                  value={formData.recipients}
                  onChange={(e) => setFormData({ ...formData, recipients: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  <option value="all">All Patients</option>
                  <option value="doctors">All Doctors</option>
                  <option value="staff">Staff Members</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Channel</label>
              <div className="flex gap-4">
                {['push', 'email', 'sms'].map(channel => (
                  <label key={channel} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.channel.includes(channel)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setFormData({ ...formData, channel: [...formData.channel, channel] });
                        } else {
                          setFormData({ ...formData, channel: formData.channel.filter(c => c !== channel) });
                        }
                      }}
                      className="w-4 h-4 rounded text-[#5DBB63] focus:ring-[#5DBB63]"
                    />
                    <span className="capitalize">{channel === 'push' ? 'Push' : channel === 'email' ? 'Email' : 'SMS'}</span>
                  </label>
                ))}
              </div>
            </div>

            <label className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg cursor-pointer">
              <input
                type="checkbox"
                checked={formData.schedule}
                onChange={(e) => setFormData({ ...formData, schedule: e.target.checked })}
                className="w-5 h-5 rounded text-[#5DBB63] focus:ring-[#5DBB63]"
              />
              <span className="font-medium text-gray-900">Schedule for later</span>
            </label>

            {formData.schedule && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Schedule Time</label>
                <input
                  type="datetime-local"
                  value={formData.scheduledTime}
                  onChange={(e) => setFormData({ ...formData, scheduledTime: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
            )}
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              {formData.schedule ? 'Schedule' : 'Send Now'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function TemplatesModal({ templates, onClose }) {
  return (
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
        className="bg-white rounded-2xl w-full max-w-lg"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Notification Templates</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-3">
          {templates.map(template => (
            <div
              key={template.id}
              className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{template.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">Type: {template.type}</p>
                </div>
                <span className="text-sm text-gray-500">{template.usage} uses</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
