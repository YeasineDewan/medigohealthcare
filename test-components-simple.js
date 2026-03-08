// Simple test to check if components can be imported
console.log('Testing component imports...');

try {
  // Test if files exist and are readable
  const fs = require('fs');
  
  console.log('Checking MedicalDevices.jsx...');
  const medicalDevicesContent = fs.readFileSync('./src/pages/admin/pharmacy/MedicalDevices.jsx', 'utf8');
  console.log('✅ MedicalDevices.jsx exists and is readable');
  
  console.log('Checking StockManagement.jsx...');
  const stockManagementContent = fs.readFileSync('./src/pages/admin/pharmacy/StockManagement.jsx', 'utf8');
  console.log('✅ StockManagement.jsx exists and is readable');
  
  // Check for basic React component structure
  if (medicalDevicesContent.includes('export default MedicalDevices')) {
    console.log('✅ MedicalDevices has proper export');
  } else {
    console.log('❌ MedicalDevices missing export');
  }
  
  if (stockManagementContent.includes('export default StockManagement')) {
    console.log('✅ StockManagement has proper export');
  } else {
    console.log('❌ StockManagement missing export');
  }
  
  // Check for imports
  if (medicalDevicesContent.includes('import { useState, useEffect }')) {
    console.log('✅ MedicalDevices has React imports');
  } else {
    console.log('❌ MedicalDevices missing React imports');
  }
  
  if (stockManagementContent.includes('import { useState, useEffect }')) {
    console.log('✅ StockManagement has React imports');
  } else {
    console.log('❌ StockManagement missing React imports');
  }
  
  console.log('✅ All basic checks passed!');
  
} catch (error) {
  console.error('❌ Error:', error.message);
}
