import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, ChevronRight, Package, Shield, Truck, Clock } from 'lucide-react';
import { productService } from '../services/api';
import { useCartStore } from '../store/cartStore';
import ProductReviews from '../components/features/ProductReviews';
import RelatedProducts from '../components/features/RelatedProducts';
import FileUpload from '../components/core/FileUpload';

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const addItem = useCartStore((s) => s.addItem);
  
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);
  const [showPrescriptionModal, setShowPrescriptionModal] = useState(false);
  const [prescription, setPrescription] = useState(null);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await productService.getById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (product.prescription_required && !prescription) {
      setShowPrescriptionModal(true);
      return;
    }

    addItem({ 
      id: product.id, 
      name: product.name, 
      price: product.discount_price || product.price,
      prescription 
    }, quantity);

    alert('Added to cart!');
  };

  const handlePrescriptionSubmit = () => {
    if (prescription) {
      addItem({ 
        id: product.id, 
        name: product.name, 
        price: product.discount_price || product.price,
        prescription 
      }, quantity);
      
      setShowPrescriptionModal(false);
      setPrescription(null);
      alert('Added to cart with prescription!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-8"></div>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-gray-200 h-96 rounded-2xl"></div>
              <div className="space-y-4">
                <div className="h-10 bg-gray-200 rounded"></div>
                <div className="h-6 bg-gray-200 rounded w-2/3"></div>
                <div className="h-8 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product not found</h2>
          <Link to="/pharmacy" className="text-[#5DBB63] hover:underline">
            Back to Pharmacy
          </Link>
        </div>
      </div>
    );
  }

  const images = product.images || [];
  const currentPrice = product.discount_price || product.price;
  const hasDiscount = product.discount_price && product.discount_price < product.price;
  const discountPercentage = hasDiscount 
    ? Math.round(((product.price - product.discount_price) / product.price) * 100)
    : 0;

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
          <Link to="/" className="hover:text-[#165028]">Home</Link>
          <ChevronRight className="w-4 h-4" />
          <Link to="/pharmacy" className="hover:text-[#165028]">Pharmacy</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-[#165028]">{product.name}</span>
        </div>

        {/* Product Main Section */}
        <div className="grid md:grid-cols-2 gap-12 mb-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="aspect-square bg-gradient-to-br from-[#f0fdf2] to-white rounded-2xl border border-gray-200 p-8 relative overflow-hidden">
              {images.length > 0 ? (
                <img
                  src={images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <Package className="w-32 h-32 text-[#5DBB63] opacity-30" />
                </div>
              )}
              
              {hasDiscount && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  -{discountPercentage}%
                </div>
              )}

              {product.prescription_required && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Rx Required
                </div>
              )}
            </div>

            {/* Thumbnail Images */}
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`aspect-square rounded-xl border-2 overflow-hidden transition-all ${
                      selectedImage === idx ? 'border-[#5DBB63]' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img src={img} alt={`${product.name} ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-[#111827] mb-2">{product.name}</h1>
              {product.manufacturer && (
                <p className="text-gray-600">by <span className="font-medium">{product.manufacturer}</span></p>
              )}
              {product.sku && (
                <p className="text-sm text-gray-500 mt-1">SKU: {product.sku}</p>
              )}
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.total_reviews || 0} reviews)
                </span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-4xl font-bold text-[#165028]">
                ৳{currentPrice?.toLocaleString()}
              </span>
              {hasDiscount && (
                <span className="text-xl text-gray-400 line-through">
                  ৳{product.price?.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2">
              {product.stock_quantity > 0 ? (
                <>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="text-green-700 font-medium">In Stock ({product.stock_quantity} available)</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span className="text-red-700 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Short Description */}
            {product.short_description && (
              <p className="text-gray-700 leading-relaxed">{product.short_description}</p>
            )}

            {/* Quantity Selector */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <span className="font-medium text-gray-700">Quantity:</span>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-[#5DBB63] hover:bg-[#f0fdf2] transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                    className="w-10 h-10 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-[#5DBB63] hover:bg-[#f0fdf2] transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={product.stock_quantity === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-[#5DBB63] text-white rounded-xl hover:bg-[#4a9a4f] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </button>
                <button className="w-14 h-14 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-[#5DBB63] hover:bg-[#f0fdf2] transition-all">
                  <Heart className="w-5 h-5" />
                </button>
                <button className="w-14 h-14 rounded-xl border-2 border-gray-200 flex items-center justify-center hover:border-[#5DBB63] hover:bg-[#f0fdf2] transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3 text-sm">
                <Shield className="w-5 h-5 text-[#5DBB63]" />
                <span className="text-gray-700">100% Authentic</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-5 h-5 text-[#5DBB63]" />
                <span className="text-gray-700">Fast Delivery</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-5 h-5 text-[#5DBB63]" />
                <span className="text-gray-700">Easy Returns</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Package className="w-5 h-5 text-[#5DBB63]" />
                <span className="text-gray-700">Secure Packaging</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Tabs */}
        <div className="mb-16">
          <div className="border-b border-gray-200 mb-6">
            <div className="flex gap-8">
              {['description', 'ingredients', 'usage', 'sideEffects', 'reviews'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-4 px-2 font-medium transition-colors relative ${
                    activeTab === tab
                      ? 'text-[#165028]'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab === 'description' && 'Description'}
                  {tab === 'ingredients' && 'Ingredients'}
                  {tab === 'usage' && 'Usage Instructions'}
                  {tab === 'sideEffects' && 'Side Effects'}
                  {tab === 'reviews' && 'Reviews'}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#5DBB63]"></div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="prose max-w-none">
            {activeTab === 'description' && (
              <div className="text-gray-700 leading-relaxed">
                {product.description || 'No description available.'}
              </div>
            )}
            {activeTab === 'ingredients' && (
              <div className="text-gray-700 leading-relaxed">
                {product.ingredients || 'No ingredient information available.'}
              </div>
            )}
            {activeTab === 'usage' && (
              <div className="text-gray-700 leading-relaxed">
                {product.usage_instructions || 'No usage instructions available.'}
              </div>
            )}
            {activeTab === 'sideEffects' && (
              <div className="text-gray-700 leading-relaxed">
                {product.side_effects || 'No side effects information available.'}
              </div>
            )}
            {activeTab === 'reviews' && (
              <ProductReviews reviews={product.reviews || []} productId={product.id} />
            )}
          </div>
        </div>

        {/* Related Products */}
        <RelatedProducts productId={product.id} />
      </div>

      {/* Prescription Upload Modal */}
      {showPrescriptionModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-[#111827] mb-2">Upload Prescription</h3>
            <p className="text-sm text-gray-600 mb-4">
              This product requires a valid prescription. Please upload a clear image of your prescription.
            </p>
            
            <FileUpload
              value={prescription}
              onChange={setPrescription}
              accept="image/*,.pdf"
              maxSize={5 * 1024 * 1024}
              placeholder="Upload prescription image or PDF"
            />
            
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => {
                  setShowPrescriptionModal(false);
                  setPrescription(null);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handlePrescriptionSubmit}
                disabled={!prescription}
                className="flex-1 px-4 py-2 bg-[#5DBB63] text-white rounded-xl hover:bg-[#4a9a4f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
