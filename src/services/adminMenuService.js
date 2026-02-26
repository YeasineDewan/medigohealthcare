import axios from 'axios';
import { useAdminStore } from '../store/adminStore';

class AdminMenuService {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    this.baseURL = '/api/v1/admin/menu'; // API endpoint
  }

  // Get menu structure from API or cache
  async getMenuStructure() {
    try {
      // Try to get from cache first
      const cached = this.getFromCache();
      if (cached) {
        return cached;
      }

      // Fetch from API
      const response = await axios.get(this.baseURL);
      const menuData = this.transformMenuData(response.data);
      
      // Cache the result
      this.setCache(menuData);
      
      return menuData;
    } catch (error) {
      console.warn('Failed to fetch menu from API, using fallback:', error.message);
      
      // Return fallback menu structure
      const { user } = useAdminStore.getState();
      return this.getFallbackMenuStructure(user?.role, user?.permissions);
    }
  }

  // Transform menu data to ensure consistent structure
  transformMenuData(rawData) {
    if (!rawData || !Array.isArray(rawData)) {
      return [];
    }

    return rawData.map(item => ({
      id: item.id || `menu-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      label: item.label || item.name || 'Unknown',
      icon: this.getValidIconName(item.icon),
      path: item.path || item.url || null,
      children: item.children ? this.transformMenuData(item.children) : [],
      order: item.order || 0,
      visible: item.visible !== false,
      permissions: item.permissions || [],
      roles: item.roles || [],
      badge: item.badge || null,
      parentId: item.parentId || null
    }));
  }

  // Get valid Lucide icon name
  getValidIconName(iconName) {
    if (!iconName) return 'Settings';
    
    // Map common icon names to Lucide icon names
    const iconMap = {
      'LayoutDashboard': 'LayoutDashboard',
      'Calculator': 'Calculator',
      'Users': 'Users',
      'UserPlus': 'UserPlus',
      'FileText': 'FileText',
      'Calendar': 'Calendar',
      'Stethoscope': 'Stethoscope',
      'Heart': 'Heart',
      'Brain': 'Brain',
      'Bone': 'Bone',
      'Eye': 'Eye',
      'Baby': 'Baby',
      'Smile': 'Smile',
      'Hospital': 'Hospital',
      'Pill': 'Pill',
      'Package': 'Package',
      'ShoppingCart': 'ShoppingCart',
      'FlaskConical': 'FlaskConical',
      'FolderOpen': 'FolderOpen',
      'Ambulance': 'Ambulance',
      'Bell': 'Bell',
      'Image': 'Image',
      'CreditCard': 'CreditCard',
      'DollarSign': 'DollarSign',
      'FileSpreadsheet': 'FileSpreadsheet',
      'BarChart3': 'BarChart3',
      'TrendingUp': 'TrendingUp',
      'Clock': 'Clock',
      'Settings': 'Settings',
      'Shield': 'Shield',
      'Archive': 'Archive',
      'Plus': 'Plus',
      'CheckCircle': 'CheckCircle',
      'AlertTriangle': 'AlertTriangle',
      'Phone': 'Phone',
      'Mail': 'Mail',
      'MessageSquare': 'MessageSquare',
      'Target': 'Target',
      'Tag': 'Tag',
      'Percent': 'Percent',
      'Gift': 'Gift',
      'Receipt': 'Receipt',
      'Wind': 'Wind',
      'Droplet': 'Droplet',
      'TestTube': 'TestTube',
      'Syringe': 'Syringe',
      'Bandage': 'Bandage',
      'Building': 'Building',
      'Microscope': 'Microscope',
      'Activity': 'Activity',
      'FileCheck': 'FileCheck',
      'MessageCircle': 'MessageCircle',
      'List': 'List',
      'File': 'File',
      'Minimize2': 'Minimize2',
      'Expand': 'Expand',
      'RefreshCw': 'RefreshCw',
      'X': 'X',
      'ChevronRight': 'ChevronRight',
      'ChevronDown': 'ChevronDown',
      'Star': 'Star',
      'AlertCircle': 'AlertCircle',
      'Zap': 'Zap'
    };

    return iconMap[iconName] || 'Settings';
  }

  // Get Lucide React icon component by name
  getIconComponent(iconName) {
    const iconMap = {
      'layout-dashboard': 'LayoutDashboard',
      'users': 'Users',
      'stethoscope': 'Stethoscope',
      'calendar': 'Calendar',
      'pill': 'Pill',
      'package': 'Package',
      'shopping-cart': 'ShoppingCart',
      'flask-conical': 'FlaskConical',
      'folder-open': 'FolderOpen',
      'ambulance': 'Ambulance',
      'bell': 'Bell',
      'image': 'Image',
      'credit-card': 'CreditCard',
      'user-plus': 'UserPlus',
      'dollar-sign': 'DollarSign',
      'file-spreadsheet': 'FileSpreadsheet',
      'bar-chart-3': 'BarChart3',
      'trending-up': 'TrendingUp',
      'clock': 'Clock',
      'settings': 'Settings',
      'shield': 'Shield',
      'archive': 'Archive',
      'plus': 'Plus',
      'check-circle': 'CheckCircle',
      'alert-triangle': 'AlertTriangle',
      'phone': 'Phone',
      'mail': 'Mail',
      'message-square': 'MessageSquare',
      'target': 'Target',
      'tag': 'Tag',
      'percent': 'Percent',
      'gift': 'Gift',
      'receipt': 'Receipt',
      'wind': 'Wind',
      'droplet': 'Droplet',
      'test-tube': 'TestTube',
      'syringe': 'Syringe',
      'bandage': 'Bandage',
      'building': 'Building',
      'microscope': 'Microscope',
      'activity': 'Activity',
      'file-check': 'FileCheck',
      'message-circle': 'MessageCircle',
      'list': 'List',
      'file': 'File',
      'minimize-2': 'Minimize2',
      'expand': 'Expand',
      'refresh-cw': 'RefreshCw',
      'x': 'X',
      'chevron-right': 'ChevronRight',
      'chevron-down': 'ChevronDown',
      'star': 'Star',
      'alert-circle': 'AlertCircle',
      'zap': 'Zap'
    };

    return iconMap[iconName.toLowerCase()] || 'Settings';
  }

  // Filter menu based on user role and permissions
  filterMenuByPermissions(menuItems, userRole, permissions) {
    if (!menuItems || !Array.isArray(menuItems)) return [];

    // If no user role or permissions provided, return all items
    if (!userRole && (!permissions || permissions.length === 0)) {
      return menuItems;
    }

    return menuItems
      .filter(item => {
        // Check if item is visible
        if (item.visible === false) return false;

        // Check role-based access
        if (item.roles && item.roles.length > 0 && userRole) {
          if (!item.roles.includes(userRole) && !item.roles.includes('admin')) {
            return false;
          }
        }

        // Check permission-based access
        if (item.permissions && item.permissions.length > 0 && permissions && permissions.length > 0) {
          const hasPermission = item.permissions.some(permission => 
            permissions.includes(permission) || permissions.includes('admin')
          );
          if (!hasPermission) return false;
        }

        return true;
      })
      .map(item => ({
        ...item,
        children: this.filterMenuByPermissions(item.children, userRole, permissions)
      }))
      .filter(item => item.children.length > 0 || !item.children || item.children.length === 0);
  }

  // Get fallback menu structure when API is unavailable
  getFallbackMenuStructure(userRole, permissions) {
    const baseMenu = [
      {
        id: 'dashboard',
        label: 'Dashboard',
        icon: 'LayoutDashboard',
        path: '/admin',
        order: 1
      },
      {
        id: 'accounts',
        label: 'Accounts',
        icon: 'Calculator',
        order: 2,
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
        children: [
          { id: 'employee-entry', label: 'Employee Entry', icon: 'UserPlus', path: '/admin/hr/employee-entry', order: 1 },
          {
            id: 'attendance-panel',
            label: 'Attendance Panel',
            icon: 'Clock',
            order: 2,
            children: [
              { id: 'daily-attendance', label: 'Daily Attendance', icon: 'Calendar', path: '/admin/hr/attendance/daily', order: 1 },
              { id: 'monthly-attendance', label: 'Monthly Attendance', icon: 'FileSpreadsheet', path: '/admin/hr/attendance/monthly', order: 2 },
              { id: 'attendance-report', label: 'Attendance Report', icon: 'FileText', path: '/admin/hr/attendance/report', order: 3 }
            ]
          },
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
        children: [
          { id: 'medicines', label: 'Medicines', icon: 'Pill', path: '/admin/pharmacy/medicines', order: 1 },
          { id: 'supplements', label: 'Supplements', icon: 'Package', path: '/admin/pharmacy/supplements', order: 2 },
          { id: 'medical-devices', label: 'Medical Devices', icon: 'Syringe', path: '/admin/pharmacy/devices', order: 3 },
          { id: 'first-aid', label: 'First Aid', icon: 'Bandage', path: '/admin/pharmacy/first-aid', order: 4 },
          { id: 'prescription-orders', label: 'Prescription Orders', icon: 'FileText', path: '/admin/pharmacy/prescriptions', order: 5 },
          { id: 'stock-management', label: 'Stock Management', icon: 'Package', path: '/admin/pharmacy/stock', order: 6 },
          { id: 'suppliers', label: 'Suppliers', icon: 'Building', path: '/admin/pharmacy/suppliers', order: 7 },
          { id: 'pharmacy-sales', label: 'Sales', icon: 'ShoppingCart', path: '/admin/pharmacy/sales', order: 8 }
        ]
      },
      {
        id: 'laboratory',
        label: 'Laboratory',
        icon: 'FlaskConical',
        order: 8,
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
        children: [
          { id: 'general-settings', label: 'General Settings', icon: 'Settings', path: '/admin/settings/general', order: 1 },
          { id: 'user-management', label: 'User Management', icon: 'Users', path: '/admin/settings/users', order: 2 },
          { id: 'role-permissions', label: 'Role & Permissions', icon: 'Shield', path: '/admin/settings/permissions', order: 3 },
          { id: 'system-config', label: 'System Configuration', icon: 'Settings', path: '/admin/settings/system', order: 4 },
          { id: 'backup-restore', label: 'Backup & Restore', icon: 'Archive', path: '/admin/settings/backup', order: 5 }
        ]
      }
    ];

    return this.filterMenuByPermissions(baseMenu, userRole, permissions);
  }

  // Cache management
  setCache(data) {
    this.cache.set('menuStructure', {
      data,
      timestamp: Date.now()
    });
  }

  getFromCache() {
    const cached = this.cache.get('menuStructure');
    if (!cached) return null;

    // Check if cache is still valid
    if (Date.now() - cached.timestamp > this.cacheTimeout) {
      this.cache.delete('menuStructure');
      return null;
    }

    return cached.data;
  }

  // Clear cache
  clearCache() {
    this.cache.clear();
  }

  // Search menu items
  searchMenuItems(menuItems, searchTerm) {
    if (!searchTerm || !menuItems) return menuItems;

    const term = searchTerm.toLowerCase();
    
    const filterItems = (items) => {
      return items
        .filter(item => {
          const matchesLabel = item.label.toLowerCase().includes(term);
          const matchesPath = item.path && item.path.toLowerCase().includes(term);
          
          if (matchesLabel || matchesPath) return true;
          
          // Check children
          if (item.children && item.children.length > 0) {
            const filteredChildren = filterItems(item.children);
            return filteredChildren.length > 0;
          }
          
          return false;
        })
        .map(item => ({
          ...item,
          children: item.children ? filterItems(item.children) : []
        }));
    };

    return filterItems(menuItems);
  }

  // Get menu statistics
  getMenuStats(menuItems) {
    if (!menuItems) return { totalItems: 0, visibleItems: 0, categories: 0 };

    let totalItems = 0;
    let visibleItems = 0;
    let categories = 0;

    const countItems = (items, isChild = false) => {
      items.forEach(item => {
        totalItems++;
        if (item.visible !== false) visibleItems++;
        
        if (!isChild && item.children && item.children.length > 0) {
          categories++;
        }
        
        if (item.children) {
          countItems(item.children, true);
        }
      });
    };

    countItems(menuItems);

    return { totalItems, visibleItems, categories };
  }
}

// Create singleton instance
const adminMenuService = new AdminMenuService();

export default adminMenuService;
export { AdminMenuService };
