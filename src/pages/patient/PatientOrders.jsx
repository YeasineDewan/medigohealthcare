import { Package, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const orders = [
  { id: 'ORD-1001', date: 'Feb 1, 2025', items: 3, total: 1250, status: 'Delivered' },
  { id: 'ORD-1002', date: 'Jan 28, 2025', items: 2, total: 680, status: 'Shipped' },
  { id: 'ORD-1003', date: 'Jan 25, 2025', items: 5, total: 2100, status: 'Delivered' },
];

export default function PatientOrders() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">My Orders</h1>
          <p className="text-gray-500 mt-1">Pharmacy order history</p>
        </div>
        <Link
          to="/pharmacy"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#165028] text-white font-medium hover:bg-[#0f3d1c]"
        >
          Order Medicines <ChevronRight className="w-5 h-5" />
        </Link>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <div
            key={order.id}
            className="flex items-center justify-between p-6 rounded-2xl bg-white border border-gray-100 shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-[#f0fdf2] flex items-center justify-center">
                <Package className="w-7 h-7 text-[#5DBB63]" />
              </div>
              <div>
                <p className="font-semibold text-[#111827]">{order.id}</p>
                <p className="text-sm text-gray-500">{order.date} · {order.items} items</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-bold text-[#165028]">৳{order.total.toLocaleString()}</span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#f0fdf2] text-[#165028]">
                {order.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
