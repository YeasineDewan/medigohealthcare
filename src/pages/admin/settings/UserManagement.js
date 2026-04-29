import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Search,
  Plus,
  Edit3,
  Trash2,
  Eye,
  RefreshCw,
  Lock,
  Unlock,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  X,
  AlertTriangle,
  Activity,
  Loader2,
  Calendar
} from 'lucide-react';
import settingsService from '../../../services/settingsService';

const roleColors = {
  admin: 'bg-purple-100 text-purple-700 border-purple-200',
  doctor: 'bg-blue-100 text-blue-700 border-blue-200',
  nurse: 'bg-green-100 text-green-700 border-green-200',
  staff: 'bg-gray-100 text-gray-700 border-gray-200',
  pharmacist: 'bg-teal-100 text-teal-700 border-teal-200',
  accountant: 'bg-amber-100 text-amber-700 border-amber-200'
};

const statusColors = {
  active: 'bg-green-100 text-green-700 border-green-200',
  inactive: 'bg-gray-100 text-gray-700 border-gray-200',
  suspended: 'bg-red-100 text-red-700 border-red-200',
  pending: 'bg-yellow-100 text-yellow-700 border-yellow-200'
};

const mockUsers = [
  { id: 1, name: 'Dr. Sarah Johnson', email: 'sarah.johnson@medigo.com', phone: '+1-234-567-8901', role: 'admin', status: 'active', department: 'Administration', created_at: '2023-01-15', last_login: '2024-01-20 10:30 AM' },
  { id: 2, name: 'Dr. Michael Chen', email: 'michael.chen@medigo.com', phone: '+1-234-567-8902', role: 'doctor', status: 'active', department: 'Cardiology', created_at: '2023-02-20', last_login: '2024-01-19 3:45 PM' },
  { id: 3, name: 'Emily Williams', email: 'emily.williams@medigo.com', phone: '+1-234-567-8903', role: 'nurse', status: 'active', department: 'Emergency', created_at: '2023-03-10', last_login: '2024-01-20 8:15 AM' },
  { id: 4, name: 'James Brown', email: 'james.brown@medigo.com', phone: '+1-234-567-8904', role: 'staff', status: 'inactive', department: 'Reception', created_at: '2023-04-05', last_login: '2024-01-10 11:00 AM' },
  { id: 5, name: 'Dr. Lisa Anderson', email: 'lisa.anderson@medigo.com', phone: '+1-234-567-8905', role: 'doctor', status: 'active', department: 'Neurology', created_at: '2023-05-12', last_login: '2024-01-20 9:30 AM' },
  { id: 6, name: 'Robert Martinez', email: 'robert.martinez@medigo.com', phone: '+1-234-567-8906', role: 'pharmacist', status: 'active', department: 'Pharmacy', created_at: '2023-06-18', last_login: '2024-01-19 2:20 PM' },
  { id: 7, name: 'Amanda Taylor', email: 'amanda.taylor@medigo.com', phone: '+1-234-567-8907', role: 'accountant', status: 'active', department: 'Finance', created_at: '2023-07-22', last_login: '2024-01-18 4:50 PM' },
  { id: 8, name: 'David Wilson', email: 'david.wilson@medigo.com', phone: '+1-234-567-8908', role: 'staff', status: 'suspended', department: 'Laboratory', created_at: '2023-08-30', last_login: '2024-01-05 10:00 AM' }
];

export default function UserManagement() {
  const [users, setUsers] = useState(mockUsers);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [total, setTotal] = useState(8);
  const [totalPages, setTotalPages] = useState(2);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  const [saving, setSaving] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { page: currentPage, per_page: itemsPerPage, search: searchTerm, role: roleFilter, status: statusFilter };
      const response = await settingsService.getUsers(params);
      if (response.success) {
        setUsers(response.data);
        setTotalPages(response.meta?.last_page || 2);
        setTotal(response.meta?.total || response.data.length);
      }
    } catch (err) {
      console.log('Using mock data - API not available');
      setUsers(mockUsers);
      setTotal(8);
      setTotalPages(2);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, [currentPage, roleFilter, statusFilter]);

  const filteredUsers = useMemo(() => {
    let result = [...users];
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(user => user.name?.toLowerCase().includes(term) || user.email?.toLowerCase().includes(term) || user.phone?.includes(term) || user.department?.toLowerCase().includes(term));
    }
    result.sort((a, b) => {
      let aVal = (a[sortBy] || '').toLowerCase();
      let bVal = (b[sortBy] || '').toLowerCase();
      return sortOrder === 'asc' ? (aVal > bVal ? 1 : -1) : (aVal < bVal ? 1 : -1);
    });
    return result;
  }, [users, searchTerm, sortBy, sortOrder]);

  const handleSort = (column) => {
    if (sortBy === column) { setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc'); }
    else { setSortBy(column); setSortOrder('asc'); }
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) { setSelectedUsers([]); }
    else { setSelectedUsers(filteredUsers.map(u => u.id)); }
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev => prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]);
  };

  const handleAddUser = () => { setModalMode('add'); setSelectedUser(null); setShowModal(true); };
  const handleEditUser = (user) => { setModalMode('edit'); setSelectedUser(user); setShowModal(true); };
  const handleViewUser = (user) => { setModalMode('view'); setSelectedUser(user); setShowModal(true); };
  const handleDeleteUser = (user) => { setUserToDelete(user); setShowDeleteConfirm(true); };

  const confirmDelete = async () => {
    try { await settingsService.deleteUser(userToDelete.id); } catch (err) {}
    setUsers(users.filter(u => u.id !== userToDelete.id));
    setShowDeleteConfirm(false);
    setUserToDelete(null);
  };

  const handleBulkAction = async (action) => {
    if (selectedUsers.length === 0) return;
    try {
      for (const userId of selectedUsers) {
        if (action === 'delete') { await settingsService.deleteUser(userId).catch(() => {}); }
      }
    } catch (err) {}
    if (action === 'delete') { setUsers(users.filter(u => !selectedUsers.includes(u.id))); }
    setSelectedUsers([]);
  };

  const handleSaveUser = async (userData) => {
    setSaving(true);
    try {
      if (modalMode === 'add') {
        const response = await settingsService.createUser(userData);
        if (response.success) { fetchUsers(); }
      } else if (modalMode === 'edit') {
        const response = await settingsService.updateUser(selectedUser.id, userData);
        if (response.success) { fetchUsers(); }
      }
      setShowModal(false);
    } catch (err) {
      const newUser = { ...userData, id: Date.now(), created_at: new Date().toISOString().split('T')[0], last_login: 'Never' };
      setUsers([...users, newUser]);
      setShowModal(false);
    } finally {
      setSaving(false);
    }
  };

  const handleToggleStatus = async (user) => {
    const newStatus = user.status === 'active' ? 'inactive' : 'active';
    try { await settingsService.updateUser(user.id, { status: newStatus }); } catch (err) {}
    setUsers(users.map(u => u.id === user.id ? { ...u, status: newStatus } : u));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
          <p className="text-gray-500 mt-1">Manage users, roles, and permissions</p>
        </div>
        <div className="flex gap-3">
          <button onClick={fetchUsers} className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"><RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />Refresh</button>
          <button onClick={handleAddUser} className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg"><Plus className="w-4 h-4" />Add User</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Total Users</p><p className="text-2xl font-bold text-gray-900">{total}</p></div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><Users className="w-6 h-6 text-blue-600" /></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Active Users</p><p className="text-2xl font-bold text-green-600">{users.filter(u => u.status === 'active').length}</p></div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><UserCheck className="w-6 h-6 text-green-600" /></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Doctors</p><p className="text-2xl font-bold text-purple-600">{users.filter(u => u.role === 'doctor').length}</p></div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"><Activity className="w-6 h-6 text-purple-600" /></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Pending</p><p className="text-2xl font-bold text-yellow-600">{users.filter(u => u.status === 'pending').length}</p></div>
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center"><AlertTriangle className="w-6 h-6 text-yellow-600" /></div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search users..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" />
          </div>
          <select value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)} className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]">
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="doctor">Doctor</option>
            <option value="nurse">Nurse</option>
            <option value="staff">Staff</option>
            <option value="pharmacist">Pharmacist</option>
            <option value="accountant">Accountant</option>
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full md:w-48 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="suspended">Suspended</option>
            <option value="pending">Pending</option>
          </select>
        </div>
        {selectedUsers.length > 0 && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-4 p-3 bg-[#5DBB63]/10 rounded-lg flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">{selectedUsers.length} user(s) selected</span>
            <button onClick={() => handleBulkAction('delete')} className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg">Delete</button>
          </motion.div>
        )}
      </div>

      {loading && <div className="flex items-center justify-center py-12"><Loader2 className="w-8 h-8 animate-spin text-[#5DBB63]" /><span className="ml-2">Loading...</span></div>}

      {error && <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3"><AlertTriangle className="w-5 h-5 text-red-600" /><p className="text-red-600">{error}</p></div>}

      {!loading && !error && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left"><input type="checkbox" checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0} onChange={handleSelectAll} className="w-4 h-4" /></th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer" onClick={() => handleSort('name')}>User {sortBy === 'name' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Role</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Department</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase cursor-pointer" onClick={() => handleSort('status')}>Status {sortBy === 'status' && (sortOrder === 'asc' ? '↑' : '↓')}</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Last Login</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredUsers.map((user, index) => (
                  <motion.tr key={user.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="hover:bg-gray-50">
                    <td className="px-4 py-3"><input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={() => handleSelectUser(user.id)} className="w-4 h-4" /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white font-semibold">{user.name?.charAt(0) || '?'}</div>
                        <div><p className="font-medium">{user.name}</p><p className="text-sm text-gray-500">{user.email}</p></div>
                      </div>
                    </td>
                    <td className="px-4 py-3"><span className={`px-3 py-1 rounded-full text-xs font-medium border ${roleColors[user.role] || roleColors.staff}`}>{user.role?.charAt(0).toUpperCase() + (user.role?.slice(1) || 'Staff')}</span></td>
                    <td className="px-4 py-3 text-sm text-gray-600">{user.department || '-'}</td>
                    <td className="px-4 py-3"><span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[user.status] || statusColors.inactive}`}>{user.status?.charAt(0).toUpperCase() + (user.status?.slice(1) || 'Inactive')}</span></td>
                    <td className="px-4 py-3 text-sm text-gray-500">{user.last_login || 'Never'}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center justify-end gap-2">
                        <button onClick={() => handleViewUser(user)} className="p-1.5 text-gray-500 hover:text-[#5DBB63] rounded-lg"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => handleEditUser(user)} className="p-1.5 text-gray-500 hover:text-blue-600 rounded-lg"><Edit3 className="w-4 h-4" /></button>
                        <button onClick={() => handleToggleStatus(user)} className={`p-1.5 rounded-lg ${user.status === 'active' ? 'text-gray-500 hover:text-orange-600' : 'text-gray-500 hover:text-green-600'}`}>{user.status === 'active' ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}</button>
                        <button onClick={() => handleDeleteUser(user)} className="p-1.5 text-gray-500 hover:text-red-600 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-4 py-3 border-t border-gray-200 flex items-center justify-between">
            <p className="text-sm text-gray-500">Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, total)} of {total}</p>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1} className="p-2 rounded-lg border border-gray-300 disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button key={page} onClick={() => setCurrentPage(page)} className={`w-8 h-8 rounded-lg text-sm ${currentPage === page ? 'bg-[#5DBB63] text-white' : 'border border-gray-300'}`}>{page}</button>
              ))}
              <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages} className="p-2 rounded-lg border border-gray-300 disabled:opacity-50"><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
        </div>
      )}

      <AnimatePresence>{showModal && <UserModal mode={modalMode} user={selectedUser} onClose={() => setShowModal(false)} onSave={handleSaveUser} saving={saving} />}</AnimatePresence>
      <AnimatePresence>{showDeleteConfirm && <DeleteConfirmModal user={userToDelete} onConfirm={confirmDelete} onCancel={() => { setShowDeleteConfirm(false); setUserToDelete(null); }} />}</AnimatePresence>
    </div>
  );
}

function UserModal({ mode, user, onClose, onSave, saving }) {
  const [formData, setFormData] = useState(user || { name: '', email: '', phone: '', role: 'staff', status: 'active', department: '' });
  const handleSubmit = (e) => { e.preventDefault(); onSave(formData); };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">{mode === 'add' ? 'Add New User' : mode === 'edit' ? 'Edit User' : 'User Details'}</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            <div className="flex justify-center mb-6"><div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] flex items-center justify-center text-white text-3xl font-bold">{formData.name?.charAt(0) || '?'}</div></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label><input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} disabled={mode === 'view'} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label><input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} disabled={mode === 'view'} required className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" /></div>
            <div><label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label><input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} disabled={mode === 'view'} className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" /></div>
            <div className="grid grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Role</label><select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} disabled={mode === 'view'} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option value="admin">Admin</option><option value="doctor">Doctor</option><option value="nurse">Nurse</option><option value="staff">Staff</option><option value="pharmacist">Pharmacist</option><option value="accountant">Accountant</option></select></div>
              <div><label className="block text-sm font-medium text-gray-700 mb-1">Department</label><input type="text" value={formData.department} onChange={(e) => setFormData({ ...formData, department: e.target.value })} disabled={mode === 'view'} className="w-full px-3 py-2 border border-gray-300 rounded-lg" /></div>
            </div>
            {mode !== 'add' && <div><label className="block text-sm font-medium text-gray-700 mb-1">Status</label><select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} disabled={mode === 'view'} className="w-full px-3 py-2 border border-gray-300 rounded-lg"><option value="active">Active</option><option value="inactive">Inactive</option><option value="suspended">Suspended</option><option value="pending">Pending</option></select></div>}
            {mode === 'view' && user && <div className="bg-gray-50 rounded-lg p-4 space-y-2"><div className="flex items-center gap-2 text-sm"><Calendar className="w-4 h-4 text-gray-400" /><span>Created:</span><span className="font-medium">{user.created_at || 'N/A'}</span></div><div className="flex items-center gap-2 text-sm"><Activity className="w-4 h-4 text-gray-400" /><span>Last Login:</span><span className="font-medium">{user.last_login || 'Never'}</span></div></div>}
          </div>
          <div className="p-6 border-t border-gray-200 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">{mode === 'view' ? 'Close' : 'Cancel'}</button>
            {mode !== 'view' && <button type="submit" disabled={saving} className="px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg disabled:opacity-50 flex items-center gap-2">{saving && <Loader2 className="w-4 h-4 animate-spin" />}{mode === 'add' ? 'Add User' : 'Save Changes'}</button>}
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}

function DeleteConfirmModal({ user, onConfirm, onCancel }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <motion.div initial={{ scale: 0.95 }} animate={{ scale: 1 }} exit={{ scale: 0.95 }} className="bg-white rounded-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 rounded-full mb-4"><AlertTriangle className="w-8 h-8 text-red-600" /></div>
        <h3 className="text-xl font-bold text-center mb-2">Delete User</h3>
        <p className="text-gray-500 text-center mb-6">Are you sure you want to delete <span className="font-semibold">{user?.name}</span>?</p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">Cancel</button>
          <button onClick={onConfirm} className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">Delete</button>
        </div>
      </motion.div>
    </motion.div>
  );
}
