import { motion } from 'framer-motion';
import { FolderOpen, FileText, Calendar, Download } from 'lucide-react';

const mockRecords = [
  { id: 1, type: 'Lab Report', date: '2025-01-15', doctor: 'Dr. Ahmed Hassan', title: 'CBC Report' },
  { id: 2, type: 'Prescription', date: '2025-01-10', doctor: 'Dr. Fatima Khan', title: 'General Checkup' },
  { id: 3, type: 'Lab Report', date: '2024-12-20', doctor: 'Dr. Rahman Ali', title: 'Lipid Profile' },
];

export default function Records() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#f0fdf2] to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#5DBB63]/20 flex items-center justify-center">
              <FolderOpen className="w-7 h-7 text-[#165028]" />
            </div>
            <h1 className="text-4xl font-bold text-[#165028]">Health Records</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl">
            Your complete medical history in one secure place. Access prescriptions, lab reports, and visit summaries.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="rounded-2xl border border-gray-200 bg-white overflow-hidden">
          <div className="p-4 bg-gray-50 border-b flex items-center justify-between">
            <p className="text-sm text-gray-500">Login to view your records</p>
            <a href="/auth/patient/login" className="text-[#5DBB63] font-medium hover:underline">
              Sign in
            </a>
          </div>
          <div className="divide-y divide-gray-100">
            {mockRecords.map((record, i) => (
              <motion.div
                key={record.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between p-6 hover:bg-gray-50/50"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#f0fdf2] flex items-center justify-center">
                    <FileText className="w-6 h-6 text-[#5DBB63]" />
                  </div>
                  <div>
                    <p className="font-medium text-[#111827]">{record.title}</p>
                    <p className="text-sm text-gray-500">{record.type} · {record.doctor}</p>
                    <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {record.date}
                    </p>
                  </div>
                </div>
                <button className="p-2 rounded-lg hover:bg-[#f0fdf2] text-[#5DBB63]">
                  <Download className="w-5 h-5" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
