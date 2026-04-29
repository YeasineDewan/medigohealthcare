import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, Tag, AlertCircle } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { Button } from '../components/core/Button';

export default function Cart() {
  const { items, removeItem, updateQuantity, applyPromoCode, removePromoCode, promoCode, discount, getSubtotal, getTax, getShipping, getTotal } = useCartStore();
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState({ type: '', text: '' });

  const subtotal = getSubtotal();
  const tax = getTax();
  const shipping = getShipping();
  const total = getTotal();

  const handleApplyPromo = () => {
    const result = applyPromoCode(promoInput);
    setPromoMessage({ 
      type: result.success ? 'success' : 'error', 
      text: result.message 
    });
    if (result.success) {
      setPromoInput('');
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-20 px-4">
        <div className="w-24 h-24 rounded-full bg-[#f0fdf2] flex items-center justify-center mb-6">
          <ShoppingBag className="w-12 h-12 text-[#5DBB63]" />
        </div>
        <h2 className="text-2xl font-bold text-[#111827] mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-6">Add some medicines from our pharmacy</p>
        <Link to="/pharmacy">
          <Button>Browse Pharmacy</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#165028] mb-8">Shopping Cart</h1>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-4 p-4 rounded-2xl bg-white border border-gray-100"
            >
              <div className="w-16 h-16 rounded-xl bg-[#f0fdf2] flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💊</span>
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-[#111827] truncate">{item.name}</h3>
                <p className="text-[#165028] font-semibold">৳{(item.price || 0).toLocaleString()}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <p className="font-semibold text-[#165028] w-24 text-right">
                ৳{((item.price || 0) * item.quantity).toLocaleString()}
              </p>
              <button
                onClick={() => removeItem(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                aria-label="Remove"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 space-y-4">
          {/* Promo Code Section */}
          <div className="p-6 rounded-2xl bg-white border border-gray-200">
            <h3 className="font-semibold text-[#111827] mb-4 flex items-center gap-2">
              <Tag className="w-5 h-5 text-[#5DBB63]" />
              Have a promo code?
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value.toUpperCase())}
                placeholder="Enter code"
                className="flex-1 px-4 py-2 border border-gray-200 rounded-xl focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
              />
              <button
                onClick={handleApplyPromo}
                disabled={!promoInput}
                className="px-6 py-2 bg-[#5DBB63] text-white rounded-xl hover:bg-[#4a9a4f] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Apply
              </button>
            </div>
            {promoMessage.text && (
              <div className={`mt-3 p-3 rounded-lg flex items-center gap-2 ${
                promoMessage.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
              }`}>
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{promoMessage.text}</span>
              </div>
            )}
            {promoCode && (
              <div className="mt-3 flex items-center gap-2 text-sm text-green-700">
                <span className="px-3 py-1 bg-green-50 rounded-lg font-medium">{promoCode}</span>
                <button
                  onClick={removePromoCode}
                  className="text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="p-6 rounded-2xl bg-[#f0fdf2] border border-[#5DBB63]/20">
            <h3 className="font-semibold text-[#111827] mb-4">Order Summary</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal ({items.length} items)</span>
                <span>৳{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (5%)</span>
                <span>৳{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'FREE' : `৳${shipping.toFixed(2)}`}</span>
              </div>
              {shipping === 0 && (
                <div className="text-xs text-green-600">
                  🎉 Free shipping on orders over ৳500
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-৳{discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-[#5DBB63]/30 pt-3 flex justify-between items-center">
                <span className="font-semibold text-[#111827]">Total</span>
                <span className="font-bold text-2xl text-[#165028]">৳{total.toFixed(2)}</span>
              </div>
            </div>
            <Link to="/checkout">
              <Button className="w-full mt-6">Proceed to Checkout</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
