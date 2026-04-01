// Admin Service for healthcare management operations
import apiService from './apiService';

class AdminService {
  // Dashboard operations
  async getDashboardStats() {
    try {
      return await apiService.get('/admin/dashboard/stats');
    } catch (error) {
      // Return mock data for development
      return {
        totalPatients: 2847,
        totalDoctors: 156,
        todayAppointments: 42,
        monthlyRevenue: 125430,
        totalOrders: 892,
        totalProducts: 1247,
        pendingReports: 18,
        totalNotices: 12,
        totalBanners: 8,
        labTests: 156,
        emergencyCases: 7,
        activeCampaigns: 3,
        totalEmployees: 89,
        inventoryValue: 284750,
        satisfactionRate: 94.5,
        bedOccupancy: 78.3,
        avgWaitTime: 12,
        systemUptime: 99.9
      };
    }
  }

  async getRecentActivity() {
    try {
      return await apiService.get('/admin/dashboard/activity');
    } catch (error) {
      // Return mock data for development
      return [
        {
          id: 1,
          user: 'Dr. Sarah Johnson',
          action: 'Completed patient consultation',
          time: '2 minutes ago',
          type: 'appointment',
          status: 'completed',
          department: 'Cardiology',
          priority: 'normal'
        },
        {
          id: 2,
          user: 'John Smith',
          action: 'Placed order for medicines',
          time: '5 minutes ago',
          type: 'order',
          status: 'processing',
          amount: '$125.50',
          department: 'Pharmacy'
        },
        {
          id: 3,
          user: 'Nurse Emily Davis',
          action: 'Updated lab test results',
          time: '12 minutes ago',
          type: 'lab',
          status: 'completed',
          department: 'Laboratory',
          priority: 'high'
        }
      ];
    }
  }

  // User management
  async getUsers(type = 'all') {
    try {
      return await apiService.get(`/admin/users?type=${type}`);
    } catch (error) {
      // Return mock data
      return {
        data: [
          { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah@medigo.com', role: 'doctor', department: 'Cardiology', status: 'active' },
          { id: 2, name: 'Dr. Michael Chen', email: 'michael@medigo.com', role: 'doctor', department: 'Neurology', status: 'active' },
          { id: 3, name: 'Alice Johnson', email: 'alice@medigo.com', role: 'patient', department: 'General', status: 'active' },
        ],
        total: 3
      };
    }
  }

  // Appointments
  async getAppointments(filters = {}) {
    try {
      const queryString = new URLSearchParams(filters).toString();
      return await apiService.get(`/admin/appointments?${queryString}`);
    } catch (error) {
      // Return mock data
      return {
        data: [
          { id: 1, patient: 'Alice Johnson', doctor: 'Dr. Smith', time: '09:00 AM', type: 'Consultation', department: 'Cardiology', status: 'scheduled' },
          { id: 2, patient: 'Bob Williams', doctor: 'Dr. Davis', time: '09:30 AM', type: 'Follow-up', department: 'Orthopedics', status: 'scheduled' },
        ],
        total: 2
      };
    }
  }

  // Laboratory
  async getLabTests() {
    try {
      return await apiService.get('/admin/lab/tests');
    } catch (error) {
      // Return mock data
      return {
        data: [
          { id: 1, name: 'Blood Test', category: 'Routine', price: 50, duration: '30 mins', status: 'active' },
          { id: 2, name: 'X-Ray', category: 'Imaging', price: 150, duration: '45 mins', status: 'active' },
        ],
        total: 2
      };
    }
  }

  // Pharmacy
  async getPharmacyProducts() {
    try {
      return await apiService.get('/admin/pharmacy/products');
    } catch (error) {
      // Return mock data
      return {
        data: [
          { id: 1, name: 'Paracetamol', category: 'Medicine', price: 5.99, stock: 100, status: 'available' },
          { id: 2, name: 'Bandages', category: 'First Aid', price: 12.99, stock: 50, status: 'available' },
        ],
        total: 2
      };
    }
  }

  // Reports
  async getReports(type, filters = {}) {
    try {
      const queryString = new URLSearchParams(filters).toString();
      return await apiService.get(`/admin/reports/${type}?${queryString}`);
    } catch (error) {
      // Return mock data
      return {
        data: [],
        total: 0,
        summary: {
          totalRevenue: 125430,
          totalPatients: 2847,
          totalAppointments: 42,
          growth: '+12.5%'
        }
      };
    }
  }
}

const adminService = new AdminService();

// Export specific services
export const dashboardService = {
  getStats: () => adminService.getDashboardStats(),
  getActivity: () => adminService.getRecentActivity(),
  getHealth: () => apiService.get('/admin/dashboard/health'),
};

export const hrService = {
  getEmployees: () => adminService.getUsers('employees'),
  getAttendance: () => apiService.get('/admin/hr/attendance'),
  getPayroll: () => apiService.get('/admin/hr/payroll'),
};

export default adminService;
