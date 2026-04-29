import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  DollarSign,
  CreditCard,
  Receipt,
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
  FileText,
  CheckCircle,
  AlertCircle,
  X,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Settings,
  Bell,
  Shield,
  TrendingUp,
  TrendingDown,
  Activity,
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
  LineChart,
  Wallet,
  Banknote,
  CreditCardIcon,
  Building,
  Users,
  AlertTriangle,
  CheckSquare,
  Square
} from 'lucide-react';

const BillingManager = () => {
  const [loading, setLoading] = useState(true);
  const [bills, setBills] = useState([]);
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [selectedBill, setSelectedBill] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPatient, setFilterPatient] = useState('all');
  const [filterDoctor, setFilterDoctor] = useState('all');
  const [filterDateRange, setFilterDateRange] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedBill, setExpandedBill] = useState(null);

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    appointmentId: '',
    amount: '',
    description: '',
    status: 'pending',
    dueDate: '',
    paymentMethod: '',
    insuranceClaimNumber: '',
    services: [],
    taxAmount: 0,
    discountAmount: 0,
    totalAmount: 0,
    notes: ''
  });

  const [paymentFormData, setPaymentFormData] = useState({
    method: 'card',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    bankAccount: '',
    routingNumber: '',
    checkNumber: '',
    amount: '',
    transactionId: '',
    paymentNotes: ''
  });

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    overdue: 'bg-red-100 text-red-800',
    refunded: 'bg-gray-100 text-gray-800',
    partially_paid: 'bg-blue-100 text-blue-800'
  };

  const paymentMethods = [
    { value: 'card', label: 'Credit Card', icon: CreditCardIcon },
    { value: 'cash', label: 'Cash', icon: Banknote },
    { value: 'check', label: 'Check', icon: FileText },
    { value: 'insurance', label: 'Insurance', icon: Shield },
    { value: 'online', label: 'Online Payment', icon: CreditCard }
  ];

  const services = [
    { id: 1, name: 'Consultation Fee', price: 200, category: 'consultation' },
    { id: 2, name: 'Lab Tests', price: 150, category: 'diagnostics' },
    { id: 3, name: 'Imaging (X-Ray)', price: 300, category: 'diagnostics' },
    { id: 4, name: 'Vaccination', price: 100, category: 'treatment' },
    { id: 5, name: 'Physical Therapy', price: 250, category: 'treatment' },
    { id: 6, name: 'Emergency Room Visit', price: 500, category: 'emergency' },
    { id: 7, name: 'Specialist Consultation', price: 350, category: 'consultation' },
    { id: 8, name: 'Surgical Procedure', price: 2000, category: 'surgery' }
  ];

  useEffect(() => {
    fetchBills();
    fetchPatients();
    fetchDoctors();
  }, []);

  const fetchBills = async () => {
    try {
      setLoading(true);
      // Mock data
      setTimeout(() => {
        setBills([
          {
            id: 1,
            billNumber: 'BILL20240401001',
            patientId: 1,
            patientName: 'John Doe',
            patientEmail: 'john@example.com',
            doctorId: 1,
            doctorName: 'Dr. Sarah Johnson',
            doctorSpecialization: 'Cardiology',
            appointmentId: 1,
            amount: 200.00,
            taxAmount: 20.00,
            discountAmount: 0.00,
            totalAmount: 220.00,
            description: 'Cardiology Consultation',
            status: 'paid',
            dueDate: '2024-04-15',
            paymentMethod: 'credit_card',
            insuranceClaimNumber: 'INS123456',
            services: [
              { name: 'Consultation Fee', price: 200.00, quantity: 1 }
            ],
            paymentDate: '2024-04-01',
            transactionId: 'TXN123456789',
            paymentNotes: 'Paid via credit card',
            createdAt: '2024-04-01T10:00:00Z',
            updatedAt: '2024-04-01T10:00:00Z'
          },
          {
            id: 2,
            billNumber: 'BILL20240328001',
            patientId: 2,
            patientName: 'Emily Davis',
            patientEmail: 'emily@example.com',
            doctorId: 2,
            doctorName: 'Dr. Michael Chen',
            doctorSpecialization: 'Neurology',
            appointmentId: 2,
            amount: 150.00,
            taxAmount: 15.00,
            discountAmount: 10.00,
            totalAmount: 155.00,
            description: 'Lab Tests - Blood Work',
            status: 'pending',
            dueDate: '2024-04-15',
            paymentMethod: '',
            insuranceClaimNumber: 'INS789012',
            services: [
              { name: 'Complete Blood Count', price: 75.00, quantity: 1 },
              { name: 'Lipid Panel', price: 75.00, quantity: 1 }
            ],
            paymentDate: null,
            transactionId: null,
            paymentNotes: '',
            createdAt: '2024-03-28T14:30:00Z',
            updatedAt: '2024-03-28T14:30:00Z'
          },
          {
            id: 3,
            billNumber: 'BILL20240315001',
            patientId: 3,
            patientName: 'Robert Johnson',
            patientEmail: 'robert@example.com',
            doctorId: 1,
            doctorName: 'Dr. Sarah Johnson',
            doctorSpecialization: 'Cardiology',
            appointmentId: 3,
            amount: 500.00,
            taxAmount: 50.00,
            discountAmount: 25.00,
            totalAmount: 525.00,
            description: 'Emergency Room Visit',
            status: 'overdue',
            dueDate: '2024-03-30',
            paymentMethod: '',
            insuranceClaimNumber: 'INS345678',
            services: [
              { name: 'Emergency Room Visit', price: 500.00, quantity: 1 }
            ],
            paymentDate: null,
            transactionId: null,
            paymentNotes: 'Payment overdue - follow up required',
            createdAt: '2024-03-15T09:00:00Z',
            updatedAt: '2024-03-15T09:00:00Z'
          }
        ]);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error fetching bills:', error);
      setLoading(false);
    }
  };

  const fetchPatients = async () => {
    try {
      setPatients([
        { id: 1, name: 'John Doe', email: 'john@example.com', phone: '+1234567890', insuranceProvider: 'Blue Cross' },
        { id: 2, name: 'Emily Davis', email: 'emily@example.com', phone: '+1234567891', insuranceProvider: 'Aetna' },
        { id: 3, name: 'Robert Johnson', email: 'robert@example.com', phone: '+1234567892', insuranceProvider: 'UnitedHealth' }
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

  const handleCreateBill = async () => {
    try {
      console.log('Creating bill:', formData);
      setShowCreateModal(false);
      fetchBills();
    } catch (error) {
      console.error('Error creating bill:', error);
    }
  };

  const handleProcessPayment = async (billId) => {
    try {
      console.log('Processing payment for bill:', billId, paymentFormData);
      setShowPaymentModal(false);
      fetchBills();
    } catch (error) {
      console.error('Error processing payment:', error);
    }
  };

  const handleUpdateBill = async (id, updates) => {
    try {
      console.log('Updating bill:', id, updates);
      fetchBills();
    } catch (error) {
      console.error('Error updating bill:', error);
    }
  };

  const handleDeleteBill = async (id) => {
    try {
      console.log('Deleting bill:', id);
      fetchBills();
    } catch (error) {
      console.error('Error deleting bill:', error);
    }
  };

  const filteredBills = bills.filter(bill => {
    const matchesSearch = bill.billNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bill.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'all' || bill.status === filterStatus;
    const matchesPatient = filterPatient === 'all' || bill.patientId.toString() === filterPatient;
    const matchesDoctor = filterDoctor === 'all' || bill.doctorId.toString() === filterDoctor;
    return matchesSearch && matchesStatus && matchesPatient && matchesDoctor;
  }).sort((a, b) => {
    switch (sortBy) {
      case 'date':
        return new Date(b.createdAt) - new Date(a.createdAt);
      case 'amount':
        return b.totalAmount - a.totalAmount;
      case 'patient':
        return a.patientName.localeCompare(b.patientName);
      case 'status':
        return a.status.localeCompare(b.status);
      default:
        return 0;
    }
  });

  const BillCard = ({ bill }) => {
    const isOverdue = bill.status === 'overdue' && new Date(b.dueDate) < new Date();
    const daysOverdue = isOverdue ? Math.floor((new Date() - new Date(b.dueDate)) / (1000 * 60 * 60 * 24)) : 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-white rounded-lg shadow-sm border p-4 hover:shadow-md transition-shadow ${
          isOverdue ? 'border-red-200' : 'border-gray-200'
        }`}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg ${
              bill.status === 'paid' ? 'bg-green-100' :
              bill.status === 'overdue' ? 'bg-red-100' :
              bill.status === 'pending' ? 'bg-yellow-100' :
              'bg-gray-100'
            }`}>
              <DollarSign className={`w-5 h-5 ${
                bill.status === 'paid' ? 'text-green-600' :
                bill.status === 'overdue' ? 'text-red-600' :
                bill.status === 'pending' ? 'text-yellow-600' :
                'text-gray-600'
              }`} />
            </div>
            <div>
              <h4 className="font-medium text-gray-900">{bill.billNumber}</h4>
              <p className="text-sm text-gray-600">{bill.patientName}</p>
              <p className="text-xs text-gray-500">{bill.doctorName} • {bill.doctorSpecialization}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs rounded-full ${statusColors[bill.status]}`}>
              {bill.status}
            </span>
            {isOverdue && (
              <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800">
                {daysOverdue} days overdue
              </span>
            )}
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
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium ml-2">${bill.amount.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-gray-600">Total:</span>
              <span className="font-medium ml-2">${bill.totalAmount.toFixed(2)}</span>
            </div>
            <div>
              <span className="text-gray-600">Due Date:</span>
              <span className={`font-medium ml-2 ${isOverdue ? 'text-red-600' : ''}`}>
                {bill.dueDate}
              </span>
            </div>
            <div>
              <span className="text-gray-600">Payment Method:</span>
              <span className="font-medium ml-2">
                {bill.paymentMethod ? bill.paymentMethod.replace('_', ' ').toUpperCase() : 'Not paid'}
              </span>
            </div>
          </div>

          <div>
            <span className="text-gray-600 text-sm">Description:</span>
            <p className="font-medium text-sm mt-1">{bill.description}</p>
          </div>

          {/* Services */}
          <div className="border-t pt-3">
            <span className="text-gray-600 text-sm">Services:</span>
            <div className="space-y-1 mt-2">
              {bill.services.map((service, index) => (
                <div key={index} className="flex items-center justify-between text-xs bg-gray-50 p-2 rounded">
                  <span className="font-medium">{service.name}</span>
                  <span className="text-gray-600">${service.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance Info */}
          {bill.insuranceClaimNumber && (
            <div className="border-t pt-3">
              <span className="text-gray-600 text-sm">Insurance:</span>
              <div className="flex items-center space-x-2 mt-1">
                <Shield className="w-3 h-3 text-blue-500" />
                <span className="text-xs font-medium">{bill.insuranceClaimNumber}</span>
              </div>
            </div>
          )}

          {/* Payment Info */}
          {bill.paymentDate && (
            <div className="border-t pt-3">
              <span className="text-gray-600 text-sm">Payment Info:</span>
              <div className="grid grid-cols-2 gap-2 mt-1 text-xs">
                <div>
                  <span className="text-gray-600">Date:</span>
                  <span className="font-medium ml-1">{bill.paymentDate}</span>
                </div>
                <div>
                  <span className="text-gray-600">Transaction:</span>
                  <span className="font-medium ml-1">{bill.transactionId}</span>
                </div>
              </div>
              {bill.paymentNotes && (
                <p className="text-xs text-gray-600 mt-1">{bill.paymentNotes}</p>
              )}
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
          <div className="flex items-center space-x-2">
            {bill.status === 'pending' || bill.status === 'overdue' ? (
              <button
                onClick={() => {
                  setSelectedBill(bill);
                  setShowPaymentModal(true);
                }}
                className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
              >
                Process Payment
              </button>
            ) : (
              <button className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded">
                {bill.status}
              </button>
            )}
            <button
              onClick={() => setExpandedBill(expandedBill === bill.id ? null : bill.id)}
              className="text-sm text-blue-600 hover:text-blue-800"
            >
              {expandedBill === bill.id ? 'Show Less' : 'Show More'}
            </button>
          </div>
        </div>
      </motion.div>
    );
  };

  const CreateBillModal = () => (
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
            <h2 className="text-xl font-semibold text-gray-900">Create Bill</h2>
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
                    {patient.name} ({patient.insuranceProvider})
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

          {/* Bill Information */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bill Amount</label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="Enter amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <input
              type="text"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Enter bill description"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Services */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Services</label>
            <div className="space-y-2">
              {services.map(service => (
                <label key={service.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm">{service.name} - ${service.price.toFixed(2)}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Tax and Discount */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tax Amount</label>
              <input
                type="number"
                value={formData.taxAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, taxAmount: e.target.value }))}
                placeholder="Tax amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
              <input
                type="number"
                value={formData.discountAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, discountAmount: e.target.value }))}
                placeholder="Discount amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount</label>
              <input
                type="number"
                value={formData.totalAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, totalAmount: e.target.value }))}
                placeholder="Total amount"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Insurance */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Claim Number</label>
            <input
              type="text"
              value={formData.insuranceClaimNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, insuranceClaimNumber: e.target.value }))}
              placeholder="Enter insurance claim number"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Notes */}
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

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => setShowCreateModal(false)}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreateBill}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Bill
          </button>
        </div>
      </motion.div>
    </motion.div>
  );

  const PaymentModal = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Process Payment</h2>
            <button
              onClick={() => setShowPaymentModal(false)}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Bill Summary */}
          {selectedBill && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium text-gray-900 mb-2">Bill Summary</h3>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Bill Number:</span>
                  <span className="font-medium">{selectedBill.billNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span>Patient:</span>
                  <span className="font-medium">{selectedBill.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span>Amount Due:</span>
                  <span className="font-medium text-green-600">${selectedBill.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>
          )}

          {/* Payment Method Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Payment Method</label>
            <div className="grid grid-cols-2 gap-3">
              {paymentMethods.map(method => (
                <button
                  key={method.value}
                  onClick={() => setPaymentFormData(prev => ({ ...prev, method: method.value }))}
                  className={`p-3 border rounded-lg flex items-center space-x-2 transition-colors ${
                    paymentFormData.method === method.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <method.icon className="w-5 h-5" />
                  <span className="text-sm font-medium">{method.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          {paymentFormData.method === 'card' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
                <input
                  type="text"
                  value={paymentFormData.cardNumber}
                  onChange={(e) => setPaymentFormData(prev => ({ ...prev, cardNumber: e.target.value }))}
                  placeholder="1234 5678 9012 3456"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Cardholder Name</label>
                  <input
                    type="text"
                    value={paymentFormData.cardName}
                    onChange={(e) => setPaymentFormData(prev => ({ ...prev, cardName: e.target.value }))}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date</label>
                  <input
                    type="text"
                    value={paymentFormData.expiryDate}
                    onChange={(e) => setPaymentFormData(prev => ({ ...prev, expiryDate: e.target.value }))}
                    placeholder="MM/YY"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">CVV</label>
                <input
                  type="text"
                  value={paymentFormData.cvv}
                  onChange={(e) => setPaymentFormData(prev => ({ ...prev, cvv: e.target.value }))}
                  placeholder="123"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {paymentFormData.method === 'cash' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Amount Received</label>
                <input
                  type="number"
                  value={paymentFormData.amount}
                  onChange={(e) => setPaymentFormData(prev => ({ ...prev, amount: e.target.value }))}
                  placeholder="Enter amount"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Notes</label>
                <textarea
                  value={paymentFormData.paymentNotes}
                  onChange={(e) => setPaymentFormData(prev => ({ ...prev, paymentNotes: e.target.value }))}
                  placeholder="Enter payment notes"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          )}

          {paymentFormData.method === 'check' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Bank Account</label>
                <input
                  type="text"
                  value={paymentFormData.bankAccount}
                  onChange={(e) => setPaymentFormData(prev => ({ ...prev, bankAccount: e.target.value }))}
                  placeholder="Enter bank account number"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Routing Number</label>
                  <input
                    type="text"
                    value={paymentFormData.routingNumber}
                    onChange={(e) => setPaymentFormData(prev => ({ ...prev, routingNumber: e.target.value }))}
                    placeholder="Enter routing number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check Number</label>
                  <input
                    type="text"
                    value={paymentFormData.checkNumber}
                    onChange={(e) => setPaymentFormData(prev => ({ ...prev, checkNumber: e.target.value }))}
                    placeholder="Enter check number"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Transaction ID */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID (Optional)</label>
            <input
              type="text"
              value={paymentFormData.transactionId}
              onChange={(e) => setPaymentFormData(prev => ({ ...prev, transactionId: e.target.value }))}
              placeholder="Enter transaction ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-end space-x-3">
          <button
            onClick={() => setShowPaymentModal(false)}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => selectedBill && handleProcessPayment(selectedBill.id)}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Process Payment
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
          <h2 className="text-2xl font-bold text-gray-900">Billing Management</h2>
          <p className="text-gray-600">Manage bills, payments, and financial records</p>
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
            <span>New Bill</span>
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
                  placeholder="Search bills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="overdue">Overdue</option>
                <option value="refunded">Refunded</option>
                <option value="partially_paid">Partially Paid</option>
              </select>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="date">Date</option>
                <option value="amount">Amount</option>
                <option value="patient">Patient</option>
                <option value="status">Status</option>
              </select>
            </div>
          </div>
        </motion.div>
      )}

      {/* Bills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {filteredBills.map(bill => (
          <BillCard key={bill.id} bill={bill} />
        ))}
      </div>

      {/* Create Bill Modal */}
      {showCreateModal && <CreateBillModal />}
      
      {/* Payment Modal */}
      {showPaymentModal && <PaymentModal />}
    </div>
  );
};

export default BillingManager;
