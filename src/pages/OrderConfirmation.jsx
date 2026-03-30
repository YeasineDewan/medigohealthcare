import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Truck, Clock, MapPin, Phone, Mail } from 'lucide-react';
import { orderService } from '../services/api';
import { useAuthStore } from '../store/authStore';
import InvoiceDownload from '../components/features/InvoiceDownload';

export default function OrderConfirmation() {
  const { id } = useParams();
  const user = useAuthStore((s) => s.user);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadOrder();
    }
  }, [id]);

  const loadOrder = async () => {
    try {
      setLoading(true);
      const response = await orderService.getById(id);
      setOrder(response.data);
    } catch (error) {
      console.error('Failed to load order:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#5DBB63]"></div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order not found</h2>
          <Link to="/pharmacy" className="text-[#5DBB63] hover:underline">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  const customer = {
    name: user?.name || order.shipping_name,
    email: user?.email || order.shipping_email || 'N/A',
    phone: user?.phone || order.shipping_phone,
  };

  const estimatedDelivery = new Date();
  estimatedDelivery.setDate(estimatedDelivery.getDate() + 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0fdf2] to-white py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-[#165028] mb-3">
            Order Placed Successfully!
          </h1>
          <p className="text-lg text-gray-600">
            Thank you for your order. We've received it and will process it soon.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-6">
          {/* Order Header */}
          <div className="flex items-center justify-between pb-6 border-b border-gray-200 mb-6">
            <div>
              <h2 className="text-2xl font-bold text-[#111827] mb-1">
                Order #{order.id}
              </h2>
              <p className="text-gray-500">
                Placed on {new Date(order.created_at || Date.now()).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
            <InvoiceDownload order={order} customer={customer} />
          </div>

          {/* Order Status */}
          <div className="bg-[#f0fdf2] border border-[#5DBB63]/30 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#5DBB63] rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[#165028] mb-1">
                  {order.status === 'pending' && 'Order Confirmed'}
                  {order.status === 'processing' && 'Processing Your Order'}
                  {order.status === 'shipped' && 'Order Shipped'}
                  {order.status === 'delivered' && 'Order Delivered'}
                </div>
                <div className="text-sm text-gray-600">
                  {order.status === 'pending' && 'Your order is being prepared'}
                  {order.status === 'processing' && 'We are processing your order'}
                  {order.status === 'shipped' && 'Your order is on the way'}
                  {order.status === 'delivered' && 'Your order has been delivered'}
                </div>
              </div>
            </div>
          </div>

          {/* Delivery Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-[#111827] flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#5DBB63]" />
                Delivery Address
              </h3>
              <div className="text-gray-700 space-y-1">
                <p className="font-medium">{order.shipping_name}</p>
                <p>{order.shipping_address}</p>
                <p>{order.shipping_city}</p>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-[#111827] flex items-center gap-2">
                <Phone className="w-5 h-5 text-[#5DBB63]" />
                Contact Information
              </h3>
              <div className="text-gray-700 space-y-1">
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {order.shipping_phone}
                </p>
                {order.shipping_email && (
                  <p className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {order.shipping_email}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Estimated Delivery */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-center gap-3">
            <Truck className="w-6 h-6 text-blue-600" />
            <div>
              <div className="font-medium text-blue-900">Estimated Delivery</div>
              <div className="text-sm text-blue-700">
                {estimatedDelivery.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="font-semibold text-[#111827] mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl"
                >
                  <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center">
                    <span className="text-2xl">💊</span>
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-[#111827]">
                      {item.product?.name || item.name || 'Product'}
                    </div>
                    <div className="text-sm text-gray-500">
                      Quantity: {item.quantity} × ৳{item.price?.toLocaleString()}
                    </div>
                  </div>
                  <div className="font-semibold text-[#165028]">
                    ৳{(item.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="border-t border-gray-200 pt-6">
            <div className="space-y-3 max-w-sm ml-auto">
              <div className="flex justify-between text-gray-700">
                <span>Subtotal</span>
                <span>৳{order.subtotal?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Tax (5%)</span>
                <span>৳{order.tax?.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>Shipping</span>
                <span>{order.shipping === 0 ? 'FREE' : `৳${order.shipping?.toFixed(2)}`}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-৳{order.discount?.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
                <span className="font-semibold text-[#111827] text-lg">Total</span>
                <span className="font-bold text-2xl text-[#165028]">
                  ৳{order.total?.toFixed(2)}
                </span>
              </div>
              <div className="text-sm text-gray-600 text-right">
                Payment Method: <span className="font-medium capitalize">{order.payment_method?.replace('_', ' ')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/patient/orders"
            className="px-6 py-3 bg-[#5DBB63] text-white rounded-xl hover:bg-[#4a9a4f] transition-colors font-medium text-center"
          >
            Track Order
          </Link>
          <Link
            to="/pharmacy"
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-center"
          >
            Continue Shopping
          </Link>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-gray-600">
            <Clock className="w-5 h-5" />
            <span>Need help? Contact our support team</span>
          </div>
          <div className="mt-2">
            <a href="mailto:support@medigo.health" className="text-[#5DBB63] hover:underline">
              support@medigo.health
            </a>
            <span className="mx-2 text-gray-400">|</span>
            <a href="tel:+8801XXXXXXXX" className="text-[#5DBB63] hover:underline">
              +880 1XXX-XXXXXX
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
