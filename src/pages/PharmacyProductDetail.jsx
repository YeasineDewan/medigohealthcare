import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, Star, Heart, Plus, ShoppingCart, Shield, Truck, Clock, 
  CheckCircle, AlertCircle, Phone, Mail, MapPin, Info, Package, Pill
} from 'lucide-react';
import { motion } from 'framer-motion';
import Card from '../components/core/Card';
import FileUpload from '../components/core/FileUpload';
import { productService } from '../services/api';
import { useCartStore } from '../store/cartStore';

export default function PharmacyProductDetail() {
  const { id } = useParams();
  const addItem = useCartStore((s) => s.addItem);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [showPrescriptionUpload, setShowPrescriptionUpload] = useState(false);
  const [prescription, setPrescription] = useState(null);
  const [wishlist, setWishlist] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    loadProduct();
    loadRelatedProducts();
  }, [id]);

  const loadProduct = async () => {
    try {
      setLoading(true);
      const response = await productService.getById(id);
      setProduct(response.data?.data || response.data);
      setError(null);
    } catch (error) {
      console.error('Failed to load product:', error);
      setError('Product not found');
    } finally {
      setLoading(false);
    }
  };

  const loadRelatedProducts = async () => {
    try {
      const response = await productService.getRelated(id);
      setRelatedProducts(response.data?.data || response.data || []);
    } catch (error) {
      console.error('Failed to load related products:', error);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;

    const needsPrescription = product.prescription_required || product.prescriptionRequired;
    
    if (needsPrescription && !prescription) {
      setShowPrescriptionUpload(true);
      return;
    }

    for (let i = 0; i < quantity; i++) {
      addItem({ 
        id: product.id, 
        name: product.name || product.genericName, 
        price: product.discount_price || product.price,
        prescription: prescription || null
      });
    }
    
    alert(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart!`);
  };

  const handlePrescriptionSubmit = () => {
    if (prescription && product) {
      for (let i = 0; i < quantity; i++) {
        addItem({ 
          id: product.id, 
          name: product.name || product.genericName, 
          price: product.discount_price || product.price,
          prescription 
        });
      }
      setShowPrescriptionUpload(false);
      setPrescription(null);
      alert(`Added ${quantity} item${quantity > 1 ? 's' : ''} to cart with prescription!`);
    }
  };

  const toggleWishlist = () => {
    setWishlist(!wishlist);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5DBB63]"></div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h2>
          <p className="text-gray-600 mb-6">{error || 'The product you are looking for does not exist.'}</p>
          <Link
            to="/pharmacy"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#5DBB63] text-white rounded-xl hover:bg-[#4a9a4f] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Pharmacy
          </Link>
        </div>
      </div>
    );
  }

  const currentPrice = product.discount_price || product.price;
  const hasDiscount = product.discount_price && product.discount_price < product.price;
  const discountPercentage = hasDiscount ? Math.round(((product.price - product.discount_price) / product.price) * 100) : 0;
  const isInStock = product.stock_quantity > 0 || product.inStock !== false;
  const needsPrescription = product.prescription_required || product.prescriptionRequired;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link to="/" className="hover:text-[#5DBB63]">Home</Link>
            <span>/</span>
            <Link to="/pharmacy" className="hover:text-[#5DBB63]">Pharmacy</Link>
            <span>/</span>
            <span className="text-gray-900">{product.name || product.genericName}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden">
              <div className="aspect-square bg-gray-50 flex items-center justify-center p-8">
                {product.image ? (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : (
                  <div className="w-32 h-32 rounded-2xl bg-[#f0fdf2] flex items-center justify-center">
                    <Pill className="w-16 h-16 text-[#5DBB63]" />
                  </div>
                )}
              </div>
            </Card>

            {/* Product Info Pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {needsPrescription && (
                <div className="px-3 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                  Prescription Required
                </div>
              )}
              {!isInStock && (
                <div className="px-3 py-1 bg-gray-100 text-gray-700 text-sm font-medium rounded-full">
                  Out of Stock
                </div>
              )}
              {product.manufacturer && (
                <div className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full">
                  {product.manufacturer}
                </div>
              )}
            </div>
          </motion.div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            {/* Title and Basic Info */}
            <div>
              <h1 className="text-3xl font-bold text-[#111827] mb-2">
                {product.name || product.genericName}
              </h1>
              {product.genericName && product.name && (
                <p className="text-lg text-gray-600 mb-2">{product.genericName}</p>
              )}
              {product.brand && (
                <p className="text-gray-500 mb-4">Brand: {product.brand}</p>
              )}

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mb-4">
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
                  <span className="text-gray-600">{product.rating}</span>
                  {product.reviews && (
                    <span className="text-gray-500">({product.reviews} reviews)</span>
                  )}
                </div>
              )}

              {/* Price */}
              <div className="flex items-center gap-3 mb-6">
                <span className="text-3xl font-bold text-[#165028]">
                  ৳{typeof currentPrice === 'number' ? currentPrice.toLocaleString() : currentPrice}
                </span>
                {hasDiscount && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      ৳{typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
                    </span>
                    <span className="px-2 py-1 bg-red-100 text-red-700 text-sm font-medium rounded-full">
                      {discountPercentage}% OFF
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Description */}
            {product.description && (
              <div>
                <h3 className="text-lg font-semibold text-[#111827] mb-2">Description</h3>
                <p className="text-gray-600">{product.description}</p>
              </div>
            )}

            {/* Product Details */}
            <div className="grid grid-cols-2 gap-4">
              {product.dosage_form && (
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Form: {product.dosage_form}</span>
                </div>
              )}
              {product.pack_size && (
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Pack Size: {product.pack_size}</span>
                </div>
              )}
              {product.stock_quantity !== undefined && (
                <div className="flex items-center gap-2">
                  <Package className="w-5 h-5 text-gray-400" />
                  <span className="text-sm text-gray-600">Stock: {product.stock_quantity} units</span>
                </div>
              )}
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <label className="text-sm font-medium text-gray-700">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300 min-w-[60px] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={!isInStock}
                  className={`flex-1 px-6 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2 ${
                    !isInStock
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : needsPrescription
                      ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                      : 'bg-[#5DBB63] text-white hover:bg-[#4a9a4f]'
                  }`}
                >
                  <ShoppingCart className="w-5 h-5" />
                  {needsPrescription ? 'Upload & Add to Cart' : 'Add to Cart'}
                </button>
                <button
                  onClick={toggleWishlist}
                  className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <Heart className={`w-5 h-5 ${wishlist ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-[#5DBB63]" />
                <div>
                  <p className="font-medium text-gray-900">Free Delivery</p>
                  <p className="text-sm text-gray-500">On orders over ৳500</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-[#5DBB63]" />
                <div>
                  <p className="font-medium text-gray-900">Authentic</p>
                  <p className="text-sm text-gray-500">100% Genuine</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-[#5DBB63]" />
                <div>
                  <p className="font-medium text-gray-900">Fast Delivery</p>
                  <p className="text-sm text-gray-500">24-48 hours</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#111827] mb-6">Related Products</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} hover className="h-full">
                  <Link to={`/pharmacy/product/${relatedProduct.id}`}>
                    <div className="aspect-square bg-gray-50 flex items-center justify-center p-4">
                      {relatedProduct.image ? (
                        <img
                          src={relatedProduct.image}
                          alt={relatedProduct.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-2xl bg-[#f0fdf2] flex items-center justify-center">
                          <Pill className="w-8 h-8 text-[#5DBB63]" />
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-[#111827] line-clamp-2">
                        {relatedProduct.name || relatedProduct.genericName}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{relatedProduct.brand}</p>
                      <div className="mt-3 flex items-center justify-between">
                        <span className="font-bold text-[#165028]">
                          ৳{typeof relatedProduct.price === 'number' ? relatedProduct.price.toLocaleString() : relatedProduct.price}
                        </span>
                        <Plus className="w-5 h-5 text-[#5DBB63]" />
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Prescription Upload Modal */}
      {showPrescriptionUpload && (
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
                  setShowPrescriptionUpload(false);
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
