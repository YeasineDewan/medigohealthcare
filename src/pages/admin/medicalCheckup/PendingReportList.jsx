import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Clock, ChevronRight, FileText, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const mockPending = [
  { id: 1, candidateId: '260300005314', name: 'FARHAD HOSSEN', date: '03/05/2026 01:28', billNo: 'BL-2026-001' },
  { id: 2, candidateId: '260300005315', name: 'MD EMAMUL SHEIKH', date: '03/05/2026 11:44', billNo: 'BL-2026-002' },
  { id: 3, candidateId: '260300005316', name: 'SARA AHMED', date: '03/06/2026 09:15', billNo: 'BL-2026-003' },
];

export default function PendingReportList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');

  const filtered = mockPending.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.candidateId.includes(search) ||
      r.billNo.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Pending Report List</h1>
        <p className="text-gray-500 mt-1">Reports awaiting completion or review</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, candidate ID or bill no..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          />
        </div>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-lg bg-white"
        >
          <option value="">All</option>
          <option value="today">Today</option>
          <option value="week">This Week</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <ul className="divide-y divide-gray-100">
          {filtered.map((row, index) => (
            <motion.li
              key={row.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center justify-between px-6 py-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => navigate(`/admin/medical-checkup/value-entry/${row.id}`)}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{row.name}</p>
                  <p className="text-sm text-gray-500">{row.candidateId} • {row.billNo}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {row.date}
                </span>
                <button
                  onClick={(e) => { e.stopPropagation(); navigate(`/admin/medical-checkup/value-entry/${row.id}`); }}
                  className="flex items-center gap-1 px-3 py-1.5 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] text-sm font-medium"
                >
                  <FileText className="w-4 h-4" />
                  Enter Values
                </button>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
}
