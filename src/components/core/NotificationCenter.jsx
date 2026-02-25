import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Settings, Archive, Check, Trash2, Clock } from 'lucide-react';
import { useNotification } from './NotificationProvider';

const notificationTypes = {
  appointment: { color: 'bg-blue-100', text: 'text-blue-800', icon: '📅' },
  medication: { color: 'bg-amber-100', text: 'text-amber-800', icon: '💊' },
  order: { color: 'bg-green-100', text: 'text-green-800', icon: '📦' },
  payment: { color: 'bg-purple-100', text: 'text-purple-800', icon: '💳' },
  system: { color: 'bg-gray-100', text: 'text-gray-800', icon: '⚙️' }
};

export default function NotificationCenter() {
  const { notifications, removeNotification, clearAll } = useNotification();
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const dropdownRef = useRef(null);

  // Filter notifications by type
  const filteredNotifications = notifications.filter(notif => {
    if (activeTab === 'all') return true;
    return notif.category === activeTab;
  });

  // Group notifications by date
  const groupedNotifications = filteredNotifications.reduce((acc, notif) => {
    const date = new Date(notif.timestamp).toDateString();
    if (!acc[date]) acc[date] = [];
    acc[date].push(notif);
    return acc;
  }, {});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id) => {
    // In a real app, you'd update the notification status in backend
    removeNotification(id);
  };

  const markAllAsRead = () => {
    clearAll();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors"
      >
        <Bell className="w-5 h-5 text-gray-600" />
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
            {notifications.length > 9 ? '9+' : notifications.length}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-[#111827]">Notifications</h3>
                <div className="flex items-center gap-1">
                  {notifications.length > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Clear all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {/* Tabs */}
              <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
                {['all', 'appointment', 'medication', 'order'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors capitalize ${
                      activeTab === tab
                        ? 'bg-white text-[#111827] shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Notifications List */}
            <div className="max-h-96 overflow-y-auto">
              {filteredNotifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No notifications</p>
                  <p className="text-sm text-gray-400">You're all caught up!</p>
                </div>
              ) : (
                Object.entries(groupedNotifications).map(([date, dateNotifications]) => (
                  <div key={date}>
                    <div className="px-4 py-2 bg-gray-50 border-b border-gray-100">
                      <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                        {new Date(date).toDateString() === new Date().toDateString()
                          ? 'Today'
                          : new Date(date).toDateString() === new Date(Date.now() - 86400000).toDateString()
                          ? 'Yesterday'
                          : new Date(date).toLocaleDateString('en-US', { 
                              weekday: 'long', 
                              month: 'short', 
                              day: 'numeric' 
                            })}
                      </p>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {dateNotifications.map((notification) => {
                        const typeConfig = notificationTypes[notification.category] || notificationTypes.system;
                        return (
                          <motion.div
                            key={notification.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="p-4 hover:bg-gray-50 transition-colors group"
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-10 h-10 rounded-full ${typeConfig.color} flex items-center justify-center flex-shrink-0`}>
                                <span className="text-lg">{typeConfig.icon}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm text-gray-900 font-medium mb-1">
                                  {notification.title}
                                </p>
                                <p className="text-sm text-gray-600 mb-2">
                                  {notification.message}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <Clock className="w-3 h-3" />
                                  <span>
                                    {new Date(notification.timestamp).toLocaleTimeString([], { 
                                      hour: '2-digit', 
                                      minute: '2-digit' 
                                    })}
                                  </span>
                                </div>
                              </div>
                              <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => markAsRead(notification.id)}
                                  className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                  title="Mark as read"
                                >
                                  <Check className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && (
              <div className="p-3 border-t border-gray-100 bg-gray-50">
                <button
                  onClick={markAllAsRead}
                  className="w-full text-sm text-center text-[#5DBB63] hover:text-[#165028] font-medium py-1"
                >
                  Clear all notifications
                </button>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
