import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Search,
  Filter,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Download,
  Upload,
  Calendar,
  Clock,
  User,
  Stethoscope,
  Heart,
  Brain,
  Thermometer,
  Weight,
  Activity,
  TrendingUp,
  TrendingDown,
  AlertCircle,
  CheckCircle,
  X,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Settings,
  Bell,
  Shield,
  Zap,
  Target,
  Award,
  Star,
  MessageSquare,
  Phone,
  Mail,
  Video,
  MapPin,
  FileDown,
  FileUp,
  Archive,
  Share2,
  Printer,
  Save,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react';

const MedicalRecordsManager = () => {
  const [loading, setLoading] = useState(true);
  const [records, setRecords] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPatient, setFilterPatient] = useState('all');
  const [filterDoctor, setFilterDoctor] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedRecord, setExpandedRecord] = useState(null);

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    visitDate: '',
    diagnosis: '',
    treatment: '',
    symptoms: '',
    notes: '',
    vitalSigns: {
      bloodPressure: '',
      heartRate: '',
      temperature: '',
      respiratoryRate: '',
      oxygenSaturation: '',
      weight: '',
      height: '',
      bmi: ''
    },
    prescriptions: [],
    labResults: [],
    followUpDate: '',
    status: 'active'
  });

  const vitalSignsConfig = [
    { key: 'bloodPressure', label: 'Blood Pressure', icon: Heart, unit: 'mmHg', normal: '120/80' },
    { key: 'heartRate', label: 'Heart Rate', icon: Activity, unit: 'bpm', normal: '60-100' },
    { key: 'temperature', label: 'Temperature', icon: Thermometer, unit: 'F', normal: '97-99' },
    { key: 'respiratoryRate', label: 'Respiratory Rate', icon: Activity, unit: 'breaths/min', normal: '12-20' },
    { key: 'oxygenSaturation', label: 'Oxygen Saturation', icon: Activity, unit: '%', normal: '95-100' },
    { key: 'weight', label: 'Weight', icon: Weight, unit: 'lbs', normal: 'Varies' },
    { key: 'height', label: 'Height', icon: Activity, unit: 'in', normal: 'Varies' },
    { key: 'bmi', label: 'BMI', icon: Target, unit: '', normal: '18.5-24.9' }
  ];

  useEffect(() => {
    fetchRecords();
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      // Mock data
      setTimeout(() => {
        setRecords([
          {
            id: 1,
            recordNumber: 'MR20240401001',
            patientId: 1,
            patientName: 'John Doe',
            patientAge: 34,
            patientGender: 'Male',
            doctorId: 1,
            doctorName: 'Dr. Sarah Johnson',
            doctorSpecialization: 'Cardiology',
            visitDate: '2024-04-01',
            diagnosis: 'Hypertension Stage 1',
            treatment: 'Lifestyle modifications and medication',
            symptoms: 'Occasional headaches, elevated blood pressure readings',
            notes: 'Patient reports stress at work, family history of hypertension',
            vitalSigns: {
              bloodPressure: '140/90',
              heartRate: '85',
              temperature: '98.6',
              respiratoryRate: '16',
              oxygenSaturation: '98',
              weight: '180',
              height: '72',
              bmi: '24.4'
            },
            prescriptions: [
              {
                medication: 'Lisinopril',
                dosage: '10mg',
                frequency: 'Once daily',
                duration: '30 days',
                instructions: 'Take with food'
              }
            ],
            labResults: [
              {
                testName: 'Complete Blood Count',
                result: 'Normal',
                date: '2024-04-01',
                criticalValues: []
              },
              {
                testName: 'Lipid Panel',
                result: 'Borderline High',
                date: '2024-04-01',
                criticalValues: ['LDL Cholesterol']
              }
            ],
            followUpDate: '2024-05-01',
            status: 'active',
            createdAt: '2024-04-01T10:00:00Z',
            updatedAt: '2024-04-01T10:00:00Z'
          },
          {
            id: 2,
            recordNumber: 'MR20240328001',
            patientId: 2,
            patientName: 'Emily Davis',
            patientAge: 28,
            patientGender: 'Female',
            doctorId: 2,
            doctorName: 'Dr. Michael Chen',
            doctorSpecialization: 'Neurology',
            visitDate: '2024-03-28',
            diagnosis: 'Migraine with Aura',
            treatment: 'Preventive medication and lifestyle changes',
            symptoms: 'Severe headaches with visual disturbances, nausea, sensitivity to light',
            notes: 'Triggers include stress, lack of sleep, certain foods',
            vitalSigns: {
              bloodPressure: '120/80',
              heartRate: '72',
              temperature: '98.2',
              respiratoryRate: '14',
              oxygenSaturation: '99',
              weight: '145',
              height: '65',
              bmi: '24.1'
            },
            prescriptions: [
              {
                medication: 'Sumatriptan',
                dosage: '100mg',
                frequency: 'As needed',
                duration: 'PRN',
                instructions: 'Take at onset of migraine symptoms'
              },
              {
                medication: 'Propranolol',
                dosage: '40mg',
                frequency: 'Twice daily',
                duration: '90 days',
                instructions: 'For migraine prevention'
              }
            ],
            labResults: [
              {
                testName: 'MRI Brain',
                result: 'Normal',
                date: '2024-03-28',
                criticalValues: []
              }
            ],
            followUpDate: '2024-04-28',
            status: 'active',
            createdAt: '2024-03-28T14:30:00Z',
            updatedAt: '2024-03-28T14:30:00Z'
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching records:', error);
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      setPatients([
        { id: 1, name: 'John Doe', age: 34, gender: 'Male', bloodType: 'A+' },
        { id: 2, name: 'Emily Davis', age: 28, gender: 'Female', bloodType: 'B+' },
        { id: 3, name: 'Robert Johnson', age: 45, gender: 'Male', bloodType: 'O+' }
      ]);
    } catch (error) {
      console.error('Error fetching patients:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      setDoctors([
        { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Cardiology' },
        { id: 2, name: 'Dr. Michael Chen', specialization: 'Neurology' },
        { id: 3, name: 'Dr. Robert Williams', specialization: 'Orthopedics' }
      ]);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const handleCreateRecord = async () => {
    try {
      console.log('Creating medical record:', formData);
      setShowCreateModal(false);
      fetchRecords();
    } catch (error) {
      console.error('Error creating record:', error);
    }
  };

  const handleUpdateRecord = async (id, updates) => {
    try {
      console.log('Updating medical record:', id, updates);
      fetchRecords();
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const handleDeleteRecord = async (id) => {
    try {
      console.log('Deleting medical record:', id);
      fetchRecords();
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = record.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.diagnosis.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         record.treatment.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPatient = filterPatient === 'all' || record.patientId.toString() === filterPatient;
    const matchesDoctor = filterDoctor === 'all' || record.doctorId.toString() === filterDoctor;
    return matchesSearch && matchesPatient && matchesDoctor;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.visitDate) - new Date(a.visitDate);
      case 'patient':
        return a.patientName.localeCompare(b.patientName);
      case 'doctor':
        return a.doctorName.localeCompare(b.doctorName);
      case 'diagnosis':
        return a.diagnosis.localeCompare(b.diagnosis);
      default:
        return 0;
    }
  });

  const RecordCard = ({ record }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FileText className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{record.recordNumber}</h4>
            <p className="text-sm text-gray-600">{record.patientName}, {record.patientAge}y</p>
            <p className="text-xs text-gray-500">{record.doctorName} • {record.doctorSpecialization}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">
            {record.status}
          </span>
          <div className="flex items-center space-x-1">
            <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
              <Eye className="w-4 h-4" />
            </button>
            <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
              <Edit3 className="w-4 h-4" />
            </button>
            <button className="p-1 text-red-600 hover:bg-red-50 rounded">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-gray-600">Visit Date:</span>
            <span className="font-medium ml-2">{record.visitDate}</span>
          </div>
          <div>
            <span className="text-gray-600">Follow-up:</span>
            <span className="font-medium ml-2">{record.followUpDate || 'Not scheduled'}</span>
          </div>
        </div>

        <div>
          <span className="text-gray-600 text-sm">Diagnosis:</span>
          <p className="font-medium text-sm mt-1">{record.diagnosis}</p>
        </div>

        <div>
          <span className="text-gray-600 text-sm">Treatment:</span>
          <p className="font-medium text-sm mt-1">{record.treatment}</p>
        </div>

        <div>
          <span className="text-gray-600 text-sm">Symptoms:</span>
          <p className="text-sm mt-1 text-gray-700">{record.symptoms}</p>
        </div>

        {/* Vital Signs */}
        <div className="border-t pt-3">
          <span className="text-gray-600 text-sm">Vital Signs:</span>
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="flex items-center space-x-2">
              <Heart className="w-3 h-3 text-red-500" />
              <span className="text-xs">BP: {record.vitalSigns.bloodPressure}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="w-3 h-3 text-blue-500" />
              <span className="text-xs">HR: {record.vitalSigns.heartRate}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Thermometer className="w-3 h-3 text-orange-500" />
              <span className="text-xs">Temp: {record.vitalSigns.temperature}°F</span>
            </div>
            <div className="flex items-center space-x-2">
              <Target className="w-3 h-3 text-green-500" />
              <span className="text-xs">BMI: {record.vitalSigns.bmi}</span>
            </div>
          </div>
        </div>

        {/* Prescriptions */}
        {record.prescriptions.length > 0 && (
          <div className="border-t pt-3">
            <span className="text-gray-600 text-sm">Prescriptions:</span>
            <div className="space-y-1 mt-2">
              {record.prescriptions.slice(0, 2).map((prescription, index) => (
                <div key={index} className="text-xs bg-gray-50 p-2 rounded">
                  <span className="font-medium">{prescription.medication}</span>
                  <span className="text-gray-600 ml-2">{prescription.dosage} • {prescription.frequency}</span>
                </div>
              ))}
              {record.prescriptions.length > 2 && (
                <p className="text-xs text-gray-500">+{record.prescriptions.length - 2} more</p>
              )}
            </div>
          </div>
        )}

        {/* Lab Results */}
        {record.labResults.length > 0 && (
          <div className="border-t pt-3">
            <span className="text-gray-600 text-sm">Lab Results:</span>
            <div className="space-y-1 mt-2">
              {record.labResults.slice(0, 2).map((result, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <span className="font-medium">{result.testName}</span>
                  <span className={`px-2 py-1 rounded ${
                    result.result === 'Normal' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {result.result}
                  </span>
                </div>
              ))}
              {record.labResults.length > 2 && (
                <p className="text-xs text-gray-500">+{record.labResults.length - 2} more</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t">
        <div className="flex items-center space-x-2">
          <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
            <Download className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-1 text-gray-600 hover:bg-gray-50 rounded">
            <Printer className="w-4 h-4" />
          </button>
        </div>
        <button
          onClick={() => setExpandedRecord(expandedRecord === record.id ? null : record.id)}
          className="text-sm text-blue-600 hover:text-blue-800"
        >
          {expandedRecord === record.id ? 'Show Less' : 'Show More'}
        </button>
      </div>
    </motion.div>
  );

  const CreateRecordModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Create Medical Record</h2>
            <button
              onClick={() => setShowCreateModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Patient and Doctor Selection */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
              <select
                value={formData.patientId}
                onChange={(e) => setFormData(prev => ({ ...prev, patientId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Patient</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>
                    {patient.name} ({patient.age}y, {patient.gender})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
              <select
                value={formData.doctorId}
                onChange={(e) => setFormData(prev => ({ ...prev, doctorId: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select Doctor</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name} - {doctor.specialization}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Visit Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Visit Date</label>
              <input
                type="date"
                value={formData.visitDate}
                onChange={(e) => setFormData(prev => ({ ...prev, visitDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Date</label>
              <input
                type="date"
                value={formData.followUpDate}
                onChange={(e) => setFormData(prev => ({ ...prev, followUpDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Medical Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Diagnosis</label>
              <input
                type="text"
                value={formData.diagnosis}
                onChange={(e) => setFormData(prev => ({ ...prev, diagnosis: e.target.value }))}
                placeholder="Enter diagnosis"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Treatment</label>
              <textarea
                value={formData.treatment}
                onChange={(e) => setFormData(prev => ({ ...prev, treatment: e.target.value }))}
                placeholder="Enter treatment plan"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Symptoms</label>
              <textarea
                value={formData.symptoms}
                onChange={(e) => setFormData(prev => ({ ...prev, symptoms: e.target.value }))}
                placeholder="Enter symptoms"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="Enter additional notes"
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Vital Signs */}
          <div>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Vital Signs</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {vitalSignsConfig.map((vital) => (
                <div key={vital.key}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {vital.label} ({vital.unit})
                  </label>
                  <input
                    type="text"
                    value={formData.vitalSigns[vital.key]}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      vitalSigns: {
                        ...prev.vitalSigns,
                        [vital.key]: e.target.value
                      }
                    }))}
                    placeholder={vital.normal}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => setShowCreateModal(false)}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateRecord}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Record
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Medical Records</h2>
          <p className="text-gray-600">Manage patient medical records and history</p>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
              showFilters ? 'bg-blue-100 text-blue-700' : 'bg-white border border-gray-300 text-gray-700'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Record</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-4"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search records..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Patient</label>
              <select
                value={filterPatient}
                onChange={(e) => setFilterPatient(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Patients</option>
                {patients.map(patient => (
                  <option key={patient.id} value={patient.id}>{patient.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
              <select
                value={filterDoctor}
                onChange={(e) => setFilterDoctor(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Doctors</option>
                {doctors.map(doctor => (
                  <option key={doctor.id} value={doctor.id}>{doctor.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Date</option>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="diagnosis">Diagnosis</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Records Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredRecords.map(record => (
          <RecordCard key={record.id} record={record} />
        ))}
      </div>

      {/* Create Record Modal */}
      {showCreateModal && <CreateRecordModal />}
    </div>
  );
};

export default MedicalRecordsManager;
