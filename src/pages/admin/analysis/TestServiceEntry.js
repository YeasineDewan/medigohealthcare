import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TestTube,
  Search,
  Filter,
  Download,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Save,
  X,
  DollarSign,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Activity,
  Beaker,
  Dna,
  Heart,
  Brain,
  Stethoscope,
  Microscope,
  FileText,
  Settings,
  TrendingUp,
  Users,
  Building,
  Star,
  Zap,
  Target,
  Shield,
  Loader2
} from 'lucide-react';

const TestServiceEntry = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [formData, setFormData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    department: '',
    priceRange: ''
  });

  // Mock data for demonstration
  const mockTests = [
    {
      id: 1,
      name: 'Complete Blood Count (CBC)',
      code: 'CBC001',
      category: 'Hematology',
      department: 'Hematology Department',
      description: 'Comprehensive blood test measuring red cells, white cells, and platelets',
      price: 45.00,
      duration: 30,
      sampleType: 'Blood',
      preparation: 'Fasting required for 8-12 hours',
      status: 'active',
      popularity: 95,
      accuracy: 98,
      equipment: ['Automated Cell Counter', 'Microscope'],
      requirements: ['Fasting', 'No alcohol 24hrs before'],
      normalRange: 'RBC: 4.5-5.5 M/uL, WBC: 4.5-11.0 K/uL, Platelets: 150-450 K/uL',
      abnormalIndicators: ['Anemia', 'Infection', 'Leukemia', 'Inflammation'],
      frequency: 'Common',
      insuranceCoverage: 'Most insurance plans',
      lastUpdated: '2024-01-15',
      createdBy: 'Dr. Lisa Anderson'
    },
    {
      id: 2,
      name: 'Comprehensive Metabolic Panel',
      code: 'CMP002',
      category: 'Biochemistry',
      department: 'Biochemistry Laboratory',
      description: 'Comprehensive test measuring kidney function, liver function, electrolytes, and glucose',
      price: 65.00,
      duration: 45,
      sampleType: 'Blood',
      preparation: 'Fasting required for 10-12 hours',
      status: 'active',
      popularity: 88,
      accuracy: 96,
      equipment: ['Auto Analyzer', 'Spectrophotometer'],
      requirements: ['Fasting', 'No caffeine'],
      normalRange: 'Glucose: 70-100 mg/dL, Creatinine: 0.6-1.3 mg/dL',
      abnormalIndicators: ['Kidney disease', 'Liver disease', 'Diabetes', 'Electrolyte imbalance'],
      frequency: 'Common',
      insuranceCoverage: 'Most insurance plans',
      lastUpdated: '2024-01-20',
      createdBy: 'Dr. Emily Davis'
    },
    {
      id: 3,
      name: 'X-Ray Chest PA/Lateral',
      code: 'XRY003',
      category: 'Radiology',
      department: 'Radiology Department',
      description: 'Radiographic examination of chest organs including heart, lungs, and major vessels',
      price: 120.00,
      duration: 15,
      sampleType: 'Imaging',
      preparation: 'Remove jewelry and metallic objects',
      status: 'active',
      popularity: 92,
      accuracy: 94,
      equipment: ['X-Ray Machine', 'Digital Detector'],
      requirements: ['No metallic objects', 'Pregnancy check'],
      normalRange: 'Clear lung fields, normal heart size, no fractures',
      abnormalIndicators: ['Pneumonia', 'Heart failure', 'Fractures', 'Tumors'],
      frequency: 'Common',
      insuranceCoverage: 'Most insurance plans',
      lastUpdated: '2024-01-10',
      createdBy: 'Dr. Michael Chen'
    },
    {
      id: 4,
      name: 'Urinalysis Complete',
      code: 'URN004',
      category: 'Microbiology',
      department: 'Microbiology Laboratory',
      description: 'Complete examination of urine for physical, chemical, and microscopic properties',
      price: 25.00,
      duration: 20,
      sampleType: 'Urine',
      preparation: 'Clean catch midstream sample, first morning sample preferred',
      status: 'active',
      popularity: 78,
      accuracy: 92,
      equipment: ['Urine Analyzer', 'Microscope'],
      requirements: ['Clean catch sample', 'First morning sample'],
      normalRange: 'Color: Pale yellow, pH: 4.5-8.0, Specific gravity: 1.003-1.035',
      abnormalIndicators: ['UTI', 'Kidney stones', 'Diabetes', 'Dehydration'],
      frequency: 'Common',
      insuranceCoverage: 'Most insurance plans',
      lastUpdated: '2024-01-18',
      createdBy: 'Dr. James Wilson'
    },
    {
      id: 5,
      name: 'MRI Brain with Contrast',
      code: 'MRI005',
      category: 'Radiology',
      department: 'Radiology Department',
      description: 'Detailed imaging of brain structures using magnetic resonance with contrast enhancement',
      price: 850.00,
      duration: 45,
      sampleType: 'Imaging',
      preparation: 'Fasting 4 hours, remove metallic objects',
      status: 'active',
      popularity: 65,
      accuracy: 99,
      equipment: ['MRI Machine', 'Contrast Injector'],
      requirements: ['Fasting', 'No metallic implants', 'Screen for claustrophobia'],
      normalRange: 'Normal brain anatomy, no lesions or abnormalities',
      abnormalIndicators: ['Tumors', 'Stroke', 'Multiple sclerosis', 'Brain injury'],
      frequency: 'Specialized',
      insuranceCoverage: 'Requires pre-authorization',
      lastUpdated: '2024-01-22',
      createdBy: 'Dr. Michael Chen'
    },
    {
      id: 6,
      name: 'HbA1c (Glycated Hemoglobin)',
      code: 'HBA006',
      category: 'Biochemistry',
      department: 'Biochemistry Laboratory',
      description: 'Test measuring average blood glucose levels over past 2-3 months',
      price: 35.00,
      duration: 15,
      sampleType: 'Blood',
      preparation: 'No special preparation required',
      status: 'active',
      popularity: 82,
      accuracy: 97,
      equipment: ['HPLC Analyzer', 'Immunoassay Analyzer'],
      requirements: ['No fasting required'],
      normalRange: 'Below 5.7%',
      abnormalIndicators: ['Diabetes', 'Prediabetes', 'Poor glucose control'],
      frequency: 'Common',
      insuranceCoverage: 'Most insurance plans',
      lastUpdated: '2024-01-25',
      createdBy: 'Dr. Emily Davis'
    },
    {
      id: 7,
      name: 'Culture and Sensitivity',
      code: 'CUL007',
      category: 'Microbiology',
      department: 'Microbiology Laboratory',
      description: 'Culture of microorganisms and antibiotic sensitivity testing',
      price: 55.00,
      duration: 72,
      sampleType: 'Various',
      preparation: 'Proper sample collection technique',
      status: 'active',
      popularity: 70,
      accuracy: 95,
      equipment: ['Incubator', 'Culture Media', 'Microscope'],
      requirements: ['Sterile collection', 'Proper transport'],
      normalRange: 'No pathogenic growth',
      abnormalIndicators: ['Bacterial infection', 'Antibiotic resistance'],
      frequency: 'Common',
      insuranceCoverage: 'Most insurance plans',
      lastUpdated: '2024-01-28',
      createdBy: 'Dr. James Wilson'
    },
    {
      id: 8,
      name: 'Echocardiogram 2D',
      code: 'ECHO008',
      category: 'Cardiology',
      department: 'Cardiology Department',
      description: 'Ultrasound examination of heart structure and function',
      price: 250.00,
      duration: 30,
      sampleType: 'Imaging',
      preparation: 'Wear loose clothing, avoid caffeine',
      status: 'active',
      popularity: 75,
      accuracy: 96,
      equipment: ['Ultrasound Machine', 'ECG Machine'],
      requirements: ['Loose clothing', 'No heavy meal'],
      normalRange: 'Normal cardiac function, normal valve structure',
      abnormalIndicators: ['Heart failure', 'Valve disease', 'Congenital defects'],
      frequency: 'Specialized',
      insuranceCoverage: 'Most insurance plans',
      lastUpdated: '2024-01-30',
      createdBy: 'Dr. Sarah Johnson'
    }
  ];

  const categories = [
    'Hematology',
    'Biochemistry',
    'Radiology',
    'Microbiology',
    'Cardiology',
    'Immunology',
    'Pathology',
    'Molecular Diagnostics'
  ];

  const departments = [
    'Hematology Department',
    'Biochemistry Laboratory',
    'Radiology Department',
    'Microbiology Laboratory',
    'Cardiology Department',
    'Immunology Laboratory',
    'Pathology Laboratory'
  ];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setTests(mockTests);
      setLoading(false);
      addNotification('Test services loaded successfully', 'success');
    }, 1000);
  }, []);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleAddTest = () => {
    const newTest = {
      id: Date.now(),
      ...formData,
      popularity: 0,
      accuracy: 95,
      lastUpdated: new Date().toISOString().split('T')[0],
      createdBy: 'Current User'
    };
    setTests([...tests, newTest]);
    setShowAddModal(false);
    setFormData({});
    addNotification('Test service added successfully', 'success');
  };

  const handleEditTest = () => {
    setTests(tests.map(test => 
      test.id === selectedTest.id 
        ? { ...test, ...formData, lastUpdated: new Date().toISOString().split('T')[0] }
        : test
    ));
    setShowEditModal(false);
    setSelectedTest(null);
    setFormData({});
    addNotification('Test service updated successfully', 'success');
  };

  const handleDeleteTest = (id) => {
    setTests(tests.filter(test => test.id !== id));
    addNotification('Test service deleted successfully', 'success');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-red-600 bg-red-100';
      case 'maintenance': return 'text-orange-600 bg-orange-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPopularityColor = (popularity) => {
    if (popularity >= 90) return 'text-green-600 bg-green-100';
    if (popularity >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getAccuracyColor = (accuracy) => {
    if (accuracy >= 95) return 'text-green-600 bg-green-100';
    if (accuracy >= 90) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Hematology': return <Dna className="w-4 h-4" />;
      case 'Biochemistry': return <Beaker className="w-4 h-4" />;
      case 'Radiology': return <Activity className="w-4 h-4" />;
      case 'Microbiology': return <Microscope className="w-4 h-4" />;
      case 'Cardiology': return <Heart className="w-4 h-4" />;
      case 'Immunology': return <Shield className="w-4 h-4" />;
      case 'Pathology': return <Stethoscope className="w-4 h-4" />;
      default: return <TestTube className="w-4 h-4" />;
    }
  };

  const filteredTests = tests.filter(test => {
    const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         test.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !filters.category || test.category === filters.category;
    const matchesStatus = !filters.status || test.status === filters.status;
    const matchesDepartment = !filters.department || test.department === filters.department;
    const matchesPriceRange = !filters.priceRange || 
      (filters.priceRange === 'low' && test.price < 50) ||
      (filters.priceRange === 'medium' && test.price >= 50 && test.price < 200) ||
      (filters.priceRange === 'high' && test.price >= 200);
    
    return matchesSearch && matchesCategory && matchesStatus && matchesDepartment && matchesPriceRange;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading test services...</span>
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
            <div className="p-3 bg-gradient-to-r from-green-500 to-green-600 rounded-xl">
              <TestTube className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Test/Service Entry</h1>
              <p className="text-gray-600">Manage laboratory tests and diagnostic services</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search tests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
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
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Test
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
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                <select
                  value={filters.department}
                  onChange={(e) => setFilters({...filters, department: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price Range</label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => setFilters({...filters, priceRange: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="">All Prices</option>
                  <option value="low">Low (&lt;$50)</option>
                  <option value="medium">Medium ($50-$200)</option>
                  <option value="high">High (&gt;$200)</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => setFilters({ category: '', status: '', department: '', priceRange: '' })}
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
          { label: 'Total Tests', value: tests.length, icon: TestTube, color: 'from-green-500 to-green-600' },
          { label: 'Active Tests', value: tests.filter(t => t.status === 'active').length, icon: CheckCircle, color: 'from-blue-500 to-blue-600' },
          { label: 'Avg Price', value: `$${Math.round(tests.reduce((sum, t) => sum + t.price, 0) / tests.length)}`, icon: DollarSign, color: 'from-purple-500 to-purple-600' },
          { label: 'Categories', value: categories.length, icon: Target, color: 'from-orange-500 to-orange-600' }
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

      {/* Tests Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Test Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Department
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Duration
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Metrics
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTests.map((test, index) => (
                <motion.tr
                  key={test.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        {getCategoryIcon(test.category)}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{test.name}</div>
                        <div className="text-sm text-gray-500">{test.code}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{test.category}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm text-gray-900">{test.department}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="text-sm font-medium text-gray-900">${test.price.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Clock className="w-4 h-4 mr-1" />
                      {test.duration} min
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPopularityColor(test.popularity)}`}>
                        {test.popularity}% popular
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getAccuracyColor(test.accuracy)}`}>
                        {test.accuracy}% accurate
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(test.status)}`}>
                      {test.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedTest(test);
                          setShowViewModal(true);
                        }}
                        className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-1 rounded"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTest(test);
                          setFormData(test);
                          setShowEditModal(true);
                        }}
                        className="text-gray-600 hover:text-green-600 hover:bg-green-50 p-1 rounded"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteTest(test.id)}
                        className="text-gray-600 hover:text-red-600 hover:bg-red-50 p-1 rounded"
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
      </motion.div>

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
              className="bg-white rounded-xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold text-gray-900">
                    {showAddModal ? 'Add Test Service' : 'Edit Test Service'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      setFormData({});
                      setSelectedTest(null);
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Test Name *</label>
                    <input
                      type="text"
                      value={formData.name || ''}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Test Code *</label>
                    <input
                      type="text"
                      value={formData.code || ''}
                      onChange={(e) => setFormData({...formData, code: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                    <select
                      value={formData.category || ''}
                      onChange={(e) => setFormData({...formData, category: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Department *</label>
                    <select
                      value={formData.department || ''}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Department</option>
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price || ''}
                      onChange={(e) => setFormData({...formData, price: parseFloat(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes) *</label>
                    <input
                      type="number"
                      value={formData.duration || ''}
                      onChange={(e) => setFormData({...formData, duration: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sample Type *</label>
                    <input
                      type="text"
                      value={formData.sampleType || ''}
                      onChange={(e) => setFormData({...formData, sampleType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="e.g., Blood, Urine, Imaging"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <select
                      value={formData.status || 'active'}
                      onChange={(e) => setFormData({...formData, status: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="maintenance">Maintenance</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
                    <textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({...formData, description: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Preparation Instructions</label>
                    <textarea
                      value={formData.preparation || ''}
                      onChange={(e) => setFormData({...formData, preparation: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Normal Range</label>
                    <textarea
                      value={formData.normalRange || ''}
                      onChange={(e) => setFormData({...formData, normalRange: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      setFormData({});
                      setSelectedTest(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={showAddModal ? handleAddTest : handleEditTest}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {showAddModal ? 'Add Test' : 'Update Test'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedTest && (
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
                  <h2 className="text-xl font-bold text-gray-900">Test Service Details</h2>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      setSelectedTest(null);
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
                        <span className="text-sm text-gray-600">Test Name:</span>
                        <div className="font-medium">{selectedTest.name}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Test Code:</span>
                        <div className="font-medium">{selectedTest.code}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Category:</span>
                        <div className="font-medium flex items-center">
                          {getCategoryIcon(selectedTest.category)}
                          <span className="ml-2">{selectedTest.category}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Department:</span>
                        <div className="font-medium">{selectedTest.department}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedTest.status)}`}>
                          {selectedTest.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Duration</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Price:</span>
                        <div className="font-medium text-lg">${selectedTest.price.toFixed(2)}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Duration:</span>
                        <div className="font-medium flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {selectedTest.duration} minutes
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Sample Type:</span>
                        <div className="font-medium">{selectedTest.sampleType}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Frequency:</span>
                        <div className="font-medium">{selectedTest.frequency}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Insurance Coverage:</span>
                        <div className="font-medium">{selectedTest.insuranceCoverage}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Popularity:</span>
                        <div className={`font-medium ${getPopularityColor(selectedTest.popularity).split(' ')[0]}`}>
                          {selectedTest.popularity}% popular
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Accuracy:</span>
                        <div className={`font-medium ${getAccuracyColor(selectedTest.accuracy).split(' ')[0]}`}>
                          {selectedTest.accuracy}% accurate
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Last Updated:</span>
                        <div className="font-medium">{new Date(selectedTest.lastUpdated).toLocaleDateString()}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Created By:</span>
                        <div className="font-medium">{selectedTest.createdBy}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Requirements</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Preparation:</span>
                        <div className="font-medium bg-gray-50 p-2 rounded">{selectedTest.preparation}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Requirements:</span>
                        <div className="flex flex-wrap gap-2">
                          {selectedTest.requirements.map((req, index) => (
                            <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">{selectedTest.description}</p>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Normal Range</h4>
                      <div className="bg-gray-50 p-3 rounded text-sm">
                        {selectedTest.normalRange}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Abnormal Indicators</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTest.abnormalIndicators.map((indicator, index) => (
                          <span key={index} className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded">
                            {indicator}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Equipment Used</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {selectedTest.equipment.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                        <Settings className="w-4 h-4 text-green-600" />
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

export default TestServiceEntry;
