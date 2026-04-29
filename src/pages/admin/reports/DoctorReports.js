import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReportPageLayout from '../../../components/admin/reports/ReportPageLayout';
import { reportsApi } from '../../../services/apiService';
import { Stethoscope, Users, CalendarCheck, DollarSign, TrendingUp } from 'lucide-react';

export default function DoctorReports() {
  const [dateRange, setDateRange] = useState('this-month');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ data: [], summary: {} });

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await reportsApi.users({ role: 'doctor' });
      setData(res.data);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load doctor report. Ensure you are logged in.');
      setData({ data: [], summary: { total: 0, by_role: {}, active: 0 } });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const summary = data.summary || {};
  const doctors = data.data || [];

  return (
    <ReportPageLayout
      title="Doctor Reports"
      description="Doctor performance, schedules and consultation statistics"
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
                <p className="text-sm text-gray-500">Total Doctors</p>
                <p className="text-2xl font-bold text-gray-900">{summary.total ?? doctors.length}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Active</p>
                <p className="text-2xl font-bold text-green-600">{summary.active ?? doctors.filter(d => d.is_active !== false).length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Appointments</p>
                <p className="text-2xl font-bold text-blue-600">{doctors.reduce((s, d) => s + (d.appointments_count || 0), 0)}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CalendarCheck className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Orders (Pharmacy)</p>
                <p className="text-2xl font-bold text-amber-600">{doctors.reduce((s, d) => s + (d.orders_count || 0), 0)}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-900">Doctor List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Doctor</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email / Contact</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Appointments</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Orders</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {doctors.length === 0 && !loading && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No doctor data found.</td></tr>
                )}
                {doctors.map((d, i) => (
                  <motion.tr key={d.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.03 }} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-semibold">
                          {(d.name || d.email || 'D').charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-900">{d.name || d.email || '—'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">{d.email || '—'}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{d.appointments_count ?? 0}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">{d.orders_count ?? 0}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${d.is_active !== false ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {d.is_active !== false ? 'Active' : 'Inactive'}
                      </span>
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
