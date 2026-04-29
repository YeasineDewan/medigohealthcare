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
  Mail,
  Calendar,
  MapPin,
  Droplet,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  ChevronDown,
  MoreHorizontal,
  UserPlus,
  FileCheck,
  Archive,
  RefreshCw
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV, printData } from '../../../utils/exportUtils';

const PatientRecords = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPatients, setSelectedPatients] = useState([]);
  const [viewMode, setViewMode] = useState('table'); // table or grid
  const [filters, setFilters] = useState({
    gender: 'all',
    bloodType: 'all',
    status: 'all',
    city: 'all',
    ageRange: 'all'
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
      address: '123 Dhaka Street',
      city: 'Dhaka',
      allergies: ['Penicillin', 'Dust'],
      chronicConditions: ['Diabetes Type 2'],
      registrationDate: '2024-01-15',
      lastVisit: '2024-03-10',
      totalVisits: 12,
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
      address: '456 Chittagong Road',
      city: 'Chittagong',
      allergies: [],
      chronicConditions: [],
      registrationDate: '2024-02-10',
      lastVisit: '2024-03-08',
      totalVisits: 5,
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
      address: '789 Sylhet Avenue',
      city: 'Sylhet',
      allergies: ['Aspirin'],
      chronicConditions: ['Hypertension', 'Heart Disease'],
      registrationDate: '2024-02-20',
      lastVisit: '2024-03-12',
      totalVisits: 8,
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
      address: '321 Khulna Lane',
      city: 'Khulna',
      allergies: [],
      chronicConditions: [],
      registrationDate: '2024-03-01',
      lastVisit: '2024-03-05',
      totalVisits: 2,
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
      address: '654 Rajshahi Court',
      city: 'Rajshahi',
      allergies: ['Sulfa drugs', 'Latex'],
      chronicConditions: ['Asthma'],
      registrationDate: '2024-03-10',
      lastVisit: '2024-03-11',
      totalVisits: 1,
      status: 'inactive',
      photo: null
    },
    {
      id: 6,
      patientId: 'PT-2024-0006',
      firstName: 'Jasmine',
      lastName: 'Ahmed',
      email: 'jasmine.a@email.com',
      phone: '+880 1912345670',
      dateOfBirth: '1988-12-25',
      gender: 'Female',
      bloodType: 'O-',
      address: '987 Barisal Road',
      city: 'Barisal',
      allergies: [],
      chronicConditions: ['Thyroid'],
      registrationDate: '2024-01-20',
      lastVisit: '2024-03-09',
      totalVisits: 15,
      status: 'active',
      photo: null
    }
  ];

  const bloodTypes = ['All', 'A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];
  const genders = ['All', 'Male', 'Female', 'Other'];
  const cities = ['All', 'Dhaka', 'Chittagong', 'Sylhet', 'Khulna', 'Rajshahi', 'Barisal', 'Rangpur'];
  const ageRanges = [
    { value: 'all', label: 'All Ages' },
    { value: '0-18', label: '0-18 years' },
    { value: '19-30', label: '19-30 years' },
    { value: '31-50', label: '31-50 years' },
    { value: '51+', label: '51+ years' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setPatients(mockPatients);
      setLoading(false);
    }, 800);
  }, []);

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
    const matchesCity = filters.city === 'all' || patient.city === filters.city;
    
    let matchesAge = true;
    if (filters.ageRange !== 'all') {
      const age = calculateAge(patient.dateOfBirth);
      const [min, max] = filters.ageRange.split('-').map(v => v === '+' ? 150 : parseInt(v));
      matchesAge = age >= min && age <= max;
    }
    
    return matchesSearch && matchesGender && matchesBloodType && matchesStatus && matchesCity && matchesAge;
  });

  const handleSelectAll = () => {
    if (selectedPatients.length === filteredPatients.length) {
      setSelectedPatients([]);
    } else {
      setSelectedPatients(filteredPatients.map(p => p.id));
    }
  };

  const handleSelectPatient = (patientId) => {
    if (selectedPatients.includes(patientId)) {
      setSelectedPatients(selectedPatients.filter(id => id !== patientId));
    } else {
      setSelectedPatients([...selectedPatients, patientId]);
    }
  };

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
      { key: 'totalVisits', label: 'Total Visits' },
      { key: 'status', label: 'Status' }
    ];
    
    const data = filteredPatients.map(p => ({
      ...p,
      name: `${p.firstName} ${p.lastName}`
    }));

    switch (format) {
      case 'pdf':
        exportToPDF(data, 'Patient Records Report', columns);
        break;
      case 'word':
        exportToWord(data, 'Patient Records Report', columns);
        break;
      case 'csv':
        exportToCSV(data, 'patient-records');
        break;
      case 'print':
        printData(data, 'Patient Records Report');
        break;
      default:
        break;
    }
  };

  const handleBulkAction = (action) => {
    if (selectedPatients.length === 0) return;
    
    switch (action) {
      case 'delete':
        if (window.confirm(`Are you sure you want to delete ${selectedPatients.length} patient records?`)) {
          setPatients(patients.filter(p => !selectedPatients.includes(p.id)));
          setSelectedPatients([]);
        }
        break;
      case 'export':
        handleExport('csv');
        break;
      case 'archive':
        alert(`${selectedPatients.length} patients archived successfully`);
        setSelectedPatients([]);
        break;
      default:
        break;
    }
  };

  // Statistics
  const totalPatients = patients.length;
  const activePatients = patients.filter(p => p.status === 'active').length;
  const criticalPatients = patients.filter(p => p.allergies.length > 0 || p.chronicConditions.length > 0).length;
  const totalVisits = patients.reduce((sum, p) => sum + p.totalVisits, 0);

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
          <h1 className="text-3xl font-bold text-gray-900">Patient Records</h1>
          <p className="text-gray-500 mt-1">View and manage all patient records</p>
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
          
          {/* View Toggle */}
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <button
              onClick={() => setViewMode('table')}
              className={`px-3 py-2 ${viewMode === 'table' ? 'bg-[#5DBB63] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <FileText className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`px-3 py-2 ${viewMode === 'grid' ? 'bg-[#5DBB63] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Archive className="w-4 h-4" />
            </button>
          </div>

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
            onClick={() => window.location.href = '/admin/patients/registration'}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
          >
            <Plus className="w-4 h-4" />
            Add Patient
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
              <p className="text-sm text-gray-600">Total Visits</p>
              <p className="text-2xl font-bold text-purple-600">{totalVisits}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Activity className="w-6 h-6 text-purple-600" />
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
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
                  value={filters.city}
                  onChange={(e) => setFilters({ ...filters, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  {cities.map(c => (
                    <option key={c} value={c.toLowerCase()}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Age Range</label>
                <select
                  value={filters.ageRange}
                  onChange={(e) => setFilters({ ...filters, ageRange: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                >
                  {ageRanges.map(range => (
                    <option key={range.value} value={range.value}>{range.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Actions */}
      {selectedPatients.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center justify-between"
        >
          <span className="text-sm text-blue-700 font-medium">
            {selectedPatients.length} patient(s) selected
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleBulkAction('export')}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Download className="w-4 h-4" />
              Export
            </button>
            <button
              onClick={() => handleBulkAction('archive')}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Archive className="w-4 h-4" />
              Archive
            </button>
            <button
              onClick={() => handleBulkAction('delete')}
              className="flex items-center gap-1 px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg hover:bg-red-700"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        </motion.div>
      )}

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

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      checked={selectedPatients.length === filteredPatients.length && filteredPatients.length > 0}
                      onChange={handleSelectAll}
                      className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                    />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Patient ID</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Age/Gender</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Blood Type</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contact</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Visits</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Last Visit</th>
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
                      <input
                        type="checkbox"
                        checked={selectedPatients.includes(patient.id)}
                        onChange={() => handleSelectPatient(patient.id)}
                        className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{patient.firstName} {patient.lastName}</p>
                          <p className="text-xs text-gray-500">{patient.city}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-mono text-sm text-gray-600">{patient.patientId}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {calculateAge(patient.dateOfBirth)} yrs / {patient.gender}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                        <Droplet className="w-3 h-3 mr-1" />
                        {patient.bloodType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <p className="text-gray-900">{patient.phone}</p>
                      <p className="text-gray-500">{patient.email}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <span className="font-medium">{patient.totalVisits}</span> visits
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{patient.lastVisit}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        patient.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                      }`}>
                        {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/admin/patients/history?id=${patient.id}`}
                          className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="View History"
                        >
                          <FileCheck className="w-4 h-4" />
                        </a>
                        <a
                          href={`/admin/patients/registration?edit=${patient.id}`}
                          className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </a>
                        <button
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
      )}

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPatients.map((patient, index) => (
            <motion.div
              key={patient.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <User className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{patient.firstName} {patient.lastName}</h3>
                    <p className="text-sm text-gray-500">{patient.patientId}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  patient.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                }`}>
                  {patient.status === 'active' ? 'Active' : 'Inactive'}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Age/Gender</span>
                  <span className="font-medium">{calculateAge(patient.dateOfBirth)} yrs / {patient.gender}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Blood Type</span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-700">
                    {patient.bloodType}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Phone</span>
                  <span className="font-medium">{patient.phone}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">City</span>
                  <span className="font-medium">{patient.city}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Total Visits</span>
                  <span className="font-medium">{patient.totalVisits}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">Last Visit</span>
                  <span className="font-medium">{patient.lastVisit}</span>
                </div>
              </div>

              {(patient.allergies.length > 0 || patient.chronicConditions.length > 0) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium text-gray-700">Medical Alerts</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {patient.allergies.map((a, i) => (
                      <span key={i} className="px-2 py-0.5 bg-red-100 text-red-700 text-xs rounded">{a}</span>
                    ))}
                    {patient.chronicConditions.map((c, i) => (
                      <span key={i} className="px-2 py-0.5 bg-orange-100 text-orange-700 text-xs rounded">{c}</span>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
                <a
                  href={`/admin/patients/history?id=${patient.id}`}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  <FileCheck className="w-4 h-4" />
                  History
                </a>
                <a
                  href={`/admin/patients/registration?edit=${patient.id}`}
                  className="flex-1 flex items-center justify-center gap-1 px-3 py-2 text-sm bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50]"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* No Results */}
      {filteredPatients.length === 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No patients found</h3>
          <p className="text-gray-500 mb-4">Try adjusting your search or filter criteria</p>
          <button
            onClick={() => {
              setSearchTerm('');
              setFilters({
                gender: 'all',
                bloodType: 'all',
                status: 'all',
                city: 'all',
                ageRange: 'all'
              });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 text-[#5DBB63] font-medium hover:underline"
          >
            <RefreshCw className="w-4 h-4" />
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientRecords;

