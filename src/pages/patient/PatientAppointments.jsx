import { useState } from 'react';
import { Calendar, Clock, Video, MapPin } from 'lucide-react';

const appointments = [
  { id: 1, doctor: 'Dr. Fatima Rahman', date: 'Feb 2, 2025', time: '10:00 AM', type: 'In-person', status: 'confirmed' },
  { id: 2, doctor: 'Dr. Karim Ahmed', date: 'Feb 5, 2025', time: '02:00 PM', type: 'Video', status: 'upcoming' },
  { id: 3, doctor: 'Dr. Nusrat Jahan', date: 'Jan 28, 2025', time: '11:00 AM', type: 'In-person', status: 'completed' },
];

export default function PatientAppointments() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">My Appointments</h1>
          <p className="text-gray-500 mt-1">View and manage your appointments</p>
        </div>
      </div>

      <div className="flex gap-2 mb-6">
        {['all', 'upcoming', 'completed', 'cancelled'].map((f) => (
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

      <div className="space-y-4">
        {appointments.map((apt) => (
          <div
            key={apt.id}
            className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-[#5DBB63]/30"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[#f0fdf2] flex items-center justify-center">
                  <span className="text-xl font-bold text-[#165028]">{apt.doctor.charAt(0)}</span>
                </div>
                <div>
                  <p className="font-semibold text-[#111827]">{apt.doctor}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4" /> {apt.date}
                    <Clock className="w-4 h-4" /> {apt.time}
                    {apt.type === 'Video' ? <Video className="w-4 h-4" /> : <MapPin className="w-4 h-4" />}
                    {apt.type}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    apt.status === 'confirmed' || apt.status === 'upcoming'
                      ? 'bg-[#f0fdf2] text-[#165028]'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {apt.status}
                </span>
                {(apt.status === 'confirmed' || apt.status === 'upcoming') && (
                  <button className="px-4 py-2 rounded-lg bg-[#5DBB63] text-white text-sm font-medium hover:bg-[#4a9a4f]">
                    {apt.type === 'Video' ? 'Join Call' : 'View'}
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
