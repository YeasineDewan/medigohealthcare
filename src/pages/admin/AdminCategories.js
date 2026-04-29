import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Image as ImageIcon, Package, ChevronRight, Search, Upload, X, Save, TrendingUp, Eye, EyeOff } from 'lucide-react';
import { categoryService, productService } from '../../services/api';

export default function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('create'); // 'create' or 'edit'
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('categories'); // 'categories' or 'products'
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState('all');
  
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    description: '',
    image: '',
    parent_id: null,
    is_active: true,
    display_order: 0,
  });

  useEffect(() => {
    loadData();
  }, [viewMode, selectedCategoryFilter]);

  const loadData = async () => {
    try {
      setLoading(true);
      
      // Load categories
      const categoriesResponse = await categoryService.getAll();
      setCategories(categoriesResponse.data || []);
      
      // Load products if in products view
      if (viewMode === 'products') {
        const params = selectedCategoryFilter !== 'all' 
          ? { category_id: selectedCategoryFilter }
          : {};
        const productsResponse = await productService.getAll(params);
        setProducts(productsResponse.data.data || productsResponse.data || []);
      }
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });

    // Auto-generate slug from name
    if (name === 'name' && modalMode === 'create') {
      setFormData(prev => ({
        ...prev,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      }));
    }
  };

  const handleCreate = () => {
    setModalMode('create');
    setFormData({
      name: '',
      slug: '',
      description: '',
      image: '',
      parent_id: null,
      is_active: true,
      display_order: 0,
    });
    setShowModal(true);
  };

  const handleEdit = (category) => {
    setModalMode('edit');
    setSelectedCategory(category);
    setFormData({
      name: category.name || '',
      slug: category.slug || '',
      description: category.description || '',
      image: category.image || '',
      parent_id: category.parent_id || null,
      is_active: category.is_active !== false,
      display_order: category.display_order || 0,
    });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (modalMode === 'create') {
        await categoryService.create(formData);
        alert('Category created successfully!');
      } else {
        await categoryService.update(selectedCategory.id, formData);
        alert('Category updated successfully!');
      }
      
      setShowModal(false);
      loadData();
    } catch (error) {
      console.error('Failed to save category:', error);
      alert('Failed to save category. Please try again.');
    }
  };

  const handleDelete = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
      return;
    }

    try {
      await categoryService.delete(id);
      alert('Category deleted successfully!');
      loadData();
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert(error.response?.data?.message || 'Failed to delete category. It may have associated products.');
    }
  };

  const toggleCategoryStatus = async (category) => {
    try {
      await categoryService.update(category.id, {
        is_active: !category.is_active,
      });
      loadData();
    } catch (error) {
      console.error('Failed to update category status:', error);
    }
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredProducts = products.filter(prod =>
    prod.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const parentCategories = categories.filter(cat => !cat.parent_id);

  const getCategoryStats = (categoryId) => {
    const category = categories.find(c => c.id === categoryId);
    return {
      productCount: category?.product_count || 0,
      subCategories: categories.filter(c => c.parent_id === categoryId).length,
    };
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-[#165028]">Category & Product Management</h1>
          <p className="text-gray-600 mt-1">Manage pharmacy categories and products</p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center gap-2 px-6 py-3 bg-[#5DBB63] text-white rounded-xl hover:bg-[#4a9a4f] transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          Add Category
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-blue-900">Total Categories</h3>
            <Package className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-3xl font-bold text-blue-900">{categories.length}</p>
          <p className="text-sm text-blue-700 mt-1">{parentCategories.length} parent categories</p>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-green-900">Active Categories</h3>
            <Eye className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-3xl font-bold text-green-900">
            {categories.filter(c => c.is_active).length}
          </p>
          <p className="text-sm text-green-700 mt-1">
            {categories.filter(c => !c.is_active).length} inactive
          </p>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-purple-900">Total Products</h3>
            <TrendingUp className="w-5 h-5 text-purple-600" />
          </div>
          <p className="text-3xl font-bold text-purple-900">{products.length}</p>
          <p className="text-sm text-purple-700 mt-1">Across all categories</p>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-6 border border-orange-200">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-sm font-medium text-orange-900">Subcategories</h3>
            <ChevronRight className="w-5 h-5 text-orange-600" />
          </div>
          <p className="text-3xl font-bold text-orange-900">
            {categories.filter(c => c.parent_id).length}
          </p>
          <p className="text-sm text-orange-700 mt-1">Nested structure</p>
        </div>
      </div>

      {/* View Toggle & Search */}
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white rounded-xl p-4 border border-gray-200">
        <div className="flex gap-2">
          <button
            onClick={() => setViewMode('categories')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'categories'
                ? 'bg-[#5DBB63] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Package className="w-4 h-4 inline mr-2" />
            Categories
          </button>
          <button
            onClick={() => setViewMode('products')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              viewMode === 'products'
                ? 'bg-[#5DBB63] text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <TrendingUp className="w-4 h-4 inline mr-2" />
            Products
          </button>
        </div>

        <div className="flex gap-3 w-full sm:w-auto">
          {viewMode === 'products' && (
            <select
              value={selectedCategoryFilter}
              onChange={(e) => setSelectedCategoryFilter(e.target.value)}
              className="px-4 py-2 border border-gray-200 rounded-lg focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
            >
              <option value="all">All Categories</option>
              {parentCategories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          )}
          
          <div className="relative flex-1 sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="search"
              placeholder={`Search ${viewMode}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
            />
          </div>
        </div>
      </div>

      {/* Categories View */}
      {viewMode === 'categories' && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Slug</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Parent</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Products</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Order</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      Loading categories...
                    </td>
                  </tr>
                ) : filteredCategories.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                      No categories found
                    </td>
                  </tr>
                ) : (
                  filteredCategories.map((category) => {
                    const stats = getCategoryStats(category.id);
                    const parentCat = categories.find(c => c.id === category.parent_id);
                    
                    return (
                      <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            {category.image ? (
                              <img
                                src={category.image}
                                alt={category.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                            ) : (
                              <div className="w-12 h-12 bg-[#f0fdf2] rounded-lg flex items-center justify-center">
                                <Package className="w-6 h-6 text-[#5DBB63]" />
                              </div>
                            )}
                            <div>
                              <div className="font-medium text-gray-900">{category.name}</div>
                              {category.description && (
                                <div className="text-sm text-gray-500 line-clamp-1">{category.description}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <code className="text-sm bg-gray-100 px-2 py-1 rounded">{category.slug}</code>
                        </td>
                        <td className="px-6 py-4">
                          {parentCat ? (
                            <span className="text-sm text-gray-700">{parentCat.name}</span>
                          ) : (
                            <span className="text-sm text-gray-400">Root</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">{stats.productCount} products</div>
                            {stats.subCategories > 0 && (
                              <div className="text-gray-500">{stats.subCategories} subcategories</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => toggleCategoryStatus(category)}
                            className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                              category.is_active
                                ? 'bg-green-100 text-green-700'
                                : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {category.is_active ? (
                              <>
                                <Eye className="w-3 h-3" />
                                Active
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3 h-3" />
                                Inactive
                              </>
                            )}
                          </button>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">{category.display_order}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handleEdit(category)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                              title="Edit"
                            >
                              <Edit2 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(category.id, category.name)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Products View */}
      {viewMode === 'products' && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Product</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Category</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Stock</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      Loading products...
                    </td>
                  </tr>
                ) : filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                      No products found
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => {
                    const category = categories.find(c => c.id === product.category_id);
                    
                    return (
                      <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-[#f0fdf2] rounded-lg flex items-center justify-center">
                              💊
                            </div>
                            <div>
                              <div className="font-medium text-gray-900">{product.name}</div>
                              {product.manufacturer && (
                                <div className="text-sm text-gray-500">{product.manufacturer}</div>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-700">{category?.name || product.category || 'N/A'}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-gray-900">৳{product.price?.toLocaleString()}</div>
                            {product.discount_price && (
                              <div className="text-gray-500 line-through">৳{product.discount_price?.toLocaleString()}</div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            product.stock_quantity > 10
                              ? 'bg-green-100 text-green-700'
                              : product.stock_quantity > 0
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {product.stock_quantity > 0 ? `${product.stock_quantity} in stock` : 'Out of stock'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                            product.is_active
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {product.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {product.rating ? (
                            <div className="flex items-center gap-1">
                              <span className="text-yellow-400">★</span>
                              <span className="text-sm font-medium">{product.rating}</span>
                              {product.total_reviews > 0 && (
                                <span className="text-sm text-gray-500">({product.total_reviews})</span>
                              )}
                            </div>
                          ) : (
                            <span className="text-sm text-gray-400">No ratings</span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Create/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">
                {modalMode === 'create' ? 'Create New Category' : 'Edit Category'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                    placeholder="e.g., Pain Relief"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                    placeholder="e.g., pain-relief"
                  />
                  <p className="text-xs text-gray-500 mt-1">URL-friendly version (auto-generated)</p>
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none resize-none"
                    placeholder="Brief description of the category"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                    placeholder="https://example.com/image.jpg"
                  />
                  {formData.image && (
                    <div className="mt-2">
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="w-24 h-24 object-cover rounded-lg"
                        onError={(e) => e.target.style.display = 'none'}
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Parent Category
                  </label>
                  <select
                    name="parent_id"
                    value={formData.parent_id || ''}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                  >
                    <option value="">None (Root Category)</option>
                    {parentCategories
                      .filter(cat => modalMode === 'create' || cat.id !== selectedCategory?.id)
                      .map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Display Order
                  </label>
                  <input
                    type="number"
                    name="display_order"
                    value={formData.display_order}
                    onChange={handleInputChange}
                    min="0"
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:border-[#5DBB63] focus:ring-2 focus:ring-[#5DBB63]/20 outline-none"
                  />
                </div>

                <div className="col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="is_active"
                      checked={formData.is_active}
                      onChange={handleInputChange}
                      className="w-5 h-5 text-[#5DBB63] rounded focus:ring-[#5DBB63]"
                    />
                    <span className="text-sm font-medium text-gray-700">Active (visible to customers)</span>
                  </label>
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-[#5DBB63] text-white rounded-lg hover:bg-[#4a9a4f] transition-colors font-medium"
                >
                  <Save className="w-4 h-4" />
                  {modalMode === 'create' ? 'Create Category' : 'Update Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
