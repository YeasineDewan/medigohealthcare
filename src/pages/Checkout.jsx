import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, CreditCard, Wallet, Banknote, MapPin, Phone, Mail, User, X, Download, FileText, Eye, Printer, Share2, FileSpreadsheet, Calendar, Building, Package, Truck, Shield, Star, ArrowRight, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { generatePDF, previewInvoice, generateCSV, generateWord } from '../utils/invoiceGenerator';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getSubtotal, getTax, getShipping, getTotal, discount, clearCart } = useCartStore();
  
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderData, setOrderData] = useState(null);
  const [invoiceGenerating, setInvoiceGenerating] = useState(false);
  const [downloadFormat, setDownloadFormat] = useState('pdf');
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const invoiceRef = useRef(null);
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
    setLoading(true);
    
    try {
      // Generate order ID locally
      const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      
      // Store order data in localStorage
      const order = {
        id: orderId,
        items: items.map(item => ({
          product_id: item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          total: item.price * item.quantity,
        })),
        ...formData,
        subtotal,
        tax,
        shipping,
        discount,
        total,
        orderDate: new Date().toISOString(),
        created_at: new Date().toISOString(),
        status: 'pending',
      };
      
      localStorage.setItem(`order_${orderId}`, JSON.stringify(order));
      
      // Use setTimeout to avoid setState during render
      setTimeout(() => {
        setOrderData(order);
        clearCart();
        setLoading(false);
        setShowInvoiceModal(true);
      }, 1000);
      
    } catch (error) {
      console.error('Order creation failed:', error);
      setLoading(false);
      alert('Failed to place order. Please try again.');
    }
  };

  const handleDownloadInvoice = async (format = 'pdf') => {
    try {
      if (orderData) {
        setInvoiceGenerating(true);
        const customer = {
          name: orderData.shipping_name,
          email: orderData.shipping_email,
          phone: orderData.shipping_phone,
        };
        
        switch (format) {
          case 'pdf':
            generatePDF(orderData, customer);
            break;
          case 'csv':
            generateCSV(orderData, customer);
            break;
          case 'word':
            await generateWord(orderData, customer);
            break;
          default:
            generatePDF(orderData, customer);
        }
        
        // Show success feedback
        setTimeout(() => {
          setInvoiceGenerating(false);
        }, 1500);
      }
    } catch (error) {
      console.error('Failed to download invoice:', error);
      setInvoiceGenerating(false);
      alert('Failed to generate invoice. Please try again.');
    }
  };

  const handlePreviewInvoice = () => {
    try {
      if (orderData) {
        const customer = {
          name: orderData.shipping_name,
          email: orderData.shipping_email,
          phone: orderData.shipping_phone,
        };
        previewInvoice(orderData, customer);
      }
    } catch (error) {
      console.error('Failed to preview invoice:', error);
      alert('Failed to preview invoice. Please try again.');
    }
  };

  const handlePrintInvoice = () => {
    try {
      if (invoiceRef.current) {
        const printContent = invoiceRef.current.innerHTML;
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Invoice - ${orderData?.id}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .invoice-header { text-align: center; margin-bottom: 30px; }
              .invoice-details { margin: 20px 0; }
              .invoice-table { width: 100%; border-collapse: collapse; margin: 20px 0; }
              .invoice-table th, .invoice-table td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              .invoice-table th { background-color: #f5f5f5; }
              .text-right { text-align: right; }
              .text-center { text-align: center; }
              .invoice-summary { margin-top: 20px; }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
          </html>
        `);
        printWindow.document.close();
        printWindow.print();
      }
    } catch (error) {
      console.error('Failed to print invoice:', error);
      alert('Failed to print invoice. Please try again.');
    }
  };

  const handleShareInvoice = async (method) => {
    try {
      if (orderData) {
        const invoiceUrl = `${window.location.origin}/invoice/${orderData.id}`;
        const shareText = `Your Medigo Health Invoice #${orderData.id} for ৳${orderData.total.toLocaleString()}`;
        
        switch (method) {
          case 'email':
            // Simulate email sending
            setEmailSent(true);
            setTimeout(() => setEmailSent(false), 3000);
            break;
          case 'copy':
            await navigator.clipboard.writeText(`${shareText}\n${invoiceUrl}`);
            alert('Invoice link copied to clipboard!');
            break;
          case 'whatsapp':
            window.open(`https://wa.me/?text=${encodeURIComponent(shareText + '\n' + invoiceUrl)}`, '_blank');
            break;
          default:
            break;
        }
        setShowShareOptions(false);
      }
    } catch (error) {
      console.error('Failed to share invoice:', error);
      alert('Failed to share invoice. Please try again.');
    }
  };

  const handleFinishOrder = () => {
    setShowInvoiceModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    navigate('/pharmacy');
  };

  useEffect(() => {
    if (items.length === 0) {
      navigate('/cart');
    }
  }, [items.length, navigate]);

  if (items.length === 0) {
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

      {/* Professional Invoice Modal */}
      {showInvoiceModal && orderData && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-[#165028] to-[#0f3d1a] text-white p-6 flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold flex items-center gap-3">
                  <FileText className="w-8 h-8" />
                  Order Invoice
                </h2>
                <p className="text-green-100 mt-1">Order #{orderData.id} • {new Date().toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Confirmed</span>
                </div>
                <button
                  onClick={() => setShowInvoiceModal(false)}
                  className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            {/* Invoice Content */}
            <div className="flex flex-col lg:flex-row h-[calc(95vh-120px)]">
              {/* Main Invoice Content */}
              <div className="flex-1 overflow-y-auto p-8" ref={invoiceRef}>
                {/* Company Header */}
                <div className="text-center mb-8 pb-6 border-b-2 border-gray-200">
                  <div className="flex items-center justify-center mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-[#165028] to-[#5DBB63] rounded-2xl flex items-center justify-center mb-3">
                      <Shield className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h1 className="text-4xl font-bold text-[#165028] mb-2">Medigo Health</h1>
                  <p className="text-gray-600 text-lg">Digital Healthcare Platform</p>
                  <div className="flex items-center justify-center gap-6 mt-3 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      Dhaka, Bangladesh
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-4 h-4" />
                      +880 1XXX-XXXXXX
                    </span>
                    <span className="flex items-center gap-1">
                      <Mail className="w-4 h-4" />
                      support@medigo.health
                    </span>
                  </div>
                </div>

                {/* Invoice Status & Details */}
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-xl border border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <FileText className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-blue-600 font-medium">Invoice Number</p>
                        <p className="text-lg font-bold text-blue-900">MED-{orderData.id}-{Date.now().toString().slice(-6)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-xl border border-green-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-green-600 font-medium">Order Date</p>
                        <p className="text-lg font-bold text-green-900">{new Date().toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-xl border border-purple-200">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-purple-600 font-medium">Payment Method</p>
                        <p className="text-lg font-bold text-purple-900">{orderData.payment_method?.replace('_', ' ')?.toUpperCase() || 'COD'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Customer & Shipping Info */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <User className="w-5 h-5 text-[#165028]" />
                      Customer Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Full Name</p>
                        <p className="font-semibold text-gray-900">{orderData.shipping_name}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Email Address</p>
                        <p className="font-semibold text-gray-900">{orderData.shipping_email || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone Number</p>
                        <p className="font-semibold text-gray-900">{orderData.shipping_phone}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 rounded-xl">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-[#165028]" />
                      Shipping Information
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm text-gray-500">Delivery Address</p>
                        <p className="font-semibold text-gray-900">{orderData.shipping_address}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">City</p>
                        <p className="font-semibold text-gray-900">{orderData.shipping_city} {orderData.shipping_zip}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Delivery Type</p>
                        <p className="font-semibold text-gray-900 capitalize">{orderData.delivery_slot || 'Standard Delivery'}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-8">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Package className="w-5 h-5 text-[#165028]" />
                    Order Items
                  </h3>
                  <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
                    <table className="w-full">
                      <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                        <tr>
                          <th className="px-6 py-4 text-left text-sm font-bold text-gray-900">Product</th>
                          <th className="px-6 py-4 text-center text-sm font-bold text-gray-900">Quantity</th>
                          <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">Unit Price</th>
                          <th className="px-6 py-4 text-right text-sm font-bold text-gray-900">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {orderData.items.map((item, index) => (
                          <tr key={index} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-[#165028]/10 rounded-lg flex items-center justify-center">
                                  <Package className="w-5 h-5 text-[#165028]" />
                                </div>
                                <div>
                                  <p className="font-semibold text-gray-900">{item.name}</p>
                                  <p className="text-sm text-gray-500">Product ID: {item.product_id}</p>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-center">
                              <span className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full text-sm font-semibold">
                                {item.quantity}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-right font-medium text-gray-900">
                              ৳{item.price.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 text-right font-bold text-gray-900">
                              ৳{(item.price * item.quantity).toLocaleString()}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="bg-gradient-to-br from-[#165028]/5 to-[#5DBB63]/5 p-6 rounded-xl border border-[#165028]/20">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-[#165028]" />
                    Order Summary
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-gray-700">
                      <span>Subtotal ({orderData.items.length} items)</span>
                      <span className="font-medium">৳{orderData.subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Tax (5%)</span>
                      <span className="font-medium">৳{orderData.tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-700">
                      <span>Shipping Fee</span>
                      <span className="font-medium">{orderData.shipping === 0 ? 'FREE' : `৳${orderData.shipping.toLocaleString()}`}</span>
                    </div>
                    {orderData.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount Applied</span>
                        <span className="font-medium">-৳{orderData.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="border-t-2 border-[#165028]/20 pt-3 flex justify-between">
                      <span className="text-xl font-bold text-[#165028]">Total Amount</span>
                      <span className="text-2xl font-bold text-[#165028]">৳{orderData.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Actions */}
              <div className="lg:w-80 bg-gray-50 border-l border-gray-200 p-6">
                <h3 className="font-bold text-gray-900 mb-6">Invoice Actions</h3>
                
                {/* Quick Actions */}
                <div className="space-y-4 mb-6">
                  <button
                    onClick={() => handleDownloadInvoice('pdf')}
                    disabled={invoiceGenerating}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-gradient-to-r from-[#165028] to-[#5DBB63] text-white rounded-xl hover:from-[#0f3d1a] hover:to-[#4a9a4f] transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
                  >
                    {invoiceGenerating ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Generating...</span>
                      </>
                    ) : (
                      <>
                        <Download className="w-5 h-5" />
                        <span>Download PDF</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handlePreviewInvoice}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    <Eye className="w-5 h-5" />
                    <span>Preview Invoice</span>
                  </button>

                  <button
                    onClick={handlePrintInvoice}
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                  >
                    <Printer className="w-5 h-5" />
                    <span>Print Invoice</span>
                  </button>
                </div>

                {/* Format Options */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Download Format</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {['pdf', 'csv', 'word'].map((format) => (
                      <button
                        key={format}
                        onClick={() => {
                          setDownloadFormat(format);
                          handleDownloadInvoice(format);
                        }}
                        disabled={invoiceGenerating}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          downloadFormat === format
                            ? 'bg-[#165028] text-white'
                            : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                        } disabled:opacity-50`}
                      >
                        {format.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Share Options */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Share Invoice</h4>
                  <div className="space-y-2">
                    <button
                      onClick={() => handleShareInvoice('email')}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm"
                    >
                      <Mail className="w-4 h-4" />
                      {emailSent ? 'Email Sent!' : 'Send via Email'}
                    </button>
                    <button
                      onClick={() => handleShareInvoice('whatsapp')}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm"
                    >
                      <Share2 className="w-4 h-4" />
                      Share on WhatsApp
                    </button>
                    <button
                      onClick={() => handleShareInvoice('copy')}
                      className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm"
                    >
                      <FileText className="w-4 h-4" />
                      Copy Link
                    </button>
                  </div>
                </div>

                {/* Order Status */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Info className="w-4 h-4 text-blue-600" />
                    <h4 className="font-semibold text-blue-900">Order Status</h4>
                  </div>
                  <p className="text-sm text-blue-700 mb-3">Your order has been confirmed and is being processed.</p>
                  <div className="flex items-center gap-2 text-sm text-blue-600">
                    <CheckCircle className="w-4 h-4" />
                    <span>Estimated delivery: 3-5 business days</span>
                  </div>
                </div>

                {/* Complete Order Button */}
                <button
                  onClick={handleFinishOrder}
                  className="w-full mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all font-medium shadow-lg"
                >
                  <ArrowRight className="w-5 h-5" />
                  Complete Order
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Professional Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md text-center p-8 relative overflow-hidden">
            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full -mr-16 -mt-16" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-blue-100 to-cyan-100 rounded-full -ml-12 -mb-12" />
            
            {/* Success Icon */}
            <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Check className="w-12 h-12 text-white" />
            </div>
            
            {/* Success Content */}
            <h2 className="relative z-10 text-3xl font-bold text-[#165028] mb-3">Order Successful!</h2>
            <p className="relative z-10 text-gray-600 mb-6 leading-relaxed">
              Thank you for your order. We've received it and will process it soon. 
              Your invoice has been generated and is ready for download.
            </p>
            
            {/* Order Details */}
            <div className="relative z-10 bg-gradient-to-r from-[#165028]/5 to-[#5DBB63]/5 rounded-xl p-4 mb-6 border border-[#165028]/20">
              <div className="flex items-center justify-center gap-2 text-sm text-[#165028] font-medium mb-2">
                <CheckCircle className="w-4 h-4" />
                Order Confirmed
              </div>
              <p className="text-lg font-bold text-[#165028]">#{orderData?.id}</p>
              <p className="text-sm text-gray-600">Total: ৳{orderData?.total?.toLocaleString()}</p>
            </div>
            
            {/* Action Buttons */}
            <div className="relative z-10 space-y-3">
              <button
                onClick={() => {
                  handleDownloadInvoice('pdf');
                  setTimeout(() => {
                    handleSuccessClose();
                  }, 1500);
                }}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-[#165028] to-[#5DBB63] text-white rounded-xl hover:from-[#0f3d1a] hover:to-[#4a9a4f] transition-all font-medium shadow-lg"
              >
                <Download className="w-5 h-5" />
                Download Invoice
              </button>
              <button
                onClick={handleSuccessClose}
                className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
            
            {/* Additional Info */}
            <div className="relative z-10 mt-6 flex items-center justify-center gap-4 text-xs text-gray-500">
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3" />
                3-5 days delivery
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3 h-3" />
                24/7 Support
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
