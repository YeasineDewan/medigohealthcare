import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, Grid3x3, List } from 'lucide-react';
import { categoryService, productService } from '../services/api';
import ProductCard from '../components/features/ProductCard';
import FilterSidebar from '../components/features/FilterSidebar';

export default function CategoryProducts() {
  const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [filters, setFilters] = useState({});
  const [pagination, setPagination] = useState({ current_page: 1, last_page: 1 });

  useEffect(() => {
    if (id) {
      loadCategoryAndProducts();
    }
  }, [id, sortBy, filters]);

  const loadCategoryAndProducts = async () => {
    try {
      setLoading(true);
      
      // Load category details
      const categoryResponse = await categoryService.getById(id);
      setCategory(categoryResponse.data.category);
      
      // Load products with filters
      const params = {
        category_id: id,
        sort_by: sortBy,
        ...filters,
        per_page: 20,
      };
      
      const productsResponse = await productService.getAll(params);
      setProducts(productsResponse.data.data || productsResponse.data);
      setPagination({
        current_page: productsResponse.data.current_page || 1,
        last_page: productsResponse.data.last_page || 1,
      });
    } catch (error) {
      console.error('Failed to load category products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({});
  };

  if (loading && !category) {
    return (
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-gray-200 rounded w-1/3"></div>
            <div className="h-32 bg-gray-200 rounded"></div>
            <div className="grid md:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Category not found</h2>
          <Link to="/pharmacy" className="text-[#5DBB63] hover:underline">
            Back to Pharmacy
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Category Header */}
      <div className="bg-gradient-to-br from-[#f0fdf2] to-white py-12 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
            <Link to="/" className="hover:text-[#165028]">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/pharmacy" className="hover:text-[#165028]">Pharmacy</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#165028]">{category.name}</span>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-[#165028] mb-3">{category.name}</h1>
              {category.description && (
                <p className="text-gray-600 max-w-2xl">{category.description}</p>
              )}
              <p className="text-sm text-gray-500 mt-2">
                {products.length} products available
              </p>
            </div>
            {category.image && (
              <img
                src={category.image}
                alt={category.name}
                className="w-24 h-24 object-contain"
              />
            )}
          </div>

          {/* Subcategories */}
          {category.children && category.children.length > 0 && (
            <div className="mt-6 flex gap-3 overflow-x-auto pb-2">
              {category.children.map((sub) => (
                <Link
                  key={sub.id}
                  to={`/pharmacy/category/${sub.id}`}
                  className="px-4 py-2 bg-white rounded-xl border border-gray-200 hover:border-[#5DBB63] hover:bg-[#f0fdf2] transition-all whitespace-nowrap"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Desktop Filter Sidebar */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={handleFilterChange}
              onClear={handleClearFilters}
              isMobile={false}
            />
          </div>

          {/* Products Section */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowFilters(true)}
                  className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  Filters
                </button>
                
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                >
                  <option value="newest">Newest First</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-[#5DBB63] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <Grid3x3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-[#5DBB63] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {Object.keys(filters).length > 0 && (
              <div className="mb-6 flex items-center gap-2 flex-wrap">
                <span className="text-sm text-gray-600">Active filters:</span>
                {filters.min_price && filters.max_price && (
                  <span className="px-3 py-1 bg-[#f0fdf2] text-[#165028] rounded-full text-sm">
                    ৳{filters.min_price} - ৳{filters.max_price}
                  </span>
                )}
                {filters.manufacturer && Array.isArray(filters.manufacturer) && filters.manufacturer.map(m => (
                  <span key={m} className="px-3 py-1 bg-[#f0fdf2] text-[#165028] rounded-full text-sm">
                    {m}
                  </span>
                ))}
                {filters.in_stock && (
                  <span className="px-3 py-1 bg-[#f0fdf2] text-[#165028] rounded-full text-sm">
                    In Stock
                  </span>
                )}
                <button
                  onClick={handleClearFilters}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Products Grid/List */}
            {loading ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="animate-pulse bg-gray-200 h-80 rounded-2xl"></div>
                ))}
              </div>
            ) : products.length > 0 ? (
              <div className={viewMode === 'grid' 
                ? 'grid sm:grid-cols-2 lg:grid-cols-3 gap-6' 
                : 'space-y-4'
              }>
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-20 h-20 rounded-2xl bg-gray-100 flex items-center justify-center mx-auto mb-4">
                  <Grid3x3 className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your filters or browse other categories
                </p>
                <button
                  onClick={handleClearFilters}
                  className="px-4 py-2 bg-[#5DBB63] text-white rounded-xl hover:bg-[#4a9a4f] transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            )}

            {/* Pagination */}
            {pagination.last_page > 1 && (
              <div className="mt-12 flex justify-center gap-2">
                {[...Array(pagination.last_page)].map((_, i) => (
                  <button
                    key={i}
                    className={`w-10 h-10 rounded-xl font-medium ${
                      pagination.current_page === i + 1
                        ? 'bg-[#5DBB63] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Modal */}
      {showFilters && (
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClear={handleClearFilters}
          isMobile={true}
          onClose={() => setShowFilters(false)}
        />
      )}
    </div>
  );
}
