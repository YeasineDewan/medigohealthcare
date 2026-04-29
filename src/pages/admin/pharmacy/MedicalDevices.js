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
  Syringe,
  Heart,
  Brain,
  Bone,
  Stethoscope,
  Thermometer,
  Bandage
} from 'lucide-react';
import { medicalDevicesApi } from '../../../services/apiService';
import { exportToPDF, exportToWord, exportToCSV } from '../../../utils/exportUtils';

// Device Modal Component
const DeviceModal = ({ device, onSave, onClose }) => {
  const [formData, setFormData] = useState({
    name: device?.name || '',
    model: device?.model || '',
    category: device?.category || '',
    manufacturer: device?.manufacturer || '',
    barcode: device?.barcode || '',
    serialNumber: device?.serialNumber || '',
    purchaseDate: device?.purchaseDate || '',
    warrantyExpiry: device?.warrantyExpiry || '',
    unitPrice: device?.unitPrice || 0,
    sellingPrice: device?.sellingPrice || 0,
    currentStock: device?.currentStock || 0,
    minStockLevel: device?.minStockLevel || 5,
    maxStockLevel: device?.maxStockLevel || 50,
    reorderLevel: device?.reorderLevel || 10,
    unit: device?.unit || 'Units',
    description: device?.description || '',
    specifications: device?.specifications || '',
    features: device?.features || '',
    powerSource: device?.powerSource || '',
    dimensions: device?.dimensions || '',
    weight: device?.weight || '',
    certification: device?.certification || '',
    status: device?.status || 'Active',
    lastMaintenance: device?.lastMaintenance || '',
    nextMaintenance: device?.nextMaintenance || '',
    supplier: device?.supplier || '',
    calibrationRequired: device?.calibrationRequired || false,
    disposable: device?.disposable || false,
    sterile: device?.sterile || false
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
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
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">
              {device ? 'Edit Medical Device' : 'Add New Medical Device'}
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Device Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model *</label>
                  <input
                    type="text"
                    value={formData.model}
                    onChange={(e) => setFormData({ ...formData, model: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Monitoring">Monitoring</option>
                    <option value="Diagnostic">Diagnostic</option>
                    <option value="Therapeutic">Therapeutic</option>
                    <option value="Surgical">Surgical</option>
                    <option value="Consumables">Consumables</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer *</label>
                  <input
                    type="text"
                    value={formData.manufacturer}
                    onChange={(e) => setFormData({ ...formData, manufacturer: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Barcode</label>
                  <input
                    type="text"
                    value={formData.barcode}
                    onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Serial Number</label>
                  <input
                    type="text"
                    value={formData.serialNumber}
                    onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
                  <select
                    value={formData.unit}
                    onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  >
                    <option value="Units">Units</option>
                    <option value="Pieces">Pieces</option>
                    <option value="Sets">Sets</option>
                    <option value="Kits">Kits</option>
                    <option value="Boxes">Boxes</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing & Stock</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.unitPrice}
                    onChange={(e) => setFormData({ ...formData, unitPrice: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price ($) *</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.sellingPrice}
                    onChange={(e) => setFormData({ ...formData, sellingPrice: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock *</label>
                  <input
                    type="number"
                    value={formData.currentStock}
                    onChange={(e) => setFormData({ ...formData, currentStock: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock Level *</label>
                  <input
                    type="number"
                    value={formData.minStockLevel}
                    onChange={(e) => setFormData({ ...formData, minStockLevel: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Max Stock Level *</label>
                  <input
                    type="number"
                    value={formData.maxStockLevel}
                    onChange={(e) => setFormData({ ...formData, maxStockLevel: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Reorder Level *</label>
                  <input
                    type="number"
                    value={formData.reorderLevel}
                    onChange={(e) => setFormData({ ...formData, reorderLevel: parseInt(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Purchase Date *</label>
                  <input
                    type="date"
                    value={formData.purchaseDate}
                    onChange={(e) => setFormData({ ...formData, purchaseDate: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Warranty Expiry *</label>
                  <input
                    type="date"
                    value={formData.warrantyExpiry}
                    onChange={(e) => setFormData({ ...formData, warrantyExpiry: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                  <input
                    type="text"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Maintenance">Maintenance</option>
                    <option value="Discontinued">Discontinued</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Details</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
                  <textarea
                    value={formData.specifications}
                    onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Features</label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Power Source</label>
                  <input
                    type="text"
                    value={formData.powerSource}
                    onChange={(e) => setFormData({ ...formData, powerSource: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Dimensions</label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Weight</label>
                  <input
                    type="text"
                    value={formData.weight}
                    onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Certification</label>
                  <input
                    type="text"
                    value={formData.certification}
                    onChange={(e) => setFormData({ ...formData, certification: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Maintenance</label>
                  <input
                    type="date"
                    value={formData.lastMaintenance}
                    onChange={(e) => setFormData({ ...formData, lastMaintenance: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Next Maintenance</label>
                  <input
                    type="date"
                    value={formData.nextMaintenance}
                    onChange={(e) => setFormData({ ...formData, nextMaintenance: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.calibrationRequired}
                      onChange={(e) => setFormData({ ...formData, calibrationRequired: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Calibration Required</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.disposable}
                      onChange={(e) => setFormData({ ...formData, disposable: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Disposable</span>
                  </label>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData.sterile}
                      onChange={(e) => setFormData({ ...formData, sterile: e.target.checked })}
                      className="mr-2"
                    />
                    <span className="text-sm text-gray-700">Sterile</span>
                  </label>
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
              {device ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

// View Device Modal Component
const ViewDeviceModal = ({ device, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-gray-900">Device Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Name:</span>
                  <div className="font-medium">{device.name}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Model:</span>
                  <div className="font-medium">{device.model}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Category:</span>
                  <div className="font-medium">{device.category}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Manufacturer:</span>
                  <div className="font-medium">{device.manufacturer}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Barcode:</span>
                  <div className="font-medium">{device.barcode}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Serial Number:</span>
                  <div className="font-medium">{device.serialNumber}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Unit:</span>
                  <div className="font-medium">{device.unit}</div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Stock & Pricing</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Current Stock:</span>
                  <div className="font-medium text-lg">{device.currentStock} {device.unit}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Min Stock Level:</span>
                  <div className="font-medium">{device.minStockLevel} {device.unit}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Max Stock Level:</span>
                  <div className="font-medium">{device.maxStockLevel} {device.unit}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Reorder Level:</span>
                  <div className="font-medium">{device.reorderLevel} {device.unit}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Unit Price:</span>
                  <div className="font-medium">${device.unitPrice.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Selling Price:</span>
                  <div className="font-medium">${device.sellingPrice.toFixed(2)}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Purchase Date:</span>
                  <div className="font-medium">{new Date(device.purchaseDate).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Warranty Expiry:</span>
                  <div className={`font-medium ${
                    new Date(device.warrantyExpiry) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) 
                      ? 'text-red-600' : 'text-gray-900'
                  }`}>
                    {new Date(device.warrantyExpiry).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Information</h3>
              <div className="space-y-3">
                <div>
                  <span className="text-sm text-gray-600">Status:</span>
                  <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                    device.status === 'Active' 
                      ? 'bg-green-100 text-green-800' 
                      : device.status === 'Maintenance'
                      ? 'bg-yellow-100 text-yellow-800'
                      : device.status === 'Inactive'
                      ? 'bg-gray-100 text-gray-800'
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {device.status}
                  </span>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Supplier:</span>
                  <div className="font-medium">{device.supplier}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Last Maintenance:</span>
                  <div className="font-medium">{new Date(device.lastMaintenance).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Next Maintenance:</span>
                  <div className="font-medium">{new Date(device.nextMaintenance).toLocaleDateString()}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Certification:</span>
                  <div className="font-medium">{device.certification}</div>
                </div>
                <div>
                  <span className="text-sm text-gray-600">Properties:</span>
                  <div className="flex items-center gap-2 mt-1">
                    {device.calibrationRequired && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                        <Settings className="w-3 h-3 mr-1" />
                        Calibration Required
                      </span>
                    )}
                    {device.disposable && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-orange-100 text-orange-800 rounded">
                        <Trash2 className="w-3 h-3 mr-1" />
                        Disposable
                      </span>
                    )}
                    {device.sterile && (
                      <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
                        <Shield className="w-3 h-3 mr-1" />
                        Sterile
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Technical Specifications</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Description:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{device.description}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Specifications:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{device.specifications}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Features:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{device.features}</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Physical Properties</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-sm text-gray-600">Power Source:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{device.powerSource}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Dimensions:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{device.dimensions}</div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-600">Weight:</span>
                    <div className="font-medium bg-gray-50 p-3 rounded">{device.weight}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const MedicalDevices = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [editingDevice, setEditingDevice] = useState(null);
  const [formData, setFormData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    status: '',
    stockLevel: '',
    manufacturer: '',
    priceRange: '',
    certification: '',
    warrantyStatus: ''
  });
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showNotifications, setShowNotifications] = useState(true);
  const [notifications, setNotifications] = useState([]);

  // Mock data for fallback
  const mockDevices = [
    {
      id: 1,
      name: 'Digital Blood Pressure Monitor',
      model: 'BP-MON-2000',
      category: 'Monitoring',
      manufacturer: 'MedTech Solutions',
      barcode: '5556667778881',
      serialNumber: 'SN20001234',
      purchaseDate: '2024-01-15',
      warrantyExpiry: '2026-01-15',
      unitPrice: 89.99,
      sellingPrice: 149.99,
      currentStock: 25,
      minStockLevel: 10,
      maxStockLevel: 50,
      reorderLevel: 20,
      unit: 'Units',
      description: 'Automatic digital blood pressure monitor with memory',
      specifications: 'Measurement range: 0-300 mmHg, Accuracy: ±3 mmHg',
      features: 'Large LCD display, memory for 90 readings, irregular heartbeat detection',
      powerSource: 'Battery operated (4 AA batteries)',
      dimensions: '120mm x 90mm x 50mm',
      weight: '250g',
      certification: 'FDA Approved, CE Marked',
      status: 'Active',
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-05-01',
      supplier: 'MedicalSupply Inc.',
      calibrationRequired: true,
      disposable: false,
      sterile: false,
      imageUrl: null,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-02-01T14:30:00Z'
    },
    {
      id: 2,
      name: 'Digital Thermometer',
      model: 'TEMP-DIG-100',
      category: 'Diagnostic',
      manufacturer: 'HealthTech Corp',
      barcode: '5556667778882',
      serialNumber: 'SN10005678',
      purchaseDate: '2024-02-01',
      warrantyExpiry: '2025-02-01',
      unitPrice: 15.99,
      sellingPrice: 29.99,
      currentStock: 80,
      minStockLevel: 30,
      maxStockLevel: 200,
      reorderLevel: 60,
      unit: 'Units',
      description: 'Digital clinical thermometer with fever alarm',
      specifications: 'Temperature range: 32°C - 42.9°C, Accuracy: ±0.1°C',
      features: 'Fever alarm, memory for last reading, fast measurement (10 seconds)',
      powerSource: 'Battery operated (1 LR41 battery)',
      dimensions: '130mm x 20mm x 10mm',
      weight: '15g',
      certification: 'FDA Approved, CE Marked',
      status: 'Active',
      lastMaintenance: '2024-02-01',
      nextMaintenance: '2024-08-01',
      supplier: 'HealthSupply Ltd.',
      calibrationRequired: true,
      disposable: false,
      sterile: false,
      imageUrl: null,
      createdAt: '2024-02-01T09:15:00Z',
      updatedAt: '2024-02-01T09:15:00Z'
    },
    {
      id: 3,
      name: 'Syringe 5ml',
      model: 'SYR-DIS-005',
      category: 'Consumables',
      manufacturer: 'SteriMed',
      barcode: '5556667778883',
      serialNumber: 'BATCH001',
      purchaseDate: '2024-02-10',
      warrantyExpiry: '2024-08-10',
      unitPrice: 0.25,
      sellingPrice: 0.75,
      currentStock: 500,
      minStockLevel: 200,
      maxStockLevel: 2000,
      reorderLevel: 400,
      unit: 'Pieces',
      description: 'Disposable sterile syringe with needle',
      specifications: 'Capacity: 5ml, Needle gauge: 23G, Sterile, Single-use',
      features: 'Luer lock, clear barrel, smooth plunger action',
      powerSource: 'N/A',
      dimensions: '85mm x 10mm',
      weight: '5g',
      certification: 'ISO 7886-1, CE Marked',
      status: 'Active',
      lastMaintenance: '2024-02-10',
      nextMaintenance: '2024-02-10',
      supplier: 'SterileSupply Inc.',
      calibrationRequired: false,
      disposable: true,
      sterile: true,
      imageUrl: null,
      createdAt: '2024-02-10T11:00:00Z',
      updatedAt: '2024-02-10T11:00:00Z'
    }
  ];

  // Fetch devices from API
  const fetchDevices = async () => {
    try {
      setLoading(true);
      const params = {
        search: searchTerm,
        category: filters.category,
        status: filters.status,
        stock_level: filters.stockLevel,
        manufacturer: filters.manufacturer,
        sort_by: sortBy,
        sort_order: sortOrder,
      };
      
      const response = await medicalDevicesApi.getDevices(params);
      setDevices(response.data?.data?.data || []);
    } catch (error) {
      console.error('Error fetching devices:', error);
      // Fallback to mock data if API fails
      setDevices(mockDevices);
      addNotification('Using demo data - API connection failed', 'warning');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, [searchTerm, filters, sortBy, sortOrder]);

  // Notification system
  const addNotification = (message, type = 'info') => {
    const newNotification = {
      id: Date.now(),
      message,
      type,
      timestamp: new Date()
    };
    setNotifications(prev => [newNotification, ...prev].slice(0, 5));
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setNotifications(prev => prev.filter(n => n.id !== newNotification.id));
    }, 5000);
  };

  // CRUD operations
  const handleAddDevice = () => {
    setEditingDevice(null);
    setFormData({});
    setImagePreview(null);
    setShowAddModal(true);
  };

  const handleEditDevice = (device) => {
    setEditingDevice(device);
    setFormData(device);
    setImagePreview(device.imageUrl);
    setShowAddModal(true);
  };

  const handleViewDevice = (device) => {
    setSelectedDevice(device);
    setShowViewModal(true);
  };

  const handleDeleteDevice = async (deviceId) => {
    if (window.confirm('Are you sure you want to delete this medical device?')) {
      try {
        await medicalDevicesApi.deleteDevice(deviceId);
        fetchDevices();
        addNotification('Device deleted successfully', 'success');
      } catch (error) {
        console.error('Error deleting device:', error);
        addNotification('Error deleting device', 'error');
      }
    }
  };

  const handleSaveDevice = async () => {
    try {
      const formDataToSubmit = new FormData();
      
      // Append all device data
      Object.keys(formData).forEach(key => {
        if (key === 'image' && formData[key] instanceof File) {
          formDataToSubmit.append('image', formData[key]);
        } else {
          formDataToSubmit.append(key, formData[key]);
        }
      });
      
      if (editingDevice) {
        await medicalDevicesApi.updateDevice(editingDevice.id, formDataToSubmit);
        addNotification('Device updated successfully', 'success');
      } else {
        await medicalDevicesApi.createDevice(formDataToSubmit);
        addNotification('Device added successfully', 'success');
      }
      
      fetchDevices();
      setShowAddModal(false);
      setEditingDevice(null);
      setFormData({});
      setImagePreview(null);
    } catch (error) {
      console.error('Error saving device:', error);
      addNotification('Error saving device', 'error');
    }
  };

  // Export functions
  const handleExportPDF = () => {
    const columns = [
      { key: 'name', label: 'Device Name' },
      { key: 'model', label: 'Model' },
      { key: 'category', label: 'Category' },
      { key: 'manufacturer', label: 'Manufacturer' },
      { key: 'serialNumber', label: 'Serial Number' },
      { key: 'currentStock', label: 'Stock' },
      { key: 'status', label: 'Status' },
      { key: 'warrantyExpiry', label: 'Warranty Expiry' }
    ];
    
    // Simple export to PDF
    window.print();
  };

  const handleExportCSV = () => {
    const csvContent = [
      columns.map(col => col.label).join(','),
      ...devices.map(device => 
        columns.map(col => `"${device[col.key] || ''}"`).join(',')
      )
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'medical-devices.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // Filter and sort devices
  const filteredDevices = devices.filter(device => {
    const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         device.barcode.includes(searchTerm) ||
                         device.serialNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filters.category || device.category === filters.category;
    const matchesStatus = !filters.status || device.status === filters.status;
    const matchesStockLevel = !filters.stockLevel || 
      (filters.stockLevel === 'low' && device.currentStock <= device.minStockLevel) ||
      (filters.stockLevel === 'critical' && device.currentStock <= device.reorderLevel) ||
      (filters.stockLevel === 'normal' && device.currentStock > device.reorderLevel);
    const matchesManufacturer = !filters.manufacturer || device.manufacturer === filters.manufacturer;
    
    return matchesSearch && matchesCategory && matchesStatus && matchesStockLevel && matchesManufacturer;
  });

  const sortedDevices = [...filteredDevices].sort((a, b) => {
    const aValue = a[sortBy] || '';
    const bValue = b[sortBy] || '';
    const modifier = sortOrder === 'asc' ? 1 : -1;
    return aValue.toString().localeCompare(bValue.toString()) * modifier;
  });

  // Get unique values for filters
  const categories = [...new Set(devices.map(d => d.category).filter(Boolean))];
  const manufacturers = [...new Set(devices.map(d => d.manufacturer).filter(Boolean))];
  const statuses = [...new Set(devices.map(d => d.status).filter(Boolean))];

  // Stats
  const totalDevices = devices.length;
  const activeDevices = devices.filter(d => d.status === 'Active').length;
  const lowStockDevices = devices.filter(d => d.currentStock <= d.minStockLevel).length;
  const criticalStockDevices = devices.filter(d => d.currentStock <= d.reorderLevel).length;

  return (
    <div className="space-y-6">
      {/* Notifications */}
      <AnimatePresence>
        {notifications.map(notification => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`p-4 rounded-lg border ${
              notification.type === 'success' ? 'bg-green-50 border-green-200 text-green-800' :
              notification.type === 'error' ? 'bg-red-50 border-red-200 text-red-800' :
              notification.type === 'warning' ? 'bg-yellow-50 border-yellow-200 text-yellow-800' :
              'bg-blue-50 border-blue-200 text-blue-800'
            }`}
          >
            <div className="flex items-center justify-between">
              <span>{notification.message}</span>
              <button
                onClick={() => setNotifications(prev => prev.filter(n => n.id !== notification.id))}
                className="ml-4 text-gray-500 hover:text-gray-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Medical Devices</h1>
          <p className="text-gray-500 mt-1">Manage medical device inventory and tracking</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExportPDF}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FileText className="w-4 h-4" />
            PDF
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <FileSpreadsheet className="w-4 h-4" />
            CSV
          </button>
          <button
            onClick={handleAddDevice}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add Device
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Devices</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{totalDevices}</p>
            </div>
            <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Active Devices</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{activeDevices}</p>
            </div>
            <div className="w-12 h-12 bg-green-50 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{lowStockDevices}</p>
            </div>
            <div className="w-12 h-12 bg-yellow-50 rounded-lg flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Critical Stock</p>
              <p className="text-2xl font-bold text-red-600 mt-1">{criticalStockDevices}</p>
            </div>
            <div className="w-12 h-12 bg-red-50 rounded-lg flex items-center justify-center">
              <XCircle className="w-6 h-6 text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search devices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown className={`w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
        </div>
        
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 pt-4 border-t border-gray-200"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <select
                value={filters.category}
                onChange={(e) => setFilters({...filters, category: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              
              <select
                value={filters.status}
                onChange={(e) => setFilters({...filters, status: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Statuses</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
              
              <select
                value={filters.stockLevel}
                onChange={(e) => setFilters({...filters, stockLevel: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Stock Levels</option>
                <option value="normal">Normal</option>
                <option value="low">Low Stock</option>
                <option value="critical">Critical</option>
              </select>
              
              <select
                value={filters.manufacturer}
                onChange={(e) => setFilters({...filters, manufacturer: e.target.value})}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">All Manufacturers</option>
                {manufacturers.map(mfg => (
                  <option key={mfg} value={mfg}>{mfg}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="name">Sort by Name</option>
                <option value="category">Sort by Category</option>
                <option value="manufacturer">Sort by Manufacturer</option>
                <option value="currentStock">Sort by Stock</option>
                <option value="status">Sort by Status</option>
              </select>
            </div>
          </motion.div>
        )}
      </div>

      {/* Devices Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Device
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stock
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Price
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
                {sortedDevices.map((device) => (
                  <tr key={device.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Syringe className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{device.name}</div>
                          <div className="text-sm text-gray-500">{device.model}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                        {device.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{device.currentStock} {device.unit}</div>
                      <div className="text-sm text-gray-500">Min: {device.minStockLevel}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${device.sellingPrice}</div>
                      <div className="text-sm text-gray-500">Cost: ${device.unitPrice}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        device.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {device.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewDevice(device)}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleEditDevice(device)}
                          className="text-green-600 hover:text-green-900"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteDevice(device.id)}
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
        )}
      </div>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">
                  {editingDevice ? 'Edit Device' : 'Add New Device'}
                </h2>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Device Name</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
                  <input
                    type="text"
                    value={formData.model || ''}
                    onChange={(e) => setFormData({...formData, model: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category || ''}
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Monitoring">Monitoring</option>
                    <option value="Diagnostic">Diagnostic</option>
                    <option value="Consumables">Consumables</option>
                    <option value="Surgical">Surgical</option>
                    <option value="Therapeutic">Therapeutic</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Manufacturer</label>
                  <input
                    type="text"
                    value={formData.manufacturer || ''}
                    onChange={(e) => setFormData({...formData, manufacturer: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.unitPrice || ''}
                    onChange={(e) => setFormData({...formData, unitPrice: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Selling Price</label>
                  <input
                    type="number"
                    step="0.01"
                    value={formData.sellingPrice || ''}
                    onChange={(e) => setFormData({...formData, sellingPrice: parseFloat(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Current Stock</label>
                  <input
                    type="number"
                    value={formData.currentStock || ''}
                    onChange={(e) => setFormData({...formData, currentStock: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Min Stock Level</label>
                  <input
                    type="number"
                    value={formData.minStockLevel || ''}
                    onChange={(e) => setFormData({...formData, minStockLevel: parseInt(e.target.value)})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
                  <select
                    value={formData.unit || ''}
                    onChange={(e) => setFormData({...formData, unit: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Unit</option>
                    <option value="Units">Units</option>
                    <option value="Pieces">Pieces</option>
                    <option value="Boxes">Boxes</option>
                    <option value="Kits">Kits</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status || ''}
                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Maintenance">Maintenance</option>
                  </select>
                </div>
              </div>
              
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={formData.description || ''}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveDevice}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingDevice ? 'Update' : 'Add'} Device
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Modal */}
      <AnimatePresence>
        {showViewModal && selectedDevice && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            onClick={() => setShowViewModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-900">Device Details</h2>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Basic Information</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Name:</span>
                      <span className="font-medium">{selectedDevice.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Model:</span>
                      <span className="font-medium">{selectedDevice.model}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-medium">{selectedDevice.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Manufacturer:</span>
                      <span className="font-medium">{selectedDevice.manufacturer}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Serial Number:</span>
                      <span className="font-medium">{selectedDevice.serialNumber}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Barcode:</span>
                      <span className="font-medium">{selectedDevice.barcode}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Stock & Pricing</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Current Stock:</span>
                      <span className="font-medium">{selectedDevice.currentStock} {selectedDevice.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Min Stock Level:</span>
                      <span className="font-medium">{selectedDevice.minStockLevel} {selectedDevice.unit}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Unit Price:</span>
                      <span className="font-medium">${selectedDevice.unitPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Selling Price:</span>
                      <span className="font-medium">${selectedDevice.sellingPrice}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Status:</span>
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        selectedDevice.status === 'Active' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-red-100 text-red-800'
                      }`}>
                        {selectedDevice.status}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Warranty & Maintenance</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Purchase Date:</span>
                      <span className="font-medium">{selectedDevice.purchaseDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Warranty Expiry:</span>
                      <span className="font-medium">{selectedDevice.warrantyExpiry}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Last Maintenance:</span>
                      <span className="font-medium">{selectedDevice.lastMaintenance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Next Maintenance:</span>
                      <span className="font-medium">{selectedDevice.nextMaintenance}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Calibration Required:</span>
                      <span className="font-medium">{selectedDevice.calibrationRequired ? 'Yes' : 'No'}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Properties</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Disposable:</span>
                      <span className="font-medium">{selectedDevice.disposable ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Sterile:</span>
                      <span className="font-medium">{selectedDevice.sterile ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Supplier:</span>
                      <span className="font-medium">{selectedDevice.supplier}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Certification:</span>
                      <span className="font-medium">{selectedDevice.certification}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {selectedDevice.description && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedDevice.description}</p>
                </div>
              )}
              
              {selectedDevice.specifications && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Specifications</h3>
                  <p className="text-gray-600">{selectedDevice.specifications}</p>
                </div>
              )}
              
              {selectedDevice.features && (
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Features</h3>
                  <p className="text-gray-600">{selectedDevice.features}</p>
                </div>
              )}
              
              <div className="flex items-center justify-end gap-3 mt-6">
                <button
                  onClick={() => {
                    setShowViewModal(false);
                    handleEditDevice(selectedDevice);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Edit Device
                </button>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MedicalDevices;
