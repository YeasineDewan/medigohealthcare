import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, Filter, ShoppingCart, Heart, Star, Package, Truck, Shield, Clock,
  TrendingUp, Users, ChevronRight, ChevronLeft, Grid, List, Plus, Minus,
  X, Eye, Download, Share2, Bookmark, AlertCircle, CheckCircle, Info,
  Zap, Award, Flame, Tag, DollarSign, Percent, Calendar, MapPin,
  Phone, Mail, User, BarChart3, ArrowUpDown, SlidersHorizontal
} from 'lucide-react';

const MedicineShop = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [viewMode, setViewMode] = useState('grid');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [compare, setCompare] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQuickView, setShowQuickView] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    inStock: true,
    prescription: false,
    discount: false,
    organic: false,
    generic: false
  });

  // Mock categories
  const mockCategories = [
    { id: 'all', name: 'All Products', icon: Package, count: 1247 },
    { id: 'prescription', name: 'Prescription', icon: Shield, count: 423 },
    { id: 'otc', name: 'OTC Medicine', icon: Package, count: 312 },
    { id: 'vitamins', name: 'Vitamins', icon: Heart, count: 189 },
    { id: 'supplements', name: 'Supplements', icon: Zap, count: 156 },
    { id: 'diabetes', name: 'Diabetes Care', icon: Flame, count: 98 },
    { id: 'pain', name: 'Pain Relief', icon: Package, count: 134 },
    { id: 'digestive', name: 'Digestive Health', icon: Package, count: 87 },
    { id: 'cold', name: 'Cold & Flu', icon: Package, count: 76 },
    { id: 'heart', name: 'Heart Health', icon: Heart, count: 92 },
    { id: 'brain', name: 'Brain Health', icon: Package, count: 64 },
    { id: 'bone', name: 'Bone & Joint', icon: Package, count: 89 },
    { id: 'skin', name: 'Skin Care', icon: Package, count: 112 },
    { id: 'baby', name: 'Baby Care', icon: Package, count: 78 }
  ];

  // Mock products
  const mockProducts = [
    {
      id: 1,
      name: 'Amoxicillin 500mg',
      genericName: 'Amoxicillin Trihydrate',
      brand: 'Square Pharmaceutical',
      category: 'prescription',
      price: 180,
      originalPrice: 220,
      discount: 18,
      rating: 4.5,
      reviews: 234,
      inStock: true,
      prescriptionRequired: true,
      description: 'Broad-spectrum antibiotic for bacterial infections',
      features: ['Fast Acting', 'Clinically Tested', 'Safe'],
      stock: 150,
      manufacturer: 'Square Pharmaceutical Ltd.',
      composition: 'Amoxicillin 500mg',
      dosage: '1 capsule twice daily',
      sideEffects: ['Nausea', 'Diarrhea', 'Rash'],
      images: ['https://picsum.photos/seed/medicine1/400/400.jpg'],
      tags: ['antibiotic', 'infection', 'bacterial'],
      isNew: false,
      isBestseller: true,
      isOrganic: false,
      isGeneric: false
    },
    {
      id: 2,
      name: 'Vitamin D3 2000IU',
      genericName: 'Cholecalciferol',
      brand: 'HealthTech Ltd.',
      category: 'vitamins',
      price: 280,
      originalPrice: 350,
      discount: 20,
      rating: 4.7,
      reviews: 342,
      inStock: true,
      prescriptionRequired: false,
      description: 'Essential for bone health and immunity',
      features: ['Organic', 'No Preservatives', 'Vegan'],
      stock: 500,
      manufacturer: 'HealthTech Bangladesh',
      composition: 'Vitamin D3 2000IU',
      dosage: '1 capsule daily',
      sideEffects: ['Rare hypercalcemia'],
      images: ['https://picsum.photos/seed/medicine2/400/400.jpg'],
      tags: ['vitamin', 'immunity', 'bone health'],
      isNew: true,
      isBestseller: false,
      isOrganic: true,
      isGeneric: false
    },
    {
      id: 3,
      name: 'Metformin 500mg',
      genericName: 'Metformin HCl',
      brand: 'Beximco Pharma',
      category: 'diabetes',
      price: 95,
      originalPrice: 120,
      discount: 21,
      rating: 4.6,
      reviews: 189,
      inStock: true,
      prescriptionRequired: true,
      description: 'First-line treatment for type 2 diabetes',
      features: ['Extended Release', 'Kidney Friendly', 'Clinically Proven'],
      stock: 300,
      manufacturer: 'Beximco Pharmaceuticals Ltd.',
      composition: 'Metformin HCl 500mg',
      dosage: '1 tablet twice daily',
      sideEffects: ['GI upset', 'Metallic taste'],
      images: ['https://picsum.photos/seed/medicine3/400/400.jpg'],
      tags: ['diabetes', 'blood sugar', 'metformin'],
      isNew: false,
      isBestseller: true,
      isOrganic: false,
      isGeneric: true
    },
    {
      id: 4,
      name: 'Paracetamol 500mg',
      genericName: 'Acetaminophen',
      brand: 'Incepta Pharmaceuticals',
      category: 'otc',
      price: 45,
      originalPrice: 60,
      discount: 25,
      rating: 4.3,
      reviews: 567,
      inStock: true,
      prescriptionRequired: false,
      description: 'Effective pain and fever relief',
      features: ['Fast Acting', 'Gentle on Stomach', 'Non-Drowsy'],
      stock: 1000,
      manufacturer: 'Incepta Pharmaceuticals Ltd.',
      composition: 'Paracetamol 500mg',
      dosage: '1 tablet every 6 hours',
      sideEffects: ['Rare liver toxicity at high doses'],
      images: ['https://picsum.photos/seed/medicine4/400/400.jpg'],
      tags: ['pain', 'fever', 'headache'],
      isNew: false,
      isBestseller: true,
      isOrganic: false,
      isGeneric: true
    },
    {
      id: 5,
      name: 'Omeprazole 20mg',
      genericName: 'Omeprazole',
      brand: 'Square Pharmaceutical',
      category: 'prescription',
      price: 150,
      originalPrice: 180,
      discount: 17,
      rating: 4.4,
      reviews: 278,
      inStock: true,
      prescriptionRequired: true,
      description: 'Proton pump inhibitor for acid reflux',
      features: ['24 Hour Protection', 'Delayed Release', 'Prescription Free'],
      stock: 200,
      manufacturer: 'Square Pharmaceutical Ltd.',
      composition: 'Omeprazole 20mg',
      dosage: '1 capsule before breakfast',
      sideEffects: ['Headache', 'Diarrhea', 'Vitamin B12 deficiency'],
      images: ['https://picsum.photos/seed/medicine5/400/400.jpg'],
      tags: ['acid reflux', 'heartburn', 'stomach'],
      isNew: false,
      isBestseller: false,
      isOrganic: false,
      isGeneric: false
    },
    {
      id: 6,
      name: 'Omega-3 Fish Oil',
      genericName: 'Omega-3 Fatty Acids',
      brand: 'Nature\'s Way',
      category: 'supplements',
      price: 450,
      originalPrice: 550,
      discount: 18,
      rating: 4.8,
      reviews: 423,
      inStock: true,
      prescriptionRequired: false,
      description: 'Supports heart, brain, and joint health',
      features: ['Molecularly Distilled', 'No Mercury', 'Wild Caught'],
      stock: 150,
      manufacturer: 'Nature\'s Way',
      composition: 'Omega-3 1000mg',
      dosage: '1 capsule twice daily',
      sideEffects: ['Fishy aftertaste'],
      images: ['https://picsum.photos/seed/medicine6/400/400.jpg'],
      tags: ['omega-3', 'fish oil', 'heart health'],
      isNew: true,
      isBestseller: false,
      isOrganic: true,
      isGeneric: false
    }
  ];

  useEffect(() => {
    setCategories(mockCategories);
    setProducts(mockProducts);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.genericName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesFilters = (!filters.inStock || product.inStock) &&
                          (!filters.prescription || product.prescriptionRequired) &&
                          (!filters.discount || product.discount > 0) &&
                          (!filters.organic || product.isOrganic) &&
                          (!filters.generic || product.isGeneric);
    
    return matchesCategory && matchesSearch && matchesPrice && matchesFilters;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'discount':
        return b.discount - a.discount;
      case 'new':
        return b.isNew - a.isNew;
      case 'featured':
      default:
        return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    }
  });

  const handleAddToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleAddToWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleAddToCompare = (product) => {
    setCompare(prev => {
      const exists = prev.find(item => item.id === product.id);
      if (exists) {
        return prev.filter(item => item.id !== product.id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), product];
      }
      return [...prev, product];
    });
  };

  const ProductCard = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group"
    >
      {/* Product Image */}
      <div className="relative">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              New
            </span>
          )}
          {product.isBestseller && (
            <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full">
              Bestseller
            </span>
          )}
          {product.discount > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => handleAddToWishlist(product)}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
          >
            <Heart className="w-4 h-4 text-gray-600 hover:text-red-500" />
          </button>
          <button
            onClick={() => handleAddToCompare(product)}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-50 transition-colors"
          >
            <BarChart3 className="w-4 h-4 text-gray-600 hover:text-blue-500" />
          </button>
          <button
            onClick={() => {
              setSelectedProduct(product);
              setShowQuickView(true);
            }}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-emerald-50 transition-colors"
          >
            <Eye className="w-4 h-4 text-gray-600 hover:text-emerald-500" />
          </button>
        </div>

        {/* Stock Status */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Brand and Name */}
        <div className="mb-2">
          <p className="text-xs text-gray-500">{product.brand}</p>
          <h3 className="font-semibold text-gray-900 text-sm line-clamp-2">
            {product.name}
          </h3>
          {product.genericName && (
            <p className="text-xs text-gray-500">{product.genericName}</p>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">({product.reviews})</span>
        </div>

        {/* Features */}
        {product.features && (
          <div className="flex flex-wrap gap-1 mb-2">
            {product.features.slice(0, 2).map((feature, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
              >
                {feature}
              </span>
            ))}
            {product.features.length > 2 && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                +{product.features.length - 2}
              </span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-bold text-gray-900">৳{product.price}</span>
              {product.originalPrice && product.originalPrice > product.price && (
                <span className="text-sm text-gray-500 line-through">
                  ৳{product.originalPrice}
                </span>
              )}
            </div>
            {product.discount > 0 && (
              <span className="text-xs text-green-600 font-medium">
                Save ৳{product.originalPrice - product.price}
              </span>
            )}
          </div>
          {product.stock && (
            <span className="text-xs text-gray-500">
              {product.stock} in stock
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button
            onClick={() => handleAddToCart(product)}
            disabled={!product.inStock}
            className="flex-1 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-1"
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
          {product.prescriptionRequired && (
            <button className="px-3 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-1">
              <Shield className="w-4 h-4" />
              Rx
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Medicine Shop</h1>
              <p className="text-gray-600">Professional medical products and supplies</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Package className="w-4 h-4" />
                <span>{products.length} Products</span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-emerald-100 text-emerald-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search medicines, brands, or symptoms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="discount">Best Discount</option>
              <option value="new">New Arrivals</option>
            </select>

            {/* Filters Toggle */}
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filters
            </button>
          </div>

          {/* Categories */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{category.name}</span>
                <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
                  {category.count}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && sortedProducts.length === 0 && (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filters
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setPriceRange([0, 10000]);
              }}
              className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      <AnimatePresence>
        {showQuickView && selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                    <p className="text-gray-600">{selectedProduct.genericName}</p>
                  </div>
                  <button
                    onClick={() => setShowQuickView(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <img
                      src={selectedProduct.images[0]}
                      alt={selectedProduct.name}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                  <div>
                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                      <p className="text-gray-600">{selectedProduct.description}</p>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Key Features</h3>
                      <ul className="space-y-1">
                        {selectedProduct.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Product Details</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Brand:</span>
                          <span className="font-medium">{selectedProduct.brand}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Manufacturer:</span>
                          <span className="font-medium">{selectedProduct.manufacturer}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Composition:</span>
                          <span className="font-medium">{selectedProduct.composition}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Dosage:</span>
                          <span className="font-medium">{selectedProduct.dosage}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Price</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-gray-900">৳{selectedProduct.price}</span>
                        {selectedProduct.originalPrice && selectedProduct.originalPrice > selectedProduct.price && (
                          <span className="text-gray-500 line-through">৳{selectedProduct.originalPrice}</span>
                        )}
                        {selectedProduct.discount > 0 && (
                          <span className="text-green-600 font-medium">-{selectedProduct.discount}%</span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleAddToCart(selectedProduct)}
                        className="flex-1 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingCart className="w-4 h-4" />
                        Add to Cart
                      </button>
                      <button
                        onClick={() => handleAddToWishlist(selectedProduct)}
                        className="px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MedicineShop;
