import { useState, useEffect } from 'react';
import { Search, Upload, Filter, Loader } from 'lucide-react';
import ProductCard from '../components/features/ProductCard';
import CategoryGrid from '../components/features/CategoryGrid';
import FileUpload from '../components/core/FileUpload';
import { categoryService, productService } from '../services/api';

const categories = ['All', 'Vitamins', 'Pain Relief', 'Digestive', 'Cold & Flu', 'Diabetes', 'Prescription'];
const mockProducts = [
  { 
    id: 1, 
    name: 'Paracetamol 500mg', 
    genericName: 'Acetaminophen', 
    brand: 'Square Pharmaceutical', 
    price: 120,
    category: 'Pain Relief',
    inStock: true,
    prescriptionRequired: false,
    rating: 4.5,
    description: 'Effective pain and fever relief'
  },
  { 
    id: 2, 
    name: 'Vitamin D3 2000IU', 
    genericName: 'Cholecalciferol', 
    brand: 'Incepta Pharmaceuticals', 
    price: 350,
    category: 'Vitamins',
    inStock: true,
    prescriptionRequired: false,
    rating: 4.7,
    description: 'Essential for bone health and immunity'
  },
  { 
    id: 3, 
    name: 'Omeprazole 20mg', 
    genericName: 'Omeprazole', 
    brand: 'Beximco Pharma', 
    price: 280,
    category: 'Digestive',
    inStock: true,
    prescriptionRequired: true,
    rating: 4.3,
    description: 'Relieves heartburn and acid reflux'
  },
  { 
    id: 4, 
    name: 'Metformin 500mg', 
    genericName: 'Metformin HCl', 
    brand: 'Square Pharmaceutical', 
    price: 95,
    category: 'Diabetes',
    inStock: true,
    prescriptionRequired: true,
    rating: 4.6,
    description: 'Manages blood sugar levels'
  },
  { 
    id: 5, 
    name: 'Amoxicillin 500mg', 
    genericName: 'Amoxicillin', 
    brand: 'Incepta Pharmaceuticals', 
    price: 180,
    category: 'Prescription',
    inStock: true,
    prescriptionRequired: true,
    rating: 4.4,
    description: 'Antibiotic for bacterial infections'
  },
  { 
    id: 6, 
    name: 'Cetirizine 10mg', 
    genericName: 'Cetirizine HCl', 
    brand: 'Beximco Pharma', 
    price: 65,
    category: 'Cold & Flu',
    inStock: true,
    prescriptionRequired: false,
    rating: 4.2,
    description: 'Relieves allergy symptoms'
  },
  { 
    id: 7, 
    name: 'Ibuprofen 400mg', 
    genericName: 'Ibuprofen', 
    brand: 'Square Pharmaceutical', 
    price: 140,
    category: 'Pain Relief',
    inStock: false,
    prescriptionRequired: false,
    rating: 4.5,
    description: 'Anti-inflammatory pain relief'
  },
  { 
    id: 8, 
    name: 'Calcium + Vitamin D', 
    genericName: 'Calcium Carbonate', 
    brand: 'Incepta Pharmaceuticals', 
    price: 420,
    category: 'Vitamins',
    inStock: true,
    prescriptionRequired: false,
    rating: 4.6,
    description: 'Bone health supplement'
  },
];

export default function Pharmacy() {
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [bulkPrescriptions, setBulkPrescriptions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    loadCategories();
    loadProducts();
    loadFeaturedProducts();
  }, []);

  useEffect(() => {
    loadProducts();
  }, [category, search]);

  const loadCategories = async () => {
    try {
      const response = await categoryService.getAll({ parent_only: true });
      setCategories(response.data || []);
    } catch (error) {
      console.error('Failed to load categories:', error);
      // Use fallback categories
      setCategories([
        { id: 1, name: 'Vitamins', product_count: 0 },
        { id: 2, name: 'Pain Relief', product_count: 0 },
        { id: 3, name: 'Digestive', product_count: 0 },
        { id: 4, name: 'Cold & Flu', product_count: 0 },
        { id: 5, name: 'Diabetes', product_count: 0 },
      ]);
    }
  };

  const loadProducts = async () => {
    try {
      setLoading(true);
      const params = {
        search: search || undefined,
        category: category !== 'All' ? category : undefined,
        per_page: 20,
      };
      const response = await productService.getAll(params);
      setProducts(response.data.data || response.data || []);
    } catch (error) {
      console.error('Failed to load products:', error);
      // Use mock products as fallback
      setProducts(mockProducts.filter(p => {
        const matchSearch = !search || 
          p.name.toLowerCase().includes(search.toLowerCase()) || 
          p.genericName?.toLowerCase().includes(search.toLowerCase()) ||
          p.brand?.toLowerCase().includes(search.toLowerCase());
        const matchCategory = category === 'All' || p.category === category;
        return matchSearch && matchCategory;
      }));
    } finally {
      setLoading(false);
    }
  };

  const loadFeaturedProducts = async () => {
    try {
      const response = await productService.getAll({ featured: true, per_page: 8 });
      setFeaturedProducts(response.data.data || response.data || []);
    } catch (error) {
      console.error('Failed to load featured products:', error);
    }
  };

  const handleBulkPrescriptionSubmit = () => {
    // Handle bulk prescription upload
    console.log('Bulk prescriptions:', bulkPrescriptions);
    setShowBulkUpload(false);
    setBulkPrescriptions([]);
  };

  const categoryButtons = ['All', ...categories.map(c => c.name)];

  return (
    <div className="min-h-screen">
      <div className="bg-gradient-to-br from-[#f0fdf2] to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-[#165028] mb-4">Pharmacy</h1>
              <p className="text-gray-600 text-lg max-w-2xl">
                Order medicines online with doorstep delivery. Prescription required for certain items.
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowBulkUpload(true)}
                className="px-4 py-2 bg-orange-100 text-orange-700 rounded-xl hover:bg-orange-200 transition-colors flex items-center gap-2"
              >
                <Upload className="w-4 h-4" />
                Upload Prescriptions
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Categories Section */}
        {categories.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-[#111827]">Shop by Category</h2>
              <button className="text-[#5DBB63] hover:text-[#4a9a4f] font-medium">
                View All
              </button>
            </div>
            <CategoryGrid categories={categories} />
          </div>
        )}

        {/* Featured Products */}
        {featuredProducts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-[#111827] mb-6">Featured Products</h2>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Search and Filter */}
        <div className="flex flex-col lg:flex-row gap-6 mb-10">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder="Search medicines, brands, or generic names..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none transition-all"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 lg:pb-0">
            {categoryButtons.map((c) => (
              <button
                key={c}
                onClick={() => setCategory(c)}
                className={`px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-colors ${
                  category === c ? 'bg-[#165028] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-gray-600">
            {loading ? (
              <span className="flex items-center gap-2">
                <Loader className="w-4 h-4 animate-spin" />
                Loading products...
              </span>
            ) : products.length > 0 ? (
              `Found ${products.length} product${products.length !== 1 ? 's' : ''}`
            ) : (
              'No products found'
            )}
          </p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Filter className="w-4 h-4" />
            <span>Filtered by: {category === 'All' ? 'All Categories' : category}</span>
          </div>
        </div>

        {loading ? (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-200 h-80 rounded-2xl"></div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {!loading && products.length === 0 && (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
              <Search className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-4">
              Try adjusting your search or filter criteria
            </p>
            <button
              onClick={() => {
                setSearch('');
                setCategory('All');
              }}
              className="px-4 py-2 bg-[#5DBB63] text-white rounded-xl hover:bg-[#4a9a4f] transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Bulk Prescription Upload Modal */}
      {showBulkUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-6">
            <h3 className="text-xl font-semibold text-[#111827] mb-2">Upload Multiple Prescriptions</h3>
            <p className="text-gray-600 mb-6">
              Upload multiple prescription images or PDFs for faster processing. We'll review them and contact you for confirmation.
            </p>
            
            <FileUpload
              value={bulkPrescriptions}
              onChange={setBulkPrescriptions}
              accept="image/*,.pdf"
              maxSize={10 * 1024 * 1024}
              multiple={true}
              placeholder="Drop prescription files here or click to browse"
              className="mb-6"
            />
            
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6">
              <h4 className="font-medium text-blue-900 mb-2">How it works:</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Upload clear images or PDFs of your prescriptions</li>
                <li>• Our pharmacists will review and verify each prescription</li>
                <li>• We'll contact you for confirmation and payment</li>
                <li>• Free home delivery within 24-48 hours</li>
              </ul>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowBulkUpload(false);
                  setBulkPrescriptions([]);
                }}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleBulkPrescriptionSubmit}
                disabled={bulkPrescriptions.length === 0}
                className="flex-1 px-4 py-2 bg-[#5DBB63] text-white rounded-xl hover:bg-[#4a9a4f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Submit Prescriptions ({bulkPrescriptions.length})
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
