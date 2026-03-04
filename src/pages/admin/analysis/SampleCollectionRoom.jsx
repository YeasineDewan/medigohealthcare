import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Activity,
  Search,
  Filter,
  Download,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Save,
  X,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
  Users,
  MapPin,
  Bed,
  Stethoscope,
  Syringe,
  TestTube,
  FlaskConical,
  Package,
  Thermometer,
  Snowflake,
  Droplets,
  Zap,
  Target,
  Shield,
  Loader2,
  User,
  FileText,
  TrendingUp,
  AlertTriangle,
  Info,
  Phone,
  Mail,
  Building,
  Settings,
  Heart,
  Brain,
  Dna,
  Microscope,
  Beaker,
  QrCode,
  Barcode,
  Tag
} from 'lucide-react';

const SampleCollectionRoom = () => {
  const [collections, setCollections] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [showStaffModal, setShowStaffModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [formData, setFormData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [activeTab, setActiveTab] = useState('collections');
  const [filters, setFilters] = useState({
    status: '',
    type: '',
    room: '',
    priority: ''
  });

  // Mock data for demonstration
  const mockCollections = [
    {
      id: 1,
      collectionId: 'COL001',
      patientId: 'P2024001',
      patientName: 'John Smith',
      patientAge: 45,
      patientGender: 'Male',
      specimenType: 'Blood',
      testRequested: 'Complete Blood Count',
      collectionType: 'Venipuncture',
      collectionRoom: 'Room A-101',
      collectionDate: '2024-01-30',
      collectionTime: '08:30',
      scheduledTime: '08:00',
      collectedBy: 'Nurse Sarah Johnson',
      technicianId: 'T001',
      technicianName: 'Lisa Anderson',
      status: 'completed',
      priority: 'routine',
      volume: '5 mL',
      container: 'EDTA Tube',
      notes: 'Patient fasting for 12 hours',
      specialInstructions: 'Use butterfly needle',
      difficulty: 'easy',
      patientCondition: 'stable',
      fastingStatus: 'yes',
      allergies: 'Penicillin',
      medications: 'Lisinopril',
      lastMeal: '2024-01-29 20:00',
      barcode: 'BC001234567',
      qrCode: 'QR001234567',
      department: 'Hematology Department',
      referralDoctor: 'Dr. Michael Chen',
      insuranceStatus: 'verified',
      paymentStatus: 'paid',
      complications: null,
      followUpRequired: false
    },
    {
      id: 2,
      collectionId: 'COL002',
      patientId: 'P2024002',
      patientName: 'Emily Davis',
      patientAge: 32,
      patientGender: 'Female',
      specimenType: 'Urine',
      testRequested: 'Urinalysis Complete',
      collectionType: 'Clean Catch',
      collectionRoom: 'Room A-102',
      collectionDate: '2024-01-30',
      collectionTime: '09:15',
      scheduledTime: '09:00',
      collectedBy: 'Nurse Michael Chen',
      technicianId: 'T002',
      technicianName: 'James Wilson',
      status: 'in-progress',
      priority: 'routine',
      volume: '50 mL',
      container: 'Sterile Container',
      notes: 'First morning sample',
      specialInstructions: 'Midstream clean catch',
      difficulty: 'easy',
      patientCondition: 'stable',
      fastingStatus: 'no',
      allergies: 'None',
      medications: 'Vitamin D',
      lastMeal: '2024-01-30 07:00',
      barcode: 'BC001234568',
      qrCode: 'QR001234568',
      department: 'Biochemistry Laboratory',
      referralDoctor: 'Dr. Emily Davis',
      insuranceStatus: 'verified',
      paymentStatus: 'paid',
      complications: null,
      followUpRequired: false
    },
    {
      id: 3,
      collectionId: 'COL003',
      patientId: 'P2024003',
      patientName: 'Robert Wilson',
      patientAge: 67,
      patientGender: 'Male',
      specimenType: 'Blood',
      testRequested: 'Comprehensive Metabolic Panel',
      collectionType: 'Venipuncture',
      collectionRoom: 'Room A-103',
      collectionDate: '2024-01-30',
      collectionTime: '07:45',
      scheduledTime: '07:30',
      collectedBy: 'Nurse Lisa Anderson',
      technicianId: 'T003',
      technicianName: 'Sarah Johnson',
      status: 'completed',
      priority: 'urgent',
      volume: '10 mL',
      container: 'Serum Separator Tube',
      notes: 'Patient on medication monitoring',
      specialInstructions: 'Use 21G needle',
      difficulty: 'moderate',
      patientCondition: 'stable',
      fastingStatus: 'yes',
      allergies: 'Sulfa drugs',
      medications: 'Metformin, Amlodipine',
      lastMeal: '2024-01-29 19:00',
      barcode: 'BC001234569',
      qrCode: 'QR001234569',
      department: 'Biochemistry Laboratory',
      referralDoctor: 'Dr. Robert Taylor',
      insuranceStatus: 'verified',
      paymentStatus: 'paid',
      complications: 'Minor bruising',
      followUpRequired: true
    },
    {
      id: 4,
      collectionId: 'COL004',
      patientId: 'P2024004',
      patientName: 'Maria Garcia',
      patientAge: 28,
      patientGender: 'Female',
      specimenType: 'Tissue',
      testRequested: 'Histopathology Examination',
      collectionType: 'Biopsy',
      collectionRoom: 'Room B-201',
      collectionDate: '2024-01-30',
      collectionTime: '10:00',
      scheduledTime: '09:30',
      collectedBy: 'Dr. Robert Taylor',
      technicianId: 'T004',
      technicianName: 'Emily Davis',
      status: 'scheduled',
      priority: 'urgent',
      volume: '2 cm³',
      container: 'Formalin Jar',
      notes: 'Biopsy from left breast lesion',
      specialInstructions: 'Sterile technique required',
      difficulty: 'complex',
      patientCondition: 'anxious',
      fastingStatus: 'no',
      allergies: 'Latex',
      medications: 'Ibuprofen',
      lastMeal: '2024-01-30 06:30',
      barcode: 'BC001234570',
      qrCode: 'QR001234570',
      department: 'Pathology Laboratory',
      referralDoctor: 'Dr. Sarah Johnson',
      insuranceStatus: 'pending',
      paymentStatus: 'pending',
      complications: null,
      followUpRequired: true
    },
    {
      id: 5,
      collectionId: 'COL005',
      patientId: 'P2024005',
      patientName: 'James Brown',
      patientAge: 55,
      patientGender: 'Male',
      specimenType: 'Blood',
      testRequested: 'Culture and Sensitivity',
      collectionType: 'Venipuncture',
      collectionRoom: 'Room A-104',
      collectionDate: '2024-01-30',
      collectionTime: '11:30',
      scheduledTime: '11:00',
      collectedBy: 'Nurse Emily Davis',
      technicianId: 'T005',
      technicianName: 'Michael Chen',
      status: 'in-progress',
      priority: 'urgent',
      volume: '5 mL',
      container: 'Blood Culture Bottle',
      notes: 'Suspected sepsis',
      specialInstructions: 'Aseptic technique critical',
      difficulty: 'moderate',
      patientCondition: 'febrile',
      fastingStatus: 'no',
      allergies: 'None',
      medications: 'Antibiotics',
      lastMeal: '2024-01-30 08:00',
      barcode: 'BC001234571',
      qrCode: 'QR001234571',
      department: 'Microbiology Laboratory',
      referralDoctor: 'Dr. James Wilson',
      insuranceStatus: 'verified',
      paymentStatus: 'paid',
      complications: null,
      followUpRequired: false
    }
  ];

  const mockRooms = [
    {
      id: 1,
      roomId: 'A-101',
      name: 'Main Collection Room A',
      type: 'General Collection',
      location: 'Building A, Floor 1',
      capacity: 4,
      currentOccupancy: 2,
      status: 'active',
      equipment: ['Phlebotomy Chairs', 'Refrigerator', 'Centrifuge', 'Computer Station'],
      supplies: ['Needles 21G', 'Needles 22G', 'EDTA Tubes', 'Tourniquets', 'Alcohol Swabs'],
      staffAssigned: ['Sarah Johnson', 'Lisa Anderson'],
      operatingHours: '07:00 - 19:00',
      emergencyKit: true,
      biohazardDisposal: true,
      handwashingStation: true,
      temperatureControl: true,
      lastInspection: '2024-01-15',
      nextInspection: '2024-04-15',
      notes: 'Primary collection room for routine tests'
    },
    {
      id: 2,
      roomId: 'A-102',
      name: 'Pediatric Collection Room',
      type: 'Pediatric',
      location: 'Building A, Floor 1',
      capacity: 2,
      currentOccupancy: 1,
      status: 'active',
      equipment: ['Pediatric Chairs', 'Toys', 'Distraction Tools', 'Warm Light'],
      supplies: ['Butterfly Needles', 'Small Tubes', 'Colorful Bandages', 'Stickers'],
      staffAssigned: ['Michael Chen'],
      operatingHours: '08:00 - 17:00',
      emergencyKit: true,
      biohazardDisposal: true,
      handwashingStation: true,
      temperatureControl: true,
      lastInspection: '2024-01-20',
      nextInspection: '2024-04-20',
      notes: 'Specialized for pediatric patients'
    },
    {
      id: 3,
      roomId: 'A-103',
      name: 'Urgent Care Collection',
      type: 'Emergency',
      location: 'Building A, Floor 1',
      capacity: 3,
      currentOccupancy: 1,
      status: 'active',
      equipment: ['Emergency Bed', 'Crash Cart', 'Portable X-Ray', 'Monitoring Equipment'],
      supplies: ['IV Supplies', 'Emergency Medications', 'Oxygen Tank', 'Defibrillator'],
      staffAssigned: ['Lisa Anderson', 'Sarah Johnson'],
      operatingHours: '24/7',
      emergencyKit: true,
      biohazardDisposal: true,
      handwashingStation: true,
      temperatureControl: true,
      lastInspection: '2024-01-10',
      nextInspection: '2024-04-10',
      notes: 'For emergency and urgent collections'
    },
    {
      id: 4,
      roomId: 'B-201',
      name: 'Special Procedures Room',
      type: 'Special Procedures',
      location: 'Building B, Floor 2',
      capacity: 2,
      currentOccupancy: 0,
      status: 'maintenance',
      equipment: ['Surgical Lights', 'Procedure Table', 'Ultrasound Machine', 'Sterile Field'],
      supplies: ['Surgical Instruments', 'Sterile Drapes', 'Local Anesthetics', 'Sutures'],
      staffAssigned: ['Robert Taylor'],
      operatingHours: '08:00 - 16:00',
      emergencyKit: true,
      biohazardDisposal: true,
      handwashingStation: true,
      temperatureControl: true,
      lastInspection: '2024-01-25',
      nextInspection: '2024-04-25',
      notes: 'For biopsies and complex procedures'
    }
  ];

  const mockStaff = [
    {
      id: 1,
      staffId: 'T001',
      name: 'Sarah Johnson',
      role: 'Senior Phlebotomist',
      department: 'Collection Services',
      email: 'sarah.johnson@hospital.com',
      phone: '+1-234-567-8901',
      certification: 'CPT (Certified Phlebotomy Technician)',
      experience: 8,
      specializations: ['Pediatric Phlebotomy', 'Difficult Draws', 'Training'],
      assignedRoom: 'A-101',
      status: 'active',
      schedule: 'Mon-Fri 07:00-15:00',
      totalCollections: 2450,
      successRate: 98.5,
      patientSatisfaction: 4.8,
      lastTraining: '2024-01-15',
      nextCertification: '2025-06-30',
      skills: ['Venipuncture', 'Capillary Collection', 'Arterial Draws', 'PICC Line Maintenance']
    },
    {
      id: 2,
      staffId: 'T002',
      name: 'Michael Chen',
      role: 'Phlebotomist',
      department: 'Collection Services',
      email: 'michael.chen@hospital.com',
      phone: '+1-234-567-8902',
      certification: 'CPT (Certified Phlebotomy Technician)',
      experience: 4,
      specializations: ['Routine Collections', 'Geriatric Care'],
      assignedRoom: 'A-102',
      status: 'active',
      schedule: 'Mon-Fri 08:00-16:00',
      totalCollections: 1200,
      successRate: 96.2,
      patientSatisfaction: 4.6,
      lastTraining: '2024-01-10',
      nextCertification: '2025-12-15',
      skills: ['Venipuncture', 'Urine Collection', 'Swab Collection']
    },
    {
      id: 3,
      staffId: 'T003',
      name: 'Lisa Anderson',
      role: 'Lead Phlebotomist',
      department: 'Collection Services',
      email: 'lisa.anderson@hospital.com',
      phone: '+1-234-567-8903',
      certification: 'CPT (Certified Phlebotomy Technician)',
      experience: 12,
      specializations: ['Training', 'Quality Control', 'Emergency Collections'],
      assignedRoom: 'A-103',
      status: 'active',
      schedule: 'Mon-Fri 07:00-19:00',
      totalCollections: 3800,
      successRate: 99.1,
      patientSatisfaction: 4.9,
      lastTraining: '2024-01-20',
      nextCertification: '2025-08-30',
      skills: ['Venipuncture', 'Arterial Draws', 'PICC Line', 'Training', 'Quality Assurance']
    },
    {
      id: 4,
      staffId: 'T004',
      name: 'Emily Davis',
      role: 'Phlebotomist',
      department: 'Collection Services',
      email: 'emily.davis@hospital.com',
      phone: '+1-234-567-8904',
      certification: 'CPT (Certified Phlebotomy Technician)',
      experience: 3,
      specializations: ['Patient Care', 'Documentation'],
      assignedRoom: 'B-201',
      status: 'active',
      schedule: 'Mon-Fri 08:00-16:00',
      totalCollections: 850,
      successRate: 94.8,
      patientSatisfaction: 4.5,
      lastTraining: '2024-01-05',
      nextCertification: '2026-01-15',
      skills: ['Venipuncture', 'Specimen Processing', 'Patient Communication']
    }
  ];

  const specimenTypes = ['Blood', 'Urine', 'Tissue', 'Swab', 'CSF', 'Saliva', 'Stool', 'Semen'];
  const collectionTypes = ['Venipuncture', 'Clean Catch', 'Biopsy', 'Arterial Draw', 'Capillary', 'Lumbar Puncture'];

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setCollections(mockCollections);
      setRooms(mockRooms);
      setStaff(mockStaff);
      setLoading(false);
      addNotification('Sample collection data loaded successfully', 'success');
    }, 1000);
  }, []);

  const addNotification = (message, type = 'info') => {
    const id = Date.now();
    setNotifications(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== id));
    }, 5000);
  };

  const handleAddCollection = () => {
    const newCollection = {
      id: Date.now(),
      collectionId: `COL${String(Date.now()).slice(-3)}`,
      ...formData,
      collectionDate: new Date().toISOString().split('T')[0],
      collectionTime: new Date().toTimeString().slice(0, 5),
      status: 'scheduled',
      barcode: `BC${String(Date.now()).slice(-6)}`,
      qrCode: `QR${String(Date.now()).slice(-6)}`
    };
    setCollections([...collections, newCollection]);
    setShowAddModal(false);
    setFormData({});
    addNotification('Collection scheduled successfully', 'success');
  };

  const handleEditCollection = () => {
    setCollections(collections.map(collection => 
      collection.id === selectedItem.id 
        ? { ...collection, ...formData }
        : collection
    ));
    setShowEditModal(false);
    setSelectedItem(null);
    setFormData({});
    addNotification('Collection updated successfully', 'success');
  };

  const handleDeleteCollection = (id) => {
    setCollections(collections.filter(collection => collection.id !== id));
    addNotification('Collection deleted successfully', 'success');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'text-blue-600 bg-blue-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-red-600 bg-red-100';
      case 'high': return 'text-orange-600 bg-orange-100';
      case 'routine': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600 bg-green-100';
      case 'moderate': return 'text-yellow-600 bg-yellow-100';
      case 'complex': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSpecimenIcon = (type) => {
    switch (type) {
      case 'Blood': return <Droplets className="w-4 h-4" />;
      case 'Urine': return <TestTube className="w-4 h-4" />;
      case 'Tissue': return <Dna className="w-4 h-4" />;
      case 'Swab': return <TestTube className="w-4 h-4" />;
      default: return <FlaskConical className="w-4 h-4" />;
    }
  };

  const filteredCollections = collections.filter(collection => {
    const matchesSearch = collection.collectionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collection.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         collection.testRequested.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = !filters.status || collection.status === filters.status;
    const matchesType = !filters.type || collection.specimenType === filters.type;
    const matchesRoom = !filters.room || collection.collectionRoom === filters.room;
    const matchesPriority = !filters.priority || collection.priority === filters.priority;
    
    return matchesSearch && matchesStatus && matchesType && matchesRoom && matchesPriority;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        <span className="ml-2 text-gray-600">Loading collection room data...</span>
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
            <div className="p-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl">
              <Activity className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Sample Collection Room</h1>
              <p className="text-gray-600">Manage sample collection Rooms, staff, and patient collections</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search collections..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
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
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Schedule Collection
            </button>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="flex space-x-1 bg-gray-100 p-1 rounded-xl">
          {[
            { id: 'collections', name: 'Collections', icon: Activity, count: collections.length },
            { id: 'rooms', name: 'Rooms', icon: Bed, count: rooms.length },
            { id: 'staff', name: 'Staff', icon: Users, count: staff.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg transform scale-105'
                  : 'text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span className="font-medium">{tab.name}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${
                activeTab === tab.id ? 'bg-white bg-opacity-20' : 'bg-gray-200'
              }`}>
                {tab.count}
              </span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Filters */}
      <AnimatePresence>
        {showFilters && activeTab === 'collections' && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-white rounded-lg shadow-lg border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Specimen Type</label>
                <select
                  value={filters.type}
                  onChange={(e) => setFilters({...filters, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">All Types</option>
                  {specimenTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Room</label>
                <select
                  value={filters.room}
                  onChange={(e) => setFilters({...filters, room: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">All Rooms</option>
                  {rooms.map(room => (
                    <option key={room.roomId} value={room.roomId}>{room.roomId}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={filters.priority}
                  onChange={(e) => setFilters({...filters, priority: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                >
                  <option value="">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="routine">Routine</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={() => setFilters({ status: '', type: '', room: '', priority: '' })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collections Tab */}
      {activeTab === 'collections' && (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: 'Total Collections', value: collections.length, icon: Activity, color: 'from-red-500 to-red-600' },
              { label: 'Today Completed', value: collections.filter(c => c.status === 'completed').length, icon: CheckCircle, color: 'from-green-500 to-green-600' },
              { label: 'In Progress', value: collections.filter(c => c.status === 'in-progress').length, icon: Clock, color: 'from-yellow-500 to-yellow-600' },
              { label: 'Urgent Cases', value: collections.filter(c => c.priority === 'urgent').length, icon: AlertTriangle, color: 'from-orange-500 to-orange-600' }
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

          {/* Collections Table */}
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
                      Collection Info
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Patient
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Test Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Schedule
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Priority
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredCollections.map((collection, index) => (
                    <motion.tr
                      key={collection.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="p-2 bg-red-100 rounded-lg">
                            {getSpecimenIcon(collection.specimenType)}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{collection.collectionId}</div>
                            <div className="text-sm text-gray-500">{collection.collectionType}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{collection.patientName}</div>
                          <div className="text-sm text-gray-500">{collection.patientAge}y, {collection.patientGender}</div>
                          <div className="text-xs text-gray-400">{collection.patientId}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{collection.testRequested}</div>
                          <div className="text-sm text-gray-500">{collection.specimenType}</div>
                          <div className="text-xs text-gray-400">{collection.volume} in {collection.container}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">{collection.collectionDate}</div>
                          <div className="text-sm text-gray-500">{collection.scheduledTime}</div>
                          <div className="text-xs text-gray-400">{collection.collectionRoom}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(collection.status)}`}>
                          {collection.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(collection.priority)}`}>
                          {collection.priority}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => {
                              setSelectedItem(collection);
                              setShowViewModal(true);
                            }}
                            className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 p-1 rounded"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedItem(collection);
                              setFormData(collection);
                              setShowEditModal(true);
                            }}
                            className="text-gray-600 hover:text-green-600 hover:bg-green-50 p-1 rounded"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCollection(collection.id)}
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
        </div>
      )}

      {/* Rooms Tab */}
      {activeTab === 'rooms' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Collection Rooms</h2>
            <button
              onClick={() => setShowRoomModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Room
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room, index) => (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Bed className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{room.name}</h3>
                        <p className="text-sm text-gray-600">{room.roomId}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      room.status === 'active' ? 'text-green-600 bg-green-100' : 'text-orange-600 bg-orange-100'
                    }`}>
                      {room.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {room.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {room.currentOccupancy}/{room.capacity} occupied
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {room.operatingHours}
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{room.type}</span>
                      <div className="flex space-x-1">
                        {room.emergencyKit && <Shield className="w-4 h-4 text-green-500" />}
                        {room.biohazardDisposal && <AlertTriangle className="w-4 h-4 text-orange-500" />}
                        {room.temperatureControl && <Thermometer className="w-4 h-4 text-blue-500" />}
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-end space-x-2">
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Staff Tab */}
      {activeTab === 'staff' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Collection Staff</h2>
            <button
              onClick={() => setShowStaffModal(true)}
              className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Staff
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {staff.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-red-100 rounded-lg">
                        <Users className="w-6 h-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{member.name}</h3>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      member.status === 'active' ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                    }`}>
                      {member.status}
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {member.assignedRoom}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      {member.schedule}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Target className="w-4 h-4 mr-2" />
                      {member.totalCollections} collections
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-lg font-semibold text-green-600">{member.successRate}%</div>
                        <div className="text-xs text-gray-600">Success Rate</div>
                      </div>
                      <div>
                        <div className="text-lg font-semibold text-blue-600">{member.patientSatisfaction}</div>
                        <div className="text-xs text-gray-600">Satisfaction</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-end space-x-2">
                    <button className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Eye className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                      <Edit3 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Add/Edit Collection Modal */}
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
                    {showAddModal ? 'Schedule Collection' : 'Edit Collection'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      setFormData({});
                      setSelectedItem(null);
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
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name *</label>
                    <input
                      type="text"
                      value={formData.patientName || ''}
                      onChange={(e) => setFormData({...formData, patientName: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID *</label>
                    <input
                      type="text"
                      value={formData.patientId || ''}
                      onChange={(e) => setFormData({...formData, patientId: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <input
                      type="number"
                      value={formData.patientAge || ''}
                      onChange={(e) => setFormData({...formData, patientAge: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select
                      value={formData.patientGender || ''}
                      onChange={(e) => setFormData({...formData, patientGender: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specimen Type *</label>
                    <select
                      value={formData.specimenType || ''}
                      onChange={(e) => setFormData({...formData, specimenType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Type</option>
                      {specimenTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Collection Type *</label>
                    <select
                      value={formData.collectionType || ''}
                      onChange={(e) => setFormData({...formData, collectionType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Type</option>
                      {collectionTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Test Requested *</label>
                    <input
                      type="text"
                      value={formData.testRequested || ''}
                      onChange={(e) => setFormData({...formData, testRequested: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Collection Room *</label>
                    <select
                      value={formData.collectionRoom || ''}
                      onChange={(e) => setFormData({...formData, collectionRoom: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Room</option>
                      {rooms.map(room => (
                        <option key={room.roomId} value={room.roomId}>{room.roomId} - {room.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Date *</label>
                    <input
                      type="date"
                      value={formData.collectionDate || ''}
                      onChange={(e) => setFormData({...formData, collectionDate: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Scheduled Time *</label>
                    <input
                      type="time"
                      value={formData.scheduledTime || ''}
                      onChange={(e) => setFormData({...formData, scheduledTime: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                    <select
                      value={formData.priority || 'routine'}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="urgent">Urgent</option>
                      <option value="high">High</option>
                      <option value="routine">Routine</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Collected By</label>
                    <select
                      value={formData.collectedBy || ''}
                      onChange={(e) => setFormData({...formData, collectedBy: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    >
                      <option value="">Select Staff</option>
                      {staff.map(member => (
                        <option key={member.staffId} value={member.name}>{member.name} - {member.role}</option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                    <textarea
                      value={formData.notes || ''}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
                    <textarea
                      value={formData.specialInstructions || ''}
                      onChange={(e) => setFormData({...formData, specialInstructions: e.target.value})}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setShowEditModal(false);
                      setFormData({});
                      setSelectedItem(null);
                    }}
                    className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={showAddModal ? handleAddCollection : handleEditCollection}
                    className="px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    {showAddModal ? 'Schedule Collection' : 'Update Collection'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedItem && (
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
                  <h2 className="text-xl font-bold text-gray-900">Collection Details</h2>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      setSelectedItem(null);
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
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Collection Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Collection ID:</span>
                        <div className="font-medium flex items-center">
                          <Tag className="w-4 h-4 mr-1" />
                          {selectedItem.collectionId}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Type:</span>
                        <div className="font-medium flex items-center">
                          {getSpecimenIcon(selectedItem.specimenType)}
                          <span className="ml-2">{selectedItem.collectionType}</span>
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Specimen:</span>
                        <div className="font-medium">{selectedItem.specimenType}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Volume & Container:</span>
                        <div className="font-medium">{selectedItem.volume} in {selectedItem.container}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Status:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(selectedItem.status)}`}>
                          {selectedItem.status}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Patient Name:</span>
                        <div className="font-medium flex items-center">
                          <User className="w-4 h-4 mr-1" />
                          {selectedItem.patientName}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Patient Details:</span>
                        <div className="font-medium">{selectedItem.patientAge} years, {selectedItem.patientGender}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Patient ID:</span>
                        <div className="font-medium">{selectedItem.patientId}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Condition:</span>
                        <div className="font-medium">{selectedItem.patientCondition}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Fasting Status:</span>
                        <div className="font-medium">{selectedItem.fastingStatus}</div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Schedule & Location</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Collection Date:</span>
                        <div className="font-medium flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {selectedItem.collectionDate}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Scheduled Time:</span>
                        <div className="font-medium flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {selectedItem.scheduledTime}
                        </div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Collection Room:</span>
                        <div className="font-medium">{selectedItem.collectionRoom}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Collected By:</span>
                        <div className="font-medium">{selectedItem.collectedBy}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Priority:</span>
                        <span className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(selectedItem.priority)}`}>
                          {selectedItem.priority}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Medical Information</h3>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Test Requested:</span>
                        <div className="font-medium">{selectedItem.testRequested}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Referral Doctor:</span>
                        <div className="font-medium">{selectedItem.referralDoctor}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Allergies:</span>
                        <div className="font-medium">{selectedItem.allergies}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Medications:</span>
                        <div className="font-medium">{selectedItem.medications}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Last Meal:</span>
                        <div className="font-medium">{selectedItem.lastMeal}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Identification Codes</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Barcode className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">Barcode</span>
                      </div>
                      <div className="font-mono text-sm">{selectedItem.barcode}</div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <QrCode className="w-4 h-4 text-gray-600" />
                        <span className="text-sm font-medium text-gray-700">QR Code</span>
                      </div>
                      <div className="font-mono text-sm">{selectedItem.qrCode}</div>
                    </div>
                  </div>
                </div>

                {selectedItem.notes && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Notes</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700">{selectedItem.notes}</p>
                    </div>
                  </div>
                )}

                {selectedItem.specialInstructions && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Special Instructions</h3>
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <Info className="w-4 h-4 text-yellow-600 mt-0.5" />
                        <p className="text-gray-700">{selectedItem.specialInstructions}</p>
                      </div>
                    </div>
                  </div>
                )}

                {selectedItem.complications && (
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Complications</h3>
                    <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
                      <div className="flex items-start space-x-2">
                        <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5" />
                        <p className="text-gray-700">{selectedItem.complications}</p>
                      </div>
                    </div>
                  </div>
                )}
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

export default SampleCollectionRoom;
