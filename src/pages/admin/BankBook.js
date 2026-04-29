import React, { useState, useEffect, useMemo } from 'react';
import { CreditCard, Banknote, TrendingUp, Filter, Download, Search, Calendar } from 'lucide-react';
import DynamicTable from '../../components/admin/DynamicTable';
import { LineChart } from '../../components/admin/DynamicCharts';
import { useAdminStore } from '../../store/adminStore';

const BankBook = () => {
  const { user } = useAdminStore();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [bankAccount, setBankAccount] = useState('All Banks');

  const columns = useMemo(() => [
    { key: 'date', label: 'Date', sortable: true },
    { key: 'chequeNo', label: 'Cheque No', sortable: true },
    { key: 'type', label: 'Type', sortable: true, type: 'badge' },
    { key: 'payee', label: 'Payee/Payor', sortable: true },
    { key: 'debit', label: 'Debit', sortable: true, align: 'right', type: 'currency' },
    { key: 'credit', label: 'Credit', sortable: true, align: 'right', type: 'currency' },
    { key: 'balance', label: 'Balance', sortable: true, align: 'right', type: 'currency' },
    { key: 'instrument', label: 'Instrument', sortable: true },
  ], []);

  useEffect(() => {
    setLoading(true);
    // Simulate API: /api/v1/accounts/bank-book?bank=ICICI|SB...
    setTimeout(() => {
      setData([
        { id: 1, date: '2024-10-01', chequeNo: '123456', type: 'Deposit', payee: 'Patient Payment', debit: 25000, credit: 0, balance: 25000, instrument: 'NEFT' },
        { id: 2, date: '2024-10-01', chequeNo: '123457', type: 'Withdrawal', payee: 'Supplier Payment', debit: 0, credit: 15000, balance: 10000, instrument: 'Cheque' },
        // Add more realistic bank data...
      ]);
      setLoading(false);
    }, 1000);
  }, [bankAccount]);

  const chartData = useMemo(() => [
    { label: 'Mon', value: 25000 },
    { label: 'Tue', value: 18000 },
    { label: 'Wed', value: 22000 },
    { label: 'Thu', value: 12000 },
    { label: 'Fri', value: 30000 },
  ], []);

  const summary = useMemo(() => ({
    openingBalance: 50000,
    totalDebit: data.reduce((sum, row) => sum + (parseFloat(row.debit) || 0), 0),
    totalCredit: data.reduce((sum, row) => sum + (parseFloat(row.credit) || 0), 0),
    closingBalance: data.reduce((sum, row) => sum + (parseFloat(row.balance) || 0), 0),
  }), [data]);

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
            Bank Book
          </h1>
          <p className="text-gray-600 mt-2">Bank transactions & reconciliation</p>
        </div>
      </div>

      {/* Bank Selector */}
      <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 border shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select 
            value={bankAccount} 
            onChange={(e) => setBankAccount(e.target.value)}
            className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
          >
            <option>All Banks</option>
            <option>ICICI Bank</option>
            <option>SBI</option>
            <option>HDFC</option>
          </select>
          {/* Date range picker */}
        </div>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Opening, Debit, Credit, Closing cards with animations */}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/70 rounded-2xl p-6 border shadow-xl">
          <h3 className="text-xl font-semibold mb-4">Bank Balance Trend</h3>
          <LineChart data={chartData} height="300px" color="#3B82F6" />
        </div>
      </div>

      <DynamicTable
        data={data}
        columns={columns}
        loading={loading}
        pageSize={25}
        badgeConfig={{ Deposit: 'green', Withdrawal: 'red', Transfer: 'blue' }}
      />
    </div>
  );
};

export default BankBook;

