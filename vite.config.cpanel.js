import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// Production configuration for cPanel deployment
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          animations: ['framer-motion'],
        },
      },
    },
  },
  // Production base path for subdirectory deployment if needed
  base: '/',
  // Environment variables for production
  define: {
    'process.env.NODE_ENV': '"production"',
    'process.env.VITE_API_URL': '"https://test.medigohealthcares.com/api"'
  }
})
