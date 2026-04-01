import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit3,
  Trash2,
  Mail,
  Phone,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Star,
  MapPin,
  FileText,
  Heart,
  Activity,
  Download,
  Upload,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  Users,
  CreditCard,
  Shield,
  Baby,
  Weight,
  Ruler,
  Stethoscope,
  Pill
} from 'lucide-react';
// TODO: Fix AddPatientForm import - forms in development
// import AddPatientForm from '../../components/admin/AddPatientForm';


const PatientsManagement = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedBloodType, setSelectedBloodType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);

  const statusOptions = [
    { id: 'all', name: 'All Status' },
    { id: 'active', name: 'Active' },
    { id: 'inactive', name: 'Inactive' },
    { id: 'critical', name: 'Critical' }
  ];

  const bloodTypes = [
    { id: 'all', name: 'All Blood Types' },
    { id: 'A+', name: 'A+' },
    { id: 'A-', name: 'A-' },
    { id: 'B+', name: 'B+' },
    { id: 'B-', name: 'B-' },
    { id: 'AB+', name: 'AB+' },
    { id: 'AB-', name: 'AB-' },
    { id: 'O+', name: 'O+' },
    { id: 'O-', name: 'O-' }
  ];

  const mockPatients = [
    {
      id: 1,
      name: 'John Anderson',
      email: 'john.anderson@email.com',
      phone: '+1 (555) 123-4567',
      age: 45,
      gender: 'Male',
      bloodType: 'A+',
      dateOfBirth: '1979-03-15',
      address: '123 Main St, Boston, MA 02115',
      emergencyContact: 'Mary Anderson, +1 (555) 987-6543',
      status: 'active',
      registrationDate: '2020-01-15',
      lastVisit: '2024-01-10',
      totalVisits: 24,
      outstandingBalance: 250.00,
      insurance: 'Blue Cross Blue Shield',
      allergies: ['Penicillin', 'Peanuts'],
      conditions: ['Hypertension', 'Type 2 Diabetes'],
      medications: ['Metformin', 'Lisinopril'],
      primaryDoctor: 'Dr. Sarah Johnson',
      department: 'cardiology',
      height: '5\'10"',
      weight: '175 lbs',
      bmi: 25.1,
      bloodPressure: '120/80',
      heartRate: 72,
      temperature: 98.6,
      oxygenSaturation: 98
    },
    {
      id: 2,
      name: 'Emily Rodriguez',
      email: 'emily.rodriguez@email.com',
      phone: '+1 (555) 234-5678',
      age: 32,
      gender: 'Female',
      bloodType: 'O+',
      dateOfBirth: '1992-07-22',
      address: '456 Oak Ave, New York, NY 10016',
      emergencyContact: 'Carlos Rodriguez, +1 (555) 876-5432',
      status: 'active',
      registrationDate: '2021-03-20',
      lastVisit: '2024-01-12',
      totalVisits: 18,
      outstandingBalance: 0.00,
      insurance: 'Aetna',
      allergies: ['None'],
      conditions: ['Asthma'],
      medications: ['Albuterol'],
      primaryDoctor: 'Dr. Michael Chen',
      department: 'neurology',
      height: '5\'5"',
      weight: '130 lbs',
      bmi: 21.6,
      bloodPressure: '110/70',
      heartRate: 68,
      temperature: 98.4,
      oxygenSaturation: 99
    },
    {
      id: 3,
      name: 'Michael Thompson',
      email: 'michael.thompson@email.com',
      phone: '+1 (555) 345-6789',
      age: 67,
      gender: 'Male',
      bloodType: 'B+',
      dateOfBirth: '1957-11-08',
      address: '789 Pine Rd, Chicago, IL 60611',
      emergencyContact: 'Susan Thompson, +1 (555) 765-4321',
      status: 'critical',
      registrationDate: '2019-06-10',
      lastVisit: '2024-01-14',
      totalVisits: 45,
      outstandingBalance: 1200.00,
      insurance: 'Medicare',
      allergies: ['Sulfa drugs', 'Shellfish'],
      conditions: ['Coronary Artery Disease', 'Arthritis', 'Kidney Disease'],
      medications: ['Aspirin', 'Metoprolol', 'Atorvastatin'],
      primaryDoctor: 'Dr. Sarah Johnson',
      department: 'cardiology',
      height: '5\'8"',
      weight: '180 lbs',
      bmi: 27.4,
      bloodPressure: '140/90',
      heartRate: 78,
      temperature: 99.2,
      oxygenSaturation: 95
    },
    {
      id: 4,
      name: 'Sophia Chen',
      email: 'sophia.chen@email.com',
      phone: '+1 (555) 456-7890',
      age: 8,
      gender: 'Female',
      bloodType: 'AB-',
      dateOfBirth: '2016-02-14',
      address: '321 Elm St, Los Angeles, CA 90027',
      emergencyContact: 'David Chen, +1 (555) 654-3210',
      status: 'active',
      registrationDate: '2023-01-05',
      lastVisit: '2024-01-08',
      totalVisits: 12,
      outstandingBalance: 0.00,
      insurance: 'Parents Insurance',
      allergies: ['None'],
      conditions: ['Seasonal Allergies'],
      medications: ['Children\'s Claritin'],
      primaryDoctor: 'Dr. Emily Williams',
      department: 'pediatrics',
      height: '4\'2"',
      weight: '50 lbs',
      bmi: 16.5,
      bloodPressure: '100/60',
      heartRate: 85,
      temperature: 98.8,
      oxygenSaturation: 99
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setPatients(mockPatients);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.phone.includes(searchTerm);
    const matchesStatus = selectedStatus === 'all' || patient.status === selectedStatus;
    const matchesBloodType = selectedBloodType === 'all' || patient.bloodType === selectedBloodType;
    return matchesSearch && matchesStatus && matchesBloodType;
  });

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'critical':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getGenderIcon = (gender) => {
    return gender === 'Male' ? 
      <User className="w-4 h-4 text-blue-600" /> : 
      <User className="w-4 h-4 text-pink-600" />;
  };

  const stats = {
    total: patients.length,
    active: patients.filter(p => p.status === 'active').length,
    critical: patients.filter(p => p.status === 'critical').length,
    totalBalance: patients.reduce((acc, p) => acc + p.outstandingBalance, 0),
    avgAge: Math.round(patients.reduce((acc, p) => acc + p.age, 0) / patients.length)
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5DBB63]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600 mt-1">Comprehensive patient records and healthcare management</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
          >
            <Plus className="w-4 h-4" />
            Add Patient
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-4 sm:p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="p-3 sm:p-2 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex-shrink-0">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.active}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{stats.critical}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-red-500 to-red-600 rounded-lg">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Outstanding Balance</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${stats.totalBalance.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Age</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.avgAge}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-3 sm:p-4 border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-3 sm:gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            >
              {statusOptions.map(status => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
            
            <select
              value={selectedBloodType}
              onChange={(e) => setSelectedBloodType(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            >
              {bloodTypes.map(type => (
                <option key={type.id} value={type.id}>{type.name}</option>
              ))}
            </select>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Patients Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="overflow-x-auto"
        >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="sticky top-0 z-20 bg-white shadow-sm border-b border-gray-200">
              <tr>
                <th className="text-left py-4 px-6 font-medium text-gray-700 min-w-[200px] sm:min-w-[180px]">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1 hover:text-emerald-600"
                  >
                    Patient
                    {sortBy === 'name' && (
                      sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">
                  <button
                    onClick={() => handleSort('age')}
                    className="flex items-center gap-1 hover:text-[#5DBB63]"
                  >
                    Age
                    {sortBy === 'age' && (
                      sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-700 hidden md:table-cell">Blood Type</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700 hidden lg:table-cell">Primary Doctor</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Last Visit</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Balance</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedPatients.map((patient, index) => (
                <tr
                  key={patient.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                        {getGenderIcon(patient.gender)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{patient.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-3 h-3" />
                          {patient.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-3 h-3" />
                          {patient.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {getGenderIcon(patient.gender)}
                      <span className="text-sm text-gray-900">{patient.age} years</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-900">{patient.bloodType}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{patient.primaryDoctor}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{patient.lastVisit}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-sm font-medium ${patient.outstandingBalance > 0 ? 'text-red-600' : 'text-green-600'}`}>
                      ${patient.outstandingBalance.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(patient.status)}
                      <span className="text-sm text-gray-900 capitalize">{patient.status}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedPatient(patient);
                          setShowViewModal(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit3 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Trash2 className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* View Patient Modal */}
      {showViewModal && selectedPatient && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowViewModal(false)}
          >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl w-full max-w-4xl sm:max-w-5xl max-h-[85vh] sm:max-h-[90vh] overflow-y-auto p-2 sm:p-0"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Patient Profile</h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] rounded-full flex items-center justify-center">
                  {getGenderIcon(selectedPatient.gender)}
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-900">{selectedPatient.name}</h4>
                  <p className="text-gray-600 mt-1">{selectedPatient.age} years old, {selectedPatient.gender}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      {getStatusIcon(selectedPatient.status)}
                      <span className="text-sm text-gray-900 capitalize">{selectedPatient.status}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-red-600" />
                      <span className="text-sm text-gray-900">{selectedPatient.bloodType}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">DOB: {selectedPatient.dateOfBirth}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Contact Information</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedPatient.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedPatient.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedPatient.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">Emergency: {selectedPatient.emergencyContact}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Medical Information</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">Primary: {selectedPatient.primaryDoctor}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">Department: {selectedPatient.department}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">Insurance: {selectedPatient.insurance}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">Registered: {selectedPatient.registrationDate}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Vital Signs */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Vital Signs</h5>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Heart className="w-4 h-4 text-red-500" />
                      <span className="text-xs text-gray-600">Heart Rate</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{selectedPatient.heartRate}</p>
                    <p className="text-xs text-gray-600">bpm</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4 text-blue-500" />
                      <span className="text-xs text-gray-600">Blood Pressure</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{selectedPatient.bloodPressure}</p>
                    <p className="text-xs text-gray-600">mmHg</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4 text-orange-500" />
                      <span className="text-xs text-gray-600">Temperature</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{selectedPatient.temperature}</p>
                    <p className="text-xs text-gray-600">°F</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Activity className="w-4 h-4 text-cyan-500" />
                      <span className="text-xs text-gray-600">O2 Saturation</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{selectedPatient.oxygenSaturation}</p>
                    <p className="text-xs text-gray-600">%</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Ruler className="w-4 h-4 text-green-500" />
                      <span className="text-xs text-gray-600">Height</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{selectedPatient.height}</p>
                    <p className="text-xs text-gray-600"></p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <div className="flex items-center gap-2 mb-1">
                      <Weight className="w-4 h-4 text-purple-500" />
                      <span className="text-xs text-gray-600">Weight</span>
                    </div>
                    <p className="text-lg font-bold text-gray-900">{selectedPatient.weight}</p>
                    <p className="text-xs text-gray-600"></p>
                  </div>
                </div>
              </div>

              {/* Medical Conditions */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Medical Conditions</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.conditions.map((condition, index) => (
                    <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-xs font-medium">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>

              {/* Allergies */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Allergies</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.allergies.map((allergy, index) => (
                    <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                      {allergy}
                    </span>
                  ))}
                </div>
              </div>

              {/* Medications */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Current Medications</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedPatient.medications.map((medication, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {medication}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Total Visits</p>
                  <p className="text-xl font-bold text-gray-900">{selectedPatient.totalVisits}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Last Visit</p>
                  <p className="text-sm font-medium text-gray-900">{selectedPatient.lastVisit}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">BMI</p>
                  <p className="text-xl font-bold text-gray-900">{selectedPatient.bmi}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Outstanding Balance</p>
                  <p className="text-xl font-bold text-gray-900">${selectedPatient.outstandingBalance.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Add Patient Form - WIP */}
      {/* <AddPatientForm
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={(patientData) => {
          // Add the new patient to the list
          const newPatient = {
            id: patients.length + 1,
            ...patientData.personalInfo,
            ...patientData.contactInfo,
            ...patientData.medicalInfo,
            ...patientData.vitalSigns,
            ...patientData.insuranceInfo,
            status: 'active',
            registrationDate: new Date().toLocaleDateString(),
            lastVisit: 'Not visited yet',
            outstandingBalance: 0,
            primaryPhysician: patientData.medicalInfo.primaryPhysician,
            insurance: patientData.insuranceInfo.primaryInsurance.provider,
            emergencyContact: patientData.contactInfo.emergencyContact.name,
            bmi: patientData.vitalSigns.bmi || 'N/A'
          };
          setPatients([...patients, newPatient]);
          setShowAddModal(false);
        }}
      /> */}
    </div>
  </div>
);
};

export default PatientsManagement;
