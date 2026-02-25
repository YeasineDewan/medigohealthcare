import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  Shield,
  Heart,
  Users,
  Award,
  Target,
  Lightbulb,
  Globe,
  Clock,
  TrendingUp,
  Stethoscope,
  Hospital,
  Calendar,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  ArrowRight,
  Brain,
  Zap,
  Microscope,
  Dna,
  FileText,
  Star,
  Building,
  Rocket,
  Eye,
  MessageCircle,
  Download,
  Loader2,
} from 'lucide-react';

const values = [
  { icon: Shield, title: 'Trust', desc: 'Verified doctors and pharmacies', color: 'from-blue-500 to-blue-600' },
  { icon: Heart, title: 'Care', desc: 'Patient-first approach', color: 'from-red-500 to-red-600' },
  { icon: Users, title: 'Community', desc: 'Serving millions', color: 'from-green-500 to-green-600' },
  { icon: Award, title: 'Excellence', desc: 'Quality healthcare', color: 'from-purple-500 to-purple-600' },
];

const stats = [
  { number: '2M+', label: 'Patients Served', icon: Users },
  { number: '5000+', label: 'Verified Doctors', icon: Stethoscope },
  { number: '100+', label: 'Hospitals', icon: Hospital },
  { number: '50+', label: 'Cities', icon: MapPin },
];

const milestones = [
  { year: '2019', title: 'Founded', desc: 'Started with a vision to revolutionize healthcare', icon: Rocket },
  { year: '2020', title: 'Launch', desc: 'Launched our digital platform with 100 doctors', icon: Globe },
  { year: '2021', title: 'Expansion', desc: 'Expanded to 20 cities and added video consultations', icon: TrendingUp },
  { year: '2022', title: 'Innovation', desc: 'Introduced AI-powered health recommendations', icon: Brain },
  { year: '2023', title: 'Growth', desc: 'Reached 1M+ patients and partnered with major hospitals', icon: Users },
  { year: '2024', title: 'Excellence', desc: 'Awarded Best Digital Health Platform', icon: Award },
];

const team = [
  {
    name: 'Dr. Sarah Johnson',
    role: 'CEO & Founder',
    image: '/api/placeholder/300/300',
    desc: 'Medical doctor with 15+ years in healthcare technology',
    expertise: ['Healthcare Innovation', 'Medical Strategy', 'Patient Care']
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    image: '/api/placeholder/300/300',
    desc: 'Tech visionary specializing in health-tech solutions',
    expertise: ['AI & Machine Learning', 'Cloud Architecture', 'Data Security']
  },
  {
    name: 'Dr. Ahmed Rahman',
    role: 'Medical Director',
    image: '/api/placeholder/300/300',
    desc: 'Experienced physician leading our medical team',
    expertise: ['Clinical Operations', 'Quality Assurance', 'Medical Ethics']
  },
  {
    name: 'Emily Williams',
    role: 'Head of Operations',
    image: '/api/placeholder/300/300',
    desc: 'Operations expert ensuring seamless service delivery',
    expertise: ['Process Optimization', 'Customer Experience', 'Team Leadership']
  },
];

const partners = [
  { name: 'Dhaka Medical College', type: 'Medical Institution' },
  { name: 'Square Hospital', type: 'Healthcare Provider' },
  { name: 'Apollo Hospitals', type: 'Healthcare Provider' },
  { name: 'United Hospital', type: 'Healthcare Provider' },
  { name: 'Bangabandhu Sheikh Mujib Medical University', type: 'Medical Institution' },
  { name: 'Ibn Sina Hospital', type: 'Healthcare Provider' },
];

const technologies = [
  { icon: Brain, title: 'AI-Powered Diagnosis', desc: 'Advanced algorithms for accurate health assessments' },
  { icon: Zap, title: 'Real-time Consultations', desc: 'Instant video consultations with specialists' },
  { icon: Shield, title: 'Secure Health Records', desc: 'Blockchain-secured medical data storage' },
  { icon: Microscope, title: 'Digital Lab Reports', desc: 'Instant access to test results and analysis' },
  { icon: Dna, title: 'Genetic Testing', desc: 'Comprehensive DNA analysis and counseling' },
  { icon: Eye, title: 'Telemedicine', desc: 'Remote monitoring and virtual care solutions' },
];

export default function About() {
  const navigate = useNavigate();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isNavigating, setIsNavigating] = useState(null);

  const handleBookConsultation = () => {
    navigate('/consult');
  };

  const handleJoinAsDoctor = () => {
    // Track analytics event
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'navigation',
        event_label: 'join_as_doctor',
        value: 1
      });
    }
    
    setIsNavigating('doctor');
    setTimeout(() => {
      navigate('/join-as-doctor');
      setIsNavigating(null);
    }, 300);
  };

  const handlePartnerHospital = () => {
    // Track analytics event
    if (window.gtag) {
      window.gtag('event', 'click', {
        event_category: 'navigation',
        event_label: 'partner_hospital',
        value: 1
      });
    }
    
    setIsNavigating('hospital');
    setTimeout(() => {
      navigate('/partner-hospital');
      setIsNavigating(null);
    }, 300);
  };

  const handleDownloadBrochure = async () => {
    setIsDownloading(true);
    try {
      const brochureUrl = '/brochure.pdf';
      const link = document.createElement('a');
      link.href = brochureUrl;
      link.setAttribute('download', 'Medigo-Healthcare-Brochure.pdf');
      link.setAttribute('target', '_blank');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading brochure:', error);
      alert('Unable to download brochure. Please try again later.');
    } finally {
      setIsDownloading(false);
    }
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
                <Shield className="w-4 h-4" />
                Trusted by 2M+ patients
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#165028] leading-tight mb-6">
                Revolutionizing
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5DBB63] to-[#165028]">
                  {' '}Healthcare
                </span>
              </h1>
              <p className="text-lg text-gray-600 mb-8 max-w-xl">
                Medigo is transforming healthcare delivery through innovative technology, 
                connecting patients with quality medical care anytime, anywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleBookConsultation}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] transition-colors"
                >
                  <Stethoscope className="w-5 h-5" />
                  Book Consultation
                </button>
                <button 
                  onClick={handleDownloadBrochure}
                  disabled={isDownloading}
                  className="inline-flex items-center gap-2 px-6 py-3 border border-[#5DBB63] text-[#5DBB63] rounded-lg hover:bg-[#5DBB63]/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDownloading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Download className="w-5 h-5" />
                  )}
                  {isDownloading ? 'Downloading...' : 'Download Brochure'}
                </button>
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
                  <Heart className="w-32 h-32 text-[#5DBB63]" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-[#165028]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-7 h-7 text-yellow-400" />
                </div>
                <h3 className="font-bold text-4xl mb-1 text-yellow-400" style={{color: '#FBBF24', textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>{stat.number}</h3>
                <p className="text-yellow-100 font-semibold">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold text-[#165028] mb-4">Our Core Values</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl border border-gray-100 hover:border-[#5DBB63]/30 hover:shadow-lg transition-all duration-300 h-full"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${value.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-[#111827] text-lg mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold text-[#165028] mb-4">Cutting-Edge Technology</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Leveraging the latest innovations to deliver superior healthcare
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technologies.map((tech, i) => (
              <motion.div
                key={tech.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5DBB63] to-[#165028] flex items-center justify-center mb-4">
                  <tech.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-[#111827] text-lg mb-2">{tech.title}</h3>
                <p className="text-gray-500 text-sm">{tech.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold text-[#165028] mb-4">Our Journey</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              From a simple idea to a healthcare revolution
            </p>
          </motion.div>
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-[#5DBB63]" />
            <div className="space-y-12">
              {milestones.map((milestone, i) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`flex items-center ${i % 2 === 0 ? 'flex-row-reverse' : ''}`}
                >
                  <div className="w-1/2" />
                  <div className="relative flex items-center justify-center w-12 h-12">
                    <div className="w-8 h-8 bg-white border-4 border-[#5DBB63] rounded-full" />
                    <milestone.icon className="absolute w-4 h-4 text-[#5DBB63]" />
                  </div>
                  <div className={`w-1/2 ${i % 2 === 0 ? 'text-right pr-8' : 'pl-8'}`}>
                    <div className="inline-block p-6 rounded-2xl bg-[#F9FAFB] border border-gray-100">
                      <span className="text-sm font-semibold text-[#5DBB63]">{milestone.year}</span>
                      <h3 className="font-semibold text-[#111827] text-lg mb-2">{milestone.title}</h3>
                      <p className="text-gray-500 text-sm">{milestone.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold text-[#165028] mb-4">Leadership Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Meet the experts driving our healthcare revolution
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="aspect-square bg-gradient-to-br from-[#5DBB63]/20 to-[#165028]/20 flex items-center justify-center">
                    <Stethoscope className="w-24 h-24 text-[#5DBB63]" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-semibold text-[#111827] text-lg mb-1">{member.name}</h3>
                    <p className="text-[#5DBB63] font-medium text-sm mb-3">{member.role}</p>
                    <p className="text-gray-500 text-sm mb-4">{member.desc}</p>
                    <div className="flex flex-wrap gap-2">
                      {member.expertise.map((skill, idx) => (
                        <span key={idx} className="px-2 py-1 bg-[#F9FAFB] text-gray-600 text-xs rounded-full">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold text-[#165028] mb-4">Trusted Partners</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Working with leading healthcare institutions
            </p>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner, i) => (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-gray-100 bg-[#F9FAFB] hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <Building className="w-8 h-8 text-[#5DBB63]" />
                  <div>
                    <h3 className="font-semibold text-[#111827]">{partner.name}</h3>
                    <p className="text-sm text-gray-500">{partner.type}</p>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-[#5DBB63]">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Verified Partner</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-[#5DBB63] to-[#165028]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Join Our Healthcare Revolution</h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Be part of the future of healthcare. Whether you're a patient, doctor, or healthcare provider, 
              Medigo has something for you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button 
                onClick={handleJoinAsDoctor}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleJoinAsDoctor();
                  }
                }}
                disabled={isNavigating === 'doctor'}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#165028] rounded-lg hover:bg-gray-100 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                role="button"
                tabIndex={0}
                aria-label="Join as a doctor on Medigo platform"
              >
                {isNavigating === 'doctor' ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <Stethoscope className="w-5 h-5" />
                )}
                <span className="font-medium">
                  {isNavigating === 'doctor' ? 'Loading...' : 'Join as Doctor'}
                </span>
              </motion.button>
              <motion.button 
                onClick={handlePartnerHospital}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handlePartnerHospital();
                  }
                }}
                disabled={isNavigating === 'hospital'}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white border border-white/30 rounded-lg hover:bg-white/20 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-white/50"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                role="button"
                tabIndex={0}
                aria-label="Partner your hospital with Medigo platform"
              >
                {isNavigating === 'hospital' ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Loader2 className="w-5 h-5" />
                  </motion.div>
                ) : (
                  <Hospital className="w-5 h-5" />
                )}
                <span className="font-medium">
                  {isNavigating === 'hospital' ? 'Loading...' : 'Partner Hospital'}
                </span>
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
