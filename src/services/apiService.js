import axios from 'axios';
import { env } from '../config/env';

const api = axios.create({
  baseURL: env.apiBase,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Medical Devices API
export const medicalDevicesApi = {
  // Get all medical devices with filters
  getDevices: (params = {}) => api.get('/medical-devices', { params }),
  
  // Get single device
  getDevice: (id) => api.get(`/medical-devices/${id}`),
  
  // Create device
  createDevice: (data) => api.post('/medical-devices', data),
  
  // Update device
  updateDevice: (id, data) => api.put(`/medical-devices/${id}`, data),
  
  // Delete device
  deleteDevice: (id) => api.delete(`/medical-devices/${id}`),
  
  // Get categories
  getCategories: () => api.get('/medical-devices/categories'),
  
  // Get manufacturers
  getManufacturers: () => api.get('/medical-devices/manufacturers'),
  
  // Get low stock devices
  getLowStock: () => api.get('/medical-devices/low-stock'),
  
  // Get critical stock devices
  getCriticalStock: () => api.get('/medical-devices/critical-stock'),
  
  // Get devices expiring soon
  getExpiringSoon: () => api.get('/medical-devices/expiring-soon'),
  
  // Get stats
  getStats: () => api.get('/medical-devices/stats'),
};

// Pharmacy Orders API
export const pharmacyOrdersApi = {
  // Get all pharmacy orders
  getOrders: (params = {}) => api.get('/pharmacy-orders', { params }),
  
  // Get single order
  getOrder: (id) => api.get(`/pharmacy-orders/${id}`),
  
  // Create order
  createOrder: (data) => api.post('/pharmacy-orders', data),
  
  // Update order
  updateOrder: (id, data) => api.put(`/pharmacy-orders/${id}`, data),
  
  // Delete order
  deleteOrder: (id) => api.delete(`/pharmacy-orders/${id}`),
  
  // Get stats
  getStats: () => api.get('/pharmacy-orders/stats'),
  
  // Process order
  processOrder: (id) => api.post(`/pharmacy-orders/${id}/process`),
  
  // Complete order
  completeOrder: (id) => api.post(`/pharmacy-orders/${id}/complete`),
  
  // Cancel order
  cancelOrder: (id) => api.post(`/pharmacy-orders/${id}/cancel`),
};

// Medicines API
export const medicinesApi = {
  // Get all medicines
  getMedicines: (params = {}) => api.get('/medicines', { params }),
  
  // Get single medicine
  getMedicine: (id) => api.get(`/medicines/${id}`),
  
  // Create medicine
  createMedicine: (data) => api.post('/medicines', data),
  
  // Update medicine
  updateMedicine: (id, data) => api.put(`/medicines/${id}`, data),
  
  // Delete medicine
  deleteMedicine: (id) => api.delete(`/medicines/${id}`),
  
  // Get categories
  getCategories: () => api.get('/medicines/categories'),
  
  // Get manufacturers
  getManufacturers: () => api.get('/medicines/manufacturers'),
  
  // Get low stock medicines
  getLowStock: () => api.get('/medicines/low-stock'),
  
  // Get critical stock medicines
  getCriticalStock: () => api.get('/medicines/critical-stock'),
  
  // Get medicines expiring soon
  getExpiringSoon: () => api.get('/medicines/expiring-soon'),
  
  // Get stats
  getStats: () => api.get('/medicines/stats'),
};

// Video Carousel API (public list + admin CRUD)
export const videoCarouselApi = {
  // Public: list active videos, optionally by display page (home, doctors, about, etc.)
  list: (params = {}) => api.get('/video-carousel', { params }),
  // Admin: full list with filters and pagination
  adminList: (params = {}) => api.get('/video-carousel/admin', { params }),
  get: (id) => api.get(`/video-carousel/${id}`),
  create: (data) => api.post('/video-carousel', data),
  update: (id, data) => api.put(`/video-carousel/${id}`, data),
  delete: (id) => api.delete(`/video-carousel/${id}`),
  reorder: (order) => api.put('/video-carousel/reorder', { order }),
  toggleStatus: (id) => api.put(`/video-carousel/${id}/toggle-status`),
  toggleFeatured: (id) => api.put(`/video-carousel/${id}/toggle-featured`),
};

// Reports API (uses backend ReportController + dashboard for stats)
export const reportsApi = {
  appointments: (params = {}) => api.get('/reports/appointments', { params }),
  sales: (params = {}) => api.get('/reports/sales', { params }),
  labTests: (params = {}) => api.get('/reports/lab-tests', { params }),
  users: (params = {}) => api.get('/reports/users', { params }),
};

// Dashboard stats (for report summaries when reports API doesn't have endpoint)
export const dashboardApi = {
  stats: () => api.get('/dashboard/stats'),
  revenue: (params = {}) => api.get('/dashboard/revenue', { params }),
  activities: () => api.get('/dashboard/activities'),
};

// Appointments list (for appointment reports)
export const appointmentsApi = {
  list: (params = {}) => api.get('/appointments', { params }),
};

// Orders list (for sales/financial reports)
export const ordersApi = {
  list: (params = {}) => api.get('/orders', { params }),
};

// Export default API instance
export default api;
