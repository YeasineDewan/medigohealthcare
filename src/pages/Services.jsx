import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Stethoscope,
  Video,
  Pill,
  FlaskConical,
  FolderOpen,
  ChevronRight,
  Shield,
  Clock,
  Truck,
} from 'lucide-react';

const services = [
  {
    icon: Stethoscope,
    title: 'Specialist Doctor',
    desc: 'Book appointments with specialists',
    href: '/doctors',
    features: ['Verified specialists', 'Multiple specialties', 'Easy booking'],
  },
  {
    icon: Video,
    title: 'Video Consultation',
    desc: 'Online video calls with doctors',
    href: '/consult',
    features: ['HD video calls', '24/7 availability', 'Digital prescriptions'],
  },
  {
    icon: Pill,
    title: 'Pharmacy',
    desc: 'Order medicines online',
    href: '/pharmacy',
    features: ['Home delivery', 'Prescription upload', 'Genuine medicines'],
  },
  {
    icon: FlaskConical,
    title: 'Lab Tests',
    desc: 'Home collection & reports',
    href: '/lab-tests',
    features: ['Home sample collection', 'Digital reports', '24-48hr turnaround'],
  },
  {
    icon: FolderOpen,
    title: 'Health Records',
    desc: 'Your medical history',
    href: '/records',
    features: ['Secure storage', 'Prescriptions', 'Lab reports'],
  },
];

export default function Services() {
  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#f0fdf2] to-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-4"
          >
            <h1 className="text-4xl font-bold text-[#165028] mb-4">Our Services</h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Comprehensive healthcare solutions for you and your family. Everything you need in one place.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Link to={service.href}>
                <div className="group p-8 rounded-2xl border border-gray-100 bg-white hover:border-[#5DBB63]/30 hover:shadow-xl transition-all duration-300 h-full">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-6">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#5DBB63] to-[#165028] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-[#111827] mb-2 group-hover:text-[#165028]">
                        {service.title}
                      </h2>
                      <p className="text-gray-600 mb-4">{service.desc}</p>
                      <ul className="space-y-2 mb-4">
                        {service.features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#5DBB63]" />
                            {f}
                          </li>
                        ))}
                      </ul>
                      <span className="inline-flex items-center gap-1 text-[#5DBB63] font-semibold group-hover:gap-2 transition-all">
                        Learn more <ChevronRight className="w-5 h-5" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-[#165028] to-[#0f3d1c] text-white"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h3 className="text-xl font-bold mb-2">Why Choose Medigo?</h3>
              <p className="text-white/80">Trusted by 2M+ patients. Secure, convenient, and always available.</p>
            </div>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-3">
                <Shield className="w-10 h-10 text-[#5DBB63]" />
                <span>Verified Professionals</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-10 h-10 text-[#5DBB63]" />
                <span>24/7 Support</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-10 h-10 text-[#5DBB63]" />
                <span>Fast Delivery</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
