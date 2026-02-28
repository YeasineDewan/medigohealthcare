import axios from 'axios';

const API_BASE_URL = '/api/v1/settings';

const settingsApi = {
  // General Settings
  getGeneralSettings: async () => {
    const response = await axios.get(`${API_BASE_URL}/general`);
    return response.data;
  },
  
  updateGeneralSettings: async (data) => {
    const response = await axios.put(`${API_BASE_URL}/general`, data);
    return response.data;
  },
  
  // User Management
  getUsers: async (params = {}) => {
    const response = await axios.get(`${API_BASE_URL}/users`, { params });
    return response.data;
  },
  
  createUser: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/users`, data);
    return response.data;
  },
  
  updateUser: async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}/users/${id}`, data);
    return response.data;
  },
  
  deleteUser: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/users/${id}`);
    return response.data;
  },
  
  // Roles & Permissions
  getRolesPermissions: async () => {
    const response = await axios.get(`${API_BASE_URL}/roles-permissions`);
    return response.data;
  },
  
  createRole: async (data) => {
    const response = await axios.post(`${API_BASE_URL}/roles`, data);
    return response.data;
  },
  
  updateRolePermissions: async (id, data) => {
    const response = await axios.put(`${API_BASE_URL}/roles/${id}`, data);
    return response.data;
  },
  
  deleteRole: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/roles/${id}`);
    return response.data;
  },
  
  // System Configuration
  getSystemConfig: async () => {
    const response = await axios.get(`${API_BASE_URL}/system`);
    return response.data;
  },
  
  updateSystemConfig: async (data) => {
    const response = await axios.put(`${API_BASE_URL}/system`, data);
    return response.data;
  },
  
  generateApiKey: async (name) => {
    const response = await axios.post(`${API_BASE_URL}/system/api-key`, { name });
    return response.data;
  },
  
  deleteApiKey: async (key) => {
    const response = await axios.delete(`${API_BASE_URL}/system/api-key`, { data: { key } });
    return response.data;
  },
  
  toggleMaintenanceMode: async (enabled, message = '') => {
    const response = await axios.post(`${API_BASE_URL}/system/maintenance`, { enabled, message });
    return response.data;
  },
  
  clearCache: async () => {
    const response = await axios.post(`${API_BASE_URL}/system/clear-cache`);
    return response.data;
  },
  
  // Backup & Restore
  getBackups: async () => {
    const response = await axios.get(`${API_BASE_URL}/backups`);
    return response.data;
  },
  
  createBackup: async (type = 'full') => {
    const response = await axios.post(`${API_BASE_URL}/backups`, { type });
    return response.data;
  },
  
  updateBackupSchedule: async (data) => {
    const response = await axios.put(`${API_BASE_URL}/backups/schedule`, data);
    return response.data;
  },
  
  restoreBackup: async (id) => {
    const response = await axios.post(`${API_BASE_URL}/backups/${id}/restore`);
    return response.data;
  },
  
  deleteBackup: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/backups/${id}`);
    return response.data;
  },
  
  downloadBackup: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/backups/${id}/download`);
    return response.data;
  }
};

export default settingsApi;
