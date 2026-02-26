import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

// Admin state management store
export const useAdminStore = create(
  devtools(
    persist(
      (set, get) => ({
        // User state
        user: null,
        isAuthenticated: false,
        permissions: [],
        
        // UI state
        sidebarCollapsed: false,
        theme: 'light',
        language: 'en',
        
        // Data cache
        cache: new Map(),
        
        // Notifications
        notifications: [],
        unreadCount: 0,
        
        // Settings
        settings: {
          autoRefresh: true,
          refreshInterval: 30000,
          notificationsEnabled: true,
          soundEnabled: false,
        },
        
        // Actions
        setUser: (user) => set({ user, isAuthenticated: true }),
        
        logout: () => set({ 
          user: null, 
          isAuthenticated: false, 
          permissions: [],
          cache: new Map()
        }),
        
        setPermissions: (permissions) => set({ permissions }),
        
        toggleSidebar: () => set((state) => ({ 
          sidebarCollapsed: !state.sidebarCollapsed 
        })),
        
        setTheme: (theme) => set({ theme }),
        
        setLanguage: (language) => set({ language }),
        
        // Cache management
        setCache: (key, data) => {
          const newCache = new Map(get().cache);
          newCache.set(key, {
            data,
            timestamp: Date.now(),
            ttl: 5 * 60 * 1000 // 5 minutes
          });
          set({ cache: newCache });
        },
        
        getCache: (key) => {
          const cached = get().cache.get(key);
          if (!cached) return null;
          
          // Check if cache is expired
          if (Date.now() - cached.timestamp > cached.ttl) {
            const newCache = new Map(get().cache);
            newCache.delete(key);
            set({ cache: newCache });
            return null;
          }
          
          return cached.data;
        },
        
        clearCache: () => set({ cache: new Map() }),
        
        // Notification management
        addNotification: (notification) => set((state) => ({
          notifications: [notification, ...state.notifications],
          unreadCount: state.unreadCount + 1
        })),
        
        markNotificationAsRead: (id) => set((state) => ({
          notifications: state.notifications.map(n => 
            n.id === id ? { ...n, read: true } : n
          ),
          unreadCount: Math.max(0, state.unreadCount - 1)
        })),
        
        markAllNotificationsAsRead: () => set((state) => ({
          notifications: state.notifications.map(n => ({ ...n, read: true })),
          unreadCount: 0
        })),
        
        removeNotification: (id) => set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id),
          unreadCount: state.notifications.find(n => n.id === id && !n.read) 
            ? Math.max(0, state.unreadCount - 1) 
            : state.unreadCount
        })),
        
        // Settings management
        updateSettings: (newSettings) => set((state) => ({
          settings: { ...state.settings, ...newSettings }
        })),
        
        // Permission checking
        hasPermission: (permission) => {
          const permissions = get().permissions;
          return permissions.includes('admin') || permissions.includes(permission);
        },
        
        // Role checking
        hasRole: (role) => {
          const user = get().user;
          return user?.role === role || user?.role === 'admin';
        },
      }),
      {
        name: 'admin-store',
        partialize: (state) => ({
          sidebarCollapsed: state.sidebarCollapsed,
          theme: state.theme,
          language: state.language,
          settings: state.settings,
        }),
      }
    )
  )
);

// Data store for managing dynamic data
export const useDataStore = create(
  devtools(
    (set, get) => ({
      // Data collections
      employees: [],
      patients: [],
      appointments: [],
      departments: [],
      medicines: [],
      labTests: [],
      reports: [],
      
      // Loading states
      loading: {
        employees: false,
        patients: false,
        appointments: false,
        departments: false,
        medicines: false,
        labTests: false,
        reports: false,
      },
      
      // Error states
      errors: {
        employees: null,
        patients: null,
        appointments: null,
        departments: null,
        medicines: null,
        labTests: null,
        reports: null,
      },
      
      // Pagination
      pagination: {
        employees: { page: 1, limit: 10, total: 0 },
        patients: { page: 1, limit: 10, total: 0 },
        appointments: { page: 1, limit: 10, total: 0 },
        medicines: { page: 1, limit: 10, total: 0 },
        labTests: { page: 1, limit: 10, total: 0 },
        reports: { page: 1, limit: 10, total: 0 },
      },
      
      // Filters
      filters: {
        employees: {},
        patients: {},
        appointments: {},
        medicines: {},
        labTests: {},
        reports: {},
      },
      
      // Actions
      setData: (entity, data) => set((state) => ({
        [entity]: data
      })),
      
      setLoading: (entity, loading) => set((state) => ({
        loading: { ...state.loading, [entity]: loading }
      })),
      
      setError: (entity, error) => set((state) => ({
        errors: { ...state.errors, [entity]: error }
      })),
      
      setPagination: (entity, pagination) => set((state) => ({
        pagination: { ...state.pagination, [entity]: pagination }
      })),
      
      setFilters: (entity, filters) => set((state) => ({
        filters: { ...state.filters, [entity]: filters }
      })),
      
      // CRUD operations
      addItem: (entity, item) => set((state) => ({
        [entity]: [item, ...state[entity]]
      })),
      
      updateItem: (entity, id, updates) => set((state) => ({
        [entity]: state[entity].map(item => 
          item.id === id ? { ...item, ...updates } : item
        )
      })),
      
      removeItem: (entity, id) => set((state) => ({
        [entity]: state[entity].filter(item => item.id !== id)
      })),
      
      // Bulk operations
      bulkAdd: (entity, items) => set((state) => ({
        [entity]: [...items, ...state[entity]]
      })),
      
      bulkUpdate: (entity, updates) => set((state) => ({
        [entity]: state[entity].map(item => {
          const update = updates.find(u => u.id === item.id);
          return update ? { ...item, ...update } : item;
        })
      })),
      
      bulkRemove: (entity, ids) => set((state) => ({
        [entity]: state[entity].filter(item => !ids.includes(item.id))
      })),
      
      // Search and filter
      searchItems: (entity, searchTerm) => {
        const items = get()[entity];
        if (!searchTerm) return items;
        
        return items.filter(item => 
          Object.values(item).some(value => 
            value && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
          )
        );
      },
      
      filterItems: (entity, filters) => {
        let items = get()[entity];
        
        Object.entries(filters).forEach(([key, value]) => {
          if (value !== '' && value !== null && value !== undefined) {
            items = items.filter(item => item[key] === value);
          }
        });
        
        return items;
      },
      
      // Get filtered data
      getFilteredData: (entity) => {
        const state = get();
        let items = state[entity];
        
        // Apply filters
        const filters = state.filters[entity];
        if (filters && Object.keys(filters).length > 0) {
          items = items.filter(item => {
            return Object.entries(filters).every(([key, value]) => {
              if (value === '' || value === null || value === undefined) return true;
              return item[key] === value;
            });
          });
        }
        
        return items;
      },
      
      // Get paginated data
      getPaginatedData: (entity) => {
        const state = get();
        const items = state.getFilteredData(entity);
        const pagination = state.pagination[entity];
        
        const startIndex = (pagination.page - 1) * pagination.limit;
        const endIndex = startIndex + pagination.limit;
        
        return {
          data: items.slice(startIndex, endIndex),
          total: items.length,
          page: pagination.page,
          limit: pagination.limit,
          totalPages: Math.ceil(items.length / pagination.limit)
        };
      },
      
      // Reset entity data
      resetEntity: (entity) => set((state) => ({
        [entity]: [],
        loading: { ...state.loading, [entity]: false },
        errors: { ...state.errors, [entity]: null },
        pagination: { ...state.pagination, [entity]: { page: 1, limit: 10, total: 0 } },
        filters: { ...state.filters, [entity]: {} }
      })),
      
      // Reset all data
      resetAll: () => set({
        employees: [],
        patients: [],
        appointments: [],
        departments: [],
        medicines: [],
        labTests: [],
        reports: [],
        loading: {
          employees: false,
          patients: false,
          appointments: false,
          departments: false,
          medicines: false,
          labTests: false,
          reports: false,
        },
        errors: {
          employees: null,
          patients: null,
          appointments: null,
          departments: null,
          medicines: null,
          labTests: null,
          reports: null,
        },
        pagination: {
          employees: { page: 1, limit: 10, total: 0 },
          patients: { page: 1, limit: 10, total: 0 },
          appointments: { page: 1, limit: 10, total: 0 },
          medicines: { page: 1, limit: 10, total: 0 },
          labTests: { page: 1, limit: 10, total: 0 },
          reports: { page: 1, limit: 10, total: 0 },
        },
        filters: {
          employees: {},
          patients: {},
          appointments: {},
          medicines: {},
          labTests: {},
          reports: {},
        },
      }),
    }),
    { name: 'data-store' }
  )
);

// Real-time updates store
export const useRealTimeStore = create(
  devtools(
    (set, get) => ({
      // WebSocket connection
      ws: null,
      connected: false,
      reconnectAttempts: 0,
      maxReconnectAttempts: 5,
      
      // Real-time data
      liveStats: {},
      liveUpdates: [],
      
      // Connection management
      connect: (url) => {
        const ws = new WebSocket(url);
        
        ws.onopen = () => {
          set({ ws, connected: true, reconnectAttempts: 0 });
          console.log('WebSocket connected');
        };
        
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            get().handleMessage(data);
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };
        
        ws.onclose = () => {
          set({ ws: null, connected: false });
          console.log('WebSocket disconnected');
          
          // Attempt to reconnect
          const { reconnectAttempts, maxReconnectAttempts } = get();
          if (reconnectAttempts < maxReconnectAttempts) {
            setTimeout(() => {
              set({ reconnectAttempts: reconnectAttempts + 1 });
              get().connect(url);
            }, 5000 * (reconnectAttempts + 1));
          }
        };
        
        ws.onerror = (error) => {
          console.error('WebSocket error:', error);
        };
        
        set({ ws });
      },
      
      disconnect: () => {
        const { ws } = get();
        if (ws) {
          ws.close();
          set({ ws: null, connected: false, reconnectAttempts: 0 });
        }
      },
      
      // Message handling
      handleMessage: (data) => {
        switch (data.type) {
          case 'stats_update':
            set((state) => ({
              liveStats: { ...state.liveStats, ...data.payload }
            }));
            break;
            
          case 'data_update':
            set((state) => ({
              liveUpdates: [data.payload, ...state.liveUpdates].slice(0, 100)
            }));
            break;
            
          case 'notification':
            // Handle notification
            break;
            
          default:
            console.log('Unknown message type:', data.type);
        }
      },
      
      // Send message
      sendMessage: (message) => {
        const { ws, connected } = get();
        if (ws && connected) {
          ws.send(JSON.stringify(message));
        }
      },
      
      // Clear updates
      clearUpdates: () => set({ liveUpdates: [] }),
    }),
    { name: 'realtime-store' }
  )
);
