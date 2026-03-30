import { useState } from 'react';
import { Star, ThumbsUp } from 'lucide-react';

export default function ProductReviews({ reviews = [], productId }) {
  const [filter, setFilter] = useState('all');
  const [showReviewForm, setShowReviewForm] = useState(false);

  const filteredReviews = filter === 'all' 
    ? reviews 
    : reviews.filter(r => r.rating === parseInt(filter));

  const avgRating = reviews.length > 0 
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length 
    : 0;

  const ratingCounts = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: reviews.filter(r => r.rating === rating).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === rating).length / reviews.length) * 100 : 0
  }));

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <div className="bg-[#f0fdf2] rounded-2xl p-6">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-[#165028]">{avgRating.toFixed(1)}</div>
            <div className="flex items-center justify-center gap-1 mt-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(avgRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <div className="text-sm text-gray-600 mt-1">{reviews.length} reviews</div>
          </div>

          <div className="flex-1 space-y-2">
            {ratingCounts.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-2">
                <span className="text-sm w-12">{rating} Star</span>
                <div className="flex-1 bg-white rounded-full h-2 overflow-hidden">
                  <div 
                    className="h-full bg-[#5DBB63]" 
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
            filter === 'all' ? 'bg-[#165028] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          All Reviews
        </button>
        {[5, 4, 3, 2, 1].map(rating => (
          <button
            key={rating}
            onClick={() => setFilter(rating.toString())}
            className={`px-4 py-2 rounded-xl whitespace-nowrap transition-colors ${
              filter === rating.toString() ? 'bg-[#165028] text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {rating} Stars
          </button>
        ))}
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div key={review.id} className="bg-white border border-gray-200 rounded-xl p-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#f0fdf2] flex items-center justify-center text-[#165028] font-semibold">
                    {review.user?.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <div className="font-medium text-[#111827]">{review.user?.name || 'Anonymous'}</div>
                    <div className="flex items-center gap-1 mt-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
                <span className="text-sm text-gray-500">{new Date(review.created_at).toLocaleDateString()}</span>
              </div>
              
              <p className="mt-3 text-gray-700">{review.comment}</p>
              
              <div className="mt-4 flex items-center gap-4">
                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-[#165028] transition-colors">
                  <ThumbsUp className="w-4 h-4" />
                  <span>Helpful ({review.helpful_count || 0})</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8 text-gray-500">
            No reviews found for this filter.
          </div>
        )}
      </div>

      {/* Write Review Button */}
      <div className="text-center">
        <button
          onClick={() => setShowReviewForm(true)}
          className="px-6 py-3 bg-[#5DBB63] text-white rounded-xl hover:bg-[#4a9a4f] transition-colors font-medium"
        >
          Write a Review
        </button>
      </div>
    </div>
  );
}
