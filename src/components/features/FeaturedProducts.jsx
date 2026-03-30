import { motion, AnimatePresence } from 'framer-motion';
import { Star, Plus, ShoppingCart, Heart, Info, X, Package, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCartStore } from '../../store/cartStore';

export default function FeaturedProducts({ products = [], maxRows = 2 }) {
  const addToCart = useCartStore((s) => s.addItem);
  const [wishlist, setWishlist] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);

  const productsPerRow = 4;
  const displayProducts = products.slice(0, maxRows * productsPerRow);

  const toggleWishlist = (productId) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleAddToCart = (product) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
  };

  const openQuickView = (e, product) => {
    e.preventDefault();
    setSelectedProduct(product);
    setShowQuickView(true);
  };

  const closeQuickView = () => {
    setShowQuickView(false);
    setTimeout(() => setSelectedProduct(null), 300);
  };

  if (displayProducts.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No products available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Products Grid - 2 Rows */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayProducts.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="group bg-white rounded-2xl border border-gray-100 hover:border-[#5DBB63]/30 hover:shadow-xl transition-all duration-300 h-full flex flex-col overflow-hidden">
              {/* Product Image */}
              <Link to={`/pharmacy/product/${product.id}`} className="block">
                <div className="relative aspect-square bg-gradient-to-br from-[#f0fdf2] to-[#dcfce7] flex items-center justify-center p-6 overflow-hidden">
                  {/* Image placeholder or actual image */}
                  {product.image ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-2xl bg-white/80 shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <span className="text-4xl">💊</span>
                    </div>
                  )}
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.discount && product.discount > 0 && (
                      <div className="px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-lg shadow-md">
                        {product.discount}% OFF
                      </div>
                    )}
                    {product.prescriptionRequired && (
                      <div className="px-2 py-1 bg-orange-500 text-white text-xs font-medium rounded-lg shadow-md">
                        Rx
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleWishlist(product.id);
                      }}
                      className={`w-9 h-9 rounded-full ${
                        wishlist.includes(product.id) 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white text-gray-700 hover:bg-red-50'
                      } shadow-md flex items-center justify-center transition-colors`}
                    >
                      <Heart className={`w-4 h-4 ${wishlist.includes(product.id) ? 'fill-current' : ''}`} />
                    </button>
                    <button
                      onClick={(e) => openQuickView(e, product)}
                      className="w-9 h-9 rounded-full bg-white text-gray-700 hover:bg-blue-50 shadow-md flex items-center justify-center transition-colors"
                    >
                      <Info className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Stock Status Overlay */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                      <span className="text-white font-semibold text-lg">Out of Stock</span>
                    </div>
                  )}
                </div>
              </Link>
              
              {/* Product Details */}
              <div className="p-4 flex-1 flex flex-col">
                <Link to={`/pharmacy/product/${product.id}`}>
                  {/* Category */}
                  <span className="text-xs font-medium text-[#5DBB63] mb-1.5 block">
                    {product.category || 'Medicine'}
                  </span>

                  {/* Product Name & Generic */}
                  <h3 className="font-semibold text-[#111827] text-sm line-clamp-2 mb-1 group-hover:text-[#5DBB63] transition-colors">
                    {product.name}
                  </h3>
                  {product.genericName && (
                    <p className="text-xs text-gray-500 mb-2">{product.genericName}</p>
                  )}
                </Link>
                
                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center gap-1.5 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600 font-medium">
                      {product.rating} {product.reviewCount && `(${product.reviewCount})`}
                    </span>
                  </div>
                )}
                
                {/* Description */}
                {product.description && (
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {product.description}
                  </p>
                )}
                
                {/* Price & Brand */}
                <div className="mt-auto space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="font-bold text-[#165028] text-lg">
                          ৳{product.price?.toLocaleString()}
                        </span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-xs text-gray-400 line-through">
                            ৳{product.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      {product.brand && (
                        <span className="text-xs text-gray-500">{product.brand}</span>
                      )}
                    </div>
                  </div>
                  
                  {/* Add to Cart Button */}
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={!product.inStock}
                    className={`w-full py-2.5 px-4 rounded-xl font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 ${
                      !product.inStock
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : product.prescriptionRequired
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-lg'
                        : 'bg-gradient-to-r from-[#5DBB63] to-[#4a9a4f] text-white hover:from-[#4a9a4f] hover:to-[#165028] shadow-md hover:shadow-lg'
                    }`}
                  >
                    {product.inStock ? (
                      <>
                        <ShoppingCart className="w-4 h-4" />
                        {product.prescriptionRequired ? 'Upload Prescription' : 'Add to Cart'}
                      </>
                    ) : (
                      'Out of Stock'
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Link */}
      {products.length > maxRows * productsPerRow && (
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center pt-4"
        >
          <Link
            to="/pharmacy"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#5DBB63] to-[#165028] text-white font-medium rounded-xl hover:shadow-lg transition-shadow"
          >
            View All Products
            <Plus className="w-5 h-5" />
          </Link>
        </motion.div>
      )}

      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickView && selectedProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-100 p-4 flex items-center justify-between z-10">
                <h3 className="text-lg font-bold text-[#165028]">Product Details</h3>
                <button
                  onClick={closeQuickView}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Product Image & Basic Info */}
                <div className="flex flex-col md:flex-row gap-6 mb-6">
                  <div className="md:w-1/3">
                    <div className="aspect-square bg-gradient-to-br from-[#f0fdf2] to-[#dcfce7] rounded-2xl flex items-center justify-center p-6 relative">
                      {selectedProduct.image ? (
                        <img 
                          src={selectedProduct.image} 
                          alt={selectedProduct.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-32 h-32 rounded-2xl bg-white/80 shadow-lg flex items-center justify-center">
                          <span className="text-5xl">💊</span>
                        </div>
                      )}
                      {selectedProduct.discount && selectedProduct.discount > 0 && (
                        <div className="absolute top-3 left-3 px-3 py-1 bg-red-500 text-white text-sm font-bold rounded-lg shadow-md">
                          {selectedProduct.discount}% OFF
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="md:w-2/3">
                    {/* Category Badge */}
                    <span className="inline-block px-3 py-1 bg-[#5DBB63]/10 text-[#5DBB63] text-xs font-medium rounded-full mb-3">
                      {selectedProduct.category || 'Medicine'}
                    </span>

                    {/* Product Name */}
                    <h2 className="text-2xl font-bold text-[#111827] mb-2">
                      {selectedProduct.name}
                    </h2>

                    {/* Generic Name */}
                    {selectedProduct.genericName && (
                      <p className="text-gray-500 mb-3">
                        Generic: {selectedProduct.genericName}
                      </p>
                    )}

                    {/* Rating */}
                    {selectedProduct.rating && (
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.floor(selectedProduct.rating)
                                  ? 'text-yellow-400 fill-current'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {selectedProduct.rating}
                        </span>
                        {selectedProduct.reviewCount && (
                          <span className="text-sm text-gray-500">
                            ({selectedProduct.reviewCount} reviews)
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-baseline gap-3 mb-4">
                      <span className="text-3xl font-bold text-[#165028]">
                        ৳{selectedProduct.price?.toLocaleString()}
                      </span>
                      {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                        <span className="text-lg text-gray-400 line-through">
                          ৳{selectedProduct.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Brand */}
                    {selectedProduct.brand && (
                      <p className="text-sm text-gray-600 mb-4">
                        <strong>Brand:</strong> {selectedProduct.brand}
                      </p>
                    )}

                    {/* Stock Status */}
                    <div className="flex items-center gap-2 mb-4">
                      {selectedProduct.inStock ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="text-green-600 font-medium">In Stock</span>
                        </>
                      ) : (
                        <>
                          <AlertCircle className="w-5 h-5 text-red-600" />
                          <span className="text-red-600 font-medium">Out of Stock</span>
                        </>
                      )}
                    </div>

                    {/* Prescription Required */}
                    {selectedProduct.prescriptionRequired && (
                      <div className="flex items-center gap-2 p-3 bg-orange-50 border border-orange-200 rounded-lg mb-4">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                        <span className="text-sm text-orange-800 font-medium">
                          Prescription Required
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description */}
                {selectedProduct.description && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#111827] mb-2">Description</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {selectedProduct.description}
                    </p>
                  </div>
                )}

                {/* Product Information */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Package className="w-5 h-5 text-[#5DBB63]" />
                      <h5 className="font-semibold text-[#111827]">Packaging</h5>
                    </div>
                    <p className="text-sm text-gray-600">
                      {selectedProduct.packaging || 'Strip of 10 tablets'}
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <Clock className="w-5 h-5 text-[#5DBB63]" />
                      <h5 className="font-semibold text-[#111827]">Delivery</h5>
                    </div>
                    <p className="text-sm text-gray-600">
                      {selectedProduct.deliveryTime || 'Same day delivery available'}
                    </p>
                  </div>
                </div>

                {/* Key Features */}
                {selectedProduct.features && selectedProduct.features.length > 0 && (
                  <div className="mb-6">
                    <h4 className="font-semibold text-[#111827] mb-3">Key Features</h4>
                    <ul className="space-y-2">
                      {selectedProduct.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-[#5DBB63] flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t border-gray-100">
                  <button
                    onClick={() => {
                      handleAddToCart(selectedProduct);
                      closeQuickView();
                    }}
                    disabled={!selectedProduct.inStock}
                    className={`flex-1 py-3 px-6 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2 ${
                      !selectedProduct.inStock
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        : selectedProduct.prescriptionRequired
                        ? 'bg-gradient-to-r from-orange-500 to-orange-600 text-white hover:from-orange-600 hover:to-orange-700 shadow-md hover:shadow-lg'
                        : 'bg-gradient-to-r from-[#5DBB63] to-[#4a9a4f] text-white hover:from-[#4a9a4f] hover:to-[#165028] shadow-md hover:shadow-lg'
                    }`}
                  >
                    <ShoppingCart className="w-5 h-5" />
                    {selectedProduct.prescriptionRequired ? 'Upload Prescription' : 'Add to Cart'}
                  </button>
                  <Link
                    to={`/pharmacy/product/${selectedProduct.id}`}
                    onClick={closeQuickView}
                    className="px-6 py-3 border-2 border-[#5DBB63] text-[#5DBB63] rounded-xl font-medium hover:bg-[#5DBB63] hover:text-white transition-colors"
                  >
                    View Full Details
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
