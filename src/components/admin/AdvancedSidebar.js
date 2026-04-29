import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronDown, ChevronRight, ChevronUp, Users, FileText, DollarSign, 
  TrendingUp, Activity, Heart, Stethoscope, Calculator, UserCheck, 
  BookOpen, Settings, Home, Menu, X, LogOut, Bell, Search, Filter,
  FileSearch, FileDown, FileUp, Receipt, CreditCard, Wallet, PiggyBank,
  Target, BarChart3, PieChart, LineChart, Calendar, Clock, AlertCircle,
  CheckCircle, XCircle, UserPlus, UserMinus, Briefcase, GraduationCap,
  Award, Shield, Building, Hospital, TestTube, Microscope, FlaskConical,
  Clipboard, ClipboardCheck, ClipboardX, FileSignature, FileText as FileTextIcon, FileSpreadsheet, Database, Server, Cloud, Download, Upload,
  Folder, Scale, Pill
} from 'lucide-react';

const menuItems = [
  {
    id: 'report',
    title: 'REPORT',
    icon: FileText,
    color: 'blue',
    submenu: [
      { id: 'patient-list', title: 'Patient List / Search Patient', icon: Users, path: '/admin/report/patient-list' },
      { id: 'expenses-summary', title: 'Expenses Summary', icon: DollarSign, path: '/admin/report/expenses-summary' },
      { id: 'view-all-transactions', title: 'View All Transaction', icon: Activity, path: '/admin/report/view-all-transactions' },
      { id: 'daily-category-wise', title: 'Daily Category Wise Report', icon: BarChart3, path: '/admin/report/daily-category-wise' },
      { id: 'daily-test-wise', title: 'Daily Test Wise Report', icon: TestTube, path: '/admin/report/daily-test-wise' },
      { id: 'doctor-wise-income', title: 'Doctor Wise Test Income', icon: Stethoscope, path: '/admin/report/doctor-wise-income' },
      { id: 'supplier-ledger', title: 'Supplier Ledger', icon: Building, path: '/admin/report/supplier-ledger' },
      { id: 'supplier-due-list', title: 'Supplier Due List', icon: AlertCircle, path: '/admin/report/supplier-due-list' },
      { id: 'discount-summary', title: 'Discount Summary', icon: Target, path: '/admin/report/discount-summary' },
      { id: 'agent-wise-income', title: 'Agent Wise Test Income', icon: Users, path: '/admin/report/agent-wise-income' },
      { id: 'daily-referral-paid', title: 'Daily Referral Paid Summary', icon: Wallet, path: '/admin/report/daily-referral-paid' },
      { id: 'daily-agent-due', title: 'Daily Agent Due Summary', icon: AlertCircle, path: '/admin/report/daily-agent-due' },
      { id: 'patient-wise-income', title: 'Patient Wise Income', icon: PiggyBank, path: '/admin/report/patient-wise-income' },
      { id: 'all-income', title: 'All Income', icon: TrendingUp, path: '/admin/report/all-income' },
      { id: 'patient-ledger', title: 'Patient Ledger', icon: FileText, path: '/admin/report/patient-ledger' },
      { id: 'patient-due-list', title: 'Patient Due List', icon: AlertCircle, path: '/admin/report/patient-due-list' },
      { id: 'expenses-list', title: 'Expenses List', icon: DollarSign, path: '/admin/report/expenses-list' },
      { id: 'income-list', title: 'Income List', icon: TrendingUp, path: '/admin/report/income-list' },
      { id: 'hr-account-ledger', title: 'HR Account Ledger', icon: UserCheck, path: '/admin/report/hr-account-ledger' },
      { id: 'daily-doctor-due', title: 'Daily Doctor Due Summary', icon: AlertCircle, path: '/admin/report/daily-doctor-due' },
      { id: 'agent-wise-list', title: 'Agent Wise List', icon: Users, path: '/admin/report/agent-wise-list' },
      { id: 'medical-transaction', title: 'Medical Transaction', icon: Heart, path: '/admin/report/medical-transaction' },
      { id: 'diagnostic-revenue', title: 'Diagnostic Revenue Statement', icon: FileText, path: '/admin/report/diagnostic-revenue' },
      { id: 'medical-revenue', title: 'Medical Revenue Statement', icon: FileText, path: '/admin/report/medical-revenue' },
      { id: 'diagnostic-transaction', title: 'Diagnostic Transaction', icon: Activity, path: '/admin/report/diagnostic-transaction' },
      { id: 'medical-diagnostic-transaction', title: 'Medical Transaction + Diagnostic Transaction', icon: Activity, path: '/admin/report/medical-diagnostic-transaction' },
      { id: 'agent-commission-report', title: 'Agent Commission Report', icon: Users, path: '/admin/report/agent-commission-report' }
    ]
  },
  {
    id: 'medical-checkup',
    title: 'MEDICAL CHECK-UP',
    icon: Heart,
    color: 'red',
    submenu: [
      { id: 'registration', title: 'Registration', icon: UserPlus, path: '/admin/medical-checkup/registration' },
      { id: 'bill-list', title: 'Bill List', icon: FileText, path: '/admin/medical-checkup/bill-list' },
      { id: 'pending-report-list', title: 'Pending Report List', icon: Clock, path: '/admin/medical-checkup/pending-report-list' },
      { id: 'complete-report-list', title: 'Complete Report List', icon: CheckCircle, path: '/admin/medical-checkup/complete-report-list' },
      { id: 'due-collection', title: 'Due Collection', icon: Wallet, path: '/admin/medical-checkup/due-collection' },
      { id: 'due-collection-history', title: 'Due Collection History', icon: Clock, path: '/admin/medical-checkup/due-collection-history' }
    ]
  },
  {
    id: 'analysis-setup',
    title: 'ANALYSIS SETUP',
    icon: Microscope,
    color: 'purple',
    submenu: [
      { id: 'analysis-department', title: 'Analysis Department', icon: Building, path: '/admin/analysis-setup/analysis-department' },
      { id: 'test-service-category', title: 'Test/Service Category Entry', icon: Folder, path: '/admin/analysis-setup/test-service-category' },
      { id: 'analysis-specimen', title: 'Analysis Specimen', icon: TestTube, path: '/admin/analysis-setup/analysis-specimen' },
      { id: 'test-service-entry', title: 'Test/Service Entry', icon: FlaskConical, path: '/admin/analysis-setup/test-service-entry' },
      { id: 'sample-collection-room', title: 'Sample Collection Room', icon: Building, path: '/admin/analysis-setup/sample-collection-room' }
    ]
  },
  {
    id: 'accounts',
    title: 'ACCOUNTS',
    icon: Calculator,
    color: 'green',
    submenu: [
      { id: 'create-group', title: 'Create Group', icon: Folder, path: '/admin/accounts/create-group' },
      { id: 'create-ledger', title: 'Create Ledger', icon: BookOpen, path: '/admin/accounts/create-ledger' },
      { id: 'chart-of-accounts', title: 'Chart of Accounts', icon: Database, path: '/admin/accounts/chart-of-accounts' },
      { id: 'create-voucher', title: 'Create Voucher', icon: FileText, path: '/admin/accounts/create-voucher' },
      { id: 'journal-book', title: 'Journal Book', icon: BookOpen, path: '/admin/accounts/journal-book' },
      { id: 'general-ledger', title: 'General Ledger', icon: BookOpen, path: '/admin/accounts/general-ledger' },
      { id: 'trial-balance', title: 'Trial Balance', icon: Scale, path: '/admin/accounts/trial-balance' },
      { id: 'receipts-payments', title: 'Receipts & Payments', icon: Receipt, path: '/admin/accounts/receipts-payments' },
      { id: 'income-statement', title: 'Income Statement', icon: FileText, path: '/admin/accounts/income-statement' },
      { id: 'balance-sheet', title: 'Balance Sheet', icon: FileSpreadsheet, path: '/admin/accounts/balance-sheet' },
      { id: 'group-general-ledger', title: 'Group General Ledger', icon: BookOpen, path: '/admin/accounts/group-general-ledger' },
      { id: 'daily-income-statement', title: 'Daily Income Statement', icon: Calendar, path: '/admin/accounts/daily-income-statement' }
    ]
  },
  {
    id: 'pharmacy',
    title: 'PHARMACY',
    icon: Heart,
    color: 'teal',
    submenu: [
      { id: 'prescription-management', title: 'Prescription Management', icon: Shield, path: '/admin/pharmacy/prescription-management' },
      { id: 'prescription-orders', title: 'Prescription Orders', icon: FileText, path: '/admin/pharmacy/prescription-orders' },
      { id: 'medical-devices', title: 'Medical Devices', icon: Activity, path: '/admin/pharmacy/medical-devices' },
      { id: 'first-aid', title: 'First Aid', icon: Heart, path: '/admin/pharmacy/first-aid' },
      { id: 'supplements', title: 'Supplements', icon: Pill, path: '/admin/pharmacy/supplements' },
      { id: 'suppliers', title: 'Suppliers', icon: Building, path: '/admin/pharmacy/suppliers' },
      { id: 'sales', title: 'Sales', icon: DollarSign, path: '/admin/pharmacy/sales' },
      { id: 'stock-management', title: 'Stock Management', icon: Database, path: '/admin/pharmacy/stock-management' }
    ]
  },
  {
    id: 'hr',
    title: 'HR',
    icon: UserCheck,
    color: 'orange',
    submenu: [
      { id: 'employee-entry', title: 'Employee Entry', icon: UserPlus, path: '/admin/hr/employee-entry' },
      { id: 'attendance-panel', title: 'Attendance Panel', icon: Calendar, path: '/admin/hr/attendance-panel' },
      { id: 'salary-process', title: 'Salary Process', icon: DollarSign, path: '/admin/hr/salary-process' },
      { id: 'salary-payment', title: 'Salary Payment', icon: CreditCard, path: '/admin/hr/salary-payment' },
      { id: 'hr-ledger', title: 'HR Ledger', icon: BookOpen, path: '/admin/hr/hr-ledger' }
    ]
  }
];

const colorClasses = {
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    hover: 'hover:bg-blue-100',
    active: 'bg-blue-100 text-blue-700',
    border: 'border-blue-200',
    gradient: 'from-blue-500 to-blue-600'
  },
  red: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    hover: 'hover:bg-red-100',
    active: 'bg-red-100 text-red-700',
    border: 'border-red-200',
    gradient: 'from-red-500 to-red-600'
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    hover: 'hover:bg-purple-100',
    active: 'bg-purple-100 text-purple-700',
    border: 'border-purple-200',
    gradient: 'from-purple-500 to-purple-600'
  },
  green: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    hover: 'hover:bg-green-100',
    active: 'bg-green-100 text-green-700',
    border: 'border-green-200',
    gradient: 'from-green-500 to-green-600'
  },
  teal: {
    bg: 'bg-teal-50',
    text: 'text-teal-600',
    hover: 'hover:bg-teal-100',
    active: 'bg-teal-100 text-teal-700',
    border: 'border-teal-200',
    gradient: 'from-teal-500 to-teal-600'
  },
  orange: {
    bg: 'bg-orange-50',
    text: 'text-orange-600',
    hover: 'hover:bg-orange-100',
    active: 'bg-orange-100 text-orange-700',
    border: 'border-orange-200',
    gradient: 'from-orange-500 to-orange-600'
  }
};

export default function AdvancedSidebar({ isOpen, onToggle, onNavigate, currentPath }) {
  const [expandedMenus, setExpandedMenus] = useState({});
  const [hoveredMenu, setHoveredMenu] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    // Auto-expand menu if current path matches any submenu
    const currentMenu = menuItems.find(menu => 
      menu.submenu?.some(submenu => submenu.path === currentPath)
    );
    if (currentMenu) {
      setExpandedMenus(prev => ({ ...prev, [currentMenu.id]: true }));
    }
  }, [currentPath]);

  const toggleMenu = (menuId) => {
    setExpandedMenus(prev => ({
      ...prev,
      [menuId]: !prev[menuId]
    }));
  };

  const filteredMenuItems = menuItems.map(menu => ({
    ...menu,
    submenu: menu.submenu?.filter(submenu =>
      submenu.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(menu => 
    searchTerm === '' || 
    menu.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    menu.submenu?.length > 0
  );

  const renderMenuItem = (menu) => {
    const colors = colorClasses[menu.color];
    const isExpanded = expandedMenus[menu.id];
    const isHovered = hoveredMenu === menu.id;
    const hasActiveSubmenu = menu.submenu?.some(submenu => submenu.path === currentPath);

    return (
      <div key={menu.id} className="mb-2">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className={`
            relative overflow-hidden rounded-xl transition-all duration-300
            ${hasActiveSubmenu ? colors.active : colors.bg}
            ${isHovered ? colors.hover : ''}
            ${!isOpen ? 'mx-2' : ''}
          `}
          onMouseEnter={() => setHoveredMenu(menu.id)}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          {/* Gradient border effect */}
          <div className={`absolute inset-0 bg-gradient-to-r ${colors.gradient} opacity-10`}></div>
          
          <button
            onClick={() => toggleMenu(menu.id)}
            className={`
              relative w-full px-4 py-3 flex items-center justify-between
              transition-all duration-300 group
              ${hasActiveSubmenu ? colors.text : colors.text}
            `}
          >
            <div className="flex items-center gap-3">
              <div className={`
                p-2 rounded-lg transition-all duration-300
                ${hasActiveSubmenu ? 'bg-white shadow-md' : colors.bg}
              `}>
                <menu.icon className={`w-5 h-5 ${hasActiveSubmenu ? colors.text : colors.text}`} />
              </div>
              {isOpen && (
                <span className={`font-semibold text-sm ${hasActiveSubmenu ? colors.text : colors.text}`}>
                  {menu.title}
                </span>
              )}
            </div>
            
            {isOpen && (
              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3 }}
                className={`${colors.text}`}
              >
                <ChevronDown className="w-4 h-4" />
              </motion.div>
            )}
          </button>
        </motion.div>

        {/* Submenu */}
        <AnimatePresence>
          {isExpanded && menu.submenu && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="ml-4 mt-2 space-y-1">
                {menu.submenu.map((submenu, index) => {
                  const isActive = submenu.path === currentPath;
                  return (
                    <motion.div
                      key={submenu.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2, delay: index * 0.05 }}
                    >
                      <button
                        onClick={() => onNavigate(submenu.path)}
                        className={`
                          w-full px-4 py-2 rounded-lg flex items-center gap-3
                          transition-all duration-200 group
                          ${isActive 
                            ? 'bg-gradient-to-r ' + colors.gradient + ' text-white shadow-md' 
                            : 'text-gray-600 hover:bg-gray-100'
                          }
                        `}
                      >
                        <submenu.icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                        {isOpen && (
                          <span className={`text-sm ${isActive ? 'text-white font-medium' : ''}`}>
                            {submenu.title}
                          </span>
                        )}
                        {isActive && isOpen && (
                          <div className="ml-auto">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </button>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <div className={`
      h-full bg-white border-r border-gray-200 transition-all duration-300
      ${isOpen ? 'w-80' : 'w-20'}
      shadow-xl
    `}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3"
            >
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Settings className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-gray-900">Admin Panel</h2>
                <p className="text-xs text-gray-500">Management System</p>
              </div>
            </motion.div>
          )}
          
          <button
            onClick={onToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isOpen ? <ChevronLeft className="w-5 h-5 text-gray-600" /> : <Menu className="w-5 h-5 text-gray-600" />}
          </button>
        </div>

        {/* Search Bar */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mt-4"
          >
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search menu..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setShowSearch(true)}
                onBlur={() => setTimeout(() => setShowSearch(false), 200)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
              {showSearch && searchTerm && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                  <div className="p-2 text-xs text-gray-500">
                    {filteredMenuItems.reduce((acc, menu) => acc + (menu.submenu?.length || 0), 0)} results found
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      {/* Menu Items */}
      <div className="p-4 overflow-y-auto h-[calc(100%-140px)]">
        {filteredMenuItems.map(renderMenuItem)}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-white" />
          </div>
          {isOpen && (
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">admin@medigo.com</p>
            </div>
          )}
          <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
            <LogOut className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
