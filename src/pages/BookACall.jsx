import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Video, Calendar, Clock, User, Mail, Phone, MapPin, Shield, CheckCircle,
  ChevronRight, Star, Users, Stethoscope, Heart, FileText, CreditCard
} from 'lucide-react';
import { Button } from '../components/core/Button';

const consultationTypes = [
  {
    id: 'general',
    title: 'General Consultation',
    duration: '30 mins',
    price: '$29',
    description: 'For general health concerns and medical advice',
    icon: Stethoscope,
    popular: false
  },
  {
    id: 'specialist',
    title: 'Specialist Consultation',
    duration: '45 mins',
    price: '$59',
    description: 'Expert consultation with specialized doctors',
    icon: Heart,
    popular: true
  },
  {
    id: 'followup',
    title: 'Follow-up Consultation',
    duration: '20 mins',
    price: '$19',
    description: 'Follow-up on previous consultations',
    icon: FileText,
    popular: false
  }
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
];

const doctors = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    specialty: 'Family Medicine',
    rating: 4.9,
    reviewCount: 234,
    experience: '10+ years',
    available: true,
    image: null
  },
  {
    id: 2,
    name: 'Dr. Michael Chen',
    specialty: 'Internal Medicine',
    rating: 4.8,
    reviewCount: 189,
    experience: '8+ years',
    available: true,
    image: null
  },
  {
    id: 3,
    name: 'Dr. Emily Williams',
    specialty: 'Pediatrics',
    rating: 4.9,
    reviewCount: 312,
    experience: '12+ years',
    available: true,
    image: null
  }
];

export default function BookACall() {
  const [selectedType, setSelectedType] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    reason: '',
    symptoms: ''
  });
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle booking submission
    console.log('Booking submitted:', {
      consultationType: selectedType,
      doctor: selectedDoctor,
      date: selectedDate,
      time: selectedTime,
      ...formData
    });
    alert('Appointment booked successfully! You will receive a confirmation email shortly.');
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf2] to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-[#5DBB63]/20 flex items-center justify-center">
              <Video className="w-7 h-7 text-[#165028]" />
            </div>
            <h1 className="text-4xl font-bold text-[#165028]">Book a Video Call</h1>
          </div>
          <p className="text-gray-600 text-lg max-w-2xl">
            Schedule a secure video consultation with certified healthcare professionals
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between max-w-3xl mx-auto">
            {[
              { step: 1, label: 'Consultation Type' },
              { step: 2, label: 'Choose Doctor' },
              { step: 3, label: 'Schedule' },
              { step: 4, label: 'Your Details' }
            ].map((item, index) => (
              <div key={item.step} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                  currentStep >= item.step 
                    ? 'bg-[#5DBB63] border-[#5DBB63] text-white' 
                    : 'border-gray-300 text-gray-400'
                }`}>
                  {currentStep > item.step ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <span className="text-sm font-medium">{item.step}</span>
                  )}
                </div>
                <span className={`ml-3 text-sm font-medium ${
                  currentStep >= item.step ? 'text-[#165028]' : 'text-gray-400'
                }`}>
                  {item.label}
                </span>
                {index < 3 && (
                  <div className={`w-16 mx-4 h-0.5 ${
                    currentStep > item.step ? 'bg-[#5DBB63]' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Consultation Type */}
          {currentStep === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-[#165028] mb-8">Choose Consultation Type</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {consultationTypes.map((type) => (
                  <motion.div
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedType(type.id)}
                    className={`relative p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedType === type.id
                        ? 'border-[#5DBB63] bg-[#f0fdf2]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    {type.popular && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <span className="bg-[#5DBB63] text-white text-xs font-medium px-3 py-1 rounded-full">
                          Most Popular
                        </span>
                      </div>
                    )}
                    <div className="w-12 h-12 rounded-xl bg-[#f0fdf2] flex items-center justify-center mb-4">
                      <type.icon className="w-6 h-6 text-[#5DBB63]" />
                    </div>
                    <h3 className="font-semibold text-[#111827] mb-2">{type.title}</h3>
                    <p className="text-gray-500 text-sm mb-4">{type.description}</p>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm text-gray-500">{type.duration}</span>
                      <span className="text-xl font-bold text-[#165028]">{type.price}</span>
                    </div>
                    <div className={`w-full h-2 rounded-full ${
                      selectedType === type.id ? 'bg-[#5DBB63]' : 'bg-gray-200'
                    }`} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Choose Doctor */}
          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-[#165028] mb-8">Choose Your Doctor</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {doctors.map((doctor) => (
                  <motion.div
                    key={doctor.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSelectedDoctor(doctor.id)}
                    className={`p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                      selectedDoctor === doctor.id
                        ? 'border-[#5DBB63] bg-[#f0fdf2]'
                        : 'border-gray-200 bg-white hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-xl bg-[#f0fdf2] flex items-center justify-center">
                        <User className="w-8 h-8 text-[#5DBB63]" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#111827]">{doctor.name}</h3>
                        <p className="text-sm text-[#5DBB63]">{doctor.specialty}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium ml-1">{doctor.rating}</span>
                      </div>
                      <span className="text-sm text-gray-500">({doctor.reviewCount} reviews)</span>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{doctor.experience} experience</p>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        doctor.available ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <span className="text-sm text-gray-500">
                        {doctor.available ? 'Available' : 'Busy'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Schedule */}
          {currentStep === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-[#165028] mb-8">Select Date & Time</h2>
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Select Date
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Available Time Slots
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {timeSlots.map((time) => (
                      <motion.button
                        key={time}
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedTime(time)}
                        className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                          selectedTime === time
                            ? 'bg-[#5DBB63] text-white border-[#5DBB63]'
                            : 'bg-white text-gray-700 border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {time}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 4: Personal Details */}
          {currentStep === 4 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-[#165028] mb-8">Your Information</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Consultation
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Symptoms (Optional)
                  </label>
                  <textarea
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between items-center max-w-4xl mx-auto mt-12">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6"
            >
              Previous
            </Button>
            
            {currentStep < 4 ? (
              <Button
                type="button"
                onClick={nextStep}
                disabled={
                  (currentStep === 1 && !selectedType) ||
                  (currentStep === 2 && !selectedDoctor) ||
                  (currentStep === 3 && (!selectedDate || !selectedTime))
                }
                className="px-8"
              >
                Next Step
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                type="submit"
                className="px-8"
              >
                Complete Booking
                <CheckCircle className="w-4 h-4 ml-2" />
              </Button>
            )}
          </div>
        </form>

        {/* Features Section */}
        <div className="mt-20 grid md:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: 'Secure & Private', desc: 'End-to-end encryption' },
            { icon: Clock, title: 'On Time', desc: 'Doctors start on time' },
            { icon: CreditCard, title: 'Easy Payment', desc: 'Multiple payment options' },
            { icon: FileText, title: 'Digital Records', desc: 'Prescription sent digitally' }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-[#f0fdf2] flex items-center justify-center mx-auto mb-3">
                <feature.icon className="w-6 h-6 text-[#5DBB63]" />
              </div>
              <h3 className="font-semibold text-[#111827] mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
