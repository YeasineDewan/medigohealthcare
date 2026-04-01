// API Service for admin operations
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    // Add auth token if available
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
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
