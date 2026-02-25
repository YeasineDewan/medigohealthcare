import { FileText, Calendar, Download } from 'lucide-react';

const records = [
  { id: 1, type: 'Lab Report', title: 'CBC Report', date: '2025-01-15', doctor: 'Dr. Ahmed Hassan' },
  { id: 2, type: 'Prescription', title: 'General Checkup', date: '2025-01-10', doctor: 'Dr. Fatima Khan' },
  { id: 3, type: 'Lab Report', title: 'Lipid Profile', date: '2024-12-20', doctor: 'Dr. Rahman Ali' },
];

export default function PatientRecords() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Health Records</h1>
        <p className="text-gray-500 mt-1">Your medical history and reports</p>
      </div>

      <div className="space-y-4">
        {records.map((r) => (
          <div
            key={r.id}
            className="flex items-center justify-between p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-[#5DBB63]/30"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#f0fdf2] flex items-center justify-center">
                <FileText className="w-7 h-7 text-[#5DBB63]" />
              </div>
              <div>
                <p className="font-semibold text-[#111827]">{r.title}</p>
                <p className="text-sm text-gray-500">{r.type} · {r.doctor}</p>
                <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> {r.date}
                </p>
              </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-[#f0fdf2] text-[#5DBB63]">
              <Download className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
