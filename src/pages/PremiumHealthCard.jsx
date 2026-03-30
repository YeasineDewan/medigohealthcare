import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  CreditCard, 
  CheckCircle, 
  Phone, 
  Mail, 
  Clock, 
  Users, 
  Shield,
  ArrowLeft,
  Star,
  Heart,
  Droplet,
  Calendar,
  Percent,
  DollarSign,
  Home,
  ChevronRight
} from 'lucide-react';

const benefits = [
  {
    icon: Percent,
    title: 'Pathological Tests',
    titleBn: 'প্যাথলজিক্যাল টেস্ট',
    description: '50% discount on all pathological tests',
    descriptionBn: 'সকল প্যাথলজিক্যাল টেস্টে ৫০% ছাড়',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: DollarSign,
    title: 'Surgery Discount',
    titleBn: 'সার্জারি ছাড়',
    description: '15% discount on all types of surgeries',
    descriptionBn: 'সকল ধরনের সার্জারিতে ১৫% ছাড়',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Heart,
    title: 'Normal Delivery',
    titleBn: 'নরমাল ডেলিভারি',
    description: 'Only 3500 Taka for normal delivery',
    descriptionBn: 'নরমাল ডেলিভারি মাত্র ৩৫০০ টাকা',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50'
  },
  {
    icon: Users,
    title: 'Medical Camps',
    titleBn: 'মেডিকেল ক্যাম্প',
    description: 'Free medical services in various medical camps',
    descriptionBn: 'বিভিন্ন মেডিকেল ক্যাম্পে বিনামূল্যে চিকিৎসা সেবা',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Calendar,
    title: 'No Expiry',
    titleBn: 'কোনো মেয়াদ নেই',
    description: 'Premium card has no specific expiry date',
    descriptionBn: 'প্রিমিয়াম কার্ডের কোনো নির্দিষ্ট মেয়াদ নেই',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    icon: Shield,
    title: 'Family Coverage',
    titleBn: 'পরিবারের কভারেজ',
    description: 'Registered person and family can receive medical services',
    descriptionBn: 'নিবন্ধিত ব্যক্তি ও পরিবার চিকিৎসা সেবা পাবে',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50'
  },
  {
    icon: Phone,
    title: 'Doctor Consultation',
    titleBn: 'ডাক্তারের পরামর্শ',
    description: 'Outdoor doctor consultation for only 50 Taka (9 AM - 4 PM)',
    descriptionBn: 'আউটডোর ডাক্তারের পরামর্শ মাত্র ৫০ টাকা (সকাল ৯টা - বিকেল ৪টা)',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    icon: Droplet,
    title: 'Medicine Discount',
    titleBn: 'ওষুধ ছাড়',
    description: '12% discount on all types of local medicines',
    descriptionBn: 'সকল ধরনের স্থানীয় ওষুধে ১২% ছাড়',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    icon: Shield,
    title: 'Emergency Services',
    titleBn: 'জরুরি সেবা',
    description: '15% discount on all services in the emergency department',
    descriptionBn: 'জরুরি বিভাগের সকল সেবায় ১৫% ছাড়',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
  {
    icon: Droplet,
    title: 'Free Blood',
    titleBn: 'বিনামূল্যে রক্ত',
    description: 'Provision for free blood if needed',
    descriptionBn: 'প্রয়োজনে বিনামূল্যে রক্তের ব্যবস্থা',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    icon: Calendar,
    title: 'Friday Special',
    titleBn: 'শুক্রবার বিশেষ',
    description: '100 Taka discount from specialist doctors on Fridays',
    descriptionBn: 'শুক্রবার বিশেষজ্ঞ ডাক্তারদের ফি থেকে ১০০ টাকা ছাড়',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Home,
    title: 'Home Service',
    titleBn: 'বাড়িতে সেবা',
    description: 'Free doctor service at home for elderly patients',
    descriptionBn: 'বয়স্ক রোগীদের জন্য বাড়িতে বিনামূল্যে ডাক্তারের সেবা',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  }
];

export default function PremiumHealthCard() {
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-amber-500 to-amber-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-sm rounded-full">
                <CreditCard className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Premium Health Card
              <span className="block text-2xl md:text-3xl mt-2 text-amber-100">প্রিমিয়াম হেলথ কার্ড</span>
            </h1>
            <p className="text-xl text-amber-100 max-w-3xl mx-auto leading-relaxed">
              Experience the ultimate healthcare benefits with our premium membership card, 
              offering maximum discounts and priority services for you and your family.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
      </div>

      {/* Back Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/health-cards"
            className="inline-flex items-center gap-2 text-amber-600 hover:text-amber-700 font-medium transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Health Cards
          </Link>
        </motion.div>
      </div>

      {/* Card Image Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              {/* Image Placeholder */}
              <div className="relative h-96 lg:h-full bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="w-16 h-16 text-amber-600" />
                  </div>
                  <p className="text-amber-700 font-medium">Premium Card Design</p>
                  <p className="text-amber-600 text-sm mt-2">Image placeholder for card design</p>
                </div>
              </div>
              
              {/* Card Details */}
              <div className="p-8 lg:p-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Premium Health Card Details
                  <span className="block text-xl text-gray-600 mt-2">প্রিমিয়াম হেলথ কার্ডের বিবরণ</span>
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Star className="w-6 h-6 text-amber-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Exclusive Premium Status</h4>
                      <p className="text-gray-600">Enjoy the highest level of healthcare benefits with our premium membership card, designed for those who demand the best in medical care.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Lifetime Validity</h4>
                      <p className="text-gray-600">Your premium card never expires. Once you're a member, you enjoy lifetime benefits without any renewal hassles.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Family Coverage</h4>
                      <p className="text-gray-600">Extend premium benefits to your entire family. Your spouse, children, and parents can all enjoy the same exclusive healthcare services.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-amber-50 rounded-xl border border-amber-200">
                  <h4 className="text-lg font-semibold text-amber-900 mb-3">Premium Features Include:</h4>
                  <ul className="space-y-2 text-amber-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Priority appointment booking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Exclusive access to premium wards</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Personal healthcare coordinator</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>International medical consultation</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Benefits Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Exclusive Benefits
                <span className="block text-xl text-gray-600 mt-2">বিশেষ সুবিধাসমূহ</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.05 }}
                      whileHover={{ scale: 1.02 }}
                      onClick={() => setSelectedBenefit(benefit)}
                      className={`p-6 rounded-xl ${benefit.bgColor} border-2 border-amber-200 cursor-pointer hover:shadow-lg transition-all duration-300`}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`p-3 rounded-full ${benefit.color} bg-white`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 mb-1">
                            {benefit.title}
                            <span className="block text-sm text-gray-700 mt-1">{benefit.titleBn}</span>
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed">
                            {benefit.description}
                            <span className="block text-xs text-gray-500 mt-1">{benefit.descriptionBn}</span>
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="sticky top-8 space-y-6"
            >
              {/* Card Preview */}
              <div className="bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Premium Card</h3>
                    <p className="text-amber-100">Lifetime Validity</p>
                  </div>
                  <CreditCard className="w-12 h-12 text-amber-200" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-amber-100">Card Type:</span>
                    <span className="font-semibold">Premium</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-100">Members:</span>
                    <span className="font-semibold">Family</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-100">Status:</span>
                    <span className="font-semibold">Active</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 transition-colors">
                    <span className="font-medium">Apply Now</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
                    <span className="font-medium">Download Brochure</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
                    <span className="font-medium">Contact Support</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-3 text-gray-700 hover:text-amber-600 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>+1 (234) 567-890</span>
                  </a>
                  <a
                    href="mailto:info@medigo.com"
                    className="flex items-center gap-3 text-gray-700 hover:text-amber-600 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>info@medigo.com</span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5" />
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-amber-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">24/7 Premium Support</h3>
              <p className="text-gray-600 mb-4">Dedicated premium support team available round the clock for all your healthcare needs.</p>
              <a href="tel:+1234567890" className="text-amber-600 font-medium hover:text-amber-700">+1 (234) 567-890</a>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Annual Health Checkup</h3>
              <p className="text-gray-600 mb-4">Comprehensive annual health checkup included with premium membership at no additional cost.</p>
              <button className="text-green-600 font-medium hover:text-green-700">Schedule Checkup</button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">International Coverage</h3>
              <p className="text-gray-600 mb-4">Access to international healthcare facilities and emergency medical evacuation services.</p>
              <button className="text-blue-600 font-medium hover:text-blue-700">Learn More</button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              What Our Premium Members Say
              <span className="block text-xl text-gray-600 mt-2">আমাদের প্রিমিয়াম সদস্যরা কি বলেন</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"The Premium Health Card has been a game-changer for our family. The discounts and priority services are exceptional."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-200 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">Sarah Johnson</p>
                  <p className="text-sm text-gray-600">Premium Member</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"Lifetime validity and family coverage make this the best healthcare investment we've ever made."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">Michael Chen</p>
                  <p className="text-sm text-gray-600">Premium Member</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gray-50 rounded-xl p-6"
            >
              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-4 h-4 text-amber-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"The personal healthcare coordinator and international coverage give us peace of mind wherever we travel."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-200 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">Emily Davis</p>
                  <p className="text-sm text-gray-600">Premium Member</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-amber-500 to-amber-600 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Ready to Get Your Premium Card?
              <span className="block text-xl text-amber-100 mt-2">আপনি কি প্রিমিয়াম কার্ড পেতে প্রস্তুত?</span>
            </h2>
            <p className="text-amber-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied members enjoying exclusive healthcare benefits.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-amber-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                Apply Now
              </button>
              <a
                href="tel:+1234567890"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-amber-700 text-white font-semibold rounded-full hover:bg-amber-800 transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Call for Details
              </a>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Benefit Detail Modal */}
      <AnimatePresence>
        {selectedBenefit && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedBenefit(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`inline-flex p-4 rounded-full ${selectedBenefit.bgColor} mb-4`}>
                <selectedBenefit.icon className={`w-8 h-8 ${selectedBenefit.color}`} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedBenefit.title}
                <span className="block text-lg text-gray-600 mt-1">{selectedBenefit.titleBn}</span>
              </h3>
              <p className="text-gray-600 mb-6">
                {selectedBenefit.description}
                <span className="block text-sm text-gray-500 mt-2">{selectedBenefit.descriptionBn}</span>
              </p>
              <button
                onClick={() => setSelectedBenefit(null)}
                className="w-full px-6 py-3 bg-amber-500 text-white font-semibold rounded-full hover:bg-amber-600 transition-colors"
              >
                Got it
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
