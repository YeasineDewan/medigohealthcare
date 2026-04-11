// Mock API service for development when backend is not available
class MockApiService {
  constructor() {
    this.baseURL = 'http://localhost:8000/api';
  }

  async request(endpoint, options = {}) {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Mock responses based on endpoint
    const mockResponses = {
      '/video-carousel': {
        videos: [
          {
            id: 1,
            title: 'Welcome to Medigo Health',
            description: 'Experience world-class healthcare services',
            url: 'https://example.com/video1',
            thumbnail: 'https://example.com/thumb1.jpg',
            category: 'General',
            status: 'active',
            featured: true,
            autoplay: true,
            mute: false,
            loop: true,
            showControls: true,
            displayPages: ['home'],
            tags: ['healthcare', 'medical'],
            createdAt: '2024-01-15T10:00:00Z',
            order: 1
          },
          {
            id: 2,
            title: 'Advanced Medical Technology',
            description: 'Latest medical equipment and procedures',
            url: 'https://example.com/video2',
            thumbnail: 'https://example.com/thumb2.jpg',
            category: 'Technology',
            status: 'active',
            featured: false,
            autoplay: false,
            mute: true,
            loop: false,
            showControls: true,
            displayPages: ['about'],
            tags: ['technology', 'innovation'],
            createdAt: '2024-01-14T15:30:00Z',
            order: 2
          }
        ],
        stats: {
          totalVideos: 2,
          activeVideos: 2,
          totalViews: 15420,
          thisMonthViews: 2340
        }
      },
      '/video-carousel/admin': {
        videos: [
          {
            id: 1,
            title: 'Welcome to Medigo Health',
            description: 'Experience world-class healthcare services',
            url: 'https://example.com/video1',
            thumbnail: 'https://example.com/thumb1.jpg',
            category: 'General',
            status: 'active',
            featured: true,
            autoplay: true,
            mute: false,
            loop: true,
            showControls: true,
            displayPages: ['home'],
            tags: ['healthcare', 'medical'],
            createdAt: '2024-01-15T10:00:00Z',
            order: 1
          }
        ],
        stats: {
          totalVideos: 1,
          activeVideos: 1,
          totalViews: 7710,
          thisMonthViews: 1170
        }
      }
    };

    // Return mock response or simulate error
    if (endpoint.includes('/video-carousel')) {
      return mockResponses[endpoint] || { videos: [], stats: {} };
    }

    // Simulate random errors for testing
    if (Math.random() < 0.05) {
      throw new Error('Simulated API error for testing');
    }

    return mockResponses[endpoint] || { data: null };
  }

  async get(endpoint, params = {}) {
    return this.request(endpoint);
  }

  async post(endpoint, data) {
    return this.request(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put(endpoint, data) {
    return this.request(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async delete(endpoint) {
    return this.request(endpoint, {
      method: 'DELETE',
    });
  }
}

const mockApiService = new MockApiService();

export default mockApiService;
