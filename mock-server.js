import express from 'express';
import cors from 'cors';
const app = express();
const PORT = 8000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock data
const mockData = {
  'menus/services': {
    success: true,
    data: {
      title: 'Our Services',
      services: [
        {
          id: 1,
          name: 'Emergency Care',
          description: '24/7 emergency medical services',
          icon: 'ambulance'
        },
        {
          id: 2,
          name: 'General Practice',
          description: 'Primary healthcare services',
          icon: 'stethoscope'
        },
        {
          id: 3,
          name: 'Specialist Consultation',
          description: 'Expert medical specialists',
          icon: 'user-md'
        }
      ]
    }
  },
  'menus/emergency': {
    success: true,
    data: {
      title: 'Emergency Services',
      hotlines: [
        {
          id: 1,
          name: 'Emergency Hotline',
          phone: '911',
          description: 'For life-threatening emergencies'
        },
        {
          id: 2,
          name: 'Medical Helpline',
          phone: '1-800-MEDICO',
          description: '24/7 medical advice'
        }
      ]
    }
  },
  'banners': {
    success: true,
    data: [
      {
        id: 1,
        title: 'Welcome to Medigo Healthcare',
        subtitle: 'Your trusted healthcare partner',
        image: '/hero-banner.jpg',
        type: 'hero',
        active: true
      },
      {
        id: 2,
        title: 'Special Offer',
        subtitle: 'Get 20% off on health checkups',
        image: '/special-offer.jpg',
        type: 'promotion',
        active: false
      }
    ]
  },
  'categories': {
    success: true,
    data: [
      {
        id: 1,
        name: 'Cardiology',
        description: 'Heart and cardiovascular care',
        icon: 'heart'
      },
      {
        id: 2,
        name: 'Neurology',
        description: 'Brain and nervous system care',
        icon: 'brain'
      },
      {
        id: 3,
        name: 'Orthopedics',
        description: 'Bone and joint care',
        icon: 'bone'
      }
    ]
  }
};

// API Routes
app.get('/api/v1/menus/services', (req, res) => {
  res.json(mockData['menus/services']);
});

app.get('/api/v1/menus/emergency', (req, res) => {
  res.json(mockData['menus/emergency']);
});

app.get('/api/v1/banners', (req, res) => {
  const type = req.query.type;
  const includeInactive = req.query.include_inactive === 'true';
  let banners = mockData['banners'].data;
  
  if (!includeInactive) {
    banners = banners.filter(banner => banner.active !== false);
  }
  
  if (type === 'hero') {
    banners = banners.filter(banner => banner.type === 'hero');
  }
  
  res.json({
    success: true,
    data: banners
  });
});

app.get('/api/v1/categories', (req, res) => {
  res.json(mockData['categories']);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Mock API server is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock API server running on http://localhost:${PORT}`);
  console.log(`Available endpoints:`);
  console.log(`  GET /api/v1/menus/services`);
  console.log(`  GET /api/v1/menus/emergency`);
  console.log(`  GET /api/v1/banners`);
  console.log(`  GET /api/v1/categories`);
  console.log(`  GET /api/health`);
});
