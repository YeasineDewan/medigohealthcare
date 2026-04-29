import { useState } from 'react';
import { Search, DollarSign, User, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const mockDue = [
  { id: 1, patientId: '260300005315', name: 'MD EMAMUL SHEIKH', billNo: 'BL-2026-002', amount: 500, date: '05-MAR-26' },
  { id: 2, patientId: '260300005320', name: 'JOHN DOE', billNo: 'BL-2026-010', amount: 1200, date: '06-MAR-26' },
];

export default function DueCollection() {
  const [search, setSearch] = useState('');

  const filtered = mockDue.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.patientId.includes(search) ||
      r.billNo.toLowerCase().includes(search.toLowerCase())
  );

  const totalDue = filtered.reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Due Collection</h1>
        <p className="text-gray-500 mt-1">Track and collect pending dues from candidates</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, patient ID or bill no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          />
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 flex items-center justify-between">
        <span className="font-semibold text-gray-800">Total Pending Dues</span>
        <span className="text-2xl font-bold text-amber-700">৳{totalDue.toLocaleString()}</span>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Bill No</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Amount</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((row) => (
              <motion.tr key={row.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                      <User className="w-5 h-5 text-amber-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{row.name}</p>
                      <p className="text-sm text-gray-500">{row.patientId}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600">{row.billNo}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{row.date}</td>
                <td className="px-6 py-4 text-right font-semibold text-amber-700">৳{row.amount}</td>
                <td className="px-6 py-4 text-right">
                  <button className="px-3 py-1.5 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] text-sm font-medium">
                    Collect
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
