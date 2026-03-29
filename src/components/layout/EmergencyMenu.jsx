import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Ambulance,
  PhoneCall,
  Droplet,
  AlertCircle,
  ChevronRight,
  Truck,
  Shield,
  Scissors,
  Heart,
  Activity,
} from 'lucide-react';

const iconMap = {
  ambulance: Ambulance,
  'phone-call': PhoneCall,
  phone: PhoneCall,
  droplet: Droplet,
  alert: AlertCircle,
  truck: Truck,
  shield: Shield,
  scissors: Scissors,
  heart: Heart,
  activity: Activity,
};

export default function EmergencyMenu({ emergencyServices, isOpen, onClose }) {
  const services =
    Array.isArray(emergencyServices) && emergencyServices.length > 0
      ? emergencyServices
      : [
          { id: 1, title: 'Ambulance Request', description: 'Live Tracking', icon: 'ambulance', bg_color_hex: '#FEE2E2' },
          { id: 2, title: 'Emergency Doctor', description: '24/7 Available', icon: 'phone-call', bg_color_hex: '#FEE2E2' },
          { id: 3, title: 'Blood Bank', description: 'Find Donors', icon: 'droplet', bg_color_hex: '#FEE2E2' },
          { id: 4, title: 'Emergency Room', description: 'Immediate Care', icon: 'alert', bg_color_hex: '#FEE2E2' },
          { id: 5, title: 'Critical Care', description: 'ICU Services', icon: 'alert', bg_color_hex: '#FEE2E2' },
        ];

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
          <div className="overflow-hidden rounded-2xl border border-red-100/80 bg-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.18)] ring-1 ring-black/5">
            <div className="border-b border-red-100 bg-gradient-to-r from-red-50 to-rose-50/80 px-4 py-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-red-700">Emergency Services</h3>
              <p className="mt-0.5 text-xs text-gray-600">24/7 support — tap to open emergency center</p>
            </div>
            <div className="max-h-[min(60vh,360px)] overflow-y-auto p-2">
              {services.map((service) => {
                const key = (service.icon || 'alert').toLowerCase();
                const Icon = iconMap[key] || AlertCircle;
                const bgColor = service.bg_color_hex || '#FEE2E2';
                return (
                  <Link
                    key={service.id}
                    to="/emergency"
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-red-50/80 group"
                    onClick={() => onClose()}
                  >
                    <span
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full shadow-inner"
                      style={{ backgroundColor: bgColor }}
                    >
                      <Icon className="h-5 w-5 text-red-600" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <span className="block font-medium text-gray-900">{service.title}</span>
                      <span className="block text-xs text-red-600/90">{service.description}</span>
                    </div>
                    <ChevronRight className="h-4 w-4 flex-shrink-0 text-red-300 opacity-0 transition-opacity group-hover:opacity-100" />
                  </Link>
                );
              })}
            </div>
            <div className="border-t border-red-100 bg-red-50/50 px-4 py-3">
              <Link
                to="/emergency"
                className="inline-flex items-center gap-2 text-sm font-bold text-red-700 transition-colors hover:text-red-800"
                onClick={() => onClose()}
              >
                <AlertCircle className="h-4 w-4" />
                Emergency center & hotline
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
