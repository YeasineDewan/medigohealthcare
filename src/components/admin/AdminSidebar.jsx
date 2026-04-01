import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calendar, ShoppingCart, Package, TestTube, 
  FileText, Settings, Bell, Image, CreditCard, BarChart3, Activity,
  Stethoscope, Truck, Building2, Shield, Database, Folder, Mail 
} from 'lucide-react';

const navItems = [
  { id: 'dashboard', label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { id: 'notices', label: 'Notices', path: '/admin/notices', icon: Bell },
  { id: 'banners', label: 'Banners', path: '/admin/banners', icon: Image },
  { id: 'doctors', label: 'Doctors', path: '/admin/doctors', icon: Stethoscope },
  { id: 'patients', label: 'Patients', path: '/admin/patients', icon: Users },
  { id: 'appointments', label: 'Appointments', path: '/admin/appointments', icon: Calendar },
  { id: 'orders', label: 'Orders', path: '/admin/orders', icon: ShoppingCart },
  { id: 'products', label: 'Products', path: '/admin/products', icon: Package },
  { id: 'categories', label: 'Categories', path: '/admin/categories', icon: Folder },
  { id: 'lab-tests', label: 'Lab Tests', path: '/admin/lab-tests', icon: TestTube },
  { id: 'inventory', label: 'Inventory', path: '/admin/inventory', icon: Database },
  { id: 'accounts', label: 'Accounts', path: '/admin/accounts', icon: CreditCard },
  { id: 'reports', label: 'Reports', path: '/admin/reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', path: '/admin/settings', icon: Settings },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen p-4 shadow-lg">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#5DBB63]">Medigo Admin</h1>
        <p className="text-sm text-gray-600">Healthcare Platform</p>
      </div>
      
      <nav className="space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path || location.pathname.startsWith(item.path + '/');
          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
                isActive 
                  ? 'bg-[#5DBB63] text-white shadow-md' 
                  : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <item.icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-500 group-hover:text-[#5DBB63]'}`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default AdminSidebar;
