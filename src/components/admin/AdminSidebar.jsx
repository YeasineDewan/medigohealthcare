import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  Calendar,
  Pill,
  Package,
  ShoppingCart,
  FlaskConical,
  FolderOpen,
  Ambulance,
  Settings,
  ChevronDown,
  ChevronRight,
  LogOut,
  Bell,
  Image,
  FileText,
  TrendingUp,
  TrendingDown,
  CreditCard,
  UserPlus,
  Clock,
  DollarSign,
  FileSpreadsheet,
  BarChart3,
  PieChart,
  Activity,
  Heart,
  Brain,
  Bone,
  Eye,
  Baby,
  Smile,
  Hospital,
  Shield,
  ClipboardList,
  Award,
  BookOpen,
  GraduationCap,
  Briefcase,
  Building,
  Mail,
  Phone,
  MessageSquare,
  HelpCircle,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Archive,
  Trash2,
  Edit3,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Printer,
  Share2,
  Star,
  ThumbsUp,
  MessageCircle,
  Zap,
  Target,
  Gift,
  Tag,
  Percent,
  Calculator,
  Receipt,
  File,
  TestTube,
  Microscope,
  Dna,
  Syringe,
  Bandage,
  Thermometer,
  Droplet,
  Wind,
  List,
  RefreshCw,
  Expand,
  Minimize2,
  Menu,
  X,
  Wrench,
  Hash,
  ArrowLeftRight,
  ArrowUpDown,
} from 'lucide-react';
import DynamicMenuItem from './DynamicMenuItem';
import { useAdminMenu } from '../../hooks/useAdminMenu';
import { useAdminStore } from '../../store/adminStore';

const menuStructure = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    path: '/admin',
  },
  {
    id: 'accounts',
    label: 'Accounts',
    icon: Calculator,
    children: [
      // Masters Section
      {
        id: 'accounts-masters',
        label: 'Masters',
        icon: BookOpen,
        children: [
          {
            id: 'create-group',
            label: 'Create Group',
            icon: Plus,
            path: '/admin/accounts/create-group',
          },
          {
            id: 'create-ledger',
            label: 'Create Ledger',
            icon: FileText,
            path: '/admin/accounts/create-ledger',
          },
          {
            id: 'chart-of-accounts',
            label: 'Chart of Accounts',
            icon: BarChart3,
            path: '/admin/accounts/chart-of-accounts',
          },
          {
            id: 'cost-centers',
            label: 'Cost Centers',
            icon: Building,
            path: '/admin/accounts/cost-centers',
          },
          {
            id: 'budget-heads',
            label: 'Budget Heads',
            icon: Target,
            path: '/admin/accounts/budget-heads',
          },
        ],
      },
      // Transactions Section
      {
        id: 'transactions',
        label: 'Transactions',
        icon: RefreshCw,
        children: [
          {
            id: 'day-book',
            label: 'Day Book',
            icon: Calendar,
            path: '/admin/accounts/day-book',
          },
          {
            id: 'cash-book',
            label: 'Cash Book',
            icon: DollarSign,
            path: '/admin/accounts/cash-book',
          },
          {
            id: 'bank-book',
            label: 'Bank Book',
            icon: CreditCard,
            path: '/admin/accounts/bank-book',
          },
          {
            id: 'journal-entry',
            label: 'Journal Entry',
            icon: FileText,
            path: '/admin/accounts/journal-entry',
          },
          {
            id: 'contra-entry',
            label: 'Contra Entry',
            icon: ArrowLeftRight,
            path: '/admin/accounts/contra-entry',
          },
          {
            id: 'purchase-journal',
            label: 'Purchase Journal',
            icon: ShoppingCart,
            path: '/admin/accounts/purchase-journal',
          },
          {
            id: 'sales-journal',
            label: 'Sales Journal',
            icon: TrendingUp,
            path: '/admin/accounts/sales-journal',
          },
        ],
      },
      // Financial Reports Section
      {
        id: 'financial-reports',
        label: 'Financial Reports',
        icon: FileSpreadsheet,
        children: [
          {
            id: 'trial-balance',
            label: 'Trial Balance',
            icon: FileCheck,
            path: '/admin/accounts/trial-balance',
          },
          {
            id: 'balance-sheet',
            label: 'Balance Sheet',
            icon: FileSpreadsheet,
            path: '/admin/accounts/balance-sheet',
          },
          {
            id: 'income-statement',
            label: 'Income Statement',
            icon: TrendingUp,
            path: '/admin/accounts/income-statement',
          },
          {
            id: 'cash-flow',
            label: 'Cash Flow Statement',
            icon: DollarSign,
            path: '/admin/accounts/cash-flow',
          },
          {
            id: 'fund-flow',
            label: 'Fund Flow Statement',
            icon: ArrowUpDown,
            path: '/admin/accounts/fund-flow',
          },
          {
            id: 'ratio-analysis',
            label: 'Ratio Analysis',
            icon: PieChart,
            path: '/admin/accounts/ratio-analysis',
          },
        ],
      },
      // Budget & Cost Section
      {
        id: 'budget-cost',
        label: 'Budget & Cost',
        icon: Target,
        children: [
          {
            id: 'budget-creation',
            label: 'Budget Creation',
            icon: Plus,
            path: '/admin/accounts/budget-creation',
          },
          {
            id: 'budget-monitoring',
            label: 'Budget Monitoring',
            icon: Activity,
            path: '/admin/accounts/budget-monitoring',
          },
          {
            id: 'budget-vs-actual',
            label: 'Budget vs Actual',
            icon: BarChart3,
            path: '/admin/accounts/budget-vs-actual',
          },
          {
            id: 'cost-analysis',
            label: 'Cost Analysis',
            icon: Calculator,
            path: '/admin/accounts/cost-analysis',
          },
        ],
      },
      // Payables Section
      {
        id: 'payables',
        label: 'Payables',
        icon: CreditCard,
        children: [
          {
            id: 'accounts-payable',
            label: 'Accounts Payable',
            icon: Building,
            path: '/admin/accounts/payable',
          },
          {
            id: 'supplier-ledger',
            label: 'Supplier Ledger',
            icon: FileText,
            path: '/admin/accounts/supplier-ledger',
          },
          {
            id: 'supplier-payment',
            label: 'Supplier Payment',
            icon: DollarSign,
            path: '/admin/accounts/supplier-payment',
          },
          {
            id: 'payable-aging',
            label: 'Payable Aging',
            icon: Clock,
            path: '/admin/accounts/payable-aging',
          },
        ],
      },
      // Receivables Section
      {
        id: 'receivables',
        label: 'Receivables',
        icon: Receipt,
        children: [
          {
            id: 'accounts-receivable',
            label: 'Accounts Receivable',
            icon: Users,
            path: '/admin/accounts/receivable',
          },
          {
            id: 'customer-ledger',
            label: 'Customer Ledger',
            icon: FileText,
            path: '/admin/accounts/customer-ledger',
          },
          {
            id: 'customer-receipt',
            label: 'Customer Receipt',
            icon: DollarSign,
            path: '/admin/accounts/customer-receipt',
          },
          {
            id: 'receivable-aging',
            label: 'Receivable Aging',
            icon: Clock,
            path: '/admin/accounts/receivable-aging',
          },
        ],
      },
      // Tax Management Section
      {
        id: 'tax-management',
        label: 'Tax Management',
        icon: Percent,
        children: [
          {
            id: 'gst-reports',
            label: 'GST Reports',
            icon: FileText,
            path: '/admin/accounts/gst-reports',
          },
          {
            id: 'gst-returns',
            label: 'GST Returns',
            icon: RefreshCw,
            path: '/admin/accounts/gst-returns',
          },
          {
            id: 'tds-management',
            label: 'TDS Management',
            icon: Calculator,
            path: '/admin/accounts/tds-management',
          },
          {
            id: 'tax-settings',
            label: 'Tax Settings',
            icon: Settings,
            path: '/admin/accounts/tax-settings',
          },
        ],
      },
      // Fixed Assets Section
      {
        id: 'fixed-assets',
        label: 'Fixed Assets',
        icon: Building,
        children: [
          {
            id: 'asset-categories',
            label: 'Asset Categories',
            icon: FolderOpen,
            path: '/admin/accounts/asset-categories',
          },
          {
            id: 'asset-register',
            label: 'Asset Register',
            icon: FileText,
            path: '/admin/accounts/asset-register',
          },
          {
            id: 'asset-purchase',
            label: 'Asset Purchase',
            icon: ShoppingCart,
            path: '/admin/accounts/asset-purchase',
          },
          {
            id: 'asset-depreciation',
            label: 'Depreciation',
            icon: TrendingDown,
            path: '/admin/accounts/asset-depreciation',
          },
          {
            id: 'asset-maintenance',
            label: 'Asset Maintenance',
            icon: Wrench,
            path: '/admin/accounts/asset-maintenance',
          },
          {
            id: 'asset-disposal',
            label: 'Asset Disposal',
            icon: Trash2,
            path: '/admin/accounts/asset-disposal',
          },
        ],
      },
      // Audit & Compliance Section
      {
        id: 'audit-compliance',
        label: 'Audit & Compliance',
        icon: Shield,
        children: [
          {
            id: 'audit-trail',
            label: 'Audit Trail',
            icon: FileText,
            path: '/admin/accounts/audit-trail',
          },
          {
            id: 'voucher-approval',
            label: 'Voucher Approval',
            icon: CheckCircle,
            path: '/admin/accounts/voucher-approval',
          },
          {
            id: 'bank-reconciliation',
            label: 'Bank Reconciliation',
            icon: RefreshCw,
            path: '/admin/accounts/bank-reconciliation',
          },
          {
            id: 'party-reconciliation',
            label: 'Party Reconciliation',
            icon: ArrowLeftRight,
            path: '/admin/accounts/party-reconciliation',
          },
        ],
      },
      // Settings Section
      {
        id: 'accounts-settings',
        label: 'Settings',
        icon: Settings,
        children: [
          {
            id: 'opening-balances',
            label: 'Opening Balances',
            icon: Plus,
            path: '/admin/accounts/opening-balances',
          },
          {
            id: 'fiscal-year',
            label: 'Fiscal Year',
            icon: Calendar,
            path: '/admin/accounts/fiscal-year',
          },
          {
            id: 'currency-settings',
            label: 'Currency Settings',
            icon: DollarSign,
            path: '/admin/accounts/currency-settings',
          },
          {
            id: 'voucher-numbering',
            label: 'Voucher Numbering',
            icon: Hash,
            path: '/admin/accounts/voucher-numbering',
          },
          {
            id: 'accounts-config',
            label: 'Configuration',
            icon: Settings,
            path: '/admin/accounts/config',
          },
        ],
      },
    ],
  },
  {
    id: 'hr',
    label: 'HR',
    icon: Users,
    children: [
      {
        id: 'employee-entry',
        label: 'Employee Entry',
        icon: UserPlus,
        path: '/admin/hr/employee-entry',
      },
      {
        id: 'attendance-panel',
        label: 'Attendance Panel',
        icon: Clock,
        children: [
          {
            id: 'daily-attendance',
            label: 'Daily Attendance',
            icon: Calendar,
            path: '/admin/hr/attendance/daily',
          },
          {
            id: 'monthly-attendance',
            label: 'Monthly Attendance',
            icon: FileSpreadsheet,
            path: '/admin/hr/attendance/monthly',
          },
          {
            id: 'attendance-report',
            label: 'Attendance Report',
            icon: FileText,
            path: '/admin/hr/attendance/report',
          },
        ],
      },
      {
        id: 'salary-process',
        label: 'Salary Process',
        icon: DollarSign,
        path: '/admin/hr/salary-process',
      },
      {
        id: 'salary-payment',
        label: 'Salary Payment',
        icon: CreditCard,
        path: '/admin/hr/salary-payment',
      },
      {
        id: 'hr-ledger',
        label: 'HR Ledger',
        icon: File,
        path: '/admin/hr/ledger',
      },
    ],
  },
  {
    id: 'reports',
    label: 'Reports',
    icon: FileText,
    children: [
      {
        id: 'patient-reports',
        label: 'Patient Reports',
        icon: Users,
        path: '/admin/reports/patients',
      },
      {
        id: 'doctor-reports',
        label: 'Doctor Reports',
        icon: Stethoscope,
        path: '/admin/reports/doctors',
      },
      {
        id: 'appointment-reports',
        label: 'Appointment Reports',
        icon: Calendar,
        path: '/admin/reports/appointments',
      },
      {
        id: 'financial-reports',
        label: 'Financial Reports',
        icon: DollarSign,
        path: '/admin/reports/financial',
      },
      {
        id: 'inventory-reports',
        label: 'Inventory Reports',
        icon: Package,
        path: '/admin/reports/inventory',
      },
      {
        id: 'lab-reports',
        label: 'Lab Reports',
        icon: FlaskConical,
        path: '/admin/reports/lab',
      },
      {
        id: 'emergency-reports',
        label: 'Emergency Reports',
        icon: Ambulance,
        path: '/admin/reports/emergency',
      },
      {
        id: 'sales-reports',
        label: 'Sales Reports',
        icon: ShoppingCart,
        path: '/admin/reports/sales',
      },
      {
        id: 'service-reports',
        label: 'Service Reports',
        icon: Heart,
        path: '/admin/reports/services',
      },
      {
        id: 'custom-reports',
        label: 'Custom Reports',
        icon: FileSpreadsheet,
        path: '/admin/reports/custom',
      },
    ],
  },
  {
    id: 'medical',
    label: 'Medical',
    icon: Stethoscope,
    children: [
      {
        id: 'diagnostic-transaction',
        label: 'Diagnostic Transaction',
        icon: Microscope,
        path: '/admin/medical/diagnostic',
      },
      {
        id: 'medical-transaction',
        label: 'Medical Transaction',
        icon: File,
        path: '/admin/medical/transaction',
      },
      {
        id: 'medical-diagnostic',
        label: 'Medical + Diagnostic',
        icon: Activity,
        path: '/admin/medical/combined',
      },
      {
        id: 'prescription',
        label: 'Prescription',
        icon: FileText,
        path: '/admin/medical/prescription',
      },
      {
        id: 'medical-history',
        label: 'Medical History',
        icon: FileSpreadsheet,
        path: '/admin/medical/history',
      },
    ],
  },
  {
    id: 'departments',
    label: 'Departments',
    icon: Hospital,
    children: [
      {
        id: 'cardiology',
        label: 'Cardiology',
        icon: Heart,
        path: '/admin/departments/cardiology',
      },
      {
        id: 'neurology',
        label: 'Neurology',
        icon: Brain,
        path: '/admin/departments/neurology',
      },
      {
        id: 'orthopedics',
        label: 'Orthopedics',
        icon: Bone,
        path: '/admin/departments/orthopedics',
      },
      {
        id: 'ophthalmology',
        label: 'Ophthalmology',
        icon: Eye,
        path: '/admin/departments/ophthalmology',
      },
      {
        id: 'pediatrics',
        label: 'Pediatrics',
        icon: Baby,
        path: '/admin/departments/pediatrics',
      },
      {
        id: 'dentistry',
        label: 'Dentistry',
        icon: Smile,
        path: '/admin/departments/dentistry',
      },
      {
        id: 'general-medicine',
        label: 'General Medicine',
        icon: Stethoscope,
        path: '/admin/departments/general',
      },
      {
        id: 'emergency-medicine',
        label: 'Emergency Medicine',
        icon: Ambulance,
        path: '/admin/departments/emergency',
      },
      {
        id: 'radiology',
        label: 'Radiology',
        icon: Activity,
        path: '/admin/departments/radiology',
      },
      {
        id: 'pathology',
        label: 'Pathology',
        icon: TestTube,
        path: '/admin/departments/pathology',
      },
      {
        id: 'pulmonology',
        label: 'Pulmonology',
        icon: Wind,
        path: '/admin/departments/pulmonology',
      },
      {
        id: 'nephrology',
        label: 'Nephrology',
        icon: Droplet,
        path: '/admin/departments/nephrology',
      },
      {
        id: 'gastroenterology',
        label: 'Gastroenterology',
        icon: Activity,
        path: '/admin/departments/gastroenterology',
      },
    ],
  },
  {
    id: 'pharmacy',
    label: 'Pharmacy',
    icon: Pill,
    children: [
      {
        id: 'medicines',
        label: 'Medicines',
        icon: Pill,
        path: '/admin/pharmacy/medicines',
      },
      {
        id: 'supplements',
        label: 'Supplements',
        icon: Package,
        path: '/admin/pharmacy/supplements',
      },
      {
        id: 'medical-devices',
        label: 'Medical Devices',
        icon: Syringe,
        path: '/admin/pharmacy/medical-devices',
      },
      {
        id: 'first-aid',
        label: 'First Aid',
        icon: Bandage,
        path: '/admin/pharmacy/first-aid',
      },
      {
        id: 'prescription-orders',
        label: 'Prescription Orders',
        icon: FileText,
        path: '/admin/pharmacy/prescription-orders',
      },
      {
        id: 'stock-management',
        label: 'Stock Management',
        icon: Package,
        path: '/admin/pharmacy/stock',
      },
      {
        id: 'suppliers',
        label: 'Suppliers',
        icon: Building,
        path: '/admin/pharmacy/suppliers',
      },
      {
        id: 'pharmacy-sales',
        label: 'Sales',
        icon: ShoppingCart,
        path: '/admin/pharmacy/sales',
      },
    ],
  },
  {
    id: 'laboratory',
    label: 'Laboratory',
    icon: FlaskConical,
    children: [
      {
        id: 'lab-tests',
        label: 'Lab Tests',
        icon: TestTube,
        path: '/admin/lab/tests',
      },
      {
        id: 'test-categories',
        label: 'Test Categories',
        icon: FolderOpen,
        path: '/admin/lab/categories',
      },
      {
        id: 'sample-collection',
        label: 'Sample Collection',
        icon: Droplet,
        path: '/admin/lab/collection',
      },
      {
        id: 'test-results',
        label: 'Test Results',
        icon: FileCheck,
        path: '/admin/lab/results',
      },
      {
        id: 'lab-equipment',
        label: 'Lab Equipment',
        icon: Microscope,
        path: '/admin/lab/equipment',
      },
      {
        id: 'quality-control',
        label: 'Quality Control',
        icon: Shield,
        path: '/admin/lab/quality',
      },
      {
        id: 'lab-reports',
        label: 'Lab Reports',
        icon: FileText,
        path: '/admin/lab/reports',
      },
    ],
  },
  {
    id: 'patients',
    label: 'Patients',
    icon: Users,
    children: [
      {
        id: 'patient-registration',
        label: 'Patient Registration',
        icon: UserPlus,
        path: '/admin/patients/registration',
      },
      {
        id: 'patient-records',
        label: 'Patient Records',
        icon: FileText,
        path: '/admin/patients/records',
      },
      {
        id: 'patient-history',
        label: 'Medical History',
        icon: FileSpreadsheet,
        path: '/admin/patients/history',
      },
      {
        id: 'patient-appointments',
        label: 'Appointments',
        icon: Calendar,
        path: '/admin/patients/appointments',
      },
      {
        id: 'patient-billing',
        label: 'Billing',
        icon: Receipt,
        path: '/admin/patients/billing',
      },
    ],
  },
  {
    id: 'doctors',
    label: 'Doctors',
    icon: Stethoscope,
    children: [
      {
        id: 'doctor-registration',
        label: 'Doctor Registration',
        icon: UserPlus,
        path: '/admin/doctors/registration',
      },
      {
        id: 'doctor-schedule',
        label: 'Doctor Schedule',
        icon: Calendar,
        path: '/admin/doctors/schedule',
      },
      {
        id: 'doctor-profiles',
        label: 'Doctor Profiles',
        icon: FileText,
        path: '/admin/doctors/profiles',
      },
      {
        id: 'doctor-performance',
        label: 'Performance',
        icon: TrendingUp,
        path: '/admin/doctors/performance',
      },
    ],
  },
  {
    id: 'inventory',
    label: 'Inventory',
    icon: Package,
    children: [
      {
        id: 'stock-management',
        label: 'Stock Management',
        icon: Package,
        path: '/admin/inventory/stock',
      },
      {
        id: 'purchase-orders',
        label: 'Purchase Orders',
        icon: ShoppingCart,
        path: '/admin/inventory/purchases',
      },
      {
        id: 'suppliers',
        label: 'Suppliers',
        icon: Building,
        path: '/admin/inventory/suppliers',
      },
      {
        id: 'warehouse',
        label: 'Warehouse',
        icon: Archive,
        path: '/admin/inventory/warehouse',
      },
      {
        id: 'inventory-reports',
        label: 'Reports',
        icon: FileText,
        path: '/admin/inventory/reports',
      },
    ],
  },
  {
    id: 'emergency',
    label: 'Emergency',
    icon: Ambulance,
    children: [
      {
        id: 'emergency-cases',
        label: 'Emergency Cases',
        icon: AlertTriangle,
        path: '/admin/emergency/cases',
      },
      {
        id: 'emergency-contacts',
        label: 'Emergency Contacts',
        icon: Phone,
        path: '/admin/emergency/contacts',
      },
      {
        id: 'emergency-equipment',
        label: 'Emergency Equipment',
        icon: Shield,
        path: '/admin/emergency/equipment',
      },
      {
        id: 'emergency-staff',
        label: 'Emergency Staff',
        icon: Users,
        path: '/admin/emergency/staff',
      },
    ],
  },
  {
    id: 'services',
    label: 'Services',
    icon: Heart,
    children: [
      {
        id: 'service-categories',
        label: 'Service Categories',
        icon: FolderOpen,
        path: '/admin/services/categories',
      },
      {
        id: 'service-list',
        label: 'Service List',
        icon: List,
        path: '/admin/services/list',
      },
      {
        id: 'service-pricing',
        label: 'Service Pricing',
        icon: DollarSign,
        path: '/admin/services/pricing',
      },
      {
        id: 'service-packages',
        label: 'Service Packages',
        icon: Gift,
        path: '/admin/services/packages',
      },
    ],
  },
  {
    id: 'marketing',
    label: 'Marketing',
    icon: Target,
    children: [
      {
        id: 'banners',
        label: 'Banners',
        icon: Image,
        path: '/admin/marketing/banners',
      },
      {
        id: 'promotions',
        label: 'Promotions',
        icon: Tag,
        path: '/admin/marketing/promotions',
      },
      {
        id: 'discounts',
        label: 'Discounts',
        icon: Percent,
        path: '/admin/marketing/discounts',
      },
      {
        id: 'campaigns',
        label: 'Campaigns',
        icon: Target,
        path: '/admin/marketing/campaigns',
      },
      {
        id: 'social-media',
        label: 'Social Media',
        icon: MessageSquare,
        path: '/admin/marketing/social',
      },
    ],
  },
  {
    id: 'communications',
    label: 'Communications',
    icon: MessageSquare,
    children: [
      {
        id: 'notifications',
        label: 'Notifications',
        icon: Bell,
        path: '/admin/communications/notifications',
      },
      {
        id: 'emails',
        label: 'Emails',
        icon: Mail,
        path: '/admin/communications/emails',
      },
      {
        id: 'sms',
        label: 'SMS',
        icon: Phone,
        path: '/admin/communications/sms',
      },
      {
        id: 'feedback',
        label: 'Feedback',
        icon: MessageCircle,
        path: '/admin/communications/feedback',
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: Settings,
    children: [
      {
        id: 'general-settings',
        label: 'General Settings',
        icon: Settings,
        path: '/admin/settings/general',
      },
      {
        id: 'user-management',
        label: 'User Management',
        icon: Users,
        path: '/admin/settings/users',
      },
      {
        id: 'role-permissions',
        label: 'Role & Permissions',
        icon: Shield,
        path: '/admin/settings/permissions',
      },
      {
        id: 'system-config',
        label: 'System Configuration',
        icon: Settings,
        path: '/admin/settings/system',
      },
      {
        id: 'backup-restore',
        label: 'Backup & Restore',
        icon: Archive,
        path: '/admin/settings/backup',
      },
    ],
  },
];

export default function AdminSidebar() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, isAuthenticated, sidebarCollapsed } = useAdminStore();
  
  // Use the dynamic menu hook
  const {
    menuItems,
    loading,
    error,
    expandedItems,
    menuStats,
    toggleExpanded,
    expandAll,
    collapseAll,
    refresh,
    setSearchTerm: setMenuSearchTerm,
    effectiveRole,
    effectivePermissions,
    hasSearchTerm,
    isMenuEmpty,
  } = useAdminMenu({
    autoRefresh: true,
    refreshInterval: 300000, // 5 minutes
    enableCache: true,
    enableSearch: true
  });

  // Sync search term with menu hook
  useEffect(() => {
    setMenuSearchTerm(searchTerm);
  }, [searchTerm, setMenuSearchTerm]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl/Cmd + K for search focus
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        document.getElementById('admin-menu-search')?.focus();
      }
      // Escape to clear search
      if (e.key === 'Escape' && hasSearchTerm) {
        setSearchTerm('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [hasSearchTerm]);

  const handleRefresh = () => {
    refresh();
  };

  const handleExpandAll = () => {
    expandAll();
  };

  const handleCollapseAll = () => {
    collapseAll();
  };

  return (
    <aside className={`bg-gradient-to-b from-[#0F3D1F] via-[#165028] to-[#1A5C2E] text-white fixed inset-y-0 left-0 z-40 flex flex-col transition-all duration-300 ${
      sidebarCollapsed ? 'w-20' : 'w-64'
    }`}>
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        {!sidebarCollapsed ? (
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center shadow-lg">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="font-bold text-xl">Medigo Admin</span>
              <p className="text-xs text-white/60">Healthcare Management</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center shadow-lg">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
          </div>
        )}
        
        {/* Search - Only show when not collapsed */}
        {!sidebarCollapsed && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              id="admin-menu-search"
              type="text"
              placeholder="Search menu... (Ctrl+K)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            />
            {hasSearchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 rounded hover:bg-white/10 transition-colors"
              >
                <X className="w-3 h-3 text-white/60" />
              </button>
            )}
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
            />
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-sm text-red-200">{error}</p>
            <button
              onClick={handleRefresh}
              className="mt-2 text-xs text-red-200 hover:text-white transition-colors flex items-center gap-1"
            >
              <RefreshCw className="w-3 h-3" />
              Retry
            </button>
          </div>
        )}

        {/* Menu Controls - Only show when not collapsed */}
        {!sidebarCollapsed && !loading && !error && menuItems.length > 0 && (
          <div className="mb-4 flex items-center gap-2 p-2 bg-white/5 rounded-lg">
            <button
              onClick={handleExpandAll}
              className="flex-1 text-xs text-white/70 hover:text-white transition-colors flex items-center justify-center gap-1 py-1 rounded hover:bg-white/10"
            >
              <Expand className="w-3 h-3" />
              Expand All
            </button>
            <button
              onClick={handleCollapseAll}
              className="flex-1 text-xs text-white/70 hover:text-white transition-colors flex items-center justify-center gap-1 py-1 rounded hover:bg-white/10"
            >
              <Minimize2 className="w-3 h-3" />
              Collapse All
            </button>
            <button
              onClick={handleRefresh}
              className="p-1 text-xs text-white/70 hover:text-white transition-colors rounded hover:bg-white/10"
              title="Refresh menu"
            >
              <RefreshCw className="w-3 h-3" />
            </button>
          </div>
        )}

        {/* Menu Items */}
        {!loading && !error && (
          <div className="space-y-2">
            {isMenuEmpty ? (
              <div className="text-center py-8">
                <p className="text-sm text-white/60">No menu items found</p>
                {hasSearchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="mt-2 text-xs text-white/40 hover:text-white/60 transition-colors"
                  >
                    Clear search
                  </button>
                )}
              </div>
            ) : (
              menuItems.map((item) => (
                <DynamicMenuItem
                  key={item.id}
                  item={item}
                  expandedItems={expandedItems}
                  onToggleExpand={toggleExpanded}
                  searchTerm={searchTerm}
                  userRole={effectiveRole}
                  permissions={effectivePermissions}
                  showBadges={true}
                  animationEnabled={true}
                />
              ))
            )}
          </div>
        )}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/10">
        {!sidebarCollapsed ? (
          <div className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center">
              <span className="text-sm font-bold">
                {user?.name?.charAt(0)?.toUpperCase() || 'A'}
              </span>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{user?.name || 'Admin User'}</p>
              <p className="text-xs text-white/60">{user?.email || 'admin@medigo.com'}</p>
            </div>
            <button 
              onClick={() => {/* Handle logout */}}
              className="p-1 rounded hover:bg-white/10 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="flex justify-center">
            <button 
              onClick={() => {/* Handle logout */}}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </aside>
  );
}
