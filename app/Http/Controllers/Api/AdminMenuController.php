<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class AdminMenuController extends Controller
{
    /**
     * Get admin menu structure
     */
    public function index(): JsonResponse
    {
        // Return the admin menu structure
        // This can be customized based on user role/permissions
        $menu = $this->getMenuStructure();
        
        return response()->json($menu);
    }

    /**
     * Get the full menu structure
     */
    private function getMenuStructure()
    {
        return [
            [
                'id' => 'dashboard',
                'label' => 'Dashboard',
                'icon' => 'LayoutDashboard',
                'path' => '/admin',
                'order' => 1,
                'visible' => true,
                'roles' => ['admin', 'doctor'],
            ],
            [
                'id' => 'accounts',
                'label' => 'Accounts',
                'icon' => 'Calculator',
                'order' => 2,
                'visible' => true,
                'roles' => ['admin'],
                'children' => [
                    ['id' => 'create-group', 'label' => 'Create Group', 'icon' => 'Plus', 'path' => '/admin/accounts/create-group', 'order' => 1],
                    ['id' => 'create-ledger', 'label' => 'Create Ledger', 'icon' => 'FileText', 'path' => '/admin/accounts/create-ledger', 'order' => 2],
                    ['id' => 'chart-of-accounts', 'label' => 'Chart of Accounts', 'icon' => 'BarChart3', 'path' => '/admin/accounts/chart-of-accounts', 'order' => 3],
                    ['id' => 'trial-balance', 'label' => 'Trial Balance', 'icon' => 'FileCheck', 'path' => '/admin/accounts/trial-balance', 'order' => 4],
                    ['id' => 'balance-sheet', 'label' => 'Balance Sheet', 'icon' => 'FileSpreadsheet', 'path' => '/admin/accounts/balance-sheet', 'order' => 5],
                    ['id' => 'income-statement', 'label' => 'Income Statement', 'icon' => 'TrendingUp', 'path' => '/admin/accounts/income-statement', 'order' => 6],
                    ['id' => 'cash-flow', 'label' => 'Cash Flow', 'icon' => 'DollarSign', 'path' => '/admin/accounts/cash-flow', 'order' => 7]
                ]
            ],
            [
                'id' => 'hr',
                'label' => 'HR',
                'icon' => 'Users',
                'order' => 3,
                'visible' => true,
                'roles' => ['admin'],
                'children' => [
                    ['id' => 'employee-entry', 'label' => 'Employee Entry', 'icon' => 'UserPlus', 'path' => '/admin/hr/employee-entry', 'order' => 1],
                    ['id' => 'attendance-panel', 'label' => 'Attendance Panel', 'icon' => 'Clock', 'order' => 2, 'children' => [
                        ['id' => 'daily-attendance', 'label' => 'Daily Attendance', 'icon' => 'Calendar', 'path' => '/admin/hr/attendance/daily', 'order' => 1],
                        ['id' => 'monthly-attendance', 'label' => 'Monthly Attendance', 'icon' => 'FileSpreadsheet', 'path' => '/admin/hr/attendance/monthly', 'order' => 2],
                        ['id' => 'attendance-report', 'label' => 'Attendance Report', 'icon' => 'FileText', 'path' => '/admin/hr/attendance/report', 'order' => 3]
                    ]],
                    ['id' => 'salary-process', 'label' => 'Salary Process', 'icon' => 'DollarSign', 'path' => '/admin/hr/salary-process', 'order' => 3],
                    ['id' => 'salary-payment', 'label' => 'Salary Payment', 'icon' => 'CreditCard', 'path' => '/admin/hr/salary-payment', 'order' => 4],
                    ['id' => 'hr-ledger', 'label' => 'HR Ledger', 'icon' => 'File', 'path' => '/admin/hr/ledger', 'order' => 5]
                ]
            ],
            [
                'id' => 'reports',
                'label' => 'Reports',
                'icon' => 'FileText',
                'order' => 4,
                'visible' => true,
                'roles' => ['admin', 'doctor'],
                'children' => [
                    ['id' => 'patient-reports', 'label' => 'Patient Reports', 'icon' => 'Users', 'path' => '/admin/reports/patients', 'order' => 1],
                    ['id' => 'doctor-reports', 'label' => 'Doctor Reports', 'icon' => 'Stethoscope', 'path' => '/admin/reports/doctors', 'order' => 2],
                    ['id' => 'appointment-reports', 'label' => 'Appointment Reports', 'icon' => 'Calendar', 'path' => '/admin/reports/appointments', 'order' => 3],
                    ['id' => 'financial-reports', 'label' => 'Financial Reports', 'icon' => 'DollarSign', 'path' => '/admin/reports/financial', 'order' => 4],
                    ['id' => 'inventory-reports', 'label' => 'Inventory Reports', 'icon' => 'Package', 'path' => '/admin/reports/inventory', 'order' => 5],
                    ['id' => 'lab-reports', 'label' => 'Lab Reports', 'icon' => 'FlaskConical', 'path' => '/admin/reports/lab', 'order' => 6],
                    ['id' => 'emergency-reports', 'label' => 'Emergency Reports', 'icon' => 'Ambulance', 'path' => '/admin/reports/emergency', 'order' => 7],
                    ['id' => 'sales-reports', 'label' => 'Sales Reports', 'icon' => 'ShoppingCart', 'path' => '/admin/reports/sales', 'order' => 8],
                    ['id' => 'service-reports', 'label' => 'Service Reports', 'icon' => 'Heart', 'path' => '/admin/reports/services', 'order' => 9],
                    ['id' => 'custom-reports', 'label' => 'Custom Reports', 'icon' => 'FileSpreadsheet', 'path' => '/admin/reports/custom', 'order' => 10]
                ]
            ],
            [
                'id' => 'medical',
                'label' => 'Medical',
                'icon' => 'Stethoscope',
                'order' => 5,
                'visible' => true,
                'roles' => ['admin', 'doctor'],
                'children' => [
                    ['id' => 'diagnostic-transaction', 'label' => 'Diagnostic Transaction', 'icon' => 'Microscope', 'path' => '/admin/medical/diagnostic', 'order' => 1],
                    ['id' => 'medical-transaction', 'label' => 'Medical Transaction', 'icon' => 'File', 'path' => '/admin/medical/transaction', 'order' => 2],
                    ['id' => 'medical-diagnostic', 'label' => 'Medical + Diagnostic', 'icon' => 'Activity', 'path' => '/admin/medical/combined', 'order' => 3],
                    ['id' => 'prescription', 'label' => 'Prescription', 'icon' => 'FileText', 'path' => '/admin/medical/prescription', 'order' => 4],
                    ['id' => 'medical-history', 'label' => 'Medical History', 'icon' => 'FileSpreadsheet', 'path' => '/admin/medical/history', 'order' => 5]
                ]
            ],
            [
                'id' => 'departments',
                'label' => 'Departments',
                'icon' => 'Hospital',
                'order' => 6,
                'visible' => true,
                'roles' => ['admin'],
                'children' => [
                    ['id' => 'cardiology', 'label' => 'Cardiology', 'icon' => 'Heart', 'path' => '/admin/departments/cardiology', 'order' => 1],
                    ['id' => 'neurology', 'label' => 'Neurology', 'icon' => 'Brain', 'path' => '/admin/departments/neurology', 'order' => 2],
                    ['id' => 'orthopedics', 'label' => 'Orthopedics', 'icon' => 'Bone', 'path' => '/admin/departments/orthopedics', 'order' => 3],
                    ['id' => 'ophthalmology', 'label' => 'Ophthalmology', 'icon' => 'Eye', 'path' => '/admin/departments/ophthalmology', 'order' => 4],
                    ['id' => 'pediatrics', 'label' => 'Pediatrics', 'icon' => 'Baby', 'path' => '/admin/departments/pediatrics', 'order' => 5],
                    ['id' => 'dentistry', 'label' => 'Dentistry', 'icon' => 'Smile', 'path' => '/admin/departments/dentistry', 'order' => 6],
                    ['id' => 'general-medicine', 'label' => 'General Medicine', 'icon' => 'Stethoscope', 'path' => '/admin/departments/general', 'order' => 7],
                    ['id' => 'emergency-medicine', 'label' => 'Emergency Medicine', 'icon' => 'Ambulance', 'path' => '/admin/departments/emergency', 'order' => 8],
                    ['id' => 'radiology', 'label' => 'Radiology', 'icon' => 'Activity', 'path' => '/admin/departments/radiology', 'order' => 9],
                    ['id' => 'pathology', 'label' => 'Pathology', 'icon' => 'TestTube', 'path' => '/admin/departments/pathology', 'order' => 10],
                    ['id' => 'pulmonology', 'label' => 'Pulmonology', 'icon' => 'Wind', 'path' => '/admin/departments/pulmonology', 'order' => 11],
                    ['id' => 'nephrology', 'label' => 'Nephrology', 'icon' => 'Droplet', 'path' => '/admin/departments/nephrology', 'order' => 12],
                    ['id' => 'gastroenterology', 'label' => 'Gastroenterology', 'icon' => 'Activity', 'path' => '/admin/departments/gastroenterology', 'order' => 13]
                ]
            ],
            [
                'id' => 'pharmacy',
                'label' => 'Pharmacy',
                'icon' => 'Pill',
                'order' => 7,
                'visible' => true,
                'roles' => ['admin'],
                'children' => [
                    ['id' => 'medicines', 'label' => 'Medicines', 'icon' => 'Pill', 'path' => '/admin/pharmacy/medicines', 'order' => 1],
                    ['id' => 'supplements', 'label' => 'Supplements', 'icon' => 'Package', 'path' => '/admin/pharmacy/supplements', 'order' => 2],
                    ['id' => 'medical-devices', 'label' => 'Medical Devices', 'icon' => 'Syringe', 'path' => '/admin/pharmacy/devices', 'order' => 3],
                    ['id' => 'first-aid', 'label' => 'First Aid', 'icon' => 'Bandage', 'path' => '/admin/pharmacy/first-aid', 'order' => 4],
                    ['id' => 'prescription-orders', 'label' => 'Prescription Orders', 'icon' => 'FileText', 'path' => '/admin/pharmacy/prescriptions', 'order' => 5],
                    ['id' => 'stock-management', 'label' => 'Stock Management', 'icon' => 'Package', 'path' => '/admin/pharmacy/stock', 'order' => 6],
                    ['id' => 'suppliers', 'label' => 'Suppliers', 'icon' => 'Building', 'path' => '/admin/pharmacy/suppliers', 'order' => 7],
                    ['id' => 'pharmacy-sales', 'label' => 'Sales', 'icon' => 'ShoppingCart', 'path' => '/admin/pharmacy/sales', 'order' => 8]
                ]
            ],
            [
                'id' => 'laboratory',
                'label' => 'Laboratory',
                'icon' => 'FlaskConical',
                'order' => 8,
                'visible' => true,
                'roles' => ['admin'],
                'children' => [
                    ['id' => 'lab-tests', 'label' => 'Lab Tests', 'icon' => 'TestTube', 'path' => '/admin/lab/tests', 'order' => 1],
                    ['id' => 'test-categories', 'label' => 'Test Categories', 'icon' => 'FolderOpen', 'path' => '/admin/lab/categories', 'order' => 2],
                    ['id' => 'sample-collection', 'label' => 'Sample Collection', 'icon' => 'Droplet', 'path' => '/admin/lab/collection', 'order' => 3],
                    ['id' => 'test-results', 'label' => 'Test Results', 'icon' => 'FileCheck', 'path' => '/admin/lab/results', 'order' => 4],
                    ['id' => 'lab-equipment', 'label' => 'Lab Equipment', 'icon' => 'Microscope', 'path' => '/admin/lab/equipment', 'order' => 5],
                    ['id' => 'quality-control', 'label' => 'Quality Control', 'icon' => 'Shield', 'path' => '/admin/lab/quality', 'order' => 6],
                    ['id' => 'lab-reports', 'label' => 'Lab Reports', 'icon' => 'FileText', 'path' => '/admin/lab/reports', 'order' => 7]
                ]
            ],
            [
                'id' => 'patients',
                'label' => 'Patients',
                'icon' => 'Users',
                'order' => 9,
                'visible' => true,
                'roles' => ['admin', 'doctor'],
                'children' => [
                    ['id' => 'patient-registration', 'label' => 'Patient Registration', 'icon' => 'UserPlus', 'path' => '/admin/patients/registration', 'order' => 1],
                    ['id' => 'patient-records', 'label' => 'Patient Records', 'icon' => 'FileText', 'path' => '/admin/patients/records', 'order' => 2],
                    ['id' => 'patient-history', 'label' => 'Medical History', 'icon' => 'FileSpreadsheet', 'path' => '/admin/patients/history', 'order' => 3],
                    ['id' => 'patient-appointments', 'label' => 'Appointments', 'icon' => 'Calendar', 'path' => '/admin/patients/appointments', 'order' => 4],
                    ['id' => 'patient-billing', 'label' => 'Billing', 'icon' => 'Receipt', 'path' => '/admin/patients/billing', 'order' => 5]
                ]
            ],
            [
                'id' => 'doctors',
                'label' => 'Doctors',
                'icon' => 'Stethoscope',
                'order' => 10,
                'visible' => true,
                'roles' => ['admin'],
                'children' => [
                    ['id' => 'doctor-registration', 'label' => 'Doctor Registration', 'icon' => 'UserPlus', 'path' => '/admin/doctors/registration', 'order' => 1],
                    ['id' => 'doctor-schedule', 'label' => 'Doctor Schedule', 'icon' => 'Calendar', 'path' => '/admin/doctors/schedule', 'order' => 2],
                    ['id' => 'doctor-profiles', 'label' => 'Doctor Profiles', 'icon' => 'FileText', 'path' => '/admin/doctors/profiles', 'order' => 3],
                    ['id' => 'doctor-performance', 'label' => 'Performance', 'icon' => 'TrendingUp', 'path' => '/admin/doctors/performance', 'order' => 4]
                ]
            ],
            [
                'id' => 'inventory',
                'label' => 'Inventory',
                'icon' => 'Package',
                'order' => 11,
                'visible' => true,
                'roles' => ['admin'],
                'children' => [
                    ['id' => 'stock-management', 'label' => 'Stock Management', 'icon' => 'Package', 'path' => '/admin/inventory/stock', 'order' => 1],
                    ['id' => 'purchase-orders', 'label' => 'Purchase Orders', 'icon' => 'ShoppingCart', 'path' => '/admin/inventory/purchases', 'order' => 2],
                    ['id' => 'suppliers', 'label' => 'Suppliers', 'icon' => 'Building', 'path' => '/admin/inventory/suppliers', 'order' => 3],
                    ['id' => 'warehouse', 'label' => 'Warehouse', 'icon' => 'Archive', 'path' => '/admin/inventory/warehouse', 'order' => 4],
                    ['id' => 'inventory-reports', 'label' => 'Reports', 'icon' => 'FileText', 'path' => '/admin/inventory/reports', 'order' => 5]
                ]
            ],
            [
                'id' => 'emergency',
                'label' => 'Emergency',
                'icon' => 'Ambulance',
                'order' => 12,
                'visible' => true,
                'roles' => ['admin'],
                'children' => [
                    ['id' => 'emergency-cases', 'label' => 'Emergency Cases', 'icon' => 'AlertTriangle', 'path' => '/admin/emergency/cases', 'order' => 1],
                    ['id' => 'emergency-contacts', 'label' => 'Emergency Contacts', 'icon' => 'Phone', 'path' => '/admin/emergency/contacts', 'order' => 2],
                    ['id' => 'emergency-equipment', 'label' => 'Emergency Equipment', 'icon' => 'Shield', 'path' => '/admin/emergency/equipment', 'order' => 3],
                    ['id' => 'emergency-staff', 'label' => 'Emergency Staff', 'icon' => 'Users', 'path' => '/admin/emergency/staff', 'order' => 4]
                ]
            ],
            [
                'id' => 'services',
                'label' => 'Services',
                'icon' => 'Heart',
                'order' => 13,
                'visible' => true,
                'roles' => ['admin'],
                'children' => [
                    ['id' => 'service-categories', 'label' => 'Service Categories', 'icon' => 'FolderOpen', 'path' => '/admin/services/categories', 'order' => 1],
                    ['id' => 'service-list', 'label' => 'Service List', 'icon' => 'List', 'path' => '/admin/services/list', 'order' => 2],
                    ['id' => 'service-pricing', 'label' => 'Service Pricing', 'icon' => 'DollarSign', 'path' => '/admin/services/pricing', 'order' => 3],
                    ['id' => 'service-packages', 'label' => 'Service Packages', 'icon' => 'Gift', 'path' => '/admin/services/packages', 'order' => 4]
                ]
            ],
            [
                'id' => 'marketing',
                'label' => 'Marketing',
                'icon' => 'Target',
                'order' => 14,
                'visible' => true,
                'roles' => ['admin'],
                'children' => [
                    ['id' => 'banners', 'label' => 'Banners', 'icon' => 'Image', 'path' => '/admin/marketing/banners', 'order' => 1],
                    ['id' => 'promotions', 'label' => 'Promotions', 'icon' => 'Tag', 'path' => '/admin/marketing/promotions', 'order' => 2],
                    ['id' => 'discounts', 'label' => 'Discounts', 'icon' => 'Percent', 'path' => '/admin/marketing/discounts', 'order' => 3],
                    ['id' => 'campaigns', 'label' => 'Campaigns', 'icon' => 'Target', 'path' => '/admin/marketing/campaigns', 'order' => 4],
                    ['id' => 'social-media', 'label' => 'Social Media', 'icon' => 'MessageSquare', 'path' => '/admin/marketing/social', 'order' => 5]
                ]
            ],
            [
                'id' => 'communications',
                'label' => 'Communications',
                'icon' => 'MessageSquare',
                'order' => 15,
                'visible' => true,
                'roles' => ['admin'],
                'children' => [
                    ['id' => 'notifications', 'label' => 'Notifications', 'icon' => 'Bell', 'path' => '/admin/communications/notifications', 'order' => 1],
                    ['id' => 'emails', 'label' => 'Emails', 'icon' => 'Mail', 'path' => '/admin/communications/emails', 'order' => 2],
                    ['id' => 'sms', 'label' => 'SMS', 'icon' => 'Phone', 'path' => '/admin/communications/sms', 'order' => 3],
                    ['id' => 'feedback', 'label' => 'Feedback', 'icon' => 'MessageCircle', 'path' => '/admin/communications/feedback', 'order' => 4]
                ]
            ],
            [
                'id' => 'settings',
                'label' => 'Settings',
                'icon' => 'Settings',
                'order' => 16,
                'visible' => true,
                'roles' => ['admin'],
                'children' => [
                    ['id' => 'general-settings', 'label' => 'General Settings', 'icon' => 'Settings', 'path' => '/admin/settings/general', 'order' => 1],
                    ['id' => 'user-management', 'label' => 'User Management', 'icon' => 'Users', 'path' => '/admin/settings/users', 'order' => 2],
                    ['id' => 'role-permissions', 'label' => 'Role & Permissions', 'icon' => 'Shield', 'path' => '/admin/settings/permissions', 'order' => 3],
                    ['id' => 'system-config', 'label' => 'System Configuration', 'icon' => 'Settings', 'path' => '/admin/settings/system', 'order' => 4],
                    ['id' => 'backup-restore', 'label' => 'Backup & Restore', 'icon' => 'Archive', 'path' => '/admin/settings/backup', 'order' => 5]
                ]
            ]
        ];
    }
}
