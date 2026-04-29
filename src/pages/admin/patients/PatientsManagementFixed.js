import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Search, Filter, Plus, Eye, Edit3, Trash2, Mail, Phone, Calendar, User, Clock, CheckCircle, AlertCircle, XCircle, Star, MapPin, FileText, Heart, Activity, Download, Upload, ChevronDown, ChevronUp, Users, CreditCard, Shield, Baby, Weight, Ruler, Stethoscope, Pill, X
} from 'lucide-react';

const PatientsManagementFixed = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedBloodType, setSelectedBloodType] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const mockPatients = [
    { id: 1, name: 'John Anderson', age: 45, bloodType: 'A+', status: 'active', lastVisit: '2024-01-10', primaryDoctor: 'Dr. Sarah', outstandingBalance: 250.00 },
    { id: 2, name: 'Emily Rodriguez', age: 32, bloodType: 'O+', status: 'active', lastVisit: '2024-01-12', primaryDoctor: 'Dr. Michael', outstandingBalance: 0 },
    { id: 3, name: 'Michael Thompson', age: 67, bloodType: 'B+', status: 'critical', lastVisit: '2024-01-14', primaryDoctor: 'Dr. Sarah', outstandingBalance: 1200 },
    { id: 4, name: 'Sophia Chen', age: 8, bloodType: 'AB-', status: 'active', lastVisit: '2024-01-08', primaryDoctor: 'Dr. Emily', outstandingBalance: 0 }
  ];

  useEffect(() => {
    setTimeout(() => {
      setPatients(mockPatients);
      setLoading(false);
    }, 1000);
  }, []);

  const stats = {
    total: patients.length,
    active: patients.filter(p => p.status === 'active').length,
    critical: patients.filter(p => p.status === 'critical').length,
    totalBalance: patients.reduce((acc, p) => acc + (p.outstandingBalance || 0), 0),
    avgAge: Math.round(patients.reduce((acc, p) => acc + p.age, 0) / patients.length)
  };

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) && 
    (selectedStatus === 'all' || p.status === selectedStatus)
  );

  const sortedPatients = [...filteredPatients].sort((a, b) => {
    const aVal = a[sortBy];
    const bVal = b[sortBy];
    if (sortOrder === 'asc') return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  const handleSort = (field) => {
    setSortBy(field);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  if (loading) {
    return <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
    </div>;
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Patient Management</h1>
          <p className="text-gray-600">Comprehensive patient records</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-emerald-600">
            <Plus className="w-4 h-4 inline mr-2" /> Add Patient
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
          className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
            <Users className="w-10 h-10 p-2 bg-emerald-500 text-white rounded-lg" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
          className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600">{stats.active}</p>
            </div>
            <CheckCircle className="w-10 h-10 p-2 bg-green-500 text-white rounded-lg" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
          className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Critical</p>
              <p className="text-2xl font-bold text-red-600">{stats.critical}</p>
            </div>
            <AlertCircle className="w-10 h-10 p-2 bg-red-500 text-white rounded-lg" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
          className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Balance</p>
              <p className="text-2xl font-bold">${stats.totalBalance.toLocaleString()}</p>
            </div>
            <CreditCard className="w-10 h-10 p-2 bg-purple-500 text-white rounded-lg" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
          className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Age</p>
              <p className="text-2xl font-bold">{stats.avgAge}</p>
            </div>
            <Activity className="w-10 h-10 p-2 bg-orange-500 text-white rounded-lg" />
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search patients..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-emerald-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border rounded-lg">
              <option>All Status</option>
            </select>
            <select className="px-4 py-2 border rounded-lg">
              <option>All Blood Types</option>
            </select>
            <button className="p-2 border rounded-lg hover:bg-gray-50"><Filter className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-white shadow-sm">
              <tr>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Patient</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700 hidden md:table-cell">Age</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700 hidden lg:table-cell">Blood Type</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Status</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Balance</th>
                <th className="px-6 py-4 text-right font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedPatients.map(patient => (
                <tr key={patient.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">{patient.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">{patient.age} years</td>
                  <td className="px-6 py-4 hidden lg:table-cell">{patient.bloodType}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      patient.status === 'active' ? 'bg-green-100 text-green-800' : 
                      patient.status === 'critical' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`font-medium ${
                      patient.outstandingBalance > 0 ? 'text-red-600' : 'text-green-600'
                    }`}>
                      ${patient.outstandingBalance.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      <button className="p-2 hover:bg-gray-100 rounded"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 hover:bg-gray-100 rounded"><Edit3 className="w-4 h-4" /></button>
                      <button className="p-2 hover:bg-gray-100 rounded"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default PatientsManagementFixed;

