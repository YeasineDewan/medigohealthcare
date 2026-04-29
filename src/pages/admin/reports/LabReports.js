import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReportPageLayout from '../../../components/admin/reports/ReportPageLayout';
import { reportsApi } from '../../../services/apiService';
import { FlaskConical, CheckCircle, Clock, DollarSign } from 'lucide-react';

function getDateRange(value) {
  const now = new Date();
  let start = new Date(now);
  if (value === 'today') start.setHours(0, 0, 0, 0);
  else if (value === 'this-week') start.setDate(now.getDate() - 7);
  else if (value === 'this-month') start.setMonth(now.getMonth() - 1);
  else if (value === 'this-quarter') start.setMonth(now.getMonth() - 3);
  else if (value === 'this-year') start.setFullYear(now.getFullYear() - 1);
  return { start_date: start.toISOString().split('T')[0], end_date: now.toISOString().split('T')[0] };
}

export default function LabReports() {
  const [dateRange, setDateRange] = useState('this-month');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ data: [], summary: {} });

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = getDateRange(dateRange);
      const res = await reportsApi.labTests(params);
      setData(res.data);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load lab report. Ensure you are logged in.');
      setData({ data: [], summary: {} });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const summary = data.summary || {};
  const bookings = data.data || [];
  const byStatus = summary.by_status || {};

  return (
    <ReportPageLayout
      title="Lab Reports"
      description="Lab test bookings, results and revenue"
      dateRange={dateRange}
      onDateRangeChange={setDateRange}
      onRefresh={fetchData}
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
                <p className="text-2xl font-bold text-gray-900">{summary.total ?? bookings.length}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FlaskConical className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-green-600">{byStatus.completed ?? 0}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold text-amber-600">{byStatus.pending ?? 0}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Revenue</p>
                <p className="text-2xl font-bold text-emerald-600">${Number(summary.total_revenue || 0).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-900">Lab Test Bookings</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Test</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Price</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {bookings.length === 0 && !loading && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No lab bookings in this period.</td></tr>
                )}
                {bookings.map((b, i) => (
                  <motion.tr key={b.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{b.booking_date || b.created_at ? new Date(b.booking_date || b.created_at).toLocaleDateString() : '—'}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{b.user?.name || b.user?.email || '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{b.lab_test?.name || b.test_name || '—'}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">${Number(b.price || 0).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${b.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{b.status || '—'}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ReportPageLayout>
  );
}
