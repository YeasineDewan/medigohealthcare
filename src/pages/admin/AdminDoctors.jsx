import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Plus, MoreVertical, Stethoscope } from 'lucide-react';

const mockDoctors = [
  { id: 1, name: 'Dr. Ahmed Hassan', specialty: 'Cardiology', email: 'ahmed@medigo.com', status: 'active', appointments: 234 },
  { id: 2, name: 'Dr. Fatima Khan', specialty: 'Pediatrics', email: 'fatima@medigo.com', status: 'active', appointments: 189 },
  { id: 3, name: 'Dr. Rahman Ali', specialty: 'General Medicine', email: 'rahman@medigo.com', status: 'active', appointments: 312 },
  { id: 4, name: 'Dr. Nusrat Jahan', specialty: 'Dermatology', email: 'nusrat@medigo.com', status: 'inactive', appointments: 156 },
];

export default function AdminDoctors() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Doctors</h1>
          <p className="text-gray-500 mt-1">Manage your medical professionals</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#165028] text-white font-medium hover:bg-[#0f3d1c]">
          <Plus className="w-5 h-5" />
          Add Doctor
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search doctors..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 font-medium text-gray-500">Doctor</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Specialty</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Email</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Appointments</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Status</th>
                <th className="py-3 px-4" />
              </tr>
            </thead>
            <tbody>
              {mockDoctors.map((doc) => (
                <tr key={doc.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#f0fdf2] flex items-center justify-center">
                        <Stethoscope className="w-5 h-5 text-[#5DBB63]" />
                      </div>
                      <span className="font-medium text-[#111827]">{doc.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{doc.specialty}</td>
                  <td className="py-4 px-4 text-gray-600">{doc.email}</td>
                  <td className="py-4 px-4 text-gray-600">{doc.appointments}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        doc.status === 'active' ? 'bg-[#f0fdf2] text-[#165028]' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="p-2 rounded-lg hover:bg-gray-100">
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
