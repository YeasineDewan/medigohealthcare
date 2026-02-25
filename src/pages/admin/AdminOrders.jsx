import { useState } from 'react';
import { Search, Package, MoreVertical } from 'lucide-react';

const mockOrders = [
  { id: 'ORD-1001', customer: 'Ahmed Khan', items: 3, total: 1250, status: 'delivered' },
  { id: 'ORD-1002', customer: 'Sara Ali', items: 2, total: 680, status: 'shipped' },
  { id: 'ORD-1003', customer: 'Rahman Hossain', items: 5, total: 2100, status: 'pending' },
];

export default function AdminOrders() {
  const [filter, setFilter] = useState('all');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-[#111827]">Orders</h1>
        <p className="text-gray-500 mt-1">Manage pharmacy orders</p>
      </div>

      <div className="flex gap-2 mb-6">
        {['all', 'pending', 'shipped', 'delivered'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl font-medium capitalize ${
              filter === f ? 'bg-[#165028] text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search orders..."
            className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
          />
        </div>
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 rounded-xl border border-gray-100 hover:border-[#5DBB63]/30"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#f0fdf2] flex items-center justify-center">
                  <Package className="w-6 h-6 text-[#5DBB63]" />
                </div>
                <div>
                  <p className="font-medium text-[#111827]">{order.id}</p>
                  <p className="text-sm text-gray-500">{order.customer} · {order.items} items</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-semibold text-[#165028]">৳{order.total.toLocaleString()}</span>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    order.status === 'delivered' ? 'bg-[#f0fdf2] text-[#165028]' :
                    order.status === 'shipped' ? 'bg-blue-50 text-blue-700' :
                    'bg-amber-50 text-amber-700'
                  }`}
                >
                  {order.status}
                </span>
                <button className="p-2 rounded-lg hover:bg-gray-100">
                  <MoreVertical className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
