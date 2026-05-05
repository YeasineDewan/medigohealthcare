import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Video, VideoOff, Mic, MicOff, Phone, PhoneOff, Monitor, MonitorOff, MessageSquare,
  Users, Settings, Bell, Search, Filter, Calendar, Clock, Star, Heart, Activity,
  Stethoscope, FileText, Download, Send, Paperclip, X, Plus, Check, AlertCircle,
  ChevronRight, ChevronLeft, Camera, Share2, Volume2, Maximize2, Minimize2,
  User, Shield, Wifi, WifiOff, UserCheck, Award, TrendingUp,
  ThumbsUp, ThumbsDown, Clock3, Globe, Languages, Mail, MapPin, DollarSign,
  Eye, EyeOff, RefreshCw, Zap, Activity, Brain, Baby, Smile
} from 'lucide-react';

const VideoCallBooking = ({ doctor, onClose, onBookingComplete }) => {
  const [bookingStep, setBookingStep] = useState(1);
  const [selectedConsultationType, setSelectedConsultationType] = useState('video');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [patientInfo, setPatientInfo] = useState({
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    symptoms: '',
    medicalHistory: '',
    allergies: '',
    medications: '',
    emergencyContact: '',
    relationship: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [consultationLink, setConsultationLink] = useState('');
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const consultationTypes = [
    { 
      id: 'video', 
      name: 'Video Consultation', 
      icon: Video, 
      desc: 'Face-to-face virtual consultation', 
      duration: '15-30 min', 
      price: doctor?.consultationFee || 150,
      features: ['HD Video', 'Screen Sharing', 'Chat', 'File Sharing']
    },
    { 
      id: 'audio', 
      name: 'Audio Call', 
      icon: Phone, 
      desc: 'Voice-only consultation', 
      duration: '10-20 min', 
      price: Math.round((doctor?.consultationFee || 150) * 0.8),
      features: ['Clear Audio', 'Chat', 'File Sharing']
    },
    { 
      id: 'chat', 
      name: 'Chat Consultation', 
      icon: MessageSquare, 
      desc: 'Text-based consultation', 
      duration: 'Asynchronous', 
      price: Math.round((doctor?.consultationFee || 150) * 0.6),
      features: ['Real-time Chat', 'File Sharing', 'Prescription']
    }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM'
  ];

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: DollarSign },
    { id: 'mobile', name: 'Mobile Banking', icon: Phone },
    { id: 'wallet', name: 'Digital Wallet', icon: DollarSign }
  ];

  useEffect(() => {
    if (promoCode.toLowerCase() === 'medigo10') {
      setDiscount(10);
    } else if (promoCode.toLowerCase() === 'health20') {
      setDiscount(20);
    } else {
      setDiscount(0);
    }
  }, [promoCode]);

  const calculateTotal = () => {
    const consultation = consultationTypes.find(t => t.id === selectedConsultationType);
    const basePrice = consultation?.price || 0;
    const discountedPrice = basePrice * (1 - discount / 100);
    return discountedPrice;
  };

  const handleNext = () => {
    if (bookingStep < 5) {
      setBookingStep(bookingStep + 1);
    }
  };

  const handlePrevious = () => {
    if (bookingStep > 1) {
      setBookingStep(bookingStep - 1);
    }
  };

  const handleBookingSubmit = async () => {
    setIsProcessing(true);
    
    // Simulate booking process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Generate consultation link
    const link = `https://medigo.com/consult/${Date.now()}`;
    setConsultationLink(link);
    setBookingConfirmed(true);
    setIsProcessing(false);
    
    if (onBookingComplete) {
      onBookingComplete({
        doctor,
        consultationType: selectedConsultationType,
        date: selectedDate,
        time: selectedTime,
        patientInfo,
        consultationLink: link
      });
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT'
    }).format(price);
  };

  const validateCurrentStep = () => {
    switch (bookingStep) {
      case 1:
        return selectedConsultationType !== '';
      case 2:
        return selectedDate && selectedTime;
      case 3:
        return patientInfo.name && patientInfo.age && patientInfo.gender && 
               patientInfo.phone && patientInfo.email;
      case 4:
        return paymentMethod !== '';
      case 5:
        return true; // Review step
      default:
        return false;
    }
  };

  const getSpecialtyIcon = (specialty) => {
    const icons = {
      'Cardiology': Heart,
      'Neurology': Brain,
      'Orthopedics': Bone,
      'Pediatrics': Baby,
      'Dermatology': Smile,
      'General Medicine': Stethoscope
    };
    return icons[specialty] || Stethoscope;
  };

  if (bookingConfirmed) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-2xl max-w-md w-full p-8 text-center">
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-600 mb-6">
            Your consultation has been successfully booked. You will receive a confirmation email shortly.
          </p>
          
          <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3">Consultation Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Doctor:</span>
                <span className="font-medium">{doctor?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date:</span>
                <span className="font-medium">{selectedDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Time:</span>
                <span className="font-medium">{selectedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Type:</span>
                <span className="font-medium">
                  {consultationTypes.find(t => t.id === selectedConsultationType)?.name}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 rounded-xl p-4 mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Consultation Link</h3>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={consultationLink}
                readOnly
                className="flex-1 px-3 py-2 bg-white border border-blue-200 rounded-lg text-sm"
              />
              <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => window.open(consultationLink, '_blank')}
              className="flex-1 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-colors font-medium"
            >
              Join Consultation
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
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
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Book Consultation</h2>
              <p className="text-gray-600">Complete your booking in few simple steps</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            {[1, 2, 3, 4, 5].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                    step <= bookingStep
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {step <= bookingStep ? <Check className="w-4 h-4" /> : step}
                </div>
                {step < 5 && (
                  <div className={`w-full h-1 mx-2 transition-colors ${
                    step < bookingStep ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>Type</span>
            <span>Schedule</span>
            <span>Patient Info</span>
            <span>Payment</span>
            <span>Review</span>
          </div>
        </div>

        {/* Doctor Summary */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              {React.createElement(getSpecialtyIcon(doctor?.specialty), { className: 'w-8 h-8 text-white' })}
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900">{doctor?.name}</h3>
              <p className="text-sm text-gray-600">{doctor?.specialty}</p>
              <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="font-medium">{doctor?.rating}</span>
                </div>
                <span>•</span>
                <span>{doctor?.experience} years experience</span>
                <span>•</span>
                <span>{doctor?.hospital}</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-500">Consultation Fee</p>
              <p className="text-xl font-bold text-blue-600">
                {formatPrice(calculateTotal())}
              </p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={bookingStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              {/* Step 1: Consultation Type */}
              {bookingStep === 1 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Consultation Type</h3>
                  <div className="space-y-4">
                    {consultationTypes.map((type) => (
                      <label
                        key={type.id}
                        className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedConsultationType === type.id
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 bg-white hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <input
                            type="radio"
                            name="consultationType"
                            value={type.id}
                            checked={selectedConsultationType === type.id}
                            onChange={(e) => setSelectedConsultationType(e.target.value)}
                            className="mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                selectedConsultationType === type.id ? 'bg-blue-600' : 'bg-gray-100'
                              }`}>
                                <type.icon className={`w-6 h-6 ${
                                  selectedConsultationType === type.id ? 'text-white' : 'text-gray-600'
                                }`} />
                              </div>
                              <div>
                                <h4 className="font-semibold text-gray-900">{type.name}</h4>
                                <p className="text-sm text-gray-600">{type.desc}</p>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-500">{type.duration}</span>
                              </div>
                              <div className="text-right">
                                <p className="text-lg font-bold text-blue-600">{formatPrice(type.price)}</p>
                              </div>
                            </div>
                            <div className="flex flex-wrap gap-2 mt-3">
                              {type.features.map((feature, i) => (
                                <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-lg text-xs">
                                  {feature}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Schedule */}
              {bookingStep === 2 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Select Date & Time</h3>
                  <div className="grid md:grid-cols-2 gap-6">
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
                      <div className="grid grid-cols-3 gap-2 max-h-40 overflow-y-auto">
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
                  </div>
                  
                  {selectedDate && selectedTime && (
                    <div className="mt-4 p-4 bg-blue-50 rounded-xl">
                      <div className="flex items-center gap-2 text-blue-700">
                        <Check className="w-5 h-5" />
                        <span className="font-medium">
                          Consultation scheduled for {selectedDate} at {selectedTime}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Patient Information */}
              {bookingStep === 3 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Patient Information</h3>
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                        <input
                          type="text"
                          value={patientInfo.name}
                          onChange={(e) => setPatientInfo({...patientInfo, name: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Age *</label>
                        <input
                          type="number"
                          value={patientInfo.age}
                          onChange={(e) => setPatientInfo({...patientInfo, age: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your age"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Gender *</label>
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                        <input
                          type="tel"
                          value={patientInfo.phone}
                          onChange={(e) => setPatientInfo({...patientInfo, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter phone number"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                        <input
                          type="email"
                          value={patientInfo.email}
                          onChange={(e) => setPatientInfo({...patientInfo, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter email address"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Symptoms / Reason for Consultation</label>
                        <textarea
                          value={patientInfo.symptoms}
                          onChange={(e) => setPatientInfo({...patientInfo, symptoms: e.target.value})}
                          rows={3}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Describe your symptoms or reason for consultation..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
                        <textarea
                          value={patientInfo.medicalHistory}
                          onChange={(e) => setPatientInfo({...patientInfo, medicalHistory: e.target.value})}
                          rows={2}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Any relevant medical history, previous conditions, surgeries..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Allergies</label>
                        <input
                          type="text"
                          value={patientInfo.allergies}
                          onChange={(e) => setPatientInfo({...patientInfo, allergies: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Any known allergies (medications, food, etc.)"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Current Medications</label>
                        <textarea
                          value={patientInfo.medications}
                          onChange={(e) => setPatientInfo({...patientInfo, medications: e.target.value})}
                          rows={2}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="List any current medications you're taking..."
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact Name</label>
                        <input
                          type="text"
                          value={patientInfo.emergencyContact}
                          onChange={(e) => setPatientInfo({...patientInfo, emergencyContact: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Emergency contact name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                        <input
                          type="text"
                          value={patientInfo.relationship}
                          onChange={(e) => setPatientInfo({...patientInfo, relationship: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Relationship to patient"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Payment */}
              {bookingStep === 4 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h3>
                  
                  <div className="space-y-6">
                    {/* Promo Code */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Promo Code (Optional)</label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter promo code"
                        />
                        <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium">
                          Apply
                        </button>
                      </div>
                      {discount > 0 && (
                        <div className="mt-2 p-2 bg-green-50 text-green-700 rounded-lg text-sm">
                          Promo code applied! You saved {discount}%
                        </div>
                      )}
                    </div>

                    {/* Payment Method */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                      <div className="grid md:grid-cols-3 gap-4">
                        {paymentMethods.map((method) => (
                          <label
                            key={method.id}
                            className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${
                              paymentMethod === method.id
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="radio"
                                name="paymentMethod"
                                value={method.id}
                                checked={paymentMethod === method.id}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                              />
                              <method.icon className="w-6 h-6 text-gray-600" />
                              <span className="font-medium">{method.name}</span>
                            </div>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Card Payment Form */}
                    {paymentMethod === 'card' && (
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                          <input
                            type="text"
                            value={cardInfo.number}
                            onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                            <input
                              type="text"
                              value={cardInfo.expiry}
                              onChange={(e) => setCardInfo({...cardInfo, expiry: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="MM/YY"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                            <input
                              type="text"
                              value={cardInfo.cvv}
                              onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              placeholder="123"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card</label>
                          <input
                            type="text"
                            value={cardInfo.name}
                            onChange={(e) => setCardInfo({...cardInfo, name: e.target.value})}
                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>
                    )}

                    {/* Price Summary */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Price Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Consultation Fee:</span>
                          <span className="font-medium">
                            {formatPrice(consultationTypes.find(t => t.id === selectedConsultationType)?.price || 0)}
                          </span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount ({discount}%):</span>
                            <span className="font-medium">
                              -{formatPrice((consultationTypes.find(t => t.id === selectedConsultationType)?.price || 0) * (discount / 100))}
                            </span>
                          </div>
                        )}
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between">
                            <span className="font-semibold text-gray-900">Total Amount:</span>
                            <span className="text-xl font-bold text-blue-600">{formatPrice(calculateTotal())}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 5: Review */}
              {bookingStep === 5 && (
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Review & Confirm</h3>
                  
                  <div className="space-y-6">
                    {/* Consultation Details */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Consultation Details</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Doctor:</span>
                            <span className="font-medium">{doctor?.name}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Specialty:</span>
                            <span className="font-medium">{doctor?.specialty}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Type:</span>
                            <span className="font-medium">
                              {consultationTypes.find(t => t.id === selectedConsultationType)?.name}
                            </span>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Date:</span>
                            <span className="font-medium">{selectedDate}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Time:</span>
                            <span className="font-medium">{selectedTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Duration:</span>
                            <span className="font-medium">
                              {consultationTypes.find(t => t.id === selectedConsultationType)?.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Patient Information */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Patient Information</h4>
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div className="space-y-2">
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
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Phone:</span>
                            <span className="font-medium">{patientInfo.phone}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Email:</span>
                            <span className="font-medium">{patientInfo.email}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Emergency Contact:</span>
                            <span className="font-medium">{patientInfo.emergencyContact}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Medical Information */}
                    <div className="bg-gray-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Medical Information</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-600">Symptoms: </span>
                          <span className="font-medium">{patientInfo.symptoms || 'Not specified'}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Medical History: </span>
                          <span className="font-medium">{patientInfo.medicalHistory || 'Not specified'}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Allergies: </span>
                          <span className="font-medium">{patientInfo.allergies || 'None specified'}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Current Medications: </span>
                          <span className="font-medium">{patientInfo.medications || 'None specified'}</span>
                        </div>
                      </div>
                    </div>

                    {/* Payment Summary */}
                    <div className="bg-blue-50 rounded-xl p-4">
                      <h4 className="font-semibold text-gray-900 mb-3">Payment Summary</h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Consultation Fee:</span>
                          <span className="font-medium">
                            {formatPrice(consultationTypes.find(t => t.id === selectedConsultationType)?.price || 0)}
                          </span>
                        </div>
                        {discount > 0 && (
                          <div className="flex justify-between text-green-600">
                            <span>Discount ({discount}%):</span>
                            <span className="font-medium">
                              -{formatPrice((consultationTypes.find(t => t.id === selectedConsultationType)?.price || 0) * (discount / 100))}
                            </span>
                          </div>
                        )}
                        <div className="border-t pt-2 mt-2">
                          <div className="flex justify-between">
                            <span className="font-semibold text-gray-900">Total Amount:</span>
                            <span className="text-xl font-bold text-blue-600">{formatPrice(calculateTotal())}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Terms and Conditions */}
                    <div className="bg-yellow-50 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                        <div className="text-sm text-gray-700">
                          <p className="font-medium mb-1">Important Information</p>
                          <ul className="space-y-1 text-gray-600">
                            <li>• Please be available 5 minutes before the scheduled time</li>
                            <li>• Ensure you have a stable internet connection</li>
                            <li>• Have your medical documents ready if needed</li>
                            <li>• Cancellation policy applies for late cancellations</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200">
          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={bookingStep === 1}
              className="px-6 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
            
            <div className="flex items-center gap-4">
              {bookingStep < 5 ? (
                <button
                  onClick={handleNext}
                  disabled={!validateCurrentStep()}
                  className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleBookingSubmit}
                  disabled={isProcessing}
                  className="px-8 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="w-4 h-4" />
                      Confirm Booking
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default VideoCallBooking;
