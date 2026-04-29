import { DollarSign, TrendingUp, Calendar } from 'lucide-react';

const earnings = [
  { month: 'Jan 2025', amount: 72000, consultations: 48 },
  { month: 'Dec 2024', amount: 68000, consultations: 45 },
  { month: 'Nov 2024', amount: 61500, consultations: 41 },
];

export default function DoctorEarnings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Earnings</h1>
        <p className="text-gray-500 mt-1">Your consultation earnings</p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm">This Month</p>
          <p className="text-2xl font-bold text-[#111827] mt-1">৳84,500</p>
          <p className="text-sm text-[#5DBB63] font-medium">+18% from last month</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm">Consultations</p>
          <p className="text-2xl font-bold text-[#111827] mt-1">56</p>
          <p className="text-sm text-[#5DBB63] font-medium">This month</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm">Avg. per consult</p>
          <p className="text-2xl font-bold text-[#111827] mt-1">৳1,509</p>
        </div>
        <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-sm">Total YTD</p>
          <p className="text-2xl font-bold text-[#111827] mt-1">৳84,500</p>
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <h3 className="font-semibold text-[#111827] mb-4">Recent Earnings</h3>
        <div className="space-y-4">
          {earnings.map((e) => (
            <div key={e.month} className="flex items-center justify-between p-4 rounded-xl bg-gray-50">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#f0fdf2] flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-[#5DBB63]" />
                </div>
                <div>
                  <p className="font-medium text-[#111827]">{e.month}</p>
                  <p className="text-sm text-gray-500">{e.consultations} consultations</p>
                </div>
              </div>
              <p className="font-bold text-[#165028]">৳{e.amount.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
