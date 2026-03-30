import { useState } from 'react';
import { Search, Plus, MoreVertical, Pill } from 'lucide-react';

const mockProducts = [
  { id: 1, name: 'Paracetamol 500mg', brand: 'Square', price: 120, stock: 500 },
  { id: 2, name: 'Vitamin D3 2000IU', brand: 'Incepta', price: 350, stock: 200 },
  { id: 3, name: 'Omeprazole 20mg', brand: 'Beximco', price: 280, stock: 150 },
];

export default function AdminProducts() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#111827]">Pharmacy Products</h1>
          <p className="text-gray-500 mt-1">Manage inventory</p>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#165028] text-white font-medium hover:bg-[#0f3d1c]">
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-gray-100 shadow-sm">
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="search"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-12 pr-4 py-2.5 rounded-xl border border-gray-200 focus:border-[#5DBB63] outline-none"
          />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-4 font-medium text-gray-500">Product</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Brand</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Price</th>
                <th className="text-left py-3 px-4 font-medium text-gray-500">Stock</th>
                <th className="py-3 px-4" />
              </tr>
            </thead>
            <tbody>
              {mockProducts.map((p) => (
                <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-[#f0fdf2] flex items-center justify-center">
                        <Pill className="w-5 h-5 text-[#5DBB63]" />
                      </div>
                      <span className="font-medium text-[#111827]">{p.name}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-gray-600">{p.brand}</td>
                  <td className="py-4 px-4 text-gray-600">৳{p.price}</td>
                  <td className="py-4 px-4">
                    <span className={p.stock < 100 ? 'text-amber-600 font-medium' : 'text-gray-600'}>{p.stock}</span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="p-2 rounded-lg hover:bg-gray-100">
                      <MoreVertical className="w-5 h-5 text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
