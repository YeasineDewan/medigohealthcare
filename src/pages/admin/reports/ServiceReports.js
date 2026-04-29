import { useState } from 'react';
import { motion } from 'framer-motion';
import ReportPageLayout from '../../../components/admin/reports/ReportPageLayout';
import { Heart, DollarSign, TrendingUp, Users } from 'lucide-react';

// Placeholder – connect to services API when available
export default function ServiceReports() {
  const [dateRange, setDateRange] = useState('this-month');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const summary = { totalBookings: 0, revenue: 0, topService: '—' };
  const list = [];

  return (
    <ReportPageLayout
      title="Service Reports"
      description="Service usage, revenue and popularity"
      dateRange={dateRange}
      onDateRangeChange={setDateRange}
      onRefresh={() => {}}
      loading={loading}
      error={error}
      onExport={() => window.print()}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Bookings</p>
                <p className="text-2xl font-bold text-gray-900">{summary.totalBookings}</p>
              </div>
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center">
                <Heart className="w-6 h-6 text-pink-600" />
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-2xl font-bold text-green-600">${Number(summary.revenue).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Top Service</p>
                <p className="text-lg font-bold text-gray-900 truncate max-w-[120px]" title={summary.topService}>{summary.topService}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Unique Users</p>
                <p className="text-2xl font-bold text-blue-600">{list.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-900">Service Usage</h2>
          </div>
          <div className="p-8 text-center text-gray-500">
            No service booking data in this period. Connect the Services module API to see data here.
          </div>
        </div>
      </div>
    </ReportPageLayout>
  );
}
