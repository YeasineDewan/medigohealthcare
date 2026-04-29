import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Pill, Calendar, Download, Upload, Search, Filter, Plus, Edit, Trash2, Save, X,
  Clock, User, Stethoscope, FileText, FileSearch, FileDown, FileUp, FileSignature, Receipt, CreditCard, Wallet, Shield, Award, Target, Zap,
  BarChart3, PieChart, LineChart, TrendingUp, TrendingDown, AlertCircle,
  CheckCircle, XCircle, Star, Bell, Settings, HelpCircle, LogOut, Menu, Home,
  ChevronRight, ChevronDown, MoreVertical, Eye as EyeIcon, EyeOff, Lock, Unlock,
  Key, Badge, Fingerprint, ShieldCheck, ShieldAlert, ShieldX,
  Building, Hospital, Globe, Languages, BookOpen, GraduationCap, Briefcase,
  Users, UserCheck, UserPlus, UserMinus, Camera, Video, MessageSquare, PhoneCall,
  VideoOff, Mic, MicOff, Wifi, Battery, Sun, Moon, MapPin, Phone, Mail,
  DollarSign, Activity, Heart, Brain, FlaskConical, TestTube, Microscope,
  ShoppingCart, Package, Truck, ShoppingBag, ShoppingBasket, Printer,
  Share2, QrCode, Barcode, AlertTriangle, Info, CheckSquare, Square,
  Circle, Triangle, Hexagon, Diamond, Award as AwardIcon, Target as TargetIcon,
  Zap as ZapIcon
} from 'lucide-react';

const prescriptions = [
  {
    id: 1,
    date: '2025-01-10',
    doctor: 'Dr. Fatima Khan',
    specialty: 'General Medicine',
    hospital: 'City Hospital',
    patient: 'John Doe',
    age: '34 years',
    weight: '70 kg',
    diagnosis: 'Hypertension, GERD',
    medicines: [
      {
        name: 'Paracetamol',
        dosage: '500mg',
        frequency: '3 times daily',
        duration: '7 days',
        instructions: 'Take after meals',
        quantity: '21 tablets',
        price: 'BDT 150'
      },
      {
        name: 'Omeprazole',
        dosage: '20mg',
        frequency: 'Once daily',
        duration: '14 days',
        instructions: 'Take before breakfast',
        quantity: '14 capsules',
        price: 'BDT 280'
      }
    ],
    totalCost: 'BDT 430',
    status: 'active',
    refillDate: '2025-01-17',
    notes: 'Follow up in 2 weeks',
    qrCode: 'RX-2025-001',
    file: 'prescription_001.pdf'
  },
  {
    id: 2,
    date: '2024-12-20',
    doctor: 'Dr. Rahman Ali',
    specialty: 'Cardiology',
    hospital: 'Heart Care Center',
    patient: 'John Doe',
    age: '34 years',
    weight: '70 kg',
    diagnosis: 'Vitamin D deficiency',
    medicines: [
      {
        name: 'Vitamin D3',
        dosage: '1000 IU',
        frequency: 'Once daily',
        duration: '30 days',
        instructions: 'Take with food',
        quantity: '30 capsules',
        price: 'BDT 450'
      },
      {
        name: 'Calcium Carbonate',
        dosage: '500mg',
        frequency: 'Twice daily',
        duration: '30 days',
        instructions: 'Take after meals',
        quantity: '60 tablets',
        price: 'BDT 320'
      }
    ],
    totalCost: 'BDT 770',
    status: 'completed',
    refillDate: '2024-12-20',
    notes: 'Continue for 3 months',
    qrCode: 'RX-2024-002',
    file: 'prescription_002.pdf'
  },
  {
    id: 3,
    date: '2024-11-15',
    doctor: 'Dr. Sarah Smith',
    specialty: 'Pediatrics',
    hospital: 'Medical Center',
    patient: 'John Doe',
    age: '34 years',
    weight: '70 kg',
    diagnosis: 'Seasonal allergy',
    medicines: [
      {
        name: 'Cetirizine',
        dosage: '10mg',
        frequency: 'Once daily',
        duration: '14 days',
        instructions: 'Take at bedtime',
        quantity: '14 tablets',
        price: 'BDT 180'
      }
    ],
    totalCost: 'BDT 180',
    status: 'expired',
    refillDate: '2024-11-15',
    notes: 'Avoid allergens',
    qrCode: 'RX-2024-003',
    file: 'prescription_003.pdf'
  }
];

export default function PatientPrescriptions() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const filteredPrescriptions = prescriptions.filter(rx => {
    const matchesSearch = rx.doctor.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rx.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         rx.medicines.some(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterStatus === 'all' || rx.status === filterStatus;
    return matchesSearch && matchesFilter;
  }).sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleDownload = (prescription) => {
    console.log('Downloading prescription:', prescription.file);
  };

  const handleOrderMedicines = (prescription) => {
    setSelectedPrescription(prescription);
    setShowOrderModal(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-gray-100 text-gray-700';
      case 'expired': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'completed': return CheckCircle;
      case 'expired': return XCircle;
      default: return AlertCircle;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Prescriptions</h1>
          <p className="text-gray-600 mt-1">Manage your prescriptions and order medicines online</p>
        </div>
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Request Prescription
        </button>
      </motion.div>

      {/* Stats Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <Pill className="w-5 h-5 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">{prescriptions.length}</span>
          </div>
          <p className="text-sm text-gray-600">Total Prescriptions</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <span className="text-2xl font-bold text-gray-900">1</span>
          </div>
          <p className="text-sm text-gray-600">Active</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <XCircle className="w-5 h-5 text-red-600" />
            <span className="text-2xl font-bold text-gray-900">1</span>
          </div>
          <p className="text-sm text-gray-600">Expired</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="w-5 h-5 text-purple-600" />
            <span className="text-2xl font-bold text-gray-900">BDT 1,380</span>
          </div>
          <p className="text-sm text-gray-600">Total Cost</p>
        </div>
      </motion.div>

      {/* Search and Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search prescriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="expired">Expired</option>
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="date">Sort by Date</option>
            <option value="doctor">Sort by Doctor</option>
            <option value="totalCost">Sort by Cost</option>
          </select>
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            {sortOrder === 'asc' ? '↑' : '↓'}
          </button>
        </div>
      </motion.div>

      {/* Prescriptions List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="space-y-4"
      >
        {filteredPrescriptions.map((prescription, index) => (
          <motion.div
            key={prescription.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-blue-50">
                    <Pill className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-gray-900">{prescription.doctor}</h3>
                      <span className="text-sm text-gray-600">{prescription.specialty}</span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(prescription.status)}`}>
                        {React.createElement(getStatusIcon(prescription.status), { className: 'w-3 h-3' })}
                        {prescription.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{prescription.date}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Hospital className="w-4 h-4" />
                        <span>{prescription.hospital}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{prescription.patient}, {prescription.age}</span>
                      </div>
                    </div>
                    <p className="text-sm text-gray-700 mb-2">
                      <span className="font-medium">Diagnosis:</span> {prescription.diagnosis}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <QrCode className="w-4 h-4" />
                        <span>{prescription.qrCode}</span>
                      </div>
                      {prescription.refillDate && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Refill: {prescription.refillDate}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="text-right">
                    <p className="text-lg font-semibold text-gray-900">{prescription.totalCost}</p>
                    <p className="text-sm text-gray-600">Total Cost</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(prescription)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="Download"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setSelectedPrescription(prescription)}
                      className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                      title="View Details"
                    >
                      <EyeIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleOrderMedicines(prescription)}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                      title="Order Medicines"
                      disabled={prescription.status === 'expired'}
                    >
                      <ShoppingCart className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Medicines List */}
              <div className="mt-4 pt-4 border-t border-gray-200">
                <h4 className="font-medium text-gray-900 mb-2">Medicines ({prescription.medicines.length})</h4>
                <div className="space-y-2">
                  {prescription.medicines.map((medicine, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{medicine.name} {medicine.dosage}</p>
                        <p className="text-sm text-gray-600">{medicine.frequency} for {medicine.duration}</p>
                        <p className="text-xs text-gray-500">{medicine.instructions}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">{medicine.price}</p>
                        <p className="text-xs text-gray-500">{medicine.quantity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {prescription.notes && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Notes:</span> {prescription.notes}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Order Modal */}
      <AnimatePresence>
        {showOrderModal && selectedPrescription && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowOrderModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Order Medicines</h2>
                <button
                  onClick={() => setShowOrderModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="font-medium text-gray-900">{selectedPrescription.doctor}</p>
                  <p className="text-sm text-gray-600">{selectedPrescription.date}</p>
                  <p className="text-sm text-gray-600">{selectedPrescription.diagnosis}</p>
                </div>

                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Medicines</h3>
                  <div className="space-y-2">
                    {selectedPrescription.medicines.map((medicine, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            defaultChecked={true}
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{medicine.name} {medicine.dosage}</p>
                            <p className="text-sm text-gray-600">{medicine.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium text-gray-900">{medicine.price}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <p className="text-lg font-semibold text-gray-900">Total: {selectedPrescription.totalCost}</p>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setShowOrderModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setShowOrderModal(false)}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
