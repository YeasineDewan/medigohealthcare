import { useState, useEffect, useCallback } from 'react';
import { videoCarouselApi } from '../services/apiService';

/**
 * Fetches video carousel items for a display page (home, doctors, about, services, contact).
 * @param {string} page - Display page slug: 'home' | 'doctors' | 'about' | 'services' | 'contact'
 * @returns {{ videos: array, loading: boolean, error: Error|null, refetch: function }}
 */
export function useVideoCarousel(page = 'home') {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVideos = useCallback(async () => {
    if (!page) {
      setVideos([]);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const { data } = await videoCarouselApi.list({ page, limit: 50 });
      const list = data?.videos ?? (Array.isArray(data?.data) ? data.data : []);
      setVideos(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error('Video carousel fetch error:', err);
      setError(err);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, [page]);

  useEffect(() => {
    fetchVideos();
  }, [fetchVideos]);

  return { videos, loading, error, refetch: fetchVideos };
}
