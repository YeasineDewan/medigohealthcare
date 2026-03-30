import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FlaskConical, ArrowLeft, Clock, TestTube, Home, Calendar, CheckCircle, Star,
  Phone, MessageCircle, Heart, Activity, Droplet, Brain, AlertCircle, Sun,
  Shield, Award, Users, FileText, Download, Share2, Bookmark, ChevronRight,
  Loader, AlertCircle as AlertIcon
} from 'lucide-react';
import { Button } from '../components/core/Button';
import labTestService from '../services/labTestService';

// Helper functions for icons and colors
const getTestIcon = (category) => {
  const iconMap = {
    'Hematology': Droplet,
    'Cardiology': Heart,
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

export default function LabTestDetails() {
  const { testId } = useParams();
  const navigate = useNavigate();
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showQuickBook, setShowQuickBook] = useState(false);
  const [relatedTests, setRelatedTests] = useState([]);

  useEffect(() => {
    fetchTestDetails();
  }, [testId]);

  const fetchTestDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Fetch test details
      const testData = await labTestService.getLabTest(testId);
      
      // Transform API data
      const transformedTest = {
        id: testData.id,
        name: testData.name,
        price: testData.discount_price || testData.price,
        originalPrice: testData.price,
        discount: testData.discount_price ? Math.round((1 - testData.discount_price / testData.price) * 100) : 0,
        category: testData.category,
        description: testData.description,
        preparation: testData.preparation || 'No special preparation required',
        duration: testData.duration || '15-20 minutes',
        sampleType: testData.sample_type || 'Blood',
        fasting: testData.fasting_required ? 'Required' : 'Not required',
        homeCollection: testData.home_collection,
        reportTime: testData.report_time || '1-2 days',
        popular: testData.is_popular,
        icon: getTestIcon(testData.category),
        color: getTestColor(testData.category),
        parameters: testData.parameters || [],
        includes: testData.includes || [],
        whyTest: testData.why_test || []
      };
      
      setTest(transformedTest);
      
      // Fetch related tests (same category)
      try {
        const relatedResponse = await labTestService.getLabTests({ 
          category: testData.category,
          per_page: 4 
        });
        const related = relatedResponse.data
          .filter(t => t.id !== testData.id)
          .slice(0, 3)
          .map(t => ({
            ...t,
            icon: getTestIcon(t.category),
            color: getTestColor(t.category),
            price: t.discount_price || t.price,
            originalPrice: t.price,
            discount: t.discount_price ? Math.round((1 - t.discount_price / t.price) * 100) : 0,
          }));
        setRelatedTests(related);
      } catch (err) {
        console.error('Failed to fetch related tests:', err);
      }
      
    } catch (err) {
      console.error('Failed to fetch test details:', err);
      setError('Failed to load test details. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center">
          <Loader className="w-12 h-12 text-[#5DBB63] animate-spin mx-auto mb-4" />
          <p className="text-gray-600">Loading test details...</p>
        </div>
      </div>
    );
  }

  if (error || !test) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
        <div className="text-center max-w-md mx-4">
          <AlertIcon className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Test Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The requested test could not be found.'}</p>
          <div className="space-y-3">
            <button
              onClick={fetchTestDetails}
              className="w-full py-3 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] font-medium"
            >
              Try Again
            </button>
            <Link
              to="/lab-tests"
              className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium block text-center"
            >
              Back to Lab Tests
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className={`bg-gradient-to-br ${test.color} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={() => navigate('/lab-tests')}
              className="p-2 rounded-lg bg-white/20 hover:bg-white/30 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
                <test.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{test.name}</h1>
                <p className="text-white/90">{test.category}</p>
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <p className="text-xl text-white/90 mb-6">{test.description}</p>
              
              <div className="flex flex-wrap gap-3">
                {test.popular && (
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    Popular Test
                  </span>
                )}
                {test.homeCollection && (
                  <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                    Home Collection Available
                  </span>
                )}
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                  {test.sampleType} Test
                </span>
                <span className="px-4 py-2 bg-white/20 rounded-full text-sm font-medium">
                  Report in {test.reportTime}
                </span>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold mb-2">৳{test.price.toLocaleString()}</div>
                {test.originalPrice > test.price && (
                  <div className="text-white/80">
                    <span className="line-through">৳{test.originalPrice.toLocaleString()}</span>
                    <span className="ml-2 px-2 py-1 bg-white/20 rounded-full text-xs font-medium">
                      {test.discount}% OFF
                    </span>
                  </div>
                )}
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={() => setShowQuickBook(true)}
                  className="w-full py-3 bg-white text-[#165028] rounded-lg hover:bg-gray-100 font-medium transition-colors"
                >
                  Quick Book Now
                </button>
                <Link
                  to={`/lab-tests/${test.id}/book`}
                  className="w-full py-3 bg-white/20 backdrop-blur-sm text-white rounded-lg hover:bg-white/30 font-medium transition-colors block text-center"
                >
                  Full Booking Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Test Overview */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-[#111827] mb-6">Test Overview</h2>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <TestTube className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111827] mb-1">Sample Type</h3>
                    <p className="text-gray-600">{test.sampleType}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111827] mb-1">Report Time</h3>
                    <p className="text-gray-600">{test.reportTime}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111827] mb-1">Preparation</h3>
                    <p className="text-gray-600">{test.preparation}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Home className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#111827] mb-1">Collection</h3>
                    <p className="text-gray-600">
                      {test.homeCollection ? 'Home Collection Available' : 'Center Visit Required'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="font-semibold text-[#111827] mb-3">About This Test</h3>
                <p className="text-gray-600 leading-relaxed">{test.description}</p>
              </div>
            </div>

            {/* Parameters Included */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-[#111827] mb-6">Parameters Included</h2>
              <div className="grid md:grid-cols-2 gap-4">
                {test.parameters.map((param, index) => (
                  <div key={index} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                    <CheckCircle className="w-5 h-5 text-[#5DBB63] flex-shrink-0" />
                    <span className="text-gray-700">{param}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why This Test */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-[#111827] mb-6">Why This Test?</h2>
              <div className="space-y-4">
                {test.whyTest.map((reason, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-[#5DBB63]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-[#5DBB63]" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{reason}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* What's Included */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-[#111827] mb-6">What's Included</h2>
              <div className="space-y-4">
                {test.includes.map((item, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Related Tests */}
            {relatedTests.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-[#111827] mb-6">Related Tests</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedTests.map((relatedTest) => (
                    <div
                      key={relatedTest.id}
                      className="bg-gray-50 rounded-xl p-6 hover:shadow-md transition-shadow cursor-pointer"
                      onClick={() => navigate(`/lab-tests/${relatedTest.id}`)}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${relatedTest.color} flex items-center justify-center`}>
                          <relatedTest.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-[#111827] text-sm">{relatedTest.name}</h4>
                          <p className="text-xs text-gray-600">{relatedTest.category}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#111827]">৳{relatedTest.price.toLocaleString()}</span>
                        <ChevronRight className="w-4 h-4 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-[#111827] mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full py-3 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] font-medium transition-colors flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Book Now
                </button>
                <button className="w-full py-3 border border-[#5DBB63] text-[#5DBB63] rounded-lg hover:bg-[#5DBB63]/5 font-medium transition-colors flex items-center justify-center gap-2">
                  <Bookmark className="w-4 h-4" />
                  Save for Later
                </button>
                <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center justify-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share Test
                </button>
                <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center justify-center gap-2">
                  <Download className="w-4 h-4" />
                  Download Info
                </button>
              </div>
            </div>

            {/* Need Help */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-[#111827] mb-4">Need Help?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Our health experts are here to help you choose the right test and answer your questions.
              </p>
              <div className="space-y-3">
                <button className="w-full py-3 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] font-medium transition-colors flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call Us
                </button>
                <button className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Live Chat
                </button>
              </div>
            </div>

            {/* Trust Indicators */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="font-semibold text-[#111827] mb-4">Why Trust Us</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Shield className="w-5 h-5 text-[#5DBB63]" />
                  <div>
                    <p className="font-medium text-sm">NABL Certified</p>
                    <p className="text-xs text-gray-500">Accredited laboratories</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">Expert Phlebotomists</p>
                    <p className="text-xs text-gray-500">Trained professionals</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="font-medium text-sm">Quality Assurance</p>
                    <p className="text-xs text-gray-500">Accurate results guaranteed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Info */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6">
              <h3 className="font-semibold text-[#111827] mb-4">Test Information</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Test Code</span>
                  <span className="font-medium">LAB-{test.id.toString().padStart(4, '0')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Category</span>
                  <span className="font-medium">{test.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-medium">{test.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Fasting</span>
                  <span className="font-medium">{test.fasting}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Book Modal */}
      <AnimatePresence>
        {showQuickBook && (
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
                    <ArrowLeft className="w-5 h-5 text-gray-500" />
                  </button>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${test.color} flex items-center justify-center`}>
                    <test.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#111827]">{test.name}</h4>
                    <p className="text-sm text-gray-600">{test.category}</p>
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

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Test Price</span>
                      <span className="font-semibold text-[#111827]">৳{test.price.toLocaleString()}</span>
                    </div>
                  </div>

                  <Link
                    to={`/lab-tests/${test.id}/book`}
                    onClick={() => setShowQuickBook(false)}
                    className="w-full py-3 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] font-medium block text-center"
                  >
                    Proceed to Booking
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
