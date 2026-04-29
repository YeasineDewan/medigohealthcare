const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();
const port = 5173;

// Serve static files with proper MIME types
app.use(express.static('public', {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.js') || path.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Serve src files with proper MIME types
app.use('/src', express.static('src', {
  setHeaders: (res, path, stat) => {
    if (path.endsWith('.js') || path.endsWith('.mjs')) {
      res.setHeader('Content-Type', 'application/javascript');
    } else if (path.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
    }
  }
}));

// Proxy API requests to Laravel backend
app.use('/api', createProxyMiddleware({
  target: process.env.VITE_API_URL || 'http://localhost:8000',
  changeOrigin: true,
  secure: false,
}));

// Serve index.html for all other routes (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`External access: http://0.0.0.0:${port}`);
});

module.exports = app;
