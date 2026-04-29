import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Hospital,
  Building,
  Users,
  TrendingUp,
  Shield,
  Award,
  Heart,
  CheckCircle,
  ArrowRight,
  Star,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Upload,
  ChevronRight,
  Globe,
  Target,
  BarChart,
  MessageCircle,
  Headphones,
  CreditCard,
  Gift,
  Trophy,
  Zap,
  Clock,
  FileText,
  Briefcase,
  Settings,
  Database,
  Wifi,
  Lock,
  Activity,
  Stethoscope,
  Bed,
  Ambulance,
  Pill,
  FlaskConical,
  Microscope,
  UserCheck,
  Building2,
  Network,
  PieChart,
  TrendingDown,
  AlertCircle,
  CheckSquare
} from 'lucide-react';

const PartnerHospital = () => {
  const [formData, setFormData] = useState({
    hospitalName: '',
    hospitalType: '',
    establishedYear: '',
    contactPerson: '',
    designation: '',
    email: '',
    phone: '',
    alternatePhone: '',
    address: '',
    city: '',
    district: '',
    postalCode: '',
    beds: '',
    icuBeds: '',
    emergencyBeds: '',
    emergencyServices: [],
    specializations: [],
    departments: [],
    facilities: [],
    equipment: [],
    website: '',
    socialMedia: {
      facebook: '',
      linkedin: '',
      twitter: '',
      instagram: ''
    },
    about: '',
    mission: '',
    vision: '',
    achievements: [],
    awards: [],
    accreditations: [],
    partnerships: [],
    documents: [],
    bankDetails: {
      accountName: '',
      accountNumber: '',
      bankName: '',
      branchName: '',
      routingNumber: ''
    },
    emergencyContact: {
      name: '',
      designation: '',
      phone: '',
      email: ''
    },
    technicalContact: {
      name: '',
      designation: '',
      phone: '',
      email: ''
    },
    services: {
      ambulance: false,
      pharmacy: false,
      laboratory: false,
      radiology: false,
      bloodBank: false,
      emergency: false,
      icu: false,
      surgery: false,
      maternity: false,
      pediatrics: false,
      cardiology: false,
      neurology: false,
      oncology: false
    },
    integration: {
      his: false,
      lis: false,
      ris: false,
      pacs: false,
      emr: false,
      billing: false,
      pharmacy: false,
      laboratory: false
    }
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [savedProgress, setSavedProgress] = useState(false);

  const benefits = [
    {
      icon: Users,
      title: 'Massive Patient Network',
      description: 'Access to 2M+ verified patients with AI-powered matching and referral system',
      color: 'from-blue-500 to-blue-600',
      stats: ['2M+ Patients', 'AI Matching', 'Referral Network', 'Patient Analytics']
    },
    {
      icon: TrendingUp,
      title: 'Revenue Growth Engine',
      description: 'Boost hospital revenue by 40% with digital marketing and optimization tools',
      color: 'from-green-500 to-green-600',
      stats: ['40% Revenue Growth', 'Marketing Tools', 'Revenue Analytics', 'Optimization']
    },
    {
      icon: Shield,
      title: 'Digital Transformation',
      description: 'Complete digital infrastructure with EMR, HIS, and telemedicine integration',
      color: 'from-purple-500 to-purple-600',
      stats: ['HIS Integration', 'EMR System', 'Telemedicine', 'Digital Infrastructure']
    },
    {
      icon: Clock,
      title: '24/7 Operations',
      description: 'Round-the-clock digital presence with automated scheduling and emergency response',
      color: 'from-orange-500 to-orange-600',
      stats: ['24/7 Availability', 'Auto Scheduling', 'Emergency Response', 'Real-time Updates']
    },
    {
      icon: Award,
      title: 'Premium Recognition',
      description: 'Get verified, accredited, and recognized as a leading healthcare provider',
      color: 'from-red-500 to-red-600',
      stats: ['Verification Badge', 'Accreditation Support', 'Quality Awards', 'Industry Recognition']
    },
    {
      icon: Heart,
      title: 'Healthcare Excellence',
      description: 'Advanced clinical tools, quality metrics, and patient care improvement systems',
      color: 'from-indigo-500 to-indigo-600',
      stats: ['Quality Metrics', 'Clinical Tools', 'Patient Care', 'Excellence Programs']
    }
  ];

  const features = [
    {
      icon: Calendar,
      title: 'AI-Powered Scheduling',
      description: 'Advanced appointment management with predictive scheduling, resource optimization, and automated workflows',
      advanced: true,
      features: ['AI Scheduling', 'Resource Optimization', 'Automated Workflows', 'Predictive Analytics']
    },
    {
      icon: Database,
      title: 'Enterprise EMR/HIS',
      description: 'Comprehensive hospital information system with interoperability, analytics, and cloud backup',
      advanced: true,
      features: ['HIS Integration', 'EMR System', 'Cloud Backup', 'Interoperability']
    },
    {
      icon: BarChart,
      title: 'Advanced Analytics',
      description: 'Real-time business intelligence with predictive analytics, KPI tracking, and performance optimization',
      advanced: true,
      features: ['Business Intelligence', 'Predictive Analytics', 'KPI Tracking', 'Performance Optimization']
    },
    {
      icon: CreditCard,
      title: 'Financial Management',
      description: 'Complete billing system with insurance processing, revenue cycle management, and financial reporting',
      advanced: true,
      features: ['Revenue Cycle', 'Insurance Processing', 'Financial Reporting', 'Cost Analysis']
    },
    {
      icon: MessageCircle,
      title: 'Patient Engagement',
      description: 'Multi-channel communication platform with automated outreach, satisfaction surveys, and loyalty programs',
      advanced: true,
      features: ['Multi-channel Communication', 'Automated Outreach', 'Satisfaction Surveys', 'Loyalty Programs']
    },
    {
      icon: FileText,
      title: 'Clinical Documentation',
      description: 'Digital health records with templates, decision support, and clinical workflow automation',
      advanced: true,
      features: ['Digital Records', 'Clinical Templates', 'Decision Support', 'Workflow Automation']
    },
    {
      icon: Shield,
      title: 'Compliance & Security',
      description: 'HIPAA compliance, data security, audit trails, and regulatory reporting automation',
      advanced: true,
      features: ['HIPAA Compliance', 'Data Security', 'Audit Trails', 'Regulatory Reporting']
    },
    {
      icon: Users,
      title: 'Staff Management',
      description: 'Complete HR system with scheduling, performance tracking, and credential management',
      advanced: true,
      features: ['HR Management', 'Staff Scheduling', 'Performance Tracking', 'Credential Management']
    }
  ];

  const services = [
    {
      icon: Bed,
      title: 'Bed Management',
      description: 'Real-time bed availability tracking and allocation system'
    },
    {
      icon: Ambulance,
      title: 'Emergency Services',
      description: 'Integrated ambulance dispatch and emergency response coordination'
    },
    {
      icon: Pill,
      title: 'Pharmacy Integration',
      description: 'Connect your pharmacy for seamless prescription fulfillment'
    },
    {
      icon: FlaskConical,
      title: 'Lab Services',
      description: 'Digital lab test booking and report management system'
    },
    {
      icon: Stethoscope,
      title: 'Doctor Management',
      description: 'Manage doctor profiles, schedules, and consultations'
    },
    {
      icon: Users,
      title: 'Staff Management',
      description: 'Comprehensive staff scheduling and management system'
    }
  ];

  const testimonials = [
    {
      name: 'Dhaka Medical College Hospital',
      type: 'Government Hospital',
      rating: 4.9,
      image: '🏥',
      text: 'Medigo has revolutionized our patient management system. We now handle 3x more appointments with improved efficiency.',
      patients: '+300%'
    },
    {
      name: 'Square Hospital',
      type: 'Private Hospital',
      rating: 4.8,
      image: '🏥',
      text: 'The digital platform has significantly increased our patient reach and streamlined our operations.',
      patients: '+250%'
    },
    {
      name: 'Apollo Hospital',
      type: 'Multi-Specialty',
      rating: 5.0,
      image: '🏥',
      text: 'Best decision we made. The ROI has been exceptional and patient satisfaction has improved dramatically.',
      patients: '+400%'
    }
  ];

  const stats = [
    { number: '100+', label: 'Partner Hospitals', icon: Building },
    { number: '2M+', label: 'Patients Connected', icon: Users },
    { number: '4.9/5', label: 'Hospital Rating', icon: Star },
    { number: '40%', label: 'Revenue Growth', icon: TrendingUp }
  ];

  const requirements = [
    {
      icon: CheckCircle,
      title: 'Valid Registration',
      description: 'Must be registered with Directorate General of Health Services (DGHS)'
    },
    {
      icon: CheckCircle,
      title: 'Quality Healthcare',
      description: 'Proven track record of providing quality medical services'
    },
    {
      icon: CheckCircle,
      title: 'Digital Readiness',
      description: 'Basic infrastructure to support digital healthcare services'
    },
    {
      icon: CheckCircle,
      title: 'Professional Staff',
      description: 'Qualified medical professionals and support staff'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    alert('Partnership application submitted successfully! Our team will contact you within 48 hours.');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#165028] to-[#0f3d1c]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Building className="w-5 h-5" />
                <span className="text-sm font-medium">Premium Healthcare Network</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Partner with
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                  {' '}Medigo
                </span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Transform your hospital with digital healthcare solutions. Reach more patients, 
                optimize operations, and grow your healthcare practice.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/partner-hospital" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#165028] rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
                  <Hospital className="w-5 h-5" />
                  Partner With Us
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-all">
                  <Phone className="w-5 h-5" />
                  Schedule Consultation
                </button>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <div className="text-2xl sm:text-3xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Why Partner with Medigo?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how our digital platform can transform your hospital operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-[#165028] hover:shadow-xl transition-all duration-300">
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Digital Hospital Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools to modernize your healthcare operations
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-lg bg-[#165028] flex items-center justify-center flex-shrink-0">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Integrated Healthcare Services
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Connect all your hospital services under one digital platform
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors"
              >
                <div className="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center mb-4">
                  <service.icon className="w-7 h-7 text-[#165028]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Success Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from hospitals that transformed their operations with Medigo
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-xl transition-all"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="text-4xl">{testimonial.image}</div>
                  <div>
                    <h3 className="font-bold text-gray-900">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.type}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 ${i < Math.floor(testimonial.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">{testimonial.rating}</span>
                </div>
                
                <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-semibold text-green-600">Patients {testimonial.patients}</span>
                  <Trophy className="w-5 h-5 text-green-500" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Partnership Requirements
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Basic requirements to join our premium healthcare network
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {requirements.map((requirement, index) => (
              <motion.div
                key={requirement.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                  <requirement.icon className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{requirement.title}</h3>
                  <p className="text-gray-600">{requirement.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Section */}
      <section className="py-20 bg-gradient-to-br from-[#165028] to-[#0f3d1c]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Start Your Partnership Journey
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join 100+ hospitals already transforming healthcare delivery with Medigo
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hospital Name</label>
                  <input
                    type="text"
                    name="hospitalName"
                    value={formData.hospitalName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Person</label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <select
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                    required
                  >
                    <option value="">Select City</option>
                    <option value="dhaka">Dhaka</option>
                    <option value="chittagong">Chittagong</option>
                    <option value="sylhet">Sylhet</option>
                    <option value="rajshahi">Rajshahi</option>
                    <option value="khulna">Khulna</option>
                    <option value="barisal">Barisal</option>
                    <option value="rangpur">Rangpur</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Beds</label>
                  <input
                    type="number"
                    name="beds"
                    value={formData.beds}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                <input
                  type="url"
                  name="website"
                  value={formData.website}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                  placeholder="https://"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about your hospital</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                  placeholder="Brief description of your hospital, services, and facilities..."
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="terms"
                  className="w-4 h-4 text-[#165028] border-gray-300 rounded focus:ring-[#165028]"
                  required
                />
                <label htmlFor="terms" className="text-sm text-gray-600">
                  I agree to the Terms of Service and Privacy Policy
                </label>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 bg-gradient-to-r from-[#165028] to-[#0f3d1c] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Partnership Application'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Hospital?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join the leading digital healthcare platform and serve millions of patients across Bangladesh.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#165028] to-[#0f3d1c] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                <Building className="w-5 h-5" />
                Apply Now
                <ChevronRight className="w-5 h-5" />
              </button>
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#165028] border border-[#165028] rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                <Phone className="w-5 h-5" />
                Call: +880 1234-567890
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PartnerHospital;
