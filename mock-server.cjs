const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 8000;

// Enable CORS for all routes
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Mock data
const mockData = {
  banners: [
    {
      id: 1,
      title: 'Complete Healthcare Solution',
      subtitle: 'From consultations to medicines, we\'ve got you covered 24/7',
      description: 'Experience seamless healthcare with our integrated platform featuring expert doctors and emergency services',
      image: '/banners/healthcare-hero.jpg',
      backgroundColor: 'from-emerald-600 via-teal-600 to-cyan-700',
      features: ['Video Consultations', 'Medicine Delivery', 'Lab Tests at Home', '24/7 Emergency'],
      active: true
    },
    {
      id: 2,
      title: 'Expert Doctors at Your Fingertips',
      subtitle: 'Connect with certified specialists in seconds',
      description: 'Get medical advice from comfort of your home with our trusted healthcare professionals',
      image: '/banners/doctor-consultation.jpg',
      backgroundColor: 'from-blue-600 via-indigo-600 to-purple-700',
      features: ['1000+ Doctors', '24/7 Availability', 'Instant Consultations', 'Emergency Care'],
      active: true
    },
    {
      id: 3,
      title: 'Fast Medicine Delivery',
      subtitle: 'Order medicines online and get them delivered within hours',
      description: 'Your neighborhood pharmacy, now online and faster with emergency support available',
      image: '/banners/pharmacy-delivery.jpg',
      backgroundColor: 'from-green-600 via-emerald-600 to-teal-700',
      features: ['Same Day Delivery', 'Genuine Medicines', 'Prescription Upload', 'Emergency Support'],
      active: true
    }
  ],
  services: [
    {
      id: 1,
      title: 'Specialist Doctors',
      description: 'Book appointments with certified specialists',
      icon: 'stethoscope',
      href: '/doctors'
    },
    {
      id: 2,
      title: 'Video Consultation',
      description: 'Consult doctors online 24/7',
      icon: 'video',
      href: '/consult'
    },
    {
      id: 3,
      title: 'Pharmacy',
      description: 'Order medicines with home delivery',
      icon: 'pill',
      href: '/pharmacy'
    },
    {
      id: 4,
      title: 'Lab Tests',
      description: 'Home collection & digital reports',
      icon: 'flask',
      href: '/lab-tests'
    }
  ],
  emergency: [
    {
      id: 1,
      title: 'Emergency Hotline',
      description: '24/7 Emergency Support',
      phone: '+1-800-555-0123',
      icon: 'phone'
    },
    {
      id: 2,
      title: 'Ambulance Service',
      description: 'Quick ambulance dispatch',
      phone: '+1-800-555-0124',
      icon: 'ambulance'
    }
  ]
};

// API Routes
app.get('/api/v1/banners', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/banners');
  
  // Simulate different responses based on query params
  if (req.query.type === 'hero') {
    return res.json({
      success: true,
      message: 'Banners fetched successfully',
      data: mockData.banners
    });
  }
  
  return res.json({
    success: true,
    message: 'Banners fetched successfully',
    data: mockData.banners
  });
});

app.get('/api/v1/menus/services', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/menus/services');
  res.json({
    success: true,
    message: 'Services menu fetched successfully',
    data: mockData.services
  });
});

app.get('/api/v1/menus/emergency', (req, res) => {
  console.log('🎯 Mock API: GET /api/v1/menus/emergency');
  res.json({
    success: true,
    message: 'Emergency menu fetched successfully',
    data: mockData.emergency
  });
});

// Health check endpoint
app.get('/api/v1/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.message);
  res.status(500).json({
    success: false,
    message: 'Internal Server Error',
    error: err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock API Server running on port ${PORT}`);
  console.log(`📡 Frontend should connect to: http://localhost:${PORT}`);
  console.log('🎯 Available endpoints:');
  console.log('   GET /api/v1/banners');
  console.log('   GET /api/v1/banners?type=hero');
  console.log('   GET /api/v1/menus/services');
  console.log('   GET /api/v1/menus/emergency');
  console.log('   GET /api/v1/health');
});
