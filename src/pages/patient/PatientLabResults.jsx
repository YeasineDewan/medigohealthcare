import { useState } from 'react';
import { motion } from 'framer-motion';
import { FlaskConical, Download, Eye, Calendar, FileText } from 'lucide-react';

const results = [
  { id: 'LAB-001', date: 'Mar 1, 2025', testName: 'Complete Blood Count (CBC)', status: 'Ready', doctor: 'Dr. Ahmed Hassan' },
  { id: 'LAB-002', date: 'Feb 28, 2025', testName: 'Random Blood Sugar', status: 'Ready', doctor: 'Dr. Fatima Khan' },
  { id: 'LAB-003', date: 'Feb 20, 2025', testName: 'Lipid Profile', status: 'Ready', doctor: 'Dr. Ahmed Hassan' },
  { id: 'LAB-004', date: 'Mar 5, 2025', testName: 'Thyroid (TSH)', status: 'Processing', doctor: '—' },
];

export default function PatientLabResults() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Lab Results</h1>
        <p className="text-gray-500 mt-1">View and download your test reports</p>
      </div>

      <div className="grid gap-4">
        {results.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#f0fdf2] flex items-center justify-center">
                <FlaskConical className="w-7 h-7 text-[#5DBB63]" />
              </div>
              <div>
                <p className="font-semibold text-[#111827]">{r.testName}</p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <Calendar className="w-3.5 h-3.5" /> {r.date} · {r.doctor}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-4 sm:mt-0">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                r.status === 'Ready' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
              }`}>
                {r.status}
              </span>
              {r.status === 'Ready' && (
                <>
                  <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600" title="View">
                    <Eye className="w-5 h-5" />
                  </button>
                  <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600" title="Download">
                    <Download className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
