import axios from 'axios';
import { env } from '../config/env';

export const api = axios.create({
  baseURL: env.apiBase,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      console.warn('API request failed - network error or server unavailable');
    } else if (error.response.status >= 500) {
      console.warn(`API server error ${error.response.status}: ${error.config?.url}`);
    }
    return Promise.reject(error);
  }
);

// Menu APIs – data from your backend only (no mock fallback)
export const menuService = {
  getServices: () => api.get('/menus/services'),
  getEmergencyServices: () => api.get('/menus/emergency'),
};

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

