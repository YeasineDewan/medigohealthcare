import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  FileText,
  FileSpreadsheet,
  Printer,
  Plus,
  Eye,
  Edit3,
  Trash2,
  X,
  User,
  Phone,
  Calendar,
  Activity,
  AlertTriangle,
  Clock,
  ChevronDown,
  ChevronRight,
  Stethoscope,
  TestTube,
  Pill,
  FileCheck,
  Thermometer,
  Heart,
  Brain,
  Bone,
  Droplet,
  Activity as ActivityIcon,
  PlusCircle,
  MinusCircle,
  History,
  TrendingUp,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV, printData } from '../../../utils/exportUtils';

const MedicalHistory = () => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showPatientSelect, setShowPatientSelect] = useState(false);
  const [filters, setFilters] = useState({
    type: 'all',
    dateRange: 'all',
    department: 'all'
  });

  // Mock patients data
  const mockPatients = [
    {
      id: 1,
      patientId: 'PT-2024-0001',
      firstName: 'Ahmed',
      lastName: 'Khan',
      phone: '+880 1712345678',
      dateOfBirth: '1985-03-15',
      gender: 'Male',
      bloodType: 'O+'
    },
    {
      id: 2,
      patientId: 'PT-2024-0002',
      firstName: 'Sara',
      lastName: 'Ali',
      phone: '+880 1912345678',
      dateOfBirth: '1990-07-22',
      gender: 'Female',
      bloodType: 'A+'
    },
    {
      id: 3,
      patientId: 'PT-2024-0003',
      firstName: 'Rahman',
      lastName: 'Hossain',
      phone: '+880 1612345678',
      dateOfBirth: '1978-11-08',
      gender: 'Male',
      bloodType: 'B+'
    }
  ];

  // Mock medical history data
  const mockMedicalHistory = {
    1: {
      patient: mockPatients[0],
      allergies: ['Penicillin', 'Dust', 'Pollen'],
      chronicConditions: [
        { name: 'Diabetes Type 2', diagnosedDate: '2020-05-15', status: 'active', notes: 'Managing with medication' },
        { name: 'Hypertension', diagnosedDate: '2019-08-20', status: 'active', notes: 'Blood pressure controlled' }
      ],
      currentMedications: [
        { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily', startDate: '2020-05-20' },
        { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily', startDate: '2019-08-25' }
      ],
      vitals: [
        { date: '2024-03-10', bloodPressure: '130/85', heartRate: 72, temperature: 98.6, weight: 75, height: 170, bmi: 26.0 },
        { date: '2024-02-15', bloodPressure: '128/82', heartRate: 70, temperature: 98.4, weight: 76, height: 170, bmi: 26.3 },
        { date: '2024-01-10', bloodPressure: '135/88', heartRate: 75, temperature: 98.5, weight: 77, height: 170, bmi: 26.7 }
      ],
      visits: [
        {
          id: 1,
          type: 'visit',
          title: 'Regular Checkup',
          date: '2024-03-10',
          doctor: 'Dr. Mohammad Hasan',
          department: 'General Medicine',
          chiefComplaint: 'Routine health checkup',
          diagnosis: 'Patient is stable, continuing current medications',
          prescription: [
            { medicine: 'Metformin 500mg', dosage: '1-0-1', duration: '30 days' },
            { medicine: 'Lisinopril 10mg', dosage: '1-0-0', duration: '30 days' }
          ],
          notes: 'Follow up after 3 months',
          vitals: { bloodPressure: '130/85', heartRate: 72, temperature: 98.6 }
        },
        {
          id: 2,
          type: 'lab',
          title: 'Blood Test',
          date: '2024-02-20',
          doctor: 'Dr. Fatima Ahmed',
          department: 'Pathology',
          tests: [
            { name: 'HbA1c', result: '7.2%', normal: '< 5.7%', status: 'high' },
            { name: 'Fasting Glucose', result: '142 mg/dL', normal: '70-100 mg/dL', status: 'high' },
            { name: 'Creatinine', result: '1.0 mg/dL', normal: '0.7-1.3 mg/dL', status: 'normal' }
          ],
          notes: 'Diabetes control needs improvement'
        },
        {
          id: 3,
          type: 'visit',
          title: 'Cardiology Consultation',
          date: '2024-01-15',
          doctor: 'Dr. Kamal Ahmed',
          department: 'Cardiology',
          chiefComplaint: 'Chest discomfort',
          diagnosis: 'Mild angina, ECG shows normal findings',
          prescription: [
            { medicine: 'Aspirin 75mg', dosage: '1-0-0', duration: '90 days' }
          ],
          notes: 'ECG and stress test recommended',
          vitals: { bloodPressure: '135/88', heartRate: 75, temperature: 98.5 }
        }
      ],
      surgeries: [
        {
          id: 1,
          procedure: 'Appendectomy',
          date: '2015-08-10',
          hospital: 'Dhaka Medical College',
          surgeon: 'Dr. Rashid Ahmed',
          notes: 'Laparoscopic surgery, uneventful recovery'
        }
      ],
      immunizations: [
        { name: 'COVID-19 Vaccine', date: '2023-04-15', dose: '2nd dose', provider: 'gov' },
        { name: 'Influenza', date: '2023-10-01', dose: 'Annual', provider: 'private' },
        { name: 'Tetanus', date: '2020-06-20', dose: 'Booster', provider: 'gov' }
      ]
    }
  };

  const historyTypes = [
    { value: 'all', label: 'All Types', icon: ActivityIcon },
    { value: 'visit', label: 'Visits', icon: Stethoscope },
    { value: 'lab', label: 'Lab Tests', icon: TestTube },
    { value: 'prescription', label: 'Prescriptions', icon: Pill },
    { value: 'procedure', label: 'Procedures', icon: FileCheck }
  ];

  const departments = ['All Departments', 'General Medicine', 'Cardiology', 'Neurology', 'Orthopedics', 'Pediatrics', 'Dermatology', 'Pathology'];

  useEffect(() => {
    setTimeout(() => {
      setPatients(mockPatients);
      setLoading(false);
    }, 800);
  }, []);

  const filteredPatients = patients.filter(p => 
    p.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.phone.includes(searchTerm)
  );

  const selectPatient = (patient) => {
    setSelectedPatient(mockMedicalHistory[patient.id] || {
      patient,
      allergies: [],
      chronicConditions: [],
      currentMedications: [],
      vitals: [],
      visits: [],
      surgeries: [],
      immunizations: []
    });
    setShowPatientSelect(false);
    setSearchTerm('');
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    return today.getFullYear() - birthDate.getFullYear();
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'visit': return Stethoscope;
      case 'lab': return TestTube;
      case 'prescription': return Pill;
      case 'procedure': return FileCheck;
      default: return ActivityIcon;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'low': return 'text-blue-600 bg-blue-100';
      case 'normal': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5DBB63]"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Medical History</h1>
          <p className="text-gray-500 mt-1">View and manage patient medical history</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowPatientSelect(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <User className="w-4 h-4" />
            {selectedPatient ? `${selectedPatient.patient.firstName} ${selectedPatient.patient.lastName}` : 'Select Patient'}
          </button>
          {selectedPatient && (
            <>
              <div className="relative group">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                  <button className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                    <FileText className="w-4 h-4" /> Export as PDF
                  </button>
                  <button className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                    <FileSpreadsheet className="w-4 h-4" /> Export as CSV
                  </button>
                  <button className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                    <Printer className="w-4 h-4" /> Print
                  </button>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]">
                <Plus className="w-4 h-4" />
                Add Record
              </button>
            </>
          )}
        </div>
      </div>

      {/* Patient Select Modal */}
      <AnimatePresence>
        {showPatientSelect && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl w-full max-w-2xl"
            >
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Select Patient</h2>
                <button onClick={() => setShowPatientSelect(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4">
                <div className="relative mb-4">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search patients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                  />
                </div>
                <div className="max-h-96 overflow-y-auto space-y-2">
                  {filteredPatients.map(patient => (
                    <button
                      key={patient.id}
                      onClick={() => selectPatient(patient)}
                      className="w-full flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-[#5DBB63] transition-colors text-left"
                    >
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-900">{patient.firstName} {patient.lastName}</p>
                        <p className="text-sm text-gray-500">{patient.patientId} • {patient.phone}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No Patient Selected */}
      {!selectedPatient && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Select a Patient</h3>
          <p className="text-gray-500 mb-4">Choose a patient to view their medical history</p>
          <button
            onClick={() => setShowPatientSelect(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50]"
          >
            <User className="w-4 h-4" />
            Select Patient
          </button>
        </div>
      )}

      {/* Patient Medical History View */}
      {selectedPatient && (
        <>
          {/* Patient Info Card */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <User className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {selectedPatient.patient.firstName} {selectedPatient.patient.lastName}
                  </h2>
                  <p className="text-gray-500">{selectedPatient.patient.patientId}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                    <span>{calculateAge(selectedPatient.patient.dateOfBirth)} years old</span>
                    <span>•</span>
                    <span>{selectedPatient.patient.gender}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Droplet className="w-4 h-4 text-red-500" />
                      {selectedPatient.patient.bloodType}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowPatientSelect(true)}
                className="text-[#5DBB63] hover:underline text-sm"
              >
                Change Patient
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Allergies</p>
                  <p className="text-xl font-bold text-gray-900">{selectedPatient.allergies.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Activity className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Chronic Conditions</p>
                  <p className="text-xl font-bold text-gray-900">{selectedPatient.chronicConditions.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Pill className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Current Medications</p>
                  <p className="text-xl font-bold text-gray-900">{selectedPatient.currentMedications.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Stethoscope className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Visits</p>
                  <p className="text-xl font-bold text-gray-900">{selectedPatient.visits.length}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Allergies & Conditions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Allergies */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                Allergies
              </h3>
              {selectedPatient.allergies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.allergies.map((allergy, i) => (
                    <span key={i} className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-medium">
                      {allergy}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No known allergies</p>
              )}
            </div>

            {/* Chronic Conditions */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-orange-500" />
                Chronic Conditions
              </h3>
              {selectedPatient.chronicConditions.length > 0 ? (
                <div className="space-y-3">
                  {selectedPatient.chronicConditions.map((condition, i) => (
                    <div key={i} className="flex items-start justify-between p-3 bg-orange-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{condition.name}</p>
                        <p className="text-sm text-gray-500">Diagnosed: {condition.diagnosedDate}</p>
                      </div>
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">Active</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-sm">No chronic conditions</p>
              )}
            </div>
          </div>

          {/* Current Medications */}
          {selectedPatient.currentMedications.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Pill className="w-5 h-5 text-blue-500" />
                Current Medications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedPatient.currentMedications.map((med, i) => (
                  <div key={i} className="p-4 bg-blue-50 rounded-lg">
                    <p className="font-medium text-gray-900">{med.name}</p>
                    <p className="text-sm text-gray-600">{med.dosage}</p>
                    <p className="text-sm text-gray-500">{med.frequency}</p>
                    <p className="text-xs text-gray-400 mt-1">Since: {med.startDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Latest Vitals */}
          {selectedPatient.vitals.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Thermometer className="w-5 h-5 text-green-500" />
                Latest Vitals
                <span className="text-sm font-normal text-gray-500 ml-2">
                  ({selectedPatient.vitals[0].date})
                </span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <Heart className="w-6 h-6 text-red-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Blood Pressure</p>
                  <p className="text-lg font-bold text-gray-900">{selectedPatient.vitals[0].bloodPressure}</p>
                  <p className="text-xs text-gray-500">mmHg</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <ActivityIcon className="w-6 h-6 text-pink-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Heart Rate</p>
                  <p className="text-lg font-bold text-gray-900">{selectedPatient.vitals[0].heartRate}</p>
                  <p className="text-xs text-gray-500">bpm</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <Thermometer className="w-6 h-6 text-orange-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Temperature</p>
                  <p className="text-lg font-bold text-gray-900">{selectedPatient.vitals[0].temperature}°F</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <TrendingUp className="w-6 h-6 text-blue-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Weight</p>
                  <p className="text-lg font-bold text-gray-900">{selectedPatient.vitals[0].weight}</p>
                  <p className="text-xs text-gray-500">kg</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <TrendingUp className="w-6 h-6 text-purple-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">Height</p>
                  <p className="text-lg font-bold text-gray-900">{selectedPatient.vitals[0].height}</p>
                  <p className="text-xs text-gray-500">cm</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg text-center">
                  <ActivityIcon className="w-6 h-6 text-green-500 mx-auto mb-2" />
                  <p className="text-sm text-gray-600">BMI</p>
                  <p className="text-lg font-bold text-gray-900">{selectedPatient.vitals[0].bmi}</p>
                </div>
              </div>
            </div>
          )}

          {/* Medical History Timeline */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <History className="w-5 h-5 text-[#5DBB63]" />
              Medical History Timeline
            </h3>
            
            {/* Filter */}
            <div className="flex flex-wrap gap-2 mb-6">
              {historyTypes.map(type => (
                <button
                  key={type.value}
                  onClick={() => setFilters({ ...filters, type: type.value })}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filters.type === type.value
                      ? 'bg-[#5DBB63] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <type.icon className="w-4 h-4" />
                  {type.label}
                </button>
              ))}
            </div>

            {/* Timeline */}
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

              <div className="space-y-6">
                {selectedPatient.visits
                  .filter(v => filters.type === 'all' || v.type === filters.type)
                  .map((visit, index) => {
                    const TypeIcon = getTypeIcon(visit.type);
                    return (
                      <motion.div
                        key={visit.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative flex gap-4"
                      >
                        {/* Timeline dot */}
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${
                          visit.type === 'visit' ? 'bg-blue-100' :
                          visit.type === 'lab' ? 'bg-purple-100' :
                          'bg-green-100'
                        }`}>
                          <TypeIcon className={`w-6 h-6 ${
                            visit.type === 'visit' ? 'text-blue-600' :
                            visit.type === 'lab' ? 'text-purple-600' :
                            'text-green-600'
                          }`} />
                        </div>

                        {/* Content */}
                        <div className="flex-1 bg-gray-50 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="font-semibold text-gray-900">{visit.title}</h4>
                              <p className="text-sm text-gray-500">
                                {visit.doctor} • {visit.department}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <Calendar className="w-4 h-4" />
                              {visit.date}
                            </div>
                          </div>

                          {visit.chiefComplaint && (
                            <div className="mb-2">
                              <p className="text-sm"><span className="font-medium">Chief Complaint:</span> {visit.chiefComplaint}</p>
                            </div>
                          )}

                          {visit.diagnosis && (
                            <div className="mb-2">
                              <p className="text-sm"><span className="font-medium">Diagnosis:</span> {visit.diagnosis}</p>
                            </div>
                          )}

                          {/* Lab Results */}
                          {visit.tests && (
                            <div className="mt-3">
                              <p className="text-sm font-medium mb-2">Test Results:</p>
                              <div className="space-y-2">
                                {visit.tests.map((test, i) => (
                                  <div key={i} className="flex items-center justify-between bg-white p-2 rounded">
                                    <span className="text-sm text-gray-600">{test.name}</span>
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium">{test.result}</span>
                                      <span className={`px-2 py-0.5 rounded text-xs ${getStatusColor(test.status)}`}>
                                        {test.status}
                                      </span>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Prescription */}
                          {visit.prescription && visit.prescription.length > 0 && (
                            <div className="mt-3">
                              <p className="text-sm font-medium mb-2">Prescription:</p>
                              <div className="flex flex-wrap gap-2">
                                {visit.prescription.map((med, i) => (
                                  <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                    {med.medicine}
                                  </span>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Vitals */}
                          {visit.vitals && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <p className="text-sm font-medium mb-1">Vitals:</p>
                              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <span>BP: {visit.vitals.bloodPressure}</span>
                                <span>HR: {visit.vitals.heartRate} bpm</span>
                                <span>Temp: {visit.vitals.temperature}°F</span>
                              </div>
                            </div>
                          )}

                          {visit.notes && (
                            <div className="mt-3 pt-3 border-t border-gray-200">
                              <p className="text-sm text-gray-600"><span className="font-medium">Notes:</span> {visit.notes}</p>
                            </div>
                          )}
                        </div>
                      </motion.div>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* Surgeries */}
          {selectedPatient.surgeries && selectedPatient.surgeries.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-red-500" />
                Surgical History
              </h3>
              <div className="space-y-3">
                {selectedPatient.surgeries.map((surgery, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{surgery.procedure}</p>
                      <p className="text-sm text-gray-500">{surgery.hospital} • {surgery.surgeon}</p>
                    </div>
                    <span className="text-sm text-gray-500">{surgery.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Immunizations */}
          {selectedPatient.immunizations && selectedPatient.immunizations.length > 0 && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Immunization Records
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedPatient.immunizations.map((imm, i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-900">{imm.name}</p>
                      <p className="text-sm text-gray-500">{imm.dose}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{imm.date}</p>
                      <p className="text-xs text-gray-500">{imm.provider}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MedicalHistory;

