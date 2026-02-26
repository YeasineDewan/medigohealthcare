import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings,
  Save,
  Plus,
  Trash2,
  Edit3,
  ChevronDown,
  ChevronRight,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Users,
  Shield,
  Search,
  Filter,
  Download,
  Upload,
  RefreshCw,
  CheckCircle,
  XCircle,
  AlertTriangle,
  GripVertical,
  Star,
  Clock,
  Zap,
  TrendingUp,
  Tag,
  Percent,
  Gift,
  Target,
  MessageSquare,
  Phone,
  Mail,
  FileText,
  BarChart3,
  PieChart,
  Activity,
  Heart,
  Brain,
  Bone,
  Eye as EyeIcon,
  Baby,
  Smile,
  Hospital,
  Stethoscope,
  Pill,
  Package,
  ShoppingCart,
  FlaskConical,
  FolderOpen,
  Ambulance,
  Bell,
  Image,
  CreditCard,
  UserPlus,
  DollarSign,
  FileSpreadsheet,
  ClipboardList,
  Award,
  BookOpen,
  GraduationCap,
  Briefcase,
  Building,
  HelpCircle,
  FileCheck,
  Archive,
  Edit,
  Copy,
  Move,
  MoreVertical,
} from 'lucide-react';
import { adminMenuService } from '../../services/adminMenuService';
import { useAdminStore } from '../../store/adminStore';

const MenuConfiguration = () => {
  const { user, permissions } = useAdminStore();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [expandedItems, setExpandedItems] = useState(new Set());
  const [viewMode, setViewMode] = useState('tree');
  const [filterRole, setFilterRole] = useState('all');
  const [showHidden, setShowHidden] = useState(true);
  const [draggedItem, setDraggedItem] = useState(null);

  const [formData, setFormData] = useState({
    id: '',
    label: '',
    icon: '',
    path: '',
    permissions: [],
    roles: [],
    visible: true,
    order: 0,
    badge: null,
    parentId: null
  });

  const availablePermissions = [
    'dashboard.view',
    'accounts.view', 'accounts.create', 'accounts.edit', 'accounts.delete',
    'patients.view', 'patients.create', 'patients.edit', 'patients.delete',
    'doctors.view', 'doctors.create', 'doctors.edit', 'doctors.delete', 'doctors.manage',
    'reports.view', 'reports.patients', 'reports.financial', 'reports.inventory',
    'settings.view', 'settings.general', 'settings.users', 'settings.permissions',
    'admin'
  ];

  const availableRoles = [
    'admin',
    'manager',
    'doctor',
    'nurse',
    'receptionist',
    'accountant',
    'lab_technician',
    'pharmacist'
  ];

  const availableIcons = [
    { name: 'LayoutDashboard', component: LayoutDashboard, label: 'Dashboard' },
    { name: 'Users', component: Users, label: 'Users' },
    { name: 'Settings', component: Settings, label: 'Settings' },
    { name: 'Stethoscope', component: Stethoscope, label: 'Medical' },
    { name: 'Calendar', component: Calendar, label: 'Calendar' },
    { name: 'Pill', component: Pill, label: 'Pharmacy' },
    { name: 'Package', component: Package, label: 'Inventory' },
    { name: 'ShoppingCart', component: ShoppingCart, label: 'Sales' },
    { name: 'FlaskConical', component: FlaskConical, label: 'Laboratory' },
    { name: 'FolderOpen', component: FolderOpen, label: 'Documents' },
    { name: 'Ambulance', component: Ambulance, label: 'Emergency' },
    { name: 'Bell', component: Bell, label: 'Notifications' },
    { name: 'Image', component: Image, label: 'Media' },
    { name: 'FileText', component: FileText, label: 'Documents' },
    { name: 'TrendingUp', component: TrendingUp, label: 'Analytics' },
    { name: 'CreditCard', component: CreditCard, label: 'Payments' },
    { name: 'UserPlus', component: UserPlus, label: 'Add User' },
    { name: 'Clock', component: Clock, label: 'Time' },
    { name: 'DollarSign', component: DollarSign, label: 'Finance' },
    { name: 'FileSpreadsheet', component: FileSpreadsheet, label: 'Reports' },
    { name: 'BarChart3', component: BarChart3, label: 'Charts' },
    { name: 'PieChart', component: PieChart, label: 'Analytics' },
    { name: 'Activity', component: Activity, label: 'Activity' },
    { name: 'Heart', component: Heart, label: 'Health' },
    { name: 'Brain', component: Brain, label: 'Neurology' },
    { name: 'Bone', component: Bone, label: 'Orthopedics' },
    { name: 'EyeIcon', component: EyeIcon, label: 'Ophthalmology' },
    { name: 'Baby', component: Baby, label: 'Pediatrics' },
    { name: 'Smile', component: Smile, label: 'Dentistry' },
    { name: 'Hospital', component: Hospital, label: 'Hospital' },
  ];

  const badgeTypes = [
    { type: 'new', label: 'New', icon: Star, color: 'text-yellow-400' },
    { type: 'alert', label: 'Alert', icon: AlertTriangle, color: 'text-red-400' },
    { type: 'trending', label: 'Trending', icon: TrendingUp, color: 'text-green-400' },
    { type: 'pending', label: 'Pending', icon: Clock, color: 'text-orange-400' },
    { type: 'active', label: 'Active', icon: Zap, color: 'text-blue-400' },
  ];

  const loadMenuConfiguration = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await adminMenuService.getMenuStructure();
      setMenuItems(data);
    } catch (err) {
      setError(err.message || 'Failed to load menu configuration');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMenuConfiguration();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isEditing) {
        setMenuItems(prev => updateMenuItem(prev, formData));
      } else {
        setMenuItems(prev => addMenuItem(prev, formData));
      }
      
      setIsEditing(false);
      setSelectedItem(null);
      resetForm();
    } catch (err) {
      setError(err.message || 'Failed to save menu item');
    } finally {
      setLoading(false);
    }
  };

  const addMenuItem = (items, newItem) => {
    if (newItem.parentId) {
      return items.map(item => {
        if (item.id === newItem.parentId) {
          return {
            ...item,
            children: [...(item.children || []), { ...newItem, id: Date.now().toString() }]
          };
        }
        if (item.children) {
          return {
            ...item,
            children: addMenuItem(item.children, newItem)
          };
        }
        return item;
      });
    }
    return [...items, { ...newItem, id: Date.now().toString() }];
  };

  const updateMenuItem = (items, updatedItem) => {
    return items.map(item => {
      if (item.id === updatedItem.id) {
        return { ...item, ...updatedItem };
      }
      if (item.children) {
        return {
          ...item,
          children: updateMenuItem(item.children, updatedItem)
        };
      }
      return item;
    });
  };

  const deleteMenuItem = (itemId) => {
    const deleteFromItems = (items) => {
      return items.filter(item => {
        if (item.id === itemId) return false;
        if (item.children) {
          item.children = deleteFromItems(item.children);
        }
        return true;
      });
    };
    
    setMenuItems(deleteFromItems(menuItems));
    setSelectedItem(null);
  };

  const resetForm = () => {
    setFormData({
      id: '',
      label: '',
      icon: '',
      path: '',
      permissions: [],
      roles: [],
      visible: true,
      order: 0,
      badge: null,
      parentId: null
    });
  };

  const editMenuItem = (item) => {
    setFormData({
      id: item.id,
      label: item.label,
      icon: item.icon || '',
      path: item.path || '',
      permissions: item.permissions || [],
      roles: item.roles || [],
      visible: item.visible !== false,
      order: item.order || 0,
      badge: item.badge || null,
      parentId: item.parentId || null
    });
    setSelectedItem(item);
    setIsEditing(true);
  };

  const toggleExpanded = (itemId) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemId)) {
        newSet.delete(itemId);
      } else {
        newSet.add(itemId);
      }
      return newSet;
    });
  };

  const filteredMenuItems = menuItems.filter(item => {
    const matchesSearch = item.label.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || (item.roles && item.roles.includes(filterRole));
    const matchesVisibility = showHidden || item.visible !== false;
    
    return matchesSearch && matchesRole && matchesVisibility;
  });

  const renderMenuItem = (item, level = 0) => {
    const isExpanded = expandedItems.has(item.id);
    const hasChildren = item.children && item.children.length > 0;
    const IconComponent = availableIcons.find(icon => icon.name === item.icon)?.component || Settings;
    
    return (
      <div key={item.id} className="w-full">
        <div
          className={`flex items-center gap-2 p-3 rounded-lg border ${
            selectedItem?.id === item.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
          } transition-colors`}
          style={{ marginLeft: `${level * 24}px` }}
        >
          {hasChildren && (
            <button
              onClick={() => toggleExpanded(item.id)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
            >
              {isExpanded ? (
                <ChevronDown className="w-4 h-4 text-gray-600" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-600" />
              )}
            </button>
          )}
          
          <GripVertical className="w-4 h-4 text-gray-400 cursor-move" />
          
          <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
            <IconComponent className="w-4 h-4 text-gray-600" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <span className="font-medium text-gray-900">{item.label}</span>
              {!item.visible && (
                <EyeOff className="w-3 h-3 text-gray-400" title="Hidden" />
              )}
              {item.badge && (
                <span className="text-xs px-2 py-1 bg-blue-100 text-blue-600 rounded-full">
                  {item.badge.type}
                </span>
              )}
            </div>
            {item.path && (
              <p className="text-xs text-gray-500">{item.path}</p>
            )}
          </div>
          
          <div className="flex items-center gap-1">
            {item.permissions && item.permissions.length > 0 && (
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Shield className="w-3 h-3" />
                <span>{item.permissions.length}</span>
              </div>
            )}
            
            <button
              onClick={() => editMenuItem(item)}
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              title="Edit"
            >
              <Edit3 className="w-4 h-4 text-gray-600" />
            </button>
            
            <button
              onClick={() => deleteMenuItem(item.id)}
              className="p-1 hover:bg-red-100 rounded transition-colors"
              title="Delete"
            >
              <Trash2 className="w-4 h-4 text-red-600" />
            </button>
          </div>
        </div>
        
        {hasChildren && isExpanded && (
          <div className="mt-1">
            {item.children.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Menu Configuration</h1>
        <p className="text-gray-600">Manage admin panel menu structure, permissions, and visibility</p>
      </div>

      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search menu items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Roles</option>
            {availableRoles.map(role => (
              <option key={role} value={role}>{role.replace('_', ' ').toUpperCase()}</option>
            ))}
          </select>
          
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showHidden}
              onChange={(e) => setShowHidden(e.target.checked)}
              className="rounded border-gray-300"
            />
            <span className="text-sm text-gray-700">Show Hidden</span>
          </label>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode(viewMode === 'tree' ? 'list' : 'tree')}
            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <Filter className="w-4 h-4" />
            {viewMode === 'tree' ? 'List View' : 'Tree View'}
          </button>
          
          <button
            onClick={loadMenuConfiguration}
            className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            title="Refresh"
          >
            <RefreshCw className="w-4 h-4 text-gray-600" />
          </button>
          
          <button
            onClick={() => {
              resetForm();
              setIsEditing(false);
              setSelectedItem(null);
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Menu Item
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">Menu Structure</h2>
            </div>
            
            <div className="p-4 max-h-96 overflow-y-auto">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
                </div>
              ) : error ? (
                <div className="text-center py-8">
                  <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
                  <p className="text-red-600">{error}</p>
                </div>
              ) : filteredMenuItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">No menu items found</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredMenuItems.map(item => renderMenuItem(item))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="font-semibold text-gray-900">
                {isEditing ? 'Edit Menu Item' : 'Add Menu Item'}
              </h2>
            </div>
            
            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Label
                </label>
                <input
                  type="text"
                  value={formData.label}
                  onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Icon
                </label>
                <select
                  value={formData.icon}
                  onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select Icon</option>
                  {availableIcons.map(icon => (
                    <option key={icon.name} value={icon.name}>
                      {icon.label}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Path
                </label>
                <input
                  type="text"
                  value={formData.path}
                  onChange={(e) => setFormData({ ...formData, path: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="/admin/example"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Permissions
                </label>
                <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-2">
                  {availablePermissions.map(permission => (
                    <label key={permission} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.permissions.includes(permission)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              permissions: [...formData.permissions, permission]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              permissions: formData.permissions.filter(p => p !== permission)
                            });
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">{permission}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Roles
                </label>
                <div className="space-y-2 max-h-32 overflow-y-auto border border-gray-200 rounded-lg p-2">
                  {availableRoles.map(role => (
                    <label key={role} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.roles.includes(role)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setFormData({
                              ...formData,
                              roles: [...formData.roles, role]
                            });
                          } else {
                            setFormData({
                              ...formData,
                              roles: formData.roles.filter(r => r !== role)
                            });
                          }
                        }}
                        className="rounded border-gray-300"
                      />
                      <span className="text-sm text-gray-700">{role.replace('_', ' ').toUpperCase()}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.visible}
                    onChange={(e) => setFormData({ ...formData, visible: e.target.checked })}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">Visible</span>
                </label>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Order
                </label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  min="0"
                />
              </div>
              
              <div className="flex gap-2 pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  {loading ? 'Saving...' : 'Save'}
                </button>
                
                <button
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedItem(null);
                    resetForm();
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuConfiguration;
