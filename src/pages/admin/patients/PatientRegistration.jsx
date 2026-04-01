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
  Save,
  User,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
  AlertTriangle,
  Activity,
  Droplet,
  Clock,
  UserPlus,
  ChevronDown,
  ChevronRight,
  CheckCircle,
  Upload,
  Image,
  AlertCircle,
  Building,
  Contact
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV, printData } from '../../../utils/exportUtils';

const PatientRegistration = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [editingPatient, setEditingPatient] = useState(null);
  const [filters, setFilters] = useState({
    gender: 'all',
    bloodType: 'all',
    status: 'all',
    registrationDate: 'all'
  });

  // Mock data
  const mockPatients = [
    {
      id: 1,
      patientId: 'PT-2024-0001',
      firstName: 'Ahmed',
      lastName: 'Khan',
      email: 'ahmed.khan@email.com',
      phone: '+880 1712345678',
      dateOfBirth: '1985-03-15',
      gender: 'Male',
      bloodType: 'O+',
      address: '123 Dhaka Street, Dhaka',
      city: 'Dhaka',
      emergencyContact: {
        name: 'Fatema Khan',
        phone: '+880 1812345678',
        relation: 'Wife'
      },
      allergies: ['Penicillin', 'Dust'],
      chronicConditions: ['Diabetes Type 2'],
      insurance: {
        provider: 'Green Life Insurance',
        policyNumber: 'GLI-2024-001',
        expiry: '2025-12-31'
      },
      registrationDate: '2024-01-15',
      status: 'active',
      photo: null
    },
    {
      id: 2,
      patientId: 'PT-2024-0002',
      firstName: 'Sara',
      lastName: 'Ali',
      email: 'sara.ali@email.com',
      phone: '+880 1912345678',
      dateOfBirth: '1990-07-22',
      gender: 'Female',
      bloodType: 'A+',
      address: '456 Chittagong Road, Chittagong',
      city: 'Chittagong',
      emergencyContact: {
        name: 'Mohammad Ali',
        phone: '+880 1512345678',
        relation: 'Father'
      },
      allergies: [],
      chronicConditions: [],
      insurance: {
        provider: 'MetLife Insurance',
        policyNumber: 'MLI-2024-002',
        expiry: '2025-06-30'
      },
      registrationDate: '2024-02-10',
      status: 'active',
      photo: null
    },
    {
      id: 3,
      patientId: 'PT-2024-0003',
      firstName: 'Rahman',
      lastName: 'Hossain',
      email: 'rahman.h@email.com',
      phone: '+880 1612345678',
      dateOfBirth: '1978-11-08',
      gender: 'Male',
      bloodType: 'B+',
      address: '789 Sylhet Avenue, Sylhet',
      city: 'Sylhet',
      emergencyContact: {
        name: 'Ayesha Rahman',
        phone: '+880 1712345679',
        relation: 'Sister'
      },
      allergies: ['Aspirin'],
      chronicConditions: ['Hypertension', 'Heart Disease'],
      insurance: null,
      registrationDate: '2024-02-20',
      status: 'active',
      photo: null
    },
    {
      id: 4,
      patientId: 'PT-2024-0004',
      firstName: 'Fatema',
      lastName: 'Begum',
      email: 'fatema.begum@email.com',
      phone: '+880 1512345678',
      dateOfBirth: '1995-05-30',
      gender: 'Female',
      bloodType: 'AB+',
      address: '321 Khulna Lane, Khulna',
      city: 'Khulna',
      emergencyContact: {
        name: 'Hossain Ahmed',
        phone: '+880 1812345679',
        relation: 'Brother'
      },
      allergies: [],
      chronicConditions: [],
      insurance: {
        provider: 'Prime Insurance',
        policyNumber: 'PRI-2024-003',
        expiry: '2025-09-30'
      },
      registrationDate: '2024-03-01',
      status: 'active',
      photo: null
    },
    {
      id: 5,
      patientId: 'PT-2024-0005',
      firstName: 'Mohammad',
      lastName: 'Yusuf',
      email: 'm.yusuf@email.com',
      phone: '+880 1812345679',
      dateOfBirth: '1982-09-12',
      gender: 'Male',
      bloodType: 'A-',
      address: '654 Rajshahi Court, Rajshahi',
      city: 'Rajshahi',
      emergencyContact: {
        name: 'Zohra Yusuf',
        phone: '+880 1912345679',
        relation: 'Mother'
      },
      allergies: ['Sulfa drugs', 'Latex'],
      chronicConditions: ['Asthma'],
      insurance: null,
      registrationDate: '2024-03-10',
      status: 'inactive',
      photo: null
    }
  ];

  const bloodTypes = ['All', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const genders = ['All', 'Male', 'Female', 'Other'];
  const cities = ['All', 'Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi', 'Barisal', 'Rangpur'];

  useEffect(() => {
    setTimeout(() => {
      setPatients(mockPatients);
      setLoading(false);
    }, 800);
  }, []);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = 
      patient.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGender = filters.gender === 'all' || patient.gender === filters.gender;
    const matchesBloodType = filters.bloodType === 'all' || patient.bloodType === filters.bloodType;
    const matchesStatus = filters.status === 'all' || patient.status === filters.status;
    
    return matchesSearch && matchesGender && matchesBloodType && matchesStatus;
  });

  const handleExport = (format) => {
    const columns = [
      { key: 'patientId', label: 'Patient ID' },
      { key: 'firstName', label: 'First Name' },
      { key: 'lastName', label: 'Last Name' },
      { key: 'gender', label: 'Gender' },
      { key: 'bloodType', label: 'Blood Type' },
      { key: 'phone', label: 'Phone' },
      { key: 'email', label: 'Email' },
      { key: 'city', label: 'City' },
      { key: 'registrationDate', label: 'Registration Date' },
      { key: 'status', label: 'Status' }
    ];
    
    const data = filteredPatients.map(p => ({
      ...p,
      name: `${p.firstName} ${p.lastName}`
    }));

    switch (format) {
      case 'pdf':
        exportToPDF(data, 'Patient Registration Report', columns);
        break;
      case 'word':
        exportToWord(data, 'Patient Registration Report', columns);
        break;
      case 'csv':
        exportToCSV(data, 'patient-registration');
        break;
      case 'print':
        printData(data, 'Patient Registration Report');
        break;
      default:
        break;
    }
  };

  const handleAddPatient = () => {
    setEditingPatient(null);
    setShowAddModal(true);
  };

  const handleEditPatient = (patient) => {
    setEditingPatient(patient);
    setShowAddModal(true);
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    setShowViewModal(true);
  };

  const handleDeletePatient = (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient record?')) {
      setPatients(patients.filter(p => p.id !== patientId));
    }
  };

  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const generatePatientId = () => {
    const year = new Date().getFullYear();
    const count = patients.length + 1;
    return `PT-${year}-${String(count).padStart(4, '0')}`;
  };

  // Statistics
  const totalPatients = patients.length;
  const activePatients = patients.filter(p => p.status === 'active').length;
  const newPatientsThisMonth = patients.filter(p => {
    const regDate = new Date(p.registrationDate);
    const now = new Date();
    return regDate.getMonth() === now.getMonth() && regDate.getFullYear() === now.getFullYear();
  }).length;
  const criticalPatients = patients.filter(p => p.allergies.length > 0 || p.chronicConditions.length > 0).length;

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
          <h1 className="text-3xl font-bold text-gray-900">Patient Registration</h1>
          <p className="text-gray-500 mt-1">Register and manage patient records</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-4 h-4" />
              Export
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
              <button onClick={() => handleExport('pdf')} className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                <FileText className="w-4 h-4" /> Export as PDF
              </button>
              <button onClick={() => handleExport('word')} className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                <FileText className="w-4 h-4" /> Export as Word
              </button>
              <button onClick={() => handleExport('csv')} className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                <FileSpreadsheet className="w-4 h-4" /> Export as CSV
              </button>
              <button onClick={() => handleExport('print')} className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-gray-50">
                <Printer className="w-4 h-4" /> Print
              </button>
            </div>
          </div>
          <button
            onClick={handleAddPatient}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
          >
            <Plus className="w-4 h-4" />
            Register Patient
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">{totalPatients}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <User className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Active Patients</p>
              <p className="text-2xl font-bold text-green-600">{activePatients}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">New This Month</p>
              <p className="text-2xl font-bold text-purple-600">{newPatientsThisMonth}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <UserPlus className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical Cases</p>
              <p className="text-2xl font-bold text-orange-600">{criticalPatients}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-xl border border-gray-200 p-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                <select
                  value={filters.gender}
                  onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  {genders.map(g => (
                    <option key={g} value={g.toLowerCase()}>{g}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                <select
                  value={filters.bloodType}
                  onChange={(e) => setFilters({ ...filters, bloodType: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  {bloodTypes.map(bt => (
                    <option key={bt} value={bt}>{bt}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <select
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  {cities.map(c => (
                    <option key={c} value={c.toLowerCase()}>{c}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search Bar */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search patients by name, ID, phone, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          />
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient ID</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Gender</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Blood Type</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">City</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Registered</th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPatients.map((patient, index) => (
                <motion.tr
                  key={patient.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                        {patient.photo ? (
                          <img src={patient.photo} alt={patient.firstName} className="w-full h-full object-cover rounded-full" />
                        ) : (
                          <User className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{patient.firstName} {patient.lastName}</p>
                        <p className="text-sm text-gray-500">{calculateAge(patient.dateOfBirth)} years old</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-mono text-sm text-gray-600">{patient.patientId}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="text-gray-900">{patient.phone}</p>
                      <p className="text-gray-500">{patient.email}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{patient.gender}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      <Droplet className="w-3 h-3 mr-1" />
                      {patient.bloodType}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">{patient.city}</td>
                  <td className="px-6 py-4 text-sm text-gray-500">{patient.registrationDate}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleViewPatient(patient)}
                        className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleEditPatient(patient)}
                        className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeletePatient(patient.id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add/Edit Patient Modal */}
      <AnimatePresence>
        {showAddModal && (
          <PatientModal
            patient={editingPatient}
            onSave={(patientData) => {
              if (editingPatient) {
                setPatients(patients.map(p => p.id === editingPatient.id ? { ...p, ...patientData } : p));
              } else {
                const newPatient = {
                  id: Math.max(...patients.map(p => p.id)) + 1,
                  patientId: generatePatientId(),
                  ...patientData,
                  registrationDate: new Date().toISOString().split('T')[0],
                  status: 'active'
                };
                setPatients([...patients, newPatient]);
              }
              setShowAddModal(false);
              setEditingPatient(null);
            }}
            onClose={() => {
              setShowAddModal(false);
              setEditingPatient(null);
            }}
          />
        )}
      </AnimatePresence>

      {/* View Patient Modal */}
      <AnimatePresence>
        {showViewModal && selectedPatient && (
          <ViewPatientModal
            patient={selectedPatient}
            onClose={() => {
              setShowViewModal(false);
              setSelectedPatient(null);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Patient Modal Component
const PatientModal = ({ patient, onSave, onClose }) => {
  const [step, setStep] = useState(1);
  const totalSteps = 4;
  
  const [formData, setFormData] = useState({
    firstName: patient?.firstName || '',
    lastName: patient?.lastName || '',
    email: patient?.email || '',
    phone: patient?.phone || '',
    dateOfBirth: patient?.dateOfBirth || '',
    gender: patient?.gender || 'Male',
    bloodType: patient?.bloodType || 'O+',
    address: patient?.address || '',
    city: patient?.city || 'Dhaka',
    country: patient?.country || 'Bangladesh',
    emergencyContact: {
      name: patient?.emergencyContact?.name || '',
      phone: patient?.emergencyContact?.phone || '',
      relation: patient?.emergencyContact?.relation || ''
    },
    allergies: patient?.allergies?.join(', ') || '',
    chronicConditions: patient?.chronicConditions?.join(', ') || '',
    currentMedications: patient?.currentMedications?.join(', ') || '',
    insurance: {
      provider: patient?.insurance?.provider || '',
      policyNumber: patient?.insurance?.policyNumber || '',
      expiry: patient?.insurance?.expiry || ''
    },
    notes: patient?.notes || '',
    photo: patient?.photo || null
  });

  const [imagePreview, setImagePreview] = useState(formData.photo);

  const handleSubmit = (e) => {
    e.preventDefault();
    const processedData = {
      ...formData,
      allergies: formData.allergies ? formData.allergies.split(',').map(a => a.trim()).filter(Boolean) : [],
      chronicConditions: formData.chronicConditions ? formData.chronicConditions.split(',').map(c => c.trim()).filter(Boolean) : [],
      currentMedications: formData.currentMedications ? formData.currentMedications.split(',').map(m => m.trim()).filter(Boolean) : [],
      insurance: formData.insurance.provider ? formData.insurance : null
    };
    onSave(processedData);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, photo: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const genders = ['Male', 'Female', 'Other'];
  const relations = ['Father', 'Mother', 'Spouse', 'Sibling', 'Child', 'Friend', 'Other'];
  const cities = ['Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi', 'Barisal', 'Rangpur', 'Other'];

  const steps = [
    { number: 1, title: 'Personal Info', icon: User },
    { number: 2, title: 'Contact', icon: Phone },
    { number: 3, title: 'Medical', icon: Activity },
    { number: 4, title: 'Insurance', icon: Shield }
  ];

  return (
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
        className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        {/* Header with Progress */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {patient ? 'Edit Patient' : 'Register New Patient'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((s, index) => (
              <div key={s.number} className="flex items-center">
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= s.number ? 'bg-[#5DBB63] text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${step >= s.number ? 'text-gray-900' : 'text-gray-500'}`}>
                    {s.title}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 sm:w-24 h-1 mx-2 ${step > s.number ? 'bg-[#5DBB63]' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                <div>
                </div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
                  <select
                    value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  >
                    {genders.map(g => (
                      <option key={g} value={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type *</label>
                  <select
                    value={formData.bloodType}
                    onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  >
                    {bloodTypes.map(bt => (
                      <option key={bt} value={bt}>{bt}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Photo</label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="flex items-center justify-center w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
                      >
                        <Upload className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm text-gray-600">Upload Photo</span>
                      </label>
                    </div>
                    <div className="w-16 h-16 rounded-lg border-2 border-gray-200 overflow-hidden bg-gray-50">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <User className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Contact Information */}
          {step === 2 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    placeholder="+880 1XXXXXXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Address *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    placeholder="Street address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">City *</label>
                  <select
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  >
                    {cities.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                  <input
                    type="text"
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
              </div>

              {/* Emergency Contact */}
              <h4 className="text-md font-semibold text-gray-900 mt-6 mb-4">Emergency Contact</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                  <input
                    type="text"
                    value={formData.emergencyContact.name}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      emergencyContact: { ...formData.emergencyContact, name: e.target.value } 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    value={formData.emergencyContact.phone}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      emergencyContact: { ...formData.emergencyContact, phone: e.target.value } 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Relationship</label>
                  <select
                    value={formData.emergencyContact.relation}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      emergencyContact: { ...formData.emergencyContact, relation: e.target.value } 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  >
                    <option value="">Select</option>
                    {relations.map(r => (
                      <option key={r} value={r}>{r}</option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 3: Medical Information */}
          {step === 3 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Allergies
                    <span className="text-gray-500 font-normal ml-1">(comma separated)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.allergies}
                    onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    placeholder="e.g., Penicillin, Dust, Pollen"
                  />
                  {formData.allergies && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.allergies.split(',').filter(Boolean).map((allergy, i) => (
                        <span key={i} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                          {allergy.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Chronic Conditions
                    <span className="text-gray-500 font-normal ml-1">(comma separated)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.chronicConditions}
                    onChange={(e) => setFormData({ ...formData, chronicConditions: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    placeholder="e.g., Diabetes, Hypertension"
                  />
                  {formData.chronicConditions && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.chronicConditions.split(',').filter(Boolean).map((condition, i) => (
                        <span key={i} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                          {condition.trim()}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Medications
                    <span className="text-gray-500 font-normal ml-1">(comma separated)</span>
                  </label>
                  <textarea
                    value={formData.currentMedications}
                    onChange={(e) => setFormData({ ...formData, currentMedications: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    placeholder="List current medications..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    placeholder="Additional notes..."
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Insurance Information */}
          {step === 4 && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Insurance Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Provider</label>
                  <input
                    type="text"
                    value={formData.insurance.provider}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      insurance: { ...formData.insurance, provider: e.target.value } 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    placeholder="e.g., Green Life Insurance"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Policy Number</label>
                  <input
                    type="text"
                    value={formData.insurance.policyNumber}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      insurance: { ...formData.insurance, policyNumber: e.target.value } 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    placeholder="Policy number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="date"
                    value={formData.insurance.expiry}
                    onChange={(e) => setFormData({ 
                      ...formData, 
                      insurance: { ...formData.insurance, expiry: e.target.value } 
                    })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              disabled={step === 1}
              className={`px-6 py-2 border rounded-lg transition-colors ${
                step === 1 
                  ? 'border-gray-200 text-gray-300 cursor-not-allowed' 
                  : 'border-gray-300 hover:bg-gray-50'
              }`}
            >
              Previous
            </button>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              {step < totalSteps ? (
                <button
                  type="button"
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] transition-colors"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-6 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] transition-colors"
                >
                  <Save className="w-4 h-4 inline mr-2" />
                  {patient ? 'Update Patient' : 'Register Patient'}
                </button>
              )}
            </div>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// View Patient Modal Component
const ViewPatientModal = ({ patient, onClose }) => {
  const calculateAge = (dateOfBirth) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
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
        className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Patient Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Header Section */}
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
              {patient.photo ? (
                <img src={patient.photo} alt={patient.firstName} className="w-full h-full object-cover rounded-full" />
              ) : (
                <User className="w-12 h-12 text-white" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{patient.firstName} {patient.lastName}</h3>
                  <p className="text-gray-600 mt-1">{patient.patientId}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-gray-600">{calculateAge(patient.dateOfBirth)} years old</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-sm text-gray-600">{patient.gender}</span>
                    <span className="text-gray-300">|</span>
                    <span className="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                      <Droplet className="w-3 h-3 mr-1" />
                      {patient.bloodType}
                    </span>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  patient.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                </span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#5DBB63]" />
                Contact Information
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{patient.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium">{patient.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Address:</span>
                  <span className="font-medium text-right">{patient.address}, {patient.city}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Contact className="w-4 h-4 text-[#5DBB63]" />
                Emergency Contact
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Name:</span>
                  <span className="font-medium">{patient.emergencyContact?.name || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-medium">{patient.emergencyContact?.phone || 'Not provided'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Relation:</span>
                  <span className="font-medium">{patient.emergencyContact?.relation || 'Not provided'}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-red-500" />
                Allergies
              </h4>
              {patient.allergies && patient.allergies.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {patient.allergies.map((allergy, i) => (
                    <span key={i} className="px-2 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                      {allergy}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No known allergies</p>
              )}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <Activity className="w-4 h-4 text-orange-500" />
                Chronic Conditions
              </h4>
              {patient.chronicConditions && patient.chronicConditions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {patient.chronicConditions.map((condition, i) => (
                    <span key={i} className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                      {condition}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No chronic conditions</p>
              )}
            </div>
          </div>

          {/* Insurance Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-[#5DBB63]" />
              Insurance Information
            </h4>
            {patient.insurance ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">Provider:</span>
                  <p className="font-medium">{patient.insurance.provider}</p>
                </div>
                <div>
                  <span className="text-gray-600">Policy Number:</span>
                  <p className="font-medium">{patient.insurance.policyNumber}</p>
                </div>
                <div>
                  <span className="text-gray-600">Expiry:</span>
                  <p className="font-medium">{patient.insurance.expiry}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No insurance information</p>
            )}
          </div>

          {/* Registration Info */}
          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                Registered: {patient.registrationDate}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PatientRegistration;

