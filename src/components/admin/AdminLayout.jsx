import { useState, useEffect } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Stethoscope,
  Users,
  Calendar,
  Pill,
  Package,
  ShoppingCart,
  FlaskConical,
  FolderOpen,
  Ambulance,
  Settings,
  Menu,
  X,
  LogOut,
  ChevronRight,
  ChevronDown,
  Bell,
  Image,
  FileText,
  BookOpen,
  TrendingUp,
  TrendingDown,
  UserCheck,
  CreditCard,
  TestTube,
  Microscope,
  Activity,
  DollarSign,
  Shield,
  Building,
  FileSpreadsheet,
  AlertCircle,
  BarChart3,
  Mail,
  MessageSquare,
  Megaphone,
  Video,
  Heart,
  Brain,
  Bone,
  User,
  Clock,
  FileSearch,
  PieChart,
  Target,
  Award,
  Briefcase,
  GraduationCap,
  Receipt,
  Calculator,
  Scale,
  Archive,
  Truck,
  Beaker,
  Plus,
  Search,
  Smartphone,
  Filter,
  Edit,
  Trash2,
  Eye,
  Download,
  Upload,
  Zap,
  Cpu,
  ShieldCheck,
  UserPlus,
  UserCog,
  Clipboard,
  Hospital,
  Syringe,
  Thermometer,
  HeartPulse,
  Baby,
  Phone
} from 'lucide-react';

const professionalMenuItems = [
  {
    id: 'dashboard',
    path: '/admin',
    icon: LayoutDashboard,
    label: 'Dashboard',
    badge: null,
    children: [
      { path: '/admin', icon: Activity, label: 'Overview', badge: null },
      { path: '/admin/analytics', icon: BarChart3, label: 'Analytics', badge: 'New' },
      { path: '/admin/reports/hub', icon: FileSpreadsheet, label: 'Reports Hub', badge: null },
    ]
  },
  {
    id: 'users',
    path: '/admin/users',
    icon: Users,
    label: 'User Management',
    badge: '2847',
    children: [
      { path: '/admin/doctors', icon: Stethoscope, label: 'Doctors', badge: '156' },
      { path: '/admin/patients', icon: User, label: 'Patients', badge: '2847' },
      { path: '/admin/employee-management', icon: UserCheck, label: 'Staff', badge: '89' },
      { path: '/admin/users/roles', icon: UserCog, label: 'Roles & Permissions', badge: null },
    ]
  },
  {
    id: 'appointments',
    path: '/admin/appointments',
    icon: Calendar,
    label: 'Appointments',
    badge: '42',
    children: [
      { path: '/admin/appointments', icon: Calendar, label: 'All Appointments', badge: '42' },
      { path: '/admin/appointments/schedule', icon: Clock, label: 'Schedule', badge: null },
      { path: '/admin/appointments/waiting', icon: Users, label: 'Waiting Room', badge: '8' },
      { path: '/admin/appointments/history', icon: FileText, label: 'History', badge: null },
    ]
  },
  {
    id: 'medical',
    path: '/admin/medical',
    icon: HeartPulse,
    label: 'Medical Services',
    badge: null,
    children: [
      { path: '/admin/medical/records', icon: FileText, label: 'Medical Records', badge: null },
      { path: '/admin/medical/prescriptions', icon: FileText, label: 'Prescriptions', badge: '124' },
      { path: '/admin/medical/diagnostics', icon: Search, label: 'Diagnostics', badge: null },
      { path: '/admin/medical/treatments', icon: Heart, label: 'Treatments', badge: null },
      { path: '/admin/medical/billing', icon: CreditCard, label: 'Medical Billing', badge: null },
    ]
  },
  {
    id: 'pharmacy',
    path: '/admin/pharmacy',
    icon: Pill,
    label: 'Pharmacy',
    badge: '1247',
    children: [
      { path: '/admin/products', icon: Pill, label: 'Medicines', badge: '892' },
      { path: '/admin/pharmacy/medical-devices', icon: Smartphone, label: 'Medical Devices', badge: '156' },
      { path: '/admin/pharmacy/first-aid', icon: Package, label: 'First Aid', badge: '45' },
      { path: '/admin/pharmacy/supplements', icon: Heart, label: 'Supplements', badge: '234' },
      { path: '/admin/pharmacy/suppliers', icon: Truck, label: 'Suppliers', badge: '28' },
      { path: '/admin/pharmacy/prescription-orders', icon: FileText, label: 'Prescription Orders', badge: '67' },
      { path: '/admin/pharmacy/sales', icon: ShoppingCart, label: 'Sales', badge: null },
    ]
  },
  {
    id: 'laboratory',
    path: '/admin/laboratory',
    icon: FlaskConical,
    label: 'Laboratory',
    badge: '156',
    children: [
      { path: '/admin/lab-tests', icon: TestTube, label: 'Lab Tests', badge: '156' },
      { path: '/admin/lab-categories', icon: Microscope, label: 'Test Categories', badge: '24' },
      { path: '/admin/lab/equipment', icon: Cpu, label: 'Lab Equipment', badge: '89' },
      { path: '/admin/lab/reports', icon: FileSpreadsheet, label: 'Lab Reports', badge: '342' },
      { path: '/admin/lab/quality-control', icon: ShieldCheck, label: 'Quality Control', badge: null },
      { path: '/admin/lab/sample-collection', icon: Beaker, label: 'Sample Collection', badge: null },
      { path: '/admin/lab/test-results', icon: FileSearch, label: 'Test Results', badge: '89' },
    ]
  },
  {
    id: 'departments',
    path: '/admin/departments',
    icon: Hospital,
    label: 'Departments',
    badge: null,
    children: [
      { path: '/admin/departments/cardiology', icon: Heart, label: 'Cardiology', badge: null },
      { path: '/admin/departments/neurology', icon: Brain, label: 'Neurology', badge: null },
      { path: '/admin/departments/orthopedics', icon: Bone, label: 'Orthopedics', badge: null },
      { path: '/admin/departments/pediatrics', icon: Baby, label: 'Pediatrics', badge: null },
      { path: '/admin/departments/emergency', icon: Ambulance, label: 'Emergency Medicine', badge: null },
      { path: '/admin/departments/radiology', icon: Eye, label: 'Radiology', badge: null },
      { path: '/admin/departments/pathology', icon: Microscope, label: 'Pathology', badge: null },
    ]
  },
  {
    id: 'inventory',
    path: '/admin/inventory',
    icon: Package,
    label: 'Inventory',
    badge: '284K',
    children: [
      { path: '/admin/inventory', icon: Package, label: 'Main Inventory', badge: null },
      { path: '/admin/inventory/stock-management', icon: Archive, label: 'Stock Management', badge: null },
      { path: '/admin/inventory/pharmacy-stock', icon: Pill, label: 'Pharmacy Stock', badge: null },
      { path: '/admin/inventory/equipment', icon: Smartphone, label: 'Medical Equipment', badge: null },
      { path: '/admin/inventory/supplies', icon: Package, label: 'Medical Supplies', badge: null },
    ]
  },
  {
    id: 'emergency',
    path: '/admin/emergency',
    icon: Ambulance,
    label: 'Emergency',
    badge: '7',
    children: [
      { path: '/admin/emergency', icon: Ambulance, label: 'Emergency Services', badge: '7' },
      { path: '/admin/emergency/cases', icon: AlertCircle, label: 'Active Cases', badge: '3' },
      { path: '/admin/emergency/contacts', icon: Phone, label: 'Emergency Contacts', badge: null },
      { path: '/admin/emergency/protocols', icon: Shield, label: 'Emergency Protocols', badge: null },
    ]
  },
  {
    id: 'services',
    path: '/admin/services',
    icon: FolderOpen,
    label: 'Services',
    badge: null,
    children: [
      { path: '/admin/services', icon: FolderOpen, label: 'Service List', badge: '45' },
      { path: '/admin/services/categories', icon: FolderOpen, label: 'Categories', badge: '12' },
      { path: '/admin/services/packages', icon: Package, label: 'Service Packages', badge: '8' },
      { path: '/admin/services/pricing', icon: DollarSign, label: 'Pricing', badge: null },
    ]
  },
  {
    id: 'financial',
    path: '/admin/financial',
    icon: Calculator,
    label: 'Financial',
    badge: null,
    children: [
      { path: '/admin/accounts/chart-of-accounts', icon: FileSpreadsheet, label: 'Chart of Accounts', badge: null },
      { path: '/admin/accounts/transactions', icon: Receipt, label: 'Transactions', badge: null },
      { path: '/admin/accounts/invoices', icon: FileText, label: 'Invoices', badge: '124' },
      { path: '/admin/accounts/payments', icon: CreditCard, label: 'Payments', badge: null },
      { path: '/admin/accounts/revenue', icon: TrendingUp, label: 'Revenue', badge: null },
      { path: '/admin/accounts/expenses', icon: TrendingDown, label: 'Expenses', badge: null },
    ]
  },
  {
    id: 'hr',
    path: '/admin/hr',
    icon: Briefcase,
    label: 'Human Resources',
    badge: null,
    children: [
      { path: '/admin/hr/employees', icon: UserCheck, label: 'Employees', badge: '89' },
      { path: '/admin/hr/attendance', icon: Clock, label: 'Attendance', badge: null },
      { path: '/admin/hr/payroll', icon: CreditCard, label: 'Payroll', badge: null },
      { path: '/admin/hr/performance', icon: Target, label: 'Performance', badge: null },
      { path: '/admin/hr/training', icon: GraduationCap, label: 'Training', badge: null },
    ]
  },
  {
    id: 'communications',
    path: '/admin/communications',
    icon: MessageSquare,
    label: 'Communications',
    badge: '5',
    children: [
      { path: '/admin/communications/email', icon: Mail, label: 'Email Management', badge: '12' },
      { path: '/admin/communications/notifications', icon: Bell, label: 'Notifications', badge: '5' },
      { path: '/admin/communications/sms', icon: MessageSquare, label: 'SMS Campaigns', badge: null },
      { path: '/admin/communications/alerts', icon: AlertCircle, label: 'System Alerts', badge: null },
    ]
  },
  {
    id: 'marketing',
    path: '/admin/marketing',
    icon: Megaphone,
    label: 'Marketing',
    badge: null,
    children: [
      { path: '/admin/marketing/campaigns', icon: Megaphone, label: 'Campaigns', badge: '3' },
      { path: '/admin/marketing/promotions', icon: Award, label: 'Promotions', badge: '8' },
      { path: '/admin/marketing/social-media', icon: Video, label: 'Social Media', badge: null },
      { path: '/admin/marketing/content', icon: FileText, label: 'Content Management', badge: null },
    ]
  },
  {
    id: 'reports',
    path: '/admin/reports',
    icon: FileSpreadsheet,
    label: 'Reports & Analytics',
    badge: null,
    children: [
      { path: '/admin/reports/hub', icon: FileSpreadsheet, label: 'Reports Hub', badge: null },
      { path: '/admin/reports/patients', icon: Users, label: 'Patient Reports', badge: null },
      { path: '/admin/reports/financial', icon: DollarSign, label: 'Financial Reports', badge: null },
      { path: '/admin/reports/operational', icon: BarChart3, label: 'Operational Reports', badge: null },
      { path: '/admin/reports/custom', icon: FileSearch, label: 'Custom Reports', badge: null },
    ]
  },
  {
    id: 'content',
    path: '/admin/content',
    icon: Image,
    label: 'Content Management',
    badge: null,
    children: [
      { path: '/admin/banners', icon: Image, label: 'Banners', badge: '8' },
      { path: '/admin/notices', icon: FileText, label: 'Notices', badge: '12' },
      { path: '/admin/content/pages', icon: FileText, label: 'Pages', badge: null },
      { path: '/admin/content/media', icon: Image, label: 'Media Library', badge: null },
    ]
  },
  {
    id: 'system',
    path: '/admin/system',
    icon: Settings,
    label: 'System Settings',
    badge: null,
    children: [
      { path: '/admin/settings', icon: Settings, label: 'General Settings', badge: null },
      { path: '/admin/system/security', icon: Shield, label: 'Security', badge: null },
      { path: '/admin/system/backups', icon: Download, label: 'Backups', badge: null },
      { path: '/admin/system/logs', icon: FileText, label: 'System Logs', badge: null },
    ]
  }
];

export default function ProfessionalAdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState(new Set(['dashboard']));
  const [activeMenu, setActiveMenu] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // Auto-expand menu based on current path
    const currentPath = location.pathname;
    const activeMenuItem = professionalMenuItems.find(item => 
      currentPath === item.path || currentPath.startsWith(item.path + '/')
    );
    
    if (activeMenuItem) {
      setActiveMenu(activeMenuItem.id);
      setExpandedMenus(prev => new Set([...prev, activeMenuItem.id]));
    }
  }, [location.pathname]);

  const handleLogout = () => {
    navigate('/auth');
  };

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => {
      const newSet = new Set(prev);
      if (newSet.has(menuId)) {
        newSet.delete(menuId);
      } else {
        newSet.add(menuId);
      }
      return newSet;
    });
  };

  const isMenuActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const isChildActive = (children) => {
    return children?.some(child => location.pathname === child.path);
  };

  const renderMenuItem = (item, level = 0, isMobile = false) => {
    const hasChildren = item.children && item.children.length > 0;
    const isActive = isMenuActive(item.path);
    const isExpanded = expandedMenus.has(item.id);
    const childActive = hasChildren && isChildActive(item.children);

    if (hasChildren) {
      return (
        <div key={item.id} className="w-full">
          <button
            onClick={() => toggleMenu(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200 ${
              childActive 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                : 'text-white/80 hover:bg-white/10 hover:text-white'
            }`}
            style={{ paddingLeft: `${level * 12 + 16}px` }}
          >
            <div className="flex items-center gap-3 flex-1">
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="font-medium text-left">{item.label}</span>
              {item.badge && (
                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                  childActive ? 'bg-white/20 text-white' : 'bg-white/20 text-white'
                }`}>
                  {item.badge}
                </span>
              )}
            </div>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`} />
          </button>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="ml-2 border-l border-white/20">
                  {item.children.map(child => renderMenuItem(child, level + 1, isMobile))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      );
    }

    return (
      <Link
        key={item.path}
        to={item.path}
        onClick={() => isMobile && setSidebarOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-all duration-200 ${
          isActive 
            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
            : 'text-white/80 hover:bg-white/10 hover:text-white'
        }`}
        style={{ paddingLeft: `${level * 12 + 16}px` }}
      >
        <item.icon className="w-5 h-5 flex-shrink-0" />
        <span className="font-medium flex-1">{item.label}</span>
        {item.badge && (
          <span className={`px-2 py-1 text-xs font-bold rounded-full ${
            isActive ? 'bg-white/20 text-white' : 'bg-white/20 text-white'
          }`}>
            {item.badge}
          </span>
        )}
        {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-80 bg-gradient-to-b from-gray-900 to-gray-800 text-white fixed inset-y-0 left-0 z-40 shadow-2xl">
        {/* Logo Section */}
        <div className="p-6 border-b border-white/10">
          <Link to="/admin" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform">
              <HeartPulse className="w-7 h-7 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-white">Medigo</span>
              <span className="text-xs text-blue-400 font-medium">Healthcare Admin</span>
            </div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="mb-6">
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 px-4">
              Main Navigation
            </h3>
            {professionalMenuItems.slice(0, 6).map((item) => renderMenuItem(item))}
          </div>
          
          <div>
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 px-4">
              Management
            </h3>
            {professionalMenuItems.slice(6, 12).map((item) => renderMenuItem(item))}
          </div>

          <div>
            <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-3 px-4">
              System
            </h3>
            {professionalMenuItems.slice(12).map((item) => renderMenuItem(item))}
          </div>
        </nav>

        {/* User Section */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-white">Admin User</p>
              <p className="text-xs text-white/60">admin@medigo.com</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50">
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-80 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl"
            >
              <div className="p-6 flex justify-between items-center border-b border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                    <HeartPulse className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-bold text-xl">Medigo Admin</span>
                </div>
                <button 
                  onClick={() => setSidebarOpen(false)} 
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <nav className="p-4 overflow-y-auto max-h-[calc(100vh-120px)]">
                {professionalMenuItems.map((item) => renderMenuItem(item, 0, true))}
              </nav>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 lg:ml-80">
        {/* Top Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-8 py-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Menu className="w-6 h-6 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {professionalMenuItems.find(item => isMenuActive(item.path))?.label || 'Admin Dashboard'}
                </h1>
                <p className="text-sm text-gray-500">
                  {location.pathname === '/admin' ? 'Welcome back! Here\'s what\'s happening at Medigo Healthcare.' : 'Manage your healthcare platform'}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                />
              </div>
              <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="hidden sm:block text-right">
                <p className="font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@medigo.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
