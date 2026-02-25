import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const labTestService = {
  // Get all lab tests with filters
  getLabTests: async (filters = {}) => {
    try {
      const params = new URLSearchParams();
      
      if (filters.category) params.append('category', filters.category);
      if (filters.search) params.append('search', filters.search);
      if (filters.popular) params.append('popular', 'true');
      if (filters.per_page) params.append('per_page', filters.per_page);
      
      const response = await axios.get(`${API_BASE_URL}/lab-tests?${params}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lab tests:', error);
      throw error;
    }
  },

  // Get single lab test details
  getLabTest: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/lab-tests/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching lab test:', error);
      throw error;
    }
  },

  // Create lab test booking
  createBooking: async (bookingData) => {
    try {
      const token = localStorage.getItem('auth_token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      
      const response = await axios.post(`${API_BASE_URL}/lab-test-bookings`, bookingData, config);
      return response.data;
    } catch (error) {
      console.error('Error creating booking:', error);
      throw error;
    }
  },

  // Get user's lab test bookings
  getBookings: async (filters = {}) => {
    try {
      const token = localStorage.getItem('auth_token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      
      const params = new URLSearchParams();
      if (filters.status) params.append('status', filters.status);
      if (filters.per_page) params.append('per_page', filters.per_page);
      
      const response = await axios.get(`${API_BASE_URL}/lab-test-bookings?${params}`, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching bookings:', error);
      throw error;
    }
  },

  // Get single booking details
  getBooking: async (id) => {
    try {
      const token = localStorage.getItem('auth_token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      };
      
      const response = await axios.get(`${API_BASE_URL}/lab-test-bookings/${id}`, config);
      return response.data;
    } catch (error) {
      console.error('Error fetching booking:', error);
      throw error;
    }
  },

  // Update booking
  updateBooking: async (id, updateData) => {
    try {
      const token = localStorage.getItem('auth_token');
      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      };
      
      const response = await axios.put(`${API_BASE_URL}/lab-test-bookings/${id}`, updateData, config);
      return response.data;
    } catch (error) {
      console.error('Error updating booking:', error);
      throw error;
    }
  },
};

export default labTestService;
