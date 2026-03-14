import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Calendar,
  Clock,
  Heart,
  Pill,
  Stethoscope,
  Hospital,
  AlertTriangle,
  CheckCircle,
  Eye,
  FileText,
  TrendingUp,
  Activity,
  Shield
} from 'lucide-react';

const mockHistory = [
  {
    id: 'MH001',
    patientName: 'John Doe',
    date: '2024-12-15',
    doctor: 'Dr. Sarah Johnson',
    diagnosis: 'Hypertension',
    treatment: 'Lifestyle modification + Lisinopril 10mg',
    allergies: 'Penicillin',
    riskLevel: 'medium',
    notes: 'Patient stable. Monitor BP weekly.',
    documents: ['BP Reading.pdf', 'ECG Report.pdf']
  },
  {
    id: 'MH002',
    patientName: 'Jane Smith',
    date: '2024-12-10',
    doctor: 'Dr. Michael Chen',
    diagnosis: 'Type 2 Diabetes',
    treatment: 'Metformin 500mg BD, diet control',
    allergies: 'None',
    riskLevel: 'high',
    notes: 'HbA1c 8.2%. Urgent education needed.',
    documents: ['Blood Sugar Log.pdf', 'Eye Exam.pdf']
  },
  {
    id: 'MH003',
    patientName: 'Robert Wilson',
    date: '2024-12-05',
    doctor: 'Dr. Lisa Anderson',
    diagnosis: 'Acute Bronchitis',
    treatment: 'Azithromycin 500mg OD x 5 days',
    allergies: 'Sulfonamides',
    riskLevel: 'low',
    notes: 'Symptoms resolved. Follow-up in 2 weeks.',
    documents: ['Chest X-Ray.pdf']
  },
  {
    id: 'MH004',
    patientName: 'Emily Brown',
    date: '2024-11-28',
    doctor: 'Dr. James Brown',
    diagnosis: 'Ankle Sprain',
    treatment: 'RICE protocol + Ibuprofen PRN',
    allergies: 'None',
    riskLevel: 'low',
    notes: 'Weight bearing as tolerated.',
    documents: ['X-Ray Report.pdf']
  },
  {
    id: 'MH005',
    patientName: 'David Lee',
    date: '2024-11-20',
    doctor: 'Dr. Sarah Johnson',
    diagnosis: 'Gastroenteritis',
    treatment: 'ORS + Metoclopramide',
    allergies: 'None',
    riskLevel: 'medium',
    notes: 'Hydration status improving.',
    documents: ['Lab Results.pdf']
  }
];

const riskColors = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-orange-100 text-orange-800',
  critical: 'bg-red-100 text-red-800'
};

export default function History() {
  const [searchTerm, setSearchTerm] = useState('');
  const [doctorFilter, setDoctorFilter] = useState('All');
  const [riskFilter, setRiskFilter] = useState('All');
  const [dateFilter, setDateFilter] = useState('All');

  const filteredHistory = mockHistory.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          record.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDoctor = doctorFilter === 'All' || record.doctor.includes(doctorFilter);
    const matchesRisk = riskFilter === 'All' || record.riskLevel === riskFilter;
    const matchesDate = dateFilter === 'All' || record.date.includes(dateFilter);
    return matchesSearch && matchesDoctor && matchesRisk && matchesDate;
  });

  const stats = {
    total: filteredHistory.length,
    highRisk: filteredHistory.filter(r => r.riskLevel === 'high' || r.riskLevel === 'critical').length,
    recent: filteredHistory.slice(0, 5).length,
    documents: filteredHistory.reduce((sum, r) => sum + r.documents.length, 0)
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
            Medical History
          </h1>
          <p className="text-gray-600 mt-2">Comprehensive patient medical timeline & risk assessment</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-6 py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50">
            <FileText className="w-4 h-4" /> Export Timeline
          </button>
          <button className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-xl hover:from-[#4CAF50] hover:to-[#45a049]">
            <Eye className="w-4 h-4" /> View Full Record
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl">
          <div className="flex items-center">
            <div className="p-3 bg-blue-100 rounded-xl">
              <Heart className="w-6 h-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Total Records</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl">
          <div className="flex items-center">
            <div className="p-3 bg-orange-100 rounded-xl">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">High Risk</p>
              <p className="text-3xl font-bold text-orange-600">{stats.highRisk}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl">
          <div className="flex items-center">
            <div className="p-3 bg-emerald-100 rounded-xl">
              <CheckCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Recent Visits</p>
              <p className="text-3xl font-bold text-emerald-600">{stats.recent}</p>
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-lg hover:shadow-xl">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-xl">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-500">Documents</p>
              <p className="text-3xl font-bold text-purple-600">{stats.documents}</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search patient, diagnosis, doctor..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500" />
          </div>
          <select value={doctorFilter} onChange={(e) => setDoctorFilter(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-xl">
            <option>All Doctors</option>
            <option>Dr. Sarah Johnson</option>
            <option>Dr. Michael Chen</option>
            <option>Dr. Lisa Anderson</option>
          </select>
          <select value={riskFilter} onChange={(e) => setRiskFilter(e.target.value)} className="px-4 py-3 border border-gray-300 rounded-xl">
            <option>All Risk Levels</option>
            <option>Low Risk</option>
            <option>Medium Risk</option>
            <option>High Risk</option>
          </select>
        </div>
      </div>

      {/* Timeline Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gradient-to-r from-gray-50 to-blue-50">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">ID</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Patient</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Date</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Doctor</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Diagnosis</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Treatment</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-gray-700 uppercase">Risk Level</th>
                <th className="px-6 py-4 text-right text-sm font-bold text-gray-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredHistory.map((record, index) => (
                <motion.tr key={record.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="hover:bg-gray-50 border-b">
                  <td className="px-6 py-4 font-mono font-semibold text-sm text-gray-900">{record.id}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="font-semibold text-blue-600">{record.patientName[0]}</span>
                      </div>
                      <span className="ml-3 font-medium">{record.patientName}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-sm text-gray-900">{record.date}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {record.doctor}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{record.diagnosis}</div>
                    <div className="text-sm text-gray-500">{record.notes}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{record.treatment}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${riskColors[record.riskLevel]}`}>
                      {record.riskLevel.toUpperCase()}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex gap-2 justify-end">
                      <button className="p-2 hover:bg-gray-100 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filteredHistory.length === 0 && (
        <div className="text-center py-20">
          <Heart className="w-20 h-20 text-gray-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">No medical history found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria</p>
        </div>
      )}
    </div>
  );
}

