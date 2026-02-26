import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('adminToken');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Dashboard Services
export const dashboardService = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data;
  },
  
  getRecentAppointments: async () => {
    const response = await api.get('/dashboard/appointments/recent');
    return response.data;
  },
  
  getRevenueData: async (period = 'month') => {
    const response = await api.get(`/dashboard/revenue?period=${period}`);
    return response.data;
  },
};

// Account Management Services
export const accountService = {
  getGroups: async (params = {}) => {
    const response = await api.get('/accounts/groups', { params });
    return response.data;
  },
  
  createGroup: async (groupData) => {
    const response = await api.post('/accounts/groups', groupData);
    return response.data;
  },
  
  updateGroup: async (id, groupData) => {
    const response = await api.put(`/accounts/groups/${id}`, groupData);
    return response.data;
  },
  
  deleteGroup: async (id) => {
    const response = await api.delete(`/accounts/groups/${id}`);
    return response.data;
  },
  
  getLedgers: async (params = {}) => {
    const response = await api.get('/accounts/ledgers', { params });
    return response.data;
  },
  
  createLedger: async (ledgerData) => {
    const response = await api.post('/accounts/ledgers', ledgerData);
    return response.data;
  },
  
  updateLedger: async (id, ledgerData) => {
    const response = await api.put(`/accounts/ledgers/${id}`, ledgerData);
    return response.data;
  },
  
  deleteLedger: async (id) => {
    const response = await api.delete(`/accounts/ledgers/${id}`);
    return response.data;
  },
  
  getChartOfAccounts: async () => {
    const response = await api.get('/accounts/chart');
    return response.data;
  },
};

// HR Services
export const hrService = {
  getEmployees: async (params = {}) => {
    const response = await api.get('/hr/employees', { params });
    return response.data;
  },
  
  createEmployee: async (employeeData) => {
    const response = await api.post('/hr/employees', employeeData);
    return response.data;
  },
  
  updateEmployee: async (id, employeeData) => {
    const response = await api.put(`/hr/employees/${id}`, employeeData);
    return response.data;
  },
  
  deleteEmployee: async (id) => {
    const response = await api.delete(`/hr/employees/${id}`);
    return response.data;
  },
  
  getAttendance: async (params = {}) => {
    const response = await api.get('/hr/attendance', { params });
    return response.data;
  },
  
  markAttendance: async (attendanceData) => {
    const response = await api.post('/hr/attendance', attendanceData);
    return response.data;
  },
  
  getAttendanceReport: async (params = {}) => {
    const response = await api.get('/hr/attendance/report', { params });
    return response.data;
  },
};

// Report Services
export const reportService = {
  getPatientReports: async (params = {}) => {
    const response = await api.get('/reports/patients', { params });
    return response.data;
  },
  
  getDoctorReports: async (params = {}) => {
    const response = await api.get('/reports/doctors', { params });
    return response.data;
  },
  
  getFinancialReports: async (params = {}) => {
    const response = await api.get('/reports/financial', { params });
    return response.data;
  },
  
  generateReport: async (reportType, params = {}) => {
    const response = await api.post(`/reports/generate/${reportType}`, params);
    return response.data;
  },
  
  exportReport: async (reportType, format = 'pdf', params = {}) => {
    const response = await api.get(`/reports/export/${reportType}?format=${format}`, {
      params,
      responseType: 'blob'
    });
    return response.data;
  },
};

// Medical Services
export const medicalService = {
  getDiagnosticTests: async (params = {}) => {
    const response = await api.get('/medical/diagnostics', { params });
    return response.data;
  },
  
  createDiagnosticTest: async (testData) => {
    const response = await api.post('/medical/diagnostics', testData);
    return response.data;
  },
  
  updateDiagnosticTest: async (id, testData) => {
    const response = await api.put(`/medical/diagnostics/${id}`, testData);
    return response.data;
  },
  
  getPrescriptions: async (params = {}) => {
    const response = await api.get('/medical/prescriptions', { params });
    return response.data;
  },
  
  createPrescription: async (prescriptionData) => {
    const response = await api.post('/medical/prescriptions', prescriptionData);
    return response.data;
  },
  
  getMedicalHistory: async (patientId) => {
    const response = await api.get(`/medical/history/${patientId}`);
    return response.data;
  },
};

// Department Services
export const departmentService = {
  getDepartments: async () => {
    const response = await api.get('/departments');
    return response.data;
  },
  
  getDepartmentDetails: async (departmentId) => {
    const response = await api.get(`/departments/${departmentId}`);
    return response.data;
  },
  
  getDepartmentDoctors: async (departmentId) => {
    const response = await api.get(`/departments/${departmentId}/doctors`);
    return response.data;
  },
  
  getDepartmentPatients: async (departmentId) => {
    const response = await api.get(`/departments/${departmentId}/patients`);
    return response.data;
  },
  
  getDepartmentAppointments: async (departmentId) => {
    const response = await api.get(`/departments/${departmentId}/appointments`);
    return response.data;
  },
};

// Pharmacy Services
export const pharmacyService = {
  getMedicines: async (params = {}) => {
    const response = await api.get('/pharmacy/medicines', { params });
    return response.data;
  },
  
  createMedicine: async (medicineData) => {
    const response = await api.post('/pharmacy/medicines', medicineData);
    return response.data;
  },
  
  updateMedicine: async (id, medicineData) => {
    const response = await api.put(`/pharmacy/medicines/${id}`, medicineData);
    return response.data;
  },
  
  deleteMedicine: async (id) => {
    const response = await api.delete(`/pharmacy/medicines/${id}`);
    return response.data;
  },
  
  updateStock: async (id, stockData) => {
    const response = await api.put(`/pharmacy/medicines/${id}/stock`, stockData);
    return response.data;
  },
  
  getSuppliers: async () => {
    const response = await api.get('/pharmacy/suppliers');
    return response.data;
  },
};

// Laboratory Services
export const laboratoryService = {
  getLabTests: async (params = {}) => {
    const response = await api.get('/laboratory/tests', { params });
    return response.data;
  },
  
  createLabTest: async (testData) => {
    const response = await api.post('/laboratory/tests', testData);
    return response.data;
  },
  
  updateLabTest: async (id, testData) => {
    const response = await api.put(`/laboratory/tests/${id}`, testData);
    return response.data;
  },
  
  deleteLabTest: async (id) => {
    const response = await api.delete(`/laboratory/tests/${id}`);
    return response.data;
  },
  
  getTestCategories: async () => {
    const response = await api.get('/laboratory/categories');
    return response.data;
  },
  
  getLabResults: async (params = {}) => {
    const response = await api.get('/laboratory/results', { params });
    return response.data;
  },
};

// Settings Services
export const settingsService = {
  getSettings: async () => {
    const response = await api.get('/settings');
    return response.data;
  },
  
  updateSettings: async (settingsData) => {
    const response = await api.put('/settings', settingsData);
    return response.data;
  },
  
  getUsers: async (params = {}) => {
    const response = await api.get('/settings/users', { params });
    return response.data;
  },
  
  createUser: async (userData) => {
    const response = await api.post('/settings/users', userData);
    return response.data;
  },
  
  updateUser: async (id, userData) => {
    const response = await api.put(`/settings/users/${id}`, userData);
    return response.data;
  },
  
  deleteUser: async (id) => {
    const response = await api.delete(`/settings/users/${id}`);
    return response.data;
  },
  
  getRoles: async () => {
    const response = await api.get('/settings/roles');
    return response.data;
  },
  
  getPermissions: async () => {
    const response = await api.get('/settings/permissions');
    return response.data;
  },
};

// Utility Services
export const utilityService = {
  uploadFile: async (file, type = 'general') => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    
    const response = await api.post('/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  exportData: async (module, format = 'csv', params = {}) => {
    const response = await api.get(`/export/${module}?format=${format}`, {
      params,
      responseType: 'blob'
    });
    return response.data;
  },
  
  importData: async (module, file) => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post(`/import/${module}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },
  
  search: async (query, module = 'all') => {
    const response = await api.get(`/search?q=${query}&module=${module}`);
    return response.data;
  },
};

export default api;
