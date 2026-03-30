import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Heart, 
  CheckCircle, 
  Phone, 
  Mail, 
  Clock, 
  Users,
  ArrowLeft,
  Star,
  Shield,
  Droplet,
  Calendar,
  Home,
  ChevronRight,
  HandHeart
} from 'lucide-react';

const benefits = [
  {
    icon: Phone,
    title: 'Free Doctor Consultation',
    titleBn: 'বিনামূল্যে ডাক্তারের পরামর্শ',
    description: 'Outdoor doctor consultation completely free',
    descriptionBn: 'আউটডোর ডাক্তারের পরামর্শ সম্পূর্ণ বিনামূল্যে',
    color: 'text-green-600',
    bgColor: 'bg-green-50'
  },
  {
    icon: Home,
    title: 'Free Hospital Stay',
    titleBn: 'বিনামূল্যে হাসপাতালে ভর্তি',
    description: 'Hospital-related expenses for admitted patients completely free (excluding medicine)',
    descriptionBn: 'ভর্তি রোগীদের হাসপাতাল-সম্পর্কিত খরচ সম্পূর্ণ বিনামূল্যে (ওষুধ ব্যতীত)',
    color: 'text-blue-600',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Droplet,
    title: 'Free Blood Arrangement',
    titleBn: 'বিনামূল্যে রক্তের ব্যবস্থা',
    description: 'In special cases where blood is needed, free blood will be arranged',
    descriptionBn: 'বিশেষ ক্ষেত্রে রক্তের প্রয়োজন হলে, বিনামূল্যে রক্তের ব্যবস্থা করা হবে',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  },
  {
    icon: Shield,
    title: 'Free Pathological Tests',
    titleBn: 'বিনামূল্যে প্যাথলজিক্যাল টেস্ট',
    description: 'Pathological tests are completely free',
    descriptionBn: 'প্যাথলজিক্যাল টেস্ট সম্পূর্ণ বিনামূল্যে',
    color: 'text-purple-600',
    bgColor: 'bg-purple-50'
  },
  {
    icon: Heart,
    title: 'Free Hospital Expenses',
    titleBn: 'বিনামূল্যে হাসপাতাল খরচ',
    description: 'Hospital expenses are completely free, except for external costs during operations',
    descriptionBn: 'অপারেশনের সময় বাহ্যিক খরচ ব্যতীত হাসপাতাল খরচ সম্পূর্ণ বিনামূল্যে',
    color: 'text-pink-600',
    bgColor: 'bg-pink-50'
  },
  {
    icon: Home,
    title: 'Free Home Doctor Service',
    titleBn: 'বাড়িতে বিনামূল্যে ডাক্তার সেবা',
    description: 'If unable to come to hospital due to old age, free doctor service at home',
    descriptionBn: 'বার্ধক্যজনিত কারণে হাসপাতালে আসতে না পারলে, বাড়িতে বিনামূল্যে ডাক্তার সেবা',
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50'
  },
  {
    icon: Users,
    title: 'Free Orthopedic Items',
    titleBn: 'বিনামূল্যে অর্থোপেডিক সামগ্রী',
    description: 'Free wheelchair, crutches, elbow bag, knee cap, etc. for elderly or accident victims',
    descriptionBn: 'বয়স্ক বা দুর্ঘটনাক্রমে আহতদের জন্য বিনামূল্যে হুইলচেয়ার, ক্রাচ, এলবো ব্যাগ, নী ক্যাপ ইত্যাদি',
    color: 'text-orange-600',
    bgColor: 'bg-orange-50'
  },
  {
    icon: Users,
    title: 'Special Care',
    titleBn: 'বিশেষ যত্ন',
    description: 'Special care for underprivileged individuals and families',
    descriptionBn: 'অসহায় ব্যক্তি ও পরিবারের জন্য বিশেষ যত্ন',
    color: 'text-teal-600',
    bgColor: 'bg-teal-50'
  },
  {
    icon: Calendar,
    title: 'No Expiry',
    titleBn: 'কোনো মেয়াদ নেই',
    description: 'Charity card has no expiry date',
    descriptionBn: 'দাতব্য কার্ডের কোনো মেয়াদ নেই',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-50'
  },
  {
    icon: Shield,
    title: 'Emergency Support',
    titleBn: 'জরুরি সহায়তা',
    description: '24/7 emergency support for charity card holders',
    descriptionBn: 'দাতব্য কার্ডধারীদের জন্য ২৪/৭ জরুরি সহায়তা',
    color: 'text-red-600',
    bgColor: 'bg-red-50'
  }
];

export default function CharityHealthCard() {
  const [selectedBenefit, setSelectedBenefit] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-green-500 to-green-600 text-white">
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
                <Heart className="w-12 h-12" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Charity Health Card
              <span className="block text-2xl md:text-3xl mt-2 text-green-100">দাতব্য হেলথ কার্ড</span>
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Healthcare support for underprivileged individuals and families, providing 
              comprehensive medical services completely free of charge to those in need.
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
            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 font-medium transition-colors"
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
              <div className="relative h-96 lg:h-full bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-32 h-32 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-16 h-16 text-green-600" />
                  </div>
                  <p className="text-green-700 font-medium">Charity Card Design</p>
                  <p className="text-green-600 text-sm mt-2">Image placeholder for card design</p>
                </div>
              </div>
              
              {/* Card Details */}
              <div className="p-8 lg:p-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-6">
                  Charity Health Card Details
                  <span className="block text-xl text-gray-600 mt-2">দাতব্য হেলথ কার্ডের বিবরণ</span>
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Heart className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Complete Free Healthcare</h4>
                      <p className="text-gray-600">Completely free medical services for underprivileged individuals and families who cannot afford healthcare.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Home className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Home Doctor Service</h4>
                      <p className="text-gray-600">Free home visits for elderly and disabled patients who cannot come to the hospital due to mobility issues.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 mb-2">Special Care Support</h4>
                      <p className="text-gray-600">Dedicated support for the most vulnerable members of society including orphans, widows, and disabled persons.</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 p-6 bg-green-50 rounded-xl border border-green-200">
                  <h4 className="text-lg font-semibold text-green-900 mb-3">Charity Features Include:</h4>
                  <ul className="space-y-2 text-green-800">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Free hospital admission and stay</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Free pathological tests and diagnostics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Free blood arrangement when needed</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4" />
                      <span>Free orthopedic equipment support</span>
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
                Charity Benefits
                <span className="block text-xl text-gray-600 mt-2">দাতব্য সুবিধাসমূহ</span>
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
                      className={`p-6 rounded-xl ${benefit.bgColor} border-2 border-green-200 cursor-pointer hover:shadow-lg transition-all duration-300`}
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
              <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white shadow-xl">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">Charity Card</h3>
                    <p className="text-green-100">Lifetime Support</p>
                  </div>
                  <Heart className="w-12 h-12 text-green-200" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-green-100">Card Type:</span>
                    <span className="font-semibold">Charity</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-100">Cost:</span>
                    <span className="font-semibold">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-100">Status:</span>
                    <span className="font-semibold">Active</span>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl border-2 border-gray-200 p-6 shadow-lg">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Get Help</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-green-50 text-green-700 hover:bg-green-100 transition-colors">
                    <span className="font-medium">Apply for Card</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
                    <span className="font-medium">Eligibility Check</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                  <button className="w-full flex items-center justify-between p-3 rounded-lg bg-gray-50 text-gray-700 hover:bg-gray-100 transition-colors">
                    <span className="font-medium">Contact Support</span>
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Eligibility Criteria */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Who Can Apply?</h3>
                <ul className="space-y-2">
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Low-income families</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Elderly individuals</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Disabled persons</span>
                  </li>
                  <li className="flex items-center gap-2 text-gray-700">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Orphans & widows</span>
                  </li>
                </ul>
              </div>

              {/* Contact Info */}
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Need Assistance?</h3>
                <div className="space-y-3">
                  <a
                    href="tel:+1234567890"
                    className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <Phone className="w-5 h-5" />
                    <span>+1 (234) 567-890</span>
                  </a>
                  <a
                    href="mailto:charity@medigo.com"
                    className="flex items-center gap-3 text-gray-700 hover:text-green-600 transition-colors"
                  >
                    <Mail className="w-5 h-5" />
                    <span>charity@medigo.com</span>
                  </a>
                  <div className="flex items-center gap-3 text-gray-700">
                    <Clock className="w-5 h-5" />
                    <span>24/7 Emergency</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Eligibility & Application Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Who Can Apply for Charity Card?
              <span className="block text-xl text-gray-600 mt-2">কে দাতব্য কার্ডের জন্য আবেদন করতে পারে?</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Low-Income Families</h3>
              <p className="text-gray-600 mb-4">Families with monthly income below the poverty line can apply for the charity health card.</p>
              <button className="text-green-600 font-medium hover:text-green-700">Check Eligibility</button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Elderly Citizens</h3>
              <p className="text-gray-600 mb-4">Senior citizens above 60 years with no source of income or family support are eligible.</p>
              <button className="text-blue-600 font-medium hover:text-blue-700">Check Eligibility</button>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Disabled Persons</h3>
              <p className="text-gray-600 mb-4">People with disabilities who cannot afford medical treatment can apply for free healthcare.</p>
              <button className="text-purple-600 font-medium hover:text-purple-700">Check Eligibility</button>
            </div>
          </div>
        </div>
      </div>

      {/* Impact Stories Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Lives Transformed Through Charity
              <span className="block text-xl text-gray-600 mt-2">দাতব্যের মাধ্যমে পরিবর্তিত জীবন</span>
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
                  <Star key={star} className="w-4 h-4 text-green-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"The charity card saved my mother's life. She received free heart surgery that we could never afford."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-200 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">Rahim's Family</p>
                  <p className="text-sm text-gray-600">Charity Beneficiaries</p>
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
                  <Star key={star} className="w-4 h-4 text-green-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"Free home doctor visits for my elderly father have been a blessing. He gets the care he needs at home."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-200 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">Fatema Begum</p>
                  <p className="text-sm text-gray-600">Charity Beneficiary</p>
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
                  <Star key={star} className="w-4 h-4 text-green-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">"The free wheelchair and orthopedic support helped me regain my mobility and independence."</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-200 rounded-full"></div>
                <div>
                  <p className="font-semibold text-gray-900">Karim Uddin</p>
                  <p className="text-sm text-gray-600">Charity Beneficiary</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white py-16 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold mb-4">
              Healthcare for Those in Need
              <span className="block text-xl text-green-100 mt-2">প্রয়োজনহীনদের জন্য স্বাস্থ্যসেবা</span>
            </h2>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              We believe everyone deserves quality healthcare. Apply for our charity card and receive comprehensive medical support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-green-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg">
                Apply for Charity Card
              </button>
              <a
                href="tel:+1234567890"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-700 text-white font-semibold rounded-full hover:bg-green-800 transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Emergency Helpline
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
                className="w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-full hover:bg-green-600 transition-colors"
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
