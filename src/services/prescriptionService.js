import axios from 'axios';

class PrescriptionService {
  constructor() {
    this.baseURL = '/api/v1/prescriptions';
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Cache management
  setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  getFromCache(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  clearCache() {
    this.cache.clear();
  }

  // Upload prescription for a customer
  async uploadPrescription(customerId, prescriptionData) {
    try {
      const formData = new FormData();
      
      // Add prescription image
      if (prescriptionData.image) {
        formData.append('prescriptionImage', prescriptionData.image);
      }
      
      // Add prescription details
      formData.append('customerId', customerId);
      formData.append('doctorName', prescriptionData.doctorName || '');
      formData.append('doctorLicense', prescriptionData.doctorLicense || '');
      formData.append('notes', prescriptionData.notes || '');
      formData.append('urgency', prescriptionData.urgency || 'normal');
      formData.append('deliveryMethod', prescriptionData.deliveryMethod || 'pickup');
      formData.append('preferredPharmacy', prescriptionData.preferredPharmacy || '');

      const response = await axios.post(`${this.baseURL}/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Clear cache for this customer
      this.cache.delete(`customer_${customerId}`);
      
      return {
        success: true,
        prescription: response.data
      };
    } catch (error) {
      console.error('Error uploading prescription:', error);
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to upload prescription'
      };
    }
  }

  // Get prescriptions by customer ID
  async getPrescriptionsByCustomerId(customerId) {
    try {
      // Check cache first
      const cacheKey = `customer_${customerId}`;
      const cachedData = this.getFromCache(cacheKey);
      if (cachedData) {
        return cachedData;
      }

      const response = await axios.get(`${this.baseURL}/customer/${customerId}`);
      
      // Cache the result
      this.setCache(cacheKey, response.data);
      
      return response.data;
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
      throw new Error('Failed to fetch prescriptions');
    }
  }

  // Get prescription by ID
  async getPrescriptionById(prescriptionId) {
    try {
      const response = await axios.get(`${this.baseURL}/${prescriptionId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching prescription:', error);
      throw new Error('Failed to fetch prescription');
    }
  }

  // Update prescription status
  async updatePrescriptionStatus(prescriptionId, status, pharmacistId, notes = '') {
    try {
      const response = await axios.patch(`${this.baseURL}/${prescriptionId}/status`, {
        status,
        pharmacistId,
        notes,
        updatedAt: new Date().toISOString()
      });

      // Clear relevant cache
      const prescription = await this.getPrescriptionById(prescriptionId);
      if (prescription.customerId) {
        this.cache.delete(`customer_${prescription.customerId}`);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error updating prescription status:', error);
      throw new Error('Failed to update prescription status');
    }
  }

  // Process prescription into order
  async processPrescription(prescriptionId, orderData) {
    try {
      const response = await axios.post(`${this.baseURL}/${prescriptionId}/process`, {
        ...orderData,
        processedAt: new Date().toISOString()
      });

      // Clear cache
      const prescription = await this.getPrescriptionById(prescriptionId);
      if (prescription.customerId) {
        this.cache.delete(`customer_${prescription.customerId}`);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error processing prescription:', error);
      throw new Error('Failed to process prescription');
    }
  }

  // Get prescription analytics
  async getPrescriptionAnalytics(dateRange = '30d') {
    try {
      const response = await axios.get(`${this.baseURL}/analytics?range=${dateRange}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching analytics:', error);
      // Return default analytics if API fails
      return {
        totalPrescriptions: 0,
        recentPrescriptions: 0,
        statusBreakdown: {
          pending_verification: 0,
          verified: 0,
          processing: 0,
          completed: 0,
          rejected: 0
        },
        urgencyBreakdown: {
          normal: 0,
          urgent: 0
        },
        deliveryMethodBreakdown: {
          pickup: 0,
          delivery: 0,
          courier: 0
        },
        averageProcessingTime: '0 hours',
        rejectionRate: 0,
        dateRange: dateRange
      };
    }
  }

  // Search prescriptions
  async searchPrescriptions(query, filters = {}) {
    try {
      const params = new URLSearchParams({
        q: query || '',
        ...filters
      });
      
      const response = await axios.get(`${this.baseURL}/search?${params}`);
      return response.data || [];
    } catch (error) {
      console.error('Error searching prescriptions:', error);
      // Return empty array instead of throwing error
      return [];
    }
  }

  // Delete prescription (admin only)
  async deletePrescription(prescriptionId, reason = '') {
    try {
      const response = await axios.delete(`${this.baseURL}/${prescriptionId}`, {
        data: { reason }
      });

      // Clear cache
      const prescription = await this.getPrescriptionById(prescriptionId);
      if (prescription.customerId) {
        this.cache.delete(`customer_${prescription.customerId}`);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error deleting prescription:', error);
      throw new Error('Failed to delete prescription');
    }
  }

  // Validate prescription image
  validatePrescriptionImage(file) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    
    if (!allowedTypes.includes(file.type)) {
      return {
        valid: false,
        error: 'Invalid file type. Please upload JPG, PNG, or WebP images.'
      };
    }
    
    if (file.size > maxSize) {
      return {
        valid: false,
        error: 'File size too large. Please upload an image smaller than 10MB.'
      };
    }
    
    return { valid: true };
  }

  // Extract text from prescription image (OCR simulation)
  async extractPrescriptionText(imageFile) {
    try {
      const formData = new FormData();
      formData.append('image', imageFile);
      
      const response = await axios.post(`${this.baseURL}/ocr`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      return response.data;
    } catch (error) {
      console.error('Error extracting text from prescription:', error);
      throw new Error('Failed to extract text from prescription');
    }
  }
}

export default new PrescriptionService();
