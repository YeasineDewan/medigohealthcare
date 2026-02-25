import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Stethoscope, Video } from 'lucide-react';
import DoctorCard from '../../components/features/DoctorCard';

const doctors = [
  { id: 1, name: 'Dr. Ahmed Hassan', specialty: 'Cardiology', rating: 4.9, reviewCount: 234, available: true },
  { id: 2, name: 'Dr. Fatima Khan', specialty: 'Pediatrics', rating: 4.8, reviewCount: 189, available: true },
  { id: 3, name: 'Dr. Rahman Ali', specialty: 'General Medicine', rating: 4.7, reviewCount: 312, available: true },
];

export default function PatientBook() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Book Doctor</h1>
        <p className="text-gray-500 mt-1">Schedule an appointment with a specialist</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search by name or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
          />
        </div>
        <Link
          to="/consult"
          className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl border-2 border-[#5DBB63] text-[#165028] font-medium hover:bg-[#f0fdf2]"
        >
          <Video className="w-5 h-5" />
          Video Consultation
        </Link>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doc) => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </div>
  );
}
