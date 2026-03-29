import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  Video,
  Pill,
  FlaskConical,
  Heart,
  FolderOpen,
  ChevronRight,
} from 'lucide-react';
import { defaultServicesMenu } from '../../data/defaultServicesMenu';

const iconMap = {
  stethoscope: Stethoscope,
  video: Video,
  pill: Pill,
  flask: FlaskConical,
  heart: Heart,
  folder: FolderOpen,
};

export default function ServiceMenu({ services, isOpen, onClose }) {
  // Hardcode services directly to ensure dropdown always works
  const menuData = [
    {
      id: 1,
      title: 'Specialist Doctor',
      slug: 'specialist-doctor',
      route_url: '/doctors',
      description: 'Book appointments with speci...',
      icon: 'stethoscope',
      bg_color_hex: '#f8fafc',
    },
    {
      id: 2,
      title: 'Video Consultation',
      slug: 'video-consultation',
      route_url: '/consult',
      description: 'Online video calls with doctors',
      icon: 'video',
      bg_color_hex: '#f8fafc',
    },
    {
      id: 3,
      title: 'Pharmacy',
      slug: 'pharmacy',
      route_url: '/pharmacy',
      description: 'Order medicines online',
      icon: 'pill',
      bg_color_hex: '#f8fafc',
    },
    {
      id: 4,
      title: 'Lab Tests',
      slug: 'lab-tests',
      route_url: '/lab-tests',
      description: 'Home collection & reports',
      icon: 'flask',
      bg_color_hex: '#f8fafc',
    },
    {
      id: 5,
      title: 'Health Records',
      slug: 'health-records',
      route_url: '/records',
      description: 'Your medical history',
      icon: 'folder',
      bg_color_hex: '#f8fafc',
    },
  ];
  
  // Debug: Log the menu data to verify it's loaded
  console.log('ServiceMenu - hardcoded menuData length:', menuData.length);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[min(100vw-2rem,320px)]"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
            <div className="border-b border-gray-100 bg-gray-50 px-4 py-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-green-600">OUR SERVICES</h3>
            </div>
            {/* Temporary test element */}
            <div className="p-4 bg-red-100 text-red-800">
              TEST: Dropdown is open! Services count: {menuData.length}
            </div>
            <div className="max-h-[min(60vh,360px)] overflow-y-auto p-2">
              {menuData.map((service) => {
                console.log('Rendering service:', service.title);
                const key = (service.icon || 'heart').toLowerCase();
                const Icon = iconMap[key] || Heart;
                const bgColor = service.bg_color_hex || '#f8fafc';
                return (
                  <Link
                    key={service.id}
                    to={service.route_url || '/services'}
                    className="flex items-center gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-gray-50 group"
                    onClick={() => onClose()}
                  >
                    <span
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg shadow-sm group-hover:shadow-md transition-shadow"
                      style={{ backgroundColor: bgColor }}
                    >
                      <Icon className="h-5 w-5 text-gray-700" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block font-semibold text-gray-900 text-sm">{service.title}</span>
                      <span className="block text-xs text-gray-500 mt-0.5">{service.description}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 flex-shrink-0 text-gray-400 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                );
              })}
            </div>
            <div className="border-t border-gray-100 px-4 py-3">
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition-colors hover:text-blue-700"
                onClick={() => onClose()}
              >
                View all services
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
