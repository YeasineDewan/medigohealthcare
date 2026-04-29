import React, { useState, useEffect } from 'react';
import MedicineShop from '../components/pharmacy/MedicineShop';
import { Search, Upload, Filter, Loader, Clock, CheckCircle, XCircle, AlertCircle, FileText, Shield, Package, Star, ChevronRight, Phone, Mail, MapPin, User, Calendar, TrendingUp, Users, ShoppingCart, Heart, Brain, Bone, Pill, Activity, TestTube, Download, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PharmacyProfessional = () => {
  const [activeTab, setActiveTab] = useState('shop');
  const [showPrescriptionUpload, setShowPrescriptionUpload] = useState(false);
  const [prescriptionOrders, setPrescriptionOrders] = useState([]);

  // Mock prescription orders
  const mockPrescriptionOrders = [
    {
      id: 1,
      patientName: 'Mohammad Ali',
      age: 45,
      phone: '+8801712345678',
      email: 'mohammad.ali@email.com',
      address: '123 Dhanmondi, Dhaka',
      prescriptionFile: '/prescriptions/rx_001.jpg',
      medicines: [
        { name: 'Amoxicillin 500mg', quantity: 14, status: 'pending_investigation' },
        { name: 'Paracetamol 500mg', quantity: 20, status: 'approved' }
      ],
      orderDate: '2024-04-15',
      status: 'under_investigation',
      totalAmount: 2520,
      investigationNotes: 'Verifying prescription authenticity with doctor',
      pharmacistNotes: 'Patient history shows no allergies'
    },
    {
      id: 2,
      patientName: 'Fatema Begum',
      age: 32,
      phone: '+8801812345678',
      email: 'fatema.begum@email.com',
      address: '456 Gulshan, Dhaka',
      prescriptionFile: '/prescriptions/rx_002.jpg',
      medicines: [
        { name: 'Metformin 500mg', quantity: 30, status: 'approved' },
        { name: 'Vitamin D3 2000IU', quantity: 60, status: 'approved' }
      ],
      orderDate: '2024-04-14',
      status: 'confirmed',
      totalAmount: 8550,
      investigationNotes: 'Prescription verified - Dr. Karim, Medical Center',
      pharmacistNotes: 'Regular diabetes medication'
    }
  ];

  useEffect(() => {
    setPrescriptionOrders(mockPrescriptionOrders);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('pharmacy_token');
    localStorage.removeItem('pharmacy_user');
    window.location.reload();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'under_investigation': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
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

  return (
      <div className="min-h-screen bg-gray-50">
        {/* Professional Header */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
              <div className="mb-6 lg:mb-0">
                <h1 className="text-4xl font-bold mb-2">Professional Pharmacy</h1>
                <p className="text-emerald-100 text-lg">Expert medication management with prescription verification</p>
                <div className="flex flex-wrap gap-4 mt-4">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    <span className="text-sm">Verified Prescriptions</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span className="text-sm">24-48h Delivery</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span className="text-sm">Expert Pharmacists</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowPrescriptionUpload(true)}
                  className="px-6 py-3 bg-white text-emerald-600 rounded-xl hover:bg-emerald-50 transition-colors flex items-center gap-2"
                >
                  <Upload className="w-5 h-5" />
                  Upload Prescription
                </button>
                <button
                  onClick={handleLogout}
                  className="px-6 py-3 bg-emerald-700 text-white rounded-xl hover:bg-emerald-800 transition-colors flex items-center gap-2"
                >
                  <User className="w-5 h-5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Navigation Tabs */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex space-x-8">
              {[
                { id: 'shop', label: 'Medicine Shop', icon: Package },
                { id: 'prescriptions', label: 'Prescription Orders', icon: FileText },
                { id: 'investigation', label: 'Under Investigation', icon: Shield }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
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
          {/* Shop Tab */}
          {activeTab === 'shop' && (
            <MedicineShop />
          )}

          {/* Prescription Orders Tab */}
          {activeTab === 'prescriptions' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Prescription Orders</h2>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 flex items-center gap-2">
                    <Filter className="w-4 h-4" />
                    Filter
                  </button>
                  <button className="px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Export
                  </button>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50 border-b">
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
                      {prescriptionOrders.map((order) => (
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
                            <span className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full ${getStatusColor(order.status)}`}>
                              {React.createElement(getStatusIcon(order.status), { className: 'w-3 h-3' })}
                              {order.status.replace('_', ' ')}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm font-medium text-gray-900">
                            ৳{order.totalAmount}
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex gap-2">
                              <button className="text-emerald-600 hover:text-emerald-900">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button className="text-gray-600 hover:text-gray-900">
                                <FileText className="w-4 h-4" />
                              </button>
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

          {/* Investigation Tab */}
          {activeTab === 'investigation' && (
            <div>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Prescription Investigation</h2>
                <p className="text-gray-600 mt-2">Medicines requiring prescription verification</p>
              </div>

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
                            <span>Age: {order.age}</span>
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
                                    <h5 className="font-medium text-gray-900">{med.name}</h5>
                                    <span className="text-sm font-medium text-gray-900">Qty: {med.quantity}</span>
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

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors">
                            <CheckCircle className="w-4 h-4 inline mr-2" />
                            Approve
                          </button>
                          <button className="flex-1 px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors">
                            <XCircle className="w-4 h-4 inline mr-2" />
                            Reject
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* Prescription Upload Modal */}
        <AnimatePresence>
          {showPrescriptionUpload && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Upload Prescription</h3>
                  <button
                    onClick={() => setShowPrescriptionUpload(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <p className="text-gray-600 mb-6">
                  Upload multiple prescription images or PDFs for faster processing. We'll review them and contact you for confirmation.
                </p>
                
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center mb-6">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Drop prescription files here or click to browse</p>
                  <p className="text-sm text-gray-500">Supports: JPG, PNG, PDF (Max 10MB)</p>
                </div>
                
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
                  <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Upload clear images or PDFs of your prescriptions</li>
                    <li>• Our pharmacists will review and verify each prescription</li>
                    <li>• We'll contact you for confirmation and payment</li>
                    <li>• Free home delivery within 24-48 hours</li>
                  </ul>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowPrescriptionUpload(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700"
                  >
                    Submit Prescriptions
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
  );
};

export default PharmacyProfessional;
