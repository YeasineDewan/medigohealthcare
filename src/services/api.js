import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

export const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000, // 10 second timeout
});

// Add request interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle network errors gracefully
    if (!error.response) {
      console.warn('API request failed - network error or server unavailable');
    }
    return Promise.reject(error);
  }
);

// Menu APIs
export const menuService = {
  getServices: () => api.get('/menus/services'),
  getEmergencyServices: () => api.get('/menus/emergency'),
};

// Fallback menu data when API is unavailable
export const fallbackServices = [
  { id: 1, title: 'Specialist Doctor', slug: 'specialist-doctor', icon: 'stethoscope', route_url: '/doctors', description: 'Book appointments with specialists' },
  { id: 2, title: 'Video Consultation', slug: 'video-consultation', icon: 'video', route_url: '/consult', description: 'Online video calls with doctors' },
  { id: 3, title: 'Pharmacy', slug: 'pharmacy', icon: 'pill', route_url: '/pharmacy', description: 'Order medicines online' },
  { id: 4, title: 'Lab Tests', slug: 'lab-tests', icon: 'flask', route_url: '/lab-tests', description: 'Home collection & reports' },
  { id: 5, title: 'Health Records', slug: 'health-records', icon: 'folder', route_url: '/records', description: 'Your medical history' },
];

export const fallbackEmergencyServices = [
  { id: 1, title: 'Ambulance Request', description: 'Live Tracking', icon: 'ambulance', bg_color_hex: '#FEE2E2' },
  { id: 2, title: 'Emergency Doctor', description: '24/7 Available', icon: 'phone-call', bg_color_hex: '#FEE2E2' },
  { id: 3, title: 'Blood Bank', description: 'Find Donors', icon: 'droplet', bg_color_hex: '#FEE2E2' },
];

// Product Category APIs
export const categoryService = {
  getAll: (params) => api.get('/categories', { params }),
  getById: (id) => api.get(`/categories/${id}`),
  getCategoryProducts: (id, params) => api.get(`/categories/${id}`, { params }),
  create: (data) => api.post('/categories', data),
  update: (id, data) => api.put(`/categories/${id}`, data),
  delete: (id) => api.delete(`/categories/${id}`),
};

// Product APIs
export const productService = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  getRelated: (id) => api.get(`/products/${id}/related`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
};

// Order APIs
export const orderService = {
  getAll: (params) => api.get('/orders', { params }),
  getById: (id) => api.get(`/orders/${id}`),
  create: (data) => api.post('/orders', data),
  update: (id, data) => api.put(`/orders/${id}`, data),
};

// Prescription Upload API
export const prescriptionService = {
  upload: (formData) => api.post('/prescriptions', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
};

