import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Stethoscope,
  Video,
  Pill,
  FlaskConical,
  Ambulance,
  ArrowRight,
  Shield,
  Clock,
  Users,
  Star,
  Plus,
} from 'lucide-react';
import DoctorCard from '../components/features/DoctorCard';
import ProductCard from '../components/features/ProductCard';
import HeroBanner from '../components/features/HeroBanner';
import FeaturedProducts from '../components/features/FeaturedProducts';
import BestDoctors from '../components/features/BestDoctors';
import { Button } from '../components/core/Button';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api/v1';

const services = [
  { icon: Stethoscope, title: 'Specialist Doctors', desc: 'Book appointments with certified specialists', href: '/doctors', color: 'from-[#5DBB63] to-[#165028]' },
  { icon: Video, title: 'Video Consultation', desc: 'Consult doctors online 24/7', href: '/consult', color: 'from-[#165028] to-[#0f3d1c]' },
  { icon: Pill, title: 'Pharmacy', desc: 'Order medicines with home delivery', href: '/pharmacy', color: 'from-[#5DBB63] to-[#4a9a4f]' },
  { icon: FlaskConical, title: 'Lab Tests', desc: 'Home collection & digital reports', href: '/lab-tests', color: 'from-[#165028] to-[#5DBB63]' },
];

const features = [
  { icon: Shield, title: 'Trusted', desc: 'Verified doctors & pharmacies' },
  { icon: Clock, title: '24/7', desc: 'Emergency support anytime' },
  { icon: Users, title: '2M+', desc: 'Patients served' },
];

const featuredDoctors = [
  { 
    id: 1, 
    name: 'Dr. Ahmed Hassan', 
    specialty: 'Cardiology', 
    rating: 4.9, 
    reviewCount: 234, 
    location: 'Dhaka Medical College Hospital', 
    available: true,
    consultationFee: 1500,
    image: '/doctors/doctor1.jpg',
    experience: '12 years',
    qualifications: ['MBBS', 'MD (Cardiology)', 'FACC']
  },
  { 
    id: 2, 
    name: 'Dr. Fatima Khan', 
    specialty: 'Pediatrics', 
    rating: 4.8, 
    reviewCount: 189, 
    location: 'Square Hospital', 
    available: true,
    consultationFee: 1200,
    image: '/doctors/doctor2.jpg',
    experience: '10 years',
    qualifications: ['MBBS', 'DCH', 'MD (Pediatrics)']
  },
  { 
    id: 3, 
    name: 'Dr. Rahman Ali', 
    specialty: 'General Medicine', 
    rating: 4.7, 
    reviewCount: 312, 
    location: 'Apollo Hospital', 
    available: false,
    consultationFee: 800,
    image: '/doctors/doctor3.jpg',
    experience: '15 years',
    qualifications: ['MBBS', 'MD (Medicine)', 'FACP']
  },
  { 
    id: 4, 
    name: 'Dr. Nusrat Jahan', 
    specialty: 'Gynecology', 
    rating: 4.9, 
    reviewCount: 256, 
    location: 'Labaid Specialized Hospital', 
    available: true,
    consultationFee: 1300,
    image: '/doctors/doctor4.jpg',
    experience: '13 years',
    qualifications: ['MBBS', 'MCPS (Gynae)', 'MS (Obs & Gynae)']
  },
  { 
    id: 5, 
    name: 'Dr. Kamal Hossain', 
    specialty: 'Orthopedics', 
    rating: 4.6, 
    reviewCount: 198, 
    location: 'United Hospital', 
    available: true,
    consultationFee: 1400,
    image: '/doctors/doctor5.jpg',
    experience: '11 years',
    qualifications: ['MBBS', 'MS (Ortho)', 'FCPS']
  },
  { 
    id: 6, 
    name: 'Dr. Sabina Akter', 
    specialty: 'Dermatology', 
    rating: 4.8, 
    reviewCount: 221, 
    location: 'Ibn Sina Hospital', 
    available: true,
    consultationFee: 1100,
    image: '/doctors/doctor6.jpg',
    experience: '9 years',
    qualifications: ['MBBS', 'DDV', 'MD (Skin)']
  },
];

const featuredProducts = [
  { 
    id: 1, 
    name: 'Paracetamol 500mg', 
    genericName: 'Acetaminophen', 
    brand: 'Square Pharmaceutical', 
    price: 120, 
    originalPrice: 150,
    discount: 20,
    category: 'Pain Relief',
    inStock: true,
    prescriptionRequired: false,
    rating: 4.5,
    reviewCount: 234,
    description: 'Effective pain and fever relief medication for adults and children above 12 years',
    packaging: 'Strip of 10 tablets',
    deliveryTime: 'Same day delivery',
    features: [
      'Fast-acting pain relief',
      'Reduces fever effectively',
      'Safe for long-term use',
      'Suitable for adults and children'
    ]
  },
  { 
    id: 2, 
    name: 'Vitamin D3 2000IU', 
    genericName: 'Cholecalciferol', 
    brand: 'Incepta Pharmaceuticals', 
    price: 350,
    originalPrice: 450,
    discount: 22,
    category: 'Vitamins',
    inStock: true,
    prescriptionRequired: false,
    rating: 4.7,
    reviewCount: 189,
    description: 'Essential vitamin D3 supplement for bone health, immunity, and overall wellness',
    packaging: 'Bottle of 30 capsules',
    deliveryTime: 'Next day delivery',
    features: [
      'Supports bone health',
      'Boosts immune system',
      'Improves calcium absorption',
      'High potency formula'
    ]
  },
  { 
    id: 3, 
    name: 'Omeprazole 20mg', 
    genericName: 'Omeprazole', 
    brand: 'Beximco Pharma', 
    price: 280,
    originalPrice: 350,
    discount: 20,
    category: 'Digestive Health',
    inStock: true,
    prescriptionRequired: true,
    rating: 4.3,
    reviewCount: 156,
    description: 'Relieves heartburn and acid reflux by reducing stomach acid production',
    packaging: 'Strip of 14 capsules',
    deliveryTime: 'Same day delivery',
    features: [
      'Treats acid reflux',
      'Heals stomach ulcers',
      'Long-lasting relief',
      'Once daily dosing'
    ]
  },
  { 
    id: 4, 
    name: 'Metformin 500mg', 
    genericName: 'Metformin HCl', 
    brand: 'Square Pharmaceutical', 
    price: 95,
    originalPrice: 120,
    discount: 21,
    category: 'Diabetes',
    inStock: true,
    prescriptionRequired: true,
    rating: 4.6,
    reviewCount: 298,
    description: 'First-line medication for managing type 2 diabetes and blood sugar levels',
    packaging: 'Strip of 30 tablets',
    deliveryTime: 'Same day delivery',
    features: [
      'Controls blood sugar',
      'Improves insulin sensitivity',
      'Weight management support',
      'Cardiovascular benefits'
    ]
  },
  { 
    id: 5, 
    name: 'Azithromycin 500mg', 
    genericName: 'Azithromycin', 
    brand: 'Incepta Pharmaceuticals', 
    price: 180,
    originalPrice: 220,
    discount: 18,
    category: 'Antibiotic',
    inStock: true,
    prescriptionRequired: true,
    rating: 4.4,
    reviewCount: 167,
    description: 'Broad-spectrum antibiotic for treating bacterial infections',
    packaging: 'Strip of 6 tablets',
    deliveryTime: 'Next day delivery',
    features: [
      'Treats respiratory infections',
      'Short treatment course',
      'Once daily dosing',
      'Broad spectrum coverage'
    ]
  },
  { 
    id: 6, 
    name: 'Calcium + Vitamin D', 
    genericName: 'Calcium Carbonate', 
    brand: 'Square Pharmaceutical', 
    price: 280,
    originalPrice: 350,
    discount: 20,
    category: 'Supplements',
    inStock: true,
    prescriptionRequired: false,
    rating: 4.5,
    reviewCount: 201,
    description: 'Complete bone health formula with calcium and vitamin D3 combination',
    packaging: 'Bottle of 60 tablets',
    deliveryTime: 'Same day delivery',
    features: [
      'Strengthens bones',
      'Prevents osteoporosis',
      'Enhanced absorption',
      'Supports dental health'
    ]
  },
  { 
    id: 7, 
    name: 'Losartan 50mg', 
    genericName: 'Losartan Potassium', 
    brand: 'Beximco Pharma', 
    price: 220,
    originalPrice: 280,
    discount: 21,
    category: 'Cardiovascular',
    inStock: true,
    prescriptionRequired: true,
    rating: 4.6,
    reviewCount: 142,
    description: 'Effective blood pressure medication that protects kidneys and heart',
    packaging: 'Strip of 30 tablets',
    deliveryTime: 'Same day delivery',
    features: [
      'Lowers blood pressure',
      'Protects kidneys',
      'Reduces stroke risk',
      'Heart-protective'
    ]
  },
  { 
    id: 8, 
    name: 'Multivitamin Complex', 
    genericName: 'Multivitamins', 
    brand: 'Incepta Pharmaceuticals', 
    price: 420,
    originalPrice: 550,
    discount: 24,
    category: 'Vitamins',
    inStock: true,
    prescriptionRequired: false,
    rating: 4.8,
    reviewCount: 312,
    description: 'Complete daily nutrition with essential vitamins and minerals for optimal health',
    packaging: 'Bottle of 60 capsules',
    deliveryTime: 'Same day delivery',
    features: [
      '25+ essential nutrients',
      'Boosts energy levels',
      'Supports immune health',
      'Antioxidant protection'
    ]
  },
];

export default function Home() {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE}/banners?type=hero`);
      setBanners(response.data.data || []);
    } catch (error) {
      console.error('Error fetching banners:', error);
      // Use default banners if API fails - set empty array to use HeroBanner defaults
      setBanners([]);
      
      // Show user-friendly notification for development
      if (import.meta.env.DEV) {
        console.log('🔧 Using default banners due to API error. Check if backend server is running.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Development Notice - Only show in development and when API fails */}
      {import.meta.env.DEV && !loading && banners.length === 0 && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center gap-2">
            <div className="w-4 h-4 bg-amber-500 rounded-full animate-pulse"></div>
            <p className="text-amber-800 text-sm">
              <strong>Development Mode:</strong> Backend server appears to be offline. Using default content. 
              <span className="ml-2 text-amber-600">Start backend server at localhost:8000</span>
            </p>
          </div>
        </div>
      )}

      {/* Integrated Hero Banner */}
      {loading ? (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        </div>
      ) : (
        <HeroBanner banners={banners} autoSlide={true} interval={6000} />
      )}

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <h2 className="text-3xl font-bold text-[#165028] mb-4">Our Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare solutions tailored for you
            </p>
          </motion.div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Link to={service.href}>
                  <div className="group p-6 rounded-2xl border border-gray-100 hover:border-[#5DBB63]/30 hover:shadow-lg transition-all duration-300 h-full">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                      <service.icon className="w-7 h-7 text-white" />
                    </div>
                    <h3 className="font-semibold text-[#111827] text-lg mb-2">{service.title}</h3>
                    <p className="text-gray-500 text-sm">{service.desc}</p>
                    <span className="inline-flex items-center gap-1 text-[#5DBB63] font-medium mt-3 text-sm group-hover:gap-2 transition-all">
                      Learn more <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-[#165028]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center text-white"
              >
                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                  <f.icon className="w-7 h-7 text-yellow-400" />
                </div>
                <h3 className="font-bold text-3xl mb-1 text-yellow-400" style={{color: '#FBBF24', textShadow: '0 2px 4px rgba(0,0,0,0.5)'}}>{f.title}</h3>
                <p className="text-yellow-100 font-semibold">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Doctors */}
      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-[#165028] mb-2">Featured Doctors</h2>
            <p className="text-gray-600">Book appointments with our top specialists</p>
          </motion.div>
          
          {/* 2 Rows of Doctors (6 doctors total) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredDoctors.map((doc, i) => (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <DoctorCard doctor={doc} />
              </motion.div>
            ))}
          </div>
          
          {/* View All Doctors Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link to="/doctors">
              <Button size="lg" className="px-8 py-3">
                <span className="flex items-center gap-2">
                  View All Doctors
                  <ArrowRight className="w-5 h-5" />
                </span>
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Best Doctors We Have - Auto Scrolling Section */}
      <BestDoctors doctors={featuredDoctors} />

      {/* Featured Products - Enhanced with 2 Rows */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12"
          >
            <div>
              <h2 className="text-3xl font-bold text-[#165028] mb-2">Featured Products</h2>
              <p className="text-gray-600">Essential medicines and health products delivered to your door</p>
            </div>
            <Link to="/pharmacy">
              <Button variant="outline">View All Products</Button>
            </Link>
          </motion.div>
          
          {/* Use the new FeaturedProducts component with 2 rows */}
          <FeaturedProducts products={featuredProducts} maxRows={2} />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-12 p-6 bg-gradient-to-r from-[#f0fdf2] to-[#dcfce7] rounded-2xl border border-[#5DBB63]/20"
          >
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-[#165028] mb-2">Need a prescription?</h3>
                <p className="text-sm text-gray-600">
                  Consult with our doctors online and get valid prescriptions delivered to your doorstep.
                </p>
              </div>
              <Link to="/consult">
                <Button size="sm">Consult Doctor</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-gradient-to-br from-[#5DBB63] to-[#165028] p-12 text-white"
          >
            <h2 className="text-3xl font-bold mb-4">Ready to get started?</h2>
            <p className="text-white/90 mb-8 max-w-xl mx-auto">
              Join millions of patients who trust Medigo for their healthcare needs.
            </p>
            <Link to="/doctors">
              <Button variant="outline" className="border-white text-white hover:bg-white/10">
                Book Your First Appointment
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
