import { useState } from 'react';
import { Search, FileText, Calendar, DollarSign } from 'lucide-react';
import { motion } from 'framer-motion';

const mockHistory = [
  { id: 1, patientId: '260300005314', name: 'FARHAD HOSSEN', amount: 5000, date: '05-MAR-26', mode: 'Cash' },
  { id: 2, patientId: '260300005315', name: 'MD EMAMUL SHEIKH', amount: 3500, date: '05-MAR-26', mode: 'Card' },
];

export default function DueCollectionHistory() {
  const [search, setSearch] = useState('');

  const filtered = mockHistory.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.patientId.includes(search)
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Due Collection History</h1>
        <p className="text-gray-500 mt-1">View past due collection records</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name or patient ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
              <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Mode</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filtered.map((row) => (
              <motion.tr key={row.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <div>
                    <p className="font-medium text-gray-900">{row.name}</p>
                    <p className="text-sm text-gray-500">{row.patientId}</p>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-600 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {row.date}
                </td>
                <td className="px-6 py-4 text-right font-semibold text-green-700">৳{row.amount.toLocaleString()}</td>
                <td className="px-6 py-4 text-sm text-gray-600">{row.mode}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
