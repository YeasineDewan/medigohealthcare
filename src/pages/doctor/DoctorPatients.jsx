import { useState } from 'react';
import { Search, User, MoreVertical } from 'lucide-react';

const patients = [
  { id: 1, name: 'Ahmed Khan', visits: 5, lastVisit: '2025-01-28' },
  { id: 2, name: 'Sara Ali', visits: 3, lastVisit: '2025-01-25' },
  { id: 3, name: 'Rahman Hossain', visits: 8, lastVisit: '2025-02-01' },
];

export default function DoctorPatients() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">My Patients</h1>
        <p className="text-gray-500 mt-1">Your patient records</p>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search patients..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
          />
        </div>
        <div className="space-y-4">
          {patients.map((p) => (
            <div key={p.id} className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#5DBB63]/30">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#f0fdf2] flex items-center justify-center">
                  <User className="w-6 h-6 text-[#5DBB63]" />
                </div>
                <div>
                  <p className="font-medium text-[#111827]">{p.name}</p>
                  <p className="text-sm text-gray-500">{p.visits} visits · Last: {p.lastVisit}</p>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-gray-100">
                <MoreVertical className="w-5 h-5 text-gray-500" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
