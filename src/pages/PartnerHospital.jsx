import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, Users, MapPin, Phone, Mail, Globe, Award, Shield,
  TrendingUp, Clock, CheckCircle, Star, Heart, Stethoscope,
  FileText, Upload, ChevronRight, ArrowRight, Calendar,
  DollarSign, Activity, Target, Zap, Headphones, BarChart, X, Check,
  Sparkles, Trophy
} from 'lucide-react';

export default function PartnerHospital() {
  const [formData, setFormData] = useState({
    hospitalName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    website: '',
    establishedYear: '',
    bedCapacity: '',
    specialties: [],
    accreditation: '',
    emergencyServices: false,
    ambulanceServices: false,
    pharmacyAvailable: false,
    labServices: false,
    description: '',
    terms: false
  });

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSpecialtyChange = (specialty) => {
    setFormData(prev => ({
      ...prev,
      specialties: prev.specialties.includes(specialty)
        ? prev.specialties.filter(s => s !== specialty)
        : [...prev.specialties, specialty]
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setShowSuccessModal(true);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const specialties = [
    'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics',
    'Dermatology', 'Psychiatry', 'Gynecology', 'Oncology',
    'General Medicine', 'Surgery', 'Radiology', 'Anesthesiology',
    'Emergency Medicine', 'ICU', 'Maternity', 'Dental'
  ];

  const benefits = [
    { 
      icon: Users, 
      title: '10M+ Patient Reach', 
      desc: 'Connect with millions of patients seeking healthcare',
      color: 'bg-blue-100 text-blue-600'
    },
    { 
      icon: TrendingUp, 
      title: 'Increased Revenue', 
      desc: 'Boost hospital revenue by 40% with digital presence',
      color: 'bg-green-100 text-green-600'
    },
    { 
      icon: Shield, 
      title: 'Brand Recognition', 
      desc: 'Enhance your hospital\'s reputation and trust',
      color: 'bg-purple-100 text-purple-600'
    },
    { 
      icon: BarChart, 
      title: 'Analytics Dashboard', 
      desc: 'Track performance with advanced analytics',
      color: 'bg-orange-100 text-orange-600'
    },
    { 
      icon: Zap, 
      title: 'Quick Integration', 
      desc: 'Seamless onboarding in just 48 hours',
      color: 'bg-yellow-100 text-yellow-600'
    },
    { 
      icon: Headphones, 
      title: '24/7 Support', 
      desc: 'Dedicated support team for your hospital',
      color: 'bg-red-100 text-red-600'
    }
  ];

  const stats = [
    { number: '500+', label: 'Partner Hospitals' },
    { number: '10M+', label: 'Patients Served' },
    { number: '98%', label: 'Satisfaction Rate' },
    { number: '24/7', label: 'Support Available' }
  ];

  const testimonials = [
    {
      name: 'Dr. Sarah Johnson',
      role: 'Medical Director',
      hospital: 'City General Hospital',
      content: 'Partnering with Medigo transformed our patient acquisition. We saw a 60% increase in appointments within the first 3 months.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      role: 'CEO',
      hospital: 'Sunshine Medical Center',
      content: 'The platform is incredibly user-friendly and the support team is exceptional. Best decision we made for our hospital.',
      rating: 5
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Hospital Administrator',
      hospital: 'Riverside Healthcare',
      content: 'Medigo helped us reach patients we never could before. The ROI has been outstanding.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto px-4 py-20 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full backdrop-blur-sm">
                <Building className="w-16 h-16" />
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6">Partner with Medigo</h1>
            <p className="text-xl mb-8 text-blue-50">
              Join the leading healthcare platform and transform your hospital's digital presence. 
              Reach millions of patients and grow your practice exponentially.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/20 backdrop-blur-sm rounded-lg px-6 py-3">
                  <span className="font-bold text-2xl">{stat.number}</span>
                  <span className="block text-sm">{stat.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Partner with Medigo?</h2>
            <p className="text-xl text-gray-600">Discover the advantages of joining our healthcare network</p>
          </motion.div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                <div className={`w-14 h-14 ${benefit.color} rounded-lg flex items-center justify-center mb-4`}>
                  <benefit.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600">Hear from our hospital partners</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.content}"</p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-gray-800">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                  <p className="text-sm text-blue-600">{testimonial.hospital}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Start Your Partnership Journey</h2>
              <p className="text-xl text-gray-600">Complete your hospital registration in 3 simple steps</p>
            </motion.div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="relative">
                {/* Progress Line Background */}
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
                
                {/* Progress Line Fill */}
                <div 
                  className="absolute top-1/2 left-0 h-1 bg-blue-600 -translate-y-1/2 transition-all duration-500 ease-out"
                  style={{ 
                    width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` 
                  }}
                ></div>
                
                {/* Step Indicators */}
                <div className="relative flex justify-between">
                  {[...Array(totalSteps)].map((_, index) => {
                    const stepNumber = index + 1;
                    const isCompleted = currentStep > stepNumber;
                    const isCurrent = currentStep === stepNumber;
                    
                    return (
                      <div key={index} className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                            isCompleted
                              ? 'bg-blue-600 text-white shadow-md'
                              : isCurrent
                              ? 'bg-blue-600 text-white shadow-md ring-2 ring-blue-200'
                              : 'bg-white border-2 border-gray-300 text-gray-600'
                          }`}
                        >
                          {isCompleted ? (
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          ) : (
                            stepNumber
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Step Labels */}
              <div className="flex justify-between mt-6">
                <span className={`text-xs font-medium text-center transition-colors duration-300 ${
                  currentStep >= 1 ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  Basic Information
                </span>
                <span className={`text-xs font-medium text-center transition-colors duration-300 ${
                  currentStep >= 2 ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  Services & Facilities
                </span>
                <span className={`text-xs font-medium text-center transition-colors duration-300 ${
                  currentStep >= 3 ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  Review & Submit
                </span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-50 rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">Hospital Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hospital Name *
                      </label>
                      <div className="relative">
                        <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="hospitalName"
                          value={formData.hospitalName}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="City General Hospital"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Person *
                      </label>
                      <div className="relative">
                        <Users className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="contactPerson"
                          value={formData.contactPerson}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="Dr. John Smith"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="admin@hospital.com"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="+1 (555) 123-4567"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Website
                      </label>
                      <div className="relative">
                        <Globe className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="url"
                          name="website"
                          value={formData.website}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="https://www.hospital.com"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Established Year *
                      </label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          name="establishedYear"
                          value={formData.establishedYear}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="1990"
                          min="1800"
                          max={new Date().getFullYear()}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Bed Capacity *
                      </label>
                      <div className="relative">
                        <Activity className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="number"
                          name="bedCapacity"
                          value={formData.bedCapacity}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="250"
                          min="1"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Accreditation
                      </label>
                      <div className="relative">
                        <Award className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="accreditation"
                          value={formData.accreditation}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="NABH, JCI, ISO"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Address *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          placeholder="123 Medical Center Drive"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City *
                      </label>
                      <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="New York"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        State *
                      </label>
                      <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="NY"
                        required
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Services & Facilities */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-50 rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">Services & Facilities</h3>
                  
                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Medical Specialties *
                    </label>
                    <div className="grid md:grid-cols-3 gap-3">
                      {specialties.map((specialty) => (
                        <label
                          key={specialty}
                          className="flex items-center p-3 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={formData.specialties.includes(specialty)}
                            onChange={() => handleSpecialtyChange(specialty)}
                            className="mr-3 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm font-medium">{specialty}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-700 mb-4">
                      Available Services
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                        <input
                          type="checkbox"
                          name="emergencyServices"
                          checked={formData.emergencyServices}
                          onChange={handleInputChange}
                          className="mr-3 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <span className="font-medium">Emergency Services</span>
                          <p className="text-sm text-gray-600">24/7 emergency care</p>
                        </div>
                      </label>
                      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                        <input
                          type="checkbox"
                          name="ambulanceServices"
                          checked={formData.ambulanceServices}
                          onChange={handleInputChange}
                          className="mr-3 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <span className="font-medium">Ambulance Services</span>
                          <p className="text-sm text-gray-600">Round-the-clock ambulance</p>
                        </div>
                      </label>
                      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                        <input
                          type="checkbox"
                          name="pharmacyAvailable"
                          checked={formData.pharmacyAvailable}
                          onChange={handleInputChange}
                          className="mr-3 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <span className="font-medium">Pharmacy</span>
                          <p className="text-sm text-gray-600">In-house pharmacy services</p>
                        </div>
                      </label>
                      <label className="flex items-center p-4 border rounded-lg cursor-pointer hover:bg-blue-50 transition-colors">
                        <input
                          type="checkbox"
                          name="labServices"
                          checked={formData.labServices}
                          onChange={handleInputChange}
                          className="mr-3 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <span className="font-medium">Laboratory Services</span>
                          <p className="text-sm text-gray-600">Comprehensive lab testing</p>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hospital Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Tell us about your hospital, mission, and what makes you unique..."
                    />
                  </div>
                </motion.div>
              )}

              {/* Step 3: Review & Submit */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-50 rounded-2xl p-8"
                >
                  <h3 className="text-2xl font-semibold text-gray-800 mb-6">Review Your Information</h3>
                  <div className="bg-white rounded-lg p-6 space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <span className="text-sm text-gray-500">Hospital Name:</span>
                        <p className="font-semibold">{formData.hospitalName}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Contact Person:</span>
                        <p className="font-semibold">{formData.contactPerson}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Email:</span>
                        <p className="font-semibold">{formData.email}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Phone:</span>
                        <p className="font-semibold">{formData.phone}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Bed Capacity:</span>
                        <p className="font-semibold">{formData.bedCapacity} beds</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-500">Established:</span>
                        <p className="font-semibold">{formData.establishedYear}</p>
                      </div>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Specialties:</span>
                      <p className="font-semibold">{formData.specialties.join(', ') || 'None selected'}</p>
                    </div>
                    <div>
                      <span className="text-sm text-gray-500">Address:</span>
                      <p className="font-semibold">
                        {formData.address}, {formData.city}, {formData.state}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-800">
                      By submitting this form, you agree to our partnership terms and conditions. 
                      Our team will review your application and contact you within 48 hours.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
                    currentStep === 1
                      ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  Previous
                </button>
                
                {currentStep < totalSteps ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    Next Step
                    <ArrowRight className="w-5 h-5" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                  >
                    Submit Application
                    <CheckCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
            <p className="text-xl text-gray-600">Everything you need to know about hospital partnership</p>
          </motion.div>
          
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                q: "How long does the onboarding process take?",
                a: "Typically 48-72 hours. We'll verify your credentials and set up your profile quickly."
              },
              {
                q: "What are the partnership fees?",
                a: "We offer flexible models including commission-based and subscription plans. Contact us for customized pricing."
              },
              {
                q: "Can we customize our hospital profile?",
                a: "Yes, you can showcase your facilities, doctors, services, and unique features."
              },
              {
                q: "How do we receive appointments?",
                a: "Appointments are sent to your dashboard in real-time. You can manage them through our admin panel."
              },
              {
                q: "Is training provided for our staff?",
                a: "Yes, we provide comprehensive training and ongoing support for your hospital staff."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-sm"
              >
                <h4 className="font-semibold text-gray-800 mb-2">{faq.q}</h4>
                <p className="text-gray-600">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="bg-white rounded-2xl max-w-md w-full p-8 text-center relative"
          >
            {/* Close Button */}
            <button
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Success Icon */}
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="text-blue-600"
              >
                <Trophy className="w-10 h-10" />
              </motion.div>
            </div>

            {/* Success Message */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-2xl font-bold text-gray-800 mb-4"
            >
              Congratulations!
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-gray-600 mb-6"
            >
              Your partnership application has been successfully submitted! Our team will review your hospital details and contact you within 48 hours.
            </motion.p>

            {/* Success Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-blue-50 rounded-lg p-4 mb-6 text-left"
            >
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Application Received</span>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Check className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Verification Process Started</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-800">Partnership Team Notified</span>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex gap-3"
            >
              <button
                onClick={() => setShowSuccessModal(false)}
                className="flex-1 px-4 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                Continue
              </button>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  // Reset form
                  setFormData({
                    hospitalName: '',
                    contactPerson: '',
                    email: '',
                    phone: '',
                    address: '',
                    city: '',
                    state: '',
                    zipCode: '',
                    website: '',
                    establishedYear: '',
                    bedCapacity: '',
                    specialties: [],
                    accreditation: '',
                    emergencyServices: false,
                    ambulanceServices: false,
                    pharmacyAvailable: false,
                    labServices: false,
                    description: '',
                    terms: false
                  });
                  setCurrentStep(1);
                }}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                New Application
              </button>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-yellow-400" />
            </div>
            <div className="absolute -bottom-2 -left-2">
              <Sparkles className="w-6 h-6 text-blue-400" />
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
