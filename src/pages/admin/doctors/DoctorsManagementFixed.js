import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Eye, Edit3, Trash2, Users, Star, CheckCircle, AlertCircle, Download, Users2, Activity, Briefcase, Calendar, CreditCard } from 'lucide-react';

const DoctorsManagementFixed = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [doctors, setDoctors] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const mockDoctors = [
    { id: 1, name: 'Dr. Sarah Johnson', department: 'Cardiology', specialization: 'Interventional', experience: 12, patients: 1247, rating: 4.8, status: 'active' },
    { id: 2, name: 'Dr. Michael Chen', department: 'Neurology', specialization: 'Neurophysiology', experience: 8, patients: 892, rating: 4.9, status: 'active' },
    { id: 3, name: 'Dr. Emily Williams', department: 'Pediatrics', specialization: 'Emergency', experience: 6, patients: 1567, rating: 4.7, status: 'active' },
    { id: 4, name: 'Dr. James Brown', department: 'Orthopedics', specialization: 'Sports Medicine', experience: 15, patients: 723, rating: 4.6, status: 'on-leave' }
  ];

  useEffect(() => {
    setTimeout(() => {
      setDoctors(mockDoctors);
      setLoading(false);
    }, 1000);
  }, []);

  const stats = {
    total: doctors.length,
    active: doctors.filter(d => d.status === 'active').length,
    onLeave: doctors.filter(d => d.status === 'on-leave').length,
    totalPatients: doctors.reduce((acc, d) => acc + d.patients, 0),
    avgRating: (doctors.reduce((acc, d) => acc + d.rating, 0) / doctors.length).toFixed(1)
  };

  const filteredDoctors = doctors.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedDoctors = [...filteredDoctors].sort((a, b) => {
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
          <h1 className="text-3xl font-bold text-gray-900">Doctor Management</h1>
          <p className="text-gray-600">Healthcare professionals database</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" /> Export
          </button>
          <button className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2 rounded-lg hover:from-emerald-600">
            <Plus className="w-4 h-4 inline mr-2" /> Add Doctor
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
          className="bg-white p-6 rounded-xl border shadow-sm hover:shadow-md">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Doctors</p>
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
              <p className="text-sm text-gray-600">On Leave</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.onLeave}</p>
            </div>
            <AlertCircle className="w-10 h-10 p-2 bg-yellow-500 text-white rounded-lg" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
          className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold">{stats.totalPatients.toLocaleString()}</p>
            </div>
            <Users2 className="w-10 h-10 p-2 bg-purple-500 text-white rounded-lg" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} 
          className="bg-white p-6 rounded-xl border shadow-sm">
          <div className="flex justify-between">
            <div>
              <p className="text-sm text-gray-600">Avg Rating</p>
              <p className="text-2xl font-bold">{stats.avgRating}</p>
            </div>
            <Star className="w-10 h-10 p-2 bg-yellow-500 text-white rounded-lg" />
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border shadow-sm">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search doctors..." className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-emerald-500" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          </div>
          <div className="flex gap-2">
            <select className="px-4 py-2 border rounded-lg">
              <option>All Departments</option>
            </select>
            <select className="px-4 py-2 border rounded-lg">
              <option>All Status</option>
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
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Doctor</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700 hidden md:table-cell">Department</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Specialization</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700 hidden lg:table-cell">Experience</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Patients</th>
                <th className="px-6 py-4 text-left font-semibold text-gray-700">Rating</th>
                <th className="px-6 py-4 text-right font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedDoctors.map(doctor => (
                <tr key={doctor.id} className="border-t hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {doctor.name.charAt(7)}
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{doctor.name}</div>
                        <div className="text-sm text-gray-500">Cardiology</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden md:table-cell">{doctor.department}</td>
                  <td className="px-6 py-4">{doctor.specialization}</td>
                  <td className="px-6 py-4 hidden lg:table-cell">{doctor.experience} years</td>
                  <td className="px-6 py-4">{doctor.patients.toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1 fill-current" />
                      {doctor.rating}
                    </div>
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

export default DoctorsManagementFixed;

