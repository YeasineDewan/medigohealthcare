import { useVideoCarousel } from '../../hooks/useVideoCarousel';
import VideoCarousel from '../core/VideoCarousel';
import { Loader2, Film, AlertCircle } from 'lucide-react';

/**
 * Renders the video carousel with data from API for the given display page.
 * Used on Home, Doctors, About, etc. Admin configures which pages each video appears on.
 */
export default function DynamicVideoCarousel({
  page = 'home',
  autoPlay = true,
  interval = 6000,
  showControls = true,
  showThumbnails = true,
  height = 'h-96 md:h-[500px]',
  className = '',
  sectionTitle = 'Featured Videos',
  sectionSubtitle = 'Discover our healthcare services through engaging videos',
  emptyMessage = 'No videos available at the moment.',
}) {
  const { videos, loading, error } = useVideoCarousel(page);

  if (loading) {
    return (
      <div className={`flex flex-col items-center justify-center ${height} rounded-2xl bg-gray-100/80 ${className}`}>
        <Loader2 className="w-12 h-12 text-[#5DBB63] animate-spin mb-4" />
        <p className="text-gray-600">Loading videos...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`flex flex-col items-center justify-center ${height} rounded-2xl bg-gray-100/80 ${className}`}>
        <AlertCircle className="w-12 h-12 text-amber-500 mb-4" />
        <p className="text-gray-700 font-medium">Unable to load videos</p>
        <p className="text-sm text-gray-500 mt-1">Please try again later.</p>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className={`flex flex-col items-center justify-center ${height} rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 ${className}`}>
        <Film className="w-14 h-14 text-gray-400 mb-4" />
        <p className="text-gray-600">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className={className}>
      {sectionTitle && (
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-4xl font-bold text-[#165028] mb-2">{sectionTitle}</h2>
          {sectionSubtitle && (
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">{sectionSubtitle}</p>
          )}
        </div>
      )}
      <VideoCarousel
        videos={videos}
        autoPlay={autoPlay}
        interval={interval}
        showControls={showControls}
        showThumbnails={showThumbnails}
        height={height}
      />
    </div>
  );
}
