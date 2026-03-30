import { Plus, Star, Heart, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../core/Card';
import FileUpload from '../core/FileUpload';
import { useCartStore } from '../../store/cartStore';
import { useState } from 'react';

export default function ProductCard({ product, viewMode = 'grid' }) {
  const addItem = useCartStore((s) => s.addItem);
  const [showPrescriptionUpload, setShowPrescriptionUpload] = useState(false);
  const [prescription, setPrescription] = useState(null);
  const [wishlist, setWishlist] = useState(false);
  
  const { id, name, genericName, brand, manufacturer, price, discount_price, image, images, prescription_required, prescriptionRequired, rating, stock_quantity, inStock } = product;

  const currentPrice = discount_price || price;
  const hasDiscount = discount_price && discount_price < price;
  const discountPercentage = hasDiscount ? Math.round(((price - discount_price) / price) * 100) : 0;
  const isInStock = stock_quantity > 0 || inStock !== false;
  const needsPrescription = prescription_required || prescriptionRequired;

  const handleAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (needsPrescription && !prescription) {
      setShowPrescriptionUpload(true);
      return;
    }
    
    addItem({ id, name: name || genericName, price: currentPrice });
    alert('Added to cart!');
  };

  const handlePrescriptionSubmit = () => {
    if (prescription) {
      addItem({ id, name: name || genericName, price: currentPrice, prescription });
      setShowPrescriptionUpload(false);
      setPrescription(null);
      alert('Added to cart with prescription!');
    }
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(!wishlist);
  };

  return (
    <>
      <Link to={`/pharmacy/product/${id}`}>
      <Card hover className="h-full flex flex-col">
        <div className="aspect-square bg-gray-50 flex items-center justify-center p-4 overflow-hidden relative">
          {image ? (
            <img 
              src={image} 
              alt={name} 
              className="w-full h-full object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : (
            <div className="w-20 h-20 rounded-2xl bg-[#f0fdf2] flex items-center justify-center">
              <span className="text-2xl text-[#5DBB63]">💊</span>
            </div>
          )}
          
          {prescriptionRequired && (
            <div className="absolute top-2 right-2 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded-full">
              Rx Required
            </div>
          )}
          
          {inStock === false && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-medium">Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="font-semibold text-[#111827] line-clamp-2">{name || genericName}</h3>
          {genericName && name && (
            <p className="text-xs text-gray-500 mt-0.5">{genericName}</p>
          )}
          {brand && <p className="text-xs text-gray-500">{brand}</p>}
          
          {rating && (
            <div className="flex items-center gap-1 mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3 h-3 ${
                      i < Math.floor(rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">({rating})</span>
            </div>
          )}
          
          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="font-bold text-[#165028] text-lg">
              ৳{typeof price === 'number' ? price.toLocaleString() : price}
            </span>
            <button
              onClick={handleAdd}
              disabled={inStock === false}
              className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${
                inStock === false
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : prescriptionRequired
                  ? 'bg-orange-100 text-orange-700 hover:bg-orange-200'
                  : 'bg-[#5DBB63] text-white hover:bg-[#4a9a4f]'
              }`}
              aria-label={prescriptionRequired ? "Upload prescription" : "Add to cart"}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </Card>
      </Link>

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
    </>
  );
}
