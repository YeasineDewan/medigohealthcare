import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  Shield,
  AlertCircle,
  Edit,
  Save,
  X,
  Camera,
  Fingerprint,
  Clock,
  Plus,
  Trash2,
  Upload,
  Download,
  RefreshCw,
  ChevronRight,
  CheckCircle,
  XCircle,
  Info,
  Briefcase,
  GraduationCap,
  Globe,
  Languages,
  Hospital,
  Stethoscope,
  Pill,
  Activity,
  Thermometer,
  Droplet,
  Weight,
  Ruler,
  Baby,
  CreditCard,
  Wallet,
  FileText,
  Eye,
  EyeOff,
  Lock,
  Bell,
  Moon,
  Sun,
  Settings,
  LogOut,
  Home,
  Building,
  Car,
  Plane,
  Zap,
  Coffee,
  Smile,
  Frown,
  Meh,
  Star,
  MessageCircle,
  PhoneCall,
  Video,
  Image,
  Paperclip,
  Send,
  Search,
  Filter,
  MoreHorizontal,
  ChevronUp,
  ChevronDown,
  ArrowUpRight,
  AlertTriangle,
  CheckSquare,
} from 'lucide-react';

const initialPatientData = {
  id: 1,
  firstName: 'Ahmed',
  lastName: 'Khan',
  email: 'ahmed.khan@email.com',
  phone: '+880 123 456 7890',
  dateOfBirth: '1990-05-15',
  gender: 'Male',
  bloodType: 'O+',
  bloodTypeRhesus: 'Positive',
  nationality: 'Bangladeshi',
  nidNumber: '1234567890',
  birthCertificateNumber: '',
  passportNumber: '',
  passportExpiry: '',
  
  address: {
    present: {
      house: '45',
      road: '12',
      sector: '13',
      area: 'Dhanmondi',
      city: 'Dhaka',
      district: 'Dhaka',
      division: 'Dhaka',
      postalCode: '1209',
    },
    permanent: {
      house: '45',
      road: '12',
      sector: '13',
      area: 'Dhanmondi',
      city: 'Dhaka',
      district: 'Dhaka',
      division: 'Dhaka',
      postalCode: '1209',
    }
  },
  
  emergencyContact: {
    name: 'Fatema Khan',
    relation: 'Wife',
    phone: '+880 987 654 3210',
    email: 'fatema.khan@email.com',
    address: 'Same as above',
  },
  
  primaryContact: {
    name: 'Ahmed Khan',
    relation: 'Self',
    phone: '+880 123 456 7890',
    email: 'ahmed.khan@email.com',
  },
  
  insurance: {
    provider: 'Blue Cross Blue Shield',
    policyNumber: 'BCBS-2024-567890',
    groupNumber: 'GRP-2024-001',
    validFrom: '2024-01-01',
    validUntil: '2025-12-31',
    coverageType: 'Comprehensive',
    coveragePercent: 80,
    cardNumber: 'BCBS-567890',
    status: 'active',
  },
  
  medicalInfo: {
    height: "5'10\"",
    weight: '75 kg',
    bmi: 24.2,
    bloodPressureSystolic: 120,
    bloodPressureDiastolic: 80,
    heartRate: 72,
    temperature: 98.6,
    oxygenSaturation: 98,
    respirationRate: 16,
  },
  
  allergies: [
    { id: 1, name: 'Penicillin', severity: 'Moderate', reaction: 'Rash', notes: 'Since childhood' },
    { id: 2, name: 'Peanuts', severity: 'Severe', reaction: 'Anaphylaxis', notes: 'Carry EpiPen' },
  ],
  
  chronicConditions: [
    { id: 1, name: 'Type 2 Diabetes', diagnosedDate: '2020-03-15', status: 'Managing', doctor: 'Dr. Sarah Johnson', notes: 'Diet controlled' },
  ],
  
  medications: [
    { id: 1, name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', prescribedBy: 'Dr. Sarah Johnson', startDate: '2020-03-15', endDate: '', instructions: 'Take with food', status: 'Active' },
  ],
  
  familyHistory: [
    { id: 1, relation: 'Father', condition: 'Hypertension', notes: 'Diagnosed at age 50' },
    { id: 2, relation: 'Mother', condition: 'Type 2 Diabetes', notes: 'Diagnosed at age 55' },
  ],
  
  surgicalHistory: [
    { id: 1, procedure: 'Appendectomy', date: '2015-08-20', hospital: 'Dhaka Medical College', notes: 'Laparoscopic' },
  ],
  
  vaccinations: [
    { id: 1, name: 'COVID-19 (Pfizer)', date: '2023-09-15', provider: 'Bangabandhu Sheikh Mujib Medical University', nextDue: '2024-09-15' },
    { id: 2, name: 'Influenza', date: '2024-01-10', provider: 'Local Clinic', nextDue: '2025-01-10' },
    { id: 3, name: 'Tetanus', date: '2022-05-20', provider: 'District Hospital', nextDue: '2032-05-20' },
  ],
  
  lifestyle: {
    smoking: { status: 'Never', packsPerDay: 0, years: 0 },
    alcohol: { status: 'Occasionally', drinksPerWeek: 1 },
    exercise: { frequency: 'Daily', duration: '30 minutes', type: 'Walking, Jogging' },
    diet: { type: 'Balanced', restrictions: [] },
    sleep: { hoursPerNight: 7, quality: 'Good' },
    stress: { level: 'Moderate', management: 'Meditation, Exercise' },
  },
  
  vitalSigns: [
    { date: '2024-01-15', bloodPressure: '120/80', heartRate: 72, temperature: 98.6, weight: 75, notes: 'Regular checkup' },
    { date: '2024-01-01', bloodPressure: '118/78', heartRate: 70, temperature: 98.4, weight: 76, notes: 'New Year checkup' },
    { date: '2023-12-15', bloodPressure: '122/82', heartRate: 74, temperature: 98.6, weight: 75, notes: 'Monthly checkup' },
  ],
  
  medicalRecords: [
    { id: 1, type: 'Lab Report', title: 'Complete Blood Count', date: '2024-01-10', doctor: 'Dr. Sarah Johnson', facility: 'Medigo Lab', status: 'Normal', file: null },
    { id: 2, type: 'Prescription', title: 'Diabetes Follow-up', date: '2024-01-05', doctor: 'Dr. Sarah Johnson', facility: 'Medigo Clinic', status: 'Active', file: null },
  ],
  
  appointments: [
    { id: 1, doctor: 'Dr. Fatima Rahman', specialty: 'Cardiology', date: '2024-02-02', time: '10:00 AM', type: 'In-person', status: 'Confirmed' },
    { id: 2, doctor: 'Dr. Karim Ahmed', specialty: 'Dermatology', date: '2024-02-05', time: '02:00 PM', type: 'Video', status: 'Confirmed' },
  ],
  
  prescriptions: [
    { id: 1, medication: 'Metformin 500mg', dosage: 'Twice daily', prescribedBy: 'Dr. Sarah Johnson', date: '2024-01-05', refills: 3, remaining: 2, status: 'Active' },
    { id: 2, medication: 'Vitamin D 1000 IU', dosage: 'Once daily', prescribedBy: 'Dr. Emily Williams', date: '2024-01-10', refills: 6, remaining: 5, status: 'Active' },
  ],
  
  labTests: [
    { id: 1, name: 'HbA1c', result: '6.5%', normal: '4-5.6%', status: 'High', date: '2024-01-10', notes: 'Pre-diabetic range' },
    { id: 2, name: 'Fasting Blood Glucose', result: '110 mg/dL', normal: '70-100 mg/dL', status: 'High', date: '2024-01-10', notes: 'Slightly elevated' },
    { id: 3, name: 'Complete Blood Count', result: 'Normal', normal: 'Normal', status: 'Normal', date: '2024-01-10', notes: 'All values within range' },
    { id: 4, name: 'Lipid Profile', result: 'Normal', normal: 'Normal', status: 'Normal', date: '2023-12-15', notes: 'Cholesterol within range' },
  ],
  
  bills: [
    { id: 1, description: 'Annual Physical Examination', amount: 5000, date: '2024-01-10', status: 'Paid', method: 'Insurance' },
    { id: 2, description: 'Lab Tests', amount: 2500, date: '2024-01-10', status: 'Paid', method: 'Insurance' },
    { id: 3, description: 'Prescription - Metformin', amount: 800, date: '2024-01-05', status: 'Paid', method: 'Out of Pocket' },
  ],
};

export default function PatientProfile() {
  const [patientData, setPatientData] = useState(initialPatientData);
  const [activeTab, setActiveTab] = useState('personal');
  const [editingField, setEditingField] = useState(null);
  const [editValue, setEditValue] = useState('');
  const [showAlerts, setShowAlerts] = useState(true);
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const [newAllergy, setNewAllergy] = useState({ name: '', severity: 'Mild', reaction: '', notes: '' });
  const [newCondition, setNewCondition] = useState({ name: '', diagnosedDate: '', status: 'New', doctor: '', notes: '' });
  const [newMedication, setNewMedication] = useState({ name: '', dosage: '', frequency: '', prescribedBy: '', startDate: '', instructions: '' });
  const [newVaccination, setNewVaccination] = useState({ name: '', date: '', provider: '', nextDue: '' });

  const [showAddAllergy, setShowAddAllergy] = useState(false);
  const [showAddCondition, setShowAddCondition] = useState(false);
  const [showAddMedication, setShowAddMedication] = useState(false);
  const [showAddVaccination, setShowAddVaccination] = useState(false);

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setEditingField(null);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
  };

  const handleEdit = (field, value) => {
    setEditingField(field);
    setEditValue(value);
  };

  const handleAddAllergy = () => {
    if (newAllergy.name) {
      setPatientData({
        ...patientData,
        allergies: [...patientData.allergies, { id: Date.now(), ...newAllergy }]
      });
      setNewAllergy({ name: '', severity: 'Mild', reaction: '', notes: '' });
      setShowAddAllergy(false);
    }
  };

  const handleDeleteAllergy = (id) => {
    setPatientData({
      ...patientData,
      allergies: patientData.allergies.filter(a => a.id !== id)
    });
  };

  const handleAddCondition = () => {
    if (newCondition.name) {
      setPatientData({
        ...patientData,
        chronicConditions: [...patientData.chronicConditions, { id: Date.now(), ...newCondition }]
      });
      setNewCondition({ name: '', diagnosedDate: '', status: 'New', doctor: '', notes: '' });
      setShowAddCondition(false);
    }
  };

  const handleDeleteCondition = (id) => {
    setPatientData({
      ...patientData,
      chronicConditions: patientData.chronicConditions.filter(c => c.id !== id)
    });
  };

  const handleAddMedication = () => {
    if (newMedication.name) {
      setPatientData({
        ...patientData,
        medications: [...patientData.medications, { id: Date.now(), ...newMedication, status: 'Active' }]
      });
      setNewMedication({ name: '', dosage: '', frequency: '', prescribedBy: '', startDate: '', instructions: '' });
      setShowAddMedication(false);
    }
  };

  const handleDeleteMedication = (id) => {
    setPatientData({
      ...patientData,
      medications: patientData.medications.filter(m => m.id !== id)
    });
  };

  const handleAddVaccination = () => {
    if (newVaccination.name) {
      setPatientData({
        ...patientData,
        vaccinations: [...patientData.vaccinations, { id: Date.now(), ...newVaccination }]
      });
      setNewVaccination({ name: '', date: '', provider: '', nextDue: '' });
      setShowAddVaccination(false);
    }
  };

  const handleDeleteVaccination = (id) => {
    setPatientData({
      ...patientData,
      vaccinations: patientData.vaccinations.filter(v => v.id !== id)
    });
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'medical', label: 'Medical Info', icon: Stethoscope },
    { id: 'insurance', label: 'Insurance', icon: Shield },
    { id: 'records', label: 'Medical Records', icon: FileText },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'prescriptions', label: 'Prescriptions', icon: Pill },
    { id: 'billing', label: 'Billing', icon: Wallet },
  ];

  const severityColors = {
    Mild: 'bg-green-100 text-green-700',
    Moderate: 'bg-yellow-100 text-yellow-700',
    Severe: 'bg-red-100 text-red-700',
  };

  const statusColors = {
    Active: 'bg-green-100 text-green-700',
    Managing: 'bg-blue-100 text-blue-700',
    New: 'bg-purple-100 text-purple-700',
    Completed: 'bg-gray-100 text-gray-700',
    Cancelled: 'bg-red-100 text-red-700',
    Confirmed: 'bg-green-100 text-green-700',
    Pending: 'bg-yellow-100 text-yellow-700',
    Paid: 'bg-green-100 text-green-700',
    Unpaid: 'bg-red-100 text-red-700',
    Normal: 'bg-green-100 text-green-700',
    High: 'bg-red-100 text-red-700',
    Low: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 mt-1">Manage your personal information and medical records</p>
        </div>
        {saved && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }} 
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 px-4 py-2 bg-green-100 text-green-700 rounded-lg"
          >
            <CheckCircle className="w-4 h-4" />
            <span className="font-medium">Saved successfully!</span>
          </motion.div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-72 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sticky top-24">
            <div className="text-center">
              <div className="relative inline-block">
                <div className="w-24 h-24 bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <button className="absolute bottom-0 right-0 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center border border-gray-200">
                  <Camera className="w-4 h-4 text-gray-600" />
                </button>
              </div>
              <h2 className="text-xl font-bold text-gray-900">{patientData.firstName} {patientData.lastName}</h2>
              <p className="text-gray-500">{patientData.email}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[patientData.insurance.status]}`}>
                  {patientData.insurance.status}
                </span>
                <span className="text-gray-400">|</span>
                <span className="text-sm text-gray-500">ID: 12345</span>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{patientData.email}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{patientData.phone}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{patientData.dateOfBirth}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{patientData.address.present.area}, {patientData.address.present.city}</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-100">
              <h3 className="font-semibold text-gray-900 mb-3">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-gray-900">{patientData.allergies.length}</p>
                  <p className="text-xs text-gray-500">Allergies</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-gray-900">{patientData.chronicConditions.length}</p>
                  <p className="text-xs text-gray-500">Conditions</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-gray-900">{patientData.vaccinations.length}</p>
                  <p className="text-xs text-gray-500">Vaccinations</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 text-center">
                  <p className="text-lg font-bold text-gray-900">{patientData.prescriptions.length}</p>
                  <p className="text-xs text-gray-500">Rx</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex-1">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="border-b border-gray-100 overflow-x-auto">
              <div className="flex p-2 gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                      activeTab === tab.id
                        ? 'bg-[#5DBB63] text-white'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <tab.icon className="w-4 h-4" />
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="p-6">
              {activeTab === 'personal' && (
                <div className="space-y-6">
                  <h3 className="font-semibold text-gray-900 text-lg">Personal Information</h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">First Name</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={patientData.firstName}
                          onChange={(e) => setPatientData({...patientData, firstName: e.target.value})}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                        />
                        <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                          <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Last Name</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={patientData.lastName}
                          onChange={(e) => setPatientData({...patientData, lastName: e.target.value})}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={patientData.email}
                        onChange={(e) => setPatientData({...patientData, email: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone</label>
                      <input
                        type="tel"
                        value={patientData.phone}
                        onChange={(e) => setPatientData({...patientData, phone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Date of Birth</label>
                      <input
                        type="date"
                        value={patientData.dateOfBirth}
                        onChange={(e) => setPatientData({...patientData, dateOfBirth: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Gender</label>
                      <select
                        value={patientData.gender}
                        onChange={(e) => setPatientData({...patientData, gender: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Blood Type</label>
                      <select
                        value={patientData.bloodType}
                        onChange={(e) => setPatientData({...patientData, bloodType: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      >
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Nationality</label>
                      <input
                        type="text"
                        value={patientData.nationality}
                        onChange={(e) => setPatientData({...patientData, nationality: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-900 text-lg mb-4">Emergency Contact</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Name</label>
                        <input
                          type="text"
                          value={patientData.emergencyContact.name}
                          onChange={(e) => setPatientData({
                            ...patientData,
                            emergencyContact: {...patientData.emergencyContact, name: e.target.value}
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Relation</label>
                        <input
                          type="text"
                          value={patientData.emergencyContact.relation}
                          onChange={(e) => setPatientData({
                            ...patientData,
                            emergencyContact: {...patientData.emergencyContact, relation: e.target.value}
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Phone</label>
                        <input
                          type="tel"
                          value={patientData.emergencyContact.phone}
                          onChange={(e) => setPatientData({
                            ...patientData,
                            emergencyContact: {...patientData.emergencyContact, phone: e.target.value}
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <input
                          type="email"
                          value={patientData.emergencyContact.email}
                          onChange={(e) => setPatientData({
                            ...patientData,
                            emergencyContact: {...patientData.emergencyContact, email: e.target.value}
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-900 text-lg mb-4">Present Address</h3>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">House/Plot</label>
                        <input
                          type="text"
                          value={patientData.address.present.house}
                          onChange={(e) => setPatientData({
                            ...patientData,
                            address: {
                              ...patientData.address,
                              present: {...patientData.address.present, house: e.target.value}
                            }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Road</label>
                        <input
                          type="text"
                          value={patientData.address.present.road}
                          onChange={(e) => setPatientData({
                            ...patientData,
                            address: {
                              ...patientData.address,
                              present: {...patientData.address.present, road: e.target.value}
                            }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Area</label>
                        <input
                          type="text"
                          value={patientData.address.present.area}
                          onChange={(e) => setPatientData({
                            ...patientData,
                            address: {
                              ...patientData.address,
                              present: {...patientData.address.present, area: e.target.value}
                            }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">City</label>
                        <input
                          type="text"
                          value={patientData.address.present.city}
                          onChange={(e) => setPatientData({
                            ...patientData,
                            address: {
                              ...patientData.address,
                              present: {...patientData.address.present, city: e.target.value}
                            }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">District</label>
                        <input
                          type="text"
                          value={patientData.address.present.district}
                          onChange={(e) => setPatientData({
                            ...patientData,
                            address: {
                              ...patientData.address,
                              present: {...patientData.address.present, district: e.target.value}
                            }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Postal Code</label>
                        <input
                          type="text"
                          value={patientData.address.present.postalCode}
                          onChange={(e) => setPatientData({
                            ...patientData,
                            address: {
                              ...patientData.address,
                              present: {...patientData.address.present, postalCode: e.target.value}
                            }
                          })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t border-gray-100">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] disabled:opacity-50"
                    >
                      {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'medical' && (
                <div className="space-y-6">
                  <h3 className="font-semibold text-gray-900 text-lg">Medical Information</h3>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Ruler className="w-5 h-5 text-[#5DBB63]" />
                        <span className="text-sm text-gray-600">Height</span>
                      </div>
                      <input
                        type="text"
                        value={patientData.medicalInfo.height}
                        onChange={(e) => setPatientData({
                          ...patientData,
                          medicalInfo: {...patientData.medicalInfo, height: e.target.value}
                        })}
                        className="w-full text-lg font-bold text-gray-900 border-0 bg-transparent focus:ring-2 focus:ring-[#5DBB63] rounded-lg px-2 py-1"
                      />
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Weight className="w-5 h-5 text-[#5DBB63]" />
                        <span className="text-sm text-gray-600">Weight</span>
                      </div>
                      <input
                        type="text"
                        value={patientData.medicalInfo.weight}
                        onChange={(e) => setPatientData({
                          ...patientData,
                          medicalInfo: {...patientData.medicalInfo, weight: e.target.value}
                        })}
                        className="w-full text-lg font-bold text-gray-900 border-0 bg-transparent focus:ring-2 focus:ring-[#5DBB63] rounded-lg px-2 py-1"
                      />
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-[#5DBB63]" />
                        <span className="text-sm text-gray-600">BMI</span>
                      </div>
                      <p className="text-lg font-bold text-gray-900">{patientData.medicalInfo.bmi}</p>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="w-5 h-5 text-red-500" />
                        <span className="text-sm text-gray-600">Blood Pressure</span>
                      </div>
                      <input
                        type="text"
                        value={`${patientData.medicalInfo.bloodPressureSystolic}/${patientData.medicalInfo.bloodPressureDiastolic}`}
                        onChange={(e) => {
                          const [sys, dia] = e.target.value.split('/');
                          setPatientData({
                            ...patientData,
                            medicalInfo: {
                              ...patientData.medicalInfo,
                              bloodPressureSystolic: parseInt(sys) || 0,
                              bloodPressureDiastolic: parseInt(dia) || 0
                            }
                          });
                        }}
                        className="w-full text-lg font-bold text-gray-900 border-0 bg-transparent focus:ring-2 focus:ring-[#5DBB63] rounded-lg px-2 py-1"
                      />
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Activity className="w-5 h-5 text-pink-500" />
                        <span className="text-sm text-gray-600">Heart Rate</span>
                      </div>
                      <input
                        type="number"
                        value={patientData.medicalInfo.heartRate}
                        onChange={(e) => setPatientData({
                          ...patientData,
                          medicalInfo: {...patientData.medicalInfo, heartRate: parseInt(e.target.value)}
                        })}
                        className="w-full text-lg font-bold text-gray-900 border-0 bg-transparent focus:ring-2 focus:ring-[#5DBB63] rounded-lg px-2 py-1"
                      />
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Thermometer className="w-5 h-5 text-orange-500" />
                        <span className="text-sm text-gray-600">Temperature</span>
                      </div>
                      <input
                        type="number"
                        step="0.1"
                        value={patientData.medicalInfo.temperature}
                        onChange={(e) => setPatientData({
                          ...patientData,
                          medicalInfo: {...patientData.medicalInfo, temperature: parseFloat(e.target.value)}
                        })}
                        className="w-full text-lg font-bold text-gray-900 border-0 bg-transparent focus:ring-2 focus:ring-[#5DBB63] rounded-lg px-2 py-1"
                      />
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 text-lg">Allergies</h3>
                      <button
                        onClick={() => setShowAddAllergy(!showAddAllergy)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-[#5DBB63] border border-[#5DBB63] rounded-lg hover:bg-[#5DBB63]/10"
                      >
                        <Plus className="w-4 h-4" /> Add Allergy
                      </button>
                    </div>

                    {showAddAllergy && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Allergy name"
                            value={newAllergy.name}
                            onChange={(e) => setNewAllergy({...newAllergy, name: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                          />
                          <select
                            value={newAllergy.severity}
                            onChange={(e) => setNewAllergy({...newAllergy, severity: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                          >
                            <option value="Mild">Mild</option>
                            <option value="Moderate">Moderate</option>
                            <option value="Severe">Severe</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Reaction"
                            value={newAllergy.reaction}
                            onChange={(e) => setNewAllergy({...newAllergy, reaction: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="Notes"
                            value={newAllergy.notes}
                            onChange={(e) => setNewAllergy({...newAllergy, notes: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                          <button
                            onClick={() => setShowAddAllergy(false)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleAddAllergy}
                            className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f]"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      {patientData.allergies.map((allergy) => (
                        <div key={allergy.id} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <AlertCircle className="w-5 h-5 text-red-500" />
                            <div>
                              <p className="font-medium text-gray-900">{allergy.name}</p>
                              <p className="text-sm text-gray-500">{allergy.reaction} · {allergy.notes}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${severityColors[allergy.severity]}`}>
                              {allergy.severity}
                            </span>
                            <button
                              onClick={() => handleDeleteAllergy(allergy.id)}
                              className="p-1 hover:bg-red-100 rounded"
                            >
                              <Trash2 className="w-4 h-4 text-red-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 text-lg">Chronic Conditions</h3>
                      <button
                        onClick={() => setShowAddCondition(!showAddCondition)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-[#5DBB63] border border-[#5DBB63] rounded-lg hover:bg-[#5DBB63]/10"
                      >
                        <Plus className="w-4 h-4" /> Add Condition
                      </button>
                    </div>

                    {showAddCondition && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Condition name"
                            value={newCondition.name}
                            onChange={(e) => setNewCondition({...newCondition, name: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="date"
                            value={newCondition.diagnosedDate}
                            onChange={(e) => setNewCondition({...newCondition, diagnosedDate: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                          />
                          <select
                            value={newCondition.status}
                            onChange={(e) => setNewCondition({...newCondition, status: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                          >
                            <option value="New">New</option>
                            <option value="Managing">Managing</option>
                            <option value="Resolved">Resolved</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Doctor"
                            value={newCondition.doctor}
                            onChange={(e) => setNewCondition({...newCondition, doctor: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="Notes"
                            value={newCondition.notes}
                            onChange={(e) => setNewCondition({...newCondition, notes: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg md:col-span-2"
                          />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                          <button
                            onClick={() => setShowAddCondition(false)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleAddCondition}
                            className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f]"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      {patientData.chronicConditions.map((condition) => (
                        <div key={condition.id} className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <Stethoscope className="w-5 h-5 text-blue-500" />
                            <div>
                              <p className="font-medium text-gray-900">{condition.name}</p>
                              <p className="text-sm text-gray-500">Since {condition.diagnosedDate} · {condition.doctor}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[condition.status]}`}>
                              {condition.status}
                            </span>
                            <button
                              onClick={() => handleDeleteCondition(condition.id)}
                              className="p-1 hover:bg-blue-100 rounded"
                            >
                              <Trash2 className="w-4 h-4 text-blue-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 text-lg">Current Medications</h3>
                      <button
                        onClick={() => setShowAddMedication(!showAddMedication)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-[#5DBB63] border border-[#5DBB63] rounded-lg hover:bg-[#5DBB63]/10"
                      >
                        <Plus className="w-4 h-4" /> Add Medication
                      </button>
                    </div>

                    {showAddMedication && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="grid md:grid-cols-3 gap-4">
                          <input
                            type="text"
                            placeholder="Medication name"
                            value={newMedication.name}
                            onChange={(e) => setNewMedication({...newMedication, name: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="Dosage"
                            value={newMedication.dosage}
                            onChange={(e) => setNewMedication({...newMedication, dosage: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="Frequency"
                            value={newMedication.frequency}
                            onChange={(e) => setNewMedication({...newMedication, frequency: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="Prescribed by"
                            value={newMedication.prescribedBy}
                            onChange={(e) => setNewMedication({...newMedication, prescribedBy: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="date"
                            value={newMedication.startDate}
                            onChange={(e) => setNewMedication({...newMedication, startDate: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="Instructions"
                            value={newMedication.instructions}
                            onChange={(e) => setNewMedication({...newMedication, instructions: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                          <button
                            onClick={() => setShowAddMedication(false)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleAddMedication}
                            className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f]"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      {patientData.medications.map((medication) => (
                        <div key={medication.id} className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <Pill className="w-5 h-5 text-purple-500" />
                            <div>
                              <p className="font-medium text-gray-900">{medication.name} {medication.dosage}</p>
                              <p className="text-sm text-gray-500">{medication.frequency} · {medication.instructions}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[medication.status]}`}>
                              {medication.status}
                            </span>
                            <button
                              onClick={() => handleDeleteMedication(medication.id)}
                              className="p-1 hover:bg-purple-100 rounded"
                            >
                              <Trash2 className="w-4 h-4 text-purple-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 text-lg">Vaccinations</h3>
                      <button
                        onClick={() => setShowAddVaccination(!showAddVaccination)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-[#5DBB63] border border-[#5DBB63] rounded-lg hover:bg-[#5DBB63]/10"
                      >
                        <Plus className="w-4 h-4" /> Add Vaccination
                      </button>
                    </div>

                    {showAddVaccination && (
                      <div className="bg-gray-50 rounded-lg p-4 mb-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Vaccine name"
                            value={newVaccination.name}
                            onChange={(e) => setNewVaccination({...newVaccination, name: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="date"
                            value={newVaccination.date}
                            onChange={(e) => setNewVaccination({...newVaccination, date: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="text"
                            placeholder="Provider"
                            value={newVaccination.provider}
                            onChange={(e) => setNewVaccination({...newVaccination, provider: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                          />
                          <input
                            type="date"
                            placeholder="Next due"
                            value={newVaccination.nextDue}
                            onChange={(e) => setNewVaccination({...newVaccination, nextDue: e.target.value})}
                            className="px-4 py-2 border border-gray-300 rounded-lg"
                          />
                        </div>
                        <div className="flex justify-end gap-2 mt-4">
                          <button
                            onClick={() => setShowAddVaccination(false)}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={handleAddVaccination}
                            className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f]"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      {patientData.vaccinations.map((vaccination) => (
                        <div key={vaccination.id} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <Shield className="w-5 h-5 text-green-500" />
                            <div>
                              <p className="font-medium text-gray-900">{vaccination.name}</p>
                              <p className="text-sm text-gray-500">{vaccination.date} · {vaccination.provider}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            {vaccination.nextDue && (
                              <span className="text-xs text-gray-500">Next: {vaccination.nextDue}</span>
                            )}
                            <button
                              onClick={() => handleDeleteVaccination(vaccination.id)}
                              className="p-1 hover:bg-green-100 rounded"
                            >
                              <Trash2 className="w-4 h-4 text-green-500" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-900 text-lg mb-4">Family Medical History</h3>
                    <div className="space-y-2">
                      {patientData.familyHistory.map((history) => (
                        <div key={history.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-4">
                            <User className="w-5 h-5 text-gray-500" />
                            <div>
                              <p className="font-medium text-gray-900">{history.relation}</p>
                              <p className="text-sm text-gray-500">{history.condition}</p>
                            </div>
                          </div>
                          <p className="text-sm text-gray-500">{history.notes}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t border-gray-100">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] disabled:opacity-50"
                    >
                      {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'insurance' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 text-lg">Insurance Information</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[patientData.insurance.status]}`}>
                      {patientData.insurance.status}
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Insurance Provider</label>
                      <input
                        type="text"
                        value={patientData.insurance.provider}
                        onChange={(e) => setPatientData({
                          ...patientData,
                          insurance: {...patientData.insurance, provider: e.target.value}
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Policy Number</label>
                      <input
                        type="text"
                        value={patientData.insurance.policyNumber}
                        onChange={(e) => setPatientData({
                          ...patientData,
                          insurance: {...patientData.insurance, policyNumber: e.target.value}
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Group Number</label>
                      <input
                        type="text"
                        value={patientData.insurance.groupNumber}
                        onChange={(e) => setPatientData({
                          ...patientData,
                          insurance: {...patientData.insurance, groupNumber: e.target.value}
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Card Number</label>
                      <input
                        type="text"
                        value={patientData.insurance.cardNumber}
                        onChange={(e) => setPatientData({
                          ...patientData,
                          insurance: {...patientData.insurance, cardNumber: e.target.value}
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Valid From</label>
                      <input
                        type="date"
                        value={patientData.insurance.validFrom}
                        onChange={(e) => setPatientData({
                          ...patientData,
                          insurance: {...patientData.insurance, validFrom: e.target.value}
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Valid Until</label>
                      <input
                        type="date"
                        value={patientData.insurance.validUntil}
                        onChange={(e) => setPatientData({
                          ...patientData,
                          insurance: {...patientData.insurance, validUntil: e.target.value}
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Coverage Type</label>
                      <select
                        value={patientData.insurance.coverageType}
                        onChange={(e) => setPatientData({
                          ...patientData,
                          insurance: {...patientData.insurance, coverageType: e.target.value}
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      >
                        <option value="Basic">Basic</option>
                        <option value="Comprehensive">Comprehensive</option>
                        <option value="Premium">Premium</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Coverage</label>
                      <input
                        type="number"
                        value={patientData.insurance.coveragePercent}
                        onChange={(e) => setPatientData({
                          ...patientData,
                          insurance: {...patientData.insurance, coveragePercent: parseInt(e.target.value)}
                        })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-6 border-t border-gray-100">
                    <button
                      onClick={handleSave}
                      disabled={loading}
                      className="flex items-center gap-2 px-6 py-3 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] disabled:opacity-50"
                    >
                      {loading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                  </div>
                </div>
              )}

              {activeTab === 'records' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 text-lg">Medical Records</h3>
                    <button className="flex items-center gap-2 px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f]">
                      <Upload className="w-4 h-4" /> Upload Record
                    </button>
                  </div>

                  <div className="space-y-2">
                    {patientData.medicalRecords.map((record) => (
                      <div key={record.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <FileText className="w-5 h-5 text-[#5DBB63]" />
                          <div>
                            <p className="font-medium text-gray-900">{record.title}</p>
                            <p className="text-sm text-gray-500">{record.type} · {record.date} · {record.facility}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[record.status]}`}>
                            {record.status}
                          </span>
                          <button className="p-1 hover:bg-gray-100 rounded">
                            <Download className="w-4 h-4 text-gray-500" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <h3 className="font-semibold text-gray-900 text-lg mb-4">Recent Lab Results</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Test</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Result</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Normal Range</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {patientData.labTests.map((test) => (
                            <tr key={test.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-sm text-gray-900">{test.name}</td>
                              <td className="px-4 py-3 text-sm text-gray-900 font-medium">{test.result}</td>
                              <td className="px-4 py-3 text-sm text-gray-500">{test.normal}</td>
                              <td className="px-4 py-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[test.status]}`}>
                                  {test.status}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-500">{test.date}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'appointments' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-gray-900 text-lg">Appointments</h3>
                    <button 
                      onClick={() => window.location.href = '/patient/book'}
                      className="flex items-center gap-2 px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f]"
                    >
                      <Plus className="w-4 h-4" /> Book New
                    </button>
                  </div>

                  <div className="space-y-2">
                    {patientData.appointments.map((apt) => (
                      <div key={apt.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-[#5DBB63]/10 rounded-full flex items-center justify-center">
                            <Stethoscope className="w-6 h-6 text-[#5DBB63]" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{apt.doctor}</p>
                            <p className="text-sm text-gray-500">{apt.specialty} · {apt.type}</p>
                            <p className="text-sm text-gray-500">{apt.date} at {apt.time}</p>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[apt.status]}`}>
                          {apt.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'prescriptions' && (
                <div className="space-y-6">
                  <h3 className="font-semibold text-gray-900 text-lg">Active Prescriptions</h3>

                  <div className="space-y-2">
                    {patientData.prescriptions.map((rx) => (
                      <div key={rx.id} className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                        <div className="flex items-center gap-4">
                          <Pill className="w-6 h-6 text-purple-500" />
                          <div>
                            <p className="font-medium text-gray-900">{rx.medication}</p>
                            <p className="text-sm text-gray-500">{rx.dosage} · {rx.frequency}</p>
                            <p className="text-sm text-gray-500">Prescribed: {rx.date} · {rx.prescribedBy}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[rx.status]}`}>
                            {rx.status}
                          </span>
                          <p className="text-sm text-gray-500 mt-2">{rx.refills - rx.remaining + 1} of {rx.refills} refills left</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'billing' && (
                <div className="space-y-6">
                  <h3 className="font-semibold text-gray-900 text-lg">Billing History</h3>

                  <div className="space-y-2">
                    {patientData.bills.map((bill) => (
                      <div key={bill.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{bill.description}</p>
                          <p className="text-sm text-gray-500">{bill.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900">৳{bill.amount}</p>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[bill.status]}`}>
                            {bill.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-6 border-t border-gray-100">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Total Paid (YTD)</span>
                        <span className="text-xl font-bold text-gray-900">
                          ৳{patientData.bills.reduce((sum, b) => sum + b.amount, 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}