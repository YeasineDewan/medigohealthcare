import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const defaultBanners = [
  {
    id: 1,
    title: 'Get 30% Off on Your First Order',
    subtitle: 'Limited time offer on all medicines',
    image: '/banners/banner1.jpg',
    backgroundColor: 'from-blue-500 to-blue-700',
    ctaText: 'Shop Now',
    ctaLink: '/pharmacy',
    active: true
  },
  {
    id: 2,
    title: 'Free Home Sample Collection',
    subtitle: 'Book lab tests with zero collection charges',
    image: '/banners/banner2.jpg',
    backgroundColor: 'from-green-500 to-green-700',
    ctaText: 'Book Lab Test',
    ctaLink: '/lab-tests',
    active: true
  },
  {
    id: 3,
    title: 'Video Consultation Available 24/7',
    subtitle: 'Connect with certified doctors anytime',
    image: '/banners/banner3.jpg',
    backgroundColor: 'from-purple-500 to-purple-700',
    ctaText: 'Consult Now',
    ctaLink: '/consult',
    active: true
  }
];

export default function HeroBanner({ banners = defaultBanners, autoSlide = true, interval = 5000 }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const activeBanners = banners.filter(b => b.active);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  }, [activeBanners.length]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + activeBanners.length) % activeBanners.length);
  }, [activeBanners.length]);

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!autoSlide || activeBanners.length <= 1) return;

    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
  }, [autoSlide, interval, nextSlide, activeBanners.length]);

  if (activeBanners.length === 0) return null;

  const currentBanner = activeBanners[currentIndex];

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
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden rounded-2xl shadow-xl">
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
            opacity: { duration: 0.2 }
          }}
          className="absolute inset-0"
        >
          <div className={`absolute inset-0 bg-gradient-to-r ${currentBanner.backgroundColor}`}>
            {currentBanner.image && (
              <img 
                src={currentBanner.image} 
                alt={currentBanner.title}
                className="w-full h-full object-cover mix-blend-overlay opacity-40"
              />
            )}
          </div>

          <div className="relative h-full flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <div className="max-w-2xl">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-3xl md:text-5xl font-bold text-white mb-4"
                >
                  {currentBanner.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg md:text-xl text-white/90 mb-8"
                >
                  {currentBanner.subtitle}
                </motion.p>
                {currentBanner.ctaText && (
                  <motion.a
                    href={currentBanner.ctaLink}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="inline-block px-8 py-3 bg-white text-gray-900 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                  >
                    {currentBanner.ctaText}
                  </motion.a>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      {activeBanners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors flex items-center justify-center group z-10"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm hover:bg-white/50 transition-colors flex items-center justify-center group z-10"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {activeBanners.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {activeBanners.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all ${
                index === currentIndex
                  ? 'w-8 h-2 bg-white'
                  : 'w-2 h-2 bg-white/50 hover:bg-white/70'
              } rounded-full`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
