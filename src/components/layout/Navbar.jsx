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
      <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#165028] to-[#0f3d1c] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-3">
            {/* Contact Information */}
            <div className="hidden md:flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                <Phone className="w-4 h-4" />
                <span>+1 (234) 567-890</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                <Mail className="w-4 h-4" />
                <span>info@medigo.com</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-sm">
                <MapPin className="w-4 h-4" />
                <span>123 Medical St, Health City</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="fixed top-14 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200/60 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0 group">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#165028] to-[#0f3d1c] flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <span className="font-bold text-xl text-[#165028] hidden sm:block group-hover:text-[#0f3d1c] transition-colors">
                Medigo
              </span>
            </Link>

          {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-1">
              <Link
                to="/"
                className="px-4 py-2 rounded-full text-gray-700 hover:text-[#165028] hover:bg-[#f0fdf2] font-medium transition-all duration-300 hover:scale-105"
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
                  className="flex items-center gap-1 px-4 py-2 rounded-full text-gray-700 hover:text-[#165028] hover:bg-[#f0fdf2] font-medium transition-all duration-300 hover:scale-105"
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
                className="px-4 py-2 rounded-full text-gray-700 hover:text-[#165028] hover:bg-[#f0fdf2] font-medium transition-all duration-300 hover:scale-105"
              >
                About Us
              </Link>
              <Link
                to="/careers"
                className="px-4 py-2 rounded-full text-gray-700 hover:text-[#165028] hover:bg-[#f0fdf2] font-medium transition-all duration-300 hover:scale-105"
              >
                Careers
              </Link>
              <Link
                to="/contact"
                className="px-4 py-2 rounded-full text-gray-700 hover:text-[#165028] hover:bg-[#f0fdf2] font-medium transition-all duration-300 hover:scale-105"
              >
                Contact
              </Link>
              <Link
                to="/blog"
                className="px-4 py-2 rounded-full text-gray-700 hover:text-[#165028] hover:bg-[#f0fdf2] font-medium transition-all duration-300 hover:scale-105"
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
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
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
                className="relative p-2 rounded-full text-gray-600 hover:bg-[#f0fdf2] hover:text-[#165028] transition-all duration-300 hover:scale-110"
                aria-label="Cart"
              >
                <ShoppingCart className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-5 h-5 rounded-full bg-[#5DBB63] text-white text-xs font-bold flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>
              <Link
                to="/auth"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-[#165028] to-[#0f3d1c] text-white hover:from-[#0f3d1c] hover:to-[#0a2e14] font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
              >
                <User className="w-4 h-4" />
                Signup/Login
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-all duration-300 hover:scale-110"
                aria-label="Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

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
                  className="p-2 rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-110"
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
                    className="block px-4 py-3 rounded-full text-gray-700 hover:bg-[#f0fdf2] font-medium transition-all duration-300 hover:scale-105"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/emergency"
                  onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold transition-all duration-300 hover:scale-105 shadow-md"
                >
                  Emergency Services
                </Link>
                <div className="pt-4 border-t mt-4">
                  <Link
                    to="/auth"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-full bg-gradient-to-r from-[#165028] to-[#0f3d1c] text-white font-medium transition-all duration-300 hover:scale-105 shadow-md"
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
    </>
  );
}
