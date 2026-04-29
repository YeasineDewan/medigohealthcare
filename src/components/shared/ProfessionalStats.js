import React from 'react';
import { motion } from 'framer-motion';

const ProfessionalStats = ({ 
  stats, 
  background = 'bg-gradient-to-br from-[#165028] to-[#0f3d1c]',
  title,
  subtitle,
  showPattern = false 
}) => {
  return (
    <section className={`py-16 ${background} relative overflow-hidden`}>
      {/* Background Pattern */}
      {showPattern && (
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute top-1/4 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/3"></div>
          <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-white/8 rounded-full"></div>
        </div>
      )}
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        {(title || subtitle) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            {title && <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">{title}</h2>}
            {subtitle && <p className="text-xl text-white/80 max-w-2xl mx-auto">{subtitle}</p>}
          </motion.div>
        )}
        
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 text-center"
            >
              {/* Icon */}
              <div className="w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full flex items-center justify-center">
                <stat.icon className="w-8 h-8 text-[#165028]" />
              </div>
              
              {/* Number */}
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {stat.value}
              </div>
              
              {/* Label */}
              <div className="text-lg font-semibold text-gray-800 mb-2">
                {stat.label}
              </div>
              
              {/* Description */}
              {stat.description && (
                <div className="text-sm text-gray-600 leading-relaxed">
                  {stat.description}
                </div>
              )}
              
              {/* Badge */}
              {stat.badge && (
                <div className="mt-4 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-green-50 border border-green-200">
                  <span className="text-xs font-medium text-[#165028]">{stat.badge}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProfessionalStats;
