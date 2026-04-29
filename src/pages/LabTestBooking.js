import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import {
  FlaskConical, Calendar, Clock, MapPin, User, Phone, Mail, Home, Building,
  CreditCard, Shield, CheckCircle, AlertCircle, Info, ChevronRight, ChevronLeft,
  Plus, Minus, Star, Truck, FileText, Download, Upload, Search, Filter,
  Heart, Activity, Droplet, Bone, Brain, Eye, Ear, Baby, Stethoscope,
  Thermometer, Pill, Syringe, Microscope, TestTube, Beaker, Dna,
  ArrowLeft, Check, Loader, TrendingUp, Award, DollarSign, Wallet
} from 'lucide-react';

// Test data
const labTests = {
  'complete-blood-count': {
    id: 'complete-blood-count',
    name: 'Complete Blood Count (CBC)',
    category: 'Hematology',
    price: 500,
    originalPrice: 800,
    discount: 38,
    description: 'Comprehensive analysis of blood cells including red blood cells, white blood cells, and platelets.',
    preparation: 'No special preparation required',
    duration: '15-20 minutes',
    sampleType: 'Blood',
    fasting: 'Not required',
    homeCollection: true,
    reportTime: 'Same day',
    popular: true,
    icon: Heart,
    color: 'from-red-500 to-red-600',
    parameters: ['Hemoglobin (Hb)', 'Red Blood Cell Count (RBC)', 'White Blood Cell Count (WBC)', 'Platelet Count'],
    includes: ['Sample collection at home', 'Digital report within 24 hours', 'Doctor consultation available'],
    whyTest: ['To detect infections', 'Check for anemia', 'Monitor overall health', 'Diagnose blood disorders']
  },
  'lipid-profile': {
    id: 'lipid-profile',
    name: 'Lipid Profile',
    category: 'Cardiology',
    price: 800,
    originalPrice: 1200,
    discount: 33,
    description: 'Measures cholesterol and triglycerides in your blood to assess heart health.',
    preparation: '10-12 hours fasting required',
    duration: '15-20 minutes',
    sampleType: 'Blood',
    fasting: 'Required (10-12 hours)',
    homeCollection: true,
    reportTime: 'Same day',
    popular: true,
    icon: Heart,
    color: 'from-pink-500 to-pink-600',
    parameters: ['Total Cholesterol', 'HDL Cholesterol', 'LDL Cholesterol', 'Triglycerides'],
    includes: ['Sample collection at home', 'Digital report within 24 hours', 'Cardiologist consultation'],
    whyTest: ['Assess heart disease risk', 'Monitor cholesterol levels', 'Evaluate cardiovascular health']
  },
  'thyroid-function': {
    id: 'thyroid-function',
    name: 'Thyroid Function Test',
    category: 'Endocrinology',
    price: 900,
    originalPrice: 1400,
    discount: 36,
    description: 'Comprehensive thyroid panel to evaluate thyroid gland function and disorders.',
    preparation: 'No special preparation required',
    duration: '15-20 minutes',
    sampleType: 'Blood',
    fasting: 'Not required',
    homeCollection: true,
    reportTime: '1-2 days',
    popular: true,
    icon: Brain,
    color: 'from-blue-500 to-blue-600',
    parameters: ['T3 (Triiodothyronine)', 'T4 (Thyroxine)', 'TSH (Thyroid Stimulating Hormone)'],
    includes: ['Sample collection at home', 'Digital report within 48 hours', 'Endocrinologist consultation'],
    whyTest: ['Diagnose thyroid disorders', 'Monitor thyroid treatment', 'Check for hyper/hypothyroidism']
  }
};

const timeSlots = [
  '8:00 AM', '8:30 AM', '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM',
  '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM',
  '5:00 PM', '5:30 PM', '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'
];

export default function LabTestBooking() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    patientName: '',
    patientAge: '',
    patientGender: '',
    patientPhone: '',
    patientEmail: '',
    address: '',
    city: '',
    postalCode: '',
    preferredDate: '',
    preferredTime: '',
    collectionType: 'home',
    additionalNotes: '',
    paymentMethod: 'card',
    agreeTerms: false,
    agreePrivacy: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(0);

  useEffect(() => {
    const testData = labTests[testId];
    if (testData) {
      setTest(testData);
    }
    setLoading(false);
  }, [testId]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.patientName.trim()) newErrors.patientName = 'Name is required';
      if (!formData.patientAge) newErrors.patientAge = 'Age is required';
      if (!formData.patientGender) newErrors.patientGender = 'Gender is required';
      if (!formData.patientPhone.trim()) newErrors.patientPhone = 'Phone is required';
      if (!formData.patientEmail.trim()) newErrors.patientEmail = 'Email is required';
      if (!formData.address.trim()) newErrors.address = 'Address is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.postalCode.trim()) newErrors.postalCode = 'Postal code is required';
    }

    if (step === 2) {
      if (!formData.preferredDate) newErrors.preferredDate = 'Date is required';
      if (!formData.preferredTime) newErrors.preferredTime = 'Time is required';
    }

    if (step === 3) {
      if (!formData.paymentMethod) newErrors.paymentMethod = 'Payment method is required';
      if (!formData.agreeTerms) newErrors.agreeTerms = 'You must agree to the terms';
      if (!formData.agreePrivacy) newErrors.agreePrivacy = 'You must agree to the privacy policy';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 3000);
  };

  const calculateTotal = () => {
    let total = test ? test.price * quantity : 0;
    if (discountApplied > 0) {
      total = total * (1 - discountApplied / 100);
    }
    return total;
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === 'medigo10') {
      setDiscountApplied(10);
    } else if (promoCode.toLowerCase() === 'save20') {
      setDiscountApplied(20);
    } else {
      setDiscountApplied(0);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-[#5DBB63] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading test details...</p>
        </div>
      </div>
    );
  }

  if (!test) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Test not found</p>
          <button 
            onClick={() => navigate('/lab-tests')}
            className="mt-4 px-6 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f]"
          >
            Back to Tests
          </button>
        </div>
      </div>
    );
  }

  if (showSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#f0fdf2] to-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full mx-4"
        >
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-[#111827] mb-4">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your lab test has been successfully booked. You will receive a confirmation email shortly.
            </p>
            <div className="bg-gray-50 rounded-xl p-4 mb-6 text-left">
              <p className="font-medium text-[#111827] mb-2">Booking Details:</p>
              <p className="text-sm text-gray-600">Test: {test.name}</p>
              <p className="text-sm text-gray-600">Date: {formData.preferredDate}</p>
              <p className="text-sm text-gray-600">Time: {formData.preferredTime}</p>
              <p className="text-sm text-gray-600">Collection: {formData.collectionType === 'home' ? 'Home' : 'Center'}</p>
              <p className="text-sm text-gray-600">Total: ৳{calculateTotal().toLocaleString()}</p>
            </div>
            <div className="space-y-3">
              <button 
                onClick={() => navigate('/patient/orders')}
                className="w-full py-3 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] font-medium"
              >
                View My Orders
              </button>
              <button 
                onClick={() => navigate('/lab-tests')}
                className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium"
              >
                Book Another Test
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf2] to-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={() => navigate('/lab-tests')}
                className="p-2 rounded-lg hover:bg-gray-100"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-[#111827]">Book Lab Test</h1>
                <p className="text-gray-500 text-sm">Complete your booking in 4 easy steps</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    currentStep >= step 
                      ? 'bg-[#5DBB63] text-white' 
                      : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step ? <Check className="w-4 h-4" /> : step}
                  </div>
                  {step < 4 && (
                    <div className={`w-12 h-0.5 ${
                      currentStep > step ? 'bg-[#5DBB63]' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
            >
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-[#111827] mb-2">Patient Information</h2>
                    <p className="text-gray-600 text-sm">Please provide the patient's details</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="patientName"
                        value={formData.patientName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.patientName ? 'border-red-500' : 'border-gray-300'
                        } focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none`}
                        placeholder="Enter patient name"
                      />
                      {errors.patientName && (
                        <p className="text-red-500 text-sm mt-1">{errors.patientName}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Age *
                      </label>
                      <input
                        type="number"
                        name="patientAge"
                        value={formData.patientAge}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.patientAge ? 'border-red-500' : 'border-gray-300'
                        } focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none`}
                        placeholder="Enter age"
                      />
                      {errors.patientAge && (
                        <p className="text-red-500 text-sm mt-1">{errors.patientAge}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gender *
                      </label>
                      <select
                        name="patientGender"
                        value={formData.patientGender}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.patientGender ? 'border-red-500' : 'border-gray-300'
                        } focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none`}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.patientGender && (
                        <p className="text-red-500 text-sm mt-1">{errors.patientGender}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="patientPhone"
                        value={formData.patientPhone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.patientPhone ? 'border-red-500' : 'border-gray-300'
                        } focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none`}
                        placeholder="Enter phone number"
                      />
                      {errors.patientPhone && (
                        <p className="text-red-500 text-sm mt-1">{errors.patientPhone}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="patientEmail"
                        value={formData.patientEmail}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.patientEmail ? 'border-red-500' : 'border-gray-300'
                        } focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none`}
                        placeholder="Enter email address"
                      />
                      {errors.patientEmail && (
                        <p className="text-red-500 text-sm mt-1">{errors.patientEmail}</p>
                      )}
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
                        className={`w-full px-4 py-3 rounded-lg border ${
                          errors.city ? 'border-red-500' : 'border-gray-300'
                        } focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none`}
                        placeholder="Enter city"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.address ? 'border-red-500' : 'border-gray-300'
                      } focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none`}
                      placeholder="Enter complete address"
                    />
                    {errors.address && (
                      <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code *
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.postalCode ? 'border-red-500' : 'border-gray-300'
                      } focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none`}
                      placeholder="Enter postal code"
                    />
                    {errors.postalCode && (
                      <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 2: Schedule */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-[#111827] mb-2">Schedule Appointment</h2>
                    <p className="text-gray-600 text-sm">Choose your preferred date and time</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Collection Type *
                    </label>
                    <div className="grid md:grid-cols-2 gap-4">
                      <label className="relative">
                        <input
                          type="radio"
                          name="collectionType"
                          value="home"
                          checked={formData.collectionType === 'home'}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="p-4 rounded-lg border-2 border-gray-200 peer-checked:border-[#5DBB63] peer-checked:bg-[#5DBB63]/5 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Home className="w-5 h-5 text-[#5DBB63]" />
                            <div>
                              <p className="font-medium text-[#111827]">Home Collection</p>
                              <p className="text-sm text-gray-500">Sample collected at your home</p>
                            </div>
                          </div>
                        </div>
                      </label>

                      <label className="relative">
                        <input
                          type="radio"
                          name="collectionType"
                          value="center"
                          checked={formData.collectionType === 'center'}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="p-4 rounded-lg border-2 border-gray-200 peer-checked:border-[#5DBB63] peer-checked:bg-[#5DBB63]/5 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <Building className="w-5 h-5 text-[#5DBB63]" />
                            <div>
                              <p className="font-medium text-[#111827]">Center Visit</p>
                              <p className="text-sm text-gray-500">Visit our diagnostic center</p>
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Date *
                    </label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleInputChange}
                      min={new Date().toISOString().split('T')[0]}
                      className={`w-full px-4 py-3 rounded-lg border ${
                        errors.preferredDate ? 'border-red-500' : 'border-gray-300'
                      } focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none`}
                    />
                    {errors.preferredDate && (
                      <p className="text-red-500 text-sm mt-1">{errors.preferredDate}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Time *
                    </label>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
                      {timeSlots.map((time) => (
                        <label key={time} className="relative">
                          <input
                            type="radio"
                            name="preferredTime"
                            value={time}
                            checked={formData.preferredTime === time}
                            onChange={handleInputChange}
                            className="sr-only peer"
                          />
                          <div className="p-2 text-center rounded-lg border border-gray-200 peer-checked:border-[#5DBB63] peer-checked:bg-[#5DBB63] peer-checked:text-white cursor-pointer text-sm">
                            {time}
                          </div>
                        </label>
                      ))}
                    </div>
                    {errors.preferredTime && (
                      <p className="text-red-500 text-sm mt-1">{errors.preferredTime}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      name="additionalNotes"
                      value={formData.additionalNotes}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                      placeholder="Any special instructions or requirements"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Payment */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-[#111827] mb-2">Payment Method</h2>
                    <p className="text-gray-600 text-sm">Choose your preferred payment method</p>
                  </div>

                  <div className="space-y-3">
                    {[
                      { id: 'card', name: 'Credit/Debit Card', icon: CreditCard, description: 'Pay securely with your card' },
                      { id: 'wallet', name: 'Digital Wallet', icon: Wallet, description: 'Pay with bKash, Nagad, Rocket' },
                      { id: 'cash', name: 'Cash on Collection', icon: DollarSign, description: 'Pay when sample is collected' }
                    ].map((method) => (
                      <label key={method.id} className="relative">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={method.id}
                          checked={formData.paymentMethod === method.id}
                          onChange={handleInputChange}
                          className="sr-only peer"
                        />
                        <div className="p-4 rounded-lg border-2 border-gray-200 peer-checked:border-[#5DBB63] peer-checked:bg-[#5DBB63]/5 cursor-pointer">
                          <div className="flex items-center gap-3">
                            <method.icon className="w-5 h-5 text-[#5DBB63]" />
                            <div>
                              <p className="font-medium text-[#111827]">{method.name}</p>
                              <p className="text-sm text-gray-500">{method.description}</p>
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {errors.paymentMethod && (
                    <p className="text-red-500 text-sm">{errors.paymentMethod}</p>
                  )}

                  <div className="border-t pt-6">
                    <h3 className="font-medium text-[#111827] mb-4">Terms and Conditions</h3>
                    <div className="space-y-3">
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          name="agreeTerms"
                          checked={formData.agreeTerms}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                        <span className="text-sm text-gray-600">
                          I agree to the terms and conditions of Medigo Lab Services
                        </span>
                      </label>
                      {errors.agreeTerms && (
                        <p className="text-red-500 text-sm">{errors.agreeTerms}</p>
                      )}

                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          name="agreePrivacy"
                          checked={formData.agreePrivacy}
                          onChange={handleInputChange}
                          className="mt-1"
                        />
                        <span className="text-sm text-gray-600">
                          I consent to the privacy policy and data usage terms
                        </span>
                      </label>
                      {errors.agreePrivacy && (
                        <p className="text-red-500 text-sm">{errors.agreePrivacy}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="flex justify-between mt-8">
                <button
                  onClick={handlePrevious}
                  disabled={currentStep === 1}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                {currentStep < 3 ? (
                  <button
                    onClick={handleNext}
                    className="px-6 py-3 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] font-medium"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="px-6 py-3 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <Loader className="w-4 h-4 animate-spin" />
                        Processing...
                      </span>
                    ) : (
                      'Complete Booking'
                    )}
                  </button>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Test Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${test.color} flex items-center justify-center`}>
                  <test.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-[#111827]">{test.name}</h3>
                  <p className="text-sm text-gray-500">{test.category}</p>
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Sample Type</span>
                  <span className="font-medium">{test.sampleType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Report Time</span>
                  <span className="font-medium">{test.reportTime}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Fasting Required</span>
                  <span className="font-medium">{test.fasting}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Home Collection</span>
                  <span className="font-medium">{test.homeCollection ? 'Available' : 'Not Available'}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-500">Price per test</span>
                  <span className="text-lg font-semibold text-[#111827]">৳{test.price.toLocaleString()}</span>
                </div>
                {test.discount > 0 && (
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-500">Original price</span>
                    <span className="text-sm text-gray-400 line-through">৳{test.originalPrice.toLocaleString()}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-[#111827] mb-4">Order Summary</h3>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Test Price</span>
                  <span className="font-medium">৳{test.price.toLocaleString()}</span>
                </div>
                
                {discountApplied > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({discountApplied}%)</span>
                    <span>-৳{(test.price * discountApplied / 100).toLocaleString()}</span>
                  </div>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between">
                    <span className="font-semibold text-[#111827]">Total</span>
                    <span className="font-bold text-lg text-[#5DBB63]">৳{calculateTotal().toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    placeholder="Promo code"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                  />
                  <button
                    onClick={applyPromoCode}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm font-medium"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>

            {/* Test Info */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-semibold text-[#111827] mb-4">Test Information</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-[#111827] mb-2">Description</h4>
                  <p className="text-sm text-gray-600">{test.description}</p>
                </div>

                <div>
                  <h4 className="font-medium text-[#111827] mb-2">Preparation</h4>
                  <p className="text-sm text-gray-600">{test.preparation}</p>
                </div>

                <div>
                  <h4 className="font-medium text-[#111827] mb-2">Parameters Included</h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {test.parameters.map((param, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <CheckCircle className="w-3 h-3 text-[#5DBB63]" />
                        {param}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
