import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Shield, 
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
  Home,
  ChevronRight,
  HandHelping
} from 'lucide-react';

const benefits = [
  {
    icon: Percent,
    title: 'Pathological Tests',
    titleBn: 'প্যাথলজিক্যাল টেস্ট',
    description: '35% discount on all pathological tests',
    descriptionBn: 'সকল প্যাথলজিক্যাল টেস্টে ৩৫% ছাড়',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50'
  },
  {
    icon: DollarSign,
    title: 'Surgery Discount',
    titleBn: 'সার্জারি ছাড়',
    description: '10% discount on all types of surgeries',
    descriptionBn: 'সকল ধরনের সার্জারিতে ১০% ছাড়',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Heart,
    title: 'Normal Delivery',
    titleBn: 'নরমাল ডেলিভারি',
    description: 'Special rates for medicare members',
    descriptionBn: 'মেডিকেয়ার সদস্যদের জন্য বিশেষ মূল্য',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50'
  },
  {
    icon: Shield,
    title: 'Emergency Services',
    titleBn: 'জরুরি সেবা',
    description: '10% discount on emergency services',
    descriptionBn: 'জরুরি সেবায় ১০% ছাড়',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    icon: Users,
    title: 'Community Support',
    titleBn: 'সম্প্রদায় সমর্থন',
    description: 'Shared healthcare benefits with community support',
    descriptionBn: 'সম্প্রদায় সমর্থন সহ ভাগ করা স্বাস্থ্যসেবা সুবিধা',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Calendar,
    title: 'Flexible Payment',
    titleBn: 'নমনীয় পেমেন্ট',
    description: 'Flexible payment options available',
    descriptionBn: 'নমনীয় পেমেন্ট অপশন উপলব্ধ',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Droplet,
    title: 'Medicine Discount',
    titleBn: 'ওষুধ ছাড়',
    description: '8% discount on all types of local medicines',
    descriptionBn: 'সকল ধরনের স্থানীয় ওষুধে ৮% ছাড়',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    icon: Phone,
    title: 'Doctor Consultation',
    titleBn: 'ডাক্তারের পরামর্শ',
    description: 'Outdoor doctor consultation for only 70 Taka',
    descriptionBn: 'আউটডোর ডাক্তারের পরামর্শ মাত্র ৭০ টাকা',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    icon: Home,
    title: 'Home Service',
    titleBn: 'বাড়িতে সেবা',
    description: 'Discounted home doctor service available',
    descriptionBn: 'ছাড়ে বাড়িতে ডাক্তারের সেবা উপলব্ধ',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
  {
    icon: Calendar,
    title: 'Card Validity',
    titleBn: 'কার্ডের মেয়াদ',
    description: '2 years validity from registration date',
    descriptionBn: 'নিবন্ধনের তারিখ থেকে ২ বছর মেয়াদ',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50'
  },
  {
    icon: Users,
    title: 'Family Coverage',
    titleBn: 'পরিবারের কভারেজ',
    description: 'Up to 4 family members covered',
    descriptionBn: 'সর্বোচ্চ ৪ জন পরিবারের সদস্য কভারেজ',
    color: 'text-cyan-600',
    bgColor: 'bg-cyan-50'
  },
  {
    icon: Shield,
    title: 'Annual Health Checkup',
    titleBn: 'বার্ষিক স্বাস্থ্য পরীক্ষা',
    description: 'Free annual health checkup included',
    descriptionBn: 'বিনামূল্যে বার্ষিক স্বাস্থ্য পরীক্ষা অন্তর্ভুক্ত',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  }
];

export default function MedicareHealthCard() {
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-teal-500 to-teal-600 text-white">
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
                <Shield className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Medicare Card
              <span className="block text-2xl md:text-3xl mt-2 text-teal-100">শেয়ার হেলথ কার্ড</span>
            </h1>
            <p className="text-xl text-teal-100 max-w-3xl mx-auto leading-relaxed">
              Shared healthcare benefits with community support system, offering affordable 
              coverage with flexible payment options for individuals and small families.
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
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors"
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
              <div className="relative h-96 lg:h-full bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-teal-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-16 h-16 text-teal-600" />
                  </div>
                  <p className="text-teal-700 font-medium">Medicare Card Design</p>
                  <p className="text-teal-600 text-sm mt-2">Image placeholder for card design</p>
                </div>
              </div>
              
              {/* Card Details */}
              <div className="p-8 lg:p-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Medicare Card Details
                  <span className="block text-xl text-gray-600 mt-2">মেডিকেয়ার কার্ডের বিবরণ</span>
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Shield className="w-6 h-6 text-teal-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Community-Based Healthcare</h4>
                      <p className="text-gray-600">Shared healthcare benefits with community support, making quality medical care accessible and affordable for everyone.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">2 Years Validity</h4>
                      <p className="text-gray-600">Enjoy two full years of healthcare coverage with the flexibility to renew or upgrade to premium plans.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Family Coverage</h4>
                      <p className="text-gray-600">Cover up to 4 family members under a single card, providing comprehensive healthcare for your loved ones.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-teal-50 rounded-xl border border-teal-200">
                  <h4 className="text-lg font-semibold text-teal-900 mb-3">Medicare Features Include:</h4>
                  <ul className="space-y-2 text-teal-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Annual health checkup included</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Flexible payment options</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Community health programs</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Preventive care services</span>
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
                Medicare Benefits
                <span className="block text-xl text-gray-600 mt-2">মেডিকেয়ার সুবিধাসমূহ</span>
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
                      className={`p-6 rounded-xl ${benefit.bgColor} border-2 border-teal-200 cursor-pointer hover:shadow-lg transition-all duration-300`}
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
              <div className="bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Medicare Card</h3>
                    <p className="text-teal-100">2 Years Validity</p>
                  </div>
                  <Shield className="w-12 h-12 text-teal-200" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-teal-100">Card Type:</span>
                    <span className="font-semibold">Medicare</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-100">Members:</span>
                    <span className="font-semibold">Up to 4</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-teal-100">Payment:</span>
                    <span className="font-semibold">Flexible</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-teal-50 text-teal-700 hover:bg-teal-100 transition-colors">
                    <span className="font-medium">Apply Now</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
                    <span className="font-medium">Payment Plans</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
                    <span className="font-medium">Contact Support</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Medicare Features */}
              <div className="bg-gradient-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Why Choose Medicare?</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    <span className="text-sm">Affordable coverage</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    <span className="text-sm">Flexible payment</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    <span className="text-sm">Community support</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-teal-500" />
                    <span className="text-sm">Annual checkup</span>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-3 text-gray-700 hover:text-teal-600 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>+1 (234) 567-890</span>
                  </a>
                  <a
                    href="mailto:medicare@medigo.com"
                    className="flex items-center gap-3 text-gray-700 hover:text-teal-600 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>medicare@medigo.com</span>
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

      {/* Community Programs Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Community Health Programs
              <span className="block text-xl text-gray-600 mt-2">সম্প্রদায় স্বাস্থ্য প্রোগ্রাম</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Health Awareness Camps</h3>
              <p className="text-gray-600 mb-4">Regular health awareness camps in local communities promoting preventive care and healthy lifestyles.</p>
              <button className="text-teal-600 font-medium hover:text-teal-700">View Schedule</button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Preventive Care Workshops</h3>
              <p className="text-gray-600 mb-4">Free workshops on disease prevention, nutrition, and wellness for medicare card members.</p>
              <button className="text-blue-600 font-medium hover:text-blue-700">Join Workshop</button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Support Groups</h3>
              <p className="text-gray-600 mb-4">Community support groups for patients with chronic conditions and their families.</p>
              <button className="text-green-600 font-medium hover:text-green-700">Join Group</button>
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
              Community Members Share Their Experience
              <span className="block text-xl text-gray-600 mt-2">সম্প্রদায়ের সদস্যরা তাদের অভিজ্ঞতা শেয়ার করে</span>
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
                  <Star key={star} className="w-4 h-4 text-teal-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"The medicare card is perfect for our family. Affordable coverage with great community support."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-200 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">The Khan Family</p>
                  <p className="text-sm text-gray-600">Medicare Members</p>
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
                  <Star key={star} className="w-4 h-4 text-teal-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"The annual health checkup and flexible payment options make this the best value healthcare plan."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">James Wilson</p>
                  <p className="text-sm text-gray-600">Medicare Member</p>
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
                  <Star key={star} className="w-4 h-4 text-teal-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"Community health programs and support groups have helped me manage my condition better."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-200 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">Maria Garcia</p>
                  <p className="text-sm text-gray-600">Medicare Member</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-500 to-teal-600 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Affordable Healthcare for Everyone
              <span className="block text-xl text-teal-100 mt-2">সবার জন্য সাশ্রয়ী স্বাস্থ্যসেবা</span>
            </h2>
            <p className="text-teal-100 mb-8 max-w-2xl mx-auto">
              Join our community-based healthcare program and enjoy quality medical services at affordable rates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-teal-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                Apply for Medicare Card
              </button>
              <a
                href="tel:+1234567890"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-teal-700 text-white font-semibold rounded-full hover:bg-teal-800 transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Learn More
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
                className="w-full px-6 py-3 bg-teal-500 text-white font-semibold rounded-full hover:bg-teal-600 transition-colors"
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
