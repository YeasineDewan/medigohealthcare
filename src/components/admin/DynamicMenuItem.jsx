import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  ChevronDown, 
  CheckCircle, 
  Star, 
  AlertCircle,
  Zap,
  Clock,
  TrendingUp,
  Calculator,
  Users,
  UserPlus,
  FileText,
  Calendar,
  Stethoscope,
  Heart,
  Brain,
  Bone,
  Eye,
  Baby,
  Smile,
  Hospital,
  Pill,
  Package,
  ShoppingCart,
  FlaskConical,
  FolderOpen,
  Ambulance,
  Bell,
  Image,
  CreditCard,
  DollarSign,
  FileSpreadsheet,
  BarChart3,
  Settings,
  Shield,
  Archive,
  Plus,
  AlertTriangle,
  Phone,
  Mail,
  MessageSquare,
  Target,
  Tag,
  Percent,
  Gift,
  Receipt,
  Wind,
  Droplet,
  TestTube,
  Syringe,
  Bandage,
  Building,
  Microscope,
  Activity,
  FileCheck,
  MessageCircle,
  List,
  File,
  Minimize2,
  Expand,
  RefreshCw,
  X,
  LayoutDashboard
} from 'lucide-react';

const DynamicMenuItem = ({ 
  item, 
  level = 0, 
  isNested = false,
  expandedItems = new Set(),
  onToggleExpand,
  searchTerm = '',
  userRole = null,
  permissions = [],
  showBadges = true,
  animationEnabled = true
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const hasChildren = item.children && item.children.length > 0;
  const isActive = item.path && location.pathname === item.path;
  
  // Check if any child is active
  const isChildActive = useMemo(() => {
    if (!hasChildren) return false;
    
    const checkChildActive = (children) => {
      return children.some(child => {
        if (child.path && location.pathname === child.path) return true;
        if (child.children && child.children.length > 0) {
          return checkChildActive(child.children);
        }
        return false;
      });
    };
    
    return checkChildActive(item.children);
  }, [item.children, location.pathname]);

  // Auto-expand if child is active or if in expandedItems
  // This ensures menu stays open when navigating between child pages
  useEffect(() => {
    // Check if current path starts with any child path (for nested routes)
    const checkPathMatch = (menuItem) => {
      if (menuItem.path && location.pathname.startsWith(menuItem.path)) return true;
      if (menuItem.children) {
        return menuItem.children.some(child => checkPathMatch(child));
      }
      return false;
    };
    
    const shouldBeExpanded = isChildActive || checkPathMatch(item) || expandedItems.has(item.id);
    if (shouldBeExpanded !== isExpanded) {
      setIsExpanded(shouldBeExpanded);
    }
  }, [isChildActive, expandedItems, item, location.pathname]);

  // Handle click events
  const handleClick = () => {
    if (hasChildren) {
      const newExpanded = !isExpanded;
      setIsExpanded(newExpanded);
      onToggleExpand?.(item.id, newExpanded);
    } else if (item.path) {
      navigate(item.path);
    }
  };

  // Get icon component
  const IconComponent = useMemo(() => {
    if (!item.icon) return Settings;
    
    // Map icon names to actual icon components
    const iconMap = {
      'LayoutDashboard': LayoutDashboard,
      'Calculator': Calculator,
      'Users': Users,
      'UserPlus': UserPlus,
      'FileText': FileText,
      'Calendar': Calendar,
      'Stethoscope': Stethoscope,
      'Heart': Heart,
      'Brain': Brain,
      'Bone': Bone,
      'Eye': Eye,
      'Baby': Baby,
      'Smile': Smile,
      'Hospital': Hospital,
      'Pill': Pill,
      'Package': Package,
      'ShoppingCart': ShoppingCart,
      'FlaskConical': FlaskConical,
      'FolderOpen': FolderOpen,
      'Ambulance': Ambulance,
      'Bell': Bell,
      'Image': Image,
      'CreditCard': CreditCard,
      'DollarSign': DollarSign,
      'FileSpreadsheet': FileSpreadsheet,
      'BarChart3': BarChart3,
      'TrendingUp': TrendingUp,
      'Clock': Clock,
      'Settings': Settings,
      'Shield': Shield,
      'Archive': Archive,
      'Plus': Plus,
      'CheckCircle': CheckCircle,
      'AlertTriangle': AlertTriangle,
      'Phone': Phone,
      'Mail': Mail,
      'MessageSquare': MessageSquare,
      'Target': Target,
      'Tag': Tag,
      'Percent': Percent,
      'Gift': Gift,
      'Receipt': Receipt,
      'Wind': Wind,
      'Droplet': Droplet,
      'TestTube': TestTube,
      'Syringe': Syringe,
      'Bandage': Bandage,
      'Building': Building,
      'Microscope': Microscope,
      'Activity': Activity,
      'FileCheck': FileCheck,
      'MessageCircle': MessageCircle,
      'List': List,
      'File': File,
      'Minimize2': Minimize2,
      'Expand': Expand,
      'RefreshCw': RefreshCw,
      'X': X,
      'ChevronRight': ChevronRight,
      'ChevronDown': ChevronDown,
      'Star': Star,
      'AlertCircle': AlertCircle,
      'Zap': Zap
    };

    return iconMap[item.icon] || Settings;
  }, [item.icon]);

  // Get badge component
  const BadgeComponent = useMemo(() => {
    if (!item.badge || !showBadges) return null;
    
    switch (item.badge.type) {
      case 'new':
        return <Star className="w-3 h-3 text-yellow-400 fill-current" />;
      case 'alert':
        return <AlertCircle className="w-3 h-3 text-red-400" />;
      case 'trending':
        return <TrendingUp className="w-3 h-3 text-green-400" />;
      case 'pending':
        return <Clock className="w-3 h-3 text-orange-400" />;
      case 'active':
        return <Zap className="w-3 h-3 text-blue-400" />;
      default:
        return <span className="text-xs px-1.5 py-0.5 bg-red-500 text-white rounded-full">
          {item.badge.count || item.badge.text}
        </span>;
    }
  }, [item.badge, showBadges]);

  // Calculate styles based on state
  const getBackgroundStyles = () => {
    if (isActive) {
      return 'bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] shadow-lg';
    }
    if (isChildActive) {
      return 'bg-gradient-to-r from-[#2E7D32] to-[#388E3C]';
    }
    if (isNested) {
      return isHovered ? 'bg-white/8' : 'bg-transparent';
    }
    return isHovered ? 'bg-white/10' : 'bg-transparent';
  };

  const getTextStyles = () => {
    if (isActive) return 'text-white font-semibold';
    if (isChildActive) return 'text-white/90 font-medium';
    return 'text-white/80 font-medium';
  };

  const getPaddingStyles = () => {
    const basePadding = 'px-4 py-3';
    const indentPadding = level === 0 ? '' : level === 1 ? 'pl-8' : level === 2 ? 'pl-16' : `pl-${8 + (level - 2) * 4}`;
    return `${basePadding} ${indentPadding}`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
  };

  const childrenVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: 'auto', 
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeInOut' }
    },
    exit: { 
      height: 0, 
      opacity: 0,
      transition: { duration: 0.2, ease: 'easeInOut' }
    }
  };

  // Highlight search term
  const highlightText = (text) => {
    if (!searchTerm) return text;
    
    const parts = text.split(new RegExp(`(${searchTerm})`, 'gi'));
    return parts.map((part, index) => 
      part.toLowerCase() === searchTerm.toLowerCase() ? (
        <span key={index} className="bg-yellow-400/30 text-yellow-100 px-0.5 rounded">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="w-full">
      <motion.div
        variants={animationEnabled ? containerVariants : undefined}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ delay: level * 0.05 }}
      >
        <button
          onClick={handleClick}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={`w-full flex items-center gap-3 rounded-xl transition-all duration-200 ${getBackgroundStyles()} ${getTextStyles()} ${getPaddingStyles()}`}
          style={{
            transform: isHovered ? 'translateX(2px)' : 'translateX(0)',
          }}
        >
          {/* Icon */}
          <div className={`flex-shrink-0 ${level > 0 ? 'ml-2' : ''}`}>
            <IconComponent 
              className={`w-5 h-5 transition-transform duration-200 ${
                isHovered ? 'scale-110' : 'scale-100'
              }`} 
            />
          </div>

          {/* Label */}
          <span className="flex-1 text-left">
            {highlightText(item.label)}
          </span>

          {/* Badge */}
          {BadgeComponent && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 + level * 0.05 }}
            >
              {BadgeComponent}
            </motion.div>
          )}

          {/* Expand/Collapse Icon */}
          {hasChildren && (
            <motion.div
              animate={{ rotate: isExpanded ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0"
            >
              <ChevronRight className="w-4 h-4" />
            </motion.div>
          )}

          {/* Active Indicator */}
          {isActive && !hasChildren && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 500 }}
            >
              <CheckCircle className="w-4 h-4 ml-auto" />
            </motion.div>
          )}
        </button>
      </motion.div>

      {/* Children */}
      <AnimatePresence>
        {hasChildren && isExpanded && (
          <motion.div
            variants={animationEnabled ? childrenVariants : undefined}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="overflow-hidden"
          >
            <div className="mt-1 space-y-1">
              {item.children.map((child, index) => (
                <DynamicMenuItem
                  key={child.id || index}
                  item={child}
                  level={level + 1}
                  isNested={true}
                  expandedItems={expandedItems}
                  onToggleExpand={onToggleExpand}
                  searchTerm={searchTerm}
                  userRole={userRole}
                  permissions={permissions}
                  showBadges={showBadges}
                  animationEnabled={animationEnabled}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DynamicMenuItem;
