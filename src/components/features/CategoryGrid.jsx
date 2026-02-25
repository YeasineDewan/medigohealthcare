import { Link } from 'react-router-dom';
import { ChevronRight, Package } from 'lucide-react';
import { motion } from 'framer-motion';


export default function CategoryGrid({ categories, featured = false }) {
  const displayCategories = featured 
    ? categories.filter(c => c.is_featured).slice(0, 8)
    : categories;

  if (!displayCategories || displayCategories.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4 md:gap-6">
      {displayCategories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Link to={`/pharmacy/category/${category.id}`}>
            <div className="group relative bg-white rounded-2xl border border-gray-100 hover:border-[#5DBB63] transition-all duration-300 hover:shadow-lg overflow-hidden">
              {/* Category Image */}
              <div className="aspect-square bg-gradient-to-br from-[#f0fdf2] to-white p-6 relative overflow-hidden">
                {category.image ? (
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="w-16 h-16 text-[#5DBB63] opacity-50" />
                  </div>
                )}
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#165028]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              
              {/* Category Info */}
              <div className="p-4">
                <h3 className="font-semibold text-[#111827] group-hover:text-[#165028] transition-colors line-clamp-1">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {category.product_count || 0} products
                </p>
                
                {/* Arrow Icon */}
                <div className="mt-2 flex items-center text-[#5DBB63] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>View All</span>
                  <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
              
              {/* Subcategory indicator */}
              {category.children && category.children.length > 0 && (
                <div className="absolute top-2 right-2 bg-[#5DBB63] text-white text-xs px-2 py-1 rounded-full">
                  {category.children.length}+
                </div>
              )}
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
