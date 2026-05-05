import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, Calendar, Clock, Shield, CheckCircle, Search, Filter, Star, 
  Phone, MessageSquare, FileText, Users, Heart, Activity, Award, MapPin,
  DollarSign, ChevronRight, X, Plus, AlertCircle, Camera, Mic, MicOff,
  VideoOff, Monitor, Settings, Bell, User, Mail, Globe, Languages,
  Stethoscope, UserCheck, ThumbsUp, TrendingUp, Clock3, ArrowRight
} from 'lucide-react';

const specialties = [
  { id: 'cardiology', name: 'Cardiology', icon: Heart, color: 'red', doctors: 12 },
  { id: 'neurology', name: 'Neurology', icon: Activity, color: 'purple', doctors: 8 },
  { id: 'pediatrics', name: 'Pediatrics', icon: Users, color: 'blue', doctors: 15 },
  { id: 'orthopedics', name: 'Orthopedics', icon: Stethoscope, color: 'green', doctors: 10 },
  { id: 'dermatology', name: 'Dermatology', icon: User, color: 'pink', doctors: 7 },
  { id: 'psychiatry', name: 'Psychiatry', icon: Heart, color: 'indigo', doctors: 6 },
  { id: 'general', name: 'General Medicine', icon: Stethoscope, color: 'gray', doctors: 20 },
  { id: 'gynecology', name: 'Gynecology', icon: Heart, color: 'rose', doctors: 9 }
];

const availableDoctors = [
  {
    id: 1,
    name: 'Dr. Ahmed Hassan',
    specialty: 'Cardiology',
    rating: 4.9,
    reviewCount: 234,
    experience: 15,
    consultationFee: 150,
    available: true,
    nextAvailable: '2:00 PM',
    languages: ['English', 'Bangla', 'Hindi'],
    education: 'MBBS, MD (Cardiology)',
    hospital: 'Medigo Heart Institute',
    image: null,
    specializations: ['Interventional Cardiology', 'Heart Failure', 'ECG Interpretation'],
    consultationTypes: ['Video', 'Audio', 'Chat'],
    responseTime: '5 min',
    patientsTreated: 1250,
    awards: ['Best Cardiologist 2023', 'Excellence in Patient Care']
  },
  {
    id: 2,
    name: 'Dr. Fatima Khan',
    specialty: 'Pediatrics',
    rating: 4.8,
    reviewCount: 189,
    experience: 12,
    consultationFee: 120,
    available: true,
    nextAvailable: '3:30 PM',
    languages: ['English', 'Bangla'],
    education: 'MBBS, MD (Pediatrics)',
    hospital: 'Medigo Children Hospital',
    image: null,
    specializations: ['Neonatal Care', 'Vaccination', 'Child Development'],
    consultationTypes: ['Video', 'Audio', 'Chat'],
    responseTime: '8 min',
    patientsTreated: 980,
    awards: ['Top Pediatrician 2022']
  },
  {
    id: 3,
    name: 'Dr. Rahman Ali',
    specialty: 'General Medicine',
    rating: 4.7,
    reviewCount: 312,
    experience: 18,
    consultationFee: 100,
    available: true,
    nextAvailable: '4:00 PM',
    languages: ['English', 'Bangla', 'Urdu'],
    education: 'MBBS, FCPS (Medicine)',
    hospital: 'Medigo General Hospital',
    image: null,
    specializations: ['Primary Care', 'Chronic Diseases', 'Preventive Medicine'],
    consultationTypes: ['Video', 'Audio', 'Chat'],
    responseTime: '3 min',
    patientsTreated: 2100,
    awards: ['Physician Excellence Award']
  },
  {
    id: 4,
    name: 'Dr. Sarah Johnson',
    specialty: 'Dermatology',
    rating: 4.9,
    reviewCount: 156,
    experience: 10,
    consultationFee: 130,
    available: false,
    nextAvailable: 'Tomorrow 9:00 AM',
    languages: ['English', 'Bangla'],
    education: 'MBBS, MD (Dermatology)',
    hospital: 'Medigo Skin Clinic',
    image: null,
    specializations: ['Cosmetic Dermatology', 'Acne Treatment', 'Skin Cancer'],
    consultationTypes: ['Video', 'Chat'],
    responseTime: '10 min',
    patientsTreated: 750,
    awards: ['Best Dermatologist 2023']
  }
];

const consultationTypes = [
  { id: 'video', name: 'Video Consultation', icon: Video, desc: 'Face-to-face virtual consultation', duration: '15-30 min', price: 1 },
  { id: 'audio', name: 'Audio Call', icon: Phone, desc: 'Voice-only consultation', duration: '10-20 min', price: 0.8 },
  { id: 'chat', name: 'Chat Consultation', icon: MessageSquare, desc: 'Text-based consultation', duration: 'Asynchronous', price: 0.6 }
];

const timeSlots = [
  '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM'
];

export default function ConsultationPage() {
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedConsultationType, setSelectedConsultationType] = useState('video');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showVideoCallModal, setShowVideoCallModal] = useState(false);
  const [filteredDoctors, setFilteredDoctors] = useState(availableDoctors);
  const [bookingStep, setBookingStep] = useState(1);
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    symptoms: '',
    medicalHistory: ''
  });

  useEffect(() => {
    let filtered = availableDoctors;
    
    if (selectedSpecialty) {
      filtered = filtered.filter(doc => doc.specialty.toLowerCase() === selectedSpecialty.toLowerCase());
    }
    
    if (searchQuery) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setFilteredDoctors(filtered);
  }, [selectedSpecialty, searchQuery]);

  const handleBookVideoCall = (doctor) => {
    setSelectedDoctor(doctor);
    setShowBookingModal(true);
    setBookingStep(1);
  };

  const handleStartVideoCall = () => {
    setShowBookingModal(false);
    setShowVideoCallModal(true);
  };

  const getSpecialtyColor = (specialty) => {
    const specialtyData = specialties.find(s => s.name.toLowerCase() === specialty.toLowerCase());
    return specialtyData ? specialtyData.color : 'gray';
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT'
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                <Video className="w-10 h-10 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Professional Video Consultations
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Connect with certified doctors from the comfort of your home. 
              Secure, convenient, and available 24/7 with instant appointments.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">500+</div>
                <div className="text-blue-100">Expert Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">50K+</div>
                <div className="text-blue-100">Happy Patients</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">24/7</div>
                <div className="text-blue-100">Available</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold mb-1">4.9★</div>
                <div className="text-blue-100">Average Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { icon: Shield, title: 'Secure & Private', desc: 'End-to-end encrypted consultations' },
            { icon: Clock, title: 'Instant Booking', desc: 'Book appointments in seconds' },
            { icon: FileText, title: 'E-Prescriptions', desc: 'Digital prescriptions delivered instantly' },
            { icon: Globe, title: 'Multi-language', desc: 'Doctors speak your language' }
          ].map((feature, i) => (
            <div key={i} className="text-center p-6 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Consultation Types */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Choose Your Consultation Type</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {consultationTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setSelectedConsultationType(type.id)}
                className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                  selectedConsultationType === type.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    selectedConsultationType === type.id ? 'bg-blue-500' : 'bg-gray-100'
                  }`}>
                    <type.icon className={`w-6 h-6 ${selectedConsultationType === type.id ? 'text-white' : 'text-gray-600'}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{type.name}</h3>
                    <p className="text-sm text-gray-500">{type.duration}</p>
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-4">{type.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-blue-600">
                    {type.price === 1 ? 'Standard Price' : `${Math.round(type.price * 100)}% of standard`}
                  </span>
                  {selectedConsultationType === type.id && (
                    <CheckCircle className="w-5 h-5 text-blue-500" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Specialties Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Browse by Specialty</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {specialties.map((specialty) => (
              <button
                key={specialty.id}
                onClick={() => setSelectedSpecialty(specialty.id === selectedSpecialty ? null : specialty.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  selectedSpecialty === specialty.id
                    ? 'border-blue-500 bg-blue-50 shadow-lg'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                }`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className={`w-10 h-10 rounded-lg bg-${specialty.color}-100 flex items-center justify-center`}>
                    <specialty.icon className={`w-5 h-5 text-${specialty.color}-600`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{specialty.name}</h3>
                    <p className="text-xs text-gray-500">{specialty.doctors} doctors</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>
        </motion.div>

        {/* Available Doctors */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-gray-900">
              Available Doctors ({filteredDoctors.length})
            </h2>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Available Now</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                {/* Doctor Header */}
                <div className="p-6 border-b border-gray-100">
                  <div className="flex items-start gap-4">
                    <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                      {doctor.image ? (
                        <img src={doctor.image} alt={doctor.name} className="w-full h-full rounded-2xl object-cover" />
                      ) : (
                        <span className="text-2xl font-bold text-white">{doctor.name.charAt(0)}</span>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 text-lg">{doctor.name}</h3>
                      <p className="text-sm text-gray-600 mb-2">{doctor.education}</p>
                      <div className="flex items-center gap-2 mb-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium bg-${getSpecialtyColor(doctor.specialty)}-100 text-${getSpecialtyColor(doctor.specialty)}-700`}>
                          {doctor.specialty}
                        </span>
                        {doctor.available && (
                          <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                            Available
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="font-medium">{doctor.rating}</span>
                          <span>({doctor.reviewCount})</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock3 className="w-4 h-4" />
                          <span>{doctor.responseTime}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Doctor Details */}
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Consultation Fee</p>
                      <p className="text-xl font-bold text-blue-600">{formatPrice(doctor.consultationFee)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Next Available</p>
                      <p className="font-medium text-gray-900">{doctor.nextAvailable}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-2">Languages</p>
                    <div className="flex flex-wrap gap-2">
                      {doctor.languages.map((lang, i) => (
                        <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 mb-2">Specializations</p>
                    <div className="flex flex-wrap gap-2">
                      {doctor.specializations.slice(0, 2).map((spec, i) => (
                        <span key={i} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs">
                          {spec}
                        </span>
                      ))}
                      {doctor.specializations.length > 2 && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded-lg text-xs">
                          +{doctor.specializations.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span>{doctor.hospital}</span>
                  </div>

                  <div className="flex gap-3 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleBookVideoCall(doctor)}
                      className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
                    >
                      <Video className="w-4 h-4" />
                      Book Video Call
                    </button>
                    <button className="px-4 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                      <MessageSquare className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Booking Modal */}
      <AnimatePresence>
        {showBookingModal && selectedDoctor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Book Consultation</h2>
                  <button
                    onClick={() => setShowBookingModal(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                {/* Doctor Summary */}
                <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-6">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-xl font-bold text-white">{selectedDoctor.name.charAt(0)}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{selectedDoctor.name}</h3>
                    <p className="text-sm text-gray-600">{selectedDoctor.specialty}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{selectedDoctor.rating}</span>
                      <span className="text-sm text-gray-500">({selectedDoctor.reviewCount} reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">Consultation Fee</p>
                    <p className="text-xl font-bold text-blue-600">{formatPrice(selectedDoctor.consultationFee)}</p>
                  </div>
                </div>

                {/* Booking Steps */}
                <div className="space-y-6">
                  {bookingStep === 1 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">Select Consultation Type</h3>
                      <div className="space-y-3">
                        {consultationTypes.map((type) => (
                          <label key={type.id} className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-blue-300 transition-colors">
                            <input
                              type="radio"
                              name="consultationType"
                              value={type.id}
                              checked={selectedConsultationType === type.id}
                              onChange={(e) => setSelectedConsultationType(e.target.value)}
                              className="mr-3"
                            />
                            <div className="flex items-center gap-3 flex-1">
                              <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                                <type.icon className="w-5 h-5 text-blue-600" />
                              </div>
                              <div>
                                <h4 className="font-medium text-gray-900">{type.name}</h4>
                                <p className="text-sm text-gray-500">{type.desc} • {type.duration}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-blue-600">
                                {type.price === 1 ? 'Full Price' : `${Math.round(type.price * 100)}%`}
                              </p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {bookingStep === 2 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">Select Date & Time</h3>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => setSelectedDate(e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Available Time Slots</label>
                        <div className="grid grid-cols-4 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              onClick={() => setSelectedTime(time)}
                              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                selectedTime === time
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {bookingStep === 3 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">Patient Information</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                          <input
                            type="text"
                            value={patientInfo.name}
                            onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
                          <input
                            type="number"
                            value={patientInfo.age}
                            onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter your age"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                          <select
                            value={patientInfo.gender}
                            onChange={(e) => setPatientInfo({...patientInfo, gender: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                          <input
                            type="tel"
                            value={patientInfo.phone}
                            onChange={(e) => setPatientInfo({...patientInfo, phone: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter phone number"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                          <input
                            type="email"
                            value={patientInfo.email}
                            onChange={(e) => setPatientInfo({...patientInfo, email: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Enter email address"
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms / Reason for Consultation</label>
                          <textarea
                            value={patientInfo.symptoms}
                            onChange={(e) => setPatientInfo({...patientInfo, symptoms: e.target.value})}
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Describe your symptoms or reason for consultation..."
                          />
                        </div>
                        <div className="col-span-2">
                          <label className="block text-sm font-medium text-gray-700 mb-2">Medical History (Optional)</label>
                          <textarea
                            value={patientInfo.medicalHistory}
                            onChange={(e) => setPatientInfo({...patientInfo, medicalHistory: e.target.value})}
                            rows={2}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Any relevant medical history..."
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {bookingStep === 4 && (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      <h3 className="text-lg font-semibold text-gray-900">Review & Confirm</h3>
                      <div className="space-y-4">
                        <div className="p-4 bg-gray-50 rounded-xl">
                          <h4 className="font-medium text-gray-900 mb-3">Consultation Details</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Doctor:</span>
                              <span className="font-medium">{selectedDoctor.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Specialty:</span>
                              <span className="font-medium">{selectedDoctor.specialty}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Type:</span>
                              <span className="font-medium">{consultationTypes.find(t => t.id === selectedConsultationType)?.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Date:</span>
                              <span className="font-medium">{selectedDate || 'Not selected'}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Time:</span>
                              <span className="font-medium">{selectedTime || 'Not selected'}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-gray-50 rounded-xl">
                          <h4 className="font-medium text-gray-900 mb-3">Patient Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Name:</span>
                              <span className="font-medium">{patientInfo.name}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Age:</span>
                              <span className="font-medium">{patientInfo.age}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Gender:</span>
                              <span className="font-medium">{patientInfo.gender}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Phone:</span>
                              <span className="font-medium">{patientInfo.phone}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Email:</span>
                              <span className="font-medium">{patientInfo.email}</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-4 bg-blue-50 rounded-xl">
                          <div className="flex justify-between items-center">
                            <span className="text-lg font-medium text-gray-900">Total Amount:</span>
                            <span className="text-2xl font-bold text-blue-600">
                              {formatPrice(selectedDoctor.consultationFee)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="flex items-center justify-between pt-6 border-t border-gray-200 mt-6">
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4].map((step) => (
                      <div
                        key={step}
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          step <= bookingStep
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        {step}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-3">
                    {bookingStep > 1 && (
                      <button
                        onClick={() => setBookingStep(bookingStep - 1)}
                        className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                      >
                        Previous
                      </button>
                    )}
                    {bookingStep < 4 ? (
                      <button
                        onClick={() => setBookingStep(bookingStep + 1)}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
                      >
                        Next
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    ) : (
                      <button
                        onClick={handleStartVideoCall}
                        className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium flex items-center gap-2"
                      >
                        <Video className="w-4 h-4" />
                        Start Consultation
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video Call Modal */}
      <AnimatePresence>
        {showVideoCallModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50"
          >
            <div className="h-full flex flex-col">
              {/* Video Call Header */}
              <div className="bg-gray-900 text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <span className="text-lg font-bold">{selectedDoctor?.name.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">{selectedDoctor?.name}</h3>
                    <p className="text-sm text-gray-300">{selectedDoctor?.specialty}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Connected</span>
                </div>
              </div>

              {/* Video Area */}
              <div className="flex-1 bg-gray-900 relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mx-auto mb-4">
                      <User className="w-16 h-16" />
                    </div>
                    <p className="font-semibold text-xl">{selectedDoctor?.name}</p>
                    <p className="text-white/70">Doctor • Ready to consult</p>
                  </div>
                </div>

                {/* Self Video */}
                <div className="absolute top-4 right-4 w-32 h-24 bg-gray-800 rounded-lg border-2 border-white shadow-lg">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="w-full h-full rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                      <User className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Call Controls */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-4">
                  <button className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                    <Mic className="w-5 h-5" />
                  </button>
                  <button className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                    <Video className="w-5 h-5" />
                  </button>
                  <button className="p-3 rounded-full bg-gray-700 text-white hover:bg-gray-600 transition-colors">
                    <Monitor className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setShowVideoCallModal(false)}
                    className="p-3 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors"
                  >
                    <PhoneOff className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
