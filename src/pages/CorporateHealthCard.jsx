import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Building, 
  CheckCircle, 
  Phone, 
  Mail, 
  Clock, 
  Users,
  ArrowLeft,
  Star,
  Heart,
  Droplet,
  Calendar,
  Percent,
  DollarSign,
  Briefcase,
  ChevronRight,
  Shield
} from 'lucide-react';

const benefits = [
  {
    icon: Percent,
    title: 'Pathological Tests',
    titleBn: 'প্যাথলজিক্যাল টেস্ট',
    description: '30% discount on all pathological tests',
    descriptionBn: 'সকল প্যাথলজিক্যাল টেস্টে ৩০% ছাড়',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: DollarSign,
    title: 'Surgery Discount',
    titleBn: 'সার্জারি ছাড়',
    description: '20% discount on all types of surgeries',
    descriptionBn: 'সকল ধরনের সার্জারিতে ২০% ছাড়',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Heart,
    title: 'Normal Delivery',
    titleBn: 'নরমাল ডেলিভারি',
    description: 'Special rates for corporate employees',
    descriptionBn: 'কর্পোরেট কর্মচারীদের জন্য বিশেষ মূল্য',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50'
  },
  {
    icon: Shield,
    title: 'Emergency Services',
    titleBn: 'জরুরি সেবা',
    description: 'Priority emergency services for corporate staff',
    descriptionBn: 'কর্পোরেট স্টাফদের জন্য অগ্রাধিকার জরুরি সেবা',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    icon: Users,
    title: 'Medical Camps',
    titleBn: 'মেডিকেল ক্যাম্প',
    description: 'Free medical services in various medical camps',
    descriptionBn: 'বিভিন্ন মেডিকেল ক্যাম্পে বিনামূল্যে চিকিৎসা সেবা',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
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
    icon: Briefcase,
    title: 'Corporate Packages',
    titleBn: 'কর্পোরেট প্যাকেজ',
    description: 'Customized packages for organizations',
    descriptionBn: 'প্রতিষ্ঠানের জন্য কাস্টমাইজড প্যাকেজ',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    icon: Calendar,
    title: 'Validity Period',
    titleBn: 'মেয়াদকাল',
    description: 'Flexible validity periods for corporate needs',
    descriptionBn: 'কর্পোরেট চাহিদার জন্য নমনীয় মেয়াদকাল',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50'
  },
  {
    icon: Phone,
    title: 'Dedicated Support',
    titleBn: 'নিবেদিত সহায়তা',
    description: '24/7 dedicated support for corporate clients',
    descriptionBn: 'কর্পোরেট ক্লায়েন্টদের জন্য ২৪/৭ নিবেদিত সহায়তা',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Shield,
    title: 'Family Coverage',
    titleBn: 'পরিবারের কভারেজ',
    description: 'Optional family coverage for employees',
    descriptionBn: 'কর্মচারীদের জন্য ঐচ্ছিক পরিবারের কভারেজ',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
  {
    icon: Calendar,
    title: 'Health Checkups',
    titleBn: 'স্বাস্থ্য পরীক্ষা',
    description: 'Annual health checkup packages included',
    descriptionBn: 'বার্ষিক স্বাস্থ্য পরীক্ষা প্যাকেজ অন্তর্ভুক্ত',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Briefcase,
    title: 'Wellness Programs',
    titleBn: 'ওয়েলনেস প্রোগ্রাম',
    description: 'Corporate wellness programs and seminars',
    descriptionBn: 'কর্পোরেট ওয়েলনেস প্রোগ্রাম এবং সেমিনার',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  }
];

export default function CorporateHealthCard() {
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-purple-500 to-purple-600 text-white">
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
                <Building className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Corporate Health Card
              <span className="block text-2xl md:text-3xl mt-2 text-purple-100">কর্পোরেট হেলথ কার্ড</span>
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Special healthcare solutions designed for corporate employees and organizations, 
              offering comprehensive benefits and priority services for your workforce.
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
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 font-medium transition-colors"
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
              <div className="relative h-96 lg:h-full bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Building className="w-16 h-16 text-purple-600" />
                  </div>
                  <p className="text-purple-700 font-medium">Corporate Card Design</p>
                  <p className="text-purple-600 text-sm mt-2">Image placeholder for card design</p>
                </div>
              </div>
              
              {/* Card Details */}
              <div className="p-8 lg:p-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Corporate Health Card Details
                  <span className="block text-xl text-gray-600 mt-2">কর্পোরেট হেলথ কার্ডের বিবরণ</span>
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Building className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Corporate Wellness Solutions</h4>
                      <p className="text-gray-600">Comprehensive healthcare packages designed specifically for corporate employees and their families.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Customized Packages</h4>
                      <p className="text-gray-600">Tailored healthcare solutions to meet your organization's specific needs and budget requirements.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Priority Services</h4>
                      <p className="text-gray-600">Exclusive priority access to medical services, appointments, and emergency care for your employees.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-purple-50 rounded-xl border border-purple-200">
                  <h4 className="text-lg font-semibold text-purple-900 mb-3">Corporate Features Include:</h4>
                  <ul className="space-y-2 text-purple-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>On-site health checkups</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Corporate wellness programs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Employee health tracking</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Dedicated account manager</span>
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
                Corporate Benefits
                <span className="block text-xl text-gray-600 mt-2">কর্পোরেট সুবিধাসমূহ</span>
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
                      className={`p-6 rounded-xl ${benefit.bgColor} border-2 border-purple-200 cursor-pointer hover:shadow-lg transition-all duration-300`}
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
              <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Corporate Card</h3>
                    <p className="text-purple-100">Flexible Plans</p>
                  </div>
                  <Building className="w-12 h-12 text-purple-200" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-purple-100">Card Type:</span>
                    <span className="font-semibold">Corporate</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-100">Employees:</span>
                    <span className="font-semibold">Custom</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-100">Status:</span>
                    <span className="font-semibold">Active</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-purple-50 text-purple-700 hover:bg-purple-100 transition-colors">
                    <span className="font-medium">Request Quote</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
                    <span className="font-medium">Download Brochure</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
                    <span className="font-medium">Contact Sales</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Corporate Features */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Perfect For Organizations</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Customized packages</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Bulk employee coverage</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Priority services</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Wellness programs</span>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Corporate Sales</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>+1 (234) 567-890</span>
                  </a>
                  <a
                    href="mailto:corporate@medigo.com"
                    className="flex items-center gap-3 text-gray-700 hover:text-purple-600 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>corporate@medigo.com</span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5" />
                    <span>Mon-Fri 9AM-6PM</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Corporate Solutions Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Corporate Healthcare Solutions
              <span className="block text-xl text-gray-600 mt-2">কর্পোরেট স্বাস্থ্যসেবা সমাধান</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Briefcase className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Small Business</h3>
              <p className="text-gray-600 mb-4">Affordable healthcare packages for small businesses with 10-50 employees, including basic medical coverage.</p>
              <button className="text-purple-600 font-medium hover:text-purple-700">Get Quote</button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Building className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Medium Enterprise</h3>
              <p className="text-gray-600 mb-4">Comprehensive healthcare solutions for medium-sized companies with enhanced benefits and wellness programs.</p>
              <button className="text-blue-600 font-medium hover:text-blue-700">Get Quote</button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Large Corporation</h3>
              <p className="text-gray-600 mb-4">Premium healthcare packages with custom solutions, on-site clinics, and executive health programs.</p>
              <button className="text-green-600 font-medium hover:text-green-700">Get Quote</button>
            </div>
          </div>
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
              Trusted by Leading Companies
              <span className="block text-xl text-gray-600 mt-2">শীর্ষ কোম্পানিগুলো আমাদের উপর আস্থা রাখে</span>
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
                  <Star key={star} className="w-4 h-4 text-purple-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"The corporate health card has significantly improved our employee satisfaction and reduced healthcare costs."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-200 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">TechCorp Industries</p>
                  <p className="text-sm text-gray-600">500+ Employees</p>
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
                  <Star key={star} className="w-4 h-4 text-purple-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"Excellent wellness programs and priority services. Our employees feel valued and well-cared for."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">Global Solutions Ltd</p>
                  <p className="text-sm text-gray-600">200+ Employees</p>
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
                  <Star key={star} className="w-4 h-4 text-purple-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"The on-site health checkups and wellness programs have improved employee productivity significantly."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-200 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">Innovation Systems</p>
                  <p className="text-sm text-gray-600">100+ Employees</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-purple-500 to-purple-600 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Partner With Us for Employee Wellness
              <span className="block text-xl text-purple-100 mt-2">কর্মচারী কল্যাণের জন্য আমাদের সাথে অংশীদার হন</span>
            </h2>
            <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
              Provide your employees with the best healthcare benefits and show you care about their well-being.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-purple-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                Request Quote
              </button>
              <a
                href="tel:+1234567890"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-700 text-white font-semibold rounded-full hover:bg-purple-800 transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Call Sales Team
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
                className="w-full px-6 py-3 bg-purple-500 text-white font-semibold rounded-full hover:bg-purple-600 transition-colors"
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
