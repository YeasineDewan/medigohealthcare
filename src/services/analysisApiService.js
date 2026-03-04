import axios from 'axios';

// Create axios instance for analysis services
const analysisApi = axios.create({
  baseURL: '/api/v1/analysis',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor to add auth token
analysisApi.interceptors.request.use(
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
analysisApi.interceptors.response.use(
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

// Analysis Departments API
export const analysisDepartmentsApi = {
  // Get all departments
  getDepartments: (params = {}) => analysisApi.get('/departments', { params }),
  
  // Get single department
  getDepartment: (id) => analysisApi.get(`/departments/${id}`),
  
  // Create department
  createDepartment: (data) => analysisApi.post('/departments', data),
  
  // Update department
  updateDepartment: (id, data) => analysisApi.put(`/departments/${id}`, data),
  
  // Delete department
  deleteDepartment: (id) => analysisApi.delete(`/departments/${id}`),
  
  // Get department statistics
  getDepartmentStats: (id) => analysisApi.get(`/departments/${id}/stats`),
  
  // Get department staff
  getDepartmentStaff: (id) => analysisApi.get(`/departments/${id}/staff`),
  
  // Get department equipment
  getDepartmentEquipment: (id) => analysisApi.get(`/departments/${id}/equipment`),
};

// Tests/Services API
export const testsServicesApi = {
  // Get all tests
  getTests: (params = {}) => analysisApi.get('/tests', { params }),
  
  // Get single test
  getTest: (id) => analysisApi.get(`/tests/${id}`),
  
  // Create test
  createTest: (data) => analysisApi.post('/tests', data),
  
  // Update test
  updateTest: (id, data) => analysisApi.put(`/tests/${id}`, data),
  
  // Delete test
  deleteTest: (id) => analysisApi.delete(`/tests/${id}`),
  
  // Get test categories
  getTestCategories: () => analysisApi.get('/tests/categories'),
  
  // Get test by category
  getTestsByCategory: (category) => analysisApi.get(`/tests/category/${category}`),
  
  // Get test pricing
  getTestPricing: (id) => analysisApi.get(`/tests/${id}/pricing`),
  
  // Update test pricing
  updateTestPricing: (id, pricing) => analysisApi.put(`/tests/${id}/pricing`, pricing),
  
  // Get test requirements
  getTestRequirements: (id) => analysisApi.get(`/tests/${id}/requirements`),
  
  // Get test results template
  getTestResultsTemplate: (id) => analysisApi.get(`/tests/${id}/template`),
};

// Specimens API
export const specimensApi = {
  // Get all specimens
  getSpecimens: (params = {}) => analysisApi.get('/specimens', { params }),
  
  // Get single specimen
  getSpecimen: (id) => analysisApi.get(`/specimens/${id}`),
  
  // Create specimen
  createSpecimen: (data) => analysisApi.post('/specimens', data),
  
  // Update specimen
  updateSpecimen: (id, data) => analysisApi.put(`/specimens/${id}`, data),
  
  // Delete specimen
  deleteSpecimen: (id) => analysisApi.delete(`/specimens/${id}`),
  
  // Get specimen by status
  getSpecimensByStatus: (status) => analysisApi.get(`/specimens/status/${status}`),
  
  // Get specimen by type
  getSpecimensByType: (type) => analysisApi.get(`/specimens/type/${type}`),
  
  // Update specimen status
  updateSpecimenStatus: (id, status) => analysisApi.patch(`/specimens/${id}/status`, { status }),
  
  // Get specimen quality check
  getSpecimenQualityCheck: (id) => analysisApi.get(`/specimens/${id}/quality`),
  
  // Update specimen quality check
  updateSpecimenQualityCheck: (id, qualityData) => analysisApi.put(`/specimens/${id}/quality`, qualityData),
  
  // Get specimen tracking
  getSpecimenTracking: (id) => analysisApi.get(`/specimens/${id}/tracking`),
  
  // Update specimen location
  updateSpecimenLocation: (id, location) => analysisApi.patch(`/specimens/${id}/location`, { location }),
};

// Sample Collection API
export const sampleCollectionApi = {
  // Get all collections
  getCollections: (params = {}) => analysisApi.get('/collections', { params }),
  
  // Get single collection
  getCollection: (id) => analysisApi.get(`/collections/${id}`),
  
  // Create collection
  createCollection: (data) => analysisApi.post('/collections', data),
  
  // Update collection
  updateCollection: (id, data) => analysisApi.put(`/collections/${id}`, data),
  
  // Delete collection
  deleteCollection: (id) => analysisApi.delete(`/collections/${id}`),
  
  // Get collections by status
  getCollectionsByStatus: (status) => analysisApi.get(`/collections/status/${status}`),
  
  // Get collections by date
  getCollectionsByDate: (date) => analysisApi.get(`/collections/date/${date}`),
  
  // Get collections by room
  getCollectionsByRoom: (roomId) => analysisApi.get(`/collections/room/${roomId}`),
  
  // Update collection status
  updateCollectionStatus: (id, status) => analysisApi.patch(`/collections/${id}/status`, { status }),
  
  // Get collection schedule
  getCollectionSchedule: (params = {}) => analysisApi.get('/collections/schedule', { params }),
  
  // Schedule collection
  scheduleCollection: (data) => analysisApi.post('/collections/schedule', data),
  
  // Get collection statistics
  getCollectionStats: (params = {}) => analysisApi.get('/collections/stats', { params }),
  
  // Get collection reports
  getCollectionReports: (params = {}) => analysisApi.get('/collections/reports', { params }),
};

// Collection Rooms API
export const collectionRoomsApi = {
  // Get all rooms
  getRooms: (params = {}) => analysisApi.get('/rooms', { params }),
  
  // Get single room
  getRoom: (id) => analysisApi.get(`/rooms/${id}`),
  
  // Create room
  createRoom: (data) => analysisApi.post('/rooms', data),
  
  // Update room
  updateRoom: (id, data) => analysisApi.put(`/rooms/${id}`, data),
  
  // Delete room
  deleteRoom: (id) => analysisApi.delete(`/rooms/${id}`),
  
  // Get room availability
  getRoomAvailability: (roomId, date) => analysisApi.get(`/rooms/${roomId}/availability`, { params: { date } }),
  
  // Get room schedule
  getRoomSchedule: (roomId, params = {}) => analysisApi.get(`/rooms/${roomId}/schedule`, { params }),
  
  // Get room equipment
  getRoomEquipment: (roomId) => analysisApi.get(`/rooms/${roomId}/equipment`),
  
  // Update room equipment
  updateRoomEquipment: (roomId, equipment) => analysisApi.put(`/rooms/${roomId}/equipment`, { equipment }),
  
  // Get room supplies
  getRoomSupplies: (roomId) => analysisApi.get(`/rooms/${roomId}/supplies`),
  
  // Update room supplies
  updateRoomSupplies: (roomId, supplies) => analysisApi.put(`/rooms/${roomId}/supplies`, { supplies }),
  
  // Get room maintenance
  getRoomMaintenance: (roomId) => analysisApi.get(`/rooms/${roomId}/maintenance`),
  
  // Schedule room maintenance
  scheduleRoomMaintenance: (roomId, maintenance) => analysisApi.post(`/rooms/${roomId}/maintenance`, maintenance),
};

// Collection Staff API
export const collectionStaffApi = {
  // Get all staff
  getStaff: (params = {}) => analysisApi.get('/staff', { params }),
  
  // Get single staff member
  getStaffMember: (id) => analysisApi.get(`/staff/${id}`),
  
  // Create staff member
  createStaffMember: (data) => analysisApi.post('/staff', data),
  
  // Update staff member
  updateStaffMember: (id, data) => analysisApi.put(`/staff/${id}`, data),
  
  // Delete staff member
  deleteStaffMember: (id) => analysisApi.delete(`/staff/${id}`),
  
  // Get staff by room
  getStaffByRoom: (roomId) => analysisApi.get(`/staff/room/${roomId}`),
  
  // Get staff schedule
  getStaffSchedule: (staffId, params = {}) => analysisApi.get(`/staff/${staffId}/schedule`, { params }),
  
  // Update staff schedule
  updateStaffSchedule: (staffId, schedule) => analysisApi.put(`/staff/${staffId}/schedule`, { schedule }),
  
  // Get staff performance
  getStaffPerformance: (staffId, params = {}) => analysisApi.get(`/staff/${staffId}/performance`, { params }),
  
  // Get staff certifications
  getStaffCertifications: (staffId) => analysisApi.get(`/staff/${staffId}/certifications`),
  
  // Update staff certifications
  updateStaffCertifications: (staffId, certifications) => analysisApi.put(`/staff/${staffId}/certifications`, { certifications }),
  
  // Get staff training records
  getStaffTraining: (staffId) => analysisApi.get(`/staff/${staffId}/training`),
  
  // Add staff training record
  addStaffTraining: (staffId, training) => analysisApi.post(`/staff/${staffId}/training`, training),
};

// Analysis Reports API
export const analysisReportsApi = {
  // Get department performance report
  getDepartmentPerformance: (params = {}) => analysisApi.get('/reports/departments/performance', { params }),
  
  // Get test utilization report
  getTestUtilization: (params = {}) => analysisApi.get('/reports/tests/utilization', { params }),
  
  // Get specimen processing report
  getSpecimenProcessing: (params = {}) => analysisApi.get('/reports/specimens/processing', { params }),
  
  // Get collection efficiency report
  getCollectionEfficiency: (params = {}) => analysisApi.get('/reports/collections/efficiency', { params }),
  
  // Get quality metrics report
  getQualityMetrics: (params = {}) => analysisApi.get('/reports/quality/metrics', { params }),
  
  // Get revenue analysis report
  getRevenueAnalysis: (params = {}) => analysisApi.get('/reports/revenue/analysis', { params }),
  
  // Get workload distribution report
  getWorkloadDistribution: (params = {}) => analysisApi.get('/reports/workload/distribution', { params }),
  
  // Get patient satisfaction report
  getPatientSatisfaction: (params = {}) => analysisApi.get('/reports/satisfaction/patients', { params }),
  
  // Export reports
  exportReport: (type, params = {}) => analysisApi.get(`/reports/export/${type}`, { 
    params,
    responseType: 'blob'
  }),
};

// Analysis Settings API
export const analysisSettingsApi = {
  // Get system settings
  getSettings: () => analysisApi.get('/settings'),
  
  // Update system settings
  updateSettings: (settings) => analysisApi.put('/settings', settings),
  
  // Get test categories
  getTestCategories: () => analysisApi.get('/settings/test-categories'),
  
  // Update test categories
  updateTestCategories: (categories) => analysisApi.put('/settings/test-categories', { categories }),
  
  // Get specimen types
  getSpecimenTypes: () => analysisApi.get('/settings/specimen-types'),
  
  // Update specimen types
  updateSpecimenTypes: (types) => analysisApi.put('/settings/specimen-types', { types }),
  
  // Get collection procedures
  getCollectionProcedures: () => analysisApi.get('/settings/collection-procedures'),
  
  // Update collection procedures
  updateCollectionProcedures: (procedures) => analysisApi.put('/settings/collection-procedures', { procedures }),
  
  // Get quality standards
  getQualityStandards: () => analysisApi.get('/settings/quality-standards'),
  
  // Update quality standards
  updateQualityStandards: (standards) => analysisApi.put('/settings/quality-standards', { standards }),
  
  // Get notification settings
  getNotificationSettings: () => analysisApi.get('/settings/notifications'),
  
  // Update notification settings
  updateNotificationSettings: (settings) => analysisApi.put('/settings/notifications', settings),
};

// Analysis Dashboard API
export const analysisDashboardApi = {
  // Get dashboard statistics
  getDashboardStats: (params = {}) => analysisApi.get('/dashboard/stats', { params }),
  
  // Get recent activity
  getRecentActivity: (limit = 10) => analysisApi.get(`/dashboard/activity?limit=${limit}`),
  
  // Get upcoming collections
  getUpcomingCollections: (limit = 5) => analysisApi.get(`/dashboard/upcoming?limit=${limit}`),
  
  // Get pending specimens
  getPendingSpecimens: (limit = 5) => analysisApi.get(`/dashboard/pending?limit=${limit}`),
  
  // Get alerts
  getAlerts: (limit = 10) => analysisApi.get(`/dashboard/alerts?limit=${limit}`),
  
  // Get performance metrics
  getPerformanceMetrics: (params = {}) => analysisApi.get('/dashboard/performance', { params }),
  
  // Get workload overview
  getWorkloadOverview: (params = {}) => analysisApi.get('/dashboard/workload', { params }),
};

// Export all APIs
export default {
  analysisDepartmentsApi,
  testsServicesApi,
  specimensApi,
  sampleCollectionApi,
  collectionRoomsApi,
  collectionStaffApi,
  analysisReportsApi,
  analysisSettingsApi,
  analysisDashboardApi,
};
