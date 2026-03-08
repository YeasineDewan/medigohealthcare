import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const doctorProfileService = {
  // Get doctor profile
  getProfile: async (doctorId) => {
    const response = await api.get(`/doctors/${doctorId}/profile`);
    return response.data;
  },

  // Update personal information
  updatePersonalInfo: async (doctorId, data) => {
    const response = await api.put(`/doctors/${doctorId}/personal-info`, data);
    return response.data;
  },

  // Update professional information
  updateProfessionalInfo: async (doctorId, data) => {
    const response = await api.put(`/doctors/${doctorId}/professional-info`, data);
    return response.data;
  },

  // Update expertise information
  updateExpertiseInfo: async (doctorId, data) => {
    const response = await api.put(`/doctors/${doctorId}/expertise-info`, data);
    return response.data;
  },

  // Upload profile picture
  uploadProfilePicture: async (doctorId, file) => {
    const formData = new FormData();
    formData.append('profile_picture', file);
    const response = await api.post(`/doctors/${doctorId}/profile-picture`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  // Get profile statistics
  getProfileStats: async (doctorId) => {
    const response = await api.get(`/doctors/${doctorId}/stats`);
    return response.data;
  },

  // Update availability
  updateAvailability: async (doctorId, data) => {
    const response = await api.put(`/doctors/${doctorId}/availability`, data);
    return response.data;
  },
};

export default doctorProfileService;
