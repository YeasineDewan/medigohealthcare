import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  Video,
  Pill,
  FlaskConical,
  FolderOpen,
  Heart,
  Activity,
  Syringe,
  ChevronRight,
} from 'lucide-react';

const iconMap = {
  stethoscope: Stethoscope,
  video: Video,
  pill: Pill,
  flask: FlaskConical,
  folder: FolderOpen,
  heart: Heart,
  activity: Activity,
  syringe: Syringe,
};

export default function ServiceMenu({ services, isOpen, onClose }) {

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2 }}
          className="absolute left-0 top-full mt-1 pt-2 -translate-x-4"
        >
          <div
            className="min-w-[320px] rounded-xl bg-white shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden"
            onMouseLeave={onClose}
          >
            <div className="p-4">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-[#165028]/70 mb-3 px-1">
                Our Services
              </h3>
              <div className="grid grid-cols-1 gap-0.5">
                {services.map((service) => {
                  const Icon = iconMap[service.icon?.toLowerCase()] || Stethoscope;
                  return (
                    <Link
                      key={service.id}
                      to={service.route_url || `/${service.slug}`}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-800 hover:bg-[#f0fdf2] transition-colors duration-150 group"
                      onClick={onClose}
                    >
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-[#f0fdf2] flex items-center justify-center group-hover:bg-[#dcfce7] transition-colors">
                        <Icon className="w-5 h-5 text-[#5DBB63]" />
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="font-medium text-[#111827] block truncate">
                          {service.title}
                        </span>
                        {service.description && (
                          <span className="text-xs text-gray-500 block truncate">
                            {service.description}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
            <div className="border-t border-gray-100 px-4 py-3 bg-gray-50/50">
              <Link
                to="/services"
                className="text-sm font-medium text-[#5DBB63] hover:text-[#165028] transition-colors flex items-center gap-1"
                onClick={onClose}
              >
                View all services
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
