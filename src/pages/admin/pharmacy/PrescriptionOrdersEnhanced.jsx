import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Plus,
  Edit3,
  Trash2,
  Eye,
  Package,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  Barcode,
  Activity,
  FileText,
  Save,
  X,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  ShoppingCart,
  Zap,
  Shield,
  Settings,
  Upload,
  Image as ImageIcon,
  Star,
  MoreVertical,
  ChevronDown,
  RefreshCw,
  Printer,
  FileSpreadsheet,
  Mail,
  Phone,
  MapPin,
  Globe,
  Award,
  Users,
  Truck,
  Box,
  Wrench,
  Heart,
  Brain,
  Bone,
  Stethoscope,
  Thermometer,
  Syringe,
  Bandage,
  Pill,
  User,
  Send,
  MessageSquare,
  Bell,
  CreditCard,
  Receipt,
  FileCheck,
  FileX,
  Info,
  HelpCircle,
  ChevronRight,
  ChevronLeft,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV, printDocument } from '../../../utils/exportUtils';
import prescriptionService from '../../../services/prescriptionService';

const PrescriptionOrdersEnhanced = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({});
  const [bulkAction, setBulkAction] = useState('');
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [sortBy, setSortBy] = useState('orderDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);
  const [exportFormat, setExportFormat] = useState('csv');
  const [showPrescriptionUpload, setShowPrescriptionUpload] = useState(false);
  const [prescriptionFile, setPrescriptionFile] = useState(null);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailData, setEmailData] = useState({});
  const [showSmsModal, setShowSmsModal] = useState(false);
  const [smsData, setSmsData] = useState({});
  const [notifications, setNotifications] = useState([]);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentData, setPaymentData] = useState({});
  const [showRefundModal, setShowRefundModal] = useState(false);
  const [refundData, setRefundData] = useState({});
  const [prescriptions, setPrescriptions] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  
  const [filters, setFilters] = useState({
    status: '',
    paymentStatus: '',
    dateRange: '',
    patient: '',
    doctor: '',
    priority: '',
    deliveryMethod: ''
  });

  // Fetch dynamic data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all prescriptions and convert to orders format
        const prescriptionsData = await prescriptionService.searchPrescriptions('', {});
        setPrescriptions(prescriptionsData);
        
        // Convert prescriptions to order format for display
        const ordersData = prescriptionsData.map(prescription => ({
          id: prescription.id,
          orderNumber: prescription.id,
          patient: {
            id: prescription.customerId,
            name: `Customer ${prescription.customerId}`,
            email: `customer${prescription.customerId}@email.com`,
            phone: `+1-234-567-${prescription.customerId.padStart(4, '0')}`,
            address: '123 Main St, City, State 12345'
          },
          doctor: {
            id: prescription.doctorLicense || 'Unknown',
            name: prescription.doctorName,
            specialization: 'General Practice',
            license: prescription.doctorLicense
          },
          items: prescription.items || [],
          status: prescription.status === 'pending_verification' ? 'pending' :
                 prescription.status === 'verified' ? 'processing' :
                 prescription.status === 'processing' ? 'ready' :
                 prescription.status === 'completed' ? 'completed' :
                 prescription.status,
          paymentStatus: prescription.status === 'completed' ? 'paid' : 'pending',
          priority: prescription.priority || 'normal',
          deliveryMethod: prescription.deliveryMethod,
          subtotal: Math.floor(Math.random() * 100) + 20,
          tax: 10,
          deliveryFee: prescription.deliveryMethod === 'delivery' ? 10 : 0,
          total: 0,
          paidAmount: 0,
          orderDate: new Date(prescription.uploadedAt).toISOString().split('T')[0],
          deliveryDate: prescription.status === 'completed' ? new Date().toISOString().split('T')[0] : null,
          prescriptionImage: prescription.prescriptionImage,
          notes: prescription.notes,
          internalNotes: prescription.verificationNotes,
          insuranceInfo: null,
          deliveryAddress: prescription.deliveryMethod === 'delivery' ? '123 Main St, City, State 12345' : null,
          trackingNumber: prescription.orderId || null,
          pharmacistId: prescription.pharmacistId,
          pharmacistName: prescription.pharmacistName,
          verifiedAt: prescription.verifiedAt,
          createdAt: prescription.uploadedAt,
          updatedAt: prescription.updatedAt
        }));

        // Calculate totals
        ordersData.forEach(order => {
          order.total = order.subtotal + order.tax + order.deliveryFee;
          order.paidAmount = order.paymentStatus === 'paid' ? order.total : 0;
        });

        setOrders(ordersData);
        
        // Fetch analytics
        try {
          const analyticsData = await prescriptionService.getPrescriptionAnalytics();
          setAnalytics(analyticsData);
        } catch (error) {
          console.error('Failed to fetch analytics:', error);
        }
        
      } catch (error) {
        console.error('Error fetching prescription orders:', error);
        // Fallback to empty array if API fails
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Refresh data
  const refreshData = async () => {
    try {
      setLoading(true);
      const prescriptionsData = await prescriptionService.searchPrescriptions('', {});
      setPrescriptions(prescriptionsData);
      
      // Convert and update orders
      const ordersData = prescriptionsData.map(prescription => ({
        id: prescription.id,
        orderNumber: prescription.id,
        patient: {
          id: prescription.customerId,
          name: `Customer ${prescription.customerId}`,
          email: `customer${prescription.customerId}@email.com`,
          phone: `+1-234-567-${prescription.customerId.padStart(4, '0')}`,
          address: '123 Main St, City, State 12345'
        },
        doctor: {
          id: prescription.doctorLicense || 'Unknown',
          name: prescription.doctorName,
          specialization: 'General Practice',
          license: prescription.doctorLicense
        },
        items: prescription.items || [],
        status: prescription.status === 'pending_verification' ? 'pending' :
               prescription.status === 'verified' ? 'processing' :
               prescription.status === 'processing' ? 'ready' :
               prescription.status === 'completed' ? 'completed' :
               prescription.status,
        paymentStatus: prescription.status === 'completed' ? 'paid' : 'pending',
        priority: prescription.priority || 'normal',
        deliveryMethod: prescription.deliveryMethod,
        subtotal: Math.floor(Math.random() * 100) + 20,
        tax: 10,
        deliveryFee: prescription.deliveryMethod === 'delivery' ? 10 : 0,
        total: 0,
        paidAmount: 0,
        orderDate: new Date(prescription.uploadedAt).toISOString().split('T')[0],
        deliveryDate: prescription.status === 'completed' ? new Date().toISOString().split('T')[0] : null,
        prescriptionImage: prescription.prescriptionImage,
        notes: prescription.notes,
        internalNotes: prescription.verificationNotes,
        insuranceInfo: null,
        deliveryAddress: prescription.deliveryMethod === 'delivery' ? '123 Main St, City, State 12345' : null,
        trackingNumber: prescription.orderId || null,
        pharmacistId: prescription.pharmacistId,
        pharmacistName: prescription.pharmacistName,
        verifiedAt: prescription.verifiedAt,
        createdAt: prescription.uploadedAt,
        updatedAt: prescription.updatedAt
      }));

      ordersData.forEach(order => {
        order.total = order.subtotal + order.tax + order.deliveryFee;
        order.paidAmount = order.paymentStatus === 'paid' ? order.total : 0;
      });

      setOrders(ordersData);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Enhanced CRUD operations
  const handleVerifyPrescription = async () => {
    try {
      const pharmacistId = 1; // In real app, get from logged-in user
      const result = await prescriptionService.updatePrescriptionStatus(
        selectedOrder.id,
        'verified',
        pharmacistId,
        'Prescription verified by pharmacist'
      );
      
      if (result.success) {
        // Update local state
        const updatedOrders = orders.map(order =>
          order.id === selectedOrder.id 
            ? { 
                ...order, 
                status: 'processing', 
                pharmacistName: 'Current Pharmacist', 
                verifiedAt: new Date().toISOString() 
              }
            : order
        );
        setOrders(updatedOrders);
        setSelectedOrder({ 
          ...selectedOrder, 
          status: 'processing', 
          pharmacistName: 'Current Pharmacist', 
          verifiedAt: new Date().toISOString() 
        });
        addNotification('Prescription verified successfully', 'success');
      }
    } catch (error) {
      console.error('Error verifying prescription:', error);
      addNotification('Failed to verify prescription', 'error');
    }
  };

  const handleProcessPrescription = async () => {
    try {
      const orderData = {
        items: selectedOrder.items,
        notes: 'Processed by pharmacist'
      };
      
      const result = await prescriptionService.processPrescription(selectedOrder.id, orderData);
      
      if (result.success) {
        // Update local state
        const updatedOrders = orders.map(order =>
          order.id === selectedOrder.id 
            ? { 
                ...order, 
                status: 'ready', 
                orderId: result.orderId,
                processedAt: new Date().toISOString() 
              }
            : order
        );
        setOrders(updatedOrders);
        setSelectedOrder({ 
          ...selectedOrder, 
          status: 'ready', 
          orderId: result.orderId,
          processedAt: new Date().toISOString() 
        });
        addNotification('Prescription processed successfully', 'success');
      }
    } catch (error) {
      console.error('Error processing prescription:', error);
      addNotification('Failed to process prescription', 'error');
    }
  };

  const handleEditOrder = () => {
    const updatedOrders = orders.map(order =>
      order.id === editingOrder.id ? { ...order, ...formData, updatedAt: new Date().toISOString() } : order
    );
    setOrders(updatedOrders);
    setShowAddModal(false);
    setEditingOrder(null);
    setFormData({});
    addNotification('Prescription order updated successfully', 'success');
  };

  const handleAddOrder = () => {
    const newOrder = {
      id: Date.now().toString(),
      orderNumber: `RX-${Date.now()}`,
      ...formData,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setOrders([newOrder, ...orders]);
    setShowAddModal(false);
    setFormData({});
    setPrescriptionFile(null);
    addNotification('Prescription order created successfully', 'success');
  };

  const handleDeleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
    addNotification('Prescription order deleted successfully', 'error');
  };

  const handleUpdateStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } : order
    );
    setOrders(updatedOrders);
    addNotification(`Order status updated to ${newStatus}`, 'success');
  };

  const handleUpdatePaymentStatus = (orderId, newPaymentStatus) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        const paidAmount = newPaymentStatus === 'paid' ? order.total : 
                          newPaymentStatus === 'partially_paid' ? order.total * 0.5 : 0;
        return { ...order, paymentStatus: newPaymentStatus, paidAmount, updatedAt: new Date().toISOString() };
      }
      return order;
    });
    setOrders(updatedOrders);
    addNotification(`Payment status updated to ${newPaymentStatus}`, 'success');
  };

  const handleBulkAction = () => {
    if (bulkAction === 'delete') {
      setOrders(orders.filter(order => !selectedOrders.includes(order.id)));
      addNotification(`${selectedOrders.length} orders deleted`, 'error');
    } else if (bulkAction === 'process') {
      const updatedOrders = orders.map(order =>
        selectedOrders.includes(order.id) ? { ...order, status: 'processing', updatedAt: new Date().toISOString() } : order
      );
      setOrders(updatedOrders);
      addNotification(`${selectedOrders.length} orders marked as processing`, 'success');
    } else if (bulkAction === 'complete') {
      const updatedOrders = orders.map(order =>
        selectedOrders.includes(order.id) ? { ...order, status: 'completed', updatedAt: new Date().toISOString() } : order
      );
      setOrders(updatedOrders);
      addNotification(`${selectedOrders.length} orders marked as completed`, 'success');
    } else if (bulkAction === 'cancel') {
      const updatedOrders = orders.map(order =>
        selectedOrders.includes(order.id) ? { ...order, status: 'cancelled', updatedAt: new Date().toISOString() } : order
      );
      setOrders(updatedOrders);
      addNotification(`${selectedOrders.length} orders cancelled`, 'warning');
    }
    setSelectedOrders([]);
    setBulkAction('');
    setShowBulkModal(false);
  };

  const handleSendEmail = () => {
    // Simulate sending email
    setTimeout(() => {
      setShowEmailModal(false);
      setEmailData({});
      addNotification('Email sent successfully', 'success');
    }, 1000);
  };

  const handleSendSms = () => {
    // Simulate sending SMS
    setTimeout(() => {
      setShowSmsModal(false);
      setSmsData({});
      addNotification('SMS sent successfully', 'success');
    }, 1000);
  };

  const handleProcessPayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      setShowPaymentModal(false);
      setPaymentData({});
      handleUpdatePaymentStatus(selectedOrder.id, 'paid');
      addNotification('Payment processed successfully', 'success');
    }, 2000);
  };

  const handleProcessRefund = () => {
    // Simulate refund processing
    setTimeout(() => {
      setShowRefundModal(false);
      setRefundData({});
      handleUpdatePaymentStatus(selectedOrder.id, 'refunded');
      handleUpdateStatus(selectedOrder.id, 'refunded');
      addNotification('Refund processed successfully', 'success');
    }, 2000);
  };

  const handlePrintPrescription = (order) => {
    printDocument(order, `prescription-${order.orderNumber}`);
    addNotification('Prescription printed successfully', 'success');
  };

  const handleExport = () => {
    const dataToExport = selectedOrders.length > 0 
      ? orders.filter(order => selectedOrders.includes(order.id))
      : orders;
    
    if (exportFormat === 'csv') {
      exportToCSV(dataToExport, 'prescription-orders.csv');
    } else if (exportFormat === 'pdf') {
      exportToPDF(dataToExport, 'prescription-orders.pdf');
    } else if (exportFormat === 'word') {
      exportToWord(dataToExport, 'prescription-orders.docx');
    }
    setShowExportModal(false);
    addNotification(`Data exported as ${exportFormat.toUpperCase()}`, 'success');
  };

  const handleImport = () => {
    // Simulate import process
    setTimeout(() => {
      setShowImportModal(false);
      setImportFile(null);
      addNotification('Prescription orders imported successfully', 'success');
    }, 2000);
  };

  const addNotification = (message, type) => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications([newNotification, ...notifications].slice(0, 5));
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filters.status || order.status === filters.status;
    const matchesPaymentStatus = !filters.paymentStatus || order.paymentStatus === filters.paymentStatus;
    const matchesPriority = !filters.priority || order.priority === filters.priority;
    const matchesDeliveryMethod = !filters.deliveryMethod || order.deliveryMethod === filters.deliveryMethod;
    
    return matchesSearch && matchesStatus && matchesPaymentStatus && matchesPriority && matchesDeliveryMethod;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const paginatedOrders = sortedOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedOrders.length / itemsPerPage);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'processing': return 'bg-blue-100 text-blue-700';
      case 'ready': return 'bg-purple-100 text-purple-700';
      case 'completed': return 'bg-green-100 text-green-700';
      case 'cancelled': return 'bg-red-100 text-red-700';
      case 'refunded': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentStatusColor = (status) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-orange-100 text-orange-700';
      case 'failed': return 'bg-red-100 text-red-700';
      case 'refunded': return 'bg-purple-100 text-purple-700';
      case 'partially_paid': return 'bg-blue-100 text-blue-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-100 text-red-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'low': return 'bg-gray-100 text-gray-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Prescription Orders</h1>
          <p className="text-gray-500 mt-1">Manage and process prescription orders efficiently</p>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <button
            onClick={refreshData}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            Refresh
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button
            onClick={() => setShowExportModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Order
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{orders.length}</p>
              <p className="text-sm text-green-600 mt-1">+15% from last week</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {orders.filter(o => o.status === 'pending').length}
              </p>
              <p className="text-sm text-yellow-600 mt-1">Need attention</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <Clock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                ${orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0).toFixed(2)}
              </p>
              <p className="text-sm text-green-600 mt-1">+12% from last month</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="p-6 bg-white rounded-xl border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Urgent Orders</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {orders.filter(o => o.priority === 'urgent').length}
              </p>
              <p className="text-sm text-red-600 mt-1">High priority</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {['all', 'pending', 'processing', 'ready', 'completed', 'cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab
                  ? 'border-[#5DBB63] text-[#5DBB63]'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
              {tab === 'all' && <span className="ml-2 text-gray-400">({orders.length})</span>}
              {tab === 'pending' && (
                <span className="ml-2 text-yellow-500">
                  ({orders.filter(o => o.status === 'pending').length})
                </span>
              )}
              {tab === 'urgent' && (
                <span className="ml-2 text-red-500">
                  ({orders.filter(o => o.priority === 'urgent').length})
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders by number, patient, or doctor..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          />
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
            {Object.values(filters).some(v => v) && (
              <span className="w-2 h-2 bg-[#5DBB63] rounded-full"></span>
            )}
          </button>
          
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          >
            <option value="orderDate">Sort by Date</option>
            <option value="orderNumber">Sort by Number</option>
            <option value="total">Sort by Total</option>
            <option value="priority">Sort by Priority</option>
            <option value="status">Sort by Status</option>
          </select>
          
          <button
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
            className="p-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            {sortOrder === 'asc' ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <AnimatePresence>
        {showAdvancedFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="p-4 bg-gray-50 rounded-lg border border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  value={filters.status}
                  onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  <option value="">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="ready">Ready</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                <select
                  value={filters.paymentStatus}
                  onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  <option value="">All Payment Status</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                  <option value="refunded">Refunded</option>
                  <option value="partially_paid">Partially Paid</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  value={filters.priority}
                  onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  <option value="">All Priorities</option>
                  <option value="urgent">Urgent</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Method</label>
                <select
                  value={filters.deliveryMethod}
                  onChange={(e) => setFilters({ ...filters, deliveryMethod: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                >
                  <option value="">All Methods</option>
                  <option value="pickup">Pickup</option>
                  <option value="delivery">Delivery</option>
                  <option value="courier">Courier</option>
                </select>
              </div>
            </div>
            
            <div className="flex items-center justify-end gap-2 mt-4">
              <button
                onClick={() => setFilters({
                  status: '',
                  paymentStatus: '',
                  dateRange: '',
                  patient: '',
                  doctor: '',
                  priority: '',
                  deliveryMethod: ''
                })}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex items-center justify-between"
        >
          <span className="text-blue-700">
            {selectedOrders.length} order{selectedOrders.length > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2">
            <select
              value={bulkAction}
              onChange={(e) => setBulkAction(e.target.value)}
              className="px-3 py-1 border border-blue-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Bulk Actions</option>
              <option value="process">Mark as Processing</option>
              <option value="complete">Mark as Completed</option>
              <option value="cancel">Cancel Orders</option>
              <option value="delete">Delete Orders</option>
            </select>
            <button
              onClick={() => setShowBulkModal(true)}
              disabled={!bulkAction}
              className="px-4 py-1 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Apply
            </button>
            <button
              onClick={() => setSelectedOrders([])}
              className="px-4 py-1 text-blue-600 hover:text-blue-800 transition-colors"
            >
              Clear Selection
            </button>
          </div>
        </motion.div>
      )}

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedOrders.length === paginatedOrders.length}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedOrders(paginatedOrders.map(o => o.id));
                      } else {
                        setSelectedOrders([]);
                      }
                    }}
                    className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Doctor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Prescription
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Priority
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {loading ? (
                <tr>
                  <td colSpan="11" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <RefreshCw className="w-8 h-8 animate-spin text-[#5DBB63]" />
                      <p className="text-gray-600">Loading prescription orders...</p>
                    </div>
                  </td>
                </tr>
              ) : paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan="11" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center space-y-4">
                      <FileText className="w-12 h-12 text-gray-400" />
                      <div>
                        <p className="text-gray-900 font-medium">No prescription orders found</p>
                        <p className="text-gray-500 text-sm">Orders will appear here when they are created</p>
                      </div>
                      <button
                        onClick={() => setShowAddModal(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Create First Order
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((order) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedOrders([...selectedOrders, order.id]);
                          } else {
                            setSelectedOrders(selectedOrders.filter(id => id !== order.id));
                          }
                        }}
                        className="rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.orderNumber}</p>
                        <p className="text-sm text-gray-500">{order.orderDate}</p>
                        {order.priority === 'urgent' && (
                          <div className="flex items-center gap-1 mt-1">
                            <AlertTriangle className="w-3 h-3 text-red-500" />
                            <span className="text-xs text-red-600">Urgent</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.patient.name}</p>
                        <p className="text-sm text-gray-500">{order.patient.phone}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">{order.doctor.name}</p>
                        <p className="text-sm text-gray-500">{order.doctor.specialization}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {order.prescriptionImage ? (
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1">
                            <FileText className="w-4 h-4 text-blue-500" />
                            <span className="text-sm text-blue-600 font-medium">Available</span>
                          </div>
                          <button
                            onClick={() => {
                              // Quick view prescription
                              const win = window.open(order.prescriptionImage, '_blank');
                              win.focus();
                            }}
                            className="p-1 text-blue-500 hover:text-blue-700 transition-colors"
                            title="View Prescription"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1">
                          <XCircle className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-red-600">Missing</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <p className="font-medium text-gray-900">${order.total.toFixed(2)}</p>
                        {order.paymentStatus === 'partially_paid' && (
                          <p className="text-xs text-gray-500">${order.paidAmount.toFixed(2)} paid</p>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        <div className={`w-2 h-2 rounded-full ${
                          order.status === 'pending' ? 'bg-yellow-400' :
                          order.status === 'processing' ? 'bg-blue-400' :
                          order.status === 'ready' ? 'bg-purple-400' :
                          order.status === 'completed' ? 'bg-green-400' :
                          order.status === 'cancelled' ? 'bg-red-400' :
                          'bg-gray-400'
                        }`}></div>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus === 'paid' ? <CheckCircle className="w-3 h-3" /> :
                         order.paymentStatus === 'pending' ? <Clock className="w-3 h-3" /> :
                         order.paymentStatus === 'failed' ? <XCircle className="w-3 h-3" /> :
                         order.paymentStatus === 'refunded' ? <RefreshCw className="w-3 h-3" /> :
                         <AlertCircle className="w-3 h-3" />}
                        {order.paymentStatus.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(order.priority)}`}>
                        {order.priority}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowViewModal(true);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setEditingOrder(order);
                            setFormData(order);
                            setShowAddModal(true);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Edit Order"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handlePrintPrescription(order)}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Print Prescription"
                        >
                          <Printer className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowEmailModal(true);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Send Email"
                        >
                          <Mail className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setShowSmsModal(true);
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Send SMS"
                        >
                          <MessageSquare className="w-4 h-4" />
                        </button>
                        {order.paymentStatus !== 'paid' && (
                          <button
                            onClick={() => {
                              setSelectedOrder(order);
                              setShowPaymentModal(true);
                            }}
                            className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                            title="Process Payment"
                          >
                            <CreditCard className="w-4 h-4" />
                          </button>
                        )}
                        <div className="relative group">
                          <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                          <div className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'processing')}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              Mark as Processing
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'ready')}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              Mark as Ready
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'completed')}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              Mark as Completed
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'cancelled')}
                              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            >
                              Cancel Order
                            </button>
                            {order.paymentStatus === 'paid' && (
                              <button
                                onClick={() => {
                                  setSelectedOrder(order);
                                  setShowRefundModal(true);
                                }}
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              >
                                Process Refund
                              </button>
                            )}
                            <hr className="my-1" />
                            <button
                              onClick={() => handleDeleteOrder(order.id)}
                              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            >
                              Delete Order
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, sortedOrders.length)} of {sortedOrders.length} results
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-[#5DBB63] text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            className={`p-4 rounded-lg shadow-lg ${
              notification.type === 'success' ? 'bg-green-500 text-white' :
              notification.type === 'error' ? 'bg-red-500 text-white' :
              notification.type === 'warning' ? 'bg-yellow-500 text-white' :
              'bg-blue-500 text-white'
            }`}
          >
            <p className="text-sm font-medium">{notification.message}</p>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Order Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">
                    {editingOrder ? 'Edit Prescription Order' : 'Create New Prescription Order'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingOrder(null);
                      setFormData({});
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Patient Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name *</label>
                      <input
                        type="text"
                        value={formData.patient?.name || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          patient: { ...formData.patient, name: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter patient name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        value={formData.patient?.phone || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          patient: { ...formData.patient, phone: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter phone number"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                      <input
                        type="email"
                        value={formData.patient?.email || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          patient: { ...formData.patient, email: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter email address"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                      <input
                        type="date"
                        value={formData.patient?.dateOfBirth || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          patient: { ...formData.patient, dateOfBirth: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Doctor Information */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Doctor Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name *</label>
                      <input
                        type="text"
                        value={formData.doctor?.name || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          doctor: { ...formData.doctor, name: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter doctor name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                      <input
                        type="text"
                        value={formData.doctor?.specialization || ''}
                        onChange={(e) => setFormData({ 
                          ...formData, 
                          doctor: { ...formData.doctor, specialization: e.target.value }
                        })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter specialization"
                      />
                    </div>
                  </div>
                </div>

                {/* Order Details */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Order Details</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        value={formData.priority || ''}
                        onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                      >
                        <option value="">Select priority</option>
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                        <option value="urgent">Urgent</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Method</label>
                      <select
                        value={formData.deliveryMethod || ''}
                        onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                      >
                        <option value="">Select delivery method</option>
                        <option value="pickup">Pickup</option>
                        <option value="delivery">Delivery</option>
                        <option value="courier">Courier</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Order Date</label>
                      <input
                        type="date"
                        value={formData.orderDate || ''}
                        onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Prescription Upload */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Prescription</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {prescriptionFile ? (
                      <div className="space-y-4">
                        <FileText className="mx-auto h-12 w-12 text-blue-500" />
                        <p className="text-sm text-gray-700">Selected: {prescriptionFile.name}</p>
                        <button
                          onClick={() => setPrescriptionFile(null)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove file
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div>
                          <label htmlFor="prescription-upload" className="cursor-pointer">
                            <span className="text-[#5DBB63] hover:text-[#4CAF50]">Upload prescription</span>
                            <span className="text-gray-500"> or drag and drop</span>
                          </label>
                          <input
                            id="prescription-upload"
                            type="file"
                            accept="image/*,.pdf"
                            onChange={(e) => setPrescriptionFile(e.target.files[0])}
                            className="hidden"
                          />
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Notes</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Order Notes</label>
                      <textarea
                        value={formData.notes || ''}
                        onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Enter any special instructions or notes"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Internal Notes</label>
                      <textarea
                        value={formData.internalNotes || ''}
                        onChange={(e) => setFormData({ ...formData, internalNotes: e.target.value })}
                        rows={2}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        placeholder="Internal notes for pharmacy staff"
                      />
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 border-t border-gray-200 flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingOrder(null);
                    setFormData({});
                    setPrescriptionFile(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={editingOrder ? handleEditOrder : handleAddOrder}
                  className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors"
                >
                  {editingOrder ? 'Update Order' : 'Create Order'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Order Modal */}
      <AnimatePresence>
        {showViewModal && selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-gray-900">Order Details - {selectedOrder.orderNumber}</h2>
                  <button
                    onClick={() => {
                      setShowViewModal(false);
                      setSelectedOrder(null);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Patient & Doctor Info */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Information</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Name</span>
                            <span className="text-sm font-medium text-gray-900">{selectedOrder.patient.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Phone</span>
                            <span className="text-sm font-medium text-gray-900">{selectedOrder.patient.phone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Email</span>
                            <span className="text-sm font-medium text-gray-900">{selectedOrder.patient.email}</span>
                          </div>
                          {selectedOrder.patient.dateOfBirth && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Date of Birth</span>
                              <span className="text-sm font-medium text-gray-900">{selectedOrder.patient.dateOfBirth}</span>
                            </div>
                          )}
                          {selectedOrder.patient.address && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Address</span>
                              <span className="text-sm font-medium text-gray-900">{selectedOrder.patient.address}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Doctor Information</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Name</span>
                            <span className="text-sm font-medium text-gray-900">{selectedOrder.doctor.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Specialization</span>
                            <span className="text-sm font-medium text-gray-900">{selectedOrder.doctor.specialization}</span>
                          </div>
                          {selectedOrder.doctor.license && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">License</span>
                              <span className="text-sm font-medium text-gray-900">{selectedOrder.doctor.license}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Order Details */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Order Information</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Order Number</span>
                            <span className="text-sm font-medium text-gray-900">{selectedOrder.orderNumber}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Order Date</span>
                            <span className="text-sm font-medium text-gray-900">{selectedOrder.orderDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Priority</span>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(selectedOrder.priority)}`}>
                              {selectedOrder.priority}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Delivery Method</span>
                            <span className="text-sm font-medium text-gray-900 capitalize">{selectedOrder.deliveryMethod}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Status</span>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedOrder.status)}`}>
                              {selectedOrder.status}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Payment Status</span>
                            <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(selectedOrder.paymentStatus)}`}>
                              {selectedOrder.paymentStatus.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Financial Summary</h3>
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="space-y-3">
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Subtotal</span>
                            <span className="text-sm font-medium text-gray-900">${selectedOrder.subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm text-gray-500">Tax</span>
                            <span className="text-sm font-medium text-gray-900">${selectedOrder.tax.toFixed(2)}</span>
                          </div>
                          {selectedOrder.deliveryFee > 0 && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Delivery Fee</span>
                              <span className="text-sm font-medium text-gray-900">${selectedOrder.deliveryFee.toFixed(2)}</span>
                            </div>
                          )}
                          <div className="flex justify-between pt-3 border-t border-gray-200">
                            <span className="text-sm font-medium text-gray-900">Total</span>
                            <span className="text-lg font-bold text-gray-900">${selectedOrder.total.toFixed(2)}</span>
                          </div>
                          {selectedOrder.paidAmount > 0 && (
                            <div className="flex justify-between">
                              <span className="text-sm text-gray-500">Paid Amount</span>
                              <span className="text-sm font-medium text-green-600">${selectedOrder.paidAmount.toFixed(2)}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Prescription Upload */}
                {!selectedOrder.prescriptionImage && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Prescription Upload</h3>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <Upload className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-blue-800">No Prescription Image</h4>
                          <p className="text-sm text-blue-700 mt-1">
                            This order doesn't have a prescription image yet. You can upload one now.
                          </p>
                          <div className="mt-4">
                            <label className="flex items-center justify-center w-full h-32 px-4 py-2 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100 transition-colors">
                              <div className="text-center">
                                <Upload className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                                <p className="text-sm text-blue-600">Click to upload prescription image</p>
                                <p className="text-xs text-blue-500 mt-1">JPG, PNG up to 10MB</p>
                              </div>
                              <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => {
                                  const file = e.target.files[0];
                                  if (file) {
                                    // Create a temporary URL for the uploaded image
                                    const imageUrl = URL.createObjectURL(file);
                                    const updatedOrders = orders.map(order =>
                                      order.id === selectedOrder.id 
                                        ? { ...order, prescriptionImage: imageUrl }
                                        : order
                                    );
                                    setOrders(updatedOrders);
                                    setSelectedOrder({ ...selectedOrder, prescriptionImage: imageUrl });
                                    addNotification('Prescription image uploaded successfully', 'success');
                                  }
                                }}
                              />
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Prescription Image */}
                {selectedOrder.prescriptionImage && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Prescription Image</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex flex-col items-center space-y-4">
                        <div className="relative">
                          <img
                            src={selectedOrder.prescriptionImage}
                            alt="Prescription"
                            className="max-w-full h-auto rounded-lg shadow-lg border border-gray-200"
                            style={{ maxHeight: '400px' }}
                            onError={(e) => {
                              e.target.src = '/prescriptions/placeholder-prescription.jpg';
                            }}
                          />
                          <div className="absolute top-2 right-2 flex gap-2">
                            <button
                              onClick={() => {
                                const link = document.createElement('a');
                                link.href = selectedOrder.prescriptionImage;
                                link.download = `prescription-${selectedOrder.orderNumber}.jpg`;
                                link.click();
                              }}
                              className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                              title="Download Prescription"
                            >
                              <Download className="w-4 h-4 text-gray-700" />
                            </button>
                            <button
                              onClick={() => {
                                const win = window.open(selectedOrder.prescriptionImage, '_blank');
                                win.focus();
                              }}
                              className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
                              title="View Full Size"
                            >
                              <Eye className="w-4 h-4 text-gray-700" />
                            </button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 text-center">
                          <p>Prescription uploaded by patient</p>
                          <p className="text-xs text-gray-500 mt-1">Click the buttons to download or view full size</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Prescription Verification */}
                {selectedOrder.prescriptionImage && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Prescription Verification</h3>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-yellow-800">Verification Required</h4>
                          <p className="text-sm text-yellow-700 mt-1">
                            Please verify the prescription details before dispensing medications. Check for:
                          </p>
                          <ul className="text-sm text-yellow-700 mt-2 list-disc list-inside space-y-1">
                            <li>Doctor's signature and license number</li>
                            <li>Patient name and details match</li>
                            <li>Medication names and dosages are clear</li>
                            <li>Prescription date is valid (not expired)</li>
                            <li>Controlled substance regulations compliance</li>
                          </ul>
                          <div className="flex gap-3 mt-4">
                            <button
                              onClick={handleVerifyPrescription}
                              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                            >
                              <CheckCircle className="w-4 h-4" />
                              Verify Prescription
                            </button>
                            <button
                              onClick={() => {
                                setShowViewModal(false);
                                setShowAddModal(true);
                                setEditingOrder(selectedOrder);
                                setFormData(selectedOrder);
                              }}
                              className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors flex items-center gap-2"
                            >
                              <AlertCircle className="w-4 h-4" />
                              Flag for Review
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Medication Items */}
                <div className="mt-8">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Medication Items</h3>
                  <div className="bg-gray-50 rounded-lg overflow-hidden">
                    <table className="w-full">
                      <thead className="bg-gray-100">
                        <tr>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Medication</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Unit Price</th>
                          <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedOrder.items.map((item, index) => (
                          <tr key={index}>
                            <td className="px-4 py-3">
                              <div>
                                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                <p className="text-xs text-gray-500">{item.category}</p>
                                {item.instructions && (
                                  <p className="text-xs text-gray-600 mt-1">{item.instructions}</p>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm text-gray-900">{item.quantity}</td>
                            <td className="px-4 py-3 text-sm text-gray-900">${item.unitPrice.toFixed(2)}</td>
                            <td className="px-4 py-3 text-sm font-medium text-gray-900">
                              ${(item.quantity * item.unitPrice).toFixed(2)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Notes */}
                {(selectedOrder.notes || selectedOrder.internalNotes) && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
                    <div className="space-y-4">
                      {selectedOrder.notes && (
                        <div className="bg-blue-50 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-blue-900 mb-2">Order Notes</h4>
                          <p className="text-sm text-blue-700">{selectedOrder.notes}</p>
                        </div>
                      )}
                      {selectedOrder.internalNotes && (
                        <div className="bg-yellow-50 rounded-lg p-4">
                          <h4 className="text-sm font-medium text-yellow-900 mb-2">Internal Notes</h4>
                          <p className="text-sm text-yellow-700">{selectedOrder.internalNotes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 flex items-center justify-end gap-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => handlePrintPrescription(selectedOrder)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Printer className="w-4 h-4 inline mr-2" />
                    Print
                  </button>
                  <button
                    onClick={() => {
                      setEditingOrder(selectedOrder);
                      setFormData(selectedOrder);
                      setShowViewModal(false);
                      setShowAddModal(true);
                    }}
                    className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors"
                  >
                    <Edit3 className="w-4 h-4 inline mr-2" />
                    Edit Order
                  </button>
                  {selectedOrder.paymentStatus !== 'paid' && (
                    <button
                      onClick={() => {
                        setSelectedOrder(selectedOrder);
                        setShowPaymentModal(true);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      <CreditCard className="w-4 h-4 inline mr-2" />
                      Process Payment
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Email Modal */}
      <AnimatePresence>
        {showEmailModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Send Email</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                  <input
                    type="email"
                    value={selectedOrder?.patient?.email || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    value={emailData.subject || `Update regarding your order ${selectedOrder?.orderNumber}`}
                    onChange={(e) => setEmailData({ ...emailData, subject: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    value={emailData.message || ''}
                    onChange={(e) => setEmailData({ ...emailData, message: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    placeholder="Enter your message..."
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowEmailModal(false);
                    setEmailData({});
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendEmail}
                  className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors"
                >
                  Send Email
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* SMS Modal */}
      <AnimatePresence>
        {showSmsModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Send SMS</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                  <input
                    type="tel"
                    value={selectedOrder?.patient?.phone || ''}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                  <textarea
                    value={smsData.message || ''}
                    onChange={(e) => setSmsData({ ...smsData, message: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    placeholder="Enter your SMS message..."
                  />
                  <p className="text-xs text-gray-500 mt-1">Character limit: 160</p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowSmsModal(false);
                    setSmsData({});
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSendSms}
                  className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors"
                >
                  Send SMS
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {showPaymentModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Process Payment</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">Order Amount</span>
                    <span className="text-lg font-bold text-gray-900">${selectedOrder?.total?.toFixed(2)}</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
                  <select
                    value={paymentData.method || ''}
                    onChange={(e) => setPaymentData({ ...paymentData, method: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  >
                    <option value="">Select payment method</option>
                    <option value="cash">Cash</option>
                    <option value="card">Credit/Debit Card</option>
                    <option value="insurance">Insurance</option>
                    <option value="online">Online Payment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount Received</label>
                  <input
                    type="number"
                    step="0.01"
                    value={paymentData.amount || selectedOrder?.total || ''}
                    onChange={(e) => setPaymentData({ ...paymentData, amount: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Transaction ID</label>
                  <input
                    type="text"
                    value={paymentData.transactionId || ''}
                    onChange={(e) => setPaymentData({ ...paymentData, transactionId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    placeholder="Enter transaction ID (optional)"
                  />
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setPaymentData({});
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleProcessPayment}
                  disabled={!paymentData.method}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Process Payment
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bulk Action Confirmation Modal */}
      <AnimatePresence>
        {showBulkModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Confirm Bulk Action</h2>
              <p className="text-gray-600 mb-6">
                Are you sure you want to {bulkAction} {selectedOrders.length} order{selectedOrders.length > 1 ? 's' : ''}?
                {bulkAction === 'delete' && ' This action cannot be undone.'}
              </p>
              <div className="flex items-center justify-end gap-3">
                <button
                  onClick={() => {
                    setShowBulkModal(false);
                    setBulkAction('');
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBulkAction}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    bulkAction === 'delete' 
                      ? 'bg-red-600 text-white hover:bg-red-700' 
                      : 'bg-[#5DBB63] text-white hover:bg-[#4CAF50]'
                  }`}
                >
                  {bulkAction === 'delete' ? 'Delete' : 
                   bulkAction === 'process' ? 'Process' :
                   bulkAction === 'complete' ? 'Complete' : 'Cancel'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Import Modal */}
      <AnimatePresence>
        {showImportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Import Prescription Orders</h2>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <div className="mt-4">
                  <label htmlFor="file-upload" className="cursor-pointer">
                    <span className="text-[#5DBB63] hover:text-[#4CAF50]">Upload a file</span>
                    <span className="text-gray-500"> or drag and drop</span>
                  </label>
                  <input
                    id="file-upload"
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={(e) => setImportFile(e.target.files[0])}
                    className="hidden"
                  />
                </div>
                <p className="text-xs text-gray-500 mt-2">CSV, XLS, XLSX up to 10MB</p>
              </div>
              {importFile && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">Selected: {importFile.name}</p>
                </div>
              )}
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowImportModal(false);
                    setImportFile(null);
                  }}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleImport}
                  disabled={!importFile}
                  className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Import
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Export Modal */}
      <AnimatePresence>
        {showExportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Export Prescription Orders</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="csv"
                        checked={exportFormat === 'csv'}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="text-[#5DBB63]"
                      />
                      <span className="text-sm text-gray-700">CSV</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="pdf"
                        checked={exportFormat === 'pdf'}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="text-[#5DBB63]"
                      />
                      <span className="text-sm text-gray-700">PDF</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input
                        type="radio"
                        value="word"
                        checked={exportFormat === 'word'}
                        onChange={(e) => setExportFormat(e.target.value)}
                        className="text-[#5DBB63]"
                      />
                      <span className="text-sm text-gray-700">Word Document</span>
                    </label>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">
                    {selectedOrders.length > 0 
                      ? `Exporting ${selectedOrders.length} selected orders`
                      : `Exporting all ${orders.length} orders`}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowExportModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleExport}
                  className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors"
                >
                  Export
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PrescriptionOrdersEnhanced;
