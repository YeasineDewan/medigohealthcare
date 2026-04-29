import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { productService } from '../../services/api';

export default function RelatedProducts({ productId }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    if (productId) {
      loadRelatedProducts();
    }
  }, [productId]);

  const loadRelatedProducts = async () => {
    try {
      setLoading(true);
      const response = await productService.getRelated(productId);
      setProducts(response.data || []);
    } catch (error) {
      console.error('Failed to load related products:', error);
    } finally {
      setLoading(false);
    }
  };

  const scroll = (direction) => {
    const container = document.getElementById('related-products-scroll');
    if (container) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-64 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-[#111827]">Related Products</h2>
      
      <div className="relative">
        {/* Scroll Buttons */}
        {products.length > 4 && (
          <>
            <button
              onClick={() => scroll('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Products Carousel */}
        <div
          id="related-products-scroll"
          className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {products.map((product) => (
            <div key={product.id} className="snap-start shrink-0 w-64">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
