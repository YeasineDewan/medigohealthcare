import { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Plus, Search, Filter, Download, Eye, Edit, Send, Calendar, User, Pill, Clock, CheckCircle } from 'lucide-react';

export default function DoctorPrescriptions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [showNewPrescription, setShowNewPrescription] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const prescriptions = [
    {
      id: 'RX-001',
      patient: 'Ahmed Khan',
      age: 34,
      date: '2024-01-15',
      diagnosis: 'Hypertension',
      medicines: [
        { name: 'Amlodipine 5mg', dosage: '1-0-0', duration: '30 days' },
        { name: 'Aspirin 75mg', dosage: '0-0-1', duration: '30 days' }
      ],
      instructions: 'Take after meals. Monitor blood pressure daily.',
      followUp: '2 weeks',
      status: 'Active'
    },
    {
      id: 'RX-002',
      patient: 'Sara Ali',
      age: 28,
      date: '2024-01-14',
      diagnosis: 'Common Cold',
      medicines: [
        { name: 'Paracetamol 500mg', dosage: '1-1-1', duration: '5 days' },
        { name: 'Cetirizine 10mg', dosage: '0-0-1', duration: '7 days' }
      ],
      instructions: 'Rest and drink plenty of fluids.',
      followUp: '1 week if symptoms persist',
      status: 'Active'
    },
    {
      id: 'RX-003',
      patient: 'Rahman Hossain',
      age: 45,
      date: '2024-01-13',
      diagnosis: 'Diabetes Type 2',
      medicines: [
        { name: 'Metformin 500mg', dosage: '1-0-1', duration: '90 days' },
        { name: 'Glimepiride 2mg', dosage: '1-0-0', duration: '90 days' }
      ],
      instructions: 'Take before meals. Regular blood sugar monitoring required.',
      followUp: '1 month',
      status: 'Active'
    },
  ];

  const stats = [
    { label: 'Total Prescriptions', value: '234', icon: FileText, color: 'from-blue-500 to-blue-600' },
    { label: 'This Month', value: '45', icon: Calendar, color: 'from-green-500 to-green-600' },
    { label: 'Active', value: '128', icon: CheckCircle, color: 'from-purple-500 to-purple-600' },
    { label: 'Avg. Medicines', value: '3.2', icon: Pill, color: 'from-amber-500 to-amber-600' },
  ];

  const filteredPrescriptions = prescriptions.filter(rx =>
    rx.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rx.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-gray-500 mt-1">Manage and track patient prescriptions</p>
        </div>
        <button
          onClick={() => setShowNewPrescription(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Prescription
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="p-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-6 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by patient name, prescription ID, or diagnosis..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-[#5DBB63]"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-100">
          {filteredPrescriptions.map((rx, i) => (
            <motion.div
              key={rx.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              className="p-6 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5DBB63]/20 to-[#165028]/20 flex items-center justify-center">
                    <User className="w-6 h-6 text-[#5DBB63]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900">{rx.patient}</h3>
                      <span className="text-sm text-gray-500">Age: {rx.age}</span>
                      <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                        {rx.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {rx.id}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {rx.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Pill className="w-3 h-3" />
                        {rx.medicines.length} medicines
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedPrescription(rx)}
                    className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <Eye className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Edit className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Download className="w-4 h-4 text-gray-600" />
                  </button>
                  <button className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                    <Send className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid md:grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Diagnosis</p>
                    <p className="text-sm font-medium text-gray-900">{rx.diagnosis}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">Follow-up</p>
                    <p className="text-sm font-medium text-gray-900">{rx.followUp}</p>
                  </div>
                </div>
                <div className="mb-3">
                  <p className="text-xs text-gray-500 mb-2">Medicines</p>
                  <div className="space-y-2">
                    {rx.medicines.map((med, idx) => (
                      <div key={idx} className="flex items-center justify-between bg-white rounded-lg px-3 py-2">
                        <span className="text-sm font-medium text-gray-900">{med.name}</span>
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span>Dosage: {med.dosage}</span>
                          <span>Duration: {med.duration}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-1">Instructions</p>
                  <p className="text-sm text-gray-700">{rx.instructions}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Prescription Detail Modal */}
      {selectedPrescription && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">Prescription Details</h2>
                <button
                  onClick={() => setSelectedPrescription(null)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Prescription ID</p>
                  <p className="font-medium">{selectedPrescription.id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Date</p>
                  <p className="font-medium">{selectedPrescription.date}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Patient</p>
                  <p className="font-medium">{selectedPrescription.patient}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{selectedPrescription.age} years</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Diagnosis</p>
                <p className="font-medium">{selectedPrescription.diagnosis}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-3">Prescribed Medicines</p>
                <div className="space-y-3">
                  {selectedPrescription.medicines.map((med, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-lg p-4">
                      <p className="font-medium text-gray-900 mb-2">{med.name}</p>
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div>
                          <span className="text-gray-500">Dosage:</span>
                          <span className="ml-2 font-medium">{med.dosage}</span>
                        </div>
                        <div>
                          <span className="text-gray-500">Duration:</span>
                          <span className="ml-2 font-medium">{med.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Instructions</p>
                <p className="text-gray-700">{selectedPrescription.instructions}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 mb-2">Follow-up</p>
                <p className="font-medium">{selectedPrescription.followUp}</p>
              </div>
              <div className="flex gap-3 pt-4">
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  <Download className="w-4 h-4" />
                  Download PDF
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                  <Send className="w-4 h-4" />
                  Send to Patient
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
