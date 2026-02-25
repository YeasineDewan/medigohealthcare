import { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import DoctorCard from '../components/features/DoctorCard';

const specialties = ['All', 'Cardiology', 'Pediatrics', 'General Medicine', 'Dermatology', 'Orthopedics'];
const mockDoctors = [
  { id: 1, name: 'Dr. Ahmed Hassan', specialty: 'Cardiology', rating: 4.9, reviewCount: 234, location: 'Dhaka Medical College Hospital', available: true },
  { id: 2, name: 'Dr. Fatima Khan', specialty: 'Pediatrics', rating: 4.8, reviewCount: 189, location: 'Square Hospital, Dhaka', available: true },
  { id: 3, name: 'Dr. Rahman Ali', specialty: 'General Medicine', rating: 4.7, reviewCount: 312, location: 'Apollo Hospital', available: false },
  { id: 4, name: 'Dr. Nusrat Jahan', specialty: 'Dermatology', rating: 4.9, reviewCount: 156, location: 'Popular Medical', available: true },
  { id: 5, name: 'Dr. Karim Ahmed', specialty: 'Orthopedics', rating: 4.6, reviewCount: 98, location: 'Ibn Sina Hospital', available: true },
  { id: 6, name: 'Dr. Taslima Begum', specialty: 'Pediatrics', rating: 4.8, reviewCount: 201, location: 'United Hospital', available: true },
];

export default function Doctors() {
  const [specialty, setSpecialty] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = mockDoctors.filter((d) => {
    const matchSpec = specialty === 'All' || d.specialty === specialty;
    const matchSearch = !search || d.name.toLowerCase().includes(search.toLowerCase()) || d.specialty.toLowerCase().includes(search.toLowerCase());
    return matchSpec && matchSearch;
  });

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#f0fdf2] to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-[#165028] mb-4">Specialist Doctors</h1>
          <p className="text-gray-600 text-lg max-w-2xl">
            Book appointments with certified specialists. Choose from our network of experienced doctors.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search by name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {specialties.map((s) => (
              <button
                key={s}
                onClick={() => setSpecialty(s)}
                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${
                  specialty === s
                    ? 'bg-[#165028] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doctor) => (
            <DoctorCard key={doctor.id} doctor={doctor} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-500">
            <p>No doctors found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
