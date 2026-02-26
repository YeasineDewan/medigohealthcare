import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdminData, useCrudOperations, useForm, useSearchAndFilter } from '../../hooks/useAdminData';
import { hrService } from '../../services/adminService';
import DynamicTable from '../../components/admin/DynamicTable';
import { 
  UserPlus, Save, X, Upload, Search, Filter, Download, Users, Calendar, 
  MapPin, Phone, Mail, Briefcase, DollarSign, Building, Edit, Trash2, Eye
} from 'lucide-react';

export default function DynamicEmployeeManagement() {
  const [showModal, setShowModal] = useState(false);
  const [editingEmployee, setEditingEmployee] = useState(null);
  
  // Search and filter hook
  const { searchTerm, setSearchTerm, filters, updateFilter, clearFilters, getQueryParams } = useSearchAndFilter({
    department: '',
    status: 'active'
  });

  // Employee data with search/filter
  const { data: employees, loading, refetch } = useAdminData(
    () => hrService.getEmployees(getQueryParams()),
    [getQueryParams()],
    { cacheTime: 60000 }
  );

  // CRUD operations
  const { create, update: updateEmployee, remove, loading: operationLoading } = useCrudOperations(
    hrService,
    {
      onSuccess: () => {
        setShowModal(false);
        setEditingEmployee(null);
        refetch();
      }
    }
  );

  // Form management
  const { values, errors, touched, isValid, setValue, setError, handleChange, handleBlur, validate, reset } = useForm(
    {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      employeeId: '',
      department: '',
      position: '',
      joinDate: '',
      salary: '',
      address: '',
      emergencyContact: '',
      emergencyPhone: '',
      status: 'active'
    },
    {
      firstName: (value) => !value ? 'First name is required' : '',
      lastName: (value) => !value ? 'Last name is required' : '',
      email: (value) => !value ? 'Email is required' : !/\S+@\S+\.\S+/.test(value) ? 'Invalid email' : '',
      employeeId: (value) => !value ? 'Employee ID is required' : '',
      department: (value) => !value ? 'Department is required' : '',
      position: (value) => !value ? 'Position is required' : '',
      joinDate: (value) => !value ? 'Join date is required' : '',
    }
  );

  // Departments for dropdown
  const departments = [
    'Cardiology', 'Emergency', 'Laboratory', 'Pharmacy', 'Radiology', 
    'Pediatrics', 'General Medicine', 'Administration'
  ];

  // Table columns
  const employeeColumns = [
    {
      key: 'name',
      label: 'Employee',
      sortable: true,
      render: (value, item) => (
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <span className="text-sm font-bold text-blue-600">
              {item.firstName?.[0]}{item.lastName?.[0]}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">
              {item.firstName} {item.lastName}
            </div>
            <div className="text-sm text-gray-500">{item.email}</div>
          </div>
        </div>
      )
    },
    {
      key: 'employeeId',
      label: 'Employee ID',
      sortable: true,
      render: (value) => (
        <span className="text-sm font-mono text-gray-900">{value}</span>
      )
    },
    {
      key: 'department',
      label: 'Department',
      filterable: true,
      options: departments.map(dept => ({ value: dept, label: dept })),
      render: (value) => (
        <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
          {value}
        </span>
      )
    },
    {
      key: 'position',
      label: 'Position',
      render: (value) => (
        <div className="flex items-center">
          <Briefcase className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-900">{value}</span>
        </div>
      )
    },
    {
      key: 'salary',
      label: 'Salary',
      sortable: true,
      type: 'currency',
      render: (value) => (
        <span className="text-sm font-medium text-green-600">${Number(value).toLocaleString()}</span>
      )
    },
    {
      key: 'joinDate',
      label: 'Join Date',
      sortable: true,
      type: 'date',
      render: (value) => (
        <div className="flex items-center">
          <Calendar className="w-4 h-4 text-gray-400 mr-2" />
          <span className="text-sm text-gray-900">{new Date(value).toLocaleDateString()}</span>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      filterable: true,
      type: 'badge',
      badgeConfig: {
        active: 'green',
        inactive: 'red',
        on_leave: 'yellow'
      }
    }
  ];

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    try {
      if (editingEmployee) {
        await updateEmployee(editingEmployee.id, values);
      } else {
        await create(values);
      }
      reset();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };

  // Edit employee
  const handleEdit = (employee) => {
    setEditingEmployee(employee);
    Object.keys(employee).forEach(key => {
      if (key in values) {
        setValue(key, employee[key]);
      }
    });
    setShowModal(true);
  };

  // Delete employee
  const handleDelete = async (employee) => {
    if (window.confirm(`Are you sure you want to delete ${employee.firstName} ${employee.lastName}?`)) {
      try {
        await remove(employee.id);
      } catch (error) {
        console.error('Delete error:', error);
      }
    }
  };

  // View employee
  const handleView = (employee) => {
    console.log('View employee:', employee);
  };

  // Export data
  const handleExport = (data) => {
    const csv = [
      ['First Name', 'Last Name', 'Email', 'Employee ID', 'Department', 'Position', 'Salary', 'Join Date', 'Status'],
      ...data.map(emp => [
        emp.firstName,
        emp.lastName,
        emp.email,
        emp.employeeId,
        emp.department,
        emp.position,
        emp.salary,
        emp.joinDate,
        emp.status
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `employees-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Bulk import
  const handleBulkImport = async (file) => {
    // Implementation for bulk import
    console.log('Bulk import:', file);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Employee Management</h1>
          <p className="text-gray-500 mt-1">Dynamic employee database with real-time updates</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <Upload className="w-4 h-4" />
            Bulk Import
          </button>
          <button 
            onClick={() => {
              reset();
              setEditingEmployee(null);
              setShowModal(true);
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <UserPlus className="w-4 h-4" />
            Add Employee
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Employees</p>
              <p className="text-2xl font-bold text-gray-900">{employees?.length || 0}</p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-gray-200 p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active</p>
              <p className="text-2xl font-bold text-green-600">
                {employees?.filter(e => e.status === 'active').length || 0}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
              <Users className="w-6 h-6 text-green-600" />
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
              <p className="text-gray-500 text-sm">Departments</p>
              <p className="text-2xl font-bold text-purple-600">
                {new Set(employees?.map(e => e.department) || []).size}
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
              <Building className="w-6 h-6 text-purple-600" />
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
              <p className="text-gray-500 text-sm">Avg Salary</p>
              <p className="text-2xl font-bold text-amber-600">
                ${employees?.length ? 
                  Math.round(employees.reduce((sum, e) => sum + (Number(e.salary) || 0), 0) / employees.length).toLocaleString() : 
                  0
                }
              </p>
            </div>
            <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-amber-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Employee Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <DynamicTable
          data={employees || []}
          columns={employeeColumns}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          onExport={handleExport}
          onFilter={(filters) => console.log('Filters:', filters)}
          searchable={true}
          pagination={true}
          actions={true}
        />
      </motion.div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">
                {editingEmployee ? 'Edit Employee' : 'Add New Employee'}
              </h2>
              <button
                onClick={() => {
                  setShowModal(false);
                  reset();
                  setEditingEmployee(null);
                }}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={values.firstName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.firstName && touched.firstName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="First name"
                  />
                  {errors.firstName && touched.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.lastName && touched.lastName ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Last name"
                  />
                  {errors.lastName && touched.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.email && touched.email ? 'border-red-500' : 'border-gray-300'
                      }`}
                      placeholder="email@example.com"
                    />
                  </div>
                  {errors.email && touched.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={values.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+1234567890"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID</label>
                  <input
                    type="text"
                    name="employeeId"
                    value={values.employeeId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.employeeId && touched.employeeId ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="EMP001"
                  />
                  {errors.employeeId && touched.employeeId && (
                    <p className="text-red-500 text-xs mt-1">{errors.employeeId}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
                  <select
                    name="department"
                    value={values.department}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.department && touched.department ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                  {errors.department && touched.department && (
                    <p className="text-red-500 text-xs mt-1">{errors.department}</p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Position</label>
                  <input
                    type="text"
                    name="position"
                    value={values.position}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.position && touched.position ? 'border-red-500' : 'border-gray-300'
                    }`}
                    placeholder="Job position"
                  />
                  {errors.position && touched.position && (
                    <p className="text-red-500 text-xs mt-1">{errors.position}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Join Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      name="joinDate"
                      value={values.joinDate}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.joinDate && touched.joinDate ? 'border-red-500' : 'border-gray-300'
                    }`}
                    />
                  </div>
                  {errors.joinDate && touched.joinDate && (
                    <p className="text-red-500 text-xs mt-1">{errors.joinDate}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="number"
                    name="salary"
                    value={values.salary}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                    step="0.01"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <textarea
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    rows={2}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Employee address"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={!isValid || operationLoading}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Save className="w-4 h-4" />
                  {editingEmployee ? 'Update Employee' : 'Add Employee'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowModal(false);
                    reset();
                    setEditingEmployee(null);
                  }}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <X className="w-4 h-4" />
                  Cancel
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
