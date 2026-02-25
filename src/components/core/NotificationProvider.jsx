import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react';

const NotificationContext = createContext();

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within NotificationProvider');
  }
  return context;
}

const notificationVariants = {
  success: {
    icon: CheckCircle,
    color: 'bg-green-500',
    border: 'border-green-200',
    text: 'text-green-800'
  },
  error: {
    icon: AlertCircle,
    color: 'bg-red-500',
    border: 'border-red-200',
    text: 'text-red-800'
  },
  warning: {
    icon: AlertTriangle,
    color: 'bg-amber-500',
    border: 'border-amber-200',
    text: 'text-amber-800'
  },
  info: {
    icon: Info,
    color: 'bg-blue-500',
    border: 'border-blue-200',
    text: 'text-blue-800'
  }
};

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const showNotification = useCallback((message, type = 'info', duration = 5000) => {
    const id = Date.now() + Math.random();
    const notification = {
      id,
      message,
      type,
      timestamp: new Date()
    };

    setNotifications(prev => [...prev, notification]);

    // Auto remove after duration
    setTimeout(() => {
      removeNotification(id);
    }, duration);

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const value = {
    notifications,
    showNotification,
    removeNotification,
    clearAll
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationContainer 
        notifications={notifications} 
        onRemove={removeNotification}
      />
    </NotificationContext.Provider>
  );
}

function NotificationContainer({ notifications, onRemove }) {
  return (
    <div className="fixed top-4 right-4 z-[9999] space-y-2 w-full max-w-sm">
      <AnimatePresence>
        {notifications.map((notification) => {
          const variant = notificationVariants[notification.type] || notificationVariants.info;
          const Icon = variant.icon;
          
          return (
            <motion.div
              key={notification.id}
              initial={{ opacity: 0, x: 300, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 300, scale: 0.8 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className={`relative p-4 rounded-xl border shadow-lg backdrop-blur-sm ${variant.border} ${variant.color.replace('bg-', 'bg-')}/10`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${variant.color}`}>
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className={`text-sm font-medium ${variant.text.replace('text-', 'text-')}`}>
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    {notification.timestamp.toLocaleTimeString()}
                  </p>
                </div>
                <button
                  onClick={() => onRemove(notification.id)}
                  className="p-1 rounded-full hover:bg-black/10 transition-colors"
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>
              </div>
              
              {/* Progress bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/10 rounded-b-xl overflow-hidden">
                <motion.div
                  className={`${variant.color} h-full`}
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  onAnimationComplete={() => onRemove(notification.id)}
                />
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
