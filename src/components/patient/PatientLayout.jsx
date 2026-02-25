import { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Calendar,
  ClipboardList,
  Video,
  ShoppingBag,
  FileText,
  Pill,
  User,
  Menu,
  X,
  LogOut,
  ChevronRight,
  Bell,
  Stethoscope,
} from 'lucide-react';

const menuItems = [
  { path: '/patient', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/patient/book', icon: Calendar, label: 'Book Doctor' },
  { path: '/patient/live-consult', icon: Video, label: '24/7 Live Consult' },
  { path: '/patient/appointments', icon: ClipboardList, label: 'My Appointments' },
  { path: '/patient/orders', icon: ShoppingBag, label: 'Orders' },
  { path: '/patient/records', icon: FileText, label: 'Health Records' },
  { path: '/patient/prescriptions', icon: Pill, label: 'Prescriptions' },
  { path: '/patient/profile', icon: User, label: 'Profile' },
];

export default function PatientLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => navigate('/auth');

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="hidden lg:flex flex-col w-64 bg-[#165028] text-white fixed inset-y-0 left-0 z-40">
        <div className="p-6 border-b border-white/10">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-[#5DBB63] flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl">Medigo Patient</span>
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

      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-[#165028] text-white">
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
          </aside>
        </div>
      )}

      <div className="flex-1 lg:ml-64">
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 px-4 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
              <Menu className="w-6 h-6" />
            </button>
            <div className="flex-1" />
            <div className="flex items-center gap-4">
              <button className="relative p-2 rounded-lg hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <div className="hidden sm:block text-right">
                <p className="font-medium text-[#111827]">Ahmed Khan</p>
                <p className="text-xs text-gray-500">Patient</p>
              </div>
              <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-2 rounded-lg text-red-600 hover:bg-red-50">
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
