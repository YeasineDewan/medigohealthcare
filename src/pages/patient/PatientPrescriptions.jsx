import { Pill, Calendar } from 'lucide-react';

const prescriptions = [
  { id: 1, date: '2025-01-10', doctor: 'Dr. Fatima Khan', items: ['Paracetamol 500mg', 'Omeprazole 20mg'] },
  { id: 2, date: '2024-12-20', doctor: 'Dr. Rahman Ali', items: ['Vitamin D3', 'Calcium'] },
];

export default function PatientPrescriptions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Prescriptions</h1>
        <p className="text-gray-500 mt-1">Your prescription history</p>
      </div>

      <div className="space-y-4">
        {prescriptions.map((rx) => (
          <div
            key={rx.id}
            className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#f0fdf2] flex items-center justify-center">
                  <Pill className="w-6 h-6 text-[#5DBB63]" />
                </div>
                <div>
                  <p className="font-semibold text-[#111827]">{rx.doctor}</p>
                  <p className="text-sm text-gray-500 flex items-center gap-1">
                    <Calendar className="w-4 h-4" /> {rx.date}
                  </p>
                </div>
              </div>
              <button className="px-4 py-2 rounded-lg bg-[#165028] text-white text-sm font-medium hover:bg-[#0f3d1c]">
                Order Medicines
              </button>
            </div>
            <ul className="space-y-1 pl-4">
              {rx.items.map((item) => (
                <li key={item} className="text-gray-600">• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
