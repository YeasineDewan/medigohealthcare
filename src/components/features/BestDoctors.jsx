import { motion } from 'framer-motion';
import { Star, MapPin, Clock } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';

const BestDoctors = ({ doctors = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  // Sample top-rated doctors if not provided
  const defaultDoctors = [
    { 
      id: 1, 
      name: 'Dr. Ahmed Hassan', 
      specialty: 'Cardiology', 
      rating: 4.9, 
      reviewCount: 234, 
      location: 'Dhaka Medical College Hospital', 
      available: true,
      consultationFee: 1500,
      image: '/doctors/doctor1.jpg',
      experience: '12 years',
      qualifications: ['MBBS', 'MD (Cardiology)', 'FACC']
    },
    { 
      id: 2, 
      name: 'Dr. Fatima Khan', 
      specialty: 'Pediatrics', 
      rating: 4.8, 
      reviewCount: 189, 
      location: 'Square Hospital', 
      available: true,
      consultationFee: 1200,
      image: '/doctors/doctor2.jpg',
      experience: '10 years',
      qualifications: ['MBBS', 'DCH', 'MD (Pediatrics)']
    },
    { 
      id: 3, 
      name: 'Dr. Rahman Ali', 
      specialty: 'General Medicine', 
      rating: 4.7, 
      reviewCount: 312, 
      location: 'Apollo Hospital', 
      available: false,
      consultationFee: 800,
      image: '/doctors/doctor3.jpg',
      experience: '15 years',
      qualifications: ['MBBS', 'MD (Medicine)', 'FACP']
    },
    { 
      id: 4, 
      name: 'Dr. Nusrat Jahan', 
      specialty: 'Gynecology', 
      rating: 4.9, 
      reviewCount: 256, 
      location: 'Labaid Specialized Hospital', 
      available: true,
      consultationFee: 1300,
      image: '/doctors/doctor4.jpg',
      experience: '13 years',
      qualifications: ['MBBS', 'MCPS (Gynae)', 'MS (Obs & Gynae)']
    },
    { 
      id: 5, 
      name: 'Dr. Kamal Hossain', 
      specialty: 'Orthopedics', 
      rating: 4.6, 
      reviewCount: 198, 
      location: 'United Hospital', 
      available: true,
      consultationFee: 1400,
      image: '/doctors/doctor5.jpg',
      experience: '11 years',
      qualifications: ['MBBS', 'MS (Ortho)', 'FCPS']
    },
    { 
      id: 6, 
      name: 'Dr. Sabina Akter', 
      specialty: 'Dermatology', 
      rating: 4.8, 
      reviewCount: 221, 
      location: 'Ibn Sina Hospital', 
      available: true,
      consultationFee: 1100,
      image: '/doctors/doctor6.jpg',
      experience: '9 years',
      qualifications: ['MBBS', 'DDV', 'MD (Skin)']
    },
  ];

  const doctorsToShow = doctors.length > 0 ? doctors : defaultDoctors;
  
  // Duplicate doctors for smooth infinite scrolling
  const duplicatedDoctors = [...doctorsToShow, ...doctorsToShow, ...doctorsToShow];

  useEffect(() => {
    if (doctorsToShow.length <= 1) return;

    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentIndex((prevIndex) => prevIndex + 1);
      }
    }, 3000); // Change every 3 seconds

    return () => clearInterval(interval);
  }, [isPaused, doctorsToShow.length]);

  // Reset to middle section when reaching the end to create infinite loop
  useEffect(() => {
    if (currentIndex >= doctorsToShow.length * 2) {
      setTimeout(() => {
        setCurrentIndex(currentIndex - doctorsToShow.length);
      }, 500); // Wait for transition to complete
    }
  }, [currentIndex, doctorsToShow.length]);

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-3 h-3 ${
          i < Math.floor(rating)
            ? 'text-yellow-400 fill-current'
            : 'text-gray-300'
        }`}
      />
    ));
  };

  // const getVisibleDoctors = () => {
  //   const itemsPerView = window.innerWidth < 768 ? 1 : 
  //                       window.innerWidth < 1024 ? 2 : 
  //                       window.innerWidth < 1280 ? 3 : 4;
  //   
  //   const startIndex = currentIndex % doctorsToShow.length;
  //   const endIndex = Math.min(startIndex + itemsPerView, duplicatedDoctors.length);
  //   
  //   return duplicatedDoctors.slice(startIndex, endIndex);
  // };

  return (
    <div 
      className="py-12 bg-gradient-to-br from-white to-[#f0fdf2] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#165028] mb-4">Best Doctors We Have</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Meet our top-rated healthcare professionals with extensive experience and expertise
          </p>
        </div>

        <div className="relative group" ref={containerRef}>
          {/* Auto-scrolling container */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{ 
                x: `-${(currentIndex % doctorsToShow.length) * (100 / getVisibleCount())}%` 
              }}
              transition={{ 
                duration: 0.5, 
                ease: "easeInOut" 
              }}
            >
              {duplicatedDoctors.map((doctor, index) => (
                <div 
                  key={`${doctor.id}-${Math.floor(index / doctorsToShow.length)}`}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 px-2"
                >
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-5 h-full group">
                    {/* Doctor Image */}
                    <div className="aspect-[4/3] bg-gradient-to-br from-[#f0fdf2] to-[#dcfce7] flex items-center justify-center overflow-hidden rounded-xl mb-4 relative">
                      {doctor.image ? (
                        <img 
                          src={doctor.image} 
                          alt={doctor.name} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'flex';
                          }}
                        />
                      ) : (
                        <div className="w-20 h-20 rounded-full bg-[#5DBB63]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <span className="text-3xl font-bold text-[#165028]">
                            {doctor.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      
                      {/* Availability Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
                            doctor.available 
                              ? 'bg-[#f0fdf2]/90 text-[#165028] border border-[#5DBB63]/30' 
                              : 'bg-gray-100/90 text-gray-600 border border-gray-300'
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          {doctor.available ? 'Available' : 'Busy'}
                        </span>
                      </div>
                    </div>

                    {/* Doctor Info */}
                    <div className="space-y-3 flex-1">
                      <div>
                        <h3 className="font-semibold text-[#111827] text-lg group-hover:text-[#5DBB63] transition-colors line-clamp-1">
                          {doctor.name}
                        </h3>
                        <p className="text-sm text-[#5DBB63] font-medium">{doctor.specialty}</p>
                      </div>

                      {/* Rating */}
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {renderStars(doctor.rating)}
                        </div>
                        <span className="text-sm text-gray-700 font-medium">{doctor.rating}</span>
                        <span className="text-sm text-gray-400">({doctor.reviewCount})</span>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-1.5 text-gray-500 text-sm">
                        <MapPin className="w-4 h-4 flex-shrink-0" />
                        <span className="truncate line-clamp-1">{doctor.location}</span>
                      </div>

                      {/* Experience and Fee */}
                      <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                        <div className="text-sm text-gray-500">
                          <span className="block">Experience</span>
                          <span className="font-semibold text-[#165028]">{doctor.experience}</span>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <span className="block">Fee</span>
                          <span className="font-semibold text-[#165028]">৳{doctor.consultationFee}</span>
                        </div>
                      </div>
                    </div>

                    {/* Action Button */}
                    <button className="w-full mt-4 px-4 py-2 bg-[#5DBB63] text-white text-sm font-medium rounded-lg hover:bg-[#4a9a4f] transition-colors">
                      Book Appointment
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 space-x-2">
            {doctorsToShow.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === (currentIndex % doctorsToShow.length) 
                    ? 'bg-[#5DBB63] scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to doctor ${index + 1}`}
              />
            ))}
          </div>

          {/* Manual Navigation Buttons */}
          <button
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-3 shadow-lg border border-gray-200 hover:bg-[#5DBB63] hover:text-white hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
            onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
            disabled={currentIndex <= 0}
            aria-label="Previous doctor"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-3 shadow-lg border border-gray-200 hover:bg-[#5DBB63] hover:text-white hover:shadow-xl transition-all duration-300 opacity-0 group-hover:opacity-100 z-10"
            onClick={() => setCurrentIndex(prev => prev + 1)}
            aria-label="Next doctor"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper function to get visible count based on screen size
const getVisibleCount = () => {
  if (typeof window === 'undefined') return 4;
  if (window.innerWidth < 768) return 1;
  if (window.innerWidth < 1024) return 2;
  if (window.innerWidth < 1280) return 3;
  return 4;
};

export default BestDoctors;