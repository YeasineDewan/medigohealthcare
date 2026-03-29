// Lazy loading utility for images and components
export const lazyLoadImage = (src, placeholder = null) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = src;
    
    if (placeholder) {
      img.srcset = `${placeholder} 1x, ${src} 2x`;
    }
    
    img.onload = () => resolve(img);
    img.onerror = reject;
  });
};

// Intersection Observer for lazy loading
export const createIntersectionObserver = (callback, options = {}) => {
  const defaultOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
  };
  
  const observerOptions = { ...defaultOptions, ...options };
  return new IntersectionObserver(callback, observerOptions);
};

// Code splitting helper
export const loadComponent = (importFunction) => {
  return {
    Component: lazy(importFunction),
    loading: () => (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#5DBB63]"></div>
      </div>
    )
  };
};

// Performance monitoring
export const measurePerformance = (name, fn) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`${name} took ${(end - start).toFixed(2)} milliseconds`);
  return result;
};

// Debounce utility for search inputs
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

// Throttle utility for scroll events
export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};

// Image optimization
export const optimizeImage = (src, width, height, quality = 80) => {
  // This would typically use an image CDN like Cloudinary, Imgix, or similar
  // For now, we'll return the original src
  return src;
};

// Preload critical resources
export const preloadResource = (href, as, type = null) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.href = href;
  link.as = as;
  if (type) {
    link.type = type;
  }
  document.head.appendChild(link);
};

// Prefetch non-critical resources
export const prefetchResource = (href) => {
  const link = document.createElement('link');
  link.rel = 'prefetch';
  link.href = href;
  document.head.appendChild(link);
};

// Cache management
export const cacheManager = {
  set: (key, data, ttl = 3600000) => { // Default TTL: 1 hour
    try {
      const item = {
        data,
        timestamp: Date.now(),
        ttl
      };
      localStorage.setItem(key, JSON.stringify(item));
    } catch (error) {
      console.warn('Failed to cache data:', error);
    }
  },
  
  get: (key) => {
    try {
      const item = JSON.parse(localStorage.getItem(key));
      if (!item) return null;
      
      const now = Date.now();
      if (now - item.timestamp > item.ttl) {
        localStorage.removeItem(key);
        return null;
      }
      
      return item.data;
    } catch (error) {
      console.warn('Failed to retrieve cached data:', error);
      return null;
    }
  },
  
  remove: (key) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.warn('Failed to remove cached data:', error);
    }
  },
  
  clear: () => {
    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('medigo_')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.warn('Failed to clear cache:', error);
    }
  }
};

// Service Worker registration
export const registerServiceWorker = async () => {
  if ('serviceWorker' in navigator) {
    try {
      // Unregister any existing service workers first
      const registrations = await navigator.serviceWorker.getRegistrations();
      for (const registration of registrations) {
        await registration.unregister();
      }
      
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/'
      });
      
      console.log('Service Worker registered successfully:', registration);
      
      // Check for updates with proper error handling
      registration.addEventListener('updatefound', () => {
        const newWorker = registration.installing;
        if (!newWorker) return;
        
        newWorker.addEventListener('statechange', () => {
          if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
            // New content is available, prompt user to refresh
            if (window.confirm('New content available! Would you like to refresh?')) {
              window.location.reload();
            }
          }
        });
      });
      
      // Handle service worker errors
      registration.addEventListener('error', (event) => {
        console.warn('Service Worker error:', event);
      });
      
      // Handle controller change
      navigator.serviceWorker.addEventListener('controllerchange', () => {
        console.log('Service Worker controller changed');
      });
      
      return registration;
    } catch (error) {
      console.warn('Service Worker registration failed:', error);
      // Don't throw the error, just log it
      return null;
    }
  }
  return null;
};

// Critical CSS inlining helper
export const inlineCriticalCSS = (css) => {
  const style = document.createElement('style');
  style.textContent = css;
  style.setAttribute('data-critical', 'true');
  document.head.appendChild(style);
};

// Font loading optimization
export const loadFont = (fontFamily, src, weight = '400', style = 'normal') => {
  const font = new FontFace(fontFamily, `url(${src})`, {
    weight,
    style,
    display: 'swap'
  });
  
  font.load().then(() => {
    document.fonts.add(font);
  }).catch((error) => {
    console.error('Font loading failed:', error);
  });
  
  return font;
};

// Bundle size monitoring
export const monitorBundleSize = () => {
  if (process.env.NODE_ENV === 'development') {
    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.initiatorType === 'script' || entry.initiatorType === 'link') {
          console.log(`${entry.name}: ${(entry.transferSize / 1024).toFixed(2)} KB`);
        }
      });
    });
    
    observer.observe({ entryTypes: ['resource'] });
  }
};

// Virtual scrolling helper for large lists
export const createVirtualScroll = (container, items, itemHeight, renderItem) => {
  const visibleItems = Math.ceil(container.clientHeight / itemHeight) + 2;
  let scrollTop = 0;
  
  const updateVisibleItems = () => {
    const startIndex = Math.floor(scrollTop / itemHeight);
    const endIndex = Math.min(startIndex + visibleItems, items.length);
    
    container.innerHTML = '';
    
    for (let i = startIndex; i < endIndex; i++) {
      const item = renderItem(items[i], i);
      item.style.position = 'absolute';
      item.style.top = `${i * itemHeight}px`;
      item.style.height = `${itemHeight}px`;
      container.appendChild(item);
    }
  };
  
  container.addEventListener('scroll', throttle(() => {
    scrollTop = container.scrollTop;
    updateVisibleItems();
  }, 16));
  
  updateVisibleItems();
  
  return {
    updateItems: (newItems) => {
      items = newItems;
      updateVisibleItems();
    }
  };
};

export default {
  lazyLoadImage,
  createIntersectionObserver,
  loadComponent,
  measurePerformance,
  debounce,
  throttle,
  optimizeImage,
  preloadResource,
  prefetchResource,
  cacheManager,
  registerServiceWorker,
  inlineCriticalCSS,
  loadFont,
  monitorBundleSize,
  createVirtualScroll
};
