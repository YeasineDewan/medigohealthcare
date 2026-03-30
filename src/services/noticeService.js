import { api } from './api';

export const noticeService = {
  // Get all active notices and offers
  getActiveNotices: async () => {
    try {
      const response = await api.get('/notices/active');
      console.log('Notices API response:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching notices:', error);
      console.log('Using fallback notices data');
      // Return fallback notices for development
      const fallbackNotices = [
        {
          id: 1,
          text: "🎉 Special Offer: 20% off on all health checkups this month!",
          type: "offer",
          priority: "high",
          isActive: true,
          startDate: "2024-01-01",
          endDate: "2024-12-31"
        },
        {
          id: 2,
          text: "📢 New: Online doctor consultations now available 24/7",
          type: "notice",
          priority: "medium",
          isActive: true,
          startDate: "2024-01-01",
          endDate: "2024-12-31"
        },
        {
          id: 3,
          text: "🏥 Health Card members get exclusive discounts on lab tests",
          type: "offer",
          priority: "medium",
          isActive: true,
          startDate: "2024-01-01",
          endDate: "2024-12-31"
        },
        {
          id: 4,
          text: "💊 Free medicine delivery for orders above 1000 BDT",
          type: "notice",
          priority: "low",
          isActive: true,
          startDate: "2024-01-01",
          endDate: "2024-12-31"
        }
      ];
      console.log('Returning fallback notices:', fallbackNotices);
      return fallbackNotices;
    }
  },

  // Admin: Create new notice
  createNotice: async (noticeData) => {
    try {
      const response = await api.post('/admin/notices', noticeData);
      return response.data;
    } catch (error) {
      console.error('Error creating notice:', error);
      throw error;
    }
  },

  // Admin: Update notice
  updateNotice: async (id, noticeData) => {
    try {
      const response = await api.put(`/admin/notices/${id}`, noticeData);
      return response.data;
    } catch (error) {
      console.error('Error updating notice:', error);
      throw error;
    }
  },

  // Admin: Delete notice
  deleteNotice: async (id) => {
    try {
      const response = await api.delete(`/admin/notices/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting notice:', error);
      throw error;
    }
  },

  // Admin: Get all notices (including inactive)
  getAllNotices: async () => {
    try {
      const response = await api.get('/admin/notices');
      return response.data;
    } catch (error) {
      console.error('Error fetching all notices:', error);
      throw error;
    }
  },

  // Admin: Toggle notice status
  toggleNoticeStatus: async (id) => {
    try {
      const response = await api.patch(`/admin/notices/${id}/toggle`);
      return response.data;
    } catch (error) {
      console.error('Error toggling notice status:', error);
      throw error;
    }
  }
};
