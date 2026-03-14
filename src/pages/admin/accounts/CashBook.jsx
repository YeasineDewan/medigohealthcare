import React, { useState, useEffect, useMemo } from 'react';
import { DollarSign, CreditCard, TrendingUp, Filter, Download, Search, Calendar } from 'lucide-react';
import DynamicTable from '../../../components/admin/DynamicTable';
import { BarChart } from '../../../components/admin/DynamicCharts';
import { useAdminStore } from '../../../store/adminStore';

const CashBook = () => {
  const { user } = useAdminStore();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState('cash'); // 'cash' | 'bank'

  const columns = useMemo(() => [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'voucherNo', label: 'Voucher No', sortable: true },
    { key: 'type', label: 'Type', sortable: true, type: 'badge' },
    { key: 'particulars', label: 'Particulars', sortable: true },
    { key: 'debit', label: 'Debit', sortable: true, align: 'right', type: 'currency' },
    { key: 'credit', label: 'Credit', sortable: true, align: 'right', type: 'currency' },
    { key: 'balance', label: 'Balance', sortable: true, align: 'right', type: 'currency' },
  ], []);

  useEffect(() => {
    setLoading(true);
    // Simulate API: /api/v1/accounts/cash-book?type=cash|bank
    setTimeout(() => {
      setData([
        { id: 1, date: '2024-10-01', voucherNo: 'CB001', type: 'Receipt', particulars: 'Cash Sales', debit: 12000, credit: 0, balance: 12000 },
        { id: 2, date: '2024-10-01', voucherNo: 'CB002', type: 'Payment', particulars: 'Office Expenses', debit: 0, credit: 2500, balance: 9500 },
        { id: 3, date: '2024-10-02', voucherNo: 'CB003', type: 'Receipt', particulars: 'Patient Payment', debit: 8000, credit: 0, balance: 17500 },
        // More data...
      ]);
      setLoading(false);
    }, 800);
  }, [activeTab]);

  const chartData = useMemo(() => [
    { label: 'Mon', value: 12000 },
    { label: 'Tue', value: 8000 },
    { label: 'Wed', value: 15000 },
    { label: 'Thu', value: 9500 },
    { label: 'Fri', value: 18000 },
  ], []);

  const summary = useMemo(() => ({
    openingBalance: 0,
    totalDebit: data.reduce((sum, row) => sum + (parseFloat(row.debit) || 0), 0),
    totalCredit: data.reduce((sum, row) => sum + (parseFloat(row.credit) || 0), 0),
    closingBalance: data.reduce((sum, row) => sum + (parseFloat(row.balance) || 0), 0),
  }), [data]);

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-green-700 bg-clip-text text-transparent">
            Cash Book
          </h1>
          <p className="text-gray-600 mt-2">Complete record of cash transactions</p>
        </div>
        <div className="flex gap-3">
          <button className="px-6 py-2.5 bg-gradient-to-r from-emerald-500 to-green-600 text-white rounded-xl hover:from-emerald-600 hover:to-green-700 shadow-lg hover:shadow-xl transition-all">
            <Download className="inline w-4 h-4 mr-2" /> Export
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white/60 backdrop-blur-xl rounded-2xl p-1 border border-emerald-200/50 shadow-xl">
        <div className="flex bg-white rounded-xl overflow-hidden shadow-sm">
          <button
            onClick={() => setActiveTab('cash')}
            className={`flex-1 py-3 px-6 font-semibold transition-all ${
              activeTab === 'cash'
                ? 'bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-md'
                : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50'
            }`}
          >
            <DollarSign className="w-5 h-5 inline mr-2" />
            Cash
          </button>
          <button
            onClick={() => setActiveTab('bank')}
            className={`flex-1 py-3 px-6 font-semibold transition-all ${
              activeTab === 'bank'
                ? 'bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-md'
                : 'text-gray-700 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <CreditCard className="w-5 h-5 inline mr-2" />
            Bank
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 p-6 bg-gradient-to-br from-emerald-400/10 to-green-500/10 border border-emerald-200/30 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-500/20 rounded-xl">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Opening Balance</p>
              <p className="text-2xl font-bold text-gray-900">${summary.openingBalance?.toLocaleString()}</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-1 p-6 bg-gradient-to-br from-green-400/10 to-emerald-500/10 border border-green-200/30 rounded-2xl backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-500/20 rounded-xl">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Debit</p>
              <p className="text-2xl font-bold text-gray-900">${summary.totalDebit?.toLocaleString()}</p>
            </div>
          </div>
        </div>
        {/* Similar for Credit and Closing Balance */}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-xl">
          <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Daily Cash Flow
          </h3>
          <BarChart data={chartData} height="300px" color="#5DBB63" />
        </div>
        <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-gray-200/50 shadow-xl">
          <h3 className="text-xl font-semibold mb-4">Balance Trend</h3>
          {/* Line chart here */}
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl border border-gray-200/50 shadow-2xl overflow-hidden">
        <DynamicTable
          data={data}
          columns={columns}
          loading={loading}
          badgeConfig={{
            Receipt: 'green', Payment: 'red', Contra: 'blue', Journal: 'purple'
          }}
          pageSize={25}
        />
      </div>
    </div>
  );
};

export default CashBook;

