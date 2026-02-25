import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Video, Calendar, Clock, User, Mail, Phone, MapPin, Shield, CheckCircle,
  ChevronRight, Star, ArrowLeft, CreditCard, Lock, FileText, Heart
} from 'lucide-react';
import { Button } from '../components/core/Button';
import AppointmentConfirmationModal from '../components/modals/AppointmentConfirmationModal';

// Mock doctor data (in real app, this would come from API)
const doctors = {
  1: { 
    id: 1, 
    name: 'Dr. Ahmed Hassan', 
    specialty: 'Cardiology', 
    rating: 4.9, 
    reviewCount: 234, 
    videoCallPrice: 49,
    experience: '10+ years',
    available: true
  },
  2: { 
    id: 2, 
    name: 'Dr. Fatima Khan', 
    specialty: 'Pediatrics', 
    rating: 4.8, 
    reviewCount: 189, 
    videoCallPrice: 39,
    experience: '8+ years',
    available: true
  },
  3: { 
    id: 3, 
    name: 'Dr. Rahman Ali', 
    specialty: 'General Medicine', 
    rating: 4.7, 
    reviewCount: 312, 
    videoCallPrice: 35,
    experience: '12+ years',
    available: true
  }
};

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM'
];

export default function BookAppointment() {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [appointmentData, setAppointmentData] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    reason: '',
    symptoms: '',
    medicalHistory: '',
    allergies: '',
    medications: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    // Load doctor data
    const doctorData = doctors[doctorId];
    if (doctorData) {
      setDoctor(doctorData);
    } else {
      navigate('/consult');
    }
  }, [doctorId, navigate]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleScheduleSubmit = (e) => {
    e.preventDefault();
    if (selectedDate && selectedTime) {
      setCurrentStep(2);
    }
  };

  const handleDetailsSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(3);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    
    // Generate appointment ID
    const appointmentId = 'APT' + Date.now().toString().slice(-8);
    
    // Create appointment data
    const newAppointmentData = {
      id: appointmentId,
      patientName: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      phone: formData.phone,
      date: selectedDate,
      time: selectedTime,
      paymentMethod: paymentMethod,
      doctorId: doctor.id,
      reason: formData.reason,
      symptoms: formData.symptoms,
      createdAt: new Date().toISOString()
    };
    
    setAppointmentData(newAppointmentData);
    setShowConfirmationModal(true);
    
    // In a real app, this would:
    // 1. Process payment with payment gateway
    // 2. Save appointment to database
    // 3. Send confirmation email to patient
    // 4. Send notification to doctor
    // 5. Send notification to admin panel
    // 6. Schedule meeting link generation
  };

  const handleCloseModal = () => {
    setShowConfirmationModal(false);
    navigate('/consult');
  };

  if (!doctor) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5DBB63] mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading doctor information...</p>
      </div>
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf2] to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => navigate('/consult')}
                className="p-2"
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-[#165028]">Book Video Consultation</h1>
                <p className="text-gray-600">Schedule your appointment with {doctor.name}</p>
              </div>
            </div>
            
            {/* Doctor Summary Card */}
            <div className="hidden lg:flex items-center gap-4 bg-[#f0fdf2] px-6 py-3 rounded-xl">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5DBB63] to-[#4a9a4f] flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="font-semibold text-[#111827]">{doctor.name}</p>
                <p className="text-sm text-[#5DBB63]">{doctor.specialty}</p>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1">
                  <span className="text-xl font-bold text-[#165028]">${doctor.videoCallPrice}</span>
                </div>
                <p className="text-xs text-gray-500">30 min session</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between max-w-2xl mx-auto">
            {[
              { step: 1, label: 'Schedule' },
              { step: 2, label: 'Your Details' },
              { step: 3, label: 'Payment' }
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
                {index < 2 && (
                  <div className={`w-20 mx-4 h-0.5 ${
                    currentStep > item.step ? 'bg-[#5DBB63]' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Step 1: Schedule */}
        {currentStep === 1 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8"
          >
            <h2 className="text-2xl font-bold text-[#165028] mb-6">Select Date & Time</h2>
            
            <form onSubmit={handleScheduleSubmit} className="space-y-8">
              {/* Date Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Calendar className="w-4 h-4 inline mr-2" />
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

              {/* Time Slots */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  <Clock className="w-4 h-4 inline mr-2" />
                  Available Time Slots
                </label>
                <div className="grid grid-cols-4 gap-3">
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

              <div className="flex justify-end">
                <Button
                  type="submit"
                  disabled={!selectedDate || !selectedTime}
                  className="px-8"
                >
                  Continue to Details
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}

        {/* Step 2: Patient Details */}
        {currentStep === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Patient Information */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-[#165028] mb-6">Patient Information</h2>
              
              <form onSubmit={handleDetailsSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      First Name <span className="text-red-500">*</span>
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
                      Last Name <span className="text-red-500">*</span>
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
                      Email Address <span className="text-red-500">*</span>
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
                      Phone Number <span className="text-red-500">*</span>
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
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reason for Consultation <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="reason"
                    value={formData.reason}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    placeholder="Please describe why you need this consultation..."
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Symptoms
                  </label>
                  <textarea
                    name="symptoms"
                    value={formData.symptoms}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    placeholder="Describe any symptoms you're experiencing..."
                  />
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button type="submit">
                    Continue to Payment
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </form>
            </div>

            {/* Medical History */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h3 className="text-lg font-semibold text-[#165028] mb-4 flex items-center gap-2">
                <FileText className="w-5 h-5" />
                Medical History (Optional)
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Medical Conditions
                  </label>
                  <textarea
                    name="medicalHistory"
                    value={formData.medicalHistory}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    placeholder="Any existing medical conditions..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Allergies
                  </label>
                  <textarea
                    name="allergies"
                    value={formData.allergies}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    placeholder="Any known allergies..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Medications
                  </label>
                  <textarea
                    name="medications"
                    value={formData.medications}
                    onChange={handleInputChange}
                    rows={2}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    placeholder="Any medications you're currently taking..."
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 3: Payment */}
        {currentStep === 3 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            {/* Order Summary */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-[#165028] mb-6">Order Summary</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#f0fdf2] rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#5DBB63] to-[#4a9a4f] flex items-center justify-center">
                      <Video className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-[#111827]">Video Consultation</p>
                      <p className="text-sm text-gray-600">with {doctor.name}</p>
                      <p className="text-xs text-[#5DBB63]">{doctor.specialty}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-[#165028]">${doctor.videoCallPrice}</p>
                    <p className="text-xs text-gray-500">30 minutes</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Consultation Fee</span>
                    <span>${doctor.videoCallPrice}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Platform Fee</span>
                    <span>$2</span>
                  </div>
                  <div className="flex justify-between font-semibold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span className="text-[#165028]">${doctor.videoCallPrice + 2}</span>
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">Appointment Details</p>
                      <p className="text-sm text-blue-700">
                        {selectedDate} at {selectedTime}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
              <h2 className="text-2xl font-bold text-[#165028] mb-6">Payment Method</h2>
              
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    { id: 'card', label: 'Credit/Debit Card', icon: CreditCard },
                    { id: 'paypal', label: 'PayPal', icon: Shield },
                    { id: 'bank', label: 'Bank Transfer', icon: FileText }
                  ].map((method) => (
                    <motion.button
                      key={method.id}
                      type="button"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        paymentMethod === method.id
                          ? 'border-[#5DBB63] bg-[#f0fdf2]'
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}
                    >
                      <method.icon className="w-6 h-6 mx-auto mb-2 text-[#165028]" />
                      <p className="text-sm font-medium">{method.label}</p>
                    </motion.button>
                  ))}
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Expiry Date
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <Lock className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Secure Payment</p>
                      <p className="text-sm text-gray-600">
                        Your payment information is encrypted and secure. We never store your card details.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(2)}
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back
                  </Button>
                  <Button type="submit" className="px-8">
                    <Lock className="w-4 h-4 mr-2" />
                    Complete Payment - ${doctor.videoCallPrice + 2}
                  </Button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </div>

      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Shield, title: 'Secure Payment', desc: '256-bit SSL encryption' },
            { icon: Heart, title: 'Qualified Doctors', desc: 'Verified professionals' },
            { icon: Clock, title: 'On Time', desc: 'Punctual appointments' },
            { icon: CheckCircle, title: 'Satisfaction Guaranteed', desc: 'Or your money back' }
          ].map((badge, index) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-[#f0fdf2] flex items-center justify-center mx-auto mb-3">
                <badge.icon className="w-6 h-6 text-[#5DBB63]" />
              </div>
              <h3 className="font-semibold text-[#111827] mb-1">{badge.title}</h3>
              <p className="text-sm text-gray-500">{badge.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Appointment Confirmation Modal */}
      <AppointmentConfirmationModal
        isOpen={showConfirmationModal}
        onClose={handleCloseModal}
        appointmentData={appointmentData}
        doctorData={doctor}
      />
    </div>
  );
}
