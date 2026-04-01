import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Bell,
  X,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  Clock,
  User,
  Calendar,
  DollarSign,
  FileText,
  Stethoscope,
  Heart,
  Shield,
  TrendingUp,
  TrendingDown,
  Activity,
  Zap,
  MessageSquare,
  Phone,
  Mail,
  Video,
  Filter,
  Search,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Archive,
  Trash2,
  Settings,
  RefreshCw
} from 'lucide-react';

const NotificationCenter = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({
    appointments: true,
    messages: true,
    billing: true,
    system: true,
    marketing: false
  });
  const dropdownRef = useRef(null);

  useEffect(() => {
    // Mock notifications data
    const mockNotifications = [
      {
        id: 1,
        type: 'appointment',
        title: 'Appointment Reminder',
        message: 'Your appointment with Dr. Sarah Johnson is scheduled for tomorrow at 10:00 AM',
        time: '2 hours ago',
        read: false,
        priority: 'high',
        icon: Calendar,
        color: 'blue',
        action: { text: 'View Appointment', url: '/appointments/123' }
      },
      {
        id: 2,
        type: 'message',
        title: 'New Message',
        message: 'Dr. Michael Chen sent you a message regarding your lab results',
        time: '5 hours ago',
        read: false,
        priority: 'medium',
        icon: MessageSquare,
        color: 'green',
        action: { text: 'Read Message', url: '/messages/456' }
      },
      {
        id: 3,
        type: 'billing',
        title: 'Payment Received',
        message: 'Payment of $200.00 for your recent consultation has been processed',
        time: '1 day ago',
        read: true,
        priority: 'low',
        icon: DollarSign,
        color: 'yellow',
        action: { text: 'View Receipt', url: '/billing/789' }
      },
      {
        id: 4,
        type: 'system',
        title: 'System Update',
        message: 'New features have been added to the patient portal',
        time: '2 days ago',
        read: true,
        priority: 'low',
        icon: Shield,
        color: 'purple',
        action: { text: 'Learn More', url: '/updates' }
      },
      {
        id: 5,
        type: 'alert',
        title: 'Medication Reminder',
        message: 'Time to take your Lisinopril medication (10mg)',
        time: '30 minutes ago',
        read: false,
        priority: 'high',
        icon: Heart,
        color: 'red',
        action: { text: 'Mark as Taken', url: '/medications' }
      },
      {
        id: 6,
        type: 'appointment',
        title: 'Appointment Cancelled',
        message: 'Your appointment with Dr. Robert Williams has been cancelled',
        time: '3 days ago',
        read: true,
        priority: 'medium',
        icon: AlertTriangle,
        color: 'orange',
        action: { text: 'Reschedule', url: '/appointments/reschedule' }
      },
      {
        id: 7,
        type: 'video',
        title: 'Video Consultation Available',
        message: 'Dr. Sarah Johnson is available for a video consultation now',
        time: '15 minutes ago',
        read: false,
        priority: 'high',
        icon: Video,
        color: 'blue',
        action: { text: 'Start Call', url: '/video-call/123' }
      },
      {
        id: 8,
        type: 'lab',
        title: 'Lab Results Ready',
        message: 'Your recent lab results are now available for review',
        time: '4 days ago',
        read: true,
        priority: 'medium',
        icon: FileText,
        color: 'green',
        action: { text: 'View Results', url: '/lab-results/456' }
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getNotificationIcon = (type) => {
    const icons = {
      appointment: Calendar,
      message: MessageSquare,
      billing: DollarSign,
      system: Shield,
      alert: AlertTriangle,
      video: Video,
      lab: FileText,
      medication: Heart,
      user: User,
      phone: Phone,
      mail: Mail,
      activity: Activity,
      trending: TrendingUp
    };
    return icons[type] || Bell;
  };

  const getNotificationColor = (priority) => {
    const colors = {
      high: 'red',
      medium: 'yellow',
      low: 'blue'
    };
    return colors[priority] || 'gray';
  };

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(n => ({ ...n, read: true }))
    );
    setUnreadCount(0);
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    const notification = notifications.find(n => n.id === id);
    if (notification && !notification.read) {
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    setUnreadCount(0);
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesFilter = activeFilter === 'all' || notification.type === activeFilter;
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const NotificationItem = ({ notification }) => {
    const Icon = getNotificationIcon(notification.type);
    const color = getNotificationColor(notification.priority);

    return (
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className={`p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors ${
          !notification.read ? 'bg-blue-50' : ''
        }`}
      >
        <div className="flex items-start space-x-3">
          <div className={`p-2 rounded-lg bg-${color}-100`}>
            <Icon className={`w-5 h-5 text-${color}-600`} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className={`text-sm font-medium text-gray-900 ${
                !notification.read ? 'font-semibold' : ''
              }`}>
                {notification.title}
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-500">{notification.time}</span>
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
            {notification.action && (
              <div className="mt-2 flex items-center space-x-2">
                <button
                  onClick={() => markAsRead(notification.id)}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  {notification.action.text}
                </button>
                {!notification.read && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const FilterTabs = () => {
    const filters = [
      { id: 'all', label: 'All', count: notifications.length },
      { id: 'appointment', label: 'Appointments', count: notifications.filter(n => n.type === 'appointment').length },
      { id: 'message', label: 'Messages', count: notifications.filter(n => n.type === 'message').length },
      { id: 'billing', label: 'Billing', count: notifications.filter(n => n.type === 'billing').length },
      { id: 'system', label: 'System', count: notifications.filter(n => n.type === 'system').length }
    ];

    return (
      <div className="flex space-x-1 p-2 border-b border-gray-200">
        {filters.map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id)}
            className={`px-3 py-1 text-sm rounded-lg transition-colors ${
              activeFilter === filter.id
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {filter.label}
            {filter.count > 0 && (
              <span className="ml-1 text-xs bg-gray-200 text-gray-700 px-1 rounded-full">
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>
    );
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
            {unreadCount > 99 ? '99+' : unreadCount}
          </span>
        )}
      </button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-200 z-50"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <div className="flex items-center space-x-2">
                <Bell className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-sm text-blue-600">{unreadCount} unread</span>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Settings className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Search Bar */}
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search notifications..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
              </div>
            </div>

            {/* Filter Tabs */}
            <FilterTabs />

            {/* Settings Panel */}
            {showSettings && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="p-4 border-b border-gray-200 bg-gray-50"
              >
                <h4 className="font-medium text-gray-900 mb-3">Notification Settings</h4>
                <div className="space-y-2">
                  {Object.entries(notificationSettings).map(([key, value]) => (
                    <label key={key} className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 capitalize">{key}</span>
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => setNotificationSettings(prev => ({
                          ...prev,
                          [key]: e.target.checked
                        }))}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                    </label>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredNotifications.length > 0 ? (
                <AnimatePresence>
                  {filteredNotifications.map(notification => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </AnimatePresence>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <Bell className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-sm">No notifications found</p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-gray-50">
                <button
                  onClick={markAllAsRead}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Mark all as read
                </button>
                <button
                  onClick={clearAllNotifications}
                  className="text-sm text-red-600 hover:text-red-800 font-medium"
                >
                  Clear all
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
