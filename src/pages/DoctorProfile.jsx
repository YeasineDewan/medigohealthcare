import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Star, 
  MapPin, 
  Clock, 
  Phone, 
  Mail, 
  Calendar,
  Award,
  Languages,
  Stethoscope,
  Heart,
  ArrowLeft,
  CheckCircle,
  Users,
  DollarSign,
  Shield,
  Activity
} from 'lucide-react';
import { Button } from '../components/core/Button';

// Mock doctor data - in a real app, this would come from an API
const doctorsData = {
  1: {
    id: 1,
    name: 'Dr. Ahmed Hassan',
    specialty: 'Cardiology',
    rating: 4.9,
    reviewCount: 234,
    location: 'Dhaka Medical College Hospital',
    available: true,
    image: null,
    consultationFee: 1500,
    experience: '12 years',
    qualifications: ['MBBS', 'FCPS (Cardiology)', 'MRCP (UK)'],
    about: 'Dr. Ahmed Hassan is a renowned cardiologist with over 12 years of experience in treating complex heart conditions. He specializes in interventional cardiology and has performed numerous successful cardiac procedures.',
    education: [
      'MBBS - Dhaka Medical College',
      'FCPS (Cardiology) - Bangladesh College of Physicians and Surgeons',
      'MRCP (UK) - Royal Colleges of Physicians'
    ],
    expertise: [
      'Interventional Cardiology',
      'Echocardiography',
      'Cardiac Catheterization',
      'Heart Failure Management',
      'Preventive Cardiology'
    ],
    services: [
      'Heart Check-up',
      'ECG',
      'Echocardiogram',
      'Stress Test',
      'Cardiac Catheterization'
    ],
    languages: ['English', 'Bengali', 'Hindi'],
    availability: {
      monday: '10:00 AM - 6:00 PM',
      tuesday: '10:00 AM - 6:00 PM',
      wednesday: '10:00 AM - 6:00 PM',
      thursday: '10:00 AM - 6:00 PM',
      friday: 'Closed',
      saturday: '10:00 AM - 2:00 PM',
      sunday: '10:00 AM - 2:00 PM'
    },
    reviews: [
      {
        id: 1,
        patient: 'Rahim Khan',
        rating: 5,
        date: '2024-01-15',
        comment: 'Excellent doctor! Very thorough and caring. Explained everything clearly.'
      },
      {
        id: 2,
        patient: 'Fatema Begum',
        rating: 5,
        date: '2024-01-10',
        comment: 'Dr. Ahmed is very professional and knowledgeable. Highly recommended!'
      }
    ]
  },
  2: {
    id: 2,
    name: 'Dr. Fatima Khan',
    specialty: 'Pediatrics',
    rating: 4.8,
    reviewCount: 189,
    location: 'Square Hospital',
    available: true,
    image: null,
    consultationFee: 1200,
    experience: '8 years',
    qualifications: ['MBBS', 'FCPS (Pediatrics)'],
    about: 'Dr. Fatima Khan is a dedicated pediatrician specializing in child healthcare and development. She has extensive experience in treating various childhood illnesses and developmental disorders.',
    education: [
      'MBBS - Sir Salimullah Medical College',
      'FCPS (Pediatrics) - Bangladesh College of Physicians and Surgeons'
    ],
    expertise: [
      'General Pediatrics',
      'Neonatology',
      'Pediatric Nutrition',
      'Vaccination',
      'Child Development'
    ],
    services: [
      'Child Health Check-up',
      'Vaccination',
      'Growth Monitoring',
      'Nutrition Counseling'
    ],
    languages: ['English', 'Bengali'],
    availability: {
      monday: '9:00 AM - 5:00 PM',
      tuesday: '9:00 AM - 5:00 PM',
      wednesday: '9:00 AM - 5:00 PM',
      thursday: '9:00 AM - 5:00 PM',
      friday: 'Closed',
      saturday: '9:00 AM - 1:00 PM',
      sunday: 'Closed'
    },
    reviews: [
      {
        id: 1,
        patient: 'Karim Ahmed',
        rating: 5,
        date: '2024-01-12',
        comment: 'Very gentle with children. My kids love her!'
      }
    ]
  },
  3: {
    id: 3,
    name: 'Dr. Rahman Ali',
    specialty: 'General Medicine',
    rating: 4.7,
    reviewCount: 312,
    location: 'Apollo Hospital',
    available: false,
    image: null,
    consultationFee: 800,
    experience: '15 years',
    qualifications: ['MBBS', 'FCPS (Medicine)'],
    about: 'Dr. Rahman Ali is an experienced general physician with expertise in diagnosing and treating a wide range of medical conditions.',
    education: [
      'MBBS - Mymensingh Medical College',
      'FCPS (Medicine) - Bangladesh College of Physicians and Surgeons'
    ],
    expertise: [
      'General Medicine',
      'Diabetes Management',
      'Hypertension',
      'Infectious Diseases',
      'Preventive Healthcare'
    ],
    services: [
      'General Consultation',
      'Health Check-up',
      'Diabetes Management',
      'Hypertension Treatment'
    ],
    languages: ['English', 'Bengali'],
    availability: {
      monday: '8:00 AM - 8:00 PM',
      tuesday: '8:00 AM - 8:00 PM',
      wednesday: '8:00 AM - 8:00 PM',
      thursday: '8:00 AM - 8:00 PM',
      friday: '8:00 AM - 8:00 PM',
      saturday: '8:00 AM - 2:00 PM',
      sunday: 'Closed'
    },
    reviews: []
  }
};

export default function DoctorProfile() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      const doctorData = doctorsData[id];
      if (doctorData) {
        setDoctor(doctorData);
      }
      setLoading(false);
    }, 500);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#5DBB63] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading doctor profile...</p>
        </div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Doctor Not Found</h1>
          <p className="text-gray-600 mb-6">The doctor profile you're looking for doesn't exist.</p>
          <Link to="/doctors">
            <Button>Back to Doctors</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleBookAppointment = () => {
    // In a real app, this would navigate to booking page or open booking modal
    alert(`Booking appointment with Dr. ${doctor.name.split(' ').pop()}\nDate: ${selectedDate}\nTime: ${selectedTime}`);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-[#f0fdf2] to-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link 
            to="/doctors" 
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#165028] transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Doctors
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Doctor Info Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg overflow-hidden">
              <div className="p-6">
                <div className="flex flex-col sm:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-[#f0fdf2] to-[#dcfce7] flex items-center justify-center">
                      {doctor.image ? (
                        <img src={doctor.image} alt={doctor.name} className="w-full h-full object-cover rounded-2xl" />
                      ) : (
                        <span className="text-4xl font-bold text-[#165028]">
                          {doctor.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h1 className="text-3xl font-bold text-[#111827] mb-2">{doctor.name}</h1>
                        <p className="text-lg text-[#5DBB63] font-medium mb-1">{doctor.specialty}</p>
                        <p className="text-gray-600 mb-3">{doctor.experience} of experience</p>
                      </div>
                      
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        doctor.available 
                          ? 'bg-[#f0fdf2] text-[#165028]' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        <Clock className="w-3 h-3 inline mr-1" />
                        {doctor.available ? 'Available' : 'Busy'}
                      </div>
                    </div>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        {renderStars(doctor.rating)}
                        <span className="text-gray-700 ml-1">{doctor.rating}</span>
                        <span className="text-gray-400">({doctor.reviewCount} reviews)</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{doctor.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-600">
                        <DollarSign className="w-4 h-4" />
                        <span>Consultation fee: ৳{doctor.consultationFee}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {doctor.languages.map((lang, index) => (
                        <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* About Section */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
              <h2 className="text-xl font-semibold text-[#111827] mb-4 flex items-center gap-2">
                <Stethoscope className="w-5 h-5 text-[#5DBB63]" />
                About Dr. {doctor.name.split(' ').pop()}
              </h2>
              <p className="text-gray-600 leading-relaxed">{doctor.about}</p>
            </div>

            {/* Education & Qualifications */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
              <h2 className="text-xl font-semibold text-[#111827] mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-500" />
                Education & Qualifications
              </h2>
              <div className="space-y-3">
                {doctor.qualifications.map((qualification, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-blue-900">{qualification}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="font-semibold text-[#111827] mb-3">Education</h3>
                <div className="space-y-2">
                  {doctor.education.map((edu, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-700">{edu}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Expertise & Services */}
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
                <h3 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
                  <Activity className="w-5 h-5 text-purple-500" />
                  Areas of Expertise
                </h3>
                <div className="space-y-2">
                  {doctor.expertise.map((item, index) => (
                    <div key={index} className="p-2 bg-purple-50 rounded-lg">
                      <span className="text-purple-700 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
                <h3 className="text-lg font-semibold text-[#111827] mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Services
                </h3>
                <div className="space-y-2">
                  {doctor.services.map((service, index) => (
                    <div key={index} className="p-2 bg-red-50 rounded-lg">
                      <span className="text-red-700 text-sm">{service}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
              <h2 className="text-xl font-semibold text-[#111827] mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-green-500" />
                Availability
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {Object.entries(doctor.availability).map(([day, time]) => (
                  <div key={day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium text-gray-700 capitalize">{day}</span>
                    <span className={`text-sm ${
                      time === 'Closed' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
              <h2 className="text-xl font-semibold text-[#111827] mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-yellow-500" />
                Patient Reviews ({doctor.reviewCount})
              </h2>
              
              {doctor.reviews.length > 0 ? (
                <div className="space-y-4">
                  {doctor.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                            <span className="text-sm font-medium text-gray-600">
                              {review.patient.charAt(0)}
                            </span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{review.patient}</p>
                            <p className="text-sm text-gray-500">{review.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          {renderStars(review.rating)}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">No reviews yet.</p>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Book Appointment Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-semibold text-[#111827] mb-4">Book Appointment</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63] focus:border-transparent"
                  >
                    <option value="">Select time</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="11:00 AM">11:00 AM</option>
                    <option value="12:00 PM">12:00 PM</option>
                    <option value="2:00 PM">2:00 PM</option>
                    <option value="3:00 PM">3:00 PM</option>
                    <option value="4:00 PM">4:00 PM</option>
                    <option value="5:00 PM">5:00 PM</option>
                  </select>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-600">Consultation Fee:</span>
                    <span className="font-semibold text-[#165028]">৳{doctor.consultationFee}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Service Charge:</span>
                    <span className="font-semibold text-gray-700">৳50</span>
                  </div>
                  <div className="border-t border-gray-200 mt-2 pt-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-gray-900">Total:</span>
                      <span className="font-bold text-lg text-[#165028]">৳{doctor.consultationFee + 50}</span>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={handleBookAppointment}
                  disabled={!doctor.available || !selectedDate || !selectedTime}
                  className="w-full"
                >
                  {!doctor.available ? 'Currently Unavailable' : 'Book Appointment'}
                </Button>

                {!doctor.available && (
                  <p className="text-sm text-gray-500 text-center">
                    Doctor is currently busy. Please check back later.
                  </p>
                )}
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
              <h3 className="text-lg font-semibold text-[#111827] mb-4">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600">
                  <Phone className="w-4 h-4" />
                  <span>+880 1712 345678</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>doctor@medigo.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{doctor.location}</span>
                </div>
              </div>
            </div>

            {/* Verification Badge */}
            <div className="bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-blue-900">Verified Doctor</p>
                  <p className="text-sm text-blue-700">Credentials verified by Medigo</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
