import { useState } from 'react';
import { Calendar, Clock, Video, MapPin, Filter } from 'lucide-react';

const appointments = [
  { id: 1, patient: 'Ahmed Khan', time: '10:00 AM', type: 'In-person', status: 'confirmed' },
  { id: 2, patient: 'Sara Ali', time: '10:30 AM', type: 'Video', status: 'confirmed' },
  { id: 3, patient: 'Rahman Hossain', time: '11:00 AM', type: 'In-person', status: 'pending' },
  { id: 4, patient: 'Maria Islam', time: '11:30 AM', type: 'Video', status: 'confirmed' },
  { id: 5, patient: 'Fatima Begum', time: '02:00 PM', type: 'In-person', status: 'cancelled' },
];

export default function DoctorSchedule() {
  const [filter, setFilter] = useState('all');
  const [selectedDate, setSelectedDate] = useState('2025-02-02');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Appointments</h1>
          <p className="text-gray-500 mt-1">Manage your schedule</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200">
            <Calendar className="w-5 h-5 text-gray-500" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="border-0 p-0 focus:ring-0 text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {['all', 'confirmed', 'pending', 'completed', 'cancelled'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl font-medium capitalize ${
              filter === f ? 'bg-[#165028] text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <div className="space-y-4">
          {appointments.map((apt) => (
            <div
              key={apt.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#5DBB63]/30 gap-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#f0fdf2] flex items-center justify-center">
                  <span className="text-xl font-bold text-[#165028]">{apt.patient.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-[#111827]">{apt.patient}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                    <Clock className="w-4 h-4" /> {apt.time}
                    <span className="flex items-center gap-1">
                      {apt.type === 'Video' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                      {apt.type}
                    </span>
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    apt.status === 'confirmed' ? 'bg-[#f0fdf2] text-[#165028]' :
                    apt.status === 'pending' ? 'bg-amber-50 text-amber-700' :
                    apt.status === 'cancelled' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {apt.status}
                </span>
                {apt.status === 'confirmed' && (
                  <button className="px-4 py-2 rounded-lg bg-[#5DBB63] text-white text-sm font-medium hover:bg-[#4a9a4f]">
                    {apt.type === 'Video' ? 'Join Call' : 'Start'}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
