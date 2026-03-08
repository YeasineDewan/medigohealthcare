import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileText, Plus, Search, Filter, Download, Eye, Edit, Send, Calendar, User, Pill, Clock, 
  CheckCircle, Video, Building, Quote, X, Save, Printer, Camera, Upload, Star, Heart,
  Activity, Thermometer, Stethoscope, Phone, Mail, MapPin, AlertCircle, ChevronRight
} from 'lucide-react';

export default function EnhancedDoctorPrescriptions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('video');
  const [showNewPrescription, setShowNewPrescription] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);

  const videoPrescriptions = [
    {
      id: 'RX-VID-001',
      patient: 'Ahmed Khan',
      age: 34,
      date: '2024-01-15',
      time: '10:30 AM',
      consultationType: 'Video',
      diagnosis: 'Hypertension',
      medicines: [
        { name: 'Amlodipine 5mg', dosage: '1-0-0', duration: '30 days', beforeMeal: false },
        { name: 'Aspirin 75mg', dosage: '0-0-1', duration: '30 days', beforeMeal: true }
      ],
      instructions: 'Take after meals. Monitor blood pressure daily.',
      followUp: '2 weeks',
      status: 'Active',
      videoLink: 'https://meet.jit.si/abc123',
      patientRating: 5
    },
    {
      id: 'RX-VID-002',
      patient: 'Sara Ali',
      age: 28,
      date: '2024-01-14',
      time: '2:15 PM',
      consultationType: 'Video',
      diagnosis: 'Common Cold',
      medicines: [
        { name: 'Paracetamol 500mg', dosage: '1-1-1', duration: '5 days', beforeMeal: false },
        { name: 'Cetirizine 10mg', dosage: '0-0-1', duration: '7 days', beforeMeal: false }
      ],
      instructions: 'Rest and drink plenty of fluids.',
      followUp: '1 week if symptoms persist',
      status: 'Active',
      videoLink: 'https://meet.jit.si/def456',
      patientRating: 4
    }
  ];

  const chamberPrescriptions = [
    {
      id: 'RX-CHM-001',
      patient: 'Rahman Hossain',
      age: 45,
      date: '2024-01-15',
      time: '11:00 AM',
      consultationType: 'Chamber',
      diagnosis: 'Diabetes Type 2',
      medicines: [
        { name: 'Metformin 500mg', dosage: '1-0-1', duration: '90 days', beforeMeal: true },
        { name: 'Glimepiride 2mg', dosage: '1-0-0', duration: '90 days', beforeMeal: false }
      ],
      instructions: 'Take before meals. Regular blood sugar monitoring required.',
      followUp: '1 month',
      status: 'Active',
      chamberAddress: '123 Medical Complex, Dhaka',
      appointmentFee: '৳1,200'
    },
    {
      id: 'RX-CHM-002',
      patient: 'Fatema Begum',
      age: 52,
      date: '2024-01-14',
      time: '3:30 PM',
      consultationType: 'Chamber',
      diagnosis: 'Arthritis',
      medicines: [
        { name: 'Ibuprofen 400mg', dosage: '1-1-1', duration: '14 days', beforeMeal: true },
        { name: 'Calcium+D3', dosage: '0-0-1', duration: '60 days', beforeMeal: false }
      ],
      instructions: 'Avoid heavy physical activity. Apply hot compress.',
      followUp: '2 weeks',
      status: 'Active',
      chamberAddress: '123 Medical Complex, Dhaka',
      appointmentFee: '৳1,200'
    }
  ];

  const quotePrescriptions = [
    {
      id: 'RX-QOT-001',
      patient: 'Karim Uddin',
      age: 38,
      date: '2024-01-15',
      time: 'Pending',
      consultationType: 'Online Quote',
      diagnosis: 'Skin Allergy',
      medicines: [
        { name: 'Loratadine 10mg', dosage: '0-0-1', duration: '30 days', beforeMeal: false },
        { name: 'Hydrocortisone cream', dosage: 'Apply twice daily', duration: '14 days', beforeMeal: false }
      ],
      instructions: 'Avoid allergens. Use moisturizer regularly.',
      followUp: '3 weeks',
      status: 'Pending Quote',
      quotedPrice: '৳800',
      quoteExpiry: '2024-01-17',
      symptoms: 'Rash on arms, itching for 2 weeks',
      images: ['rash1.jpg', 'rash2.jpg']
    }
  ];

  const getPrescriptionsByType = () => {
    switch (activeTab) {
      case 'video': return videoPrescriptions;
      case 'chamber': return chamberPrescriptions;
      case 'quote': return quotePrescriptions;
      default: return videoPrescriptions;
    }
  };

  const filteredPrescriptions = getPrescriptionsByType().filter(rx =>
    rx.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    rx.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const stats = [
    { label: 'Video Prescriptions', value: '45', icon: Video, color: 'from-blue-500 to-blue-600' },
    { label: 'Chamber Prescriptions', value: '32', icon: Building, color: 'from-green-500 to-green-600' },
    { label: 'Quote Requests', value: '18', icon: Quote, color: 'from-purple-500 to-purple-600' },
    { label: 'This Month', value: '95', icon: Calendar, color: 'from-amber-500 to-amber-600' },
  ];

  const PrescriptionCard = ({ prescription, type }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              type === 'video' ? 'bg-gradient-to-br from-blue-500/20 to-blue-600/20' :
              type === 'chamber' ? 'bg-gradient-to-br from-green-500/20 to-green-600/20' :
              'bg-gradient-to-br from-purple-500/20 to-purple-600/20'
            }`}>
              <User className={`w-6 h-6 ${
                type === 'video' ? 'text-blue-600' :
                type === 'chamber' ? 'text-green-600' :
                'text-purple-600'
              }`} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-semibold text-gray-900">{prescription.patient}</h3>
                <span className="text-sm text-gray-500">Age: {prescription.age}</span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  prescription.status === 'Active' ? 'bg-green-100 text-green-700' :
                  prescription.status === 'Pending Quote' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {prescription.status}
                </span>
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <FileText className="w-3 h-3" />
                  {prescription.id}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {prescription.date}
                </span>
                {prescription.time && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {prescription.time}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedPrescription(prescription)}
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
              <p className="text-sm font-medium text-gray-900">{prescription.diagnosis}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500 mb-1">Follow-up</p>
              <p className="text-sm font-medium text-gray-900">{prescription.followUp}</p>
            </div>
          </div>
          
          {type === 'video' && (
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">Video Consultation</p>
              <div className="flex items-center gap-3">
                <a href={prescription.videoLink} className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center gap-1">
                  <Video className="w-3 h-3" />
                  Join Call
                </a>
                {prescription.patientRating && (
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 text-yellow-500 fill-current" />
                    <span className="text-sm">{prescription.patientRating}.0</span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {type === 'chamber' && (
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">Chamber Visit</p>
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600 flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {prescription.chamberAddress}
                </span>
                <span className="text-sm font-medium text-green-600">{prescription.appointmentFee}</span>
              </div>
            </div>
          )}
          
          {type === 'quote' && (
            <div className="mb-3">
              <p className="text-xs text-gray-500 mb-1">Quote Details</p>
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-sm font-medium text-purple-600">{prescription.quotedPrice}</span>
                  <span className="text-xs text-gray-500 ml-2">Expires: {prescription.quoteExpiry}</span>
                </div>
                <button className="text-xs bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700">
                  Accept Quote
                </button>
              </div>
            </div>
          )}
          
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">Medicines ({prescription.medicines.length})</p>
            <div className="space-y-2">
              {prescription.medicines.slice(0, 2).map((med, idx) => (
                <div key={idx} className="flex items-center justify-between bg-white rounded-lg px-3 py-2">
                  <span className="text-sm font-medium text-gray-900">{med.name}</span>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{med.dosage}</span>
                    <span>{med.duration}</span>
                    {med.beforeMeal && <span className="text-amber-600">Before meal</span>}
                  </div>
                </div>
              ))}
              {prescription.medicines.length > 2 && (
                <p className="text-xs text-gray-500 text-center">+{prescription.medicines.length - 2} more medicines</p>
              )}
            </div>
          </div>
          
          <div>
            <p className="text-xs text-gray-500 mb-1">Instructions</p>
            <p className="text-sm text-gray-700 line-clamp-2">{prescription.instructions}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Enhanced Prescriptions</h1>
          <p className="text-gray-500 mt-1">Manage prescriptions by consultation type</p>
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

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="border-b border-gray-100">
          <div className="flex items-center p-1">
            <button
              onClick={() => setActiveTab('video')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'video' 
                  ? 'bg-blue-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Video className="w-4 h-4" />
              Video Consultation
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{videoPrescriptions.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('chamber')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'chamber' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Building className="w-4 h-4" />
              Chamber Visit
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{chamberPrescriptions.length}</span>
            </button>
            <button
              onClick={() => setActiveTab('quote')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-medium transition-colors ${
                activeTab === 'quote' 
                  ? 'bg-purple-600 text-white' 
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              <Quote className="w-4 h-4" />
              Online Quote
              <span className="bg-white/20 px-2 py-0.5 rounded-full text-xs">{quotePrescriptions.length}</span>
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
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

          <div className="space-y-4">
            {filteredPrescriptions.map((prescription) => (
              <PrescriptionCard 
                key={prescription.id} 
                prescription={prescription} 
                type={activeTab}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Prescription Detail Modal */}
      <AnimatePresence>
        {selectedPrescription && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">Prescription Details</h2>
                  <button
                    onClick={() => setSelectedPrescription(null)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <div className="p-6">
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
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
                      <p className="font-medium text-gray-900">{selectedPrescription.diagnosis}</p>
                    </div>
                    
                    <div>
                      <p className="text-sm text-gray-500 mb-3">Prescribed Medicines</p>
                      <div className="space-y-3">
                        {selectedPrescription.medicines.map((med, idx) => (
                          <div key={idx} className="bg-gray-50 rounded-lg p-4">
                            <p className="font-medium text-gray-900 mb-2">{med.name}</p>
                            <div className="grid grid-cols-3 gap-2 text-sm">
                              <div>
                                <span className="text-gray-500">Dosage:</span>
                                <span className="ml-2 font-medium">{med.dosage}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Duration:</span>
                                <span className="ml-2 font-medium">{med.duration}</span>
                              </div>
                              <div>
                                <span className="text-gray-500">Meal:</span>
                                <span className="ml-2 font-medium">{med.beforeMeal ? 'Before' : 'After'}</span>
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
                  </div>
                  
                  <div className="space-y-6">
                    {selectedPrescription.videoLink && (
                      <div className="bg-blue-50 rounded-lg p-4">
                        <p className="text-sm text-blue-600 font-medium mb-2">Video Consultation</p>
                        <a href={selectedPrescription.videoLink} className="text-blue-700 hover:text-blue-800 text-sm flex items-center gap-1">
                          <Video className="w-3 h-3" />
                          Join Video Call
                        </a>
                      </div>
                    )}
                    
                    {selectedPrescription.chamberAddress && (
                      <div className="bg-green-50 rounded-lg p-4">
                        <p className="text-sm text-green-600 font-medium mb-2">Chamber Visit</p>
                        <p className="text-sm text-green-700 mb-1">{selectedPrescription.chamberAddress}</p>
                        <p className="text-sm font-medium text-green-800">{selectedPrescription.appointmentFee}</p>
                      </div>
                    )}
                    
                    {selectedPrescription.quotedPrice && (
                      <div className="bg-purple-50 rounded-lg p-4">
                        <p className="text-sm text-purple-600 font-medium mb-2">Quote Details</p>
                        <p className="text-sm font-medium text-purple-800">{selectedPrescription.quotedPrice}</p>
                        <p className="text-xs text-purple-600">Expires: {selectedPrescription.quoteExpiry}</p>
                      </div>
                    )}
                    
                    <div className="flex flex-col gap-3">
                      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                        <Download className="w-4 h-4" />
                        Download PDF
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                        <Send className="w-4 h-4" />
                        Send to Patient
                      </button>
                      <button className="flex items-center justify-center gap-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700">
                        <Printer className="w-4 h-4" />
                        Print
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
