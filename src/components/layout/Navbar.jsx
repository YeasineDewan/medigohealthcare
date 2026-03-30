import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ShoppingCart, User, Stethoscope, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import ServiceMenu from './ServiceMenu';
import EmergencyMenu from './EmergencyMenu';
import { useServicesMenu, useEmergencyMenu } from '../../hooks/useMenus';
import { useCartStore } from '../../store/cartStore';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [serviceMenuOpen, setServiceMenuOpen] = useState(false);
  const [emergencyMenuOpen, setEmergencyMenuOpen] = useState(false);
  const { services } = useServicesMenu();
  const { emergencyServices } = useEmergencyMenu();
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const navigate = useNavigate();
  
  const serviceMenuRef = useRef(null);
  const emergencyMenuRef = useRef(null);
  const serviceButtonRef = useRef(null);
  const emergencyButtonRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Close service menu if clicking outside
      if (serviceMenuOpen && 
          serviceMenuRef.current && 
          !serviceMenuRef.current.contains(event.target) &&
          serviceButtonRef.current &&
          !serviceButtonRef.current.contains(event.target)) {
        setServiceMenuOpen(false);
      }
      
      // Close emergency menu if clicking outside
      if (emergencyMenuOpen && 
          emergencyMenuRef.current && 
          !emergencyMenuRef.current.contains(event.target) &&
          emergencyButtonRef.current &&
          !emergencyButtonRef.current.contains(event.target)) {
        setEmergencyMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [serviceMenuOpen, emergencyMenuOpen]);

  // Close dropdowns on escape key
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setServiceMenuOpen(false);
        setEmergencyMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, []);

  return (
    <>
      {/* Top Bar - Sub-header */}
      <div className="bg-[#165028] text-white py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Contact Information */}
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (234) 567-890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@medigo.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Medical St, Health City</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#5DBB63] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#5DBB63] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#5DBB63] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-white hover:text-[#5DBB63] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="fixed top-8 left-0 right-0 z-50 glass border-b border-gray-200/80">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-10 h-10 rounded-xl bg-[#165028] flex items-center justify-center">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-[#165028] hidden sm:block">
              Medigo
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            <Link
              to="/"
              className="px-4 py-2 rounded-lg text-gray-700 hover:text-[#165028] hover:bg-[#f0fdf2] font-medium transition-colors"
            >
              Home
            </Link>
            <div className="relative">
              <button
                ref={serviceButtonRef}
                onMouseEnter={() => {
                  setEmergencyMenuOpen(false);
                  setServiceMenuOpen(true);
                }}
                onClick={() => {
                  setEmergencyMenuOpen(false);
                  setServiceMenuOpen(!serviceMenuOpen);
                }}
                className="flex items-center gap-1 px-4 py-2 rounded-lg text-gray-700 hover:text-[#165028] hover:bg-[#f0fdf2] font-medium transition-colors"
              >
                Services
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${serviceMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <div ref={serviceMenuRef}>
                <ServiceMenu
                  services={services}
                  isOpen={serviceMenuOpen}
                  onClose={() => setServiceMenuOpen(false)}
                />
              </div>
            </div>
            <Link
              to="/about"
              className="px-4 py-2 rounded-lg text-gray-700 hover:text-[#165028] hover:bg-[#f0fdf2] font-medium transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/careers"
              className="px-4 py-2 rounded-lg text-gray-700 hover:text-[#165028] hover:bg-[#f0fdf2] font-medium transition-colors"
            >
              Careers
            </Link>
            <Link
              to="/contact"
              className="px-4 py-2 rounded-lg text-gray-700 hover:text-[#165028] hover:bg-[#f0fdf2] font-medium transition-colors"
            >
              Contact
            </Link>
            <Link
              to="/blog"
              className="px-4 py-2 rounded-lg text-gray-700 hover:text-[#165028] hover:bg-[#f0fdf2] font-medium transition-colors"
            >
              Blog
            </Link>
            <div className="relative ml-2">
              <button
                ref={emergencyButtonRef}
                onMouseEnter={() => {
                  setServiceMenuOpen(false);
                  setEmergencyMenuOpen(true);
                }}
                onClick={() => {
                  setServiceMenuOpen(false);
                  setEmergencyMenuOpen(!emergencyMenuOpen);
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 font-semibold transition-colors border border-red-100"
              >
                Emergency
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${emergencyMenuOpen ? 'rotate-180' : ''}`}
                />
              </button>
              <div ref={emergencyMenuRef}>
                <EmergencyMenu
                  emergencyServices={emergencyServices}
                  isOpen={emergencyMenuOpen}
                  onClose={() => setEmergencyMenuOpen(false)}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate('/cart')}
              className="relative p-2 rounded-lg text-gray-600 hover:bg-[#f0fdf2] hover:text-[#165028] transition-colors"
              aria-label="Cart"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#5DBB63] text-white text-xs font-bold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>
            <Link
              to="/auth"
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg bg-[#165028] text-white hover:bg-[#0f3d1c] font-medium transition-colors"
            >
              <User className="w-4 h-4" />
              Signup/Login
            </Link>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
              aria-label="Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <div
              className="absolute inset-0 bg-black/30"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-[280px] bg-white shadow-xl"
            >
              <div className="p-4 flex justify-between items-center border-b">
                <span className="font-bold text-[#165028]">Menu</span>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-4 space-y-1 overflow-y-auto">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 rounded-lg text-gray-700 hover:bg-[#f0fdf2] font-medium"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/emergency"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-lg bg-red-50 text-red-600 font-semibold"
                >
                  Emergency Services
                </Link>
                <div className="pt-4 border-t mt-4">
                  <Link
                    to="/auth"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-lg bg-[#165028] text-white font-medium"
                  >
                    <User className="w-4 h-4" />
                    Signup/Login
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}
