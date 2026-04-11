import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search,
  Stethoscope,
  Video,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  Star,
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  XCircle,
  AlertCircle,
  Filter,
  Grid,
  List,
  Heart,
  Brain,
  Bone,
  Eye,
  Baby,
  Activity,
  FlaskConical,
  Ear,
  Smile,
  Plus,
  Minus,
  CreditCard,
  Building,
  ChevronDown,
  ChevronUp,
  RefreshCw,
  Send,
  FileText,
  Upload,
  Camera,
  X,
  Bell,
} from 'lucide-react';

const specialties = [
  { id: 'cardiology', name: 'Cardiology', icon: Heart, color: 'from-red-500 to-red-600', doctors: 12 },
  { id: 'neurology', name: 'Neurology', icon: Brain, color: 'from-purple-500 to-purple-600', doctors: 8 },
  { id: 'orthopedics', name: 'Orthopedics', icon: Bone, color: 'from-blue-500 to-blue-600', doctors: 10 },
  { id: 'ophthalmology', name: 'Ophthalmology', icon: Eye, color: 'from-green-500 to-green-600', doctors: 6 },
  { id: 'pediatrics', name: 'Pediatrics', icon: Baby, color: 'from-pink-500 to-pink-600', doctors: 15 },
  { id: 'dermatology', name: 'Dermatology', icon: Smile, color: 'from-orange-500 to-orange-600', doctors: 7 },
  { id: 'ent', name: 'ENT', icon: Ear, color: 'from-cyan-500 to-cyan-600', doctors: 5 },
  { id: 'dentistry', name: 'Dentistry', icon: User, color: 'from-white to-gray-200', doctors: 9 },
  { id: 'gynecology', name: 'Gynecology', icon: Activity, color: 'from-pink-400 to-pink-500', doctors: 11 },
  { id: 'pulmonology', name: 'Pulmonology', icon: Activity, color: 'from-indigo-500 to-indigo-600', doctors: 4 },
  { id: 'general', name: 'General Medicine', icon: Stethoscope, color: 'from-emerald-500 to-emerald-600', doctors: 20 },
  { id: 'psychiatry', name: 'Psychiatry', icon: Brain, color: 'from-violet-500 to-violet-600', doctors: 6 },
];

const doctors = [
  {
    id: 1,
    name: 'Dr. Ahmed Hassan',
    specialty: 'Cardiology',
    qualification: 'MBBS, MD (Cardiology)',
    experience: 15,
    rating: 4.9,
    reviewCount: 234,
    fees: 1500,
    available: true,
    nextAvailable: 'Today',
    image: null,
    languages: ['English', 'Bengali', 'Hindi'],
    about: 'Experienced cardiologist specializing in preventive cardiology and heart failure management.',
    education: ['MBBS - Dhaka Medical College', 'MD Cardiology - BSMMU'],
    chamber: 'Medigo Heart Center, Dhanmondi',
    hospital: ' Dhaka Medical College Hospital',
  },
  {
    id: 2,
    name: 'Dr. Fatima Rahman',
    specialty: 'Cardiology',
    qualification: 'MBBS, MD (Cardiology)',
    experience: 12,
    rating: 4.8,
    reviewCount: 189,
    fees: 1200,
    available: true,
    nextAvailable: 'Tomorrow',
    image: null,
    languages: ['English', 'Bengali'],
    about: 'Specializing in interventional cardiology and cardiac imaging.',
    education: ['MBBS - Bangabandhu Sheikh Mujib Medical University', 'MD Cardiology - NICVD'],
    chamber: 'Medigo Cardiac Center',
    hospital: 'Bangabandhu Sheikh Mujib Medical University',
  },
  {
    id: 3,
    name: 'Dr. Karim Ahmed',
    specialty: 'Dermatology',
    qualification: 'MBBS, DDV',
    experience: 10,
    rating: 4.7,
    reviewCount: 312,
    fees: 1000,
    available: true,
    nextAvailable: 'Today',
    image: null,
    languages: ['English', 'Bengali', 'Arabic'],
    about: 'Expert in skin aesthetics, laser treatments, and skin cancer screening.',
    education: ['MBBS - Dhaka Medical College', 'DDV - CMH'],
    chamber: 'Medigo Skin Care Clinic',
    hospital: 'CMH Dhaka',
  },
  {
    id: 4,
    name: 'Dr. Sarah Johnson',
    specialty: 'General Medicine',
    qualification: 'MBBS, FCPS',
    experience: 18,
    rating: 4.9,
    reviewCount: 456,
    fees: 800,
    available: true,
    nextAvailable: 'Today',
    image: null,
    languages: ['English', 'Bengali'],
    about: 'Experienced physician for comprehensive health checkups and chronic disease management.',
    education: ['MBBS - Sir Salimullah Medical College', 'FCPS - BSMMU'],
    chamber: 'Medigo General Hospital',
    hospital: 'Sir Salimullah Medical College',
  },
  {
    id: 5,
    name: 'Dr. Emily Williams',
    specialty: 'Pediatrics',
    qualification: 'MBBS, MD (Pediatrics)',
    experience: 8,
    rating: 4.8,
    reviewCount: 178,
    fees: 1100,
    available: true,
    nextAvailable: 'Today',
    image: null,
    languages: ['English', 'Bengali'],
    about: 'Dedicated pediatrician with expertise in childhood vaccinations and development.',
    education: ['MBBS - Dhaka Medical College', 'MD Pediatrics - BSMMU'],
    chamber: 'Medigo Children Hospital',
    hospital: 'Dhaka Shishu Hospital',
  },
  {
    id: 6,
    name: 'Dr. Michael Chen',
    specialty: 'Neurology',
    qualification: 'MBBS, PhD (Neurology)',
    experience: 20,
    rating: 4.9,
    reviewCount: 289,
    fees: 2000,
    available: true,
    nextAvailable: 'Tomorrow',
    image: null,
    languages: ['English', 'Chinese', 'Bengali'],
    about: 'Leading neurologist specializing in stroke, epilepsy, and movement disorders.',
    education: ['MBBS - Dhaka Medical College', 'PhD Neurology - USA'],
    chamber: 'Medigo Neuro Center',
    hospital: 'National Institute of Neurosciences',
  },
  {
    id: 7,
    name: 'Dr. Lisa Anderson',
    specialty: 'Orthopedics',
    qualification: 'MBBS, MS (Ortho)',
    experience: 14,
    rating: 4.7,
    reviewCount: 201,
    fees: 1500,
    available: true,
    nextAvailable: 'Today',
    image: null,
    languages: ['English', 'Bengali'],
    about: 'Expert in sports injuries, joint replacement, and spine surgery.',
    education: ['MBBS - Dhaka Medical College', 'MS Ortho - NITOR'],
    chamber: 'Medigo Ortho Center',
    hospital: 'National Institute of Traumatology',
  },
  {
    id: 8,
    name: 'Dr. James Wilson',
    specialty: 'Pulmonology',
    qualification: 'MBBS, MD (Pulmonology)',
    experience: 11,
    rating: 4.6,
    reviewCount: 156,
    fees: 1300,
    available: true,
    nextAvailable: 'Today',
    image: null,
    languages: ['English', 'Bengali'],
    about: 'Specializing in respiratory diseases, asthma, and COPD treatment.',
    education: ['MBBS - Dhaka Medical College', 'MD Pulmonology - NIDCH'],
    chamber: 'Medigo Respiratory Center',
    hospital: 'NIDCH',
  },
];

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
  '05:00 PM', '05:30 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM',
];

export default function PatientBook() {
  const [search, setSearch] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('rating');
  const [showFilters, setShowFilters] = useState(false);
  const [bookingStep, setBookingStep] = useState(null);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('in-person');
  const [bookingData, setBookingData] = useState({
    patientName: 'Ahmed Khan',
    patientEmail: 'ahmed.khan@email.com',
    patientPhone: '+880 123 456 7890',
    symptoms: '',
    notes: '',
    files: [],
    agreeToTerms: false,
  });
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [appointmentId, setAppointmentId] = useState(null);

  const filteredDoctors = doctors.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(search.toLowerCase()) ||
                         doc.specialty.toLowerCase().includes(search.toLowerCase());
    const matchesSpecialty = !selectedSpecialty || doc.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'fees') return a.fees - b.fees;
    if (sortBy === 'experience') return b.experience - a.experience;
    return 0;
  });

  const handleStartBooking = (doctor) => {
    setSelectedDoctor(doctor);
    setBookingStep(1);
    setSelectedDate('');
    setSelectedTime('');
  };

  const handleConfirmBooking = () => {
    const newId = Math.floor(Math.random() * 10000) + 1000;
    setAppointmentId(newId);
    setBookingConfirmed(true);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setBookingData({ ...bookingData, files: [...bookingData.files, ...files] });
  };

  const removeFile = (index) => {
    const newFiles = [...bookingData.files];
    newFiles.splice(index, 1);
    setBookingData({ ...bookingData, files: newFiles });
  };

  const generateDateOptions = () => {
    const dates = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      if (date.getDay() !== 0) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
        });
      }
    }
    return dates;
  };

  if (bookingConfirmed) {
    return (
      <div className="max-w-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Appointment Confirmed!</h2>
          <p className="text-gray-600 mb-6">Your appointment has been successfully booked.</p>
          
          <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Appointment ID</p>
                <p className="font-bold text-gray-900">#{appointmentId}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Doctor</p>
                <p className="font-bold text-gray-900">{selectedDoctor?.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-bold text-gray-900">{selectedDate}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-bold text-gray-900">{selectedTime}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Type</p>
                <p className="font-bold text-gray-900 capitalize">{appointmentType}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Consultation Fee</p>
                <p className="font-bold text-gray-900">৳{selectedDoctor?.fees}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => {
                setBookingConfirmed(false);
                setBookingStep(null);
                setSelectedDoctor(null);
              }}
              className="flex-1 px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Book Another
            </button>
            <Link
              to="/patient/appointments"
              className="flex-1 px-6 py-3 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f]"
            >
              View Appointments
            </Link>
          </div>
        </motion.div>
      </div>
    );
  }

  if (bookingStep) {
    return (
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => setBookingStep(null)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to doctors
        </button>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] rounded-full flex items-center justify-center">
                  <Stethoscope className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{selectedDoctor?.name}</h3>
                  <p className="text-gray-500">{selectedDoctor?.specialty} · {selectedDoctor?.experience} years exp.</p>
                </div>
              </div>

              {bookingStep === 1 && (
                <div className="space-y-6">
                  <h4 className="font-semibold text-gray-900">Select Date & Time</h4>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Select Date</label>
                    <select
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                    >
                      <option value="">Choose a date</option>
                      {generateDateOptions().map((date) => (
                        <option key={date.value} value={date.value}>{date.label}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Select Time Slot</label>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedTime(slot)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                            selectedTime === slot
                              ? 'bg-[#5DBB63] text-white'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Appointment Type</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => setAppointmentType('in-person')}
                        className={`p-4 rounded-xl border-2 transition-colors ${
                          appointmentType === 'in-person'
                            ? 'border-[#5DBB63] bg-[#5DBB63]/10'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <MapPin className="w-6 h-6 text-[#5DBB63] mb-2 mx-auto" />
                        <p className="font-medium text-gray-900">In-Person Visit</p>
                        <p className="text-xs text-gray-500">Visit clinic</p>
                      </button>
                      <button
                        onClick={() => setAppointmentType('video')}
                        className={`p-4 rounded-xl border-2 transition-colors ${
                          appointmentType === 'video'
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Video className="w-6 h-6 text-blue-500 mb-2 mx-auto" />
                        <p className="font-medium text-gray-900">Video Consultation</p>
                        <p className="text-xs text-gray-500">Online call</p>
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => setBookingStep(2)}
                    disabled={!selectedDate || !selectedTime}
                    className="w-full py-3 bg-[#5DBB63] text-white rounded-lg font-medium hover:bg-[#4a9a4f] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Continue
                  </button>
                </div>
              )}

              {bookingStep === 2 && (
                <div className="space-y-6">
                  <h4 className="font-semibold text-gray-900">Patient Information</h4>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Full Name</label>
                      <input
                        type="text"
                        value={bookingData.patientName}
                        onChange={(e) => setBookingData({...bookingData, patientName: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-700">Phone Number</label>
                      <input
                        type="tel"
                        value={bookingData.patientPhone}
                        onChange={(e) => setBookingData({...bookingData, patientPhone: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        value={bookingData.patientEmail}
                        onChange={(e) => setBookingData({...bookingData, patientEmail: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700">Describe your symptoms (optional)</label>
                      <textarea
                        value={bookingData.symptoms}
                        onChange={(e) => setBookingData({...bookingData, symptoms: e.target.value})}
                        rows={3}
                        placeholder="Describe your symptoms or reason for visit..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700">Additional Notes (optional)</label>
                      <textarea
                        value={bookingData.notes}
                        onChange={(e) => setBookingData({...bookingData, notes: e.target.value})}
                        rows={2}
                        placeholder="Any additional information for the doctor..."
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-medium text-gray-700">Upload Documents (optional)</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                        <input
                          type="file"
                          multiple
                          onChange={handleFileUpload}
                          className="hidden"
                          id="file-upload"
                        />
                        <label htmlFor="file-upload" className="cursor-pointer">
                          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                          <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
                        </label>
                      </div>
                      {bookingData.files.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {bookingData.files.map((file, i) => (
                            <div key={i} className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                              <FileText className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-700">{file.name}</span>
                              <button onClick={() => removeFile(i)} className="text-gray-500 hover:text-red-500">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={bookingData.agreeToTerms}
                      onChange={(e) => setBookingData({...bookingData, agreeToTerms: e.target.checked})}
                      className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded focus:ring-[#5DBB63]"
                    />
                    <label htmlFor="terms" className="text-sm text-gray-600">
                      I agree to the terms and conditions and privacy policy
                    </label>
                  </div>

                  <div className="flex gap-4">
                    <button
                      onClick={() => setBookingStep(1)}
                      className="flex-1 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleConfirmBooking}
                      disabled={!bookingData.patientName || !bookingData.patientPhone || !bookingData.agreeToTerms}
                      className="flex-1 py-3 bg-[#5DBB63] text-white rounded-lg font-medium hover:bg-[#4a9a4f] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Confirm Booking
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h4 className="font-semibold text-gray-900 mb-4">Booking Summary</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-500">Doctor</span>
                  <span className="font-medium text-gray-900">{selectedDoctor?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Specialty</span>
                  <span className="font-medium text-gray-900">{selectedDoctor?.specialty}</span>
                </div>
                {selectedDate && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Date</span>
                    <span className="font-medium text-gray-900">{selectedDate}</span>
                  </div>
                )}
                {selectedTime && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Time</span>
                    <span className="font-medium text-gray-900">{selectedTime}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium text-gray-900 capitalize">{appointmentType}</span>
                </div>
                <div className="pt-3 border-t border-gray-100">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Consultation Fee</span>
                    <span className="text-xl font-bold text-[#5DBB63]">৳{selectedDoctor?.fees}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 rounded-2xl border border-blue-100 p-4">
              <div className="flex items-start gap-3">
                <Bell className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-blue-900">Confirmation</p>
                  <p className="text-xs text-blue-700 mt-1">
                    You will receive an SMS and email confirmation after booking.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[#111827]">Book Doctor</h1>
          <p className="text-gray-500 mt-1">Schedule an appointment with our specialist doctors</p>
        </div>
        <Link
          to="/consult"
          className="flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-[#5DBB63] text-[#165028] font-medium hover:bg-[#f0fdf2]"
        >
          <Video className="w-5 h-5" />
          Video Consultation
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search by doctor name or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
          />
        </div>
        <div className="flex gap-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-3 border border-gray-200 rounded-xl focus:border-[#5DBB63] outline-none"
          >
            <option value="rating">Top Rated</option>
            <option value="experience">Most Experienced</option>
            <option value="fees">Lowest Fees</option>
          </select>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-3 border rounded-xl flex items-center gap-2 ${showFilters ? 'border-[#5DBB63] bg-[#5DBB63]/10' : 'border-gray-200'}`}
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {specialties.map((specialty) => (
          <button
            key={specialty.id}
            onClick={() => setSelectedSpecialty(selectedSpecialty === specialty.id ? null : specialty.id)}
            className={`p-4 rounded-xl border transition-all ${
              selectedSpecialty === specialty.id
                ? 'border-[#5DBB63] bg-[#5DBB63]/10'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${specialty.color} flex items-center justify-center mb-2`}>
              <specialty.icon className="w-5 h-5 text-white" />
            </div>
            <p className="font-medium text-gray-900 text-sm">{specialty.name}</p>
            <p className="text-xs text-gray-500">{specialty.doctors} doctors</p>
          </button>
        ))}
      </div>

      {showFilters && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-gray-200 p-4"
        >
          <h4 className="font-medium text-gray-900 mb-3">More Filters</h4>
          <div className="flex flex-wrap gap-4">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded" />
              <span className="text-sm text-gray-700">Available Today</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded" />
              <span className="text-sm text-gray-700">Video Consultation</span>
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" className="w-4 h-4 text-[#5DBB63] border-gray-300 rounded" />
              <span className="text-sm text-gray-700">Next Available</span>
            </label>
          </div>
        </motion.div>
      )}

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredDoctors.map((doc, index) => (
            <motion.div
              key={doc.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all overflow-hidden"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-[#5DBB63] to-[#4CAF50] rounded-full flex items-center justify-center">
                    <Stethoscope className="w-8 h-8 text-white" />
                  </div>
                  {doc.available && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full">
                      Available
                    </span>
                  )}
                </div>

                <h3 className="font-semibold text-gray-900 mb-1">{doc.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{doc.qualification}</p>
                <p className="text-sm text-gray-500 mb-3">{doc.specialty} · {doc.experience} years</p>

                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-amber-400 fill-current" />
                    <span className="text-sm font-medium text-gray-900 ml-1">{doc.rating}</span>
                  </div>
                  <span className="text-sm text-gray-500">({doc.reviewCount} reviews)</span>
                </div>

                <div className="space-y-2 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="truncate">{doc.chamber}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4" />
                    <span>Next: {doc.nextAvailable}</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-100">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-[#5DBB63]">৳{doc.fees}</span>
                      <span className="text-xs text-gray-500"> / visit</span>
                    </div>
                    <button
                      onClick={() => handleStartBooking(doc)}
                      className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg text-sm font-medium hover:bg-[#4a9a4f]"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredDoctors.length === 0 && (
        <div className="text-center py-12">
          <Stethoscope className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
          <p className="text-gray-500">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}