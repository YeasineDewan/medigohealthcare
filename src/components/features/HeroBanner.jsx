import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Phone, Calendar, Star, Shield, ArrowRight, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../core/Button';

const defaultBanners = [
  {
    id: 1,
    title: 'Complete Healthcare Solution',
    subtitle: 'From consultations to medicines, we\'ve got you covered 24/7',
    description: 'Experience seamless healthcare with our integrated platform featuring expert doctors and emergency services',
    image: '/banners/healthcare-hero.jpg',
    backgroundColor: 'from-emerald-600 via-teal-600 to-cyan-700',
    features: ['Video Consultations', 'Medicine Delivery', 'Lab Tests at Home', '24/7 Emergency'],
    active: true
  },
  {
    id: 2,
    title: 'Expert Doctors at Your Fingertips',
    subtitle: 'Connect with certified specialists in seconds',
    description: 'Get medical advice from the comfort of your home with our trusted healthcare professionals',
    image: '/banners/doctor-consultation.jpg',
    backgroundColor: 'from-blue-600 via-indigo-600 to-purple-700',
    features: ['1000+ Doctors', '24/7 Availability', 'Instant Consultations', 'Emergency Care'],
    active: true
  },
  {
    id: 3,
    title: 'Fast Medicine Delivery',
    subtitle: 'Order medicines online and get them delivered within hours',
    description: 'Your neighborhood pharmacy, now online and faster with emergency support available',
    image: '/banners/pharmacy-delivery.jpg',
    backgroundColor: 'from-green-600 via-emerald-600 to-teal-700',
    features: ['Same Day Delivery', 'Genuine Medicines', 'Prescription Upload', 'Emergency Support'],
    active: true
  }
];

export default function HeroBanner({ banners = defaultBanners, autoSlide = true, interval = 6000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before animations
  useEffect(() => {
    setMounted(true);
  }, []);

  const activeBanners = banners.filter(b => b.active);
  const displayBanners = activeBanners.length > 0 ? activeBanners : defaultBanners.filter(b => b.active);

  const nextSlide = useCallback(() => {
    if (displayBanners.length <= 1) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % displayBanners.length);
  }, [displayBanners.length]);

  const prevSlide = useCallback(() => {
    if (displayBanners.length <= 1) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + displayBanners.length) % displayBanners.length);
  }, [displayBanners.length]);

  const goToSlide = (index) => {
    if (index === currentIndex || displayBanners.length <= 1) return;
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoSlide || displayBanners.length <= 1 || isPaused || !mounted) return;

    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoSlide, interval, nextSlide, displayBanners.length, isPaused, mounted]);

  if (!mounted) return null;

  const currentBanner = displayBanners[currentIndex];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  return (
    <section 
      className="relative min-h-screen flex items-center overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.4 }
            }}
            className={`absolute inset-0 bg-gradient-to-br ${currentBanner.backgroundColor}`}
          >
            {/* Overlay Pattern */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0">
              <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" />
            </div>
            
            {/* Background Image */}
            {currentBanner.image && (
              <img 
                src={currentBanner.image} 
                alt={currentBanner.title}
                className="w-full h-full object-cover mix-blend-overlay opacity-30"
              />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-white"
          >
            {/* Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium mb-6"
            >
              <Shield className="w-4 h-4" />
              Trusted by 2M+ patients
              <Star className="w-4 h-4 text-yellow-300" />
              4.8/5 Rating
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            >
              {currentBanner.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-white/90 mb-4 font-light"
            >
              {currentBanner.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-white/80 mb-8 max-w-lg"
            >
              {currentBanner.description}
            </motion.p>

            {/* Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mb-8"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {currentBanner.features?.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 text-white/90 text-sm"
                  >
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {/* Book a Doctor Button */}
              <Link to="/doctors">
                <Button 
                  size="lg" 
                  className="bg-green-500 text-white hover:bg-green-600 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
                >
                  <Stethoscope className="w-5 h-5 mr-2" />
                  Book a Doctor
                  <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              
              {/* Emergency Button */}
              <Link to="/emergency">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-red-500 bg-white text-red-500 hover:bg-red-50 px-8 py-4 text-lg font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 group"
                >
                  <Phone className="w-5 h-5 mr-2 animate-pulse" />
                  Emergency
                  <ArrowRight className="w-5 h-5 ml-2 inline group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="mt-12 pt-8 border-t border-white/20"
            >
              <div className="grid grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">2M+</div>
                  <div className="text-sm text-white/70">Happy Patients</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">1000+</div>
                  <div className="text-sm text-white/70">Expert Doctors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-1">24/7</div>
                  <div className="text-sm text-white/70">Support Available</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Side - Interactive Elements */}
          <motion.div
            key={`interactive-${currentIndex}`}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            {/* Floating Cards */}
            <div className="relative">
              <motion.div
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-8 -left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Emergency</div>
                    <div className="text-sm text-gray-600">24/7 Available</div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-8 -right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">Book Appointment</div>
                    <div className="text-sm text-gray-600">Easy & Fast</div>
                  </div>
                </div>
              </motion.div>

              {/* Central Visual */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="relative bg-white/10 backdrop-blur-md rounded-3xl p-8 border border-white/20"
              >
                <div className="aspect-square bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center">
                  <Play className="w-16 h-16 text-white/80" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Navigation Controls */}
        {displayBanners.length > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-20"
          >
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center group border border-white/30"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-3">
              {displayBanners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-12 h-3 bg-white rounded-full'
                      : 'w-3 h-3 bg-white/40 hover:bg-white/60 rounded-full'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300 flex items-center justify-center group border border-white/30"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
