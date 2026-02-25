import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Wallet, Banknote, MapPin, Phone, Mail, User } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { orderService } from '../services/api';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getSubtotal, getTax, getShipping, getTotal, discount, clearCart } = useCartStore();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    shipping_name: '',
    shipping_email: '',
    shipping_phone: '',
    shipping_address: '',
    shipping_city: '',
    shipping_zip: '',
    payment_method: 'cod',
    delivery_slot: 'standard',
  });

  const subtotal = getSubtotal();
  const tax = getTax();
  const shipping = getShipping();
  const total = getTotal();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleNext = () => {
    if (step === 1) {
      if (!formData.shipping_name || !formData.shipping_phone || !formData.shipping_address || !formData.shipping_city) {
        alert('Please fill in all required fields');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      setLoading(true);
      
      const orderData = {
        items: items.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        ...formData,
        subtotal,
        tax,
        shipping,
        discount,
        total,
      };

      const response = await orderService.create(orderData);
      clearCart();
      navigate(`/order-confirmation/${response.data.id}`);
    } catch (error) {
      console.error('Failed to create order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#165028] mb-8">Checkout</h1>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {[
              { num: 1, label: 'Delivery' },
              { num: 2, label: 'Payment' },
              { num: 3, label: 'Review' },
            ].map((s, idx) => (
              <div key={s.num} className="flex items-center flex-1">
                <div className="flex items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      step >= s.num
                        ? 'bg-[#5DBB63] text-white'
                        : 'bg-gray-200 text-gray-500'
                    }`}
                  >
                    {step > s.num ? <Check className="w-5 h-5" /> : s.num}
                  </div>
                  <span className={`ml-2 font-medium hidden sm:inline ${step >= s.num ? 'text-[#165028]' : 'text-gray-500'}`}>
                    {s.label}
                  </span>
                </div>
                {idx < 2 && (
                  <div className={`flex-1 h-1 mx-4 ${step > s.num ? 'bg-[#5DBB63]' : 'bg-gray-200'}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm p-6">
              {/* Step 1: Delivery Information */}
              {step === 1 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-[#111827] flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#5DBB63]" />
                    Delivery Information
                  </h2>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="text"
                          name="shipping_name"
                          value={formData.shipping_name}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                          placeholder="John Doe"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="tel"
                          name="shipping_phone"
                          value={formData.shipping_phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                          placeholder="+880 1XXX-XXXXXX"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type="email"
                          name="shipping_email"
                          value={formData.shipping_email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Street Address <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="shipping_address"
                        value={formData.shipping_address}
                        onChange={handleInputChange}
                        rows="3"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none resize-none"
                        placeholder="House/Flat, Road, Area"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        City <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        name="shipping_city"
                        value={formData.shipping_city}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                        placeholder="Dhaka"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Postal Code
                      </label>
                      <input
                        type="text"
                        name="shipping_zip"
                        value={formData.shipping_zip}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                        placeholder="1000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Delivery Time Slot
                    </label>
                    <select
                      name="delivery_slot"
                      value={formData.delivery_slot}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                    >
                      <option value="standard">Standard (2-3 days)</option>
                      <option value="express">Express (1-2 days) - ৳100 extra</option>
                      <option value="same_day">Same Day (within 24 hours) - ৳200 extra</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Step 2: Payment Method */}
              {step === 2 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-[#111827] flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-[#5DBB63]" />
                    Payment Method
                  </h2>

                  <div className="space-y-3">
                    {[
                      { value: 'cod', icon: Banknote, label: 'Cash on Delivery', desc: 'Pay when you receive' },
                      { value: 'card', icon: CreditCard, label: 'Credit/Debit Card', desc: 'Visa, Mastercard, Amex' },
                      { value: 'bkash', icon: Wallet, label: 'bKash', desc: 'Mobile payment' },
                      { value: 'nagad', icon: Wallet, label: 'Nagad', desc: 'Mobile payment' },
                    ].map((method) => (
                      <label
                        key={method.value}
                        className={`flex items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          formData.payment_method === method.value
                            ? 'border-[#5DBB63] bg-[#f0fdf2]'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="payment_method"
                          value={method.value}
                          checked={formData.payment_method === method.value}
                          onChange={handleInputChange}
                          className="hidden"
                        />
                        <method.icon className="w-6 h-6 text-[#5DBB63] mr-3" />
                        <div className="flex-1">
                          <div className="font-medium text-[#111827]">{method.label}</div>
                          <div className="text-sm text-gray-500">{method.desc}</div>
                        </div>
                        {formData.payment_method === method.value && (
                          <Check className="w-5 h-5 text-[#5DBB63]" />
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 3: Review Order */}
              {step === 3 && (
                <div className="space-y-6">
                  <h2 className="text-xl font-semibold text-[#111827]">Review Your Order</h2>

                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="font-medium text-[#111827] mb-2">Delivery Address</h3>
                      <p className="text-gray-700">{formData.shipping_name}</p>
                      <p className="text-gray-700">{formData.shipping_phone}</p>
                      <p className="text-gray-700">{formData.shipping_address}</p>
                      <p className="text-gray-700">{formData.shipping_city} {formData.shipping_zip}</p>
                    </div>

                    <div className="border-b border-gray-200 pb-4">
                      <h3 className="font-medium text-[#111827] mb-2">Payment Method</h3>
                      <p className="text-gray-700 capitalize">{formData.payment_method.replace('_', ' ')}</p>
                    </div>

                    <div>
                      <h3 className="font-medium text-[#111827] mb-3">Order Items</h3>
                      <div className="space-y-3">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-[#f0fdf2] rounded-xl flex items-center justify-center">
                              💊
                            </div>
                            <div className="flex-1">
                              <div className="font-medium text-[#111827]">{item.name}</div>
                              <div className="text-sm text-gray-500">Qty: {item.quantity}</div>
                            </div>
                            <div className="font-semibold text-[#165028]">
                              ৳{(item.price * item.quantity).toLocaleString()}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
                    <div className="text-yellow-600 mt-0.5">⚠️</div>
                    <div className="text-sm text-yellow-800">
                      By placing this order, you agree to our Terms of Service and Privacy Policy.
                      Orders containing prescription items will be reviewed by our pharmacists.
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="mt-8 flex gap-3">
                {step > 1 && (
                  <button
                    onClick={() => setStep(step - 1)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    Back
                  </button>
                )}
                {step < 3 ? (
                  <button
                    onClick={handleNext}
                    className="flex-1 px-6 py-3 bg-[#5DBB63] text-white rounded-xl hover:bg-[#4a9a4f] transition-colors font-medium"
                  >
                    Continue
                  </button>
                ) : (
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="flex-1 px-6 py-3 bg-[#5DBB63] text-white rounded-xl hover:bg-[#4a9a4f] transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Placing Order...' : 'Place Order'}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-sm p-6 sticky top-24">
              <h3 className="font-semibold text-[#111827] mb-4">Order Summary</h3>
              <div className="space-y-3 pb-4 border-b border-gray-200">
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
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-৳{discount.toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="pt-4 flex justify-between items-center">
                <span className="font-semibold text-[#111827]">Total</span>
                <span className="font-bold text-2xl text-[#165028]">৳{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
