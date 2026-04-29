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
  Award,
  Stethoscope,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Star,
  MapPin,
  Briefcase,
  GraduationCap,
  Heart,
  Brain,
  Bone,
  Baby,
  User,
  Download,
  Upload,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  FileText,
  Image
} from 'lucide-react';
// TODO: Fix AddDoctorForm import - forms in development
// import AddDoctorForm from '../../components/admin/AddDoctorForm';


const DoctorsManagement = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'cardiology', name: 'Cardiology' },
    { id: 'neurology', name: 'Neurology' },
    { id: 'orthopedics', name: 'Orthopedics' },
    { id: 'pediatrics', name: 'Pediatrics' },
    { id: 'emergency', name: 'Emergency Medicine' },
    { id: 'radiology', name: 'Radiology' },
    { id: 'pathology', name: 'Pathology' }
  ];

  const statusOptions = [
    { id: 'all', name: 'All Status' },
    { id: 'active', name: 'Active' },
    { id: 'on-leave', name: 'On Leave' },
    { id: 'inactive', name: 'Inactive' }
  ];

  const mockDoctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@medigo.com',
      phone: '+1 (555) 123-4567',
      department: 'cardiology',
      specialization: 'Interventional Cardiology',
      experience: 12,
      education: 'MD, Harvard Medical School',
      license: 'MD-123456',
      status: 'active',
      rating: 4.8,
      patients: 1247,
      appointments: 89,
      availability: 'Mon-Fri, 9AM-5PM',
      joinDate: '2012-03-15',
      salary: 180000,
      image: null,
      address: '123 Medical Center Dr, Boston, MA 02115',
      bio: 'Dr. Johnson is a board-certified cardiologist with over 12 years of experience in interventional cardiology.',
      skills: ['Angioplasty', 'Stent Placement', 'Cardiac Catheterization', 'Echocardiography'],
      languages: ['English', 'Spanish', 'French'],
      awards: ['Best Cardiologist 2023', 'Top Doctor Award 2022']
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      email: 'michael.chen@medigo.com',
      phone: '+1 (555) 234-5678',
      department: 'neurology',
      specialization: 'Neurophysiology',
      experience: 8,
      education: 'MD, Johns Hopkins University',
      license: 'MD-234567',
      status: 'active',
      rating: 4.9,
      patients: 892,
      appointments: 67,
      availability: 'Mon-Thu, 8AM-4PM',
      joinDate: '2016-07-20',
      salary: 165000,
      image: null,
      address: '456 Neurology Center, New York, NY 10016',
      bio: 'Dr. Chen specializes in neurophysiology and has extensive experience in treating complex neurological disorders.',
      skills: ['EEG', 'EMG', 'Nerve Conduction Studies', 'Botox Injections'],
      languages: ['English', 'Mandarin', 'Cantonese'],
      awards: ['Research Excellence Award 2023']
    },
    {
      id: 3,
      name: 'Dr. Emily Williams',
      email: 'emily.williams@medigo.com',
      phone: '+1 (555) 345-6789',
      department: 'pediatrics',
      specialization: 'Pediatric Emergency Medicine',
      experience: 6,
      education: 'MD, Stanford University',
      license: 'MD-345678',
      status: 'active',
      rating: 4.7,
      patients: 1567,
      appointments: 124,
      availability: '24/7 Emergency Shifts',
      joinDate: '2018-01-10',
      salary: 145000,
      image: null,
      address: '789 Children\'s Hospital, Los Angeles, CA 90027',
      bio: 'Dr. Williams is dedicated to providing emergency care for children and has special training in pediatric trauma.',
      skills: ['Pediatric Trauma', 'Emergency Procedures', 'Child Life Support', 'Pediatric CPR'],
      languages: ['English', 'Spanish'],
      awards: ['Humanitarian Award 2023']
    },
    {
      id: 4,
      name: 'Dr. James Brown',
      email: 'james.brown@medigo.com',
      phone: '+1 (555) 456-7890',
      department: 'orthopedics',
      specialization: 'Sports Medicine',
      experience: 15,
      education: 'MD, Mayo Clinic College',
      license: 'MD-456789',
      status: 'on-leave',
      rating: 4.6,
      patients: 723,
      appointments: 45,
      availability: 'On Leave Until Feb 2024',
      joinDate: '2009-05-12',
      salary: 175000,
      image: null,
      address: '321 Orthopedic Center, Chicago, IL 60611',
      bio: 'Dr. Brown specializes in sports medicine and has worked with professional athletes throughout his career.',
      skills: ['Arthroscopy', 'Joint Replacement', 'Sports Injuries', 'Rehabilitation'],
      languages: ['English', 'German'],
      awards: ['Sports Medicine Excellence 2022']
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setDoctors(mockDoctors);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || doctor.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || doctor.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
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
      case 'on-leave':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'inactive':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getDepartmentIcon = (department) => {
    switch (department) {
      case 'cardiology':
        return <Heart className="w-4 h-4 text-red-600" />;
      case 'neurology':
        return <Brain className="w-4 h-4 text-purple-600" />;
      case 'orthopedics':
        return <Bone className="w-4 h-4 text-blue-600" />;
      case 'pediatrics':
        return <Baby className="w-4 h-4 text-pink-600" />;
      default:
        return <Stethoscope className="w-4 h-4 text-gray-600" />;
    }
  };

  const stats = {
    total: doctors.length,
    active: doctors.filter(d => d.status === 'active').length,
    onLeave: doctors.filter(d => d.status === 'on-leave').length,
    totalPatients: doctors.reduce((acc, d) => acc + d.patients, 0),
    avgRating: (doctors.reduce((acc, d) => acc + d.rating, 0) / doctors.length).toFixed(1)
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
          <h1 className="text-3xl font-bold text-gray-900">Doctor Management</h1>
          <p className="text-gray-600 mt-1">Comprehensive doctor database and management system</p>
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
            Add Doctor
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
              <p className="text-sm font-medium text-gray-600">Total Doctors</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
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
              <p className="text-sm font-medium text-gray-600">On Leave</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.onLeave}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg">
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
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.totalPatients.toLocaleString()}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
              <Users className="w-6 h-6 text-white" />
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
              <p className="text-sm font-medium text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.avgRating}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
              <Star className="w-6 h-6 text-white" />
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
              placeholder="Search doctors by name, email, or specialization..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            >
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            >
              {statusOptions.map(status => (
                <option key={status.id} value={status.id}>{status.name}</option>
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


      {/* Doctors Table */}
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
                <th className="text-left py-4 px-6 font-medium text-gray-700">

                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1 hover:text-[#5DBB63]"
                  >
                    Doctor
                    {sortBy === 'name' && (
                      sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Department</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Specialization</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">
                  <button
                    onClick={() => handleSort('experience')}
                    className="flex items-center gap-1 hover:text-[#5DBB63]"
                  >
                    Experience
                    {sortBy === 'experience' && (
                      sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Patients</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Rating</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedDoctors.map((doctor, index) => (
                <tr
                  key={doctor.id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{doctor.name}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-3 h-3" />
                          {doctor.email}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-3 h-3" />
                          {doctor.phone}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {getDepartmentIcon(doctor.department)}
                      <span className="capitalize">{doctor.department}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <p className="text-sm text-gray-900">{doctor.specialization}</p>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{doctor.experience} years</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{doctor.patients.toLocaleString()}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-900">{doctor.rating}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(doctor.status)}
                      <span className="text-sm text-gray-900 capitalize">{doctor.status.replace('-', ' ')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedDoctor(doctor);
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

      {/* View Doctor Modal */}
      {showViewModal && selectedDoctor && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowViewModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Doctor Profile</h3>
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
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-900">{selectedDoctor.name}</h4>
                  <p className="text-gray-600 mt-1">{selectedDoctor.specialization}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-900">{selectedDoctor.rating}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(selectedDoctor.status)}
                      <span className="text-sm text-gray-900 capitalize">{selectedDoctor.status.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getDepartmentIcon(selectedDoctor.department)}
                      <span className="text-sm text-gray-900 capitalize">{selectedDoctor.department}</span>
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
                      <span className="text-sm text-gray-900">{selectedDoctor.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedDoctor.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedDoctor.address}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Professional Information</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <GraduationCap className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedDoctor.education}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedDoctor.experience} years experience</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">License: {selectedDoctor.license}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bio */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Biography</h5>
                <p className="text-sm text-gray-600">{selectedDoctor.bio}</p>
              </div>

              {/* Skills */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Skills & Expertise</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedDoctor.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Languages</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedDoctor.languages.map((language, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Awards */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Awards & Recognition</h5>
                <div className="space-y-2">
                  {selectedDoctor.awards.map((award, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-yellow-500" />
                      <span className="text-sm text-gray-900">{award}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Total Patients</p>
                  <p className="text-xl font-bold text-gray-900">{selectedDoctor.patients.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Appointments</p>
                  <p className="text-xl font-bold text-gray-900">{selectedDoctor.appointments}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Availability</p>
                  <p className="text-sm font-medium text-gray-900">{selectedDoctor.availability}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">Join Date</p>
                  <p className="text-sm font-medium text-gray-900">{selectedDoctor.joinDate}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Add Doctor Form - WIP */}
      {/* <AddDoctorForm
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={(doctorData) => {
          // Add the new doctor to the list
          const newDoctor = {
            id: doctors.length + 1,
            ...doctorData.personalInfo,
            ...doctorData.professionalInfo,
            ...doctorData.employmentDetails,
            status: 'active',
            joinDate: new Date().toLocaleDateString(),
            patients: 0,
            appointments: 0,
            availability: 'Available',
            languages: doctorData.personalInfo.languages,
            awards: doctorData.professionalInfo.awards,
            education: doctorData.professionalInfo.education
          };
          setDoctors([...doctors, newDoctor]);
          setShowAddModal(false);
        }}
      /> */}
    </div>
  </div>
);
};

export default DoctorsManagement;
