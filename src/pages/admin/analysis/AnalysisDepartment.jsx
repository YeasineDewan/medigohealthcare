import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Building,
  Users,
  Mail,
  Phone,
  MapPin,
  Clock,
  Calendar,
  Search,
  Filter,
  Download,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Settings,
  TrendingUp,
  Activity,
  CheckCircle,
  AlertCircle,
  X,
  Save,
  User,
  Stethoscope,
  Microscope,
  TestTube,
  Beaker,
  Dna,
  Heart,
  Brain,
  Loader2
} from 'lucide-react';

const AnalysisDepartment = () => {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [formData, setFormData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [filters, setFilters] = useState({
    status: '',
    specialization: '',
    efficiency: ''
  });

  // Mock data for demonstration
  const mockDepartments = [
    {
      id: 1,
      name: 'Pathology Laboratory',
      head: 'Dr. Sarah Johnson',
      email: 'sarah.johnson@hospital.com',
      phone: '+1-234-567-8901',
      location: 'Building A, Floor 2',
      specialization: 'Clinical Pathology',
      status: 'active',
      staffCount: 12,
      testsCount: 45,
      efficiency: 94,
      equipment: ['Microscopes', 'Centrifuges', 'Staining Equipment'],
      establishedDate: '2018-03-15',
      lastInspection: '2024-01-10',
      nextInspection: '2024-07-10',
      operatingHours: '08:00 - 18:00',
      emergencyService: true,
      accreditation: 'CAP Accredited',
      description: 'Comprehensive clinical pathology services including hematology, clinical chemistry, and microbiology.'
    },
    {
      id: 2,
      name: 'Radiology Department',
      head: 'Dr. Michael Chen',
      email: 'michael.chen@hospital.com',
      phone: '+1-234-567-8902',
      location: 'Building B, Floor 1',
      specialization: 'Medical Imaging',
      status: 'active',
      staffCount: 18,
      testsCount: 32,
      efficiency: 89,
      equipment: ['X-Ray Machines', 'CT Scanner', 'MRI', 'Ultrasound'],
      establishedDate: '2017-06-20',
      lastInspection: '2024-02-15',
      nextInspection: '2024-08-15',
      operatingHours: '24/7',
      emergencyService: true,
      accreditation: 'ACR Accredited',
      description: 'Advanced diagnostic imaging services with state-of-the-art equipment and expert radiologists.'
    },
    {
      id: 3,
      name: 'Biochemistry Laboratory',
      head: 'Dr. Emily Davis',
      email: 'emily.davis@hospital.com',
      phone: '+1-234-567-8903',
      location: 'Building A, Floor 3',
      specialization: 'Clinical Biochemistry',
      status: 'active',
      staffCount: 8,
      testsCount: 28,
      efficiency: 92,
      equipment: ['Auto Analyzers', 'Spectrophotometers', 'Chromatography'],
      establishedDate: '2019-01-10',
      lastInspection: '2024-01-20',
      nextInspection: '2024-07-20',
      operatingHours: '07:00 - 20:00',
      emergencyService: false,
      accreditation: 'ISO 15189',
      description: 'Specialized biochemical testing for metabolic disorders, endocrine conditions, and therapeutic drug monitoring.'
    },
    {
      id: 4,
      name: 'Microbiology Laboratory',
      head: 'Dr. James Wilson',
      email: 'james.wilson@hospital.com',
      phone: '+1-234-567-8904',
      location: 'Building A, Floor 4',
      specialization: 'Medical Microbiology',
      status: 'maintenance',
      staffCount: 10,
      testsCount: 24,
      efficiency: 87,
      equipment: ['Incubators', 'Culture Media', 'Microscopes', 'PCR Machines'],
      establishedDate: '2018-09-12',
      lastInspection: '2024-02-01',
      nextInspection: '2024-08-01',
      operatingHours: '08:00 - 17:00',
      emergencyService: false,
      accreditation: 'CLIA Certified',
      description: 'Complete microbiological testing including bacterial culture, sensitivity testing, and molecular diagnostics.'
    },
    {
      id: 5,
      name: 'Hematology Department',
      head: 'Dr. Lisa Anderson',
      email: 'lisa.anderson@hospital.com',
      phone: '+1-234-567-8905',
      location: 'Building C, Floor 2',
      specialization: 'Clinical Hematology',
      status: 'active',
      staffCount: 6,
      testsCount: 18,
      efficiency: 95,
      equipment: ['Flow Cytometers', 'Cell Counters', 'Coagulation Analyzers'],
      establishedDate: '2020-03-25',
      lastInspection: '2024-01-25',
      nextInspection: '2024-07-25',
      operatingHours: '08:00 - 18:00',
      emergencyService: true,
      accreditation: 'CAP Accredited',
      description: 'Specialized hematological services including complete blood counts, coagulation studies, and blood typing.'
    },
    {
      id: 6,
      name: 'Immunology Laboratory',
      head: 'Dr. Robert Taylor',
      email: 'robert.taylor@hospital.com',
      phone: '+1-234-567-8906',
      location: 'Building A, Floor 5',
      specialization: 'Clinical Immunology',
      status: 'active',
      staffCount: 7,
      testsCount: 15,
      efficiency: 91,
      equipment: ['ELISA Readers', 'Flow Cytometers', 'Western Blot'],
      establishedDate: '2019-07-18',
      lastInspection: '2024-02-10',
      nextInspection: '2024-08-10',
      operatingHours: '08:00 - 17:00',
      emergencyService: false,
      accreditation: 'ISO 15189',
      description: 'Advanced immunological testing for autoimmune diseases, allergies, and immunodeficiency disorders.'
    }
  ];

  const specializations = [
    'Clinical Pathology',
    'Medical Imaging',
    'Clinical Biochemistry',
    'Medical Microbiology',
    'Clinical Hematology',
    'Clinical Immunology',
    'Molecular Diagnostics',
    'Cytogenetics'
  ];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setDepartments(mockDepartments);
      setLoading(false);
      addNotification('Analysis departments loaded successfully', 'success');
    }, 1000);
  }, []);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleAddDepartment = () => {
    const newDepartment = {
      id: Date.now(),
      ...formData,
      staffCount: 0,
      testsCount: 0,
      efficiency: 85,
      establishedDate: new Date().toISOString().split('T')[0]
    };
    setDepartments([...departments, newDepartment]);
    setShowAddModal(false);
    setFormData({});
    addNotification('Department added successfully', 'success');
  };

  const handleEditDepartment = () => {
    setDepartments(departments.map(dept => 
      dept.id === selectedDepartment.id 
        ? { ...dept, ...formData }
        : dept
    ));
    setShowEditModal(false);
    setSelectedDepartment(null);
    setFormData({});
    addNotification('Department updated successfully', 'success');
  };

  const handleDeleteDepartment = (id) => {
    setDepartments(departments.filter(dept => dept.id !== id));
    addNotification('Department deleted successfully', 'success');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'maintenance': return 'text-orange-600 bg-orange-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getEfficiencyColor = (efficiency) => {
    if (efficiency >= 90) return 'text-green-600 bg-green-100';
    if (efficiency >= 80) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const filteredDepartments = departments.filter(dept => {
    const matchesSearch = dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.head.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dept.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filters.status || dept.status === filters.status;
    const matchesSpecialization = !filters.specialization || dept.specialization === filters.specialization;
    const matchesEfficiency = !filters.efficiency || 
      (filters.efficiency === 'high' && dept.efficiency >= 90) ||
      (filters.efficiency === 'medium' && dept.efficiency >= 80 && dept.efficiency < 90) ||
      (filters.efficiency === 'low' && dept.efficiency < 80);
    
    return matchesSearch && matchesStatus && matchesSpecialization && matchesEfficiency;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading departments...</span>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl">
              <Building className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Analysis Departments</h1>
              <p className="text-gray-600">Manage laboratory departments and their operations</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search departments..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-5 h-5 text-gray-600" />
            </button>
            <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
              <Download className="w-5 h-5 text-gray-600" />
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Department
            </button>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-white rounded-lg shadow-lg border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                <select
                  value={filters.specialization}
                  onChange={(e) => setFilters({...filters, specialization: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Specializations</option>
                  {specializations.map(spec => (
                    <option key={spec} value={spec}>{spec}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Efficiency</label>
                <select
                  value={filters.efficiency}
                  onChange={(e) => setFilters({...filters, efficiency: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">All Efficiency</option>
                  <option value="high">High (90%+)</option>
                  <option value="medium">Medium (80-89%)</option>
                  <option value="low">Low (&lt;80%)</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => setFilters({ status: '', specialization: '', efficiency: '' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Departments', value: departments.length, icon: Building, color: 'from-purple-500 to-purple-600' },
          { label: 'Active Departments', value: departments.filter(d => d.status === 'active').length, icon: CheckCircle, color: 'from-green-500 to-green-600' },
          { label: 'Total Staff', value: departments.reduce((sum, d) => sum + d.staffCount, 0), icon: Users, color: 'from-blue-500 to-blue-600' },
          { label: 'Avg Efficiency', value: `${Math.round(departments.reduce((sum, d) => sum + d.efficiency, 0) / departments.length)}%`, icon: TrendingUp, color: 'from-orange-500 to-orange-600' }
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 bg-gradient-to-r ${stat.color} rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-600 text-sm">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredDepartments.map((department, index) => (
          <motion.div
            key={department.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <Building className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{department.name}</h3>
                    <p className="text-sm text-gray-600">{department.specialization}</p>
                  </div>
                </div>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(department.status)}`}>
                  {department.status}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <User className="w-4 h-4 mr-2" />
                  {department.head}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {department.location}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {department.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {department.phone}
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{department.staffCount}</div>
                    <div className="text-xs text-gray-600">Staff</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{department.testsCount}</div>
                    <div className="text-xs text-gray-600">Tests</div>
                  </div>
                  <div>
                    <div className={`text-lg font-semibold ${getEfficiencyColor(department.efficiency).split(' ')[0]}`}>
                      {department.efficiency}%
                    </div>
                    <div className="text-xs text-gray-600">Efficiency</div>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="w-4 h-4 mr-1" />
                  {department.operatingHours}
                </div>
                {department.emergencyService && (
                  <div className="flex items-center text-sm text-red-600">
                    <AlertCircle className="w-4 h-4 mr-1" />
                    Emergency
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-end space-x-2">
                <button
                  onClick={() => {
                    setSelectedDepartment(department);
                    setShowViewModal(true);
                  }}
                  className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Eye className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setSelectedDepartment(department);
                    setFormData(department);
                    setShowEditModal(true);
                  }}
                  className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteDepartment(department.id)}
                  className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {(showAddModal || showEditModal) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">
                    {showAddModal ? 'Add Department' : 'Edit Department'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      setFormData({});
                      setSelectedDepartment(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department Name *</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Head of Department *</label>
                    <input
                      type="text"
                      value={formData.head || ''}
                      onChange={(e) => setFormData({...formData, head: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      value={formData.email || ''}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location *</label>
                    <input
                      type="text"
                      value={formData.location || ''}
                      onChange={(e) => setFormData({...formData, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialization *</label>
                    <select
                      value={formData.specialization || ''}
                      onChange={(e) => setFormData({...formData, specialization: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Specialization</option>
                      {specializations.map(spec => (
                        <option key={spec} value={spec}>{spec}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status || 'active'}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="maintenance">Maintenance</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Operating Hours</label>
                    <input
                      type="text"
                      value={formData.operatingHours || ''}
                      onChange={(e) => setFormData({...formData, operatingHours: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., 08:00 - 18:00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Accreditation</label>
                    <input
                      type="text"
                      value={formData.accreditation || ''}
                      onChange={(e) => setFormData({...formData, accreditation: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="e.g., CAP Accredited"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      setFormData({});
                      setSelectedDepartment(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={showAddModal ? handleAddDepartment : handleEditDepartment}
                    className="px-4 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {showAddModal ? 'Add Department' : 'Update Department'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedDepartment && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">Department Details</h2>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      setSelectedDepartment(null);
                    }}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Department Name:</span>
                        <div className="font-medium">{selectedDepartment.name}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Head of Department:</span>
                        <div className="font-medium">{selectedDepartment.head}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Specialization:</span>
                        <div className="font-medium">{selectedDepartment.specialization}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Location:</span>
                        <div className="font-medium">{selectedDepartment.location}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedDepartment.status)}`}>
                          {selectedDepartment.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Email:</span>
                        <div className="font-medium">{selectedDepartment.email}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Phone:</span>
                        <div className="font-medium">{selectedDepartment.phone}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Operating Hours:</span>
                        <div className="font-medium">{selectedDepartment.operatingHours}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Emergency Service:</span>
                        <div className="font-medium">
                          {selectedDepartment.emergencyService ? (
                            <span className="text-green-600">Available</span>
                          ) : (
                            <span className="text-gray-600">Not Available</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Accreditation:</span>
                        <div className="font-medium">{selectedDepartment.accreditation}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Staff Count:</span>
                        <div className="font-medium">{selectedDepartment.staffCount} employees</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Number of Tests:</span>
                        <div className="font-medium">{selectedDepartment.testsCount} tests</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Efficiency Rate:</span>
                        <div className={`font-medium ${getEfficiencyColor(selectedDepartment.efficiency).split(' ')[0]}`}>
                          {selectedDepartment.efficiency}%
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Established Date:</span>
                        <div className="font-medium">{new Date(selectedDepartment.establishedDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Inspection Schedule</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Last Inspection:</span>
                        <div className="font-medium">{new Date(selectedDepartment.lastInspection).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Next Inspection:</span>
                        <div className="font-medium">{new Date(selectedDepartment.nextInspection).toLocaleDateString()}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedDepartment.description}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipment</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedDepartment.equipment.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                        <Microscope className="w-4 h-4 text-purple-600" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Notifications */}
      <AnimatePresence>
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
              notification.type === 'success' ? 'bg-green-500 text-white' :
              notification.type === 'error' ? 'bg-red-500 text-white' :
              'bg-blue-500 text-white'
            }`}
          >
            {notification.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default AnalysisDepartment;
