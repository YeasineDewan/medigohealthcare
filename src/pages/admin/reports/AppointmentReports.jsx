import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReportPageLayout from '../../../components/admin/reports/ReportPageLayout';
import { reportsApi } from '../../../services/apiService';
import { Calendar, CheckCircle, Clock, DollarSign } from 'lucide-react';

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

export default function AppointmentReports() {
  const [dateRange, setDateRange] = useState('this-month');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState({ data: [], summary: {} });

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = getDateRange(dateRange);
      const res = await reportsApi.appointments(params);
      setData(res.data);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load appointments. Ensure you are logged in.');
      setData({ data: [], summary: {} });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const summary = data.summary || {};
  const appointments = data.data || [];
  const byStatus = summary.by_status || {};

  return (
    <ReportPageLayout
      title="Appointment Reports"
      description="Appointment volume, status and revenue by period"
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
                <p className="text-sm text-gray-500">Total Appointments</p>
                <p className="text-2xl font-bold text-gray-900">{summary.total ?? appointments.length}</p>
              </div>
              <div className="w-12 h-12 bg-violet-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-violet-600" />
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
            <h2 className="font-semibold text-gray-900">Appointment List</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Doctor</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Fee</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {appointments.length === 0 && !loading && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No appointments in this period.</td></tr>
                )}
                {appointments.map((apt, i) => (
                  <motion.tr key={apt.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-900">{apt.appointment_date || apt.date || '—'}</td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900">{apt.user?.name || apt.patient_name || '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{apt.doctor?.user?.name || apt.doctor_name || '—'}</td>
                    <td className="px-4 py-3 font-medium text-gray-900">${Number(apt.consultation_fee || 0).toFixed(2)}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        apt.status === 'completed' ? 'bg-green-100 text-green-700' :
                        apt.status === 'pending' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-600'
                      }`}>{apt.status || '—'}</span>
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
