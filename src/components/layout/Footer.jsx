import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Stethoscope, Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram,
  Send, ArrowUp, Shield, Clock, Award, Heart, Youtube, Users, Pill, TestTube,
  AlertCircle, Building, Briefcase, Headphones, FileText, Lock, BookOpen
} from 'lucide-react';
import { useState } from 'react';

const footerLinks = {
  Quick: [
    { label: 'Find Doctors', href: '/doctors', icon: Users },
    { label: 'Pharmacy', href: '/pharmacy', icon: Pill },
    { label: 'Lab Tests', href: '/lab-tests', icon: TestTube },
    { label: 'Emergency', href: '/emergency', icon: AlertCircle },
  ],
  Company: [
    { label: 'About Us', href: '/about', icon: Building },
    { label: 'Careers', href: '/careers', icon: Briefcase },
    { label: 'Contact', href: '/contact', icon: Headphones },
    { label: 'Help Center', href: '/help', icon: FileText },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy', icon: Lock },
    { label: 'Terms of Service', href: '/terms', icon: FileText },
    { label: 'Blog', href: '/blog', icon: BookOpen },
  ],
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com', label: 'Twitter' },
  { icon: Instagram, href: 'https://instagram.com', label: 'Instagram' },
  { icon: Linkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com', label: 'YouTube' },
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
              <img 
                src="/assets/logo.png" 
                alt="Medigo Healthcare" 
                className="w-16 h-16 rounded-xl object-contain transition-transform group-hover:scale-110"
              />
              <div>
                <span className="font-bold text-2xl text-white block leading-tight">
                  Medigo
                </span>
                <span className="font-medium text-sm text-white/80 block leading-tight">
                  Healthcare
                </span>
              </div>
            </Link>
            
            <p className="text-white/85 text-sm mb-6 leading-relaxed">
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
                  className="w-full px-4 py-3 pr-12 rounded-xl bg-white/10 backdrop-blur-sm border border-white/25 text-white text-sm placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#5DBB63] transition-all"
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
              <a href="tel:+8801886643626" className="flex items-center gap-2 text-white/90 hover:text-[#5DBB63] text-sm transition-colors">
                <Phone className="w-4 h-4 text-white/90" />
                +880 1886-643626
              </a>
              <a href="mailto:info@medigo.com" className="flex items-center gap-2 text-white/90 hover:text-[#5DBB63] text-sm transition-colors">
                <Mail className="w-4 h-4 text-white/90" />
                info@medigo.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2.5">
              {footerLinks.Quick.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="flex items-center gap-2 text-white/85 hover:text-[#5DBB63] hover:translate-x-1 text-sm transition-all">
                    <link.icon className="w-4 h-4 text-white/70 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2.5">
              {footerLinks.Company.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="flex items-center gap-2 text-white/85 hover:text-[#5DBB63] hover:translate-x-1 text-sm transition-all">
                    <link.icon className="w-4 h-4 text-white/70 shrink-0" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.Legal.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="flex items-center gap-2 text-white/85 hover:text-[#5DBB63] hover:translate-x-1 text-sm transition-all">
                    <link.icon className="w-4 h-4 text-white/70 shrink-0" />
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
              <p className="text-white/80 text-xs">
                © {new Date().getFullYear()} Medigo. All rights reserved.
              </p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15">
                  <Shield className="w-3.5 h-3.5 text-[#5DBB63]" />
                  <span className="text-xs text-white/85">Secured</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15">
                  <Award className="w-3.5 h-3.5 text-[#5DBB63]" />
                  <span className="text-xs text-white/85">Certified</span>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 border border-white/15">
                  <Clock className="w-3.5 h-3.5 text-[#5DBB63]" />
                  <span className="text-xs text-white/85">24/7</span>
                </div>
              </div>
            </div>

            {/* Social Links - clear design, white icons, green hover */}
            <div className="flex items-center gap-2">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 rounded-full bg-white/15 border border-white/20 flex items-center justify-center text-white hover:bg-[#5DBB63] hover:border-[#5DBB63] hover:text-white transition-all duration-300"
                >
                  <Icon className="w-4 h-4" strokeWidth={2} />
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
