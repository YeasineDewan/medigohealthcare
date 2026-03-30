import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Stethoscope, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram,
  Send, ArrowUp, Shield, Clock, Award, Heart, Youtube
} from 'lucide-react';
import { useState } from 'react';

const footerLinks = {
  Quick: [
    { label: 'Find Doctors', href: '/doctors' },
    { label: 'Pharmacy', href: '/pharmacy' },
    { label: 'Lab Tests', href: '/lab-tests' },
    { label: 'Emergency', href: '/emergency' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Careers', href: '/careers' },
    { label: 'Contact', href: '/contact' },
    { label: 'Help Center', href: '/help' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Blog', href: '/blog' },
  ],
};

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook', color: 'hover:bg-blue-600' },
  { icon: Twitter, href: '#', label: 'Twitter', color: 'hover:bg-sky-500' },
  { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-pink-600' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-blue-700' },
  { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-red-600' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  return (
    <footer className="relative bg-gradient-to-br from-[#0f3d1c] via-[#165028] to-[#1e6b35] text-white overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#5DBB63] rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#5DBB63] rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-10">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5DBB63] to-[#4a9a4f] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                <Stethoscope className="w-7 h-7 text-white" />
              </div>
              <span className="font-bold text-2xl text-white">Medigo</span>
            </Link>
            
            <p className="text-gray-300 text-sm mb-6 leading-relaxed">
              Your trusted healthcare platform. Quality care, delivered digitally.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleSubscribe} className="mb-6">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Subscribe to newsletter"
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#5DBB63] transition-all"
                  required
                />
                <button
                  type="submit"
                  className={`absolute right-1.5 top-1.5 p-2 rounded-lg transition-all ${
                    subscribed ? 'bg-green-600' : 'bg-[#5DBB63] hover:bg-[#4a9a4f]'
                  }`}
                >
                  {subscribed ? <Shield className="w-4 h-4" /> : <Send className="w-4 h-4" />}
                </button>
              </div>
            </form>

            {/* Contact */}
            <div className="space-y-2">
              <a href="tel:+8801999999999" className="flex items-center gap-2 text-gray-300 hover:text-[#5DBB63] text-sm transition-colors">
                <Phone className="w-4 h-4" />
                +880 1999 999 999
              </a>
              <a href="mailto:info@medigo.com" className="flex items-center gap-2 text-gray-300 hover:text-[#5DBB63] text-sm transition-colors">
                <Mail className="w-4 h-4" />
                info@medigo.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {footerLinks.Quick.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-gray-300 hover:text-white hover:translate-x-1 text-sm transition-all inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.Company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-gray-300 hover:text-white hover:translate-x-1 text-sm transition-all inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.Legal.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="text-gray-300 hover:text-white hover:translate-x-1 text-sm transition-all inline-block">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Copyright & Badges */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <p className="text-gray-400 text-xs">
                © {new Date().getFullYear()} Medigo. All rights reserved.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm">
                  <Shield className="w-3.5 h-3.5 text-[#5DBB63]" />
                  <span className="text-xs text-gray-400">Secured</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm">
                  <Award className="w-3.5 h-3.5 text-[#5DBB63]" />
                  <span className="text-xs text-gray-400">Certified</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm">
                  <Clock className="w-3.5 h-3.5 text-[#5DBB63]" />
                  <span className="text-xs text-gray-400">24/7</span>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label, color }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-9 h-9 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center text-gray-300 hover:text-white hover:border-transparent transition-all duration-300 ${color}`}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="absolute bottom-6 right-6 w-10 h-10 rounded-full bg-[#5DBB63] hover:bg-[#4a9a4f] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center group hover:scale-110"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
      </button>
    </footer>
  );
}
