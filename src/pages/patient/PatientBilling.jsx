import { useState } from 'react';
import { motion } from 'framer-motion';
import { Receipt, Download, ChevronRight, Calendar, CreditCard } from 'lucide-react';

const invoices = [
  { id: 'INV-2025-001', date: 'Mar 1, 2025', description: 'Consultation - Dr. Ahmed', amount: 1500, status: 'Paid' },
  { id: 'INV-2025-002', date: 'Feb 28, 2025', description: 'Lab Tests - CBC, RBS', amount: 1200, status: 'Paid' },
  { id: 'INV-2025-003', date: 'Feb 25, 2025', description: 'Pharmacy Order #ORD-1001', amount: 1250, status: 'Paid' },
  { id: 'INV-2025-004', date: 'Mar 5, 2025', description: 'Video Consultation', amount: 800, status: 'Pending' },
];

export default function PatientBilling() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Billing & Invoices</h1>
          <p className="text-gray-500 mt-1">View and download your bills</p>
        </div>
        <div>
          <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            >
              <option value="all">All</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
            </select>
        </div>
      </div>

      <div className="grid gap-4">
        {invoices
          .filter((inv) => filter === 'all' || inv.status.toLowerCase() === filter)
          .map((inv, i) => (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-[#f0fdf2] flex items-center justify-center">
                  <Receipt className="w-7 h-7 text-[#5DBB63]" />
                </div>
                <div>
                  <p className="font-semibold text-[#111827]">{inv.id}</p>
                  <p className="text-sm text-gray-600 mt-0.5">{inv.description}</p>
                  <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" /> {inv.date}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <span className="font-bold text-[#165028]">৳{inv.amount.toLocaleString()}</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  inv.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {inv.status}
                </span>
                <button className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-600" title="Download">
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  );
}
