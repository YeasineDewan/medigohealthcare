import { motion } from 'framer-motion';
import { Users, Stethoscope, Calendar, ShoppingCart, TrendingUp, ArrowUpRight, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const stats = [
  { label: 'Total Patients', value: '24,892', icon: Users, color: 'bg-[#5DBB63]', change: '+12%' },
  { label: 'Doctors', value: '156', icon: Stethoscope, color: 'bg-[#165028]', change: '+5' },
  { label: 'Appointments Today', value: '89', icon: Calendar, color: 'bg-blue-500', change: '+8' },
  { label: 'Orders This Month', value: '1,234', icon: ShoppingCart, color: 'bg-amber-500', change: '+23%' },
];

const recentAppointments = [
  { id: 1, patient: 'Ahmed Khan', doctor: 'Dr. Fatima Rahman', time: '10:00 AM', status: 'confirmed' },
  { id: 2, patient: 'Sara Ali', doctor: 'Dr. Karim Ahmed', time: '10:30 AM', status: 'pending' },
  { id: 3, patient: 'Rahman Hossain', doctor: 'Dr. Nusrat Jahan', time: '11:00 AM', status: 'confirmed' },
  { id: 4, patient: 'Maria Islam', doctor: 'Dr. Ahmed Hassan', time: '11:30 AM', status: 'completed' },
];

const quickLinks = [
  { to: '/admin/doctors', label: 'Manage Doctors', icon: Stethoscope },
  { to: '/admin/patients', label: 'View Patients', icon: Users },
  { to: '/admin/appointments', label: 'Doctor Appointments', icon: Calendar },
  { to: '/admin/inventory', label: 'Inventory', icon: Package },
  { to: '/admin/orders', label: 'Orders', icon: ShoppingCart },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Dashboard</h1>
        <p className="text-gray-500 mt-1">Overview of your platform</p>
      </div>

      {/* Stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-gray-500 text-sm">{stat.label}</p>
                <p className="text-2xl font-bold text-[#111827] mt-1">{stat.value}</p>
                <p className="text-sm text-[#5DBB63] font-medium mt-1">{stat.change} from last month</p>
              </div>
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Appointments */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-semibold text-[#111827]">Today's Appointments</h2>
            <Link to="/admin/appointments" className="text-[#5DBB63] font-medium text-sm flex items-center gap-1">
              View all <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="space-y-4">
            {recentAppointments.map((apt) => (
              <div
                key={apt.id}
                className="flex items-center justify-between p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div>
                  <p className="font-medium text-[#111827]">{apt.patient}</p>
                  <p className="text-sm text-gray-500">{apt.doctor} · {apt.time}</p>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    apt.status === 'confirmed'
                      ? 'bg-[#f0fdf2] text-[#165028]'
                      : apt.status === 'pending'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <h2 className="font-semibold text-[#111827] mb-6">Quick Actions</h2>
          <div className="space-y-2">
            {quickLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#f0fdf2] transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-[#f0fdf2] flex items-center justify-center group-hover:bg-[#5DBB63]/20">
                  <link.icon className="w-5 h-5 text-[#5DBB63]" />
                </div>
                <span className="font-medium text-[#111827]">{link.label}</span>
                <ArrowUpRight className="w-4 h-4 ml-auto text-gray-400 group-hover:text-[#5DBB63]" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Chart placeholder */}
      <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <h2 className="font-semibold text-[#111827] mb-4">Revenue Overview</h2>
        <div className="h-64 flex items-center justify-center bg-gradient-to-br from-[#f0fdf2] to-[#dcfce7] rounded-xl">
          <div className="text-center text-gray-500">
            <TrendingUp className="w-16 h-16 mx-auto mb-2 opacity-50" />
            <p>Chart integration ready</p>
          </div>
        </div>
      </div>
    </div>
  );
}
