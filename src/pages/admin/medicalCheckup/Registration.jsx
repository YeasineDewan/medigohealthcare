import { Link } from 'react-router-dom';
import { UserPlus, Receipt, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function MedicalCheckupRegistration() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Medical Check-Up – Registration</h1>
        <p className="text-gray-500 mt-1">Register candidates and create bills for medical examination</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/medical-checkup/bill-list">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-[#5DBB63]/50 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center">
                <Receipt className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Bill List / Candidate List</h2>
                <p className="text-sm text-gray-500">View and manage bills, add new bill, print invoice, generate reports</p>
              </div>
            </div>
          </motion.div>
        </Link>

        <Link to="/admin/patients/registration-form">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-[#5DBB63]/50 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center">
                <UserPlus className="w-7 h-7 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-900">Add Bill / New Registration</h2>
                <p className="text-sm text-gray-500">Register new candidate with photo, passport details and bill cart</p>
              </div>
            </div>
          </motion.div>
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <FileText className="w-5 h-5 text-[#5DBB63]" />
          Quick actions
        </h3>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/admin/medical-checkup/bill-list"
            className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors text-sm font-medium"
          >
            Open Bill List
          </Link>
          <Link
            to="/admin/medical-checkup/pending-reports"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            Pending Reports
          </Link>
          <Link
            to="/admin/medical-checkup/complete-reports"
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium"
          >
            Complete Reports
          </Link>
        </div>
      </div>
    </div>
  );
}
