import { useState } from 'react';
import { Search, Calendar, Filter } from 'lucide-react';

const mockAppointments = [
  { id: 1, patient: 'Ahmed Khan', doctor: 'Dr. Fatima Rahman', date: '2025-02-02', time: '10:00 AM', status: 'confirmed' },
  { id: 2, patient: 'Sara Ali', doctor: 'Dr. Karim Ahmed', date: '2025-02-02', time: '10:30 AM', status: 'pending' },
  { id: 3, patient: 'Rahman Hossain', doctor: 'Dr. Nusrat Jahan', date: '2025-02-02', time: '11:00 AM', status: 'completed' },
];

export default function AdminAppointments() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Appointments</h1>
          <p className="text-gray-500 mt-1">Manage all bookings</p>
        </div>
        <div className="flex gap-2">
          {['all', 'pending', 'confirmed', 'completed'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-xl font-medium capitalize ${
                filter === f ? 'bg-[#165028] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <div className="flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search appointments..."
              className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50">
            <Calendar className="w-5 h-5" />
            Date
          </button>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>
        <div className="space-y-4">
          {mockAppointments.map((apt) => (
            <div
              key={apt.id}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#5DBB63]/30 transition-colors"
            >
              <div>
                <p className="font-medium text-[#111827]">{apt.patient}</p>
                <p className="text-sm text-gray-500">{apt.doctor} · {apt.date} at {apt.time}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  apt.status === 'confirmed' ? 'bg-[#f0fdf2] text-[#165028]' :
                  apt.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                  'bg-gray-100 text-gray-600'
                }`}
              >
                {apt.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
