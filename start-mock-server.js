import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 8000;

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Mock data
const mockData = {
  banners: [
    {
      id: 1,
      title: 'Complete Healthcare Solution',
      subtitle: 'From consultations to medicines, we\'ve got you covered 24/7',
      description: 'Experience seamless healthcare with our integrated platform featuring expert doctors and emergency services',
      image: '/banners/healthcare-hero.jpg',
      backgroundColor: 'from-emerald-600 via-teal-600 to-cyan-700',
      features: ['Video Consultations', 'Medicine Delivery', 'Lab Tests at Home', '24/7 Emergency'],
      active: true
    },
    {
      id: 2,
      title: 'Expert Doctors at Your Fingertips',
      subtitle: 'Connect with certified specialists in seconds',
      description: 'Get medical advice from comfort of your home with our trusted healthcare professionals',
      image: '/banners/doctor-consultation.jpg',
      backgroundColor: 'from-blue-600 via-indigo-600 to-purple-700',
      features: ['1000+ Doctors', '24/7 Availability', 'Instant Consultations', 'Emergency Care'],
      active: true
    },
    {
      id: 3,
      title: 'Fast Medicine Delivery',
      subtitle: 'Order medicines online and get them delivered within hours',
      description: 'Your neighborhood pharmacy, now online and faster with emergency support available',
      image: '/banners/pharmacy-delivery.jpg',
      backgroundColor: 'from-green-600 via-emerald-600 to-teal-700',
      features: ['Same Day Delivery', 'Genuine Medicines', 'Prescription Upload', 'Emergency Support'],
      active: true
    }
  ],
  services: [
    {
      id: 1,
      title: 'Doctor Consultation',
      description: 'Book appointments with specialist doctors',
      icon: 'stethoscope',
      slug: 'doctor-consultation',
      route_url: '/services/doctor-consultation',
      children: [
        {
          id: 11,
          title: 'General Medicine',
          slug: 'general-medicine',
          route_url: '/services/general-medicine',
          description: 'Primary care and general health consultations'
        },
        {
          id: 12,
          title: 'Cardiology',
          slug: 'cardiology',
          route_url: '/services/cardiology',
          description: 'Heart and cardiovascular care'
        },
        {
          id: 13,
          title: 'Neurology',
          slug: 'neurology',
          route_url: '/services/neurology',
          description: 'Brain and nervous system care'
        },
        {
          id: 14,
          title: 'Pediatrics',
          slug: 'pediatrics',
          route_url: '/services/pediatrics',
          description: 'Children healthcare services'
        }
      ]
    },
    {
      id: 2,
      title: 'Telemedicine',
      description: 'Online doctor consultations from home',
      icon: 'video',
      slug: 'telemedicine',
      route_url: '/services/telemedicine',
      children: [
        {
          id: 21,
          title: 'Video Consultation',
          slug: 'video-consultation',
          route_url: '/services/video-consultation',
          description: 'Face-to-face online consultations'
        },
        {
          id: 22,
          title: 'Phone Consultation',
          slug: 'phone-consultation',
          route_url: '/services/phone-consultation',
          description: 'Audio-only consultations'
        },
        {
          id: 23,
          title: 'Chat Consultation',
          slug: 'chat-consultation',
          route_url: '/services/chat-consultation',
          description: 'Text-based medical advice'
        }
      ]
    },
    {
      id: 3,
      title: 'Pharmacy',
      description: 'Order medicines and health products',
      icon: 'pill',
      slug: 'pharmacy',
      route_url: '/pharmacy',
      children: [
        {
          id: 31,
          title: 'Prescription Medicines',
          slug: 'prescription-medicines',
          route_url: '/pharmacy/prescription',
          description: 'Order medicines with prescription'
        },
        {
          id: 32,
          title: 'OTC Products',
          slug: 'otc-products',
          route_url: '/pharmacy/otc',
          description: 'Over-the-counter medicines'
        },
        {
          id: 33,
          title: 'Health Supplements',
          slug: 'health-supplements',
          route_url: '/pharmacy/supplements',
          description: 'Vitamins and dietary supplements'
        },
        {
          id: 34,
          title: 'Medical Devices',
          slug: 'medical-devices',
          route_url: '/pharmacy/devices',
          description: 'Home medical equipment'
        }
      ]
    },
    {
      id: 4,
      title: 'Lab Tests',
      description: 'Book diagnostic tests and checkups',
      icon: 'flask',
      slug: 'lab-tests',
      route_url: '/services/lab-tests',
      children: [
        {
          id: 41,
          title: 'Blood Tests',
          slug: 'blood-tests',
          route_url: '/lab/blood-tests',
          description: 'Complete blood count and more'
        },
        {
          id: 42,
          title: 'Imaging Services',
          slug: 'imaging-services',
          route_url: '/lab/imaging',
          description: 'X-ray, CT, MRI scans'
        },
        {
          id: 43,
          title: 'Pathology Tests',
          slug: 'pathology-tests',
          route_url: '/lab/pathology',
          description: 'Tissue and cell analysis'
        },
        {
          id: 44,
          title: 'Health Checkup Packages',
          slug: 'health-packages',
          route_url: '/lab/packages',
          description: 'Comprehensive health screening'
        }
      ]
    },
    {
      id: 5,
      title: 'Health Checkup',
      description: 'Comprehensive health screening packages',
      icon: 'heart',
      slug: 'health-checkup',
      route_url: '/services/health-checkup',
      children: [
        {
          id: 51,
          title: 'Basic Health Package',
          slug: 'basic-package',
          route_url: '/checkup/basic',
          description: 'Essential health screening'
        },
        {
          id: 52,
          title: 'Executive Health Package',
          slug: 'executive-package',
          route_url: '/checkup/executive',
          description: 'Comprehensive executive checkup'
        },
        {
          id: 53,
          title: 'Women Health Package',
          slug: 'women-package',
          route_url: '/checkup/women',
          description: 'Specialized women health screening'
        },
        {
          id: 54,
          title: 'Senior Citizen Package',
          slug: 'senior-package',
          route_url: '/checkup/senior',
          description: 'Age-specific health screening'
        }
      ]
    },
    {
      id: 6,
      title: 'Emergency Care',
      description: '24/7 emergency medical services',
      icon: 'activity',
      slug: 'emergency-care',
      route_url: '/emergency',
      children: [
        {
          id: 61,
          title: 'Emergency Room',
          slug: 'emergency-room',
          route_url: '/emergency/room',
          description: '24/7 emergency medical care'
        },
        {
          id: 62,
          title: 'Trauma Care',
          slug: 'trauma-care',
          route_url: '/emergency/trauma',
          description: 'Specialized trauma treatment'
        },
        {
          id: 63,
          title: 'Critical Care',
          slug: 'critical-care',
          route_url: '/emergency/critical',
          description: 'ICU and critical care services'
        }
      ]
    },
    {
      id: 7,
      title: 'Vaccination',
      description: 'Immunization and vaccine services',
      icon: 'syringe',
      slug: 'vaccination',
      route_url: '/services/vaccination',
      children: [
        {
          id: 71,
          title: 'Child Vaccination',
          slug: 'child-vaccination',
          route_url: '/vaccination/child',
          description: 'Immunization for children'
        },
        {
          id: 72,
          title: 'Adult Vaccination',
          slug: 'adult-vaccination',
          route_url: '/vaccination/adult',
          description: 'Vaccines for adults'
        },
        {
          id: 73,
          title: 'Travel Vaccination',
          slug: 'travel-vaccination',
          route_url: '/vaccination/travel',
          description: 'Travel-specific vaccines'
        },
        {
          id: 74,
          title: 'COVID-19 Vaccination',
          slug: 'covid-vaccination',
          route_url: '/vaccination/covid',
          description: 'COVID-19 vaccine services'
        }
      ]
    },
    {
      id: 8,
      title: 'Medical Records',
      description: 'Access and manage your health records',
      icon: 'folder',
      slug: 'medical-records',
      route_url: '/services/medical-records',
      children: [
        {
          id: 81,
          title: 'Personal Health Records',
          slug: 'personal-records',
          route_url: '/records/personal',
          description: 'Your personal medical history'
        },
        {
          id: 82,
          title: 'Test Reports',
          slug: 'test-reports',
          route_url: '/records/tests',
          description: 'Lab and diagnostic reports'
        },
        {
          id: 83,
          title: 'Prescription History',
          slug: 'prescription-history',
          route_url: '/records/prescriptions',
          description: 'Your prescription records'
        },
        {
          id: 84,
          title: 'Insurance Records',
          slug: 'insurance-records',
          route_url: '/records/insurance',
          description: 'Insurance claim history'
        }
      ]
    }
  ],
  emergency: [
    {
      id: 1,
      title: 'Emergency Hotline',
      description: '24/7 Emergency Support',
      phone: '+1-800-555-0123',
      icon: 'phone'
    },
    {
      id: 2,
      title: 'Ambulance Service',
      description: 'Quick ambulance dispatch',
      phone: '+1-800-555-0124',
      icon: 'ambulance'
    }
  ]
};

// API Routes
app.get('/api/v1/banners', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/banners');
  
  // Simulate different responses based on query params
  if (req.query.type === 'hero') {
    return res.json({
      success: true,
      message: 'Banners fetched successfully',
      data: mockData.banners
    });
  }
  
  return res.json({
    success: true,
    message: 'Banners fetched successfully',
    data: mockData.banners
  });
});

app.get('/api/v1/menus/services', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/menus/services');
  res.json({
    success: true,
    message: 'Services menu fetched successfully',
    data: mockData.services
  });
});

app.get('/api/v1/menus/emergency', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/menus/emergency');
  res.json({
    success: true,
    message: 'Emergency menu fetched successfully',
    data: mockData.emergency
  });
});

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Admin Menu - Mock data matching the Laravel controller
const adminMenu = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: 'LayoutDashboard',
    path: '/admin',
    order: 1,
    visible: true,
    roles: ['admin', 'doctor'],
  },
  {
    id: 'accounts',
    label: 'Accounts',
    icon: 'Calculator',
    order: 2,
    visible: true,
    roles: ['admin'],
    children: [
      { id: 'create-group', label: 'Create Group', icon: 'Plus', path: '/admin/accounts/create-group', order: 1 },
      { id: 'create-ledger', label: 'Create Ledger', icon: 'FileText', path: '/admin/accounts/create-ledger', order: 2 },
      { id: 'chart-of-accounts', label: 'Chart of Accounts', icon: 'BarChart3', path: '/admin/accounts/chart-of-accounts', order: 3 },
      { id: 'trial-balance', label: 'Trial Balance', icon: 'FileCheck', path: '/admin/accounts/trial-balance', order: 4 },
      { id: 'balance-sheet', label: 'Balance Sheet', icon: 'FileSpreadsheet', path: '/admin/accounts/balance-sheet', order: 5 },
      { id: 'income-statement', label: 'Income Statement', icon: 'TrendingUp', path: '/admin/accounts/income-statement', order: 6 },
      { id: 'cash-flow', label: 'Cash Flow', icon: 'DollarSign', path: '/admin/accounts/cash-flow', order: 7 }
    ]
  },
  {
    id: 'hr',
    label: 'HR',
    icon: 'Users',
    order: 3,
    visible: true,
    roles: ['admin'],
    children: [
      { id: 'employee-entry', label: 'Employee Entry', icon: 'UserPlus', path: '/admin/hr/employee-entry', order: 1 },
      { id: 'attendance-panel', label: 'Attendance Panel', icon: 'Clock', order: 2, children: [
        { id: 'daily-attendance', label: 'Daily Attendance', icon: 'Calendar', path: '/admin/hr/attendance/daily', order: 1 },
        { id: 'monthly-attendance', label: 'Monthly Attendance', icon: 'FileSpreadsheet', path: '/admin/hr/attendance/monthly', order: 2 },
        { id: 'attendance-report', label: 'Attendance Report', icon: 'FileText', path: '/admin/hr/attendance/report', order: 3 }
      ]},
      { id: 'salary-process', label: 'Salary Process', icon: 'DollarSign', path: '/admin/hr/salary-process', order: 3 },
      { id: 'salary-payment', label: 'Salary Payment', icon: 'CreditCard', path: '/admin/hr/salary-payment', order: 4 },
      { id: 'hr-ledger', label: 'HR Ledger', icon: 'File', path: '/admin/hr/ledger', order: 5 }
    ]
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: 'FileText',
    order: 4,
    visible: true,
    roles: ['admin', 'doctor'],
    children: [
      { id: 'patient-reports', label: 'Patient Reports', icon: 'Users', path: '/admin/reports/patients', order: 1 },
      { id: 'doctor-reports', label: 'Doctor Reports', icon: 'Stethoscope', path: '/admin/reports/doctors', order: 2 },
      { id: 'appointment-reports', label: 'Appointment Reports', icon: 'Calendar', path: '/admin/reports/appointments', order: 3 },
      { id: 'financial-reports', label: 'Financial Reports', icon: 'DollarSign', path: '/admin/reports/financial', order: 4 },
      { id: 'inventory-reports', label: 'Inventory Reports', icon: 'Package', path: '/admin/reports/inventory', order: 5 },
      { id: 'lab-reports', label: 'Lab Reports', icon: 'FlaskConical', path: '/admin/reports/lab', order: 6 },
      { id: 'emergency-reports', label: 'Emergency Reports', icon: 'Ambulance', path: '/admin/reports/emergency', order: 7 },
      { id: 'sales-reports', label: 'Sales Reports', icon: 'ShoppingCart', path: '/admin/reports/sales', order: 8 },
      { id: 'service-reports', label: 'Service Reports', icon: 'Heart', path: '/admin/reports/services', order: 9 },
      { id: 'custom-reports', label: 'Custom Reports', icon: 'FileSpreadsheet', path: '/admin/reports/custom', order: 10 }
    ]
  },
  {
    id: 'medical',
    label: 'Medical',
    icon: 'Stethoscope',
    order: 5,
    visible: true,
    roles: ['admin', 'doctor'],
    children: [
      { id: 'diagnostic-transaction', label: 'Diagnostic Transaction', icon: 'Microscope', path: '/admin/medical/diagnostic', order: 1 },
      { id: 'medical-transaction', label: 'Medical Transaction', icon: 'File', path: '/admin/medical/transaction', order: 2 },
      { id: 'medical-diagnostic', label: 'Medical + Diagnostic', icon: 'Activity', path: '/admin/medical/combined', order: 3 },
      { id: 'prescription', label: 'Prescription', icon: 'FileText', path: '/admin/medical/prescription', order: 4 },
      { id: 'medical-history', label: 'Medical History', icon: 'FileSpreadsheet', path: '/admin/medical/history', order: 5 }
    ]
  },
  {
    id: 'departments',
    label: 'Departments',
    icon: 'Hospital',
    order: 6,
    visible: true,
    roles: ['admin'],
    children: [
      { id: 'cardiology', label: 'Cardiology', icon: 'Heart', path: '/admin/departments/cardiology', order: 1 },
      { id: 'neurology', label: 'Neurology', icon: 'Brain', path: '/admin/departments/neurology', order: 2 },
      { id: 'orthopedics', label: 'Orthopedics', icon: 'Bone', path: '/admin/departments/orthopedics', order: 3 },
      { id: 'ophthalmology', label: 'Ophthalmology', icon: 'Eye', path: '/admin/departments/ophthalmology', order: 4 },
      { id: 'pediatrics', label: 'Pediatrics', icon: 'Baby', path: '/admin/departments/pediatrics', order: 5 },
      { id: 'dentistry', label: 'Dentistry', icon: 'Smile', path: '/admin/departments/dentistry', order: 6 },
      { id: 'general-medicine', label: 'General Medicine', icon: 'Stethoscope', path: '/admin/departments/general', order: 7 },
      { id: 'emergency-medicine', label: 'Emergency Medicine', icon: 'Ambulance', path: '/admin/departments/emergency', order: 8 },
      { id: 'radiology', label: 'Radiology', icon: 'Activity', path: '/admin/departments/radiology', order: 9 },
      { id: 'pathology', label: 'Pathology', icon: 'TestTube', path: '/admin/departments/pathology', order: 10 },
      { id: 'pulmonology', label: 'Pulmonology', icon: 'Wind', path: '/admin/departments/pulmonology', order: 11 },
      { id: 'nephrology', label: 'Nephrology', icon: 'Droplet', path: '/admin/departments/nephrology', order: 12 },
      { id: 'gastroenterology', label: 'Gastroenterology', icon: 'Activity', path: '/admin/departments/gastroenterology', order: 13 }
    ]
  },
  {
    id: 'pharmacy',
    label: 'Pharmacy',
    icon: 'Pill',
    order: 7,
    visible: true,
    roles: ['admin'],
    children: [
      { id: 'medicines', label: 'Medicines', icon: 'Pill', path: '/admin/pharmacy/medicines', order: 1 },
      { id: 'supplements', label: 'Supplements', icon: 'Package', path: '/admin/pharmacy/supplements', order: 2 },
      { id: 'medical-devices', label: 'Medical Devices', icon: 'Syringe', path: '/admin/pharmacy/medical-devices', order: 3 },
      { id: 'first-aid', label: 'First Aid', icon: 'Bandage', path: '/admin/pharmacy/first-aid', order: 4 },
      { id: 'prescription-orders', label: 'Prescription Orders', icon: 'FileText', path: '/admin/pharmacy/prescription-orders', order: 5 },
      { id: 'stock-management', label: 'Stock Management', icon: 'Package', path: '/admin/pharmacy/stock', order: 6 },
      { id: 'suppliers', label: 'Suppliers', icon: 'Building', path: '/admin/pharmacy/suppliers', order: 7 },
      { id: 'pharmacy-sales', label: 'Sales', icon: 'ShoppingCart', path: '/admin/pharmacy/sales', order: 8 }
    ]
  },
  {
    id: 'analysis',
    label: 'Analysis',
    icon: 'FlaskConical',
    order: 8,
    visible: true,
    roles: ['admin'],
    children: [
      { id: 'analysis-setup', label: 'Analysis Setup', icon: 'Settings', path: '/admin/analysis', order: 1 },
      { id: 'analysis-departments', label: 'Departments', icon: 'Building', path: '/admin/analysis/departments', order: 2 },
      { id: 'analysis-tests', label: 'Test Services', icon: 'FileText', path: '/admin/analysis/tests', order: 3 },
      { id: 'analysis-specimens', label: 'Specimens', icon: 'TestTube', path: '/admin/analysis/specimens', order: 4 },
      { id: 'analysis-collection', label: 'Sample Collection', icon: 'Droplet', path: '/admin/analysis/collection', order: 5 }
    ]
  },
  {
    id: 'laboratory',
    label: 'Laboratory',
    icon: 'FlaskConical',
    order: 8,
    visible: true,
    roles: ['admin'],
    children: [
      { id: 'lab-tests', label: 'Lab Tests', icon: 'TestTube', path: '/admin/lab/tests', order: 1 },
      { id: 'test-categories', label: 'Test Categories', icon: 'FolderOpen', path: '/admin/lab/categories', order: 2 },
      { id: 'sample-collection', label: 'Sample Collection', icon: 'Droplet', path: '/admin/lab/collection', order: 3 },
      { id: 'test-results', label: 'Test Results', icon: 'FileCheck', path: '/admin/lab/results', order: 4 },
      { id: 'lab-equipment', label: 'Lab Equipment', icon: 'Microscope', path: '/admin/lab/equipment', order: 5 },
      { id: 'quality-control', label: 'Quality Control', icon: 'Shield', path: '/admin/lab/quality', order: 6 },
      { id: 'lab-reports', label: 'Lab Reports', icon: 'FileText', path: '/admin/lab/reports', order: 7 }
    ]
  },
  {
    id: 'patients',
    label: 'Patients',
    icon: 'Users',
    order: 9,
    visible: true,
    roles: ['admin', 'doctor'],
    children: [
      { id: 'patient-registration', label: 'Patient Registration', icon: 'UserPlus', path: '/admin/patients/registration', order: 1 },
      { id: 'patient-records', label: 'Patient Records', icon: 'FileText', path: '/admin/patients/records', order: 2 },
      { id: 'patient-history', label: 'Medical History', icon: 'FileSpreadsheet', path: '/admin/patients/history', order: 3 },
      { id: 'patient-appointments', label: 'Appointments', icon: 'Calendar', path: '/admin/patients/appointments', order: 4 },
      { id: 'patient-billing', label: 'Billing', icon: 'Receipt', path: '/admin/patients/billing', order: 5 }
    ]
  },
  {
    id: 'doctors',
    label: 'Doctors',
    icon: 'Stethoscope',
    order: 10,
    visible: true,
    roles: ['admin'],
    children: [
      { id: 'doctor-registration', label: 'Doctor Registration', icon: 'UserPlus', path: '/admin/doctors/registration', order: 1 },
      { id: 'doctor-schedule', label: 'Doctor Schedule', icon: 'Calendar', path: '/admin/doctors/schedule', order: 2 },
      { id: 'doctor-profiles', label: 'Doctor Profiles', icon: 'FileText', path: '/admin/doctors/profiles', order: 3 },
      { id: 'doctor-performance', label: 'Performance', icon: 'TrendingUp', path: '/admin/doctors/performance', order: 4 }
    ]
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: 'Package',
    order: 11,
    visible: true,
    roles: ['admin'],
    children: [
      { id: 'stock-management', label: 'Stock Management', icon: 'Package', path: '/admin/inventory/stock', order: 1 },
      { id: 'purchase-orders', label: 'Purchase Orders', icon: 'ShoppingCart', path: '/admin/inventory/purchases', order: 2 },
      { id: 'suppliers', label: 'Suppliers', icon: 'Building', path: '/admin/inventory/suppliers', order: 3 },
      { id: 'warehouse', label: 'Warehouse', icon: 'Archive', path: '/admin/inventory/warehouse', order: 4 },
      { id: 'inventory-reports', label: 'Reports', icon: 'FileText', path: '/admin/inventory/reports', order: 5 }
    ]
  },
  {
    id: 'emergency',
    label: 'Emergency',
    icon: 'Ambulance',
    order: 12,
    visible: true,
    roles: ['admin'],
    children: [
      { id: 'emergency-cases', label: 'Emergency Cases', icon: 'AlertTriangle', path: '/admin/emergency/cases', order: 1 },
      { id: 'emergency-contacts', label: 'Emergency Contacts', icon: 'Phone', path: '/admin/emergency/contacts', order: 2 },
      { id: 'emergency-equipment', label: 'Emergency Equipment', icon: 'Shield', path: '/admin/emergency/equipment', order: 3 },
      { id: 'emergency-staff', label: 'Emergency Staff', icon: 'Users', path: '/admin/emergency/staff', order: 4 }
    ]
  },
  {
    id: 'services',
    label: 'Services',
    icon: 'Heart',
    order: 13,
    visible: true,
    roles: ['admin'],
    children: [
      { id: 'service-categories', label: 'Service Categories', icon: 'FolderOpen', path: '/admin/services/categories', order: 1 },
      { id: 'service-list', label: 'Service List', icon: 'List', path: '/admin/services/list', order: 2 },
      { id: 'service-pricing', label: 'Service Pricing', icon: 'DollarSign', path: '/admin/services/pricing', order: 3 },
      { id: 'service-packages', label: 'Service Packages', icon: 'Gift', path: '/admin/services/packages', order: 4 }
    ]
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: 'Target',
    order: 14,
    visible: true,
    roles: ['admin'],
    children: [
      { id: 'banners', label: 'Banners', icon: 'Image', path: '/admin/marketing/banners', order: 1 },
      { id: 'promotions', label: 'Promotions', icon: 'Tag', path: '/admin/marketing/promotions', order: 2 },
      { id: 'discounts', label: 'Discounts', icon: 'Percent', path: '/admin/marketing/discounts', order: 3 },
      { id: 'campaigns', label: 'Campaigns', icon: 'Target', path: '/admin/marketing/campaigns', order: 4 },
      { id: 'social-media', label: 'Social Media', icon: 'MessageSquare', path: '/admin/marketing/social', order: 5 }
    ]
  },
  {
    id: 'communications',
    label: 'Communications',
    icon: 'MessageSquare',
    order: 15,
    visible: true,
    roles: ['admin'],
    children: [
      { id: 'notifications', label: 'Notifications', icon: 'Bell', path: '/admin/communications/notifications', order: 1 },
      { id: 'emails', label: 'Emails', icon: 'Mail', path: '/admin/communications/emails', order: 2 },
      { id: 'sms', label: 'SMS', icon: 'Phone', path: '/admin/communications/sms', order: 3 },
      { id: 'feedback', label: 'Feedback', icon: 'MessageCircle', path: '/admin/communications/feedback', order: 4 }
    ]
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: 'Settings',
    order: 16,
    visible: true,
    roles: ['admin'],
    children: [
      { id: 'general-settings', label: 'General Settings', icon: 'Settings', path: '/admin/settings/general', order: 1 },
      { id: 'user-management', label: 'User Management', icon: 'Users', path: '/admin/settings/users', order: 2 },
      { id: 'role-permissions', label: 'Role & Permissions', icon: 'Shield', path: '/admin/settings/permissions', order: 3 },
      { id: 'system-config', label: 'System Configuration', icon: 'Settings', path: '/admin/settings/system', order: 4 },
      { id: 'backup-restore', label: 'Backup & Restore', icon: 'Archive', path: '/admin/settings/backup', order: 5 }
    ]
  }
];

// Admin Menu endpoint
app.get('/api/v1/admin/menu', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/admin/menu');
  res.json(adminMenu);
});

// Prescription endpoints
app.get('/api/v1/prescriptions/search', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/prescriptions/search');
  const query = req.query.q || '';
  
  // Mock prescription data
  const mockPrescriptions = [
    {
      id: 1,
      patient: { name: 'John Doe' },
      doctor: { user: { name: 'Dr. Smith' } },
      status: 'pending_verification',
      priority: 'normal',
      created_at: new Date().toISOString()
    },
    {
      id: 2,
      patient: { name: 'Jane Smith' },
      doctor: { user: { name: 'Dr. Johnson' } },
      status: 'verified',
      priority: 'urgent',
      created_at: new Date().toISOString()
    }
  ];
  
  // Filter by query if provided
  const filtered = query ? 
    mockPrescriptions.filter(p => 
      p.patient.name.toLowerCase().includes(query.toLowerCase()) ||
      p.id.toString().includes(query)
    ) : mockPrescriptions;
  
  res.json(filtered);
});

app.get('/api/v1/prescriptions/analytics', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/prescriptions/analytics');
  const range = req.query.range || '30d';
  
  // Mock analytics data
  const mockAnalytics = {
    total: 150,
    pending: 25,
    verified: 75,
    completed: 45,
    rejected: 5,
    range: range
  };
  
  res.json(mockAnalytics);
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Medigo Healthcare Mock API Server',
    version: '1.0.0',
    status: 'running',
    endpoints: {
      health: '/api/v1/health',
      banners: '/api/v1/banners',
      services: '/api/v1/menus/services',
      emergency: '/api/v1/menus/emergency',
      admin: '/api/v1/admin/menu'
    }
  });
});

// Favicon endpoint
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message
  });
});

// Medical Devices API Mock Endpoints
const medicalDevices = [
  { id: 1, name: 'Digital Thermometer', category: 'Monitoring', manufacturer: 'MedTech', current_stock: 150, unit_price: 25.00, status: 'active', expiry_date: '2026-12-31' },
  { id: 2, name: 'Blood Pressure Monitor', category: 'Monitoring', manufacturer: 'HealthCorp', current_stock: 45, unit_price: 89.99, status: 'active', expiry_date: '2026-06-30' },
  { id: 3, name: 'Glucometer', category: 'Diagnostic', manufacturer: 'DiabCare', current_stock: 80, unit_price: 45.50, status: 'active', expiry_date: '2025-12-31' },
  { id: 4, name: 'Pulse Oximeter', category: 'Monitoring', manufacturer: 'MedTech', current_stock: 12, unit_price: 35.00, status: 'low_stock', expiry_date: '2026-03-31' },
  { id: 5, name: 'Nebulizer', category: 'Therapeutic', manufacturer: 'BreathEasy', current_stock: 30, unit_price: 120.00, status: 'active', expiry_date: '2026-09-30' },
  { id: 6, name: 'Stethoscope', category: 'Diagnostic', manufacturer: 'MedTech', current_stock: 5, unit_price: 75.00, status: 'critical_stock', expiry_date: '2027-01-31' },
  { id: 7, name: 'ECG Machine', category: 'Diagnostic', manufacturer: 'HealthCorp', current_stock: 8, unit_price: 2500.00, status: 'active', expiry_date: '2025-12-31' },
  { id: 8, name: 'Surgical Masks', category: 'Consumables', manufacturer: 'SafetyFirst', current_stock: 5000, unit_price: 0.50, status: 'active', expiry_date: '2024-12-31' },
  { id: 9, name: 'Infrared Thermometer', category: 'Monitoring', manufacturer: 'MedTech', current_stock: 200, unit_price: 45.00, status: 'active', expiry_date: '2026-08-31' },
  { id: 10, name: 'Oxygen Concentrator', category: 'Therapeutic', manufacturer: 'BreathEasy', current_stock: 3, unit_price: 899.00, status: 'critical_stock', expiry_date: '2026-04-30' }
];

app.get('/api/v1/medical-devices', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/medical-devices');
  const { search, category, status, manufacturer } = req.query;
  
  let filtered = [...medicalDevices];
  
  if (search) {
    filtered = filtered.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
  }
  if (category) {
    filtered = filtered.filter(d => d.category === category);
  }
  if (status) {
    filtered = filtered.filter(d => d.status === status);
  }
  if (manufacturer) {
    filtered = filtered.filter(d => d.manufacturer === manufacturer);
  }
  
  res.json(filtered);
});

app.get('/api/v1/medical-devices/stats', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/medical-devices/stats');
  res.json({
    total: medicalDevices.length,
    active: medicalDevices.filter(d => d.status === 'active').length,
    low_stock: medicalDevices.filter(d => d.status === 'low_stock').length,
    critical_stock: medicalDevices.filter(d => d.status === 'critical_stock').length
  });
});

app.get('/api/v1/medical-devices/categories', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/medical-devices/categories');
  const categories = [...new Set(medicalDevices.map(d => d.category))];
  res.json(categories);
});

app.get('/api/v1/medical-devices/manufacturers', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/medical-devices/manufacturers');
  const manufacturers = [...new Set(medicalDevices.map(d => d.manufacturer))];
  res.json(manufacturers);
});

app.get('/api/v1/medical-devices/low-stock', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/medical-devices/low-stock');
  res.json(medicalDevices.filter(d => d.status === 'low_stock' || d.status === 'critical_stock'));
});

app.get('/api/v1/medical-devices/critical-stock', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/medical-devices/critical-stock');
  res.json(medicalDevices.filter(d => d.status === 'critical_stock'));
});

app.get('/api/v1/medical-devices/expiring-soon', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/medical-devices/expiring-soon');
  const thirtyDaysFromNow = new Date();
  thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
  res.json(medicalDevices.filter(d => new Date(d.expiry_date) <= thirtyDaysFromNow));
});

// Mock data for reports
const mockDoctors = [
  { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah.j@medigo.com', role: 'doctor', is_active: true, appointments_count: 45, orders_count: 0, specialization: 'General Medicine', created_at: '2024-01-15' },
  { id: 2, name: 'Dr. Michael Chen', email: 'michael.c@medigo.com', role: 'doctor', is_active: true, appointments_count: 38, orders_count: 0, specialization: 'Cardiology', created_at: '2024-01-20' },
  { id: 3, name: 'Dr. Emily Davis', email: 'emily.d@medigo.com', role: 'doctor', is_active: false, appointments_count: 22, orders_count: 0, specialization: 'Pediatrics', created_at: '2024-02-01' }
];

const mockAppointments = [
  { id: 1, user_id: 1, doctor_id: 1, appointment_date: '2024-03-01', status: 'completed', consultation_fee: 150.00, user: { name: 'John Doe' }, doctor: { user: { name: 'Dr. Sarah Johnson' } } },
  { id: 2, user_id: 2, doctor_id: 2, appointment_date: '2024-03-02', status: 'completed', consultation_fee: 200.00, user: { name: 'Jane Smith' }, doctor: { user: { name: 'Dr. Michael Chen' } } },
  { id: 3, user_id: 3, doctor_id: 1, appointment_date: '2024-03-03', status: 'pending', consultation_fee: 150.00, user: { name: 'Bob Wilson' }, doctor: { user: { name: 'Dr. Sarah Johnson' } } }
];

const mockOrders = [
  { id: 1, user_id: 1, total_amount: 89.99, status: 'completed', created_at: '2024-03-01', user: { name: 'John Doe' }, items: [{ product: { name: 'Paracetamol' }, quantity: 2, subtotal: 19.98 }] },
  { id: 2, user_id: 2, total_amount: 156.50, status: 'completed', created_at: '2024-03-02', user: { name: 'Jane Smith' }, items: [{ product: { name: 'Vitamin C' }, quantity: 3, subtotal: 44.97 }] }
];

const mockLabTests = [
  { id: 1, user_id: 1, lab_test_id: 1, booking_date: '2024-03-01', status: 'completed', price: 75.00, user: { name: 'John Doe' }, labTest: { name: 'Blood Test' } },
  { id: 2, user_id: 2, lab_test_id: 2, booking_date: '2024-03-02', status: 'pending', price: 120.00, user: { name: 'Jane Smith' }, labTest: { name: 'X-Ray' } }
];

// Reports endpoints
app.get('/api/v1/reports/users', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/reports/users');
  const { role } = req.query;
  
  let users = [...mockDoctors];
  if (role) {
    users = users.filter(user => user.role === role);
  }
  
  const summary = {
    total: users.length,
    by_role: users.reduce((acc, user) => {
      acc[user.role] = (acc[user.role] || 0) + 1;
      return acc;
    }, {}),
    active: users.filter(user => user.is_active).length
  };
  
  res.json({
    data: users,
    summary
  });
});

app.get('/api/v1/reports/appointments', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/reports/appointments');
  const { start_date, end_date, status } = req.query;
  
  let appointments = [...mockAppointments];
  
  if (status) {
    appointments = appointments.filter(apt => apt.status === status);
  }
  
  const summary = {
    total: appointments.length,
    by_status: appointments.reduce((acc, apt) => {
      acc[apt.status] = (acc[apt.status] || 0) + 1;
      return acc;
    }, {}),
    total_revenue: appointments.filter(apt => apt.status === 'completed').reduce((sum, apt) => sum + apt.consultation_fee, 0)
  };
  
  res.json({
    data: appointments,
    summary
  });
});

app.get('/api/v1/reports/sales', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/reports/sales');
  const { start_date, end_date } = req.query;
  
  let orders = [...mockOrders];
  
  const summary = {
    total_orders: orders.length,
    total_revenue: orders.filter(order => order.status === 'completed').reduce((sum, order) => sum + order.total_amount, 0),
    by_status: orders.reduce((acc, order) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {}),
    top_products: [
      { product: { name: 'Paracetamol' }, quantity: 15, revenue: 149.85 },
      { product: { name: 'Vitamin C' }, quantity: 8, revenue: 119.92 }
    ]
  };
  
  res.json({
    data: orders,
    summary
  });
});

app.get('/api/v1/reports/lab-tests', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/reports/lab-tests');
  const { start_date, end_date } = req.query;
  
  let labTests = [...mockLabTests];
  
  const summary = {
    total: labTests.length,
    by_status: labTests.reduce((acc, test) => {
      acc[test.status] = (acc[test.status] || 0) + 1;
      return acc;
    }, {}),
    total_revenue: labTests.filter(test => test.status === 'completed').reduce((sum, test) => sum + test.price, 0)
  };
  
  res.json({
    data: labTests,
    summary
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on port ${PORT}`);
  console.log(`📡 Frontend should connect to: http://localhost:${PORT}`);
  console.log('🎯 Available endpoints:');
  console.log('   GET /api/v1/banners');
  console.log('   GET /api/v1/banners?type=hero');
  console.log('   GET /api/v1/menus/services');
  console.log('   GET /api/v1/menus/emergency');
  console.log('   GET /api/v1/admin/menu');
  console.log('   GET /api/v1/reports/users');
  console.log('   GET /api/v1/reports/appointments');
  console.log('   GET /api/v1/reports/sales');
  console.log('   GET /api/v1/reports/lab-tests');
  console.log('   GET /api/v1/health');
});
