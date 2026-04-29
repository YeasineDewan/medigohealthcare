import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  CreditCard, 
  Users, 
  Building, 
  Heart, 
  Shield,
  ChevronRight,
  Star,
  CheckCircle,
  Phone,
  Mail,
  Clock,
  ArrowRight
} from 'lucide-react';

const healthCards = [
  {
    id: 'premium',
    title: 'Premium Health Card',
    titleBn: 'প্রিমিয়াম হেলথ কার্ড',
    description: 'Ultimate healthcare benefits with maximum discounts and priority services',
    icon: CreditCard,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-gradient-to-br from-amber-50 to-orange-50',
    borderColor: 'border-amber-200',
    features: ['50% pathology tests', '15% surgery discount', 'Free medical camps', 'No expiry date'],
    route: '/health-cards/premium'
  },
  {
    id: 'family',
    title: 'Family Health Card',
    titleBn: 'ফ্যামিলি হেলথ কার্ড',
    description: 'Comprehensive coverage for your entire family with affordable benefits',
    icon: Users,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
    borderColor: 'border-blue-200',
    features: ['25% pathology tests', '15% surgery discount', 'Weekly free consultation', '1 year validity'],
    route: '/health-cards/family'
  },
  {
    id: 'corporate',
    title: 'Corporate Health Card',
    titleBn: 'কর্পোরেট হেলথ কার্ড',
    description: 'Special healthcare solutions for corporate employees and organizations',
    icon: Building,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-gradient-to-br from-purple-50 to-pink-50',
    borderColor: 'border-purple-200',
    features: ['30% pathology tests', '20% surgery discount', 'Corporate packages', 'Custom benefits'],
    route: '/health-cards/corporate'
  },
  {
    id: 'charity',
    title: 'Charity Health Card',
    titleBn: 'দাতব্য হেলথ কার্ড',
    description: 'Healthcare support for underprivileged individuals and families',
    icon: Heart,
    color: 'from-green-500 to-green-600',
    bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
    borderColor: 'border-green-200',
    features: ['Free consultation', 'Free hospital stay', 'Free pathology tests', 'Home doctor service'],
    route: '/health-cards/charity'
  },
  {
    id: 'medicare',
    title: 'Medicare Card',
    titleBn: 'শেয়ার হেলথ কার্ড',
    description: 'Shared healthcare benefits with community support system',
    icon: Shield,
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-gradient-to-br from-teal-50 to-cyan-50',
    borderColor: 'border-teal-200',
    features: ['35% pathology tests', '10% surgery discount', 'Community support', 'Flexible payment'],
    route: '/health-cards/medicare'
  }
];

export default function HealthCards() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isHovered, setIsHovered] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-[#165028] to-[#0f3d1c] text-white">
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
              Health Cards
              <span className="block text-2xl md:text-3xl mt-2 text-green-200">হেলথ কার্ড সমূহ</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed">
              Choose from our exclusive range of health membership cards designed to provide 
              comprehensive healthcare benefits for individuals, families, and organizations.
            </p>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/5 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-white/5 rounded-full blur-xl"></div>
      </div>

      {/* Cards Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Choose Your Health Card
            <span className="block text-xl text-gray-600 mt-2">আপনার হেলথ কার্ড বেছে নিন</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Each card is carefully designed to meet specific healthcare needs with exclusive benefits and discounts.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {healthCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onMouseEnter={() => setIsHovered(card.id)}
                onMouseLeave={() => setIsHovered(null)}
                className="group"
              >
                <div className={`h-full p-8 rounded-2xl ${card.bgColor} ${card.borderColor} border-2 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden`}>
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                  
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-full bg-gradient-to-br ${card.color} text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-8 h-8" />
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {card.title}
                      <span className="block text-lg text-gray-700 mt-1">{card.titleBn}</span>
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">{card.description}</p>
                    
                    {/* Features */}
                    <div className="space-y-3 mb-8">
                      {card.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Action Button */}
                    <Link
                      to={card.route}
                      className={`inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r ${card.color} text-white font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105`}
                    >
                      View Details
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-[#165028] to-[#0f3d1c] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">
              Why Choose Our Health Cards?
              <span className="block text-xl text-green-200 mt-2">কেন আমাদের হেলথ কার্ড বেছে নিবেন?</span>
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Exclusive Benefits</h3>
              <p className="text-gray-300">Special discounts and priority services across all departments</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
              <p className="text-gray-300">Round-the-clock assistance and emergency services</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Care</h3>
              <p className="text-gray-300">Comprehensive healthcare coverage for all your needs</p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Need Help Choosing?
              <span className="block text-xl text-gray-600 mt-2">সাহায্যের প্রয়োজন?</span>
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our healthcare advisors are here to help you choose the perfect health card for your needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+1234567890"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#165028] to-[#0f3d1c] text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <Phone className="w-5 h-5" />
                Call Now
              </a>
              <a
                href="mailto:info@medigo.com"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#165028] border-2 border-[#165028] font-semibold rounded-full hover:bg-[#165028] hover:text-white transition-all duration-300 hover:scale-105"
              >
                <Mail className="w-5 h-5" />
                Email Us
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
