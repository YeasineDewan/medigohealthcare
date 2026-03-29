import { motion } from 'framer-motion';
import {
  Shield,
  Clock,
  Users,
  Award,
  HeartHandshake,
  Stethoscope,
} from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'Verified Professionals',
    description: 'All our doctors and healthcare providers are thoroughly verified and certified',
  },
  {
    icon: Clock,
    title: '24/7 Availability',
    description: 'Round-the-clock medical support and emergency services whenever you need',
  },
  {
    icon: Users,
    title: '2M+ Happy Patients',
    description: 'Trusted by millions of patients across the country for quality healthcare',
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'Highest standards of medical care with regular quality checks and audits',
  },
  {
    icon: HeartHandshake,
    title: 'Personalized Care',
    description: 'Tailored healthcare solutions designed specifically for your needs',
  },
  {
    icon: Stethoscope,
    title: 'Expert Specialists',
    description: 'Access to top medical specialists across all major healthcare fields',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative bg-gradient-to-br from-green-600 via-green-700 to-green-800 py-20 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Ccircle cx="7" cy="7" r="7"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] bg-repeat"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose Medigo?
          </h2>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Experience healthcare that puts you first. We combine cutting-edge technology with compassionate care.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white/30 transition-colors">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-green-100 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
            <div className="flex flex-col md:flex-row items-center justify-center gap-8 text-white">
              <div className="text-center md:text-left">
                <div className="text-4xl font-bold mb-2">2M+</div>
                <div className="text-green-100">Happy Patients</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/30"></div>
              <div className="text-center md:text-left">
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-green-100">Expert Doctors</div>
              </div>
              <div className="hidden md:block w-px h-12 bg-white/30"></div>
              <div className="text-center md:text-left">
                <div className="text-4xl font-bold mb-2">24/7</div>
                <div className="text-green-100">Support Available</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
