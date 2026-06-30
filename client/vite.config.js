import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'https://mern-job-portal-qewj.onrender.com',
        changeOrigin: true
      }
    }
  },
  build: {
    rollupOptions: {
      external: [/^core-js/, /^core-js\/.*/]
    }
  },
  optimizeDeps: {
    exclude: ['core-js']
  }
})
