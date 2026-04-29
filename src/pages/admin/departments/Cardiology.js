import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Plus, Search, Filter, Download, Users, Calendar, Clock, Activity, TrendingUp, User, Stethoscope, FileText, AlertCircle } from 'lucide-react';

export default function CardiologyDepartment() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');
  const [showAddModal, setShowAddModal] = useState(false);

  const departmentStats = {
    totalDoctors: 8,
    totalPatients: 245,
    appointmentsToday: 12,
    availableBeds: 6,
    totalBeds: 20,
    monthlyRevenue: 125000,
    satisfactionRate: 94
  };

  const doctors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Interventional Cardiology', experience: '15 years', patients: 45, rating: 4.9, status: 'available' },
    { id: 2, name: 'Dr. Michael Brown', specialty: 'Cardiac Electrophysiology', experience: '12 years', patients: 38, rating: 4.8, status: 'busy' },
    { id: 3, name: 'Dr. Lisa Anderson', specialty: 'Heart Failure', experience: '10 years', patients: 52, rating: 4.7, status: 'available' },
    { id: 4, name: 'Dr. Jennifer Lee', specialty: 'General Cardiology', experience: '8 years', patients: 41, rating: 4.6, status: 'off' },
  ];

  const patients = [
    { id: 1, name: 'John Smith', age: 65, condition: 'Coronary Artery Disease', admitted: '2024-01-10', doctor: 'Dr. Sarah Johnson', status: 'stable' },
    { id: 2, name: 'Emily Davis', age: 58, condition: 'Arrhythmia', admitted: '2024-01-12', doctor: 'Dr. Michael Brown', status: 'critical' },
    { id: 3, name: 'Robert Wilson', age: 72, condition: 'Heart Failure', admitted: '2024-01-14', doctor: 'Dr. Lisa Anderson', status: 'improving' },
    { id: 4, name: 'Maria Garcia', age: 61, condition: 'Hypertension', admitted: '2024-01-15', doctor: 'Dr. Jennifer Lee', status: 'stable' },
  ];

  const appointments = [
    { id: 1, patient: 'James Taylor', time: '09:00 AM', type: 'Consultation', doctor: 'Dr. Sarah Johnson', status: 'confirmed' },
    { id: 2, patient: 'Linda Martinez', time: '10:30 AM', type: 'Follow-up', doctor: 'Dr. Michael Brown', status: 'confirmed' },
    { id: 3, patient: 'William Anderson', time: '11:00 AM', type: 'ECG', doctor: 'Dr. Lisa Anderson', status: 'pending' },
    { id: 4, patient: 'Patricia Thompson', time: '02:00 PM', type: 'Echocardiogram', doctor: 'Dr. Jennifer Lee', status: 'confirmed' },
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'busy': return 'bg-yellow-100 text-yellow-800';
      case 'off': return 'bg-red-100 text-red-800';
      case 'stable': return 'bg-green-100 text-green-800';
      case 'critical': return 'bg-red-100 text-red-800';
      case 'improving': return 'bg-blue-100 text-blue-800';
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPatients = patients.filter(patient =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.condition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAppointments = appointments.filter(appointment =>
    appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
    appointment.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center">
            <Heart className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Cardiology Department</h1>
            <p className="text-gray-500 mt-1">Comprehensive heart care and cardiovascular services</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            <Plus className="w-4 h-4" />
            Add Patient
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export Report
          </button>
        </div>
      </div>

      {/* Department Stats */}
      <div className="grid grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Doctors</p>
              <p className="text-2xl font-bold text-gray-900">{departmentStats.totalDoctors}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">{departmentStats.totalPatients}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Available Beds</p>
              <p className="text-2xl font-bold text-blue-600">{departmentStats.availableBeds}/{departmentStats.totalBeds}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Activity className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Satisfaction Rate</p>
              <p className="text-2xl font-bold text-green-600">{departmentStats.satisfactionRate}%</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {['overview', 'doctors', 'patients', 'appointments'].map((tab) => (
              <button
                key={tab}
                onClick={() => setSelectedTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  selectedTab === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Search Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder={`Search ${selectedTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          {/* Tab Content */}
          {selectedTab === 'overview' && (
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">New patient admitted</p>
                      <p className="text-xs text-gray-500">John Smith - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Surgery completed</p>
                      <p className="text-xs text-gray-500">Dr. Sarah Johnson - 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">Lab results available</p>
                      <p className="text-xs text-gray-500">Emily Davis - 6 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Department Performance</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Bed Occupancy</span>
                      <span className="font-medium">70%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Patient Satisfaction</span>
                      <span className="font-medium">94%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '94%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Treatment Success</span>
                      <span className="font-medium">89%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '89%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedTab === 'doctors' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Specialty</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Experience</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patients</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredDoctors.map((doctor) => (
                    <tr key={doctor.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                            <User className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="text-sm font-medium text-gray-900">{doctor.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.specialty}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.experience}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{doctor.patients}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-900 mr-1">{doctor.rating}</span>
                          <div className="flex text-yellow-400">
                            {'★'.repeat(Math.floor(doctor.rating))}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(doctor.status)}`}>
                          {doctor.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-900">View</button>
                          <span className="text-gray-300">|</span>
                          <button className="text-green-600 hover:text-green-900">Schedule</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedTab === 'patients' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Condition</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Admitted</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredPatients.map((patient) => (
                    <tr key={patient.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-3">
                            <User className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.age}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.condition}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.admitted}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{patient.doctor}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(patient.status)}`}>
                          {patient.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-900">View</button>
                          <span className="text-gray-300">|</span>
                          <button className="text-green-600 hover:text-green-900">Edit</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {selectedTab === 'appointments' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Doctor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAppointments.map((appointment) => (
                    <tr key={appointment.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                            <User className="w-5 h-5 text-purple-600" />
                          </div>
                          <div className="text-sm font-medium text-gray-900">{appointment.patient}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 text-gray-400 mr-2" />
                          <span className="text-sm text-gray-900">{appointment.time}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.type}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{appointment.doctor}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center gap-2">
                          <button className="text-blue-600 hover:text-blue-900">View</button>
                          <span className="text-gray-300">|</span>
                          <button className="text-green-600 hover:text-green-900">Check-in</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
