import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { transformSync } from '@babel/core'
import pluginTransformReactJsx from '@babel/plugin-transform-react-jsx'

// Pre-transform .js files containing JSX before Rollup parses them
function jsxInJsPlugin() {
  return {
    name: 'jsx-in-js',
    enforce: 'pre',
    transform(code, id) {
      if (
        !id.includes('node_modules') &&
        id.endsWith('.js') &&
        (code.includes('</') || code.includes('/>'))
      ) {
        const result = transformSync(code, {
          filename: id,
          plugins: [[pluginTransformReactJsx, { runtime: 'automatic' }]],
          sourceMaps: false,
          configFile: false,
          babelrc: false,
        })
        return result ? { code: result.code, map: null } : null
      }
    },
  }
}

export default defineConfig({
  plugins: [
    jsxInJsPlugin(),
    react(),
    tailwindcss(),
  ],

  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: false,
    minify: 'esbuild',
    chunkSizeWarningLimit: 4000,
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        // Organized asset file naming
        entryFileNames: 'assets/js/[name]-[hash].js',
        chunkFileNames: 'assets/js/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          const ext = assetInfo.names?.[0]?.split('.').pop() || ''
          if (/css/i.test(ext)) return 'assets/css/[name]-[hash][extname]'
          if (/png|jpe?g|svg|gif|webp|ico/i.test(ext)) return 'assets/images/[name]-[hash][extname]'
          if (/woff2?|ttf|eot/i.test(ext)) return 'assets/fonts/[name]-[hash][extname]'
          return 'assets/[name]-[hash][extname]'
        },
        // Smart chunk splitting
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react-dom') || id.includes('react-router')) return 'vendor-react'
            if (id.includes('framer-motion')) return 'vendor-motion'
            if (id.includes('recharts')) return 'vendor-charts'
            if (id.includes('lucide-react')) return 'vendor-icons'
            if (id.includes('jspdf') || id.includes('docx') || id.includes('file-saver')) return 'vendor-export'
            if (id.includes('axios') || id.includes('zustand')) return 'vendor-utils'
            return 'vendor-misc'
          }
          if (id.includes('/pages/admin/')) return 'chunk-admin'
          if (id.includes('/pages/doctor/')) return 'chunk-doctor'
          if (id.includes('/pages/patient/')) return 'chunk-patient'
        },
      },
    },
  },

  preview: {
    port: 4173,
    host: true,
  },
})
