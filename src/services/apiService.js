// API Service for admin operations
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Check if backend is available
const isBackendAvailable = API_BASE_URL && !API_BASE_URL.includes('localhost:8000');

// Import mock API for development
import mockApiService from './mockApi.js';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
    this.useMock = !isBackendAvailable;
  }

  async request(endpoint, options = {}) {
    // Use mock API if backend is not available
    if (this.useMock) {
      return mockApiService.request(endpoint, options);
    }

    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        ...options.headers
      },
      ...options
    };
    
    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        // Handle HTTP errors gracefully
        const errorText = await response.text();
        console.error(`HTTP ${response.status}:`, errorText);
        
        // Check if it's an HTML error page (404, 500, etc.)
        if (errorText.includes('<!DOCTYPE') || errorText.includes('<html')) {
          throw new Error(`API endpoint not found: ${endpoint}`);
        }
        
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      // Check if response is JSON before parsing
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        // Handle non-JSON responses
        const text = await response.text();
        console.warn('Non-JSON response received:', text);
        throw new Error('Invalid response format');
      }
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  async get(endpoint, params = {}) {
    const url = new URL(`${this.baseURL}${endpoint}`);
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined) {
        url.searchParams.append(key, params[key]);
      }
    });
    return this.request(url.pathname + url.search);
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

const apiService = new ApiService();

// Reports API
export const reportsApi = {
  getReports: (type) => apiService.get(`/reports/${type}`),
  generateReport: (type, params) => apiService.post(`/reports/${type}/generate`, params),
  exportReport: (type, format) => apiService.get(`/reports/${type}/export?format=${format}`),
};

// Medical Devices API
export const medicalDevicesApi = {
  getDevices: () => apiService.get('/medical-devices'),
  createDevice: (device) => apiService.post('/medical-devices', device),
  updateDevice: (id, device) => apiService.put(`/medical-devices/${id}`, device),
  deleteDevice: (id) => apiService.delete(`/medical-devices/${id}`),
};

// Pharmacy Orders API
export const pharmacyOrdersApi = {
  getOrders: () => apiService.get('/pharmacy-orders'),
  createOrder: (order) => apiService.post('/pharmacy-orders', order),
  updateOrder: (id, order) => apiService.put(`/pharmacy-orders/${id}`, order),
  deleteOrder: (id) => apiService.delete(`/pharmacy-orders/${id}`),
};

// Video Carousel API
export const videoCarouselApi = {
  getVideos: () => apiService.get('/video-carousel'),
  adminList: (params) => apiService.get('/video-carousel/admin', params),
  createVideo: (video) => apiService.post('/video-carousel', video),
  updateVideo: (id, video) => apiService.put(`/video-carousel/${id}`, video),
  deleteVideo: (id) => apiService.delete(`/video-carousel/${id}`),
};

// Dashboard API
export const dashboardApi = {
  getAdminDashboard: () => apiService.get('/dashboard/admin'),
  getDoctorDashboard: () => apiService.get('/dashboard/doctor'),
  getPatientDashboard: () => apiService.get('/dashboard/patient'),
  getSystemStats: () => apiService.get('/dashboard/system-stats'),
  getRealTimeStats: () => apiService.get('/dashboard/real-time-stats'),
};

export default apiService;
