import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import adminMenuService from '../services/adminMenuService';
import { useAdminStore } from '../store/adminStore';

export const useAdminMenu = (options = {}) => {
  const {
    userRole = null,
    permissions = [],
    autoRefresh = false,
    refreshInterval = 300000, // 5 minutes
    enableCache = true,
    enableSearch = true
  } = options;

  const { user, isAuthenticated } = useAdminStore();
  
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [lastUpdated, setLastUpdated] = useState(null);

  // Get effective user role and permissions
  const effectiveRole = useMemo(() => {
    return userRole || user?.role || 'guest';
  }, [userRole, user]);

  const effectivePermissions = useMemo(() => {
    const userPerms = user?.permissions || [];
    return permissions.length > 0 ? permissions : userPerms;
  }, [permissions, user]);

  // Store fetch function in ref to maintain stable reference
  const fetchMenuRef = useRef(async () => {
    setLoading(true);
    setError(null);

    try {
      const menuData = await adminMenuService.getMenuStructure();
      
      setMenuItems(menuData);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Failed to fetch admin menu:', err);
      setError(err.message || 'Failed to load menu');
      
      // Fallback to cached data if available
      const cachedData = adminMenuService.getFromCache();
      if (cachedData) {
        setMenuItems(cachedData);
      }
    } finally {
      setLoading(false);
    }
  });

  // Initial fetch
  useEffect(() => {
    fetchMenuRef.current();
  }, []);

  // Auto-refresh
  useEffect(() => {
    if (!autoRefresh) return;

    const interval = setInterval(() => fetchMenuRef.current(), refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval]);

  // Filter menu based on search
  const filteredMenuItems = useMemo(() => {
    if (!searchTerm || !enableSearch) return menuItems;
    
    return adminMenuService.searchMenuItems(menuItems, searchTerm);
  }, [menuItems, searchTerm, enableSearch]);

  // Menu statistics
  const menuStats = useMemo(() => {
    return adminMenuService.getMenuStats(menuItems);
  }, [menuItems]);

  // Toggle expanded state
  const toggleExpanded = useCallback((itemId, isExpanded) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (isExpanded) {
        newSet.add(itemId);
      } else {
        newSet.delete(itemId);
      }
      return newSet;
    });
  }, []);

  // Expand all items
  const expandAll = useCallback(() => {
    const allItemIds = [];
    const collectIds = (items) => {
      items.forEach(item => {
        if (item.children && item.children.length > 0) {
          allItemIds.push(item.id);
          collectIds(item.children);
        }
      });
    };
    collectIds(menuItems);
    setExpandedItems(new Set(allItemIds));
  }, [menuItems]);

  // Collapse all items
  const collapseAll = useCallback(() => {
    setExpandedItems(new Set());
  }, []);

  // Refresh menu
  const refresh = useCallback(() => {
    if (enableCache) {
      adminMenuService.clearCache();
    }
    fetchMenuRef.current();
  }, [enableCache]);

  // Get menu by category
  const getMenuByCategory = useCallback(async (category) => {
    try {
      return await adminMenuService.getMenuByCategory(
        category, 
        effectiveRole, 
        effectivePermissions
      );
    } catch (err) {
      console.error(`Failed to fetch menu category ${category}:`, err);
      return [];
    }
  }, [effectiveRole, effectivePermissions]);

  // Check if user has access to menu item
  const hasAccessToItem = useCallback((item) => {
    if (!item) return false;
    
    // Check role-based access
    if (item.roles && item.roles.length > 0) {
      if (!item.roles.includes(effectiveRole) && !item.roles.includes('admin')) {
        return false;
      }
    }

    // Check permission-based access
    if (item.permissions && item.permissions.length > 0) {
      const hasPermission = item.permissions.some(permission => 
        effectivePermissions.includes(permission) || 
        effectivePermissions.includes('admin')
      );
      if (!hasPermission) return false;
    }

    return true;
  }, [effectiveRole, effectivePermissions]);

  // Get accessible menu items
  const accessibleMenuItems = useMemo(() => {
    return adminMenuService.filterMenuByPermissions(
      menuItems, 
      effectiveRole, 
      effectivePermissions
    );
  }, [menuItems, effectiveRole, effectivePermissions]);

  // Find menu item by path
  const findMenuItemByPath = useCallback((path) => {
    const findInItems = (items) => {
      for (const item of items) {
        if (item.path === path) return item;
        if (item.children && item.children.length > 0) {
          const found = findInItems(item.children);
          if (found) return found;
        }
      }
      return null;
    };
    return findInItems(menuItems);
  }, [menuItems]);

  // Get breadcrumb for current path
  const getBreadcrumb = useCallback((currentPath) => {
    const breadcrumb = [];
    const findPath = (items, path = []) => {
      for (const item of items) {
        const currentPathArray = [...path, item];
        
        if (item.path === currentPath) {
          breadcrumb.push(...currentPathArray);
          return true;
        }
        
        if (item.children && item.children.length > 0) {
          if (findPath(item.children, currentPathArray)) {
            return true;
          }
        }
      }
      return false;
    };
    
    findPath(menuItems);
    return breadcrumb;
  }, [menuItems]);

  return {
    // Data
    menuItems: filteredMenuItems,
    accessibleMenuItems,
    loading,
    error,
    searchTerm,
    expandedItems,
    lastUpdated,
    menuStats,
    
    // Actions
    setSearchTerm,
    toggleExpanded,
    expandAll,
    collapseAll,
    refresh,
    
    // Utilities
    getMenuByCategory,
    hasAccessToItem,
    findMenuItemByPath,
    getBreadcrumb,
    
    // Computed
    effectiveRole,
    effectivePermissions,
    hasSearchTerm: searchTerm.trim().length > 0,
    isMenuEmpty: filteredMenuItems.length === 0,
  };
};

export default useAdminMenu;
