import { useState } from 'react';
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
  Save,
  Phone,
  Mail,
  MapPin,
  Building,
  DollarSign,
  Package,
  Calendar,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Send,
  RefreshCw,
  User
} from 'lucide-react';
import { exportToPDF, exportToWord, exportToCSV, printDocument } from '../../../utils/exportUtils';

// Mock suppliers data
const suppliersData = [
  { id: 1, name: 'Pharma Corp', contactPerson: 'John Smith', email: 'john@pharmacorp.com', phone: '+1-234-567-8901', address: '123 Pharma Street, New York, NY', category: 'Medicines', totalOrders: 150, totalValue: 250000, rating: 4.8, status: 'active', lastOrder: '2024-01-20' },
  { id: 2, name: 'Medical Supplies Inc', contactPerson: 'Sarah Johnson', email: 'sarah@medsupplies.com', phone: '+1-234-567-8902', address: '456 Medical Ave, Los Angeles, CA', category: 'Supplies', totalOrders: 85, totalValue: 120000, rating: 4.5, status: 'active', lastOrder: '2024-01-19' },
  { id: 3, name: 'Tech Med Devices', contactPerson: 'Michael Chen', email: 'michael@techmed.com', phone: '+1-234-567-8903', address: '789 Tech Park, San Francisco, CA', category: 'Devices', totalOrders: 45, totalValue: 350000, rating: 4.9, status: 'active', lastOrder: '2024-01-18' },
  { id: 4, name: 'Global Pharma', contactPerson: 'Emily Williams', email: 'emily@globalpharma.com', phone: '+1-234-567-8904', address: '321 Global Road, Chicago, IL', category: 'Medicines', totalOrders: 200, totalValue: 500000, rating: 4.7, status: 'active', lastOrder: '2024-01-20' },
  { id: 5, name: 'First Aid Supplies', contactPerson: 'Robert Brown', email: 'robert@firstaid.com', phone: '+1-234-567-8905', address: '654 First Aid Blvd, Houston, TX', category: 'First Aid', totalOrders: 60, totalValue: 75000, rating: 4.3, status: 'inactive', lastOrder: '2024-01-10' },
  { id: 6, name: 'Lab Equipment Co', contactPerson: 'Lisa Anderson', email: 'lisa@labequip.com', phone: '+1-234-567-8906', address: '987 Lab Lane, Boston, MA', category: 'Devices', totalOrders: 30, totalValue: 180000, rating: 4.6, status: 'active', lastOrder: '2024-01-17' },
];

const categories = ['All', 'Medicines', 'Supplies', 'Devices', 'First Aid'];

const statusColors = {
  active: 'bg-green-100 text-green-700',
  inactive: 'bg-gray-100 text-gray-700',
  suspended: 'bg-red-100 text-red-700',
};

export default function Suppliers() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newSupplier, setNewSupplier] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    category: 'Medicines',
    status: 'active',
  });

  const filteredSuppliers = suppliersData.filter(supplier => {
    const matchesSearch = 
      supplier.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()) ||
      supplier.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || supplier.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || supplier.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  // Stats
  const totalSuppliers = suppliersData.length;
  const activeSuppliers = suppliersData.filter(s => s.status === 'active').length;
  const totalValue = suppliersData.reduce((sum, s) => sum + s.totalValue, 0);
  const avgRating = (suppliersData.reduce((sum, s) => sum + s.rating, 0) / totalSuppliers).toFixed(1);

  const handleViewSupplier = (supplier) => {
    setSelectedSupplier(supplier);
    setShowViewModal(true);
  };

  const handleEditSupplier = (supplier) => {
    setEditingSupplier({ ...supplier });
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    alert(`Supplier ${editingSupplier.name} updated successfully`);
    setShowEditModal(false);
    setEditingSupplier(null);
  };

  const handleAddSupplier = () => {
    alert(`New supplier ${newSupplier.name} added successfully`);
    setShowAddModal(false);
    setNewSupplier({
      name: '',
      contactPerson: '',
      email: '',
      phone: '',
      address: '',
      category: 'Medicines',
      status: 'active',
    });
  };

  const handleExportPDF = () => {
    const columns = [
      { key: 'name', label: 'Supplier Name' },
      { key: 'contactPerson', label: 'Contact Person' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'category', label: 'Category' },
      { key: 'totalOrders', label: 'Orders' },
      { key: 'totalValue', label: 'Total Value', transform: (v) => `$${v.toLocaleString()}` },
      { key: 'rating', label: 'Rating' },
      { key: 'status', label: 'Status' },
    ];
    exportToPDF(filteredSuppliers, 'Suppliers Report', columns);
  };

  const handleExportWord = () => {
    const columns = [
      { key: 'name', label: 'Supplier Name' },
      { key: 'contactPerson', label: 'Contact Person' },
      { key: 'email', label: 'Email' },
      { key: 'phone', label: 'Phone' },
      { key: 'category', label: 'Category' },
      { key: 'totalOrders', label: 'Orders' },
      { key: 'totalValue', label: 'Total Value', transform: (v) => `$${v.toLocaleString()}` },
      { key: 'rating', label: 'Rating' },
      { key: 'status', label: 'Status' },
    ];
    exportToWord(filteredSuppliers, 'Suppliers Report', columns);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Suppliers</h1>
          <p className="text-gray-500 mt-1">Manage supplier relationships and orders</p>
        </div>
        <div className="flex gap-3">
          <button onClick={handleExportPDF} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FileText className="w-4 h-4" />PDF
          </button>
          <button onClick={handleExportWord} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <FileSpreadsheet className="w-4 h-4" />Word
          </button>
          <button onClick={printDocument} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Printer className="w-4 h-4" />Print
          </button>
          <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]">
            <Plus className="w-4 h-4" />Add Supplier
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Suppliers</p>
              <p className="text-2xl font-bold text-gray-900">{totalSuppliers}</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Building className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Suppliers</p>
              <p className="text-2xl font-bold text-green-600">{activeSuppliers}</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Business Value</p>
              <p className="text-2xl font-bold text-purple-600">${(totalValue / 1000).toFixed(0)}K</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Avg. Rating</p>
              <p className="text-2xl font-bold text-yellow-600">{avgRating}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search suppliers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
          </select>
        </div>
      </div>

      {/* Suppliers Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Supplier</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Contact Person</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Orders</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Total Value</th>
                <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Last Order</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSuppliers.map((supplier, index) => (
                <motion.tr
                  key={supplier.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.03 }}
                  className="hover:bg-gray-50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white font-bold">
                        {supplier.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{supplier.name}</p>
                        <p className="text-xs text-gray-500">{supplier.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <p className="font-medium text-gray-900">{supplier.contactPerson}</p>
                      <p className="text-xs text-gray-500">{supplier.phone}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                      {supplier.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className="font-medium text-gray-900">{supplier.totalOrders}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <span className="font-medium text-gray-900">${supplier.totalValue.toLocaleString()}</span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="font-medium text-yellow-600">{supplier.rating}</span>
                      <span className="text-yellow-500">★</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[supplier.status]}`}>
                      {supplier.status.charAt(0).toUpperCase() + supplier.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-gray-500">{supplier.lastOrder}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => handleViewSupplier(supplier)} className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="View">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleEditSupplier(supplier)} className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg" title="Edit">
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Delete">
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

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedSupplier && (
          <SupplierViewModal supplier={selectedSupplier} onClose={() => setShowViewModal(false)} />
        )}
      </AnimatePresence>

      {/* Edit Modal */}
      <AnimatePresence>
        {showEditModal && editingSupplier && (
          <SupplierEditModal supplier={editingSupplier} onClose={() => setShowEditModal(false)} onSave={handleSaveEdit} />
        )}
      </AnimatePresence>

      {/* Add Modal */}
      <AnimatePresence>
        {showAddModal && (
          <SupplierAddModal supplier={newSupplier} setSupplier={setNewSupplier} onClose={() => setShowAddModal(false)} onSave={handleAddSupplier} />
        )}
      </AnimatePresence>
    </div>
  );
}

function SupplierViewModal({ supplier, onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white text-2xl font-bold">
                {supplier.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">{supplier.name}</h2>
                <p className="text-gray-500">{supplier.category}</p>
              </div>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh] space-y-6">
          {/* Contact Info */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 mb-3">Contact Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Contact Person</p>
                  <p className="font-medium">{supplier.contactPerson}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Phone</p>
                  <p className="font-medium">{supplier.phone}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Email</p>
                  <p className="font-medium">{supplier.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Address</p>
                  <p className="font-medium">{supplier.address}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-green-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-green-600">{supplier.totalOrders}</p>
              <p className="text-sm text-gray-600">Total Orders</p>
            </div>
            <div className="bg-purple-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-purple-600">${(supplier.totalValue / 1000).toFixed(0)}K</p>
              <p className="text-sm text-gray-600">Total Value</p>
            </div>
            <div className="bg-yellow-50 rounded-lg p-4 text-center">
              <p className="text-2xl font-bold text-yellow-600">{supplier.rating}</p>
              <p className="text-sm text-gray-600">Rating</p>
            </div>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end">
          <button onClick={onClose} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SupplierEditModal({ supplier, onClose, onSave }) {
  const [formData, setFormData] = useState(supplier);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-md"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Edit Supplier</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
            <input
              type="text"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={onSave} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg">
            <Save className="w-4 h-4" />Save Changes
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

function SupplierAddModal({ supplier, setSupplier, onClose, onSave }) {
  const [imagePreview, setImagePreview] = useState(supplier?.logo || null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        setSupplier({ ...supplier, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="bg-white rounded-2xl w-full max-w-md"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">Add New Supplier</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Supplier Name</label>
            <input
              type="text"
              value={supplier.name}
              onChange={(e) => setSupplier({ ...supplier, name: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              placeholder="Enter supplier name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person</label>
            <input
              type="text"
              value={supplier.contactPerson}
              onChange={(e) => setSupplier({ ...supplier, contactPerson: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              placeholder="Enter contact person"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={supplier.email}
              onChange={(e) => setSupplier({ ...supplier, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              placeholder="Enter email"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
            <input
              type="text"
              value={supplier.phone}
              onChange={(e) => setSupplier({ ...supplier, phone: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              placeholder="Enter phone number"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
            <select
              value={supplier.category}
              onChange={(e) => setSupplier({ ...supplier, category: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            >
              <option value="Medicines">Medicines</option>
              <option value="Supplies">Supplies</option>
              <option value="Devices">Devices</option>
              <option value="First Aid">First Aid</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <textarea
              value={supplier.address}
              onChange={(e) => setSupplier({ ...supplier, address: e.target.value })}
              rows={2}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
              placeholder="Enter address"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Logo</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Logo Preview" className="w-full h-32 object-cover rounded-lg" />
              </div>
            )}
          </div>
        </div>
        <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            Cancel
          </button>
          <button onClick={onSave} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg">
            <Save className="w-4 h-4" />Add Supplier
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
