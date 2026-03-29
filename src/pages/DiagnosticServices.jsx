import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Microscope, 
  XRay, 
  Heart, 
  Brain, 
  Activity, 
  Eye, 
  Stethoscope, 
  Baby, 
  Tooth, 
  Bone, 
  Ultrasound,
  CtScan,
  Mri,
  Ecg,
  Eeg,
  Search,
  Star,
  Clock,
  MapPin,
  Shield,
  CheckCircle,
  TrendingUp,
  Award,
  Calendar,
  Users,
  Phone,
  Mail,
  ChevronRight,
  Loader,
  Filter,
  Home,
  Car,
  FileText,
  CreditCard,
  Tag,
  ThumbsUp,
  UserCheck,
  BadgeCheck,
  ArrowRight,
  Info,
  Zap,
  Gift
} from 'lucide-react';
import { Button } from '../components/core/Button';
import SEOHead from '../components/seo/SEOHead';
import { debounce, throttle, cacheManager } from '../utils/performanceOptimizer';

const diagnosticCategories = [
  {
    id: 'imaging',
    name: 'Imaging Services',
    description: 'Advanced imaging and radiology services',
    icon: XRay,
    color: 'from-blue-500 to-blue-600',
    services: [
      {
        id: 'x-ray',
        name: 'X-Ray',
        description: 'Digital X-ray imaging for bones and chest',
        price: 800,
        originalPrice: 1200,
        discount: 33,
        duration: '15-30 minutes',
        preparation: 'No special preparation required',
        homeService: false,
        popular: true,
        features: ['Digital imaging', 'Instant reports', 'Radiologist consultation'],
        whyChoose: ['Quick diagnosis', 'Low radiation', 'High clarity images']
      },
      {
        id: 'ct-scan',
        name: 'CT Scan',
        description: 'Cross-sectional imaging for detailed diagnosis',
        price: 3000,
        originalPrice: 4500,
        discount: 33,
        duration: '30-45 minutes',
        preparation: 'May require contrast dye',
        homeService: false,
        popular: true,
        features: ['3D imaging', 'Detailed cross-sections', 'Contrast enhancement'],
        whyChoose: ['Detailed diagnosis', 'Quick results', 'Advanced technology']
      },
      {
        id: 'mri',
        name: 'MRI',
        description: 'Magnetic resonance imaging for soft tissues',
        price: 5000,
        originalPrice: 7500,
        discount: 33,
        duration: '45-60 minutes',
        preparation: 'Remove metal objects, no eating 4 hours prior',
        homeService: false,
        popular: false,
        features: ['No radiation', 'High resolution', 'Safe for all ages'],
        whyChoose: ['Detailed soft tissue imaging', 'No radiation exposure', 'Safe diagnosis']
      },
      {
        id: 'ultrasound',
        name: 'Ultrasound',
        description: 'Sound wave imaging for organs and pregnancy',
        price: 1500,
        originalPrice: 2000,
        discount: 25,
        duration: '20-30 minutes',
        preparation: 'Full bladder required for some scans',
        homeService: true,
        popular: true,
        features: ['Real-time imaging', 'No radiation', 'Safe for pregnancy'],
        whyChoose: ['Safe for all', 'Real-time results', 'Portable service']
      }
    ]
  },
  {
    id: 'cardiology',
    name: 'Cardiology Services',
    description: 'Comprehensive heart and vascular diagnostics',
    icon: Heart,
    color: 'from-red-500 to-red-600',
    services: [
      {
        id: 'ecg',
        name: 'ECG (Electrocardiogram)',
        description: 'Heart electrical activity recording',
        price: 500,
        originalPrice: 800,
        discount: 38,
        duration: '10-15 minutes',
        preparation: 'No special preparation required',
        homeService: true,
        popular: true,
        features: ['Quick test', 'Painless', 'Immediate results'],
        whyChoose: ['Fast diagnosis', 'Non-invasive', 'Widely available']
      },
      {
        id: 'echo',
        name: 'Echocardiogram',
        description: 'Ultrasound imaging of the heart',
        price: 2000,
        originalPrice: 3000,
        discount: 33,
        duration: '30-45 minutes',
        preparation: 'No special preparation required',
        homeService: false,
        popular: true,
        features: ['2D/3D imaging', 'Doppler study', 'Valve assessment'],
        whyChoose: ['Detailed heart imaging', 'No radiation', 'Functional assessment']
      },
      {
        id: 'stress-test',
        name: 'Stress Test',
        description: 'Heart function during physical activity',
        price: 2500,
        originalPrice: 3500,
        discount: 29,
        duration: '45-60 minutes',
        preparation: 'Avoid heavy meals, wear comfortable clothes',
        homeService: false,
        popular: false,
        features: ['Exercise monitoring', 'Heart response', 'Fitness assessment'],
        whyChoose: ['Functional testing', 'Early detection', 'Comprehensive evaluation']
      },
      {
        id: 'holter',
        name: '24-Hour Holter Monitoring',
        description: 'Continuous heart rhythm monitoring',
        price: 3000,
        originalPrice: 4000,
        discount: 25,
        duration: '24 hours monitoring',
        preparation: 'Device worn for 24 hours',
        homeService: true,
        popular: false,
        features: ['Continuous monitoring', 'Event detection', 'Long-term analysis'],
        whyChoose: ['Extended monitoring', 'Arrhythmia detection', 'Comprehensive data']
      }
    ]
  },
  {
    id: 'neurology',
    name: 'Neurology Services',
    description: 'Brain and nervous system diagnostics',
    icon: Brain,
    color: 'from-purple-500 to-purple-600',
    services: [
      {
        id: 'eeg',
        name: 'EEG (Electroencephalogram)',
        description: 'Brain electrical activity recording',
        price: 1500,
        originalPrice: 2000,
        discount: 25,
        duration: '45-60 minutes',
        preparation: 'Wash hair, avoid caffeine',
        homeService: true,
        popular: false,
        features: ['Brain activity mapping', 'Seizure detection', 'Non-invasive'],
        whyChoose: ['Painless test', 'Brain function assessment', 'Seizure monitoring']
      },
      {
        id: 'ncv',
        name: 'NCV/EMG',
        description: 'Nerve conduction and muscle testing',
        price: 2500,
        originalPrice: 3500,
        discount: 29,
        duration: '30-45 minutes',
        preparation: 'No special preparation required',
        homeService: false,
        popular: false,
        features: ['Nerve testing', 'Muscle assessment', 'Pain evaluation'],
        whyChoose: ['Detailed nerve testing', 'Muscle function', 'Pain diagnosis']
      }
    ]
  },
  {
    id: 'pathology',
    name: 'Pathology Services',
    description: 'Laboratory testing and analysis',
    icon: Microscope,
    color: 'from-green-500 to-green-600',
    services: [
      {
        id: 'biopsy',
        name: 'Biopsy Analysis',
        description: 'Tissue sample examination',
        price: 2000,
        originalPrice: 3000,
        discount: 33,
        duration: '3-5 days',
        preparation: 'Doctor prescription required',
        homeService: false,
        popular: false,
        features: ['Expert pathologists', 'Detailed analysis', 'Cancer screening'],
        whyChoose: ['Accurate diagnosis', 'Cancer detection', 'Expert analysis']
      },
      {
        id: 'pap-smear',
        name: 'Pap Smear',
        description: 'Cervical cancer screening',
        price: 800,
        originalPrice: 1200,
        discount: 33,
        duration: '15-20 minutes',
        preparation: 'Schedule between periods',
        homeService: true,
        popular: true,
        features: ['Quick screening', 'Early detection', 'Preventive care'],
        whyChoose: ['Cancer prevention', 'Quick test', 'Life-saving']
      }
    ]
  },
  {
    id: 'specialized',
    name: 'Specialized Services',
    description: 'Specialized diagnostic procedures',
    icon: Activity,
    color: 'from-orange-500 to-orange-600',
    services: [
      {
        id: 'endoscopy',
        name: 'Endoscopy',
        description: 'Internal organ visualization',
        price: 3000,
        originalPrice: 4500,
        discount: 33,
        duration: '30-45 minutes',
        preparation: 'Fasting required, sedation used',
        homeService: false,
        popular: false,
        features: ['Direct visualization', 'Biopsy capability', 'Therapeutic procedures'],
        whyChoose: ['Direct viewing', 'Biopsy option', 'Treatment possible']
      },
      {
        id: 'colonoscopy',
        name: 'Colonoscopy',
        description: 'Colon examination and screening',
        price: 4000,
        originalPrice: 6000,
        discount: 33,
        duration: '45-60 minutes',
        preparation: 'Bowel prep required, sedation used',
        homeService: false,
        popular: false,
        features: ['Cancer screening', 'Polyp removal', 'Preventive care'],
        whyChoose: ['Cancer prevention', 'Polyp removal', 'Comprehensive screening']
      }
    ]
  }
];

export default function DiagnosticServices() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showQuickBook, setShowQuickBook] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [selectedFilters, setSelectedFilters] = useState({
    homeService: false,
    popularOnly: false,
    sameDay: false
  });
  const navigate = useNavigate();

  const categories = ['all', ...diagnosticCategories.map(cat => cat.id)];

  const getAllServices = () => {
    return diagnosticCategories.flatMap(category => 
      category.services.map(service => ({
        ...service,
        categoryName: category.name,
        categoryIcon: category.icon,
        categoryColor: category.color
      }))
    );
  };

  const [services, setServices] = useState(getAllServices());

  const filtered = services.filter((service) => {
    const matchesSearch = !search || 
      service.name.toLowerCase().includes(search.toLowerCase()) || 
      service.description.toLowerCase().includes(search.toLowerCase()) ||
      service.categoryName.toLowerCase().includes(search.toLowerCase());
    
    const matchesCategory = selectedCategory === 'all' || 
      services.some(s => s.categoryName === diagnosticCategories.find(cat => cat.id === selectedCategory)?.name);
    
    // Apply additional filters
    let matchesFilters = true;
    if (selectedFilters.homeService && !service.homeService) matchesFilters = false;
    if (selectedFilters.popularOnly && !service.popular) matchesFilters = false;
    if (selectedFilters.sameDay && service.duration.includes('hour')) matchesFilters = false;
    
    // Apply price range filter
    if (service.price < priceRange.min || service.price > priceRange.max) matchesFilters = false;
    
    return matchesSearch && matchesCategory && matchesFilters;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'discount') return b.discount - a.discount;
    if (sortBy === 'popular') return b.popular - a.popular;
    return 0;
  });

  const handleQuickBook = (service) => {
    setSelectedService(service);
    setShowQuickBook(true);
  };

  const handleBookService = (service) => {
    navigate(`/book-diagnostic/${service.id}`, { state: { service } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#5DBB63] to-[#165028] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-2/3 mb-6 lg:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <Microscope className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-4xl font-bold">Diagnostic Services</h1>
              </div>
              <p className="text-xl text-white/90 mb-6">
                Advanced diagnostic services with state-of-the-art equipment. Get accurate results from certified professionals.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">NABL Certified Labs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">Expert Radiologists</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">Advanced Technology</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <Gift className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">Health Package</h3>
                </div>
                <p className="text-white/90 mb-4">Complete health checkup with all essential diagnostics</p>
                <button className="w-full bg-white text-[#165028] py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  View Package
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Overview */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
            {diagnosticCategories.map((category) => (
              <motion.div
                key={category.id}
                whileHover={{ scale: 1.05 }}
                className={`bg-gradient-to-br ${category.color} rounded-xl p-4 text-white cursor-pointer`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <category.icon className="w-8 h-8 mb-2" />
                <h3 className="font-semibold">{category.name}</h3>
                <p className="text-sm text-white/80 mt-1">{category.services.length} services</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="search"
                placeholder="Search diagnostic services..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
              />
            </div>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
            >
              <option value="popular">Most Popular</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="discount">Best Discount</option>
            </select>

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="px-4 py-3 rounded-xl border border-gray-200 hover:border-[#5DBB63] hover:bg-[#5DBB63]/5 transition-colors flex items-center gap-2"
            >
              <Filter className="w-5 h-5" />
              Filters
            </button>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-xl border border-gray-200 p-4 mb-6"
              >
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange.min}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, min: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                      <span className="text-gray-500">-</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Quick Filters</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedFilters.homeService}
                          onChange={(e) => setSelectedFilters(prev => ({ ...prev, homeService: e.target.checked }))}
                          className="rounded text-[#5DBB63]"
                        />
                        <span className="text-sm">Home Service Available</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedFilters.popularOnly}
                          onChange={(e) => setSelectedFilters(prev => ({ ...prev, popularOnly: e.target.checked }))}
                          className="rounded text-[#5DBB63]"
                        />
                        <span className="text-sm">Popular Services</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={selectedFilters.sameDay}
                          onChange={(e) => setSelectedFilters(prev => ({ ...prev, sameDay: e.target.checked }))}
                          className="rounded text-[#5DBB63]"
                        />
                        <span className="text-sm">Quick Results</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                    <div className="space-y-2">
                      {['Imaging', 'Lab Test', 'Procedure'].map(type => (
                        <label key={type} className="flex items-center gap-2">
                          <input type="radio" name="serviceType" className="text-[#5DBB63]" />
                          <span className="text-sm">{type}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sorted.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-2xl border border-gray-100 hover:border-[#5DBB63]/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
            >
              {/* Service Header */}
              <div className={`p-4 bg-gradient-to-br ${service.categoryColor} text-white relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <service.categoryIcon className="w-8 h-8" />
                    {service.popular && (
                      <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                        Popular
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{service.name}</h3>
                  <p className="text-white/80 text-sm">{service.categoryName}</p>
                </div>
              </div>

              {/* Service Body */}
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>

                {/* Service Details */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Home className="w-4 h-4" />
                    <span>{service.homeService ? 'Home Service Available' : 'Center Visit Required'}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <FileText className="w-4 h-4" />
                    <span>{service.preparation}</span>
                  </div>
                </div>

                {/* Features */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Key Features</h4>
                  <div className="space-y-1">
                    {service.features.slice(0, 2).map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-3 h-3 text-[#5DBB63]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl font-bold text-[#111827]">৳{service.price.toLocaleString()}</span>
                    {service.discount > 0 && (
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                        {service.discount}% OFF
                      </span>
                    )}
                  </div>
                  {service.originalPrice > service.price && (
                    <span className="text-sm text-gray-400 line-through">৳{service.originalPrice.toLocaleString()}</span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="space-y-2">
                  <button
                    onClick={() => handleQuickBook(service)}
                    className="w-full py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] font-medium transition-colors"
                  >
                    Quick Book
                  </button>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBookService(service)}
                      className="flex-1 py-2 border border-[#5DBB63] text-[#5DBB63] rounded-lg hover:bg-[#5DBB63]/5 text-sm font-medium transition-colors"
                    >
                      Book Now
                    </button>
                    <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {sorted.length === 0 && (
          <div className="text-center py-12">
            <Microscope className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">No services found</h3>
            <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
            <button
              onClick={() => {
                setSearch('');
                setSelectedCategory('all');
                setSortBy('popular');
                setSelectedFilters({
                  homeService: false,
                  popularOnly: false,
                  sameDay: false
                });
              }}
              className="px-6 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f]"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick Booking Modal */}
      <AnimatePresence>
        {showQuickBook && selectedService && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowQuickBook(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold">Quick Booking</h3>
                <button
                  onClick={() => setShowQuickBook(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-lg mb-2">{selectedService.name}</h4>
                <p className="text-gray-600 text-sm">{selectedService.description}</p>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-[#111827]">৳{selectedService.price.toLocaleString()}</span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Time</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Morning (9AM - 12PM)</option>
                    <option>Afternoon (12PM - 5PM)</option>
                    <option>Evening (5PM - 8PM)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg">
                    <option>Center Visit</option>
                    {selectedService.homeService && <option>Home Collection</option>}
                  </select>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowQuickBook(false)}
                  className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Handle booking submission
                    setShowQuickBook(false);
                    navigate('/booking-confirmation');
                  }}
                  className="flex-1 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f]"
                >
                  Confirm Booking
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
