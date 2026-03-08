import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ReportPageLayout from '../../../components/admin/reports/ReportPageLayout';
import api from '../../../services/apiService';
import { Package, AlertTriangle, TrendingDown, Box } from 'lucide-react';

export default function InventoryReports() {
  const [dateRange, setDateRange] = useState('this-month');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [inventory, setInventory] = useState([]);
  const [lowStock, setLowStock] = useState([]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [invRes, lowRes] = await Promise.all([
        api.get('/inventory').catch(() => ({ data: [] })),
        api.get('/inventory/low-stock').catch(() => ({ data: [] })),
      ]);
      setInventory(Array.isArray(invRes.data) ? invRes.data : invRes.data?.data ?? []);
      setLowStock(Array.isArray(lowRes.data) ? lowRes.data : lowRes.data?.data ?? []);
    } catch (e) {
      setError(e.response?.data?.message || 'Failed to load inventory. You may need to be logged in.');
      setInventory([]);
      setLowStock([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dateRange]);

  const totalItems = inventory.length;
  const lowCount = lowStock.length;

  return (
    <ReportPageLayout
      title="Inventory Reports"
      description="Stock levels, movements and low-stock alerts"
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
                <p className="text-sm text-gray-500">Total SKUs</p>
                <p className="text-2xl font-bold text-gray-900">{totalItems}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Low Stock Items</p>
                <p className="text-2xl font-bold text-amber-600">{lowCount}</p>
              </div>
              <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">In Stock</p>
                <p className="text-2xl font-bold text-green-600">{totalItems - lowCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Box className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Needs Reorder</p>
                <p className="text-2xl font-bold text-red-600">{lowCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <TrendingDown className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </motion.div>
        </div>

        {lowCount > 0 && (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
            <h3 className="font-semibold text-amber-800 mb-2">Low Stock Alerts</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead><tr><th className="text-left py-2 text-amber-800">Item</th><th className="text-left py-2 text-amber-800">Current</th><th className="text-left py-2 text-amber-800">Min</th></tr></thead>
                <tbody>
                  {lowStock.slice(0, 20).map((item) => (
                    <tr key={item.id || item.name}>
                      <td className="py-1">{item.name ?? item.product_name ?? item.sku ?? '—'}</td>
                      <td className="py-1">{item.quantity ?? item.stock ?? 0}</td>
                      <td className="py-1">{item.min_stock ?? item.reorder_level ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <h2 className="font-semibold text-gray-900">Inventory Summary</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Item</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">SKU / Code</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Quantity</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {inventory.length === 0 && !loading && (
                  <tr><td colSpan={4} className="px-4 py-8 text-center text-gray-500">No inventory data. Add items in Inventory section.</td></tr>
                )}
                {inventory.slice(0, 100).map((item, i) => {
                  const qty = item.quantity ?? item.stock ?? 0;
                  const min = item.min_stock ?? item.reorder_level ?? 0;
                  const isLow = min > 0 && qty <= min;
                  return (
                    <motion.tr key={item.id || i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.02 }} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{item.name ?? item.product_name ?? '—'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{item.sku ?? item.code ?? '—'}</td>
                      <td className="px-4 py-3 font-medium text-gray-900">{qty}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${isLow ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                          {isLow ? 'Low' : 'OK'}
                        </span>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ReportPageLayout>
  );
}
