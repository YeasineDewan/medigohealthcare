import { useState, useEffect } from 'react';
import { 
  Calendar, Clock, User, Search, Filter, Plus, ChevronRight, Star, MapPin, 
  Phone, Mail, DollarSign, Award, CheckCircle, X, ArrowLeft, Video, MessageSquare,
  Stethoscope, Users, Heart, Brain, Eye, Baby, Activity, Shield
} from 'lucide-react';

const AppointmentBooking = () => {
  const [step, setStep] = useState(1); // 1: Doctor Selection, 2: Appointment Form, 3: Confirmation
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [consultationType, setConsultationType] = useState('in-person');
  const [appointmentData, setAppointmentData] = useState({
    patientName: '',
    patientEmail: '',
    patientPhone: '',
    patientAge: '',
    patientGender: '',
    reason: '',
    symptoms: '',
    medicalHistory: '',
    emergencyContact: '',
    paymentMethod: '',
    notes: ''
  });

  // Mock doctors data
  const doctors = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      specialty: 'Cardiology',
      subSpecialty: 'Interventional Cardiology',
      experience: 15,
      rating: 4.9,
      reviews: 234,
      consultationFee: 1500,
      image: '/api/placeholder/200/200',
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
      education: 'MBBS, MD (Cardiology)',
      hospital: 'City Medical Center',
      languages: ['English', 'Bengali', 'Hindi'],
      nextAvailable: 'Today, 3:00 PM',
      consultationTypes: ['in-person', 'video', 'chat'],
      achievements: ['Best Cardiologist 2023', '5000+ Successful Procedures'],
      specialties: ['Heart Disease', 'Chest Pain', 'Hypertension', 'Arrhythmia']
    },
    {
      id: 2,
      name: 'Dr. Michael Chen',
      specialty: 'Neurology',
      subSpecialty: 'Neurophysiology',
      experience: 12,
      rating: 4.8,
      reviews: 189,
      consultationFee: 1200,
      image: '/api/placeholder/200/200',
      availability: ['Tuesday', 'Wednesday', 'Friday', 'Saturday'],
      education: 'MBBS, MD (Neurology)',
      hospital: 'Neuro Care Hospital',
      languages: ['English', 'Chinese', 'Mandarin'],
      nextAvailable: 'Tomorrow, 10:00 AM',
      consultationTypes: ['in-person', 'video'],
      achievements: ['Research Excellence Award', 'Published 50+ Papers'],
      specialties: ['Headache', 'Epilepsy', 'Stroke', 'Neuropathy']
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      specialty: 'Pediatrics',
      subSpecialty: 'Neonatology',
      experience: 10,
      rating: 4.9,
      reviews: 312,
      consultationFee: 800,
      image: '/api/placeholder/200/200',
      availability: ['Monday', 'Wednesday', 'Thursday', 'Friday'],
      education: 'MBBS, MD (Pediatrics)',
      hospital: 'Children\'s Hospital',
      languages: ['English', 'Spanish', 'French'],
      nextAvailable: 'Today, 4:30 PM',
      consultationTypes: ['in-person', 'video', 'chat'],
      achievements: ['Best Pediatrician 2023', 'Child Healthcare Excellence'],
      specialties: ['Newborn Care', 'Vaccination', 'Child Development', 'Pediatric Diseases']
    },
    {
      id: 4,
      name: 'Dr. James Wilson',
      specialty: 'Orthopedics',
      subSpecialty: 'Joint Replacement',
      experience: 18,
      rating: 4.7,
      reviews: 278,
      consultationFee: 1800,
      image: '/api/placeholder/200/200',
      availability: ['Monday', 'Tuesday', 'Thursday', 'Friday'],
      education: 'MBBS, MS (Orthopedics)',
      hospital: 'Ortho Care Center',
      languages: ['English', 'German', 'French'],
      nextAvailable: 'Tomorrow, 2:00 PM',
      consultationTypes: ['in-person', 'video'],
      achievements: ['Orthopedic Excellence Award', '3000+ Joint Replacements'],
      specialties: ['Joint Pain', 'Fractures', 'Arthritis', 'Sports Injuries']
    },
    {
      id: 5,
      name: 'Dr. Lisa Anderson',
      specialty: 'Dermatology',
      subSpecialty: 'Cosmetic Dermatology',
      experience: 8,
      rating: 4.8,
      reviews: 156,
      consultationFee: 1000,
      image: '/api/placeholder/200/200',
      availability: ['Tuesday', 'Wednesday', 'Thursday', 'Saturday'],
      education: 'MBBS, MD (Dermatology)',
      hospital: 'Skin Care Clinic',
      languages: ['English', 'Italian', 'Spanish'],
      nextAvailable: 'Today, 5:00 PM',
      consultationTypes: ['in-person', 'video', 'chat'],
      achievements: ['Cosmetic Dermatology Award', 'Skin Care Expert'],
      specialties: ['Acne Treatment', 'Skin Allergies', 'Cosmetic Procedures', 'Hair Treatment']
    },
    {
      id: 6,
      name: 'Dr. Robert Taylor',
      specialty: 'General Medicine',
      subSpecialty: 'Internal Medicine',
      experience: 14,
      rating: 4.6,
      reviews: 423,
      consultationFee: 600,
      image: '/api/placeholder/200/200',
      availability: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      education: 'MBBS, MD (General Medicine)',
      hospital: 'General Hospital',
      languages: ['English', 'Bengali', 'Hindi', 'Urdu'],
      nextAvailable: 'Today, 6:00 PM',
      consultationTypes: ['in-person', 'video', 'chat'],
      achievements: ['Primary Care Excellence', 'Community Health Award'],
      specialties: ['Fever', 'Diabetes', 'Hypertension', 'General Checkup']
    }
  ];

  const specialties = ['all', 'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology', 'General Medicine'];
  const consultationTypes = [
    { value: 'in-person', label: 'In-Person', icon: User },
    { value: 'video', label: 'Video Call', icon: Video },
    { value: 'chat', label: 'Chat Consultation', icon: MessageSquare }
  ];

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '2:00 PM', '2:30 PM', '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM', '6:00 PM'
  ];

  const paymentMethods = ['Cash', 'Card', 'Mobile Banking', 'Online Payment', 'Insurance'];

  // Filter doctors based on search and specialty
  const filteredDoctors = doctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doctor.specialties.some(spec => spec.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesSpecialty = selectedSpecialty === 'all' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  // Get available dates for next 7 days
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        dayName: date.toLocaleDateString('en-US', { weekday: 'long' })
      });
    }
    return dates;
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppointmentData(prev => ({ ...prev, [name]: value }));
  };

  // Handle doctor selection
  const handleDoctorSelect = (doctor) => {
    setSelectedDoctor(doctor);
    setStep(2);
  };

  // Handle appointment submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setStep(3);
  };

  // Handle confirmation
  const handleConfirmAppointment = () => {
    console.log('Appointment confirmed:', {
      doctor: selectedDoctor,
      appointmentData,
      date: selectedDate,
      time: selectedTime,
      consultationType
    });
    alert('Appointment booked successfully!');
    // Reset form or redirect
  };

  // Render doctor selection step
  const renderDoctorSelection = () => (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Find Your Doctor</h2>
        <p className="text-gray-600">Choose from our expert doctors and book your appointment</p>
      </div>

      {/* Search and Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search doctors, specialties, or conditions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {specialties.map(specialty => (
              <button
                key={specialty}
                onClick={() => setSelectedSpecialty(specialty)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedSpecialty === specialty
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {specialty === 'all' ? 'All Specialties' : specialty}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDoctors.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-6">
              {/* Doctor Header */}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <User className="w-10 h-10 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 text-lg">{doctor.name}</h3>
                  <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                  <p className="text-sm text-gray-500">{doctor.subSpecialty}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium">{doctor.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">({doctor.reviews} reviews)</span>
                  </div>
                </div>
              </div>

              {/* Doctor Info */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Award className="w-4 h-4" />
                  <span>{doctor.experience} years experience</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{doctor.hospital}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span>৳{doctor.consultationFee}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-green-600 font-medium">{doctor.nextAvailable}</span>
                </div>
              </div>

              {/* Consultation Types */}
              <div className="flex gap-2 mb-4">
                {doctor.consultationTypes.map(type => (
                  <span key={type} className="px-2 py-1 bg-blue-50 text-blue-700 rounded-lg text-xs font-medium">
                    {type === 'in-person' ? 'In-Person' : type === 'video' ? 'Video' : 'Chat'}
                  </span>
                ))}
              </div>

              {/* Achievements */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {doctor.achievements.slice(0, 2).map((achievement, index) => (
                    <div key={index} className="flex items-center gap-1 text-xs text-gray-600">
                      <CheckCircle className="w-3 h-3 text-green-500" />
                      <span>{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Specialties */}
              <div className="mb-4">
                <div className="flex flex-wrap gap-1">
                  {doctor.specialties.slice(0, 3).map((specialty, index) => (
                    <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      {specialty}
                    </span>
                  ))}
                  {doctor.specialties.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                      +{doctor.specialties.length - 3} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleDoctorSelect(doctor)}
                className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center gap-2"
              >
                Book Appointment
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render appointment form step
  const renderAppointmentForm = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setStep(1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Book Appointment</h2>
          <p className="text-gray-600">Fill in your details to complete the booking</p>
        </div>
      </div>

      {/* Selected Doctor Card */}
      {selectedDoctor && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
              <User className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-gray-900 text-lg">{selectedDoctor.name}</h3>
              <p className="text-blue-600 font-medium">{selectedDoctor.specialty}</p>
              <p className="text-sm text-gray-500">{selectedDoctor.hospital}</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">৳{selectedDoctor.consultationFee}</p>
              <p className="text-sm text-gray-500">Consultation Fee</p>
            </div>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Consultation Type and Date/Time */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Schedule Appointment</h3>
          
          {/* Consultation Type */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Consultation Type</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {consultationTypes.map(type => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setConsultationType(type.value)}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    consultationType === type.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <type.icon className="w-6 h-6 mx-auto mb-2 text-gray-600" />
                  <p className="font-medium">{type.label}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Date Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Date</label>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
              {getAvailableDates().map(date => (
                <button
                  key={date.value}
                  type="button"
                  onClick={() => setSelectedDate(date.value)}
                  className={`p-3 rounded-lg border transition-colors ${
                    selectedDate === date.value
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-medium text-sm">{date.label}</p>
                  <p className="text-xs text-gray-500">{date.dayName}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">Select Time</label>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-2">
              {timeSlots.map(time => (
                <button
                  key={time}
                  type="button"
                  onClick={() => setSelectedTime(time)}
                  className={`p-2 rounded-lg border transition-colors ${
                    selectedTime === time
                      ? 'border-blue-500 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <p className="font-medium text-sm">{time}</p>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Patient Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Patient Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input
                type="text"
                name="patientName"
                value={appointmentData.patientName}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input
                type="email"
                name="patientEmail"
                value={appointmentData.patientEmail}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                name="patientPhone"
                value={appointmentData.patientPhone}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="+880 1XXX XXXXXX"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Age *</label>
              <input
                type="number"
                name="patientAge"
                value={appointmentData.patientAge}
                onChange={handleInputChange}
                required
                min="1"
                max="120"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Gender *</label>
              <select
                name="patientGender"
                value={appointmentData.patientGender}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
              <input
                type="tel"
                name="emergencyContact"
                value={appointmentData.emergencyContact}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                placeholder="+880 1XXX XXXXXX"
              />
            </div>
          </div>
        </div>

        {/* Medical Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Medical Information</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit *</label>
              <textarea
                name="reason"
                value={appointmentData.reason}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                placeholder="Describe your symptoms or reason for consultation..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Current Symptoms</label>
              <textarea
                name="symptoms"
                value={appointmentData.symptoms}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                placeholder="List your current symptoms..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Medical History</label>
              <textarea
                name="medicalHistory"
                value={appointmentData.medicalHistory}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                placeholder="Any previous medical conditions, surgeries, or medications..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
              <textarea
                name="notes"
                value={appointmentData.notes}
                onChange={handleInputChange}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 resize-none"
                placeholder="Any additional information you'd like to share..."
              />
            </div>
          </div>
        </div>

        {/* Payment Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="font-semibold text-gray-900 mb-4">Payment Information</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method *</label>
            <select
              name="paymentMethod"
              value={appointmentData.paymentMethod}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">Select Payment Method</option>
              {paymentMethods.map(method => (
                <option key={method} value={method}>{method}</option>
              ))}
            </select>
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-600">Consultation Fee:</span>
              <span className="font-medium">৳{selectedDoctor?.consultationFee || 0}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Amount:</span>
              <span className="text-lg font-bold text-blue-600">৳{selectedDoctor?.consultationFee || 0}</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            Continue to Confirmation
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );

  // Render confirmation step
  const renderConfirmation = () => (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Confirm Your Appointment</h2>
        <p className="text-gray-600">Please review your appointment details before confirming</p>
      </div>

      {/* Appointment Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Appointment Details</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-700 mb-2">Doctor Information</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 text-gray-500" />
                <span>{selectedDoctor?.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Stethoscope className="w-4 h-4 text-gray-500" />
                <span>{selectedDoctor?.specialty}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{selectedDoctor?.hospital}</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-700 mb-2">Schedule</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>{new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>{selectedTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-gray-500" />
                <span>{consultationType === 'in-person' ? 'In-Person' : consultationType === 'video' ? 'Video Call' : 'Chat Consultation'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Patient Information Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Patient Information</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div>
              <span className="text-gray-500">Name:</span>
              <span className="ml-2 font-medium">{appointmentData.patientName}</span>
            </div>
            <div>
              <span className="text-gray-500">Email:</span>
              <span className="ml-2 font-medium">{appointmentData.patientEmail}</span>
            </div>
            <div>
              <span className="text-gray-500">Phone:</span>
              <span className="ml-2 font-medium">{appointmentData.patientPhone}</span>
            </div>
            <div>
              <span className="text-gray-500">Age:</span>
              <span className="ml-2 font-medium">{appointmentData.patientAge}</span>
            </div>
          </div>
          
          <div className="space-y-2">
            <div>
              <span className="text-gray-500">Gender:</span>
              <span className="ml-2 font-medium">{appointmentData.patientGender}</span>
            </div>
            <div>
              <span className="text-gray-500">Emergency Contact:</span>
              <span className="ml-2 font-medium">{appointmentData.emergencyContact || 'Not provided'}</span>
            </div>
            <div>
              <span className="text-gray-500">Payment Method:</span>
              <span className="ml-2 font-medium">{appointmentData.paymentMethod}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Medical Information Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Medical Information</h3>
        
        <div className="space-y-3">
          <div>
            <span className="text-gray-500">Reason for Visit:</span>
            <p className="mt-1 text-gray-800">{appointmentData.reason}</p>
          </div>
          
          {appointmentData.symptoms && (
            <div>
              <span className="text-gray-500">Current Symptoms:</span>
              <p className="mt-1 text-gray-800">{appointmentData.symptoms}</p>
            </div>
          )}
          
          {appointmentData.medicalHistory && (
            <div>
              <span className="text-gray-500">Medical History:</span>
              <p className="mt-1 text-gray-800">{appointmentData.medicalHistory}</p>
            </div>
          )}
        </div>
      </div>

      {/* Payment Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Payment Summary</h3>
        
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Consultation Fee:</span>
            <span className="font-medium">৳{selectedDoctor?.consultationFee || 0}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Platform Fee:</span>
            <span className="font-medium">৳50</span>
          </div>
          <div className="border-t pt-2">
            <div className="flex justify-between">
              <span className="text-lg font-semibold">Total Amount:</span>
              <span className="text-lg font-bold text-blue-600">৳{(selectedDoctor?.consultationFee || 0) + 50}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setStep(2)}
          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
        >
          Back to Edit
        </button>
        <button
          onClick={handleConfirmAppointment}
          className="flex-1 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center gap-2"
        >
          <CheckCircle className="w-5 h-5" />
          Confirm Appointment
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium ${
                    step >= stepNumber
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-200 text-gray-600'
                  }`}
                >
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div
                    className={`w-16 h-1 ${
                      step > stepNumber ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-2 space-x-16">
            <span className={`text-sm ${step >= 1 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Select Doctor
            </span>
            <span className={`text-sm ${step >= 2 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Fill Details
            </span>
            <span className={`text-sm ${step >= 3 ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
              Confirm
            </span>
          </div>
        </div>

        {/* Render Current Step */}
        {step === 1 && renderDoctorSelection()}
        {step === 2 && renderAppointmentForm()}
        {step === 3 && renderConfirmation()}
      </div>
    </div>
  );
};

export default AppointmentBooking;
