import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  Plus,
  Edit3,
  Trash2,
  Copy,
  MoreVertical,
  Check,
  X,
  ChevronDown,
  ChevronRight,
  Users,
  Lock,
  Unlock,
  Settings,
  Save,
  Search,
  Filter,
  AlertTriangle,
  Eye,
  EyeOff,
  RefreshCw,
  ArrowUpDown,
  Star,
  Briefcase,
  Stethoscope,
  FileText,
  Calendar,
  DollarSign,
  Package,
  FlaskConical,
  Heart,
  Pill,
  Ambulance,
  Bell,
  Mail,
  MessageSquare,
  Building,
  Activity
} from 'lucide-react';

// Permission groups with icons
const permissionGroups = [
  {
    id: 'users',
    name: 'User Management',
    icon: Users,
    permissions: [
      { id: 'view_users', name: 'View Users', description: 'View user list and profiles' },
      { id: 'create_users', name: 'Create Users', description: 'Add new users' },
      { id: 'edit_users', name: 'Edit Users', description: 'Modify user information' },
      { id: 'delete_users', name: 'Delete Users', description: 'Remove users' },
      { id: 'manage_roles', name: 'Manage Roles', description: 'Create and edit roles' }
    ]
  },
  {
    id: 'patients',
    name: 'Patient Management',
    icon: Users,
    permissions: [
      { id: 'view_patients', name: 'View Patients', description: 'View patient records' },
      { id: 'create_patients', name: 'Create Patients', description: 'Register new patients' },
      { id: 'edit_patients', name: 'Edit Patients', description: 'Modify patient information' },
      { id: 'delete_patients', name: 'Delete Patients', description: 'Remove patient records' },
      { id: 'view_medical_records', name: 'View Medical Records', description: 'Access medical history' },
      { id: 'edit_medical_records', name: 'Edit Medical Records', description: 'Update medical history' }
    ]
  },
  {
    id: 'doctors',
    name: 'Doctor Management',
    icon: Stethoscope,
    permissions: [
      { id: 'view_doctors', name: 'View Doctors', description: 'View doctor profiles' },
      { id: 'create_doctors', name: 'Create Doctors', description: 'Register new doctors' },
      { id: 'edit_doctors', name: 'Edit Doctors', description: 'Modify doctor information' },
      { id: 'delete_doctors', name: 'Delete Doctors', description: 'Remove doctors' },
      { id: 'view_schedules', name: 'View Schedules', description: 'View doctor schedules' },
      { id: 'manage_schedules', name: 'Manage Schedules', description: 'Edit doctor schedules' }
    ]
  },
  {
    id: 'appointments',
    name: 'Appointments',
    icon: Calendar,
    permissions: [
      { id: 'view_appointments', name: 'View Appointments', description: 'View all appointments' },
      { id: 'create_appointments', name: 'Create Appointments', description: 'Book new appointments' },
      { id: 'edit_appointments', name: 'Edit Appointments', description: 'Modify appointments' },
      { id: 'cancel_appointments', name: 'Cancel Appointments', description: 'Cancel appointments' },
      { id: 'view_calendar', name: 'View Calendar', description: 'Access calendar view' }
    ]
  },
  {
    id: 'prescriptions',
    name: 'Prescriptions',
    icon: FileText,
    permissions: [
      { id: 'view_prescriptions', name: 'View Prescriptions', description: 'View prescriptions' },
      { id: 'create_prescriptions', name: 'Create Prescriptions', description: 'Write new prescriptions' },
      { id: 'edit_prescriptions', name: 'Edit Prescriptions', description: 'Modify prescriptions' },
      { id: 'delete_prescriptions', name: 'Delete Prescriptions', description: 'Remove prescriptions' }
    ]
  },
  {
    id: 'pharmacy',
    name: 'Pharmacy',
    icon: Pill,
    permissions: [
      { id: 'view_pharmacy', name: 'View Pharmacy', description: 'View pharmacy inventory' },
      { id: 'manage_inventory', name: 'Manage Inventory', description: 'Update stock levels' },
      { id: 'process_orders', name: 'Process Orders', description: 'Handle pharmacy orders' },
      { id: 'view_suppliers', name: 'View Suppliers', description: 'View supplier list' }
    ]
  },
  {
    id: 'laboratory',
    name: 'Laboratory',
    icon: FlaskConical,
    permissions: [
      { id: 'view_lab_tests', name: 'View Lab Tests', description: 'View available tests' },
      { id: 'create_lab_orders', name: 'Create Lab Orders', description: 'Order lab tests' },
      { id: 'view_lab_results', name: 'View Results', description: 'Access test results' },
      { id: 'manage_lab_equipment', name: 'Manage Equipment', description: 'Configure lab equipment' }
    ]
  },
  {
    id: 'financial',
    name: 'Financial',
    icon: DollarSign,
    permissions: [
      { id: 'view_financial_reports', name: 'View Reports', description: 'Access financial reports' },
      { id: 'manage_payments', name: 'Manage Payments', description: 'Process payments' },
      { id: 'refund_payments', name: 'Refund Payments', description: 'Issue refunds' },
      { id: 'manage_invoices', name: 'Manage Invoices', description: 'Create and edit invoices' }
    ]
  },
  {
    id: 'inventory',
    name: 'Inventory',
    icon: Package,
    permissions: [
      { id: 'view_inventory', name: 'View Inventory', description: 'View stock levels' },
      { id: 'manage_stock', name: 'Manage Stock', description: 'Update inventory' },
      { id: 'create_purchase_orders', name: 'Create Purchase Orders', description: 'Place orders' },
      { id: 'view_suppliers', name: 'View Suppliers', description: 'Access supplier list' }
    ]
  },
  {
    id: 'emergency',
    name: 'Emergency',
    icon: Ambulance,
    permissions: [
      { id: 'view_emergency', name: 'View Emergency', description: 'View emergency cases' },
      { id: 'manage_emergency', name: 'Manage Emergency', description: 'Handle emergencies' },
      { id: 'dispatch_ambulance', name: 'Dispatch Ambulance', description: 'Send ambulances' }
    ]
  },
  {
    id: 'communications',
    name: 'Communications',
    icon: MessageSquare,
    permissions: [
      { id: 'send_notifications', name: 'Send Notifications', description: 'Broadcast messages' },
      { id: 'manage_banners', name: 'Manage Banners', description: 'Edit site banners' },
      { id: 'manage_campaigns', name: 'Manage Campaigns', description: 'Marketing campaigns' }
    ]
  },
  {
    id: 'settings',
    name: 'Settings',
    icon: Settings,
    permissions: [
      { id: 'view_settings', name: 'View Settings', description: 'View system settings' },
      { id: 'manage_settings', name: 'Manage Settings', description: 'Modify configurations' },
      { id: 'view_logs', name: 'View Logs', description: 'Access system logs' },
      { id: 'backup_restore', name: 'Backup & Restore', description: 'Manage backups' }
    ]
  }
];

// Initial roles data
const initialRoles = [
  {
    id: 1,
    name: 'Super Admin',
    description: 'Full access to all system features',
    color: 'purple',
    isDefault: false,
    userCount: 2,
    permissions: permissionGroups.flatMap(g => g.permissions).map(p => p.id),
    createdAt: '2023-01-01'
  },
  {
    id: 2,
    name: 'Doctor',
    description: 'Medical professionals with patient access',
    color: 'blue',
    isDefault: true,
    userCount: 15,
    permissions: [
      'view_patients', 'create_patients', 'edit_patients',
      'view_medical_records', 'edit_medical_records',
      'view_doctors', 'view_schedules', 'manage_schedules',
      'view_appointments', 'create_appointments', 'edit_appointments',
      'view_prescriptions', 'create_prescriptions', 'edit_prescriptions',
      'view_lab_tests', 'create_lab_orders', 'view_lab_results',
      'view_emergency', 'manage_emergency'
    ],
    createdAt: '2023-01-01'
  },
  {
    id: 3,
    name: 'Nurse',
    description: 'Nursing staff with patient care duties',
    color: 'green',
    isDefault: false,
    userCount: 25,
    permissions: [
      'view_patients', 'view_medical_records',
      'view_appointments', 'create_appointments',
      'view_prescriptions',
      'view_lab_tests', 'view_lab_results',
      'view_emergency', 'manage_emergency'
    ],
    createdAt: '2023-01-01'
  },
  {
    id: 4,
    name: 'Staff',
    description: 'Administrative and support staff',
    color: 'gray',
    isDefault: false,
    userCount: 30,
    permissions: [
      'view_patients', 'create_patients', 'edit_patients',
      'view_appointments', 'create_appointments', 'edit_appointments', 'cancel_appointments',
      'view_calendar',
      'view_pharmacy', 'process_orders',
      'view_lab_tests', 'create_lab_orders'
    ],
    createdAt: '2023-01-01'
  },
  {
    id: 5,
    name: 'Pharmacist',
    description: 'Pharmacy department personnel',
    color: 'teal',
    isDefault: false,
    userCount: 8,
    permissions: [
      'view_pharmacy', 'manage_inventory', 'process_orders', 'view_suppliers',
      'view_prescriptions', 'view_patients'
    ],
    createdAt: '2023-01-01'
  },
  {
    id: 6,
    name: 'Accountant',
    description: 'Finance and billing personnel',
    color: 'amber',
    isDefault: false,
    userCount: 5,
    permissions: [
      'view_financial_reports', 'manage_payments', 'refund_payments', 'manage_invoices',
      'view_inventory', 'create_purchase_orders'
    ],
    createdAt: '2023-01-01'
  }
];

const colorClasses = {
  purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200', ring: 'ring-purple-500' },
  blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', ring: 'ring-blue-500' },
  green: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', ring: 'ring-green-500' },
  gray: { bg: 'bg-gray-100', text: 'text-gray-700', border: 'border-gray-200', ring: 'ring-gray-500' },
  teal: { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-200', ring: 'ring-teal-500' },
  amber: { bg: 'bg-amber-100', text: 'text-amber-700', border: 'border-amber-200', ring: 'ring-amber-500' },
  red: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', ring: 'ring-red-500' }
};

export default function RolePermissions() {
  const [roles, setRoles] = useState(initialRoles);
  const [selectedRole, setSelectedRole] = useState(initialRoles[1]); // Default to Doctor
  const [searchTerm, setSearchTerm] = useState('');
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [roleModalMode, setRoleModalMode] = useState('add'); // add, edit
  const [editingRole, setEditingRole] = useState(null);
  const [showPermissionMatrix, setShowPermissionMatrix] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState(permissionGroups.map(g => g.id));
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [roleToDelete, setRoleToDelete] = useState(null);

  // Get all unique permissions
  const allPermissions = useMemo(() => {
    return permissionGroups.flatMap(g => g.permissions);
  }, []);

  // Filter permissions based on search
  const filteredGroups = useMemo(() => {
    if (!searchTerm) return permissionGroups;
    
    const term = searchTerm.toLowerCase();
    return permissionGroups
      .map(group => ({
        ...group,
        permissions: group.permissions.filter(
          p => p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)
        )
      }))
      .filter(group => group.permissions.length > 0);
  }, [searchTerm]);

  const toggleGroup = (groupId) => {
    setExpandedGroups(prev =>
      prev.includes(groupId)
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const hasPermission = (permissionId) => {
    return selectedRole?.permissions?.includes(permissionId);
  };

  const togglePermission = (permissionId) => {
    if (!selectedRole) return;
    
    const newPermissions = selectedRole.permissions.includes(permissionId)
      ? selectedRole.permissions.filter(id => id !== permissionId)
      : [...selectedRole.permissions, permissionId];
    
    setSelectedRole({ ...selectedRole, permissions: newPermissions });
    setRoles(roles.map(r => r.id === selectedRole.id ? { ...r, permissions: newPermissions } : r));
  };

  const selectAllInGroup = (groupId) => {
    const group = permissionGroups.find(g => g.id === groupId);
    if (!group || !selectedRole) return;
    
    const groupPerms = group.permissions.map(p => p.id);
    const allSelected = groupPerms.every(id => selectedRole.permissions.includes(id));
    
    const newPermissions = allSelected
      ? selectedRole.permissions.filter(id => !groupPerms.includes(id))
      : [...new Set([...selectedRole.permissions, ...groupPerms])];
    
    setSelectedRole({ ...selectedRole, permissions: newPermissions });
    setRoles(roles.map(r => r.id === selectedRole.id ? { ...r, permissions: newPermissions } : r));
  };

  const handleAddRole = () => {
    setRoleModalMode('add');
    setEditingRole(null);
    setShowRoleModal(true);
  };

  const handleEditRole = (role) => {
    setRoleModalMode('edit');
    setEditingRole(role);
    setShowRoleModal(true);
  };

  const handleDuplicateRole = (role) => {
    const newRole = {
      ...role,
      id: Math.max(...roles.map(r => r.id)) + 1,
      name: `${role.name} (Copy)`,
      isDefault: false,
      userCount: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setRoles([...roles, newRole]);
    setSelectedRole(newRole);
  };

  const handleDeleteRole = (role) => {
    setRoleToDelete(role);
    setShowDeleteConfirm(true);
  };

  const confirmDelete = () => {
    if (roleToDelete.isDefault) {
      alert('Cannot delete default role');
      return;
    }
    setRoles(roles.filter(r => r.id !== roleToDelete.id));
    if (selectedRole?.id === roleToDelete.id) {
      setSelectedRole(roles.find(r => r.id !== roleToDelete.id));
    }
    setShowDeleteConfirm(false);
    setRoleToDelete(null);
  };

  const handleSaveRole = (roleData) => {
    if (roleModalMode === 'add') {
      const newRole = {
        ...roleData,
        id: Math.max(...roles.map(r => r.id)) + 1,
        userCount: 0,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setRoles([...roles, newRole]);
      setSelectedRole(newRole);
    } else {
      setRoles(roles.map(r => r.id === editingRole.id ? { ...r, ...roleData } : r));
      if (selectedRole?.id === editingRole.id) {
        setSelectedRole({ ...selectedRole, ...roleData });
      }
    }
    setShowRoleModal(false);
  };

  const toggleDefaultRole = (role) => {
    const newRoles = roles.map(r => ({
      ...r,
      isDefault: r.id === role.id
    }));
    setRoles(newRoles);
    if (selectedRole?.id === role.id) {
      setSelectedRole({ ...selectedRole, isDefault: true });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Role & Permissions</h1>
          <p className="text-gray-500 mt-1">Manage roles and configure access permissions</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowPermissionMatrix(!showPermissionMatrix)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              showPermissionMatrix
                ? 'bg-[#5DBB63] text-white border-[#5DBB63]'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <Shield className="w-4 h-4" />
            {showPermissionMatrix ? 'Hide Matrix' : 'Show Matrix'}
          </button>
          <button
            onClick={handleAddRole}
            className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            Add Role
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Roles List */}
        <div className="lg:col-span-1 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search roles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
            />
          </div>

          {/* Roles Cards */}
          <div className="space-y-3">
            {roles
              .filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()))
              .map((role, index) => (
                <motion.div
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => setSelectedRole(role)}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                    selectedRole?.id === role.id
                      ? `border-[#5DBB63] bg-[#5DBB63]/5`
                      : 'border-gray-100 hover:border-gray-200 bg-white'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${colorClasses[role.color].bg} flex items-center justify-center`}>
                        <Shield className={`w-5 h-5 ${colorClasses[role.color].text}`} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-gray-900">{role.name}</h3>
                          {role.isDefault && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{role.userCount} users</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDuplicateRole(role);
                        }}
                        className="p-1.5 text-gray-400 hover:text-[#5DBB63] hover:bg-[#5DBB63]/10 rounded-lg transition-colors"
                        title="Duplicate"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEditRole(role);
                        }}
                        className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      {!role.isDefault && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteRole(role);
                          }}
                          className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2 ml-13">{role.description}</p>
                </motion.div>
              ))}
          </div>
        </div>

        {/* Permission Panel */}
        <div className="lg:col-span-2">
          {selectedRole ? (
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {/* Role Header */}
              <div className="p-5 border-b border-gray-200 bg-gradient-to-r from-gray-50 to-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl ${colorClasses[selectedRole.color].bg} flex items-center justify-center`}>
                      <Shield className={`w-6 h-6 ${colorClasses[selectedRole.color].text}`} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-lg font-bold text-gray-900">{selectedRole.name}</h2>
                        {selectedRole.isDefault && (
                          <span className="px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-700 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{selectedRole.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {!selectedRole.isDefault && (
                      <button
                        onClick={() => toggleDefaultRole(selectedRole)}
                        className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                          selectedRole.isDefault
                            ? 'bg-yellow-50 border-yellow-200 text-yellow-700'
                            : 'border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <Star className={`w-4 h-4 ${selectedRole.isDefault ? 'fill-current' : ''}`} />
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => {
                        // Save permissions
                        setRoles(roles.map(r => r.id === selectedRole.id ? selectedRole : r));
                      }}
                      className="flex items-center gap-2 px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4CAF50] transition-colors"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                  </div>
                </div>
              </div>

              {/* Permission Groups */}
              <div className="p-4 space-y-2 max-h-[600px] overflow-y-auto">
                {filteredGroups.map((group) => {
                  const GroupIcon = group.icon;
                  const isExpanded = expandedGroups.includes(group.id);
                  const groupPerms = group.permissions.map(p => p.id);
                  const selectedCount = groupPerms.filter(id => selectedRole.permissions.includes(id)).length;
                  const allSelected = selectedCount === groupPerms.length && groupPerms.length > 0;

                  return (
                    <div key={group.id} className="border border-gray-100 rounded-lg overflow-hidden">
                      {/* Group Header */}
                      <div className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors">
                        <button
                          onClick={() => toggleGroup(group.id)}
                          className="flex items-center gap-3 flex-1"
                        >
                          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center shadow-sm">
                            <GroupIcon className="w-4 h-4 text-gray-600" />
                          </div>
                          <div className="text-left">
                            <h3 className="font-medium text-gray-900">{group.name}</h3>
                            <p className="text-xs text-gray-500">{selectedCount}/{group.permissions.length} permissions</p>
                          </div>
                        </button>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => selectAllInGroup(group.id)}
                            className={`px-2 py-1 text-xs rounded ${
                              allSelected
                                ? 'bg-[#5DBB63] text-white'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                          >
                            {allSelected ? 'Deselect All' : 'Select All'}
                          </button>
                          <button onClick={() => toggleGroup(group.id)} className="p-1">
                            {isExpanded ? (
                              <ChevronDown className="w-5 h-5 text-gray-400" />
                            ) : (
                              <ChevronRight className="w-5 h-5 text-gray-400" />
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Permissions List */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="p-4 space-y-3 bg-white">
                              {group.permissions.map((permission) => (
                                <label
                                  key={permission.id}
                                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                                >
                                  <input
                                    type="checkbox"
                                    checked={hasPermission(permission.id)}
                                    onChange={() => togglePermission(permission.id)}
                                    className="w-5 h-5 mt-0.5 rounded border-gray-300 text-[#5DBB63] focus:ring-[#5DBB63]"
                                  />
                                  <div className="flex-1">
                                    <p className="font-medium text-gray-900">{permission.name}</p>
                                    <p className="text-sm text-gray-500">{permission.description}</p>
                                  </div>
                                  {hasPermission(permission.id) && (
                                    <Check className="w-5 h-5 text-[#5DBB63]" />
                                  )}
                                </label>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
              <Shield className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No Role Selected</h3>
              <p className="text-gray-500">Select a role from the list to view and edit permissions</p>
            </div>
          )}
        </div>
      </div>

      {/* Permission Matrix View */}
      <AnimatePresence>
        {showPermissionMatrix && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            <div className="p-5 border-b border-gray-200">
              <h2 className="text-lg font-bold text-gray-900">Permission Matrix</h2>
              <p className="text-sm text-gray-500">Overview of all permissions across roles</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase sticky left-0 bg-gray-50">
                      Permission
                    </th>
                    {roles.map(role => (
                      <th key={role.id} className="px-4 py-3 text-center">
                        <div className="flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-lg ${colorClasses[role.color].bg} flex items-center justify-center mb-1`}>
                            <Shield className={`w-4 h-4 ${colorClasses[role.color].text}`} />
                          </div>
                          <span className="text-xs font-medium text-gray-700">{role.name}</span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {permissionGroups.map(group => (
                    <>
                      <tr key={`${group.id}-header`} className="bg-gray-100">
                        <td colSpan={roles.length + 1} className="px-4 py-2">
                          <span className="font-semibold text-gray-700">{group.name}</span>
                        </td>
                      </tr>
                      {group.permissions.map(permission => (
                        <tr key={permission.id} className="hover:bg-gray-50">
                          <td className="px-4 py-3 text-sm text-gray-700 sticky left-0 bg-white">
                            {permission.name}
                          </td>
                          {roles.map(role => (
                            <td key={`${role.id}-${permission.id}`} className="px-4 py-3 text-center">
                              {role.permissions.includes(permission.id) ? (
                                <Check className="w-5 h-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="w-5 h-5 text-gray-300 mx-auto" />
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Role Modal */}
      <AnimatePresence>
        {showRoleModal && (
          <RoleModal
            mode={roleModalMode}
            role={editingRole}
            onClose={() => setShowRoleModal(false)}
            onSave={handleSaveRole}
          />
        )}
      </AnimatePresence>

      {/* Delete Confirmation */}
      <AnimatePresence>
        {showDeleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl w-full max-w-md p-6"
            >
              <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 text-center mb-2">Delete Role</h3>
              <p className="text-gray-500 text-center mb-6">
                Are you sure you want to delete the <span className="font-semibold text-gray-900">{roleToDelete?.name}</span> role? Users with this role will need to be reassigned.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Role Modal Component
function RoleModal({ mode, role, onClose, onSave }) {
  const [formData, setFormData] = useState(role || {
    name: '',
    description: '',
    color: 'blue',
    permissions: []
  });

  const colors = ['purple', 'blue', 'green', 'gray', 'teal', 'amber', 'red'];

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-2xl w-full max-w-lg"
      >
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {mode === 'add' ? 'Create New Role' : 'Edit Role'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Role Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                placeholder="e.g., Receptionist"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={2}
                placeholder="Brief description of this role"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
              />
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <div className="flex gap-2">
                {colors.map(color => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setFormData({ ...formData, color })}
                    className={`w-10 h-10 rounded-lg ${colorClasses[color].bg} flex items-center justify-center transition-all ${
                      formData.color === color ? 'ring-2 ring-offset-2 ring-[#5DBB63]' : ''
                    }`}
                  >
                    <Shield className={`w-5 h-5 ${colorClasses[color].text}`} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049] transition-all"
            >
              {mode === 'add' ? 'Create Role' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
