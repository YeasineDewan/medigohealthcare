import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Search,
  Filter,
  Download,
  Plus,
  Pill,
  Package,
  DollarSign,
  AlertTriangle,
  Clock,
  Edit3,
  Trash2,
  Eye,
  X,
  Save,
  Tag,
  Calendar,
  Building,
  FileText,
  RefreshCw
} from 'lucide-react';

const medicines = [
  { id: 1, name: 'Paracetamol 500mg', sku: 'MED001', category: 'Pain Relief', supplier: 'Pharma Corp', price: 5.99, stock: 1500, minStock: 500, expiryDate: '2025-12-31', status: 'active' },
  { id: 2, name: 'Amoxicillin 250mg', sku: 'MED002', category: 'Antibiotics', supplier: 'Pharma Corp', price: 12.50, stock: 320, minStock: 300, expiryDate: '2025-06-30', status: 'active' },
  { id: 3, name: 'Ibuprofen 400mg', sku: 'MED003', category: 'Pain Relief', supplier: 'MedSupply Inc', price: 8.99, stock: 80, minStock: 200, expiryDate: '2025-09-30', status: 'low-stock' },
  { id: 4, name: 'Cetirizine 10mg', sku: 'MED004', category: 'Allergy', supplier: 'Pharma Corp', price: 7.50, stock: 800, minStock: 200, expiryDate: '2026-03-31', status: 'active' },
  { id: 5, name: 'Metformin 500mg', sku: 'MED005', category: 'Diabetes', supplier: 'Pharma Corp', price: 15.00, stock: 0, minStock: 100, expiryDate: '2025-08-31', status: 'out-of-stock' },
  { id: 6, name: 'Omeprazole 20mg', sku: 'MED006', category: 'Gastrointestinal', supplier: 'MedSupply Inc', price: 18.00, stock: 450, minStock: 150, expiryDate: '2025-11-30', status: 'active' },
];

const categories = ['All', 'Pain Relief', 'Antibiotics', 'Allergy', 'Diabetes', 'Gastrointestinal', 'Cardiovascular'];

export default function Medicines() {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = medicines.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(searchTerm.toLowerCase()) || m.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || m.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || m.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const totalStock = filtered.reduce((sum, m) => sum + m.stock, 0);
  const totalValue = filtered.reduce((sum, m) => sum + (m.stock * m.price), 0);
  const lowStock = filtered.filter(m => m.status === 'low-stock' || m.status === 'out-of-stock').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pharmacy Medicines</h1>
          <p className="text-gray-500 mt-1">Manage pharmacy inventory and medicines</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"><Download className="w-4 h-4" />Export</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#5DBB63] to-[#4CAF50] text-white rounded-lg hover:from-[#4CAF50] hover:to-[#45a049]"><Plus className="w-4 h-4" />Add Medicine</button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Total Medicines</p><p className="text-2xl font-bold text-gray-900">{filtered.length}</p></div>
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center"><Pill className="w-6 h-6 text-blue-600" /></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Total Stock</p><p className="text-2xl font-bold text-green-600">{totalStock.toLocaleString()}</p></div>
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center"><Package className="w-6 h-6 text-green-600" /></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Stock Value</p><p className="text-2xl font-bold text-purple-600">${totalValue.toLocaleString()}</p></div>
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center"><DollarSign className="w-6 h-6 text-purple-600" /></div>
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between">
            <div><p className="text-sm text-gray-500">Low Stock</p><p className="text-2xl font-bold text-orange-600">{lowStock}</p></div>
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center"><AlertTriangle className="w-6 h-6 text-orange-600" /></div>
          </div>
        </motion.div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search medicines..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]" />
          </div>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]">
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5DBB63]">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="low-stock">Low Stock</option>
            <option value="out-of-stock">Out of Stock</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Medicine</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Category</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Price</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Expiry</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((med, index) => (
                <motion.tr key={med.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: index * 0.05 }} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center"><Pill className="w-5 h-5 text-white" /></div>
                      <div><p className="font-medium text-gray-900">{med.name}</p><p className="text-sm text-gray-500">{med.sku}</p></div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600">{med.category}</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-900">${med.price.toFixed(2)}</td>
                  <td className="px-4 py-3 text-right"><span className={med.stock <= med.minStock ? 'text-red-600 font-medium' : 'text-gray-900'}>{med.stock}</span></td>
                  <td className="px-4 py-3 text-sm text-gray-500">{med.expiryDate}</td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${med.status === 'active' ? 'bg-green-100 text-green-700' : med.status === 'low-stock' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                      {med.status.replace('-', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg"><Edit3 className="w-4 h-4" /></button>
                      <button className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
