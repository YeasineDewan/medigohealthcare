import { useState, useEffect, useCallback, useRef } from 'react';

class MenuCache {
  constructor() {
    this.cache = new Map();
    this.timestamps = new Map();
    this.ttl = 5 * 60 * 1000; // 5 minutes default TTL
    this.maxSize = 100; // Maximum number of cached items
    this.hitCount = 0;
    this.missCount = 0;
  }

  // Set cache with TTL
  set(key, data, customTTL = null) {
    // Check if we need to evict old entries
    if (this.cache.size >= this.maxSize) {
      this.evictOldest();
    }

    const ttl = customTTL || this.ttl;
    this.cache.set(key, data);
    this.timestamps.set(key, {
      created: Date.now(),
      ttl: ttl,
      accessCount: 0,
      lastAccessed: Date.now()
    });
  }

  // Get cache entry
  get(key) {
    const timestamp = this.timestamps.get(key);
    
    if (!timestamp) {
      this.missCount++;
      return null;
    }

    // Check if cache is expired
    if (Date.now() - timestamp.created > timestamp.ttl) {
      this.delete(key);
      this.missCount++;
      return null;
    }

    // Update access statistics
    timestamp.accessCount++;
    timestamp.lastAccessed = Date.now();
    this.hitCount++;

    return this.cache.get(key);
  }

  // Delete cache entry
  delete(key) {
    this.cache.delete(key);
    this.timestamps.delete(key);
  }

  // Clear all cache
  clear() {
    this.cache.clear();
    this.timestamps.clear();
    this.hitCount = 0;
    this.missCount = 0;
  }

  // Evict oldest entries
  evictOldest() {
    const entries = Array.from(this.timestamps.entries());
    
    // Sort by last accessed time (oldest first)
    entries.sort((a, b) => a[1].lastAccessed - b[1].lastAccessed);
    
    // Remove oldest 25% of entries
    const toRemove = Math.ceil(entries.length * 0.25);
    for (let i = 0; i < toRemove; i++) {
      this.delete(entries[i][0]);
    }
  }

  // Clean up expired entries
  cleanup() {
    const now = Date.now();
    const expiredKeys = [];

    for (const [key, timestamp] of this.timestamps.entries()) {
      if (now - timestamp.created > timestamp.ttl) {
        expiredKeys.push(key);
      }
    }

    expiredKeys.forEach(key => this.delete(key));
  }

  // Get cache statistics
  getStats() {
    const totalRequests = this.hitCount + this.missCount;
    const hitRate = totalRequests > 0 ? (this.hitCount / totalRequests * 100).toFixed(2) : 0;
    
    return {
      size: this.cache.size,
      hitCount: this.hitCount,
      missCount: this.missCount,
      hitRate: `${hitRate}%`,
      memoryUsage: this.estimateMemoryUsage()
    };
  }

  // Estimate memory usage (rough approximation)
  estimateMemoryUsage() {
    let totalSize = 0;
    
    for (const [key, value] of this.cache.entries()) {
      totalSize += this.estimateObjectSize(key);
      totalSize += this.estimateObjectSize(value);
    }
    
    for (const [key, timestamp] of this.timestamps.entries()) {
      totalSize += this.estimateObjectSize(key);
      totalSize += this.estimateObjectSize(timestamp);
    }
    
    return this.formatBytes(totalSize);
  }

  // Estimate size of an object
  estimateObjectSize(obj) {
    if (typeof obj === 'string') {
      return obj.length * 2; // UTF-16 characters
    }
    if (typeof obj === 'number') {
      return 8; // 64-bit number
    }
    if (typeof obj === 'boolean') {
      return 4;
    }
    if (typeof obj === 'object' && obj !== null) {
      let size = 0;
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          size += this.estimateObjectSize(key);
          size += this.estimateObjectSize(obj[key]);
        }
      }
      return size;
    }
    return 0;
  }

  // Format bytes to human readable format
  formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  // Get cache entries sorted by access frequency
  getHotEntries() {
    const entries = Array.from(this.timestamps.entries());
    
    return entries
      .map(([key, timestamp]) => ({
        key,
        accessCount: timestamp.accessCount,
        lastAccessed: timestamp.lastAccessed,
        age: Date.now() - timestamp.created
      }))
      .sort((a, b) => b.accessCount - a.accessCount)
      .slice(0, 10);
  }
}

// Create singleton instance
const menuCache = new MenuCache();

// React hook for menu caching
export const useMenuCache = (options = {}) => {
  const {
    ttl = 5 * 60 * 1000, // 5 minutes
    maxSize = 100,
    enableStats = true,
    autoCleanup = true,
    cleanupInterval = 60000 // 1 minute
  } = options;

  const [stats, setStats] = useState(null);
  const cleanupIntervalRef = useRef(null);

  // Initialize cache settings
  useEffect(() => {
    menuCache.ttl = ttl;
    menuCache.maxSize = maxSize;
  }, [ttl, maxSize]);

  // Set up auto cleanup
  useEffect(() => {
    if (autoCleanup) {
      cleanupIntervalRef.current = setInterval(() => {
        menuCache.cleanup();
        if (enableStats) {
          setStats(menuCache.getStats());
        }
      }, cleanupInterval);
    }

    return () => {
      if (cleanupIntervalRef.current) {
        clearInterval(cleanupIntervalRef.current);
      }
    };
  }, [autoCleanup, cleanupInterval, enableStats]);

  // Cache operations
  const setCache = useCallback((key, data, customTTL = null) => {
    menuCache.set(key, data, customTTL);
    if (enableStats) {
      setStats(menuCache.getStats());
    }
  }, [enableStats]);

  const getCache = useCallback((key) => {
    const data = menuCache.get(key);
    if (enableStats) {
      setStats(menuCache.getStats());
    }
    return data;
  }, [enableStats]);

  const deleteCache = useCallback((key) => {
    menuCache.delete(key);
    if (enableStats) {
      setStats(menuCache.getStats());
    }
  }, [enableStats]);

  const clearCache = useCallback(() => {
    menuCache.clear();
    if (enableStats) {
      setStats(menuCache.getStats());
    }
  }, [enableStats]);

  const cleanupCache = useCallback(() => {
    menuCache.cleanup();
    if (enableStats) {
      setStats(menuCache.getStats());
    }
  }, [enableStats]);

  const getHotEntries = useCallback(() => {
    return menuCache.getHotEntries();
  }, []);

  // Update stats periodically
  useEffect(() => {
    if (enableStats) {
      const interval = setInterval(() => {
        setStats(menuCache.getStats());
      }, 5000); // Update every 5 seconds

      return () => clearInterval(interval);
    }
  }, [enableStats]);

  return {
    // Cache operations
    set: setCache,
    get: getCache,
    delete: deleteCache,
    clear: clearCache,
    cleanup: cleanupCache,
    
    // Statistics
    stats,
    hotEntries: getHotEntries(),
    
    // Direct access to cache instance
    cache: menuCache
  };
};

// Higher-order function for caching async operations
export const withCache = (asyncFn, keyGenerator, options = {}) => {
  return async (...args) => {
    const cacheKey = keyGenerator(...args);
    const ttl = options.ttl;
    
    // Try to get from cache first
    const cached = menuCache.get(cacheKey);
    if (cached) {
      return cached;
    }
    
    // Execute function and cache result
    try {
      const result = await asyncFn(...args);
      menuCache.set(cacheKey, result, ttl);
      return result;
    } catch (error) {
      // Don't cache errors
      throw error;
    }
  };
};

// Utility function for creating cache keys
export const createCacheKey = (prefix, ...parts) => {
  return [prefix, ...parts].join(':');
};

export { menuCache };
export default useMenuCache;
