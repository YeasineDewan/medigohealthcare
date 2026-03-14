import React, { useState, useEffect, useMemo } from 'react';
import { LayoutDashboard, Calendar, DollarSign, TrendingUp, Filter, Download, Search } from 'lucide-react';
import DynamicTable from '../../../components/admin/DynamicTable';
import DynamicChart from '../../../components/admin/DynamicCharts';
import { useAdminStore } from '../../../store/adminStore';

const DayBook = () => {
  const { user } = useAdminStore();
  const [dateRange, setDateRange] = useState({ start: '', end: '' });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const columns = useMemo(() => [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'voucherNo', label: 'Voucher No', sortable: true },
    { key: 'type', label: 'Type', sortable: true },
    { key: 'ledger', label: 'Ledger', sortable: true },
    { key: 'debit', label: 'Debit', sortable: true, align: 'right' },
    { key: 'credit', label: 'Credit', sortable: true, align: 'right' },
    { key: 'balance', label: 'Balance', sortable: true, align: 'right' },
    { key: 'narration', label: 'Narration' },
  ], []);

  // Mock data - replace with real API
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setData([
        { id: 1, date: '2024-10-01', voucherNo: 'V001', type: 'Payment', ledger: 'Cash', debit: 5000, credit: 0, balance: 5000, narration: 'Cash payment received' },
        { id: 2, date: '2024-10-01', voucherNo: 'V002', type: 'Receipt', ledger: 'Bank', debit: 0, credit: 3000, balance: 2000, narration: 'Bank deposit' },
        // Add more...
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  const summary = useMemo(() => ({
    totalDebit: data.reduce((sum, row) => sum + (parseFloat(row.debit) || 0), 0),
    totalCredit: data.reduce((sum, row) => sum + (parseFloat(row.credit) || 0), 0),
    closingBalance: data.reduce((sum, row) => sum + (parseFloat(row.balance) || 0), 0),
  }), [data]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Day Book
          </h1>
          <p className="text-gray-600 mt-1">Daily accounting transactions summary</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all">
            <Download size={18} /> Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border border-white/20 shadow-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2 p-3 bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-xl border border-blue-500/20">
            <Calendar size={20} className="text-blue-500" />
            <input 
              type="date" 
              className="bg-transparent border-none outline-none text-lg font-semibold text-gray-900 flex-1"
              value={dateRange.start}
              onChange={(e) => setDateRange({...dateRange, start: e.target.value})}
            />
          </div>
          {/* Similar for end date and search */}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white p-6 rounded-2xl shadow-2xl">
          <div className="flex items-center gap-3">
            <DollarSign size={24} />
            <div>
              <p className="text-green-100">Total Debit</p>
              <p className="text-2xl font-bold">${summary.totalDebit?.toLocaleString()}</p>
            </div>
          </div>
        </div>
        {/* Credit and Balance cards */}
      </div>

      {/* Chart */}
      <DynamicChart 
        type="line" 
        data={data} 
        height="300px"
        title="Daily Transactions Trend"
      />

      {/* Main Table */}
      <DynamicTable
        data={data}
        columns={columns}
        loading={loading}
        enableSearch
        enableFilters
        enableExport
        pageSize={50}
        striped
        bordered
        hoverable
      />
    </div>
  );
};

export default DayBook;

