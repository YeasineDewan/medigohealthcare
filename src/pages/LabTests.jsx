import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FlaskConical, Home, FileText, Truck, Search, Star, Clock, MapPin, Shield, CheckCircle, TrendingUp, Award, Heart, Activity, Droplet, Brain, Stethoscope, Thermometer, Pill, Syringe, Microscope, TestTube, AlertCircle, Heart as HeartIcon, Sun, Calendar, Users, Zap, Gift, ChevronRight, X, Phone, Mail, MessageCircle, Filter, Tag, ThumbsUp, UserCheck, BadgeCheck, ArrowRight, Loader } from 'lucide-react';
import { Button } from '../components/core/Button';
import labTestService from '../services/labTestService';

const testCategories = [
  { 
    id: 'complete-blood-count',
    name: 'Complete Blood Count', 
    price: 500,
    originalPrice: 800,
    discount: 38,
    category: 'Hematology',
    description: 'Comprehensive analysis of blood cells',
    preparation: 'No special preparation required',
    duration: '15-20 minutes',
    sampleType: 'Blood',
    fasting: 'Not required',
    homeCollection: true,
    reportTime: 'Same day',
    popular: true,
    icon: Droplet,
    color: 'from-red-500 to-red-600',
    parameters: ['Hemoglobin (Hb)', 'Red Blood Cell Count (RBC)', 'White Blood Cell Count (WBC)', 'Platelet Count'],
    includes: ['Sample collection at home', 'Digital report within 24 hours', 'Doctor consultation available'],
    whyTest: ['To detect infections', 'Check for anemia', 'Monitor overall health', 'Diagnose blood disorders']
  },
  { 
    id: 'lipid-profile',
    name: 'Lipid Profile', 
    price: 800,
    originalPrice: 1200,
    discount: 33,
    category: 'Cardiology',
    description: 'Measures cholesterol and triglycerides',
    preparation: '10-12 hours fasting required',
    duration: '15-20 minutes',
    sampleType: 'Blood',
    fasting: 'Required (10-12 hours)',
    homeCollection: true,
    reportTime: 'Same day',
    popular: true,
    icon: HeartIcon,
    color: 'from-pink-500 to-pink-600',
    parameters: ['Total Cholesterol', 'HDL Cholesterol', 'LDL Cholesterol', 'Triglycerides'],
    includes: ['Sample collection at home', 'Digital report within 24 hours', 'Cardiologist consultation'],
    whyTest: ['Assess heart disease risk', 'Monitor cholesterol levels', 'Evaluate cardiovascular health']
  },
  { 
    id: 'thyroid-function',
    name: 'Thyroid Function', 
    price: 900,
    originalPrice: 1400,
    discount: 36,
    category: 'Endocrinology',
    description: 'Comprehensive thyroid panel',
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
  },
  { 
    id: 'liver-function',
    name: 'Liver Function', 
    price: 1200,
    originalPrice: 1800,
    discount: 33,
    category: 'Gastroenterology',
    description: 'Assess liver health and function',
    preparation: '10-12 hours fasting recommended',
    duration: '15-20 minutes',
    sampleType: 'Blood',
    fasting: 'Recommended',
    homeCollection: true,
    reportTime: '1-2 days',
    popular: true,
    icon: Activity,
    color: 'from-amber-500 to-amber-600',
    parameters: ['SGOT (AST)', 'SGPT (ALT)', 'Alkaline Phosphatase (ALP)', 'Bilirubin'],
    includes: ['Sample collection at home', 'Digital report within 48 hours', 'Gastroenterologist consultation'],
    whyTest: ['Detect liver diseases', 'Monitor liver function', 'Check for hepatitis']
  },
  { 
    id: 'kidney-function',
    name: 'Kidney Function', 
    price: 1000,
    originalPrice: 1500,
    discount: 33,
    category: 'Nephrology',
    description: 'Evaluate kidney function and health',
    preparation: 'No special preparation required',
    duration: '15-20 minutes',
    sampleType: 'Blood & Urine',
    fasting: 'Not required',
    homeCollection: true,
    reportTime: '1-2 days',
    popular: true,
    icon: Activity,
    color: 'from-purple-500 to-purple-600',
    parameters: ['Blood Urea Nitrogen (BUN)', 'Serum Creatinine', 'Uric Acid', 'eGFR'],
    includes: ['Sample collection at home', 'Digital report within 48 hours', 'Nephrologist consultation'],
    whyTest: ['Assess kidney function', 'Detect kidney diseases', 'Monitor treatment effectiveness']
  },
  { 
    id: 'diabetes-screening',
    name: 'Diabetes Screening', 
    price: 600,
    originalPrice: 900,
    discount: 33,
    category: 'Endocrinology',
    description: 'Comprehensive diabetes screening',
    preparation: '10-12 hours fasting required',
    duration: '15-20 minutes',
    sampleType: 'Blood',
    fasting: 'Required (10-12 hours)',
    homeCollection: true,
    reportTime: 'Same day',
    popular: true,
    icon: Activity,
    color: 'from-green-500 to-green-600',
    parameters: ['Fasting Blood Sugar (FBS)', 'Post Prandial Blood Sugar (PPBS)', 'HbA1c'],
    includes: ['Sample collection at home', 'Digital report within 24 hours', 'Diabetologist consultation'],
    whyTest: ['Screen for diabetes', 'Monitor blood sugar control', 'Assess diabetes complications']
  },
  { 
    id: 'vitamin-d',
    name: 'Vitamin D', 
    price: 1100,
    originalPrice: 1600,
    discount: 31,
    category: 'Nutrition',
    description: 'Measures vitamin D levels',
    preparation: 'No special preparation required',
    duration: '15-20 minutes',
    sampleType: 'Blood',
    fasting: 'Not required',
    homeCollection: true,
    reportTime: '2-3 days',
    popular: true,
    icon: Sun,
    color: 'from-yellow-500 to-yellow-600',
    parameters: ['25-Hydroxy Vitamin D (Total)', '25-Hydroxy Vitamin D2', '25-Hydroxy Vitamin D3'],
    includes: ['Sample collection at home', 'Digital report within 72 hours', 'Nutritionist consultation'],
    whyTest: ['Check vitamin D deficiency', 'Assess bone health', 'Evaluate immune function']
  },
  { 
    id: 'covid-19-pcr',
    name: 'COVID-19 RT-PCR', 
    price: 1500,
    originalPrice: 2000,
    discount: 25,
    category: 'Infectious Diseases',
    description: 'Gold standard test for COVID-19 detection',
    preparation: 'No special preparation required',
    duration: '5-10 minutes',
    sampleType: 'Nasal/Throat Swab',
    fasting: 'Not required',
    homeCollection: false,
    reportTime: '24-48 hours',
    popular: true,
    icon: AlertCircle,
    color: 'from-indigo-500 to-indigo-600',
    parameters: ['SARS-CoV-2 RNA detection', 'Viral load assessment'],
    includes: ['Sample collection at center', 'Digital report within 48 hours', 'Travel certificate'],
    whyTest: ['Confirm COVID-19 infection', 'Travel requirements', 'Pre-surgery screening']
  },
];

export default function LabTests() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showQuickBook, setShowQuickBook] = useState(false);
  const [showTestDetails, setShowTestDetails] = useState(false);
  const [selectedTest, setSelectedTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [labTests, setLabTests] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [selectedFilters, setSelectedFilters] = useState({
    homeCollection: false,
    fastingRequired: false,
    sameDayReport: false
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const categories = ['all', 'Hematology', 'Cardiology', 'Endocrinology', 'Gastroenterology', 'Nephrology', 'Nutrition', 'Infectious Diseases'];

  // Fetch lab tests from API
  useEffect(() => {
    fetchLabTests();
  }, [search, selectedCategory]);

  const fetchLabTests = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Load static data immediately as fallback
      setLabTests(testCategories);
      
      const filters = {};
      if (selectedCategory !== 'all') filters.category = selectedCategory;
      if (search) filters.search = search;
      if (sortBy === 'popular') filters.popular = true;
      
      // Try to fetch from API, but don't show error if it fails
      try {
        const response = await labTestService.getLabTests(filters);
        
        // Transform API data to match component structure
        const transformedTests = response.data.map(test => ({
          id: test.id,
          name: test.name,
          price: test.discount_price || test.price,
          originalPrice: test.price,
          discount: test.discount_price ? Math.round((1 - test.discount_price / test.price) * 100) : 0,
          category: test.category,
          description: test.description,
          preparation: test.preparation || 'No special preparation required',
          duration: test.duration || '15-20 minutes',
          sampleType: test.sample_type || 'Blood',
          fasting: test.fasting_required ? 'Required' : 'Not required',
          homeCollection: test.home_collection,
          reportTime: test.report_time || '1-2 days',
          popular: test.is_popular,
          icon: getTestIcon(test.category),
          color: getTestColor(test.category),
          parameters: test.parameters || [],
          includes: test.includes || [],
          whyTest: test.why_test || []
        }));
        
        setLabTests(transformedTests);
      } catch (apiErr) {
        // API failed, but we already have static data loaded
        console.log('API unavailable, using static test data');
      }
    } catch (err) {
      console.error('Failed to fetch lab tests:', err);
      // Fallback to static data
      setLabTests(testCategories);
    } finally {
      setLoading(false);
    }
  };

  // Helper functions to get icon and color based on category
  const getTestIcon = (category) => {
    const iconMap = {
      'Hematology': Droplet,
      'Cardiology': HeartIcon,
      'Endocrinology': Brain,
      'Gastroenterology': Activity,
      'Nephrology': Activity,
      'Nutrition': Sun,
      'Infectious Diseases': AlertCircle
    };
    return iconMap[category] || FlaskConical;
  };

  const getTestColor = (category) => {
    const colorMap = {
      'Hematology': 'from-red-500 to-red-600',
      'Cardiology': 'from-pink-500 to-pink-600',
      'Endocrinology': 'from-blue-500 to-blue-600',
      'Gastroenterology': 'from-amber-500 to-amber-600',
      'Nephrology': 'from-purple-500 to-purple-600',
      'Nutrition': 'from-yellow-500 to-yellow-600',
      'Infectious Diseases': 'from-indigo-500 to-indigo-600'
    };
    return colorMap[category] || 'from-gray-500 to-gray-600';
  };

  const filtered = labTests.filter((test) => {
    const matchesSearch = !search || test.name.toLowerCase().includes(search.toLowerCase()) || 
                         test.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || test.category === selectedCategory;
    
    // Apply additional filters
    let matchesFilters = true;
    if (selectedFilters.homeCollection && !test.homeCollection) matchesFilters = false;
    if (selectedFilters.fastingRequired && test.fasting === 'Required') matchesFilters = false;
    if (selectedFilters.sameDayReport && test.reportTime !== 'Same day') matchesFilters = false;
    
    // Apply price range filter
    if (test.price < priceRange.min || test.price > priceRange.max) matchesFilters = false;
    
    return matchesSearch && matchesCategory && matchesFilters;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'discount') return b.discount - a.discount;
    if (sortBy === 'popular') return b.popular - a.popular;
    return 0;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#5DBB63] to-[#165028] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row items-center justify-between">
            <div className="lg:w-2/3 mb-6 lg:mb-0">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                  <FlaskConical className="w-7 h-7 text-white" />
                </div>
                <h1 className="text-4xl font-bold">Lab Tests</h1>
              </div>
              <p className="text-xl text-white/90 mb-6">
                Book lab tests with home collection. Get reports delivered digitally within 24-48 hours.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">NABL Certified Labs</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">Free Home Collection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  <span className="text-sm">Digital Reports</span>
                </div>
              </div>
            </div>
            <div className="lg:w-1/3">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <Gift className="w-6 h-6" />
                  <h3 className="text-lg font-semibold">Special Offer</h3>
                </div>
                <p className="text-white/90 mb-4">Get 20% off on all preventive health packages</p>
                <button className="w-full bg-white text-[#165028] py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  View Packages
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Zap className="w-5 h-5" />
              <span className="font-medium">Limited Time Offer: Book any 3 tests and get 1 free!</span>
            </div>
            <button className="bg-white text-purple-600 px-4 py-1 rounded-lg text-sm font-medium hover:bg-gray-100 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-3">
            {/* Search and Filters */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="search"
                    placeholder="Search lab tests..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                  />
                </div>
                
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </option>
                  ))}
                </select>

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
                              checked={selectedFilters.homeCollection}
                              onChange={(e) => setSelectedFilters(prev => ({ ...prev, homeCollection: e.target.checked }))}
                              className="rounded text-[#5DBB63]"
                            />
                            <span className="text-sm">Home Collection Available</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedFilters.fastingRequired}
                              onChange={(e) => setSelectedFilters(prev => ({ ...prev, fastingRequired: e.target.checked }))}
                              className="rounded text-[#5DBB63]"
                            />
                            <span className="text-sm">No Fasting Required</span>
                          </label>
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedFilters.sameDayReport}
                              onChange={(e) => setSelectedFilters(prev => ({ ...prev, sameDayReport: e.target.checked }))}
                              className="rounded text-[#5DBB63]"
                            />
                            <span className="text-sm">Same Day Report</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Test Type</label>
                        <div className="space-y-2">
                          {['Blood Test', 'Urine Test', 'Swab Test'].map(type => (
                            <label key={type} className="flex items-center gap-2">
                              <input type="radio" name="testType" className="text-[#5DBB63]" />
                              <span className="text-sm">{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Active Filters */}
              {(search || selectedCategory !== 'all' || Object.values(selectedFilters).some(v => v)) && (
                <div className="flex items-center gap-2 flex-wrap">
                  {search && (
                    <span className="px-3 py-1 bg-[#5DBB63]/10 text-[#165028] rounded-full text-sm">
                      Search: {search}
                      <button
                        onClick={() => setSearch('')}
                        className="ml-2 text-[#165028] hover:text-[#5DBB63]"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {selectedCategory !== 'all' && (
                    <span className="px-3 py-1 bg-[#5DBB63]/10 text-[#165028] rounded-full text-sm">
                      Category: {selectedCategory}
                      <button
                        onClick={() => setSelectedCategory('all')}
                        className="ml-2 text-[#165028] hover:text-[#5DBB63]"
                      >
                        ×
                      </button>
                    </span>
                  )}
                  {Object.entries(selectedFilters).map(([key, value]) => (
                    value && (
                      <span key={key} className="px-3 py-1 bg-[#5DBB63]/10 text-[#165028] rounded-full text-sm">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                        <button
                          onClick={() => setSelectedFilters(prev => ({ ...prev, [key]: false }))}
                          className="ml-2 text-[#165028] hover:text-[#5DBB63]"
                        >
                          ×
                        </button>
                      </span>
                    )
                  ))}
                </div>
              )}
            </div>

            {/* Test Grid */}
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader className="w-12 h-12 text-[#5DBB63] animate-spin mb-4" />
                <p className="text-gray-600">Loading lab tests...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">Error Loading Tests</h3>
                <p className="text-gray-500 mb-4">{error}</p>
                <button
                  onClick={fetchLabTests}
                  className="px-6 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f]"
                >
                  Try Again
                </button>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sorted.map((test) => (
                  <motion.div
                    key={test.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    whileHover={{ y: -5 }}
                    className="group bg-white rounded-2xl border border-gray-100 hover:border-[#5DBB63]/30 hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Test Header */}
                    <div className={`p-4 bg-gradient-to-br ${test.color} text-white relative overflow-hidden`}>
                      <div className="absolute top-0 right-0 w-16 h-16 bg-white/10 rounded-full -translate-y-8 translate-x-8" />
                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <test.icon className="w-8 h-8" />
                          {test.popular && (
                            <span className="px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                              Popular
                            </span>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg mb-1 line-clamp-2 cursor-pointer hover:text-white/90 transition-colors" 
                            onClick={() => {
                              setSelectedTest(test);
                              navigate(`/lab-tests/${test.id}`);
                            }}>
                            {test.name}
                        </h3>
                        <p className="text-white/80 text-sm">{test.category}</p>
                      </div>
                    </div>

                    {/* Test Body */}
                    <div className="p-4">
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{test.description}</p>

                      {/* Test Details */}
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <TestTube className="w-4 h-4" />
                          <span>{test.sampleType}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-4 h-4" />
                          <span>{test.reportTime}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Home className="w-4 h-4" />
                          <span>{test.homeCollection ? 'Home Collection' : 'Center Visit'}</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-2xl font-bold text-[#111827]">৳{test.price.toLocaleString()}</span>
                          {test.discount > 0 && (
                            <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">
                              {test.discount}% OFF
                            </span>
                          )}
                        </div>
                        {test.originalPrice > test.price && (
                          <span className="text-sm text-gray-400 line-through">৳{test.originalPrice.toLocaleString()}</span>
                        )}
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2">
                        <button
                          onClick={() => {
                            setSelectedTest(test);
                            setShowQuickBook(true);
                          }}
                          className="w-full py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] font-medium transition-colors"
                        >
                          Quick Book
                        </button>
                        <div className="flex gap-2">
                          <button
                            onClick={() => {
                              setSelectedTest(test);
                              setShowTestDetails(true);
                            }}
                            className="flex-1 py-2 border border-[#5DBB63] text-[#5DBB63] rounded-lg hover:bg-[#5DBB63]/5 text-center text-sm font-medium transition-colors"
                          >
                            Quick Details
                          </button>
                          <button 
                            onClick={() => navigate(`/lab-tests/${test.id}`)}
                            className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors"
                          >
                            Full Details
                          </button>
                          <button className="flex-1 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors">
                            Compare
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* No Results */}
            {sorted.length === 0 && (
              <div className="text-center py-12">
                <FlaskConical className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-700 mb-2">No tests found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your search or filters</p>
                <button
                  onClick={() => {
                    setSearch('');
                    setSelectedCategory('all');
                    setSortBy('popular');
                    setSelectedFilters({
                      homeCollection: false,
                      fastingRequired: false,
                      sameDayReport: false
                    });
                  }}
                  className="px-6 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f]"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Side Banner - Health Package */}
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Award className="w-8 h-8" />
                <h3 className="text-lg font-bold">Complete Health Package</h3>
              </div>
              <p className="text-white/90 mb-4 text-sm">
                Comprehensive health checkup with 50+ tests at special price
              </p>
              <div className="bg-white/20 rounded-lg p-3 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm">Original Price</span>
                  <span className="line-through text-sm">৳8,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold">Offer Price</span>
                  <span className="text-2xl font-bold">৳4,999</span>
                </div>
              </div>
              <button className="w-full bg-white text-blue-600 py-2 px-4 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                Book Now
              </button>
            </div>

            {/* Side Banner - Support */}
            <div className="bg-gradient-to-br from-green-500 to-teal-600 rounded-2xl p-6 text-white">
              <div className="flex items-center gap-3 mb-4">
                <Phone className="w-8 h-8" />
                <h3 className="text-lg font-bold">Need Help?</h3>
              </div>
              <p className="text-white/90 mb-4 text-sm">
                Our health experts are here to help you choose the right tests
              </p>
              <div className="space-y-3">
                <button className="w-full bg-white/20 backdrop-blur-sm py-2 px-4 rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call Us
                </button>
                <button className="w-full bg-white/20 backdrop-blur-sm py-2 px-4 rounded-lg font-medium hover:bg-white/30 transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Live Chat
                </button>
              </div>
            </div>

            {/* Testimonials */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-[#111827] mb-4">What Patients Say</h3>
              <div className="space-y-4">
                <div className="border-b pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    "Quick home collection and fast reports. Very professional service."
                  </p>
                  <p className="text-xs text-gray-500">- Sarah Ahmed</p>
                </div>
                <div className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">
                    "Affordable prices and reliable test results. Highly recommended!"
                  </p>
                  <p className="text-xs text-gray-500">- Mohammad Rahman</p>
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-[#111827] mb-4">Why Trust Us</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <BadgeCheck className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">NABL Certified</p>
                    <p className="text-xs text-gray-500">Accredited laboratories</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Expert Phlebotomists</p>
                    <p className="text-xs text-gray-500">Trained professionals</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">100% Privacy</p>
                    <p className="text-xs text-gray-500">Secure data protection</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Popular Tests Section */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-[#111827] mb-2">Popular Tests</h2>
              <p className="text-gray-600">Most frequently booked lab tests</p>
            </div>
            <button className="text-[#5DBB63] font-medium hover:text-[#165028] flex items-center gap-2">
              View All Tests
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testCategories.filter(test => test.popular).slice(0, 4).map((test) => (
              <div
                key={test.id}
                className="bg-gradient-to-br from-[#5DBB63]/10 to-[#165028]/10 rounded-2xl p-6 border border-[#5DBB63]/20"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${test.color} flex items-center justify-center`}>
                    <test.icon className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111827]">{test.name}</h4>
                    <p className="text-sm text-gray-600">{test.category}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-[#111827]">৳{test.price.toLocaleString()}</span>
                  <button
                    onClick={() => {
                      setSelectedTest(test);
                      setShowQuickBook(true);
                    }}
                    className="px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] text-sm font-medium transition-colors"
                  >
                    Book
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Test Details Modal */}
      <AnimatePresence>
        {showTestDetails && selectedTest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowTestDetails(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className={`relative p-6 bg-gradient-to-br ${selectedTest.color} text-white`}>
                <div className="absolute top-6 right-6">
                  <button
                    onClick={() => setShowTestDetails(false)}
                    className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-xl bg-white/20 flex items-center justify-center">
                    <selectedTest.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold mb-2">{selectedTest.name}</h2>
                    <p className="text-white/90 mb-4">{selectedTest.description}</p>
                    <div className="flex flex-wrap gap-3">
                      {selectedTest.popular && (
                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                          Popular
                        </span>
                      )}
                      <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                        {selectedTest.category}
                      </span>
                      {selectedTest.homeCollection && (
                        <span className="px-3 py-1 bg-white/20 rounded-full text-sm font-medium">
                          Home Collection Available
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {/* Main Content */}
                  <div className="md:col-span-2 space-y-6">
                    {/* Test Overview */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-[#111827] mb-4">Test Overview</h3>
                      <p className="text-gray-600 mb-4">{selectedTest.description}</p>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <TestTube className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Sample Type</p>
                            <p className="text-gray-600 text-sm">{selectedTest.sampleType}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                            <Clock className="w-5 h-5 text-green-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Report Time</p>
                            <p className="text-gray-600 text-sm">{selectedTest.reportTime}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Preparation</p>
                            <p className="text-gray-600 text-sm">{selectedTest.preparation}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                            <Home className="w-5 h-5 text-orange-600" />
                          </div>
                          <div>
                            <p className="font-medium text-sm">Collection</p>
                            <p className="text-gray-600 text-sm">
                              {selectedTest.homeCollection ? 'Home Available' : 'Center Only'}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Parameters Included */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-[#111827] mb-4">Parameters Included</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {selectedTest.parameters.map((param, index) => (
                          <div key={index} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <CheckCircle className="w-5 h-5 text-[#5DBB63] flex-shrink-0" />
                            <span className="text-sm text-gray-700">{param}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Why This Test */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-[#111827] mb-4">Why This Test?</h3>
                      <div className="space-y-3">
                        {selectedTest.whyTest.map((reason, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-[#5DBB63]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle className="w-3 h-3 text-[#5DBB63]" />
                            </div>
                            <span className="text-sm text-gray-700">{reason}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* What's Included */}
                    <div className="bg-white border border-gray-200 rounded-xl p-6">
                      <h3 className="text-lg font-semibold text-[#111827] mb-4">What's Included</h3>
                      <div className="space-y-3">
                        {selectedTest.includes.map((item, index) => (
                          <div key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle className="w-3 h-3 text-blue-600" />
                            </div>
                            <span className="text-sm text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="space-y-6">
                    {/* Pricing */}
                    <div className="bg-gradient-to-br from-[#5DBB63] to-[#165028] rounded-xl p-6 text-white">
                      <h3 className="text-lg font-semibold mb-4">Pricing</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-white/80">Test Price</span>
                          <span className="text-2xl font-bold">৳{selectedTest.price.toLocaleString()}</span>
                        </div>
                        {selectedTest.originalPrice > selectedTest.price && (
                          <div className="flex justify-between items-center">
                            <span className="text-white/80">Original Price</span>
                            <span className="line-through text-white/60">৳{selectedTest.originalPrice.toLocaleString()}</span>
                          </div>
                        )}
                        {selectedTest.discount > 0 && (
                          <div className="flex justify-between items-center">
                            <span className="text-white/80">You Save</span>
                            <span className="font-semibold">
                              ৳{(selectedTest.originalPrice - selectedTest.price).toLocaleString()}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="space-y-3">
                      <button
                        onClick={() => {
                          setShowTestDetails(false);
                          setShowQuickBook(true);
                        }}
                        className="w-full py-3 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] font-medium transition-colors"
                      >
                        Quick Book Now
                      </button>
                      <button
                        onClick={() => {
                          setShowTestDetails(false);
                          navigate(`/lab-tests/${selectedTest.id}/book`);
                        }}
                        className="w-full py-3 border border-[#5DBB63] text-[#5DBB63] rounded-lg hover:bg-[#5DBB63]/5 font-medium transition-colors"
                      >
                        Full Booking Details
                      </button>
                      <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
                        Add to Compare
                      </button>
                    </div>

                    {/* Need Help */}
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-[#111827] mb-3">Need Help?</h3>
                      <p className="text-sm text-gray-600 mb-4">
                        Our health experts are here to help you choose the right test.
                      </p>
                      <div className="space-y-2">
                        <button className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                          <Phone className="w-4 h-4" />
                          Call Us
                        </button>
                        <button className="w-full py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium transition-colors flex items-center justify-center gap-2">
                          <MessageCircle className="w-4 h-4" />
                          Live Chat
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quick Book Modal */}
      <AnimatePresence>
        {showQuickBook && selectedTest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setShowQuickBook(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-[#111827]">Quick Booking</h3>
                  <button
                    onClick={() => setShowQuickBook(false)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <X className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${selectedTest.color} flex items-center justify-center`}>
                    <selectedTest.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111827]">{selectedTest.name}</h4>
                    <p className="text-sm text-gray-600">{selectedTest.category}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Preferred Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Collection Type</label>
                    <div className="grid grid-cols-2 gap-2">
                      <button className="py-2 px-4 border-2 border-[#5DBB63] bg-[#5DBB63]/5 text-[#5DBB63] rounded-lg font-medium">
                        Home Collection
                      </button>
                      <button className="py-2 px-4 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50">
                        Center Visit
                      </button>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Test Price</span>
                      <span className="font-semibold text-[#111827]">৳{selectedTest.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate(`/lab-tests/${selectedTest.id}/book`)}
                    className="w-full py-3 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] font-medium"
                  >
                    Proceed to Booking
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By proceeding, you agree to our terms and conditions
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
