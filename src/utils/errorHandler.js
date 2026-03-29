// Error handler to suppress browser extension related errors
export const setupErrorHandlers = () => {
  // Suppress browser extension related errors
  const originalError = console.error;
  const originalWarn = console.warn;
  
  console.error = (...args) => {
    // Filter out common browser extension errors
    const message = args[0];
    if (typeof message === 'string') {
      if (message.includes('message channel closed') ||
          message.includes('asynchronous response') ||
          message.includes('runtime.lastError') ||
          message.includes('extension') ||
          message.includes('chrome-extension') ||
          message.includes('moz-extension') ||
          message.includes('Shared Storage API') ||
          message.includes('deprecated') ||
          message.includes('Could not establish connection') ||
          message.includes('Receiving end does not exist') ||
          message.includes('Unchecked runtime.lastError')) {
        return; // Suppress these errors
      }
    }
    originalError.apply(console, args);
  };
  
  console.warn = (...args) => {
    // Filter out common browser extension warnings
    const message = args[0];
    if (typeof message === 'string') {
      if (message.includes('message channel closed') ||
          message.includes('asynchronous response') ||
          message.includes('runtime.lastError') ||
          message.includes('extension') ||
          message.includes('chrome-extension') ||
          message.includes('moz-extension') ||
          message.includes('Shared Storage API') ||
          message.includes('deprecated') ||
          message.includes('Could not establish connection') ||
          message.includes('Receiving end does not exist') ||
          message.includes('Unchecked runtime.lastError')) {
        return; // Suppress these warnings
      }
    }
    originalWarn.apply(console, args);
  };
  
  // Handle unhandled promise rejections
  window.addEventListener('unhandledrejection', (event) => {
    // Filter out browser extension related promise rejections
    if (event.reason && typeof event.reason === 'string') {
      if (event.reason.includes('message channel closed') ||
          event.reason.includes('asynchronous response') ||
          event.reason.includes('runtime.lastError') ||
          event.reason.includes('extension') ||
          event.reason.includes('Shared Storage API') ||
          event.reason.includes('deprecated') ||
          event.reason.includes('Could not establish connection') ||
          event.reason.includes('Receiving end does not exist') ||
          event.reason.includes('Unchecked runtime.lastError')) {
        event.preventDefault(); // Prevent error from showing in console
        return;
      }
    }
    
    // Log other unhandled rejections
    console.warn('Unhandled promise rejection:', event.reason);
  });
  
  // Handle runtime errors
  window.addEventListener('error', (event) => {
    // Filter out browser extension related errors
    if (event.message && typeof event.message === 'string') {
      if (event.message.includes('message channel closed') ||
          event.message.includes('asynchronous response') ||
          event.message.includes('runtime.lastError') ||
          event.message.includes('extension') ||
          event.message.includes('Shared Storage API') ||
          event.message.includes('deprecated') ||
          event.message.includes('Could not establish connection') ||
          event.message.includes('Receiving end does not exist') ||
          event.message.includes('Unchecked runtime.lastError')) {
        event.preventDefault(); // Prevent error from showing in console
        return;
      }
    }
  });
};

// Service Worker message handler with timeout
export const safeServiceWorkerMessage = (serviceWorker, message, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      reject(new Error('Service Worker message timeout'));
    }, timeout);
    
    const messageChannel = new MessageChannel();
    
    messageChannel.port1.onmessage = (event) => {
      clearTimeout(timeoutId);
      messageChannel.port1.close();
      messageChannel.port2.close();
      resolve(event.data);
    };
    
    messageChannel.port1.onmessageerror = (event) => {
      clearTimeout(timeoutId);
      messageChannel.port1.close();
      messageChannel.port2.close();
      reject(new Error('Service Worker message error'));
    };
    
    try {
      serviceWorker.postMessage(message, [messageChannel.port2]);
    } catch (error) {
      clearTimeout(timeoutId);
      messageChannel.port1.close();
      messageChannel.port2.close();
      reject(error);
    }
  });
};

// Safe Service Worker registration
export const safeRegisterServiceWorker = async () => {
  if (!('serviceWorker' in navigator)) {
    return null;
  }
  
  try {
    // Wait for page to be fully loaded
    if (document.readyState !== 'complete') {
      await new Promise(resolve => {
        window.addEventListener('load', resolve, { once: true });
      });
    }
    
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/'
    });
    
    console.log('Service Worker registered successfully');
    return registration;
  } catch (error) {
    console.warn('Service Worker registration failed:', error.message);
    return null;
  }
};

export default {
  setupErrorHandlers,
  safeServiceWorkerMessage,
  safeRegisterServiceWorker
};
