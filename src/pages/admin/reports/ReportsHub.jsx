import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Users,
  Stethoscope,
  Calendar,
  DollarSign,
  Package,
  FlaskConical,
  Ambulance,
  ShoppingCart,
  Heart,
  FileSpreadsheet,
  BarChart3,
  ArrowRight,
  TrendingUp,
  FileText,
} from 'lucide-react';

const reportCards = [
  { id: 'patients', label: 'Patient Reports', description: 'Patient analytics, registrations & visit statistics', icon: Users, path: '/admin/reports/patients', color: 'from-blue-500 to-blue-600' },
  { id: 'doctors', label: 'Doctor Reports', description: 'Doctor performance, schedules & consultation stats', icon: Stethoscope, path: '/admin/reports/doctors', color: 'from-emerald-500 to-emerald-600' },
  { id: 'appointments', label: 'Appointment Reports', description: 'Appointment volume, status & revenue by period', icon: Calendar, path: '/admin/reports/appointments', color: 'from-violet-500 to-violet-600' },
  { id: 'financial', label: 'Financial Reports', description: 'Revenue, expenses, profit & loss summaries', icon: DollarSign, path: '/admin/reports/financial', color: 'from-amber-500 to-amber-600' },
  { id: 'inventory', label: 'Inventory Reports', description: 'Stock levels, movements & low-stock alerts', icon: Package, path: '/admin/reports/inventory', color: 'from-orange-500 to-orange-600' },
  { id: 'lab', label: 'Lab Reports', description: 'Lab test bookings, results & revenue', icon: FlaskConical, path: '/admin/reports/lab', color: 'from-purple-500 to-purple-600' },
  { id: 'emergency', label: 'Emergency Reports', description: 'Emergency cases, response times & outcomes', icon: Ambulance, path: '/admin/reports/emergency', color: 'from-red-500 to-red-600' },
  { id: 'sales', label: 'Sales Reports', description: 'Orders, top products & sales by period', icon: ShoppingCart, path: '/admin/reports/sales', color: 'from-teal-500 to-teal-600' },
  { id: 'services', label: 'Service Reports', description: 'Service usage, revenue & popularity', icon: Heart, path: '/admin/reports/services', color: 'from-pink-500 to-pink-600' },
  { id: 'custom', label: 'Custom Reports', description: 'Build and export custom report criteria', icon: FileSpreadsheet, path: '/admin/reports/custom', color: 'from-slate-500 to-slate-600' },
];

export default function ReportsHub() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-[#111827]">Reports Center</h1>
        <p className="text-gray-500 mt-1">View and export analytics across patients, appointments, sales, lab, and more</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {reportCards.map((card, i) => (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Link to={card.path}>
              <div className="group h-full p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg hover:border-[#5DBB63]/30 transition-all duration-200">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <card.icon className="w-6 h-6 text-white" />
                </div>
                <h2 className="font-semibold text-[#111827] text-lg mb-1 group-hover:text-[#5DBB63] transition-colors">{card.label}</h2>
                <p className="text-sm text-gray-500 mb-4">{card.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-medium text-[#5DBB63]">
                  Open report <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-gradient-to-br from-[#f0fdf2] to-[#dcfce7] border border-[#5DBB63]/20">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-xl bg-[#5DBB63] flex items-center justify-center">
            <BarChart3 className="w-7 h-7 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-[#111827]">Quick tips</h3>
            <p className="text-sm text-gray-600 mt-0.5">Use date filters and Export (PDF/CSV) on each report page. Custom Reports let you combine multiple data sources.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
