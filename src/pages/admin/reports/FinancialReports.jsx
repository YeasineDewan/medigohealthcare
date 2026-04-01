import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReportPageLayout from '../../../components/admin/reports/ReportPageLayout';
import { reportsApi, dashboardApi } from '../../../services/apiService';
import { DollarSign, TrendingUp, ShoppingCart, CreditCard } from 'lucide-react';

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

export default function FinancialReports() {
  const [dateRange, setDateRange] = useState('this-month');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [salesData, setSalesData] = useState({ data: [], summary: {} });
  const [dashboardStats, setDashboardStats] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = getDateRange(dateRange);
      const [salesRes, statsRes] = await Promise.all([
        reportsApi.sales(params).catch(() => ({ data: { data: [], summary: {} } })),
        dashboardApi.revenue(params).catch(() => ({ data: null })),
      ]);
      setSalesData(salesRes.data);
      setDashboardStats(statsRes.data);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load financial data.');
      setSalesData({ data: [], summary: {} });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const summary = salesData.summary || {};
  const orders = salesData.data || [];
  const totalRevenue = summary.total_revenue ?? orders.filter(o => o.status === 'completed').reduce((s, o) => s + Number(o.total_amount || 0), 0);

  return (
    <ReportPageLayout
      title="Financial Reports"
      description="Revenue, expenses and profit summaries by period"
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
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold text-gray-900">${Number(totalRevenue).toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Orders</p>
                <p className="text-2xl font-bold text-blue-600">{summary.total_orders ?? orders.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold text-green-600">{(summary.by_status && summary.by_status.completed) ?? orders.filter(o => o.status === 'completed').length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Order</p>
                <p className="text-2xl font-bold text-emerald-600">${(() => { const completed = orders.filter(o => o.status === 'completed'); return completed.length ? (totalRevenue / completed.length).toFixed(0) : '0'; })()}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-900">Recent Orders (Revenue)</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Order ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Amount</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {orders.length === 0 && !loading && (
                  <tr><td colSpan={5} className="px-4 py-8 text-center text-gray-500">No orders in this period.</td></tr>
                )}
                {orders.slice(0, 50).map((o, i) => (
                  <motion.tr key={o.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">#{o.id}</td>
                    <td className="px-4 py-3 text-sm text-gray-600">{o.user?.name || o.user?.email || '—'}</td>
                    <td className="px-4 py-3 text-sm text-gray-500">{o.created_at ? new Date(o.created_at).toLocaleDateString() : '—'}</td>
                    <td className="px-4 py-3 font-medium text-green-600">${Number(o.total_amount || 0).toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${o.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{o.status || '—'}</span>
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
