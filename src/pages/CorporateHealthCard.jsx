import React from 'react';
import { motion } from 'framer-motion';
import { 
  Check, 
  Heart, 
  Shield, 
  Users, 
  Activity, 
  Droplets, 
  Clock,
  FileText,
  CreditCard,
  Building,
  Stethoscope,
  Pill,
  FlaskConical
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CorporateHealthCard = () => {
  const benefits = [
    {
      id: 1,
      title: "প্যাথলজিক্যাল পরীক্ষায় ছাড়",
      description: "সকল প্রকার প্যাথলজিক্যাল পরীক্ষায় ৩৫% ছাড়",
      icon: FlaskConical,
      discount: "35%",
      category: "diagnostic"
    },
    {
      id: 2,
      title: "সার্জারিতে ছাড়",
      description: "সকল প্রকার সার্জারিতে ১৫% ছাড়",
      icon: Activity,
      discount: "15%",
      category: "surgery"
    },
    {
      id: 3,
      title: "নরমাল ডেলিভারি",
      description: "নরমাল ডেলিভারি মাত্র ৩০০০ টাকা",
      icon: Heart,
      price: "৩০০০ টাকা",
      category: "maternity"
    },
    {
      id: 4,
      title: "জরুরী বিভাগে ছাড়",
      description: "জরুরী বিভাগে ১৫% ছাড়ে সকল সেবা",
      icon: Shield,
      discount: "15%",
      category: "emergency"
    },
    {
      id: 5,
      title: "ফ্রি রক্তের ব্যবস্থা",
      description: "প্রয়োজনে ফ্রি রক্তের ব্যবস্থা",
      icon: Droplets,
      category: "blood"
    },
    {
      id: 6,
      title: "আউটডোর ডাক্তার সেবা",
      description: "মাত্র ৫০ টাকায় আউটডোর ডাক্তার দেখানোর সুবিধা",
      icon: Stethoscope,
      price: "৫০ টাকা",
      category: "consultation"
    },
    {
      id: 7,
      title: "ঔষধে ছাড়",
      description: "সকল প্রকার দেশীয় ঔষধে ১২% ছাড়",
      icon: Pill,
      discount: "12%",
      category: "pharmacy"
    },
    {
      id: 8,
      title: "সেবা সপ্তাহে ফ্রি কনসালটেশন",
      description: "সেবা সপ্তাহে (বুধবার) আউটডোরে ডাক্তার পরামর্শ ফি সম্পূর্ণ ফ্রি",
      icon: Clock,
      category: "special"
    },
    {
      id: 9,
      title: "মেডিকেল ক্যাম্প",
      description: "বিভিন্ন মেডিকেল ক্যাম্পে সম্পূর্ণ বিনামূল্যে চিকিৎসা সেবা প্রদান",
      icon: Users,
      category: "camp"
    }
  ];

  const additionalInfo = [
    {
      id: 10,
      title: "কার্ডের মেয়াদ",
      description: "কর্পোরেট হেলথ্ কার্ডের মেয়াদ থাকবে রেজিস্ট্রেসনের তারিখ থেকে ১ বছর",
      icon: CreditCard,
      category: "validity"
    },
    {
      id: 11,
      title: "সকল কর্মীর সুবিধা",
      description: "কর্পোরেট হেলথ্ কার্ডের বিপরীতে প্রতিষ্ঠানের সকল কর্মী চিকিৎসা সেবা গ্রহণ করতে পারবে",
      icon: Building,
      category: "employees"
    },
    {
      id: 12,
      title: "প্রয়োজনীয় কাগজপত্র",
      description: "সেবা গ্রহণের সময় কর্পোরেট হেলথ্ কার্ড গৃহিত প্রতিষ্ঠানের সকল কর্মকর্তা/ কর্মচারী প্রতিষ্ঠানের প্যাডে পরিচালক কর্তৃক স্বাক্ষর সম্বিলিত অনুমতি পত্র নিয়ে আসতে হবে। তবে কর্পোরেট হেলথ্ কার্ড থাকলে অনুমতিপত্র শিথিলযোগ্য।",
      icon: FileText,
      category: "documents"
    },
    {
      id: 13,
      title: "কর্পোরেট চুক্তিপত্র",
      description: "সেবা গ্রহণ করতে হলে প্রতিষ্ঠানের সাথে রিডা হাসপাতালের কর্পোরেট চুক্তিপত্র সম্পন্ন হতে হবে।",
      icon: FileText,
      category: "agreement"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  const getCategoryColor = (category) => {
    const colors = {
      diagnostic: "from-blue-50 to-blue-100 border-blue-200",
      surgery: "from-red-50 to-red-100 border-red-200",
      maternity: "from-pink-50 to-pink-100 border-pink-200",
      emergency: "from-orange-50 to-orange-100 border-orange-200",
      blood: "from-red-50 to-red-100 border-red-200",
      consultation: "from-green-50 to-green-100 border-green-200",
      pharmacy: "from-purple-50 to-purple-100 border-purple-200",
      special: "from-yellow-50 to-yellow-100 border-yellow-200",
      camp: "from-indigo-50 to-indigo-100 border-indigo-200",
      validity: "from-gray-50 to-gray-100 border-gray-200",
      employees: "from-teal-50 to-teal-100 border-teal-200",
      documents: "from-amber-50 to-amber-100 border-amber-200",
      agreement: "from-slate-50 to-slate-100 border-slate-200"
    };
    return colors[category] || "from-gray-50 to-gray-100 border-gray-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#f1f5f9] to-[#e2e8f0]">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#165028] via-[#1e6b3c] to-[#165028] text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative container mx-auto px-4 py-16 md:py-24">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <CreditCard className="w-5 h-5" />
              <span className="text-sm font-medium">কর্পোরেট সেবা</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              কর্পোরেট হেলথ্ কার্ডের
              <span className="block text-[#5DBB63]">সুবিধা সমূহ</span>
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
              আপনার প্রতিষ্ঠানের কর্মীদের জন্য বিশেষ স্বাস্থ্যসেবা সুবিধা উপভোগ করুন আকর্ষণীয় মূল্যছাড় ও প্রিমিয়াম সেবাসহ
            </p>
          </motion.div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-[#5DBB63]/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-[#5DBB63]/10 rounded-full blur-2xl"></div>
      </div>

      {/* Card Preview Section */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-2xl p-8 mb-16 border border-gray-100"
        >
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">কর্পোরেট হেলথ্ কার্ড</h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                আপনার প্রতিষ্ঠানের জন্য বিশেষ স্বাস্থ্যসেবা কার্ড যা আপনার কর্মীদেরকে দেবে প্রিমিয়াম স্বাস্থ্যসেবার সুযোগ।
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#165028]/10 rounded-lg flex items-center justify-center">
                    <Check className="w-5 h-5 text-[#165028]" />
                  </div>
                  <span className="text-gray-700">বছরব্যাপী বৈধতা</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#165028]/10 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#165028]" />
                  </div>
                  <span className="text-gray-700">সকল কর্মীদের জন্য প্রযোজ্য</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#165028]/10 rounded-lg flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#165028]" />
                  </div>
                  <span className="text-gray-700">নিরাপদ ও নির্ভরযোগ্য</span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-80 h-48 bg-gradient-to-br from-[#165028] to-[#1e6b3c] rounded-xl flex items-center justify-center shadow-lg">
                <div className="text-center text-white">
                  <CreditCard className="w-16 h-16 mx-auto mb-3" />
                  <p className="text-sm font-medium">কার্ড ইমেজ স্থাপন করা হবে</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Main Benefits Section */}
      <div className="container mx-auto px-4 pb-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              বিশেষ সুবিধাসমূহ
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              কর্পোরেট হেলথ্ কার্ডধারীদের জন্য বিশেষ স্বাস্থ্যসেবা সুবিধা ও মূল্যছাড়
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.id}
                  variants={itemVariants}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={`group relative bg-gradient-to-br ${getCategoryColor(benefit.category)} border rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer`}
                >
                  <div className="absolute top-4 right-4">
                    {benefit.discount && (
                      <span className="inline-flex items-center px-3 py-1 bg-[#165028] text-white text-sm font-bold rounded-full">
                        {benefit.discount} ছাড়
                      </span>
                    )}
                    {benefit.price && (
                      <span className="inline-flex items-center px-3 py-1 bg-[#5DBB63] text-white text-sm font-bold rounded-full">
                        {benefit.price}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white rounded-lg shadow-md flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Icon className="w-6 h-6 text-[#165028]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2 pr-20">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200/50">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Check className="w-4 h-4 text-[#5DBB63]" />
                      <span>সুবিধা প্রযোজ্য</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Additional Information Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            গুরুত্বপূর্ণ তথ্য
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {additionalInfo.map((info) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.id}
                  whileHover={{ scale: 1.02 }}
                  className={`bg-gradient-to-r ${getCategoryColor(info.category)} rounded-xl p-6 border`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 bg-white rounded-lg shadow-md flex items-center justify-center">
                      <Icon className="w-5 h-5 text-[#165028]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {info.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {info.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-r from-[#165028] to-[#1e6b3c] rounded-2xl p-12 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#5DBB63]/10 rounded-full blur-3xl -translate-y-32 translate-x-32"></div>
            <div className="relative z-10">
              <h2 className="text-3xl font-bold mb-4">
                আপনার প্রতিষ্ঠানের জন্য কর্পোরেট হেলথ্ কার্ড নিন
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                আজই যোগাযোগ করুন এবং আপনার কর্মীদের জন্য সেরা স্বাস্থ্যসেবা নিশ্চিত করুন
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#165028] font-semibold rounded-lg hover:bg-gray-50 transition-all duration-200 shadow-lg hover:shadow-xl group"
                >
                  <Building className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  কর্পোরেট চুক্তির জন্য যোগাযোগ করুন
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#5DBB63] text-white font-semibold rounded-lg hover:bg-[#4da850] transition-all duration-200 shadow-lg hover:shadow-xl group"
                >
                  <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  সকল সেবা দেখুন
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CorporateHealthCard;
