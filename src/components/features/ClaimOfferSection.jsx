import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Gift, 
  Tag, 
  Clock, 
  CheckCircle, 
  ArrowRight, 
  Sparkles, 
  Percent,
  Truck,
  Shield,
  Heart,
  Star,
  Zap,
  Calendar,
  Users,
  TrendingUp
} from 'lucide-react';

const offers = [
  {
    id: 1,
    title: 'Premium Health Checkup',
    subtitle: 'Complete wellness assessment',
    description: 'Comprehensive health screening including blood tests, ECG, and specialist consultation',
    discount: 40,
    originalPrice: 8000,
    price: 4800,
    badge: 'BESTSELLER',
    badgeColor: 'bg-gradient-to-r from-purple-500 to-pink-500',
    icon: Heart,
    iconBg: 'bg-gradient-to-br from-red-50 to-pink-50',
    iconColor: 'text-red-600',
    features: [
      '50+ Health Parameters',
      'Specialist Consultation',
      'Digital Reports',
      'Follow-up Support'
    ],
    validUntil: '2024-03-31',
    claimCount: 1247,
    maxClaims: 2000,
    category: 'health-package',
    popular: true,
    savings: 3200
  },
  {
    id: 2,
    title: 'Family Doctor Consultation',
    subtitle: 'First month free',
    description: 'Get unlimited consultations with family physicians for your entire family',
    discount: 100,
    originalPrice: 2000,
    price: 0,
    badge: 'FREE',
    badgeColor: 'bg-gradient-to-r from-green-500 to-emerald-500',
    icon: Users,
    iconBg: 'bg-gradient-to-br from-green-50 to-emerald-50',
    iconColor: 'text-green-600',
    features: [
      'Unlimited Consultations',
      'Family Coverage (4 members)',
      '24/7 Availability',
      'Prescription Included'
    ],
    validUntil: '2024-02-28',
    claimCount: 892,
    maxClaims: 1500,
    category: 'consultation',
    popular: false,
    savings: 2000
  },
  {
    id: 3,
    title: 'Pharmacy Cashback',
    subtitle: '20% cashback on medicines',
    description: 'Get 20% cashback on all pharmacy orders above $100',
    discount: 20,
    originalPrice: 100,
    price: 80,
    badge: 'CASHBACK',
    badgeColor: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    icon: Truck,
    iconBg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
    iconColor: 'text-blue-600',
    features: [
      'Same Day Delivery',
      'Genuine Medicines',
      'Order Tracking',
      'Cashback in Wallet'
    ],
    validUntil: '2024-04-15',
    claimCount: 2156,
    maxClaims: 5000,
    category: 'pharmacy',
    popular: true,
    savings: 20
  },
  {
    id: 4,
    title: 'Lab Test Package',
    subtitle: 'Essential diagnostics at 30% off',
    description: 'Complete blood workup, urine analysis, and essential diagnostic tests',
    discount: 30,
    originalPrice: 3000,
    price: 2100,
    badge: 'LIMITED',
    badgeColor: 'bg-gradient-to-r from-orange-500 to-red-500',
    icon: Shield,
    iconBg: 'bg-gradient-to-br from-orange-50 to-red-50',
    iconColor: 'text-orange-600',
    features: [
      'Home Sample Collection',
      'NABL Certified Labs',
      'Digital Reports in 24h',
      'Doctor Consultation'
    ],
    validUntil: '2024-03-20',
    claimCount: 743,
    maxClaims: 1000,
    category: 'lab-test',
    popular: false,
    savings: 900
  }
];

export default function ClaimOfferSection() {
  const [selectedOffer, setSelectedOffer] = useState(null);
  const [claimedOffers, setClaimedOffers] = useState([]);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    // Calculate time left for each offer
    const timer = setInterval(() => {
      const newTimeLeft = {};
      offers.forEach(offer => {
        const now = new Date();
        const validUntil = new Date(offer.validUntil);
        const diff = validUntil - now;
        
        if (diff > 0) {
          const days = Math.floor(diff / (1000 * 60 * 60 * 24));
          const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          
          newTimeLeft[offer.id] = `${days}d ${hours}h ${minutes}m`;
        } else {
          newTimeLeft[offer.id] = 'Expired';
        }
      });
      setTimeLeft(newTimeLeft);
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const handleClaimOffer = (offer) => {
    setSelectedOffer(offer);
  };

  const confirmClaim = () => {
    if (selectedOffer) {
      setClaimedOffers([...claimedOffers, selectedOffer.id]);
      setSelectedOffer(null);
    }
  };

  const getProgressPercentage = (claimCount, maxClaims) => {
    return (claimCount / maxClaims) * 100;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 border border-purple-200 mb-4">
            <Sparkles className="w-4 h-4 text-purple-600" />
            <span className="text-sm font-semibold text-purple-700">Exclusive Offers</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Claim Your <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Health Benefits</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Limited-time healthcare offers designed to make quality medical care affordable for everyone
          </p>
        </motion.div>

        {/* Offers Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            const isClaimed = claimedOffers.includes(offer.id);
            const progressPercentage = getProgressPercentage(offer.claimCount, offer.maxClaims);
            
            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                  {/* Badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className={`px-3 py-1 rounded-full text-xs font-bold text-white ${offer.badgeColor} shadow-lg`}>
                      {offer.badge}
                    </div>
                  </div>

                  {/* Popular Tag */}
                  {offer.popular && (
                    <div className="absolute top-4 left-4 z-10">
                      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-yellow-100 text-yellow-800 text-xs font-semibold">
                        <Star className="w-3 h-3 fill-current" />
                        Popular
                      </div>
                    </div>
                  )}

                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start gap-4 mb-6">
                      <div className={`p-3 rounded-2xl ${offer.iconBg} flex-shrink-0`}>
                        <Icon className={`w-6 h-6 ${offer.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-gray-900 mb-1">{offer.title}</h3>
                        <p className="text-sm text-gray-500">{offer.subtitle}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-600 mb-6 leading-relaxed">{offer.description}</p>

                    {/* Features */}
                    <div className="grid grid-cols-2 gap-3 mb-6">
                      {offer.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Pricing */}
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-3">
                            {offer.price === 0 ? (
                              <span className="text-2xl font-bold text-green-600">FREE</span>
                            ) : (
                              <>
                                <span className="text-2xl font-bold text-gray-900">${offer.price}</span>
                                <span className="text-lg text-gray-400 line-through">${offer.originalPrice}</span>
                                <div className="px-2 py-1 bg-red-100 text-red-600 rounded-lg text-sm font-bold">
                                  {offer.discount}% OFF
                                </div>
                              </>
                            )}
                          </div>
                          {offer.savings > 0 && (
                            <p className="text-sm text-green-600 font-medium">You save ${offer.savings}</p>
                          )}
                        </div>
                        {offer.discount === 100 && (
                          <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                            100% OFF
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">Claimed by {offer.claimCount} people</span>
                        <span className="text-sm font-medium text-gray-700">{Math.round(progressPercentage)}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Time Left */}
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>Valid until: {new Date(offer.validUntil).toLocaleDateString()}</span>
                      </div>
                      {timeLeft[offer.id] && (
                        <div className="flex items-center gap-1 text-sm font-medium text-orange-600">
                          <Zap className="w-4 h-4" />
                          {timeLeft[offer.id]}
                        </div>
                      )}
                    </div>

                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleClaimOffer(offer)}
                      disabled={isClaimed}
                      className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                        isClaimed
                          ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-xl'
                      }`}
                    >
                      {isClaimed ? (
                        <span className="flex items-center justify-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Claimed
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Claim Offer
                          <ArrowRight className="w-5 h-5" />
                        </span>
                      )}
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl p-8 text-white"
        >
          <div className="grid md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold mb-1">5,038</div>
              <div className="text-purple-100">Offers Claimed</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">$42,650</div>
              <div className="text-purple-100">Total Savings</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">98%</div>
              <div className="text-purple-100">Satisfaction Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-1">24/7</div>
              <div className="text-purple-100">Support Available</div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Claim Confirmation Modal */}
      <AnimatePresence>
        {selectedOffer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setSelectedOffer(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Claim Your Offer</h3>
                <p className="text-gray-600">{selectedOffer.title}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Original Price:</span>
                  <span className="font-semibold">${selectedOffer.originalPrice}</span>
                </div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-500">Discount:</span>
                  <span className="font-semibold text-green-600">{selectedOffer.discount}% OFF</span>
                </div>
                <div className="border-t pt-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">You Pay:</span>
                    <span className="text-2xl font-bold text-green-600">
                      ${selectedOffer.price}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedOffer(null)}
                  className="flex-1 py-3 px-4 border border-gray-300 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmClaim}
                  className="flex-1 py-3 px-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 transition-colors"
                >
                  Confirm Claim
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
