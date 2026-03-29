import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { dropdownLinks } from '../../data/healthCardsPageContent';

export default function HealthCardMenu({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[min(100vw-2rem,300px)]"
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="overflow-hidden rounded-2xl border border-gray-200/90 bg-white shadow-[0_24px_48px_-12px_rgba(0,0,0,0.16)] ring-1 ring-black/5">
            <div className="px-4 py-3 bg-[#0d9488]/10 border-b border-gray-100">
              <p className="text-xs font-semibold uppercase tracking-wide text-[#0f766e]">Health cards</p>
              <p className="text-[11px] text-gray-600 mt-0.5">Choose a program to view details</p>
            </div>
            <nav className="py-1">
              {dropdownLinks.map((item, idx) => (
                <Link
                  key={item.hash}
                  to={`/health-cards${item.hash}`}
                  className="flex items-center justify-between px-4 py-2.5 text-sm font-medium text-gray-800 hover:bg-[#f0fdfa] transition-colors border-b border-gray-100 last:border-0"
                  onClick={() => onClose()}
                >
                  <span className="uppercase tracking-wide text-[13px]">{item.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#0d9488]/70" />
                </Link>
              ))}
            </nav>
            <div className="px-4 py-3 bg-gray-50/90 border-t border-gray-100">
              <Link
                to="/health-cards"
                className="text-sm font-semibold text-[#0d9488] hover:text-[#115e59] inline-flex items-center gap-1"
                onClick={() => onClose()}
              >
                View full health cards page
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
