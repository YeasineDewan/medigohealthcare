import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Ambulance, PhoneCall, Droplet, AlertCircle, ChevronRight } from 'lucide-react';

const iconMap = {
  ambulance: Ambulance,
  'phone-call': PhoneCall,
  droplet: Droplet,
  alert: AlertCircle,
};

export default function EmergencyMenu({ emergencyServices, isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 top-full mt-1 pt-2"
        >
          <div
            className="min-w-[280px] rounded-xl bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-red-100 overflow-hidden"
            onMouseLeave={onClose}
          >
            <div className="p-4 bg-red-50/30 border-b border-red-100">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-red-600 mb-1">
                Emergency Services
              </h3>
              <p className="text-xs text-gray-600">24/7 available support</p>
            </div>
            <div className="p-2">
              {emergencyServices.map((service) => {
                const Icon = iconMap[service.icon?.toLowerCase()] || AlertCircle;
                const bgColor = service.bg_color_hex || '#FEE2E2';
                return (
                  <Link
                    key={service.id}
                    to="/emergency"
                    className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-red-50/50 transition-colors duration-150 group"
                    onClick={onClose}
                  >
                    <span
                      className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: bgColor }}
                    >
                      <Icon className="w-5 h-5 text-red-600" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <span className="font-medium text-gray-900 block">
                        {service.title}
                      </span>
                      <span className="text-xs text-red-500 block">
                        {service.description}
                      </span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-red-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </Link>
                );
              })}
            </div>
            <div className="border-t border-red-100 px-4 py-3 bg-red-50/30">
              <Link
                to="/emergency"
                className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
                onClick={onClose}
              >
                <AlertCircle className="w-4 h-4" />
                Call Emergency: 999
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
