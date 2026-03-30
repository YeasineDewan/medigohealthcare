import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
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
  Bell,
  Image,
} from 'lucide-react';

const menuItems = [
  { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/doctors', icon: Stethoscope, label: 'Doctors' },
  { path: '/admin/patients', icon: Users, label: 'Patients' },
  { path: '/admin/appointments', icon: Calendar, label: 'Doctor Appointments' },
  { path: '/admin/categories', icon: FolderOpen, label: 'Product Categories' },
  { path: '/admin/products', icon: Pill, label: 'Pharmacy' },
  { path: '/admin/inventory', icon: Package, label: 'Inventory' },
  { path: '/admin/orders', icon: ShoppingCart, label: 'Orders' },
  { path: '/admin/lab-tests', icon: FlaskConical, label: 'Lab Tests' },
  { path: '/admin/services', icon: FolderOpen, label: 'Services Menu' },
  { path: '/admin/emergency', icon: Ambulance, label: 'Emergency' },
  { path: '/admin/banners', icon: Image, label: 'Banners' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-[#165028] text-white fixed inset-y-0 left-0 z-40">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#5DBB63] flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">Medigo Admin</span>
          </Link>
        </div>
        <nav className="flex-1 p-4 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 transition-colors ${
                  isActive ? 'bg-[#5DBB63] text-white' : 'text-white/80 hover:bg-white/10'
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="font-medium">{item.label}</span>
                {isActive && <ChevronRight className="w-4 h-4 ml-auto" />}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSidebarOpen(false)}
          />
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            className="absolute left-0 top-0 bottom-0 w-64 bg-[#165028] text-white"
          >
            <div className="p-6 flex justify-between items-center">
              <span className="font-bold text-xl">Menu</span>
              <button onClick={() => setSidebarOpen(false)} className="p-2">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="p-4">
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl mb-1 ${
                    location.pathname === item.path ? 'bg-[#5DBB63]' : 'text-white/80'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {item.label}
                </Link>
              ))}
            </nav>
          </motion.aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="hidden sm:block text-right">
                <p className="font-medium text-[#111827]">Admin User</p>
                <p className="text-xs text-gray-500">admin@medigo.com</p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
              >
                <LogOut className="w-5 h-5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </header>

        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
