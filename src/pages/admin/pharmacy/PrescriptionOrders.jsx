import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
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
  FileText,
  Save,
  X,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3,
  ShoppingCart,
  User,
  Phone,
  Mail,
  MapPin,
  CreditCard,
  Truck,
  Printer
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV } from '../../../utils/exportUtils';

const PrescriptionOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [filters, setFilters] = useState({
    status: '',
    priority: '',
    dateRange: '',
    paymentStatus: ''
  });

  // Mock data
  const mockOrders = [
    {
      id: 1,
      orderNumber: 'RX-2024-001',
      patientName: 'John Smith',
      patientId: 'PAT001',
      doctorName: 'Dr. Sarah Johnson',
      doctorId: 'DOC001',
      orderDate: '2024-02-28',
      prescriptionDate: '2024-02-27',
      expectedDeliveryDate: '2024-03-02',
      actualDeliveryDate: '2024-03-01',
      status: 'Completed',
      priority: 'Normal',
      paymentStatus: 'Paid',
      totalAmount: 125.50,
      items: [
        {
          id: 1,
          medicineName: 'Amoxicillin 250mg',
          dosage: '250mg',
          quantity: 30,
          unit: 'Capsules',
          instructions: 'Take 1 capsule 3 times daily with meals',
          price: 45.00
        },
        {
          id: 2,
          medicineName: 'Paracetamol 500mg',
          dosage: '500mg',
          quantity: 20,
          unit: 'Tablets',
          instructions: 'Take 1-2 tablets every 4-6 hours as needed',
          price: 15.00
        }
      ],
      patientPhone: '+1-555-0123',
      patientEmail: 'john.smith@email.com',
      patientAddress: '123 Main St, City, State 12345',
      deliveryMethod: 'Home Delivery',
      paymentMethod: 'Credit Card',
      notes: 'Patient allergic to penicillin alternatives',
      pharmacist: 'Robert Martinez',
      insuranceInfo: 'Health Insurance Co. - Policy #123456',
      createdAt: '2024-02-27T10:30:00Z',
      updatedAt: '2024-03-01T14:20:00Z'
    },
    {
      id: 2,
      orderNumber: 'RX-2024-002',
      patientName: 'Emily Johnson',
      patientId: 'PAT002',
      doctorName: 'Dr. Michael Chen',
      doctorId: 'DOC002',
      orderDate: '2024-02-28',
      prescriptionDate: '2024-02-26',
      expectedDeliveryDate: '2024-03-03',
      actualDeliveryDate: null,
      status: 'Processing',
      priority: 'Urgent',
      paymentStatus: 'Pending',
      totalAmount: 89.75,
      items: [
        {
          id: 1,
          medicineName: 'Lisinopril 10mg',
          dosage: '10mg',
          quantity: 60,
          unit: 'Tablets',
          instructions: 'Take 1 tablet daily in the morning',
          price: 35.00
        },
        {
          id: 2,
          medicineName: 'Vitamin D3 1000 IU',
          dosage: '1000 IU',
          quantity: 90,
          unit: 'Softgels',
          instructions: 'Take 1 softgel daily with meal',
          price: 25.00
        }
      ],
      patientPhone: '+1-555-0124',
      patientEmail: 'emily.johnson@email.com',
      patientAddress: '456 Oak Ave, City, State 67890',
      deliveryMethod: 'Store Pickup',
      paymentMethod: 'Cash',
      notes: 'Patient prefers generic brands when available',
      pharmacist: 'Lisa Anderson',
      insuranceInfo: 'Medicare - Policy #789012',
      createdAt: '2024-02-26T14:15:00Z',
      updatedAt: '2024-02-28T09:45:00Z'
    },
    {
      id: 3,
      orderNumber: 'RX-2024-003',
      patientName: 'William Davis',
      patientId: 'PAT003',
      doctorName: 'Dr. Lisa Anderson',
      doctorId: 'DOC003',
      orderDate: '2024-02-27',
      prescriptionDate: '2024-02-25',
      expectedDeliveryDate: '2024-03-01',
      actualDeliveryDate: '2024-03-01',
      status: 'Completed',
      priority: 'Normal',
      paymentStatus: 'Paid',
      totalAmount: 210.25,
      items: [
        {
          id: 1,
          medicineName: 'Insulin Glargine',
          dosage: '100 U/ml',
          quantity: 5,
          unit: 'Vials',
          instructions: 'Inject 10 units subcutaneously once daily at bedtime',
          price: 180.00
        },
        {
          id: 2,
          medicineName: 'Test Strips',
          dosage: 'N/A',
          quantity: 100,
          unit: 'Strips',
          instructions: 'Use with glucose meter before meals',
          price: 30.25
        }
      ],
      patientPhone: '+1-555-0125',
      patientEmail: 'william.davis@email.com',
      patientAddress: '789 Pine Rd, City, State 11111',
      deliveryMethod: 'Home Delivery',
      paymentMethod: 'Insurance',
      notes: 'Patient requires refrigerated delivery for insulin',
      pharmacist: 'Jennifer Davis',
      insuranceInfo: 'Blue Cross - Policy #345678',
      createdAt: '2024-02-25T16:20:00Z',
      updatedAt: '2024-03-01T11:30:00Z'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.patientId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !filters.status || order.status === filters.status;
    const matchesPriority = !filters.priority || order.priority === filters.priority;
    const matchesPaymentStatus = !filters.paymentStatus || order.paymentStatus === filters.paymentStatus;
    
    return matchesSearch && matchesStatus && matchesPriority && matchesPaymentStatus;
  });

  const handleAddOrder = () => {
    setEditingOrder(null);
    setShowAddModal(true);
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setShowAddModal(true);
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowViewModal(true);
  };

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this prescription order?')) {
      setOrders(orders.filter(o => o.id !== orderId));
    }
  };

  const handleSaveOrder = (orderData) => {
    if (editingOrder) {
      // Update existing order
      setOrders(orders.map(o => 
        o.id === editingOrder.id ? { ...o, ...orderData } : o
      ));
    } else {
      // Add new order
      const newOrder = {
        id: Math.max(...orders.map(o => o.id)) + 1,
        ...orderData,
        orderNumber: `RX-2024-${String(Math.max(...orders.map(o => parseInt(o.orderNumber.split('-')[2]))) + 1).padStart(3, '0')}`,
        createdAt: new Date().toISOString()
      };
      setOrders([...orders, newOrder]);
    }
    setShowAddModal(false);
    setEditingOrder(null);
  };

  const handleExport = (format) => {
    const data = filteredOrders.map(order => ({
      ...order,
      itemCount: order.items.length,
      medicineNames: order.items.map(item => item.medicineName).join(', ')
    }));
    
    const columns = [
      { key: 'orderNumber', label: 'Order Number' },
      { key: 'patientName', label: 'Patient Name' },
      { key: 'doctorName', label: 'Doctor Name' },
      { key: 'orderDate', label: 'Order Date' },
      { key: 'expectedDeliveryDate', label: 'Expected Delivery' },
      { key: 'status', label: 'Status' },
      { key: 'priority', label: 'Priority' },
      { key: 'totalAmount', label: 'Total Amount' },
      { key: 'paymentStatus', label: 'Payment Status' },
      { key: 'deliveryMethod', label: 'Delivery Method' },
      { key: 'medicineNames', label: 'Medicines' }
    ];

    switch (format) {
      case 'pdf':
        exportToPDF(data, 'Prescription Orders Report', columns);
        break;
      case 'word':
        exportToWord(data, 'Prescription Orders Report', columns);
        break;
      case 'csv':
        exportToCSV(data, 'prescription-orders');
        break;
      default:
        break;
    }
  };

  const totalOrders = filteredOrders.length;
  const pendingOrders = filteredOrders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
  const completedOrders = filteredOrders.filter(o => o.status === 'Completed').length;
  const totalRevenue = filteredOrders.filter(o => o.paymentStatus === 'Paid').reduce((sum, o) => sum + o.totalAmount, 0);
  const urgentOrders = filteredOrders.filter(o => o.priority === 'Urgent').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5DBB63]"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Prescription Orders</h1>
            <p className="text-gray-600 mt-1">Manage prescription orders and patient medication requests</p>
          </div>
          <button
            onClick={handleAddOrder}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
          >
            <Plus className="w-5 h-5" />
            New Order
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900">{totalOrders}</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingOrders}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">{completedOrders}</p>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-2xl font-bold text-purple-600">${totalRevenue.toFixed(2)}</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Urgent</p>
                <p className="text-2xl font-bold text-red-600">{urgentOrders}</p>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search orders by patient name, order number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                />
              </div>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Filter className="w-4 h-4" />
                Filters
              </button>
              
              <div className="relative">
                <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  Export
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-10 hidden">
                  <button
                    onClick={() => handleExport('pdf')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Export as PDF
                  </button>
                  <button
                    onClick={() => handleExport('word')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Export as Word
                  </button>
                  <button
                    onClick={() => handleExport('csv')}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4" />
                    Export as CSV
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Filters */}
          {showFilters && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              >
                <option value="">All Status</option>
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
              
              <select
                value={filters.priority}
                onChange={(e) => setFilters({ ...filters, priority: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              >
                <option value="">All Priorities</option>
                <option value="Normal">Normal</option>
                <option value="Urgent">Urgent</option>
                <option value="Emergency">Emergency</option>
              </select>
              
              <select
                value={filters.paymentStatus}
                onChange={(e) => setFilters({ ...filters, paymentStatus: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              >
                <option value="">All Payment Status</option>
                <option value="Paid">Paid</option>
                <option value="Pending">Pending</option>
                <option value="Failed">Failed</option>
              </select>
              
              <select
                value={filters.dateRange}
                onChange={(e) => setFilters({ ...filters, dateRange: e.target.value })}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              >
                <option value="">All Dates</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
              </select>
            </div>
          )}
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.orderNumber}</div>
                        <div className="text-xs text-gray-500">{new Date(order.orderDate).toLocaleDateString()}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.patientName}</div>
                        <div className="text-xs text-gray-500">{order.patientId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.doctorName}</div>
                        <div className="text-xs text-gray-500">{order.doctorId}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {order.items.length} items
                      </div>
                      <div className="text-xs text-gray-500">
                        {order.items.slice(0, 2).map(item => item.medicineName).join(', ')}
                        {order.items.length > 2 && '...'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      ${order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="space-y-1">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : order.status === 'Processing'
                            ? 'bg-blue-100 text-blue-800'
                            : order.status === 'Pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {order.status}
                        </span>
                        {order.priority === 'Urgent' && (
                          <span className="ml-2 px-2 py-1 text-xs font-medium bg-red-100 text-red-800 rounded">
                            Urgent
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleViewOrder(order)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditOrder(order)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteOrder(order.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>

      {/* Add/Edit Modal */}
      {showAddModal && (
        <PrescriptionOrderModal
          order={editingOrder}
          onSave={handleSaveOrder}
          onClose={() => {
            setShowAddModal(false);
            setEditingOrder(null);
          }}
        />
      )}

      {/* View Modal */}
      {showViewModal && selectedOrder && (
        <ViewPrescriptionOrderModal
          order={selectedOrder}
          onClose={() => {
            setShowViewModal(false);
            setSelectedOrder(null);
          }}
        />
      )}
    </div>
  );
};

// Prescription Order Modal Component
const PrescriptionOrderModal = ({ order, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    patientName: order?.patientName || '',
    patientId: order?.patientId || '',
    doctorName: order?.doctorName || '',
    doctorId: order?.doctorId || '',
    orderDate: order?.orderDate || new Date().toISOString().slice(0, 10),
    prescriptionDate: order?.prescriptionDate || new Date().toISOString().slice(0, 10),
    expectedDeliveryDate: order?.expectedDeliveryDate || '',
    status: order?.status || 'Pending',
    priority: order?.priority || 'Normal',
    paymentStatus: order?.paymentStatus || 'Pending',
    patientPhone: order?.patientPhone || '',
    patientEmail: order?.patientEmail || '',
    patientAddress: order?.patientAddress || '',
    deliveryMethod: order?.deliveryMethod || 'Home Delivery',
    paymentMethod: order?.paymentMethod || 'Credit Card',
    notes: order?.notes || '',
    pharmacist: order?.pharmacist || '',
    insuranceInfo: order?.insuranceInfo || '',
    items: order?.items || [
      {
        medicineName: '',
        dosage: '',
        quantity: 1,
        unit: 'Tablets',
        instructions: '',
        price: 0
      }
    ]
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const totalAmount = formData.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    onSave({ ...formData, totalAmount });
  };

  const handleAddItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, {
        medicineName: '',
        dosage: '',
        quantity: 1,
        unit: 'Tablets',
        instructions: '',
        price: 0
      }]
    });
  };

  const handleRemoveItem = (index) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    });
  };

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index][field] = value;
    setFormData({ ...formData, items: updatedItems });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              {order ? 'Edit Prescription Order' : 'New Prescription Order'}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Number</label>
                  <input
                    type="text"
                    value={formData.orderNumber || `RX-2024-${String(Math.max(...orders.map(o => parseInt(o.orderNumber.split('-')[2]))) + 1).padStart(3, '0')}`}
                    onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order Date *</label>
                  <input
                    type="date"
                    value={formData.orderDate}
                    onChange={(e) => setFormData({ ...formData, orderDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Prescription Date *</label>
                  <input
                    type="date"
                    value={formData.prescriptionDate}
                    onChange={(e) => setFormData({ ...formData, prescriptionDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Expected Delivery Date</label>
                  <input
                    type="date"
                    value={formData.expectedDeliveryDate}
                    onChange={(e) => setFormData({ ...formData, expectedDeliveryDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status *</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Processing">Processing</option>
                    <option value="Completed">Completed</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priority *</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  >
                    <option value="Normal">Normal</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status *</label>
                  <select
                    value={formData.paymentStatus}
                    onChange={(e) => setFormData({ ...formData, paymentStatus: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  >
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Failed">Failed</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Name *</label>
                  <input
                    type="text"
                    value={formData.patientName}
                    onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient ID</label>
                  <input
                    type="text"
                    value={formData.patientId}
                    onChange={(e) => setFormData({ ...formData, patientId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doctor Name *</label>
                  <input
                    type="text"
                    value={formData.doctorName}
                    onChange={(e) => setFormData({ ...formData, doctorName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Doctor ID</label>
                  <input
                    type="text"
                    value={formData.doctorId}
                    onChange={(e) => setFormData({ ...formData, doctorId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Phone</label>
                  <input
                    type="tel"
                    value={formData.patientPhone}
                    onChange={(e) => setFormData({ ...formData, patientPhone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Email</label>
                  <input
                    type="email"
                    value={formData.patientEmail}
                    onChange={(e) => setFormData({ ...formData, patientEmail: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Patient Address</label>
                  <textarea
                    value={formData.patientAddress}
                    onChange={(e) => setFormData({ ...formData, patientAddress: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Medication Items</h3>
              <button
                type="button"
                onClick={handleAddItem}
                className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                <Plus className="w-4 h-4" />
                Add Item
              </button>
            </div>
            
            <div className="space-y-4">
              {formData.items.map((item, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Medicine Name *</label>
                      <input
                        type="text"
                        value={item.medicineName}
                        onChange={(e) => handleItemChange(index, 'medicineName', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Dosage</label>
                      <input
                        type="text"
                        value={item.dosage}
                        onChange={(e) => handleItemChange(index, 'dosage', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Quantity *</label>
                      <input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
                      <select
                        value={item.unit}
                        onChange={(e) => handleItemChange(index, 'unit', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        required
                      >
                        <option value="Tablets">Tablets</option>
                        <option value="Capsules">Capsules</option>
                        <option value="Softgels">Softgels</option>
                        <option value="Syrup">Syrup</option>
                        <option value="Injection">Injection</option>
                        <option value="Vials">Vials</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Price ($) *</label>
                      <input
                        type="number"
                        step="0.01"
                        value={item.price}
                        onChange={(e) => handleItemChange(index, 'price', parseFloat(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div className="flex items-end">
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(index)}
                        className="px-3 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Instructions</label>
                    <textarea
                      value={item.instructions}
                      onChange={(e) => handleItemChange(index, 'instructions', e.target.value)}
                      rows={2}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery & Payment</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Method *</label>
                  <select
                    value={formData.deliveryMethod}
                    onChange={(e) => setFormData({ ...formData, deliveryMethod: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  >
                    <option value="Home Delivery">Home Delivery</option>
                    <option value="Store Pickup">Store Pickup</option>
                    <option value="Express Delivery">Express Delivery</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
                  <select
                    value={formData.paymentMethod}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  >
                    <option value="Credit Card">Credit Card</option>
                    <option value="Cash">Cash</option>
                    <option value="Insurance">Insurance</option>
                    <option value="Mobile Payment">Mobile Payment</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Pharmacist</label>
                  <input
                    type="text"
                    value={formData.pharmacist}
                    onChange={(e) => setFormData({ ...formData, pharmacist: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Insurance Information</label>
                  <input
                    type="text"
                    value={formData.insuranceInfo}
                    onChange={(e) => setFormData({ ...formData, insuranceInfo: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {order ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// View Prescription Order Modal Component
const ViewPrescriptionOrderModal = ({ order, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Prescription Order Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Order Number:</span>
                  <div className="font-medium">{order.orderNumber}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Order Date:</span>
                  <div className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Prescription Date:</span>
                  <div className="font-medium">{new Date(order.prescriptionDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Expected Delivery:</span>
                  <div className="font-medium">{new Date(order.expectedDeliveryDate).toLocaleDateString()}</div>
                </div>
                {order.actualDeliveryDate && (
                  <div>
                    <span className="text-sm text-gray-600">Actual Delivery:</span>
                    <div className="font-medium">{new Date(order.actualDeliveryDate).toLocaleDateString()}</div>
                  </div>
                )}
                <div>
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                    order.status === 'Completed' 
                      ? 'bg-green-100 text-green-800' 
                      : order.status === 'Processing'
                      ? 'bg-blue-100 text-blue-800'
                      : order.status === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Priority:</span>
                  <span className={`ml-2 px-2 py-1 text-xs font-medium rounded ${
                    order.priority === 'Urgent' 
                      ? 'bg-red-100 text-red-800' 
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {order.priority}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Payment Status:</span>
                  <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                    order.paymentStatus === 'Paid' 
                      ? 'bg-green-100 text-green-800' 
                      : order.paymentStatus === 'Pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {order.paymentStatus}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Total Amount:</span>
                  <div className="font-medium text-lg">${order.totalAmount.toFixed(2)}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Patient Name:</span>
                  <div className="font-medium">{order.patientName}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Patient ID:</span>
                  <div className="font-medium">{order.patientId}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Doctor Name:</span>
                  <div className="font-medium">{order.doctorName}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Doctor ID:</span>
                  <div className="font-medium">{order.doctorId}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Phone:</span>
                  <div className="font-medium">{order.patientPhone}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Email:</span>
                  <div className="font-medium">{order.patientEmail}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Address:</span>
                  <div className="font-medium">{order.patientAddress}</div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Medication Items</h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Medicine</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Dosage</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Quantity</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Total</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{item.medicineName}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.dosage}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">{item.quantity} {item.unit}</td>
                      <td className="px-4 py-3 text-sm text-gray-900">${item.price.toFixed(2)}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {order.items.length > 0 && (
              <div className="mt-4 space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Instructions:</span>
                  <div className="bg-gray-50 p-3 rounded space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="text-sm">
                        <strong>{item.medicineName}:</strong> {item.instructions}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery & Payment</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Delivery Method:</span>
                    <div className="font-medium">{order.deliveryMethod}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Payment Method:</span>
                    <div className="font-medium">{order.paymentMethod}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Pharmacist:</span>
                    <div className="font-medium">{order.pharmacist}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Insurance:</span>
                    <div className="font-medium">{order.insuranceInfo}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                <div className="space-y-3">
                  {order.notes && (
                    <div>
                      <span className="text-sm text-gray-600">Notes:</span>
                      <div className="font-medium bg-gray-50 p-3 rounded">{order.notes}</div>
                    </div>
                  )}
                  <div>
                    <span className="text-sm text-gray-600">Created:</span>
                    <div className="font-medium">{new Date(order.createdAt).toLocaleString()}</div>
                  </div>
                  {order.updatedAt && (
                    <div>
                      <span className="text-sm text-gray-600">Last Updated:</span>
                      <div className="font-medium">{new Date(order.updatedAt).toLocaleString()}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PrescriptionOrders;