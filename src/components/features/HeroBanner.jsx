import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Phone, Calendar, Star, Shield, ArrowRight, Stethoscope, Heart, Activity, Users, Award } from 'lucide-react';
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
    stats: { patients: '2M+', doctors: '1000+', rating: '4.8', experience: '15+' },
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
    stats: { patients: '2M+', doctors: '1000+', rating: '4.9', experience: '20+' },
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
    stats: { patients: '1.5M+', doctors: '500+', rating: '4.7', experience: '10+' },
    active: true
  }
];

export default function HeroBanner({ banners = defaultBanners, autoSlide = true, interval = 4000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Parallax scroll effect
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, -80]);

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
    if (!autoSlide || displayBanners.length <= 1 || isPaused) return;

    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoSlide, interval, nextSlide, displayBanners.length, isPaused]);

  const currentBanner = displayBanners[currentIndex];

  const slideEase = [0.22, 1, 0.36, 1];
  const slideVariants = {
    enter: (dir) => ({
      x: dir > 0 ? 28 : -28,
      opacity: 0,
      scale: 1.01,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir) => ({
      zIndex: 0,
      x: dir < 0 ? 28 : -28,
      opacity: 0,
      scale: 1.01,
    }),
  };

  return (
    <section 
      className="relative h-[700px] max-w-[1600px] mx-auto flex items-center overflow-hidden"
      style={{ minHeight: '700px' }}
      onMouseEnter={() => {
        setIsPaused(true);
        setIsHovered(true);
      }}
      onMouseLeave={() => {
        setIsPaused(false);
        setIsHovered(false);
      }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <AnimatePresence initial={false} custom={direction} mode="sync">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.55,
              ease: slideEase,
              opacity: { duration: 0.45, ease: slideEase },
            }}
            className={`absolute inset-0 bg-gradient-to-br ${currentBanner.backgroundColor}`}
          >
            {/* Enhanced Overlay Pattern */}
            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0">
              {/* Animated gradient orbs */}
              <motion.div 
                animate={{ 
                  x: [0, 100, 0], 
                  y: [0, -50, 0], 
                  scale: [1, 1.2, 1] 
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl" 
              />
              <motion.div 
                animate={{ 
                  x: [0, -80, 0], 
                  y: [0, 60, 0], 
                  scale: [1, 1.1, 1] 
                }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" 
              />
              <motion.div 
                animate={{ 
                  scale: [1, 1.3, 1], 
                  opacity: [0.3, 0.6, 0.3] 
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 rounded-full blur-3xl" 
              />
              {/* Floating particles — fixed positions (no Math.random in render) */}
              {[...Array(6)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    y: [0, -24, 0],
                    x: [0, (i % 3 - 1) * 12, 0],
                    opacity: [0.35, 0.85, 0.35],
                  }}
                  transition={{
                    duration: 4 + i * 0.4,
                    repeat: Infinity,
                    delay: i * 0.35,
                    ease: 'easeInOut',
                  }}
                  className="absolute w-2 h-2 bg-white/30 rounded-full"
                  style={{
                    top: `${12 + (i * 14) % 72}%`,
                    left: `${8 + (i * 19) % 84}%`,
                  }}
                />
              ))}
            </div>
            
            {/* Clean Professional Background */}
            <div className="absolute inset-0">
              {/* Subtle animated gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              
              {/* Floating geometric elements */}
              <div className="absolute inset-0 overflow-hidden">
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      x: [0, 100, -100, 0],
                      y: [0, -100, 100, 0],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 20 + i * 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 2
                    }}
                    className="absolute w-32 h-32 bg-white/5 rounded-full blur-3xl"
                    style={{
                      top: `${20 + i * 15}%`,
                      left: `${10 + i * 15}%`
                    }}
                  />
                ))}
              </div>
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

      {/* Content - adjusted for larger size with proper overflow handling */}
      <motion.div 
        style={{ y }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center"
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            key={`content-${currentIndex}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: slideEase, delay: 0.08 }}
            className="text-white"
          >
            {/* Enhanced Trust Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ scale: 1.05 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 text-sm font-medium mb-6 cursor-pointer"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <Shield className="w-5 h-5" />
              </motion.div>
              <span className="text-white font-semibold">Trusted by 2M+ patients</span>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`w-4 h-4 ${i < 4 ? 'text-yellow-300 fill-yellow-300' : 'text-white/50'}`} />
                ))}
                <span className="text-yellow-300 font-bold ml-1">4.8</span>
              </div>
            </motion.div>

            {/* Enhanced Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: slideEase, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            >
              {currentBanner.title}
            </motion.h1>

            {/* Professional Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-2xl md:text-3xl text-white/90 mb-6 font-light"
            >
              {currentBanner.subtitle}
            </motion.p>

            {/* Professional Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="text-xl text-white/80 mb-10 max-w-2xl"
            >
              {currentBanner.description}
            </motion.p>

            {/* Professional Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mb-10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {currentBanner.features?.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-white/90 text-base font-medium"
                  >
                    <div className="w-2 h-2 bg-white rounded-full" />
                    {feature}
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Professional CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 mb-10"
            >
              {/* Book a Doctor Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/doctors">
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 px-10 py-5 text-xl font-bold shadow-2xl hover:shadow-3xl transform transition-all duration-300 group relative overflow-hidden rounded-xl"
                  >
                    <div className="absolute inset-0 bg-white/20 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <div className="relative flex items-center">
                      <motion.div
                        animate={{ rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                      >
                        <Stethoscope className="w-6 h-6 mr-3" />
                      </motion.div>
                      Book a Doctor
                      <ArrowRight className="w-6 h-6 ml-3 inline group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
              </motion.div>
              
              {/* Emergency Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link to="/emergency">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-3 border-red-500 bg-white text-red-500 hover:bg-red-50 px-10 py-5 text-xl font-bold shadow-2xl hover:shadow-3xl transform transition-all duration-300 group relative overflow-hidden rounded-xl"
                  >
                    <div className="absolute inset-0 bg-red-500/10 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                    <div className="relative flex items-center">
                      <Phone className="w-6 h-6 mr-3 animate-pulse" />
                      Emergency
                      <ArrowRight className="w-6 h-6 ml-3 inline group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Button>
                </Link>
              </motion.div>
            </motion.div>

            {/* Professional Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="pt-8 border-t border-white/20"
            >
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                    <Users className="w-6 h-6" />
                    {currentBanner.stats?.patients || '2M+'}
                  </div>
                  <div className="text-base text-white/70">Happy Patients</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                    <Stethoscope className="w-6 h-6" />
                    {currentBanner.stats?.doctors || '1000+'}
                  </div>
                  <div className="text-base text-white/70">Expert Doctors</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                    <Star className="w-6 h-6 text-yellow-300" />
                    {currentBanner.stats?.rating || '4.8'}/5
                  </div>
                  <div className="text-base text-white/70">Average Rating</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.1 }}
                  className="text-center"
                >
                  <div className="text-3xl sm:text-4xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                    <Award className="w-6 h-6" />
                    {currentBanner.stats?.experience || '15+'} Years
                  </div>
                  <div className="text-base text-white/70">Experience</div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

            {/* Enhanced Right Side - Interactive Elements */}
          <motion.div
            key={`interactive-${currentIndex}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: slideEase, delay: 0.12 }}
            className="relative max-h-full overflow-hidden"
          >
            {/* Enhanced Floating Cards with height constraints */}
            <div className="relative h-[600px]">
              {/* Emergency Card */}
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 2, -2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.1, rotate: 0 }}
                className="absolute top-8 -left-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center"
                  >
                    <Phone className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-gray-900">Emergency</div>
                    <div className="text-sm text-gray-600">24/7 Available</div>
                    <div className="text-xs text-red-500 font-semibold mt-1">Call 999</div>
                  </div>
                </div>
              </motion.div>

              {/* Appointment Card */}
              <motion.div
                animate={{ y: [0, 20, 0], rotate: [0, -2, 2, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                whileHover={{ scale: 1.1, rotate: 0 }}
                className="absolute bottom-8 -right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border border-white/20 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center"
                  >
                    <Calendar className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-gray-900">Book Appointment</div>
                    <div className="text-sm text-gray-600">Easy & Fast</div>
                    <div className="text-xs text-blue-500 font-semibold mt-1">Instant</div>
                  </div>
                </div>
              </motion.div>

              {/* Health Metrics Card */}
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                whileHover={{ scale: 1.05 }}
                className="absolute top-1/2 -left-4 -translate-y-1/2 bg-white/95 backdrop-blur-sm rounded-2xl p-3 shadow-2xl border border-white/20 cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <motion.div
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-full flex items-center justify-center"
                  >
                    <Heart className="w-5 h-5 text-white" />
                  </motion.div>
                  <div>
                    <div className="font-semibold text-gray-900 text-sm">Health Check</div>
                    <div className="text-xs text-gray-600">Track Health</div>
                  </div>
                </div>
              </motion.div>

              {/* Enhanced Central Visual - Proper Image/Video Section */}
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.05 }}
                className="relative bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 cursor-pointer overflow-hidden"
              >
                <div className="aspect-video bg-gradient-to-br from-white/20 to-white/5 rounded-2xl overflow-hidden relative">
                  {/* Animated background pattern */}
                  <div className="absolute inset-0">
                    {[...Array(4)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.2, 0.5, 0.2],
                          rotate: [0, 180, 360]
                        }}
                        transition={{
                          duration: 3 + i,
                          repeat: Infinity,
                          delay: i * 0.8,
                          ease: "easeInOut"
                        }}
                        className="absolute w-20 h-20 bg-white/10 rounded-full blur-xl"
                        style={{
                          top: `${15 + i * 25}%`,
                          left: `${15 + i * 20}%`
                        }}
                      />
                    ))}
                  </div>
                  
                  {/* Main visual content */}
                  <div className="relative z-10 h-full flex items-center justify-center">
                    {/* Simulated video/medical image display */}
                    <motion.div
                      animate={{ opacity: [0.8, 1, 0.8] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="relative w-full h-full"
                    >
                      {/* Placeholder for actual medical imagery */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-green-500/20 rounded-2xl" />
                      <div className="absolute inset-4 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center">
                        <div className="text-center">
                          <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4"
                          >
                            <Stethoscope className="w-10 h-10 text-white" />
                          </motion.div>
                          <div className="text-white/80 font-semibold text-lg">Medical Services</div>
                          <div className="text-white/60 text-sm mt-1">24/7 Available</div>
                        </div>
                      </div>
                      
                      {/* Floating action indicators */}
                      <motion.div
                        animate={{ x: [0, 10, 0] }}
                        transition={{ duration: 3, repeat: Infinity, delay: 1 }}
                        className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      </motion.div>
                      
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                        className="absolute bottom-4 left-4 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center shadow-lg"
                      >
                        <Activity className="w-4 h-4 text-white" />
                      </motion.div>
                    </motion.div>
                  </div>
                  
                  {/* Overlay gradient for depth */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Minimal Professional Navigation */}
        {displayBanners.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-4 z-40">
            {/* Previous Button */}
            <button
              onClick={prevSlide}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg border border-white/30"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-gray-800" />
            </button>

            {/* Dots Indicator */}
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full border border-white/30">
              {displayBanners.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-300 ${
                    index === currentIndex
                      ? 'w-8 h-2 bg-white rounded-full shadow-md'
                      : 'w-2 h-2 bg-white/50 hover:bg-white/70 rounded-full'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            {/* Next Button */}
            <button
              onClick={nextSlide}
              className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 flex items-center justify-center shadow-lg border border-white/30"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-gray-800" />
            </button>
          </div>
        )}
      </motion.div>
    </section>
  );
}
