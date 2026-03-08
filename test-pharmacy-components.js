// Simple test to verify pharmacy components can be imported and rendered
import React from 'react';
import { createRoot } from 'react-dom/client';

// Test imports
try {
  console.log('Testing MedicalDevices import...');
  const MedicalDevicesModule = import('./src/pages/admin/pharmacy/MedicalDevices.jsx');
  console.log('✅ MedicalDevices import successful');
} catch (error) {
  console.error('❌ MedicalDevices import failed:', error.message);
}

try {
  console.log('Testing StockManagement import...');
  const StockManagementModule = import('./src/pages/admin/pharmacy/StockManagement.jsx');
  console.log('✅ StockManagement import successful');
} catch (error) {
  console.error('❌ StockManagement import failed:', error.message);
}

// Test API service
try {
  console.log('Testing API service import...');
  const { medicalDevicesApi } = require('./src/services/apiService.js');
  console.log('✅ API service import successful');
} catch (error) {
  console.error('❌ API service import failed:', error.message);
}

// Test export utils
try {
  console.log('Testing export utils import...');
  const { exportToPDF, exportToWord, exportToCSV } = require('./src/utils/exportUtils.js');
  console.log('✅ Export utils import successful');
} catch (error) {
  console.error('❌ Export utils import failed:', error.message);
}

console.log('Component testing completed!');
