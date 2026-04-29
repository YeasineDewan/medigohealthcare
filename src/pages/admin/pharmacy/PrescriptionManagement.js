import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Upload,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  User,
  Shield,
  TrendingUp,
  Users,
  ShoppingCart,
  Package,
  Star,
  ChevronRight,
  RefreshCw,
  Printer,
  Mail as MailIcon,
  MessageSquare,
  Bell,
  CheckSquare,
  XSquare,
  AlertTriangle,
  Info,
  Edit,
  Trash2,
  Save,
  X,
  Plus,
  Zap,
  Heart,
  Brain,
  Bone,
  Pill,
  TestTube
} from 'lucide-react';

const PrescriptionManagement = () => {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showInvestigationModal, setShowInvestigationModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Mock data for prescription orders
  const [prescriptionOrders, setPrescriptionOrders] = useState([
    {
      id: 1,
      patientName: 'Mohammad Ali',
      age: 45,
      gender: 'Male',
      phone: '+8801712345678',
      email: 'mohammad.ali@email.com',
      address: '123 Dhanmondi, Dhaka-1209',
      prescriptionFile: '/prescriptions/rx_001.jpg',
      prescriptionImage: 'https://picsum.photos/seed/rx001/400/300.jpg',
      medicines: [
        { 
          id: 1,
          name: 'Amoxicillin 500mg', 
          genericName: 'Amoxicillin Trihydrate',
          quantity: 14, 
          dosage: '1 capsule twice daily',
          duration: '7 days',
          status: 'pending_investigation',
          price: 180,
          manufacturer: 'Square Pharmaceutical',
          category: 'prescription',
          requiresInvestigation: true,
          alternatives: ['Azithromycin', 'Cephalexin', 'Clarithromycin'],
          sideEffects: ['Nausea', 'Diarrhea', 'Rash'],
          contraindications: ['Penicillin allergy']
        },
        { 
          id: 2,
          name: 'Paracetamol 500mg', 
          genericName: 'Acetaminophen',
          quantity: 20, 
          dosage: '1 tablet every 6 hours',
          duration: '5 days',
          status: 'approved',
          price: 45,
          manufacturer: 'Incepta Pharmaceuticals',
          category: 'otc',
          requiresInvestigation: false
        }
      ],
      orderDate: '2024-04-15T10:30:00',
      status: 'under_investigation',
      totalAmount: 2520,
      investigationNotes: 'Verifying prescription authenticity with Dr. Karim at Medical Center',
      pharmacistNotes: 'Patient history shows no allergies to penicillin. Blood pressure normal.',
      urgency: 'normal',
      deliveryMethod: 'home_delivery',
      paymentStatus: 'pending',
      doctorInfo: {
        name: 'Dr. Ahmed Karim',
        registration: 'BMDC-12345',
        specialization: 'General Medicine',
        hospital: 'Dhaka Medical Center',
        phone: '+8801812345678'
      },
      patientHistory: {
        allergies: 'None known',
        chronicConditions: 'Hypertension (controlled)',
        currentMedications: 'Amlodipine 5mg',
        lastVisit: '2024-04-10'
      }
    },
    {
      id: 2,
      patientName: 'Fatema Begum',
      age: 32,
      gender: 'Female',
      phone: '+8801812345678',
      email: 'fatema.begum@email.com',
      address: '456 Gulshan, Dhaka-1212',
      prescriptionFile: '/prescriptions/rx_002.jpg',
      prescriptionImage: 'https://picsum.photos/seed/rx002/400/300.jpg',
      medicines: [
        { 
          id: 3,
          name: 'Metformin 500mg', 
          genericName: 'Metformin HCl',
          quantity: 30, 
          dosage: '1 tablet twice daily',
          duration: '30 days',
          status: 'approved',
          price: 95,
          manufacturer: 'Beximco Pharma',
          category: 'diabetes',
          requiresInvestigation: false
        },
        { 
          id: 4,
          name: 'Vitamin D3 2000IU', 
          genericName: 'Cholecalciferol',
          quantity: 60, 
          dosage: '1 capsule daily',
          duration: '60 days',
          status: 'approved',
          price: 280,
          manufacturer: 'HealthTech Ltd.',
          category: 'vitamins',
          requiresInvestigation: false
        }
      ],
      orderDate: '2024-04-14T14:15:00',
      status: 'confirmed',
      totalAmount: 8550,
      investigationNotes: 'Prescription verified - Dr. Karim, Medical Center. Valid for 30 days.',
      pharmacistNotes: 'Regular diabetes medication. Patient has been on this treatment for 6 months.',
      urgency: 'normal',
      deliveryMethod: 'pickup',
      paymentStatus: 'paid',
      doctorInfo: {
        name: 'Dr. Ahmed Karim',
        registration: 'BMDC-12345',
        specialization: 'General Medicine',
        hospital: 'Dhaka Medical Center',
        phone: '+8801812345678'
      },
      patientHistory: {
        allergies: 'None known',
        chronicConditions: 'Type 2 Diabetes',
        currentMedications: 'Metformin, Vitamin D',
        lastVisit: '2024-04-01'
      }
    },
    {
      id: 3,
      patientName: 'Rahman Khan',
      age: 28,
      gender: 'Male',
      phone: '+8801912345678',
      email: 'rahman.khan@email.com',
      address: '789 Mirpur, Dhaka-1216',
      prescriptionFile: '/prescriptions/rx_003.jpg',
      prescriptionImage: 'https://picsum.photos/seed/rx003/400/300.jpg',
      medicines: [
        { 
          id: 5,
          name: 'Omeprazole 20mg', 
          genericName: 'Omeprazole',
          quantity: 14, 
          dosage: '1 capsule before breakfast',
          duration: '14 days',
          status: 'pending_investigation',
          price: 150,
          manufacturer: 'Square Pharmaceutical',
          category: 'prescription',
          requiresInvestigation: true,
          alternatives: ['Esomeprazole', 'Pantoprazole', 'Ranitidine'],
          sideEffects: ['Headache', 'Diarrhea', 'Vitamin B12 deficiency'],
          contraindications: ['Severe liver disease']
        }
      ],
      orderDate: '2024-04-15T16:45:00',
      status: 'under_investigation',
      totalAmount: 2100,
      investigationNotes: 'Prescription appears valid but doctor signature unclear. Need verification.',
      pharmacistNotes: 'Patient reports acid reflux symptoms for 3 months. No previous medication history.',
      urgency: 'high',
      deliveryMethod: 'home_delivery',
      paymentStatus: 'pending',
      doctorInfo: {
        name: 'Dr. Sarah Islam',
        registration: 'BMDC-67890',
        specialization: 'Gastroenterology',
        hospital: 'Bangabandhu Medical College',
        phone: '+8801912345678'
      },
      patientHistory: {
        allergies: 'None known',
        chronicConditions: 'GERD',
        currentMedications: 'Antacids (as needed)',
        lastVisit: '2024-04-12'
      }
    }
  ]);

  // Statistics data
  const statistics = {
    totalOrders: prescriptionOrders.length,
    underInvestigation: prescriptionOrders.filter(o => o.status === 'under_investigation').length,
    confirmed: prescriptionOrders.filter(o => o.status === 'confirmed').length,
    rejected: prescriptionOrders.filter(o => o.status === 'rejected').length,
    totalRevenue: prescriptionOrders.reduce((sum, o) => sum + o.totalAmount, 0),
    avgProcessingTime: '3.5 hours'
  };

  const filteredOrders = prescriptionOrders.filter(order => {
    const matchesSearch = order.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.phone.includes(searchQuery) ||
                         order.email.toLowerCase().includes(searchQuery);
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'under_investigation': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      case 'pending': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'under_investigation': return Clock;
      case 'confirmed': return CheckCircle;
      case 'rejected': return XCircle;
      case 'pending': return AlertCircle;
      default: return Clock;
    }
  };

  const handleApproveOrder = (orderId) => {
    setPrescriptionOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'confirmed', medicines: order.medicines.map(m => ({ ...m, status: 'approved' })) }
        : order
    ));
    setShowInvestigationModal(false);
  };

  const handleRejectOrder = (orderId, reason) => {
    setPrescriptionOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, status: 'rejected', rejectionReason: reason }
        : order
    ));
    setShowInvestigationModal(false);
  };

  const handleMedicineStatusChange = (orderId, medicineId, newStatus) => {
    setPrescriptionOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { 
            ...order, 
            medicines: order.medicines.map(med => 
              med.id === medicineId ? { ...med, status: newStatus } : med
            )
          }
        : order
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Prescription Management</h1>
              <p className="text-gray-600">Manage and verify prescription orders</p>
            </div>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center gap-2">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 flex items-center gap-2">
                <RefreshCw className="w-4 h-4" />
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            {[
              { id: 'dashboard', label: 'Dashboard', icon: TrendingUp },
              { id: 'orders', label: 'All Orders', icon: FileText },
              { id: 'investigation', label: 'Under Investigation', icon: Shield },
              { id: 'confirmed', label: 'Confirmed', icon: CheckCircle }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveView(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeView === tab.id
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-2">
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard View */}
        {activeView === 'dashboard' && (
          <div>
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Orders</p>
                    <p className="text-2xl font-bold text-gray-900">{statistics.totalOrders}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Under Investigation</p>
                    <p className="text-2xl font-bold text-yellow-600">{statistics.underInvestigation}</p>
                  </div>
                  <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Confirmed</p>
                    <p className="text-2xl font-bold text-green-600">{statistics.confirmed}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white rounded-xl shadow-sm p-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">Total Revenue</p>
                    <p className="text-2xl font-bold text-gray-900">৳{statistics.totalRevenue.toLocaleString()}</p>
                  </div>
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Recent Orders */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="p-6 border-b">
                <h2 className="text-lg font-semibold text-gray-900">Recent Orders</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medicines</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {prescriptionOrders.slice(0, 5).map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{order.patientName}</div>
                            <div className="text-sm text-gray-500">{order.phone}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {order.medicines.length} medicine{order.medicines.length > 1 ? 's' : ''}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border ${getStatusColor(order.status)}`}>
                            {React.createElement(getStatusIcon(order.status), { className: 'w-3 h-3' })}
                            {order.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          ৳{order.totalAmount}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowDetailsModal(true);
                            }}
                            className="text-emerald-600 hover:text-emerald-900"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Orders View */}
        {activeView === 'orders' && (
          <div>
            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by patient name, phone, or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="flex gap-2">
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="all">All Status</option>
                  <option value="under_investigation">Under Investigation</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            </div>

            {/* Orders Table */}
            <div className="bg-white rounded-xl shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Patient Info</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medicines</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Order Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Amount</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredOrders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{order.patientName}</div>
                            <div className="text-sm text-gray-500">{order.phone}</div>
                            <div className="text-sm text-gray-500">{order.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            {order.medicines.map((med, index) => (
                              <div key={index} className="text-sm">
                                <span className="font-medium">{med.name}</span>
                                <span className="text-gray-500 ml-2">Qty: {med.quantity}</span>
                                <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                                  med.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  med.status === 'pending_investigation' ? 'bg-yellow-100 text-yellow-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {med.status.replace('_', ' ')}
                                </span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(order.orderDate).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border ${getStatusColor(order.status)}`}>
                            {React.createElement(getStatusIcon(order.status), { className: 'w-3 h-3' })}
                            {order.status.replace('_', ' ')}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium text-gray-900">
                          ৳{order.totalAmount}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedOrder(order);
                                setShowDetailsModal(true);
                              }}
                              className="text-emerald-600 hover:text-emerald-900"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                            {order.status === 'under_investigation' && (
                              <button
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowInvestigationModal(true);
                                }}
                                className="text-yellow-600 hover:text-yellow-900"
                              >
                                <Shield className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Investigation View */}
        {activeView === 'investigation' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {prescriptionOrders
                .filter(order => order.status === 'under_investigation')
                .map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm overflow-hidden"
                  >
                    {/* Order Header */}
                    <div className="p-6 border-b bg-gradient-to-r from-yellow-50 to-orange-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{order.patientName}</h3>
                          <p className="text-sm text-gray-600">Order ID: #RX00{order.id}</p>
                        </div>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">
                          Under Investigation
                        </span>
                      </div>
                    </div>

                    {/* Patient Info */}
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <User className="w-4 h-4" />
                          <span>Age: {order.age}, {order.gender}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="w-4 h-4" />
                          <span>{order.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span>{order.email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(order.orderDate).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {/* Medicines Under Review */}
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-3">Medicines Under Review</h4>
                        <div className="space-y-3">
                          {order.medicines
                            .filter(med => med.status === 'pending_investigation')
                            .map((med, index) => (
                              <div key={index} className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h5 className="font-medium text-gray-900">{med.name}</h5>
                                    <p className="text-sm text-gray-600">{med.genericName}</p>
                                  </div>
                                  <span className="text-sm font-medium text-gray-900">৳{med.price}</span>
                                </div>
                                <div className="grid grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                                  <div>Dosage: {med.dosage}</div>
                                  <div>Duration: {med.duration}</div>
                                  <div>Quantity: {med.quantity}</div>
                                  <div>Manufacturer: {med.manufacturer}</div>
                                </div>
                                <div className="flex gap-2">
                                  <button
                                    onClick={() => handleMedicineStatusChange(order.id, med.id, 'approved')}
                                    className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
                                  >
                                    Approve
                                  </button>
                                  <button
                                    onClick={() => handleMedicineStatusChange(order.id, med.id, 'rejected')}
                                    className="px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
                                  >
                                    Reject
                                  </button>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Investigation Notes */}
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-2">Investigation Notes</h4>
                        <p className="text-sm text-gray-600 mb-3">{order.investigationNotes}</p>
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                          <p className="text-sm text-blue-800">
                            <strong>Pharmacist Note:</strong> {order.pharmacistNotes}
                          </p>
                        </div>
                      </div>

                      {/* Prescription Image */}
                      <div className="mb-6">
                        <h4 className="font-medium text-gray-900 mb-2">Prescription Image</h4>
                        <div className="border border-gray-200 rounded-lg overflow-hidden">
                          <img 
                            src={order.prescriptionImage} 
                            alt="Prescription" 
                            className="w-full h-48 object-cover"
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleApproveOrder(order.id)}
                          className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <CheckCircle className="w-4 h-4" />
                          Approve All
                        </button>
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowInvestigationModal(true);
                          }}
                          className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                        >
                          <XCircle className="w-4 h-4" />
                          Reject Order
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}

        {/* Confirmed View */}
        {activeView === 'confirmed' && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {prescriptionOrders
                .filter(order => order.status === 'confirmed')
                .map((order) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-xl shadow-sm p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{order.patientName}</h3>
                        <p className="text-sm text-gray-500">Order ID: #RX00{order.id}</p>
                      </div>
                      <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                        Confirmed
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{order.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="w-4 h-4" />
                        <span>Order Date: {new Date(order.orderDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Package className="w-4 h-4" />
                        <span>Delivery: {order.deliveryMethod === 'home_delivery' ? 'Home Delivery' : 'Store Pickup'}</span>
                      </div>
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium text-gray-900 mb-2">Approved Medicines</h4>
                      <div className="space-y-2">
                        {order.medicines.map((med, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-green-50 rounded-lg">
                            <div>
                              <span className="text-sm font-medium">{med.name}</span>
                              <span className="text-sm text-gray-500 ml-2">Qty: {med.quantity}</span>
                            </div>
                            <span className="text-sm font-medium text-green-600">৳{med.price * med.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="border-t pt-4 mt-4">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold text-gray-900">Total: ৳{order.totalAmount}</span>
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-emerald-600 text-white text-sm rounded hover:bg-emerald-700">
                            <Printer className="w-4 h-4" />
                          </button>
                          <button className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                            <MailIcon className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      <AnimatePresence>
        {showDetailsModal && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
                  <button
                    onClick={() => setShowDetailsModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Patient Information */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Patient Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Name:</span>
                        <span className="font-medium">{selectedOrder.patientName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Age:</span>
                        <span className="font-medium">{selectedOrder.age} years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Gender:</span>
                        <span className="font-medium">{selectedOrder.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Phone:</span>
                        <span className="font-medium">{selectedOrder.phone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{selectedOrder.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Address:</span>
                        <span className="font-medium">{selectedOrder.address}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-4">
                    <h3 className="font-semibold text-gray-900 mb-3">Order Information</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order ID:</span>
                        <span className="font-medium">#RX00{selectedOrder.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Date:</span>
                        <span className="font-medium">{new Date(selectedOrder.orderDate).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(selectedOrder.status)}`}>
                          {selectedOrder.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Total Amount:</span>
                        <span className="font-medium">৳{selectedOrder.totalAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Payment Status:</span>
                        <span className="font-medium">{selectedOrder.paymentStatus}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Delivery Method:</span>
                        <span className="font-medium">
                          {selectedOrder.deliveryMethod === 'home_delivery' ? 'Home Delivery' : 'Store Pickup'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Doctor Information */}
                <div className="bg-blue-50 rounded-xl p-4 mb-6">
                  <h3 className="font-semibold text-blue-900 mb-3">Doctor Information</h3>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Name:</span>
                        <span className="font-medium text-blue-900">{selectedOrder.doctorInfo.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Registration:</span>
                        <span className="font-medium text-blue-900">{selectedOrder.doctorInfo.registration}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Specialization:</span>
                        <span className="font-medium text-blue-900">{selectedOrder.doctorInfo.specialization}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Hospital:</span>
                        <span className="font-medium text-blue-900">{selectedOrder.doctorInfo.hospital}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Phone:</span>
                        <span className="font-medium text-blue-900">{selectedOrder.doctorInfo.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Medicines */}
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Medicines</h3>
                  <div className="space-y-3">
                    {selectedOrder.medicines.map((med, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium text-gray-900">{med.name}</h4>
                            <p className="text-sm text-gray-600">{med.genericName}</p>
                          </div>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            med.status === 'approved' ? 'bg-green-100 text-green-800' :
                            med.status === 'pending_investigation' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {med.status.replace('_', ' ')}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 text-sm text-gray-600">
                          <div>Dosage: {med.dosage}</div>
                          <div>Duration: {med.duration}</div>
                          <div>Quantity: {med.quantity}</div>
                          <div>Price: ৳{med.price}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Notes */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                    <h3 className="font-semibold text-yellow-900 mb-2">Investigation Notes</h3>
                    <p className="text-sm text-yellow-800">{selectedOrder.investigationNotes}</p>
                  </div>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                    <h3 className="font-semibold text-green-900 mb-2">Pharmacist Notes</h3>
                    <p className="text-sm text-green-800">{selectedOrder.pharmacistNotes}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Investigation Modal */}
      <AnimatePresence>
        {showInvestigationModal && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-2xl w-full p-6"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Investigation Decision</h2>
                <button
                  onClick={() => setShowInvestigationModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Order Information</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-600">Patient:</span>
                      <p className="font-medium">{selectedOrder.patientName}</p>
                    </div>
                    <div>
                      <span className="text-gray-600">Order ID:</span>
                      <p className="font-medium">#RX00{selectedOrder.id}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Medicines Under Review</h3>
                <div className="space-y-2">
                  {selectedOrder.medicines
                    .filter(med => med.status === 'pending_investigation')
                    .map((med, index) => (
                      <div key={index} className="border border-yellow-200 rounded-lg p-3 bg-yellow-50">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{med.name}</span>
                          <span className="text-sm text-gray-600">Qty: {med.quantity}</span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Decision</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleApproveOrder(selectedOrder.id)}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5" />
                    Approve Order
                  </button>
                  <button
                    onClick={() => handleRejectOrder(selectedOrder.id, 'Prescription verification failed')}
                    className="w-full px-4 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <XCircle className="w-5 h-5" />
                    Reject Order
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PrescriptionManagement;
