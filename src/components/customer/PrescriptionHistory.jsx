import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Package,
  Truck,
  User,
  Stethoscope,
  Eye,
  Download,
  RefreshCw,
  Filter,
  Search,
  ChevronDown,
  MapPin,
  Phone,
  Mail,
  CreditCard,
  Receipt,
  Info,
  Zap
} from 'lucide-react';
import prescriptionService from '../../services/prescriptionService';

const PrescriptionHistory = ({ customerId }) => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedPrescription, setSelectedPrescription] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [analytics, setAnalytics] = useState(null);

  useEffect(() => {
    fetchPrescriptions();
  }, [customerId]);

  const fetchPrescriptions = async () => {
    try {
      setLoading(true);
      const data = await prescriptionService.getPrescriptionsByCustomerId(customerId);
      setPrescriptions(data);
      
      // Fetch analytics for this customer
      try {
        const allAnalytics = await prescriptionService.getPrescriptionAnalytics();
        const customerPrescriptions = allAnalytics.totalPrescriptions;
        setAnalytics({
          totalPrescriptions: data.length,
          pendingCount: data.filter(p => p.status === 'pending_verification').length,
          verifiedCount: data.filter(p => p.status === 'verified').length,
          processingCount: data.filter(p => p.status === 'processing').length,
          completedCount: data.filter(p => p.status === 'completed').length,
          rejectedCount: data.filter(p => p.status === 'rejected').length
        });
      } catch (error) {
        console.error('Failed to fetch analytics:', error);
      }
    } catch (error) {
      console.error('Error fetching prescriptions:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending_verification':
        return 'text-yellow-600 bg-yellow-50';
      case 'verified':
        return 'text-blue-600 bg-blue-50';
      case 'processing':
        return 'text-purple-600 bg-purple-50';
      case 'completed':
        return 'text-green-600 bg-green-50';
      case 'rejected':
        return 'text-red-600 bg-red-50';
      default:
        return 'text-gray-600 bg-gray-50';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending_verification':
        return <Clock className="w-4 h-4" />;
      case 'verified':
        return <CheckCircle className="w-4 h-4" />;
      case 'processing':
        return <Package className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'rejected':
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  const getDeliveryIcon = (method) => {
    switch (method) {
      case 'pickup':
        return <Package className="w-4 h-4" />;
      case 'delivery':
        return <Truck className="w-4 h-4" />;
      case 'courier':
        return <Package className="w-4 h-4" />;
      default:
        return <Package className="w-4 h-4" />;
    }
  };

  const filteredPrescriptions = prescriptions.filter(prescription => {
    const matchesSearch = prescription.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         prescription.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (prescription.notes && prescription.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || prescription.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-8 h-8 animate-spin text-[#5DBB63]" />
        <span className="ml-2 text-gray-600">Loading prescriptions...</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">My Prescriptions</h2>
          <p className="text-gray-500 mt-1">Track your prescription orders and status</p>
        </div>
        <button
          onClick={fetchPrescriptions}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors mt-4 sm:mt-0"
        >
          <RefreshCw className="w-4 h-4" />
          Refresh
        </button>
      </div>

      {/* Analytics Cards */}
      {analytics && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <FileText className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">{analytics.totalPrescriptions}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Total</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <Clock className="w-8 h-8 text-yellow-500" />
              <span className="text-2xl font-bold text-gray-900">{analytics.pendingCount}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Pending</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <CheckCircle className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-gray-900">{analytics.verifiedCount}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Verified</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <Package className="w-8 h-8 text-purple-500" />
              <span className="text-2xl font-bold text-gray-900">{analytics.processingCount}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Processing</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <CheckCircle className="w-8 h-8 text-green-500" />
              <span className="text-2xl font-bold text-gray-900">{analytics.completedCount}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Completed</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between">
              <XCircle className="w-8 h-8 text-red-500" />
              <span className="text-2xl font-bold text-gray-900">{analytics.rejectedCount}</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">Rejected</p>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search prescriptions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
          >
            <option value="all">All Status</option>
            <option value="pending_verification">Pending Verification</option>
            <option value="verified">Verified</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="rejected">Rejected</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      {/* Prescriptions List */}
      <div className="space-y-4">
        {filteredPrescriptions.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No prescriptions found</h3>
            <p className="text-gray-500">
              {searchTerm || statusFilter !== 'all' 
                ? 'Try adjusting your search or filters' 
                : 'Upload your first prescription to get started'}
            </p>
          </div>
        ) : (
          filteredPrescriptions.map((prescription) => (
            <motion.div
              key={prescription.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-gray-900">{prescription.id}</h3>
                    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(prescription.status)}`}>
                      {getStatusIcon(prescription.status)}
                      {prescription.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </span>
                    {prescription.urgency === 'urgent' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-red-600 bg-red-50">
                        <Zap className="w-3 h-3" />
                        Urgent
                      </span>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">Dr. {prescription.doctorName}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-600">{formatDate(prescription.uploadedAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getDeliveryIcon(prescription.deliveryMethod)}
                      <span className="text-gray-600 capitalize">{prescription.deliveryMethod}</span>
                    </div>
                  </div>

                  {prescription.notes && (
                    <p className="text-sm text-gray-600 mt-2">{prescription.notes}</p>
                  )}

                  {prescription.verifiedAt && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      <span>Verified by {prescription.pharmacistName} on {formatDate(prescription.verifiedAt)}</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  {prescription.prescriptionImage && (
                    <button
                      onClick={() => window.open(prescription.prescriptionImage, '_blank')}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                      title="View Prescription"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => {
                      setSelectedPrescription(prescription);
                      setShowDetailModal(true);
                    }}
                    className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Detail Modal */}
      {showDetailModal && selectedPrescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">{selectedPrescription.id}</h2>
                <button
                  onClick={() => {
                    setShowDetailModal(false);
                    setSelectedPrescription(null);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Prescription Image */}
              {selectedPrescription.prescriptionImage && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Prescription Image</h3>
                  <img
                    src={selectedPrescription.prescriptionImage}
                    alt="Prescription"
                    className="w-full h-auto rounded-lg border border-gray-200"
                  />
                </div>
              )}

              {/* Prescription Details */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Prescription Details</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <span className="text-sm text-gray-500">Status</span>
                    <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedPrescription.status)}`}>
                      {getStatusIcon(selectedPrescription.status)}
                      {selectedPrescription.status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Doctor</span>
                    <p className="font-medium">Dr. {selectedPrescription.doctorName}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">License</span>
                    <p className="font-medium">{selectedPrescription.doctorLicense}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Delivery Method</span>
                    <p className="font-medium capitalize">{selectedPrescription.deliveryMethod}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Uploaded</span>
                    <p className="font-medium">{formatDate(selectedPrescription.uploadedAt)}</p>
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">Preferred Pharmacy</span>
                    <p className="font-medium">{selectedPrescription.preferredPharmacy}</p>
                  </div>
                </div>
              </div>

              {/* Notes */}
              {selectedPrescription.notes && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Notes</h3>
                  <p className="text-gray-700">{selectedPrescription.notes}</p>
                </div>
              )}

              {/* Verification Info */}
              {selectedPrescription.verifiedAt && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Verification Information</h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-medium">Verified by {selectedPrescription.pharmacistName}</span>
                    </div>
                    <p className="text-green-700 text-sm mt-1">
                      on {formatDate(selectedPrescription.verifiedAt)}
                    </p>
                    {selectedPrescription.verificationNotes && (
                      <p className="text-green-700 text-sm mt-2">
                        Notes: {selectedPrescription.verificationNotes}
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default PrescriptionHistory;
