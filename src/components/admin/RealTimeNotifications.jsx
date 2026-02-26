import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, CheckCircle, AlertTriangle, Info, AlertCircle, User, Calendar, ShoppingCart, FileText } from 'lucide-react';

export default function RealTimeNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const wsRef = useRef(null);
  const reconnectTimeoutRef = useRef(null);

  // Notification types configuration
  const notificationTypes = {
    success: { icon: CheckCircle, color: 'green', bgColor: 'bg-green-50' },
    warning: { icon: AlertTriangle, color: 'yellow', bgColor: 'bg-yellow-50' },
    error: { icon: AlertCircle, color: 'red', bgColor: 'bg-red-50' },
    info: { icon: Info, color: 'blue', bgColor: 'bg-blue-50' },
    appointment: { icon: Calendar, color: 'purple', bgColor: 'bg-purple-50' },
    user: { icon: User, color: 'blue', bgColor: 'bg-blue-50' },
    order: { icon: ShoppingCart, color: 'amber', bgColor: 'bg-amber-50' },
    report: { icon: FileText, color: 'indigo', bgColor: 'bg-indigo-50' }
  };

  // WebSocket connection
  useEffect(() => {
    const connectWebSocket = () => {
      const wsUrl = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/notifications';
      
      try {
        wsRef.current = new WebSocket(wsUrl);

        wsRef.current.onopen = () => {
          console.log('WebSocket connected for notifications');
          
          // Request initial notifications
          wsRef.current.send(JSON.stringify({
            type: 'get_notifications',
            token: localStorage.getItem('adminToken')
          }));
        };

        wsRef.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            
            switch (data.type) {
              case 'notification':
                handleNewNotification(data.payload);
                break;
              case 'notifications_list':
                setNotifications(data.payload || []);
                updateUnreadCount(data.payload || []);
                break;
              case 'notification_read':
                markAsRead(data.payload.id);
                break;
              default:
                console.log('Unknown message type:', data.type);
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };

        wsRef.current.onclose = () => {
          console.log('WebSocket disconnected');
          // Attempt to reconnect after 5 seconds
          reconnectTimeoutRef.current = setTimeout(connectWebSocket, 5000);
        };

        wsRef.current.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
      } catch (error) {
        console.error('Failed to connect WebSocket:', error);
        // Fallback to polling
        startPolling();
      }
    };

    const startPolling = () => {
      // Fallback polling mechanism
      const pollInterval = setInterval(async () => {
        try {
          const response = await fetch('/api/notifications', {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            }
          });
          
          if (response.ok) {
            const data = await response.json();
            setNotifications(data.notifications || []);
            updateUnreadCount(data.notifications || []);
          }
        } catch (error) {
          console.error('Polling error:', error);
        }
      }, 30000); // Poll every 30 seconds

      return () => clearInterval(pollInterval);
    };

    connectWebSocket();

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current);
      }
    };
  }, []);

  const handleNewNotification = (notification) => {
    setNotifications(prev => [notification, ...prev]);
    setUnreadCount(prev => prev + 1);
    
    // Show browser notification if permitted
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(notification.title, {
        body: notification.message,
        icon: '/favicon.ico',
        tag: notification.id
      });
    }
  };

  const updateUnreadCount = (notificationList) => {
    const unread = notificationList.filter(n => !n.read).length;
    setUnreadCount(unread);
  };

  const markAsRead = (notificationId) => {
    setNotifications(prev => 
      prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
    );
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
    
    // Send to server
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'mark_all_read',
        token: localStorage.getItem('adminToken')
      }));
    }
  };

  const deleteNotification = (notificationId) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    
    // Send to server
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        type: 'delete_notification',
        payload: { id: notificationId },
        token: localStorage.getItem('adminToken')
      }));
    }
  };

  const handleNotificationClick = (notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
      
      // Send read status to server
      if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
        wsRef.current.send(JSON.stringify({
          type: 'mark_read',
          payload: { id: notification.id },
          token: localStorage.getItem('adminToken')
        }));
      }
    }

    // Handle navigation if notification has action
    if (notification.action) {
      window.location.href = notification.action.url;
    }
    
    setIsOpen(false);
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return `${Math.floor(diff / 60000)} min ago`;
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} hours ago`;
    return date.toLocaleDateString();
  };

  const renderNotification = (notification) => {
    const config = notificationTypes[notification.type] || notificationTypes.info;
    const Icon = config.icon;
    
    return (
      <motion.div
        key={notification.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        className={`p-4 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
          notification.read ? 'bg-white border-gray-200' : config.bgColor + ' border-' + config.color + '-200'
        }`}
        onClick={() => handleNotificationClick(notification)}
      >
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-full bg-${config.color}-100 flex items-center justify-center flex-shrink-0`}>
            <Icon className={`w-4 h-4 text-${config.color}-600`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <p className={`text-sm font-medium ${
                notification.read ? 'text-gray-900' : 'text-gray-900'
              }`}>
                {notification.title}
              </p>
              <div className="flex items-center gap-1">
                {!notification.read && (
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteNotification(notification.id);
                  }}
                  className="text-gray-400 hover:text-gray-600 p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            </div>
            
            <p className={`text-sm mt-1 ${
              notification.read ? 'text-gray-500' : 'text-gray-700'
            }`}>
              {notification.message}
            </p>
            
            <p className="text-xs text-gray-400 mt-2">
              {formatTime(notification.timestamp)}
            </p>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <div className="relative">
      {/* Notification Bell */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
      >
        <Bell className="w-5 h-5" />
        
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
          >
            {unreadCount > 99 ? '99+' : unreadCount}
          </motion.div>
        )}
      </button>

      {/* Notification Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-lg z-50 max-h-96 overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  {unreadCount > 0 && (
                    <button
                      onClick={markAllAsRead}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>
              </div>

              {/* Notifications List */}
              <div className="overflow-y-auto max-h-80">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center text-gray-500">
                    <Bell className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                    <p>No notifications</p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    {notifications.map(renderNotification)}
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="p-3 border-t border-gray-200">
                  <button
                    onClick={() => {
                      // Navigate to all notifications page
                      window.location.href = '/admin/notifications';
                    }}
                    className="w-full text-center text-sm text-blue-600 hover:text-blue-700"
                  >
                    View all notifications
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
