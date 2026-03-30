import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ShoppingCart, User, Stethoscope, Phone, Mail, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import ServiceMenu from './ServiceMenu';
import EmergencyMenu from './EmergencyMenu';
import { useServicesMenu, useEmergencyMenu } from '../../hooks/useMenus';
import { useCartStore } from '../../store/cartStore';
import { noticeService } from '../../services/noticeService';

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
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hoveredIcon, setHoveredIcon] = useState(null);
  const { services } = useServicesMenu();
  const { emergencyServices } = useEmergencyMenu();
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const navigate = useNavigate();
  
  const serviceMenuRef = useRef(null);
  const emergencyMenuRef = useRef(null);
  const serviceButtonRef = useRef(null);
  const emergencyButtonRef = useRef(null);

  // Fetch notices from admin panel
  useEffect(() => {
    const fetchNotices = async () => {
      try {
        console.log('Fetching notices...');
        const fetchedNotices = await noticeService.getActiveNotices();
        console.log('Fetched notices:', fetchedNotices);
        // Ensure notices is always an array
        const noticesArray = Array.isArray(fetchedNotices) ? fetchedNotices : [];
        
        // If no notices returned, use fallback data
        if (noticesArray.length === 0) {
          console.log('No notices returned, using fallback data');
          const fallbackNotices = [
            {
              id: 1,
              text: "🎉 Special Offer: 20% off on all health checkups this month!",
              type: "offer",
              priority: "high",
              isActive: true,
              startDate: "2024-01-01",
              endDate: "2024-12-31"
            },
            {
              id: 2,
              text: "📢 New: Online doctor consultations now available 24/7",
              type: "notice",
              priority: "medium",
              isActive: true,
              startDate: "2024-01-01",
              endDate: "2024-12-31"
            },
            {
              id: 3,
              text: "🏥 Health Card members get exclusive discounts on lab tests",
              type: "offer",
              priority: "medium",
              isActive: true,
              startDate: "2024-01-01",
              endDate: "2024-12-31"
            },
            {
              id: 4,
              text: "💊 Free medicine delivery for orders above 1000 BDT",
              type: "notice",
              priority: "low",
              isActive: true,
              startDate: "2024-01-01",
              endDate: "2024-12-31"
            }
          ];
          setNotices(fallbackNotices);
        } else {
          setNotices(noticesArray);
        }
      } catch (error) {
        console.error('Failed to fetch notices:', error);
        // Set fallback notices on error
        const fallbackNotices = [
          {
            id: 1,
            text: "🎉 Special Offer: 20% off on all health checkups this month!",
            type: "offer",
            priority: "high",
            isActive: true,
            startDate: "2024-01-01",
            endDate: "2024-12-31"
          },
          {
            id: 2,
            text: "📢 New: Online doctor consultations now available 24/7",
            type: "notice",
            priority: "medium",
            isActive: true,
            startDate: "2024-01-01",
            endDate: "2024-12-31"
          }
        ];
        setNotices(fallbackNotices);
      } finally {
        setLoading(false);
      }
    };

    fetchNotices();
    
    // Refresh notices every 5 minutes
    const interval = setInterval(fetchNotices, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

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
          <div className="flex items-center justify-between py-2">
            {/* Left Side - Interactive Icons */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  onMouseEnter={() => setHoveredIcon('phone')}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:scale-110 relative overflow-hidden group"
                  aria-label="Phone"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Phone className="w-4 h-4 relative z-10" />
                </button>
                <AnimatePresence>
                  {hoveredIcon === 'phone' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-10 left-0 bg-white text-gray-800 rounded-lg shadow-lg p-3 whitespace-nowrap z-50 border border-blue-200"
                    >
                      <div className="font-semibold text-blue-600">Call Us</div>
                      <div className="text-sm">+1 (234) 567-890</div>
                      <div className="text-xs text-gray-500">24/7 Available</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative">
                <button
                  onMouseEnter={() => setHoveredIcon('email')}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:scale-110 relative overflow-hidden group"
                  aria-label="Email"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <Mail className="w-4 h-4 relative z-10" />
                </button>
                <AnimatePresence>
                  {hoveredIcon === 'email' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-10 left-0 bg-white text-gray-800 rounded-lg shadow-lg p-3 whitespace-nowrap z-50 border border-green-200"
                    >
                      <div className="font-semibold text-green-600">Email Us</div>
                      <div className="text-sm">info@medigo.com</div>
                      <div className="text-xs text-gray-500">Quick Response</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="relative">
                <button
                  onMouseEnter={() => setHoveredIcon('address')}
                  onMouseLeave={() => setHoveredIcon(null)}
                  className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/30 hover:shadow-lg hover:shadow-white/20 transition-all duration-300 hover:scale-110 relative overflow-hidden group"
                  aria-label="Address"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <MapPin className="w-4 h-4 relative z-10" />
                </button>
                <AnimatePresence>
                  {hoveredIcon === 'address' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-10 left-0 bg-white text-gray-800 rounded-lg shadow-lg p-3 whitespace-nowrap z-50 border border-purple-200"
                    >
                      <div className="font-semibold text-purple-600">Visit Us</div>
                      <div className="text-sm">123 Medical St</div>
                      <div className="text-xs text-gray-500">Health City, HC 12345</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Middle Section - Auto-sliding Notices */}
            <div className="flex-1 mx-6 overflow-hidden">
              <div className="relative h-5 flex items-center">
                {loading ? (
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span className="animate-pulse">⚡</span>
                    <span>Loading updates...</span>
                  </div>
                ) : Array.isArray(notices) && notices.length > 0 ? (
                  <div className="flex items-center animate-slide">
                    {notices.concat(notices).map((notice, index) => (
                      <div
                        key={`${notice.id}-${index}`}
                        className="flex items-center gap-2 whitespace-nowrap text-xs text-gray-300"
                      >
                        <span>
                          {notice.priority === 'high' && '🔥'}
                          {notice.priority === 'medium' && '⭐'}
                          {notice.priority === 'low' && '📌'}
                        </span>
                        <span>{notice.text}</span>
                        <span className="mx-4">•</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <span>ℹ️</span>
                    <span>Stay tuned for latest updates and offers</span>
                  </div>
                )}
              </div>
            </div>

            {/* Right Side - Social Media Icons */}
            <div className="flex items-center gap-3">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 hover:shadow-lg hover:shadow-blue-400/30 transition-all duration-300 hover:scale-110 relative overflow-hidden group"
                aria-label="Facebook"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-blue-600/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Facebook className="w-4 h-4 relative z-10" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 hover:shadow-lg hover:shadow-sky-400/30 transition-all duration-300 hover:scale-110 relative overflow-hidden group"
                aria-label="Twitter"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-sky-400/20 to-cyan-400/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Twitter className="w-4 h-4 relative z-10" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 hover:shadow-lg hover:shadow-blue-600/30 transition-all duration-300 hover:scale-110 relative overflow-hidden group"
                aria-label="LinkedIn"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-blue-700/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Linkedin className="w-4 h-4 relative z-10" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 hover:shadow-lg hover:shadow-pink-400/30 transition-all duration-300 hover:scale-110 relative overflow-hidden group"
                aria-label="Instagram"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <Instagram className="w-4 h-4 relative z-10" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="fixed top-10 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-b border-gray-200/60 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 flex-shrink-0 group">
              <img 
                src="/logo.png" 
                alt="Medigo Healthcare Logo" 
                className="w-14 h-14 group-hover:scale-105 transition-all duration-300 object-contain"
              />
              <div className="flex flex-col">
                <span className="font-bold text-2xl text-[#165028] hidden sm:block group-hover:text-[#0f3d1c] transition-colors">
                  Medigo
                </span>
                <span className="text-sm text-[#5DBB63] hidden sm:block group-hover:text-[#4a9a4f] transition-colors">
                  Healthcare
                </span>
              </div>
            </Link>

          {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-2">
              <Link
                to="/"
                className="px-5 py-3 rounded-full text-gray-700 hover:text-[#165028] hover:bg-[#f0fdf2] font-medium transition-all duration-300 hover:scale-105"
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
                  className="flex items-center gap-1 px-5 py-3 rounded-full text-gray-700 hover:text-[#165028] hover:bg-[#f0fdf2] font-medium transition-all duration-300 hover:scale-105"
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
                className="px-5 py-3 rounded-full text-gray-700 hover:text-[#165028] hover:bg-[#f0fdf2] font-medium transition-all duration-300 hover:scale-105"
              >
                About Us
              </Link>
              <Link
                to="/careers"
                className="px-5 py-3 rounded-full text-gray-700 hover:text-[#165028] hover:bg-[#f0fdf2] font-medium transition-all duration-300 hover:scale-105"
              >
                Careers
              </Link>
              <Link
                to="/contact"
                className="px-5 py-3 rounded-full text-gray-700 hover:text-[#165028] hover:bg-[#f0fdf2] font-medium transition-all duration-300 hover:scale-105"
              >
                Contact
              </Link>
              <Link
                to="/blog"
                className="px-5 py-3 rounded-full text-gray-700 hover:text-[#165028] hover:bg-[#f0fdf2] font-medium transition-all duration-300 hover:scale-105"
              >
                Blog
              </Link>
              <div className="relative ml-3">
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
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
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
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate('/cart')}
                className="relative p-3 rounded-full text-gray-600 hover:bg-[#f0fdf2] hover:text-[#165028] transition-all duration-300 hover:scale-110"
                aria-label="Cart"
              >
                <ShoppingCart className="w-6 h-6" />
                {cartCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-6 h-6 rounded-full bg-[#5DBB63] text-white text-xs font-bold flex items-center justify-center shadow-md">
                    {cartCount}
                  </span>
                )}
              </button>
              <Link
                to="/auth"
                className="hidden sm:flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-[#165028] to-[#0f3d1c] text-white hover:from-[#0f3d1c] hover:to-[#0a2e14] font-medium transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg"
              >
                <User className="w-5 h-5" />
                Signup/Login
              </Link>
              <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden p-3 rounded-full text-gray-600 hover:bg-gray-100 transition-all duration-300 hover:scale-110"
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
