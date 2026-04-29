import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, CheckCircle, Download, Eye, Printer, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const mockComplete = [
  { id: 1, candidateId: '260300005314', name: 'FARHAD HOSSEN', date: '03/05/2026 01:28', billNo: 'BL-2026-001', reportId: 'RPT-001' },
  { id: 2, candidateId: '260300005315', name: 'MD EMAMUL SHEIKH', date: '03/05/2026 11:44', billNo: 'BL-2026-002', reportId: 'RPT-002' },
  { id: 3, candidateId: '260300005316', name: 'SARA AHMED', date: '03/06/2026 09:15', billNo: 'BL-2026-003', reportId: 'RPT-003' },
];

export default function CompleteReportList() {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  const filtered = mockComplete.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.candidateId.includes(search) ||
      r.billNo.toLowerCase().includes(search.toLowerCase())
  );

  const handleDownload = (row) => {
    navigate(`/admin/medical-checkup/report/${row.reportId}?download=1`);
  };

  const handleView = (row) => {
    navigate(`/admin/medical-checkup/report/${row.reportId}`);
  };

  const handlePrint = (row) => {
    window.open(`/admin/medical-checkup/report/${row.reportId}?print=1`, '_blank', 'width=900,height=700');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Complete Report List</h1>
        <p className="text-gray-500 mt-1">View, download or print completed medical examination reports</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, candidate ID or bill no..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Candidate</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Candidate ID / Bill No</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Date</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((row, index) => (
                <motion.tr
                  key={row.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                      <span className="font-medium text-gray-900">{row.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {row.candidateId} • {row.billNo}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {row.date}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleView(row)}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        View
                      </button>
                      <button
                        onClick={() => handleDownload(row)}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] text-sm font-medium"
                      >
                        <Download className="w-4 h-4" />
                        Download
                      </button>
                      <button
                        onClick={() => handlePrint(row)}
                        className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
                      >
                        <Printer className="w-4 h-4" />
                        Print
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
