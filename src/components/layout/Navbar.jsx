import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ShoppingCart, User } from 'lucide-react';
import ServiceMenu from './ServiceMenu';
import EmergencyMenu from './EmergencyMenu';
import HealthCardMenu from './HealthCardMenu';
import { useServicesMenu, useEmergencyMenu } from '../../hooks/useMenus';
import { useHeaderDropdowns } from '../../hooks/useHeaderDropdowns';
import { useCartStore } from '../../store/cartStore';
import SubHeader from './SubHeader';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'About Us', href: '/about' },
  { label: 'Careers', href: '/careers' },
  { label: 'Contact', href: '/contact' },
  { label: 'Blog', href: '/blog' },
];

const linkClass =
  'rounded-xl px-3.5 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-[#f0fdf2] hover:text-[#165028] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5DBB63]/40 focus-visible:ring-offset-2';

const btnDropdownClass = (open) =>
  [
    'inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5DBB63]/40 focus-visible:ring-offset-2',
    open ? 'bg-[#f0fdf2] text-[#165028] shadow-inner' : 'text-gray-800 hover:bg-[#f0fdf2] hover:text-[#165028]',
  ].join(' ');

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openMenu, scheduleClose, cancelClose, closeAll, toggleMenu, isOpen } = useHeaderDropdowns();


  const { services } = useServicesMenu();
  const { emergencyServices } = useEmergencyMenu();
  const items = useCartStore((s) => s.items);
  const cartCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const navigate = useNavigate();

  const servicesClusterRef = useRef(null);
  const healthClusterRef = useRef(null);
  const emergencyClusterRef = useRef(null);

  // One mousedown handler: close if click outside all three clusters
  useEffect(() => {
    const onDocMouseDown = (event) => {
      const t = event.target;
      const inside =
        servicesClusterRef.current?.contains(t) ||
        healthClusterRef.current?.contains(t) ||
        emergencyClusterRef.current?.contains(t);
      if (!inside) closeAll();
    };
    document.addEventListener('mousedown', onDocMouseDown);
    return () => document.removeEventListener('mousedown', onDocMouseDown);
  }, [closeAll]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') closeAll();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeAll]);

  useEffect(() => {
    if (mobileOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [mobileOpen]);

  return (
    <>
      <SubHeader />

      <header className="sticky top-0 left-0 right-0 z-50 border-b border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/90">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"
          role="navigation"
          aria-label="Main"
        >
          <div className="flex h-[4.25rem] flex-shrink-0 items-center">
            <Link to="/" className="group flex items-center gap-3 rounded-xl py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5DBB63]/40 focus-visible:ring-offset-2">
              <img
                src="/assets/logo.png"
                alt="Medigo Healthcare"
                className="h-11 w-11 rounded-xl object-contain shadow-sm ring-1 ring-gray-100 transition-transform group-hover:scale-[1.02]"
              />
              <div className="hidden sm:block leading-tight">
                <span className="block text-lg font-bold tracking-tight text-[#165028]">Medigo</span>
                <span className="block text-xs font-medium text-[#165028]/75">Healthcare</span>
              </div>
            </Link>
          </div>

          {/* Desktop nav */}
          <div className="hidden flex-1 items-center justify-center lg:flex">
            <div className="flex items-center gap-0.5 rounded-2xl border border-gray-100/80 bg-gray-50/50 p-1 shadow-inner">
              <Link to="/" className={linkClass}>
                Home
              </Link>

              <div
                ref={servicesClusterRef}
                className="relative"
                onMouseEnter={() => {
                  cancelClose();
                  openMenu('services');
                }}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className={[
                    'inline-flex items-center gap-1.5 rounded-xl border border-green-100 bg-gradient-to-r from-green-50 to-emerald-50 px-3.5 py-2 text-sm font-semibold text-green-700 transition-all hover:from-green-100 hover:to-emerald-100',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2',
                    isOpen('services') ? 'border-green-200 shadow-inner' : '',
                  ].join(' ')}
                  aria-expanded={isOpen('services')}
                  aria-haspopup="true"
                  aria-controls="nav-services-menu"
                  id="nav-services-trigger"
                  onClick={(e) => {
                    if (!isOpen('services')) {
                      navigate('/services');
                    } else {
                      toggleMenu('services');
                    }
                  }}
                >
                  Services
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen('services') ? 'rotate-180' : ''}`} />
                </button>
                <div
                  id="nav-services-menu"
                  role="region"
                  aria-labelledby="nav-services-trigger"
                  className="absolute left-0 top-full z-[100] pt-2"
                >
                  <ServiceMenu
                    services={services}
                    isOpen={isOpen('services')}
                    onClose={closeAll}
                  />
                </div>
              </div>

              <Link to="/about" className={`${linkClass} whitespace-nowrap`}>
                About Us
              </Link>
              <Link to="/careers" className={linkClass}>
                Careers
              </Link>
              <Link to="/contact" className={linkClass}>
                Contact
              </Link>
              <Link to="/blog" className={linkClass}>
                Blog
              </Link>

              <div
                ref={healthClusterRef}
                className="relative"
                onMouseEnter={() => {
                  cancelClose();
                  openMenu('health');
                }}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className={[
                    'inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-all',
                    'bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2',
                    isOpen('health') ? 'ring-2 ring-white/40 ring-offset-2 ring-offset-teal-800' : '',
                  ].join(' ')}
                  aria-expanded={isOpen('health')}
                  aria-haspopup="true"
                  aria-controls="nav-health-menu"
                  id="nav-health-trigger"
                  onClick={() => toggleMenu('health')}
                >
                  Health Card
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen('health') ? 'rotate-180' : ''}`} />
                </button>
                <div
                  id="nav-health-menu"
                  className="absolute left-0 top-full z-[100] pt-2"
                  role="region"
                  aria-labelledby="nav-health-trigger"
                >
                  <HealthCardMenu isOpen={isOpen('health')} onClose={closeAll} />
                </div>
              </div>

              <div
                ref={emergencyClusterRef}
                className="relative"
                onMouseEnter={() => {
                  cancelClose();
                  openMenu('emergency');
                }}
                onMouseLeave={scheduleClose}
              >
                <button
                  type="button"
                  className={[
                    'inline-flex items-center gap-1.5 rounded-xl border border-red-100 bg-gradient-to-r from-red-50 to-rose-50 px-3.5 py-2 text-sm font-semibold text-red-700 transition-all hover:from-red-100 hover:to-rose-100',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-400 focus-visible:ring-offset-2',
                    isOpen('emergency') ? 'border-red-200 shadow-inner' : '',
                  ].join(' ')}
                  aria-expanded={isOpen('emergency')}
                  aria-haspopup="true"
                  aria-controls="nav-emergency-menu"
                  id="nav-emergency-trigger"
                  onClick={() => toggleMenu('emergency')}
                >
                  Emergency
                  <ChevronDown className={`h-4 w-4 shrink-0 transition-transform duration-200 ${isOpen('emergency') ? 'rotate-180' : ''}`} />
                </button>
                <div
                  id="nav-emergency-menu"
                  className="absolute right-0 top-full z-[100] pt-2"
                  role="region"
                  aria-labelledby="nav-emergency-trigger"
                >
                  <EmergencyMenu
                    emergencyServices={emergencyServices}
                    isOpen={isOpen('emergency')}
                    onClose={closeAll}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              type="button"
              onClick={() => navigate('/cart')}
              className="relative rounded-xl p-2.5 text-gray-600 transition-colors hover:bg-[#f0fdf2] hover:text-[#165028] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5DBB63]/40"
              aria-label={`Shopping cart${cartCount > 0 ? `, ${cartCount} items` : ''}`}
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-[#5DBB63] px-1 text-[11px] font-bold text-white shadow-sm">
                  {cartCount > 99 ? '99+' : cartCount}
                </span>
              )}
            </button>
            <Link
              to="/auth?tab=signup"
              className="hidden rounded-xl bg-[#165028] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-[#0f3d1c] hover:shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5DBB63]/40 focus-visible:ring-offset-2 sm:inline-flex sm:items-center sm:gap-2"
            >
              <User className="h-4 w-4" />
              Sign Up
            </Link>
            <Link
              to="/auth"
              className="hidden rounded-xl border border-[#165028]/20 bg-white px-4 py-2.5 text-sm font-semibold text-[#165028] shadow-sm transition-all hover:bg-[#f0fdf2] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5DBB63]/40 focus-visible:ring-offset-2 sm:inline-flex sm:items-center sm:gap-2"
            >
              <User className="h-4 w-4" />
              Login
            </Link>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(true);
                closeAll();
              }}
              className="rounded-xl p-2.5 text-gray-700 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#5DBB63]/40 lg:hidden"
              aria-expanded={mobileOpen}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[200] lg:hidden"
            >
              <button
                type="button"
                className="absolute inset-0 bg-gray-900/40 backdrop-blur-[2px]"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                className="absolute right-0 top-0 flex h-full w-[min(100%,320px)] flex-col bg-white shadow-2xl"
              >
                <div className="flex items-center justify-between border-b border-gray-100 px-4 py-4">
                  <span className="text-lg font-bold text-[#165028]">Menu</span>
                  <button
                    type="button"
                    onClick={() => setMobileOpen(false)}
                    className="rounded-xl p-2 text-gray-600 hover:bg-gray-100"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="flex-1 overflow-y-auto px-3 py-3">
                  <div className="space-y-1">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        to={link.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-xl px-4 py-3.5 text-[15px] font-medium text-gray-800 hover:bg-[#f0fdf2]"
                      >
                        {link.label}
                      </Link>
                    ))}
                    <Link
                      to="/services"
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl px-4 py-3.5 text-[15px] font-semibold text-[#165028] hover:bg-[#f0fdf2]"
                    >
                      All Services
                    </Link>
                    <Link
                      to="/health-cards"
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl border border-teal-200 bg-teal-50/80 px-4 py-3.5 text-[15px] font-semibold text-teal-800"
                    >
                      Health Cards
                    </Link>
                    <Link
                      to="/emergency"
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl border border-red-100 bg-red-50 px-4 py-3.5 text-[15px] font-semibold text-red-700"
                    >
                      Emergency
                    </Link>
                  </div>
                  <div className="mt-6 space-y-2 border-t border-gray-100 pt-6">
                    <Link
                      to="/auth?tab=signup"
                      onClick={() => setMobileOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#165028] py-3.5 text-sm font-semibold text-white shadow-sm"
                    >
                      <User className="h-4 w-4" />
                      Sign Up
                    </Link>
                    <Link
                      to="/auth"
                      onClick={() => setMobileOpen(false)}
                      className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3.5 text-sm font-semibold text-[#165028]"
                    >
                      <User className="h-4 w-4" />
                      Login
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
