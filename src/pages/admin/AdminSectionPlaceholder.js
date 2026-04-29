import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { LayoutDashboard, FileQuestion, ArrowLeft } from 'lucide-react';

const sectionTitles = {
  accounts: 'Accounts',
  hr: 'HR',
  reports: 'Reports',
  medical: 'Medical',
  departments: 'Departments',
  pharmacy: 'Pharmacy',
  lab: 'Laboratory',
  patients: 'Patients',
  doctors: 'Doctors',
  inventory: 'Inventory',
  emergency: 'Emergency',
  services: 'Services',
  marketing: 'Marketing',
  communications: 'Communications',
  analysis: 'Analysis',
  settings: 'Settings',
};

export default function AdminSectionPlaceholder() {
  const location = useLocation();
  const path = location.pathname.replace('/admin/', '');
  const section = path.split('/')[0] || 'admin';
  const title = sectionTitles[section] || section.replace(/-/g, ' ');
  const displayTitle = title.charAt(0).toUpperCase() + title.slice(1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center min-h-[60vh] px-4"
    >
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 rounded-2xl bg-[#f0fdf2] flex items-center justify-center mx-auto mb-6">
          <FileQuestion className="w-10 h-10 text-[#5DBB63]" />
        </div>
        <h1 className="text-2xl font-bold text-[#111827] mb-2">{displayTitle}</h1>
        <p className="text-gray-500 mb-6">
          This section is being configured or will be available in a future update. Use the main menu to access other areas.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/admin"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-[#5DBB63] text-white font-medium hover:bg-[#4CAF50] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Link>
          <Link
            to="/admin/settings"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            <LayoutDashboard className="w-4 h-4" />
            Settings
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
