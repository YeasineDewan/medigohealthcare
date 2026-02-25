import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageCircle,
  Clock,
  Users,
  Building,
  Globe,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Star,
  CheckCircle,
  AlertCircle,
  Calendar,
  ArrowRight,
  ExternalLink,
  Headphones,
  Shield,
  Zap,
  Award,
  Heart,
  Stethoscope,
  Ambulance,
  FileText,
  Download,
  Navigation,
  Search,
  Filter,
  ChevronRight,
} from 'lucide-react';
import { Button } from '../components/core/Button';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    department: 'general',
    priority: 'normal',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('');

  const offices = [
    {
      city: 'Dhaka',
      address: 'Rupayan Trade Center, 3rd Floor 114 Kazi Nazrul Islam Avenue, Banglamotor, Dhaka 1100',
      phone: '+880 1886-643626',
      email: 'dhaka@medigo.com',
      hours: 'Mon-Sat: 9:00 AM - 8:00 PM',
      coordinates: { lat: 23.7925, lng: 90.4078 },
      services: ['General Consultation', 'Emergency Care', 'Lab Tests'],
    },
    {
      city: 'Chittagong',
      address: '456 Health Avenue, Agrabad, Chittagong-4000',
      phone: '+880 31 1234 5678',
      email: 'ctg@medigo.com',
      hours: 'Mon-Sat: 9:00 AM - 8:00 PM',
      coordinates: { lat: 22.3569, lng: 91.7832 },
      services: ['Cardiology', 'Orthopedics', 'Pediatrics'],
    },
    {
      city: 'Sylhet',
      address: '789 Medical Street, Zindabazar, Sylhet-3100',
      phone: '+880 821 1234 5678',
      email: 'sylhet@medigo.com',
      hours: 'Mon-Sat: 9:00 AM - 6:00 PM',
      coordinates: { lat: 24.8949, lng: 91.8687 },
      services: ['General Medicine', 'Dental Care', 'Eye Care'],
    },
  ];

  const departments = [
    { name: 'general', label: 'General Inquiry', icon: MessageCircle },
    { name: 'emergency', label: 'Emergency', icon: Ambulance },
    { name: 'appointment', label: 'Appointment Booking', icon: Calendar },
    { name: 'billing', label: 'Billing & Payment', icon: FileText },
    { name: 'technical', label: 'Technical Support', icon: Headphones },
    { name: 'feedback', label: 'Feedback & Complaints', icon: Star },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com/medigo' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com/medigo' },
    { name: 'LinkedIn', icon: Linkedin, url: 'https://linkedin.com/company/medigo' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com/medigo' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/medigo' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        department: 'general',
        priority: 'normal',
      });
    }, 2000);
  };

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#f0fdf2] via-white to-[#dcfce7] py-20 lg:py-32 overflow-hidden">
        <div className="absolute top-20 right-0 w-1/2 h-1/2 bg-[#5DBB63]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-[#165028]/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#5DBB63]/10 text-[#165028] text-sm font-medium mb-6">
                <Headphones className="w-4 h-4" />
                24/7 Support Available
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#165028] leading-tight mb-6">
                Get in
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5DBB63] to-[#165028]">
                  {' '}Touch
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                We're here to help. Reach out to our team for any questions, 
                concerns, or healthcare needs you may have.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="tel:+8801886643626" className="inline-flex items-center gap-2 px-6 py-3 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] transition-colors">
                  <Phone className="w-5 h-5" />
                  Call Now
                </a>
                <a href="mailto:support@medigo.com" className="inline-flex items-center gap-2 px-6 py-3 border border-[#5DBB63] text-[#5DBB63] rounded-lg hover:bg-[#5DBB63]/10 transition-colors">
                  <Mail className="w-5 h-5" />
                  Email Us
                </a>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="aspect-square max-w-md mx-auto rounded-3xl bg-gradient-to-br from-[#5DBB63]/20 to-[#165028]/20 flex items-center justify-center">
                <div className="w-64 h-64 rounded-full bg-white/80 shadow-xl flex items-center justify-center">
                  <MessageCircle className="w-32 h-32 text-[#5DBB63]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Quick Contact Options */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-6 rounded-2xl border border-gray-100 hover:border-[#5DBB63]/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center mb-4">
                <Ambulance className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-[#111827] text-lg mb-2">Emergency Hotline</h3>
              <p className="text-gray-600 mb-4">24/7 emergency medical assistance</p>
              <a href="tel:+8801886643626" className="inline-flex items-center gap-2 text-red-600 font-medium">
                +880 1886-643626 <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 rounded-2xl border border-gray-100 hover:border-[#5DBB63]/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-[#111827] text-lg mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">Chat with our support team</p>
              <button className="inline-flex items-center gap-2 text-blue-600 font-medium">
                Start Chat <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 rounded-2xl border border-gray-100 hover:border-[#5DBB63]/30 hover:shadow-lg transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-[#111827] text-lg mb-2">Book Appointment</h3>
              <p className="text-gray-600 mb-4">Schedule a consultation</p>
              <button className="inline-flex items-center gap-2 text-green-600 font-medium">
                Book Now <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Form & Offices */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2"
            >
              <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-[#165028] mb-6">Send us a Message</h2>
                
                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <p className="text-green-800">Message sent successfully! We'll get back to you soon.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                        placeholder="+880 1XXX XXXXXX"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Department</label>
                      <select
                        name="department"
                        value={formData.department}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                      >
                        {departments.map((dept) => (
                          <option key={dept.name} value={dept.name}>
                            {dept.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message *</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none resize-none"
                      placeholder="Please describe your inquiry in detail..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                    <div className="flex gap-4">
                      {['low', 'normal', 'high', 'urgent'].map((priority) => (
                        <label key={priority} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="priority"
                            value={priority}
                            checked={formData.priority === priority}
                            onChange={handleChange}
                            className="text-[#5DBB63] focus:ring-[#5DBB63]"
                          />
                          <span className="text-sm capitalize">{priority}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        Send Message
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </motion.div>

            {/* Office Locations */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="bg-white rounded-2xl border border-gray-100 p-8">
                <h2 className="text-2xl font-bold text-[#165028] mb-6">Office Locations</h2>
                <div className="space-y-6">
                  {offices.map((office, i) => (
                    <div key={office.city} className="border-b border-gray-100 pb-6 last:border-0">
                      <h3 className="font-semibold text-[#111827] text-lg mb-2">{office.city}</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-600">{office.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400" />
                          <a href={`tel:${office.phone}`} className="text-gray-600 hover:text-[#5DBB63]">
                            {office.phone}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <a href={`mailto:${office.email}`} className="text-gray-600 hover:text-[#5DBB63]">
                            {office.email}
                          </a>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-600">{office.hours}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <button className="text-[#5DBB63] text-sm font-medium hover:text-[#165028]">
                          Get Directions <Navigation className="w-3 h-3 inline ml-1" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Map */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#165028] mb-4">Find Us on the Map</h2>
            <p className="text-gray-600">Locate our nearest office for convenient healthcare access</p>
          </motion.div>
          
          <div className="bg-gray-100 rounded-2xl overflow-hidden" style={{ height: '500px' }}>
            {/* Google Maps integration */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d542.8795856341715!2d90.39554544999197!3d23.745811037870038!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b896706bb089%3A0xb56f55b074efcf06!2sRupayan%20Trade%20Center%2C%20114%20Kazi%20Nazrul%20Islam%20Ave%2C%20Dhaka%201205!5e0!3m2!1sen!2sbd!4v1771327857295!5m2!1sen!2sbd"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Medigo Healthcare - Rupayan Trade Center Location"
            ></iframe>
          </div>
          
          {/* Alternative: Interactive location selector */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {offices.map((office, i) => (
              <button
                key={office.city}
                onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(office.address)}`, '_blank')}
                className="p-4 bg-white rounded-lg border border-gray-200 hover:border-[#5DBB63] hover:shadow-md transition-all duration-300 text-left"
              >
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-[#5DBB63]" />
                  <span className="font-semibold text-gray-900">{office.city}</span>
                </div>
                <p className="text-sm text-gray-600">{office.address}</p>
                <button className="mt-2 text-[#5DBB63] text-sm font-medium hover:text-[#165028]">
                  View on Map <Navigation className="w-3 h-3 inline ml-1" />
                </button>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media & Support */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-[#165028] mb-6">Connect With Us</h2>
              <p className="text-gray-600 mb-6">
                Follow us on social media for health tips, updates, and community support
              </p>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, i) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 bg-white rounded-lg border border-gray-100 hover:border-[#5DBB63]/30 hover:shadow-md transition-all duration-300"
                  >
                    <social.icon className="w-6 h-6 text-[#5DBB63]" />
                    <span className="font-medium text-gray-900">{social.name}</span>
                    <ExternalLink className="w-4 h-4 text-gray-400 ml-auto" />
                  </a>
                ))}
              </div>
            </motion.div>

            {/* Support Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-bold text-[#165028] mb-6">Support Resources</h2>
              <div className="space-y-4">
                <a href="/faq" className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-[#5DBB63]/30 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-[#5DBB63]" />
                    <span className="font-medium text-gray-900">Frequently Asked Questions</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </a>
                
                <a href="/help-center" className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-[#5DBB63]/30 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <Headphones className="w-5 h-5 text-[#5DBB63]" />
                    <span className="font-medium text-gray-900">Help Center</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </a>
                
                <a href="/downloads" className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:border-[#5DBB63]/30 hover:shadow-md transition-all duration-300">
                  <div className="flex items-center gap-3">
                    <Download className="w-5 h-5 text-[#5DBB63]" />
                    <span className="font-medium text-gray-900">Download Mobile App</span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Response Time Info */}
      <section className="py-16 bg-gradient-to-br from-[#5DBB63] to-[#165028]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center text-white"
          >
            <Clock className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Response Times</h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
              <div>
                <h3 className="font-semibold text-xl mb-2">Emergency</h3>
                <p className="text-white/90">Immediate response</p>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">General Inquiry</h3>
                <p className="text-white/90">Within 24 hours</p>
              </div>
              <div>
                <h3 className="font-semibold text-xl mb-2">Technical Support</h3>
                <p className="text-white/90">Within 48 hours</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
