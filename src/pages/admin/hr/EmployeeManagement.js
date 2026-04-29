import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit3,
  Trash2,
  Mail,
  Phone,
  Calendar,
  User,
  Clock,
  CheckCircle,
  AlertCircle,
  XCircle,
  Star,
  MapPin,
  FileText,
  Briefcase,
  GraduationCap,
  Users,
  DollarSign,
  Award,
  Building,
  Download,
  Upload,
  RefreshCw,
  ChevronDown,
  ChevronUp,
  UserCheck,
  UserCog,
  Settings,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';

const EmployeeManagement = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [showFilters, setShowFilters] = useState(false);

  const departments = [
    { id: 'all', name: 'All Departments' },
    { id: 'administration', name: 'Administration' },
    { id: 'nursing', name: 'Nursing' },
    { id: 'pharmacy', name: 'Pharmacy' },
    { id: 'laboratory', name: 'Laboratory' },
    { id: 'radiology', name: 'Radiology' },
    { id: 'emergency', name: 'Emergency' },
    { id: 'it', name: 'IT Support' },
    { id: 'hr', name: 'Human Resources' },
    { id: 'finance', name: 'Finance' }
  ];

  const roles = [
    { id: 'all', name: 'All Roles' },
    { id: 'administrator', name: 'Administrator' },
    { id: 'manager', name: 'Manager' },
    { id: 'supervisor', name: 'Supervisor' },
    { id: 'staff', name: 'Staff' },
    { id: 'technician', name: 'Technician' },
    { id: 'nurse', name: 'Nurse' },
    { id: 'pharmacist', name: 'Pharmacist' },
    { id: 'lab-technician', name: 'Lab Technician' },
    { id: 'receptionist', name: 'Receptionist' }
  ];

  const statusOptions = [
    { id: 'all', name: 'All Status' },
    { id: 'active', name: 'Active' },
    { id: 'on-leave', name: 'On Leave' },
    { id: 'suspended', name: 'Suspended' },
    { id: 'terminated', name: 'Terminated' }
  ];

  const mockEmployees = [
    {
      id: 1,
      name: 'Robert Martinez',
      email: 'robert.martinez@medigo.com',
      phone: '+1 (555) 123-4567',
      department: 'administration',
      role: 'administrator',
      position: 'Hospital Administrator',
      employeeId: 'EMP001',
      status: 'active',
      joinDate: '2015-03-15',
      salary: 95000,
      workSchedule: 'Mon-Fri, 8AM-5PM',
      education: 'MBA, Harvard Business School',
      experience: 12,
      performance: 4.7,
      attendance: 98,
      projects: 15,
      trainingCompleted: 8,
      certifications: ['Healthcare Management', 'Project Management'],
      skills: ['Leadership', 'Strategic Planning', 'Budget Management', 'Team Building'],
      languages: ['English', 'Spanish'],
      address: '123 Admin Blvd, Boston, MA 02115',
      emergencyContact: 'Maria Martinez, +1 (555) 987-6543',
      benefits: ['Health Insurance', 'Dental Insurance', '401k', 'Paid Time Off'],
      supervisor: 'Board of Directors',
      teamSize: 45
    },
    {
      id: 2,
      name: 'Jennifer Davis',
      email: 'jennifer.davis@medigo.com',
      phone: '+1 (555) 234-5678',
      department: 'nursing',
      role: 'supervisor',
      position: 'Head Nurse',
      employeeId: 'EMP002',
      status: 'active',
      joinDate: '2018-07-20',
      salary: 75000,
      workSchedule: 'Rotating Shifts',
      education: 'BSN, Johns Hopkins University',
      experience: 8,
      performance: 4.9,
      attendance: 96,
      projects: 8,
      trainingCompleted: 12,
      certifications: ['RN License', 'BLS', 'ACLS', 'PALS'],
      skills: ['Patient Care', 'Team Leadership', 'Emergency Response', 'Medical Procedures'],
      languages: ['English', 'French'],
      address: '456 Medical Center Dr, New York, NY 10016',
      emergencyContact: 'David Davis, +1 (555) 876-5432',
      benefits: ['Health Insurance', 'Dental Insurance', '401k', 'Paid Time Off', 'Tuition Reimbursement'],
      supervisor: 'Robert Martinez',
      teamSize: 20
    },
    {
      id: 3,
      name: 'Michael Wilson',
      email: 'michael.wilson@medigo.com',
      phone: '+1 (555) 345-6789',
      department: 'pharmacy',
      role: 'staff',
      position: 'Pharmacist',
      employeeId: 'EMP003',
      status: 'active',
      joinDate: '2020-01-10',
      salary: 85000,
      workSchedule: 'Mon-Fri, 9AM-6PM',
      education: 'PharmD, University of California',
      experience: 5,
      performance: 4.6,
      attendance: 94,
      projects: 6,
      trainingCompleted: 10,
      certifications: ['PharmD License', 'Immunization Certified'],
      skills: ['Medication Management', 'Patient Counseling', 'Inventory Control', 'Drug Interactions'],
      languages: ['English', 'Mandarin'],
      address: '789 Pharmacy Ave, Los Angeles, CA 90027',
      emergencyContact: 'Lisa Wilson, +1 (555) 765-4321',
      benefits: ['Health Insurance', 'Dental Insurance', '401k', 'Paid Time Off'],
      supervisor: 'Jennifer Davis',
      teamSize: 3
    },
    {
      id: 4,
      name: 'Sarah Thompson',
      email: 'sarah.thompson@medigo.com',
      phone: '+1 (555) 456-7890',
      department: 'hr',
      role: 'manager',
      position: 'HR Manager',
      employeeId: 'EMP004',
      status: 'on-leave',
      joinDate: '2017-05-12',
      salary: 70000,
      workSchedule: 'Mon-Fri, 8:30AM-5:30PM',
      education: 'MA, Human Resources, Stanford University',
      experience: 10,
      performance: 4.5,
      attendance: 92,
      projects: 12,
      trainingCompleted: 15,
      certifications: ['SHRM-CP', 'PHR'],
      skills: ['Recruitment', 'Employee Relations', 'Benefits Administration', 'Compliance'],
      languages: ['English', 'German'],
      address: '321 HR Plaza, Chicago, IL 60611',
      emergencyContact: 'James Thompson, +1 (555) 654-3210',
      benefits: ['Health Insurance', 'Dental Insurance', '401k', 'Paid Time Off', 'Flexible Schedule'],
      supervisor: 'Robert Martinez',
      teamSize: 8
    },
    {
      id: 5,
      name: 'David Lee',
      email: 'david.lee@medigo.com',
      phone: '+1 (555) 567-8901',
      department: 'it',
      role: 'technician',
      position: 'IT Support Specialist',
      employeeId: 'EMP005',
      status: 'active',
      joinDate: '2021-09-08',
      salary: 60000,
      workSchedule: 'Mon-Fri, 8AM-4PM',
      education: 'BS, Information Technology, MIT',
      experience: 3,
      performance: 4.4,
      attendance: 97,
      projects: 4,
      trainingCompleted: 6,
      certifications: ['CompTIA A+', 'Network+', 'Security+'],
      skills: ['Technical Support', 'Network Administration', 'Security Management', 'Hardware Maintenance'],
      languages: ['English', 'Korean'],
      address: '654 Tech Park, Boston, MA 02115',
      emergencyContact: 'Anna Lee, +1 (555) 543-2109',
      benefits: ['Health Insurance', 'Dental Insurance', '401k', 'Paid Time Off'],
      supervisor: 'Robert Martinez',
      teamSize: 2
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setEmployees(mockEmployees);
      setLoading(false);
    }, 1000);
  }, []);

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         employee.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || employee.department === selectedDepartment;
    const matchesRole = selectedRole === 'all' || employee.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || employee.status === selectedStatus;
    return matchesSearch && matchesDepartment && matchesRole && matchesStatus;
  });

  const sortedEmployees = [...filteredEmployees].sort((a, b) => {
    let aValue = a[sortBy];
    let bValue = b[sortBy];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = bValue.toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'active':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'on-leave':
        return <AlertCircle className="w-4 h-4 text-yellow-600" />;
      case 'suspended':
        return <XCircle className="w-4 h-4 text-orange-600" />;
      case 'terminated':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRoleIcon = (role) => {
    switch (role) {
      case 'administrator':
        return <UserCog className="w-4 h-4 text-purple-600" />;
      case 'manager':
        return <Briefcase className="w-4 h-4 text-blue-600" />;
      case 'supervisor':
        return <UserCheck className="w-4 h-4 text-green-600" />;
      case 'staff':
        return <Users className="w-4 h-4 text-gray-600" />;
      default:
        return <User className="w-4 h-4 text-gray-600" />;
    }
  };

  const stats = {
    total: employees.length,
    active: employees.filter(e => e.status === 'active').length,
    onLeave: employees.filter(e => e.status === 'on-leave').length,
    totalSalary: employees.reduce((acc, e) => acc + e.salary, 0),
    avgPerformance: (employees.reduce((acc, e) => acc + e.performance, 0) / employees.length).toFixed(1),
    avgAttendance: Math.round(employees.reduce((acc, e) => acc + e.attendance, 0) / employees.length)
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5DBB63]"></div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-600 mt-1">Comprehensive staff management and HR operations</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Upload className="w-4 h-4" />
            Import
          </button>
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"
          >
            <Plus className="w-4 h-4" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.total}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Active</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{stats.active}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-green-500 to-green-600 rounded-lg">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">On Leave</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.onLeave}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-lg">
              <AlertCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Payroll</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">${(stats.totalSalary / 1000).toFixed(1)}K</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Performance</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.avgPerformance}</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-orange-500 to-orange-600 rounded-lg">
              <Star className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Attendance</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{stats.avgAttendance}%</p>
            </div>
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-cyan-600 rounded-lg">
              <Activity className="w-6 h-6 text-white" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search employees by name, email, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            >
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>{dept.name}</option>
              ))}
            </select>
            
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            >
              {roles.map(role => (
                <option key={role.id} value={role.id}>{role.name}</option>
              ))}
            </select>
            
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
            >
              {statusOptions.map(status => (
                <option key={status.id} value={status.id}>{status.name}</option>
              ))}
            </select>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Employees Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-gray-200 shadow-sm"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 font-medium text-gray-700">
                  <button
                    onClick={() => handleSort('name')}
                    className="flex items-center gap-1 hover:text-[#5DBB63]"
                  >
                    Employee
                    {sortBy === 'name' && (
                      sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Department</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Role</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">
                  <button
                    onClick={() => handleSort('experience')}
                    className="flex items-center gap-1 hover:text-[#5DBB63]"
                  >
                    Experience
                    {sortBy === 'experience' && (
                      sortOrder === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />
                    )}
                  </button>
                </th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Performance</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Attendance</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Status</th>
                <th className="text-left py-4 px-6 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sortedEmployees.map((employee, index) => (
                <motion.tr
                  key={employee.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{employee.name}</p>
                        <p className="text-sm text-gray-600">{employee.position}</p>
                        <p className="text-xs text-gray-500">ID: {employee.employeeId}</p>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                          <Mail className="w-3 h-3" />
                          {employee.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900 capitalize">{employee.department}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {getRoleIcon(employee.role)}
                      <span className="text-sm text-gray-900 capitalize">{employee.role}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{employee.experience} years</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm text-gray-900">{employee.performance}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full ${
                            employee.attendance >= 95 ? 'bg-green-500' :
                            employee.attendance >= 90 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${employee.attendance}%` }}
                        ></div>
                      </div>
                      <span className="text-sm text-gray-900">{employee.attendance}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(employee.status)}
                      <span className="text-sm text-gray-900 capitalize">{employee.status.replace('-', ' ')}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setShowViewModal(true);
                        }}
                        className="p-1 hover:bg-gray-100 rounded"
                      >
                        <Eye className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Edit3 className="w-4 h-4 text-gray-600" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Trash2 className="w-4 h-4 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* View Employee Modal */}
      {showViewModal && selectedEmployee && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowViewModal(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white rounded-xl w-full max-w-6xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-gray-900">Employee Profile</h3>
                <button
                  onClick={() => setShowViewModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="flex items-start gap-6">
                <div className="w-20 h-20 bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="text-2xl font-bold text-gray-900">{selectedEmployee.name}</h4>
                  <p className="text-gray-600 mt-1">{selectedEmployee.position}</p>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1">
                      {getRoleIcon(selectedEmployee.role)}
                      <span className="text-sm text-gray-900 capitalize">{selectedEmployee.role}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {getStatusIcon(selectedEmployee.status)}
                      <span className="text-sm text-gray-900 capitalize">{selectedEmployee.status.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Building className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900 capitalize">{selectedEmployee.department}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Contact Information</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedEmployee.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedEmployee.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">{selectedEmployee.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">Emergency: {selectedEmployee.emergencyContact}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Employment Details</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">Employee ID: {selectedEmployee.employeeId}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">Join Date: {selectedEmployee.joinDate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">Schedule: {selectedEmployee.workSchedule}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">Salary: ${selectedEmployee.salary.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Education & Experience */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Education</h5>
                  <div className="flex items-center gap-2">
                    <GraduationCap className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{selectedEmployee.education}</span>
                  </div>
                </div>

                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Experience</h5>
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-900">{selectedEmployee.experience} years</span>
                  </div>
                </div>
              </div>

              {/* Performance Metrics */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Performance Metrics</h5>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Performance Rating</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <p className="text-xl font-bold text-gray-900">{selectedEmployee.performance}</p>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Attendance Rate</p>
                    <p className="text-xl font-bold text-gray-900">{selectedEmployee.attendance}%</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Projects Completed</p>
                    <p className="text-xl font-bold text-gray-900">{selectedEmployee.projects}</p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600">Training Completed</p>
                    <p className="text-xl font-bold text-gray-900">{selectedEmployee.trainingCompleted}</p>
                  </div>
                </div>
              </div>

              {/* Skills */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Skills & Expertise</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedEmployee.skills.map((skill, index) => (
                    <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Certifications</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedEmployee.certifications.map((cert, index) => (
                    <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Languages */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Languages</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedEmployee.languages.map((language, index) => (
                    <span key={index} className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">
                      {language}
                    </span>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Benefits</h5>
                <div className="flex flex-wrap gap-2">
                  {selectedEmployee.benefits.map((benefit, index) => (
                    <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-xs font-medium">
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>

              {/* Team Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-3">Team Information</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">Team Size: {selectedEmployee.teamSize} members</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <UserCheck className="w-4 h-4 text-gray-400" />
                      <span className="text-sm text-gray-900">Supervisor: {selectedEmployee.supervisor}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default EmployeeManagement;
