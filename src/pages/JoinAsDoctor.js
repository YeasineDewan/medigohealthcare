import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Stethoscope,
  Users,
  Clock,
  DollarSign,
  Shield,
  Award,
  Heart,
  TrendingUp,
  CheckCircle,
  ArrowRight,
  Star,
  Calendar,
  Video,
  FileText,
  GraduationCap,
  Briefcase,
  MapPin,
  Phone,
  Mail,
  Camera,
  Upload,
  ChevronRight,
  Zap,
  Globe,
  Target,
  BookOpen,
  UserCheck,
  Activity,
  BarChart,
  MessageCircle,
  Headphones,
  Wifi,
  Lock,
  CreditCard,
  Gift,
  Trophy
} from 'lucide-react';

const JoinAsDoctor = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    specialization: '',
    subSpecialization: '',
    experience: '',
    qualification: '',
    postGraduation: '',
    bmdcNumber: '',
    bmdcRegistrationDate: '',
    hospital: '',
    designation: '',
    consultationFee: '',
    onlineConsultationFee: '',
    availability: {
      monday: { morning: false, afternoon: false, evening: false },
      tuesday: { morning: false, afternoon: false, evening: false },
      wednesday: { morning: false, afternoon: false, evening: false },
      thursday: { morning: false, afternoon: false, evening: false },
      friday: { morning: false, afternoon: false, evening: false },
      saturday: { morning: false, afternoon: false, evening: false },
      sunday: { morning: false, afternoon: false, evening: false }
    },
    languages: [],
    services: [],
    about: '',
    achievements: [],
    publications: [],
    memberships: [],
    profilePhoto: null,
    certificates: [],
    identityDocument: null,
    bankAccount: {
      accountName: '',
      accountNumber: '',
      bankName: '',
      branchName: '',
      routingNumber: ''
    },
    emergencyContact: {
      name: '',
      relationship: '',
      phone: ''
    },
    socialLinks: {
      linkedin: '',
      website: '',
      researchGate: ''
    },
    preferences: {
      videoConsultation: true,
      chatConsultation: true,
      homeVisit: false,
      emergencyConsultation: false
    }
  });

  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({});
  const [validationErrors, setValidationErrors] = useState({});
  const [showPreview, setShowPreview] = useState(false);
  const [savedProgress, setSavedProgress] = useState(false);

  const benefits = [
    {
      icon: DollarSign,
      title: 'Earn More',
      description: 'Set your own consultation fees and earn up to 70% revenue share with instant payouts',
      color: 'from-green-500 to-green-600',
      stats: ['70% Revenue Share', 'Weekly Payouts', 'No Hidden Fees']
    },
    {
      icon: Clock,
      title: 'Flexible Schedule',
      description: 'Work from anywhere, anytime. Set your own availability across multiple time slots',
      color: 'from-blue-500 to-blue-600',
      stats: ['24/7 Availability', 'Time Slot Management', 'Auto Reminders']
    },
    {
      icon: Users,
      title: '2M+ Patients',
      description: 'Access to millions of verified patients across Bangladesh with smart matching',
      color: 'from-purple-500 to-purple-600',
      stats: ['AI Matching', 'Patient Reviews', 'Repeat Patients']
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'End-to-end encrypted consultations with bank-level security and compliance',
      color: 'from-red-500 to-red-600',
      stats: ['HIPAA Compliant', 'Data Encryption', 'Secure Payments']
    },
    {
      icon: TrendingUp,
      title: 'Grow Practice',
      description: 'Build your digital presence with advanced analytics and marketing tools',
      color: 'from-orange-500 to-orange-600',
      stats: ['Performance Analytics', 'Marketing Tools', 'Profile Insights']
    },
    {
      icon: Award,
      title: 'Professional Recognition',
      description: 'Get verified, earn badges, and build your professional reputation',
      color: 'from-indigo-500 to-indigo-600',
      stats: ['Verification Badge', 'Rating System', 'Achievement Awards']
    }
  ];

  const features = [
    {
      icon: Video,
      title: 'HD Video Consultations',
      description: '4K video quality with screen sharing, recording, and multi-participant support',
      advanced: true,
      features: ['4K Quality', 'Screen Sharing', 'Call Recording', 'Group Consultations']
    },
    {
      icon: Calendar,
      title: 'AI-Powered Scheduling',
      description: 'Smart appointment management with predictive scheduling and automated reminders',
      advanced: true,
      features: ['AI Scheduling', 'Predictive Analytics', 'Automated Reminders', 'Waitlist Management']
    },
    {
      icon: FileText,
      title: 'Digital Health Records',
      description: 'Comprehensive EMR system with templates, history tracking, and interoperability',
      advanced: true,
      features: ['EMR System', 'Template Library', 'History Tracking', 'Data Export']
    },
    {
      icon: BarChart,
      title: 'Advanced Analytics',
      description: 'Real-time insights with predictive analytics, performance metrics, and growth recommendations',
      advanced: true,
      features: ['Real-time Analytics', 'Predictive Insights', 'Performance Metrics', 'Growth Recommendations']
    },
    {
      icon: MessageCircle,
      title: 'Multi-Channel Communication',
      description: 'Integrated messaging, voice notes, file sharing, and telephony services',
      advanced: true,
      features: ['Secure Messaging', 'Voice Notes', 'File Sharing', 'Telephony Integration']
    },
    {
      icon: CreditCard,
      title: 'Smart Payment System',
      description: 'Multiple payment methods, insurance integration, and automated billing with instant payouts',
      advanced: true,
      features: ['Multiple Payment Methods', 'Insurance Integration', 'Automated Billing', 'Instant Payouts']
    },
    {
      icon: Shield,
      title: 'Enterprise Security',
      description: 'Bank-level encryption, compliance management, and advanced threat protection',
      advanced: true,
      features: ['Bank Encryption', 'Compliance Management', 'Threat Protection', 'Audit Logs']
    },
    {
      icon: Users,
      title: 'Patient Management',
      description: 'Comprehensive patient CRM with segmentation, engagement tools, and loyalty programs',
      advanced: true,
      features: ['Patient CRM', 'Segmentation', 'Engagement Tools', 'Loyalty Programs']
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Ahmed',
      specialty: 'Cardiologist',
      rating: 4.9,
      image: '👩‍⚕️',
      text: 'Medigo has transformed my practice. I can now reach patients from all over Bangladesh and earn 3x more than before.',
      earnings: '+300%'
    },
    {
      name: 'Dr. Mohammad Rahman',
      specialty: 'Pediatrician',
      rating: 4.8,
      image: '👨‍⚕️',
      text: 'The platform is incredibly user-friendly. The video consultation quality is excellent and the payment system is transparent.',
      earnings: '+250%'
    },
    {
      name: 'Dr. Fatima Khan',
      specialty: 'Gynecologist',
      rating: 5.0,
      image: '👩‍⚕️',
      text: 'I love the flexibility. I can consult from home while taking care of my family. Best decision I made!',
      earnings: '+200%'
    }
  ];

  const stats = [
    { number: '5000+', label: 'Active Doctors', icon: Users },
    { number: '2M+', label: 'Patients Served', icon: Heart },
    { number: '4.9/5', label: 'Average Rating', icon: Star },
    { number: '70%', label: 'Revenue Share', icon: DollarSign }
  ];

  const steps = [
    { number: 1, title: 'Personal Information', description: 'Basic details and contact information' },
    { number: 2, title: 'Professional Details', description: 'Qualification and specialization' },
    { number: 3, title: 'Verification', description: 'BMDC verification and documents' },
    { number: 4, title: 'Setup Profile', description: 'Complete your profile and start consulting' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error for this field
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
    // Auto-save progress
    saveProgress();
  };

  const handleNestedChange = (parent, child, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [child]: value
      }
    }));
  };

  const handleAvailabilityChange = (day, timeSlot) => {
    setFormData(prev => ({
      ...prev,
      availability: {
        ...prev.availability,
        [day]: {
          ...prev.availability[day],
          [timeSlot]: !prev.availability[day][timeSlot]
        }
      }
    }));
  };

  const handleFileUpload = (fileType, file) => {
    setUploadProgress(prev => ({ ...prev, [fileType]: 0 }));
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        const newProgress = { ...prev };
        newProgress[fileType] = Math.min(newProgress[fileType] + 10, 100);
        if (newProgress[fileType] === 100) {
          clearInterval(interval);
        }
        return newProgress;
      });
    }, 200);

    setFormData(prev => ({
      ...prev,
      [fileType]: file
    }));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) errors.firstName = 'First name is required';
    if (!formData.lastName.trim()) errors.lastName = 'Last name is required';
    if (!formData.email.trim()) errors.email = 'Email is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Invalid email format';
    if (!formData.phone.trim()) errors.phone = 'Phone number is required';
    if (!formData.specialization) errors.specialization = 'Specialization is required';
    if (!formData.experience || formData.experience < 0) errors.experience = 'Valid experience is required';
    if (!formData.qualification) errors.qualification = 'Qualification is required';
    if (!formData.bmdcNumber.trim()) errors.bmdcNumber = 'BMDC number is required';
    if (!formData.bmdcRegistrationDate) errors.bmdcRegistrationDate = 'BMDC registration date is required';
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveProgress = () => {
    localStorage.setItem('doctorApplicationProgress', JSON.stringify(formData));
    setSavedProgress(true);
    setTimeout(() => setSavedProgress(false), 3000);
  };

  const loadSavedProgress = () => {
    const saved = localStorage.getItem('doctorApplicationProgress');
    if (saved) {
      setFormData(JSON.parse(saved));
    }
  };

  const nextStep = () => {
    if (validateForm()) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clear saved progress
      localStorage.removeItem('doctorApplicationProgress');
      
      setIsSubmitting(false);
      alert('Application submitted successfully! We will contact you within 24 hours.');
    } catch (error) {
      setIsSubmitting(false);
      alert('Submission failed. Please try again.');
    }
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
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">Verified Healthcare Platform</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Join as a
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                  {' '}Medical Professional
                </span>
              </h1>
              
              <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
                Transform your medical practice with Medigo. Reach millions of patients, 
                earn more, and practice medicine on your terms.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                <Link to="/join-as-doctor" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#165028] rounded-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105">
                  <Stethoscope className="w-5 h-5" />
                  Join Now
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <button className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white border border-white/30 rounded-lg font-semibold hover:bg-white/20 transition-all">
                  <Video className="w-5 h-5" />
                  Schedule Demo
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
              Why Join Medigo?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the benefits of practicing medicine on Bangladesh's leading healthcare platform
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
                <div className="p-8 rounded-2xl bg-white border border-gray-200 hover:border-[#165028] hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                    <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${benefit.color} rounded-full -translate-y-16 translate-x-16`}></div>
                  </div>
                  
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${benefit.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{benefit.description}</p>
                  
                  {/* Stats Pills */}
                  <div className="flex flex-wrap gap-2">
                    {benefit.stats.map((stat, statIndex) => (
                      <span
                        key={statIndex}
                        className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${benefit.color} text-white`}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                  
                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
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
              Professional Tools & Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Everything you need to run a successful digital medical practice
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
                className="group"
              >
                <div className="bg-white rounded-xl p-6 border border-gray-200 hover:border-[#165028] hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                  {/* Advanced Badge */}
                  {feature.advanced && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2 py-1 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-xs font-medium rounded-full">
                        Advanced
                      </span>
                    </div>
                  )}
                  
                  <div className="flex gap-4 mb-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#165028] to-[#0f3d1c] flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <feature.icon className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                  
                  {/* Feature Pills */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    {feature.features.map((feat, featIndex) => (
                      <span
                        key={featIndex}
                        className="px-3 py-1 bg-gray-100 hover:bg-[#165028] hover:text-white text-gray-700 text-xs font-medium rounded-full transition-colors duration-200"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                  
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-[#165028]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
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
              Hear from doctors who transformed their practice with Medigo
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
                className="group"
              >
                <div className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-2xl transition-all duration-500 relative overflow-hidden">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity">
                    <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-green-400 to-blue-400 rounded-full -translate-y-20 translate-x-20"></div>
                  </div>
                  
                  {/* Earnings Badge */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {testimonial.earnings}
                    </div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-5xl group-hover:scale-110 transition-transform duration-300">{testimonial.image}</div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600 font-medium">{testimonial.specialty}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-5 h-5 ${i < Math.floor(testimonial.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'} group-hover:scale-110 transition-transform duration-200`} 
                        />
                      ))}
                      <span className="text-sm text-gray-600 ml-2 font-medium">{testimonial.rating}</span>
                    </div>
                    
                    <p className="text-gray-700 mb-6 italic leading-relaxed group-hover:text-gray-800 transition-colors">"{testimonial.text}"</p>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 group-hover:text-green-600 transition-colors" />
                        <span className="text-sm font-semibold text-green-600">Verified Success</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs text-gray-500">Active</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Hover Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
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
              Start Your Journey
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Join 5000+ doctors already practicing on Medigo. Complete your application in just 4 simple steps.
            </p>
          </motion.div>

          {/* Steps */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`text-center p-6 rounded-xl ${currentStep === step.number ? 'bg-white text-[#165028]' : 'bg-white/10 text-white'}`}
              >
                <div className={`w-12 h-12 rounded-full mx-auto mb-4 flex items-center justify-center ${currentStep === step.number ? 'bg-[#165028] text-white' : 'bg-white/20'}`}>
                  {step.number}
                </div>
                <h3 className="font-bold mb-2">{step.title}</h3>
                <p className="text-sm opacity-80">{step.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Application Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Specialization</label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                  required
                >
                  <option value="">Select Specialization</option>
                  <option value="cardiology">Cardiology</option>
                  <option value="pediatrics">Pediatrics</option>
                  <option value="gynecology">Gynecology</option>
                  <option value="dermatology">Dermatology</option>
                  <option value="psychiatry">Psychiatry</option>
                  <option value="orthopedics">Orthopedics</option>
                  <option value="general-medicine">General Medicine</option>
                </select>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Years of Experience</label>
                  <input
                    type="number"
                    name="experience"
                    value={formData.experience}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">BMDC Number</label>
                  <input
                    type="text"
                    name="bmdcNumber"
                    value={formData.bmdcNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tell us about yourself</label>
                <textarea
                  name="about"
                  value={formData.about}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#165028] focus:border-transparent"
                  placeholder="Brief description of your medical practice and expertise..."
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
                {isSubmitting ? 'Submitting...' : 'Submit Application'}
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
              Ready to Transform Your Practice?
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Join thousands of doctors who are already earning more and reaching more patients with Medigo.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#165028] to-[#0f3d1c] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                <Stethoscope className="w-5 h-5" />
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

export default JoinAsDoctor;
